import type { MethodWarning } from "@/tools/_types";
import type { FilaControl, PlanControlData } from "./schema";

function filaEstaIncompleta(fila: FilaControl): boolean {
  return (
    !fila.indicadorNombre.trim() ||
    !fila.frecuencia.trim() ||
    !fila.responsable.trim() ||
    !fila.procedimientoReajuste.trim()
  );
}

function etiquetaFila(fila: FilaControl, index: number): string {
  return fila.procesoActividad.trim() || `fila ${index + 1}`;
}

export function calculate(data: PlanControlData) {
  const totalFilas = data.filas.length;
  const filasIncompletas = data.filas.filter(filaEstaIncompleta).length;

  return {
    totalFilas,
    filasIncompletas,
  };
}

export function validate(data: PlanControlData): MethodWarning[] {
  const warnings: MethodWarning[] = [];

  if (data.filas.length === 0) {
    warnings.push({
      code: "sin_filas",
      message: "Falta al menos un control.",
      severity: "warning",
    });
  }

  data.filas.forEach((fila, index) => {
    if (filaEstaIncompleta(fila)) {
      warnings.push({
        code: `fila_incompleta_${fila.id}`,
        message: `La fila "${etiquetaFila(fila, index)}" está incompleta: falta indicador, frecuencia, responsable o procedimiento de reajuste.`,
        severity: "warning",
      });
    }
  });

  return warnings;
}
