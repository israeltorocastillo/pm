"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/server/auth";
import { getCurrentOrg } from "@/server/current-org";
import {
  createProject,
  createTask,
  updateProjectStatus,
  updateTaskStatus,
  addProjectMember,
} from "@/server/services/projects";
import { createToolInstance } from "@/server/services/tool-instances";
import { AccessDeniedError } from "@/server/authz";
import { db } from "@/server/db";

export type ActionState = { error: string | null };

const PROJECT_TYPES = [
  "PREDICTIVO",
  "AGIL_SCRUM",
  "HIBRIDO",
  "MEJORA_LEAN",
  "MEJORA_SIX_SIGMA",
  "ANALISIS_NEGOCIO",
  "BIM",
] as const;

const createProjectSchema = z.object({
  name: z.string().trim().min(2, "El nombre es muy corto"),
  description: z.string().trim().optional(),
  type: z.enum(PROJECT_TYPES),
  objective: z.string().trim().optional(),
  problemStatement: z.string().trim().optional(),
  startDate: z.string().trim().optional(),
  endDate: z.string().trim().optional(),
});

export async function createProjectAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user.id) redirect("/login");

  const currentOrg = await getCurrentOrg(session.user.id);
  if (!currentOrg) redirect("/login");

  const parsed = createProjectSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const { startDate, endDate, ...rest } = parsed.data;
  const project = await createProject({
    creatorId: session.user.id,
    orgId: currentOrg.orgId,
    ...rest,
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
  });

  redirect(`/proyectos/${project.id}`);
}

const statusSchema = z.object({
  projectId: z.string().min(1),
  status: z.enum(["IDEA", "EVALUACION", "EN_CURSO", "EN_PAUSA", "CERRADO", "CANCELADO"]),
});

export async function updateProjectStatusAction(formData: FormData) {
  const session = await auth();
  if (!session?.user.id) redirect("/login");

  const parsed = statusSchema.parse(Object.fromEntries(formData));
  await updateProjectStatus({ userId: session.user.id, projectId: parsed.projectId, status: parsed.status });
  revalidatePath(`/proyectos/${parsed.projectId}`);
}

const createTaskSchema = z.object({
  projectId: z.string().min(1),
  title: z.string().trim().min(1, "Falta el título de la tarea"),
});

export async function createTaskAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const session = await auth();
  if (!session?.user.id) redirect("/login");

  const parsed = createTaskSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  await createTask({ userId: session.user.id, projectId: parsed.data.projectId, title: parsed.data.title });
  revalidatePath(`/proyectos/${parsed.data.projectId}`);
  return { error: null };
}

const taskStatusSchema = z.object({
  projectId: z.string().min(1),
  taskId: z.string().min(1),
  status: z.enum(["POR_HACER", "EN_CURSO", "HECHO", "BLOQUEADO"]),
});

export async function updateTaskStatusAction(formData: FormData) {
  const session = await auth();
  if (!session?.user.id) redirect("/login");

  const parsed = taskStatusSchema.parse(Object.fromEntries(formData));
  await updateTaskStatus({ ...parsed, userId: session.user.id });
  revalidatePath(`/proyectos/${parsed.projectId}`);
}

export type AddMemberState = { error: string | null };

const addMemberSchema = z.object({
  projectId: z.string().min(1),
  userId: z.string().min(1),
  role: z.enum(["OWNER", "EDITOR", "VIEWER"]),
});

export async function addProjectMemberAction(
  _prevState: AddMemberState,
  formData: FormData,
): Promise<AddMemberState> {
  const session = await auth();
  if (!session?.user.id) redirect("/login");

  const parsed = addMemberSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  try {
    await addProjectMember({ actingUserId: session.user.id, ...parsed.data });
  } catch (error) {
    if (error instanceof AccessDeniedError) {
      return { error: "Solo el dueño del proyecto puede agregar miembros" };
    }
    throw error;
  }

  revalidatePath(`/proyectos/${parsed.data.projectId}`);
  return { error: null };
}

/** "Cierre → lección aprendida": crea un borrador de lección aprendida prellenado con el problema del proyecto. */
export async function createLessonLearnedAction(formData: FormData) {
  const session = await auth();
  if (!session?.user.id) redirect("/login");

  const projectId = String(formData.get("projectId") ?? "");
  if (!projectId) redirect("/proyectos");

  const project = await db.project.findUniqueOrThrow({ where: { id: projectId } });

  const instance = await createToolInstance({
    userId: session.user.id,
    projectId,
    toolId: "leccion-aprendida",
    title: `Lección aprendida — ${project.name}`,
    initialData: {
      titulo: `Lección aprendida — ${project.name}`,
      contexto: project.description ?? "",
      problema: project.problemStatement ?? "",
      faseOrigen: "cierre_de_proyecto",
    },
  });

  redirect(`/proyectos/${projectId}/herramientas/${instance.id}`);
}
