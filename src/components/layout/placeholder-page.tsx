export function PlaceholderPage({ title, phase }: { title: string; phase: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">
        Este módulo se construye en {phase} (ver docs/06_roadmap.md).
      </p>
    </div>
  );
}
