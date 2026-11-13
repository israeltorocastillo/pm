import Link from "next/link";
import { auth } from "@/server/auth";
import { getProjectDetail } from "@/server/services/projects";
import { listOrgMembers } from "@/server/services/organizations";
import { getToolDefinition } from "@/tools/registry";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectStatusSelect } from "@/components/projects/project-status-select";
import { TaskStatusSelect } from "@/components/projects/task-status-select";
import { AddTaskForm } from "@/components/projects/add-task-form";
import { AddProjectMemberForm } from "@/components/projects/add-project-member-form";

const dateFormatter = new Intl.DateTimeFormat("es-CL", { dateStyle: "medium" });

const TYPE_LABELS: Record<string, string> = {
  PREDICTIVO: "Predictivo",
  AGIL_SCRUM: "Ágil / Scrum",
  HIBRIDO: "Híbrido",
  MEJORA_LEAN: "Mejora continua (Lean)",
  MEJORA_SIX_SIGMA: "Mejora continua (Six Sigma)",
  ANALISIS_NEGOCIO: "Análisis de negocio",
  BIM: "BIM",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const session = await auth();
  const { project, myRole } = await getProjectDetail(session!.user.id, projectId);
  const canEdit = myRole !== "VIEWER";
  const isOwner = myRole === "OWNER";

  const orgMembers = isOwner ? await listOrgMembers(project.orgId) : [];
  const projectMemberIds = new Set(project.members.map((m) => m.userId));
  const candidates = orgMembers
    .filter((m) => !projectMemberIds.has(m.userId))
    .map((m) => ({ userId: m.userId, name: m.name, email: m.email }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{project.name}</h1>
          <p className="text-muted-foreground">{project.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{TYPE_LABELS[project.type]}</Badge>
            {(project.startDate || project.endDate) && (
              <span className="text-sm text-muted-foreground">
                {project.startDate ? dateFormatter.format(project.startDate) : "?"} –{" "}
                {project.endDate ? dateFormatter.format(project.endDate) : "?"}
              </span>
            )}
          </div>
        </div>
        <ProjectStatusSelect projectId={project.id} status={project.status} disabled={!canEdit} />
      </div>

      {project.problemStatement && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Problema u oportunidad</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">{project.problemStatement}</CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Herramientas en uso</CardTitle>
          {canEdit && (
            <Button
              size="sm"
              variant="outline"
              nativeButton={false}
              render={<Link href={`/proyectos/${project.id}/herramientas/nueva`}>+ Agregar herramienta</Link>}
            />
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {project.tools.length === 0 && (
            <p className="text-sm text-muted-foreground">Aún no hay herramientas en este proyecto.</p>
          )}
          {project.tools.map((instance) => {
            const definition = getToolDefinition(instance.toolId);
            return (
              <Link
                key={instance.id}
                href={`/proyectos/${project.id}/herramientas/${instance.id}`}
                className="flex items-center justify-between rounded-md border p-3 text-sm hover:border-primary"
              >
                <div>
                  <p className="font-medium">{instance.title}</p>
                  <p className="text-muted-foreground">{definition?.name ?? instance.toolId}</p>
                </div>
                <Badge variant="outline">{instance.status}</Badge>
              </Link>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tareas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {canEdit && <AddTaskForm projectId={project.id} />}
          {project.tasks.length === 0 && (
            <p className="text-sm text-muted-foreground">Sin tareas registradas.</p>
          )}
          {project.tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between rounded-md border p-2 text-sm">
              <span>{task.title}</span>
              <TaskStatusSelect projectId={project.id} taskId={task.id} status={task.status} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Equipo</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          {project.members.map((member) => (
            <div key={member.id} className="flex justify-between">
              <span>{member.user.name}</span>
              <span className="text-muted-foreground">{member.role}</span>
            </div>
          ))}
          {isOwner && <AddProjectMemberForm projectId={project.id} candidates={candidates} />}
        </CardContent>
      </Card>
    </div>
  );
}
