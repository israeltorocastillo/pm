import type { MethodWarning } from "@/tools/_types";
import type { A3MejoraData } from "./schema";

export function calculate(data: A3MejoraData) {
  const totalSoluciones = data.b4DisenoSoluciones.length;
  const totalAcciones = data.b5Implementacion.length;
  const accionesCerradas = data.b5Implementacion.filter((a) => a.estado === "cerrada").length;

  return {
    totalSoluciones,
    totalAcciones,
    accionesCerradas,
  };
}

export function validate(data: A3MejoraData): MethodWarning[] {
  const warnings: MethodWarning[] = [];

  data.b4DisenoSoluciones.forEach((s) => {
    if (!s.causaRef.trim()) {
      warnings.push({
        code: "solucion_sin_causa",
        message: "la solución no está vinculada a una causa raíz",
        severity: "info",
      });
    }
  });

  if (data.b5Implementacion.length === 0) {
    warnings.push({
      code: "sin_acciones_implementacion",
      message: "faltan acciones de implementación",
      severity: "warning",
    });
  }

  if (!data.b6Seguimiento.trim()) {
    warnings.push({
      code: "sin_plan_seguimiento",
      message: "falta describir cómo se sostendrá el resultado (plan de control)",
      severity: "warning",
    });
  }

  return warnings;
}
