import { beforeEach, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import {
  registerWithNewOrganization,
  inviteMember,
  completeInvitedUser,
  EmailInUseError,
  InvalidCredentialsError,
} from "@/server/services/organizations";
import { AccessDeniedError } from "@/server/authz";

beforeEach(async () => {
  await db.membership.deleteMany();
  await db.user.deleteMany();
  await db.organization.deleteMany();
});

describe("registerWithNewOrganization", () => {
  it("crea la organización, el usuario y lo deja como ADMIN", async () => {
    const { userId, orgId } = await registerWithNewOrganization({
      orgName: "Acme",
      name: "Ada",
      email: "ada@acme.test",
      password: "supersecreto",
    });

    const membership = await db.membership.findUniqueOrThrow({
      where: { userId_orgId: { userId, orgId } },
    });
    expect(membership.role).toBe("ADMIN");

    const user = await db.user.findUniqueOrThrow({ where: { id: userId } });
    expect(user.passwordHash).not.toBeNull();
  });

  it("rechaza un email que ya tiene cuenta activa", async () => {
    await registerWithNewOrganization({
      orgName: "Acme",
      name: "Ada",
      email: "ada@acme.test",
      password: "supersecreto",
    });

    await expect(
      registerWithNewOrganization({
        orgName: "Otra",
        name: "Ada 2",
        email: "ada@acme.test",
        password: "otraclave1",
      }),
    ).rejects.toBeInstanceOf(EmailInUseError);
  });
});

describe("inviteMember + completeInvitedUser", () => {
  it("invita a un email nuevo como pendiente y permite activarlo", async () => {
    const { userId: adminId, orgId } = await registerWithNewOrganization({
      orgName: "Acme",
      name: "Ada",
      email: "ada@acme.test",
      password: "supersecreto",
    });

    const { pending } = await inviteMember({
      actingUserId: adminId,
      orgId,
      email: "bob@acme.test",
      role: "MEMBER",
    });
    expect(pending).toBe(true);

    await completeInvitedUser({
      email: "bob@acme.test",
      name: "Bob",
      password: "otraclave1",
    });

    const membership = await db.membership.findFirstOrThrow({
      where: { orgId, user: { email: "bob@acme.test" } },
      include: { user: true },
    });
    expect(membership.role).toBe("MEMBER");
    expect(membership.user.passwordHash).not.toBeNull();
  });

  it("rechaza invitar si quien invita no es ADMIN", async () => {
    const { orgId } = await registerWithNewOrganization({
      orgName: "Acme",
      name: "Ada",
      email: "ada@acme.test",
      password: "supersecreto",
    });
    const { userId: memberId } = await registerWithNewOrganization({
      orgName: "Otra org",
      name: "Mem",
      email: "mem@acme.test",
      password: "supersecreto",
    });

    await expect(
      inviteMember({ actingUserId: memberId, orgId, email: "x@acme.test", role: "MEMBER" }),
    ).rejects.toBeInstanceOf(AccessDeniedError);
  });

  it("rechaza activar una cuenta sin invitación pendiente", async () => {
    await expect(
      completeInvitedUser({ email: "nadie@acme.test", name: "Nadie", password: "clave1234" }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
