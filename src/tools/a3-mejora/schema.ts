import { z } from "zod";

export const estadoAccionEnum = z.enum(["abierta", "en_curso", "cerrada", "cancelada"]);

export const solucionSchema = z.object({
  id: z.string(),
  solucion: z.string().default(""),
  causaRef: z.string().default(""),
});

export const accionSchema = z.object({
  id: z.string(),
  descripcion: z.string().default(""),
  responsable: z.string().default(""),
  fechaCompromiso: z.string().default(""),
  estado: estadoAccionEnum.default("abierta"),
});

export const a3MejoraSchema = z.object({
  titulo: z.string().default(""),
  lider: z.string().default(""),
  fecha: z.string().default(""),
  b1ContextoProblema: z.string().default(""),
  b2SituacionActualDesperdicios: z.string().default(""),
  b3AnalisisCausasRaiz: z.string().default(""),
  b4DisenoSoluciones: z.array(solucionSchema).default([]),
  b5Implementacion: z.array(accionSchema).default([]),
  b6Seguimiento: z.string().default(""),
});

export type SolucionA3 = z.infer<typeof solucionSchema>;
export type AccionA3 = z.infer<typeof accionSchema>;
export type A3MejoraData = z.infer<typeof a3MejoraSchema>;
