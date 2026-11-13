# Prompt inicial para Claude Code (copiar y pegar)

---

Hola. En esta carpeta está la especificación completa de una plataforma web que vamos a construir juntos. Antes de escribir código:

1. Lee `CLAUDE.md` y luego todos los documentos de `docs/` en orden (01 a 06). Revisa la estructura de `conocimiento/` (no es necesario leer cada ficha completa ahora; úsalas al implementar cada herramienta).
2. Devuélveme un resumen breve de lo que entendiste: objetivo, módulos, modelo de datos y la secuencia de fases.
3. Lista las dudas o decisiones que necesitas que yo tome antes de empezar (por ejemplo: confirmar el stack, base de datos local con Docker o en la nube, nombre del proyecto).
4. Propón el plan detallado de la **Fase 0** (archivos a crear, comandos, criterios de aceptación) y espera mi aprobación antes de ejecutarlo.

Reglas para todo el proyecto:
- Trabaja fase por fase según `docs/06_roadmap.md`; al terminar cada fase, muéstrame cómo probarla y espera mi visto bueno.
- Cada herramienta del magíster es un módulo en `src/tools/<id>/` siguiendo la interfaz de `docs/03_arquitectura_tecnica.md` y los campos/cálculos de `docs/04_catalogo_herramientas.md`.
- Toda fórmula con tests unitarios usando los ejemplos de las fichas.
- No inventes contenido académico: si algo no está claro, márcalo `TODO(spec)` y pregúntame.
- Para el asistente IA usa el SDK oficial de Anthropic y consulta el skill `claude-api` para los modelos y parámetros vigentes.
- Interfaz en español; código y commits en inglés.
- Haz commits pequeños y descriptivos.

---
