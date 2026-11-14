import Link from "next/link";
import { auth } from "@/server/auth";
import { getToolInstanceDetail } from "@/server/services/tool-instances";
import { ToolInstanceWorkspace } from "@/components/tools/tool-instance-workspace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatPanel } from "@/components/ai/chat-panel";

export default async function ToolInstancePage({
  params,
}: {
  params: Promise<{ projectId: string; instanceId: string }>;
}) {
  const { projectId, instanceId } = await params;
  const session = await auth();
  const { instance, definition, myRole } = await getToolInstanceDetail(session!.user.id, instanceId);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1">
        <div className="mb-4">
          <Link href={`/proyectos/${projectId}`} className="text-sm text-muted-foreground hover:underline">
            ← Volver al proyecto
          </Link>
          <h1 className="text-2xl font-semibold">{instance.title}</h1>
          <p className="text-muted-foreground">{definition.description}</p>
        </div>
        <ToolInstanceWorkspace
          instanceId={instance.id}
          projectId={projectId}
          toolId={instance.toolId}
          status={instance.status}
          myRole={myRole}
          initialData={instance.data}
        />
      </div>
      <aside className="w-full shrink-0 lg:w-72">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Preguntas guía</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal space-y-2 pl-4 text-sm text-muted-foreground">
              {definition.ai.guideQuestions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
        {definition.ai.knowledgeRefs.length > 0 && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Teoría relacionada</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 text-sm">
              {definition.ai.knowledgeRefs.map((ref) => (
                <Link key={ref} href={`/conocimiento/${ref}`} className="text-primary hover:underline">
                  {ref}
                </Link>
              ))}
            </CardContent>
          </Card>
        )}
      </aside>
      <div className="fixed bottom-4 right-4 z-10">
        <ChatPanel projectId={projectId} instanceId={instance.id} />
      </div>
    </div>
  );
}
