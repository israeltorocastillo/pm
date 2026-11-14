import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { getCurrentOrg } from "@/server/current-org";
import { listOrgMembers } from "@/server/services/organizations";
import { getOrgUsageSummary } from "@/server/services/ai-usage";
import { InviteMemberForm } from "@/components/admin/invite-member-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function AdminPage() {
  const session = await auth();
  const currentOrg = await getCurrentOrg(session!.user.id);
  if (!currentOrg || currentOrg.role !== "ADMIN") redirect("/dashboard");

  const members = await listOrgMembers(currentOrg.orgId);
  const usage = await getOrgUsageSummary(currentOrg.orgId);

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="text-muted-foreground">Miembros de {currentOrg.org.name}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invitar miembro</CardTitle>
        </CardHeader>
        <CardContent>
          <InviteMemberForm orgId={currentOrg.orgId} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Miembros ({members.length})</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {members.map((member, i) => (
            <div key={member.userId}>
              {i > 0 && <Separator className="mb-3" />}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">{member.role}</span>
                  {member.pending && (
                    <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      Pendiente de activar
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uso de IA este mes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {usage.requests} solicitudes · {usage.inputTokens.toLocaleString("es-CL")} tokens de entrada ·{" "}
          {usage.outputTokens.toLocaleString("es-CL")} tokens de salida
        </CardContent>
      </Card>
    </div>
  );
}
