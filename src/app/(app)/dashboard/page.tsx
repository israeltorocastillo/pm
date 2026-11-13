import { auth } from "@/server/auth";
import { getCurrentOrg } from "@/server/current-org";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();
  const currentOrg = await getCurrentOrg(session!.user.id);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Inicio</h1>
        <p className="text-muted-foreground">
          Organización activa: {currentOrg?.org.name} · Tu rol: {currentOrg?.role}
        </p>
      </div>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Próximos pasos</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          En la próxima fase podrás crear proyectos y usar las primeras herramientas del
          catálogo (Project Charter, Ishikawa, Pareto).
        </CardContent>
      </Card>
    </div>
  );
}
