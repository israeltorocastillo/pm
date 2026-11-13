import { describe, expect, it } from "vitest";
import { calculate, validate } from "./calculations";
import { ishikawaSchema } from "./schema";

function baseData() {
  return ishikawaSchema.parse({
    efecto: "Aumento de los excesos en la Unidad de Empaque",
    categorias: [
      { id: "1", nombre: "Equipos" },
      { id: "2", nombre: "Materiales" },
      { id: "3", nombre: "Gestión" },
    ],
    causas: [
      { id: "c1", categoria: "Equipos", texto: "Máquinas obsoletas", votos531: 5, aValidar: true },
      { id: "c2", categoria: "Equipos", texto: "Fallas frecuentes", votos531: 3, aValidar: true },
      { id: "c3", categoria: "Gestión", texto: "Coordinación débil", votos531: 1 },
    ],
  });
}

describe("ishikawa calculate", () => {
  it("cuenta causas por categoría y prioriza por votación 5-3-1", () => {
    const result = calculate(baseData());

    expect(result.totalCausas).toBe(3);
    expect(result.causasPorCategoria).toEqual({ Equipos: 2, Gestión: 1 });
    expect(result.causasPriorizadas[0]).toMatchObject({ texto: "Máquinas obsoletas", votos531: 5 });
    expect(result.causasAValidar).toBe(2);
  });
});

describe("ishikawa validate", () => {
  it("alerta sobre categorías declaradas sin causas", () => {
    const warnings = validate(baseData());
    expect(warnings.map((w) => w.code)).toContain("categoria_vacia_2");
  });

  it("alerta si una causa parece una solución disfrazada", () => {
    const data = baseData();
    data.causas.push({
      id: "c4",
      categoria: "Equipos",
      texto: "Falta de software de mantenimiento predictivo",
      padreRef: null,
      evidencia: [],
      votos531: 0,
      aValidar: false,
    });

    const warnings = validate(data);
    expect(warnings.map((w) => w.code)).toContain("causa_es_solucion_c4");
  });

  it("no alerta por causas a validar cuando ya hay al menos una marcada", () => {
    const warnings = validate(baseData());
    expect(warnings.map((w) => w.code)).not.toContain("sin_causas_a_validar");
  });
});
