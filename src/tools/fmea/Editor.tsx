"use client";

import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import type { AccionFmea, FilaFmea, FmeaData } from "./schema";
import { computeRpn, computeRpnPost } from "./calculations";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function emptyFila(): FilaFmea {
  return {
    id: uid(),
    pasoEntrada: "",
    modoFalla: "",
    efecto: "",
    sev: 1,
    causa: "",
    occ: 1,
    controlesActuales: "",
    det: 1,
    accionesRecomendadas: [],
    accionesTerminadas: "",
    sevPost: null,
    occPost: null,
    detPost: null,
  };
}

function ScaleInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <Input
      type="number"
      min={1}
      max={10}
      className="w-16"
      value={value}
      onChange={(e) => onChange(Math.min(10, Math.max(1, Number(e.target.value) || 1)))}
    />
  );
}

export function Editor({ data, onChange, warnings }: EditorProps<FmeaData>) {
  const rpnByFila = useMemo(() => {
    const map = new Map<string, { rpn: number; rpnPost: number | null }>();
    for (const fila of data.filas) {
      map.set(fila.id, { rpn: computeRpn(fila), rpnPost: computeRpnPost(fila) });
    }
    return map;
  }, [data.filas]);

  function updateFila(id: string, patch: Partial<FilaFmea>) {
    onChange({ ...data, filas: data.filas.map((f) => (f.id === id ? { ...f, ...patch } : f)) });
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>Tipo</Label>
          <Select value={data.tipo} onValueChange={(tipo) => onChange({ ...data, tipo: tipo as FmeaData["tipo"] })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="proceso">Proceso</SelectItem>
              <SelectItem value="producto">Producto</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Proceso</Label>
          <Input value={data.proceso} onChange={(e) => onChange({ ...data, proceso: e.target.value })} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Preparado por</Label>
          <Input value={data.preparadoPor} onChange={(e) => onChange({ ...data, preparadoPor: e.target.value })} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Fecha original</Label>
          <Input
            type="date"
            value={data.fechaOriginal}
            onChange={(e) => onChange({ ...data, fechaOriginal: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Revisión</Label>
          <Input
            type="number"
            value={data.revision}
            onChange={(e) => onChange({ ...data, revision: Number(e.target.value) })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Umbral de RPN para alertar</Label>
          <Input
            type="number"
            value={data.umbralRpn}
            onChange={(e) => onChange({ ...data, umbralRpn: Number(e.target.value) })}
          />
        </div>
      </div>

      <EditableStringList
        label="Responsables"
        items={data.responsables}
        onChange={(responsables) => onChange({ ...data, responsables })}
      />

      <div className="flex flex-col gap-3">
        <Label>Modos de falla</Label>
        {data.filas.map((fila, i) => {
          const rpn = rpnByFila.get(fila.id)?.rpn ?? 0;
          const rpnPost = rpnByFila.get(fila.id)?.rpnPost ?? null;
          return (
            <div key={fila.id} className="flex flex-col gap-3 rounded-md border p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Fila {i + 1}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onChange({ ...data, filas: data.filas.filter((f) => f.id !== fila.id) })}
                >
                  Quitar
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Paso / entrada</Label>
                  <Input value={fila.pasoEntrada} onChange={(e) => updateFila(fila.id, { pasoEntrada: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Modo de falla</Label>
                  <Input value={fila.modoFalla} onChange={(e) => updateFila(fila.id, { modoFalla: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Efecto</Label>
                  <Input value={fila.efecto} onChange={(e) => updateFila(fila.id, { efecto: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Causa</Label>
                  <Input value={fila.causa} onChange={(e) => updateFila(fila.id, { causa: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Controles actuales</Label>
                  <Input
                    value={fila.controlesActuales}
                    onChange={(e) => updateFila(fila.id, { controlesActuales: e.target.value })}
                  />
                </div>
                <div className="flex items-end gap-3">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">SEV</Label>
                    <ScaleInput value={fila.sev} onChange={(v) => updateFila(fila.id, { sev: v })} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">OCC</Label>
                    <ScaleInput value={fila.occ} onChange={(v) => updateFila(fila.id, { occ: v })} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">DET</Label>
                    <ScaleInput value={fila.det} onChange={(v) => updateFila(fila.id, { det: v })} />
                  </div>
                  <Badge variant={rpn >= data.umbralRpn ? "destructive" : "secondary"}>RPN {rpn}</Badge>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-xs">Acciones recomendadas</Label>
                {fila.accionesRecomendadas.map((accion, ai) => (
                  <div key={accion.id} className="flex flex-wrap gap-2">
                    <Input
                      className="flex-1"
                      placeholder="Descripción"
                      value={accion.descripcion}
                      onChange={(e) => {
                        const next = [...fila.accionesRecomendadas];
                        next[ai] = { ...accion, descripcion: e.target.value };
                        updateFila(fila.id, { accionesRecomendadas: next });
                      }}
                    />
                    <Input
                      className="w-40"
                      placeholder="Responsable"
                      value={accion.responsable}
                      onChange={(e) => {
                        const next = [...fila.accionesRecomendadas];
                        next[ai] = { ...accion, responsable: e.target.value };
                        updateFila(fila.id, { accionesRecomendadas: next });
                      }}
                    />
                    <Select
                      value={accion.estado}
                      onValueChange={(estado) => {
                        const next = [...fila.accionesRecomendadas];
                        next[ai] = { ...accion, estado: estado as AccionFmea["estado"] };
                        updateFila(fila.id, { accionesRecomendadas: next });
                      }}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abierta">Abierta</SelectItem>
                        <SelectItem value="en_curso">En curso</SelectItem>
                        <SelectItem value="cerrada">Cerrada</SelectItem>
                        <SelectItem value="cancelada">Cancelada</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateFila(fila.id, {
                          accionesRecomendadas: fila.accionesRecomendadas.filter((_, idx) => idx !== ai),
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
                  className="w-fit"
                  onClick={() =>
                    updateFila(fila.id, {
                      accionesRecomendadas: [
                        ...fila.accionesRecomendadas,
                        { id: uid(), descripcion: "", responsable: "", estado: "abierta" },
                      ],
                    })
                  }
                >
                  + Agregar acción
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Acciones terminadas (mes/año)</Label>
                  <Input
                    value={fila.accionesTerminadas}
                    onChange={(e) => updateFila(fila.id, { accionesTerminadas: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">SEV post</Label>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={fila.sevPost ?? ""}
                    onChange={(e) => updateFila(fila.id, { sevPost: e.target.value ? Number(e.target.value) : null })}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">OCC post</Label>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={fila.occPost ?? ""}
                    onChange={(e) => updateFila(fila.id, { occPost: e.target.value ? Number(e.target.value) : null })}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">DET post</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={1}
                      max={10}
                      value={fila.detPost ?? ""}
                      onChange={(e) => updateFila(fila.id, { detPost: e.target.value ? Number(e.target.value) : null })}
                    />
                    {rpnPost != null && <Badge variant="secondary">RPN post {rpnPost}</Badge>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <Button type="button" variant="outline" className="w-fit" onClick={() => onChange({ ...data, filas: [...data.filas, emptyFila()] })}>
          + Agregar modo de falla
        </Button>
      </div>
    </div>
  );
}
