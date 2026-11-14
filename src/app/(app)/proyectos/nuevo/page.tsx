"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createProjectAction, type ActionState } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialState: ActionState = { error: null };

const TYPE_OPTIONS = [
  { value: "PREDICTIVO", label: "Predictivo" },
  { value: "AGIL_SCRUM", label: "Ágil / Scrum" },
  { value: "HIBRIDO", label: "Híbrido" },
  { value: "MEJORA_LEAN", label: "Mejora continua (Lean)" },
  { value: "MEJORA_SIX_SIGMA", label: "Mejora continua (Six Sigma / DMAIC)" },
  { value: "ANALISIS_NEGOCIO", label: "Análisis de negocio" },
  { value: "BIM", label: "BIM" },
];

export default function NuevoProyectoPage() {
  const [state, formAction, pending] = useActionState(createProjectAction, initialState);

  return (
    <div className="flex max-w-xl flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        ¿No sabes qué tipo de proyecto es o qué herramientas usar?{" "}
        <Link href="/proyectos/nuevo/asistente" className="text-primary underline underline-offset-4">
          Crea el proyecto con el asistente
        </Link>
        .
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Nuevo proyecto</CardTitle>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Tipo de proyecto</Label>
              <Select name="type" defaultValue="PREDICTIVO">
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea id="description" name="description" rows={2} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="problemStatement">Problema u oportunidad</Label>
              <Textarea id="problemStatement" name="problemStatement" rows={3} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="objective">Objetivo</Label>
              <Input id="objective" name="objective" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="startDate">Fecha de inicio</Label>
                <Input id="startDate" name="startDate" type="date" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="endDate">Fecha de término</Label>
                <Input id="endDate" name="endDate" type="date" />
              </div>
            </div>
            {state.error && <p className="text-sm text-destructive">{state.error}</p>}
          </CardContent>
          <div className="px-6 pb-6">
            <Button type="submit" disabled={pending}>
              {pending ? "Creando…" : "Crear proyecto"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
