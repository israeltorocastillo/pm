import type { MethodWarning } from "@/tools/_types";
import type { ChecklistItem, LeccionAprendidaData } from "./schema";

const BLOQUES_REQUERIDOS = ["B", "C", "D"] as const;

export function contarSiPorBloque(checklist: ChecklistItem[]) {
  const conteo: Record<"A" | "B" | "C" | "D" | "E", number> = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
  };
  for (const item of checklist) {
    if (item.respuesta) {
      conteo[item.bloque] += 1;
    }
  }
  return conteo;
}

export function calculate(data: LeccionAprendidaData) {
  const siPorBloque = contarSiPorBloque(data.checklist);
  const cumpleMinimo = BLOQUES_REQUERIDOS.every((bloque) => siPorBloque[bloque] >= 3);

  return {
    siPorBloque,
    cumpleMinimo,
    publicable: cumpleMinimo,
  };
}

export function validate(data: LeccionAprendidaData): MethodWarning[] {
  const warnings: MethodWarning[] = [];
  const { cumpleMinimo } = calculate(data);

  if (!cumpleMinimo) {
    warnings.push({
      code: "no_cumple_minimo_bcd",
      message:
        "Esta entrada queda marcada como relato, opinión o queja: no cumple el mínimo del checklist (bloques B, C y D) para publicarse en el repositorio.",
      severity: "warning",
    });
  }

  if (!data.aprendimosQue.trim()) {
    warnings.push({
      code: "aprendimos_que_vacio",
      message: 'Falta completar la frase explícita "Aprendimos que…".',
      severity: "warning",
    });
  }

  if (data.evidencia.length === 0) {
    warnings.push({
      code: "sin_evidencia",
      message: "Falta evidencia que respalde la lección.",
      severity: "warning",
    });
  }

  return warnings;
}
