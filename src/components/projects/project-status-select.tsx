"use client";

import { updateProjectStatusAction } from "@/app/(app)/proyectos/actions";

const STATUS_OPTIONS = [
  { value: "IDEA", label: "Idea" },
  { value: "EVALUACION", label: "Evaluación" },
  { value: "EN_CURSO", label: "En curso" },
  { value: "EN_PAUSA", label: "En pausa" },
  { value: "CERRADO", label: "Cerrado" },
  { value: "CANCELADO", label: "Cancelado" },
];

export function ProjectStatusSelect({
  projectId,
  status,
  disabled,
}: {
  projectId: string;
  status: string;
  disabled?: boolean;
}) {
  return (
    <form action={updateProjectStatusAction}>
      <input type="hidden" name="projectId" value={projectId} />
      <select
        name="status"
        defaultValue={status}
        disabled={disabled}
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
  );
}
