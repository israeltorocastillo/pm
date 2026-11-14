"use client";

import { useMemo } from "react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import { Badge } from "@/components/ui/badge";
import type { ViewerProps } from "@/tools/_types";
import type { VsmData } from "./schema";
import { buildVsmGraph } from "./layout";
import { calculate } from "./calculations";

export function Viewer({ data }: ViewerProps<VsmData>) {
  const { nodes, edges } = useMemo(() => buildVsmGraph(data), [data]);
  const derived = useMemo(() => calculate(data), [data]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">VA {derived.va}</Badge>
        <Badge variant="secondary">BNVA {derived.bnva}</Badge>
        <Badge variant="secondary">NVA {derived.nva}</Badge>
        <Badge variant="secondary">PLT (suma) {derived.pltSumaTiempos}</Badge>
        {derived.pltLittleLaw != null && <Badge variant="secondary">PLT (Little) {derived.pltLittleLaw.toFixed(1)}</Badge>}
        <Badge variant={derived.pceBanda === "tipico" ? "secondary" : "destructive"}>
          PCE {(derived.pce * 100).toFixed(1)}%
        </Badge>
        {derived.takt != null && <Badge variant="secondary">Takt {derived.takt.toFixed(2)}</Badge>}
      </div>
      <div style={{ height: 320 }} className="rounded-md border bg-white">
        <ReactFlow nodes={nodes} edges={edges} fitView nodesDraggable={false} proOptions={{ hideAttribution: true }}>
          <Background />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      {data.ideasMejora.length > 0 && (
        <div>
          <h3 className="text-sm font-medium">Ideas de mejora</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            {data.ideasMejora.map((idea, i) => (
              <li key={i}>{idea}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
