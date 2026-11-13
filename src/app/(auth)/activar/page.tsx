"use client";

import { useActionState } from "react";
import Link from "next/link";
import { activateInviteAction, type ActionState } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const initialState: ActionState = { error: null };

export default function ActivateInvitePage() {
  const [state, formAction, pending] = useActionState(activateInviteAction, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activar invitación</CardTitle>
        <CardDescription>
          Usa el email con el que te invitaron a la organización para crear tu contraseña
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email de la invitación</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Tu nombre</Label>
            <Input id="name" name="name" required autoComplete="name" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Crea una contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Activando…" : "Activar cuenta"}
          </Button>
          <p className="text-sm text-muted-foreground">
            <Link href="/login" className="underline underline-offset-4">
              Volver a iniciar sesión
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
