"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { decideProposalAction } from "@/app/(app)/asistente/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type AiProposalDTO = {
  id: string;
  kind: string;
  payload: Record<string, unknown>;
};

const KIND_LABELS: Record<string, string> = {
  create_project: "Propuesta: crear proyecto",
  create_tool_instance: "Propuesta: agregar herramienta",
  update_tool_fields: "Propuesta: actualizar campos",
  create_tasks: "Propuesta: nuevas tareas",
};

export function ProposalCard({
  proposal,
  onResolved,
}: {
  proposal: AiProposalDTO;
  onResolved: (proposalId: string) => void;
}) {
  const router = useRouter();
  const [payload, setPayload] = useState(proposal.payload);
  const [pending, setPending] = useState(false);

  function setField(key: string, value: unknown) {
    setPayload((prev) => ({ ...prev, [key]: value }));
  }

  async function decide(decision: "ACEPTADA" | "RECHAZADA") {
    setPending(true);
    try {
      const edited = JSON.stringify(payload) !== JSON.stringify(proposal.payload);
      const result = await decideProposalAction({
        proposalId: proposal.id,
        decision: decision === "ACEPTADA" && edited ? "EDITADA" : decision,
        editedPayload: decision === "ACEPTADA" ? payload : undefined,
      });
      onResolved(proposal.id);
      if (result?.redirectTo) router.push(result.redirectTo);
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="border-primary/40 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-sm">{KIND_LABELS[proposal.kind] ?? proposal.kind}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm">
        {proposal.kind === "create_project" && (
          <>
            <Input value={String(payload.name ?? "")} onChange={(e) => setField("name", e.target.value)} />
            <Textarea
              rows={2}
              value={String(payload.problemStatement ?? "")}
              onChange={(e) => setField("problemStatement", e.target.value)}
              placeholder="Problema"
            />
            <Input
              value={String(payload.objective ?? "")}
              onChange={(e) => setField("objective", e.target.value)}
              placeholder="Objetivo"
            />
            <p className="text-xs text-muted-foreground">
              Tipo: {String(payload.type)} · Ruta: {((payload.route as string[]) ?? []).join(" → ")}
            </p>
          </>
        )}

        {proposal.kind === "create_tool_instance" && (
          <>
            <p>
              Herramienta: <strong>{String(payload.toolId)}</strong>
            </p>
            <Input
              value={String(payload.title ?? "")}
              placeholder="Título"
              onChange={(e) => setField("title", e.target.value)}
            />
          </>
        )}

        {proposal.kind === "update_tool_fields" && (
          <pre className="overflow-x-auto rounded bg-muted p-2 text-xs">
            {JSON.stringify((payload as { changes?: unknown }).changes, null, 2)}
          </pre>
        )}

        {proposal.kind === "create_tasks" && (
          <ul className="list-disc pl-4">
            {((payload.tasks as { title: string }[]) ?? []).map((t, i) => (
              <li key={i}>{t.title}</li>
            ))}
          </ul>
        )}

        <div className="flex gap-2">
          <Button size="sm" disabled={pending} onClick={() => decide("ACEPTADA")}>
            Aceptar
          </Button>
          <Button size="sm" variant="outline" disabled={pending} onClick={() => decide("RECHAZADA")}>
            Rechazar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
