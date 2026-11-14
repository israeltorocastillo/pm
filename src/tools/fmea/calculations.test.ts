import { describe, expect, it } from "vitest";
import { calculate, computeRpn, computeRpnPost, validate } from "./calculations";
import { filaFmeaSchema, fmeaSchema } from "./schema";

function fila(overrides: Partial<ReturnType<typeof filaFmeaSchema.parse>> = {}) {
  return filaFmeaSchema.parse({
    id: "f1",
    modoFalla: "Modo",
    sev: 1,
    occ: 1,
    det: 1,
    ...overrides,
  });
}

describe("FMEA — RPN (caso 'servir un café', SS §6.10)", () => {
  // El material dice 96 para la 3ra fila; la ficha del catálogo corrige a 80 (8·2·5).
  const casos = [
    { sev: 8, occ: 4, det: 4, rpn: 128, sevPost: 8, occPost: 1, detPost: 3, rpnPost: 24 },
    { sev: 8, occ: 5, det: 9, rpn: 360, sevPost: 8, occPost: 2, detPost: 7, rpnPost: 112 },
    { sev: 8, occ: 8, det: 4, rpn: 256, sevPost: 8, occPost: 2, detPost: 5, rpnPost: 80 },
    { sev: 8, occ: 7, det: 10, rpn: 560, sevPost: 8, occPost: 1, detPost: 8, rpnPost: 64 },
    { sev: 10, occ: 4, det: 4, rpn: 160, sevPost: 10, occPost: 1, detPost: 4, rpnPost: 40 },
    { sev: 10, occ: 7, det: 5, rpn: 350, sevPost: 10, occPost: 2, detPost: 3, rpnPost: 60 },
  ];

  it.each(casos)("sev=%s occ=%s det=%s -> rpn=%s, post=%s", (c) => {
    expect(computeRpn({ sev: c.sev, occ: c.occ, det: c.det })).toBe(c.rpn);
    const f = fila({ sev: c.sev, occ: c.occ, det: c.det, sevPost: c.sevPost, occPost: c.occPost, detPost: c.detPost });
    expect(computeRpnPost(f)).toBe(c.rpnPost);
  });

  it("corrige el RPN de la 3ra fila a 80, no 96 como en el material original", () => {
    expect(computeRpn({ sev: 8, occ: 8, det: 4 })).toBe(256);
    expect(computeRpnPost(fila({ sev: 8, occ: 8, det: 4, sevPost: 8, occPost: 2, detPost: 5 }))).toBe(80);
  });
});

describe("FMEA calculate", () => {
  it("ordena las filas por RPN descendente y cuenta las que superan el umbral", () => {
    const data = fmeaSchema.parse({
      umbralRpn: 100,
      filas: [
        fila({ id: "a", sev: 2, occ: 2, det: 2 }), // 8
        fila({ id: "b", sev: 8, occ: 8, det: 4 }), // 256
        fila({ id: "c", sev: 5, occ: 5, det: 5 }), // 125
      ],
    });

    const result = calculate(data);
    expect(result.filas.map((f) => f.id)).toEqual(["b", "c", "a"]);
    expect(result.rpnMaximo).toBe(256);
    expect(result.filasSobreUmbral).toBe(2);
  });
});

describe("FMEA validate", () => {
  it("alerta si el RPN supera el umbral sin acción recomendada", () => {
    const data = fmeaSchema.parse({
      umbralRpn: 100,
      filas: [fila({ id: "a", modoFalla: "Falla crítica", sev: 8, occ: 8, det: 4 })],
    });

    const warnings = validate(data);
    expect(warnings.map((w) => w.code)).toContain("rpn_sin_accion_a");
  });

  it("alerta si la severidad es >= 9 sin acción, aunque el RPN sea bajo", () => {
    const data = fmeaSchema.parse({
      filas: [fila({ id: "a", sev: 9, occ: 1, det: 1 })],
    });

    const warnings = validate(data);
    expect(warnings.map((w) => w.code)).toContain("sev_alta_sin_accion_a");
  });

  it("no alerta por RPN cuando hay una acción recomendada", () => {
    const data = fmeaSchema.parse({
      umbralRpn: 100,
      filas: [
        fila({
          id: "a",
          sev: 8,
          occ: 8,
          det: 4,
          accionesRecomendadas: [{ id: "acc1", descripcion: "Mitigar", responsable: "Ana", estado: "abierta" }],
        }),
      ],
    });

    const warnings = validate(data);
    expect(warnings.map((w) => w.code)).not.toContain("rpn_sin_accion_a");
  });
});
