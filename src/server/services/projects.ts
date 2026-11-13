import type { ProjectRole, ProjectStatus, ProjectType } from "@prisma/client";
import { db } from "@/server/db";
import { requireOrgAccess, requireProjectAccess } from "@/server/authz";

export async function createProject(input: {
  creatorId: string;
  orgId: string;
  name: string;
  description?: string;
  type: ProjectType;
  objective?: string;
  problemStatement?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  await requireOrgAccess(input.creatorId, input.orgId, "MEMBER");

  return db.project.create({
    data: {
      orgId: input.orgId,
      name: input.name,
      description: input.description,
      type: input.type,
      objective: input.objective,
      problemStatement: input.problemStatement,
      startDate: input.startDate,
      endDate: input.endDate,
      members: {
        create: { userId: input.creatorId, role: "OWNER" },
      },
    },
  });
}

export async function addProjectMember(input: {
  actingUserId: string;
  projectId: string;
  userId: string;
  role: ProjectRole;
}) {
  await requireProjectAccess(input.actingUserId, input.projectId, "OWNER");

  return db.projectMember.upsert({
    where: { projectId_userId: { projectId: input.projectId, userId: input.userId } },
    update: { role: input.role },
    create: { projectId: input.projectId, userId: input.userId, role: input.role },
  });
}

export async function listProjectsForUser(userId: string, orgId: string) {
  return db.project.findMany({
    where: { orgId, members: { some: { userId } } },
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { tools: true, tasks: true } } },
  });
}

export async function getProjectDetail(userId: string, projectId: string) {
  const membership = await requireProjectAccess(userId, projectId, "VIEWER");

  const project = await db.project.findUniqueOrThrow({
    where: { id: projectId },
    include: {
      members: { include: { user: true } },
      tools: { orderBy: { createdAt: "asc" } },
      tasks: { orderBy: { createdAt: "desc" } },
    },
  });

  return { project, myRole: membership.role };
}

export async function updateProjectStatus(input: {
  userId: string;
  projectId: string;
  status: ProjectStatus;
}) {
  await requireProjectAccess(input.userId, input.projectId, "EDITOR");

  return db.project.update({
    where: { id: input.projectId },
    data: { status: input.status },
  });
}

export async function createTask(input: {
  userId: string;
  projectId: string;
  title: string;
  description?: string;
  assigneeId?: string;
  dueDate?: Date;
}) {
  await requireProjectAccess(input.userId, input.projectId, "EDITOR");

  return db.task.create({
    data: {
      projectId: input.projectId,
      title: input.title,
      description: input.description,
      assigneeId: input.assigneeId,
      dueDate: input.dueDate,
    },
  });
}

export async function updateTaskStatus(input: {
  userId: string;
  projectId: string;
  taskId: string;
  status: "POR_HACER" | "EN_CURSO" | "HECHO" | "BLOQUEADO";
}) {
  await requireProjectAccess(input.userId, input.projectId, "EDITOR");

  return db.task.update({
    where: { id: input.taskId },
    data: { status: input.status },
  });
}
