import { describe, expect, it } from "vitest";
import { computeParetoRows, validate } from "./calculations";
import { paretoSchema } from "./schema";

describe("computeParetoRows", () => {
  it("ordena por impacto y calcula % de contribución y acumulado (modo frecuencia)", () => {
    const data = paretoSchema.parse({
      modo: "frecuencia",
      categorias: [
        { id: "a", nombre: "A", frecuencia: 20 },
        { id: "b", nombre: "B", frecuencia: 50 },
        { id: "c", nombre: "C", frecuencia: 30 },
      ],
    });

    const rows = computeParetoRows(data);

    expect(rows.map((r) => r.nombre)).toEqual(["B", "C", "A"]);
    expect(rows[0].pctContribucion).toBeCloseTo(50, 5);
    expect(rows[1].pctContribucion).toBeCloseTo(30, 5);
    expect(rows[2].pctContribucion).toBeCloseTo(20, 5);
    expect(rows[2].pctAcumulado).toBeCloseTo(100, 5);
  });

  it("modo frecuencia_costo multiplica frecuencia por costo unitario", () => {
    const data = paretoSchema.parse({
      modo: "frecuencia_costo",
      categorias: [
        { id: "a", nombre: "A", frecuencia: 10, costoUnitario: 5 },
        { id: "b", nombre: "B", frecuencia: 2, costoUnitario: 100 },
      ],
    });

    const rows = computeParetoRows(data);

    expect(rows.find((r) => r.id === "a")?.impacto).toBe(50);
    expect(rows.find((r) => r.id === "b")?.impacto).toBe(200);
    expect(rows[0].nombre).toBe("B");
  });

  // Caso de la refinadora de aceite de coco (LA §5.3, S1 p.26): exceso de llenado (giveaway)
  // por línea. El material solo deja los valores de C ya redondeados a 2 decimales, por lo
  // que el acumulado exacto difiere en centésimas del original (88,43 / 9,54 / 2,03).
  it("reproduce el orden y la magnitud del ejercicio de la refinadora (bolsas/boca ancha/boca angosta)", () => {
    const data = paretoSchema.parse({
      modo: "frecuencia",
      categorias: [
        { id: "bolsas", nombre: "Bolsas", frecuencia: 2.98 },
        { id: "boca-ancha", nombre: "Boca ancha", frecuencia: 0.32 },
        { id: "boca-angosta", nombre: "Boca angosta", frecuencia: 0.07 },
      ],
    });

    const rows = computeParetoRows(data);

    expect(rows.map((r) => r.nombre)).toEqual(["Bolsas", "Boca ancha", "Boca angosta"]);
    expect(rows[0].pctContribucion).toBeCloseTo(88.43, 0);
    expect(rows[1].pctAcumulado).toBeCloseTo(97.97, 0);
    expect(rows[2].pctContribucion).toBeCloseTo(2.03, 0);
  });

  it("modo exceso_objetivo calcula C = real - objetivo y D = C / real", () => {
    const data = paretoSchema.parse({
      modo: "exceso_objetivo",
      categorias: [{ id: "a", nombre: "A", cantidadReal: 503, cantidadObjetivo: 500 }],
    });

    const rows = computeParetoRows(data);

    expect(rows[0].impacto).toBe(3);
    expect(rows[0].pctExceso).toBeCloseTo((3 / 503) * 100, 5);
  });
});

describe("pareto validate", () => {
  it("alerta cuando la barra principal no duplica a la siguiente", () => {
    const data = paretoSchema.parse({
      titulo: "T",
      periodoDesde: "2026-01-01",
      periodoHasta: "2026-01-31",
      fuente: "F",
      categorias: [
        { id: "a", nombre: "A", frecuencia: 10 },
        { id: "b", nombre: "B", frecuencia: 9 },
        { id: "c", nombre: "C", frecuencia: 2 },
        { id: "d", nombre: "D", frecuencia: 1 },
        { id: "e", nombre: "E", frecuencia: 1 },
      ],
    });

    const warnings = validate(data);
    expect(warnings.map((w) => w.code)).toContain("barra_principal_no_duplica");
  });

  it("no alerta sobre metadatos cuando título, período y fuente están completos", () => {
    const data = paretoSchema.parse({
      titulo: "Exceso de llenado",
      periodoDesde: "2026-01-01",
      periodoHasta: "2026-01-31",
      fuente: "Hoja de verificación",
    });

    const warnings = validate(data);
    expect(warnings.map((w) => w.code)).not.toContain("sin_titulo");
    expect(warnings.map((w) => w.code)).not.toContain("sin_periodo");
    expect(warnings.map((w) => w.code)).not.toContain("sin_fuente");
  });
});
