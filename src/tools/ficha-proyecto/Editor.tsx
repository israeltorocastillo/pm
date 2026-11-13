"use client";

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
import { EditableStringList } from "@/components/tools/editable-string-list";
import type { EditorProps } from "@/tools/_types";
import type { FichaProyectoData } from "./schema";

const ROL_LABELS: Record<string, string> = {
  sponsor: "Sponsor",
  lider_jp: "Líder / JP",
  coach: "Coach",
  contralor_financiero: "Contralor financiero",
  dueno_proceso: "Dueño del proceso",
  po: "Product Owner",
  sm: "Scrum Master",
  ba: "Business Analyst",
  miembro: "Miembro",
  otro: "Otro",
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function Editor({ data, onChange, warnings }: EditorProps<FichaProyectoData>) {
  return (
    <div className="flex flex-col gap-6">
      {warnings.length > 0 && (
        <div className="flex flex-col gap-1 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {warnings.map((w) => (
            <p key={w.code}>⚠ {w.message}</p>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label>Problema u oportunidad</Label>
        <Textarea
          rows={3}
          value={data.problemaOportunidad}
          onChange={(e) => onChange({ ...data, problemaOportunidad: e.target.value })}
          placeholder="Desde cuándo, qué métrica, dónde y qué magnitud. Sin causas ni soluciones."
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Objetivo (SMART)</Label>
        <Input
          value={data.objetivo}
          onChange={(e) => onChange({ ...data, objetivo: e.target.value })}
          placeholder="Reducir el tiempo de ciclo en 20% antes de junio de 2026"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <EditableStringList
          label="Dentro del alcance"
          items={data.alcanceDentro}
          onChange={(alcanceDentro) => onChange({ ...data, alcanceDentro })}
        />
        <EditableStringList
          label="Fuera del alcance"
          items={data.alcanceFuera}
          onChange={(alcanceFuera) => onChange({ ...data, alcanceFuera })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Criterios de éxito</Label>
        {data.criteriosExito.map((c, i) => (
          <div key={c.id} className="flex flex-wrap gap-2">
            <Input
              className="flex-1"
              placeholder="Criterio"
              value={c.nombre}
              onChange={(e) => {
                const next = [...data.criteriosExito];
                next[i] = { ...c, nombre: e.target.value };
                onChange({ ...data, criteriosExito: next });
              }}
            />
            <Input
              className="w-40"
              placeholder="Meta"
              value={c.meta}
              onChange={(e) => {
                const next = [...data.criteriosExito];
                next[i] = { ...c, meta: e.target.value };
                onChange({ ...data, criteriosExito: next });
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                onChange({
                  ...data,
                  criteriosExito: data.criteriosExito.filter((_, idx) => idx !== i),
                })
              }
            >
              Quitar
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onChange({
              ...data,
              criteriosExito: [
                ...data.criteriosExito,
                { id: uid(), nombre: "", definicion: "", meta: "" },
              ],
            })
          }
        >
          + Agregar criterio
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Plan de hitos</Label>
        {data.planHitos.map((h, i) => (
          <div key={h.id} className="flex flex-wrap gap-2">
            <Input
              className="flex-1"
              placeholder="Hito"
              value={h.hito}
              onChange={(e) => {
                const next = [...data.planHitos];
                next[i] = { ...h, hito: e.target.value };
                onChange({ ...data, planHitos: next });
              }}
            />
            <Input
              type="date"
              className="w-40"
              value={h.fecha}
              onChange={(e) => {
                const next = [...data.planHitos];
                next[i] = { ...h, fecha: e.target.value };
                onChange({ ...data, planHitos: next });
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                onChange({ ...data, planHitos: data.planHitos.filter((_, idx) => idx !== i) })
              }
            >
              Quitar
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onChange({ ...data, planHitos: [...data.planHitos, { id: uid(), hito: "", fecha: "" }] })
          }
        >
          + Agregar hito
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Equipo</Label>
        {data.equipo.map((m, i) => (
          <div key={m.id} className="flex flex-wrap items-center gap-2">
            <Input
              className="flex-1"
              placeholder="Nombre"
              value={m.persona}
              onChange={(e) => {
                const next = [...data.equipo];
                next[i] = { ...m, persona: e.target.value };
                onChange({ ...data, equipo: next });
              }}
            />
            <Select
              value={m.rol}
              onValueChange={(rol) => {
                const next = [...data.equipo];
                next[i] = { ...m, rol: rol as typeof m.rol };
                onChange({ ...data, equipo: next });
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ROL_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              className="w-24"
              min={0}
              max={100}
              value={m.dedicacionPct}
              onChange={(e) => {
                const next = [...data.equipo];
                next[i] = { ...m, dedicacionPct: Number(e.target.value) };
                onChange({ ...data, equipo: next });
              }}
            />
            <span className="text-sm text-muted-foreground">%</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onChange({ ...data, equipo: data.equipo.filter((_, idx) => idx !== i) })}
            >
              Quitar
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onChange({
              ...data,
              equipo: [...data.equipo, { id: uid(), persona: "", rol: "miembro", dedicacionPct: 100 }],
            })
          }
        >
          + Agregar integrante
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <EditableStringList
          label="Supuestos"
          items={data.supuestos}
          onChange={(supuestos) => onChange({ ...data, supuestos })}
        />
        <EditableStringList
          label="Restricciones"
          items={data.restricciones}
          onChange={(restricciones) => onChange({ ...data, restricciones })}
        />
      </div>

      <div className="flex flex-col gap-2 sm:w-48">
        <Label>Fecha del charter</Label>
        <Input
          type="date"
          value={data.fecha}
          onChange={(e) => onChange({ ...data, fecha: e.target.value })}
        />
      </div>
    </div>
  );
}
