import type { ToolDefinition } from "@/tools/_types";
import { cynefinSchema, type CynefinData } from "./schema";
import { calculate, validate } from "./calculations";
import { guideQuestions, knowledgeRefs } from "./ai";
import { Editor } from "./Editor";
import { Viewer } from "./Viewer";

export const cynefinTool: ToolDefinition<CynefinData> = {
  id: "cynefin",
  name: "Diagnóstico Cynefin",
  category: "analisis_problemas",
  origin: ["LA", "SCRUM"],
  description:
    "Identifica el tipo de contexto (simple, complicado, complejo, caótico) para elegir la lógica de decisión e intervención adecuada.",
  uiKind: "form",
  schema: cynefinSchema,
  schemaVersion: 1,
  emptyData: () => cynefinSchema.parse({}),
  calculate,
  validate,
  connections: { feeds: [] },
  ai: { guideQuestions, knowledgeRefs },
  Editor,
  Viewer,
};
