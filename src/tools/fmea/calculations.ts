import type { MethodWarning } from "@/tools/_types";
import type { FilaFmea, FmeaData } from "./schema";

export type FilaFmeaConRpn = FilaFmea & { rpn: number; rpnPost: number | null };

export function computeRpn(fila: Pick<FilaFmea, "sev" | "occ" | "det">): number {
  return fila.sev * fila.occ * fila.det;
}

export function computeRpnPost(fila: FilaFmea): number | null {
  if (fila.sevPost == null || fila.occPost == null || fila.detPost == null) return null;
  return fila.sevPost * fila.occPost * fila.detPost;
}

export function calculate(data: FmeaData) {
  const filasConRpn: FilaFmeaConRpn[] = [...data.filas]
    .map((fila) => ({ ...fila, rpn: computeRpn(fila), rpnPost: computeRpnPost(fila) }))
    .sort((a, b) => b.rpn - a.rpn);

  return {
    filas: filasConRpn,
    rpnMaximo: filasConRpn[0]?.rpn ?? 0,
    filasSobreUmbral: filasConRpn.filter((f) => f.rpn >= data.umbralRpn).length,
  };
}

export function validate(data: FmeaData): MethodWarning[] {
  const warnings: MethodWarning[] = [];

  data.filas.forEach((fila, i) => {
    const rpn = computeRpn(fila);
    const label = fila.modoFalla || `Fila ${i + 1}`;

    if (rpn >= data.umbralRpn && fila.accionesRecomendadas.length === 0) {
      warnings.push({
        code: `rpn_sin_accion_${fila.id}`,
        message: `"${label}" tiene RPN ${rpn} (≥ ${data.umbralRpn}) sin acción recomendada.`,
        severity: "warning",
      });
    }

    if (fila.sev >= 9 && fila.accionesRecomendadas.length === 0) {
      warnings.push({
        code: `sev_alta_sin_accion_${fila.id}`,
        message: `"${label}" tiene severidad ${fila.sev} (≥ 9): requiere acción aunque el RPN sea bajo.`,
        severity: "warning",
      });
    }

    const accionCerradaSinRepuntuar = fila.accionesRecomendadas.some((a) => a.estado === "cerrada");
    if (
      accionCerradaSinRepuntuar &&
      (fila.sevPost == null || fila.occPost == null || fila.detPost == null)
    ) {
      warnings.push({
        code: `accion_cerrada_sin_repuntuar_${fila.id}`,
        message: `"${label}" tiene una acción cerrada pero no se recalculó el RPN (sev/occ/det posteriores).`,
        severity: "info",
      });
    }
  });

  if (data.filas.length === 0) {
    warnings.push({ code: "sin_filas", message: "Falta al menos un modo de falla.", severity: "warning" });
  }

  return warnings;
}
