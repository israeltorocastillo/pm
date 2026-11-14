import type { ToolDefinition } from "@/tools/_types";
import { leccionAprendidaSchema, type LeccionAprendidaData } from "./schema";
import { calculate, validate } from "./calculations";
import { guideQuestions, knowledgeRefs } from "./ai";
import { Editor } from "./Editor";
import { Viewer } from "./Viewer";

const CHECKLIST_PREGUNTAS: { bloque: "A" | "B" | "C" | "D" | "E"; pregunta: string }[] = [
  // Bloque A - Origen
  { bloque: "A", pregunta: "¿Se basa en un proyecto real?" },
  { bloque: "A", pregunta: "¿Describe un evento concreto?" },
  { bloque: "A", pregunta: "¿Queda claro cuándo y dónde pasó?" },
  // Bloque B - Contenido
  { bloque: "B", pregunta: "¿Explica lo esperado frente a lo ocurrido?" },
  {
    bloque: "B",
    pregunta:
      "¿Identifica causas y no solo síntomas (idealmente con Ishikawa o Pareto)?",
  },
  { bloque: "B", pregunta: "¿Describe la respuesta?" },
  // Bloque C - Aprendizaje
  { bloque: "C", pregunta: "¿Hay una frase explícita ('Aprendimos que…')?" },
  { bloque: "C", pregunta: "¿Es específico y no una obviedad?" },
  { bloque: "C", pregunta: "¿Se basa en evidencia?" },
  // Bloque D - Aplicabilidad
  { bloque: "D", pregunta: "¿Indica en qué condiciones aplica?" },
  { bloque: "D", pregunta: "¿Incluye una recomendación concreta?" },
  { bloque: "D", pregunta: "¿Previene un problema o permite repetir un éxito?" },
  // Bloque E - Calidad del registro
  { bloque: "E", pregunta: "¿Es clara y entendible para un externo?" },
  { bloque: "E", pregunta: "¿Evita culpas?" },
  { bloque: "E", pregunta: "¿Podría ir tal cual a un repositorio?" },
];

function emptyData(): LeccionAprendidaData {
  return leccionAprendidaSchema.parse({
    checklist: CHECKLIST_PREGUNTAS.map(({ bloque, pregunta }) => ({
      id: crypto.randomUUID(),
      bloque,
      pregunta,
      respuesta: false,
    })),
  });
}

export const leccionAprendidaTool: ToolDefinition<LeccionAprendidaData> = {
  id: "leccion-aprendida",
  name: "Registro de lecciones aprendidas",
  category: "conocimiento_cierre",
  origin: ["LA"],
  description:
    "Convierte una experiencia analizada en conocimiento transferible, validado por un checklist de calidad (A-E), para el repositorio de lecciones aprendidas.",
  uiKind: "form",
  schema: leccionAprendidaSchema,
  schemaVersion: 1,
  emptyData,
  calculate,
  validate,
  connections: { feeds: [] },
  ai: { guideQuestions, knowledgeRefs },
  Editor,
  Viewer,
};
