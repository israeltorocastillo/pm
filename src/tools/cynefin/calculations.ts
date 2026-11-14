import type { MethodWarning } from "@/tools/_types";
import type { CynefinData, EnfoqueSugerido } from "./schema";

export function computeEnfoqueSugerido(data: CynefinData): EnfoqueSugerido {
  const dominios = data.componentes.map((c) => c.dominio);

  if (dominios.some((d) => d === "caotico")) {
    return "estabilizar_primero";
  }

  const tienePredictivo = dominios.some((d) => d === "simple" || d === "complicado");
  const tieneComplejo = dominios.some((d) => d === "complejo");

  if (tienePredictivo && tieneComplejo) {
    return "hibrido";
  }

  if (tieneComplejo) {
    return "agil";
  }

  if (tienePredictivo) {
    return "predictivo";
  }

  return "predictivo";
}

export function calculate(data: CynefinData) {
  return {
    enfoqueSugerido: computeEnfoqueSugerido(data),
    totalComponentes: data.componentes.length,
  };
}

export function validate(data: CynefinData): MethodWarning[] {
  const warnings: MethodWarning[] = [];

  if (data.componentes.length === 0) {
    warnings.push({
      code: "sin_componentes",
      message: "Agrega al menos un componente para clasificar su dominio Cynefin.",
      severity: "warning",
    });
  }

  data.componentes.forEach((c, i) => {
    if (c.senales.length === 0) {
      warnings.push({
        code: `componente_sin_senales_${i}`,
        message: `El componente ${i + 1}${c.descripcion ? ` ("${c.descripcion}")` : ""} no tiene señales: falta evidencia que respalde la clasificación de dominio.`,
        severity: "info",
      });
    }
  });

  return warnings;
}
