import { describe, expect, it } from "vitest";
import { calculate, validate } from "./calculations";
import { cincoPorquesSchema } from "./schema";

function emptyData() {
  return cincoPorquesSchema.parse({});
}

function paso(porQueN: number, respuesta: string, evidencia: string[] = []) {
  return { id: String(porQueN), porQueN, respuesta, evidencia };
}

describe("cinco-porques calculate", () => {
  it("cuenta pasos totales, con evidencia y sin evidencia", () => {
    const data = emptyData();
    data.cadena = [
      paso(1, "El informe llegó tarde", ["Registro de envío"]),
      paso(2, "El sistema estaba caído", []),
      paso(3, "No había respaldo configurado", ["Ticket de soporte"]),
    ];

    const result = calculate(data);

    expect(result.totalPasos).toBe(3);
    expect(result.pasosConEvidencia).toBe(2);
    expect(result.pasosSinEvidencia).toBe(1);
  });
});

describe("cinco-porques validate", () => {
  it("no alerta con una cadena completa de 5 pasos, con evidencia y causa raíz definida", () => {
    const data = emptyData();
    data.puntoPartida = "El proyecto se entregó con 10 días de atraso.";
    data.cadena = [
      paso(1, "Porque la fase de pruebas se extendió", ["Bitácora del proyecto"]),
      paso(2, "Porque se encontraron muchos defectos", ["Reporte de QA"]),
      paso(3, "Porque el código no pasó por revisión de pares", ["Historial de PRs"]),
      paso(4, "Porque el equipo no tenía tiempo asignado para revisiones", ["Plan de dedicación"]),
      paso(5, "Porque el proceso no exige revisión de pares como requisito", ["Política de desarrollo"]),
    ];
    data.causaRaizCandidata = "El proceso de desarrollo no exige revisión de pares obligatoria.";

    const warnings = validate(data);

    expect(warnings).toEqual([]);
  });

  it("alerta cuando la cadena tiene menos de 3 pasos", () => {
    const data = emptyData();
    data.cadena = [paso(1, "Porque el proveedor entregó tarde", ["Orden de compra"])];
    data.causaRaizCandidata = "Proveedor no cumple SLA";

    const warnings = validate(data);

    expect(warnings.map((w) => w.code)).toContain("cadena_corta");
  });

  it("alerta cuando una respuesta culpa a una persona", () => {
    const data = emptyData();
    data.cadena = [
      paso(1, "Porque el informe tenía errores", ["Revisión"]),
      paso(2, "Porque es error de Juan al cargar los datos", ["Correo de reclamo"]),
      paso(3, "Porque no se validó el archivo antes de cargarlo", ["Checklist"]),
    ];
    data.causaRaizCandidata = "No existe validación automática de archivos antes de la carga.";

    const warnings = validate(data);

    expect(warnings.some((w) => w.code.startsWith("culpa_persona"))).toBe(true);
  });
});
