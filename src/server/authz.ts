import type { OrgRole, ProjectRole } from "@prisma/client";
import { db } from "@/server/db";

const ROLE_RANK: Record<OrgRole, number> = {
  VIEWER: 0,
  MEMBER: 1,
  ADMIN: 2,
};

const PROJECT_ROLE_RANK: Record<ProjectRole, number> = {
  VIEWER: 0,
  EDITOR: 1,
  OWNER: 2,
};

export class AccessDeniedError extends Error {
  constructor(message = "No tienes acceso a esta organización") {
    super(message);
    this.name = "AccessDeniedError";
  }
}

/**
 * Verifica que `userId` pertenezca a `orgId` con al menos el rol `minRole`.
 * Lanza AccessDeniedError si no cumple; toda Server Action/ruta que toque
 * datos de una organización debe pasar por aquí.
 */
export async function requireOrgAccess(
  userId: string,
  orgId: string,
  minRole: OrgRole = "VIEWER",
) {
  const membership = await db.membership.findUnique({
    where: { userId_orgId: { userId, orgId } },
  });

  if (!membership || ROLE_RANK[membership.role] < ROLE_RANK[minRole]) {
    throw new AccessDeniedError();
  }

  return membership;
}

export async function getUserOrganizations(userId: string) {
  return db.membership.findMany({
    where: { userId },
    include: { org: true },
    orderBy: { org: { name: "asc" } },
  });
}

/**
 * Verifica que `userId` sea miembro del proyecto con al menos el rol `minRole`.
 * Un proyecto solo es visible para quienes son ProjectMember de él (no basta
 * con pertenecer a la organización).
 */
export async function requireProjectAccess(
  userId: string,
  projectId: string,
  minRole: ProjectRole = "VIEWER",
) {
  const member = await db.projectMember.findUnique({
    where: { projectId_userId: { projectId, userId } },
  });

  if (!member || PROJECT_ROLE_RANK[member.role] < PROJECT_ROLE_RANK[minRole]) {
    throw new AccessDeniedError("No tienes acceso a este proyecto");
  }

  return member;
}

export async function getUserProjectMemberships(userId: string, orgId: string) {
  return db.projectMember.findMany({
    where: { userId, project: { orgId } },
    include: { project: true },
    orderBy: { project: { updatedAt: "desc" } },
  });
}
