import { db } from "@/server/db";
import { requireProjectAccess } from "@/server/authz";
import { getToolDefinition } from "@/tools/registry";

export class UnknownToolError extends Error {
  constructor(toolId: string) {
    super(`Herramienta desconocida: ${toolId}`);
    this.name = "UnknownToolError";
  }
}

function definitionOrThrow(toolId: string) {
  const definition = getToolDefinition(toolId);
  if (!definition) throw new UnknownToolError(toolId);
  return definition;
}

export async function createToolInstance(input: {
  userId: string;
  projectId: string;
  toolId: string;
  title?: string;
  initialData?: unknown;
  sourceInstanceId?: string;
}) {
  await requireProjectAccess(input.userId, input.projectId, "EDITOR");
  const definition = definitionOrThrow(input.toolId);

  const data = input.initialData ? definition.schema.parse(input.initialData) : definition.emptyData();
  const derived = definition.calculate?.(data) ?? {};

  return db.toolInstance.create({
    data: {
      projectId: input.projectId,
      toolId: input.toolId,
      title: input.title ?? definition.name,
      data: data as object,
      derived: derived as object,
      schemaVersion: definition.schemaVersion,
      createdById: input.userId,
      sourceInstanceId: input.sourceInstanceId,
      versions: {
        create: { data: data as object, version: 1, authorId: input.userId, authorType: "USER" },
      },
    },
  });
}

export async function getToolInstanceDetail(userId: string, instanceId: string) {
  const instance = await db.toolInstance.findUniqueOrThrow({ where: { id: instanceId } });
  const membership = await requireProjectAccess(userId, instance.projectId, "VIEWER");
  const definition = definitionOrThrow(instance.toolId);

  return { instance, definition, myRole: membership.role };
}

export async function saveToolInstanceData(input: { userId: string; instanceId: string; data: unknown }) {
  const instance = await db.toolInstance.findUniqueOrThrow({ where: { id: input.instanceId } });
  await requireProjectAccess(input.userId, instance.projectId, "EDITOR");
  const definition = definitionOrThrow(instance.toolId);

  const data = definition.schema.parse(input.data);
  const derived = definition.calculate?.(data) ?? {};
  const warnings = definition.validate?.(data) ?? [];

  const lastVersion = await db.toolVersion.findFirst({
    where: { instanceId: input.instanceId },
    orderBy: { version: "desc" },
  });

  const updated = await db.$transaction([
    db.toolInstance.update({
      where: { id: input.instanceId },
      data: { data: data as object, derived: derived as object },
    }),
    db.toolVersion.create({
      data: {
        instanceId: input.instanceId,
        data: data as object,
        version: (lastVersion?.version ?? 0) + 1,
        authorId: input.userId,
        authorType: "USER",
      },
    }),
  ]);

  return { instance: updated[0], warnings };
}

export async function updateToolInstanceStatus(input: {
  userId: string;
  instanceId: string;
  status: "BORRADOR" | "EN_REVISION" | "APROBADO";
}) {
  const instance = await db.toolInstance.findUniqueOrThrow({ where: { id: input.instanceId } });
  await requireProjectAccess(input.userId, instance.projectId, "EDITOR");

  return db.toolInstance.update({ where: { id: input.instanceId }, data: { status: input.status } });
}

/** Crea una nueva instancia a partir de otra, usando la conexión `feeds` declarada por la herramienta de origen. */
export async function feedToolInstance(input: {
  userId: string;
  sourceInstanceId: string;
  targetToolId: string;
}) {
  const source = await db.toolInstance.findUniqueOrThrow({ where: { id: input.sourceInstanceId } });
  await requireProjectAccess(input.userId, source.projectId, "EDITOR");

  const sourceDefinition = definitionOrThrow(source.toolId);
  const feed = sourceDefinition.connections.feeds.find((f) => f.toolId === input.targetToolId);
  if (!feed) {
    throw new UnknownToolError(`${source.toolId} no alimenta a ${input.targetToolId}`);
  }

  const sourceData = sourceDefinition.schema.parse(source.data);
  const mapped = feed.map(sourceData);

  return createToolInstance({
    userId: input.userId,
    projectId: source.projectId,
    toolId: input.targetToolId,
    initialData: mapped,
    sourceInstanceId: source.id,
  });
}

/** Crea tareas del proyecto a partir de `connections.feedsTasks` (ej. acciones de un A3). */
export async function feedToolInstanceTasks(input: { userId: string; sourceInstanceId: string }) {
  const source = await db.toolInstance.findUniqueOrThrow({ where: { id: input.sourceInstanceId } });
  await requireProjectAccess(input.userId, source.projectId, "EDITOR");

  const sourceDefinition = definitionOrThrow(source.toolId);
  if (!sourceDefinition.connections.feedsTasks) {
    throw new UnknownToolError(`${source.toolId} no genera tareas`);
  }

  const sourceData = sourceDefinition.schema.parse(source.data);
  const tasks = sourceDefinition.connections.feedsTasks(sourceData);

  return db.$transaction(
    tasks.map((task) =>
      db.task.create({
        data: { projectId: source.projectId, title: task.title, sourceInstanceId: source.id },
      }),
    ),
  );
}
