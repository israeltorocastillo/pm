import type { z } from "zod";
import type OpenAI from "openai";

export type RunnableTool = {
  definition: OpenAI.Responses.FunctionTool;
  run: (input: unknown) => Promise<string>;
};

/**
 * OpenAI no trae un helper de "tool runner" como el de Anthropic; esto arma a mano
 * la definición de function-calling (JSON Schema vía `z.toJSONSchema`) y guarda el
 * `run` junto al schema para validar los argumentos antes de ejecutarlo. El `run`
 * expuesto siempre toma `unknown`: el dispatcher despacha por nombre en tiempo de
 * ejecución, así que no hay tipo estático por tool una vez agrupadas en un arreglo.
 */
export function defineTool<InputSchema extends z.ZodType>(options: {
  name: string;
  description: string;
  inputSchema: InputSchema;
  run: (input: z.infer<InputSchema>) => Promise<string>;
}): RunnableTool {
  const rawSchema = options.inputSchema.toJSONSchema() as Record<string, unknown>;
  delete rawSchema.$schema;

  return {
    definition: {
      type: "function",
      name: options.name,
      description: options.description,
      parameters: rawSchema,
      // Sin modo estricto: varios campos son opcionales y el modo estricto de OpenAI
      // exige que todas las propiedades estén en `required` (usando null en vez de
      // opcional). Validamos igual los argumentos con el schema Zod antes de ejecutar.
      strict: false,
    },
    run: async (input: unknown) => options.run(options.inputSchema.parse(input)),
  };
}
