"use client";

import { useMemo, useState } from "react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EditorProps } from "@/tools/_types";
import type { IshikawaData } from "./schema";
import { buildFishboneGraph } from "./layout";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function Editor({ data, onChange, warnings }: EditorProps<IshikawaData>) {
  const { nodes, edges } = useMemo(() => buildFishboneGraph(data), [data]);
  const [newCategoria, setNewCategoria] = useState("");
  const [newCausaCategoria, setNewCausaCategoria] = useState(data.categorias[0]?.nombre ?? "");
  const [newCausaTexto, setNewCausaTexto] = useState("");

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
        <Label>Efecto (redactado como desviación + impacto + contexto)</Label>
        <Textarea
          rows={2}
          value={data.efecto}
          onChange={(e) => onChange({ ...data, efecto: e.target.value })}
        />
      </div>

      <div style={{ height: 420 }} className="rounded-md border bg-white">
        <ReactFlow nodes={nodes} edges={edges} fitView nodesDraggable={false} proOptions={{ hideAttribution: true }}>
          <Background />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>Categorías</Label>
          <div className="flex flex-wrap gap-2">
            {data.categorias.map((cat) => (
              <span
                key={cat.id}
                className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm"
              >
                {cat.nombre}
                <button
                  type="button"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() =>
                    onChange({
                      ...data,
                      categorias: data.categorias.filter((c) => c.id !== cat.id),
                      causas: data.causas.filter((c) => c.categoria !== cat.nombre),
                    })
                  }
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Nueva categoría"
              value={newCategoria}
              onChange={(e) => setNewCategoria(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (!newCategoria.trim()) return;
                onChange({
                  ...data,
                  categorias: [...data.categorias, { id: uid(), nombre: newCategoria.trim() }],
                });
                setNewCategoria("");
              }}
            >
              + Agregar
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Agregar causa</Label>
          <Select value={newCausaCategoria} onValueChange={(value) => setNewCausaCategoria(value ?? "")}>
            <SelectTrigger>
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              {data.categorias.map((cat) => (
                <SelectItem key={cat.id} value={cat.nombre}>
                  {cat.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Input
              placeholder="Causa"
              value={newCausaTexto}
              onChange={(e) => setNewCausaTexto(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (!newCausaTexto.trim() || !newCausaCategoria) return;
                onChange({
                  ...data,
                  causas: [
                    ...data.causas,
                    {
                      id: uid(),
                      categoria: newCausaCategoria,
                      texto: newCausaTexto.trim(),
                      padreRef: null,
                      evidencia: [],
                      votos531: 0,
                      aValidar: false,
                    },
                  ],
                });
                setNewCausaTexto("");
              }}
            >
              + Agregar
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Causas registradas</Label>
        <div className="flex flex-col gap-2">
          {data.causas.map((causa, i) => (
            <div key={causa.id} className="flex flex-wrap items-center gap-2 rounded-md border p-2">
              <span className="w-32 shrink-0 text-xs text-muted-foreground">{causa.categoria}</span>
              <Input
                className="flex-1"
                value={causa.texto}
                onChange={(e) => {
                  const next = [...data.causas];
                  next[i] = { ...causa, texto: e.target.value };
                  onChange({ ...data, causas: next });
                }}
              />
              <Label className="flex items-center gap-1 text-xs">
                Votos 5-3-1
                <Input
                  type="number"
                  className="w-16"
                  min={0}
                  value={causa.votos531}
                  onChange={(e) => {
                    const next = [...data.causas];
                    next[i] = { ...causa, votos531: Number(e.target.value) };
                    onChange({ ...data, causas: next });
                  }}
                />
              </Label>
              <Label className="flex items-center gap-1 text-xs">
                <Checkbox
                  checked={causa.aValidar}
                  onCheckedChange={(checked) => {
                    const next = [...data.causas];
                    next[i] = { ...causa, aValidar: checked === true };
                    onChange({ ...data, causas: next });
                  }}
                />
                A validar
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onChange({ ...data, causas: data.causas.filter((_, idx) => idx !== i) })}
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
