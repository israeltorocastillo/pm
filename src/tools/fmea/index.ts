import type { ToolDefinition } from "@/tools/_types";
import { fmeaSchema, type FmeaData } from "./schema";
import { calculate, validate } from "./calculations";
import { guideQuestions, knowledgeRefs } from "./ai";
import { Editor } from "./Editor";
import { Viewer } from "./Viewer";

export const fmeaTool: ToolDefinition<FmeaData> = {
  id: "fmea",
  name: "FMEA (AMEF)",
  category: "mejora_continua",
  origin: ["SS", "LA"],
  description:
    "Anticipa modos de falla de un proceso o producto, los prioriza por RPN y asigna acciones, recalculando tras ejecutarlas.",
  uiKind: "table",
  schema: fmeaSchema,
  schemaVersion: 1,
  emptyData: () => fmeaSchema.parse({}),
  calculate,
  validate,
  connections: {
    feeds: [
      {
        toolId: "plan-control",
        label: "Enviar controles a Plan de control",
        map: (data: FmeaData) => {
          const filasSobreUmbral = data.filas
            .filter((f) => f.sev * f.occ * f.det >= data.umbralRpn)
            .map((f) => ({
              id: crypto.randomUUID(),
              procesoActividad: f.pasoEntrada || f.modoFalla,
              indicadorNombre: f.modoFalla,
              especificacionTolerancia: "",
              valorActual: "",
              valorObjetivo: "",
              metodoControl: f.controlesActuales,
              tecnicaMedicion: "",
              frecuencia: "",
              responsable: "",
              metodoRegistro: "lista_verificacion",
              procedimientoReajuste: "",
            }));

          return { formato: "simple_lean", filas: filasSobreUmbral };
        },
      },
    ],
  },
  ai: { guideQuestions, knowledgeRefs },
  Editor,
  Viewer,
};
