"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/server/auth";
import { decideProposal } from "@/server/services/ai-proposals";

export async function decideProposalAction(input: {
  proposalId: string;
  decision: "ACEPTADA" | "EDITADA" | "RECHAZADA";
  editedPayload?: Record<string, unknown>;
}) {
  const session = await auth();
  if (!session?.user.id) throw new Error("No autenticado");

  const result = await decideProposal({
    userId: session.user.id,
    proposalId: input.proposalId,
    decision: input.decision,
    editedPayload: input.editedPayload,
  });

  revalidatePath("/proyectos");
  return result;
}
