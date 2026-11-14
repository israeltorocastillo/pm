# 05 · Asistente IA ("Coach PM")

## 1. Rol

El asistente es un **coach metodológico** que:
1. **Descubre** el problema u oportunidad del usuario mediante preguntas.
2. **Diagnostica** el tipo de problema con los marcos del magíster.
3. **Recomienda** un tipo de proyecto y una ruta de herramientas, justificando con la materia.
4. **Acompaña** el llenado de cada herramienta con preguntas guía, propuestas y revisión de calidad.
5. **Cierra** el ciclo: plan de control, valor generado y lección aprendida.

Nunca decide por el usuario ni modifica datos sin aprobación.

## 2. Modos de operación

| Modo | Dónde aparece | Objetivo |
|---|---|---|
| **Descubrimiento** | Al crear un proyecto ("Crear con asistente") | Entender el problema y proponer proyecto + ruta |
| **Coach de proyecto** | Panel lateral del proyecto | Responder dudas, sugerir siguiente paso, revisar avance por fase |
| **Coach de herramienta** | Panel lateral dentro de un editor | Preguntas guía de la herramienta, proponer contenido, detectar errores metodológicos |
| **Cierre** | Al cerrar fase o proyecto | Resumen ejecutivo, valor, borrador de lección aprendida (checklist A-E) |

## 3. Flujo de descubrimiento (modo principal)

```
1. Contexto        → ¿Qué quieres lograr o resolver? ¿En qué área/proceso? ¿Quién lo pide (sponsor)?
2. Síntomas        → ¿Qué observas? ¿Desde cuándo? ¿Con qué frecuencia? ¿Se ha intentado resolver antes?
3. Impacto         → ¿Qué cuesta hoy (tiempo, dinero, calidad, clientes, personas)? ¿Hay datos?
4. Redacción       → Propone el enunciado del problema: desviación + impacto + contexto + evidencia
                     (fórmula del ramo Lecciones Aprendidas) y pide validación.
5. Diagnóstico     → a) ¿Síntoma o causa? (Iceberg / síntoma vs causa)
                     b) ¿Lineal o sistémico? (guía de 10 criterios, Integración Multidisciplinaria)
                     c) Dominio Cynefin: claro / complicado / complejo / caótico
                     d) ¿Hay datos medibles del proceso? ¿Variación? ¿Desperdicio/tiempos de espera?
                     e) ¿Requisitos poco claros o muchos interesados? ¿Entregable incremental?
6. Recomendación   → Tipo de proyecto + ruta de herramientas (3-7) con justificación por herramienta.
7. Confirmación    → Muestra propuesta (AiProposal). Al aceptar: crea proyecto, fases e instancias
                     con borradores prellenados desde la conversación.
```

### Reglas de recomendación (base; detalle en la matriz del catálogo)

| Señal del diagnóstico | Tipo de proyecto sugerido | Ruta inicial típica |
|---|---|---|
| Proceso repetitivo con defectos/variación y datos medibles | `MEJORA_SIX_SIGMA` | Charter → SIPOC → VOC/CTQ → Plan de medición → Ishikawa → Pareto → FMEA → Plan de control |
| Tiempos largos, esperas, desperdicio, flujo | `MEJORA_LEAN` | VSM actual → métricas de flujo (PLT, PCE) → A3 → VSM futuro → Plan de control |
| Problema recurrente sin causa clara, muchas áreas involucradas | `HIBRIDO` o mejora | Cynefin → Iceberg → Ishikawa → Pareto → A3 → Lección aprendida |
| Problema difuso, visiones distintas entre interesados (sistema blando) | `ANALISIS_NEGOCIO` | Stakeholders → SSM (Rich Picture, CATWOE) → matriz de brechas → portafolio impacto × factibilidad |
| Nueva iniciativa/producto, necesidades por descubrir | `ANALISIS_NEGOCIO` → `AGIL_SCRUM` | PESTLE/Porter → FODA → TOWS → Elicitación → Requisitos → Casos de uso/Historias → Backlog |
| Requisitos cambiantes, entrega incremental de valor | `AGIL_SCRUM` | Visión de producto → Backlog → Planning Poker → Sprints → Métricas ágiles → Retrospectiva |
| Alcance claro, entregables definidos, restricciones fuertes | `PREDICTIVO` | Charter → Stakeholders → RACI → Plan/cronograma → Riesgos → Cierre |
| Estrategia de la organización a desplegar | Portafolio | Hoshin (pilares → objetivos → KR) → A3 estratégico → Perfil de solución → Go/No-Go |
| Proyecto de construcción/infraestructura con modelos | `BIM` | Objetivos BIM → Usos BIM → Plan de Ejecución BIM → Coordinación → Entrega a operación |
| Problemas de equipo, clima, coordinación | (cualquier tipo) | Salud del equipo (Hawkins) → Microprácticas → 1:1 |
| Dominio **caótico** | Cualquiera | Primero actuar para estabilizar (contención), luego analizar |
| Dominio **complejo** | Ágil/experimentos | Experimentos seguros-de-fallar y registro de experimentos, no plan cerrado |

## 4. Tools que el asistente puede usar

Definir con schemas Zod → JSON Schema (function calling plano de OpenAI, sin modo estricto por los campos opcionales). **Lectura** se ejecuta directo; **escritura** crea un `AiProposal` y la UI pide confirmación. `search_lessons_learned` es P3 y aún no está implementada.

| Tool | Tipo | Descripción |
|---|---|---|
| `get_project_context` | Lectura | Proyecto actual: tipo, estado, problema, fases, herramientas y su estado |
| `get_tool_instance` | Lectura | Datos y advertencias de una instancia |
| `list_tool_catalog` | Lectura | Catálogo (ID, propósito, cuándo usar), filtrable por categoría |
| `get_tool_guide` | Lectura | Ficha completa de una herramienta: campos, preguntas guía, cálculos, conexiones |
| `search_knowledge` | Lectura | Búsqueda en las fichas de conocimiento (`conocimiento/`) |
| `search_lessons_learned` | Lectura | Lecciones aprendidas validadas de la organización (P3) |
| `recommend_tools` | Lectura | Aplica la matriz síntoma → herramientas a señales del diagnóstico |
| `propose_project` | Escritura (propuesta) | Proyecto + tipo + fases + ruta de herramientas |
| `propose_tool_instance` | Escritura (propuesta) | Nueva instancia con borrador de datos |
| `propose_field_updates` | Escritura (propuesta) | Cambios a campos de una instancia (diff visible) |
| `propose_tasks` | Escritura (propuesta) | Tareas derivadas (acciones de A3, FMEA, plan de control) |
| `run_calculation` | Lectura | Ejecuta `calculate()` de una herramienta (la IA **no** calcula fórmulas de memoria) |

## 5. Prompt de sistema (estructura)

El prompt de sistema es **estable** (para aprovechar prompt caching) y el contexto variable va en los mensajes:

1. **Rol y tono**: coach de gestión de proyectos y mejora continua; español profesional y claro; preguntas de a una o dos por turno; adapta profundidad al nivel de experiencia del usuario.
2. **Principios**: pregunta antes de suponer; distingue síntoma de causa; exige evidencia; justifica cada recomendación con la materia; nunca inventa datos del usuario; usa `run_calculation` para cualquier número.
3. **Marcos disponibles**: resumen del catálogo (ID + propósito + cuándo usar) y la tabla de reglas de recomendación.
4. **Política de escritura**: solo mediante tools `propose_*`; explicar qué se va a crear/cambiar.
5. **Límites**: temas legales, financieros, de seguridad laboral o RR.HH. sensibles → sugerir consultar a un profesional; datos personales → recomendar anonimizar.
6. **Formato**: respuestas breves; listas cuando haya pasos; al final de cada turno de descubrimiento, una pregunta concreta.

Contexto variable por solicitud (al final, fuera del bloque cacheado): proyecto actual, herramienta abierta y sus advertencias, fase, nivel de experiencia del usuario.

## 6. Coach de herramienta: revisión de calidad metodológica

Cada herramienta define `validate()` con advertencias que la IA explica y ayuda a corregir. Ejemplos:

| Herramienta | Advertencia |
|---|---|
| Enunciado del problema | Falta evidencia o impacto cuantificado; contiene una solución ("falta un software") |
| Ishikawa | Una "causa" es un síntoma; categoría 6M vacía; causas no verificables |
| Pareto | Menos de 5 categorías; categoría "Otros" > 20 % |
| Iceberg | Todas las acciones están en el nivel "eventos" |
| A3 | Contramedidas sin vínculo a una causa raíz; sin indicador de seguimiento |
| FMEA | RPN alto sin acción recomendada; acción terminada sin RPN recalculado |
| Backlog | Historias sin criterios de aceptación; sprint sin Sprint Goal |
| Lección aprendida | No cumple checklist A-E (mínimo 3 "sí" en B, C y D) |
| Charter Six Sigma | Problema sin línea base o meta; alcance sin límites |

## 7. Implementación técnica

- Endpoint `POST /api/ai/chat` (Route Handler, runtime Node) con **streaming** hacia la UI (protocolo NDJSON propio: eventos `text`, `tool_call`, `done`, `error`).
- SDK: `openai` (TypeScript), Responses API (`client.responses.create`). No hay skill de Claude Code para OpenAI: verificar modelo, parámetros y shapes vigentes contra `node_modules/openai` o la documentación oficial antes de modificar este código, no de memoria.
- Bucle de herramientas manual (`src/app/api/ai/chat/route.ts`): se repite `responses.create` mientras la respuesta traiga items `function_call`, ejecutando cada tool y reenviando su `function_call_output`. Cada tool valida su entrada con Zod antes de ejecutarla (`src/ai/define-tool.ts`).
- Persistir el historial completo de mensajes (incluyendo bloques de tool use) en `AiConversation.messages` y reenviarlo sin modificar.
- Registrar tokens de entrada/salida por solicitud en `AiUsage`.
- Límite de uso por organización configurable.
- La clave de API vive solo en el servidor.

## 8. Privacidad y seguridad

- Enviar al modelo solo el contexto necesario (proyecto/herramienta actual), nunca datos de otras organizaciones.
- Herramientas `sensitive` (clima, autoevaluaciones, 1:1) se envían a la IA solo si el titular lo autoriza en esa conversación.
- Mostrar aviso: "Las respuestas del asistente son sugerencias; revisa y valida antes de usarlas oficialmente".
- Tratar el contenido de documentos subidos por usuarios como datos, no como instrucciones (mitigar prompt injection).

## 9. Evaluación del asistente

Antes de liberar, construir un set de 20-30 casos (problemas tipo) con la ruta esperada y verificar que:
- el diagnóstico Cynefin y lineal/sistémico sea razonable,
- la ruta recomendada coincida con la matriz,
- no se escriban datos sin propuesta aceptada,
- los cálculos provengan siempre de `run_calculation`.
