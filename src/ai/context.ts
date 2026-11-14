import { db } from "@/server/db";
import { getToolDefinition } from "@/tools/registry";

export type ChatContext = {
  orgId: string;
  projectId?: string;
  instanceId?: string;
  expertise: string;
};

/** Texto de contexto variable, va al final del prompt (fuera del bloque cacheado). */
export async function buildContextPreamble(ctx: ChatContext): Promise<string> {
  const lines: string[] = [`Nivel de experiencia metodológica del usuario: ${ctx.expertise}.`];

  if (ctx.projectId) {
    const project = await db.project.findUnique({ where: { id: ctx.projectId } });
    if (project) {
      lines.push(
        `Proyecto actual: "${project.name}" (tipo ${project.type}, estado ${project.status}).`,
        project.problemStatement ? `Problema declarado: ${project.problemStatement}` : "Aún no tiene problema declarado.",
      );
    }
  } else {
    lines.push("No hay un proyecto abierto todavía: si el usuario describe un problema, sigue el flujo de descubrimiento.");
  }

  if (ctx.instanceId) {
    const instance = await db.toolInstance.findUnique({ where: { id: ctx.instanceId } });
    if (instance) {
      const definition = getToolDefinition(instance.toolId);
      lines.push(
        `Herramienta abierta: "${instance.title}" (${definition?.name ?? instance.toolId}), estado ${instance.status}, instanceId=${instance.id}.`,
      );
    }
  }

  return lines.join("\n");
}
