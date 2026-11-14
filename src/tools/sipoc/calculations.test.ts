import { describe, expect, it } from "vitest";
import { calculate, validate } from "./calculations";
import { sipocSchema } from "./schema";

describe("sipoc schema", () => {
  it("parsea un objeto vacío sin errores y aplica los defaults", () => {
    const data = sipocSchema.parse({});
    expect(data.proveedores).toEqual([]);
    expect(data.entradas).toEqual([]);
    expect(data.proceso).toEqual([]);
    expect(data.salidas).toEqual([]);
    expect(data.clientes).toEqual([]);
    expect(data.limite_inicio).toBe("");
    expect(data.limite_fin).toBe("");
    expect(data.xs_preliminares).toEqual([]);
  });
});

describe("sipoc calculate", () => {
  it("devuelve los totales de pasos, entradas y salidas", () => {
    const data = sipocSchema.parse({
      entradas: [{ id: "e1", entrada: "Orden de compra", requisito: "Completa" }],
      proceso: [
        { id: "p1", paso: "Recibir solicitud" },
        { id: "p2", paso: "Validar datos" },
      ],
      salidas: [{ id: "s1", salida: "Producto despachado", requisito: "A tiempo" }],
    });

    expect(calculate(data)).toEqual({
      totalPasos: 2,
      totalEntradas: 1,
      totalSalidas: 1,
    });
  });
});

describe("sipoc validate", () => {
  it("no alerta cuando el proceso tiene 5-6 pasos y los límites están completos", () => {
    const data = sipocSchema.parse({
      proceso: [
        { id: "p1", paso: "Paso 1" },
        { id: "p2", paso: "Paso 2" },
        { id: "p3", paso: "Paso 3" },
        { id: "p4", paso: "Paso 4" },
        { id: "p5", paso: "Paso 5" },
      ],
      limite_inicio: "Llega la solicitud del cliente",
      limite_fin: "Se entrega el producto",
    });

    const warnings = validate(data);
    expect(warnings).toEqual([]);
  });

  it("alerta cuando el proceso tiene menos de 5 pasos (fuera de rango)", () => {
    const data = sipocSchema.parse({
      proceso: [
        { id: "p1", paso: "Paso 1" },
        { id: "p2", paso: "Paso 2" },
        { id: "p3", paso: "Paso 3" },
      ],
      limite_inicio: "Inicio",
      limite_fin: "Fin",
    });

    const warnings = validate(data);
    expect(warnings.map((w) => w.code)).toContain("pasos_fuera_de_rango");
  });

  it("alerta cuando faltan los límites de inicio o fin", () => {
    const data = sipocSchema.parse({
      proceso: [
        { id: "p1", paso: "Paso 1" },
        { id: "p2", paso: "Paso 2" },
        { id: "p3", paso: "Paso 3" },
        { id: "p4", paso: "Paso 4" },
        { id: "p5", paso: "Paso 5" },
      ],
      limite_inicio: "",
      limite_fin: "",
    });

    const warnings = validate(data);
    expect(warnings.map((w) => w.code)).toContain("sin_limites");
  });

  it("alerta cuando el proceso tiene más de 6 pasos (fuera de rango)", () => {
    const data = sipocSchema.parse({
      proceso: Array.from({ length: 7 }, (_, i) => ({ id: `p${i}`, paso: `Paso ${i + 1}` })),
      limite_inicio: "Inicio",
      limite_fin: "Fin",
    });

    const warnings = validate(data);
    expect(warnings.map((w) => w.code)).toContain("pasos_fuera_de_rango");
  });
});
