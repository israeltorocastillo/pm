import { z } from "zod";

export const tipoNodoEnum = z.enum(["proceso", "decision", "cliente_proveedor", "operador", "transporte"]);
export const clasificacionEnum = z.enum(["VA", "BNVA", "NVA"]);
export const desperdicioEnum = z.enum([
  "transporte",
  "inventario",
  "movimiento",
  "espera",
  "sobreproduccion",
  "sobreprocesamiento",
  "defectos",
  "talento_no_utilizado",
]);
export const tipoFlujoEnum = z.enum([
  "generico",
  "push",
  "pull",
  "material_cliente",
  "informacion_manual",
  "informacion_electronica",
]);

export const pasoVsmSchema = z.object({
  id: z.string(),
  nombre: z.string().default(""),
  tipoNodo: tipoNodoEnum.default("proceso"),
  pt: z.number().min(0).default(0),
  ct: z.number().min(0).default(0),
  lote: z.number().min(0).default(1),
  calidadPct: z.number().min(0).max(100).default(100),
  reprocesoPct: z.number().min(0).max(100).default(0),
  frecuencia: z.string().default(""),
  operadores: z.number().min(0).default(1),
  clasificacion: clasificacionEnum.default("VA"),
  desperdicio: desperdicioEnum.nullable().default(null),
  responsableColor: z.string().default(""),
});

export const esperaVsmSchema = z.object({
  id: z.string(),
  entrePasos: z.string().default(""),
  wip: z.number().min(0).default(0),
  dt: z.number().min(0).default(0),
});

export const flujoVsmSchema = z.object({
  id: z.string(),
  origen: z.string().default(""),
  destino: z.string().default(""),
  tipo: tipoFlujoEnum.default("generico"),
});

export const vsmSchema = z.object({
  flujoSeleccionado: z.string().default(""),
  version: z.enum(["actual", "futuro"]).default("actual"),
  clienteDemanda: z
    .object({
      cliente: z.string().default(""),
      demanda: z.number().min(0).default(0),
      unidad: z.string().default(""),
      tiempoDisponible: z.number().min(0).default(0),
      unidadTiempo: z.string().default(""),
    })
    .default({ cliente: "", demanda: 0, unidad: "", tiempoDisponible: 0, unidadTiempo: "" }),
  pasos: z.array(pasoVsmSchema).default([]),
  esperas: z.array(esperaVsmSchema).default([]),
  flujos: z.array(flujoVsmSchema).default([]),
  tasaSalida: z.number().min(0).nullable().default(null),
  ideasMejora: z.array(z.string()).default([]),
});

export type VsmData = z.infer<typeof vsmSchema>;
export type PasoVsm = z.infer<typeof pasoVsmSchema>;
export type EsperaVsm = z.infer<typeof esperaVsmSchema>;
