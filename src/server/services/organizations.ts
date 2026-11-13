import bcrypt from "bcryptjs";
import type { OrgRole } from "@prisma/client";
import { db } from "@/server/db";
import { requireOrgAccess } from "@/server/authz";

export class EmailInUseError extends Error {
  constructor() {
    super("Ya existe una cuenta activa con ese email");
    this.name = "EmailInUseError";
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Email o contraseña incorrectos");
    this.name = "InvalidCredentialsError";
  }
}

/** Registro inicial: crea una organización nueva y su primer usuario (ADMIN). */
export async function registerWithNewOrganization(input: {
  orgName: string;
  name: string;
  email: string;
  password: string;
}) {
  const existing = await db.user.findUnique({ where: { email: input.email } });
  if (existing?.passwordHash) throw new EmailInUseError();

  const passwordHash = await bcrypt.hash(input.password, 12);

  return db.$transaction(async (tx) => {
    const org = await tx.organization.create({ data: { name: input.orgName } });

    const user = existing
      ? await tx.user.update({
          where: { id: existing.id },
          data: { name: input.name, passwordHash },
        })
      : await tx.user.create({
          data: { name: input.name, email: input.email, passwordHash },
        });

    await tx.membership.create({
      data: { userId: user.id, orgId: org.id, role: "ADMIN" },
    });

    return { userId: user.id, orgId: org.id };
  });
}

/**
 * Invita a un email a una organización. Si el usuario no existe aún, crea un
 * registro "pendiente" (sin passwordHash) que la persona activa al registrarse
 * con ese mismo email.
 */
export async function inviteMember(input: {
  actingUserId: string;
  orgId: string;
  email: string;
  role: OrgRole;
}) {
  await requireOrgAccess(input.actingUserId, input.orgId, "ADMIN");

  let user = await db.user.findUnique({ where: { email: input.email } });
  if (!user) {
    user = await db.user.create({
      data: { email: input.email, name: input.email.split("@")[0] },
    });
  }

  const membership = await db.membership.upsert({
    where: { userId_orgId: { userId: user.id, orgId: input.orgId } },
    update: { role: input.role },
    create: { userId: user.id, orgId: input.orgId, role: input.role },
  });

  return { membership, pending: !user.passwordHash };
}

export async function listOrgMembers(orgId: string) {
  const memberships = await db.membership.findMany({
    where: { orgId },
    include: { user: true },
    orderBy: { user: { name: "asc" } },
  });

  return memberships.map((m) => ({
    userId: m.userId,
    name: m.user.name,
    email: m.user.email,
    role: m.role,
    pending: !m.user.passwordHash,
  }));
}

/** Completa el registro de un usuario invitado (ya tiene Membership, le falta contraseña). */
export async function completeInvitedUser(input: {
  email: string;
  name: string;
  password: string;
}) {
  const user = await db.user.findUnique({ where: { email: input.email } });
  if (!user || user.passwordHash) throw new InvalidCredentialsError();

  const passwordHash = await bcrypt.hash(input.password, 12);
  await db.user.update({
    where: { id: user.id },
    data: { name: input.name, passwordHash },
  });

  return { userId: user.id };
}
