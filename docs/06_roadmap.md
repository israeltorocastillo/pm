# 06 · Roadmap de construcción

Cada fase termina con: tests verdes, `README` actualizado, demo funcional con datos de ejemplo (`prisma/seed.ts`) y lista de pendientes.

## Fase 0 — Fundaciones (1 sprint)
- Proyecto Next.js + TypeScript + Tailwind + shadcn/ui + Prisma + PostgreSQL (docker-compose).
- Auth.js con credenciales; organizaciones, membresías y roles.
- Layout de la app (barra lateral: Inicio, Proyectos, Portafolio, Conocimiento, Admin).
- Helpers de autorización y tests.
- **Aceptación**: un usuario se registra, crea una organización, invita a otro usuario y ambos inician sesión; un usuario de otra organización no ve nada.

## Fase 1 — Proyectos y registro de herramientas (1-2 sprints)
- CRUD de proyectos (tipo, estado, problema, fechas, miembros y roles).
- Panel del proyecto, tareas.
- `src/tools/registry.ts` + interfaz `ToolDefinition` + página genérica de instancia (editor/visor, estado, versiones).
- Biblioteca de conocimiento (render de `conocimiento/*.md`).
- Primeras 3 herramientas para validar el patrón: **Project Charter**, **Ishikawa** (lienzo), **Pareto** (tabla + gráfico + % acumulado).
- Conexión de ejemplo: Ishikawa → Pareto (causas como categorías).
- **Aceptación**: crear un proyecto, agregar un Ishikawa, pasar sus causas a un Pareto, ver el gráfico calculado; tests de `calculations.ts`.

## Fase 2 — Asistente IA v1 (1-2 sprints)
- Endpoint de chat con streaming, panel lateral, historial por proyecto.
- Tools de lectura + `propose_project`, `propose_tool_instance`, `propose_field_updates` con UI de aprobación (diff).
- Flujo de **descubrimiento** completo y "Crear proyecto con asistente".
- Coach de herramienta para Charter, Ishikawa y Pareto (preguntas guía + `validate()`).
- Registro de uso de tokens.
- **Aceptación**: describir un problema en lenguaje natural → la IA pregunta, redacta el enunciado, diagnostica Cynefin, propone tipo y ruta → al aceptar se crean proyecto e instancias prellenadas.

## Fase 3 — Núcleo de mejora continua (2 sprints)
- Herramientas P1 restantes del catálogo de mejora y problemas: **A3**, **5 porqués / Iceberg**, **Diagnóstico Cynefin**, **VSM** (lienzo + cálculos PLT, PCE, Ley de Little, takt), **SIPOC**, **FMEA** (RPN, recalculado), **Plan de control**, **Registro de lecciones aprendidas** (checklist A-E).
- Conexiones: Pareto → A3; A3 → tareas; FMEA → plan de control; cierre → lección aprendida.
- **Aceptación**: recorrido completo "problema recurrente" de la matriz de flujos, de punta a punta.

## Fase 4 — Análisis de negocio y gestión de proyectos (2 sprints)
- **Stakeholders**, **RACI**, **PESTLE**, **5 fuerzas**, **FODA → TOWS** (encadenado), **Ansoff**, **plan y pauta de entrevista** (1-7), **repositorio de requisitos** (clasificación, estados, trazabilidad), **casos de uso**, **BPMN** (bpmn-js).
- **Aceptación**: recorrido "nueva iniciativa" hasta requisitos trazables.

## Fase 5 — Ágil (1-2 sprints)
- **Visión de producto**, **Product Backlog** jerárquico, **Planning Poker**, **Sprint** (Sprint Goal obligatorio, tablero, DoD versionada), **retrospectiva**, **métricas ágiles** (velocity, burndown/burn-up, CFD, lead/cycle time).
- Time-boxes configurables (Guía Scrum 2020 por defecto; criterio del curso como alternativa).
- **Aceptación**: correr 2 sprints de ejemplo y ver métricas.

## Fase 6 — Six Sigma DMAIC con compuertas (2 sprints)
- Fases DMAIC con compuertas TG-D … TG-C y aprobaciones.
- **VOC/CTQ**, **plan de medición**, **MSA/Gage R&R**, **calculadora sigma/DPMO**, **capacidad Cp/Cpk**, **gráficas de control**, **matrices de priorización/Pugh**, **plan de piloto**.
- **Aceptación**: proyecto DMAIC de ejemplo que pasa todas las compuertas con cálculos verificados contra los ejemplos de la ficha (con las correcciones indicadas).

## Fase 7 — Estrategia, equipo y BIM (2 sprints)
- **Hoshin Kanri** (pilares → objetivos → KR → proyectos), **A3 estratégico**, **Perfil de solución**, **comité Go/No-Go**, panel de portafolio.
- **Salud del equipo (Hawkins)**, **microprácticas**, **1:1**, **SSM**, **triangulación** (con controles de privacidad para datos sensibles).
- **Plan de Ejecución BIM**, **registro de coordinación/incidencias**, **checklist de entrega a operación**.

## Fase 8 — Calidad y salida a producción
- Exportación PDF/Excel, comentarios, historial y comparación de versiones.
- SSO Microsoft Entra ID.
- Set de evaluación del asistente (ver `05_asistente_ia.md` §9).
- Revisión de seguridad, accesibilidad y rendimiento; despliegue.

---

## Definición de "hecho" para cada herramienta

- [ ] `schema.ts` con todos los campos del catálogo
- [ ] `calculations.ts` con tests que usan los ejemplos numéricos de la ficha
- [ ] `validate()` con las advertencias metodológicas del catálogo
- [ ] Editor y visor funcionales; responsive
- [ ] Panel de ayuda con teoría y ejemplo
- [ ] `ai.ts` con preguntas guía
- [ ] Conexiones de entrada/salida implementadas
- [ ] Exportable (cuando aplique)
