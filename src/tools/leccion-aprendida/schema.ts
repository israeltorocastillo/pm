import { z } from "zod";

export const categoriaExperienciaEnum = z.enum([
  "coordinacion_entre_areas",
  "atrasos_y_planificacion",
  "cambios_de_alcance",
  "comunicacion_con_stakeholders",
  "control_y_seguimiento",
  "implementacion_tecnologica",
  "adquisiciones",
  "gestion_del_cambio",
  "calidad_defectos",
  "equipo",
  "otra",
]);

export const faseOrigenEnum = z.enum([
  "cierre_de_fase",
  "cierre_de_proyecto",
  "incidente",
  "retrospectiva",
  "dmaic_paso_15",
]);

export const bloqueChecklistEnum = z.enum(["A", "B", "C", "D", "E"]);

export const checklistItemSchema = z.object({
  id: z.string(),
  bloque: bloqueChecklistEnum,
  pregunta: z.string().min(1),
  respuesta: z.boolean().default(false),
});

export const leccionAprendidaSchema = z.object({
  titulo: z.string().default(""),
  categoriaExperiencia: categoriaExperienciaEnum.default("otra"),
  contexto: z.string().default(""),
  problema: z.string().default(""),
  causas: z.string().default(""),
  acciones: z.string().default(""),
  resultados: z.string().default(""),
  siEntoncesPorque: z.string().default(""),
  aprendimosQue: z.string().default(""),
  recomendaciones: z.array(z.string()).default([]),
  condicionesAplicacion: z.string().default(""),
  evidencia: z.array(z.string()).default([]),
  checklist: z.array(checklistItemSchema).default([]),
  faseOrigen: faseOrigenEnum.default("cierre_de_proyecto"),
});

export type ChecklistItem = z.infer<typeof checklistItemSchema>;
export type LeccionAprendidaData = z.infer<typeof leccionAprendidaSchema>;
