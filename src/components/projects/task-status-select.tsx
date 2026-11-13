"use client";

import { updateTaskStatusAction } from "@/app/(app)/proyectos/actions";

const STATUS_OPTIONS = [
  { value: "POR_HACER", label: "Por hacer" },
  { value: "EN_CURSO", label: "En curso" },
  { value: "HECHO", label: "Hecho" },
  { value: "BLOQUEADO", label: "Bloqueado" },
];

export function TaskStatusSelect({
  projectId,
  taskId,
  status,
}: {
  projectId: string;
  taskId: string;
  status: string;
}) {
  return (
    <form action={updateTaskStatusAction}>
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="taskId" value={taskId} />
      <select
        name="status"
        defaultValue={status}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="h-8 rounded-md border border-input bg-background px-2 text-xs"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </form>
  );
}
