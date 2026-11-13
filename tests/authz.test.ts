import { beforeEach, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { requireOrgAccess, getUserOrganizations, AccessDeniedError } from "@/server/authz";

async function createOrgWithUser(role: "ADMIN" | "MEMBER" | "VIEWER") {
  const org = await db.organization.create({ data: { name: `Org ${role} ${Date.now()}` } });
  const user = await db.user.create({
    data: { email: `${role.toLowerCase()}-${Date.now()}@test.local`, name: role },
  });
  await db.membership.create({ data: { userId: user.id, orgId: org.id, role } });
  return { org, user };
}

beforeEach(async () => {
  await db.membership.deleteMany();
  await db.user.deleteMany();
  await db.organization.deleteMany();
});

describe("requireOrgAccess", () => {
  it("permite acceso cuando el rol cumple el mínimo requerido", async () => {
    const { org, user } = await createOrgWithUser("ADMIN");
    const membership = await requireOrgAccess(user.id, org.id, "MEMBER");
    expect(membership.role).toBe("ADMIN");
  });

  it("rechaza cuando el rol es menor al mínimo requerido", async () => {
    const { org, user } = await createOrgWithUser("VIEWER");
    await expect(requireOrgAccess(user.id, org.id, "ADMIN")).rejects.toBeInstanceOf(
      AccessDeniedError,
    );
  });

  it("rechaza a un usuario de otra organización (aislamiento multi-tenant)", async () => {
    const { user: outsider } = await createOrgWithUser("ADMIN");
    const { org: otherOrg } = await createOrgWithUser("ADMIN");

    await expect(requireOrgAccess(outsider.id, otherOrg.id, "VIEWER")).rejects.toBeInstanceOf(
      AccessDeniedError,
    );
  });
});

describe("getUserOrganizations", () => {
  it("solo devuelve las organizaciones del usuario, no las de otros", async () => {
    const { org, user } = await createOrgWithUser("MEMBER");
    await createOrgWithUser("ADMIN");

    const memberships = await getUserOrganizations(user.id);

    expect(memberships).toHaveLength(1);
    expect(memberships[0].orgId).toBe(org.id);
  });
});
