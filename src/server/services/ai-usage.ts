import { db } from "@/server/db";

export async function recordAiUsage(input: {
  orgId: string;
  userId: string;
  inputTokens: number;
  outputTokens: number;
}) {
  return db.aiUsage.create({ data: input });
}

export async function getOrgUsageSummary(orgId: string) {
  const since = new Date();
  since.setDate(1);
  since.setHours(0, 0, 0, 0);

  const usage = await db.aiUsage.aggregate({
    where: { orgId, createdAt: { gte: since } },
    _sum: { inputTokens: true, outputTokens: true },
    _count: true,
  });

  return {
    inputTokens: usage._sum.inputTokens ?? 0,
    outputTokens: usage._sum.outputTokens ?? 0,
    requests: usage._count,
    since,
  };
}
