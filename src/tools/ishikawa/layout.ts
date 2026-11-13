import type { Edge, Node } from "@xyflow/react";
import type { IshikawaData } from "./schema";

const CATEGORY_SPACING = 220;
const CAUSE_SPACING = 40;
const SPINE_Y = 250;

/** Calcula un layout de espina de pescado: efecto a la derecha, categorías alternando arriba/abajo. */
export function buildFishboneGraph(data: IshikawaData): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const spineStartX = 40;
  const spineEndX = spineStartX + Math.max(data.categorias.length, 1) * CATEGORY_SPACING + 160;

  nodes.push({
    id: "efecto",
    position: { x: spineEndX, y: SPINE_Y - 25 },
    data: { label: data.efecto || "Efecto" },
    style: {
      width: 220,
      background: "#fef2f2",
      border: "1px solid #ef4444",
      fontWeight: 600,
      padding: 8,
    },
  });

  nodes.push({
    id: "spine-start",
    position: { x: spineStartX, y: SPINE_Y },
    data: { label: "" },
    style: { opacity: 0, width: 1, height: 1 },
  });

  edges.push({
    id: "spine",
    source: "spine-start",
    target: "efecto",
    style: { strokeWidth: 2 },
  });

  data.categorias.forEach((categoria, catIndex) => {
    const isTop = catIndex % 2 === 0;
    const catX = spineStartX + 80 + catIndex * CATEGORY_SPACING;
    const catY = isTop ? SPINE_Y - 150 : SPINE_Y + 110;
    const catNodeId = `cat-${categoria.id}`;

    nodes.push({
      id: catNodeId,
      position: { x: catX, y: catY },
      data: { label: categoria.nombre },
      style: {
        width: 160,
        background: "#eff6ff",
        border: "1px solid #3b82f6",
        fontWeight: 600,
        padding: 8,
      },
    });

    edges.push({
      id: `spine-${catNodeId}`,
      source: catNodeId,
      target: "spine-start",
      style: { strokeWidth: 1.5 },
    });

    const causas = data.causas.filter((c) => c.categoria === categoria.nombre && !c.padreRef);

    causas.forEach((causa, causaIndex) => {
      const causaY = isTop
        ? catY - 40 - causaIndex * CAUSE_SPACING
        : catY + 50 + causaIndex * CAUSE_SPACING;
      const causaNodeId = `causa-${causa.id}`;

      nodes.push({
        id: causaNodeId,
        position: { x: catX + 20, y: causaY },
        data: {
          label: `${causa.aValidar ? "✓ " : ""}${causa.texto}${causa.votos531 ? ` (${causa.votos531})` : ""}`,
        },
        style: {
          width: 190,
          fontSize: 12,
          background: causa.aValidar ? "#fef9c3" : "#f8fafc",
          border: "1px solid #cbd5e1",
          padding: 6,
        },
      });

      edges.push({
        id: `${catNodeId}-${causaNodeId}`,
        source: causaNodeId,
        target: catNodeId,
        style: { strokeWidth: 1 },
      });
    });
  });

  return { nodes, edges };
}
