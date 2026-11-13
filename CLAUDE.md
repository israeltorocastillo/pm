# CLAUDE.md — Plataforma de Gestión de Proyectos, Mejora Continua y Análisis de Negocio

Este repositorio contiene la **especificación** (y luego el código) de una plataforma web que lleva a la práctica los contenidos de un Magíster en Project Management. Lee este archivo completo antes de cualquier tarea.

## Qué estamos construyendo

Una aplicación web multiusuario donde:
1. Cada **usuario** pertenece a una **organización** y tiene acceso a **proyectos**.
2. Cada **proyecto** tiene un tipo (predictivo, ágil, híbrido, mejora continua, análisis de negocio, BIM) y usa un conjunto de **herramientas** del magíster (Ishikawa, Pareto, A3, VSM, FODA, RACI, backlog Scrum, FMEA, Hoshin, lecciones aprendidas, etc.).
3. Un **asistente de IA (Claude)** guía al usuario: le pregunta qué problema quiere resolver, diagnostica el tipo de problema, recomienda herramientas y le ayuda a completarlas con la materia del magíster.

## Documentos de referencia (leer en este orden)

| Archivo | Contenido |
|---|---|
| `docs/01_vision_y_alcance.md` | Objetivo, usuarios, alcance, principios |
| `docs/02_requisitos_funcionales.md` | Requisitos por módulo (usuarios, proyectos, herramientas, IA) |
| `docs/03_arquitectura_tecnica.md` | Stack, modelo de datos, estructura de carpetas, seguridad |
| `docs/04_catalogo_herramientas.md` | **Catálogo de todas las herramientas**: campos, cálculos, conexiones, preguntas guía para la IA |
| `docs/05_asistente_ia.md` | Diseño del asistente: flujo conversacional, tools, prompts, guardrails |
| `docs/06_roadmap.md` | Fases de construcción y criterios de aceptación |
| `conocimiento/*.md` | Fichas de conocimiento por ramo (fuente de verdad del contenido académico) |

Si hay contradicción: `04_catalogo_herramientas.md` manda sobre campos/cálculos de herramientas; `conocimiento/` manda sobre el contenido académico; este archivo manda sobre convenciones.

## Stack (decisión por defecto, ver docs/03)

- **Next.js (App Router) + TypeScript** estricto
- **PostgreSQL + Prisma**
- **Auth.js** (credenciales + Microsoft Entra ID opcional)
- **Tailwind CSS + shadcn/ui**
- **React Flow** (lienzos: Ishikawa, VSM, Iceberg, mapas), **bpmn-js** (BPMN), **Recharts** (gráficos)
- **Zod** para validación compartida cliente/servidor
- **Anthropic TypeScript SDK** (`@anthropic-ai/sdk`) para el asistente IA. Al escribir código del asistente, **usa el skill `claude-api`** para obtener nombres de modelo, parámetros y patrones vigentes; no los escribas de memoria.
- **Vitest** (unitarias) + **Playwright** (e2e)

## Convenciones

- Idioma de la interfaz y del contenido: **español**. Código, nombres de variables y commits: inglés.
- Cada herramienta es un **módulo autocontenido** en `src/tools/<tool-id>/` con: `schema.ts` (Zod), `calculations.ts` (funciones puras + tests), `Editor.tsx`, `Viewer.tsx`, `ai.ts` (preguntas guía y descripción para la IA), `index.ts` (registro). El `tool-id` es el ID del catálogo.
- Los datos de cada instancia de herramienta se guardan como JSON validado por su schema Zod en `ToolInstance.data`, con versión de schema (`schemaVersion`) para migraciones.
- Toda fórmula (RPN, DPMO, PCE, Ley de Little, velocity, etc.) vive en `calculations.ts` con **tests unitarios** que usan los ejemplos numéricos de las fichas.
- Autorización en servidor en cada acción: un usuario solo ve proyectos de su organización donde es miembro.
- No se guardan secretos en el repo; usar `.env.local` (ver `.env.example`).

## Cómo trabajar

1. Sigue el orden de `docs/06_roadmap.md`. Cada fase termina con tests verdes y una demo funcional.
2. Antes de implementar una herramienta, lee su ficha en `docs/04_catalogo_herramientas.md` y la ficha del ramo de origen en `conocimiento/`.
3. Si un campo o cálculo no está claro en el material, márcalo con `// TODO(spec):` y pregunta al usuario; no inventes contenido académico.
4. Lo marcado "(complemento)" en las fichas no viene del material del magíster: impleméntalo, pero identifícalo como tal en la UI de ayuda.
