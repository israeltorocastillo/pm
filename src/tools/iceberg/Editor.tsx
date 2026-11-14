"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EditorProps } from "@/tools/_types";
import {
  NIVELES_ICEBERG,
  NIVEL_ICEBERG_LABELS,
  type IcebergData,
  type NivelIceberg,
} from "./schema";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

const BAND_STYLES: Record<NivelIceberg, string> = {
  evento: "bg-sky-50 border-sky-200",
  patron: "bg-sky-100 border-sky-300",
  estructura: "bg-sky-200 border-sky-400",
  mentalidad: "bg-sky-300 border-sky-500",
};

function IcebergDiagram({ data }: { data: IcebergData }) {
  const porNivel = useMemo(() => {
    const acc: Record<NivelIceberg, { id: string; texto: string }[]> = {
      evento: [],
      patron: [],
      estructura: [],
      mentalidad: [],
    };
    for (const t of data.tarjetas) {
      acc[t.nivel].push(t);
    }
    return acc;
  }, [data.tarjetas]);

  return (
    <div className="flex flex-col gap-0 overflow-hidden rounded-md border">
      {NIVELES_ICEBERG.map((nivel, i) => (
        <div key={nivel}>
          {i === 1 && (
            <div className="border-t-2 border-dashed border-slate-500 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              — línea de flotación —
            </div>
          )}
          <div className={`flex flex-wrap items-center gap-2 border-b p-3 ${BAND_STYLES[nivel]}`}>
            <span className="w-28 shrink-0 text-sm font-semibold text-slate-700">
              {NIVEL_ICEBERG_LABELS[nivel]}
            </span>
            <div className="flex flex-1 flex-wrap gap-2">
              {porNivel[nivel].length === 0 && (
                <span className="text-xs italic text-slate-500">Sin tarjetas</span>
              )}
              {porNivel[nivel].map((t) => (
                <span
                  key={t.id}
                  className="rounded-full border border-slate-400 bg-white/70 px-3 py-1 text-xs text-slate-800"
                >
                  {t.texto}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Editor({ data, onChange, warnings }: EditorProps<IcebergData>) {
  const [nuevoNivel, setNuevoNivel] = useState<NivelIceberg>("evento");
  const [nuevoTexto, setNuevoTexto] = useState("");
  const [accionNivel, setAccionNivel] = useState<NivelIceberg>("evento");
  const [accionDescripcion, setAccionDescripcion] = useState("");
  const [accionResponsable, setAccionResponsable] = useState("");

  return (
    <div className="flex flex-col gap-6">
      {warnings.length > 0 && (
        <div className="flex flex-col gap-1 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {warnings.map((w) => (
            <p key={w.code}>⚠ {w.message}</p>
          ))}
        </div>
      )}

      <IcebergDiagram data={data} />

      <div className="flex flex-col gap-2">
        <Label>Situación (descripción detallada real)</Label>
        <Textarea
          rows={3}
          value={data.situacion}
          onChange={(e) => onChange({ ...data, situacion: e.target.value })}
          placeholder="Describe la situación recurrente con el mayor detalle posible."
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Tarjetas por nivel</Label>
        <p className="text-xs text-muted-foreground">
          Eventos: hechos puntuales (&ldquo;hoy&rdquo;, &ldquo;hubo&rdquo;). Patrones: frecuencia
          (&ldquo;siempre&rdquo;, &ldquo;suele&rdquo;). Estructura: roles, rutinas, organización.
          Mentalidades: creencias (frases entre comillas).
        </p>
        <div className="flex flex-wrap gap-2">
          <Select value={nuevoNivel} onValueChange={(v) => setNuevoNivel(v as NivelIceberg)}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {NIVELES_ICEBERG.map((nivel) => (
                <SelectItem key={nivel} value={nivel}>
                  {NIVEL_ICEBERG_LABELS[nivel]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            className="flex-1"
            placeholder="Texto de la tarjeta"
            value={nuevoTexto}
            onChange={(e) => setNuevoTexto(e.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (!nuevoTexto.trim()) return;
              onChange({
                ...data,
                tarjetas: [
                  ...data.tarjetas,
                  { id: uid(), texto: nuevoTexto.trim(), nivel: nuevoNivel },
                ],
              });
              setNuevoTexto("");
            }}
          >
            + Agregar tarjeta
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          {data.tarjetas.map((t, i) => (
            <div key={t.id} className="flex flex-wrap items-center gap-2 rounded-md border p-2">
              <span className="w-28 shrink-0 text-xs text-muted-foreground">
                {NIVEL_ICEBERG_LABELS[t.nivel]}
              </span>
              <Input
                className="flex-1"
                value={t.texto}
                onChange={(e) => {
                  const next = [...data.tarjetas];
                  next[i] = { ...t, texto: e.target.value };
                  onChange({ ...data, tarjetas: next });
                }}
              />
              <Select
                value={t.nivel}
                onValueChange={(v) => {
                  const next = [...data.tarjetas];
                  next[i] = { ...t, nivel: v as NivelIceberg };
                  onChange({ ...data, tarjetas: next });
                }}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {NIVELES_ICEBERG.map((nivel) => (
                    <SelectItem key={nivel} value={nivel}>
                      {NIVEL_ICEBERG_LABELS[nivel]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  onChange({ ...data, tarjetas: data.tarjetas.filter((_, idx) => idx !== i) })
                }
              >
                Quitar
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Descubrimiento</Label>
        <Textarea
          rows={3}
          value={data.descubrimiento}
          onChange={(e) => onChange({ ...data, descubrimiento: e.target.value })}
          placeholder="¿Qué descubrimos que no habíamos visto?"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Acciones</Label>
        <div className="flex flex-wrap gap-2">
          <Input
            className="flex-1"
            placeholder="Descripción de la acción"
            value={accionDescripcion}
            onChange={(e) => setAccionDescripcion(e.target.value)}
          />
          <Input
            className="w-40"
            placeholder="Responsable"
            value={accionResponsable}
            onChange={(e) => setAccionResponsable(e.target.value)}
          />
          <Select value={accionNivel} onValueChange={(v) => setAccionNivel(v as NivelIceberg)}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {NIVELES_ICEBERG.map((nivel) => (
                <SelectItem key={nivel} value={nivel}>
                  {NIVEL_ICEBERG_LABELS[nivel]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (!accionDescripcion.trim()) return;
              onChange({
                ...data,
                acciones: [
                  ...data.acciones,
                  {
                    id: uid(),
                    descripcion: accionDescripcion.trim(),
                    responsable: accionResponsable.trim(),
                    nivelIntervenido: accionNivel,
                  },
                ],
              });
              setAccionDescripcion("");
              setAccionResponsable("");
            }}
          >
            + Agregar acción
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          {data.acciones.map((a, i) => (
            <div key={a.id} className="flex flex-wrap items-center gap-2 rounded-md border p-2">
              <Input
                className="flex-1"
                placeholder="Descripción"
                value={a.descripcion}
                onChange={(e) => {
                  const next = [...data.acciones];
                  next[i] = { ...a, descripcion: e.target.value };
                  onChange({ ...data, acciones: next });
                }}
              />
              <Input
                className="w-40"
                placeholder="Responsable"
                value={a.responsable}
                onChange={(e) => {
                  const next = [...data.acciones];
                  next[i] = { ...a, responsable: e.target.value };
                  onChange({ ...data, acciones: next });
                }}
              />
              <Select
                value={a.nivelIntervenido}
                onValueChange={(v) => {
                  const next = [...data.acciones];
                  next[i] = { ...a, nivelIntervenido: v as NivelIceberg };
                  onChange({ ...data, acciones: next });
                }}
              >
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {NIVELES_ICEBERG.map((nivel) => (
                    <SelectItem key={nivel} value={nivel}>
                      {NIVEL_ICEBERG_LABELS[nivel]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  onChange({ ...data, acciones: data.acciones.filter((_, idx) => idx !== i) })
                }
              >
                Quitar
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
