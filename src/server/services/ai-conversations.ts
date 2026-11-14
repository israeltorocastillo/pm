import { db } from "@/server/db";
import { requireProjectAccess } from "@/server/authz";
import type OpenAI from "openai";

export async function getOrCreateConversation(input: {
  userId: string;
  projectId?: string;
  conversationId?: string;
}) {
  if (input.conversationId) {
    const existing = await db.aiConversation.findUniqueOrThrow({
      where: { id: input.conversationId },
    });
    if (existing.userId !== input.userId) {
      throw new Error("Esta conversación no pertenece al usuario actual");
    }
    return existing;
  }

  if (input.projectId) {
    await requireProjectAccess(input.userId, input.projectId, "VIEWER");
  }

  return db.aiConversation.create({
    data: {
      userId: input.userId,
      projectId: input.projectId,
      messages: [],
    },
  });
}

export async function saveConversationMessages(
  conversationId: string,
  messages: OpenAI.Responses.ResponseInputItem[],
) {
  return db.aiConversation.update({
    where: { id: conversationId },
    data: { messages: messages as object },
  });
}
