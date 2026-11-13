import { z } from "zod";

export const impactoCategoriaEnum = z.enum([
  "ganancias_volumen_precio",
  "reduccion_costos",
  "reduccion_capital_trabajo",
  "otros",
]);

export const rolEquipoEnum = z.enum([
  "sponsor",
  "lider_jp",
  "coach",
  "contralor_financiero",
  "dueno_proceso",
  "po",
  "sm",
  "ba",
  "miembro",
  "otro",
]);

export const criterioExitoSchema = z.object({
  id: z.string(),
  nombre: z.string().min(1),
  definicion: z.string().default(""),
  meta: z.string().default(""),
});

export const hitoSchema = z.object({
  id: z.string(),
  hito: z.string().min(1),
  fecha: z.string().default(""),
});

export const integranteSchema = z.object({
  id: z.string(),
  persona: z.string().min(1),
  rol: rolEquipoEnum,
  dedicacionPct: z.number().min(0).max(100).default(100),
});

export const fichaProyectoSchema = z.object({
  impactoNegocio: z.object({
    descripcion: z.string().default(""),
    categoria: impactoCategoriaEnum.default("otros"),
    valor: z.number().default(0),
  }).default({ descripcion: "", categoria: "otros", valor: 0 }),
  problemaOportunidad: z.string().default(""),
  objetivo: z.string().default(""),
  alcanceDentro: z.array(z.string()).default([]),
  alcanceFuera: z.array(z.string()).default([]),
  criteriosExito: z.array(criterioExitoSchema).default([]),
  planHitos: z.array(hitoSchema).default([]),
  equipo: z.array(integranteSchema).default([]),
  fecha: z.string().default(""),
  compromisoSponsor: z
    .object({
      nivel: z.number().min(1).max(5).default(3),
      recursosAsegurados: z.string().default(""),
      recursosFaltantes: z.string().default(""),
    })
    .default({ nivel: 3, recursosAsegurados: "", recursosFaltantes: "" }),
  supuestos: z.array(z.string()).default([]),
  restricciones: z.array(z.string()).default([]),
});

export type FichaProyectoData = z.infer<typeof fichaProyectoSchema>;
