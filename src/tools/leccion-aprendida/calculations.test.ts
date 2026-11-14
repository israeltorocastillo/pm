import { describe, expect, it } from "vitest";
import { calculate, validate } from "./calculations";
import { leccionAprendidaSchema, type ChecklistItem } from "./schema";

function emptyData() {
  return leccionAprendidaSchema.parse({});
}

function checklistConBloques(bloques: Record<"A" | "B" | "C" | "D" | "E", boolean[]>): ChecklistItem[] {
  const preguntasPorBloque: Record<"A" | "B" | "C" | "D" | "E", string[]> = {
    A: ["a1", "a2", "a3"],
    B: ["b1", "b2", "b3"],
    C: ["c1", "c2", "c3"],
    D: ["d1", "d2", "d3"],
    E: ["e1", "e2", "e3"],
  };

  const items: ChecklistItem[] = [];
  (Object.keys(preguntasPorBloque) as (keyof typeof preguntasPorBloque)[]).forEach((bloque) => {
    preguntasPorBloque[bloque].forEach((pregunta, i) => {
      items.push({
        id: `${bloque}-${i}`,
        bloque,
        pregunta,
        respuesta: bloques[bloque][i] ?? false,
      });
    });
  });
  return items;
}

describe("leccion-aprendida schema", () => {
  it("parsea un objeto vacío sin errores", () => {
    expect(() => emptyData()).not.toThrow();
  });
});

describe("leccion-aprendida calculate/validate", () => {
  it("cumpleMinimo=true y sin alerta de relato cuando B, C y D tienen 3/3 'sí'", () => {
    const data = emptyData();
    data.checklist = checklistConBloques({
      A: [false, false, false],
      B: [true, true, true],
      C: [true, true, true],
      D: [true, true, true],
      E: [false, false, false],
    });
    data.aprendimosQue = "Aprendimos que la validación temprana evita retrabajo.";
    data.evidencia = ["Acta de reunión"];

    const result = calculate(data);
    expect(result.cumpleMinimo).toBe(true);
    expect(result.publicable).toBe(true);

    const warnings = validate(data);
    expect(warnings.map((w) => w.code)).not.toContain("no_cumple_minimo_bcd");
  });

  it("cumpleMinimo=false y dispara alerta cuando el bloque B tiene menos de 3 'sí'", () => {
    const data = emptyData();
    data.checklist = checklistConBloques({
      A: [false, false, false],
      B: [true, true, false],
      C: [true, true, true],
      D: [true, true, true],
      E: [false, false, false],
    });

    const result = calculate(data);
    expect(result.cumpleMinimo).toBe(false);
    expect(result.publicable).toBe(false);

    const warnings = validate(data);
    expect(warnings.map((w) => w.code)).toContain("no_cumple_minimo_bcd");
  });

  it("alerta cuando aprendimosQue está vacío", () => {
    const data = emptyData();
    data.aprendimosQue = "";

    const warnings = validate(data);
    expect(warnings.map((w) => w.code)).toContain("aprendimos_que_vacio");
  });

  it("alerta cuando evidencia está vacía", () => {
    const data = emptyData();
    data.evidencia = [];

    const warnings = validate(data);
    expect(warnings.map((w) => w.code)).toContain("sin_evidencia");
  });
});
