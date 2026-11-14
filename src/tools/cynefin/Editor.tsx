"use client";

import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditableStringList } from "@/components/tools/editable-string-list";
import type { EditorProps } from "@/tools/_types";
import type { CynefinData, ComponenteCynefin, DominioCynefin } from "./schema";
import { calculate } from "./calculations";

const MAX_COMPONENTES = 3;

const MODO_LABELS: Record<CynefinData["modo"], string> = {
  proyecto_completo: "Proyecto completo",
  por_componentes: "Por componentes",
};

const DOMINIO_LABELS: Record<DominioCynefin, string> = {
  simple: "Simple (causa-efecto evidente)",
  complicado: "Complicado (requiere análisis experto)",
  complejo: "Complejo (solo se entiende en retrospectiva)",
  caotico: "Caótico (no hay tiempo para entender)",
};

const ENFOQUE_LABELS: Record<string, string> = {
  predictivo: "Predictivo",
  agil: "Ágil",
  hibrido: "Híbrido",
  estabilizar_primero: "Estabilizar primero",
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function nuevoComponente(): ComponenteCynefin {
  return {
    id: uid(),
    descripcion: "",
    dominio: "complicado",
    senales: [],
    intervencion: "",
  };
}

export function Editor({ data, onChange, warnings }: EditorProps<CynefinData>) {
  const derived = useMemo(() => calculate(data), [data]);

  function updateComponente(index: number, patch: Partial<ComponenteCynefin>) {
    const next = [...data.componentes];
    next[index] = { ...next[index], ...patch };
    onChange({ ...data, componentes: next });
  }

  function toggleDescartado(index: number, enabled: boolean) {
    const next = [...data.componentes];
    if (enabled) {
      next[index] = { ...next[index], dominioDescartado: { dominio: "simple", razon: "" } };
    } else {
      next[index] = { ...next[index], dominioDescartado: undefined };
    }
    onChange({ ...data, componentes: next });
  }

  return (
    <div className="flex flex-col gap-6">
      {warnings.length > 0 && (
        <div className="flex flex-col gap-1 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {warnings.map((w) => (
            <p key={w.code}>⚠ {w.message}</p>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h2 className="text-base font-medium">Diagnóstico Cynefin</h2>
        <p className="text-sm text-muted-foreground">
          Simple, complicado, complejo y caótico no son grados de dificultad: son contextos
          distintos, cada uno con su propia lógica de decisión e intervención.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Enfoque sugerido:</span>
        <Badge variant="default">{ENFOQUE_LABELS[derived.enfoqueSugerido]}</Badge>
      </div>

      <div className="flex flex-col gap-2 sm:w-64">
        <Label>Modo</Label>
        <Select
          value={data.modo}
          onValueChange={(modo) => onChange({ ...data, modo: modo as CynefinData["modo"] })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(MODO_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Situación y decisión crítica</Label>
        <Textarea
          rows={3}
          value={data.situacionDecisionCritica}
          onChange={(e) => onChange({ ...data, situacionDecisionCritica: e.target.value })}
          placeholder="¿Cuál es la situación y qué decisión crítica debes tomar?"
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Label>
            Componentes {data.modo === "proyecto_completo" ? "(1)" : `(${data.componentes.length}/${MAX_COMPONENTES})`}
          </Label>
        </div>

        {data.componentes.map((c, i) => (
          <div key={c.id} className="flex flex-col gap-3 rounded-md border p-3">
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-medium text-muted-foreground">Componente {i + 1}</span>
              {data.modo === "por_componentes" && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onChange({ ...data, componentes: data.componentes.filter((_, idx) => idx !== i) })
                  }
                >
                  Quitar
                </Button>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Descripción</Label>
              <Textarea
                rows={2}
                value={c.descripcion}
                onChange={(e) => updateComponente(i, { descripcion: e.target.value })}
                placeholder="¿Qué parte del problema es esta?"
              />
            </div>

            <div className="flex flex-col gap-2 sm:w-72">
              <Label>Dominio</Label>
              <Select
                value={c.dominio}
                onValueChange={(dominio) => updateComponente(i, { dominio: dominio as DominioCynefin })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DOMINIO_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <EditableStringList
              label="Señales que apoyan esta clasificación"
              items={c.senales}
              onChange={(senales) => updateComponente(i, { senales })}
              placeholder="Evidencia concreta del caso"
            />

            <div className="flex flex-col gap-2">
              <Label>Intervención</Label>
              <Textarea
                rows={2}
                value={c.intervencion}
                onChange={(e) => updateComponente(i, { intervencion: e.target.value })}
                placeholder="¿Qué intervención corresponde a esta parte?"
              />
            </div>

            <div className="flex flex-col gap-2 rounded-md border border-dashed p-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!c.dominioDescartado}
                  onChange={(e) => toggleDescartado(i, e.target.checked)}
                />
                Registrar dominio alternativo descartado
              </label>
              {c.dominioDescartado && (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Select
                    value={c.dominioDescartado.dominio}
                    onValueChange={(dominio) =>
                      updateComponente(i, {
                        dominioDescartado: {
                          ...c.dominioDescartado!,
                          dominio: dominio as DominioCynefin,
                        },
                      })
                    }
                  >
                    <SelectTrigger className="sm:w-56">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(DOMINIO_LABELS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    className="flex-1"
                    placeholder="¿Por qué lo descartas?"
                    value={c.dominioDescartado.razon}
                    onChange={(e) =>
                      updateComponente(i, {
                        dominioDescartado: { ...c.dominioDescartado!, razon: e.target.value },
                      })
                    }
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {data.modo === "por_componentes" && (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-fit"
              disabled={data.componentes.length >= MAX_COMPONENTES}
              onClick={() =>
                onChange({ ...data, componentes: [...data.componentes, nuevoComponente()] })
              }
            >
              + Agregar componente
            </Button>
            {data.componentes.length >= MAX_COMPONENTES && (
              <p className="text-sm text-muted-foreground">
                Máximo {MAX_COMPONENTES} componentes por diagnóstico.
              </p>
            )}
          </>
        )}

        {data.modo === "proyecto_completo" && data.componentes.length === 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit"
            onClick={() => onChange({ ...data, componentes: [nuevoComponente()] })}
          >
            + Agregar componente único
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Riesgo de una mala lectura del contexto</Label>
        <Textarea
          rows={3}
          value={data.riesgoMalaLectura}
          onChange={(e) => onChange({ ...data, riesgoMalaLectura: e.target.value })}
          placeholder="¿Qué pasaría si estás leyendo mal el contexto?"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Recomendación ejecutiva</Label>
        <Textarea
          rows={3}
          value={data.recomendacionEjecutiva}
          onChange={(e) => onChange({ ...data, recomendacionEjecutiva: e.target.value })}
        />
      </div>
    </div>
  );
}
