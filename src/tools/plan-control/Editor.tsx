"use client";

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { EditorProps } from "@/tools/_types";
import type { PlanControlData, FilaControl } from "./schema";

const FORMATO_LABELS: Record<PlanControlData["formato"], string> = {
  simple_lean: "Simple (Lean)",
  tres_bloques: "Tres bloques",
  extendido_aiag: "Extendido (AIAG)",
};

const METODO_REGISTRO_LABELS: Record<FilaControl["metodoRegistro"], string> = {
  lista_verificacion: "Lista de verificación",
  grafico_proceso: "Gráfico de proceso",
  dispersion: "Diagrama de dispersión",
  pareto: "Pareto",
  spc: "SPC (control estadístico)",
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function emptyFila(): FilaControl {
  return {
    id: uid(),
    procesoActividad: "",
    indicadorNombre: "",
    especificacionTolerancia: "",
    valorActual: "",
    valorObjetivo: "",
    metodoControl: "",
    tecnicaMedicion: "",
    frecuencia: "",
    responsable: "",
    metodoRegistro: "lista_verificacion",
    procedimientoReajuste: "",
  };
}

export function Editor({ data, onChange, warnings }: EditorProps<PlanControlData>) {
  return (
    <div className="flex flex-col gap-6">
      {warnings.length > 0 && (
        <div className="flex flex-col gap-1 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {warnings.map((w) => (
            <p key={w.code}>⚠ {w.message}</p>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2 sm:w-64">
        <Label>Formato</Label>
        <Select
          value={data.formato}
          onValueChange={(formato) =>
            onChange({ ...data, formato: formato as PlanControlData["formato"] })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(FORMATO_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Controles</Label>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proceso/actividad</TableHead>
                <TableHead>Indicador</TableHead>
                <TableHead>Especificación/tolerancia</TableHead>
                <TableHead>Valor actual</TableHead>
                <TableHead>Valor objetivo</TableHead>
                <TableHead>Método de control</TableHead>
                <TableHead>Técnica de medición</TableHead>
                <TableHead>Frecuencia</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Método de registro</TableHead>
                <TableHead>Procedimiento de reajuste</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.filas.map((fila, i) => {
                function update(patch: Partial<FilaControl>) {
                  const next = [...data.filas];
                  next[i] = { ...fila, ...patch };
                  onChange({ ...data, filas: next });
                }

                return (
                  <TableRow key={fila.id}>
                    <TableCell>
                      <Input
                        className="min-w-36"
                        value={fila.procesoActividad}
                        onChange={(e) => update({ procesoActividad: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="min-w-36"
                        value={fila.indicadorNombre}
                        onChange={(e) => update({ indicadorNombre: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="min-w-36"
                        value={fila.especificacionTolerancia}
                        onChange={(e) => update({ especificacionTolerancia: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="min-w-28"
                        value={fila.valorActual}
                        onChange={(e) => update({ valorActual: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="min-w-28"
                        value={fila.valorObjetivo}
                        onChange={(e) => update({ valorObjetivo: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="min-w-36"
                        value={fila.metodoControl}
                        onChange={(e) => update({ metodoControl: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="min-w-36"
                        value={fila.tecnicaMedicion}
                        onChange={(e) => update({ tecnicaMedicion: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="min-w-28"
                        value={fila.frecuencia}
                        onChange={(e) => update({ frecuencia: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="min-w-32"
                        value={fila.responsable}
                        onChange={(e) => update({ responsable: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={fila.metodoRegistro}
                        onValueChange={(metodoRegistro) =>
                          update({ metodoRegistro: metodoRegistro as FilaControl["metodoRegistro"] })
                        }
                      >
                        <SelectTrigger className="min-w-44">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(METODO_REGISTRO_LABELS).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        className="min-w-36"
                        value={fila.procedimientoReajuste}
                        onChange={(e) => update({ procedimientoReajuste: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onChange({ ...data, filas: data.filas.filter((_, idx) => idx !== i) })
                        }
                      >
                        Quitar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() => onChange({ ...data, filas: [...data.filas, emptyFila()] })}
        >
          + Agregar control
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <Label>Plan de respuesta ante desviaciones</Label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-normal text-muted-foreground">Contención</Label>
            <Textarea
              rows={3}
              value={data.planRespuesta.contencion}
              placeholder="Qué se hace con la salida defectuosa"
              onChange={(e) =>
                onChange({
                  ...data,
                  planRespuesta: { ...data.planRespuesta, contencion: e.target.value },
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-normal text-muted-foreground">Ajuste de proceso</Label>
            <Textarea
              rows={3}
              value={data.planRespuesta.ajusteProceso}
              placeholder="Cómo se ajusta el proceso"
              onChange={(e) =>
                onChange({
                  ...data,
                  planRespuesta: { ...data.planRespuesta, ajusteProceso: e.target.value },
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-normal text-muted-foreground">Mejora del sistema</Label>
            <Textarea
              rows={3}
              value={data.planRespuesta.mejoraSistema}
              placeholder="Quién decide cambios de fondo"
              onChange={(e) =>
                onChange({
                  ...data,
                  planRespuesta: { ...data.planRespuesta, mejoraSistema: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <Label className="flex items-center gap-2 text-sm">
        <Checkbox
          checked={data.duenoProcesoAcepta}
          onCheckedChange={(checked) => onChange({ ...data, duenoProcesoAcepta: checked === true })}
        />
        El dueño del proceso acepta este plan de control
      </Label>
    </div>
  );
}
