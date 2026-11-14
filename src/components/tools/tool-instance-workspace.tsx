"use client";

import { useState, useTransition } from "react";
import { getToolDefinition } from "@/tools/registry";
import {
  saveToolInstanceAction,
  updateToolInstanceStatusAction,
  feedToolInstanceAction,
  feedToolInstanceTasksAction,
} from "@/app/(app)/proyectos/[projectId]/herramientas/actions";
import { Button } from "@/components/ui/button";
import type { MethodWarning } from "@/tools/_types";

const STATUS_OPTIONS = [
  { value: "BORRADOR", label: "Borrador" },
  { value: "EN_REVISION", label: "En revisión" },
  { value: "APROBADO", label: "Aprobado" },
];

export function ToolInstanceWorkspace({
  instanceId,
  projectId,
  toolId,
  status,
  myRole,
  initialData,
}: {
  instanceId: string;
  projectId: string;
  toolId: string;
  status: string;
  myRole: "OWNER" | "EDITOR" | "VIEWER";
  initialData: unknown;
}) {
  const definition = getToolDefinition(toolId);
  const [data, setData] = useState(initialData);
  const [warnings, setWarnings] = useState<MethodWarning[]>(
    () => definition?.validate?.(initialData as never) ?? [],
  );
  const [dirty, setDirty] = useState(false);
  const [isPending, startTransition] = useTransition();
  const canEdit = myRole !== "VIEWER";

  if (!definition) return <p className="text-destructive">Herramienta desconocida: {toolId}</p>;

  function handleChange(next: unknown) {
    setData(next);
    setDirty(true);
    setWarnings(definition!.validate?.(next as never) ?? []);
  }

  function handleSave() {
    startTransition(async () => {
      await saveToolInstanceAction(instanceId, data);
      setDirty(false);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <form action={updateToolInstanceStatusAction} className="flex items-center gap-2">
          <input type="hidden" name="instanceId" value={instanceId} />
          <input type="hidden" name="projectId" value={projectId} />
          <select
            name="status"
            defaultValue={status}
            disabled={!canEdit}
            onChange={(e) => e.currentTarget.form?.requestSubmit()}
            className="h-9 rounded-md border border-input bg-background px-2 text-sm disabled:opacity-60"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </form>

        <div className="flex items-center gap-2">
          {definition.connections.feeds.map((feed) => (
            <form key={feed.toolId} action={feedToolInstanceAction}>
              <input type="hidden" name="projectId" value={projectId} />
              <input type="hidden" name="sourceInstanceId" value={instanceId} />
              <input type="hidden" name="targetToolId" value={feed.toolId} />
              <Button type="submit" variant="outline" size="sm">
                {feed.label}
              </Button>
            </form>
          ))}
          {definition.connections.feedsTasks && (
            <form action={feedToolInstanceTasksAction}>
              <input type="hidden" name="projectId" value={projectId} />
              <input type="hidden" name="sourceInstanceId" value={instanceId} />
              <Button type="submit" variant="outline" size="sm">
                Enviar acciones a tareas
              </Button>
            </form>
          )}
          {canEdit && (
            <Button type="button" size="sm" onClick={handleSave} disabled={!dirty || isPending}>
              {isPending ? "Guardando…" : dirty ? "Guardar cambios" : "Guardado"}
            </Button>
          )}
        </div>
      </div>

      {canEdit ? (
        <definition.Editor data={data as never} onChange={handleChange} warnings={warnings} />
      ) : (
        <definition.Viewer data={data as never} />
      )}
    </div>
  );
}
