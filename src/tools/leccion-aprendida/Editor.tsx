"use client";

import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import type { LeccionAprendidaData } from "./schema";
import { calculate } from "./calculations";

const CATEGORIA_LABELS: Record<LeccionAprendidaData["categoriaExperiencia"], string> = {
  coordinacion_entre_areas: "Coordinación entre áreas",
  atrasos_y_planificacion: "Atrasos y planificación",
  cambios_de_alcance: "Cambios de alcance",
  comunicacion_con_stakeholders: "Comunicación con stakeholders",
  control_y_seguimiento: "Control y seguimiento",
  implementacion_tecnologica: "Implementación tecnológica",
  adquisiciones: "Adquisiciones",
  gestion_del_cambio: "Gestión del cambio",
  calidad_defectos: "Calidad / defectos",
  equipo: "Equipo",
  otra: "Otra",
};

const FASE_ORIGEN_LABELS: Record<LeccionAprendidaData["faseOrigen"], string> = {
  cierre_de_fase: "Cierre de fase",
  cierre_de_proyecto: "Cierre de proyecto",
  incidente: "Incidente",
  retrospectiva: "Retrospectiva",
  dmaic_paso_15: "DMAIC paso 15",
};

const BLOQUE_LABELS: Record<"A" | "B" | "C" | "D" | "E", string> = {
  A: "A. Origen",
  B: "B. Contenido",
  C: "C. Aprendizaje",
  D: "D. Aplicabilidad",
  E: "E. Calidad del registro",
};

export function Editor({ data, onChange, warnings }: EditorProps<LeccionAprendidaData>) {
  const { siPorBloque, publicable } = useMemo(() => calculate(data), [data]);

  const bloques = ["A", "B", "C", "D", "E"] as const;

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
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label>Título</Label>
          <Input
            value={data.titulo}
            onChange={(e) => onChange({ ...data, titulo: e.target.value })}
            placeholder="Nombre breve de la lección"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Categoría de la experiencia</Label>
          <Select
            value={data.categoriaExperiencia}
            onValueChange={(categoriaExperiencia) =>
              onChange({
                ...data,
                categoriaExperiencia: categoriaExperiencia as LeccionAprendidaData["categoriaExperiencia"],
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CATEGORIA_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Fase de origen</Label>
          <Select
            value={data.faseOrigen}
            onValueChange={(faseOrigen) =>
              onChange({ ...data, faseOrigen: faseOrigen as LeccionAprendidaData["faseOrigen"] })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(FASE_ORIGEN_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Contexto</Label>
        <Textarea
          rows={3}
          value={data.contexto}
          onChange={(e) => onChange({ ...data, contexto: e.target.value })}
          placeholder="Cuándo y dónde ocurrió, en qué proyecto real"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Problema</Label>
        <Textarea
          rows={3}
          value={data.problema}
          onChange={(e) => onChange({ ...data, problema: e.target.value })}
          placeholder="Qué se esperaba y qué ocurrió realmente"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Causas</Label>
        <Textarea
          rows={3}
          value={data.causas}
          onChange={(e) => onChange({ ...data, causas: e.target.value })}
          placeholder="Causas, no síntomas"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Acciones</Label>
        <Textarea
          rows={3}
          value={data.acciones}
          onChange={(e) => onChange({ ...data, acciones: e.target.value })}
          placeholder="Respuesta dada"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Resultados</Label>
        <Textarea
          rows={3}
          value={data.resultados}
          onChange={(e) => onChange({ ...data, resultados: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Si… entonces… porque…</Label>
        <Input
          value={data.siEntoncesPorque}
          onChange={(e) => onChange({ ...data, siEntoncesPorque: e.target.value })}
          placeholder="Si ocurre X, entonces sucede Y, porque Z"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Aprendimos que…</Label>
        <Textarea
          rows={2}
          value={data.aprendimosQue}
          onChange={(e) => onChange({ ...data, aprendimosQue: e.target.value })}
          placeholder="Frase explícita, específica y no obvia"
        />
      </div>

      <EditableStringList
        label="Recomendaciones"
        items={data.recomendaciones}
        onChange={(recomendaciones) => onChange({ ...data, recomendaciones })}
        placeholder="Recomendación concreta"
      />

      <div className="flex flex-col gap-2">
        <Label>Condiciones de aplicación</Label>
        <Textarea
          rows={2}
          value={data.condicionesAplicacion}
          onChange={(e) => onChange({ ...data, condicionesAplicacion: e.target.value })}
          placeholder="Dónde aplica y cuáles son sus límites"
        />
      </div>

      <EditableStringList
        label="Evidencia"
        items={data.evidencia}
        onChange={(evidencia) => onChange({ ...data, evidencia })}
        placeholder="Documento, dato o referencia que respalda la lección"
      />

      <div className="flex flex-col gap-3 rounded-md border p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label className="text-base">Checklist de calidad (A–E)</Label>
          <Badge variant={publicable ? "default" : "destructive"}>
            {publicable ? "Publicable" : "No publicable"}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {bloques.map((bloque) => (
            <Badge key={bloque} variant="secondary">
              {BLOQUE_LABELS[bloque]}: {siPorBloque[bloque]} sí
            </Badge>
          ))}
        </div>

        {bloques.map((bloque) => (
          <div key={bloque} className="flex flex-col gap-2 border-t pt-3 first:border-t-0 first:pt-0">
            <span className="text-sm font-medium">{BLOQUE_LABELS[bloque]}</span>
            {data.checklist
              .map((item, index) => ({ item, index }))
              .filter(({ item }) => item.bloque === bloque)
              .map(({ item, index }) => (
                <Label key={item.id} className="flex items-center gap-2 text-sm font-normal">
                  <Checkbox
                    checked={item.respuesta}
                    onCheckedChange={(checked) => {
                      const next = [...data.checklist];
                      next[index] = { ...item, respuesta: checked === true };
                      onChange({ ...data, checklist: next });
                    }}
                  />
                  {item.pregunta}
                </Label>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
