import type { MethodWarning } from "@/tools/_types";
import type { CategoriaPareto, ParetoData } from "./schema";

export type ParetoRow = {
  id: string;
  nombre: string;
  impacto: number;
  pctExceso?: number;
  pctContribucion: number;
  pctAcumulado: number;
};

function impactoDe(categoria: CategoriaPareto, modo: ParetoData["modo"]): number {
  if (modo === "frecuencia_costo") return categoria.frecuencia * (categoria.costoUnitario ?? 0);
  if (modo === "exceso_objetivo") {
    const real = categoria.cantidadReal ?? 0;
    const objetivo = categoria.cantidadObjetivo ?? 0;
    return real - objetivo;
  }
  return categoria.frecuencia;
}

/** Tabla A-F del ejercicio de Pareto (LA §5.3): impacto, % de exceso (solo modo exceso_objetivo), % de contribución y % acumulado. */
export function computeParetoRows(data: ParetoData): ParetoRow[] {
  const conImpacto = data.categorias.map((categoria) => ({
    categoria,
    impacto: impactoDe(categoria, data.modo),
  }));

  const sorted = [...conImpacto].sort((a, b) => b.impacto - a.impacto);
  const totalImpacto = sorted.reduce((sum, c) => sum + c.impacto, 0);

  let acumulado = 0;
  return sorted.map(({ categoria, impacto }) => {
    const pctContribucion = totalImpacto === 0 ? 0 : (impacto / totalImpacto) * 100;
    acumulado += pctContribucion;

    const row: ParetoRow = {
      id: categoria.id,
      nombre: categoria.nombre,
      impacto,
      pctContribucion,
      pctAcumulado: acumulado,
    };

    if (data.modo === "exceso_objetivo") {
      const real = categoria.cantidadReal ?? 0;
      row.pctExceso = real === 0 ? 0 : (impacto / real) * 100;
    }

    return row;
  });
}

export function calculate(data: ParetoData) {
  const rows = computeParetoRows(data);
  return {
    rows,
    totalImpacto: rows.reduce((sum, r) => sum + r.impacto, 0),
  };
}

export function validate(data: ParetoData): MethodWarning[] {
  const warnings: MethodWarning[] = [];

  if (!data.titulo.trim()) {
    warnings.push({ code: "sin_titulo", message: "Falta el título del Pareto.", severity: "warning" });
  }
  if (!data.periodoDesde || !data.periodoHasta) {
    warnings.push({ code: "sin_periodo", message: "Falta el período analizado.", severity: "warning" });
  }
  if (!data.fuente.trim()) {
    warnings.push({ code: "sin_fuente", message: "Falta indicar la fuente de los datos.", severity: "warning" });
  }

  if (data.categorias.length < 5) {
    warnings.push({
      code: "pocas_categorias",
      message: "Menos de 5 categorías: revisa si conviene desagregar más.",
      severity: "info",
    });
  }

  const rows = computeParetoRows(data);
  if (rows.length >= 2 && rows[0].impacto < rows[1].impacto * 2) {
    warnings.push({
      code: "barra_principal_no_duplica",
      message: "La barra principal no duplica a la siguiente: no basta con el criterio del 80%, revisa la estratificación.",
      severity: "info",
    });
  }

  const otras = rows.find((r) => /^otr[ao]s?$/i.test(r.nombre.trim()));
  if (otras && rows[0]?.id === otras.id) {
    warnings.push({
      code: "otras_domina",
      message: '"Otras" concentra el mayor impacto: conviene reclasificar esa categoría.',
      severity: "warning",
    });
  }

  return warnings;
}
