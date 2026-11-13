import type { ToolDefinition } from "@/tools/_types";
import { fichaProyectoSchema, type FichaProyectoData } from "./schema";
import { calculate, validate } from "./calculations";
import { guideQuestions, knowledgeRefs } from "./ai";
import { Editor } from "./Editor";
import { Viewer } from "./Viewer";

export const fichaProyectoTool: ToolDefinition<FichaProyectoData> = {
  id: "ficha-proyecto",
  name: "Ficha de proyecto / Project Charter",
  category: "gestion_proyectos",
  origin: ["SS", "BA", "CE", "LA", "LEAN"],
  description:
    "Acta que define la misión del proyecto: por qué, qué problema, objetivo, alcance, plan y equipo.",
  uiKind: "form",
  schema: fichaProyectoSchema,
  schemaVersion: 1,
  emptyData: () => fichaProyectoSchema.parse({}),
  calculate,
  validate,
  connections: { feeds: [] },
  ai: { guideQuestions, knowledgeRefs },
  Editor,
  Viewer,
};
