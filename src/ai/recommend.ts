import { getToolDefinition } from "@/tools/registry";

export type RecommendationRule = {
  signal: string;
  projectType:
    | "PREDICTIVO"
    | "AGIL_SCRUM"
    | "HIBRIDO"
    | "MEJORA_LEAN"
    | "MEJORA_SIX_SIGMA"
    | "ANALISIS_NEGOCIO"
    | "BIM";
  route: string[];
};

/**
 * Matriz síntoma -> tipo de proyecto y ruta de herramientas (docs/05_asistente_ia.md §3).
 * `route` usa los IDs del catálogo completo; no todas están implementadas aún
 * (ver `isToolAvailable`), pero sirven para justificar la recomendación.
 */
export const RECOMMENDATION_RULES: RecommendationRule[] = [
  {
    signal: "Proceso repetitivo con defectos/variación y datos medibles",
    projectType: "MEJORA_SIX_SIGMA",
    route: ["ficha-proyecto", "sipoc", "voc-ccr", "plan-medicion", "ishikawa", "pareto", "fmea", "plan-control"],
  },
  {
    signal: "Tiempos largos, esperas, desperdicio, flujo",
    projectType: "MEJORA_LEAN",
    route: ["ficha-proyecto", "vsm", "a3-mejora", "plan-control"],
  },
  {
    signal: "Problema recurrente sin causa clara, muchas áreas involucradas",
    projectType: "HIBRIDO",
    route: ["cynefin", "iceberg", "ishikawa", "pareto", "a3-mejora", "leccion-aprendida"],
  },
  {
    signal: "Problema difuso, visiones distintas entre interesados (sistema blando)",
    projectType: "ANALISIS_NEGOCIO",
    route: ["mapa-stakeholders", "ssm", "analisis-brechas", "matriz-priorizacion"],
  },
  {
    signal: "Nueva iniciativa/producto, necesidades por descubrir",
    projectType: "ANALISIS_NEGOCIO",
    route: ["pestle", "cinco-fuerzas", "foda", "tows", "plan-elicitacion", "repositorio-requisitos", "casos-uso"],
  },
  {
    signal: "Requisitos cambiantes, entrega incremental de valor",
    projectType: "AGIL_SCRUM",
    route: ["vision-producto", "product-backlog", "estimacion-agil", "sprint-scrum", "metricas-agiles", "retrospectiva"],
  },
  {
    signal: "Alcance claro, entregables definidos, restricciones fuertes",
    projectType: "PREDICTIVO",
    route: ["ficha-proyecto", "mapa-stakeholders", "matriz-raci", "cronograma-gantt", "registro-riesgos"],
  },
  {
    signal: "Proyecto de construcción/infraestructura con modelos",
    projectType: "BIM",
    route: ["diagnostico-bim", "peb", "coordinacion-bim", "entrega-operacion"],
  },
];

export function isToolAvailable(toolId: string): boolean {
  return getToolDefinition(toolId) !== undefined;
}

export function annotateRoute(route: string[]) {
  return route.map((toolId) => ({
    toolId,
    available: isToolAvailable(toolId),
    name: getToolDefinition(toolId)?.name,
  }));
}
