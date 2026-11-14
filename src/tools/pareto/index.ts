import type { ToolDefinition } from "@/tools/_types";
import { paretoSchema, type ParetoData } from "./schema";
import { calculate, computeParetoRows, validate } from "./calculations";
import { guideQuestions, knowledgeRefs } from "./ai";
import { Editor } from "./Editor";
import { Viewer } from "./Viewer";

export const paretoTool: ToolDefinition<ParetoData> = {
  id: "pareto",
  name: "Pareto y estratificación",
  category: "analisis_problemas",
  origin: ["LA", "SS", "SCRUM"],
  description:
    'Prioriza por contribución localizando los "pocos vitales"; Ishikawa amplía el análisis, Pareto focaliza la intervención.',
  uiKind: "calculator",
  schema: paretoSchema,
  schemaVersion: 1,
  emptyData: () => paretoSchema.parse({}),
  calculate,
  validate,
  connections: {
    feeds: [
      {
        toolId: "a3-mejora",
        label: "Enviar pocos vitales a A3",
        map: (data: ParetoData) => {
          const rows = computeParetoRows(data);
          const vitales = rows.slice(0, Math.min(3, rows.length));
          const resumen = vitales
            .map(
              (r, i) =>
                `${i + 1}) ${r.nombre} — ${r.pctContribucion.toFixed(1)}% de contribución (acumulado ${r.pctAcumulado.toFixed(1)}%)`,
            )
            .join("\n");

          return {
            titulo: `A3 — ${data.titulo || "sin título"}`,
            b3AnalisisCausasRaiz: `Pocos vitales del Pareto "${data.titulo}":\n${resumen}`,
          };
        },
      },
    ],
  },
  ai: { guideQuestions, knowledgeRefs },
  Editor,
  Viewer,
};
