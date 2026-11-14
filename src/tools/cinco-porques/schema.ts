import { z } from "zod";

export const cadenaPasoSchema = z.object({
  id: z.string(),
  porQueN: z.number().int().min(1),
  respuesta: z.string().default(""),
  evidencia: z.array(z.string()).default([]),
});

export const cincoPorquesSchema = z.object({
  puntoPartida: z.string().default(""),
  cadena: z.array(cadenaPasoSchema).default([]),
  causaRaizCandidata: z.string().default(""),
  requiereDemostracion: z.boolean().default(true),
});

export type CincoPorquesData = z.infer<typeof cincoPorquesSchema>;
export type CadenaPaso = z.infer<typeof cadenaPasoSchema>;
