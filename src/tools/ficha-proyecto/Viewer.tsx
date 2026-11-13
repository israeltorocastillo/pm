import { Badge } from "@/components/ui/badge";
import type { ViewerProps } from "@/tools/_types";
import type { FichaProyectoData } from "./schema";

export function Viewer({ data }: ViewerProps<FichaProyectoData>) {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <section>
        <h3 className="font-medium">Problema u oportunidad</h3>
        <p className="text-muted-foreground">{data.problemaOportunidad || "—"}</p>
      </section>
      <section>
        <h3 className="font-medium">Objetivo</h3>
        <p className="text-muted-foreground">{data.objetivo || "—"}</p>
      </section>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <section>
          <h3 className="font-medium">Dentro del alcance</h3>
          <ul className="list-disc pl-5 text-muted-foreground">
            {data.alcanceDentro.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="font-medium">Fuera del alcance</h3>
          <ul className="list-disc pl-5 text-muted-foreground">
            {data.alcanceFuera.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
      <section>
        <h3 className="font-medium">Criterios de éxito</h3>
        <div className="flex flex-wrap gap-2">
          {data.criteriosExito.map((c) => (
            <Badge key={c.id} variant="secondary">
              {c.nombre} {c.meta && `· ${c.meta}`}
            </Badge>
          ))}
        </div>
      </section>
      <section>
        <h3 className="font-medium">Equipo</h3>
        <ul className="list-disc pl-5 text-muted-foreground">
          {data.equipo.map((m) => (
            <li key={m.id}>
              {m.persona} — {m.rol} ({m.dedicacionPct}%)
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
