import { Badge } from "@/components/ui/badge";
import type { ViewerProps } from "@/tools/_types";
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

export function Viewer({ data }: ViewerProps<LeccionAprendidaData>) {
  const { siPorBloque, publicable } = calculate(data);
  const bloques = ["A", "B", "C", "D", "E"] as const;

  return (
    <div className="flex flex-col gap-4 text-sm">
      <section className="flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold">{data.titulo || "Sin título"}</h3>
        <Badge variant="secondary">{CATEGORIA_LABELS[data.categoriaExperiencia]}</Badge>
        <Badge variant="secondary">{FASE_ORIGEN_LABELS[data.faseOrigen]}</Badge>
        <Badge variant={publicable ? "default" : "destructive"}>
          {publicable ? "Publicable" : "No publicable"}
        </Badge>
      </section>

      <section>
        <h4 className="font-medium">Contexto</h4>
        <p className="whitespace-pre-wrap text-muted-foreground">{data.contexto || "—"}</p>
      </section>

      <section>
        <h4 className="font-medium">Problema</h4>
        <p className="whitespace-pre-wrap text-muted-foreground">{data.problema || "—"}</p>
      </section>

      <section>
        <h4 className="font-medium">Causas</h4>
        <p className="whitespace-pre-wrap text-muted-foreground">{data.causas || "—"}</p>
      </section>

      <section>
        <h4 className="font-medium">Acciones</h4>
        <p className="whitespace-pre-wrap text-muted-foreground">{data.acciones || "—"}</p>
      </section>

      <section>
        <h4 className="font-medium">Resultados</h4>
        <p className="whitespace-pre-wrap text-muted-foreground">{data.resultados || "—"}</p>
      </section>

      <section>
        <h4 className="font-medium">Si… entonces… porque…</h4>
        <p className="text-muted-foreground">{data.siEntoncesPorque || "—"}</p>
      </section>

      <section>
        <h4 className="font-medium">Aprendimos que…</h4>
        <p className="whitespace-pre-wrap text-muted-foreground">{data.aprendimosQue || "—"}</p>
      </section>

      <section>
        <h4 className="font-medium">Recomendaciones</h4>
        <ul className="list-disc pl-5 text-muted-foreground">
          {data.recomendaciones.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="font-medium">Condiciones de aplicación</h4>
        <p className="whitespace-pre-wrap text-muted-foreground">
          {data.condicionesAplicacion || "—"}
        </p>
      </section>

      <section>
        <h4 className="font-medium">Evidencia</h4>
        <ul className="list-disc pl-5 text-muted-foreground">
          {data.evidencia.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-2 rounded-md border p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-medium">Checklist de calidad (A–E)</h4>
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
          <div key={bloque} className="flex flex-col gap-1 border-t pt-2 first:border-t-0 first:pt-0">
            <span className="text-xs font-medium text-muted-foreground">{BLOQUE_LABELS[bloque]}</span>
            <ul className="pl-5 text-muted-foreground">
              {data.checklist
                .filter((item) => item.bloque === bloque)
                .map((item) => (
                  <li key={item.id} className="list-disc">
                    {item.respuesta ? "✓" : "✗"} {item.pregunta}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
