import type { ToolDefinition } from "@/tools/_types";
import { sipocSchema, type SipocData } from "./schema";
import { calculate, validate } from "./calculations";
import { guideQuestions, knowledgeRefs } from "./ai";
import { Editor } from "./Editor";
import { Viewer } from "./Viewer";

export const sipocTool: ToolDefinition<SipocData> = {
  id: "sipoc",
  name: "SIPOC / PEPSU",
  category: "mejora_continua",
  origin: ["SS", "LA"],
  description:
    "Mapa de alto nivel del proceso (Proveedores-Entradas-Proceso-Salidas-Clientes) que delimita el alcance antes de profundizar.",
  uiKind: "table",
  schema: sipocSchema,
  schemaVersion: 1,
  emptyData: () => sipocSchema.parse({}),
  calculate,
  validate,
  connections: { feeds: [] },
  ai: { guideQuestions, knowledgeRefs },
  Editor,
  Viewer,
};
