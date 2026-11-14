import { describe, expect, it } from "vitest";
import { calculate, validate } from "./calculations";
import { planControlSchema } from "./schema";

describe("plan-control schema", () => {
  it("parse({}) no lanza error y aplica defaults anidados (planRespuesta)", () => {
    const data = planControlSchema.parse({});
    expect(data.planRespuesta).toEqual({
      contencion: "",
      ajusteProceso: "",
      mejoraSistema: "",
    });
    expect(data.filas).toEqual([]);
    expect(data.formato).toBe("simple_lean");
    expect(data.duenoProcesoAcepta).toBe(false);
  });
});

describe("plan-control validate", () => {
  it("no genera alertas cuando todas las filas están completas", () => {
    const data = planControlSchema.parse({
      filas: [
        {
          id: "a",
          procesoActividad: "Soldadura",
          indicadorNombre: "Defectos por lote",
          frecuencia: "Diaria",
          responsable: "Supervisor de línea",
          procedimientoReajuste: "Detener línea y recalibrar",
        },
      ],
    });

    const warnings = validate(data);
    expect(warnings).toEqual([]);
  });

  it("alerta cuando una fila tiene el responsable vacío, mencionando la fila", () => {
    const data = planControlSchema.parse({
      filas: [
        {
          id: "a",
          procesoActividad: "Soldadura",
          indicadorNombre: "Defectos por lote",
          frecuencia: "Diaria",
          responsable: "",
          procedimientoReajuste: "Detener línea y recalibrar",
        },
      ],
    });

    const warnings = validate(data);
    const warning = warnings.find((w) => w.code === "fila_incompleta_a");
    expect(warning).toBeDefined();
    expect(warning?.message).toContain("Soldadura");
  });

  it('alerta "falta al menos un control" cuando no hay filas', () => {
    const data = planControlSchema.parse({});

    const warnings = validate(data);
    expect(warnings.map((w) => w.code)).toContain("sin_filas");
    expect(warnings.find((w) => w.code === "sin_filas")?.message).toBe(
      "Falta al menos un control."
    );
  });

  it("calcula totalFilas y filasIncompletas correctamente", () => {
    const data = planControlSchema.parse({
      filas: [
        {
          id: "a",
          indicadorNombre: "Defectos por lote",
          frecuencia: "Diaria",
          responsable: "Supervisor",
          procedimientoReajuste: "Recalibrar",
        },
        {
          id: "b",
          indicadorNombre: "",
          frecuencia: "Diaria",
          responsable: "Supervisor",
          procedimientoReajuste: "Recalibrar",
        },
        {
          id: "c",
          indicadorNombre: "Tiempo de ciclo",
          frecuencia: "",
          responsable: "",
          procedimientoReajuste: "",
        },
      ],
    });

    const result = calculate(data);
    expect(result.totalFilas).toBe(3);
    expect(result.filasIncompletas).toBe(2);
  });
});
