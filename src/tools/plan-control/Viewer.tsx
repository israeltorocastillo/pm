import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ViewerProps } from "@/tools/_types";
import type { PlanControlData } from "./schema";

const FORMATO_LABELS: Record<PlanControlData["formato"], string> = {
  simple_lean: "Simple (Lean)",
  tres_bloques: "Tres bloques",
  extendido_aiag: "Extendido (AIAG)",
};

const METODO_REGISTRO_LABELS: Record<PlanControlData["filas"][number]["metodoRegistro"], string> = {
  lista_verificacion: "Lista de verificación",
  grafico_proceso: "Gráfico de proceso",
  dispersion: "Diagrama de dispersión",
  pareto: "Pareto",
  spc: "SPC (control estadístico)",
};

export function Viewer({ data }: ViewerProps<PlanControlData>) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-medium">Plan de control</h3>
        <p className="text-sm text-muted-foreground">Formato: {FORMATO_LABELS[data.formato]}</p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Proceso/actividad</TableHead>
              <TableHead>Indicador</TableHead>
              <TableHead>Especificación/tolerancia</TableHead>
              <TableHead>Valor actual</TableHead>
              <TableHead>Valor objetivo</TableHead>
              <TableHead>Método de control</TableHead>
              <TableHead>Técnica de medición</TableHead>
              <TableHead>Frecuencia</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Método de registro</TableHead>
              <TableHead>Procedimiento de reajuste</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.filas.length === 0 && (
              <TableRow>
                <TableCell colSpan={11} className="text-sm text-muted-foreground">
                  Sin controles definidos.
                </TableCell>
              </TableRow>
            )}
            {data.filas.map((fila) => (
              <TableRow key={fila.id}>
                <TableCell>{fila.procesoActividad || "—"}</TableCell>
                <TableCell>{fila.indicadorNombre || "—"}</TableCell>
                <TableCell>{fila.especificacionTolerancia || "—"}</TableCell>
                <TableCell>{fila.valorActual || "—"}</TableCell>
                <TableCell>{fila.valorObjetivo || "—"}</TableCell>
                <TableCell>{fila.metodoControl || "—"}</TableCell>
                <TableCell>{fila.tecnicaMedicion || "—"}</TableCell>
                <TableCell>{fila.frecuencia || "—"}</TableCell>
                <TableCell>{fila.responsable || "—"}</TableCell>
                <TableCell>{METODO_REGISTRO_LABELS[fila.metodoRegistro]}</TableCell>
                <TableCell>{fila.procedimientoReajuste || "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium">Plan de respuesta ante desviaciones</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-sm">
          <div>
            <p className="font-medium text-muted-foreground">Contención</p>
            <p>{data.planRespuesta.contencion || "—"}</p>
          </div>
          <div>
            <p className="font-medium text-muted-foreground">Ajuste de proceso</p>
            <p>{data.planRespuesta.ajusteProceso || "—"}</p>
          </div>
          <div>
            <p className="font-medium text-muted-foreground">Mejora del sistema</p>
            <p>{data.planRespuesta.mejoraSistema || "—"}</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {data.duenoProcesoAcepta
          ? "El dueño del proceso acepta este plan de control."
          : "El dueño del proceso aún no ha aceptado este plan de control."}
      </p>
    </div>
  );
}
