import type { MethodWarning } from "@/tools/_types";
import type { FichaProyectoData } from "./schema";

const SOLUTION_HINTS = ["implementar", "comprar", "contratar", "desarrollar un sistema", "capacitar"];
const CAUSE_HINTS = ["porque", "debido a", "por falta de", "a causa de"];

export function calculate(data: FichaProyectoData) {
  const dedicaciones = data.equipo.map((m) => m.dedicacionPct);
  const dedicacionPromedio =
    dedicaciones.length === 0
      ? 0
      : Math.round(dedicaciones.reduce((sum, d) => sum + d, 0) / dedicaciones.length);

  return {
    totalHitos: data.planHitos.length,
    totalEquipo: data.equipo.length,
    totalCriteriosExito: data.criteriosExito.length,
    dedicacionPromedio,
    tieneSponsor: data.equipo.some((m) => m.rol === "sponsor"),
  };
}

export function validate(data: FichaProyectoData): MethodWarning[] {
  const warnings: MethodWarning[] = [];
  const problema = data.problemaOportunidad.toLowerCase();

  if (!data.objetivo.trim()) {
    warnings.push({
      code: "objetivo_vacio",
      message: "Falta el objetivo del proyecto (verbo + métrica + meta + fecha).",
      severity: "warning",
    });
  } else {
    if (!/\d/.test(data.objetivo)) {
      warnings.push({
        code: "objetivo_sin_metrica",
        message: "El objetivo no parece tener una meta numérica. Revisa que sea medible (SMART).",
        severity: "info",
      });
    }
  }

  if (CAUSE_HINTS.some((hint) => problema.includes(hint))) {
    warnings.push({
      code: "problema_con_causa",
      message:
        'El problema parece incluir una causa ("porque…", "debido a…"). El problema debe describir solo el síntoma, no su causa.',
      severity: "warning",
    });
  }

  if (SOLUTION_HINTS.some((hint) => problema.includes(hint))) {
    warnings.push({
      code: "problema_con_solucion",
      message: "El problema parece incluir una solución. Describe el síntoma, no la respuesta.",
      severity: "warning",
    });
  }

  if (data.alcanceDentro.length === 0) {
    warnings.push({
      code: "sin_alcance_dentro",
      message: "Falta definir qué queda dentro del alcance.",
      severity: "warning",
    });
  }

  if (data.alcanceFuera.length === 0) {
    warnings.push({
      code: "sin_alcance_fuera",
      message: "Falta definir qué queda fuera del alcance.",
      severity: "warning",
    });
  }

  if (data.criteriosExito.length === 0) {
    warnings.push({
      code: "sin_criterios_exito",
      message: "Falta al menos un criterio de éxito ('¿cómo sabrás que el proyecto fue exitoso?').",
      severity: "warning",
    });
  }

  if (data.equipo.length > 0 && !data.equipo.some((m) => m.rol === "sponsor")) {
    warnings.push({
      code: "sin_sponsor",
      message: "El equipo no tiene un sponsor asignado.",
      severity: "info",
    });
  }

  return warnings;
}
