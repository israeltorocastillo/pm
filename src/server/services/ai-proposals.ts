import { db } from "@/server/db";
import { createProject, createTask } from "@/server/services/projects";
import { createToolInstance, saveToolInstanceData } from "@/server/services/tool-instances";
import { getToolDefinition } from "@/tools/registry";
import { isToolAvailable } from "@/ai/recommend";
import type { ProjectType } from "@prisma/client";

export type ProposalKind = "create_project" | "create_tool_instance" | "update_tool_fields" | "create_tasks";

export async function createProposal(input: {
  conversationId: string;
  kind: ProposalKind;
  payload: unknown;
}) {
  return db.aiProposal.create({
    data: {
      conversationId: input.conversationId,
      kind: input.kind,
      payload: input.payload as object,
    },
  });
}

export async function listPendingProposals(conversationId: string) {
  return db.aiProposal.findMany({
    where: { conversationId, status: "PENDIENTE" },
    orderBy: { createdAt: "asc" },
  });
}

export class ProposalAccessError extends Error {
  constructor() {
    super("Esta propuesta no pertenece a una conversación del usuario actual");
    this.name = "ProposalAccessError";
  }
}

async function applyProposal(input: {
  userId: string;
  kind: string;
  payload: Record<string, unknown>;
}) {
  switch (input.kind) {
    case "create_project": {
      const p = input.payload as {
        orgId: string;
        name: string;
        type: ProjectType;
        objective?: string;
        problemStatement?: string;
        route?: string[];
        charterDraft?: Record<string, unknown>;
      };

      const project = await createProject({
        creatorId: input.userId,
        orgId: p.orgId,
        name: p.name,
        type: p.type,
        objective: p.objective,
        problemStatement: p.problemStatement,
      });

      for (const toolId of p.route ?? []) {
        if (!isToolAvailable(toolId)) continue;
        await createToolInstance({
          userId: input.userId,
          projectId: project.id,
          toolId,
          initialData: toolId === "ficha-proyecto" ? p.charterDraft : undefined,
        });
      }

      return { redirectTo: `/proyectos/${project.id}` };
    }

    case "create_tool_instance": {
      const p = input.payload as { projectId: string; toolId: string; title?: string; data?: unknown };
      const instance = await createToolInstance({
        userId: input.userId,
        projectId: p.projectId,
        toolId: p.toolId,
        title: p.title,
        initialData: p.data,
      });
      return { redirectTo: `/proyectos/${p.projectId}/herramientas/${instance.id}` };
    }

    case "update_tool_fields": {
      const p = input.payload as { instanceId: string; changes: Record<string, unknown> };
      const instance = await db.toolInstance.findUniqueOrThrow({ where: { id: p.instanceId } });
      const definition = getToolDefinition(instance.toolId);
      if (!definition) throw new Error(`Herramienta desconocida: ${instance.toolId}`);

      const currentData = definition.schema.parse(instance.data) as Record<string, unknown>;
      const mergedData = { ...currentData, ...p.changes };
      await saveToolInstanceData({ userId: input.userId, instanceId: p.instanceId, data: mergedData });
      return { redirectTo: `/proyectos/${instance.projectId}/herramientas/${instance.id}` };
    }

    case "create_tasks": {
      const p = input.payload as { projectId: string; tasks: { title: string }[] };
      for (const task of p.tasks) {
        await createTask({ userId: input.userId, projectId: p.projectId, title: task.title });
      }
      return { redirectTo: `/proyectos/${p.projectId}` };
    }

    default:
      throw new Error(`Tipo de propuesta desconocido: ${input.kind}`);
  }
}

export async function decideProposal(input: {
  userId: string;
  proposalId: string;
  decision: "ACEPTADA" | "EDITADA" | "RECHAZADA";
  editedPayload?: Record<string, unknown>;
}) {
  const proposal = await db.aiProposal.findUniqueOrThrow({
    where: { id: input.proposalId },
    include: { conversation: true },
  });

  if (proposal.conversation.userId !== input.userId) {
    throw new ProposalAccessError();
  }

  let result: { redirectTo: string } | null = null;

  if (input.decision !== "RECHAZADA") {
    const payload = input.decision === "EDITADA" && input.editedPayload
      ? input.editedPayload
      : (proposal.payload as Record<string, unknown>);

    result = await applyProposal({ userId: input.userId, kind: proposal.kind, payload });
  }

  await db.aiProposal.update({
    where: { id: input.proposalId },
    data: {
      status: input.decision,
      decidedById: input.userId,
      decidedAt: new Date(),
      ...(input.decision === "EDITADA" && input.editedPayload ? { payload: input.editedPayload as object } : {}),
    },
  });

  return result;
}
