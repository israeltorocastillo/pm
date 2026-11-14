import { Badge } from "@/components/ui/badge";
import type { ViewerProps } from "@/tools/_types";
import type { CincoPorquesData } from "./schema";

export function Viewer({ data }: ViewerProps<CincoPorquesData>) {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <section>
        <h3 className="font-medium">Causa o problema de partida</h3>
        <p className="text-muted-foreground">{data.puntoPartida || "—"}</p>
      </section>

      <section>
        <h3 className="font-medium">Cadena de porqués</h3>
        <ol className="flex flex-col gap-2">
          {data.cadena.map((paso) => (
            <li key={paso.id} className="rounded-md border p-2">
              <p className="font-medium">
                Porqué #{paso.porQueN}: <span className="font-normal">{paso.respuesta || "—"}</span>
              </p>
              {paso.evidencia.length > 0 ? (
                <ul className="list-disc pl-5 text-muted-foreground">
                  {paso.evidencia.map((ev, i) => (
                    <li key={i}>{ev}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground italic">Sin evidencia (hipótesis)</p>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h3 className="font-medium">Causa raíz candidata</h3>
        <p className="text-muted-foreground">{data.causaRaizCandidata || "—"}</p>
        <Badge variant="secondary" className="mt-1">
          {data.requiereDemostracion ? "Pendiente de demostrar" : "Demostrada"}
        </Badge>
      </section>
    </div>
  );
}
