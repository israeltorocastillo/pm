"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/server/auth";
import {
  createToolInstance,
  saveToolInstanceData,
  updateToolInstanceStatus,
  feedToolInstance,
} from "@/server/services/tool-instances";

const createSchema = z.object({
  projectId: z.string().min(1),
  toolId: z.string().min(1),
});

export async function createToolInstanceAction(formData: FormData) {
  const session = await auth();
  if (!session?.user.id) redirect("/login");

  const parsed = createSchema.parse(Object.fromEntries(formData));
  const instance = await createToolInstance({
    userId: session.user.id,
    projectId: parsed.projectId,
    toolId: parsed.toolId,
  });

  redirect(`/proyectos/${parsed.projectId}/herramientas/${instance.id}`);
}

export async function saveToolInstanceAction(instanceId: string, data: unknown) {
  const session = await auth();
  if (!session?.user.id) throw new Error("No autenticado");

  const result = await saveToolInstanceData({ userId: session.user.id, instanceId, data });
  revalidatePath(`/proyectos`);
  return { derived: result.instance.derived, warnings: result.warnings };
}

const statusSchema = z.object({
  instanceId: z.string().min(1),
  projectId: z.string().min(1),
  status: z.enum(["BORRADOR", "EN_REVISION", "APROBADO"]),
});

export async function updateToolInstanceStatusAction(formData: FormData) {
  const session = await auth();
  if (!session?.user.id) redirect("/login");

  const parsed = statusSchema.parse(Object.fromEntries(formData));
  await updateToolInstanceStatus({ userId: session.user.id, instanceId: parsed.instanceId, status: parsed.status });
  revalidatePath(`/proyectos/${parsed.projectId}/herramientas/${parsed.instanceId}`);
}

const feedSchema = z.object({
  projectId: z.string().min(1),
  sourceInstanceId: z.string().min(1),
  targetToolId: z.string().min(1),
});

export async function feedToolInstanceAction(formData: FormData) {
  const session = await auth();
  if (!session?.user.id) redirect("/login");

  const parsed = feedSchema.parse(Object.fromEntries(formData));
  const instance = await feedToolInstance({
    userId: session.user.id,
    sourceInstanceId: parsed.sourceInstanceId,
    targetToolId: parsed.targetToolId,
  });

  redirect(`/proyectos/${parsed.projectId}/herramientas/${instance.id}`);
}
