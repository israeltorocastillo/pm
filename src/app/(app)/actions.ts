"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, signOut } from "@/server/auth";
import { setCurrentOrgCookie } from "@/server/current-org";
import { inviteMember } from "@/server/services/organizations";
import { AccessDeniedError } from "@/server/authz";

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}

export async function switchOrgAction(formData: FormData) {
  const orgId = String(formData.get("orgId") ?? "");
  if (!orgId) return;
  await setCurrentOrgCookie(orgId);
  revalidatePath("/", "layout");
}

export type InviteState = { error: string | null; success: string | null };

const inviteSchema = z.object({
  orgId: z.string().min(1),
  email: z.string().trim().email("Email inválido"),
  role: z.enum(["ADMIN", "MEMBER", "VIEWER"]),
});

export async function inviteMemberAction(
  _prevState: InviteState,
  formData: FormData,
): Promise<InviteState> {
  const session = await auth();
  if (!session?.user.id) redirect("/login");

  const parsed = inviteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos", success: null };
  }

  try {
    const { pending } = await inviteMember({
      actingUserId: session.user.id,
      orgId: parsed.data.orgId,
      email: parsed.data.email,
      role: parsed.data.role,
    });
    revalidatePath("/admin");
    return {
      error: null,
      success: pending
        ? `Invitación creada. ${parsed.data.email} debe activarla en /activar.`
        : `${parsed.data.email} ya tenía cuenta y fue agregado a la organización.`,
    };
  } catch (error) {
    if (error instanceof AccessDeniedError) {
      return { error: "Solo un administrador puede invitar miembros", success: null };
    }
    throw error;
  }
}
