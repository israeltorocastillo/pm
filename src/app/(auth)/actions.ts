"use server";

import { z } from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/server/auth";
import {
  registerWithNewOrganization,
  completeInvitedUser,
  EmailInUseError,
  InvalidCredentialsError,
} from "@/server/services/organizations";

export type ActionState = { error: string | null };

const registerSchema = z.object({
  orgName: z.string().trim().min(2, "El nombre de la organización es muy corto"),
  name: z.string().trim().min(2, "Tu nombre es muy corto"),
  email: z.string().trim().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export async function registerAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  try {
    await registerWithNewOrganization(parsed.data);
  } catch (error) {
    if (error instanceof EmailInUseError) return { error: error.message };
    throw error;
  }

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirectTo: "/dashboard",
  });

  return { error: null };
}

const activateSchema = z.object({
  email: z.string().trim().email("Email inválido"),
  name: z.string().trim().min(2, "Tu nombre es muy corto"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export async function activateInviteAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = activateSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  try {
    await completeInvitedUser(parsed.data);
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return { error: "No hay una invitación pendiente para ese email" };
    }
    throw error;
  }

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirectTo: "/dashboard",
  });

  return { error: null };
}

const loginSchema = z.object({
  email: z.string().trim().email("Email inválido"),
  password: z.string().min(1, "Ingresa tu contraseña"),
});

export async function loginAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Email o contraseña incorrectos" };
    }
    throw error;
  }

  return { error: null };
}
