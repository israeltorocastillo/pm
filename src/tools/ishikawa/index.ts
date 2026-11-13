import type { ToolDefinition } from "@/tools/_types";
import { ishikawaSchema, type IshikawaData, CATEGORIAS_6M } from "./schema";
import { calculate, validate } from "./calculations";
import { guideQuestions, knowledgeRefs } from "./ai";
import { Editor } from "./Editor";
import { Viewer } from "./Viewer";

function emptyData(): IshikawaData {
  return ishikawaSchema.parse({
    metodo: "6m",
    categorias: CATEGORIAS_6M.map((nombre) => ({ id: crypto.randomUUID(), nombre })),
  });
}

export const ishikawaTool: ToolDefinition<IshikawaData> = {
  id: "ishikawa",
  name: "Diagrama de Ishikawa (causa-efecto)",
  category: "analisis_problemas",
  origin: ["LA", "BA", "BIM", "SS"],
  description:
    "Ordena visualmente causas y subcausas de un efecto no deseado; amplía el análisis y estructura hipótesis.",
  uiKind: "canvas",
  schema: ishikawaSchema,
  schemaVersion: 1,
  emptyData,
  calculate,
  validate,
  connections: {
    feeds: [
      {
        toolId: "pareto",
        label: "Enviar causas priorizadas a Pareto",
        map: (data: IshikawaData) => ({
          titulo: `Pareto de causas — ${data.efecto || "sin efecto definido"}`,
          unidadImpacto: "votos 5-3-1",
          modo: "frecuencia",
          categorias: data.causas.map((c) => ({
            id: crypto.randomUUID(),
            nombre: c.texto,
            frecuencia: c.votos531 > 0 ? c.votos531 : 1,
          })),
        }),
      },
    ],
  },
  ai: { guideQuestions, knowledgeRefs },
  Editor,
  Viewer,
};
