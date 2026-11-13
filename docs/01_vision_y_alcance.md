# 01 · Visión y alcance

## Propósito

Llevar lo aprendido en el Magíster en Project Management a una plataforma de trabajo diario que permita **gestionar proyectos, analizar procesos, ejecutar mejora continua y hacer análisis de negocio**, con un asistente de IA que guía al usuario en la aplicación correcta de cada metodología.

## Problema que resuelve

- Las metodologías (Lean, Six Sigma, Scrum, Business Analysis, SSM, Cynefin, Hoshin…) quedan en presentaciones y planillas aisladas.
- Elegir la herramienta adecuada para un problema requiere criterio experto.
- Las plantillas Excel/PowerPoint no se conectan entre sí ni dejan trazabilidad (ej. del Ishikawa al A3, al plan de control y a la lección aprendida).

## Usuarios

| Rol | Necesidad principal |
|---|---|
| **Administrador de organización** | Gestionar usuarios, plantillas y configuración |
| **Gestor de proyecto / Líder de mejora** | Crear proyectos, aplicar herramientas, reportar avance |
| **Miembro de equipo** | Colaborar en herramientas y tareas asignadas |
| **Sponsor / Dirección** | Ver portafolio, estado, despliegue estratégico (Hoshin) y valor |
| **Invitado (solo lectura)** | Revisar entregables puntuales |

## Alcance funcional (visión completa)

1. **Usuarios y organizaciones**: registro, login, roles, equipos.
2. **Portafolio y proyectos**: tipos de proyecto, estados, miembros, panel por proyecto.
3. **Caja de herramientas del magíster**: cada herramienta como módulo digital conectado (ver `04_catalogo_herramientas.md`), agrupadas en:
   - Estrategia y portafolio (Hoshin Kanri, A3 estratégico, Go/No-Go)
   - Análisis de negocio (PESTLE, Porter, FODA/TOWS, Ansoff, elicitación, requisitos, casos de uso, BPMN)
   - Gestión de proyectos predictivo y ágil (charter, RACI, stakeholders, backlog, sprints, métricas ágiles)
   - Mejora continua y procesos (VSM, A3, DMAIC, SIPOC, FMEA, plan de control)
   - Análisis de problemas y decisiones (Cynefin, Iceberg, Ishikawa, Pareto, SSM, triangulación)
   - Equipo y liderazgo (salud del equipo/Hawkins, microprácticas, 1:1, lógicas de acción)
   - Conocimiento y cierre (lecciones aprendidas, valor, retrospectivas)
   - BIM (plan de ejecución BIM, coordinación, CDE liviano)
4. **Asistente IA guía**: entrevista inicial del problema, diagnóstico (tipo de problema y dominio Cynefin), recomendación de ruta de herramientas, ayuda a completar campos, revisión de calidad y generación de borradores — siempre con aprobación humana.
5. **Base de conocimiento**: biblioteca con la teoría de cada herramienta (desde `conocimiento/`), accesible desde cada editor.
6. **Reportes**: panel de proyecto, panel de portafolio, exportación PDF de entregables (A3, charter, FMEA, etc.).

## Fuera de alcance (por ahora)

- Integraciones con Jira, MS Project, Power BI (se evaluarán después del MVP).
- Visualización de modelos BIM 3D (solo gestión de información y coordinación).
- App móvil nativa (la web debe ser responsive).
- Facturación/planes de pago.

## Principios

1. **Metodología primero**: la plataforma enseña mientras se usa; cada herramienta explica el "para qué" y "cómo".
2. **Herramientas conectadas**: la salida de una alimenta a la siguiente (trazabilidad problema → causa → acción → control → lección).
3. **IA como coach, no como autor**: la IA pregunta, sugiere y redacta borradores; el usuario decide y aprueba.
4. **Simple de empezar**: un proyecto se crea en menos de 2 minutos con ayuda del asistente.
5. **Privacidad**: datos de proyectos y equipo aislados por organización; datos sensibles (clima, desempeño) con acceso restringido.

## Indicadores de éxito del producto

- % de proyectos que completan al menos una ruta de herramientas (ej. Ishikawa → Pareto → A3).
- Tiempo para crear un proyecto y su primer entregable.
- Nº de lecciones aprendidas registradas y reutilizadas.
- Satisfacción de usuarios con el asistente (valoración por conversación).
