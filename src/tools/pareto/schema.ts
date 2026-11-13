import { z } from "zod";

export const modoParetoEnum = z.enum(["frecuencia", "frecuencia_costo", "exceso_objetivo"]);

export const categoriaParetoSchema = z.object({
  id: z.string(),
  nombre: z.string().min(1),
  frecuencia: z.number().default(0),
  costoUnitario: z.number().optional(),
  cantidadReal: z.number().optional(),
  cantidadObjetivo: z.number().optional(),
});

export const paretoSchema = z.object({
  titulo: z.string().default(""),
  periodoDesde: z.string().default(""),
  periodoHasta: z.string().default(""),
  fuente: z.string().default(""),
  unidadImpacto: z.string().default(""),
  modo: modoParetoEnum.default("frecuencia"),
  categorias: z.array(categoriaParetoSchema).default([]),
  factorEstratificacion: z.string().default(""),
});

export type ParetoData = z.infer<typeof paretoSchema>;
export type CategoriaPareto = z.infer<typeof categoriaParetoSchema>;
