import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getKnowledgeArticle } from "@/server/knowledge";

export default async function KnowledgeArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getKnowledgeArticle(slug);
  if (!article) notFound();

  return (
    <div className="flex flex-col gap-4">
      <Link href="/conocimiento" className="text-sm text-muted-foreground hover:underline">
        ← Volver a Conocimiento
      </Link>
      <article className="prose prose-sm max-w-3xl dark:prose-invert">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
      </article>
    </div>
  );
}
