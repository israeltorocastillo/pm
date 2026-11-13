import { cookies } from "next/headers";
import { getUserOrganizations } from "@/server/authz";

const CURRENT_ORG_COOKIE = "currentOrgId";

/** Organización activa del usuario: la de la cookie si sigue siendo miembro, o la primera por nombre. */
export async function getCurrentOrg(userId: string) {
  const memberships = await getUserOrganizations(userId);
  if (memberships.length === 0) return null;

  const cookieStore = await cookies();
  const preferredOrgId = cookieStore.get(CURRENT_ORG_COOKIE)?.value;

  const preferred = memberships.find((m) => m.orgId === preferredOrgId);
  return preferred ?? memberships[0];
}

export async function setCurrentOrgCookie(orgId: string) {
  const cookieStore = await cookies();
  cookieStore.set(CURRENT_ORG_COOKIE, orgId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
}
