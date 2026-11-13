import Link from "next/link";
import { listKnowledgeArticles } from "@/server/knowledge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ConocimientoPage() {
  const articles = await listKnowledgeArticles();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Conocimiento</h1>
        <p className="text-muted-foreground">Fichas de conocimiento del magíster, por ramo</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {articles.map((article) => (
          <Link key={article.slug} href={`/conocimiento/${article.slug}`}>
            <Card className="transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle className="text-base">{article.title}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
