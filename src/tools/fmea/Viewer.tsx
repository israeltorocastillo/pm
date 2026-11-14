import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ViewerProps } from "@/tools/_types";
import type { FmeaData } from "./schema";
import { computeRpn, computeRpnPost } from "./calculations";

export function Viewer({ data }: ViewerProps<FmeaData>) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm text-muted-foreground">
        {data.tipo === "proceso" ? "FMEA de proceso" : "FMEA de producto"} · {data.proceso || "Sin proceso definido"}
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Modo de falla</TableHead>
              <TableHead>Efecto</TableHead>
              <TableHead>Causa</TableHead>
              <TableHead>SEV</TableHead>
              <TableHead>OCC</TableHead>
              <TableHead>DET</TableHead>
              <TableHead>RPN</TableHead>
              <TableHead>RPN post</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...data.filas]
              .sort((a, b) => computeRpn(b) - computeRpn(a))
              .map((fila) => {
                const rpn = computeRpn(fila);
                const rpnPost = computeRpnPost(fila);
                return (
                  <TableRow key={fila.id}>
                    <TableCell>{fila.modoFalla}</TableCell>
                    <TableCell>{fila.efecto}</TableCell>
                    <TableCell>{fila.causa}</TableCell>
                    <TableCell>{fila.sev}</TableCell>
                    <TableCell>{fila.occ}</TableCell>
                    <TableCell>{fila.det}</TableCell>
                    <TableCell>
                      <Badge variant={rpn >= data.umbralRpn ? "destructive" : "secondary"}>{rpn}</Badge>
                    </TableCell>
                    <TableCell>{rpnPost ?? "—"}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
