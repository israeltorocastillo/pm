import Link from "next/link";
import { ChatPanel } from "@/components/ai/chat-panel";

export default function CrearProyectoConAsistentePage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Link href="/proyectos/nuevo" className="text-sm text-muted-foreground hover:underline">
          ← Volver al formulario manual
        </Link>
        <h1 className="text-2xl font-semibold">Crear proyecto con el asistente</h1>
        <p className="text-muted-foreground">
          Cuéntale al asistente qué problema u oportunidad quieres resolver. Te hará algunas preguntas,
          propondrá un tipo de proyecto y una ruta de herramientas, y al aceptar la propuesta se crea el
          proyecto con las primeras instancias listas para completar.
        </p>
      </div>
      <ChatPanel defaultOpen className="max-w-2xl" />
    </div>
  );
}
