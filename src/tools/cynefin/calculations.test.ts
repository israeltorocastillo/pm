import { describe, expect, it } from "vitest";
import { calculate, validate } from "./calculations";
import { cynefinSchema, type ComponenteCynefin } from "./schema";

function emptyData() {
  return cynefinSchema.parse({});
}

function componente(overrides: Partial<ComponenteCynefin>): ComponenteCynefin {
  return {
    id: Math.random().toString(36).slice(2, 10),
    descripcion: "",
    dominio: "complicado",
    senales: ["señal"],
    intervencion: "",
    ...overrides,
  };
}

describe("cynefin calculate", () => {
  it("parsea datos vacíos sin errores (defaults anidados)", () => {
    const data = emptyData();
    expect(data.componentes).toEqual([]);
    expect(data.modo).toBe("proyecto_completo");
  });

  it("sugiere enfoque predictivo cuando todos los componentes son simple o complicado", () => {
    const data = emptyData();
    data.componentes = [
      componente({ dominio: "simple" }),
      componente({ dominio: "complicado" }),
    ];

    const result = calculate(data);

    expect(result.enfoqueSugerido).toBe("predictivo");
    expect(result.totalComponentes).toBe(2);
  });

  it("sugiere enfoque ágil cuando todos los componentes son complejos", () => {
    const data = emptyData();
    data.componentes = [componente({ dominio: "complejo" }), componente({ dominio: "complejo" })];

    const result = calculate(data);

    expect(result.enfoqueSugerido).toBe("agil");
  });

  it("sugiere enfoque híbrido cuando hay mezcla de simple/complicado con complejo", () => {
    const data = emptyData();
    data.componentes = [
      componente({ dominio: "simple" }),
      componente({ dominio: "complejo" }),
    ];

    const result = calculate(data);

    expect(result.enfoqueSugerido).toBe("hibrido");
  });

  it("sugiere estabilizar primero cuando hay al menos un componente caótico", () => {
    const data = emptyData();
    data.componentes = [
      componente({ dominio: "complejo" }),
      componente({ dominio: "caotico" }),
    ];

    const result = calculate(data);

    expect(result.enfoqueSugerido).toBe("estabilizar_primero");
  });
});

describe("cynefin validate", () => {
  it("alerta cuando no hay componentes", () => {
    const data = emptyData();

    const warnings = validate(data);

    expect(warnings.map((w) => w.code)).toContain("sin_componentes");
  });

  it("alerta (info) cuando un componente no tiene señales", () => {
    const data = emptyData();
    data.componentes = [componente({ senales: [] })];

    const warnings = validate(data);

    const warning = warnings.find((w) => w.code.startsWith("componente_sin_senales"));
    expect(warning).toBeDefined();
    expect(warning?.severity).toBe("info");
  });

  it("no alerta por señales cuando el componente sí tiene al menos una", () => {
    const data = emptyData();
    data.componentes = [componente({ senales: ["evidencia clara"] })];

    const warnings = validate(data);

    expect(warnings.some((w) => w.code.startsWith("componente_sin_senales"))).toBe(false);
  });
});
