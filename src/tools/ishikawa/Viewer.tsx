"use client";

import { useMemo } from "react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import type { ViewerProps } from "@/tools/_types";
import type { IshikawaData } from "./schema";
import { buildFishboneGraph } from "./layout";

export function Viewer({ data }: ViewerProps<IshikawaData>) {
  const { nodes, edges } = useMemo(() => buildFishboneGraph(data), [data]);

  return (
    <div style={{ height: 420 }} className="rounded-md border bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodesDraggable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
