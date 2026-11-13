"use client";

import { useActionState } from "react";
import { createTaskAction, type ActionState } from "@/app/(app)/proyectos/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: ActionState = { error: null };

export function AddTaskForm({ projectId }: { projectId: string }) {
  const [state, formAction, pending] = useActionState(createTaskAction, initialState);

  return (
    <form action={formAction} className="flex gap-2">
      <input type="hidden" name="projectId" value={projectId} />
      <Input name="title" placeholder="Nueva tarea" required className="flex-1" />
      <Button type="submit" variant="outline" disabled={pending}>
        {pending ? "Agregando…" : "+ Agregar"}
      </Button>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
    </form>
  );
}
