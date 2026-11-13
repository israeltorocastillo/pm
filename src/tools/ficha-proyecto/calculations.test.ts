import { describe, expect, it } from "vitest";
import { calculate, validate } from "./calculations";
import { fichaProyectoSchema } from "./schema";

function emptyData() {
  return fichaProyectoSchema.parse({});
}

describe("ficha-proyecto calculate", () => {
  it("calcula totales y promedio de dedicación del equipo", () => {
    const data = emptyData();
    data.planHitos = [{ id: "1", hito: "Kickoff", fecha: "2026-01-01" }];
    data.criteriosExito = [{ id: "1", nombre: "Reducir tiempo", definicion: "", meta: "-20%" }];
    data.equipo = [
      { id: "1", persona: "Ana", rol: "sponsor", dedicacionPct: 10 },
      { id: "2", persona: "Beto", rol: "lider_jp", dedicacionPct: 50 },
    ];

    const result = calculate(data);

    expect(result.totalHitos).toBe(1);
    expect(result.totalCriteriosExito).toBe(1);
    expect(result.totalEquipo).toBe(2);
    expect(result.dedicacionPromedio).toBe(30);
    expect(result.tieneSponsor).toBe(true);
  });
});

describe("ficha-proyecto validate", () => {
  it("alerta cuando el problema contiene una causa", () => {
    const data = emptyData();
    data.problemaOportunidad = "Los retrasos ocurren porque el proveedor entrega tarde.";

    const warnings = validate(data);

    expect(warnings.map((w) => w.code)).toContain("problema_con_causa");
  });

  it("alerta cuando el problema contiene una solución", () => {
    const data = emptyData();
    data.problemaOportunidad = "Necesitamos implementar un nuevo sistema de seguimiento.";

    const warnings = validate(data);

    expect(warnings.map((w) => w.code)).toContain("problema_con_solucion");
  });

  it("no alerta sobre un problema bien redactado con alcance y criterios completos", () => {
    const data = emptyData();
    data.problemaOportunidad =
      "Desde enero, el 30% de los pedidos llegan con más de 2 días de atraso, afectando a 50 clientes mensuales.";
    data.objetivo = "Reducir los pedidos atrasados a menos de 10% antes de junio de 2026.";
    data.alcanceDentro = ["Proceso de despacho"];
    data.alcanceFuera = ["Producción"];
    data.criteriosExito = [{ id: "1", nombre: "Atraso < 10%", definicion: "", meta: "10%" }];

    const warnings = validate(data);

    expect(warnings.map((w) => w.code)).not.toContain("problema_con_causa");
    expect(warnings.map((w) => w.code)).not.toContain("problema_con_solucion");
    expect(warnings.map((w) => w.code)).not.toContain("sin_alcance_dentro");
    expect(warnings.map((w) => w.code)).not.toContain("sin_alcance_fuera");
    expect(warnings.map((w) => w.code)).not.toContain("sin_criterios_exito");
  });
});
