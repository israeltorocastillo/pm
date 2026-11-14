"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EditableStringList } from "@/components/tools/editable-string-list";
import type { EditorProps } from "@/tools/_types";
import type { CincoPorquesData } from "./schema";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function Editor({ data, onChange, warnings }: EditorProps<CincoPorquesData>) {
  const siguienteN =
    data.cadena.length === 0 ? 1 : Math.max(...data.cadena.map((p) => p.porQueN)) + 1;

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
        <Label>Causa o problema de partida</Label>
        <Textarea
          rows={2}
          value={data.puntoPartida}
          onChange={(e) => onChange({ ...data, puntoPartida: e.target.value })}
          placeholder="Causa o problema del que partes (puede venir de un Ishikawa u otro análisis previo)"
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label>Cadena de porqués</Label>
        {data.cadena.map((paso, i) => (
          <div key={paso.id} className="flex flex-col gap-2 rounded-md border p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Porqué #{paso.porQueN}</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  onChange({ ...data, cadena: data.cadena.filter((_, idx) => idx !== i) })
                }
              >
                Quitar
              </Button>
            </div>
            <Textarea
              rows={2}
              placeholder="¿Por qué ocurre?"
              value={paso.respuesta}
              onChange={(e) => {
                const next = [...data.cadena];
                next[i] = { ...paso, respuesta: e.target.value };
                onChange({ ...data, cadena: next });
              }}
            />
            <EditableStringList
              label="Evidencia"
              items={paso.evidencia}
              placeholder="Dato, registro u observación que respalda esta respuesta"
              onChange={(evidencia) => {
                const next = [...data.cadena];
                next[i] = { ...paso, evidencia };
                onChange({ ...data, cadena: next });
              }}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            onChange({
              ...data,
              cadena: [
                ...data.cadena,
                { id: uid(), porQueN: siguienteN, respuesta: "", evidencia: [] },
              ],
            })
          }
        >
          + Agregar porqué
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Causa raíz candidata</Label>
        <Textarea
          rows={2}
          value={data.causaRaizCandidata}
          onChange={(e) => onChange({ ...data, causaRaizCandidata: e.target.value })}
          placeholder="La causa raíz que propone esta cadena"
        />
      </div>

      <Label className="flex items-center gap-2 text-sm">
        <Checkbox
          checked={data.requiereDemostracion}
          onCheckedChange={(checked) =>
            onChange({ ...data, requiereDemostracion: checked === true })
          }
        />
        La última respuesta todavía es una explicación: ahora debe ser demostrada
      </Label>
    </div>
  );
}
