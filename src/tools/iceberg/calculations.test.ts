import { describe, expect, it } from "vitest";
import { calculate, validate } from "./calculations";
import { icebergSchema } from "./schema";

function emptyData() {
  return icebergSchema.parse({});
}

describe("iceberg schema", () => {
  it("parsea sin errores con un objeto vacío", () => {
    expect(() => icebergSchema.parse({})).not.toThrow();
  });
});

describe("iceberg calculate", () => {
  it("calcula tarjetasPorNivel correctamente", () => {
    const data = emptyData();
    data.tarjetas = [
      { id: "1", texto: "Hoy hubo un retraso", nivel: "evento" },
      { id: "2", texto: "Siempre pasa lo mismo", nivel: "patron" },
      { id: "3", texto: "No hay rutina de seguimiento", nivel: "estructura" },
      { id: "4", texto: "Siempre pasa lo mismo", nivel: "patron" },
    ];

    const result = calculate(data);

    expect(result.tarjetasPorNivel).toEqual({
      evento: 1,
      patron: 2,
      estructura: 1,
      mentalidad: 0,
    });
  });

  it("totalAcciones cuenta todas las acciones registradas", () => {
    const data = emptyData();
    data.acciones = [
      { id: "1", descripcion: "A", responsable: "Ana", nivelIntervenido: "evento" },
      { id: "2", descripcion: "B", responsable: "Beto", nivelIntervenido: "estructura" },
    ];

    const result = calculate(data);

    expect(result.totalAcciones).toBe(2);
  });
});

describe("iceberg validate", () => {
  it("no alerta 'solo eventos' con tarjetas en los 4 niveles y acciones variadas, pero sí alerta si falta un nivel", () => {
    const data = emptyData();
    data.tarjetas = [
      { id: "1", texto: "Hoy hubo un retraso", nivel: "evento" },
      { id: "2", texto: "Siempre pasa lo mismo", nivel: "patron" },
      { id: "3", texto: "No hay rutina de seguimiento", nivel: "estructura" },
      // sin tarjetas en nivel "mentalidad"
    ];
    data.acciones = [
      { id: "1", descripcion: "Capacitar al equipo", responsable: "Ana", nivelIntervenido: "estructura" },
      { id: "2", descripcion: "Resolver el caso puntual", responsable: "Beto", nivelIntervenido: "evento" },
    ];

    const warnings = validate(data);
    const codes = warnings.map((w) => w.code);

    expect(codes).not.toContain("solo_acciones_evento");
    expect(codes).toContain("sin_tarjetas_mentalidad");
    expect(codes).not.toContain("sin_tarjetas_evento");
    expect(codes).not.toContain("sin_tarjetas_patron");
    expect(codes).not.toContain("sin_tarjetas_estructura");
  });

  it("alerta cuando todas las acciones intervienen solo el nivel evento", () => {
    const data = emptyData();
    data.acciones = [
      { id: "1", descripcion: "Resolver el caso puntual", responsable: "Ana", nivelIntervenido: "evento" },
      { id: "2", descripcion: "Pedir disculpas al cliente", responsable: "Beto", nivelIntervenido: "evento" },
    ];

    const warnings = validate(data);

    expect(warnings.map((w) => w.code)).toContain("solo_acciones_evento");
  });

  it("no alerta 'solo eventos' cuando no hay ninguna acción registrada", () => {
    const data = emptyData();

    const warnings = validate(data);

    expect(warnings.map((w) => w.code)).not.toContain("solo_acciones_evento");
  });
});
