"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ParetoRow } from "./calculations";

export function ParetoChart({ rows, unidad }: { rows: ParetoRow[]; unidad: string }) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">Agrega categorías para ver el gráfico.</p>;
  }

  return (
    <div style={{ height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={rows} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" angle={-20} textAnchor="end" interval={0} height={60} />
          <YAxis yAxisId="left" label={{ value: unidad, angle: -90, position: "insideLeft" }} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} unit="%" />
          <Tooltip
            formatter={(value, name) => {
              const numeric = typeof value === "number" ? value : Number(value);
              return name === "pctAcumulado"
                ? [`${numeric.toFixed(1)}%`, "% acumulado"]
                : [numeric, "Impacto"];
            }}
          />
          <Bar yAxisId="left" dataKey="impacto" fill="#3b82f6" name="Impacto" isAnimationActive={false} />
          <Line
            yAxisId="right"
            dataKey="pctAcumulado"
            stroke="#ef4444"
            strokeWidth={2}
            dot
            name="pctAcumulado"
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
