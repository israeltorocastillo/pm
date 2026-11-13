import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ViewerProps } from "@/tools/_types";
import type { ParetoData } from "./schema";
import { computeParetoRows } from "./calculations";
import { ParetoChart } from "./ParetoChart";

export function Viewer({ data }: ViewerProps<ParetoData>) {
  const rows = computeParetoRows(data);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-medium">{data.titulo || "Sin título"}</h3>
        <p className="text-sm text-muted-foreground">
          {data.periodoDesde} – {data.periodoHasta} · Fuente: {data.fuente || "—"}
        </p>
      </div>
      <ParetoChart rows={rows} unidad={data.unidadImpacto} />
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoría</TableHead>
              <TableHead>Impacto</TableHead>
              <TableHead>% contribución</TableHead>
              <TableHead>% acumulado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.impacto.toFixed(2)}</TableCell>
                <TableCell>{row.pctContribucion.toFixed(1)}%</TableCell>
                <TableCell>{row.pctAcumulado.toFixed(1)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
