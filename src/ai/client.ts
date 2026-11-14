import "server-only";
import OpenAI from "openai";

export const openai = new OpenAI();

export const AI_MODEL = process.env.OPENAI_MODEL || "gpt-6-astra";
