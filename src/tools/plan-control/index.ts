import type { ToolDefinition } from "@/tools/_types";
import { planControlSchema, type PlanControlData } from "./schema";
import { calculate, validate } from "./calculations";
import { guideQuestions, knowledgeRefs } from "./ai";
import { Editor } from "./Editor";
import { Viewer } from "./Viewer";

export const planControlTool: ToolDefinition<PlanControlData> = {
  id: "plan-control",
  name: "Plan de control",
  category: "mejora_continua",
  origin: ["LEAN", "SS"],
  description:
    "Documento vivo para sostener los resultados de una mejora: qué se controla, cómo, cada cuánto y quién reacciona ante desviaciones.",
  uiKind: "table",
  schema: planControlSchema,
  schemaVersion: 1,
  emptyData: () => planControlSchema.parse({}),
  calculate,
  validate,
  connections: { feeds: [] },
  ai: { guideQuestions, knowledgeRefs },
  Editor,
  Viewer,
};
