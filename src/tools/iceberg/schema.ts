import { z } from "zod";

export const nivelIcebergEnum = z.enum(["evento", "patron", "estructura", "mentalidad"]);

export const tarjetaIcebergSchema = z.object({
  id: z.string(),
  texto: z.string().min(1),
  nivel: nivelIcebergEnum,
});

export const accionIcebergSchema = z.object({
  id: z.string(),
  descripcion: z.string().min(1),
  responsable: z.string().default(""),
  nivelIntervenido: nivelIcebergEnum,
});

export const icebergSchema = z.object({
  situacion: z.string().default(""),
  tarjetas: z.array(tarjetaIcebergSchema).default([]),
  descubrimiento: z.string().default(""),
  acciones: z.array(accionIcebergSchema).default([]),
});

export type IcebergData = z.infer<typeof icebergSchema>;
export type TarjetaIceberg = z.infer<typeof tarjetaIcebergSchema>;
export type AccionIceberg = z.infer<typeof accionIcebergSchema>;
export type NivelIceberg = z.infer<typeof nivelIcebergEnum>;

export const NIVELES_ICEBERG: NivelIceberg[] = ["evento", "patron", "estructura", "mentalidad"];

export const NIVEL_ICEBERG_LABELS: Record<NivelIceberg, string> = {
  evento: "Eventos",
  patron: "Patrones",
  estructura: "Estructura",
  mentalidad: "Mentalidades",
};
