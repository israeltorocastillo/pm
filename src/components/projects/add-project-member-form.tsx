"use client";

import { useActionState } from "react";
import { addProjectMemberAction, type AddMemberState } from "@/app/(app)/proyectos/actions";
import { Button } from "@/components/ui/button";

const initialState: AddMemberState = { error: null };

export function AddProjectMemberForm({
  projectId,
  candidates,
}: {
  projectId: string;
  candidates: { userId: string; name: string; email: string }[];
}) {
  const [state, formAction, pending] = useActionState(addProjectMemberAction, initialState);

  if (candidates.length === 0) {
    return <p className="text-sm text-muted-foreground">Todos los miembros de la organización ya están en el proyecto.</p>;
  }

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-2">
      <input type="hidden" name="projectId" value={projectId} />
      <select name="userId" className="h-9 rounded-md border border-input bg-background px-2 text-sm">
        {candidates.map((c) => (
          <option key={c.userId} value={c.userId}>
            {c.name} ({c.email})
          </option>
        ))}
      </select>
      <select name="role" defaultValue="EDITOR" className="h-9 rounded-md border border-input bg-background px-2 text-sm">
        <option value="OWNER">Owner</option>
        <option value="EDITOR">Editor</option>
        <option value="VIEWER">Viewer</option>
      </select>
      <Button type="submit" size="sm" variant="outline" disabled={pending}>
        {pending ? "Agregando…" : "+ Agregar al proyecto"}
      </Button>
      {state.error && <p className="w-full text-sm text-destructive">{state.error}</p>}
    </form>
  );
}
