import type { Edge, Node } from "@xyflow/react";
import type { VsmData } from "./schema";

const STEP_SPACING = 220;
const Y = 120;

const CLASIFICACION_COLOR: Record<string, string> = {
  VA: "#dcfce7",
  BNVA: "#fef9c3",
  NVA: "#fee2e2",
};

const CLASIFICACION_BORDER: Record<string, string> = {
  VA: "#22c55e",
  BNVA: "#eab308",
  NVA: "#ef4444",
};

/** Diagrama simplificado: pasos en secuencia (izq -> der), con una espera entre cada par consecutivo. */
export function buildVsmGraph(data: VsmData): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  data.pasos.forEach((paso, i) => {
    const x = 40 + i * STEP_SPACING;
    const nodeId = `paso-${paso.id}`;

    nodes.push({
      id: nodeId,
      position: { x, y: Y },
      data: {
        label: `${paso.nombre || "Paso"}\nPT ${paso.pt} · CT ${paso.ct}`,
      },
      style: {
        width: 160,
        background: CLASIFICACION_COLOR[paso.clasificacion] ?? "#f8fafc",
        border: `1px solid ${CLASIFICACION_BORDER[paso.clasificacion] ?? "#cbd5e1"}`,
        fontSize: 12,
        whiteSpace: "pre-line",
        padding: 8,
        textAlign: "center",
      },
    });

    if (i > 0) {
      const prevId = `paso-${data.pasos[i - 1].id}`;
      const espera = data.esperas[i - 1];

      if (espera) {
        const waitId = `espera-${espera.id}`;
        nodes.push({
          id: waitId,
          position: { x: x - STEP_SPACING / 2 - 20, y: Y - 70 },
          data: { label: `⏳ WIP ${espera.wip}\nDT ${espera.dt}` },
          style: {
            width: 90,
            background: "#fff7ed",
            border: "1px dashed #fb923c",
            fontSize: 11,
            whiteSpace: "pre-line",
            padding: 4,
            textAlign: "center",
          },
        });
        edges.push({ id: `${prevId}-${waitId}`, source: prevId, target: waitId, style: { strokeWidth: 1 } });
        edges.push({ id: `${waitId}-${nodeId}`, source: waitId, target: nodeId, style: { strokeWidth: 1 } });
      } else {
        edges.push({ id: `${prevId}-${nodeId}`, source: prevId, target: nodeId, style: { strokeWidth: 1.5 } });
      }
    }
  });

  return { nodes, edges };
}
