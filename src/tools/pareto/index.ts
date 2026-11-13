import type { ToolDefinition } from "@/tools/_types";
import { paretoSchema, type ParetoData } from "./schema";
import { calculate, validate } from "./calculations";
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
  connections: { feeds: [] },
  ai: { guideQuestions, knowledgeRefs },
  Editor,
  Viewer,
};
