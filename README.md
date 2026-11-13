# Plataforma PM — Paquete de especificación

Paquete para iniciar la construcción de la plataforma de **gestión de proyectos, mejora continua y análisis de negocio** basada en el Magíster en Project Management, usando **Claude Code en Visual Studio Code**.

## Contenido

```
plataforma-pm/
├── README.md                 ← este archivo (para ti)
├── CLAUDE.md                 ← instrucciones permanentes para Claude Code
├── PROMPT_INICIAL.md         ← lo que debes pegar en Claude Code para empezar
├── docs/
│   ├── 01_vision_y_alcance.md
│   ├── 02_requisitos_funcionales.md
│   ├── 03_arquitectura_tecnica.md
│   ├── 04_catalogo_herramientas.md
│   ├── 05_asistente_ia.md
│   └── 06_roadmap.md
└── conocimiento/             ← 8 fichas de conocimiento (una por ramo)
```

> Los PDF originales del magíster **no** están incluidos (por peso y derechos de autor). Las fichas contienen la síntesis necesaria.

## Cómo usarlo en Visual Studio Code

1. **Descomprime** este paquete en una carpeta, por ejemplo `C:\Proyectos\plataforma-pm`.
2. Abre la carpeta en VS Code: **Archivo → Abrir carpeta…**
3. Abre Claude Code (extensión de Claude Code en VS Code; ícono de Claude en la barra lateral).
   Claude Code lee `CLAUDE.md` automáticamente.
4. Copia el contenido de `PROMPT_INICIAL.md` y pégalo en Claude Code.
5. Avanza **fase por fase** según `docs/06_roadmap.md`, revisando cada entrega antes de pasar a la siguiente.

## Requisitos en tu computador

- **Node.js 20 LTS o superior**
- **Docker Desktop** (para levantar PostgreSQL localmente) o una base PostgreSQL disponible
- **Git** (recomendado: crear un repositorio privado en GitHub para no perder el trabajo)
- Una **clave de API de Anthropic** para el asistente IA (Fase 2). Guárdala en `.env.local`, nunca en el código ni en el repositorio. Si la plataforma se usará en la empresa, gestiona la clave y el uso de datos con el área de TI correspondiente.

## Recomendaciones

- Revisa y valida el contenido de `docs/` y `conocimiento/` antes de construir: son síntesis automáticas del material y pueden tener vacíos (cada ficha los indica).
- Las fórmulas (RPN, DPMO, Cp/Cpk, PCE, etc.) deben verificarse con los tests antes de usarse en decisiones reales.
- Si la plataforma tendrá uso comercial o corporativo, confirma con la universidad el uso del material académico y con TI/legal el tratamiento de datos.
