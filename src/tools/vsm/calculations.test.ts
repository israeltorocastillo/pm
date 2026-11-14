import { describe, expect, it } from "vitest";
import type { z } from "zod";
import { calculate, validate } from "./calculations";
import { vsmSchema } from "./schema";

function baseData(overrides: z.input<typeof vsmSchema> = {}) {
  return vsmSchema.parse(overrides);
}

describe("VSM — Ley de Little (PLT = WIP / tasa de salida)", () => {
  // Tests de la ficha: 100 unid / 20 unid/día = 5 días; 5 pers / 1 pers/min = 5 min; 13 → 13 min.
  it.each([
    { wip: 100, tasaSalida: 20, esperado: 5 },
    { wip: 5, tasaSalida: 1, esperado: 5 },
    { wip: 13, tasaSalida: 1, esperado: 13 },
  ])("wip=$wip, tasaSalida=$tasaSalida -> PLT=$esperado", ({ wip, tasaSalida, esperado }) => {
    const data = baseData({
      tasaSalida,
      esperas: [{ id: "e1", entrePasos: "", wip, dt: 0 }],
    });
    expect(calculate(data).pltLittleLaw).toBeCloseTo(esperado, 5);
  });
});

describe("VSM — Takt time = tiempo disponible / demanda", () => {
  // Tests de la ficha: 240 min / 50 = 4,8 min; 240 / 75 = 3,2 min.
  it.each([
    { tiempoDisponible: 240, demanda: 50, esperado: 4.8 },
    { tiempoDisponible: 240, demanda: 75, esperado: 3.2 },
  ])("tiempoDisponible=$tiempoDisponible, demanda=$demanda -> takt=$esperado", ({ tiempoDisponible, demanda, esperado }) => {
    const data = baseData({ clienteDemanda: { cliente: "", demanda, unidad: "", tiempoDisponible, unidadTiempo: "" } });
    expect(calculate(data).takt).toBeCloseTo(esperado, 5);
  });
});

describe("VSM — VA, BNVA, NVA y PCE", () => {
  it("suma CT por clasificación y calcula PCE = VA / PLT (suma de tiempos)", () => {
    const data = baseData({
      pasos: [
        { id: "p1", nombre: "Corte", ct: 10, clasificacion: "VA" },
        { id: "p2", nombre: "Espera documental", ct: 5, clasificacion: "NVA" },
        { id: "p3", nombre: "Inspección", ct: 3, clasificacion: "BNVA" },
      ],
      esperas: [{ id: "e1", entrePasos: "p1-p2", wip: 0, dt: 2 }],
    });

    const result = calculate(data);
    expect(result.va).toBe(10);
    expect(result.bnva).toBe(3);
    expect(result.nva).toBe(5);
    // pltSumaTiempos = sum(pt=0 default) + totalEsperasDt(2) ... pt no fue seteado, default 0
    expect(result.pltSumaTiempos).toBe(2);
    expect(result.pce).toBeCloseTo(10 / 2, 5);
  });
});

describe("VSM validate", () => {
  it("alerta si no hay pasos", () => {
    const warnings = validate(baseData());
    expect(warnings.map((w) => w.code)).toContain("sin_pasos");
  });

  it("marca el paso cuyo CT supera el takt como restricción", () => {
    const data = baseData({
      clienteDemanda: { cliente: "Cliente", demanda: 50, unidad: "u", tiempoDisponible: 240, unidadTiempo: "min" },
      pasos: [
        { id: "p1", nombre: "Rápido", ct: 2, clasificacion: "VA" },
        { id: "p2", nombre: "Lento", ct: 10, clasificacion: "VA" },
      ],
    });

    const warnings = validate(data);
    expect(warnings.map((w) => w.code)).toContain("restriccion_sobre_takt");
    expect(warnings.find((w) => w.code === "restriccion_sobre_takt")?.message).toContain("Lento");
  });
});
