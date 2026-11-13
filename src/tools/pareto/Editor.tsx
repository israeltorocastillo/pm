"use client";

import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { EditorProps } from "@/tools/_types";
import type { ParetoData } from "./schema";
import { computeParetoRows } from "./calculations";
import { ParetoChart } from "./ParetoChart";

const MODO_LABELS: Record<ParetoData["modo"], string> = {
  frecuencia: "Frecuencia",
  frecuencia_costo: "Frecuencia × costo",
  exceso_objetivo: "Exceso sobre objetivo (real − objetivo)",
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function Editor({ data, onChange, warnings }: EditorProps<ParetoData>) {
  const rows = useMemo(() => computeParetoRows(data), [data]);

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
          <Label>Título</Label>
          <Input value={data.titulo} onChange={(e) => onChange({ ...data, titulo: e.target.value })} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Unidad de impacto</Label>
          <Input
            value={data.unidadImpacto}
            placeholder="veces, horas, $"
            onChange={(e) => onChange({ ...data, unidadImpacto: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Período desde</Label>
          <Input
            type="date"
            value={data.periodoDesde}
            onChange={(e) => onChange({ ...data, periodoDesde: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Período hasta</Label>
          <Input
            type="date"
            value={data.periodoHasta}
            onChange={(e) => onChange({ ...data, periodoHasta: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Fuente</Label>
          <Input value={data.fuente} onChange={(e) => onChange({ ...data, fuente: e.target.value })} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Modo</Label>
          <Select
            value={data.modo}
            onValueChange={(modo) => onChange({ ...data, modo: modo as ParetoData["modo"] })}
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
      </div>

      <div className="flex flex-col gap-2">
        <Label>Categorías</Label>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                {data.modo === "exceso_objetivo" ? (
                  <>
                    <TableHead>Cantidad real</TableHead>
                    <TableHead>Cantidad objetivo</TableHead>
                  </>
                ) : (
                  <TableHead>Frecuencia</TableHead>
                )}
                {data.modo === "frecuencia_costo" && <TableHead>Costo unitario</TableHead>}
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.categorias.map((cat, i) => (
                <TableRow key={cat.id}>
                  <TableCell>
                    <Input
                      value={cat.nombre}
                      onChange={(e) => {
                        const next = [...data.categorias];
                        next[i] = { ...cat, nombre: e.target.value };
                        onChange({ ...data, categorias: next });
                      }}
                    />
                  </TableCell>
                  {data.modo === "exceso_objetivo" ? (
                    <>
                      <TableCell>
                        <Input
                          type="number"
                          value={cat.cantidadReal ?? 0}
                          onChange={(e) => {
                            const next = [...data.categorias];
                            next[i] = { ...cat, cantidadReal: Number(e.target.value) };
                            onChange({ ...data, categorias: next });
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={cat.cantidadObjetivo ?? 0}
                          onChange={(e) => {
                            const next = [...data.categorias];
                            next[i] = { ...cat, cantidadObjetivo: Number(e.target.value) };
                            onChange({ ...data, categorias: next });
                          }}
                        />
                      </TableCell>
                    </>
                  ) : (
                    <TableCell>
                      <Input
                        type="number"
                        value={cat.frecuencia}
                        onChange={(e) => {
                          const next = [...data.categorias];
                          next[i] = { ...cat, frecuencia: Number(e.target.value) };
                          onChange({ ...data, categorias: next });
                        }}
                      />
                    </TableCell>
                  )}
                  {data.modo === "frecuencia_costo" && (
                    <TableCell>
                      <Input
                        type="number"
                        value={cat.costoUnitario ?? 0}
                        onChange={(e) => {
                          const next = [...data.categorias];
                          next[i] = { ...cat, costoUnitario: Number(e.target.value) };
                          onChange({ ...data, categorias: next });
                        }}
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onChange({
                          ...data,
                          categorias: data.categorias.filter((_, idx) => idx !== i),
                        })
                      }
                    >
                      Quitar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() =>
            onChange({ ...data, categorias: [...data.categorias, { id: uid(), nombre: "", frecuencia: 0 }] })
          }
        >
          + Agregar categoría
        </Button>
      </div>

      <ParetoChart rows={rows} unidad={data.unidadImpacto} />
    </div>
  );
}
