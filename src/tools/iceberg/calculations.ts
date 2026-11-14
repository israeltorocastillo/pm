import type { MethodWarning } from "@/tools/_types";
import { NIVELES_ICEBERG, type IcebergData, type NivelIceberg } from "./schema";

export function calculate(data: IcebergData) {
  const tarjetasPorNivel = NIVELES_ICEBERG.reduce(
    (acc, nivel) => {
      acc[nivel] = data.tarjetas.filter((t) => t.nivel === nivel).length;
      return acc;
    },
    {} as Record<NivelIceberg, number>,
  );

  const totalAcciones = data.acciones.length;
  const soloAccionesDeEvento =
    totalAcciones > 0 && data.acciones.every((a) => a.nivelIntervenido === "evento");

  return { tarjetasPorNivel, totalAcciones, soloAccionesDeEvento };
}

export function validate(data: IcebergData): MethodWarning[] {
  const warnings: MethodWarning[] = [];
  const { tarjetasPorNivel, soloAccionesDeEvento } = calculate(data);

  NIVELES_ICEBERG.forEach((nivel) => {
    if (tarjetasPorNivel[nivel] === 0) {
      warnings.push({
        code: `sin_tarjetas_${nivel}`,
        message: `Falta al menos una tarjeta en el nivel '${nivel}'.`,
        severity: "info",
      });
    }
  });

  if (soloAccionesDeEvento) {
    warnings.push({
      code: "solo_acciones_evento",
      message:
        "Si solo intervienes el evento, el patrón probablemente vuelva. Considera intervenir en estructura o mentalidades.",
      severity: "warning",
    });
  }

  return warnings;
}
