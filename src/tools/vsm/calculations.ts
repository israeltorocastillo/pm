import type { MethodWarning } from "@/tools/_types";
import type { VsmData } from "./schema";

function sumCtByClasificacion(data: VsmData, clasificacion: "VA" | "BNVA" | "NVA"): number {
  return data.pasos.filter((p) => p.clasificacion === clasificacion).reduce((sum, p) => sum + p.ct, 0);
}

export function calculate(data: VsmData) {
  const va = sumCtByClasificacion(data, "VA");
  const bnva = sumCtByClasificacion(data, "BNVA");
  const nva = sumCtByClasificacion(data, "NVA");

  const totalEsperasDt = data.esperas.reduce((sum, e) => sum + e.dt, 0);
  const wipTotal = data.esperas.reduce((sum, e) => sum + e.wip, 0);
  const tiempoContacto = data.pasos.reduce((sum, p) => sum + p.pt * p.operadores, 0);

  const pltSumaTiempos = data.pasos.reduce((sum, p) => sum + p.pt, 0) + totalEsperasDt;
  const pltLittleLaw = data.tasaSalida && data.tasaSalida > 0 ? wipTotal / data.tasaSalida : null;

  const pce = pltSumaTiempos > 0 ? va / pltSumaTiempos : 0;
  const pceBanda: "tipico" | "alto" = pce <= 0.1 ? "tipico" : "alto";

  const { demanda, tiempoDisponible } = data.clienteDemanda;
  const takt = demanda > 0 ? tiempoDisponible / demanda : null;

  const pasoRestrictivo =
    data.pasos.length > 0
      ? data.pasos.reduce((max, p) => (p.ct > max.ct ? p : max), data.pasos[0])
      : null;

  const esperaMayor =
    data.esperas.length > 0 ? data.esperas.reduce((max, e) => (e.dt > max.dt ? e : max), data.esperas[0]) : null;

  return {
    va,
    bnva,
    nva,
    totalEsperasDt,
    wipTotal,
    tiempoContacto,
    pltSumaTiempos,
    pltLittleLaw,
    pce,
    pceBanda,
    takt,
    pasoRestrictivoId: takt != null && pasoRestrictivo && pasoRestrictivo.ct > takt ? pasoRestrictivo.id : null,
    trampaDeTiempoId: esperaMayor?.id ?? null,
  };
}

export function validate(data: VsmData): MethodWarning[] {
  const warnings: MethodWarning[] = [];

  if (data.pasos.length === 0) {
    warnings.push({ code: "sin_pasos", message: "Falta mapear al menos un paso del proceso.", severity: "warning" });
    return warnings;
  }

  const derived = calculate(data);

  if (derived.takt != null && derived.pasoRestrictivoId) {
    const paso = data.pasos.find((p) => p.id === derived.pasoRestrictivoId);
    warnings.push({
      code: "restriccion_sobre_takt",
      message: `El paso "${paso?.nombre}" tiene CT mayor al takt time: es la restricción del flujo.`,
      severity: "info",
    });
  }

  if (derived.pce > 0.1) {
    warnings.push({
      code: "pce_sobre_banda_tipica",
      message: `El PCE (${(derived.pce * 100).toFixed(1)}%) está por sobre el rango típico (< 10%) de la mayoría de los procesos.`,
      severity: "info",
    });
  }

  if (data.clienteDemanda.demanda === 0 || data.clienteDemanda.tiempoDisponible === 0) {
    warnings.push({
      code: "sin_demanda",
      message: "Falta la demanda del cliente o el tiempo disponible para calcular el takt time.",
      severity: "info",
    });
  }

  return warnings;
}
