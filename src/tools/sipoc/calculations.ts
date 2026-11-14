import type { MethodWarning } from "@/tools/_types";
import type { SipocData } from "./schema";

export function calculate(data: SipocData) {
  return {
    totalPasos: data.proceso.length,
    totalEntradas: data.entradas.length,
    totalSalidas: data.salidas.length,
  };
}

export function validate(data: SipocData): MethodWarning[] {
  const warnings: MethodWarning[] = [];

  if (data.proceso.length < 5 || data.proceso.length > 6) {
    warnings.push({
      code: "pasos_fuera_de_rango",
      message: "SIPOC recomienda 5 o 6 pasos de alto nivel; revisa el nivel de detalle.",
      severity: "warning",
    });
  }

  if (!data.limite_inicio.trim() || !data.limite_fin.trim()) {
    warnings.push({
      code: "sin_limites",
      message: "Falta definir el límite de inicio y/o de fin del proceso.",
      severity: "warning",
    });
  }

  return warnings;
}
