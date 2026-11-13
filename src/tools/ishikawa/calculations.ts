import type { MethodWarning } from "@/tools/_types";
import type { IshikawaData } from "./schema";

const SOLUTION_HINTS = ["falta de software", "implementar", "comprar", "contratar"];

export function calculate(data: IshikawaData) {
  const causasPorCategoria: Record<string, number> = {};
  for (const causa of data.causas) {
    causasPorCategoria[causa.categoria] = (causasPorCategoria[causa.categoria] ?? 0) + 1;
  }

  const causasPriorizadas = [...data.causas]
    .filter((c) => c.votos531 > 0)
    .sort((a, b) => b.votos531 - a.votos531)
    .slice(0, 5)
    .map((c) => ({ id: c.id, texto: c.texto, categoria: c.categoria, votos531: c.votos531 }));

  return {
    totalCausas: data.causas.length,
    causasPorCategoria,
    causasPriorizadas,
    causasAValidar: data.causas.filter((c) => c.aValidar).length,
  };
}

export function validate(data: IshikawaData): MethodWarning[] {
  const warnings: MethodWarning[] = [];

  if (!data.efecto.trim()) {
    warnings.push({ code: "sin_efecto", message: "Falta describir el efecto (la cabeza del diagrama).", severity: "warning" });
  }

  const categoriasVacias = data.categorias.filter(
    (cat) => !data.causas.some((c) => c.categoria === cat.nombre),
  );
  for (const cat of categoriasVacias) {
    warnings.push({
      code: `categoria_vacia_${cat.id}`,
      message: `La categoría "${cat.nombre}" no tiene causas registradas.`,
      severity: "info",
    });
  }

  const porCategoria = new Map<string, number>();
  for (const causa of data.causas) {
    porCategoria.set(causa.categoria, (porCategoria.get(causa.categoria) ?? 0) + 1);
  }
  for (const [categoria, total] of porCategoria) {
    if (total > 8) {
      warnings.push({
        code: `rama_sobrecargada_${categoria}`,
        message: `La categoría "${categoria}" tiene ${total} causas; considera dividirla o depurarla.`,
        severity: "info",
      });
    }
  }

  for (const causa of data.causas) {
    const texto = causa.texto.toLowerCase();
    if (SOLUTION_HINTS.some((hint) => texto.includes(hint))) {
      warnings.push({
        code: `causa_es_solucion_${causa.id}`,
        message: `"${causa.texto}" parece una solución disfrazada de causa.`,
        severity: "warning",
      });
    }
  }

  if (data.causas.length > 0 && data.causas.every((c) => !c.aValidar)) {
    warnings.push({
      code: "sin_causas_a_validar",
      message: "Marca 2 o 3 causas como 'a validar' con una hipótesis causal defendible.",
      severity: "info",
    });
  }

  return warnings;
}
