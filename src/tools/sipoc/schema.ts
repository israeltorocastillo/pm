import { z } from "zod";

export const entradaSipocSchema = z.object({
  id: z.string(),
  entrada: z.string().default(""),
  requisito: z.string().default(""),
});

export const pasoSipocSchema = z.object({
  id: z.string(),
  paso: z.string().default(""),
});

export const salidaSipocSchema = z.object({
  id: z.string(),
  salida: z.string().default(""),
  requisito: z.string().default(""),
});

export const sipocSchema = z.object({
  proveedores: z.array(z.string()).default([]),
  entradas: z.array(entradaSipocSchema).default([]),
  proceso: z.array(pasoSipocSchema).default([]),
  salidas: z.array(salidaSipocSchema).default([]),
  clientes: z.array(z.string()).default([]),
  limite_inicio: z.string().default(""),
  limite_fin: z.string().default(""),
  xs_preliminares: z.array(z.string()).default([]),
});

export type SipocData = z.infer<typeof sipocSchema>;
export type EntradaSipoc = z.infer<typeof entradaSipocSchema>;
export type PasoSipoc = z.infer<typeof pasoSipocSchema>;
export type SalidaSipoc = z.infer<typeof salidaSipocSchema>;
