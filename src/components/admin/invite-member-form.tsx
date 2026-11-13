"use client";

import { useActionState } from "react";
import { inviteMemberAction, type InviteState } from "@/app/(app)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: InviteState = { error: null, success: null };

export function InviteMemberForm({ orgId }: { orgId: string }) {
  const [state, formAction, pending] = useActionState(inviteMemberAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="orgId" value={orgId} />
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="invite-email">Email a invitar</Label>
          <Input id="invite-email" name="email" type="email" required className="w-64" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="invite-role">Rol</Label>
          <select
            id="invite-role"
            name="role"
            defaultValue="MEMBER"
            className="h-9 rounded-md border border-input bg-background px-2 text-sm"
          >
            <option value="ADMIN">Admin</option>
            <option value="MEMBER">Miembro</option>
            <option value="VIEWER">Invitado (solo lectura)</option>
          </select>
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Invitando…" : "Invitar"}
        </Button>
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state.success && <p className="text-sm text-muted-foreground">{state.success}</p>}
    </form>
  );
}
