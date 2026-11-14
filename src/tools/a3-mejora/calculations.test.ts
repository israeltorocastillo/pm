import { describe, expect, it } from "vitest";
import { calculate, validate } from "./calculations";
import { a3MejoraSchema } from "./schema";

function emptyData() {
  return a3MejoraSchema.parse({});
}

describe("a3-mejora schema", () => {
  it("parsea datos vacíos sin errores", () => {
    expect(() => a3MejoraSchema.parse({})).not.toThrow();
  });
});

describe("a3-mejora validate", () => {
  it("no alerta cuando los datos están completos", () => {
    const data = emptyData();
    data.titulo = "Reducir tiempo de ciclo";
    data.lider = "Ana";
    data.fecha = "2026-01-01";
    data.b1ContextoProblema = "Contexto del problema.";
    data.b2SituacionActualDesperdicios = "Situación actual con datos.";
    data.b3AnalisisCausasRaiz = "Causas raíz identificadas con 5 porqués.";
    data.b4DisenoSoluciones = [
      { id: "1", solucion: "Estandarizar el proceso", causaRef: "Falta de estándar" },
    ];
    data.b5Implementacion = [
      {
        id: "1",
        descripcion: "Capacitar al equipo",
        responsable: "Beto",
        fechaCompromiso: "2026-02-01",
        estado: "cerrada",
      },
    ];
    data.b6Seguimiento = "Revisión mensual del indicador en reunión de equipo.";

    const warnings = validate(data);

    expect(warnings).toHaveLength(0);
  });

  it("alerta (info) cuando una solución no tiene causa_ref", () => {
    const data = emptyData();
    data.b4DisenoSoluciones = [{ id: "1", solucion: "Estandarizar el proceso", causaRef: "" }];
    data.b5Implementacion = [
      {
        id: "1",
        descripcion: "Acción",
        responsable: "Ana",
        fechaCompromiso: "2026-02-01",
        estado: "abierta",
      },
    ];
    data.b6Seguimiento = "Plan de control definido.";

    const warnings = validate(data);
    const solucionWarning = warnings.find((w) => w.code === "solucion_sin_causa");

    expect(solucionWarning).toBeDefined();
    expect(solucionWarning?.severity).toBe("info");
  });

  it("alerta cuando no hay acciones de implementación", () => {
    const data = emptyData();
    data.b6Seguimiento = "Plan de control definido.";

    const warnings = validate(data);

    expect(warnings.map((w) => w.code)).toContain("sin_acciones_implementacion");
  });

  it("alerta cuando falta el plan de seguimiento", () => {
    const data = emptyData();
    data.b5Implementacion = [
      {
        id: "1",
        descripcion: "Acción",
        responsable: "Ana",
        fechaCompromiso: "2026-02-01",
        estado: "abierta",
      },
    ];
    data.b6Seguimiento = "";

    const warnings = validate(data);

    expect(warnings.map((w) => w.code)).toContain("sin_plan_seguimiento");
  });
});

describe("a3-mejora calculate", () => {
  it("calcula totales y acciones cerradas correctamente", () => {
    const data = emptyData();
    data.b4DisenoSoluciones = [
      { id: "1", solucion: "Sol 1", causaRef: "Causa 1" },
      { id: "2", solucion: "Sol 2", causaRef: "" },
    ];
    data.b5Implementacion = [
      {
        id: "1",
        descripcion: "Acción 1",
        responsable: "Ana",
        fechaCompromiso: "2026-01-01",
        estado: "cerrada",
      },
      {
        id: "2",
        descripcion: "Acción 2",
        responsable: "Beto",
        fechaCompromiso: "2026-01-15",
        estado: "en_curso",
      },
      {
        id: "3",
        descripcion: "Acción 3",
        responsable: "Caro",
        fechaCompromiso: "2026-02-01",
        estado: "cerrada",
      },
    ];

    const result = calculate(data);

    expect(result.totalSoluciones).toBe(2);
    expect(result.totalAcciones).toBe(3);
    expect(result.accionesCerradas).toBe(2);
  });
});
