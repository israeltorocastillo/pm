import { Badge } from "@/components/ui/badge";
import type { ViewerProps } from "@/tools/_types";
import type { A3MejoraData } from "./schema";

const ESTADO_LABELS: Record<string, string> = {
  abierta: "Abierta",
  en_curso: "En curso",
  cerrada: "Cerrada",
  cancelada: "Cancelada",
};

export function Viewer({ data }: ViewerProps<A3MejoraData>) {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <section>
        <h2 className="text-base font-semibold">{data.titulo || "—"}</h2>
        <p className="text-muted-foreground">
          {data.lider || "—"} {data.fecha && `· ${data.fecha}`}
        </p>
      </section>

      <section>
        <h3 className="font-medium">Bloque 1: Contexto del problema</h3>
        <p className="whitespace-pre-wrap text-muted-foreground">
          {data.b1ContextoProblema || "—"}
        </p>
      </section>

      <section>
        <h3 className="font-medium">Bloque 2: Situación actual y desperdicios</h3>
        <p className="whitespace-pre-wrap text-muted-foreground">
          {data.b2SituacionActualDesperdicios || "—"}
        </p>
      </section>

      <section>
        <h3 className="font-medium">Bloque 3: Análisis de causas raíz</h3>
        <p className="whitespace-pre-wrap text-muted-foreground">
          {data.b3AnalisisCausasRaiz || "—"}
        </p>
      </section>

      <section>
        <h3 className="font-medium">Bloque 4: Diseño de soluciones</h3>
        <ul className="list-disc pl-5 text-muted-foreground">
          {data.b4DisenoSoluciones.map((s) => (
            <li key={s.id}>
              {s.solucion || "—"}
              {s.causaRef && ` (causa: ${s.causaRef})`}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-medium">Bloque 5: Implementación</h3>
        <ul className="list-disc pl-5 text-muted-foreground">
          {data.b5Implementacion.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center gap-2">
              <span>
                {a.descripcion || "—"} — {a.responsable || "—"}
                {a.fechaCompromiso && ` · ${a.fechaCompromiso}`}
              </span>
              <Badge variant="secondary">{ESTADO_LABELS[a.estado] ?? a.estado}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-medium">Bloque 6: Seguimiento</h3>
        <p className="whitespace-pre-wrap text-muted-foreground">{data.b6Seguimiento || "—"}</p>
      </section>
    </div>
  );
}
