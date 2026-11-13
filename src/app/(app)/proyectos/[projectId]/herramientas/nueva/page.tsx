import { listToolDefinitions } from "@/tools/registry";
import { createToolInstanceAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function NuevaHerramientaPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const tools = listToolDefinitions();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Agregar herramienta</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Card key={tool.id}>
            <CardHeader>
              <CardTitle className="text-base">{tool.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
              <p>{tool.description}</p>
              <form action={createToolInstanceAction}>
                <input type="hidden" name="projectId" value={projectId} />
                <input type="hidden" name="toolId" value={tool.id} />
                <Button type="submit" size="sm">
                  Usar esta herramienta
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
