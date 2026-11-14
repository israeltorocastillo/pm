import type { ToolDefinition } from "@/tools/_types";
import { fichaProyectoTool } from "@/tools/ficha-proyecto";
import { ishikawaTool } from "@/tools/ishikawa";
import { paretoTool } from "@/tools/pareto";
import { cincoPorquesTool } from "@/tools/cinco-porques";
import { cynefinTool } from "@/tools/cynefin";
import { icebergTool } from "@/tools/iceberg";
import { sipocTool } from "@/tools/sipoc";
import { vsmTool } from "@/tools/vsm";
import { fmeaTool } from "@/tools/fmea";
import { planControlTool } from "@/tools/plan-control";
import { a3MejoraTool } from "@/tools/a3-mejora";
import { leccionAprendidaTool } from "@/tools/leccion-aprendida";

const registry: ToolDefinition<never>[] = [
  fichaProyectoTool,
  ishikawaTool,
  paretoTool,
  cincoPorquesTool,
  cynefinTool,
  icebergTool,
  sipocTool,
  vsmTool,
  fmeaTool,
  planControlTool,
  a3MejoraTool,
  leccionAprendidaTool,
] as unknown as ToolDefinition<never>[];

export function listToolDefinitions(): ToolDefinition<never>[] {
  return registry;
}

export function getToolDefinition(toolId: string): ToolDefinition<never> | undefined {
  return registry.find((tool) => tool.id === toolId);
}
