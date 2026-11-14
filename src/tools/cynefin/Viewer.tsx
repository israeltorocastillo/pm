import { Badge } from "@/components/ui/badge";
import type { ViewerProps } from "@/tools/_types";
import type { CynefinData } from "./schema";
import { calculate } from "./calculations";

const DOMINIO_LABELS: Record<string, string> = {
  simple: "Simple",
  complicado: "Complicado",
  complejo: "Complejo",
  caotico: "Caótico",
};

const ENFOQUE_LABELS: Record<string, string> = {
  predictivo: "Predictivo",
  agil: "Ágil",
  hibrido: "Híbrido",
  estabilizar_primero: "Estabilizar primero",
};

const MODO_LABELS: Record<string, string> = {
  proyecto_completo: "Proyecto completo",
  por_componentes: "Por componentes",
};

export function Viewer({ data }: ViewerProps<CynefinData>) {
  const derived = calculate(data);

  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="default">Enfoque sugerido: {ENFOQUE_LABELS[derived.enfoqueSugerido]}</Badge>
        <Badge variant="secondary">{MODO_LABELS[data.modo]}</Badge>
      </div>

      <section>
        <h3 className="font-medium">Situación y decisión crítica</h3>
        <p className="text-muted-foreground">{data.situacionDecisionCritica || "—"}</p>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="font-medium">Componentes</h3>
        {data.componentes.length === 0 && <p className="text-muted-foreground">—</p>}
        {data.componentes.map((c, i) => (
          <div key={c.id} className="flex flex-col gap-1 rounded-md border p-3">
            <div className="flex items-center gap-2">
              <span className="font-medium">Componente {i + 1}</span>
              <Badge variant="outline">{DOMINIO_LABELS[c.dominio]}</Badge>
            </div>
            <p className="text-muted-foreground">{c.descripcion || "—"}</p>
            {c.senales.length > 0 && (
              <div>
                <span className="text-xs font-medium text-muted-foreground">Señales:</span>
                <ul className="list-disc pl-5 text-muted-foreground">
                  {c.senales.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {c.dominioDescartado && (
              <p className="text-muted-foreground">
                <span className="text-xs font-medium">Dominio descartado:</span>{" "}
                {DOMINIO_LABELS[c.dominioDescartado.dominio]} — {c.dominioDescartado.razon || "—"}
              </p>
            )}
            {c.intervencion && (
              <p className="text-muted-foreground">
                <span className="text-xs font-medium">Intervención:</span> {c.intervencion}
              </p>
            )}
          </div>
        ))}
      </section>

      <section>
        <h3 className="font-medium">Riesgo de una mala lectura del contexto</h3>
        <p className="text-muted-foreground">{data.riesgoMalaLectura || "—"}</p>
      </section>

      <section>
        <h3 className="font-medium">Recomendación ejecutiva</h3>
        <p className="text-muted-foreground">{data.recomendacionEjecutiva || "—"}</p>
      </section>
    </div>
  );
}
