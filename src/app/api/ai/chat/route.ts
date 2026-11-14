import { z } from "zod";
import type OpenAI from "openai";
import { auth } from "@/server/auth";
import { getCurrentOrg } from "@/server/current-org";
import { openai, AI_MODEL } from "@/ai/client";
import { buildSystemPrompt } from "@/ai/system-prompt";
import { buildContextPreamble } from "@/ai/context";
import { createAiTools } from "@/ai/tools";
import { getOrCreateConversation, saveConversationMessages } from "@/server/services/ai-conversations";
import { listPendingProposals } from "@/server/services/ai-proposals";
import { recordAiUsage } from "@/server/services/ai-usage";
import { db } from "@/server/db";

export const runtime = "nodejs";

const requestSchema = z.object({
  message: z.string().min(1),
  conversationId: z.string().optional(),
  projectId: z.string().optional(),
  instanceId: z.string().optional(),
});

const MAX_ITERATIONS = 8;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user.id) {
    return new Response("No autenticado", { status: 401 });
  }
  const userId = session.user.id;

  const parsed = requestSchema.safeParse(await req.json());
  if (!parsed.success) {
    return new Response(parsed.error.message, { status: 400 });
  }
  const { message, conversationId, projectId, instanceId } = parsed.data;

  const currentOrg = await getCurrentOrg(userId);
  if (!currentOrg) {
    return new Response("Sin organización activa", { status: 400 });
  }

  const user = await db.user.findUniqueOrThrow({ where: { id: userId } });

  const conversation = await getOrCreateConversation({ userId, projectId, conversationId });
  const history = (conversation.messages as unknown as OpenAI.Responses.ResponseInputItem[]) ?? [];

  const preamble = await buildContextPreamble({
    orgId: currentOrg.orgId,
    projectId: conversation.projectId ?? undefined,
    instanceId,
    expertise: user.expertise,
  });

  const input: OpenAI.Responses.ResponseInputItem[] = [
    ...history,
    { role: "user", content: `${preamble}\n\n---\n\n${message}` },
  ];

  const aiTools = createAiTools({
    userId,
    orgId: currentOrg.orgId,
    conversationId: conversation.id,
    projectId: conversation.projectId ?? undefined,
  });
  const toolsByName = new Map(aiTools.map((t) => [t.definition.name, t]));
  const toolDefinitions = aiTools.map((t) => t.definition);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      function send(event: Record<string, unknown>) {
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      }

      let inputTokens = 0;
      let outputTokens = 0;

      try {
        for (let iteration = 0; iteration < MAX_ITERATIONS; iteration++) {
          const responseStream = await openai.responses.create({
            model: AI_MODEL,
            instructions: buildSystemPrompt(),
            input,
            tools: toolDefinitions,
            store: false,
            stream: true,
          });

          let finalResponse: OpenAI.Responses.Response | null = null;

          for await (const event of responseStream) {
            if (event.type === "response.output_text.delta") {
              send({ type: "text", delta: event.delta });
            }
            if (event.type === "response.output_item.added" && event.item.type === "function_call") {
              send({ type: "tool_call", name: event.item.name });
            }
            if (event.type === "response.completed") {
              finalResponse = event.response;
            }
          }

          if (!finalResponse) throw new Error("El modelo no devolvió una respuesta completa.");

          inputTokens += finalResponse.usage?.input_tokens ?? 0;
          outputTokens += finalResponse.usage?.output_tokens ?? 0;

          const functionCalls = finalResponse.output.filter(
            (item): item is OpenAI.Responses.ResponseFunctionToolCall => item.type === "function_call",
          );

          if (functionCalls.length === 0) break;

          input.push(...(finalResponse.output as unknown as OpenAI.Responses.ResponseInputItem[]));

          for (const call of functionCalls) {
            const tool = toolsByName.get(call.name);
            let output: string;
            if (!tool) {
              output = `Herramienta desconocida: ${call.name}`;
            } else {
              try {
                output = await tool.run(JSON.parse(call.arguments));
              } catch (error) {
                output = `Error ejecutando ${call.name}: ${error instanceof Error ? error.message : String(error)}`;
              }
            }
            input.push({ type: "function_call_output", call_id: call.call_id, output });
          }
        }

        await saveConversationMessages(conversation.id, input);
        await recordAiUsage({ orgId: currentOrg.orgId, userId, inputTokens, outputTokens });

        const proposals = await listPendingProposals(conversation.id);
        send({
          type: "done",
          conversationId: conversation.id,
          proposals,
          usage: { inputTokens, outputTokens },
        });
      } catch (error) {
        send({ type: "error", message: error instanceof Error ? error.message : "Error desconocido" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8" },
  });
}
