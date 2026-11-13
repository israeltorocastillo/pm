import type { ToolDefinition } from "@/tools/_types";
import { fichaProyectoTool } from "@/tools/ficha-proyecto";
import { ishikawaTool } from "@/tools/ishikawa";
import { paretoTool } from "@/tools/pareto";

const registry: ToolDefinition<never>[] = [
  fichaProyectoTool,
  ishikawaTool,
  paretoTool,
] as unknown as ToolDefinition<never>[];

export function listToolDefinitions(): ToolDefinition<never>[] {
  return registry;
}

export function getToolDefinition(toolId: string): ToolDefinition<never> | undefined {
  return registry.find((tool) => tool.id === toolId);
}
