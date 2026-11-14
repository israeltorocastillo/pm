import { z } from "zod";
import { defineTool, type RunnableTool } from "@/ai/define-tool";
import { getProjectDetail } from "@/server/services/projects";
import { getToolInstanceDetail } from "@/server/services/tool-instances";
import { listToolDefinitions, getToolDefinition } from "@/tools/registry";
import { searchKnowledge } from "@/server/knowledge";
import { RECOMMENDATION_RULES, annotateRoute } from "@/ai/recommend";
import { createProposal } from "@/server/services/ai-proposals";
import { requireProjectAccess } from "@/server/authz";

export type AiToolContext = {
  userId: string;
  orgId: string;
  conversationId: string;
  projectId?: string;
};

const PROJECT_TYPES = [
  "PREDICTIVO",
  "AGIL_SCRUM",
  "HIBRIDO",
  "MEJORA_LEAN",
  "MEJORA_SIX_SIGMA",
  "ANALISIS_NEGOCIO",
  "BIM",
] as const;

const SIGNALS = RECOMMENDATION_RULES.map((r) => r.signal) as [string, ...string[]];

export function createAiTools(ctx: AiToolContext): RunnableTool[] {
  const get_project_context = defineTool({
    name: "get_project_context",
    description:
      "Devuelve el estado actual del proyecto abierto en esta conversación: tipo, estado, problema, herramientas en uso y tareas. Llama esto antes de recomendar o proponer algo si hay un proyecto abierto.",
    inputSchema: z.object({}),
    run: async () => {
      if (!ctx.projectId) return "No hay un proyecto abierto en esta conversación.";
      const { project, myRole } = await getProjectDetail(ctx.userId, ctx.projectId);
      return JSON.stringify({
        id: project.id,
        name: project.name,
        type: project.type,
        status: project.status,
        objective: project.objective,
        problemStatement: project.problemStatement,
        myRole,
        tools: project.tools.map((t) => ({ id: t.id, toolId: t.toolId, title: t.title, status: t.status })),
        tasks: project.tasks.map((t) => ({ title: t.title, status: t.status })),
      });
    },
  });

  const get_tool_instance = defineTool({
    name: "get_tool_instance",
    description: "Devuelve los datos, el estado y las advertencias metodológicas de una instancia de herramienta.",
    inputSchema: z.object({ instanceId: z.string().describe("ID de la instancia de herramienta") }),
    run: async ({ instanceId }) => {
      const { instance, definition } = await getToolInstanceDetail(ctx.userId, instanceId);
      const data = definition.schema.parse(instance.data);
      const warnings = definition.validate?.(data) ?? [];
      return JSON.stringify({ toolId: instance.toolId, title: instance.title, status: instance.status, data, warnings });
    },
  });

  const list_tool_catalog = defineTool({
    name: "list_tool_catalog",
    description: "Lista las herramientas del catálogo implementadas en la plataforma, opcionalmente filtradas por categoría.",
    inputSchema: z.object({ category: z.string().nullable().optional() }),
    run: async ({ category }) => {
      const tools = listToolDefinitions().filter((t) => !category || t.category === category);
      return JSON.stringify(
        tools.map((t) => ({ id: t.id, name: t.name, category: t.category, description: t.description })),
      );
    },
  });

  const get_tool_guide = defineTool({
    name: "get_tool_guide",
    description: "Devuelve la ficha completa de una herramienta: propósito, preguntas guía, fichas de conocimiento relacionadas y a qué otra herramienta alimenta.",
    inputSchema: z.object({ toolId: z.string() }),
    run: async ({ toolId }) => {
      const definition = getToolDefinition(toolId);
      if (!definition) return `No existe una herramienta implementada con id "${toolId}".`;
      return JSON.stringify({
        id: definition.id,
        name: definition.name,
        description: definition.description,
        guideQuestions: definition.ai.guideQuestions,
        knowledgeRefs: definition.ai.knowledgeRefs,
        feeds: definition.connections.feeds.map((f) => ({ toolId: f.toolId, label: f.label })),
      });
    },
  });

  const search_knowledge = defineTool({
    name: "search_knowledge",
    description: "Busca en las fichas de conocimiento del magíster (conocimiento/*.md) por palabra clave.",
    inputSchema: z.object({ query: z.string() }),
    run: async ({ query }) => JSON.stringify(await searchKnowledge(query)),
  });

  const recommend_tools = defineTool({
    name: "recommend_tools",
    description:
      "Dada una señal de diagnóstico (una de las predefinidas en la matriz de recomendación), devuelve el tipo de proyecto sugerido y la ruta de herramientas, marcando cuáles están implementadas hoy. No listes rutas de memoria: usa esta tool.",
    inputSchema: z.object({ signal: z.enum(SIGNALS) }),
    run: async ({ signal }) => {
      const rule = RECOMMENDATION_RULES.find((r) => r.signal === signal);
      if (!rule) return "Señal no reconocida.";
      return JSON.stringify({ projectType: rule.projectType, route: annotateRoute(rule.route) });
    },
  });

  const propose_project = defineTool({
    name: "propose_project",
    description:
      "Deja lista una propuesta de proyecto nuevo (tipo, objetivo, problema y ruta de herramientas) para que el usuario la revise y apruebe. No crea nada todavía. Solo úsala después de completar el flujo de descubrimiento con el usuario.",
    inputSchema: z.object({
      name: z.string(),
      type: z.enum(PROJECT_TYPES),
      objective: z.string().nullable().optional(),
      problemStatement: z.string().nullable().optional(),
      route: z.array(z.string()).describe("IDs de herramientas del catálogo, en orden sugerido"),
      charterDraft: z
        .object({
          problemaOportunidad: z.string().nullable().optional(),
          objetivo: z.string().nullable().optional(),
        })
        .nullable()
        .optional()
        .describe("Borrador inicial para la ficha-proyecto, si está en la ruta"),
    }),
    run: async (input) => {
      const proposal = await createProposal({
        conversationId: ctx.conversationId,
        kind: "create_project",
        payload: { orgId: ctx.orgId, ...input },
      });
      return `Propuesta de proyecto creada (id ${proposal.id}). Pídele al usuario que la revise en el panel de propuestas.`;
    },
  });

  const propose_tool_instance = defineTool({
    name: "propose_tool_instance",
    description: "Deja lista una propuesta para agregar una nueva instancia de herramienta al proyecto actual, con datos de borrador.",
    inputSchema: z.object({
      toolId: z.string(),
      title: z.string().nullable().optional(),
      data: z.record(z.string(), z.unknown()).nullable().optional(),
    }),
    run: async ({ toolId, title, data }) => {
      if (!ctx.projectId) return "No hay un proyecto abierto para agregar esta herramienta.";
      await requireProjectAccess(ctx.userId, ctx.projectId, "EDITOR");

      const definition = getToolDefinition(toolId);
      if (!definition) return `No existe una herramienta implementada con id "${toolId}".`;

      try {
        definition.schema.parse(data ?? definition.emptyData());
      } catch (error) {
        return `Los datos no son válidos para "${toolId}": ${(error as Error).message}. Corrígelos y vuelve a intentar.`;
      }

      const proposal = await createProposal({
        conversationId: ctx.conversationId,
        kind: "create_tool_instance",
        payload: { projectId: ctx.projectId, toolId, title, data },
      });
      return `Propuesta para agregar "${definition.name}" creada (id ${proposal.id}).`;
    },
  });

  const propose_field_updates = defineTool({
    name: "propose_field_updates",
    description: "Deja lista una propuesta de cambios de campos sobre una instancia de herramienta existente.",
    inputSchema: z.object({
      instanceId: z.string(),
      changes: z.record(z.string(), z.unknown()),
    }),
    run: async ({ instanceId, changes }) => {
      const { instance, definition } = await getToolInstanceDetail(ctx.userId, instanceId);
      await requireProjectAccess(ctx.userId, instance.projectId, "EDITOR");

      try {
        const current = definition.schema.parse(instance.data) as Record<string, unknown>;
        definition.schema.parse({ ...current, ...changes });
      } catch (error) {
        return `Los cambios no son válidos: ${(error as Error).message}. Corrígelos y vuelve a intentar.`;
      }

      const proposal = await createProposal({
        conversationId: ctx.conversationId,
        kind: "update_tool_fields",
        payload: { instanceId, changes },
      });
      return `Propuesta de cambios para "${instance.title}" creada (id ${proposal.id}).`;
    },
  });

  const propose_tasks = defineTool({
    name: "propose_tasks",
    description: "Deja lista una propuesta de nuevas tareas derivadas de una herramienta o de la conversación.",
    inputSchema: z.object({ tasks: z.array(z.object({ title: z.string() })) }),
    run: async ({ tasks }) => {
      if (!ctx.projectId) return "No hay un proyecto abierto para agregar tareas.";
      await requireProjectAccess(ctx.userId, ctx.projectId, "EDITOR");

      const proposal = await createProposal({
        conversationId: ctx.conversationId,
        kind: "create_tasks",
        payload: { projectId: ctx.projectId, tasks },
      });
      return `Propuesta de ${tasks.length} tarea(s) creada (id ${proposal.id}).`;
    },
  });

  const run_calculation = defineTool({
    name: "run_calculation",
    description: "Ejecuta los cálculos oficiales de una herramienta (RPN, % de contribución, etc.) sobre los datos dados. Nunca calcules estos números de memoria: usa esta tool.",
    inputSchema: z.object({
      toolId: z.string(),
      data: z.record(z.string(), z.unknown()),
    }),
    run: async ({ toolId, data }) => {
      const definition = getToolDefinition(toolId);
      if (!definition) return `No existe una herramienta implementada con id "${toolId}".`;

      let parsed;
      try {
        parsed = definition.schema.parse(data);
      } catch (error) {
        return `Datos inválidos para "${toolId}": ${(error as Error).message}`;
      }

      return JSON.stringify({
        derived: definition.calculate?.(parsed) ?? {},
        warnings: definition.validate?.(parsed) ?? [],
      });
    },
  });

  return [
    get_project_context,
    get_tool_instance,
    list_tool_catalog,
    get_tool_guide,
    search_knowledge,
    recommend_tools,
    propose_project,
    propose_tool_instance,
    propose_field_updates,
    propose_tasks,
    run_calculation,
  ];
}
