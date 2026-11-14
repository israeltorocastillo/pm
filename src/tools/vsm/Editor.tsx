"use client";

import { useMemo } from "react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EditableStringList } from "@/components/tools/editable-string-list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EditorProps } from "@/tools/_types";
import type { EsperaVsm, PasoVsm, VsmData } from "./schema";
import { buildVsmGraph } from "./layout";
import { calculate } from "./calculations";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function emptyPaso(): PasoVsm {
  return {
    id: uid(),
    nombre: "",
    tipoNodo: "proceso",
    pt: 0,
    ct: 0,
    lote: 1,
    calidadPct: 100,
    reprocesoPct: 0,
    frecuencia: "",
    operadores: 1,
    clasificacion: "VA",
    desperdicio: null,
    responsableColor: "",
  };
}

function emptyEspera(): EsperaVsm {
  return { id: uid(), entrePasos: "", wip: 0, dt: 0 };
}

export function Editor({ data, onChange, warnings }: EditorProps<VsmData>) {
  const { nodes, edges } = useMemo(() => buildVsmGraph(data), [data]);
  const derived = useMemo(() => calculate(data), [data]);

  function updatePaso(id: string, patch: Partial<PasoVsm>) {
    onChange({ ...data, pasos: data.pasos.map((p) => (p.id === id ? { ...p, ...patch } : p)) });
  }

  function updateEspera(id: string, patch: Partial<EsperaVsm>) {
    onChange({ ...data, esperas: data.esperas.map((e) => (e.id === id ? { ...e, ...patch } : e)) });
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
          <Label>Flujo / proceso seleccionado</Label>
          <Input
            value={data.flujoSeleccionado}
            onChange={(e) => onChange({ ...data, flujoSeleccionado: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Versión</Label>
          <Select value={data.version} onValueChange={(version) => onChange({ ...data, version: version as VsmData["version"] })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="actual">Estado actual</SelectItem>
              <SelectItem value="futuro">Estado futuro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Cliente</Label>
          <Input
            value={data.clienteDemanda.cliente}
            onChange={(e) => onChange({ ...data, clienteDemanda: { ...data.clienteDemanda, cliente: e.target.value } })}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <Label>Demanda</Label>
            <Input
              type="number"
              value={data.clienteDemanda.demanda}
              onChange={(e) =>
                onChange({ ...data, clienteDemanda: { ...data.clienteDemanda, demanda: Number(e.target.value) } })
              }
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Label>Unidad</Label>
            <Input
              value={data.clienteDemanda.unidad}
              onChange={(e) => onChange({ ...data, clienteDemanda: { ...data.clienteDemanda, unidad: e.target.value } })}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <Label>Tiempo disponible</Label>
            <Input
              type="number"
              value={data.clienteDemanda.tiempoDisponible}
              onChange={(e) =>
                onChange({
                  ...data,
                  clienteDemanda: { ...data.clienteDemanda, tiempoDisponible: Number(e.target.value) },
                })
              }
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Label>Unidad de tiempo</Label>
            <Input
              value={data.clienteDemanda.unidadTiempo}
              onChange={(e) =>
                onChange({ ...data, clienteDemanda: { ...data.clienteDemanda, unidadTiempo: e.target.value } })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Tasa de salida (para Ley de Little, opcional)</Label>
          <Input
            type="number"
            value={data.tasaSalida ?? ""}
            onChange={(e) => onChange({ ...data, tasaSalida: e.target.value ? Number(e.target.value) : null })}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">VA {derived.va}</Badge>
        <Badge variant="secondary">BNVA {derived.bnva}</Badge>
        <Badge variant="secondary">NVA {derived.nva}</Badge>
        <Badge variant="secondary">PLT (suma) {derived.pltSumaTiempos}</Badge>
        {derived.pltLittleLaw != null && <Badge variant="secondary">PLT (Little) {derived.pltLittleLaw.toFixed(1)}</Badge>}
        <Badge variant={derived.pceBanda === "tipico" ? "secondary" : "destructive"}>
          PCE {(derived.pce * 100).toFixed(1)}%
        </Badge>
        {derived.takt != null && <Badge variant="secondary">Takt {derived.takt.toFixed(2)}</Badge>}
      </div>

      <div style={{ height: 320 }} className="rounded-md border bg-white">
        <ReactFlow nodes={nodes} edges={edges} fitView nodesDraggable={false} proOptions={{ hideAttribution: true }}>
          <Background />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      <div className="flex flex-col gap-3">
        <Label>Pasos</Label>
        {data.pasos.map((paso, i) => (
          <div key={paso.id} className="flex flex-col gap-2 rounded-md border p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Paso {i + 1}</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onChange({ ...data, pasos: data.pasos.filter((p) => p.id !== paso.id) })}
              >
                Quitar
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Input
                className="col-span-2"
                placeholder="Nombre"
                value={paso.nombre}
                onChange={(e) => updatePaso(paso.id, { nombre: e.target.value })}
              />
              <Select value={paso.clasificacion} onValueChange={(v) => updatePaso(paso.id, { clasificacion: v as PasoVsm["clasificacion"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VA">VA</SelectItem>
                  <SelectItem value="BNVA">BNVA</SelectItem>
                  <SelectItem value="NVA">NVA</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Operadores"
                value={paso.operadores}
                onChange={(e) => updatePaso(paso.id, { operadores: Number(e.target.value) })}
              />
              <Label className="flex items-center gap-1 text-xs">
                PT
                <Input type="number" value={paso.pt} onChange={(e) => updatePaso(paso.id, { pt: Number(e.target.value) })} />
              </Label>
              <Label className="flex items-center gap-1 text-xs">
                CT
                <Input type="number" value={paso.ct} onChange={(e) => updatePaso(paso.id, { ct: Number(e.target.value) })} />
              </Label>
              <Label className="flex items-center gap-1 text-xs">
                Lote
                <Input
                  type="number"
                  value={paso.lote}
                  onChange={(e) => updatePaso(paso.id, { lote: Number(e.target.value) })}
                />
              </Label>
              <Label className="flex items-center gap-1 text-xs">
                % calidad
                <Input
                  type="number"
                  value={paso.calidadPct}
                  onChange={(e) => updatePaso(paso.id, { calidadPct: Number(e.target.value) })}
                />
              </Label>
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" className="w-fit" onClick={() => onChange({ ...data, pasos: [...data.pasos, emptyPaso()] })}>
          + Agregar paso
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <Label>Esperas (entre pasos consecutivos, en orden)</Label>
        {data.esperas.map((espera, i) => (
          <div key={espera.id} className="flex flex-wrap items-center gap-2">
            <Input
              className="flex-1"
              placeholder="Entre qué pasos"
              value={espera.entrePasos}
              onChange={(e) => updateEspera(espera.id, { entrePasos: e.target.value })}
            />
            <Label className="flex items-center gap-1 text-xs">
              WIP
              <Input
                type="number"
                className="w-20"
                value={espera.wip}
                onChange={(e) => updateEspera(espera.id, { wip: Number(e.target.value) })}
              />
            </Label>
            <Label className="flex items-center gap-1 text-xs">
              DT
              <Input
                type="number"
                className="w-20"
                value={espera.dt}
                onChange={(e) => updateEspera(espera.id, { dt: Number(e.target.value) })}
              />
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onChange({ ...data, esperas: data.esperas.filter((_, idx) => idx !== i) })}
            >
              Quitar
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" className="w-fit" onClick={() => onChange({ ...data, esperas: [...data.esperas, emptyEspera()] })}>
          + Agregar espera
        </Button>
      </div>

      <EditableStringList
        label="Ideas de mejora"
        items={data.ideasMejora}
        onChange={(ideasMejora) => onChange({ ...data, ideasMejora })}
      />
    </div>
  );
}
