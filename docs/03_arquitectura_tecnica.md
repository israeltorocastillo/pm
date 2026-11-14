# 03 · Arquitectura técnica

## 1. Stack

| Capa | Tecnología | Motivo |
|---|---|---|
| Frontend + backend | **Next.js (App Router) + TypeScript** | Un solo proyecto, Server Actions, streaming para la IA |
| Base de datos | **PostgreSQL** + **Prisma** | Relacional para usuarios/proyectos, `jsonb` para datos de herramientas |
| Autenticación | **Auth.js** (credenciales; Microsoft Entra ID en P2) | Integración nativa con Next.js |
| UI | **Tailwind CSS + shadcn/ui** | Componentes accesibles y rápidos de construir |
| Diagramas | **React Flow** (Ishikawa, VSM, Iceberg, Rich Picture, árboles Hoshin), **bpmn-js** (BPMN) | Lienzos editables |
| Gráficos | **Recharts** | Pareto, burndown, control charts, histogramas |
| Validación | **Zod** | Schemas compartidos cliente/servidor y para las tools de la IA |
| IA | **OpenAI TypeScript SDK** (`openai`, Responses API) | Asistente con tool use (function calling) y streaming. Motor elegido por disponibilidad de API key corporativa (acceso a Anthropic requiere aprobación de TI, pendiente) |
| Exportación | PDF vía `@react-pdf/renderer` o Playwright print; Excel vía `exceljs` | Entregables imprimibles |
| Tests | **Vitest** + **Playwright** | Fórmulas y flujos críticos |
| Despliegue | Docker; cualquier PaaS con Postgres (Vercel + Neon/Supabase, Azure App Service + Azure Database for PostgreSQL) | Flexible |

> La decisión de stack puede cambiarse; si se cambia, actualizar este documento y `CLAUDE.md`.

## 2. Estructura de carpetas

```
/
├── CLAUDE.md
├── docs/                      # especificación (este paquete)
├── conocimiento/              # fichas de conocimiento por ramo (markdown)
├── prisma/
│   ├── schema.prisma
│   └── seed.ts                # organización demo, usuario demo, proyecto de ejemplo
├── src/
│   ├── app/                   # rutas Next.js
│   │   ├── (auth)/login, registro
│   │   ├── (app)/dashboard
│   │   ├── (app)/proyectos/[projectId]/            # panel del proyecto
│   │   ├── (app)/proyectos/[projectId]/herramientas/[instanceId]
│   │   ├── (app)/portafolio
│   │   ├── (app)/conocimiento/[slug]
│   │   ├── (app)/admin
│   │   └── api/ai/chat/route.ts                    # endpoint streaming del asistente
│   ├── components/            # UI compartida (shadcn/ui)
│   ├── server/
│   │   ├── db.ts
│   │   ├── auth.ts
│   │   ├── authz.ts           # helpers de autorización (org/proyecto/rol)
│   │   └── services/          # projects.ts, tools.ts, tasks.ts, lessons.ts
│   ├── tools/                 # UNA carpeta por herramienta del catálogo
│   │   ├── registry.ts        # registro central de herramientas
│   │   ├── _types.ts          # interfaz ToolDefinition
│   │   ├── ishikawa/
│   │   │   ├── schema.ts
│   │   │   ├── calculations.ts
│   │   │   ├── calculations.test.ts
│   │   │   ├── Editor.tsx
│   │   │   ├── Viewer.tsx
│   │   │   ├── ai.ts
│   │   │   └── index.ts
│   │   └── ...
│   ├── ai/
│   │   ├── client.ts          # cliente OpenAI (solo servidor)
│   │   ├── define-tool.ts     # helper para tools (Zod → JSON Schema, función plana)
│   │   ├── system-prompt.ts
│   │   ├── context.ts         # contexto variable (proyecto/herramienta abiertos)
│   │   ├── tools.ts           # tools que la IA puede invocar (ver docs/05)
│   │   └── recommend.ts       # matriz síntoma → herramientas
│   └── lib/
└── tests/e2e/
```

## 3. Interfaz de una herramienta (`src/tools/_types.ts`)

```ts
export interface ToolDefinition<TData> {
  id: string;                       // ID del catálogo, ej. "ishikawa"
  name: string;                     // "Diagrama de Ishikawa"
  category: ToolCategory;
  origin: string[];                 // ramos de origen
  description: string;              // propósito y cuándo usarla
  uiKind: "form" | "table" | "canvas" | "board" | "calculator";
  schema: z.ZodType<TData>;         // estructura de datos
  schemaVersion: number;
  emptyData: () => TData;
  calculate?: (data: TData) => Record<string, unknown>; // indicadores derivados
  validate?: (data: TData) => MethodWarning[];          // advertencias metodológicas
  connections: {                    // conexiones con otras herramientas
    feeds: { toolId: string; map: (data: TData) => unknown }[];
  };
  ai: {
    guideQuestions: string[];       // preguntas guía (del catálogo)
    knowledgeRefs: string[];        // fichas de conocimiento relacionadas
  };
  Editor: React.ComponentType<EditorProps<TData>>;
  Viewer: React.ComponentType<ViewerProps<TData>>;
}
```

## 4. Modelo de datos (Prisma, resumido)

```prisma
model Organization {
  id         String   @id @default(cuid())
  name       String
  createdAt  DateTime @default(now())
  members    Membership[]
  projects   Project[]
  pillars    StrategicPillar[]
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  passwordHash  String?
  jobTitle      String?
  expertise     ExpertiseLevel @default(INTERMEDIATE) // ajusta la guía de la IA
  memberships   Membership[]
  projectRoles  ProjectMember[]
}

model Membership {
  id     String  @id @default(cuid())
  user   User    @relation(fields: [userId], references: [id])
  userId String
  org    Organization @relation(fields: [orgId], references: [id])
  orgId  String
  role   OrgRole // ADMIN | MEMBER | VIEWER
  @@unique([userId, orgId])
}

model Project {
  id          String        @id @default(cuid())
  orgId       String
  org         Organization  @relation(fields: [orgId], references: [id])
  name        String
  description String?
  type        ProjectType   // PREDICTIVO | AGIL_SCRUM | HIBRIDO | MEJORA_LEAN | MEJORA_SIX_SIGMA | ANALISIS_NEGOCIO | BIM
  status      ProjectStatus // IDEA | EVALUACION | EN_CURSO | EN_PAUSA | CERRADO | CANCELADO
  objective   String?
  problemStatement String?  // desviación + impacto + contexto + evidencia
  cynefinDomain CynefinDomain? // CLARO | COMPLICADO | COMPLEJO | CAOTICO | DESORDEN
  startDate   DateTime?
  endDate     DateTime?
  keyResultId String?       // alineación Hoshin (opcional)
  members     ProjectMember[]
  phases      Phase[]
  tools       ToolInstance[]
  tasks       Task[]
  conversations AiConversation[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model ProjectMember {
  id         String  @id @default(cuid())
  projectId  String
  userId     String
  role       ProjectRole  // OWNER | EDITOR | VIEWER
  methodRole String?      // "Sponsor", "Product Owner", "Black Belt", "Coordinador BIM"...
  @@unique([projectId, userId])
}

model Phase {             // ej. DMAIC, fases predictivas, sprints agrupados
  id         String @id @default(cuid())
  projectId  String
  name       String
  order      Int
  status     PhaseStatus  // PENDIENTE | EN_CURSO | EN_REVISION | APROBADA
  gateCriteria Json?      // entregables mínimos para pasar la compuerta
  approvedBy String?
  approvedAt DateTime?
}

model ToolInstance {
  id            String   @id @default(cuid())
  projectId     String
  phaseId       String?
  toolId        String   // ID del catálogo, ej. "fmea"
  title         String
  status        ToolStatus // BORRADOR | EN_REVISION | APROBADO
  data          Json       // validado por el schema Zod de la herramienta
  schemaVersion Int
  derived       Json?      // cache de calculate()
  sourceInstanceId String? // trazabilidad: creada a partir de otra instancia
  createdById   String
  versions      ToolVersion[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model ToolVersion {
  id         String   @id @default(cuid())
  instanceId String
  data       Json
  version    Int
  authorId   String
  authorType AuthorType // USER | AI_ACCEPTED
  createdAt  DateTime @default(now())
}

model Task {
  id          String   @id @default(cuid())
  projectId   String
  title       String
  description String?
  assigneeId  String?
  dueDate     DateTime?
  status      TaskStatus // POR_HACER | EN_CURSO | HECHO | BLOQUEADO
  sourceInstanceId String? // herramienta que la originó (A3, FMEA, plan de control…)
}

model LessonLearned {     // repositorio transversal de la organización
  id          String @id @default(cuid())
  orgId       String
  projectId   String?
  title       String
  data        Json   // campos de la herramienta "registro-lecciones-aprendidas"
  isValidated Boolean @default(false) // checklist A-E aprobado
  tags        String[]
}

model StrategicPillar { id String @id @default(cuid()) orgId String name String objectives StrategicObjective[] }
model StrategicObjective { id String @id @default(cuid()) pillarId String name String horizonYears Int keyResults KeyResult[] }
model KeyResult { id String @id @default(cuid()) objectiveId String name String target Float current Float? unit String? }

model AiConversation {
  id         String @id @default(cuid())
  projectId  String?
  userId     String
  context    Json?      // herramienta abierta, fase, etc.
  messages   Json       // historial completo (incluye bloques de tool use)
  createdAt  DateTime @default(now())
}

model AiProposal {        // cambios propuestos por la IA pendientes de aprobación
  id           String @id @default(cuid())
  conversationId String
  kind         String   // create_project | create_tool_instance | update_tool_fields | create_tasks
  payload      Json
  status       ProposalStatus // PENDIENTE | ACEPTADA | EDITADA | RECHAZADA
  decidedById  String?
  decidedAt    DateTime?
}

model AiUsage { id String @id @default(cuid()) orgId String userId String inputTokens Int outputTokens Int createdAt DateTime @default(now()) }
```

## 5. Autorización

- Helper `requireProjectAccess(userId, projectId, minRole)` en **todas** las Server Actions y rutas API.
- Toda consulta filtra por `orgId` del usuario autenticado.
- Herramientas con datos sensibles (salud del equipo, autoevaluaciones de liderazgo, registro 1:1) tienen flag `sensitive: true` en su definición: solo el autor y el OWNER ven datos individuales; el resto ve agregados.

## 6. Integración de IA (resumen; detalle en `05_asistente_ia.md`)

- Endpoint `POST /api/ai/chat` (servidor) con **streaming** (Responses API, `stream: true`, protocolo NDJSON propio hacia el cliente).
- El cliente OpenAI se instancia solo en servidor con `OPENAI_API_KEY` desde variables de entorno.
- La IA dispone de **tools** propias de la plataforma (leer proyecto, listar herramientas, proponer creación/actualización). Las tools de escritura **no escriben directamente**: crean un `AiProposal` que el usuario acepta en la UI.
- Contexto: `instructions` estable (rol + metodología + catálogo resumido); OpenAI cachea automáticamente el prefijo repetido (sin marcado manual tipo `cache_control`). Contexto variable (proyecto, herramienta abierta) va en el mensaje del turno, no en `instructions`.
- Bucle de tools manual (no hay "tool runner" de SDK para OpenAI): se repite `responses.create` mientras la respuesta traiga `function_call`, reenviando `function_call_output` por cada una.

## 7. Variables de entorno (`.env.example`)

```
DATABASE_URL=postgresql://user:pass@localhost:5432/plataforma_pm
AUTH_SECRET=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-6-astra
AZURE_AD_CLIENT_ID=        # P2
AZURE_AD_CLIENT_SECRET=    # P2
AZURE_AD_TENANT_ID=        # P2
```
