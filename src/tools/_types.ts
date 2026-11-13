import type { ComponentType } from "react";
import type { z } from "zod";

export type ToolCategory =
  | "estrategia_portafolio"
  | "analisis_negocio"
  | "gestion_proyectos"
  | "mejora_continua"
  | "analisis_problemas"
  | "equipo_liderazgo"
  | "conocimiento_cierre"
  | "bim";

export type MethodWarning = {
  code: string;
  message: string;
  severity: "info" | "warning";
};

export type EditorProps<TData> = {
  data: TData;
  onChange: (data: TData) => void;
  warnings: MethodWarning[];
};

export type ViewerProps<TData> = {
  data: TData;
  derived?: Record<string, unknown>;
};

export type ToolFeed<TData> = {
  /** ID de la herramienta destino en el catálogo (registry.ts). */
  toolId: string;
  /** Etiqueta corta para el botón de acción ("Enviar causas a Pareto"). */
  label: string;
  /** Produce los datos iniciales de la nueva instancia a partir de esta. */
  map: (data: TData) => unknown;
};

export interface ToolDefinition<TData = unknown> {
  id: string;
  name: string;
  category: ToolCategory;
  origin: string[];
  description: string;
  uiKind: "form" | "table" | "canvas" | "board" | "calculator";
  schema: z.ZodType<TData>;
  schemaVersion: number;
  emptyData: () => TData;
  calculate?: (data: TData) => Record<string, unknown>;
  validate?: (data: TData) => MethodWarning[];
  connections: {
    feeds: ToolFeed<TData>[];
  };
  ai: {
    guideQuestions: string[];
    knowledgeRefs: string[];
  };
  Editor: ComponentType<EditorProps<TData>>;
  Viewer: ComponentType<ViewerProps<TData>>;
}
