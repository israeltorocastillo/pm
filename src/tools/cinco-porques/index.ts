import type { ToolDefinition } from "@/tools/_types";
import { cincoPorquesSchema, type CincoPorquesData } from "./schema";
import { calculate, validate } from "./calculations";
import { guideQuestions, knowledgeRefs } from "./ai";
import { Editor } from "./Editor";
import { Viewer } from "./Viewer";

function emptyData(): CincoPorquesData {
  return cincoPorquesSchema.parse({
    cadena: [{ id: crypto.randomUUID(), porQueN: 1, respuesta: "", evidencia: [] }],
  });
}

export const cincoPorquesTool: ToolDefinition<CincoPorquesData> = {
  id: "cinco-porques",
  name: "5 porqués",
  category: "analisis_problemas",
  origin: ["LA", "SS"],
  description:
    "Profundiza una causa preguntando '¿por qué?' sucesivamente hasta acercarse a la causa raíz.",
  uiKind: "form",
  schema: cincoPorquesSchema,
  schemaVersion: 1,
  emptyData,
  calculate,
  validate,
  connections: { feeds: [] },
  ai: { guideQuestions, knowledgeRefs },
  Editor,
  Viewer,
};
