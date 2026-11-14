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
import type { EditorProps } from "@/tools/_types";
import type { A3MejoraData } from "./schema";

const ESTADO_LABELS: Record<string, string> = {
  abierta: "Abierta",
  en_curso: "En curso",
  cerrada: "Cerrada",
  cancelada: "Cancelada",
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function Editor({ data, onChange, warnings }: EditorProps<A3MejoraData>) {
  return (
    <div className="flex flex-col gap-6">
      {warnings.length > 0 && (
        <div className="flex flex-col gap-1 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {warnings.map((w, i) => (
            <p key={`${w.code}-${i}`}>⚠ {w.message}</p>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Label>Título (¿de qué cambio o mejora estás hablando?)</Label>
          <Input
            value={data.titulo}
            onChange={(e) => onChange({ ...data, titulo: e.target.value })}
            placeholder="Reducir el tiempo de ciclo del proceso X"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Líder</Label>
          <Input
            value={data.lider}
            onChange={(e) => onChange({ ...data, lider: e.target.value })}
            placeholder="Nombre del líder"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Fecha</Label>
          <Input
            type="date"
            value={data.fecha}
            onChange={(e) => onChange({ ...data, fecha: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Bloque 1: Contexto del problema</Label>
        <Textarea
          rows={3}
          value={data.b1ContextoProblema}
          onChange={(e) => onChange({ ...data, b1ContextoProblema: e.target.value })}
          placeholder="¿De qué cambio o mejora estás hablando y por qué importa?"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Bloque 2: Situación actual y desperdicios</Label>
        <Textarea
          rows={3}
          value={data.b2SituacionActualDesperdicios}
          onChange={(e) =>
            onChange({ ...data, b2SituacionActualDesperdicios: e.target.value })
          }
          placeholder="¿Cómo es la situación actual y qué desperdicios observas (con datos)?"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Bloque 3: Análisis de causas raíz</Label>
        <Textarea
          rows={3}
          value={data.b3AnalisisCausasRaiz}
          onChange={(e) => onChange({ ...data, b3AnalisisCausasRaiz: e.target.value })}
          placeholder="¿Cuáles son las causas raíz y cómo las identificaste?"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Bloque 4: Diseño de soluciones</Label>
        {data.b4DisenoSoluciones.map((s, i) => (
          <div key={s.id} className="flex flex-wrap gap-2">
            <Input
              className="flex-1"
              placeholder="Solución propuesta"
              value={s.solucion}
              onChange={(e) => {
                const next = [...data.b4DisenoSoluciones];
                next[i] = { ...s, solucion: e.target.value };
                onChange({ ...data, b4DisenoSoluciones: next });
              }}
            />
            <Input
              className="w-56"
              placeholder="Causa raíz a la que responde"
              value={s.causaRef}
              onChange={(e) => {
                const next = [...data.b4DisenoSoluciones];
                next[i] = { ...s, causaRef: e.target.value };
                onChange({ ...data, b4DisenoSoluciones: next });
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                onChange({
                  ...data,
                  b4DisenoSoluciones: data.b4DisenoSoluciones.filter((_, idx) => idx !== i),
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
              b4DisenoSoluciones: [
                ...data.b4DisenoSoluciones,
                { id: uid(), solucion: "", causaRef: "" },
              ],
            })
          }
        >
          + Agregar solución
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Bloque 5: Implementación (acciones)</Label>
        {data.b5Implementacion.map((a, i) => (
          <div key={a.id} className="flex flex-wrap items-center gap-2">
            <Input
              className="flex-1"
              placeholder="Descripción de la acción"
              value={a.descripcion}
              onChange={(e) => {
                const next = [...data.b5Implementacion];
                next[i] = { ...a, descripcion: e.target.value };
                onChange({ ...data, b5Implementacion: next });
              }}
            />
            <Input
              className="w-40"
              placeholder="Responsable"
              value={a.responsable}
              onChange={(e) => {
                const next = [...data.b5Implementacion];
                next[i] = { ...a, responsable: e.target.value };
                onChange({ ...data, b5Implementacion: next });
              }}
            />
            <Input
              type="date"
              className="w-40"
              value={a.fechaCompromiso}
              onChange={(e) => {
                const next = [...data.b5Implementacion];
                next[i] = { ...a, fechaCompromiso: e.target.value };
                onChange({ ...data, b5Implementacion: next });
              }}
            />
            <Select
              value={a.estado}
              onValueChange={(estado) => {
                const next = [...data.b5Implementacion];
                next[i] = { ...a, estado: estado as typeof a.estado };
                onChange({ ...data, b5Implementacion: next });
              }}
            >
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ESTADO_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                onChange({
                  ...data,
                  b5Implementacion: data.b5Implementacion.filter((_, idx) => idx !== i),
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
              b5Implementacion: [
                ...data.b5Implementacion,
                {
                  id: uid(),
                  descripcion: "",
                  responsable: "",
                  fechaCompromiso: "",
                  estado: "abierta",
                },
              ],
            })
          }
        >
          + Agregar acción
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Bloque 6: Seguimiento (plan de control)</Label>
        <Textarea
          rows={3}
          value={data.b6Seguimiento}
          onChange={(e) => onChange({ ...data, b6Seguimiento: e.target.value })}
          placeholder="¿Cómo controlarás que el resultado se sostenga?"
        />
      </div>
    </div>
  );
}
