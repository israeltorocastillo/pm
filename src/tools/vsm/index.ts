import type { ToolDefinition } from "@/tools/_types";
import { vsmSchema, type VsmData } from "./schema";
import { calculate, validate } from "./calculations";
import { guideQuestions, knowledgeRefs } from "./ai";
import { Editor } from "./Editor";
import { Viewer } from "./Viewer";

export const vsmTool: ToolDefinition<VsmData> = {
  id: "vsm",
  name: "Mapa de cadena de valor (VSM)",
  category: "mejora_continua",
  origin: ["LEAN", "SS"],
  description:
    "Visualiza cómo fluye el valor hasta el cliente, con esperas y datos por paso, para encontrar desperdicios y restricciones.",
  uiKind: "canvas",
  schema: vsmSchema,
  schemaVersion: 1,
  emptyData: () => vsmSchema.parse({}),
  calculate,
  validate,
  connections: { feeds: [] },
  ai: { guideQuestions, knowledgeRefs },
  Editor,
  Viewer,
};
