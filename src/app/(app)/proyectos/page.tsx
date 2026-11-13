import Link from "next/link";
import { auth } from "@/server/auth";
import { getCurrentOrg } from "@/server/current-org";
import { listProjectsForUser } from "@/server/services/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TYPE_LABELS: Record<string, string> = {
  PREDICTIVO: "Predictivo",
  AGIL_SCRUM: "Ágil / Scrum",
  HIBRIDO: "Híbrido",
  MEJORA_LEAN: "Mejora continua (Lean)",
  MEJORA_SIX_SIGMA: "Mejora continua (Six Sigma)",
  ANALISIS_NEGOCIO: "Análisis de negocio",
  BIM: "BIM",
};

export default async function ProyectosPage() {
  const session = await auth();
  const currentOrg = await getCurrentOrg(session!.user.id);
  const projects = currentOrg ? await listProjectsForUser(session!.user.id, currentOrg.orgId) : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Proyectos</h1>
          <p className="text-muted-foreground">Proyectos de {currentOrg?.org.name} donde participas</p>
        </div>
        <Button nativeButton={false} render={<Link href="/proyectos/nuevo">Nuevo proyecto</Link>} />
      </div>

      {projects.length === 0 ? (
        <p className="text-sm text-muted-foreground">Todavía no tienes proyectos. Crea el primero.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/proyectos/${project.id}`}>
              <Card className="h-full transition-colors hover:border-primary">
                <CardHeader>
                  <CardTitle className="text-base">{project.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{TYPE_LABELS[project.type]}</Badge>
                    <Badge variant="outline">{project.status}</Badge>
                  </div>
                  <p>
                    {project._count.tools} herramienta(s) · {project._count.tasks} tarea(s)
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
