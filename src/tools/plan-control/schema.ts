import { z } from "zod";

export const formatoPlanControlEnum = z.enum(["simple_lean", "tres_bloques", "extendido_aiag"]);

export const metodoRegistroEnum = z.enum([
  "lista_verificacion",
  "grafico_proceso",
  "dispersion",
  "pareto",
  "spc",
]);

export const filaControlSchema = z.object({
  id: z.string(),
  procesoActividad: z.string().default(""),
  indicadorNombre: z.string().default(""),
  especificacionTolerancia: z.string().default(""),
  valorActual: z.string().default(""),
  valorObjetivo: z.string().default(""),
  metodoControl: z.string().default(""),
  tecnicaMedicion: z.string().default(""),
  frecuencia: z.string().default(""),
  responsable: z.string().default(""),
  metodoRegistro: metodoRegistroEnum.default("lista_verificacion"),
  procedimientoReajuste: z.string().default(""),
});

export const planRespuestaSchema = z.object({
  contencion: z.string().default(""),
  ajusteProceso: z.string().default(""),
  mejoraSistema: z.string().default(""),
});

export const planControlSchema = z.object({
  formato: formatoPlanControlEnum.default("simple_lean"),
  filas: z.array(filaControlSchema).default([]),
  // OJO con el bug típico de zod v4: `.default({})` en un objeto anidado NO vuelve a
  // pasar ese `{}` por los defaults internos del objeto (a diferencia de zod v3), por lo
  // que `planControlSchema.parse({})` dejaría `planRespuesta` como `{}` (sin `contencion`,
  // `ajusteProceso`, `mejoraSistema`) y rompería al Editor al leer esos campos. Por eso el
  // default se construye explícitamente parseando el propio sub-schema.
  planRespuesta: planRespuestaSchema.default(() => planRespuestaSchema.parse({})),
  duenoProcesoAcepta: z.boolean().default(false),
});

export type PlanControlData = z.infer<typeof planControlSchema>;
export type FilaControl = z.infer<typeof filaControlSchema>;
export type PlanRespuesta = z.infer<typeof planRespuestaSchema>;
