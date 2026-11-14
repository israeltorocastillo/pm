import type { ToolDefinition } from "@/tools/_types";
import { a3MejoraSchema, type A3MejoraData } from "./schema";
import { calculate, validate } from "./calculations";
import { guideQuestions, knowledgeRefs } from "./ai";
import { Editor } from "./Editor";
import { Viewer } from "./Viewer";

export const a3MejoraTool: ToolDefinition<A3MejoraData> = {
  id: "a3-mejora",
  name: "A3 de mejora",
  category: "mejora_continua",
  origin: ["LEAN"],
  description:
    "Narra un proyecto de mejora en una hoja de 6 bloques: problema, situación actual, causas raíz, soluciones, implementación y seguimiento.",
  uiKind: "form",
  schema: a3MejoraSchema,
  schemaVersion: 1,
  emptyData: () => a3MejoraSchema.parse({}),
  calculate,
  validate,
  connections: {
    feeds: [],
    feedsTasks: (data) => data.b5Implementacion.map((accion) => ({ title: accion.descripcion })),
  },
  ai: { guideQuestions, knowledgeRefs },
  Editor,
  Viewer,
};
