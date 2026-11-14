import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ViewerProps } from "@/tools/_types";
import type { SipocData } from "./schema";

function Columna({ titulo, items }: { titulo: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-medium">{titulo}</h3>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">—</p>
      ) : (
        <ul className="list-disc pl-5 text-sm text-muted-foreground">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Viewer({ data }: ViewerProps<SipocData>) {
  const maxFilas = Math.max(
    data.proveedores.length,
    data.entradas.length,
    data.proceso.length,
    data.salidas.length,
    data.clientes.length,
    1
  );
  const filas = Array.from({ length: maxFilas });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        <Columna titulo="Proveedores" items={data.proveedores} />
        <Columna
          titulo="Entradas"
          items={data.entradas.map((e) => (e.requisito ? `${e.entrada} (${e.requisito})` : e.entrada))}
        />
        <Columna titulo="Proceso" items={data.proceso.map((p) => p.paso)} />
        <Columna
          titulo="Salidas"
          items={data.salidas.map((s) => (s.requisito ? `${s.salida} (${s.requisito})` : s.salida))}
        />
        <Columna titulo="Clientes" items={data.clientes} />
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Proveedores</TableHead>
              <TableHead>Entradas</TableHead>
              <TableHead>Proceso</TableHead>
              <TableHead>Salidas</TableHead>
              <TableHead>Clientes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filas.map((_, i) => (
              <TableRow key={i}>
                <TableCell>{data.proveedores[i] ?? ""}</TableCell>
                <TableCell>{data.entradas[i]?.entrada ?? ""}</TableCell>
                <TableCell>{data.proceso[i]?.paso ?? ""}</TableCell>
                <TableCell>{data.salidas[i]?.salida ?? ""}</TableCell>
                <TableCell>{data.clientes[i] ?? ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
        <div>
          <h3 className="font-medium">Límite de inicio</h3>
          <p className="text-muted-foreground">{data.limite_inicio || "—"}</p>
        </div>
        <div>
          <h3 className="font-medium">Límite de fin</h3>
          <p className="text-muted-foreground">{data.limite_fin || "—"}</p>
        </div>
      </div>

      {data.xs_preliminares.length > 0 && (
        <div className="text-sm">
          <h3 className="font-medium">Xs preliminares</h3>
          <ul className="list-disc pl-5 text-muted-foreground">
            {data.xs_preliminares.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
