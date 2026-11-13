# 04 — Catálogo consolidado de herramientas

> Fuente de verdad sobre **campos, cálculos, reglas y conexiones** de cada herramienta de la plataforma (ver `CLAUDE.md`). El contenido académico de base está en `conocimiento/0X_*.md`. Lo que **no** proviene del material del magíster se marca **(complemento)** y debe identificarse como tal en la ayuda de la UI.
>
> Advertencia: este catálogo es una especificación derivada de material académico. Los umbrales, escalas y reglas deben revisarse antes de usarse en decisiones formales; los cálculos estadísticos y financieros requieren validación por un especialista, y cualquier contenido con implicancias legales, contractuales, laborales o de datos personales (cartas de compromiso, encuestas de clima, evaluación de personas) debe pasar por los canales internos de aprobación correspondientes.

## 0. Convenciones

### 0.1 Ramos de origen (abreviaturas)

| Código | Ramo | Ficha |
|---|---|---|
| BA | Business Analysis para gestores de proyectos | `conocimiento/01_business_analysis.md` |
| LA | Caso Lecciones Aprendidas y Seminario de PM | `conocimiento/02_lecciones_aprendidas_seminario_pm.md` |
| CE | Gestión de las competencias del equipo de proyecto | `conocimiento/03_competencias_equipo.md` |
| BIM | Gestión de proyectos BIM | `conocimiento/04_bim.md` |
| IM | Integración multidisciplinaria en proyectos complejos | `conocimiento/05_integracion_multidisciplinaria.md` |
| LEAN | Lean (Hoshin Kanri, OKR, VSM) | `conocimiento/06_lean.md` |
| SCRUM | Scrum / Agilidad | `conocimiento/07_scrum.md` |
| SS | Six Sigma (DMAIC) | `conocimiento/08_six_sigma.md` |

Las referencias de origen usan el formato `BA §4.3` (sección de la ficha) y, cuando sirve, la página del material (`SS S4 p.52`).

### 0.2 Tipos de campo

`texto` (≤ 200 car.) · `texto largo` · `entero` · `decimal` · `%` (0–100, decimal) · `moneda` · `fecha` · `bool` · `enum(a|b|c)` · `escala(1–5)` · `usuario` (miembro del proyecto) · `ref:<id-herramienta>` (vínculo a otra instancia) · `ref:stakeholder` · `lista<…>` (filas repetibles; se detallan sus subcampos) · `archivo` · `color`.
"Oblig." = obligatorio para pasar la instancia a estado **completa**; un borrador puede guardarse incompleto.

### 0.3 Campos comunes a toda instancia (no se repiten en las fichas)

`id`, `proyecto_id`, `tool_id`, `titulo` (oblig.), `estado` enum(borrador|en_revision|completa|archivada), `version`, `schemaVersion`, `creado_por`, `creado_en`, `actualizado_en`, `etiquetas`, `vinculos` (lista de `ref:*` de entrada/salida).

### 0.4 Entidades transversales reutilizables

Estas entidades viven fuera de las herramientas y se referencian desde ellas (evita duplicar datos):

| Entidad | Campos mínimos | Usada por |
|---|---|---|
| **Acción** | descripción, responsable (`usuario`), fecha compromiso, estado enum(abierta\|en_curso\|cerrada\|cancelada), origen (`ref:*`), evidencia de cierre | Casi todas (A3, Ishikawa, FMEA, retrospectiva, plan de control, coordinación BIM, revisión de pares: "una acción con responsable y fecha", LA S5c p.18) |
| **Indicador** | nombre, definición operacional, unidad, tipo enum(KR\|KPI\|Y\|X\|KPI_valor), valor línea base, valor actual, meta, frecuencia, fuente, dueño | Hoshin, A3, plan de control, valor, métricas ágiles, plan de medición, SPC |
| **Evidencia** | tipo enum(dato\|documento\|entrevista\|observación\|registro), descripción, fuente, fecha, archivo | Ishikawa, 5 porqués, triangulación, lección aprendida, matriz GAP |
| **Supuesto** | enunciado, herramienta origen, estado enum(abierto\|validado\|refutado) | BA exige registrar supuestos en cada modelo (BA §4.3, §5.5); BPMN, casos de uso, iceberg |
| **Stakeholder** | nombre o rol (anonimizable), organización/área, contacto opcional | Mapa de stakeholders, RACI, encuestas, coordinación |
| **Decisión** | fecha, decisión, alternativas, responsable, fundamento | Portafolio (Go/No-Go), A3 estratégico, DMAIC (compuertas), CDE |

### 0.5 Reglas para el asistente IA (aplican a todas las fichas)

- Las preguntas guía de cada ficha son el guion mínimo; la IA puede omitir las ya respondidas por herramientas vinculadas (pre-llenado desde `ref:*`).
- La IA **no agrega datos ni beneficios** que el usuario no haya dado; marca "beneficio esperado" frente a "evidencia" y conserva límites y pendientes (regla del taller de revisión asistida por IA, LA §5.8).
- El usuario acepta, modifica o rechaza cada sugerencia de la IA (LA §5.8; LA §8.1-12).
- La IA recuerda anonimizar datos personales o de clientes cuando el usuario los ingrese.

---

## 1. Tabla resumen

Complejidad UI: **formulario** · **tabla** · **lienzo-diagrama** · **tablero** · **cálculo** (puede combinar dos).

| ID | Nombre | Categoría | Ramos de origen | Prior. | Complejidad UI |
|---|---|---|---|---|---|
| `hoshin-kanri` | Despliegue Hoshin Kanri / OKR | Estrategia y portafolio | LEAN | P2 | tablero (árbol) |
| `a3-estrategico` | A3 Estratégico | Estrategia y portafolio | LEAN | P2 | formulario + tabla |
| `hoshin-scorecard` | Scorecard y panel Hoshin | Estrategia y portafolio | LEAN, SCRUM | P2 | tablero + cálculo |
| `portafolio-proyectos` | Portafolio, roadmap estratégico y comité Go/No-Go | Estrategia y portafolio | LEAN, SS | P2 | tablero |
| `perfil-solucion` | Perfil de solución / caso de negocio ligero | Estrategia y portafolio | LEAN, BA | P2 | formulario |
| `valor-beneficios` | Propuesta de valor, KPIs de valor y beneficios | Estrategia y portafolio | LA, BIM, BA, SS, SCRUM | P2 | formulario + tablero |
| `pestle` | Análisis PESTLE | Análisis de negocio | BA | P2 | lienzo-diagrama |
| `cinco-fuerzas` | Cinco fuerzas de la industria (Porter) | Análisis de negocio | BA | P3 | formulario |
| `inventario-recursos` | Inventario / auditoría de recursos | Análisis de negocio | BA | P3 | tabla |
| `foda` | FODA (SWOT) | Análisis de negocio | BA, SCRUM | **P1** | lienzo-diagrama |
| `tows` | Matriz TOWS | Análisis de negocio | BA | P2 | tabla |
| `matriz-ansoff` | Matriz de Ansoff | Análisis de negocio | BA | P3 | lienzo-diagrama |
| `analisis-brechas` | Estado actual → futuro y matriz GAP | Análisis de negocio | BA, LA, LEAN | P2 | tabla |
| `plan-elicitacion` | Plan y registro de elicitación | Análisis de negocio | BA | P2 | tabla |
| `analisis-documental` | Análisis documental | Análisis de negocio | BA | P3 | tabla |
| `guion-entrevista` | Planificador y guion de entrevista | Análisis de negocio | BA, LA | P2 | formulario |
| `pauta-observacion-entrevista` | Pauta de observación de entrevista | Análisis de negocio | BA | P3 | formulario + cálculo |
| `constructor-encuestas` | Constructor de encuestas (Likert, ISC, NPS) | Análisis de negocio | BA, LA, CE, SS | P2 | formulario + cálculo |
| `plan-observacion` | Plan de observación (job shadowing) | Análisis de negocio | BA | P3 | formulario |
| `voc-ccr` | Traducción VOC → CCR → Y del proyecto | Análisis de negocio | SS, BA | P2 | tabla + formulario |
| `repositorio-requisitos` | Repositorio y ciclo de vida de requisitos | Análisis de negocio | BA, SCRUM | P2 | tabla |
| `casos-uso` | Casos de uso (diagrama + ficha) | Análisis de negocio | BA | P2 | lienzo-diagrama + formulario |
| `ficha-proyecto` | Ficha de proyecto / Project Charter | Gestión de proyectos | SS, BA, CE, LA, LEAN | **P1** | formulario |
| `mapa-stakeholders` | Mapa y registro de stakeholders | Gestión de proyectos | LA, BA, CE, IM, BIM, SCRUM | **P1** | tabla + lienzo-diagrama |
| `matriz-raci` | Matriz RACI / quién-qué-cuándo | Gestión de proyectos | BA, CE, BIM, SCRUM | **P1** | tabla |
| `registro-riesgos` | Registro de riesgos e impedimentos | Gestión de proyectos | BA, SCRUM, BIM, SS | P2 | tabla + cálculo |
| `cronograma-gantt` | Cronograma / Gantt de despliegue | Gestión de proyectos | LEAN, BIM, SS | P2 | tablero |
| `vision-producto` | Visión de producto (canvas, elevator pitch, objetivo) | Gestión de proyectos | SCRUM | P2 | formulario |
| `product-backlog` | Product Backlog e historias de usuario | Gestión de proyectos | SCRUM, BA | **P1** | tabla |
| `estimacion-agil` | Estimación ágil (Planning Poker, tallas) | Gestión de proyectos | SCRUM | P2 | formulario + cálculo |
| `roadmap-lanzamiento` | Roadmap y plan de lanzamiento | Gestión de proyectos | SCRUM | P2 | tablero + cálculo |
| `sprint-scrum` | Sprint (planning, backlog, daily, review, DoD) | Gestión de proyectos | SCRUM | P2 | tablero |
| `tablero-kanban` | Tablero Kanban / Scrumboard | Gestión de proyectos | SCRUM, LEAN, BIM | **P1** | tablero |
| `metricas-agiles` | Dashboard de métricas ágiles | Gestión de proyectos | SCRUM | P2 | tablero + cálculo |
| `diagnostico-antipatrones` | Diagnóstico de antipatrones Scrum | Gestión de proyectos | SCRUM | P3 | formulario |
| `proyecto-dmaic` | Proyecto DMAIC (15 pasos y compuertas) | Mejora continua y procesos | SS | P2 | tablero |
| `vsm` | Mapa de cadena de valor (VSM) | Mejora continua y procesos | LEAN, SS | **P1** | lienzo-diagrama + cálculo |
| `sipoc` | SIPOC / PEPSU | Mejora continua y procesos | SS, LA | P2 | tabla |
| `bpmn` | Modelado de procesos (BPMN / flujograma) | Mejora continua y procesos | BA, LA, SS | P2 | lienzo-diagrama |
| `a3-mejora` | A3 de mejora | Mejora continua y procesos | LEAN | **P1** | formulario |
| `plan-medicion` | Plan de medición, estratificación y hoja de verificación | Mejora continua y procesos | SS, LA | P2 | tabla + cálculo |
| `msa-gage-rr` | MSA / Gage R&R | Mejora continua y procesos | SS | P3 | tabla + cálculo |
| `grafica-control` | Gráficas de control (SPC) | Mejora continua y procesos | SS | P3 | cálculo + tablero |
| `capacidad-proceso` | Capacidad del proceso (Cp, Cpk) | Mejora continua y procesos | SS | P3 | cálculo |
| `calculadora-sigma` | Calculadora DPMO / nivel sigma / RTY | Mejora continua y procesos | SS | P2 | cálculo |
| `analisis-estadistico` | Descriptiva, hipótesis, regresión y delta/sigma | Mejora continua y procesos | SS | P3 | cálculo |
| `fmea` | FMEA (AMEF) | Mejora continua y procesos | SS, LA | P2 | tabla + cálculo |
| `plan-piloto` | Plan de prueba piloto | Mejora continua y procesos | SS | P2 | tabla |
| `plan-control` | Plan de control | Mejora continua y procesos | LEAN, SS | **P1** | tabla |
| `registro-problema` | Registro y definición del problema | Análisis de problemas y decisiones | LA, SS, IM, CE | **P1** | formulario |
| `triage-lineal-sistemico` | Triage: problema lineal vs. sistémico | Análisis de problemas y decisiones | IM | P2 | formulario + cálculo |
| `cynefin` | Diagnóstico Cynefin (proyecto y componentes) | Análisis de problemas y decisiones | IM, SCRUM | **P1** | formulario |
| `iceberg` | Modelo del Iceberg | Análisis de problemas y decisiones | IM, LA | P2 | lienzo-diagrama |
| `ishikawa` | Diagrama de Ishikawa (causa-efecto) | Análisis de problemas y decisiones | LA, BA, BIM, SS | **P1** | lienzo-diagrama |
| `cinco-porques` | 5 porqués | Análisis de problemas y decisiones | LA | **P1** | formulario |
| `pareto` | Pareto y estratificación | Análisis de problemas y decisiones | LA, SS, SCRUM | **P1** | cálculo + tablero |
| `lluvia-ideas` | Lluvia de ideas y votación 5-3-1 | Análisis de problemas y decisiones | BA, LA, SS, LEAN | P2 | tablero |
| `matriz-priorizacion` | Matrices de priorización (esfuerzo-impacto, criterios múltiples, MoSCoW, Kano…) | Análisis de problemas y decisiones | SS, LA, SCRUM | P2 | tabla + cálculo |
| `matriz-pugh` | Matriz Pugh | Análisis de problemas y decisiones | SS | P3 | tabla + cálculo |
| `ssm` | Soft Systems Methodology (rich picture, CATWOE, modelo conceptual) | Análisis de problemas y decisiones | LA | P2 | lienzo-diagrama + formulario |
| `triangulacion-evidencia` | Diseño de investigación y triangulación | Análisis de problemas y decisiones | LA | P3 | tabla |
| `registro-experimentos` | Registro de experimentos (sondas) | Análisis de problemas y decisiones | IM, SCRUM | P3 | tabla |
| `diagnostico-equipo` | Diagnóstico de dificultades del equipo (5 disciplinas) | Equipo y liderazgo | CE | P2 | formulario + tablero |
| `canvas-equipo` | Canvas / acuerdo de equipo | Equipo y liderazgo | CE, LA | P2 | formulario |
| `micropracticas` | Microprácticas (macro → mini → micro) | Equipo y liderazgo | CE, IM | P2 | formulario |
| `gestion-cambio` | Plan de gestión del cambio (ADKAR, 8 pasos, actitudes) | Equipo y liderazgo | BIM, CE | P2 | tablero |
| `autoridad-formal` | Autoevaluación de servicios de autoridad | Equipo y liderazgo | CE | P3 | formulario |
| `cuenta-credibilidad` | Cuenta de credibilidad (4 focos) | Equipo y liderazgo | CE | P3 | formulario |
| `mapa-creencias` | Mapa de creencias y modelos mentales | Equipo y liderazgo | CE, LA | P3 | formulario |
| `logicas-accion` | Lectura de lógicas de acción | Equipo y liderazgo | IM | P3 | formulario |
| `reunion-1a1` | Reunión 1:1 con foco relacional | Equipo y liderazgo | CE | P3 | formulario |
| `pulso-clima` | Pulso de clima y autonomía | Equipo y liderazgo | CE | P3 | formulario + tablero |
| `mapa-colaboracion` | Mapa de colaboración | Equipo y liderazgo | SCRUM | P3 | lienzo-diagrama |
| `bitacora-reflexion` | Bitácora de dominio personal y reflexión | Equipo y liderazgo | LA, IM | P3 | formulario |
| `leccion-aprendida` | Registro de lecciones aprendidas | Conocimiento y cierre | LA, SCRUM, SS, BIM, CE | **P1** | formulario + tabla |
| `retrospectiva` | Retrospectiva / revisión post-hito | Conocimiento y cierre | SCRUM, LA, IM, CE | **P1** | tablero |
| `revision-pares` | Presentación y revisión entre pares | Conocimiento y cierre | LA | P3 | formulario |
| `carta-patrocinio` | Carta de interés y compromiso del patrocinador | Conocimiento y cierre | LA | P3 | formulario |
| `diagnostico-bim` | Diagnóstico de equipo y madurez BIM | BIM | BIM | P3 | formulario + tablero |
| `peb` | Plan de Ejecución BIM (PEB) | BIM | BIM | P2 | formulario |
| `coordinacion-bim` | Coordinación BIM e incidencias | BIM | BIM | P3 | tabla + tablero |
| `cde-ligero` | Repositorio tipo CDE ligero | BIM | BIM | P3 | tabla |
| `entrega-operacion` | Checklist de entrega a operación (as-built) | BIM | BIM | P3 | formulario |

**Totales:** 83 herramientas — Estrategia y portafolio 6 · Análisis de negocio 16 · Gestión de proyectos 13 · Mejora continua y procesos 14 · Análisis de problemas y decisiones 13 · Equipo y liderazgo 12 · Conocimiento y cierre 4 · BIM 5. **P1: 16.**

**Fusiones principales (deduplicación):**
- `ishikawa`: BA (6M, 6 pasos), LA (10 pasos, 3 métodos, votación 5-3-1, 2.º nivel), BIM (plantilla "gestión de la información"), SS (6M, Xs).
- `plan-control`: LEAN (plantilla de 9 columnas) + SS (3 bloques documentación/monitoreo/respuesta + formato tipo AIAG).
- `ficha-proyecto`: SS (Project Charter), BA (6 conceptos clave), CE (comisión clara), LA (guion de propuesta), LEAN (A3: condiciones).
- `mapa-stakeholders`: LA (interés/poder/posición), BA (stakeholders), CE (conectar con el entorno), IM (lógica percibida), BIM (actitud ante el cambio), SCRUM (roles no centrales).
- `matriz-raci`: BA (RACI del business case), CE (roles y "quién decide qué"), BIM (matriz quién-qué-cuándo de la información), SCRUM (roles).
- `pareto`: LA (tabla A-F, 2.º nivel, frecuencia × costo), SS (paso 7), SCRUM (método de priorización).
- `matriz-priorizacion`: SS (esfuerzo-impacto, criterios múltiples 9/3/1), LA (impacto × factibilidad SSM), SCRUM (MoSCoW, Kano, 100 puntos, valor vs. complejidad, Eisenhower).
- `vsm`: LEAN (simbología, PLT, PCE, takt) + SS (mapa detallado "lo que se piensa / lo que es / lo que debería ser").
- `sipoc`: SS (paso 3) + LA (PEPSU, lectura de herramientas básicas de calidad).
- `cynefin`: IM (análisis por componentes) + SCRUM (selector de enfoque predictivo/ágil/híbrido).
- `micropracticas`: CE (macro-mini-micro, tracker) + IM (formato de capacidad, 4 campos, preguntas estresoras, ciclo de aprendizaje).
- `mapa-creencias`: CE (creencias como reglas implícitas) + LA (caja de protección mental, modelos mentales limitantes/habilitantes).
- `retrospectiva`: SCRUM (5 pasos) + LA (3 preguntas, moderador ≠ JP) + IM (reflexión post-hito) + CE (aprendizaje del equipo).
- `leccion-aprendida`: LA (plantilla, checklist A-E, valor) + SCRUM (retro) + SS (cierre paso 15) + BIM (cierre).
- `valor-beneficios`: LA (gestión del valor, KPIs, tabla de valor), BIM (propuesta de valor al mandante), BA (evaluación de la solución), SS (cuantificar oportunidad, beneficios a 12 meses), SCRUM (valor acumulado).
- `constructor-encuestas`: BA (cuestionario 9 pasos), LA (Likert de cierre, ISC, NPS), CE (plantillas de diagnóstico y pulso), SS (fuente VOC).
- `lluvia-ideas`: BA, LA (10 pasos), SS (guiado, 3×3×3, antisolución, grupo silencioso), LEAN (ideas de mejora VSM).

**Correcciones al material** (aplicadas en este catálogo, detectadas en SS §6.10, §7.8, §7.9 y §10):
1. FMEA del ejemplo del café: RPN posterior **80** (8 × 2 × 5), no 96.
2. Delta/sigma del ejemplo: δ/σ = **0,21 / 0,2233 ≈ 0,94** (el material divide "21", con unidades mezcladas).
3. Criterio de MSA: los umbrales 10 % / 30 % aplican a **% variación de estudio (o % tolerancia)**; para **% contribución** los equivalentes son 1 % / 9 % (complemento). El ejemplo del material (7,12 % de contribución ≈ 26,7 % de variación de estudio) resulta **condicional**, no "aceptable" sin más.

---

## 2. Fichas por herramienta

### 2.1 Estrategia y portafolio

#### `hoshin-kanri` — Despliegue Hoshin Kanri / OKR
*Categoría:* Estrategia y portafolio · *Prioridad:* P2 · *UI:* tablero (árbol jerárquico)

**Propósito y disparadores.** Bajar la estrategia desde una visión a 5 años hasta iniciativas trimestrales con KR y responsables, con diálogo bidireccional (desglose ↔ contribución). Disparadores: "los proyectos no se conectan con la estrategia", "cada área persigue su propio objetivo", "no sabemos qué proyectos priorizar este año", "la dirección mira resultados y la operación mira procesos".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| ambito | enum(compañía\|unidad de negocio\|gerencia\|flujo de valor) | Sí | Dónde aplicar (LEAN §2.5) |
| estrategia_lean | objeto {definicion, rol, visualizacion_metas, focos} | No | 4 componentes de la estrategia Lean |
| pilares | lista<{palabra_clave: texto, oracion: texto, horizonte: 5 años}> | Sí | 4–6 pilares; "¿QUÉ?" |
| objetivos | lista<{pilar_ref, nombre, descripcion, dueño: usuario, horizonte: 2 años}> | Sí | 3–4 por pilar; cualitativos; "¿CÓMO?" |
| proyectos_estrategicos | lista<ref:a3-estrategico> | Sí | 1 por objetivo |
| iniciativas | lista<{a3_ref, nombre, lider: usuario, indicador: Indicador, horizonte: ¼–1 año, proyecto_ref}> | Sí | ≥ 2 por proyecto estratégico |
| guardianes | lista<usuario> | No | Mantienen el diálogo; no deciden la estrategia |
| cadencia | objeto {estrategia: trimestral, objetivos: mensual, unidades: semanal} | Sí | Valores por defecto del material |
| dialogo | lista<{nivel_origen, nivel_destino, tipo: enum(reto\|acuerdo_objetivos_KR\|acuerdo_iniciativas\|resultado\|aprendizaje), texto, fecha}> | No | Desglose ↔ contribución |

**Cálculos, reglas y validaciones**
- Alertas suaves: < 4 o > 6 pilares; > 4 objetivos por pilar; objetivo sin dueño; objetivo sin A3; A3 con 0 o > 4 KR; proyecto con < 2 iniciativas; iniciativa sin líder o sin indicador (LEAN §8.1).
- Al crear un indicador se tipifica KR o KPI; la IA advierte si un "KR" parece KPI de esfuerzo (p. ej. "cantidad de campañas"): KR = 1–4 por objetivo, cuantitativo, progresivo, mide impacto, no "vanity metric".
- Regla dura: los KR **no** se exportan a evaluación de desempeño ni incentivos (aviso si se intenta).
- Rollup: el avance de iniciativas → KR del A3 → objetivo → pilar.

**Salidas.** Árbol Hoshin, roadmap estratégico, insumos para scorecard y panel, calendario de cadencias.

**Conexiones.** Entradas desde: `foda`, `tows`, `pestle`, `valor-beneficios`. Alimenta a: `a3-estrategico`, `hoshin-scorecard`, `portafolio-proyectos`, `ficha-proyecto` (cada iniciativa puede abrir un proyecto), `vsm` (iniciativa sobre un proceso).

**Preguntas guía IA**
1. ¿Para qué ámbito despliegas la estrategia (compañía, unidad, gerencia o flujo de valor)?
2. ¿Cómo debería verse la organización en 5 años? Resúmelo en 4 a 6 palabras clave, cada una con una oración.
3. Para cada pilar, ¿qué 3 o 4 objetivos responden "para qué hacemos esto" y quién es su dueño?
4. ¿Qué proyecto estratégico operacionaliza cada objetivo y cuál es su condición inicial y su objetivo?
5. ¿Qué 1 a 4 resultados clave medirán el impacto (no el esfuerzo)?
6. ¿Qué iniciativas tácticas, con líder e indicador, llevarán a cabo los equipos?
7. ¿Quiénes mantendrán vivo el diálogo entre niveles y con qué cadencia se revisará?

**Origen.** LEAN §2.3–2.7, §5.1, §7, §8.1.

---

#### `a3-estrategico` — A3 Estratégico
*Categoría:* Estrategia y portafolio · *Prioridad:* P2 · *UI:* formulario + tabla (Gantt)

**Propósito y disparadores.** Una hoja por objetivo estratégico que documenta condición inicial/actual/objetivo, KR, iniciativas con Gantt y estado, recursos y ahorros. Disparadores: "necesito gestionar un objetivo estratégico en una página", "reporte mensual de un objetivo".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| numero | texto | Sí | Código tipo OU_# |
| tema | texto | Sí | |
| objetivo_ref | ref:hoshin-kanri (objetivo) | Sí | |
| responsable | usuario | Sí | lead/owner |
| prioridad | enum(alta\|media\|baja) | No | |
| inicio / fin | fecha (mes) | Sí | |
| estatus | enum(x\|G\|Y\|R) | Sí | x = sin evaluar; colores R rojo, Y ámbar, G verde |
| condicion_inicial / actual / objetivo | texto largo | Sí | |
| key_results | lista(1–4)<{definicion, kr_inicial, kr_actual, kr_objetivo}> (Indicador tipo KR) | Sí | Plantilla trae 3 filas |
| iniciativas | lista(≤ 10)<{actividad, gantt_meses: lista<mes>, cierre_hito: fecha, lider: usuario, estado: escala(0–4), comentario}> | Sí | Estado Harvey ball 0, ¼, ½, ¾, completo |
| comentario | texto largo | No | |
| decisiones_ajustes | lista<Decisión> | No | |
| recursos | lista(≤ 6)<{nombre, funcion, capacidad_%}> | No | |
| requerimientos_soporte | texto largo | No | |
| fechas_revision | {ultima, actual, siguiente: fecha} | No | Recordatorio de la siguiente |
| ahorros | lista<{año: entero, monto: moneda}> | No | |

**Cálculos, reglas y validaciones**
- Avance de iniciativa = estado × 25 % (0–4 → 0–100 %).
- Avance de KR (complemento) = (actual − inicial) / (objetivo − inicial), acotado 0–100 %.
- Estatus sugerido (complemento): G si avance de KR ≥ avance de tiempo; Y si la brecha ≤ 15 pp; R si mayor. El usuario confirma.
- Total de ahorros por año → `portafolio-proyectos`.

**Salidas.** A3 imprimible en una hoja, fila del roadmap, datos para el scorecard.

**Conexiones.** Entradas desde: `hoshin-kanri`. Alimenta a: `hoshin-scorecard`, `portafolio-proyectos`, `cronograma-gantt`, `ficha-proyecto` (iniciativas).

**Preguntas guía IA**
1. ¿Qué objetivo estratégico operacionaliza este A3 y quién lo lidera?
2. ¿Cuál era la condición inicial, cuál es la actual y cuál la condición objetivo?
3. ¿Qué KR (máx. 4) usarás, con su valor inicial, actual y objetivo?
4. ¿Qué iniciativas o actividades lo componen, en qué meses y con qué líder?
5. ¿Qué recursos y apoyo necesitas?
6. ¿Cuándo es la próxima revisión y qué ahorros se esperan por año?

**Origen.** LEAN §2.6 paso 3, §6.5, §8.3.

---

#### `hoshin-scorecard` — Scorecard y panel Hoshin
*Categoría:* Estrategia y portafolio · *Prioridad:* P2 · *UI:* tablero + cálculo

**Propósito y disparadores.** Gestión visual de la estrategia: por pilar, objetivos, KR con valor/meta/% y semáforo, e iniciativas con fecha y avance; panel tipo North Star / Blue Sky / Roadmap / A3 / plan maestro / PDCA. Disparadores: "revisión mensual de la estrategia", "no vemos el avance de los objetivos".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| hoshin_ref | ref:hoshin-kanri | Sí | Columnas por pilar (plantilla: 5 bloques) |
| kr_filas | lista<{objetivo_nro, indicador: Indicador(KR), valor, meta, aa}> | Sí | 3 KR por objetivo en la plantilla; `aa` posiblemente "año anterior" (interpretación) |
| iniciativas_filas | lista<{nro, iniciativa, fecha, avance_%, feel: enum(verde\|amarillo\|rojo)}> | Sí | |
| glosario | lista<{pilar, def_pilar, objetivo, def_objetivo, kr, def_kr}> | No | Diccionario 6 × 4 × 3 |
| panel | {north_star, blue_sky: texto largo} | No | |
| periodo | fecha (mes) | Sí | |

**Cálculos, reglas y validaciones**
- `% cumplimiento = valor / meta × 100` (la plantilla no trae fórmula; se calcula automáticamente). Para KR "menos es mejor": `meta / valor × 100` (complemento).
- Semáforo (complemento, configurable): verde ≥ 90 %, amarillo 70–89 %, rojo < 70 %.
- Lista automática para comité: KR en rojo o iniciativas con avance sin cambio en 2 revisiones.
- Opción de vincular OKR a épicas del backlog (SCRUM §3.3).

**Salidas.** Scorecard mensual, panel para reuniones de pie, lista de excepciones para el comité.

**Conexiones.** Entradas desde: `hoshin-kanri`, `a3-estrategico`, `metricas-agiles`, `plan-control`. Alimenta a: `portafolio-proyectos`.

**Preguntas guía IA**
1. ¿Qué periodo estás reportando?
2. ¿Cuál es el valor actual de cada KR frente a su meta?
3. ¿Algún KR mejora cuando baja (menos es mejor)?
4. ¿Qué iniciativas avanzaron y cuál es la percepción ("feel") de cada una?
5. ¿Qué excepciones quieres llevar al comité y qué decisión propones?

**Origen.** LEAN §2.6 (pág 40), §2.7, §6.4, §8.1; SCRUM §3.3 (OKR ligados a épicas).

---

#### `portafolio-proyectos` — Portafolio, roadmap estratégico y comité Go/No-Go
*Categoría:* Estrategia y portafolio · *Prioridad:* P2 · *UI:* tablero

**Propósito y disparadores.** Asegurar que el portafolio se ajuste a la estrategia, asignar recursos según la etapa del pipeline, balancearlo y registrar decisiones Go/No-Go del comité de mejora continua. Disparadores: "tenemos demasiados proyectos", "¿cuál hacemos primero?", "no hay instancia que decida avanzar o detener".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| proyectos | lista<{proyecto_ref, pilar_ref, objetivo_ref, foco, etapa_pipeline: enum(idea\|perfil\|definición\|ejecución\|control\|cerrado), plazo, riesgo: enum(bajo\|medio\|alto), impacto_economico: moneda, impacto_social: texto, complejidad: enum(baja\|media\|alta), dueño, unidad_negocio, tipo_metodologia: enum(Kaizen\|DMAIC\|Scrum\|predictivo\|BIM\|otro), inversion, ahorros, trimestres: lista<Q>}> | Sí | Roadmap LEAN pág 36 + balance pág 9 |
| comite | {nombre, periodicidad, miembros: lista<usuario>} | Sí | Comité de Mejora Continua / Excelencia Operacional |
| decisiones | lista<Decisión + {proyecto_ref, tipo: enum(Go\|No-Go\|modificar alcance\|detener)}> | No | Incluye decisión "continuar/modificar/detener" de la compuerta TG-A de DMAIC |

**Cálculos, reglas y validaciones**
- Vistas de balance: nº y monto por pilar, etapa, riesgo y complejidad; alerta si un pilar no tiene proyectos.
- Total inversión/ahorros por trimestre (desde `a3-estrategico` y `valor-beneficios`).
- Un proyecto no pasa de etapa sin decisión registrada del comité.

**Salidas.** Roadmap trimestral, matriz de balance, acta del comité.

**Conexiones.** Entradas desde: `hoshin-kanri`, `a3-estrategico`, `perfil-solucion`, `hoshin-scorecard`, `proyecto-dmaic`. Alimenta a: `ficha-proyecto`, `cronograma-gantt`.

**Preguntas guía IA**
1. ¿Qué proyectos componen hoy el portafolio y a qué pilar u objetivo responde cada uno?
2. ¿En qué etapa está cada uno y qué metodología usa?
3. ¿Cuál es su plazo, riesgo, impacto económico o social y complejidad?
4. ¿Quién integra el comité y cada cuánto se reúne?
5. ¿Qué decisión Go/No-Go se requiere hoy y con qué fundamento?

**Origen.** LEAN §2.2, §2.4, §6.6, §8.1; SS §8.1 (panel de portafolio), §8.2 (TG-A).

---

#### `perfil-solucion` — Perfil de solución / caso de negocio ligero
*Categoría:* Estrategia y portafolio · *Prioridad:* P2 · *UI:* formulario

**Propósito y disparadores.** Proponer una solución al comité como puerta de entrada al pipeline. Disparadores: "tengo una idea y necesito aprobación", "preparar el business case".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| nombre_solucion | texto | Sí | |
| descripcion | texto largo | Sí | |
| problema_oportunidad | texto largo / ref:registro-problema | Sí | |
| clientes_roles_impactados | lista<ref:stakeholder> | Sí | |
| modelo_operacion | texto largo | Sí | |
| dimensionamiento | texto largo + moneda | Sí | Tamaño, costo, beneficio estimado |
| opciones_evaluadas | lista<{opcion, ventajas, desventajas}> | No | BA tarea 7.5–7.6: opciones de solución y valor potencial |
| recomendacion | texto | No | |
| raci_business_case | ref:matriz-raci | No | Plantilla BA: Sponsor / Gerente de producto / BA / PM |

**Cálculos, reglas y validaciones.** Sin cálculos propios; al enviarlo crea un ítem en `portafolio-proyectos` en etapa "perfil". La IA verifica que el problema no contenga ya la solución.

**Salidas.** Ficha de una página para el comité.

**Conexiones.** Entradas desde: `registro-problema`, `analisis-brechas`, `tows`, `matriz-priorizacion`. Alimenta a: `portafolio-proyectos`, `ficha-proyecto`, `valor-beneficios`.

**Preguntas guía IA**
1. ¿Qué problema u oportunidad resuelve la solución?
2. Describe la solución en dos o tres frases.
3. ¿A qué clientes y roles impacta?
4. ¿Cómo operará una vez implementada?
5. ¿Qué tamaño, costo y beneficio estimas, y con qué supuestos?
6. ¿Qué otras opciones consideraste y por qué esta tiene mayor valor?

**Origen.** LEAN §6.2, §8.3; BA §2 (clase 4: definir opciones y recomendar), §5.2.

---

#### `valor-beneficios` — Propuesta de valor, KPIs de valor y beneficios
*Categoría:* Estrategia y portafolio · *Prioridad:* P2 · *UI:* formulario + tablero

**Propósito y disparadores.** Definir qué valor entrega el proyecto, con qué métricas verificables y línea base, y seguir lo real frente a lo comprometido hasta validar beneficios en operación. Disparadores: "no podemos demostrar el valor", "el cliente o la dirección pide beneficios medibles", "cuánto vale resolver esto", "cierre: ¿se lograron los beneficios?".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| destinatario | ref:stakeholder | Sí | Quién recibe/percibe el valor |
| problema_cliente | texto largo | Sí | BIM §6.7 |
| beneficios | lista<{descripcion, tipo_valor: enum(tiempo\|costo\|calidad\|riesgos\|stakeholders\|conocimiento\|capacidades), crea_o_protege: enum(crea\|protege), tangible: bool}> | Sí | Tipos de valor de LA §2 S5a |
| kpis_valor | lista<Indicador(KPI_valor) + {fase_ciclo: enum(iniciación\|planificación\|ejecución\|monitoreo\|cierre), fuente_verificacion}> | Sí | Línea base y meta obligatorias |
| oportunidad_estimada | {ganancias_volumen_precio, reduccion_costos, reduccion_capital_trabajo, otros_intangibles: texto, supuestos: texto largo, total: moneda} | No | SS paso 9 (4 categorías de impacto) |
| validado_por_contralor | bool + usuario + fecha | No | SS TG-A y TG-C |
| seguimiento | lista<{mes, beneficio_real: moneda, comentario}> | No | 12 meses post-cierre (SS) |
| mensaje_valor | texto largo | No | Propuesta para mandante (BIM) |

**Cálculos, reglas y validaciones**
- Beneficio acumulado = Σ beneficio_real; desvío = acumulado − comprometido prorrateado.
- `NPS` e `ISC` se importan desde `constructor-encuestas`.
- Valor acumulado por release (SCRUM §7) cuando el proyecto es ágil.
- Regla: todo beneficio sin evidencia queda marcado "esperado" (LA §6.9: "una propuesta del equipo no es evidencia").
- Seguimiento de beneficios: 12 meses (SS §7.11).

**Salidas.** Propuesta de valor, tablero de KPIs de valor, informe de beneficios validados.

**Conexiones.** Entradas desde: `ficha-proyecto`, `perfil-solucion`, `constructor-encuestas`, `metricas-agiles`, `proyecto-dmaic`. Alimenta a: `portafolio-proyectos`, `leccion-aprendida` (tabla de valor), `hoshin-scorecard`.

**Preguntas guía IA**
1. ¿Quién percibe el valor de este proyecto y qué problema le resuelve?
2. ¿Qué beneficios concretos esperas y de qué tipo (tiempo, costo, calidad, riesgo, satisfacción, capacidades)?
3. ¿Cómo medirás cada beneficio, cuál es la línea base y cuál la meta?
4. ¿Qué parte del beneficio es monetizable (ganancias, costos, capital de trabajo) y con qué supuestos?
5. ¿Quién validará las cifras financieras?
6. ¿Cada cuánto registrarás el beneficio real y durante cuánto tiempo?

**Origen.** LA §2 S5a (gestión del valor, KPI de valor, ISC/NPS), §6.8–6.9; BIM §5, §6.7, §8.1-10; BA §7 F (evaluación de la solución); SS §2 paso 9 y 15, §8.3 (beneficios); SCRUM §7 (valor acumulado).

---

### 2.2 Análisis de negocio

#### `pestle` — Análisis PESTLE
*Categoría:* Análisis de negocio · *Prioridad:* P2 · *UI:* lienzo-diagrama

**Propósito y disparadores.** Investigar el ambiente externo (sobre el que no se puede influir) para detectar oportunidades y amenazas. Disparadores: "inicio de una iniciativa", "cambió la regulación / la economía / la tecnología", "preparar el FODA".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| organizacion_contexto | texto | Sí | "Empresa" al centro |
| factores | lista<{dimension: enum(Político\|Económico\|Social\|Tecnológico\|Legal\|Ambiental), descripcion, impacto: escala(1–5), tipo: enum(oportunidad\|amenaza), fuente}> | Sí | ≥ 1 por dimensión recomendada |

**Cálculos, reglas y validaciones.** Lista ordenada por impacto (desc.). Alerta si una dimensión queda vacía. La escala 1–5 de impacto es (complemento). Descriptores guía por dimensión según BA §4.1 (p. ej. Ambiental: economía circular, huella hídrica y de carbono).

**Salidas.** Lista priorizada de factores externos.

**Conexiones.** Alimenta a: `foda` (O/A), `registro-riesgos`, `hoshin-kanri`.

**Preguntas guía IA**
1. ¿Para qué organización o iniciativa haces el análisis?
2. ¿Qué cambios políticos o de políticas públicas te afectan?
3. ¿Qué factores económicos (crecimiento, tasas, empleo, comercio exterior) inciden?
4. ¿Qué cambios sociales o demográficos y tecnológicos ves?
5. ¿Qué legislación, regulación o compliance aplica, aquí o en otros países?
6. ¿Qué exigencias ambientales enfrentas?
7. De todo lo anterior, ¿qué tiene mayor impacto?

**Origen.** BA §4.1, §7 B-5.

---

#### `cinco-fuerzas` — Cinco fuerzas de la industria (Porter)
*Categoría:* Análisis de negocio · *Prioridad:* P3 · *UI:* formulario

**Propósito y disparadores.** Evaluar el atractivo de la industria. Disparadores: "entrar a un mercado", "competencia creciente", "presión de clientes o proveedores".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| industria | texto | Sí | |
| fuerzas | lista(5)<{fuerza: enum(rivalidad\|nuevos_entrantes\|poder_clientes\|poder_proveedores\|sustitutos), intensidad: enum(Bajo\|Medio\|Alto), justificacion: texto largo}> | Sí | Descriptores guía por fuerza (BA §4.1) |

**Cálculos, reglas y validaciones.** Atractivo (complemento): Bajo=1, Medio=2, Alto=3; promedio ≥ 2,5 → "industria poco atractiva".

**Salidas.** Intensidad por fuerza y atractivo. **Conexiones.** Alimenta a: `foda` (O/A), `matriz-ansoff`.

**Preguntas guía IA**
1. ¿Qué industria analizas?
2. ¿Qué tan intensa es la rivalidad y por qué?
3. ¿Qué barreras de entrada existen?
4. ¿Qué poder de negociación tienen clientes y proveedores?
5. ¿Qué sustitutos están surgiendo?

**Origen.** BA §4.1, §6 (escala cualitativa), §7 B-6.

---

#### `inventario-recursos` — Inventario / auditoría de recursos
*Categoría:* Análisis de negocio · *Prioridad:* P3 · *UI:* tabla

**Propósito y disparadores.** Revisar capacidades internas que habilitan u obstaculizan el cambio. Disparadores: "¿tenemos capacidad para este cambio?", "preparar F/D del FODA".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| recursos | lista<{categoria: enum(Financieros\|Físicos\|Humanos\|Reputación\|Conocimiento), descripcion, efecto: enum(habilitador\|obstaculizador), relevancia: escala(1–5)}> | Sí | Escala (complemento) |

**Cálculos, reglas y validaciones.** Alerta si una categoría queda vacía. Habilitador → Fortaleza; obstaculizador → Debilidad.

**Salidas.** Fortalezas y debilidades. **Conexiones.** Alimenta a: `foda` (F/D), `gestion-cambio`.

**Preguntas guía IA**
1. ¿Qué capacidad financiera tienes para invertir en el cambio?
2. ¿Qué recursos físicos (instalaciones, maquinaria) ayudan o limitan?
3. ¿Cómo está la dotación, el clima y la retención de talento?
4. ¿Cómo te percibe el mercado?
5. ¿Qué know-how y TI posee la organización?

**Origen.** BA §4.1, §7 B-7.

---

#### `foda` — FODA (SWOT)
*Categoría:* Análisis de negocio · *Prioridad:* **P1** · *UI:* lienzo-diagrama

**Propósito y disparadores.** Consolidar análisis interno y externo en una matriz 2×2. Disparadores: "inicio de proyecto o producto", "visión de producto", "diagnóstico estratégico rápido", "¿dónde estamos parados?".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| objeto_analisis | enum(organización\|unidad\|producto\|proyecto) + texto | Sí | En SCRUM lo hace el PO para la visión |
| items | lista<{cuadrante: enum(F\|D\|O\|A), texto, impacto: escala(1–5), origen_ref: ref:pestle\|cinco-fuerzas\|inventario-recursos (opcional)}> | Sí | ≥ 1 por cuadrante |

**Cálculos, reglas y validaciones.** Ordenar por impacto dentro de cada cuadrante. Pre-llenado automático: PESTLE y 5 fuerzas → O/A; inventario → F/D (BA §7 B-8). Validación: F/D son internos y O/A externos (la IA advierte si un ítem parece mal ubicado, p. ej. "nueva regulación" en Debilidades). Ejemplos guía de SCRUM §2 S2.

**Salidas.** Matriz FODA priorizada. **Conexiones.** Entradas desde: `pestle`, `cinco-fuerzas`, `inventario-recursos`. Alimenta a: `tows`, `vision-producto`, `hoshin-kanri`, `registro-riesgos` (amenazas).

**Preguntas guía IA**
1. ¿Qué analizas: la organización, un producto o el proyecto?
2. ¿Qué fortalezas internas te ayudan (experiencia, procesos, sistemas, relaciones)?
3. ¿Qué debilidades internas te frenan?
4. ¿Qué oportunidades externas podrías capturar (mercados, tecnologías)?
5. ¿Qué amenazas externas enfrentas (competidores, economía, regulación)?
6. ¿Cuáles de esos factores tienen mayor impacto?

**Origen.** BA §4.1, §7 B-8; SCRUM §2 S2 (visión del producto), §6.

---

#### `tows` — Matriz TOWS
*Categoría:* Análisis de negocio · *Prioridad:* P2 · *UI:* tabla

**Propósito y disparadores.** Convertir el FODA en acciones concretas cruzando F/D con O/A. Disparadores: "ya tengo el FODA, ¿y ahora qué hago?".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| foda_ref | ref:foda | Sí | |
| estrategias | lista<{tipo: enum(FO\|FA\|DO\|DA), items_foda: lista<ref item>, accion: texto largo, convertir_en_iniciativa: bool}> | Sí | ≥ 1 por tipo recomendado |

**Cálculos, reglas y validaciones.** Cada estrategia debe citar al menos un ítem interno y uno externo del tipo correspondiente. Las marcadas se convierten en iniciativa (`perfil-solucion` o `hoshin-kanri`).

**Salidas.** Estrategias FO/FA/DO/DA. **Conexiones.** Entradas desde: `foda`. Alimenta a: `matriz-ansoff`, `perfil-solucion`, `hoshin-kanri`, `portafolio-proyectos`.

**Preguntas guía IA**
1. ¿Cómo usar tus fortalezas para aprovechar oportunidades (FO)?
2. ¿Cómo usar tus fortalezas para reducir amenazas (FA)?
3. ¿Qué oportunidades permiten superar debilidades (DO)?
4. ¿Qué hacer para minimizar debilidades frente a amenazas (DA)?
5. ¿Cuáles de estas acciones quieres convertir en iniciativas?

**Origen.** BA §4.1, §7 B-9.

---

#### `matriz-ansoff` — Matriz de Ansoff
*Categoría:* Análisis de negocio · *Prioridad:* P3 · *UI:* lienzo-diagrama

**Propósito y disparadores.** Clasificar iniciativas de crecimiento por producto × mercado y su riesgo. Disparadores: "queremos crecer", "nuevo producto o nuevo mercado".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| iniciativas | lista<{nombre, producto: enum(existente\|nuevo), mercado: enum(existente\|nuevo), descripcion}> | Sí | |

**Cálculos, reglas y validaciones.** Cuadrante derivado: existente/existente = Penetración; nuevo producto/existente = Desarrollo de producto; existente/nuevo mercado = Desarrollo de mercado; nuevo/nuevo = Diversificación (la más riesgosa; alerta de riesgo).

**Salidas.** Mapa de iniciativas por cuadrante. **Conexiones.** Entradas desde: `tows`, `cinco-fuerzas`. Alimenta a: `portafolio-proyectos`, `registro-riesgos`.

**Preguntas guía IA**
1. ¿Qué iniciativas de crecimiento evalúas?
2. ¿Cada una usa productos existentes o nuevos?
3. ¿Apunta a mercados o segmentos existentes o nuevos?
4. Para las de diversificación, ¿qué riesgos identificas?

**Origen.** BA §4.1, §7 B-10. (La matriz BCG solo se menciona en el material; no se implementa.)

---

#### `analisis-brechas` — Estado actual → futuro y matriz GAP
*Categoría:* Análisis de negocio · *Prioridad:* P2 · *UI:* tabla

**Propósito y disparadores.** Entender el estado actual, definir el futuro, identificar brechas y la estrategia de cambio. Disparadores: "¿cuánto nos falta para llegar?", "comparar modelo ideal con la realidad" (SSM paso 5), "definir estrategia de cambio".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| estado_actual | texto largo | Sí | BABOK 6.1 |
| estado_futuro | texto largo | Sí | BABOK 6.2 |
| brechas | lista<{actividad_o_capacidad, situacion_actual, situacion_deseada, brecha, evidencia: lista<Evidencia>, impacto: escala(1–5)}> | Sí | Matriz GAP (LA §5.4 paso 5) |
| riesgos_negocio | lista<ref:registro-riesgos> | No | BABOK 6.3; separados de riesgos de proyecto |
| estrategia_cambio | texto largo | No | BABOK 6.4 |
| modelo_ref | ref:ssm \| ref:vsm | No | Fuente del "deber ser" |

**Cálculos, reglas y validaciones.** Ordenar brechas por impacto. Toda brecha requiere al menos una evidencia antes de marcar la instancia como completa.

**Salidas.** Matriz GAP priorizada y estrategia de cambio. **Conexiones.** Entradas desde: `ssm`, `vsm`, `inventario-recursos`. Alimenta a: `matriz-priorizacion` (portafolio de cambios), `perfil-solucion`, `repositorio-requisitos` (requisitos de transición), `a3-mejora`.

**Preguntas guía IA**
1. ¿Cómo describes la situación actual, con hechos?
2. ¿Cómo debería verse el estado futuro deseado?
3. ¿En qué actividades o capacidades está la mayor diferencia?
4. ¿Qué evidencia respalda cada brecha?
5. ¿Qué impacto tiene cerrar cada brecha?
6. ¿Qué riesgos de negocio ves en el cambio y cuál es tu estrategia para moverte?

**Origen.** BA §2 (clase 2, tareas 6.1–6.4), §7 A-2; LA §5.4 paso 5, §8.1-4; LEAN §6.5 (condiciones inicial/actual/objetivo).

---

#### `plan-elicitacion` — Plan y registro de elicitación
*Categoría:* Análisis de negocio · *Prioridad:* P2 · *UI:* tabla

**Propósito y disparadores.** Planificar y seguir la obtención de información de stakeholders y fuentes. Disparadores: "no sabemos qué necesita el usuario", "requisitos contradictorios", "los interesados no saben lo que quieren".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| alcance_objetivos | texto largo | Sí | Preparación |
| fuentes | lista<{tipo: enum(documento\|persona\|sistema), descripcion, stakeholder_ref}> | Sí | |
| actividades | lista<{tecnica: enum(entrevista\|encuesta\|focus_group\|observación\|brainstorming\|análisis_documental\|workshop\|otra), instancia_ref: ref:*, fecha, responsable, estado_resultado: enum(planificado\|por_confirmar\|confirmado\|comunicado)}> | Sí | Ciclo preparación → ejecución → confirmación → comunicación → gestión de stakeholders |
| hallazgos | lista<{enunciado, fuentes_confirmadoras: lista<ref fuente>, requisito_ref}> | No | |
| dificultades | lista<{dificultad: enum(información contradictoria\|necesidades en conflicto\|supuestos no declarados\|no se puede agendar\|resistencia\|no saben expresar\|se centran en la solución\|sin acceso a stakeholders\|no saben lo que quieren\|poco detalle), nota}> | No | Con sugerencias del material (BA §2 clase 4) |

**Cálculos, reglas y validaciones**
- `% hallazgos confirmados = hallazgos con ≥ 2 fuentes independientes / total`.
- Señales de cierre (BA §2 clase 4): ≥ 2 fuentes por hallazgo pertinente; aprobación o redundancia; solución identificada; objetivos cumplidos; información difícil de obtener. La IA sugiere cerrar cuando se cumplen.
- Sugerencias contextuales por dificultad (p. ej. "no saben lo que quieren" → prototipos, ciclo adaptativo).

**Salidas.** Plan de elicitación y resultados confirmados/comunicados. **Conexiones.** Entradas desde: `mapa-stakeholders`. Alimenta a: `guion-entrevista`, `constructor-encuestas`, `plan-observacion`, `analisis-documental`, `lluvia-ideas`, `repositorio-requisitos`.

**Preguntas guía IA**
1. ¿Qué necesitas descubrir y para qué decisión?
2. ¿Qué personas, documentos y sistemas tienen esa información?
3. ¿Qué técnica conviene para cada fuente (muchas personas → encuesta; procesos → observación)?
4. ¿Qué dificultades anticipas con los stakeholders?
5. ¿Cómo confirmarás y comunicarás los resultados?

**Origen.** BA §2 clase 3–4, §4.2, §5.5, §7 C-11, C-12, C-19, C-20.

---

#### `analisis-documental` — Análisis documental
*Categoría:* Análisis de negocio · *Prioridad:* P3 · *UI:* tabla

**Propósito y disparadores.** Extraer contexto y requisitos de documentos existentes. Disparadores: "no tengo acceso a los stakeholders", "hay manuales y reportes previos", "entender el lenguaje del negocio".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| proposito_alcance_topicos | texto largo | Sí | |
| fuentes | lista<{documento, checklist: {relevante, actual, genuina, creible, comprensible: bool}}> | Sí | |
| notas | lista<{topico, tipo, fuente_ref, extracto, idea_destacada}> | Sí | |
| conflictos_duplicados | lista<{nota_a, nota_b, tipo: enum(conflicto\|duplicado)}> | No | |
| brechas_topico | lista<texto> | No | |

**Cálculos, reglas y validaciones.** Una fuente que falla el checklist se marca "baja calidad". Alerta de tópico sin notas (brecha).

**Salidas.** Hallazgos y requisitos candidatos. **Conexiones.** Entradas desde: `plan-elicitacion`. Alimenta a: `repositorio-requisitos`, `triangulacion-evidencia`.

**Preguntas guía IA**
1. ¿Qué propósito y tópicos tiene la revisión?
2. ¿Qué documentos revisarás y son actuales y creíbles?
3. ¿Qué extractos e ideas destacadas encontraste por tópico?
4. ¿Hay contradicciones o duplicados entre documentos?
5. ¿Qué tópicos quedaron sin información?

**Origen.** BA §4.2, §5.5, §7 C-13.

---

#### `guion-entrevista` — Planificador y guion de entrevista
*Categoría:* Análisis de negocio · *Prioridad:* P2 · *UI:* formulario

**Propósito y disparadores.** Planificar, conducir y documentar entrevistas (la técnica de elicitación más usada). Disparadores: "necesito entrevistar a usuarios o expertos", "entrevistas de retención de conocimiento".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| antecedentes | texto largo | No | Paso 1 |
| objetivos | texto largo | Sí | Paso 2 |
| entrevistados | lista<ref:stakeholder> | Sí | Paso 3; distintos niveles |
| preparacion | {fecha, duracion_min: entero, autorizacion_previa: bool} | Sí | 40–60 min |
| estructura | enum(no estructurada\|estructurada\|semiestructurada) | Sí | Semiestructurada = más usada |
| secuencia | enum(pirámide\|embudo\|reloj de arena\|diamante) | No | |
| preguntas | lista<{texto, tipo: enum(abierta\|cerrada\|exploratoria), orden}> | Sí | |
| registro | enum(notas\|grabación\|IA) + consentimiento_grabacion: bool + confidencialidad: bool | Sí | Siempre pedir autorización |
| acta | {hechos: texto largo, emociones_actitudes: texto largo, dudas, proximos_pasos} | No | Documentar de inmediato |
| requisitos_derivados | lista<ref:repositorio-requisitos> | No | Clasificados, priorizados, validados |

**Cálculos, reglas y validaciones.** Duración fuera de 40–60 min → aviso. Grabación sin consentimiento → bloqueo. La IA revisa preguntas sesgadas, ambiguas o muy generales (BA §4.2 errores a evitar).

**Salidas.** Guion, acta y requisitos. **Conexiones.** Entradas desde: `plan-elicitacion`, `triangulacion-evidencia` (instrumento). Alimenta a: `repositorio-requisitos`, `pauta-observacion-entrevista`.

**Preguntas guía IA**
1. ¿Qué quieres obtener de la entrevista?
2. ¿A quién entrevistarás y por qué es clave?
3. ¿Qué preguntas abiertas, cerradas y exploratorias harás?
4. ¿El entrevistado tiene opiniones formadas (embudo) o está poco involucrado (pirámide)?
5. ¿Cómo registrarás y cuentas con su autorización para grabar?
6. Tras la entrevista: ¿qué hechos, actitudes y dudas pendientes registraste?

**Origen.** BA §4.2, §5.5, §7 C-14; LA §2 S4 (entrevistas de retención).

---

#### `pauta-observacion-entrevista` — Pauta de observación de entrevista
*Categoría:* Análisis de negocio · *Prioridad:* P3 · *UI:* formulario + cálculo

**Propósito y disparadores.** Evaluar y entrenar la habilidad de entrevistar en tríos rotativos. Disparadores: "formar analistas", "mejorar nuestras entrevistas".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| observador / entrevistador / entrevistado | usuario o texto | Sí | 3 hojas, una por rol rotativo |
| criterios | lista(12)<{seccion: enum(Preparación y apertura\|Uso de preguntas\|Habilidades comunicacionales\|Registro y cierre), criterio, nota: escala(1–7), comentario_se_observo}> | Sí | 12 criterios fijos (BA §5.1) |
| comentario_entrevistador / comentario_entrevistado | texto largo | No | |

**Cálculos, reglas y validaciones.** `Nota final = Σ notas de los 12 criterios / 12` (BA §5.1, celda C22). Mientras falten notas, mostrar "incompleta" (no 0). Sin rúbrica por nivel en el material.

**Salidas.** Nota y retroalimentación. **Conexiones.** Entradas desde: `guion-entrevista`.

**Preguntas guía IA**
1. ¿Quién actuó como entrevistador, entrevistado y observador?
2. ¿Generó confianza y explicó objetivo, duración y estructura?
3. ¿Combinó preguntas abiertas y cerradas sin inducir respuestas?
4. ¿Escuchó activamente y usó lenguaje claro?
5. ¿Registró, manejó el tiempo y cerró formalmente?

**Origen.** BA §5.1, §6, §7 C-15.

---

#### `constructor-encuestas` — Constructor de encuestas (Likert, ISC, NPS)
*Categoría:* Análisis de negocio · *Prioridad:* P2 · *UI:* formulario + cálculo

**Propósito y disparadores.** Motor genérico para cuestionarios con plantillas precargadas. Disparadores: "llegar a muchas personas", "medir satisfacción del cliente", "encuesta de cierre de fase", "obtener la VOC".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| plan | {objetivos, grupos, tipo_cuestionario, tamaño_muestra: entero, metodo_distribucion, tasa_respuesta_objetivo: %, plazo, complementa_entrevistas: bool, prueba_usabilidad: bool} | Sí | 9 pasos de preparación (BA §4.2) |
| mensaje_informativo | {objetivos, uso_resultados, confidencialidad, anonimato: bool} | Sí | |
| preguntas | lista<{texto, tipo: enum(sí/no\|múltiple\|ranking\|Likert5\|Likert5+NC\|escala0-10\|escala1-5\|abierta), bloque, obligatoria}> | Sí | |
| plantilla | enum(libre\|cierre_fase_LA\|ISC\|NPS\|diagnostico_equipo\|pulso_clima\|diagnostico_bim) | No | |
| respuestas | lista<{respondente_anon_id, valores}> | — | |
| codificacion_abiertas | lista<{categoria, respuestas_ref}> | No | |

**Plantillas incluidas**
- `cierre_fase_LA`: Likert 5 puntos + "No corresponde" (pedir detalle si es negativa); 20 ítems en 3 bloques: Planificación (7), Ejecución (8), Resultado (5) (LA §6.10). Agenda de reunión: ¿qué salió bien?, ¿qué salió mal?, ¿qué se puede mejorar?; moderador distinto del gerente del proyecto.
- `ISC`: escala 1–5.
- `NPS`: escala 0–10.

**Cálculos, reglas y validaciones**
- `ISC = promedio` o `% satisfechos = respuestas 4 y 5 / total` (LA §7).
- `NPS = % promotores (9–10) − % detractores (0–6)`; pasivos 7–8 (LA §7).
- Likert: distribución por ítem; % favorable (complemento) = (Muy de acuerdo + De acuerdo) / respuestas válidas (excluye NC).
- Tasa de respuesta = respuestas / invitados; alerta si < objetivo.
- Anonimato: no mostrar resultados de grupos < 5 respondentes (complemento, resguardo de privacidad).
- La IA revisa sesgo y brevedad de preguntas (BA §4.2).

**Salidas.** Resultados agregados, índices, categorías de respuestas abiertas. **Conexiones.** Entradas desde: `plan-elicitacion`, `triangulacion-evidencia`. Alimenta a: `valor-beneficios` (NPS/ISC), `voc-ccr`, `leccion-aprendida`, `retrospectiva`, `diagnostico-equipo`, `pulso-clima`, `diagnostico-bim`.

**Preguntas guía IA**
1. ¿Qué quieres saber y qué decisión tomarás con los resultados?
2. ¿A quién encuestarás, cuántas respuestas necesitas y en qué plazo?
3. ¿Será anónima? ¿Cómo informarás el uso de los resultados?
4. ¿Usarás una plantilla (cierre de fase, NPS, ISC) o preguntas propias?
5. ¿Qué preguntas cerradas y abiertas incluirás?
6. ¿La complementarás con entrevistas?

**Origen.** BA §4.2, §7 C-16; LA §3.3, §6.10, §7, §8.1-8, §8.1-9; CE §6 A, H; SS §2 paso 2 (fuentes VOC).

---

#### `plan-observacion` — Plan de observación (job shadowing)
*Categoría:* Análisis de negocio · *Prioridad:* P3 · *UI:* formulario

**Propósito y disparadores.** Comprender actividades en su contexto real. Disparadores: "la gente no sabe explicar lo que hace", "validar cómo se trabaja realmente", "establecer métricas de rendimiento".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| objetivo | enum(entender actividad\|identificar mejoras\|establecer métricas\|validar supuestos) + texto | Sí | |
| modalidad | enum(pasiva\|activa) | Sí | |
| grupos | lista<ref:stakeholder> | Sí | |
| aviso | texto largo | Sí | Debe incluir que no mide desempeño personal y que se puede detener |
| forma_registro | enum(notas\|video\|audio) | Sí | |
| cronograma | lista<fecha> | Sí | |
| registros | lista<{tarea, proceso, tiempo_min: decimal, calidad, anomalia: texto, tipica: bool}> | No | |
| hallazgos | texto largo | No | Compartir con participantes |

**Cálculos, reglas y validaciones.** El aviso es obligatorio y se valida que contenga la frase de no evaluación del desempeño. Tiempos registrados pueden exportarse a `vsm`.

**Salidas.** Hallazgos y tiempos. **Conexiones.** Entradas desde: `plan-elicitacion`. Alimenta a: `vsm`, `bpmn`, `repositorio-requisitos`, `plan-medicion`.

**Preguntas guía IA**
1. ¿Qué quieres comprender o medir al observar?
2. ¿Observarás sin intervenir o preguntando?
3. ¿A quiénes observarás y cómo les explicarás el propósito?
4. ¿Cómo registrarás y cuándo?
5. ¿Qué formas típicas y atípicas, tiempos y anomalías viste?

**Origen.** BA §4.2, §5.5, §7 C-17.

---

#### `voc-ccr` — Traducción VOC → CCR → Y del proyecto
*Categoría:* Análisis de negocio · *Prioridad:* P2 · *UI:* tabla + formulario

**Propósito y disparadores.** Traducir afirmaciones reales del cliente (VOC) o del negocio (VOB) en un requisito crítico mensurable (CCR/CBR) y operacionalizarlo como la métrica primaria Y. (En la literatura se usa también "CTQ" como sinónimo — complemento.) Disparadores: "el cliente se queja pero no sabemos qué medir", "definir la métrica del proyecto de mejora", "reclamos, devoluciones, NPS bajo".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| fuentes_voc | lista<enum(NPS\|reclamos\|devoluciones\|encuesta\|entrevista\|objetivos internos)> | Sí | |
| traducciones | lista<{voz_cliente: texto (afirmación real), tema_clave, ccr: texto (específico y mensurable), es_interno_cbr: bool, prioridad: entero}> | Sí | |
| ccr_priorizado | ref traducción | Sí | Idealmente **uno** por proyecto |
| y_necesidad | texto | Sí | Elementos Y (SS §6.3) |
| y_caracteristica_salida | enum(exactitud\|oportunidad\|velocidad\|costo unitario\|calidad\|volumen\|otra) | Sí | |
| y_unidad_salida | texto | Sí | Lo que se mueve por el proceso (factura, entrega) |
| y_que_medir | texto + unidad | Sí | Unidad exacta |
| y_como_medir | texto largo | Sí | Inicio, fin, instrumento |
| lsl / usl | decimal | No | Si aplica |
| objetivo_y | decimal | Sí | Tendencia central buscada |
| definicion_defecto | texto | Sí | Según LSL/USL |
| oportunidades_por_unidad | entero | Sí | Para DPMO |
| tipo_dato | enum(continuo\|discreto_defectos\|discreto_defectuosos) | Sí | Para SPC y capacidad |

**Cálculos, reglas y validaciones**
- Alerta "otro proyecto dentro del proyecto" si se prioriza más de un CCR o una Y (SS §8.2).
- Checklist de un buen requisito: específico, mensurable con método, ligado a un atributo, no impone tecnología, completo, inequívoco, describe qué y no cómo.
- La Y debe ser tangible, mensurable, preferentemente continua y ligada a la unidad (ej. "días hasta que el cliente recibe la factura" mejor que "nº de reclamos por facturas atrasadas").
- La Y, LSL/USL, unidad y tipo de dato se propagan a `plan-medicion`, `capacidad-proceso`, `grafica-control`, `calculadora-sigma`, `plan-control`.

**Salidas.** CCR priorizado y ficha de la Y. **Conexiones.** Entradas desde: `constructor-encuestas`, `guion-entrevista`, `mapa-stakeholders`, `registro-problema`. Alimenta a: `ficha-proyecto`, `sipoc`, `plan-medicion`, `repositorio-requisitos` (requisito de stakeholder), `proyecto-dmaic`.

**Preguntas guía IA**
1. ¿Qué dice literalmente el cliente (frases reales, reclamos, comentarios)?
2. ¿Qué preocupación o expectativa hay detrás de cada frase?
3. ¿Cómo la expresarías como un requisito medible (p. ej. "plazo de entrega de 10 días ± 1")?
4. Si tuvieras que elegir un solo requisito para este proyecto, ¿cuál sería?
5. ¿Qué unidad recorre el proceso y qué medirás exactamente, desde dónde hasta dónde?
6. ¿Hay límites de especificación? ¿Qué se considera defecto?
7. ¿Cuántas formas distintas tiene una unidad de fallar?

**Origen.** SS §2 paso 2, §5, §6.2, §6.3, §8.2; BA §5.3 (requisitos de stakeholders).

---

#### `repositorio-requisitos` — Repositorio y ciclo de vida de requisitos
*Categoría:* Análisis de negocio · *Prioridad:* P2 · *UI:* tabla

**Propósito y disparadores.** Gestionar requisitos con taxonomía, trazabilidad y estados. Disparadores: "requisitos mal definidos" (50 % de fallas, BA §6), "cambios de alcance constantes", "no sabemos si lo construido responde al negocio".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| requisitos | lista<{id: texto, enunciado, tipo: enum(negocio\|stakeholder\|solución_funcional\|solución_no_funcional\|transición\|proyecto\|calidad), responsable_tipo: enum(BA\|PM), padre_ref (traza), fuente_ref, prioridad, estado: enum(elicitado\|clasificado\|priorizado\|verificado\|validado\|aprobado), criterio_aceptacion, supuestos: lista<Supuesto>}> | Sí | Proyecto y calidad = PM; producto = BA |
| cambios | lista<{requisito_ref, descripcion, fecha, aprobado_por, impacto}> | No | BABOK 5.4 |

**Cálculos, reglas y validaciones**
- Trazabilidad obligatoria: cada requisito de solución → requisito de stakeholder → requisito de negocio (alerta si queda huérfano).
- Checklist de verificación (detalle suficiente, coherencia, calidad) y de validación (aporta valor, alineado a metas) para pasar de estado.
- % requisitos aprobados; requisitos sin fuente.
- Exportación de requisitos funcionales a `product-backlog` como HU o PBI.

**Salidas.** Repositorio trazable, matriz de trazabilidad. **Conexiones.** Entradas desde: `plan-elicitacion`, `guion-entrevista`, `casos-uso`, `voc-ccr`, `analisis-brechas`. Alimenta a: `product-backlog`, `casos-uso`, `cronograma-gantt`.

**Preguntas guía IA**
1. ¿Qué meta de negocio justifica el cambio (requisito de negocio medible)?
2. ¿Qué necesita cada stakeholder?
3. ¿Qué debe hacer la solución (funcional) y con qué cualidades (no funcional)?
4. ¿Qué condiciones de transición (migración, capacitación) se requieren?
5. ¿De qué fuente proviene cada requisito y a qué requisito superior responde?
6. ¿Cómo se verificará y quién lo aprueba?

**Origen.** BA §2 clase 1, §5.3, §7 D-21 a D-25; SCRUM §6 (PBI).

---

#### `casos-uso` — Casos de uso (diagrama + ficha)
*Categoría:* Análisis de negocio · *Prioridad:* P2 · *UI:* lienzo-diagrama + formulario

**Propósito y disparadores.** Especificar requisitos funcionales como interacción actor-sistema (qué, no cómo). Disparadores: "describir cómo usarán el sistema", "un nuevo sistema o app".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| sistema | texto | Sí | Límite |
| actores | lista<{nombre, tipo: enum(persona\|sistema\|hardware)}> | Sí | |
| casos | lista<ficha> | Sí | |
| ficha.nombre | texto ("verbo + objetivo") | Sí | |
| ficha.id | texto (UC_###) | Sí | |
| ficha.descripcion, beneficio_organizacional, gatillo | texto largo | Sí | |
| ficha.actores | lista<ref actor> | Sí | |
| ficha.precondiciones / postcondiciones | lista<texto> | Sí | |
| ficha.flujo_normal | lista<paso numerado> | Sí | |
| ficha.flujos_alternativos | lista<{id: AF#, desde_paso, pasos}> | No | |
| ficha.flujos_excepcion | lista<{id: EX#, desde_paso, pasos}> | No | |
| relaciones | lista<{origen, destino, tipo: enum(asociación\|include\|extend)}> | Sí | |
| supuestos | lista<Supuesto> | Sí | Exigido en la actividad (BA §5.5) |

**Cálculos, reglas y validaciones.** Nombre con verbo inicial (aviso). Include = obligatorio (factorización); extend = condicional. Cada caso debe tener al menos un actor asociado. Generación de requisitos funcionales a partir del flujo normal.

**Salidas.** Diagrama y fichas. **Conexiones.** Entradas desde: `repositorio-requisitos`, `bpmn`. Alimenta a: `repositorio-requisitos`, `product-backlog`.

**Preguntas guía IA**
1. ¿Cuál es el sistema y quiénes interactúan con él?
2. ¿Qué metas quiere lograr cada actor (verbo + objeto)?
3. ¿Qué dispara cada caso y qué debe cumplirse antes?
4. ¿Cuál es el flujo normal paso a paso?
5. ¿Qué caminos alternativos o errores pueden ocurrir?
6. ¿Qué supuestos estás haciendo?

**Origen.** BA §4.3, §5.4, §7 E-28.

---

### 2.3 Gestión de proyectos (predictivo/ágil)

#### `ficha-proyecto` — Ficha de proyecto / Project Charter
*Categoría:* Gestión de proyectos · *Prioridad:* **P1** · *UI:* formulario

**Propósito y disparadores.** Acta que define la misión del proyecto: por qué, qué problema, objetivo, alcance, plan y equipo; no resuelve el problema ni es un informe de avance. Es la puerta de entrada de todo proyecto en la plataforma. Disparadores: "nuevo proyecto", "no está claro para qué existe el proyecto", "el sponsor no está comprometido", "cambió el encargo".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| tipo_proyecto | enum(predictivo\|ágil\|híbrido\|mejora continua\|DMAIC\|análisis de negocio\|BIM) | Sí | Sugerido por `cynefin` |
| impacto_negocio | {texto, categoria: enum(ganancias volumen/precio\|reducción costos\|reducción capital de trabajo\|otros), valor: moneda} | Sí | SS §2 paso 1 |
| alineacion_estrategica | ref:hoshin-kanri (objetivo) | No | |
| problema_oportunidad | texto largo / ref:registro-problema | Sí | Cuándo, qué (con métrica Y), dónde, extensión; sin causas ni soluciones |
| objetivo | texto | Sí | Verbo + métrica + meta + fecha (SMART) |
| y_proyecto | ref:voc-ccr | No | Obligatorio en tipo DMAIC |
| alcance_dentro / alcance_fuera | lista<texto> | Sí | |
| limite_inicio / limite_fin | texto | No | Pasos inicial y final del proceso |
| conceptos_clave | {cambio, necesidad, solucion, stakeholders, valor, contexto: texto largo} | No | 6 conceptos clave BA con preguntas orientadoras |
| criterios_exito | lista<Indicador> | Sí | "Comisión clara" (CE) |
| plan_hitos | lista<{hito, fecha}> | Sí | DMAIC: hitos D-M-A-I-C, ≤ 6 meses |
| equipo | lista<{usuario_o_stakeholder, rol: enum(sponsor\|líder/JP\|coach\|contralor financiero\|dueño del proceso\|PO\|SM\|BA\|miembro\|otro), dedicacion_%}> | Sí | |
| compromiso_sponsor | escala(1–5) + recursos_asegurados / faltantes: texto | No | CE comisión clara |
| supuestos / restricciones | lista<Supuesto> / lista<texto> | No | |
| fecha | fecha | Sí | |
| historial_versiones | lista<{version, fecha, motivo: enum(cierre de fase\|cambio de encargo\|otro)}> | — | Versión congelada por compuerta (SS) |

**Cálculos, reglas y validaciones**
- Verificación SMART del objetivo: comienza con verbo, contiene métrica, valor meta numérico y fecha (alerta por cada elemento faltante).
- La IA alerta si el problema contiene una causa ("por falta de…") o una solución ("implementar…").
- Alerta si hay > 1 métrica primaria en proyectos DMAIC; duración > 6 meses en DMAIC → aviso.
- Al registrar un cambio de alcance, sponsor o prioridades: sugerir el ciclo Detecta → Reconfigura (`canvas-equipo`) → Actualiza (`mapa-stakeholders`) (CE §8 M1).
- Nueva versión obligatoria en cada compuerta DMAIC y ante cambio de encargo.

**Salidas.** Charter aprobado (exportable a una página), base del panel del proyecto.

**Conexiones.** Entradas desde: `registro-problema`, `perfil-solucion`, `portafolio-proyectos`, `voc-ccr`, `cynefin`, `valor-beneficios`. Alimenta a: `mapa-stakeholders`, `matriz-raci`, `cronograma-gantt`, `canvas-equipo`, `registro-riesgos`, `proyecto-dmaic`, `vision-producto`, `carta-patrocinio`.

**Preguntas guía IA**
1. ¿Por qué hacer este proyecto ahora y qué beneficio aporta al negocio (idealmente cuantificado)?
2. ¿Qué "dolor" o problema existe: desde cuándo, dónde, con qué métrica y de qué magnitud? (Sin causas ni soluciones.)
3. ¿Qué quieres lograr, cuánto y para cuándo?
4. ¿Qué queda dentro y fuera del alcance?
5. ¿Cómo sabrás que el proyecto fue exitoso?
6. ¿Quién es el sponsor, qué tan comprometido está y qué recursos asegura?
7. ¿Quiénes integran el equipo, con qué rol y dedicación?
8. ¿Cuáles son los hitos principales?

**Origen.** SS §2 paso 1, §6.1, §8.2 (TG-D); BA §2 clase 1 (6 conceptos clave), §7 A-1; CE §4.1, §6 B (comisión clara); LA §6.12 (guion: situación, objetivo, alcance, etapas, entregables, plazo, recursos). Formato unificado de charter para todos los tipos: (complemento).

---

#### `mapa-stakeholders` — Mapa y registro de stakeholders
*Categoría:* Gestión de proyectos · *Prioridad:* **P1** · *UI:* tabla + lienzo-diagrama (matriz poder × interés)

**Propósito y disparadores.** Identificar a quienes afectan o son afectados por el proyecto, su interés, poder y posición, y gestionar expectativas, acuerdos y confianza. Disparadores: "resistencia al proyecto", "un área no colabora", "no sabemos a quién informar", "conflicto de intereses entre áreas", "fusión o cambio organizacional".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| stakeholders | lista<ficha> | Sí | |
| ficha.stakeholder | ref:stakeholder | Sí | Nombre o rol (anonimizable) |
| ficha.tipo | enum(sponsor\|cliente\|usuario\|proveedor\|soporte\|área interna\|regulador\|equipo\|otro) | Sí | Roles no centrales SCRUM §2 S2 |
| ficha.interes | escala(1–5) | Sí | |
| ficha.poder | escala(1–5) | Sí | |
| ficha.posicion_actual | enum(Bloqueador\|Crítico\|Seguidor\|Apoyador\|Defensor) | Sí | LA §6.2 |
| ficha.posicion_deseada | enum(misma escala) | No | (complemento) |
| ficha.expectativas | texto largo | No | CE conectar con el entorno |
| ficha.acuerdos | texto largo | No | |
| ficha.diferencias_cultura_objetivos | texto | No | |
| ficha.nivel_confianza | escala(1–5) | No | Escala (complemento) |
| ficha.actitud_cambio | enum(resistente\|neutral\|proclive) | No | BIM §6.6 |
| ficha.logica_percibida | enum(Oportunista\|Diplomático\|Experto\|Realizador\|Individualista) | No | IM §5.4; uso reflexivo y privado |
| ficha.estrategia_relacion / plan_comunicacion | texto largo | No | |

**Cálculos, reglas y validaciones**
- Cuadrante poder × interés (complemento, umbral 3): alto/alto = gestionar de cerca; alto poder/bajo interés = mantener satisfecho; bajo/alto = mantener informado; bajo/bajo = monitorear.
- Alerta: stakeholder con poder ≥ 4 y posición Bloqueador/Crítico sin estrategia de relación.
- Sugerencia de comunicación según lógica percibida: datos al Experto, resultados al Realizador, cuidado al Diplomático (IM §5.4). El campo `logica_percibida` es privado del autor por defecto.

**Salidas.** Registro y matriz de stakeholders, plan de relación/comunicación.

**Conexiones.** Entradas desde: `ficha-proyecto`, `ssm` (rich picture), `canvas-equipo`. Alimenta a: `matriz-raci`, `plan-elicitacion`, `gestion-cambio`, `valor-beneficios`, `voc-ccr`, `peb`.

**Preguntas guía IA**
1. ¿Quiénes pueden afectar el proyecto o se verán afectados por él (áreas, clientes, proveedores, reguladores)?
2. ¿Qué interés y qué poder tiene cada uno sobre el resultado?
3. ¿Qué posición tienen hoy: bloquean, critican, siguen, apoyan o defienden?
4. ¿Qué espera cada stakeholder crítico y qué acuerdos existen?
5. ¿Qué diferencias de objetivos o cultura hay entre áreas?
6. ¿Cómo y con qué frecuencia te comunicarás con cada uno?

**Origen.** LA §6.2, §7, §8.1-6; BA §2 clase 1 (stakeholder), §5.2; CE §4.1 (conectar con el entorno), §8 M5; IM §5.4, §9-6; BIM §5, §6.6; SCRUM §2 S2 (roles no centrales).

---

#### `matriz-raci` — Matriz RACI / quién-qué-cuándo
*Categoría:* Gestión de proyectos · *Prioridad:* **P1** · *UI:* tabla

**Propósito y disparadores.** Asignar responsabilidades por actividad o entregable y "quién decide qué". Disparadores: "no está claro quién decide qué", "tareas que nadie hace o que hacen dos", "superposición BA/PM", "entregables de información BIM sin responsable".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| modo | enum(RACI\|quién-qué-cuándo) | Sí | quién-qué-cuándo = matriz de información BIM |
| roles | lista<{rol, persona: usuario o ref:stakeholder}> | Sí | |
| filas | lista<{actividad_o_entregable, asignaciones: mapa<rol, enum(R\|A\|C\|I\|—)>, fecha_entrega (modo q-q-c), disciplina (BIM)}> | Sí | |
| plantilla | enum(business case BA\|reparto BA/PM\|roles Scrum\|roles DMAIC\|roles BIM\|libre) | No | |
| reglas_decision | texto largo | No | CE clarificar: "quién decide qué" |

**Cálculos, reglas y validaciones**
- Exactamente **una A** por fila; al menos una R (error si no).
- Alerta: rol con demasiadas R (sobrecarga; umbral configurable, complemento); fila sin C ni I en actividades de impacto.
- Plantilla BA precargada: Identificar problema (Sponsor A, Gte. producto C, BA R); Evaluar estado actual (A, I, R); Recomendar solución (I, A, R, PM C); Preparar business case (I, A, R, PM I).
- Modo quién-qué-cuándo: genera hitos en `cronograma-gantt`.

**Salidas.** Matriz de responsabilidades. **Conexiones.** Entradas desde: `ficha-proyecto`, `mapa-stakeholders`, `canvas-equipo`, `peb`. Alimenta a: `cronograma-gantt`, `canvas-equipo`, `perfil-solucion`.

**Preguntas guía IA**
1. ¿Cuáles son las actividades o entregables principales?
2. ¿Qué roles participan?
3. Para cada actividad, ¿quién la ejecuta (R) y quién responde en última instancia (A)?
4. ¿A quién hay que consultar (C) y a quién informar (I)?
5. ¿Qué decisiones toma el equipo y cuáles se escalan?
6. (BIM) ¿Qué información se entrega, quién la produce y cuándo?

**Origen.** BA §5.2, §7 A-3; CE §4.1 (clarificar), §6 B; BIM §8.1-5; SCRUM §8.1-11; SS §2 (roles DMAIC).

---

#### `registro-riesgos` — Registro de riesgos e impedimentos
*Categoría:* Gestión de proyectos · *Prioridad:* P2 · *UI:* tabla + cálculo

**Propósito y disparadores.** Registrar riesgos de proyecto (PM) y de negocio (BA), e impedimentos ágiles. Disparadores: "¿qué puede salir mal?", "incertidumbre alta", "impedimentos que no se resuelven", "causas confirmadas que siguen latentes".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| items | lista<{tipo: enum(riesgo_proyecto\|riesgo_negocio\|impedimento), descripcion, causa, efecto_objetivo: enum(alcance\|costo\|tiempo\|calidad\|valor\|otro), signo: enum(amenaza\|oportunidad), probabilidad: escala(1–5), impacto: escala(1–5), respuesta, responsable: usuario, estado: enum(abierto\|en tratamiento\|cerrado), origen_ref}> | Sí | Riesgo PMI: positivo o negativo |

**Cálculos, reglas y validaciones**
- `Exposición = probabilidad × impacto` (1–25) y mapa de calor 5×5 (complemento).
- Impedimentos: tiempo abierto = hoy − fecha de alta; alerta si supera el sprint (SCRUM §8.1-9).
- Riesgos de un proceso a nivel de modo de falla → derivar a `fmea`.

**Salidas.** Registro priorizado y mapa de calor. **Conexiones.** Entradas desde: `pestle`, `foda`, `analisis-brechas`, `ishikawa` (causas confirmadas, BIM §8.1-3), `sprint-scrum` (daily), `cynefin` (riesgo de mala lectura). Alimenta a: `fmea`, `metricas-agiles`, `ficha-proyecto`.

**Preguntas guía IA**
1. ¿Qué eventos inciertos podrían afectar los objetivos, positiva o negativamente?
2. ¿Es un riesgo del proyecto (plazo, costo, alcance) o del negocio (valor de la solución)?
3. ¿Qué probabilidad e impacto tiene?
4. ¿Qué respuesta propones y quién la lidera?
5. ¿Qué impedimentos tiene hoy el equipo?

**Origen.** BA §2 clase 1 (riesgo PMI y BA), §7 A-2; SCRUM §7, §8.1-9; BIM §8.1-3; SS §2 (FMEA como gestión de riesgo). Escalas y exposición: (complemento).

---

#### `cronograma-gantt` — Cronograma / Gantt de despliegue
*Categoría:* Gestión de proyectos · *Prioridad:* P2 · *UI:* tablero (Gantt)

**Propósito y disparadores.** Planificar actividades, hitos, responsables y estado en el tiempo (enfoque predictivo e iniciativas tácticas). Disparadores: "planificar el proyecto", "¿cuándo terminamos?", "atrasos".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| actividades | lista<{goal_ref, iniciativa, champion: usuario, actividad, responsable: usuario, tipo_actividad: enum(Kaizen\|experto Lean\|DMAIC\|tarea\|entregable BIM\|otro), kpi_impactado, presupuesto: moneda, capacitacion_necesaria, inicio, fin, semanas, estado: enum(0\|25\|50\|75\|100), dependencia: lista<ref>, comentario}> | Sí | Plan maestro LEAN pág 39 |
| hitos | lista<{nombre, fecha, tipo: enum(hito\|cierre\|compuerta)}> | Sí | |
| linea_base | snapshot | No | |
| wbs | árbol de entregables | No | WBS solo se menciona en el material (complemento) |
| firmas | lista<{funcion, usuario, fecha}> | No | |

**Cálculos, reglas y validaciones.** Avance ponderado = Σ (estado × duración) / Σ duración (complemento). Desvío vs. línea base en días. Alerta: actividad sin responsable o fuera del rango del proyecto. Ruta crítica: (complemento).

**Salidas.** Gantt, hitos, avance. **Conexiones.** Entradas desde: `ficha-proyecto`, `a3-estrategico`, `matriz-raci` (quién-qué-cuándo), `plan-piloto`, `peb`. Alimenta a: `portafolio-proyectos`, `tablero-kanban`.

**Preguntas guía IA**
1. ¿Cuáles son los entregables principales y sus actividades?
2. ¿Quién es responsable de cada actividad y qué duración estimas?
3. ¿Qué dependencias existen?
4. ¿Qué hitos o compuertas no se pueden mover?
5. ¿Qué presupuesto y capacitación requiere cada iniciativa?

**Origen.** LEAN §2.6 paso 4, §6.6; BIM §8.1-5; SS §6.9 (cronograma del piloto); LA §4 (WBS, Gantt mencionados).

---

#### `vision-producto` — Visión de producto (canvas, elevator pitch, objetivo)
*Categoría:* Gestión de proyectos · *Prioridad:* P2 · *UI:* formulario

**Propósito y disparadores.** Estructurar la visión del producto antes del backlog. Disparadores: "nuevo producto o servicio", "el equipo no comparte una visión", "iniciar un proyecto ágil".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| foda_ref | ref:foda | No | |
| canvas | {codename, frase_representativa, vision, grupos_usuarios, necesidades, producto, valor: texto} | Sí | SCRUM §6 |
| elevator_pitch | {para, quien, nombre, categoria, que_beneficios, a_diferencia_de, nuestro_producto} | Sí | |
| objetivos_producto | lista<{descripcion_estado_futuro, estado: enum(activo\|cumplido\|abandonado), producto_limite, interesados, usuarios}> | Sí | |

**Cálculos, reglas y validaciones.** Solo un Objetivo del Producto **activo** a la vez (Guía Scrum). Pitch generado como frase a partir de los campos.

**Salidas.** Canvas, enunciado de visión, objetivo del producto. **Conexiones.** Entradas desde: `foda`, `cynefin`, `ficha-proyecto`. Alimenta a: `product-backlog`, `roadmap-lanzamiento`.

**Preguntas guía IA**
1. ¿Qué nombre clave y frase representan al producto?
2. ¿Qué grupos de usuarios tiene y qué necesidades resuelve?
3. ¿Qué valor entrega y a diferencia de qué competencia?
4. ¿Cuál es el estado futuro del producto que persigues ahora (objetivo del producto)?
5. ¿Qué lo diferencia?

**Origen.** SCRUM §2 S2, §3.1, §6, §8.1-2.

---

#### `product-backlog` — Product Backlog e historias de usuario
*Categoría:* Gestión de proyectos · *Prioridad:* **P1** · *UI:* tabla (vista lista + vista iceberg)

**Propósito y disparadores.** Lista ordenada y única fuente de trabajo del producto, con épicas, historias de usuario y criterios de aceptación. Disparadores: "muchas tareas y prioridades cambiantes", "requisitos poco claros que evolucionan", "proyecto ágil o híbrido", "lista de acciones de mejora".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| objetivo_producto_ref | ref:vision-producto | No | |
| items | lista<PBI> | Sí | |
| PBI.id | texto | Sí | |
| PBI.tipo | enum(historia de usuario\|caso de uso\|narrativa\|defecto\|trabajo técnico\|adquisición de conocimiento\|acción de mejora) | Sí | |
| PBI.epica_padre | ref PBI | No | |
| PBI.como / quiero / para | texto | Sí si HU | "Como <rol>, quiero <funcionalidad>, para <beneficio>" |
| PBI.criterios_aceptacion | lista<{criterio, resultado: enum(pendiente\|aprobado\|no aprobado)}> | Sí si HU | Incluye RNF, reglas de negocio, flujos alternos |
| PBI.valor / riesgo | escala(1–5) | No | Priorización basada en valor, riesgo y dependencias |
| PBI.dependencias | lista<ref PBI> | No | |
| PBI.categoria_priorizacion | enum(Must\|Should\|Could\|Won't) o Kano | No | Desde `matriz-priorizacion` |
| PBI.orden | entero | Sí | Lo define el PO |
| PBI.estimacion | {valor, unidad: enum(puntos\|talla\|horas ideales)} | No | Desde `estimacion-agil` |
| PBI.ready | bool | No | |
| PBI.release / sprint | ref | No | |
| PBI.origen_ref | ref:* | No | Requisito, retro, A3, FMEA |
| historial | snapshots | — | Backlog inicial vs. final (SCRUM §2 S4) |

**Cálculos, reglas y validaciones**
- Orden único (sin empates); solo el PO reordena.
- HU sin criterios de aceptación no puede marcarse "Ready".
- Alerta: épica en sprint (debe desglosarse); ítem con estimación > velocidad del equipo.
- Puntos totales del backlog → `roadmap-lanzamiento`.

**Salidas.** Backlog ordenado y comparativo inicial/final. **Conexiones.** Entradas desde: `vision-producto`, `repositorio-requisitos`, `casos-uso`, `retrospectiva`, `matriz-priorizacion`, `estimacion-agil`. Alimenta a: `sprint-scrum`, `tablero-kanban`, `roadmap-lanzamiento`, `metricas-agiles`.

**Preguntas guía IA**
1. ¿Qué necesita cada tipo de usuario? Exprésalo como "Como…, quiero…, para…".
2. ¿Qué historias son demasiado grandes y deberían ser épicas?
3. ¿Cómo sabrás que cada historia está terminada (criterios de aceptación)?
4. ¿Qué valor, riesgo y dependencias tiene cada ítem?
5. ¿Qué es imprescindible (Must) y qué puede esperar?
6. ¿Hay defectos, trabajo técnico o investigación que deban entrar al backlog?

**Origen.** SCRUM §2 S2, §3.1, §6, §8.1-3; BA §4.3 (historias de usuario mencionadas).

---

#### `estimacion-agil` — Estimación ágil (Planning Poker, tallas)
*Categoría:* Gestión de proyectos · *Prioridad:* P2 · *UI:* formulario + cálculo

**Propósito y disparadores.** Estimar de forma relativa por consenso ("el resultado es el debate, no el número"). Disparadores: "no sabemos cuánto cuesta cada historia", "estimaciones muy dispares".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| metodo | enum(planning poker\|tallas\|horas ideales) | Sí | |
| escala | lista<número> | Sí | Fibonacci por defecto (valores de cartas: complemento) |
| equivalencia_tallas | {XS: 1, S: 2–3, M: 5–8, L: 13–20} | No | Configurable |
| sesiones | lista<{pbi_ref, rondas: lista<{votos: mapa<usuario, valor>, argumento_min, argumento_max}>, resultado, cerrado_por_SM: bool}> | Sí | |

**Cálculos, reglas y validaciones.** Revelación simultánea de votos. Si min ≠ max, piden argumento quienes votaron extremo. Tras ≥ 3 rondas sin consenso, el SM puede cerrar. Horas ideales: premisas de solo el ejecutor, recursos disponibles, sin interrupciones.

**Salidas.** Estimación por PBI. **Conexiones.** Entradas desde: `product-backlog`. Alimenta a: `product-backlog`, `roadmap-lanzamiento`, `sprint-scrum`.

**Preguntas guía IA**
1. ¿Qué historia estiman y cuáles son sus criterios de aceptación?
2. ¿Qué dudas tiene el equipo antes de votar?
3. ¿Por qué la estimación más baja y la más alta difieren?
4. ¿Hay una historia de referencia para comparar?
5. ¿Conviene desglosarla?

**Origen.** SCRUM §2 S3, §5, §7, §8.1-4.

---

#### `roadmap-lanzamiento` — Roadmap y plan de lanzamiento
*Categoría:* Gestión de proyectos · *Prioridad:* P2 · *UI:* tablero + cálculo

**Propósito y disparadores.** Distribuir épicas/HU en sprints y releases según velocidad, prioridad y dependencias. Disparadores: "¿cuándo estará listo?", "planificar entregas".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| esfuerzo_total | decimal (puntos) | Sí | Paso 1 (desde backlog) |
| duracion_sprint_semanas | entero | Sí | Paso 2 |
| velocidad | decimal | Sí | Paso 3 (estimada o histórica) |
| releases | lista<{nombre, sprints: lista<{n, pbis: lista<ref>, puntos}>, fecha_objetivo}> | Sí | Pasos 4–6 |
| restricciones | texto | No | |

**Cálculos, reglas y validaciones**
- `Sprints necesarios ≈ ⌈ puntos restantes / velocidad promedio ⌉` (complemento; SCRUM §7).
- Alerta: sprint con puntos > velocidad; dependencia planificada después del dependiente.
- Recálculo automático al cambiar velocidad o backlog.

**Salidas.** Roadmap releases × sprints. **Conexiones.** Entradas desde: `product-backlog`, `estimacion-agil`, `metricas-agiles`, `vision-producto`. Alimenta a: `sprint-scrum`.

**Preguntas guía IA**
1. ¿Cuál es el esfuerzo total estimado y qué restricciones de fecha o presupuesto hay?
2. ¿De cuántas semanas serán los sprints?
3. ¿Cuál es la velocidad esperada del equipo?
4. ¿Qué épicas van primero según prioridad y dependencias?
5. ¿Cuántos releases y qué contiene cada uno?

**Origen.** SCRUM §2 S3, §6, §8.1-5.

---

#### `sprint-scrum` — Sprint (planning, backlog, daily, review, DoD)
*Categoría:* Gestión de proyectos · *Prioridad:* P2 · *UI:* tablero

**Propósito y disparadores.** Gestionar un sprint con su objetivo, backlog, eventos con time-box y Definición de Terminado. Disparadores: "iniciar ciclo de trabajo iterativo", "el equipo pierde foco", "entregas sin calidad homogénea".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| numero, inicio, fin | entero, fecha | Sí | |
| regla_timebox | enum(Guía 2020\|curso) | Sí | Discrepancias en SCRUM §4 |
| sprint_goal | texto | Sí | Obligatorio antes de cerrar la planning |
| pbis_seleccionados | lista<ref:product-backlog> | Sí | "Qué" |
| tareas | lista<{pbi_ref, tarea, responsable, horas_ideales ≤ 8, estado}> | Sí | "Cómo"; tareas ≤ 1 día |
| capacidad_comprometida | decimal (puntos) | Sí | |
| dailies | lista<{fecha, progreso_goal, plan, impedimentos: lista<ref:registro-riesgos>, asistencia_%}> | No | |
| review | {fecha, incremento, interesados, ajustes_backlog, velocidad_real} | No | |
| retro_ref | ref:retrospectiva | No | |
| definicion_terminado | lista<{criterio, origen: enum(organizacional\|equipo)}> | Sí | Versionada |
| cambios_alcance | lista<{descripcion, negociado_con_PO: bool}> | No | |
| cancelado_por | usuario (PO) | No | Solo el PO cancela |

**Cálculos, reglas y validaciones**
- Time-box según regla: Guía (sprint ≤ 1 mes; planning ≤ 8 h, review ≤ 4 h, retro ≤ 3 h para 1 mes; daily 15 min) o curso (planning 2 h/sem, review 1 h/sem, retro 1 h/sem; sprint 1–4 sem).
- Un PBI pasa a "Realizado/Incremento" solo si cumple todos los criterios de DoD; si no, vuelve al backlog.
- Alerta: daily > 15 min; sprint sin goal; cambio de alcance que compromete el goal.

**Salidas.** Incremento, datos para burndown y velocidad. **Conexiones.** Entradas desde: `product-backlog`, `estimacion-agil`, `roadmap-lanzamiento`. Alimenta a: `tablero-kanban`, `metricas-agiles`, `retrospectiva`, `registro-riesgos`.

**Preguntas guía IA**
1. ¿Por qué es valioso este sprint? Formula el objetivo del sprint.
2. ¿Qué ítems del backlog caben según la velocidad del equipo?
3. ¿Cómo se hará cada ítem (tareas de un día o menos)?
4. ¿Qué criterios de calidad aplican a todo incremento (DoD)?
5. En la daily: ¿cómo avanzamos hacia el objetivo y qué impedimentos hay?
6. En la review: ¿qué se mostró a los interesados y qué cambia en el backlog?

**Origen.** SCRUM §2 S3, §3.1, §4, §6, §8.1-6, §8.1-7.

---

#### `tablero-kanban` — Tablero Kanban / Scrumboard
*Categoría:* Gestión de proyectos · *Prioridad:* **P1** · *UI:* tablero

**Propósito y disparadores.** Visualizar el flujo de trabajo, con autoasignación (pull) y límites WIP. Sirve a cualquier proyecto (sprint, iniciativas Hoshin, incidencias BIM, acciones de mejora). Disparadores: "no vemos en qué está cada tarea", "demasiado trabajo en curso", "cuellos de botella".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| columnas | lista<{nombre, limite_wip: entero?}> | Sí | Por defecto: Por hacer · En proceso · En pruebas · Realizado |
| carriles | enum(por HU\|por responsable\|por tipo\|ninguno) | No | Scrumboard: filas por HU |
| tarjetas | lista<{titulo, origen_ref: ref:*, responsable, columna, bloqueada: bool, motivo_bloqueo, fecha_ingreso_columna}> | Sí | Puede referenciar Acción, PBI, incidencia, iniciativa |

**Cálculos, reglas y validaciones**
- Bloquear el ingreso si la columna supera su límite WIP (o avisar, configurable).
- Lead time y cycle time por tarjeta (fechas de transición) → `metricas-agiles`; WIP actual por columna (Ley de Little: PLT = WIP / tasa de salida, LEAN §7).
- Tiempo bloqueado acumulado.

**Salidas.** Tablero vivo, datos de flujo (CFD). **Conexiones.** Entradas desde: `sprint-scrum`, `product-backlog`, `cronograma-gantt`, `coordinacion-bim`, `a3-mejora`, `fmea` (acciones). Alimenta a: `metricas-agiles`.

**Preguntas guía IA**
1. ¿Qué etapas recorre una tarea desde que se pide hasta que se termina?
2. ¿Cuánto trabajo en curso es razonable por etapa?
3. ¿Qué tareas están hoy bloqueadas y por qué?
4. ¿Quién toma cada tarea?
5. ¿Quieres carriles por historia, persona o tipo de trabajo?

**Origen.** SCRUM §2 S2 (Scrumboard), §3.2 (límites WIP), §8.1-6; LEAN §3.3 (kanban), §7 (Ley de Little); BIM §8.1-11.

---

#### `metricas-agiles` — Dashboard de métricas ágiles
*Categoría:* Gestión de proyectos · *Prioridad:* P2 · *UI:* tablero + cálculo

**Propósito y disparadores.** Medir progreso, flujo, calidad, valor y mejora con datos de los eventos. Disparadores: "¿vamos a llegar?", "velocidad errática", "medir valor y no solo velocidad".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| sprints | lista<{n, comprometidos: puntos, terminados: puntos, dias, restante_diario: lista<decimal>}> | Sí | Desde `sprint-scrum` |
| flujo | lista<{item, fecha_solicitud, fecha_inicio, fecha_entrega, bloqueado_h}> | No | Desde `tablero-kanban` |
| calidad | {errores_internos, incidencias_cliente, hu_rechazadas, hu_desarrolladas} | No | |
| valor | {valor_entregado_por_release, nps, satisfaccion} | No | |
| finanzas | {presupuesto, utilizado, roi} | No | |
| mejora | {impedimentos_abiertos, acciones_retro_implementadas, asistencia_daily_%} | No | |

**Cálculos, reglas y validaciones** (fórmulas derivadas: complemento, SCRUM §7)
- `Velocidad promedio = Σ puntos terminados últimos n sprints / n` (ejemplo de test: 80, 70, 95, 105, 130, 110, 120 → promedio 101,4).
- `Predictibilidad = terminados / comprometidos`.
- `Burndown ideal(d) = comprometidos × (1 − d / días)`.
- `Lead time = entrega − solicitud`; `cycle time = entrega − inicio`; throughput = ítems terminados / periodo.
- `Tasa de rechazo = HU rechazadas / HU desarrolladas`.
- Desviación financiera = utilizado − planificado.
- Alertas (SCRUM §2 S4): velocidad muy variable (coef. de variación > 25 %, umbral complemento); burndown plano hasta el último día; retro sin acciones; daily omitida.
- Estructura DIKW: dato → información → conocimiento → decisión (reestimación).

**Salidas.** Dashboard por sprint/release. **Conexiones.** Entradas desde: `sprint-scrum`, `tablero-kanban`, `product-backlog`, `constructor-encuestas`, `registro-riesgos`, `retrospectiva`. Alimenta a: `roadmap-lanzamiento`, `diagnostico-antipatrones`, `hoshin-scorecard`, `valor-beneficios`.

**Preguntas guía IA**
1. ¿Qué decisiones quieres tomar con las métricas (pronóstico, calidad, valor)?
2. ¿Cuántos puntos comprometió y terminó el equipo en los últimos sprints?
3. ¿Registras fechas de solicitud, inicio y entrega para medir flujo?
4. ¿Cómo mides el valor entregado y la satisfacción?
5. ¿Qué señales de alerta te preocupan?

**Origen.** SCRUM §2 S3 (indicadores, DIKW), §3.3, §7, §8.1-9.

---

#### `diagnostico-antipatrones` — Diagnóstico de antipatrones Scrum
*Categoría:* Gestión de proyectos · *Prioridad:* P3 · *UI:* formulario

**Propósito y disparadores.** Detectar antipatrones y decidir la intervención del Scrum Master. Disparadores: "hacemos Scrum pero…", "las retros no sirven", "la daily es un reporte".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| señales | lista<{señal: enum(velocity muy variable\|burndown no baja\|evitan ceremonias\|retros sin participación\|incrementos no demostrados), presente: bool, evidencia}> | Sí | Pre-llenado desde `metricas-agiles` |
| preguntas_diagnostico | lista(4)<{pregunta, respuesta: enum(sí\|no\|parcial)}> | Sí | SCRUM §2 S4 |
| antipatron | enum(Scrum-But\|mini-cascada\|daily como status\|PO ausente o proxy\|retros ritualizadas) | Sí | |
| intervencion | texto largo | Sí | Solución sugerida del material |

**Cálculos, reglas y validaciones.** Mapeo señal → antipatrón probable (p. ej. burndown plano → mini-cascada). El SM interviene ante valores violados, proceso que impide valor o conflicto no resuelto; nunca decide lo técnico o de producto por el equipo.

**Salidas.** Antipatrón y acción. **Conexiones.** Entradas desde: `metricas-agiles`, `retrospectiva`. Alimenta a: `retrospectiva`, Acción.

**Preguntas guía IA**
1. ¿El equipo sabe explicar por qué hace cada ceremonia?
2. ¿Las decisiones del PO se implementan sin escalaciones?
3. ¿Los impedimentos se resuelven rápido?
4. ¿El equipo se auto-organiza o espera instrucciones?
5. ¿Qué síntomas concretos observas?

**Origen.** SCRUM §2 S4, §5, §8.1-10.

---

### 2.4 Mejora continua y procesos

#### `proyecto-dmaic` — Proyecto DMAIC (15 pasos y compuertas)
*Categoría:* Mejora continua y procesos · *Prioridad:* P2 · *UI:* tablero

**Propósito y disparadores.** Contenedor que guía un proyecto Six Sigma por 5 fases y 15 pasos, con entregables obligatorios y compuertas (tollgates) aprobadas por roles. Disparadores: "problema crónico de calidad o variación", "muchos defectos o reclamos", "necesitamos datos para decidir", "proceso impredecible".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| charter_ref | ref:ficha-proyecto (tipo DMAIC) | Sí | Se versiona en cada compuerta |
| pasos | lista(15)<{fase: enum(D\|M\|A\|I\|C), n: 1–15, nombre, estado: enum(no iniciado\|en curso\|completo\|aprobado), entregables: lista<ref:*>}> | Sí | D: 1 charter, 2 VOC, 3 SIPOC · M: 4 mapa de valor, 5 datos, 6 desempeño · A: 7 acotar Xs, 8 validar Xs, 9 cuantificar oportunidad · I: 10 soluciones, 11 optimizar, 12 piloto · C: 13 implementación, 14 monitoreo y transición, 15 validar beneficios y cerrar |
| roles | {lider (GB/BB), coach (MBB), champion, dueño_proceso, contralor, miembros (YB)} | Sí | Permisos SS §8.1 |
| compuertas | lista(5)<{id: TG-D\|TG-M\|TG-A\|TG-I\|TG-C, checklist: lista<{criterio, cumplido: bool, evidencia_ref}>, aprobadores: lista<usuario>, decision: enum(aprobada\|rechazada\|continuar\|modificar alcance\|detener), fecha}> | Sí | |
| xs | lista<{x, tipo: enum(potencial\|validada\|descartada), evidencia_ref}> | No | |

**Cálculos, reglas y validaciones**
- No se aprueba una compuerta con entregables obligatorios incompletos. Checklists de compuerta: ver §3, flujo F3.
- Alertas metodológicas (SS §8.2): > 1 CCR o Y; problema con causa o solución; objetivo sin fecha; recolección de datos > 15 min/día para el recolector; n insuficiente para el δ/σ esperado.
- El dueño del proceso debe incorporarse a más tardar en Analizar (curva de traspaso Belts → dueño).
- Avance por fase = pasos aprobados / pasos de la fase.

**Salidas.** Panel DMAIC (línea base vs. actual de la Y, σ, DPMO, Cpk, RTY, beneficio estimado vs. validado, RPN máximo abierto).

**Conexiones.** Entradas desde: `ficha-proyecto`, `registro-problema`, `portafolio-proyectos`. Orquesta: `voc-ccr`, `sipoc`, `vsm`, `plan-medicion`, `msa-gage-rr`, `grafica-control`, `capacidad-proceso`, `calculadora-sigma`, `ishikawa`, `pareto`, `analisis-estadistico`, `lluvia-ideas`, `matriz-priorizacion`, `matriz-pugh`, `plan-piloto`, `fmea`, `plan-control`, `valor-beneficios`, `leccion-aprendida`.

**Preguntas guía IA**
1. ¿El problema es crónico, medible y de causa desconocida? (Si la solución ya es conocida, quizá no requiere DMAIC.)
2. ¿Quién es el champion, el dueño del proceso y el contralor financiero?
3. ¿Cuál es la métrica Y y su línea base?
4. ¿Qué datos existen y quién los puede recolectar sin exceder 15 min al día?
5. ¿Cuándo planeas cada compuerta (máximo 6 meses en total)?

**Origen.** SS §2 (págs 67–76), §8.1, §8.2. Las compuertas y umbrales son orientativos; su adopción formal requiere la aprobación del gobierno de proyectos de la organización (SS §8.2).

---

#### `vsm` — Mapa de cadena de valor (VSM)
*Categoría:* Mejora continua y procesos · *Prioridad:* **P1** · *UI:* lienzo-diagrama + cálculo

**Propósito y disparadores.** Visualizar cómo fluye el valor hasta el cliente (material e información), con esperas, datos por paso y línea de tiempo VA vs. demoras, para encontrar desperdicios, trampas de tiempo y restricciones. Disparadores: "el proceso es lento", "clientes esperan demasiado", "mucho trabajo en curso", "no cumplimos la demanda", "retrabajos", "trámites que dan vueltas".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| flujo_seleccionado | texto + ref mapa nivel 0 | Sí | Mapa nivel 0: estratégicos/comerciales/control · cadena de valor · soporte |
| version | enum(actual\|futuro) + vista SS: enum(lo que se piensa\|lo que es\|lo que debería ser) | Sí | Estado futuro: (complemento) |
| cliente_demanda | {cliente, demanda: decimal, unidad, tiempo_disponible: decimal, unidad_tiempo} | Sí | |
| pasos | lista<{nombre, tipo_nodo: enum(proceso\|decisión\|cliente/proveedor\|operador\|transporte), pt: decimal (tiempo de procesamiento), ct: decimal, lote: entero, calidad_%: %, reproceso_%: %, frecuencia, operadores: entero, clasificacion: enum(VA\|BNVA\|NVA), desperdicio: enum(transporte\|inventario\|movimiento\|espera\|sobreproducción\|sobreprocesamiento\|defectos\|talento no utilizado)?, responsable_color}> | Sí | Lista de 8 desperdicios: (complemento) |
| esperas | lista<{entre_pasos, wip: decimal, dt: decimal (tiempo de demora)}> | Sí | Triángulo "E" |
| flujos | lista<{origen, destino, tipo: enum(genérico\|push\|pull\|material al cliente\|información manual\|información electrónica)}> | Sí | Simbología LEAN §3.3 (+ supermercado, kanban de producción/retiro) |
| tasa_salida | decimal | No | Para Ley de Little |
| ideas_mejora | lista<texto> | No | Lluvia de ideas final |

**Cálculos, reglas y validaciones**
- `VA = Σ CT de pasos VA`; totales de BNVA, NVA y esperas; `tiempo de contacto` = Σ tiempo de personas por pedido (LEAN §7).
- `PLT = Σ (PT + DT)` o, por **Ley de Little**, `PLT = WIP / tasa de salida` (test: 100 unid / 20 unid/día = 5 días; 5 pers / 1 pers/min = 5 min; 13 → 13 min).
- `PCE = VA / PLT`; referencia: la mayoría de los procesos < 10 % (mostrar banda).
- `Takt = tiempo disponible / demanda` (complemento; test: 240 min / 50 = 4,8 min; 240 / 75 = 3,2 min).
- Trampa de tiempo = paso con mayor demora (solo una a la vez); **restricción** = paso cuyo CT > takt (resaltado). Capacidad ≈ tiempo disponible / CT del paso restrictivo (complemento); ajuste por reproceso.
- Simulador "qué pasa si" (demanda 50 → 75 → 100; WIP) sobre PLT.
- Comparación actual vs. futuro: deltas de PLT, PCE, VA (complemento).

**Salidas.** Mapa actual (y futuro), métricas (takt, PLT, PCE), lista de desperdicios y de mejoras.

**Conexiones.** Entradas desde: `sipoc`, `plan-observacion`, `bpmn`, `hoshin-kanri` (iniciativa sobre un proceso). Alimenta a: `a3-mejora` (bloque 2), `ishikawa` (modo flujo del proceso), `pareto` (tiempos de espera), `lluvia-ideas`, `fmea` (pasos), `analisis-brechas`, `plan-control`.

**Preguntas guía IA**
1. ¿Qué proceso o flujo quieres mapear, desde dónde hasta dónde, y quién es el cliente?
2. ¿Cuál es la demanda del cliente y cuánto tiempo disponible hay por periodo?
3. ¿Cuáles son los pasos, en orden, y quién los ejecuta?
4. Para cada paso: ¿cuánto tarda, en qué lotes, con qué tasa de reproceso y cuántas personas?
5. ¿Dónde se acumula trabajo o espera, cuánto y por cuánto tiempo?
6. ¿Qué pasos agregan valor para el cliente, cuáles son necesarios sin agregar valor y cuáles son desperdicio?
7. ¿Qué cambiarías para atender la demanda objetivo?

**Origen.** LEAN §2 S3, §5.2, §5.3, §6.6, §7, §8.2; SS §2 paso 4, §5 (mapa detallado), §2 (enfoque de 6 pasos: VSM actual → Pareto de esperas → VSM futuro).

---

#### `sipoc` — SIPOC / PEPSU
*Categoría:* Mejora continua y procesos · *Prioridad:* P2 · *UI:* tabla

**Propósito y disparadores.** Mapa de alto nivel del proceso actual que delimita el alcance y relaciona la Y con las X. Disparadores: "delimitar el alcance de una mejora", "¿dónde empieza y termina el proceso?", "quiénes son proveedores y clientes del proceso".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| proveedores | lista<texto> | Sí | |
| entradas | lista<{entrada, requisito}> | Sí | |
| proceso | lista(5–6)<paso> | Sí | |
| salidas | lista<{salida, requisito}> | Sí | |
| clientes | lista<ref:stakeholder> | Sí | |
| limite_inicio / limite_fin | texto | Sí | |
| y_ref | ref:voc-ccr | No | |
| xs_preliminares | lista<texto> | No | |

**Cálculos, reglas y validaciones.** Alerta si el proceso tiene < 5 o > 6 pasos (SS) o faltan límites. Construcción sugerida de las salidas hacia los proveedores (LA §3.2). Exporta pasos a `vsm`, `bpmn` y `fmea`.

**Salidas.** SIPOC con límites. **Conexiones.** Entradas desde: `voc-ccr`, `ficha-proyecto`. Alimenta a: `vsm`, `bpmn`, `fmea`, `plan-medicion`, `ishikawa` (modo flujo).

**Preguntas guía IA**
1. ¿Qué salidas entrega el proceso y a qué clientes?
2. ¿Qué requisitos tienen esas salidas?
3. ¿Cuáles son los 5 o 6 grandes pasos del proceso actual?
4. ¿Qué entradas necesita y quién las provee?
5. ¿Cuál es el primer y el último paso dentro del alcance?

**Origen.** SS §2 paso 3, §6.4; LA §3.2 (PEPSU, lectura de herramientas básicas de calidad).

---

#### `bpmn` — Modelado de procesos (BPMN / flujograma)
*Categoría:* Mejora continua y procesos · *Prioridad:* P2 · *UI:* lienzo-diagrama

**Propósito y disparadores.** Documentar y comprender procesos con notación estándar para analizarlos, mejorarlos o automatizarlos. Disparadores: "nadie sabe exactamente cómo es el proceso", "cuellos de botella", "antes de automatizar", "dejar supuestos por escrito".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| modo | enum(BPMN\|flujograma simple) | Sí | Flujograma: rectángulo operación, rombo decisión (LA §3.2) |
| pools / lanes | lista<{pool, lanes: lista<rol>}> | Sí (BPMN) | |
| elementos | lista<{tipo: enum(evento inicio\|intermedio\|fin\|tarea\|subproceso\|compuerta XOR\|AND\|inclusiva\|basada en eventos\|compleja\|objeto de datos\|grupo\|anotación), nombre, lane}> | Sí | |
| conexiones | lista<{origen, destino, tipo: enum(secuencia\|mensaje\|asociación), condicion}> | Sí | Mensaje solo entre pools |
| supuestos | lista<Supuesto> | Sí | |
| version_estado | enum(as-is\|to-be) | Sí | SS: "as-is / to-be" |

**Cálculos, reglas y validaciones.** Validaciones de notación: al menos un evento de inicio y uno de fin; flujo de mensaje solo entre pools; compuertas XOR con condiciones en sus salidas. Exportación BPMN 2.0 XML (complemento).

**Salidas.** Diagrama de proceso. **Conexiones.** Entradas desde: `sipoc`, `plan-observacion`. Alimenta a: `vsm`, `casos-uso`, `ishikawa` (modo flujo), `fmea`, `plan-control` (flujograma de la documentación).

**Preguntas guía IA**
1. ¿Qué participantes (áreas, sistemas) intervienen y qué roles hay en cada uno?
2. ¿Qué evento inicia el proceso y cómo termina?
3. ¿Qué actividades ocurren y en qué orden?
4. ¿Dónde hay decisiones o actividades en paralelo?
5. ¿Qué mensajes se intercambian entre participantes?
6. ¿Qué supuestos estás haciendo?

**Origen.** BA §4.3, §7 E-27; LA §3.2 (diagrama de flujo, mapeo de procesos); SS §8.1 (editor as-is / to-be).

---

#### `a3-mejora` — A3 de mejora
*Categoría:* Mejora continua y procesos · *Prioridad:* **P1** · *UI:* formulario

**Propósito y disparadores.** Narrar un proyecto de mejora en una hoja de 6 bloques, del problema al control. Disparadores: "quiero documentar una mejora", "proyecto de mejora pequeño o Kaizen", "presentar la mejora al comité".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| titulo | texto ("¿De qué cambio o mejora estás hablando?") | Sí | |
| lider | usuario | Sí | |
| fecha | fecha | Sí | |
| foto | archivo | No | |
| b1_contexto_problema | texto largo / ref:registro-problema | Sí | |
| b2_situacion_actual_desperdicios | texto largo + métricas importadas | Sí | Importa desperdicios y PLT/PCE desde `vsm` |
| b3_analisis_causas_raiz | texto largo + ref:ishikawa \| cinco-porques \| pareto \| iceberg | Sí | |
| b4_diseno_soluciones | lista<{solucion, causa_ref}> | Sí | |
| b5_implementacion | lista<Acción> | Sí | |
| b6_seguimiento | ref:plan-control | Sí | Genera el plan de control |

**Cálculos, reglas y validaciones.** Cada solución debe vincularse a una causa raíz del bloque 3 (trazabilidad). El bloque 6 no se completa sin un plan de control con al menos un indicador. Estados del A3 siguen el orden de lectura (bloques 1→6).

**Salidas.** A3 de una hoja. **Conexiones.** Entradas desde: `registro-problema`, `vsm`, `ishikawa`, `cinco-porques`, `pareto`, `iceberg`, `matriz-priorizacion`. Alimenta a: `plan-control`, `perfil-solucion`, `leccion-aprendida`, `tablero-kanban`.

**Preguntas guía IA**
1. ¿De qué cambio o mejora estás hablando y por qué importa?
2. ¿Cómo es la situación actual y qué desperdicios observas (con datos)?
3. ¿Cuáles son las causas raíz y cómo las identificaste?
4. ¿Qué soluciones propones para cada causa?
5. ¿Qué se implementó, quién y cuándo?
6. ¿Cómo controlarás que el resultado se sostenga?

**Origen.** LEAN §5.4, §6.1, §8.3.

---

#### `plan-medicion` — Plan de medición, estratificación y hoja de verificación
*Categoría:* Mejora continua y procesos · *Prioridad:* P2 · *UI:* tabla + cálculo

**Propósito y disparadores.** Planificar la recolección de datos confiables de la Y y sus factores de estratificación, con definición operacional, muestreo y formularios de captura. Disparadores: "no tenemos datos", "los registros están incompletos", "cada uno mide distinto", "¿cuántos datos necesito?".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| filas | lista<{kpi_y_o_x: Indicador, definicion_operacional: {que_es, incluye, unidad, inicio, fin}, fuente_ubicacion, como_se_obtendra, quien: usuario, rango_esperado, plan_muestreo, fecha}> | Sí | 8 columnas (SS §6.5) |
| estratificacion | lista<{pregunta_proceso, factor: enum(qué\|cuándo\|dónde\|quién) + texto, medicion}> | No | Factores típicos: departamento, operario, máquina, turno, proveedor (LA §3.1) |
| hojas_verificacion | lista<{nombre, cabecera: {semana, completado_por}, columnas: {fecha, hora, iniciales, categorias_defecto: lista<texto>, tiempo_solucion, notas}}> | No | Genera formulario de captura |
| muestra | {tipo: enum(continuo\|discreto), s?: decimal, P?: decimal, delta: decimal, confianza: 95 %} | No | |
| carga_recolector_min_dia | decimal | No | |

**Cálculos, reglas y validaciones**
- `n continuo = (1,96 · s / Δ)²`; `n discreto = (1,96 / Δ)² · P · (1 − P)`; redondear **hacia arriba** (complemento). Tests: s = 2, Δ = 1 → 15,37 → **16** (el material muestra 15); P = 0,25, Δ = 0,10 → 72,03 → 73 (el material muestra 72); (1,96·7,16/2)² → 50; (1,96/0,05)²·0,3·0,7 → 323.
- Alerta si la carga del recolector > 15 min/día (SS §7.11).
- Definición operacional obligatoria antes de capturar datos.
- Los datos capturados alimentan `pareto`, `grafica-control`, `capacidad-proceso`, `calculadora-sigma`.

**Salidas.** Plan de medición, formularios de captura, tamaño de muestra. **Conexiones.** Entradas desde: `voc-ccr`, `sipoc`, `ishikawa` (Xs a medir), `triangulacion-evidencia`. Alimenta a: `msa-gage-rr`, `pareto`, `grafica-control`, `capacidad-proceso`, `calculadora-sigma`, `analisis-estadistico`.

**Preguntas guía IA**
1. ¿Qué indicador (Y) y qué factores (Xs) necesitas medir?
2. ¿Cómo defines exactamente cada medición (qué incluye, unidad, desde y hasta cuándo)?
3. ¿Dónde están los datos, cómo se obtendrán y quién los registrará?
4. ¿Por qué factores conviene estratificar (turno, lugar, persona, proveedor)?
5. ¿Qué variabilidad o proporción esperas y con qué precisión necesitas estimar?
6. ¿Cuánto tiempo diario le tomará al recolector?

**Origen.** SS §2 paso 5, §5, §6.5, §7.6; LA §3.1 (estratificación, hoja de verificación).

---

#### `msa-gage-rr` — MSA / Gage R&R
*Categoría:* Mejora continua y procesos · *Prioridad:* P3 · *UI:* tabla + cálculo

**Propósito y disparadores.** Cuantificar cuánta variación proviene del sistema de medición antes de confiar en los datos. Disparadores: "dos personas miden distinto lo mismo", "dudamos del instrumento", "antes de la línea base DMAIC".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| caracteristica | ref Indicador | Sí | |
| partes / operadores / replicas | entero | Sí | Por defecto 10 × 3 × 3, orden aleatorio |
| tolerancia | decimal (USL − LSL) | No | |
| sigma_historica | decimal | No | |
| multiplicador_estudio | decimal | Sí | 6 |
| mediciones | lista<{parte, operador, replica, valor}> | Sí | |

**Cálculos, reglas y validaciones**
- `σ²Total = σ²Producto + σ²SM`; `σ²SM = σ²repetibilidad + σ²reproducibilidad` (SS §7.9). Método de cálculo (ANOVA o X̄-R): (complemento).
- Mostrar **% contribución**, **% variación de estudio** (= √%contribución) y **% tolerancia**.
- **Veredicto corregido:** umbrales 10 % / 30 % sobre % variación de estudio o % tolerancia (< 10 % aceptable; 10–30 % condicional según riesgo y costo; > 30 % inaceptable). Sobre % contribución, umbrales equivalentes 1 % / 9 % (complemento). El material aplicó 10/30 % a % contribución; corregido aquí.
- Test: % contribución Gage R&R = 7,12 % (repetibilidad 3,10, reproducibilidad 4,02; parte a parte 92,88) → % var. estudio ≈ 26,7 % → **condicional** (el material lo declaró "aceptable").

**Salidas.** Tabla de componentes de varianza y veredicto. **Conexiones.** Entradas desde: `plan-medicion`. Alimenta a: `proyecto-dmaic` (TG-M y TG-C), `capacidad-proceso`, `plan-control`.

**Preguntas guía IA**
1. ¿Qué característica y con qué instrumento mides?
2. ¿Cuántas partes, operadores y repeticiones puedes usar (sugerido 10 × 3 × 3)?
3. ¿Cuál es la tolerancia de especificación?
4. ¿Las mediciones se tomaron en orden aleatorio y a ciegas?
5. Si el resultado es condicional, ¿qué riesgo y costo implica mejorar el instrumento?

**Origen.** SS §2 paso 5 y 13, §6.6, §7.9, §10 (inconsistencia del criterio).

---

#### `grafica-control` — Gráficas de control (SPC)
*Categoría:* Mejora continua y procesos · *Prioridad:* P3 · *UI:* cálculo + tablero

**Propósito y disparadores.** Distinguir variación por causa común de causa especial y vigilar la estabilidad. Disparadores: "¿el proceso está bajo control?", "picos inexplicables", "vigilar el proceso después de mejorar", "reaccionamos a cada variación".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| indicador_ref | ref Indicador (Y o X) | Sí | |
| tipo_dato | enum(continuo\|defectos\|defectuosos) | Sí | Desde `voc-ccr` |
| tamaño_subgrupo | entero | Sí | 1 = sin subgrupos |
| area_oportunidad_constante | bool | Si discreto | |
| datos | lista<{fecha, valor o conteo, n_subgrupo}> | Sí | |
| limites_fisicos | {min, max} | No | p. ej. OTD ≤ 100 % |
| modo_limites | enum(estándar\|didáctico ±3σ) | Sí | |
| fase | enum(línea base\|post mejora) | Sí | |

**Cálculos, reglas y validaciones**
- Selector automático (SS §7.7): defectos + área constante → **C**; defectos + área variable → **U**; defectuosos + subgrupo constante → **NP**; defectuosos + subgrupo variable → **P**; continuo sin subgrupos → **I-MR**; continuo con subgrupos → **X̄-R**.
- Límites estándar (complemento): I-MR x̄ ± 2,66·MR̄, UCL_MR = 3,267·MR̄; X̄-R X̿ ± A2·R̄, UCL_R = D4·R̄, LCL_R = D3·R̄; P p̄ ± 3√(p̄(1−p̄)/n); NP np̄ ± 3√(np̄(1−p̄)); C c̄ ± 3√c̄; U ū ± 3√(ū/n). Modo didáctico del material: x̄ ± 3σ. Límites topados en los límites físicos.
- Puntos fuera de límites marcados; reglas de rachas/tendencias (complemento); aviso de tendencia, mezcla o ciclos → sugerir estratificar.
- Guía de reacción (matriz de ataque a la variación, SS §5): causa especial → buscar qué fue diferente; causa común → cambios fundamentales del proceso (no reaccionar punto a punto).
- Recalcular límites en el nuevo proceso (fase post mejora).

**Salidas.** Gráfica, estado en control / fuera de control, alertas. **Conexiones.** Entradas desde: `plan-medicion`, `voc-ccr`. Alimenta a: `capacidad-proceso`, `plan-control` (monitoreo y plan de respuesta), `proyecto-dmaic`.

**Preguntas guía IA**
1. ¿Qué indicador quieres vigilar y es continuo o de conteo?
2. Si es conteo: ¿cuentas defectos o unidades defectuosas? ¿El tamaño de muestra es constante?
3. ¿Tomas datos individuales o en subgrupos?
4. ¿Hay límites físicos (p. ej. 100 %)?
5. Cuando aparece un punto fuera de límites, ¿qué sucedió distinto ese día?

**Origen.** SS §2 S2, §5, §7.7, §8.3.

---

#### `capacidad-proceso` — Capacidad del proceso (Cp, Cpk)
*Categoría:* Mejora continua y procesos · *Prioridad:* P3 · *UI:* cálculo

**Propósito y disparadores.** Medir cuánto cumple un proceso estable la especificación del cliente. Disparadores: "¿podemos cumplir la especificación?", "muchos productos fuera de tolerancia", "línea base o cierre DMAIC".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| datos | lista<decimal> o subgrupos | Sí | |
| lsl / usl | decimal | Sí (al menos uno) | Desde `voc-ccr` |
| metodo_sigma | enum(s global\|R̄/d2 intra-subgrupo) | Sí | σ de corto plazo |
| estable | bool (desde `grafica-control`) | Sí | |

**Cálculos, reglas y validaciones**
- `Cp = (USL − LSL) / 6σ`; `Cpk = mín[(USL − x̄)/3σ ; (x̄ − LSL)/3σ]`; informar el menor; alerta si Cpk < Cp (descentrado).
- Interpretación de Cp (SS §7.3): > 2 nivel 6σ; 1,67–2 más que adecuado; 1,33–1,67 adecuado; 1–1,33 necesita control; 0,67–1 no adecuado; ≤ 0,67 no adecuado / requiere modificaciones serias (complemento).
- Aviso si el proceso no es estable (capacidad no interpretable).
- Test (datos de tornillos, 100 ± 5 mm, SS §6.12): x̄ = 100,3; s ≈ 3,44 → Cp ≈ 0,48, Cpk ≈ 0,45; con R̄/d2 = 6,875/2,326 ≈ 2,96 → Cp ≈ 0,56, Cpk ≈ 0,53 → no adecuado. Pp/Ppk: (complemento).

**Salidas.** Índices, curva normal con LSL/USL. **Conexiones.** Entradas desde: `plan-medicion`, `grafica-control`, `msa-gage-rr`. Alimenta a: `calculadora-sigma`, `proyecto-dmaic`, `plan-control`.

**Preguntas guía IA**
1. ¿Cuáles son los límites de especificación del cliente?
2. ¿El proceso está estable según la gráfica de control?
3. ¿Los datos vienen en subgrupos?
4. ¿Es más grave salirse por arriba o por abajo?

**Origen.** SS §2 S1, §6.12, §7.3, §8.3.

---

#### `calculadora-sigma` — Calculadora DPMO / nivel sigma / RTY
*Categoría:* Mejora continua y procesos · *Prioridad:* P2 · *UI:* cálculo

**Propósito y disparadores.** Expresar el desempeño en defectos por millón de oportunidades, nivel sigma y rendimiento acumulado. Disparadores: "¿qué tan bueno es nuestro proceso?", "comparar procesos distintos", "el 99 % no es suficiente", "fábrica escondida de reprocesos".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| unidades (U) | entero | Sí | |
| oportunidades_por_unidad (O) | entero | Sí | Desde `voc-ccr` |
| defectos (D) | entero | Sí | |
| etapas | lista<{nombre, inspeccionadas_primera_vez, buenas_primera_vez, buenas_final}> | No | Para rendimientos |

**Cálculos, reglas y validaciones**
- `DPU = D/U`; `OT = U × O`; `DPO = D/OT`; `DPMO = DPO × 10⁶`; `% bueno = 1 − DPO` (test: D = 9, U = 4, O = 5 → DPU 2,25; DPO 0,45; DPMO 450.000; 55 %; σ ≈ 1,6).
- `Nivel σ = Z(1 − DPMO/10⁶) + 1,5` (convención de desplazamiento 1,5σ, coherente con la tabla del curso; complemento). Mostrar también la equivalencia con la tabla del material (SS §7.2). Referencias: 3σ ≈ 66.807; 4σ ≈ 6.210; 6σ ≈ 3,4 DPMO.
- `YC = buenas final / inspeccionadas`; `YFT = buenas a la primera / inspeccionadas primera vez`; `RTY = Π YFT` (tests: 0,99 × 0,99 = 98 %; 0,955 × 0,97 × 0,944 ≈ 87,5 %; 0,9⁴ ≈ 66 %); DPMO malgastados = (1 − RTY) × 10⁶.
- Validación: D ≤ OT.

**Salidas.** DPMO, nivel σ, RTY. **Conexiones.** Entradas desde: `plan-medicion`, `voc-ccr`, `capacidad-proceso`. Alimenta a: `proyecto-dmaic`, `ficha-proyecto` (línea base), `plan-control`, `valor-beneficios`.

**Preguntas guía IA**
1. ¿Qué unidad inspeccionas y cuántas en el periodo?
2. ¿De cuántas formas distintas puede fallar una unidad?
3. ¿Cuántos defectos encontraste?
4. ¿El proceso tiene varias etapas con reproceso? ¿Cuántas unidades salen bien a la primera en cada una?

**Origen.** SS §2 S1, §7.1, §7.2, §7.4, §8.3.

---

#### `analisis-estadistico` — Descriptiva, hipótesis, regresión y delta/sigma
*Categoría:* Mejora continua y procesos · *Prioridad:* P3 · *UI:* cálculo

**Propósito y disparadores.** Describir datos, validar causas (Xs) y verificar mejoras antes/después. Disparadores: "¿esta causa realmente influye?", "¿la mejora es real o casualidad?", "¿cuántos datos necesito para demostrar la mejora?".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| modo | enum(descriptiva\|2-sample t\|regresión\|delta/sigma) | Sí | Otras pruebas: (complemento) |
| datos | series o tabla Y, X1…Xn | Sí | |
| alfa / beta | % | Sí | Por defecto α = 5 %, β = 10 % |

**Cálculos, reglas y validaciones**
- Descriptiva: media, mediana, moda, rango, `s = √[Σ(xi − x̄)² / (n − 1)]`, varianza; histograma, boxplot, serie de tiempo; aviso si media y mediana difieren mucho.
- Hipótesis: si p < 0,05 se rechaza H0, en lenguaje llano; recordar significancia práctica.
- Regresión: coeficientes, p por X, R², R²(adj) con semáforo > 0,8 fuerte, 0,5–0,8 moderada, < 0,5 débil; alerta "correlación ≠ causalidad" (causalidad = correlación significativa + precedencia temporal + conexión causa-efecto).
- **Delta/sigma corregido:** `δ = x̄después − x̄antes` y `σ = s después`, **en las mismas unidades**; buscar n en la tabla del curso (SS §7.8) redondeando δ/σ **hacia abajo** a la fila disponible (conservador, complemento). Test: δ = 0,21, σ = 0,2233 → δ/σ ≈ 0,94 → fila 0,9, α5 β10 → **n = 27** (el material dividía "21").
- Si n disponible < n requerido: informar faltantes y plazo estimado según la frecuencia del dato.
- Aviso: resultados con supuestos (normalidad, independencia, tamaño de muestra) a revisar por un especialista.

**Salidas.** Estadísticos, p-valores, n requerido. **Conexiones.** Entradas desde: `plan-medicion`, `ishikawa` (Xs candidatas), `plan-piloto`. Alimenta a: `proyecto-dmaic` (TG-A, TG-I, TG-C), `pareto`, `valor-beneficios`.

**Preguntas guía IA**
1. ¿Qué quieres demostrar: diferencia antes/después, relación entre X e Y o solo describir?
2. ¿Qué datos tienes de cada grupo y en qué unidades?
3. ¿Cuál es la mejora mínima que te importaría en la práctica?
4. ¿Con qué frecuencia obtienes un nuevo dato?

**Origen.** SS §2 S2, §5, §7.5, §7.8, §8.3, §10 (inconsistencia delta/sigma).

---

#### `fmea` — FMEA (AMEF)
*Categoría:* Mejora continua y procesos · *Prioridad:* P2 · *UI:* tabla + cálculo

**Propósito y disparadores.** Anticipar modos de falla de un proceso o producto, priorizarlos por RPN y asignar acciones, recalculando tras ejecutarlas. Disparadores: "¿qué podría fallar al implementar la solución?", "procesos críticos sin controles", "antes de un piloto o lanzamiento", "incidentes que no queremos repetir".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| tipo | enum(proceso\|producto) | Sí | |
| proceso | texto | Sí | |
| preparado_por / responsables | usuario | Sí | |
| fecha_original / revision | fecha / entero | Sí | |
| filas | lista<fila> | Sí | Importables desde pasos de `sipoc`, `vsm`, `bpmn` |
| fila.paso_entrada | texto | Sí | ¿Qué proceso o entrada se investiga? |
| fila.modo_falla | texto | Sí | ¿Qué puede salir mal? |
| fila.efecto | texto | Sí | Impacto en salidas o requisitos |
| fila.sev | escala(1–10) | Sí | 1 no grave … 10 muy grave |
| fila.causa | texto | Sí | |
| fila.occ | escala(1–10) | Sí | 1 no probable … 10 muy probable |
| fila.controles_actuales | texto (puede citar SOP) | Sí | |
| fila.det | escala(1–10) | Sí | 1 probablemente lo detecte … 10 no es probable detectarlo |
| fila.acciones_recomendadas | lista<Acción> | Si RPN ≥ umbral | |
| fila.acciones_terminadas | texto + mes/año | No | |
| fila.sev_post / occ_post / det_post | escala(1–10) | Tras acciones | |

**Cálculos, reglas y validaciones**
- `RPN = SEV × OCC × DET` (1–1.000), antes y después; ordenar por RPN.
- Alerta: RPN ≥ umbral configurable sin acción; **SEV ≥ 9** sin acción aunque el RPN sea bajo (complemento); acción cerrada sin re-puntuar ni fecha mes/año.
- La severidad normalmente no cambia tras las acciones (aviso si baja sin justificación).
- Test (ejemplo "servir un café", SS §6.10): 8·4·4 = 128 → 8·1·3 = 24; 8·5·9 = 360 → 8·2·7 = 112; 8·8·4 = 256 → 8·2·5 = **80** (el material dice 96; corregido); 8·7·10 = 560 → 8·1·8 = 64; 10·4·4 = 160 → 10·1·4 = 40; 10·7·5 = 350 → 10·2·3 = 60.
- Tablas de niveles intermedios 2–9: no están en el material (complemento: escalas estándar de la industria, configurables).

**Salidas.** FMEA priorizado, acciones con responsable, RPN recalculado. **Conexiones.** Entradas desde: `sipoc`, `vsm`, `bpmn`, `registro-riesgos`, `plan-piloto`. Alimenta a: `plan-control` (controles), `tablero-kanban` (acciones), `proyecto-dmaic` (TG-I), `registro-riesgos`.

**Preguntas guía IA**
1. ¿Qué proceso o solución analizas y cuáles son sus pasos?
2. En cada paso, ¿qué puede salir mal?
3. ¿Qué efecto tendría para el cliente o el paso siguiente y qué tan grave es (1–10)?
4. ¿Qué lo causaría y con qué frecuencia ocurre (1–10)?
5. ¿Qué controles existen y qué tan probable es detectarlo a tiempo (1–10)?
6. ¿Qué acción reduciría la ocurrencia o mejoraría la detección, y quién la lidera?
7. Tras la acción, ¿cómo quedan severidad, ocurrencia y detección?

**Origen.** SS §2 paso 12–13, §5, §6.10, §7.10, §8.4, §10; LA §2 S5a (FMEA en el comparativo de enfoques).

---

#### `plan-piloto` — Plan de prueba piloto
*Categoría:* Mejora continua y procesos · *Prioridad:* P2 · *UI:* tabla

**Propósito y disparadores.** Probar una solución a escala real con criterios de éxito antes del despliegue. Disparadores: "queremos probar antes de implementar en todo", "solución con riesgo".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| solucion_ref | ref:matriz-priorizacion \| matriz-pugh \| a3-mejora | Sí | |
| pruebas | lista<{prueba, descripcion, que, donde, quien: lista<usuario>, cuando_inicio, cuando_fin, como, criterio_exito: texto + Indicador + meta}> | Sí | |
| cronograma | ref:cronograma-gantt | No | Termina en el roll-out |
| resultado | lista<{prueba_ref, valor_obtenido, cumple: bool}> | No | |
| fmea_ref | ref:fmea | No | FMEA de la solución |

**Cálculos, reglas y validaciones.** Toda prueba requiere criterio de éxito medible. Cumplimiento = valor vs. meta. Comparación antes/después se envía a `analisis-estadistico` (2-sample t, delta/sigma).

**Salidas.** Plan y resultado del piloto, plan de roll-out. **Conexiones.** Entradas desde: `matriz-priorizacion`, `matriz-pugh`, `fmea`. Alimenta a: `analisis-estadistico`, `cronograma-gantt`, `plan-control`, `proyecto-dmaic` (TG-I).

**Preguntas guía IA**
1. ¿Qué solución vas a probar, dónde y con quiénes?
2. ¿Cuándo empieza y termina el piloto?
3. ¿Qué resultado medible indicará que fue exitoso?
4. ¿Qué riesgos tiene el piloto y cómo los mitigarás?
5. Si funciona, ¿cómo será el despliegue completo?

**Origen.** SS §2 paso 12, §5, §6.9.

---

#### `plan-control` — Plan de control
*Categoría:* Mejora continua y procesos · *Prioridad:* **P1** · *UI:* tabla

**Propósito y disparadores.** Documento vivo para sostener los resultados de una mejora: qué se controla, cómo, cada cuánto, quién y cómo se reacciona ante desviaciones. Disparadores: "la mejora no se sostiene", "volvimos a lo de antes", "transferir el proceso a su dueño", "cerrar un A3 o DMAIC".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| formato | enum(simple Lean\|3 bloques\|extendido tipo AIAG) | Sí | Todos comparten las filas |
| cabecera_extendida | {numero, contactos_clave, fecha_orig, fecha_rev, vigencia, equipo_principal, aprobaciones: lista<{tipo, usuario, fecha}>, proceso_pieza} | Si extendido | Formato tipo AIAG (SS §6.11) |
| documentacion | {flujograma_ref: ref:bpmn, tareas_clave: lista<{tarea, como o procedimiento}>} | Si 3 bloques | "El plan para hacer el trabajo" |
| filas | lista<{proceso_actividad, indicador: Indicador, caracteristica_clasificacion_especial?, especificacion_tolerancia, valor_actual, valor_objetivo, metodo_control, tecnica_medicion, muestra_tamaño, frecuencia, instancia_revision, metodo_registro: enum(lista de verificación\|gráfico de proceso\|dispersión\|Pareto\|SPC), responsable: usuario, procedimiento_reajuste}> | Sí | 9 columnas Lean + campos SS |
| plan_respuesta | {contencion, ajuste_proceso, mejora_sistema: texto largo} | Si 3 bloques | Respuesta a causas especiales |
| dueño_proceso_acepta | bool + fecha | No | Transferencia (TG-C) |

**Cálculos, reglas y validaciones**
- Cada fila requiere indicador, frecuencia, responsable y procedimiento de reajuste.
- Genera tareas de revisión según la frecuencia; alerta cuando la medición se desvía del objetivo o cuando `grafica-control` detecta causa especial → dispara el plan de respuesta.
- Alerta si un control proviene de una fila FMEA con RPN alto y no tiene método de detección.

**Salidas.** Plan de control vigente y alertas. **Conexiones.** Entradas desde: `a3-mejora` (bloque 6), `fmea`, `grafica-control`, `capacidad-proceso`, `msa-gage-rr`, `plan-piloto`, `vsm`. Alimenta a: `hoshin-scorecard` (KR), `leccion-aprendida`, `proyecto-dmaic` (TG-C), `tablero-kanban`.

**Preguntas guía IA**
1. ¿Qué indicadores muestran que la mejora se sostiene (signos vitales del proceso)?
2. ¿Cuál es el valor actual y el objetivo de cada uno, y qué tolerancia aceptas?
3. ¿Cómo y con qué frecuencia se medirá, y dónde se revisará?
4. ¿Quién es responsable de cada control?
5. Si el indicador se desvía, ¿qué se hace con la salida defectuosa, cómo se ajusta el proceso y quién decide cambios de fondo?
6. ¿El dueño del proceso acepta recibir este plan?

**Origen.** LEAN §5.5, §6.3, §8.3; SS §2 paso 14, §5, §6.11, §8.4.

---

### 2.5 Análisis de problemas y decisiones

#### `registro-problema` — Registro y definición del problema
*Categoría:* Análisis de problemas y decisiones · *Prioridad:* **P1** · *UI:* formulario

**Propósito y disparadores.** Punto de entrada del asistente: redactar el problema como brecha observable, separar hechos, percepciones y contexto, y distinguir síntomas de causas antes de elegir herramientas. Disparadores: cualquier mensaje del tipo "tengo un problema con…", "otra vez pasó…", "hubo un incidente".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| desviacion_observable | texto | Sí | Estado actual vs. esperado |
| impacto | texto + moneda? | Sí | |
| contexto | texto | Sí | Dónde, en qué proceso o producto |
| evidencia | lista<Evidencia> | No | Opcional en la fórmula |
| enunciado | texto largo (calculado) | Sí | `Problema = desviación observable + impacto + contexto (+ evidencia)` |
| desde_cuando / extension | fecha / texto | No | Charter SS |
| metrica_y | ref Indicador | No | |
| hechos / percepciones | lista<texto> | No | Caso Legacy (LA §2 S4) |
| linea_tiempo | lista<{fecha_hora, evento}> | No | |
| sintomas | lista<texto> | No | |
| recurrencia | enum(primera vez\|se repite\|crónico) + n_ocurrencias | Sí | Dispara Iceberg si se repite |
| estructurado | enum(estructurado\|no estructurado\|mixto) | No | Desde `triage-lineal-sistemico` |
| categoria_experiencia | enum(coordinación entre áreas\|atrasos y planificación\|cambios de alcance\|comunicación con stakeholders\|control y seguimiento\|implementación tecnológica\|adquisiciones\|gestión del cambio\|calidad/defectos\|equipo\|otra) | No | Taxonomía LA §2 S2 (+ complemento) |

**Cálculos, reglas y validaciones**
- Enunciado generado por la fórmula; la IA alerta si contiene causas ("por falta de", "debido a") o soluciones ("implementar", "comprar").
- Si `recurrencia` = se repite o crónico → recomendar `iceberg`; si N ocurrencias ≥ 3 (umbral configurable, complemento) en incidencias registradas → sugerencia automática (IM §9-1).
- Recomendación inicial según la matriz de §4.

**Salidas.** Enunciado del problema y ruta de herramientas recomendada. **Conexiones.** Alimenta a: `triage-lineal-sistemico`, `cynefin`, `iceberg`, `ishikawa`, `cinco-porques`, `a3-mejora`, `ficha-proyecto`, `perfil-solucion`, `ssm`, `leccion-aprendida`.

**Preguntas guía IA**
1. ¿Qué está pasando que no debería pasar (o qué no pasa que debería)?
2. ¿Qué se esperaba y qué ocurrió realmente?
3. ¿Qué impacto tiene (dinero, plazo, calidad, clientes, personas)?
4. ¿Dónde y desde cuándo ocurre? ¿Es la primera vez o se repite?
5. ¿Qué hechos verificables tienes, y qué son percepciones?
6. ¿Qué datos o evidencia respaldan la magnitud?

**Origen.** LA §2 S1 (fórmula del problema, síntomas vs. causas), §2 S4 (hechos/percepciones/contexto, línea de tiempo), §7; SS §2 paso 1 (enunciado del problema); IM §9-1; CE §2 S1 (síntomas vs. causas).

---

#### `triage-lineal-sistemico` — Triage: problema lineal vs. sistémico
*Categoría:* Análisis de problemas y decisiones · *Prioridad:* P2 · *UI:* formulario + cálculo

**Propósito y disparadores.** Decidir si el problema se aborda con lógica lineal (corrección puntual) o requiere mirada sistémica antes de intervenir. Disparadores: "ya intentamos varias soluciones y no funcionan", "cada área lo explica distinto", "más control no ha servido".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| problema_ref | ref:registro-problema | Sí | |
| criterios | lista(10)<{criterio, respuesta: enum(lineal\|sistémico\|no sé)}> | Sí | 10 pares de IM §5.3 |

**Cálculos, reglas y validaciones.** Puntaje sistémico = nº de respuestas "sistémico". Regla (umbrales complemento): ≥ 6 → enfoque sistémico (recomendar `iceberg` y/o `cynefin`, no acción correctiva directa); ≤ 3 → lineal (`ishikawa`, `cinco-porques`, `pareto`); 4–5 → mixto. "El pensamiento sistémico no reemplaza la lógica lineal: amplía el campo de visión."

**Salidas.** Decisión de enfoque. **Conexiones.** Entradas desde: `registro-problema`. Alimenta a: `cynefin`, `iceberg`, `ishikawa`, `ssm`.

**Preguntas guía IA** (una por criterio, agrupadas)
1. ¿El problema está bien acotado o es difuso?
2. ¿Hay una causa principal clara o distintas personas lo explican distinto?
3. ¿Existe una solución conocida que ya funcionó?
4. ¿Es un hecho puntual o reaparece?
5. ¿Intervienen pocas partes o varias áreas y decisiones conectadas? ¿Actuar en una parte afecta a otras?
6. ¿El contexto es estable mientras lo resuelves?
7. ¿Es principalmente técnico o también se explica por relaciones entre personas o áreas?

**Origen.** IM §2 S1, §5.3, §7.5, §9-1.

---

#### `cynefin` — Diagnóstico Cynefin (proyecto y componentes)
*Categoría:* Análisis de problemas y decisiones · *Prioridad:* **P1** · *UI:* formulario

**Propósito y disparadores.** Identificar el tipo de contexto (simple, complicado, complejo, caótico, desorden) para elegir la lógica de decisión e intervención; en modo proyecto sugiere enfoque predictivo, ágil o híbrido. Disparadores: "no sé qué enfoque usar", "planificamos todo y igual cambia", "crisis", "responder con más control no funciona", "no hay respuesta correcta y hay que decidir".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| modo | enum(proyecto completo\|por componentes) | Sí | SCRUM §8.1-1 / IM §5.5 |
| situacion_decision_critica | texto largo | Sí | |
| componentes | lista(1–3)<{descripcion, dominio: enum(simple\|complicado\|complejo\|caótico), señales: lista<Evidencia>, dominio_descartado: enum + razon, intervencion: texto}> | Sí | Modo proyecto = 1 componente |
| riesgo_mala_lectura | texto largo | Sí | |
| recomendacion_ejecutiva | texto largo | Sí | |
| enfoque_sugerido | enum(predictivo\|ágil\|híbrido\|estabilizar primero) | Calculado | |

**Cálculos, reglas y validaciones**
- Secuencia por dominio: simple = percibir–categorizar–responder (mejor práctica); complicado = percibir–analizar–responder (expertos, buena práctica); complejo = sondear–percibir–responder (experimentos, patrones emergentes); caótico = actuar–percibir–responder (estabilizar); desorden = descomponer en partes.
- Enfoque sugerido (SCRUM §8.1-1): simple/complicado → predictivo; complejo → ágil; mixto entre componentes → híbrido; caótico → estabilizar y luego reevaluar.
- Biblioteca de intervenciones por dominio (IM §3.1): estándar; panel de expertos; experimentos seguros-de-fallar, reglas simples, disenso ritual, desviación positiva; acción inmediata y crisis + innovación en paralelo.
- Señales de peligro: en complejo, "¿estás respondiendo con más control?"; en simple, complacencia; en complicado, parálisis por análisis.
- "No son grados de dificultad, son contextos distintos": la IA no ordena los dominios como niveles.

**Salidas.** Plan de intervención por componente y enfoque sugerido. **Conexiones.** Entradas desde: `registro-problema`, `triage-lineal-sistemico`, `iceberg`. Alimenta a: `ficha-proyecto` (tipo), `vision-producto`, `registro-experimentos`, `ishikawa`/`pareto` (componentes complicados), `registro-riesgos`, `logicas-accion`.

**Preguntas guía IA**
1. ¿Cuál es la situación y qué decisión crítica debes tomar?
2. ¿En qué partes (máximo 3) puedes dividir el problema?
3. Para cada parte: ¿la relación causa-efecto es evidente, requiere análisis experto, solo se entiende en retrospectiva o no hay tiempo para entenderla?
4. ¿Qué señales concretas del caso apoyan esa clasificación?
5. ¿Qué otro dominio sería plausible y por qué lo descartas?
6. ¿Qué intervención corresponde a cada parte?
7. ¿Qué pasaría si estás leyendo mal el contexto?

**Origen.** IM §2 S2, §3.1, §5.5, §6 (trabajo 2), §8, §9-4; SCRUM §2 S1 (Cynefin), §5, §8.1-1.

---

#### `iceberg` — Modelo del Iceberg
*Categoría:* Análisis de problemas y decisiones · *Prioridad:* P2 · *UI:* lienzo-diagrama

**Propósito y disparadores.** Leer un problema recurrente en 4 niveles (eventos, patrones, estructura, mentalidades) para intervenir más allá del evento. Disparadores: "esto vuelve a pasar", "corregimos y reaparece", "el tablero/sistema nuevo no se usa", "planillas paralelas".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| situacion | texto largo / ref:registro-problema | Sí | Descripción detallada real |
| tarjetas | lista<{texto, nivel: enum(evento\|patrón\|estructura\|mentalidad), evidencia_ref}> | Sí | ≥ 1 por nivel |
| descubrimiento | texto largo | Sí | "¿Qué descubrimos que no habíamos visto?" |
| acciones | lista<Acción + {nivel_intervenido}> | No | |

**Cálculos, reglas y validaciones.** Alerta si todas las acciones son a nivel de evento ("si solo intervenimos el evento, el patrón probablemente vuelva"). Pistas de clasificación para la IA: eventos = hechos puntuales ("hoy", "hubo"); patrones = frecuencia ("siempre", "suele"); estructura = roles, rutinas, organización; mentalidades = creencias (frases entre comillas). Modo entrenamiento con las 16 tarjetas del material (IM §5.2) y clave de respuesta.

**Salidas.** Mapa de 4 niveles y puntos de intervención. **Conexiones.** Entradas desde: `registro-problema`, `triage-lineal-sistemico`. Alimenta a: `cynefin`, `mapa-creencias` (mentalidades), `a3-mejora`, `leccion-aprendida`, `canvas-equipo` (estructura del equipo).

**Preguntas guía IA**
1. ¿Qué pasó concretamente (el evento visible)?
2. ¿Qué se viene repitiendo una y otra vez?
3. ¿Cómo está organizado el trabajo (roles, rutinas, incentivos, sistemas) para que esto ocurra?
4. ¿Qué creencias o supuestos sostienen esa forma de organizarse?
5. ¿Qué descubriste que no habías visto antes?
6. ¿En qué nivel intervendrás y con qué acción?

**Origen.** IM §2 S1, §5.1, §5.2, §7.1, §9-2, §9-3; LA §2 S2 (pensamiento sistémico).

---

#### `ishikawa` — Diagrama de Ishikawa (causa-efecto)
*Categoría:* Análisis de problemas y decisiones · *Prioridad:* **P1** · *UI:* lienzo-diagrama

**Propósito y disparadores.** Ordenar visualmente causas y subcausas de un efecto no deseado; amplía el análisis y estructura hipótesis (no prueba causas). Disparadores: "desvío, incidente, problema de calidad o falla recurrente", "¿por qué pasa esto?", "muchas opiniones sobre la causa".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| efecto | texto / ref:registro-problema | Sí | Cabeza; redactado con la fórmula del problema |
| alcance | texto | No | Paso 2 de 10 |
| metodo | enum(6M\|categorías PM\|flujo del proceso\|estratificación/enumeración\|plantilla BIM información\|libre) | Sí | 3 métodos de LA §5.2 + plantillas |
| categorias | lista(5–6 recomendadas)<{nombre}> | Sí | 6M: métodos, mano de obra, materiales, maquinaria, medición, medio ambiente · PM: personas, procesos, equipos/tecnología, gestión, medición, materiales, entorno · BIM: EIR, planificación de la información, entrega del modelo, movilización de equipos, producción colaborativa, operación del activo · Flujo: pasos de `sipoc`/`vsm`/`bpmn` |
| causas | lista<{categoria, texto, padre_ref (subcausa), evidencia: lista<Evidencia>, presente: bool?, votos_531: entero, a_validar: bool, x_ref (SS)}> | Sí | |
| nivel | entero | No | Ishikawa de 2.º nivel anidado sobre una causa |
| no_abordables | lista<{causa_ref, reportada_a}> | No | Se reportan a la alta dirección |
| soluciones_brainstorming | lista<texto> | No | Paso 6 BA |

**Cálculos, reglas y validaciones**
- Votación 5-3-1: cada participante da 5, 3 y 1 puntos a sus tres causas más importantes; se suman y ordenan (LA §7).
- Marcar 2–3 causas "a validar" con prioridad y una hipótesis causal defendible (LA §5.1).
- Preguntas de chequeo por cada M (p. ej. medición: disponibilidad, definición operacional, tamaño de muestra, repetibilidad, reproducibilidad, calibración).
- Alerta si una rama tiene demasiadas causas (6M tiende a ello) o si una causa es una solución disfrazada ("falta de software X").
- Las causas confirmadas pueden convertirse en riesgos o acciones (BIM §8.1-3) y en Xs a medir (SS).

**Salidas.** Diagrama, causas priorizadas y a validar, hipótesis causal. **Conexiones.** Entradas desde: `registro-problema`, `sipoc`, `vsm`, `bpmn`, `lluvia-ideas`. Alimenta a: `cinco-porques` (profundizar), `pareto` (cuantificar causas), `plan-medicion` (Xs), `analisis-estadistico` (validar Xs), `a3-mejora` (bloque 3), `registro-riesgos`, `leccion-aprendida`, `triangulacion-evidencia`.

**Preguntas guía IA**
1. ¿Cuál es el efecto no deseado, redactado como desviación + impacto + contexto?
2. ¿Qué método conviene: categorías 6M, categorías de proyecto o las etapas del proceso?
3. ¿Quiénes deberían participar para tener perspectivas distintas?
4. En cada categoría, ¿qué causas podrían explicar el efecto? ¿Y qué causa a esas causas?
5. ¿Qué evidencia tienes de cada causa?
6. ¿Cuáles son las 3 causas más importantes según el equipo (votación 5-3-1)?
7. ¿Sobre cuáles puedes actuar y cuáles debes escalar?

**Origen.** LA §2 S1, §3.2, §5.1, §5.2, §6.1, §7, §8.1-1; BA §4.3, §7 E-26; BIM §2 (Dolor de la industria), §5, §6.2, §8.1-3; SS §2 paso 7, §5.

---

#### `cinco-porques` — 5 porqués
*Categoría:* Análisis de problemas y decisiones · *Prioridad:* **P1** · *UI:* formulario

**Propósito y disparadores.** Profundizar una causa preguntando "¿por qué?" sucesivamente hasta acercarse a la causa raíz. Disparadores: "quiero llegar a la causa de fondo rápido", "profundizar una rama del Ishikawa", "análisis post-incidente".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| punto_partida | texto / ref causa de ishikawa / ref:registro-problema | Sí | |
| cadena | lista(3–7)<{por_que_n, respuesta, evidencia: lista<Evidencia>}> | Sí | Típicamente 5 |
| causa_raiz_candidata | texto | Sí | |
| requiere_demostracion | bool | Sí (por defecto true) | "La última respuesta todavía es una explicación: ahora debe ser demostrada" |
| ramas | lista<cadena> | No | Si una respuesta tiene varias causas |

**Cálculos, reglas y validaciones.** Alerta si una respuesta culpa a una persona (sugerir preguntar por el sistema que lo permitió) o si se detiene en un síntoma. Respuestas sin evidencia se marcan "hipótesis". Opción de enviar la causa raíz a `triangulacion-evidencia` o `analisis-estadistico`.

**Salidas.** Cadena causal y causa raíz candidata. **Conexiones.** Entradas desde: `registro-problema`, `ishikawa`. Alimenta a: `a3-mejora`, `triangulacion-evidencia`, `leccion-aprendida`, `ishikawa`.

**Preguntas guía IA**
1. ¿Cuál es el problema o causa de partida?
2. ¿Por qué ocurre? (repetir con cada respuesta)
3. ¿Qué evidencia respalda cada respuesta?
4. ¿Hay más de una causa en algún nivel?
5. ¿La última respuesta es algo sobre lo que se puede actuar?
6. ¿Cómo demostrarías que esa es la causa raíz?

**Origen.** LA §2 S1, §2 S4 (ejemplo Legacy), §5.1 paso 9, §5.9; LA §3.3 (equivalente en ingeniería).

---

#### `pareto` — Pareto y estratificación
*Categoría:* Análisis de problemas y decisiones · *Prioridad:* **P1** · *UI:* cálculo + tablero

**Propósito y disparadores.** Priorizar por contribución localizando los "pocos vitales"; "Ishikawa amplía el análisis; Pareto focaliza la intervención". Disparadores: "hay muchos tipos de problemas o causas, ¿por dónde empiezo?", "tenemos datos de reclamos/defectos/tiempos por categoría", "priorizar backlog o lecciones por impacto".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| titulo / periodo / fuente | texto / rango de fechas / texto | Sí | Metadatos obligatorios |
| unidad_impacto | texto | Sí | Eje izquierdo |
| modo | enum(frecuencia\|frecuencia × costo\|exceso sobre objetivo) | Sí | |
| categorias | lista<{nombre, frecuencia: decimal, costo_unitario?: moneda, cantidad_real?: decimal, cantidad_objetivo?: decimal}> | Sí | Desde hoja de verificación (`plan-medicion`) o carga CSV |
| factor_estratificacion | texto | No | máquina, día, turno, proveedor… |
| nivel | enum(1.º problemas\|2.º causas) + padre_ref | No | |

**Cálculos, reglas y validaciones**
- `impacto = frecuencia` o `frecuencia × costo (gravedad)`; ordenar desc.; `% contribución = impacto / Σ impacto`; `% acumulado`.
- Modo exceso (tabla A–F de LA §5.3): C = A − B; D = C / A; E = C / ΣC; F = acumulado. Test: bolsas 2,98 (88,43 %), boca ancha 0,32 (9,54 %; acum. 97,97 %), boca angosta 0,07 (2,03 %).
- Exceso % según definición estándar: `(real − estándar) / estándar × 100` (test 503 vs 500 → 0,6 %); el ejercicio usa C/A (sobre lo llenado): mostrar cuál se usa.
- Alertas: la barra principal no duplica al resto (no basta el 80 %); diagrama plano → reclasificar; categoría "Otras" dominante; sugerir Pareto de 2.º nivel cuando una categoría predomina.
- Corte visual en 80 % (SS §8.2).

**Salidas.** Gráfico con línea acumulada, pocos vitales, decisión de foco. **Conexiones.** Entradas desde: `plan-medicion`, `ishikawa`, `vsm` (tiempos de espera), `constructor-encuestas`. Alimenta a: `a3-mejora`, `proyecto-dmaic`, `matriz-priorizacion`, `leccion-aprendida`, `product-backlog`, `plan-control` (método de registro).

**Preguntas guía IA**
1. ¿Qué problema quieres priorizar y en qué unidad mides el impacto (veces, horas, dinero)?
2. ¿Qué categorías tienes y cuántas ocurrencias de cada una en qué periodo?
3. ¿Todas las categorías cuestan o pesan lo mismo? Si no, ¿cuál es el costo de cada una?
4. ¿De dónde salen los datos?
5. ¿Por qué factor podrías estratificar la categoría principal (máquina, turno, día, proveedor)?
6. ¿Qué decisión tomarás con el resultado?

**Origen.** LA §2 S1, §3.1, §5.3, §7, §8.1-2; SS §2 paso 7, §5, §8.2; SCRUM §2 S2 (Pareto como método de priorización).

---

#### `lluvia-ideas` — Lluvia de ideas y votación 5-3-1
*Categoría:* Análisis de problemas y decisiones · *Prioridad:* P2 · *UI:* tablero

**Propósito y disparadores.** Generar muchas ideas diversas (causas o soluciones) sin crítica y luego condensarlas y calificarlas con criterios predefinidos. Disparadores: "necesitamos ideas", "generar causas para el Ishikawa", "¿cómo reducimos el tiempo de ciclo?", "soluciones potenciales DMAIC".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| foco | texto | Sí | Definición clara del área de interés |
| proposito | enum(causas\|soluciones\|requisitos\|otro) | Sí | |
| variante | enum(abierta\|por turnos (10 pasos)\|guiada\|3×3×3\|antisolución\|grupo silencioso) | Sí | SS S4 págs 24–28; LA §5.9 |
| tiempo_limite_min | entero | Sí | Mayor si el grupo es más grande |
| facilitador / participantes | usuario | Sí | Participantes diversos |
| criterios_evaluacion | lista<texto> | Sí | Definidos **antes** de la sesión |
| ideas | lista<{texto, autor_anonimo, grupo, duplicada_de?, votos_531, calificacion}> | Sí | |
| lista_final | lista<ref idea> | No | |

**Cálculos, reglas y validaciones.** Captura anónima opcional; sin crítica durante la fase de generación (la IA no evalúa ideas hasta el cierre); fusión de duplicados; votación 5-3-1 (5, 3, 1 puntos; suma). Exporta ideas a Ishikawa, matriz de priorización o backlog.

**Salidas.** Lista condensada y calificada. **Conexiones.** Entradas desde: `registro-problema`, `vsm`, `plan-elicitacion`. Alimenta a: `ishikawa`, `matriz-priorizacion`, `matriz-pugh`, `product-backlog`, `a3-mejora`.

**Preguntas guía IA**
1. ¿Sobre qué pregunta exacta generarán ideas?
2. ¿Buscan causas o soluciones?
3. ¿Quiénes participan y cuánto tiempo tienen?
4. ¿Con qué criterios evaluarán las ideas al final?
5. ¿Qué ideas se pueden combinar?
6. ¿Cuáles son las tres más valiosas para cada participante?

**Origen.** BA §4.2, §5.5, §7 C-18; LA §3.2 (10 pasos), §5.9, §7 (5-3-1); SS §2 pasos 7 y 10, §5; LEAN §3.5 paso 6.

---

#### `matriz-priorizacion` — Matrices de priorización
*Categoría:* Análisis de problemas y decisiones · *Prioridad:* P2 · *UI:* tabla + cálculo

**Propósito y disparadores.** Motor común para ordenar soluciones, cambios, iniciativas o ítems de backlog con distintos métodos. Disparadores: "tenemos varias soluciones, ¿cuál elegimos?", "priorizar el backlog", "portafolio de cambios SSM", "quick wins".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| metodo | enum(esfuerzo-impacto\|impacto-factibilidad\|criterios múltiples\|MoSCoW\|Kano\|100 puntos\|comparación por pares\|valor vs. complejidad\|Eisenhower) | Sí | |
| alternativas | lista<{nombre, origen_ref}> | Sí | |
| criterios (criterios múltiples) | lista<{criterio, peso: %, pregunta, nivel_9, nivel_3, nivel_1}> | Si aplica | Plantilla SS precargada: prevención de recurrencia 0,2; seguridad, tiempo, costo, facilidad, adherencia, riesgos, impacto en KPI, impacto económico/servicio 0,1 c/u |
| evaluaciones | mapa<alternativa, mapa<criterio o eje, valor>> | Sí | |
| portafolio_cambios (SSM) | lista<{cambio, deseabilidad, factibilidad, impacto, costo, complejidad, urgencia, responsable}> | Si impacto-factibilidad | LA §5.4 paso 6 |

**Cálculos, reglas y validaciones**
- Criterios múltiples: `Puntaje = Σ (peso × nota)`, notas 9/3/1, **Σ pesos = 100 %** (error si no). Test: A 6,2; B 2,4; C 2,0; D 7,6; E 2,6; F 2,4 → ranking D, A, E, B/F, C.
- Esfuerzo-impacto / impacto-factibilidad: cuadrante 2×2 (umbral en el punto medio de la escala); primero bajo esfuerzo y alto impacto ("quick wins"). El esfuerzo incluye costo, tiempo, complejidad técnica y cultural.
- MoSCoW: Must / Should / Could / Won't. Kano: atractiva, unidimensional, requerida, indiferente.
- 100 puntos: suma por participante = 100 (validación). Pares: conteo de victorias. Eisenhower y valor vs. complejidad: cuadrantes 2×2.
- Resultado escribe la categoría o el orden en el ítem de origen (p. ej. `product-backlog`).

**Salidas.** Ranking o clasificación. **Conexiones.** Entradas desde: `lluvia-ideas`, `analisis-brechas`, `ssm`, `product-backlog`, `pareto`. Alimenta a: `matriz-pugh`, `plan-piloto`, `a3-mejora`, `product-backlog`, `perfil-solucion`, `portafolio-proyectos`.

**Preguntas guía IA**
1. ¿Qué alternativas estás comparando?
2. ¿Necesitas una decisión rápida (2×2) o un puntaje ponderado?
3. ¿Qué criterios importan y cuánto pesa cada uno (deben sumar 100 %)?
4. ¿Cómo califica cada alternativa en cada criterio (9 alto, 3 medio, 1 bajo)?
5. ¿El resultado coincide con la intuición del equipo? Si no, ¿qué criterio falta?

**Origen.** SS §2 paso 11, §5, §6.7, §7.11; LA §5.4 paso 6, §7; SCRUM §2 S2 (métodos de priorización), §5.

---

#### `matriz-pugh` — Matriz Pugh
*Categoría:* Análisis de problemas y decisiones · *Prioridad:* P3 · *UI:* tabla + cálculo

**Propósito y disparadores.** Comparar conceptos de solución contra una referencia para combinar fortalezas y eliminar los débiles. Disparadores: "varias soluciones con ventajas distintas", "¿podemos crear un híbrido mejor?".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| referencia | texto | Sí | Columna toda "S" |
| conceptos | lista<texto> | Sí | |
| criterios | lista<{criterio, importancia: entero}> | Sí | |
| celdas | mapa<concepto, mapa<criterio, enum(+\|−\|S)>> | Sí | |
| fortalezas_debilidades | mapa<concepto, texto> | No | |
| iteracion | entero | No | Reingreso de conceptos modificados |

**Cálculos, reglas y validaciones.** Por concepto: Σ+, Σ−, ΣS; total ponderado + = Σ importancia de criterios con "+"; total ponderado − = Σ importancia con "−". Test (vacaciones, importancias 9, 5, 10, 10, 8, 6, 8): concepto 1 → +2 / −2 / S3, ponderados 14 / 19. Pasos: atacar debilidades, reingresar soluciones modificadas, eliminar las débiles.

**Salidas.** Concepto elegido o híbrido. **Conexiones.** Entradas desde: `matriz-priorizacion`, `lluvia-ideas`. Alimenta a: `plan-piloto`, `a3-mejora`.

**Preguntas guía IA**
1. ¿Cuál es la solución de referencia (actual o estándar)?
2. ¿Qué conceptos alternativos comparas?
3. ¿Qué criterios usarás y qué importancia tiene cada uno?
4. ¿Cada concepto es mejor (+), peor (−) o igual (S) que la referencia en cada criterio?
5. ¿Cómo podrías corregir la debilidad principal del mejor concepto?

**Origen.** SS §2 paso 11, §5, §6.8, §7.11.

---

#### `ssm` — Soft Systems Methodology
*Categoría:* Análisis de problemas y decisiones · *Prioridad:* P2 · *UI:* lienzo-diagrama + formulario

**Propósito y disparadores.** Comprender situaciones problemáticas no estructuradas en sistemas de actividades humanas (múltiples actores e intereses) comparando la realidad con un modelo ideal. Disparadores: "cada actor quiere algo distinto", "el problema parece técnico pero involucra conflictos entre áreas", "no está claro cuál es el problema", "requisitos que dependen de perspectivas".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| p1_situacion | {que_ocurre, por_que_problematica, a_quien_afecta, consecuencias, antecedentes, sintomas, incertidumbres, restricciones} | Sí | Máx. media página |
| p2_rich_picture | lienzo {actores, relaciones, conflictos, emociones, flujos de información, procesos, decisiones, tensiones, restricciones, entorno} | Sí | "No busca ser bonito"; biblioteca de símbolos |
| p3_definicion_raiz | texto largo | Sí | |
| p3_catwoe | {clientes, actores, transformacion, cosmovision, dueños, entorno_restricciones} | Sí | E = Entorno (o Restricciones) |
| p4_modelo_conceptual | {sistema_interes, entradas, actividades: lista(7–15)<{actividad, depende_de}>, soporte, retroalimentacion, salida, supuesto_central} | Sí | Muestra el ideal, no lo actual |
| p5_gap_ref | ref:analisis-brechas | No | |
| p6_portafolio_ref | ref:matriz-priorizacion (impacto-factibilidad) | No | |
| p7_plan_implementacion | {roadmap, responsables, cronograma_ref, kpis: lista<Indicador>, gestion_cambio_ref, riesgos_ref, gobernanza} | No | |

**Cálculos, reglas y validaciones.** Modelo conceptual con 7–15 actividades (alerta fuera de rango). La IA no propone soluciones en los pasos 1–3 ("comprender antes de proponer"). Taller guiado de 60 min (10 + 30 + 20) para pasos 1–3.

**Salidas.** Rich picture, CATWOE, modelo conceptual, brechas, cambios priorizados y plan. **Conexiones.** Entradas desde: `registro-problema`, `triage-lineal-sistemico`, `mapa-stakeholders`. Alimenta a: `analisis-brechas`, `matriz-priorizacion`, `mapa-stakeholders`, `triangulacion-evidencia` (elementos críticos del modelo), `cronograma-gantt`, `gestion-cambio`.

**Preguntas guía IA**
1. ¿Qué ocurre, por qué es problemático, a quién afecta y con qué consecuencias?
2. ¿Qué actores intervienen, qué quiere cada uno y dónde chocan sus intereses?
3. ¿Qué transformación debería lograr el sistema, para quién y desde qué cosmovisión?
4. ¿Quién podría detener el sistema (dueño) y qué restricciones del entorno hay?
5. ¿Qué actividades esenciales (7 a 15) tendría el sistema ideal y cómo se conectan?
6. ¿Dónde difiere la realidad de ese modelo?
7. ¿Qué cambios son deseables y factibles?

**Origen.** LA §2 S3, §3.4, §5.4, §6.6, §8.1-4, §8.2.

---

#### `triangulacion-evidencia` — Diseño de investigación y triangulación
*Categoría:* Análisis de problemas y decisiones · *Prioridad:* P3 · *UI:* tabla

**Propósito y disparadores.** Pasar de una explicación plausible a una conclusión con evidencia: proposiciones falsables, operacionalización y contraste con ≥ 2 fuentes. Disparadores: "creemos que la causa fue…, pero hay que demostrarlo", "auditoría o regulador pide evidencia", "no sabemos lo que no sabemos".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| modelo_ref | ref:ssm \| ishikawa \| cinco-porques | No | |
| elementos_criticos | lista(3–5)<{elemento, por_que_critico, que_pasa_si_falla}> | Sí | Plantilla 1 |
| proposiciones | lista<{elemento_ref, proposicion, que_observar}> | Sí | Plantilla 2; falsables |
| operacionalizacion | lista<{proposicion_ref, variable, indicador, unidad_escala, evidencia_esperada}> | Sí | Plantilla 3 |
| plan_recoleccion | lista<{indicador_ref, informacion_requerida, fuente, instrumento: ref:* (encuesta, entrevista, análisis documental…), muestra, resultado_esperado}> | Sí | Plantilla 4 |
| matriz_triangulacion | lista<{proposicion_ref, evidencia_1, evidencia_2, evidencia_3, resultado: enum(convergencia\|complementariedad\|contradicción), hallazgo}> | Sí | Plantilla 5 |
| matriz_conocimiento | lista<{item, cuadrante: enum(conocimiento disponible\|no explicitado\|brecha conocida\|desconocido desconocido)}> | No | LA §2 S4 |
| sintesis | texto largo (plan integrado de 6 frases) | Sí | Plantilla 6 / síntesis de 2 min |

**Cálculos, reglas y validaciones.** Advertencia si la proposición no es falsable o es genérica ("faltó liderazgo", "mala cultura"). Cada proposición requiere ≥ 2 evidencias de fuentes distintas. Contradicción = resultado válido que exige investigar antes de concluir. Pregunta final de control: "¿podrían defender su conclusión frente a alguien que conoce el caso pero no está de acuerdo?".

**Salidas.** Plan de investigación, matriz de triangulación, conclusión. **Conexiones.** Entradas desde: `ssm`, `ishikawa`, `cinco-porques`. Alimenta a: `constructor-encuestas`, `guion-entrevista`, `analisis-documental`, `plan-medicion`, `leccion-aprendida`.

**Preguntas guía IA**
1. ¿Qué necesitas saber y demostrar? (No partas por la herramienta.)
2. ¿Qué 3–5 elementos de tu modelo, si fueran falsos, cambiarían tu interpretación?
3. ¿Qué proposición observable y refutable formula cada uno?
4. ¿Qué variable e indicador la miden, y en qué unidad?
5. ¿Dónde está la información, quién la da y con qué instrumento?
6. ¿Las fuentes convergen, se complementan o se contradicen?

**Origen.** LA §2 S4, §5.5, §6.11, §8.1-5.

---

#### `registro-experimentos` — Registro de experimentos (sondas)
*Categoría:* Análisis de problemas y decisiones · *Prioridad:* P3 · *UI:* tabla

**Propósito y disparadores.** Hacer explícito el ciclo sondear–percibir–responder en dominios complejos con experimentos pequeños y seguros de fallar. Disparadores: dominio "complejo" en `cynefin`, "no sabemos qué funcionará", "un experimento al mes".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| experimentos | lista<{hipotesis, barrera_regla_simple, señal_a_observar, fecha_revision, resultado, decision: enum(amplificar\|atenuar\|ajustar\|abandonar), aprendizaje}> | Sí | IM §9-5 |

**Cálculos, reglas y validaciones.** Recordatorio en fecha de revisión; alerta si no hay experimento activo en 30 días en proyectos complejos (complemento, inspirado en "un experimento al mes", SCRUM §3.2).

**Salidas.** Bitácora de experimentos. **Conexiones.** Entradas desde: `cynefin`. Alimenta a: `retrospectiva`, `leccion-aprendida`, `product-backlog`.

**Preguntas guía IA**
1. ¿Qué crees que podría funcionar y por qué?
2. ¿Qué límites o reglas simples protegen el experimento si falla?
3. ¿Qué señal observarás para saber si va bien?
4. ¿Cuándo lo revisarás?
5. ¿Lo amplificas, lo atenúas o lo abandonas, y qué aprendiste?

**Origen.** IM §3.1 (herramientas para contextos complejos), §9-5; SCRUM §3.2 (experimentos, reflexiona y mejora).

---

### 2.6 Equipo y liderazgo

> Datos de clima, bienestar y percepción de personas son sensibles: agregados, anonimizados y con consentimiento (CE §8, complemento). Ninguna de estas herramientas debe usarse para evaluación de desempeño individual sin pasar por los procesos internos de RR.HH. y protección de datos.

#### `diagnostico-equipo` — Diagnóstico de dificultades del equipo (5 disciplinas)
*Categoría:* Equipo y liderazgo · *Prioridad:* P2 · *UI:* formulario + tablero

**Propósito y disparadores.** Diagnosticar la capacidad adaptativa del equipo con 12 dificultades frecuentes y ubicar la disciplina de alto desempeño que más "mueve la aguja". Disparadores: "el equipo no rinde", "la gente calla lo que piensa", "nadie sabe quién decide", "no aprendemos de los errores", "cambio de encargo".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| encuesta_ref | ref:constructor-encuestas (plantilla diagnostico_equipo) | Sí | Anónima |
| items | lista(12)<{texto, disciplina: enum(comisión clara\|clarificar\|co-crear\|conectar con el entorno\|aprendizaje), frecuencias: escala(1–5)}> | Sí | 1 Nunca … 5 Con mucha frecuencia; mapeo ítem→disciplina editable |
| sintoma_o_causa | lista<{item_ref, origen: enum(dentro del equipo\|sistema), es: enum(síntoma\|causa)}> | No | Wizard (CE §8 M1) |
| disciplina_foco | enum(5 disciplinas) | Sí | |
| capacidad_a_desarrollar | texto | Sí | → microprácticas |

**Cálculos, reglas y validaciones.** Distribución por ítem; ítems críticos = media ≥ 4 o ≥ 50 % en 4–5 (umbral complemento). Puntaje por disciplina = media de sus ítems; mapa en cuadrantes (tarea/procesos × interior/exterior, aprendizaje al centro). El mapeo ítem→disciplina es propuesta de la ficha (CE §4.1), no del material: mostrarlo como editable. Mínimo 5 respuestas para mostrar resultados (complemento).

**Salidas.** Mapa de disciplinas y foco. **Conexiones.** Entradas desde: `constructor-encuestas`. Alimenta a: `canvas-equipo`, `micropracticas`, `retrospectiva`.

**Preguntas guía IA**
1. ¿Qué dificultades del equipo te preocupan más?
2. ¿Quiénes responderán la encuesta y se garantiza el anonimato?
3. Para las dificultades críticas, ¿su origen está dentro del equipo o en el sistema en que opera?
4. ¿Son síntomas o causas?
5. ¿Qué disciplina, si mejorara, movería más la aguja?
6. ¿Qué capacidad concreta quieres desarrollar?

**Origen.** CE §2 S1, §4.1, §4.2, §5.2, §5.3, §6 A, §7, §8 M1.

---

#### `canvas-equipo` — Canvas / acuerdo de equipo
*Categoría:* Equipo y liderazgo · *Prioridad:* P2 · *UI:* formulario

**Propósito y disparadores.** Acuerdo vivo y versionado sobre para qué existe el equipo, cómo trabaja, cómo se relaciona, cómo se conecta con stakeholders y cómo aprende. Disparadores: "kick-off", "nuevo integrante", "conflictos recurrentes", "cambio de alcance".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| comision_clara | {proposito, importancia, objetivos_estrategicos, resultados_esperados, criterios_exito, sponsors_compromiso, recursos_asegurados, recursos_faltantes} | Sí | Pre-llenado desde `ficha-proyecto` |
| clarificar | {proposito_equipo, metas, valores, roles_ref: ref:matriz-raci, reglas_decision, reuniones: lista<{tipo, frecuencia}>} | Sí | |
| co_crear | {reglas_funcionamiento, tipo_conversacion_deseada, protocolo_conflicto, protocolo_error_incumplimiento, tipo_feedback, foco: enum(resultados\|tarea\|personas)} | Sí | |
| conectar | ref:mapa-stakeholders + plan_comunicacion | Sí | |
| aprendizaje | {frecuencia_pausas_revision, retrospectiva_ref} | Sí | |
| perfil_modelos_mentales | lista<{integrante, modelo: enum(equipo\|orden y disciplina\|meta y resultados\|contexto)}> | No | Para armar equipos diversos (LA §5.6); privado |
| version | entero + motivo | — | |

**Cálculos, reglas y validaciones.** Nueva versión obligatoria ante cambio de encargo (ciclo Detecta → Reconfigura → Actualiza). Alerta si no hay protocolo de conflicto o reglas de decisión.

**Salidas.** Acuerdo de equipo. **Conexiones.** Entradas desde: `ficha-proyecto`, `diagnostico-equipo`, `matriz-raci`, `mapa-stakeholders`, `iceberg`. Alimenta a: `retrospectiva`, `micropracticas`, `matriz-raci`.

**Preguntas guía IA**
1. ¿Para qué existe este equipo y cómo sabremos que tuvimos éxito?
2. ¿Quién decide qué y qué reuniones tendremos?
3. ¿Qué reglas de funcionamiento acordamos (celulares, cámara, puntualidad)?
4. ¿Cómo manejaremos los conflictos y los incumplimientos?
5. ¿Qué tipo de retroalimentación queremos darnos?
6. ¿Con qué stakeholders críticos debemos relacionarnos y cómo?
7. ¿Cada cuánto nos detendremos a revisar cómo trabajamos?

**Origen.** CE §4.1, §4.2, §6 B, §8 M1, flujos 1 y 3; LA §5.6 (4 modelos mentales de gestión).

---

#### `micropracticas` — Microprácticas (macro → mini → micro)
*Categoría:* Equipo y liderazgo · *Prioridad:* P2 · *UI:* formulario

**Propósito y disparadores.** Convertir una intención de desarrollo (del equipo o personal) en una acción observable, acotada y de esta semana, con seguimiento y reflexión. Disparadores: "queremos comunicarnos mejor", "quiero escuchar más", "desarrollar una capacidad del equipo o de liderazgo".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| ambito | enum(equipo\|personal) | Sí | |
| capacidad_objetivo | texto / ref disciplina | Sí | |
| macro | texto | Sí | Intención |
| situacion_concreta | texto | Sí | "¿En qué situación de la semana aparece?" |
| mini | texto | Sí | Contexto y actores |
| micro | texto | Sí | Acción practicable |
| conexion_capacidad | texto | Sí | IM §7.3 fila 4 |
| que_observar_en_mi | texto | No | IM §7.4 |
| criterio_observable | texto | Sí | "Si alguien me mirara, ¿qué vería?" |
| reflexion_agendada | fecha-hora | Sí | 5 min |
| prueba_estres | lista<{categoria: enum(momento\|personas\|uno mismo\|contexto), pregunta, respuesta_ajuste}> | No | Preguntas estresoras (IM §5.8) |
| registro | lista<{fecha, hecho: bool, nota}> | — | Tracker de hábitos |
| reunion_ref | ref reunión recurrente | No | |
| ciclo | lista<{vuelta, meta, informacion, aplicacion, reflexion}> | No | Ciclo virtuoso de aprendizaje |

**Cálculos, reglas y validaciones.** Checklist del nivel micro: observable, acotado, realizable esta semana (bloquea guardar como "lista" si falla). Racha y frecuencia de ejecución; "frecuencia y consistencia importan más que intensidad". Recordatorio en la reunión vinculada.

**Salidas.** Ficha de micropráctica y tracker. **Conexiones.** Entradas desde: `diagnostico-equipo`, `logicas-accion`, `cuenta-credibilidad`, `mapa-creencias`, `bitacora-reflexion`. Alimenta a: `retrospectiva`, `bitacora-reflexion`.

**Preguntas guía IA**
1. ¿Qué capacidad quieres desarrollar, aunque suene grande o vaga?
2. ¿En qué situación concreta de tu semana aparece este problema?
3. ¿Qué UNA cosa específica puedes hacer distinto en esa situación esta semana?
4. ¿Cómo sabría alguien que lo hiciste?
5. ¿Qué vas a observar en ti mientras lo haces?
6. ¿Y si la reunión se cancela, la persona reacciona mal o te gana el impulso? ¿Cómo ajustas la práctica?
7. ¿Cuándo te detendrás 5 minutos a reflexionar?

**Origen.** CE §5.1, §6 C, §7, §8 M2; IM §2 S3, §5.6–5.8, §7.3, §7.4, §9-7, §9-8.

---

#### `gestion-cambio` — Plan de gestión del cambio
*Categoría:* Equipo y liderazgo · *Prioridad:* P2 · *UI:* tablero

**Propósito y disparadores.** Planificar la adopción de un cambio (BIM, nuevo sistema, nuevo proceso) a nivel individual (ADKAR), organizacional (8 pasos) y por actitudes. Disparadores: "resistencia al cambio", "el sistema nuevo no se usa", "transformación digital", "implantar un nuevo proceso".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| cambio | texto | Sí | |
| adkar | lista<{persona_o_grupo: ref:stakeholder, etapa_actual: enum(Awareness\|Desire\|Knowledge\|Ability\|Reinforcement), barrera, accion}> | No | |
| ocho_pasos | lista(8)<{paso: enum(urgencia\|coalición\|visión y estrategia\|comunicar visión\|empoderar acción\|victorias tempranas\|consolidar logros\|anclar en la cultura), estado: enum(no iniciado\|en curso\|logrado), evidencia, proxima_accion}> | No | |
| actitudes | lista<{stakeholder_ref, actitud: enum(resistente\|proclive), preocupaciones, involucramiento, rol_promotor, reconocimiento}> | No | Sincroniza con `mapa-stakeholders` |
| comunicacion | lista<{periodicidad, beneficio_a_mostrar, ejemplo_concreto, canal}> | No | |
| ingredientes | {historia_cambio, modelaje_rol, habilidades, mecanismos_formales} | No | 4 ingredientes del cambio (CE §4.7) |

**Cálculos, reglas y validaciones.** Avance de los 8 pasos = logrados / 8; alerta si se intenta "victorias tempranas" sin coalición ni visión. ADKAR es secuencial: aviso si la acción no corresponde a la etapa actual. Distribución de personas por etapa ADKAR.

**Salidas.** Tablero ADKAR, checklist de 8 pasos, mapa de actitudes, calendario de comunicación. **Conexiones.** Entradas desde: `mapa-stakeholders`, `inventario-recursos`, `diagnostico-bim`, `ssm`. Alimenta a: `mapa-stakeholders`, `valor-beneficios` (victorias tempranas medidas), `peb`.

**Preguntas guía IA**
1. ¿Qué cambio se está implementando y por qué es urgente ahora?
2. ¿Quiénes forman la coalición que lo lidera?
3. ¿Cuál es la visión y cómo se comunicará?
4. Para cada grupo: ¿entiende la necesidad, quiere participar, sabe cómo, puede hacerlo y lo sostiene?
5. ¿Quiénes se resisten, qué les preocupa y cómo los involucrarás?
6. ¿Quiénes pueden ser promotores?
7. ¿Qué victoria temprana mostrarás y cómo la medirás?

**Origen.** BIM §4, §5, §6.6, §8.1-9, flujo C; CE §3, §4.7 (ingredientes del cambio).

---

#### `autoridad-formal` — Autoevaluación de servicios de autoridad
*Categoría:* Equipo y liderazgo · *Prioridad:* P3 · *UI:* formulario

**Propósito y disparadores.** Revisar si el jefe de proyecto entrega dirección, orden y protección. Disparadores: "el equipo no tiene claro hacia dónde va", "faltan recursos o seguimiento", "conflictos con otras áreas sin respaldo".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| items | lista(9)<{servicio: enum(Dirección\|Orden\|Protección), item, evidencia, valoracion: escala(1–5), accion}> | Sí | Dirección: roles, metas, visión · Orden: normas, seguimiento de compromisos, recursos · Protección: escucha, intervención en conflictos, clima. Escala (complemento) |
| palanca_elegida | enum(autoridad formal\|credibilidad personal) + situacion | No | CE §5.4 |

**Cálculos, reglas y validaciones.** Promedio por servicio; alerta si un servicio < 3. Privado del usuario.

**Salidas.** Perfil de servicios y acciones. **Conexiones.** Alimenta a: `micropracticas`, `cuenta-credibilidad`.

**Preguntas guía IA**
1. ¿Tu equipo tiene roles, metas y visión claros?
2. ¿Haces seguimiento a los compromisos y aseguras recursos?
3. ¿Estás disponible para escuchar e intervienes en conflictos con otras áreas?
4. ¿Qué evidencia tienes de cada punto?
5. En la situación actual, ¿conviene usar autoridad formal o credibilidad personal?

**Origen.** CE §4.3, §5.4, §6 D, §8 M3.

---

#### `cuenta-credibilidad` — Cuenta de credibilidad (4 focos)
*Categoría:* Equipo y liderazgo · *Prioridad:* P3 · *UI:* formulario

**Propósito y disparadores.** Bitácora privada de depósitos y retiros de credibilidad por foco (integridad, intenciones, capacidades, resultados) y detección de incoherencias decir/hacer. Disparadores: "el equipo no me sigue", "perdí confianza".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| movimientos | lista<{fecha, foco: enum(Integridad\|Intenciones\|Capacidades\|Resultados), tipo: enum(depósito\|retiro), conducta}> | Sí | |
| incoherencias | lista<{principio_declarado, conducta_observada, sesgo: enum(exceso de confianza\|confirmación\|otro)}> | No | |
| acciones | lista<Acción> | No | |
| feedback_360 | lista | No | (complemento) |

**Cálculos, reglas y validaciones.** Saldo por foco = depósitos − retiros; alerta de "sobregiro" si el saldo < 0. Privado por defecto.

**Salidas.** Saldo por foco y acciones. **Conexiones.** Entradas desde: `autoridad-formal`. Alimenta a: `micropracticas`, `mapa-creencias`.

**Preguntas guía IA**
1. ¿Qué conductas recientes aumentaron la confianza de tu equipo en ti?
2. ¿Cuáles la disminuyeron?
3. ¿Qué principio declaras y en qué momento tu conducta no lo reflejó?
4. ¿En qué foco tienes el saldo más bajo?
5. ¿Qué harás distinto esta semana?

**Origen.** CE §4.4, §4.6, §5.5, §6 E, §8 M3.

---

#### `mapa-creencias` — Mapa de creencias y modelos mentales
*Categoría:* Equipo y liderazgo · *Prioridad:* P3 · *UI:* formulario

**Propósito y disparadores.** Explicitar creencias como reglas implícitas, de qué protegen, qué cuestan y ponerlas a prueba. Disparadores: "un buen jefe tiene todas las respuestas", "siempre lo hemos hecho así", "mentalidades del nivel inferior del Iceberg".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| creencias | lista<{creencia_raiz, regla_automatica, juicio_protector, emocion_bisagra, de_que_protege, costo, experimento, resultado_observado, tipo: enum(limitante\|habilitante)}> | Sí | Caja de protección mental (LA §5.6) + mapa de creencias (CE §6 F) |
| catalogo_ref | enum(modelos limitantes\|habilitantes del material) | No | 7 + 7 del LA §5.6 |

**Cálculos, reglas y validaciones.** Para cada nivel la IA plantea su pregunta clave: creencia raíz → ¿qué evidencia la contradice?; regla → ¿qué pasaría si no la aplico?; juicio → ¿de dónde viene?; emoción → ¿qué emoción aparece si cedo? Privado.

**Salidas.** Creencias explicitadas y experimentos. **Conexiones.** Entradas desde: `iceberg` (mentalidades), `cuenta-credibilidad`. Alimenta a: `micropracticas`, `bitacora-reflexion`.

**Preguntas guía IA**
1. ¿Qué regla no escrita guía tu conducta en esta situación?
2. ¿De qué te protege (quedar mal, perder control, parecer incompetente)?
3. ¿Qué te cuesta a ti y al equipo?
4. ¿Qué evidencia la contradice?
5. ¿Qué pequeño experimento podrías hacer para ponerla a prueba?

**Origen.** CE §4.5, §5.6, §6 F, §8 M3; LA §2 S2, §5.6.

---

#### `logicas-accion` — Lectura de lógicas de acción
*Categoría:* Equipo y liderazgo · *Prioridad:* P3 · *UI:* formulario

**Propósito y disparadores.** Identificar, con evidencia conductual, la lógica de acción dominante (propia o de actores) y su efecto en lo que se ve y se decide. Disparadores: "el líder resuelve incendios pero no pregunta por qué", "un experto no acepta otras soluciones", "evitamos el conflicto".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| sujeto | enum(yo\|actor del proyecto) + ref | Sí | Uso reflexivo, no evaluativo |
| caso | {situacion, actores, dilema} | Sí | |
| conductas | lista<{conducta_observable, evidencia}> | Sí | |
| logica_dominante | enum(Oportunista\|Diplomático\|Experto\|Realizador\|Individualista) | Sí | Estratega y Alquimista solo en lectura (complemento de contexto) |
| que_habilita / que_no_ve | texto | Sí | |
| lectura_contrafactual | texto | No | Qué haría una lógica más amplia |

**Cálculos, reglas y validaciones.** Catálogo de comportamientos por lógica (IM §5.4) como apoyo para la IA. Privado; prohibido exportar a evaluación de personas.

**Salidas.** Lectura de la lógica y aprendizaje. **Conexiones.** Entradas desde: `cynefin`, `retrospectiva`. Alimenta a: `micropracticas`, `mapa-stakeholders` (lógica percibida).

**Preguntas guía IA**
1. Describe la situación, los actores y el dilema central.
2. ¿Qué hizo concretamente el líder (decisiones, reacción ante problemas, manejo del conflicto)?
3. ¿Qué priorizó y qué ignoró?
4. ¿Qué lógica refleja esa conducta y qué le permitió ver o le impidió ver?
5. ¿Qué habría hecho distinto un líder con una lógica más amplia?

**Origen.** IM §2 S3, §3.2, §5.4, §6 (trabajo 3), §9-6.

---

#### `reunion-1a1` — Reunión 1:1 con foco relacional
*Categoría:* Equipo y liderazgo · *Prioridad:* P3 · *UI:* formulario

**Propósito y disparadores.** Agenda y registro de conversaciones periódicas jefe-integrante. Disparadores: "quiero mejorar la relación con mi equipo", "bajo compromiso".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| fecha / integrante | fecha / usuario | Sí | |
| check_in | texto | No | "¿Cómo estás hoy?" |
| problemas_resolucion | lista<{problema, resolucion_conjunta}> | No | |
| reconocimiento / pequeñas_victorias | texto | No | |
| necesidades_contexto_autonomia | texto | No | |
| feedback_hacia_jefe | texto | No | |
| compromisos | lista<Acción> | No | |
| cadencia | enum(semanal\|quincenal\|mensual) | Sí | |

**Cálculos, reglas y validaciones.** Recordatorio según cadencia. Contenido visible solo para ambos participantes. Formato 1:1 como tal: (complemento; campos derivados del material).

**Salidas.** Registro de 1:1 y compromisos. **Conexiones.** Alimenta a: `pulso-clima`, Acción.

**Preguntas guía IA**
1. ¿Cómo está hoy la persona?
2. ¿Qué problemas trae y cómo los resolverán juntos?
3. ¿Qué logro reconocerás?
4. ¿Qué necesita para organizar mejor su trabajo?
5. ¿Qué retroalimentación tiene para ti?

**Origen.** CE §3, §5.7, §6 G, §8 M4.

---

#### `pulso-clima` — Pulso de clima y autonomía
*Categoría:* Equipo y liderazgo · *Prioridad:* P3 · *UI:* formulario + tablero

**Propósito y disparadores.** Medir periódicamente la relación con la jefatura, satisfacción y autonomía. Disparadores: "rotación", "desmotivación".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| encuesta_ref | ref:constructor-encuestas (plantilla pulso_clima) | Sí | |
| relacion_jefatura | enum(muy buena\|bastante buena\|neutral\|bastante mala\|muy mala) | Sí | |
| satisfaccion | enum(5 niveles) | Sí | |
| autonomia | escala(0–10) | Sí | |
| felicidad | escala(0–10) | No | Opcional, con resguardos |

**Cálculos, reglas y validaciones.** Tendencia por equipo; benchmark "% que califica la relación como muy buena". Anonimato y mínimo de respuestas (complemento). Indicadores de resultado (rotación, satisfacción del cliente) solo como contexto, sin implicar causalidad.

**Salidas.** Tendencias de clima. **Conexiones.** Entradas desde: `constructor-encuestas`, `reunion-1a1`. Alimenta a: `retrospectiva`, `diagnostico-equipo`.

**Preguntas guía IA**
1. ¿Cada cuánto quieres medir el pulso?
2. ¿Quiénes responderán y cómo se garantizará el anonimato?
3. ¿Con qué otros indicadores quieres contrastarlo?
4. ¿Qué harás con los resultados?

**Origen.** CE §3, §6 H, §7, §8 M4.

---

#### `mapa-colaboracion` — Mapa de colaboración
*Categoría:* Equipo y liderazgo · *Prioridad:* P3 · *UI:* lienzo-diagrama

**Propósito y disparadores.** Grafo social en que cada persona lista con quién colabora y califica la calidad de esa colaboración, para decidir dónde empezar a mejorar. Disparadores: "silos", "cada uno trabaja por su lado".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| relaciones | lista<{de: usuario, con: usuario o área, calidad: escala(1–5)}> | Sí | Escala (complemento) |

**Cálculos, reglas y validaciones.** Grafo con grosor/color por calidad; relaciones con calidad ≤ 2 resaltadas; nodos aislados.

**Salidas.** Grafo y puntos de partida. **Conexiones.** Alimenta a: `canvas-equipo`, `retrospectiva`.

**Preguntas guía IA**
1. ¿Con quiénes colaboras regularmente?
2. ¿Qué tan buena es cada colaboración?
3. ¿Qué colaboración, si mejorara, tendría más efecto?

**Origen.** SCRUM §3.2, §5, §8.1-12.

---

#### `bitacora-reflexion` — Bitácora de dominio personal y reflexión
*Categoría:* Equipo y liderazgo · *Prioridad:* P3 · *UI:* formulario

**Propósito y disparadores.** Reflexión personal estructurada sobre la propia práctica y sobre decisiones concretas bajo presión. Disparadores: "quiero aprender de lo que hice", "después de un hito difícil".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| modo | enum(dominio personal\|reflexión post-hito) | Sí | |
| practicas | lista(5)<{practica: enum(autorreflexión y claridad de objetivos\|autoevaluación y aprendizaje\|autoconciencia y autodirección\|persistencia y resiliencia\|crecimiento personal y cambio), pregunta, respuesta}> | Si dominio personal | LA §6.4 |
| reflexion | {decision_concreta, dominio_real, logica_usada, informacion_privada_y_que_hice, situacion_similar_real, que_cambiaria_yo} | Si post-hito | IM §6 (4 preguntas) |

**Cálculos, reglas y validaciones.** Privada. La IA pide respuestas específicas (momento, decisión o persona concreta), no generalidades.

**Salidas.** Reflexión registrada. **Conexiones.** Entradas desde: `retrospectiva`, `mapa-creencias`. Alimenta a: `micropracticas`, `leccion-aprendida`.

**Preguntas guía IA**
1. ¿Qué aprendiste realmente en este periodo?
2. ¿Qué decisión concreta tomaste y cómo la justificabas?
3. ¿Qué información tenías que otros no tenían y qué hiciste con ella?
4. ¿Qué harías distinto tú (no el equipo)?
5. ¿Qué debes fortalecer?

**Origen.** LA §2 S2, §6.4, §8.1-7; IM §6 (reflexión individual), §9-9.

---

### 2.7 Conocimiento y cierre

#### `leccion-aprendida` — Registro de lecciones aprendidas
*Categoría:* Conocimiento y cierre · *Prioridad:* **P1** · *UI:* formulario + tabla (repositorio)

**Propósito y disparadores.** Convertir una experiencia analizada en conocimiento sustentado en evidencia, transferible y orientado a crear o proteger valor, almacenado en un repositorio consultable al planificar proyectos nuevos (identificar, documentar, analizar, almacenar, recuperar). Disparadores: "cierre de fase o proyecto", "no repetir el mismo error", "reinventamos la rueda", "después de un incidente", "retro con aprendizajes".

**Campos / modelo de datos**

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| titulo | texto | Sí | |
| categoria_experiencia | enum (taxonomía de `registro-problema`) | Sí | |
| foco_provisional | texto | No | "En proyectos donde ocurre ___, la experiencia muestra que ___, por lo que una lección aprendida relevante podría orientarse a ___" |
| contexto | texto largo | Sí | Cuándo y dónde, proyecto real |
| problema | texto largo / ref:registro-problema | Sí | Esperado vs. ocurrido |
| causas | texto largo + ref:ishikawa \| cinco-porques \| pareto \| iceberg | Sí | Causas, no síntomas |
| acciones | texto largo | Sí | Respuesta dada |
| resultados | texto largo | Sí | |
| si_entonces_porque | texto | Sí | "Si…, entonces…, porque…" |
| aprendimos_que | texto | Sí | Frase explícita |
| recomendaciones | lista<texto> | Sí | Concretas |
| condiciones_aplicacion | texto | Sí | Dónde aplica y límites |
| evidencia | lista<Evidencia> | Sí | |
| tabla_valor | lista(2–3)<{tipo_valor, crea_o_protege, stakeholders_afectados, que_mejora_o_evita, indicador_evidencia_esperada, comentarios}> | No | LA §6.8 |
| frase_valor | texto | No | "Esta lección, si se aplica en proyectos de tipo ___, permite (crear/proteger) valor en ___ para ___, porque ___" |
| checklist | lista(15)<{bloque: enum(A\|B\|C\|D\|E), pregunta, respuesta: bool}> | Sí | LA §6.7 |
| bitacora_cambios | lista<{antes_decia, lo_cambiaremos_por, mejora_bloque}> | No | Mínimo 3 cambios en la revisión |
| propuesta_valor_preliminar | {destinatario, necesidad, uso, beneficio_esperado, validacion_pendiente} | No | LA §6.9 |
| estado_revision | {diseno: enum(coherente\|con ajustes\|requiere reformulación\|no evaluable), investigacion: enum(planificada\|en ejecución\|con contraste\|no evaluable), valor: enum(por definir\|formulado preliminarmente\|con respaldo inicial\|no evaluable)} | No | 3 registros independientes (LA §7) |
| fase_origen | enum(cierre de fase\|cierre de proyecto\|incidente\|retrospectiva\|DMAIC paso 15) | Sí | |

**Cálculos, reglas y validaciones**
- Validador A–E: se requieren **≥ 3 "sí" en cada bloque B, C y D**; si no, la entrada queda marcada "relato, opinión o queja" y no se publica en el repositorio.
- La IA advierte culpas personales, obviedades o falta de evidencia; distingue beneficio esperado de evidencia.
- Búsqueda por categoría, tipo de proyecto y texto al crear o planificar un proyecto (recuperación).
- KPI de transferencia (complemento): nº de lecciones reutilizadas (vinculadas desde proyectos nuevos).

**Salidas.** Lección publicada en el repositorio, frase de valor. **Conexiones.** Entradas desde: `retrospectiva`, `ishikawa`, `cinco-porques`, `pareto`, `iceberg`, `a3-mejora`, `plan-control`, `triangulacion-evidencia`, `proyecto-dmaic`, `registro-experimentos`, `bitacora-reflexion`, `valor-beneficios`, `constructor-encuestas` (encuesta de cierre). Alimenta a: `ficha-proyecto` y `registro-riesgos` de proyectos nuevos (recomendaciones), `revision-pares`.

**Preguntas guía IA**
1. ¿En qué proyecto y momento ocurrió la experiencia?
2. ¿Qué se esperaba y qué ocurrió realmente?
3. ¿Cuáles fueron las causas (no los síntomas) y cómo las identificaste?
4. ¿Qué se hizo y qué resultado tuvo?
5. Completa: "Aprendimos que…". ¿Es algo específico y no obvio?
6. ¿En qué condiciones aplica y qué recomendarías concretamente a otro proyecto?
7. ¿Qué valor crea o protege (tiempo, costo, calidad, riesgo, satisfacción, capacidades) y para quién?
8. ¿Qué evidencia respalda la lección?

**Origen.** LA §2 S2, §2 S5a, §3.3, §6.5, §6.7–6.9, §7, §8.1-3, §8.2; SCRUM §7 (retro: lecciones aprendidas); SS §2 paso 15 (reunión de cierre); BIM §8.2 flujo E; CE §4.1 (aprendizaje del equipo).

---

#### `retrospectiva` — Retrospectiva / revisión post-hito
*Categoría:* Conocimiento y cierre · *Prioridad:* **P1** · *UI:* tablero

**Propósito y disparadores.** Detenerse regularmente a revisar cómo trabaja el equipo y acordar mejoras rastreables (fin de sprint, hito, fase o proyecto). Disparadores: "fin de sprint o fase", "las cosas no mejoran", "retros que no sirven", "después de una crisis".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| tipo | enum(sprint\|hito\|fase\|proyecto\|post-simulación) | Sí | |
| facilitador | usuario | Sí | En cierre de proyecto, distinto del gerente del proyecto (LA §3.3) |
| formato | enum(5 pasos\|3 preguntas\|reflexión sistémica\|libre) | Sí | Variar formatos (antipatrón de retros ritualizadas) |
| datos_recopilados | lista<{tipo: enum(dato objetivo\|percepción), texto}> | Sí | Pasos 1–2: preparar y recopilar (incluye métricas del sprint y encuestas) |
| tarjetas | lista<{columna: enum(qué salió bien\|qué salió mal\|qué se puede mejorar\|otro), texto, votos}> | Sí | |
| preguntas_sistemicas | {decision_clave, dominio_real, logica_usada, informacion_no_compartida} | No | IM §9-9 |
| acciones_mejora | lista<Acción> | Sí | Paso 4; pueden ir al siguiente Sprint Backlog |
| acciones_anteriores_revisadas | lista<{accion_ref, implementada: bool}> | Sí | Seguimiento |
| situaciones_anomalas | lista<texto> | No | |
| lecciones | lista<ref:leccion-aprendida> | No | |
| cierre | texto | No | Paso 5: círculo de preguntas y clausura |

**Cálculos, reglas y validaciones.** % de acciones de la retro anterior implementadas → `metricas-agiles`. Alerta "retros ritualizadas": mismos temas en 3 retros seguidas o 0 acciones (umbral complemento). Time-box según `sprint-scrum`.

**Salidas.** Acciones de mejora, aprendizajes. **Conexiones.** Entradas desde: `sprint-scrum`, `metricas-agiles`, `constructor-encuestas` (cierre de fase), `diagnostico-equipo`, `pulso-clima`, `micropracticas`, `registro-experimentos`. Alimenta a: `product-backlog`, `leccion-aprendida`, `diagnostico-antipatrones`, `canvas-equipo`, `bitacora-reflexion`.

**Preguntas guía IA**
1. ¿Qué periodo revisan y qué datos objetivos tenemos (velocidad, defectos, plazos)?
2. ¿Qué salió bien y queremos mantener?
3. ¿Qué salió mal o nos frenó?
4. ¿Qué podemos mejorar en el próximo ciclo? Elige 1–3 acciones con responsable.
5. ¿Se implementaron las acciones de la retro anterior?
6. ¿Hubo alguna decisión clave donde nos faltó información o leímos mal el contexto?

**Origen.** SCRUM §2 S3 (retrospectiva en 5 pasos), §2 S4 (antipatrón), §6, §7; LA §3.3 (3 preguntas, moderador); IM §9-9; CE §4.1 (aprendizaje), §8 M2.

---

#### `revision-pares` — Presentación y revisión entre pares
*Categoría:* Conocimiento y cierre · *Prioridad:* P3 · *UI:* formulario

**Propósito y disparadores.** Presentar con síntesis (10 min) un proyecto, propuesta o lección y recibir evaluación estructurada de pares. Disparadores: "presentar al comité", "validar una lección antes de publicarla", "comunidad de práctica".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| guion | {situacion_problema_oportunidad, objetivo, alcance_unidad_trabajo, etapas, entregables_plazo_recursos, resultado_cierre} | Sí | Distribución de tiempo 2/2/3/2/1 min |
| evaluaciones | lista<{evaluador, criterios: lista(6)<{criterio: enum(claridad del objetivo\|definición del alcance\|coherencia del abordaje\|entregables, plazos y recursos\|comunicación ejecutiva\|otro), valoracion, comentario_evidencia}>, fortaleza, pregunta_critica, recomendacion}> | No | Escala la define la organización |
| registros_cierre | {diseno, investigacion, valor} | No | Mismos enums que `leccion-aprendida.estado_revision` |
| accion | Acción | Sí | "Una acción con responsable y fecha" |

**Cálculos, reglas y validaciones.** Temporizador de 10 min; alerta "cadena lógica rota" si algún entregable no se vincula al objetivo. Se evalúan razonamiento y trazabilidad, sin premiar resultados adelantados.

**Salidas.** Retroalimentación y acción. **Conexiones.** Entradas desde: `leccion-aprendida`, `ficha-proyecto`, `perfil-solucion`. Alimenta a: `leccion-aprendida`.

**Preguntas guía IA**
1. ¿Cuál es la situación y el objetivo, en una frase cada uno?
2. ¿Cuál es el alcance y la unidad de trabajo?
3. ¿Qué etapas, entregables, plazo y recursos propones?
4. ¿Se entiende sin información adicional?
5. (Evaluador) ¿Cuál es la principal fortaleza y la pregunta más crítica?

**Origen.** LA §2 S4 (mini congreso), §2 S5b, §5.7, §6.12, §7, §8.1-10.

---

#### `carta-patrocinio` — Carta de interés y compromiso del patrocinador
*Categoría:* Conocimiento y cierre · *Prioridad:* P3 · *UI:* formulario

**Propósito y disparadores.** Formalizar el interés y los compromisos de una organización patrocinadora o contraparte (p. ej. para un caso de lecciones aprendidas o un proyecto con un área externa). Disparadores: "necesito el compromiso formal del sponsor", "acceso a información y personas". **Advertencia:** documento con efectos formales; su emisión y firma deben pasar por el flujo interno de aprobación (y revisión legal si corresponde). La plataforma solo genera un borrador.

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| organizacion / lugar_fecha / destinatario | texto / texto+fecha / texto | Sí | |
| firmante_cargo | texto | Sí | |
| titulo_trabajo | texto | Sí | |
| participantes | lista<texto> | Sí | |
| fundamento_interes | texto largo | Sí | Razones, relación, importancia, expectativas |
| compromisos | lista<{compromiso: enum(participación\|entrega de información\|coordinación\|facilidades para encuestas, entrevistas y pruebas\|aceptación del contenido\|participación en presentación final\|difusión interna\|otro), cumplido: bool}> | Sí | |
| contraparte | {nombre_o_rol, cargo, contacto} | Sí | Datos personales mínimos |
| estado_aprobacion | enum(borrador\|en aprobación interna\|aprobada\|firmada) | Sí | |

**Cálculos, reglas y validaciones.** No pasa a "firmada" sin registro de aprobación interna. Seguimiento del cumplimiento de compromisos.

**Salidas.** Borrador de carta y checklist de compromisos. **Conexiones.** Entradas desde: `ficha-proyecto`, `mapa-stakeholders`. Alimenta a: `mapa-stakeholders`.

**Preguntas guía IA**
1. ¿Qué organización patrocina y quién firmaría?
2. ¿Sobre qué trabajo y con qué participantes?
3. ¿Por qué le interesa a la organización y qué espera?
4. ¿Qué compromisos concretos asume?
5. ¿Quién será la contraparte y qué aprobación interna se requiere?

**Origen.** LA §6.13, §8.1-11.

---

### 2.8 BIM

#### `diagnostico-bim` — Diagnóstico de equipo y madurez BIM
*Categoría:* BIM · *Prioridad:* P3 · *UI:* formulario + tablero

**Propósito y disparadores.** Línea base de perfiles, experiencia, software, desafíos e impactos del equipo/ecosistema BIM y de la madurez digital. Disparadores: "inicio de proyecto o programa BIM", "¿estamos preparados para BIM?".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| participantes | lista<{rubro, rol, experiencia_bim: enum(ninguna\|básica\|intermedia\|avanzada), software: lista<texto>, principal_desafio: texto}> | Sí | Encuesta (BIM §6.1); niveles de experiencia: (complemento) |
| impactos | lista(9)<{consecuencia, presente: bool}> | No | Retrabajo/sobrecostos, plazos, decisiones tardías, búsqueda de información, control de costos/avance, recursos críticos, aprendizaje organizacional, riesgo contractual/calidad, barrera a la innovación |
| madurez | lista<{pilar, puntaje}> | No | Inspirado en un scanner de transformación digital; escala no detallada en el material |
| nivel_digitalizacion | enum(CAD\|3D\|BIM\|CDE\|gemelo digital) | No | |

**Cálculos, reglas y validaciones.** Distribución de roles, experiencia y software; nube de desafíos; puntaje por pilar y comparación con el portafolio.

**Salidas.** Tablero de diagnóstico. **Conexiones.** Entradas desde: `constructor-encuestas`. Alimenta a: `ishikawa` (plantilla BIM), `peb`, `gestion-cambio`.

**Preguntas guía IA**
1. ¿Qué roles y rubros participan en el proyecto?
2. ¿Qué experiencia BIM y qué software usa cada uno?
3. ¿Cuál es el principal desafío para implementar BIM en tu entorno?
4. ¿Cuáles de estas consecuencias sufren hoy (retrabajo, atrasos, decisiones tardías…)?
5. ¿Qué nivel de digitalización tiene hoy el proyecto?

**Origen.** BIM §2 (diagnóstico del curso), §5, §6.1, §6.3, §8.1-2.

---

#### `peb` — Plan de Ejecución BIM (PEB)
*Categoría:* BIM · *Prioridad:* P2 · *UI:* formulario (asistente secuencial)

**Propósito y disparadores.** Formalizar objetivos BIM alineados a problemas del cliente, usos BIM, responsables, información, entregas, estándares, CDE, coordinación y KPIs. Disparadores: "proyecto BIM nuevo", "requisitos de información del mandante (EIR) poco claros", "cada disciplina modela a su manera".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| problemas_cliente | lista<texto> | Sí | |
| eir_ref | texto / archivo | Sí | Evita la causa 1 del Ishikawa BIM |
| objetivos_bim | lista<{objetivo, problema_ref}> | Sí | |
| usos_bim | lista<{uso, objetivo_ref}> | Sí | |
| matriz_info_ref | ref:matriz-raci (modo quién-qué-cuándo) | Sí | Roles, información, momentos de entrega |
| estandares | {lod, ndi, codificacion_clasificacion} | Sí | |
| formatos_intercambio | lista<enum(IFC\|BCF\|otro)> | Sí | |
| cde | texto / ref:cde-ligero | Sí | |
| plan_coordinacion | {frecuencia_sesiones, participantes} | Sí | |
| kpis_valor | lista<Indicador> | Sí | % reducción de costos por detección temprana de interferencias, % ahorro de tiempo en estimación, % trazabilidad de decisiones en el CDE |
| adicionales | {hitos, MIDP_TIDP, control_calidad, software_versiones, requisitos_as_built} | No | (complemento) |
| version / aprobacion | entero / Decisión | Sí | |

**Cálculos, reglas y validaciones.** Cada objetivo BIM debe responder a un problema del cliente; cada uso BIM a un objetivo (trazabilidad). No se aprueba sin EIR vinculado ni KPIs con línea base.

**Salidas.** PEB versionado y aprobado. **Conexiones.** Entradas desde: `diagnostico-bim`, `ishikawa` (BIM), `ficha-proyecto`, `mapa-stakeholders`, `valor-beneficios`. Alimenta a: `matriz-raci`, `cronograma-gantt`, `coordinacion-bim`, `cde-ligero`, `entrega-operacion`.

**Preguntas guía IA**
1. ¿Qué problemas del mandante debe resolver el uso de BIM?
2. ¿Qué requisitos de información entregó el mandante?
3. ¿Qué objetivos BIM y qué usos BIM se derivan?
4. ¿Quién produce qué información y cuándo se entrega?
5. ¿Qué nivel de desarrollo, codificación y formatos de intercambio usarán?
6. ¿Dónde se almacenará y aprobará la información?
7. ¿Cada cuánto habrá sesiones de coordinación y qué KPIs demostrarán el valor?

**Origen.** BIM §4, §5, §6.4, §8.1-4, §8.1-5, flujo A.

---

#### `coordinacion-bim` — Coordinación BIM e incidencias
*Categoría:* BIM · *Prioridad:* P3 · *UI:* tabla + tablero

**Propósito y disparadores.** Agendar sesiones de coordinación interdisciplinaria, registrar conflictos detectados en modelos federados y seguirlos hasta su cierre. Disparadores: "interferencias detectadas tarde en obra", "disciplinas trabajando aisladas".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| sesiones | lista<{fecha, disciplinas, modelos_version: lista<texto>}> | Sí | |
| conflictos | lista<{sesion_ref, descripcion, ubicacion, disciplinas, solucion_acordada, responsable, plazo, estado: enum(abierto\|en curso\|resuelto)}> | Sí | Exportable a BCF (complemento) |
| validacion_modelos | lista<{modelo, version, validado: bool, observaciones}> | No | |

**Cálculos, reglas y validaciones** (KPIs complemento): conflictos detectados/resueltos por sesión; tiempo medio de cierre; % entregables aprobados en primera revisión. Conflictos vencidos resaltados; envío a `tablero-kanban`.

**Salidas.** Actas y registro de incidencias. **Conexiones.** Entradas desde: `peb`, `cde-ligero`. Alimenta a: `tablero-kanban`, `valor-beneficios`, `cde-ligero` (decisiones).

**Preguntas guía IA**
1. ¿Qué disciplinas y versiones de modelos se revisan?
2. ¿Qué conflictos se detectaron, dónde y entre qué disciplinas?
3. ¿Qué solución se acordó, quién la ejecuta y para cuándo?
4. ¿Qué conflictos de sesiones anteriores siguen abiertos?

**Origen.** BIM §2 S2, §5, §6.5, §7, §8.1-7, flujo B.

---

#### `cde-ligero` — Repositorio tipo CDE ligero
*Categoría:* BIM · *Prioridad:* P3 · *UI:* tabla

**Propósito y disparadores.** Fuente única de documentos y referencias a modelos con revisión, aprobación, versionado y registro de decisiones trazables (no reemplaza un CDE de modelos; puede integrarse). Disparadores: "información dispersa", "baja trazabilidad de decisiones", "¿cuál es la versión vigente?".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| contenedores | lista<{nombre, tipo: enum(documento\|modelo\|plano\|otro), disciplina, version, estado: enum(en curso\|compartido\|publicado\|archivado), autor, aprobador, fecha, enlace_o_archivo}> | Sí | Estados: (complemento, ISO 19650) |
| decisiones | lista<Decisión + {contenedor_ref}> | No | |

**Cálculos, reglas y validaciones.** Solo una versión "publicada" vigente por contenedor; transición a publicado requiere aprobador. % decisiones trazadas en el CDE → KPI del PEB.

**Salidas.** Repositorio y bitácora de decisiones. **Conexiones.** Entradas desde: `peb`, `coordinacion-bim`. Alimenta a: `coordinacion-bim`, `entrega-operacion`, `valor-beneficios`.

**Preguntas guía IA**
1. ¿Qué tipos de información deben quedar en el repositorio?
2. ¿Quién aprueba la publicación de cada tipo?
3. ¿Qué decisiones deben quedar trazadas?
4. ¿Se integrará con un CDE de modelos existente?

**Origen.** BIM §4, §8.1-6.

---

#### `entrega-operacion` — Checklist de entrega a operación (as-built)
*Categoría:* BIM · *Prioridad:* P3 · *UI:* formulario

**Propósito y disparadores.** Asegurar que el activo se entregue con modelo validado e información suficiente para operar y mantener. Disparadores: "cierre de obra", "operación desconectada del diseño", "as-built incompleto".

| Campo | Tipo | Oblig. | Notas |
|---|---|---|---|
| items | lista<{item: enum(modelo validado\|as-built validado\|información para operar y mantener\|integración BMS/FM/CMMS/IoT\|documentación trazable\|otro), cumplido: bool, evidencia_ref, responsable}> | Sí | |
| leccion_ref | ref:leccion-aprendida | No | |

**Cálculos, reglas y validaciones.** % de ítems cumplidos; no se cierra el proyecto BIM con ítems obligatorios pendientes (configurable).

**Salidas.** Acta de entrega. **Conexiones.** Entradas desde: `peb`, `cde-ligero`. Alimenta a: `leccion-aprendida`.

**Preguntas guía IA**
1. ¿El modelo final y el as-built están validados?
2. ¿Qué información necesita el operador para mantener el activo?
3. ¿Qué sistemas de operación deben integrarse?
4. ¿Qué lecciones deja el proyecto BIM?

**Origen.** BIM §2 (causa 6 del Ishikawa), §8.1-12, flujo E.

---

## 3. Mapa de flujos entre herramientas

Cada flujo es una ruta recomendada que el asistente propone; el usuario puede saltar pasos. Las flechas indican que la salida de una herramienta pre-llena la siguiente (vínculos `ref:*`). Entre corchetes, condiciones de bifurcación.

### F1 — Problema recurrente → causa raíz → mejora sostenida → lección
```
registro-problema → triage-lineal-sistemico → cynefin
   [sistémico / complejo]  → iceberg → registro-experimentos → retrospectiva
   [lineal / complicado]   → ishikawa ⇄ cinco-porques → pareto (estratificación, 2.º nivel)
→ a3-mejora (bloques 1–5) → plan-control (bloque 6) → leccion-aprendida (checklist A–E, frase de valor)
```
Reglas: si el problema se repite, el Iceberg es obligatorio antes de proponer acciones; las acciones del A3 deben trazarse a causas validadas con evidencia o Pareto. Origen: LA §8.2 ("de incidente a lección"), IM §9, LEAN §8.4.

### F2 — Estrategia → portafolio → proyecto → entrega ágil
```
pestle + cinco-fuerzas + inventario-recursos → foda → tows
→ hoshin-kanri (pilares → objetivos) → a3-estrategico (KR) → portafolio-proyectos (comité Go/No-Go)
→ ficha-proyecto → cynefin (enfoque)
   [ágil]       → vision-producto → product-backlog → estimacion-agil → roadmap-lanzamiento
                  → sprint-scrum ⇄ tablero-kanban → metricas-agiles → retrospectiva ↺
   [predictivo] → matriz-raci → cronograma-gantt → registro-riesgos
→ hoshin-scorecard (contribución hacia arriba: avance de KR)
```
Origen: LEAN §8.4 (planificación anual), SCRUM §8.2 (flujos de inicio, backlog y sprint), BA §7 B.

### F3 — Proyecto DMAIC con compuertas (TG-D … TG-C)
```
D  ficha-proyecto (charter) → voc-ccr (un CCR, Y) → sipoc                          ▶ TG-D
M  vsm (mapa detallado) → plan-medicion (n) → msa-gage-rr → grafica-control
   → capacidad-proceso / calculadora-sigma (línea base)                             ▶ TG-M
A  ishikawa (6M) + lluvia-ideas → pareto → analisis-estadistico (validar Xs)
   → valor-beneficios (cuantificar oportunidad)                                     ▶ TG-A
I  lluvia-ideas → matriz-priorizacion (esfuerzo-impacto, criterios múltiples) → matriz-pugh
   → plan-piloto → fmea (de la solución) → analisis-estadistico (antes/después, δ/σ) ▶ TG-I
C  cronograma-gantt (escala total) → msa-gage-rr (Xs críticas) → plan-control
   → grafica-control (límites nuevos) → valor-beneficios (12 meses) → leccion-aprendida ▶ TG-C
```

| Compuerta | Criterios de salida (checklist en `proyecto-dmaic`) | Aprobadores |
|---|---|---|
| **TG-D** | Problema sin causas ni soluciones; objetivo SMART; un solo CCR / una Y; alcance dentro/fuera explícito; plan ≤ 6 meses; equipo y dedicación definidos; SIPOC con 5–6 pasos y límites | Champion + Coach |
| **TG-M** | Definición operacional aprobada; n recolectado ≥ n requerido; datos cubren el rango esperado; MSA aceptable (< 10 % de variación de estudio, o 10–30 % con justificación de riesgo); estabilidad evaluada; línea base (σ, DPMO, Cpk) registrada en el charter | Coach + Champion |
| **TG-A** | Cada X crítica validada con datos (p < 0,05 o evidencia equivalente) y vinculada a la Y; Xs no validadas descartadas; oportunidad cuantificada y revisada por el contralor; decisión registrada: continuar / modificar alcance / detener | Champion + Contralor |
| **TG-I** | Solución trazada a Xs validadas; piloto con criterios de éxito cumplidos; mejora estadística (p < 0,05) y prácticamente relevante; FMEA sin RPN altos abiertos sin acción (umbral configurable), acciones con responsable; costo/beneficio aprobado | Champion + Dueño del proceso + Contralor |
| **TG-C** | Proceso estable y capaz; plan de control con dueño, frecuencia y plan de reacción; MSA de Xs críticas aceptable; capacitación y documentación entregadas; dueño del proceso acepta la transferencia; beneficios validados (seguimiento 12 meses activado); reunión de cierre documentada | Champion + Dueño del proceso + Contralor |

Cada compuerta congela una versión del charter. Las compuertas son orientativas y su adopción formal requiere aprobación del gobierno de proyectos de la organización. Origen: SS §2, §8.2.

### F4 — Iniciativa de negocio → requisitos → backlog
```
registro-problema / ficha-proyecto (6 conceptos clave)
→ pestle + cinco-fuerzas → inventario-recursos → foda → tows → matriz-ansoff
→ analisis-brechas (actual → futuro) → perfil-solucion → portafolio-proyectos
→ mapa-stakeholders → plan-elicitacion
   → guion-entrevista | constructor-encuestas | plan-observacion | analisis-documental | lluvia-ideas
→ repositorio-requisitos (negocio → stakeholder → solución → transición; trazabilidad)
→ bpmn (proceso as-is / to-be) + casos-uso → product-backlog (HU con criterios de aceptación)
→ valor-beneficios (evaluación de la solución en operación)
```
Origen: BA §7 A–F; SCRUM §8.2.

### F5 — Proceso lento o con desperdicio (Lean)
```
hoshin-kanri (iniciativa táctica sobre un proceso, opcional) → sipoc
→ plan-observacion (tiempos) → vsm (actual: takt, PLT, PCE, restricción)
→ pareto (tiempos de espera / desperdicios) → lluvia-ideas → matriz-priorizacion (quick wins)
→ vsm (futuro, complemento) → a3-mejora → perfil-solucion (comité Go/No-Go)
→ plan-piloto → plan-control → hoshin-scorecard (KR) → leccion-aprendida
```
Origen: LEAN §8.4 ("de la estrategia a la mejora"); SS §2 (enfoque de 6 pasos: VSM actual → Pareto de esperas → VSM futuro → solución a prueba de errores).

### F6 — Situación no estructurada con múltiples actores (SSM)
```
registro-problema → triage-lineal-sistemico [sistémico] → ssm (pasos 1–3: situación, rich picture, CATWOE)
→ mapa-stakeholders → ssm (paso 4: modelo conceptual) → analisis-brechas (matriz GAP)
→ triangulacion-evidencia (proposiciones falsables, ≥ 2 fuentes)
→ matriz-priorizacion (impacto × factibilidad: portafolio de cambios)
→ cronograma-gantt + gestion-cambio (plan de implementación) → valor-beneficios (KPIs) → leccion-aprendida
```
Origen: LA §8.2 ("problema no estructurado"), §5.4, §5.5.

### F7 — Kick-off y desarrollo del equipo
```
ficha-proyecto (comisión clara) → canvas-equipo (clarificar, co-crear) → matriz-raci
→ mapa-stakeholders (conectar) → diagnostico-equipo (12 ítems, disciplina foco)
→ micropracticas (macro → mini → micro + preguntas estresoras) → retrospectiva (aprendizaje) ↺
[cambio de encargo] → ficha-proyecto (nueva versión) → canvas-equipo (Reconfigura) → mapa-stakeholders (Actualiza)
[líder, trimestral] → autoridad-formal → cuenta-credibilidad → mapa-creencias → logicas-accion → micropracticas
[cadencia relacional] → reunion-1a1 → pulso-clima (trimestral) → retrospectiva
```
Origen: CE §8 (flujos 1–5); IM §9-7, §9-8.

### F8 — Proyecto BIM de punta a punta
```
ficha-proyecto (tipo BIM) → diagnostico-bim → ishikawa (plantilla gestión de la información)
→ valor-beneficios (propuesta de valor al mandante, KPIs con línea base)
→ peb (problemas → objetivos BIM → usos → q-q-c → estándares → CDE → coordinación → KPIs)
→ matriz-raci (quién-qué-cuándo) → cronograma-gantt
→ cde-ligero ⇄ coordinacion-bim → tablero-kanban (incidencias) ↺
→ entrega-operacion → leccion-aprendida
[adopción organizacional] → diagnostico-bim (madurez) → gestion-cambio (8 pasos, ADKAR, actitudes) → valor-beneficios (victorias tempranas)
```
Origen: BIM §8.2 (flujos A–E).

---

## 4. Matriz síntoma / necesidad → herramientas recomendadas

Uso por el motor de recomendación: la IA clasifica el mensaje del usuario en una o más filas (por intención y palabras clave), propone la **primera herramienta** y la **secuencia**, y explica por qué. Si hay varias filas candidatas, prioriza la que tenga `registro-problema` o `cynefin` como entrada cuando el problema no esté definido. Las palabras clave son orientativas (sinónimos y variantes deben resolverse semánticamente).

| # | Síntoma / necesidad del usuario | Señales y palabras clave | Primera herramienta | Secuencia recomendada | Condiciones / notas |
|---|---|---|---|---|---|
| 1 | Tengo un problema pero no sé bien cuál es | "algo no funciona", "no sé por dónde empezar" | `registro-problema` | → `triage-lineal-sistemico` → `cynefin` | Siempre como entrada si no hay enunciado |
| 2 | El mismo problema vuelve a ocurrir | "otra vez", "de nuevo", "siempre pasa", "recurrente" | `iceberg` | `registro-problema` → `iceberg` → `ishikawa` → `pareto` → `a3-mejora` → `plan-control` | F1; alertar si las acciones quedan a nivel de evento |
| 3 | Quiero encontrar la causa raíz de un defecto, incidente o desvío | "¿por qué?", "causa", "falla", "incidente" | `ishikawa` | → `cinco-porques` → `pareto` → `a3-mejora` | Si es crónico y medible, considerar `proyecto-dmaic` |
| 4 | Hay muchas causas o tipos de problema; no sé cuál atacar primero | "muchos reclamos", "varios tipos", "priorizar causas" | `pareto` | `plan-medicion` (hoja de verificación) → `pareto` → `pareto` 2.º nivel | Exige datos; si no hay, `plan-medicion` primero |
| 5 | Ya probamos varias soluciones y nada funciona; cada área lo explica distinto | "más control no sirvió", "cada uno tiene su versión" | `triage-lineal-sistemico` | → `iceberg` → `cynefin` (por componentes) → `registro-experimentos` | Dominio probablemente complejo |
| 6 | No sé qué enfoque usar (predictivo, ágil o híbrido) | "metodología", "¿Scrum o cascada?" | `cynefin` | → `ficha-proyecto` → F2 | Modo "proyecto completo" |
| 7 | Crisis: hay que actuar ya | "urgente", "caída", "emergencia", "contingencia" | `cynefin` | (caótico: estabilizar) → `registro-problema` (línea de tiempo) → `retrospectiva` → `leccion-aprendida` | Recomendar acción inmediata antes de análisis |
| 8 | Inicio un proyecto nuevo | "nuevo proyecto", "kick-off", "arrancar" | `ficha-proyecto` | → `mapa-stakeholders` → `matriz-raci` → `canvas-equipo` → `registro-riesgos` | P1 de entrada |
| 9 | No está claro quién decide o quién hace qué | "nadie se hace cargo", "quién decide", "tareas duplicadas" | `matriz-raci` | → `canvas-equipo` (reglas de decisión) | |
| 10 | Un área o persona clave se resiste o no colabora | "resistencia", "bloquea", "no apoya", "conflicto entre áreas" | `mapa-stakeholders` | → `gestion-cambio` → `logicas-accion` (opcional, privado) | |
| 11 | Los proyectos no están alineados con la estrategia | "estrategia", "objetivos anuales", "OKR", "alinear" | `hoshin-kanri` | → `a3-estrategico` → `portafolio-proyectos` → `hoshin-scorecard` | F2 |
| 12 | Tengo demasiados proyectos o ideas y debo elegir | "portafolio", "priorizar proyectos", "cartera" | `portafolio-proyectos` | `perfil-solucion` → `matriz-priorizacion` → comité Go/No-Go | |
| 13 | Necesito entender el entorno o el mercado antes de decidir | "mercado", "competencia", "regulación", "diagnóstico estratégico" | `pestle` | → `cinco-fuerzas` → `inventario-recursos` → `foda` → `tows` → `matriz-ansoff` | F4 |
| 14 | Diagnóstico rápido de fortalezas y debilidades | "FODA", "fortalezas", "dónde estamos" | `foda` | → `tows` | |
| 15 | No sabemos qué necesitan realmente los usuarios o clientes | "requisitos", "el usuario no sabe lo que quiere", "levantar necesidades" | `plan-elicitacion` | → `guion-entrevista` / `constructor-encuestas` / `plan-observacion` → `repositorio-requisitos` | |
| 16 | Los requisitos cambian o están mal definidos | "cambios de alcance", "requisitos ambiguos" | `repositorio-requisitos` | → `casos-uso` → `product-backlog` | Si cambian por naturaleza, sugerir `cynefin` (ágil) |
| 17 | El cliente se queja pero no sabemos qué medir | "reclamos", "NPS bajo", "insatisfacción", "devoluciones" | `voc-ccr` | `constructor-encuestas` (NPS/ISC) → `voc-ccr` → `plan-medicion` → `pareto` | |
| 18 | El proceso es lento; los clientes esperan demasiado | "demora", "cuello de botella", "tiempo de ciclo", "colas" | `vsm` | `sipoc` → `vsm` → `pareto` → `lluvia-ideas` → `a3-mejora` → `plan-control` | F5 |
| 19 | No sabemos cómo es realmente el proceso | "nadie sabe cómo se hace", "documentar proceso", "automatizar" | `bpmn` | `sipoc` → `bpmn` (as-is) → `vsm` | |
| 20 | Alta variación o muchos defectos; necesitamos decidir con datos | "variabilidad", "defectos", "fuera de especificación", "calidad" | `proyecto-dmaic` | F3 completo | Si el problema es simple y la solución conocida, usar `a3-mejora` |
| 21 | ¿Nuestro proceso cumple la especificación? ¿Qué tan bueno es? | "Cpk", "sigma", "DPMO", "tolerancia" | `calculadora-sigma` | `plan-medicion` → `msa-gage-rr` → `grafica-control` → `capacidad-proceso` | |
| 22 | No confiamos en los datos o en cómo se mide | "cada uno mide distinto", "datos incompletos" | `plan-medicion` | → `msa-gage-rr` | |
| 23 | La mejora no se sostiene; volvimos a lo de antes | "se perdió la mejora", "recaída" | `plan-control` | `grafica-control` → `plan-control` (plan de respuesta) → `iceberg` (si persiste) | |
| 24 | Vamos a implementar una solución y tememos que falle | "riesgo de la implementación", "piloto", "lanzamiento" | `fmea` | → `plan-piloto` → `plan-control` | |
| 25 | Varias soluciones posibles; ¿cuál elegimos? | "alternativas", "opciones", "elegir solución" | `matriz-priorizacion` | `lluvia-ideas` → `matriz-priorizacion` → `matriz-pugh` → `plan-piloto` | |
| 26 | Muchas tareas y prioridades cambiantes; no vemos el avance | "caos de tareas", "no sé en qué está cada cosa" | `tablero-kanban` | → `product-backlog` → `sprint-scrum` → `metricas-agiles` | |
| 27 | ¿Cuándo terminamos? ¿Vamos a llegar? | "fecha de entrega", "atraso", "pronóstico" | `metricas-agiles` | `estimacion-agil` → `roadmap-lanzamiento` (ágil) / `cronograma-gantt` (predictivo) | |
| 28 | "Hacemos Scrum" pero no funciona | "daily eterna", "retros inútiles", "PO ausente" | `diagnostico-antipatrones` | → `retrospectiva` (formato distinto) | |
| 29 | El equipo no rinde, calla lo que piensa o no confía | "equipo", "desmotivación", "no hay confianza", "silos" | `diagnostico-equipo` | → `canvas-equipo` → `micropracticas` → `retrospectiva` | Datos sensibles: anonimato |
| 30 | Quiero mejorar como líder del proyecto | "liderazgo", "mi equipo no me sigue", "credibilidad" | `autoridad-formal` | → `cuenta-credibilidad` → `mapa-creencias` → `logicas-accion` → `micropracticas` | Privado del usuario |
| 31 | Implementamos un cambio (sistema, proceso, BIM) y la gente no lo adopta | "no lo usan", "adopción", "transformación digital" | `gestion-cambio` | `iceberg` → `gestion-cambio` → `mapa-stakeholders` → `valor-beneficios` | Caso "tablero que no despega" (IM §6) |
| 32 | Situación confusa con muchos actores e intereses en conflicto | "cada uno quiere algo distinto", "no está claro el problema" | `ssm` | F6 | |
| 33 | Debemos demostrar con evidencia una causa o un riesgo | "auditoría", "regulador", "demostrar", "hipótesis" | `triangulacion-evidencia` | `cinco-porques` → `triangulacion-evidencia` → `plan-medicion` | |
| 34 | Cierre de fase o de proyecto | "cierre", "terminamos", "post mortem" | `retrospectiva` | → `constructor-encuestas` (cierre de fase) → `leccion-aprendida` → `valor-beneficios` | |
| 35 | No queremos repetir errores de proyectos anteriores | "ya nos pasó", "reinventar la rueda" | `leccion-aprendida` (búsqueda) | → `registro-riesgos` → `ficha-proyecto` | Recuperación al planificar |
| 36 | Debemos demostrar el valor o los beneficios del proyecto | "ROI", "beneficios", "justificar", "valor" | `valor-beneficios` | `ficha-proyecto` → `valor-beneficios` → `hoshin-scorecard` | Validación financiera por contralor |
| 37 | Proyecto de construcción/BIM con información dispersa o conflictos entre disciplinas | "BIM", "interferencias", "modelos", "as-built" | `peb` | F8 | |
| 38 | Necesitamos ideas | "ideas", "creatividad", "brainstorming" | `lluvia-ideas` | → `matriz-priorizacion` | |
| 39 | Nuevo producto o servicio | "producto", "MVP", "visión" | `vision-producto` | `foda` → `vision-producto` → `product-backlog` | |
| 40 | Necesito aprobación o compromiso formal del patrocinador | "sponsor", "carta", "compromiso" | `ficha-proyecto` | → `carta-patrocinio` (borrador; aprobación interna) | |

---

## 5. Six Sigma

La ficha `conocimiento/08_six_sigma.md` quedó integrada en este catálogo con deduplicación; no existe una sección aparte de herramientas Six Sigma. Correspondencia:

| Contenido Six Sigma | Herramienta del catálogo |
|---|---|
| Proceso DMAIC de 15 pasos, roles y compuertas | `proyecto-dmaic` (+ flujo F3) |
| Project Charter / Resumen ejecutivo | `ficha-proyecto` (fusionado) |
| VOC/VOB → CCR/CBR y Elementos Y | `voc-ccr` |
| SIPOC | `sipoc` (fusionado con PEPSU de LA) |
| Mapa de cadena de valor / mapa detallado | `vsm` (fusionado con LEAN) |
| Plan de medición, matriz de estratificación, definición operacional, hoja de verificación, tamaño de muestra | `plan-medicion` |
| MSA / Gage R&R | `msa-gage-rr` (criterio corregido) |
| Estadística descriptiva, 2-Sample t, regresión, delta/sigma | `analisis-estadistico` (delta/sigma corregido) |
| Gráficas de control y matriz de ataque a la variación | `grafica-control` |
| Cp, Cpk | `capacidad-proceso` |
| DPU, DPO, DPMO, nivel σ, YFT, RTY | `calculadora-sigma` |
| Pareto | `pareto` (fusionado) |
| Ishikawa 6M | `ishikawa` (fusionado) |
| Lluvia de ideas (guiada, 3×3×3, antisolución, grupo silencioso) | `lluvia-ideas` (fusionado) |
| Matriz esfuerzo-impacto y matriz de criterios múltiples | `matriz-priorizacion` (fusionado) |
| Matriz Pugh | `matriz-pugh` |
| Plan de implementación del piloto | `plan-piloto` |
| FMEA | `fmea` (RPN corregido) |
| Plan de control (3 bloques + formato tipo AIAG) | `plan-control` (fusionado con LEAN) |
| Cuantificar la oportunidad, costo/beneficio, beneficios a 12 meses | `valor-beneficios` (fusionado) |
| Reunión de cierre y lecciones | `leccion-aprendida` (fusionado) |

No implementados como herramienta (el material solo los nombra o motiva): DOE, benchmarking, spaghetti chart, estudios de números/casos/polivalencia, grupo nominal, diagrama de afinidad, análisis de campo de fuerza, error proofing, SOP y controles visuales (referenciables como texto en `plan-control` y `a3-mejora`).
