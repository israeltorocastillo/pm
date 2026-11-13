# 02 · Requisitos funcionales

Formato: `RF-<módulo>-<n>` · Prioridad **P1** (MVP), **P2** (siguiente versión), **P3** (futuro).

---

## 1. Usuarios, organizaciones y permisos (AUTH)

| ID | Requisito | Prioridad |
|---|---|---|
| RF-AUTH-1 | Registro e inicio de sesión con email y contraseña (hash seguro) | P1 |
| RF-AUTH-2 | Inicio de sesión con Microsoft Entra ID (SSO corporativo) | P2 |
| RF-AUTH-3 | El usuario pertenece a una o más organizaciones; los datos se aíslan por organización | P1 |
| RF-AUTH-4 | Roles de organización: `ADMIN`, `MEMBER`, `VIEWER` | P1 |
| RF-AUTH-5 | Roles de proyecto: `OWNER` (gestor), `EDITOR`, `VIEWER`, más rol metodológico opcional (Sponsor, Product Owner, Scrum Master, Black Belt, Coordinador BIM, BA, etc.) | P1 |
| RF-AUTH-6 | Invitar usuarios por email a la organización o a un proyecto | P1 |
| RF-AUTH-7 | Perfil de usuario: nombre, cargo, foto, preferencias (idioma, nivel de experiencia metodológica para ajustar la guía de la IA) | P2 |
| RF-AUTH-8 | Registro de auditoría: quién creó/modificó/eliminó cada proyecto o herramienta | P2 |

## 2. Portafolio y proyectos (PROJ)

| ID | Requisito | Prioridad |
|---|---|---|
| RF-PROJ-1 | Crear proyecto con: nombre, descripción, tipo, objetivo, fechas, sponsor, gestor, estado | P1 |
| RF-PROJ-2 | Tipos de proyecto: `PREDICTIVO`, `AGIL_SCRUM`, `HIBRIDO`, `MEJORA_LEAN`, `MEJORA_SIX_SIGMA`, `ANALISIS_NEGOCIO`, `BIM`. El tipo define el **kit de herramientas sugerido** y las fases (ej. DMAIC para Six Sigma) | P1 |
| RF-PROJ-3 | Estados: `IDEA`, `EVALUACION` (Go/No-Go), `EN_CURSO`, `EN_PAUSA`, `CERRADO`, `CANCELADO` | P1 |
| RF-PROJ-4 | Lista de proyectos con filtros (tipo, estado, gestor) y búsqueda | P1 |
| RF-PROJ-5 | Panel del proyecto: resumen, fases, herramientas en uso, tareas, indicadores, actividad reciente, acceso al asistente | P1 |
| RF-PROJ-6 | Fases configurables por tipo (ej. DMAIC: Definir, Medir, Analizar, Mejorar, Controlar) con **compuertas** (tollgates) que requieren entregables mínimos y aprobación | P2 |
| RF-PROJ-7 | Tareas/acciones del proyecto: título, responsable, fecha, estado, origen (herramienta que la generó, ej. acción de un A3 o FMEA) | P1 |
| RF-PROJ-8 | Panel de portafolio: proyectos por estado, tipo y alineación estratégica (pilar/objetivo Hoshin) | P2 |
| RF-PROJ-9 | Comité de portafolio Go/No-Go: evaluar iniciativas con Perfil de Solución y registrar decisión | P2 |
| RF-PROJ-10 | Duplicar proyecto como plantilla | P3 |

## 3. Caja de herramientas (TOOL)

| ID | Requisito | Prioridad |
|---|---|---|
| RF-TOOL-1 | Catálogo navegable de herramientas por categoría, con descripción, cuándo usarla y ramo de origen | P1 |
| RF-TOOL-2 | Agregar una herramienta a un proyecto crea una **instancia** (un proyecto puede tener varias instancias de la misma herramienta, ej. dos Ishikawa) | P1 |
| RF-TOOL-3 | Cada instancia tiene: título, estado (`BORRADOR`, `EN_REVISION`, `APROBADO`), autor, versión, fecha, datos validados por schema | P1 |
| RF-TOOL-4 | Editores según tipo: formulario, tabla editable, lienzo/diagrama, tablero, calculadora | P1 |
| RF-TOOL-5 | Cálculos automáticos por herramienta (RPN, DPMO, nivel sigma, Cp/Cpk, PCE, Ley de Little, takt, velocity, % Pareto acumulado, semáforos Hoshin, promedios de pautas 1-7, etc.) | P1 |
| RF-TOOL-6 | **Conexiones entre herramientas**: crear una instancia a partir de otra, copiando datos (ej. causas priorizadas del Pareto → bloque "análisis de causa" del A3; acciones del A3 → tareas; modos de falla del FMEA → plan de control) | P1 |
| RF-TOOL-7 | Historial de versiones de cada instancia y comparación entre versiones | P2 |
| RF-TOOL-8 | Comentarios por instancia y por campo | P2 |
| RF-TOOL-9 | Exportar instancia a PDF (formato imprimible, ej. A3 en una hoja) y a Excel donde aplique (tablas) | P2 |
| RF-TOOL-10 | Panel de ayuda lateral en cada editor con la teoría (desde `conocimiento/`) y un ejemplo resuelto | P1 |
| RF-TOOL-11 | Registro de herramientas extensible: agregar una herramienta nueva = agregar un módulo en `src/tools/` sin tocar el núcleo | P1 |

El detalle de cada herramienta está en `04_catalogo_herramientas.md`.

## 4. Asistente IA (AI)

| ID | Requisito | Prioridad |
|---|---|---|
| RF-AI-1 | Chat del asistente disponible a nivel de proyecto (panel lateral) y en la creación de proyectos | P1 |
| RF-AI-2 | **Entrevista de descubrimiento**: al crear un proyecto o al pedir ayuda, la IA pregunta por el problema/oportunidad, contexto, síntomas, impacto, datos disponibles, interesados y restricciones | P1 |
| RF-AI-3 | **Diagnóstico**: clasifica el problema (lineal vs. sistémico; dominio Cynefin; síntoma vs. causa) y lo explica | P1 |
| RF-AI-4 | **Recomendación de ruta**: propone tipo de proyecto y una secuencia de herramientas justificada con la materia del magíster | P1 |
| RF-AI-5 | Con aprobación del usuario, **crea el proyecto y las instancias** de herramientas con borradores prellenados | P1 |
| RF-AI-6 | **Coach dentro de cada herramienta**: hace las preguntas guía de la herramienta, propone contenido para campos, detecta vacíos y errores metodológicos (ej. "esta causa es un síntoma", "el problema no tiene evidencia", "todas las acciones atacan el evento visible del Iceberg") | P1 |
| RF-AI-7 | Toda escritura de la IA en datos del proyecto requiere **confirmación explícita** del usuario (propuesta → revisar → aceptar/editar/rechazar) | P1 |
| RF-AI-8 | La IA responde con referencias a la ficha de conocimiento y herramienta usada | P2 |
| RF-AI-9 | Historial de conversaciones por proyecto | P1 |
| RF-AI-10 | Resumen ejecutivo del proyecto y borrador de lección aprendida al cierre | P2 |
| RF-AI-11 | Búsqueda de lecciones aprendidas similares de otros proyectos de la organización | P3 |
| RF-AI-12 | Valoración de respuestas (👍/👎 + comentario) para mejora continua del asistente | P2 |

El diseño detallado está en `05_asistente_ia.md`.

## 5. Base de conocimiento (KB)

| ID | Requisito | Prioridad |
|---|---|---|
| RF-KB-1 | Biblioteca navegable de las fichas de conocimiento por ramo y por herramienta | P1 |
| RF-KB-2 | Búsqueda de texto completo | P2 |
| RF-KB-3 | Las fichas alimentan el contexto del asistente IA | P1 |

## 6. Reportes y paneles (REP)

| ID | Requisito | Prioridad |
|---|---|---|
| RF-REP-1 | Panel de proyecto con indicadores de las herramientas usadas | P1 |
| RF-REP-2 | Panel de portafolio y despliegue Hoshin (pilar → objetivo → KR → proyecto) con semáforos | P2 |
| RF-REP-3 | Métricas ágiles (velocity, burndown/burn-up, flujo acumulado, lead/cycle time) | P2 |
| RF-REP-4 | Exportación PDF del informe del proyecto | P2 |

---

## Requisitos no funcionales

| ID | Requisito |
|---|---|
| RNF-1 | Interfaz en español, responsive (escritorio y tablet como prioridad) |
| RNF-2 | Aislamiento por organización verificado en cada consulta (multi-tenant) |
| RNF-3 | Datos sensibles de equipo (clima, autoevaluaciones, 1:1) visibles solo para el titular y roles autorizados; agregados anonimizados para el resto |
| RNF-4 | Tiempo de respuesta de páginas < 1 s (sin IA); respuestas de IA en streaming |
| RNF-5 | Claves de API y secretos solo en variables de entorno del servidor; nunca en el cliente |
| RNF-6 | Tests unitarios de todas las fórmulas; e2e de flujos críticos (crear proyecto, usar herramienta, asistente) |
| RNF-7 | Registro de uso de IA (tokens, costo estimado por organización) |
| RNF-8 | Accesibilidad básica (WCAG AA en contraste y navegación con teclado) |
