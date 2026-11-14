import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const KNOWLEDGE_DIR = path.join(process.cwd(), "conocimiento");

export type KnowledgeArticle = { slug: string; title: string };

function titleFromMarkdown(content: string, fallback: string): string {
  const heading = content.match(/^#\s+(.+)$/m);
  return heading ? heading[1].trim() : fallback;
}

export async function listKnowledgeArticles(): Promise<KnowledgeArticle[]> {
  const files = (await readdir(KNOWLEDGE_DIR)).filter((f) => f.endsWith(".md")).sort();

  const articles = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const content = await readFile(path.join(KNOWLEDGE_DIR, file), "utf-8");
      return { slug, title: titleFromMarkdown(content, slug) };
    }),
  );

  return articles;
}

export async function getKnowledgeArticle(slug: string): Promise<{ title: string; content: string } | null> {
  if (!/^[\w-]+$/.test(slug)) return null;

  try {
    const content = await readFile(path.join(KNOWLEDGE_DIR, `${slug}.md`), "utf-8");
    return { title: titleFromMarkdown(content, slug), content };
  } catch {
    return null;
  }
}

export type KnowledgeSearchResult = { slug: string; title: string; snippet: string };

/** Búsqueda simple por palabras clave: devuelve el párrafo donde aparece cada término. */
export async function searchKnowledge(query: string, limit = 5): Promise<KnowledgeSearchResult[]> {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 2);
  if (terms.length === 0) return [];

  const articles = await listKnowledgeArticles();
  const results: KnowledgeSearchResult[] = [];

  for (const article of articles) {
    const content = await readFile(path.join(KNOWLEDGE_DIR, `${article.slug}.md`), "utf-8");
    const lines = content.split("\n");
    const matchLine = lines.find((line) => {
      const lower = line.toLowerCase();
      return terms.some((term) => lower.includes(term));
    });

    if (matchLine) {
      results.push({ slug: article.slug, title: article.title, snippet: matchLine.trim().slice(0, 400) });
    }
    if (results.length >= limit) break;
  }

  return results;
}
