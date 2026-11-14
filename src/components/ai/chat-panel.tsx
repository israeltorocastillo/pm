"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProposalCard, type AiProposalDTO } from "@/components/ai/proposal-card";

type ChatMessage = { role: "user" | "assistant"; text: string };

export function ChatPanel({
  projectId,
  instanceId,
  defaultOpen = false,
  className = "max-w-md",
}: {
  projectId?: string;
  instanceId?: string;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [proposals, setProposals] = useState<AiProposalDTO[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const conversationIdRef = useRef<string | undefined>(undefined);

  async function sendMessage() {
    const text = input.trim();
    if (!text || streaming) return;

    setError(null);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }, { role: "assistant", text: "" }]);
    setStreaming(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationId: conversationIdRef.current,
          projectId,
          instanceId,
        }),
      });

      if (!res.body) throw new Error("Sin respuesta del servidor");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line);

          if (event.type === "text") {
            setMessages((prev) => {
              const next = [...prev];
              next[next.length - 1] = { role: "assistant", text: next[next.length - 1].text + event.delta };
              return next;
            });
          } else if (event.type === "done") {
            conversationIdRef.current = event.conversationId;
            setProposals(event.proposals ?? []);
          } else if (event.type === "error") {
            setError(event.message);
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setStreaming(false);
    }
  }

  if (!open) {
    return (
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Asistente
      </Button>
    );
  }

  return (
    <div className={`flex w-full flex-col gap-3 rounded-lg border bg-background p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Asistente</span>
        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
          Cerrar
        </Button>
      </div>

      <div className="flex max-h-96 flex-col gap-2 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Cuéntame qué problema u oportunidad quieres resolver y te ayudo a elegir el enfoque.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user"
                ? "self-end rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
                : "self-start rounded-lg bg-muted px-3 py-2 text-sm whitespace-pre-wrap"
            }
          >
            {m.text || (streaming && i === messages.length - 1 ? "…" : "")}
          </div>
        ))}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      {proposals.length > 0 && (
        <div className="flex flex-col gap-2">
          {proposals.map((p) => (
            <ProposalCard
              key={p.id}
              proposal={p}
              onResolved={(id) => setProposals((prev) => prev.filter((x) => x.id !== id))}
            />
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void sendMessage();
            }
          }}
          placeholder="Escribe tu mensaje…"
        />
        <Button onClick={() => void sendMessage()} disabled={streaming}>
          {streaming ? "…" : "Enviar"}
        </Button>
      </div>
    </div>
  );
}
