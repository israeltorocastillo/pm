import type { MethodWarning } from "@/tools/_types";
import type { CincoPorquesData } from "./schema";

const BLAME_HINTS = ["culpa", "falla de", "error de", "negligencia de", "descuido de", "responsabilidad de"];

export function calculate(data: CincoPorquesData) {
  const totalPasos = data.cadena.length;
  const pasosConEvidencia = data.cadena.filter((p) => p.evidencia.length > 0).length;
  const pasosSinEvidencia = totalPasos - pasosConEvidencia;

  return { totalPasos, pasosConEvidencia, pasosSinEvidencia };
}

export function validate(data: CincoPorquesData): MethodWarning[] {
  const warnings: MethodWarning[] = [];

  if (data.cadena.length < 3) {
    warnings.push({
      code: "cadena_corta",
      message: "Profundiza al menos 3 porqués para acercarte a la causa raíz.",
      severity: "warning",
    });
  }

  data.cadena.forEach((paso) => {
    const respuesta = paso.respuesta.toLowerCase();
    if (BLAME_HINTS.some((hint) => respuesta.includes(hint))) {
      warnings.push({
        code: `culpa_persona_${paso.porQueN}`,
        message: `La respuesta del porqué #${paso.porQueN} parece culpar a una persona: pregunta por el sistema que lo permitió.`,
        severity: "warning",
      });
    }
  });

  const hipotesis = data.cadena.filter((p) => p.evidencia.length === 0).map((p) => p.porQueN);
  if (hipotesis.length > 0) {
    warnings.push({
      code: "pasos_sin_evidencia",
      message: `Los siguientes porqués son hipótesis sin evidencia: ${hipotesis.join(", ")}.`,
      severity: "info",
    });
  }

  if (!data.causaRaizCandidata.trim()) {
    warnings.push({
      code: "sin_causa_raiz",
      message: "Falta la causa raíz candidata.",
      severity: "warning",
    });
  }

  return warnings;
}
