import { z } from "zod";

export const modoCynefinEnum = z.enum(["proyecto_completo", "por_componentes"]);

export const dominioCynefinEnum = z.enum(["simple", "complicado", "complejo", "caotico"]);

export const enfoqueSugeridoEnum = z.enum([
  "predictivo",
  "agil",
  "hibrido",
  "estabilizar_primero",
]);

export const dominioDescartadoSchema = z.object({
  dominio: dominioCynefinEnum,
  razon: z.string().default(""),
});

export const componenteCynefinSchema = z.object({
  id: z.string(),
  descripcion: z.string().default(""),
  dominio: dominioCynefinEnum.default("complicado"),
  senales: z.array(z.string()).default([]),
  dominioDescartado: dominioDescartadoSchema.optional(),
  intervencion: z.string().default(""),
});

export const cynefinSchema = z.object({
  modo: modoCynefinEnum.default("proyecto_completo"),
  situacionDecisionCritica: z.string().default(""),
  componentes: z.array(componenteCynefinSchema).default([]),
  riesgoMalaLectura: z.string().default(""),
  recomendacionEjecutiva: z.string().default(""),
});

export type CynefinData = z.infer<typeof cynefinSchema>;
export type ComponenteCynefin = z.infer<typeof componenteCynefinSchema>;
export type DominioCynefin = z.infer<typeof dominioCynefinEnum>;
export type EnfoqueSugerido = z.infer<typeof enfoqueSugeridoEnum>;
