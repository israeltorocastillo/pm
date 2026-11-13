import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { getCurrentOrg } from "@/server/current-org";
import { getUserOrganizations } from "@/server/authz";
import { NavLinks } from "@/components/layout/nav-links";
import { OrgSwitcher } from "@/components/layout/org-switcher";
import { Button } from "@/components/ui/button";
import { logoutAction } from "./actions";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user.id) redirect("/login");

  const currentOrg = await getCurrentOrg(session.user.id);
  if (!currentOrg) redirect("/login");

  const memberships = await getUserOrganizations(session.user.id);

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col gap-4 border-r bg-sidebar p-4">
        <div className="px-3 text-sm font-semibold">Plataforma PM</div>
        <NavLinks showAdmin={currentOrg.role === "ADMIN"} />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b px-6">
          <OrgSwitcher
            organizations={memberships.map((m) => ({ orgId: m.orgId, name: m.org.name }))}
            currentOrgId={currentOrg.orgId}
          />
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{session.user.name}</span>
            <form action={logoutAction}>
              <Button type="submit" variant="outline" size="sm">
                Cerrar sesión
              </Button>
            </form>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
