import { z } from "zod";

export const metodoIshikawaEnum = z.enum([
  "6m",
  "categorias_pm",
  "flujo_proceso",
  "estratificacion",
  "plantilla_bim",
  "libre",
]);

export const causaSchema = z.object({
  id: z.string(),
  categoria: z.string().min(1),
  texto: z.string().min(1),
  padreRef: z.string().nullable().default(null),
  evidencia: z.array(z.string()).default([]),
  votos531: z.number().min(0).default(0),
  aValidar: z.boolean().default(false),
});

export const ishikawaSchema = z.object({
  efecto: z.string().default(""),
  alcance: z.string().default(""),
  metodo: metodoIshikawaEnum.default("6m"),
  categorias: z.array(z.object({ id: z.string(), nombre: z.string().min(1) })).default([]),
  causas: z.array(causaSchema).default([]),
});

export type IshikawaData = z.infer<typeof ishikawaSchema>;
export type Causa = z.infer<typeof causaSchema>;

export const CATEGORIAS_6M = ["Métodos", "Mano de obra", "Materiales", "Maquinaria", "Medición", "Medio ambiente"];
