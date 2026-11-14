import type { ToolDefinition } from "@/tools/_types";
import { icebergSchema, type IcebergData } from "./schema";
import { calculate, validate } from "./calculations";
import { guideQuestions, knowledgeRefs } from "./ai";
import { Editor } from "./Editor";
import { Viewer } from "./Viewer";

export const icebergTool: ToolDefinition<IcebergData> = {
  id: "iceberg",
  name: "Modelo del Iceberg",
  category: "analisis_problemas",
  origin: ["LA"],
  description:
    "Lee un problema recurrente en 4 niveles (eventos, patrones, estructura, mentalidades) para intervenir más allá del evento visible.",
  uiKind: "canvas",
  schema: icebergSchema,
  schemaVersion: 1,
  emptyData: () => icebergSchema.parse({}),
  calculate,
  validate,
  connections: { feeds: [] },
  ai: { guideQuestions, knowledgeRefs },
  Editor,
  Viewer,
};
