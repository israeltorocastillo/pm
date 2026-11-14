import { z } from "zod";

export const accionFmeaSchema = z.object({
  id: z.string(),
  descripcion: z.string().min(1),
  responsable: z.string().default(""),
  estado: z.enum(["abierta", "en_curso", "cerrada", "cancelada"]).default("abierta"),
});

export const filaFmeaSchema = z.object({
  id: z.string(),
  pasoEntrada: z.string().default(""),
  modoFalla: z.string().default(""),
  efecto: z.string().default(""),
  sev: z.number().min(1).max(10).default(1),
  causa: z.string().default(""),
  occ: z.number().min(1).max(10).default(1),
  controlesActuales: z.string().default(""),
  det: z.number().min(1).max(10).default(1),
  accionesRecomendadas: z.array(accionFmeaSchema).default([]),
  accionesTerminadas: z.string().default(""),
  sevPost: z.number().min(1).max(10).nullable().default(null),
  occPost: z.number().min(1).max(10).nullable().default(null),
  detPost: z.number().min(1).max(10).nullable().default(null),
});

export const fmeaSchema = z.object({
  tipo: z.enum(["proceso", "producto"]).default("proceso"),
  proceso: z.string().default(""),
  preparadoPor: z.string().default(""),
  responsables: z.array(z.string()).default([]),
  fechaOriginal: z.string().default(""),
  revision: z.number().int().default(1),
  filas: z.array(filaFmeaSchema).default([]),
  umbralRpn: z.number().default(100),
});

export type FmeaData = z.infer<typeof fmeaSchema>;
export type FilaFmea = z.infer<typeof filaFmeaSchema>;
export type AccionFmea = z.infer<typeof accionFmeaSchema>;
