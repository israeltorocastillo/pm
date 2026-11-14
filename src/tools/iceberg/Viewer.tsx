import { Badge } from "@/components/ui/badge";
import type { ViewerProps } from "@/tools/_types";
import {
  NIVELES_ICEBERG,
  NIVEL_ICEBERG_LABELS,
  type IcebergData,
  type NivelIceberg,
} from "./schema";

const BAND_STYLES: Record<NivelIceberg, string> = {
  evento: "bg-sky-50 border-sky-200",
  patron: "bg-sky-100 border-sky-300",
  estructura: "bg-sky-200 border-sky-400",
  mentalidad: "bg-sky-300 border-sky-500",
};

function groupByNivel(data: IcebergData) {
  const acc: Record<NivelIceberg, { id: string; texto: string }[]> = {
    evento: [],
    patron: [],
    estructura: [],
    mentalidad: [],
  };
  for (const t of data.tarjetas) {
    acc[t.nivel].push(t);
  }
  return acc;
}

export function Viewer({ data }: ViewerProps<IcebergData>) {
  const porNivel = groupByNivel(data);

  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex flex-col gap-0 overflow-hidden rounded-md border">
        {NIVELES_ICEBERG.map((nivel, i) => (
          <div key={nivel}>
            {i === 1 && (
              <div className="border-t-2 border-dashed border-slate-500 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                — línea de flotación —
              </div>
            )}
            <div className={`flex flex-wrap items-center gap-2 border-b p-3 ${BAND_STYLES[nivel]}`}>
              <span className="w-28 shrink-0 font-semibold text-slate-700">
                {NIVEL_ICEBERG_LABELS[nivel]}
              </span>
              <div className="flex flex-1 flex-wrap gap-2">
                {porNivel[nivel].length === 0 && (
                  <span className="text-xs italic text-slate-500">Sin tarjetas</span>
                )}
                {porNivel[nivel].map((t) => (
                  <span
                    key={t.id}
                    className="rounded-full border border-slate-400 bg-white/70 px-3 py-1 text-xs text-slate-800"
                  >
                    {t.texto}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <section>
        <h3 className="font-medium">Situación</h3>
        <p className="text-muted-foreground">{data.situacion || "—"}</p>
      </section>

      <section>
        <h3 className="font-medium">Descubrimiento</h3>
        <p className="text-muted-foreground">{data.descubrimiento || "—"}</p>
      </section>

      <section>
        <h3 className="font-medium">Acciones</h3>
        {data.acciones.length === 0 && <p className="text-muted-foreground">—</p>}
        <div className="flex flex-col gap-2">
          {data.acciones.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center gap-2">
              <span>{a.descripcion}</span>
              {a.responsable && (
                <span className="text-muted-foreground">({a.responsable})</span>
              )}
              <Badge variant="secondary">{NIVEL_ICEBERG_LABELS[a.nivelIntervenido]}</Badge>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
