# Ficha de conocimiento: 07_scrum (Scrum)

> Fuente: material del ramo en `/home/user/material/07_scrum/` y texto extraído en `/home/user/conocimiento/_texto/07_scrum/`. Las referencias "S N, pág X" corresponden a la página del PDF de la sesión N. "Guía, pág X" = página del PDF de la Guía Scrum 2020 (la numeración impresa es X-1). "SoA17, pág X" = 17th State of Agile Report. "Corazón, pág X" = El Corazón de la Agilidad.
> Lo marcado "(complemento, no del material)" es conocimiento general añadido.

---

## 1. Resumen del ramo

- **Objetivo**: introducir la mentalidad ágil (valores, principios, Cynefin) y el marco Scrum de forma práctica: visión de producto, roles, artefactos, estimación, eventos, roadmap/planificación de lanzamientos, indicadores ágiles y antipatrones. El curso se trabaja con un caso grupal que se va construyendo sesión a sesión (visión → backlog → estimación → roadmap) y que culmina en el trabajo final (S4, pág 20).
- **Nº de sesiones**: 4 (julio a septiembre 2026).
- **Materiales** (todos PDF; no hay plantillas pptx/docx/xlsx en la carpeta del ramo):
  | Archivo | Págs | Contenido |
  |---|---|---|
  | SCRUM S1 - UAI 2026.pdf | 50 | Agilidad, Manifiesto, landscape ágil, métodos, Cynefin, introducción a Scrum |
  | SCRUM S2 - UAI 2026.pdf | 54 | Valores y principios Scrum, visión de producto, roles, artefactos |
  | SCRUM S3 - UAI 2026.pdf | 53 | Estimaciones, eventos, roadmap, velocidad, indicadores ágiles |
  | SCRUM S4 - UAI 2026.pdf | 22 | Antipatrones, certificaciones, trabajo final |
  | 2020-Scrum-Guide-Spanish-Latin-South-American.pdf | 16 | Guía Scrum 2020 (Schwaber & Sutherland) |
  | El-Corazon-de-la-Agilidad.pdf | 4 | Artículo de A. Cockburn (2016), traducción al español |
  | 17th-Annual-State-Of-Agile-Report.pdf | 26 | Encuesta anual de digital.ai (2023, 788 encuestados) |
- Hilo conductor del curso (S2 pág 17; S3 pág 31, "Uniendo todo"): **Fases de Scrum**: Inicio/Inception (visión del proyecto, caso de negocio, backlog priorizado del producto) → Planificación y estimación (sprint backlog, cronograma de planificación del lanzamiento) → Implementación (crear entregables, daily standup, Scrumboard) → Revisión y retrospectiva (entregables aceptados, acuerdo de entregables trabajando) → Lanzamiento. Las fases intermedias se repiten por sprint.

---

## 2. Contenido por sesión

### Sesión 1 – Scrum / Agilidad (introducción)

**Contexto (S1, págs 6-11)**
- Realidad de mercado 2025: entorno **VUCA** (volatilidad, incertidumbre, complejidad, ambigüedad) que requiere enfoques híbridos; expectativas de entrega continua; competencia disruptiva; transformación digital; eficiencia operativa (eliminación de desperdicios) (pág 6). Se menciona también el entorno **BANI** como "entornos actuales" (pág 7, fuente visual-mapping.es).
- Qué hacen diferente las empresas exitosas: calzan oferta y demanda de forma asequible, retroalimentación oportuna, responden ágil e innovadoramente, adoptan nuevas tecnologías (pág 8).
- **Definición de agilidad** (Jim Highsmith, 2002): "la habilidad de crear y responder al cambio a fin de obtener ganancias en un ambiente de negocio turbulento… la habilidad de equilibrar la flexibilidad y la estabilidad" (pág 9).
- Necesidad de ser ágil (ejemplo mercado de smartphones): cambios rápidos de mercado/tecnología, menor time-to-market, reducción de costos de pruebas/experimentación (simulación, automatización), el valor se entrega en el punto de venta y no en el de planificación, necesidad de métodos adaptables (pág 10).

**Mentalidad ágil (S1, págs 12-18)**
- Estructura: **4 valores → 12 principios → prácticas** (pág 12).
- **Manifiesto Ágil** (pág 13): individuos e interacciones sobre procesos y herramientas; software funcionando sobre documentación extensiva; colaboración con el cliente sobre negociación contractual; respuesta ante el cambio sobre seguir un plan ("valoramos más los de la izquierda").
- **12 principios** con rótulos del curso (págs 15-17): Satisfacción del cliente; Abrazando los cambios; Entrega rápida (2 semanas a 2 meses, preferir lo más corto); Colaboración negocio-desarrollo diaria; Empoderamiento (individuos motivados); Comunicación efectiva (cara a cara); Buenas métricas (software funcionando = medida principal de progreso); Firmeza (ritmo sostenible); Excelencia operacional (excelencia técnica y buen diseño); Simplicidad (maximizar el trabajo no realizado); Auto-organización; Mejora continua (reflexión a intervalos regulares).
- **El corazón de la agilidad** (Cockburn): diamante Colabora – Entrega – Reflexiona – Mejora (pág 18).
- Actividad: 4 grupos defienden un valor ágil ante "la gerencia" (pág 14).

**Landscape ágil (S1, págs 20-26)**
- **Restricciones fijas / triángulo invertido** (pág 20): en Waterfall el alcance es fijo y recursos/tiempo se estiman; en Agile recursos y tiempo son fijos y el alcance se estima.
- **Triángulo tradicional vs triángulo Agile** (pág 21): tradicional = alcance, costo, tiempo; Agile = valor, calidad, restricciones (tiempo, costos). Foco de gestión pasa del alcance al valor.
- **Foco de valor: tiempo de entrega** (pág 22): cascada (analizar, diseñar, implementar, probar, liberar) entrega valor al final; Scrum entrega valor en cada sprint (iniciar → sprints 1..5 de "planear y estimar, implementar, revisar y ver en retrospectiva" → liberar).
- **Agile es un mindset** (pág 23): descrito por 4 valores, definido por 12 principios, manifestado en marcos/prácticas (Lean, Scrum, XP, Kanban).
- **Tabla Agile vs Predictivo/Cascada** (págs 24-26):

| Enfoque | Agile | Predictivo / Cascada |
|---|---|---|
| Énfasis | Personas | Procesos |
| Dominio | Impredecible/exploratorio | Predecible |
| Documentación | Solo la que agrega valor | Integral |
| Aseguramiento de calidad | Centrado en el cliente | Centrado en procesos |
| Estilo de procesos | Iterativo | Lineal |
| Organización | Auto-organizado | Gestionado/centralizado |
| Planeación por adelantado | Baja | Alta |
| Perspectiva al cambio | Adaptabilidad | Sustentabilidad |
| Priorización de requerimientos | Por valor de negocio, actualizada constantemente | Fija en el plan |
| Estilo de gestión | Descentralizado | Autocrático |
| Liderazgo | Colaborativo, de apoyo | Mando y control |
| Medición del desempeño | Valor para el negocio | Conformidad con el plan |
| Retorno de inversión | Temprano / a lo largo del proyecto | Al final |

**Métodos ágiles (S1, págs 28-33)**
- Lista: Scrum, Kanban, XP, Crystal, Lean Startup, FDD, AUP, DSDM, ASD (pág 28). Mapa Lean ⊃ Kanban; Ágil ⊃ Scrum, XP, Crystal, AUP, FDD, DSDM; ScrumBan en la intersección (pág 29).
- Línea de tiempo: Crystal 1988, Scrum 1995, DSDM 1995, XP 1996, FDD 1997, ASD 2000 (pág 30).
- **Adopción a nivel equipo, global** (State of Agile 2025, pág 31): Scrum 58%, ScrumBan 10%, otros/híbridos 9%, Scrum/XP 8%, Kanban 7%, desarrollo iterativo 4%, no sabe 3%, Lean Startup 1%, XP 1%.
- **Adopción LATAM** (Scrum Network, Informe de Agilidad en Latam 2024, pág 32): Scrum 40%, Kanban 19%, Híbrido 16%, PMI 12%, Scrumban 9%, Ninguno 4%, XP 1%.
- **Adopción a nivel empresa, global** (State of Agile Report #18, pág 33): SAFe 44%, modelo blended/híbrido 48%, Lean principles 29%, framework propio 26%, Scrum@Scale/Scrum of Scrums 23%, DevOps-first 23%, Value Stream Management 21%, platform/enablement team 16%, governance/compliance-led 14%, AI-assisted delivery 10%, otro framework formal 6%, sin modelo de escalamiento 7%, otro 3%, no sabe 3%.

**Modelo Cynefin (S1, págs 35-42)** – usado para la toma de decisiones:

| Dominio | Situación | Prácticas | Cómo actuar | Ejemplo del material |
|---|---|---|---|---|
| Obvio/Simple | Causa-efecto conocido | Mejores prácticas | Percibir – Categorizar – Responder | Productos en serie; optimización del proceso |
| Complicado | Causa desconocida, efecto conocido | Buenas prácticas | Percibir – Analizar – Responder | Mecánico, performance de servidor; conocimiento especialista |
| Complejo | Causa-efecto desconocido | Prácticas emergentes | Sondear – Percibir – Responder | Creatividad/innovación; prueba y error |
| Caótico | Causa-efecto desconocido y urgente | Prácticas novedosas | Actuar – Percibir – Responder | Desastres naturales |
| Desordenado | Se confunden los dominios | — | No hay regla; llegar a otro dominio lo antes posible | — |

- Actividad (pág 42): clasificar 8 proyectos tipo (ERP estándar, cambio cultural, ciberataque, motor de búsqueda, startup sin validar, cadena de suministro, pivote en pandemia, edificio con planos aprobados).

**Introducción a Scrum (S1, págs 44-47)**
- Historia: Takeuchi y Nonaka (1986, HBR) – enfoque holístico o "de rugby" con equipos multifuncionales; Schwaber y Sutherland usan "Scrum" en 1995 (conferencia en Austin, Texas) (pág 44).
- Scrum: enfoque adaptativo, iterativo, rápido, flexible, eficaz; aplicable a todo tipo de industria/proyecto; equipos interfuncionales, auto-organizados y empoderados con ciclos cortos (pág 46).
- **Diagrama del proceso Scrum** (pág 47; repetido en S2 pág 3): Backlog del Producto ordenado por prioridad con refinamiento → Sprint Planning (PBIs "Ready") → Backlog del sprint → Desarrollo con Daily Scrum → "Definition of Done" → Sprint Review → Incremento de producto; Retrospectiva retroalimenta la planificación; Equipo Scrum (PO, Dev Team, SM); sprint de 2 semanas; base: Valores Scrum.

### Sesión 2 – Valores y principios, visión del producto, roles, artefactos

**Valores, principios y prácticas (S2, págs 5-15)**
- Pirámide (pág 5): Valores y creencias (lo que creemos) → Principios/modelos mentales → Prácticas/comportamientos y artefactos (lo que vemos: Scrum, Lean, Kanban, XP, DevOps, TDD). "Ser Agile" (valores + principios) vs "Hacer Agile" (prácticas).
- Valores Scrum añadidos a la guía en 2016 como respuesta al uso "deshumanizado y mecanizado"; versión 2020 simplificada y menos prescriptiva (pág 6).
- **5 valores Scrum** (pág 7): Compromiso, Foco, Apertura/Franqueza, Respeto, Coraje.
- **6 principios Scrum** (págs 8-14):
  1. **Control empírico de procesos**: decisiones basadas en observación/experimentación; pilares **Transparencia, Inspección, Adaptación** (pág 9).
  2. **Auto-organización**: el equipo decide cómo construir y ejecutar el Sprint Backlog (pág 10).
  3. **Colaboración**: creación compartida; dimensiones Concientización, Articulación, Apropiación (pág 11).
  4. **Priorización basada en valor**: máximo valor en mínimo tiempo; factores: 1) Valor, 2) Riesgo (incertidumbre), 3) Dependencias; "el valor lo define el negocio" (pág 12).
  5. **Time-boxing** (pág 13): Sprint 1 a 4 semanas; Sprint Planning 2 h por semana de sprint; Daily 15 min; Revisión 1 h por semana; Retrospectiva 1 h por semana.
  6. **Desarrollo iterativo**: gestionar cambios cuando los requerimientos no están claros (pág 14).
- Actividad (pág 15): presión para adelantar entrega 2 semanas saltándose pruebas; elegir valor Scrum y acción concreta.

**Visión del producto (S2, págs 17-22)**
- **Análisis FODA (SWOT)** realizado por el PO (pág 18): Fortalezas (experiencia, procesos efectivos, sistemas TI, relaciones con clientes), Debilidades (falta de conocimiento del negocio, de procesos estándar, de personal capacitado, ineficiencia), Oportunidades (nuevos mercados, tecnologías, cambios en competitividad), Amenazas (nuevos competidores, déficit económico, nuevas regulaciones).
- **Canvas del producto** (pág 19, ejemplo de plataforma logística): campos CodeName, Frase representativa, Visión, Grupos de usuarios, Necesidades, Producto, Valor.
- **Elevator pitch (Geoffrey Moore)** (págs 20-21): Para [clientes objetivo] / Quién [necesidad u oportunidad] / El [nombre del producto] es un [categoría] / Que [beneficios] / A diferencia de [competencia] / Nuestro producto [diferenciador]. Ejemplo: sistema web de membresía para ver películas.
- Actividad (pág 22): idea de empresa → FODA → Canvas → visión en elevator pitch (30 min, en Mural).

**Roles (S2, págs 24-32)**
- **Roles centrales** (obligatorios, responsables del éxito del sprint/proyecto) vs **no centrales** (interesados sin rol formal) (pág 24).
- Flujo (pág 25): interesados del negocio → requerimientos al PO → PO comunica, elabora backlog priorizado y criterios de aceptación → Equipo crea entregables y demuestra el incremento en la revisión → PO entrega valor vía lanzamientos incrementales; SM asegura ambiente adecuado.
- **Product Owner** (págs 26-27): voz del cliente (VoC); representa a stakeholders; entiende necesidades declaradas y no declaradas; redacta Historias de Usuario (HU); administra y prioriza el backlog; asegura entrega de valor. Entregables: visión del producto, Product Backlog priorizado, planeamiento del release (roadmap), lanzamiento, manejo del presupuesto.
- **Scrum Master** (págs 28-29): facilita ceremonias; asegura que todos (incluido PO) sigan Scrum; provee herramientas y elimina barreras; **liderazgo servicial**: escucha, empatía, conocimiento, persuasión, previsión, gestión, compromiso con el crecimiento de otros, desarrollo comunitario.
- **Equipo de desarrollo** (págs 30-31): interfuncional, **6 a 10 personas**; conoce la visión; crea los entregables; auto-organizado, comprometido y empoderado; comparte el objetivo del sprint; estima sobre las prioridades del PO; perfiles "generalistas-especialistas"; definir suplentes para cada integrante.
- **Roles no centrales** (pág 32): Cliente (interno/externo), Usuario, Patrocinador (provee recursos, principal interesado), Proveedores, Servicios de soporte (logística, finanzas, infraestructura, etc.).

**Artefactos (S2, págs 34-52)**
- 3 artefactos: Product Backlog, Sprint Backlog, Incremento (pág 34).
- **Product Backlog** (págs 35-36): lista priorizada, única fuente de requisitos; responsabilidad del PO (generación, priorización, refinamiento). Forma tipo "iceberg": arriba ítems de mayor prioridad, más detallados y pequeños; abajo menor prioridad, ideas, deseos. Tipos de PBI: funcionalidades (user stories, casos de uso, narrativas sin formato), defectos, trabajo técnico, adquisición de conocimiento (pág 36).
- **Historias de usuario** (págs 37-39): requerimientos desde la perspectiva del usuario; las genéricas son **Épicas** que se desglosan en HU. Formato: "Como <personaje/rol>, quiero <funcionalidad>, para <beneficio>" (Quién / Qué / Por qué). Ejemplo épica de RR.HH. desglosada en 3 HU (pág 39).
- **Criterios de aceptación** (págs 40-41): criterios de calidad únicos por HU, definidos por el PO, expresados como pruebas de aceptación (aprobada/no aprobada); pueden incluir características, requerimientos no funcionales, reglas de negocio, flujos alternos y de excepción. Ejemplo: reporte de vacaciones con 5 criterios (exportación a Excel, rango de fechas, gráfico mensual, acceso con credenciales, generación < 5 s).
- **Priorización** (págs 42-44): responsabilidad del PO; el equipo aporta restricciones y dependencias técnicas. Métodos: esquemas simples, 100 puntos, comparación entre pares, **MoSCoW**, **Kano**, valor de negocio vs complejidad, matriz Eisenhower, Monopoly, Pareto. MoSCoW: Must / Should / Could / Won't (pág 43). Kano: calidad atractiva (exciters/delighters), unidimensional (satisfiers), requerida (dissatisfiers), indiferente (pág 44).
- Actividad (pág 45): 10 HU con criterios, priorizar y ordenar → primera versión del backlog.
- **Sprint Backlog** (pág 46): lista de tareas técnicas generada por el equipo; el equipo compromete trabajo según su **velocidad** (cantidad de trabajo que puede realizar en un sprint).
- **Scrumboard / tablero Kanban** (pág 47): filas = Historias; columnas Por hacer – En proceso – En pruebas – Realizado; cada integrante elige una tarea, la completa y toma la siguiente.
- **Burndown chart del sprint** (pág 48): trabajo remanente (puntos de historia) vs días del sprint; solo cuentan tareas finalizadas; lo completa el equipo para autogestionarse.
- **Consideraciones** (pág 49): el Product Backlog cambia constantemente (valor, riesgos, nuevos requerimientos, aprendizaje); refinamiento una vez por sprint con todo el equipo; "el backlog del sprint no cambia una vez acordado; si es imperativo que cambie, el sprint termina y se inicia uno nuevo" (ver discrepancia con la Guía en §4); HU y tareas incluyen respuestas a riesgos, retrabajo, investigación.
- **Incremento** (págs 50-52): suma de los ítems "Terminados" del sprint más incrementos anteriores; cada incremento puede entenderse como un **MVP** (versión más simple para validar hipótesis de negocio). **Definición de Terminado (DoD)**: reglas aplicables a todas las HU; elimina ambigüedad y alinea a normas de calidad; ejemplos: prueba unitaria exitosa, pruebas de control de calidad, diseño aprobado por excelencia técnica.

### Sesión 3 – Estimaciones, eventos, roadmap, indicadores ágiles

**Estimaciones (S3, págs 5-14)**
- Las estimaciones no son precisas: dependen de complejidad, tamaño y experiencia del equipo, información disponible, factores externos (pág 5).
- **Absolutas** (tiempo/esfuerzo; no consideran bien la complejidad) vs **relativas** (debatir complejidades; "el resultado es el debate, no el número"; considera esfuerzo, complejidad e incertidumbre) (pág 6).
- Ejercicio Fibonacci con perro/elefante/toro (pág 7).
- **Puntos de historia**: asignados por complejidad, esfuerzo e incertidumbre; técnica más usada: **Planning Poker** (pág 8).
- **Planning Poker** (pág 9): 1) equipo reunido con cartas de una serie; 2) PO lee HU/épica y criterios de terminado y aceptación; 3) preguntas; 4) cada miembro elige carta y se revelan a la vez a la señal del SM; 5) quienes dieron la menor y mayor estimación argumentan; 6) se vuelve a votar hasta consenso o, tras 3+ rondas, el SM decide parar.
- **Tallas de camiseta (T-shirt)** (pág 10): XS = 1 punto (gestión de actividades, spike); S = 2-3 (componente estático, cambiar condición/lógica, llamada simple a servicio, manuales); M = 5-8 (vista desde cero con servicios y lógica, componente dinámico, formularios dinámicos, flujo transaccional corto, integración con herramientas de otros equipos); L = 13-20 (demasiada incertidumbre, dependencia de otras áreas con desarrollos nuevos).
- **Tiempo ideal** (horas/días ideales) (pág 11): premisas: solo el esfuerzo de quien hace el trabajo, todos los recursos disponibles al inicio, sin interrupciones.
- En Scrum (pág 12): estimación relativa (puntos de historia y tiempo ideal), con todo el equipo; alto nivel al inicio y detalle solo para el sprint; proceso iterativo y empírico; lo importante es la discusión.
- **Ventajas de la estimación relativa** (pág 13): considera esfuerzo/complejidad/incertidumbre; planificación iterativa; transparencia; considera riesgo; elimina sesgo de habilidades; mejora continua al comparar con lo real; ajustes rápidos.
- Actividad (pág 14): estimar las HU del grupo con Planning Poker u otro método.

**Eventos (S3, págs 16-24)** – "ceremonias"; mínimos necesarios para el control empírico (pág 16). El curso lista 5 (pág 17):
1. **Planificación del Sprint** (págs 18-19): todo el equipo; ¿por qué es valioso?, ¿qué se puede hacer?, ¿cómo se hará?; resultado: Sprint Backlog (HU → tareas); agenda: forecast de PBIs y plan para cumplir la meta; time-box máx. 2 h por semana de sprint.
2. **Daily Scrum** (pág 20): inspeccionar progreso hacia el objetivo del sprint y adaptar el Sprint Backlog; misma hora y lugar; 15 min. En pág 38 se usan las tres preguntas: ¿qué hice desde la última reunión?, ¿qué haré hasta la próxima?, ¿qué impedimentos podría tener?
3. **Revisión del Sprint** (pág 21): inspeccionar el resultado con interesados clave, progreso hacia el Objetivo del Producto, ajustar backlog; sesión de trabajo, no presentación; máx. 1 h por semana.
4. **Retrospectiva** (págs 22-23): tras la revisión, cierra el sprint; solo equipo central; planificar formas de aumentar calidad y efectividad; máx. 1 h por semana. Pasos: 1) preparación, 2) recopilar información, 3) generación de información, 4) acción, 5) círculo de preguntas y clausura.
5. **Refinamiento del Backlog** (pág 24): práctica recomendada, dirigida por el PO (no por el SM), sin time-box, durante el sprint.

**Roadmap del proyecto (S3, págs 26-30)**
- **Roadmap** (pág 26): cuántos releases, sprints por release y HU/épicas por sprint (ej.: 3 releases × 4 sprints = 12 sprints); acercamiento inicial que se refina; cada sprint con funcionalidad potencialmente lanzable.
- **Duración del sprint** (pág 27): 1 a 6 semanas; equipos maduros prefieren intervalos más largos; requerimientos poco definidos → sprints cortos; puede cambiar tras releases; depende del equipo.
- **Velocidad del sprint** (pág 28): cantidad de trabajo completado por sprint, medida en la unidad de estimación relativa del equipo y definida por el propio equipo. Sirve para: planificación del roadmap y del sprint, seguimiento, mejora continua, comunicación y transparencia.
- **Planificación del lanzamiento – pasos** (pág 29): 1) determinar esfuerzo total según restricciones; 2) determinar duración del sprint; 3) determinar velocidad del equipo (según duración y experiencia); 4) distribuir épicas/HU por prioridad y dependencias; 5) desglosar épicas para que quepan en un sprint, estimar y priorizar; 6) planear cada sprint según velocidad, dependencias y estimaciones.
- Actividad (pág 30): generar roadmap; si se desglosa una HU, re-priorizar y re-estimar.

**Indicadores ágiles (S3, págs 33-51)**
- Definición (pág 33): métricas cuantitativas y cualitativas para medir progreso, eficiencia y efectividad de equipos/proyectos ágiles.
- Importancia (pág 34): transparencia, seguimiento, retroalimentación, eficiencia y cuellos de botella, mejores estimaciones por datos históricos, comunicación con stakeholders, responsabilidad del equipo.
- **Modelo DIKW** (págs 35-36): Datos → Información (análisis) → Conocimiento (contexto/experiencia) → Sabiduría (mejor decisión, reestimar el rendimiento futuro). Eje: investigar, absorber, hacer, interactuar, reflejar; pasado → futuro.
- **Fuentes de datos por evento** (págs 37-41): ver tabla en §7.
- **Tipos de métricas** (págs 42-51): productividad; resultado del proyecto; situación financiera; calidad; riesgos, impedimentos y mejora continua (detalle en §7).
- Gráfico **Valor acumulado** Agile vs Waterfall (pág 45): Agile entrega valor escalonado desde temprano con pruebas con usuarios reales; Waterfall entrega todo al final con un pico de errores tras la primera entrega total.

### Sesión 4 – Antipatrones, certificaciones, trabajo final

**Top 5 antipatrones (S4, págs 4-8)**

| Antipatrón | Definición | Síntomas | Impacto | Solución |
|---|---|---|---|---|
| Scrum-But | "Hacemos Scrum pero sin [elemento esencial]" | Sin retros "por tiempo", sin PO real, sin daily | Pierde transparencia e inspección-adaptación | Volver a fundamentos, explicar el "por qué" |
| Sprint como mini-cascada | Fases secuenciales dentro del sprint | Semana 1 análisis, 2 desarrollo, 3 testing | Sin incremento entregable hasta el final | Trabajar por HU completas, no por disciplinas |
| Daily como reporte de status | Reunión dirigida al SM/manager | Reportan al líder, foco en % avance, formato rígido | Pierde auto-organización | Cambiar dinámicas, rotar facilitación, foco en impedimentos |
| PO ausente o proxy | PO sin poder de decisión | "Tengo que consultar", decisiones de semanas, prioridades sin criterio | Sin dirección, retrabajo | Empoderar al PO real o escalar |
| Retrospectivas ritualizadas | Reuniones sin acciones de mejora | Mismos temas, acciones no implementadas, "todo bien" | Se pierde la mejora continua | Variar formatos, seguimiento de acciones, accountability |

- **Señales de alerta** (pág 9): velocity muy variable sprint a sprint; burndown que no "quema" hasta el último día; miembros que evitan ceremonias; retros donde nadie habla; incrementos que nunca se demuestran.
- **Preguntas de diagnóstico** (pág 10): ¿el equipo explica por qué hace cada ceremonia?, ¿las decisiones del PO se implementan sin escalaciones?, ¿los impedimentos se resuelven rápido?, ¿el equipo se auto-organiza?
- **Cuándo interviene el SM** (pág 11): valores violados, proceso que impide entregar valor, conflictos no resueltos por el equipo; nunca para tomar decisiones técnicas o de producto por el equipo.
- Actividad (págs 12-14): 5 casos ficticios (uno por antipatrón) con respuestas para el facilitador.

**Certificaciones (S4, págs 16-18)**: tipos SM, PO, Developer; organizaciones: Scrum Alliance, Scrum.org, EXIN, CertiProf, SCRUMstudy, Scaled Agile (SAFe), Scrum Institute, Scrum Manager. SCRUMstudy: 8 certificaciones (SFC gratuita, SDC, SMC, SSMC, SPOC, SSPOC, SAMC, ESMC que requiere 3 certificaciones); ruta: SFC/SDC → SMC/SAMC/SPOC → SSMC/SSPOC → ESMC (pág 18).

**Trabajo final (S4, pág 20)** – documento grupal con: 1) visión del producto (SWOT, Canvas, elevator pitch); 2) backlog con ≥15 HU y criterios de aceptación; 3) estimación y priorización (indicar método); 4) roadmap con definiciones y HU desglosadas; 5) comparación backlog inicial vs final; 6) nivel de uso de IA y principales prompts.

---

## 3. Lecturas complementarias

### 3.1 La Guía Scrum 2020 (Schwaber & Sutherland, nov. 2020)

**Tesis**: Scrum es un marco de trabajo liviano, intencionalmente incompleto, que ayuda a generar valor mediante soluciones adaptativas para problemas complejos; se basa en empirismo y pensamiento Lean y es inmutable: implementar solo partes "no es Scrum" (Guía, págs 4, 14).

**Definición y teoría** (Guía, págs 4-6)
- Ciclo: el PO ordena el trabajo en un Product Backlog → el Scrum Team convierte una selección en un Increment de valor durante un Sprint → equipo e interesados inspeccionan y adaptan → repetir.
- Enfoque iterativo e incremental para optimizar la previsibilidad y controlar el riesgo.
- Pilares: **Transparencia** (permite la inspección; inspección sin transparencia es engañosa), **Inspección** (permite la adaptación; cadencia de los cinco eventos), **Adaptación** (ajustar lo antes posible; requiere empoderamiento y autogestión).
- Valores: Compromiso, Foco, Franqueza, Respeto, Coraje.

**Scrum Team y responsabilidades** (Guía, págs 6-8)
- Un Scrum Master, un Product Owner y Developers; sin subequipos ni jerarquías; enfocado en un objetivo a la vez (Objetivo del Producto); multifuncional y **autogestionado** (decide quién, qué, cuándo y cómo); **10 personas o menos**; si crece, varios equipos que comparten Objetivo del Producto, Product Backlog y PO.
- **Developers**: crear el plan del Sprint (Sprint Backlog); inculcar calidad adhiriéndose a la DoD; adaptar el plan cada día hacia el Objetivo del Sprint; responsabilizarse mutuamente como profesionales.
- **Product Owner**: maximizar el valor del producto; gestión del Product Backlog (desarrollar y comunicar el Objetivo del Producto; crear y comunicar los PBI; ordenarlos; asegurar transparencia). Es una persona, no un comité; puede delegar pero sigue siendo responsable; la organización debe respetar sus decisiones.
- **Scrum Master**: establecer Scrum y lograr la efectividad del equipo; líder que sirve. Al equipo: autogestión y multifuncionalidad, incrementos que cumplan la DoD, eliminar impedimentos, eventos positivos y en time-box. Al PO: técnicas para Objetivo del Producto y gestión del backlog, PBIs claros, planificación empírica, colaboración con interesados. A la organización: liderar/capacitar en la adopción, planificar implementaciones, enfoque empírico, eliminar barreras.

**Eventos** (Guía, págs 8-11)

| Evento | Propósito | Participantes / reglas | Time-box (sprint de 1 mes) |
|---|---|---|---|
| Sprint | Contenedor; convertir ideas en valor | Duración fija ≤ 1 mes; sin cambios que pongan en peligro el Objetivo del Sprint; calidad no disminuye; refinamiento según necesidad; alcance renegociable con el PO; solo el PO puede cancelarlo si el objetivo queda obsoleto | ≤ 1 mes |
| Sprint Planning | Establecer el trabajo del Sprint | Tres temas: ¿Por qué es valioso? (Objetivo del Sprint), ¿Qué se puede hacer?, ¿Cómo se hará? (tareas de un día o menos) | Máx. 8 h |
| Daily Scrum | Inspeccionar progreso hacia el Objetivo del Sprint y adaptar el Sprint Backlog | Developers; misma hora y lugar; estructura libre | 15 min |
| Sprint Review | Inspeccionar el resultado y determinar adaptaciones | Scrum Team + interesados clave; sesión de trabajo; penúltimo evento | Máx. 4 h |
| Sprint Retrospective | Planificar formas de aumentar calidad y efectividad | Inspecciona personas, interacciones, procesos, herramientas y DoD; mejoras pueden ir al Sprint Backlog siguiente | Máx. 3 h |

- Prácticas de pronóstico mencionadas: **burn-downs, burn-ups y flujos acumulativos (cumulative flow)**; útiles pero no reemplazan el empirismo (Guía, pág 9).
- El refinamiento es una actividad continua, no un evento (Guía, pág 12).

**Artefactos y compromisos** (Guía, págs 11-14)

| Artefacto | Qué es | Compromiso | Detalle del compromiso |
|---|---|---|---|
| Product Backlog | Lista emergente y ordenada de lo necesario para mejorar el producto; única fuente de trabajo. PBIs "preparados" tras refinamiento (descripción, orden, tamaño). Dimensionamiento: Developers | **Objetivo del Producto (Product Goal)** | Estado futuro del producto; objetivo a largo plazo; se cumple o abandona antes de asumir el siguiente. Producto = vehículo de valor con límite claro, interesados y usuarios definidos |
| Sprint Backlog | Objetivo del Sprint (por qué) + PBIs seleccionados (qué) + plan de acción (cómo); por y para los Developers; se actualiza durante el Sprint | **Objetivo del Sprint (Sprint Goal)** | Único propósito del Sprint; da flexibilidad sobre el trabajo exacto; se crea en la Sprint Planning; si el trabajo difiere, se negocia alcance con el PO sin afectar el objetivo |
| Increment | Peldaño concreto hacia el Objetivo del Producto; se suma a los anteriores; debe ser utilizable; puede haber varios por Sprint y liberarse antes de la Review | **Definición de Terminado (DoD)** | Descripción formal del estado del Increment cuando cumple las medidas de calidad; al cumplirla "nace" un Increment; lo que no la cumple vuelve al Product Backlog; si hay estándar organizacional es el mínimo; varios equipos en un producto comparten DoD |

**Cambios 2017 → 2020** (Guía, págs 15-16): menos prescriptiva (se eliminan las preguntas de la Daily); un solo Scrum Team (fin del "equipo dentro del equipo"); se introduce el Objetivo del Producto; compromisos por artefacto; autogestión en lugar de autoorganización; tercer tema "Por qué" en la Sprint Planning; lenguaje no centrado en TI; menos de 13 páginas.

**Implicancias**
- La plataforma debe modelar los tres compromisos como entidades de primer nivel ligadas a cada artefacto.
- Time-boxes y reglas de cancelación (solo PO) deben ser configurables y validables.
- Las métricas de pronóstico (burn-down/up, CFD) son de apoyo, no sustituyen la inspección empírica.

### 3.2 El Corazón de la Agilidad (A. Cockburn, 2016; trad. A. Villena, 2020)

**Tesis**: la agilidad se ha "decorado" en exceso; su esencia (kokoro) cabe en cuatro imperativos: **Colabora, Entrega, Reflexiona, Mejora**, suficientes y expandibles a las complejidades modernas (Corazón, pág 1).

- **Shu-Ha-Ri-Kokoro** (pág 1-2): Shu = seguir/aprender una técnica; Ha = separarse/recolectar técnicas; Ri = abandonar/inventar y mezclar; Kokoro = esencia, retorno a lo básico ("solo domina lo básico").
- **Expansión de primer nivel** (Fig. 3, pág 2): Colabora → Confianza, Motivación y colaboración; Entrega → Entrega para aprender y lograr valor, Flujo interno; Reflexiona → Introspección, Examina datos; Mejora → Experimenta, Cambia.
- **Expansión de segundo nivel** (Fig. 4, pág 3): incluye seguridad emocional, permite fallar, recompensas, política, romper silos, tarjetas de colaboración, costo técnico/social, retorno temprano, producción Lean, gestión de colas, Kanban, solutions focus, entre otros.
- **Entrega**: interna (desarrollo incremental, Lean, colas, cuellos de botella, límites WIP, Kanban) y externa (entregar para aprender vs entregar para obtener valor) (págs 2-3).
- **Reflexiona y mejora**: la reflexión se hace mal; combina información subjetiva (equipo/proceso) y objetiva (datos de uso del producto); "Solutions Focus coaching" para mejorar (pág 3).
- **Agilidad a escala**: los métodos de escalamiento cambian la estructura (scrum de scrums, backlog de backlogs) pero no la actitud; preguntar cómo aumentar colaboración, entregas reales, reflexión y experimentos pequeños (pág 3).
- **Cómo empezar** (págs 3-4): 1) cada persona lista con quién colabora y califica la calidad de la colaboración (grafo social); 2) examinar tamaño de incrementos y tiempo de liberación, cortar rodajas más finas, entregar para aprender; 3) detenerse y reflexionar, analizar datos de uso, un experimento al mes; 4) boletín que haga visible el movimiento de la organización.

**Implicancias**: la plataforma puede incluir un "mapa de colaboración", métricas de tamaño de incremento y tiempo de liberación, un registro de experimentos mensuales y un boletín/feed de visibilidad.

### 3.3 17th State of Agile Report (digital.ai, 2023)

**Tesis**: Agile sigue aportando valor (especialmente en empresas pequeñas), pero las organizaciones medianas y grandes están menos satisfechas, enfrentan barreras culturales y adoptan modelos híbridos "mix-and-match"; la desconexión entre la visión de negocio (valor) y la de los equipos explica parte de las dificultades. 788 encuestados (SoA17, págs 3-4).

**Datos clave**
- 71% usa Agile en su SDLC; 42% modelo híbrido; 36% DevOps; 29% iterativo; 28% waterfall; 18% Lean; 10% proceso propio (pág 11). Grandes empresas: 49% híbrido, 31% aún waterfall.
- **Scrum es la metodología de equipo más popular: 63%** de los usuarios ágiles a nivel equipo (págs 4, 11).
- Nivel empresa: SAFe 26%, Scrum@Scale/Scrum of Scrums 19%, sin framework mandatado 22%, framework propio 12%, Enterprise Scrum 4%, DA 3%, Lean Mgmt/Spotify/LeSS 2% c/u (pág 18).
- Prioridades de desarrollo: satisfacción del cliente 43%, tiempo de entrega 39%, ventaja competitiva 34% (pág 5).
- Medición a nivel ejecutivo: métricas de proyecto individuales 39%, OKRs ligados a épicas 32%, encuestas a clientes 29%, métricas TI 26%, KPIs de Value Stream 25%, NPS 23%, métricas de flujo 18%, DORA 6% (pág 6).
- **Cómo se mide a los equipos** (pág 7): **velocity 36%**, valor entregado 29%, **predictibilidad (planned-to-done ratio) 25%**, **sprint burndown 21%**, **epic & release burndown 18%**, productividad (cycle time) 17%, throughput 15%, estabilidad (felicidad) 12%, frecuencia de despliegue 9%, escaped defects/change failure rate 7%, cumulative flow 7%, lead time for changes 7%, failed deployments 3%, MTTR 2%, blocked time 2%.
- Áreas que usan Agile: TI 69%, equipo SDLC 68%, ingeniería/producto/I+D 48% (mayor crecimiento, +16 pts), operaciones 28%, soporte 22%, marketing 19%, RR.HH. 17%, finanzas 13%, ventas 12% (pág 8).
- Liderazgo de la transformación: ejecutivos 32%, limitado a equipos técnicos 31%, CIO/CTO 20% (pág 9). Agile empresarial funciona bien para 44% (52% pequeñas vs 43% grandes) (pág 10).
- Motivos de adopción: priorizar/entregar/medir valor incremental 41%, acelerar time-to-market 41%, transformación digital 34%, predictibilidad de entrega 30% (pág 12).
- Beneficios: colaboración 59%, alineamiento con el negocio 57%, mejor ambiente 36%, mejor calidad 25%, visibilidad SDLC 21% (pág 13). 63% tiene visibilidad del pipeline ágil; 55% visibilidad completa del SDLC.
- Satisfacción con Agile cayó de 71-72% (2022) a 59% (págs 14).
- Barreras en el negocio: resistencia al cambio/choque cultural 47%, poca participación del liderazgo 41%, apoyo/patrocinio insuficiente 38%, negocio no entiende Agile 37%, poca capacitación 27%; solo 6% sin barreras (pág 15).
- Por qué no escala: sistemas legados que exigen enfoque mixto 46%, silos 37%, cultura 34%, uso inconsistente 30%, **no se puede medir el valor al negocio 28%**, baja adopción 25% (pág 16).
- Desafíos de adopción: liderazgo no entiende y pone obstáculos 36%, equipos no empoderados 33%, negocio no entiende 29%, falta de prioridades claras 28% (pág 17).
- Herramientas EAPT: Jira Align ~40% (50% en grandes) (pág 19). Herramientas de equipo: Jira 62%, Mural/Miro 32%, Azure DevOps 25%, Excel 25%, MS Project 13%, Trello 9% (pág 20).
- IA: 29% explora/integra LLM y asistentes de código; 22% uso individual sin plan; 8% tiene prohibido usarla (pág 21).
- DevOps: deseo de visibilidad y trazabilidad end-to-end 44%, medir cycle time/wait time/cuellos de botella 34%, pruebas continuas tempranas 29%, riesgos técnicos y dependencias 28% (pág 22).
- Equipos distribuidos: 91%; 81% provee capacitación/coaching continuo (pág 23).

**Implicancias**: la plataforma debería medir valor (no solo velocity), ofrecer trazabilidad iniciativa→épica→HU→entrega, métricas de flujo (cycle/lead time, bloqueos), OKRs ligados a épicas, soporte híbrido (ágil + predictivo) y colaboración remota tipo pizarra.

---

## 4. Marcos, estándares y modelos referenciados

- **Manifiesto Ágil** (4 valores, 12 principios) – S1 págs 13-17.
- **Guía Scrum 2020** – documento completo; S2 pág 6.
- **Corazón de la Agilidad / Shu-Ha-Ri** (Cockburn) – S1 pág 18.
- **Modelo Cynefin** – S1 págs 35-40.
- **VUCA / BANI** – S1 págs 6-7.
- **Triángulo de hierro vs triángulo Agile** – S1 págs 20-21.
- **Métodos**: Kanban, XP, Crystal, Lean Startup, FDD, AUP, DSDM, ASD, ScrumBan – S1 págs 28-30.
- **Marcos de escalamiento** (citados en encuestas): SAFe, Scrum@Scale, Scrum of Scrums, LeSS, Nexus, Disciplined Agile, Spotify, Enterprise Scrum – S1 pág 33; SoA17 pág 18.
- **Enfoque de SCRUMstudy (SBOK)**: el curso usa terminología de SCRUMstudy (6 principios Scrum, roles centrales/no centrales, fases Inicio → Lanzamiento, time-box por semana) (S2 págs 8-14, 17, 24; S4 pág 17). *(La atribución de los 6 principios y fases a la guía SBOK de SCRUMstudy es complemento, no del material.)*
- **Modelo Kano**, **MoSCoW**, **DIKW**, **FODA**, **Elevator pitch de G. Moore** – S2/S3.
- **Métricas DORA, NPS, OKR, Value Stream** – SoA17 págs 6-7; S3 pág 48 (NPS).

**Discrepancias entre el material del curso y la Guía Scrum 2020** (relevante para configurar la plataforma):

| Tema | Curso | Guía 2020 |
|---|---|---|
| Duración del sprint | 1-4 semanas (S2 pág 13); 1-6 semanas (S3 pág 27) | ≤ 1 mes |
| Time-box Planning / Review / Retro | 2 h / 1 h / 1 h por semana de sprint | Máx. 8 h / 4 h / 3 h para sprint de 1 mes |
| Tamaño | Equipo de desarrollo 6-10 (S2 pág 30) | Scrum Team completo ≤ 10 |
| Eventos | 5, incluye Refinamiento (S3 pág 17) | Sprint + 4 eventos; refinamiento es actividad continua |
| Cambios en Sprint Backlog | No cambia; si es imperativo, se termina el sprint (S2 pág 49) | Se actualiza durante el sprint; alcance renegociable sin afectar el Sprint Goal; solo el PO cancela |
| Daily | Tres preguntas (S3 pág 38) | Preguntas eliminadas; estructura libre |
| Autoorganización vs autogestión | "Auto-organización" (S2 pág 10) | "Autogestión" |

---

## 5. Técnicas y herramientas

| Técnica | Qué es | Cuándo | Pasos / estructura | Entradas | Salidas | Ref. |
|---|---|---|---|---|---|---|
| Clasificación Cynefin | Marco de decisión según relación causa-efecto | Al elegir enfoque (predictivo/ágil) para un proyecto | Identificar dominio → aplicar secuencia de acción del dominio | Descripción del proyecto | Dominio y tipo de prácticas | S1 35-42 |
| Análisis FODA | Diagnóstico interno/externo | Inicio, visión de producto | 4 cuadrantes | Supuestos del negocio | Panorama del proyecto | S2 18 |
| Canvas del producto | Lienzo de una página | Inicio | CodeName, frase, visión, usuarios, necesidades, producto, valor | FODA, necesidades | Visión estructurada | S2 19 |
| Elevator pitch | Enunciado de visión (G. Moore) | Inicio | Para / Quién / El…es un / Que / A diferencia de / Nuestro producto | Canvas | Enunciado de visión | S2 20-21 |
| Historias de usuario | Requerimiento desde el usuario | Construcción y refinamiento del backlog | "Como… quiero… para…" + criterios de aceptación; épica → HU | Visión, stakeholders | PBIs | S2 37-41 |
| MoSCoW | Priorización por categorías | Priorización del backlog | Must, Should, Could, Won't | HU | Backlog ordenado | S2 43 |
| Kano | Clasificación por impacto en satisfacción | Priorización | Atractiva, unidimensional, requerida, indiferente | HU | Prioridad por tipo de calidad | S2 44 |
| Otros métodos de priorización | 100 puntos, comparación por pares, valor vs complejidad, Eisenhower, Monopoly, Pareto | Priorización | (solo listados) | HU | Orden | S2 42 |
| Planning Poker | Estimación relativa por consenso | Estimación de HU | 6 pasos (ver §2 S3) | HU, criterios | Puntos de historia | S3 9 |
| Tallas de camiseta | Estimación por tallas XS-L | Estimación gruesa | XS=1, S=2-3, M=5-8, L=13-20 | HU | Talla/puntos | S3 10 |
| Tiempo ideal | Horas/días ideales | Estimación de tareas | Premisas: solo el ejecutor, recursos disponibles, sin interrupciones | Tareas | Horas ideales | S3 11 |
| Fibonacci | Serie para estimación relativa | Estimación | 1, 2, 3, 5, 8, 13, 20… *(valores de la serie de cartas: complemento, no del material, salvo los de la pág 10)* | — | — | S3 7 |
| Planificación de lanzamiento / roadmap | Distribución de HU en sprints y releases | Tras estimar y priorizar | 6 pasos (ver §2 S3) | Backlog estimado, velocidad, restricciones | Roadmap releases × sprints | S3 26-29 |
| Retrospectiva en 5 pasos | Estructura de retro | Fin de sprint | Preparar → recopilar → generar información → acción → cierre | Datos del sprint | Acciones de mejora | S3 23 |
| Scrumboard | Tablero visual | Durante el sprint | Historias × (Por hacer, En proceso, En pruebas, Realizado) | Sprint Backlog | Estado visible | S2 47 |
| Burndown chart | Trabajo restante vs tiempo | Durante el sprint/proyecto | Puntos restantes por día; solo tareas terminadas | Estimaciones y avance | Tendencia | S2 48 |
| Diagnóstico de antipatrones | Señales y preguntas clave | Revisión de salud del equipo | Señales de alerta + 4 preguntas + criterios de intervención SM | Métricas y observación | Antipatrón y acción | S4 9-11 |
| Mapa de colaboración (Cockburn) | Grafo social de colaboración | Inicio de transformación | Cada persona lista colaboradores y califica la colaboración | Personas | Grafo, dónde empezar | Corazón 3 |

---

## 6. Plantillas y artefactos (campos concretos)

> No hay plantillas pptx/docx/xlsx en el material del ramo; las siguientes se derivan de las láminas y de la Guía.

**Canvas del producto** (S2 pág 19): CodeName · Frase representativa · Visión · Grupos de usuarios · Necesidades · Producto · Valor.

**FODA** (S2 pág 18): Fortalezas · Debilidades (internos) · Oportunidades · Amenazas (externos).

**Enunciado de visión – Elevator pitch** (S2 pág 20): Para [clientes objetivo] · Quién [necesidad/oportunidad] · El [nombre] es un [categoría] · Que [beneficios] · A diferencia de [competencia] · Nuestro producto [diferenciador].

**Objetivo del Producto** (Guía pág 12): descripción del estado futuro · estado (activo / cumplido / abandonado) · producto asociado (límite, interesados, usuarios).

**Ítem del Product Backlog / Historia de usuario** (S2 págs 36-41; Guía pág 12): ID · tipo (funcionalidad/HU, caso de uso, narrativa, defecto, trabajo técnico, adquisición de conocimiento) · épica padre · rol ("Como") · funcionalidad ("quiero") · beneficio ("para") · criterios de aceptación (lista aprobado/no aprobado: características, RNF, reglas de negocio, flujos alternos y de excepción) · prioridad/orden (valor, riesgo, dependencias; categoría MoSCoW/Kano) · estimación (puntos de historia / talla / horas ideales) · estado "Ready" · release y sprint asignados.

**Sprint Backlog** (S2 pág 46; Guía págs 11-12): Objetivo del Sprint (por qué) · PBIs seleccionados (qué) · tareas técnicas ≤ 1 día (cómo) con responsable y estado · capacidad/velocidad comprometida · puntos comprometidos.

**Scrumboard** (S2 pág 47): filas por HU; columnas Por hacer · En proceso · En pruebas · Realizado.

**Burndown del sprint** (S2 pág 48): eje X días del sprint; eje Y puntos de historia restantes; línea estimada vs real.

**Definición de Terminado** (S2 pág 52; Guía págs 13-14): lista de criterios de calidad aplicables a todas las HU (p. ej., prueba unitaria exitosa, pruebas de QA, diseño aprobado por excelencia técnica) · origen (estándar organizacional / del equipo) · equipos que la comparten.

**Roadmap / plan de lanzamiento** (S3 págs 26-29): proyecto · releases · sprints por release · HU/épicas por sprint · duración del sprint · velocidad del equipo · esfuerzo total · dependencias.

**Registro de retrospectiva** (S3 págs 23, 40): información recopilada · lecciones aprendidas · acciones de mejora (responsable, estado de seguimiento) · situaciones anómalas · rendimiento del equipo.

**Daily** (S3 págs 20, 38): progreso hacia el Sprint Goal · plan del día · impedimentos/riesgos.

**Trabajo final** (S4 pág 20): visión (SWOT, Canvas, pitch) · backlog ≥ 15 HU con criterios · método de estimación/priorización · roadmap con definiciones y HU desglosadas · comparación backlog inicial vs final · uso de IA y prompts.

---

## 7. Fórmulas, indicadores y escalas

**Escalas de estimación**
- Puntos de historia en serie Fibonacci (S3 págs 7-8).
- Tallas de camiseta: XS = 1; S = 2-3; M = 5-8; L = 13-20 (S3 pág 10).
- Horas/días ideales (S3 pág 11).

**Time-boxes** – ver tabla de discrepancias en §4 (curso: Planning 2 h/semana, Review 1 h/semana, Retro 1 h/semana, Daily 15 min; Guía: 8 h/4 h/3 h por sprint de un mes, Daily 15 min).

**Métricas ágiles del material**

| Métrica | Definición / uso | Fuente |
|---|---|---|
| **Velocidad (velocity)** | Trabajo completado por sprint en la unidad de estimación del equipo; sirve para planificar roadmap y sprint, seguimiento, mejora continua, transparencia; pronóstico de fecha de fin y del trabajo del próximo sprint. Ejemplo: S1-S7 = 80, 70, 95, 105, 130, 110, 120 | S2 46; S3 28, 43 |
| Velocidad comprometida vs real | Comprometida en la Planning; real validada en la Review | S3 37, 39 |
| **Burndown del sprint** | Puntos restantes vs días; actualizado en la Daily; solo tareas terminadas | S2 48; S3 38 |
| **Burndown del proyecto / release** | Puntos completados, actualizado en la Review | S3 39 |
| Burn-up, flujo acumulativo (CFD) | Prácticas de pronóstico citadas | Guía 9 |
| **Lead time** | Tiempo desde la solicitud hasta la entrega de una funcionalidad, según criticidad; posible SLA | S3 44 |
| Urgencia y prioridad/valor de requisitos completados | Alineamiento con objetivos y estrategia | S3 44 |
| **Valor acumulado / velocidad de aporte de valor** | Valor entregado en el tiempo desde la perspectiva del cliente | S3 45 |
| Requisitos completados en la iteración; próximos requisitos; cambios incorporados y requisitos añadidos; requisitos completados vs total | Métricas de resultado del proyecto | S3 46 |
| ROI; presupuesto disponible/utilizado; desviación financiera vs plan | Métricas financieras | S3 47 |
| Satisfacción cliente/usuario; NPS; índice de reclamos; índice de ventas | Métricas de calidad | S3 48 |
| Errores (defectos internos) vs incidencias (defectos detectados por cliente) | Calidad | S3 49 |
| Historias rechazadas vs desarrolladas | Cumplimiento de criterios de completitud | S3 50 |
| Calidad de documentación | Existencia y cobertura (funcional, técnica, pruebas, implantación) | S3 50 |
| Riesgos e impedimentos; lecciones aprendidas; actividades de mejora; situaciones anómalas; % de participación en dailies | Riesgo, procesos y mejora continua | S3 51 |
| Tiempo de liberación al mercado; valor entregado; satisfacción | Datos de releases | S3 41 |
| Predictibilidad (planned-to-done ratio), cycle time, throughput, felicidad del equipo, frecuencia de despliegue, change failure rate, lead time for changes, MTTR, blocked time | Métricas de equipo reportadas en la encuesta | SoA17 7 |
| OKRs ligados a épicas, KPIs de value stream, métricas de flujo, DORA | Medición a nivel ejecutivo | SoA17 6 |

**Fuentes de datos por evento** (S3 págs 37-41)

| Evento | Datos |
|---|---|
| Sprint Planning | Velocidad comprometida; puntos de historia comprometidos |
| Daily Standup | Progreso del sprint; impedimentos/riesgos; burndown del sprint |
| Sprint Review | Velocidad real; burndown del proyecto (puntos completados); backlog con HU completadas |
| Retrospectiva | Lecciones aprendidas; acciones de mejora; situaciones anómalas; rendimiento del equipo |
| Releases | Tiempo de liberación al mercado; valor entregado; satisfacción cliente/usuario |

**Fórmulas derivadas** *(complemento, no del material; el material define los conceptos pero no escribe las fórmulas)*
- Velocidad promedio = Σ puntos terminados en los últimos n sprints / n.
- Sprints restantes ≈ puntos restantes del backlog / velocidad promedio.
- Predictibilidad = puntos terminados / puntos comprometidos.
- Tasa de rechazo = HU rechazadas / HU desarrolladas.
- Lead time = fecha de entrega − fecha de solicitud; cycle time = fecha de entrega − fecha de inicio del trabajo.
- Línea ideal del burndown(día d) = puntos comprometidos × (1 − d / días del sprint).

---

## 8. Aplicación en la plataforma

### 8.1 Módulos y funcionalidades

1. **Selector de enfoque (Cynefin)**: cuestionario que clasifica el proyecto (obvio, complicado, complejo, caótico, desordenado) y sugiere enfoque predictivo, ágil o híbrido (S1 35-42; SoA17 pág 11 sobre híbridos).
2. **Visión de producto**: plantillas digitales de FODA, Canvas del producto y elevator pitch; registro del **Objetivo del Producto** con estado (activo/cumplido/abandonado) y regla de un objetivo activo a la vez (Guía pág 12).
3. **Product Backlog**:
   - Jerarquía Objetivo del Producto → Épica → HU → Tarea; tipos de PBI (funcionalidad, defecto, trabajo técnico, adquisición de conocimiento).
   - Editor de HU con formato "Como/quiero/para" y lista de criterios de aceptación aprobado/no aprobado.
   - Priorización asistida: MoSCoW, Kano, 100 puntos, valor vs complejidad, Eisenhower, Pareto; campos de valor, riesgo y dependencias.
   - Vista "iceberg" (ítems superiores refinados y pequeños), marca "Ready", historial de cambios (backlog inicial vs final, requerido en el trabajo final, S4 pág 20).
   - Refinamiento como actividad continua, dirigida por el PO.
4. **Estimación**: sala de Planning Poker en línea (Fibonacci, rondas, revelación simultánea, argumentos de mínimo/máximo, corte tras 3 rondas por el SM); modo T-shirt con equivalencia configurable a puntos (XS=1, S=2-3, M=5-8, L=13-20); horas ideales para tareas.
5. **Roadmap / planificación de lanzamiento**: asistente de 6 pasos (esfuerzo total → duración del sprint → velocidad → distribuir por prioridad/dependencias → desglosar épicas → planear sprints); vista releases × sprints; recálculo automático al cambiar velocidad o backlog.
6. **Sprint**:
   - Creación con duración fija (validación configurable: ≤ 1 mes según Guía, o 1-4/1-6 semanas según criterio del curso).
   - **Sprint Planning** guiada por los tres temas (Por qué → Sprint Goal obligatorio antes de cerrar; Qué → selección según velocidad/capacidad; Cómo → tareas ≤ 1 día).
   - **Sprint Backlog** con Sprint Goal visible; cambios de alcance registrados y negociados con el PO sin afectar el objetivo; cancelación solo por el PO.
   - **Scrumboard** (Por hacer / En proceso / En pruebas / Realizado) con filas por HU, autoasignación (pull) y opcional límite WIP (Corazón pág 2).
   - **Definition of Done** versionada (organizacional + del equipo); un ítem solo pasa a "Realizado"/Increment si cumple todos los criterios de DoD; si no, vuelve al Product Backlog.
7. **Eventos**: agenda con time-boxes calculados según la duración del sprint (regla del curso o de la Guía); plantillas de Daily (progreso al Sprint Goal, plan, impedimentos), Review (incremento, cambios del entorno, ajustes al backlog, invitación a interesados), Retrospectiva en 5 pasos con acciones de mejora rastreables que pueden ir al siguiente Sprint Backlog.
8. **Incremento y releases**: registro de incrementos (varios por sprint, liberables antes de la Review), vínculo a MVP/hipótesis, fecha de liberación y valor entregado.
9. **Dashboard de métricas ágiles**:
   - Velocity por sprint (comprometida vs real) y promedio móvil; alerta de variabilidad excesiva (S4 pág 9).
   - Burndown del sprint y burndown/burn-up del release; alerta si el burndown no baja hasta el último día (S4 pág 9).
   - Cumulative flow, lead time y cycle time, throughput, tiempo bloqueado.
   - Predictibilidad (planned-to-done), valor acumulado, requisitos completados vs total, cambios incorporados.
   - Calidad: errores vs incidencias, HU rechazadas vs desarrolladas, NPS/satisfacción, reclamos.
   - Finanzas: presupuesto usado/disponible, desviación, ROI.
   - Mejora continua: impedimentos abiertos y tiempo de resolución, acciones de retro implementadas, % de asistencia a dailies.
   - Estructura DIKW: datos → información → conocimiento → decisión (reestimación).
   - OKRs ligados a épicas y trazabilidad iniciativa → épica → HU → entrega (SoA17 págs 6, 22).
10. **Salud del equipo y antipatrones**: detector basado en señales (velocity variable, burndown plano, ceremonias omitidas, retros sin acciones, decisiones del PO lentas, daily que excede 15 min) con sugerencias de intervención del SM y checklist de las 4 preguntas de diagnóstico.
11. **Roles y permisos**: PO (backlog, orden, Objetivo del Producto, aceptación, cancelación de sprint), SM (facilitación, impedimentos, configuración de eventos), Developers (Sprint Backlog, tareas, estimación), interesados (lectura, participación en Review). Validar un único PO por producto y tamaño de equipo ≤ 10.
12. **Colaboración y visibilidad** (Corazón págs 3-4): mapa de colaboración, registro de experimentos mensuales, boletín/feed de avances.

### 8.2 Flujos concretos

- **Flujo de inicio**: Cynefin → FODA → Canvas → Elevator pitch → Objetivo del Producto → épicas.
- **Flujo de backlog**: crear HU con criterios → priorizar (MoSCoW/Kano) → estimar (Planning Poker) → desglosar épicas que no caben en un sprint → re-estimar → roadmap.
- **Flujo de sprint**: Planning (Sprint Goal + selección por velocidad + tareas) → Daily (actualiza burndown e impedimentos) → validación DoD → Review (velocidad real, burndown de proyecto, ajustes al backlog) → Retro (acciones de mejora) → siguiente sprint.
- **Flujo de métricas**: cada evento alimenta automáticamente los datos de la tabla de §7 hacia el dashboard.

---

## 9. Glosario breve

- **Agilidad**: habilidad de crear y responder al cambio equilibrando flexibilidad y estabilidad (Highsmith).
- **Scrum**: marco liviano para generar valor mediante soluciones adaptativas a problemas complejos.
- **Empirismo**: conocimiento basado en la experiencia y en decisiones según lo observado; pilares transparencia, inspección, adaptación.
- **Scrum Team**: PO + SM + Developers; multifuncional y autogestionado.
- **Product Owner**: responsable de maximizar el valor y gestionar el Product Backlog.
- **Scrum Master**: responsable de establecer Scrum y de la efectividad del equipo; líder servicial.
- **Developers**: quienes crean el Increment.
- **Product Backlog / PBI**: lista emergente y ordenada / elemento de esa lista.
- **Objetivo del Producto (Product Goal)**: estado futuro del producto; compromiso del Product Backlog.
- **Sprint Backlog**: Sprint Goal + PBIs seleccionados + plan.
- **Objetivo del Sprint (Sprint Goal)**: único propósito del sprint.
- **Increment**: peldaño utilizable hacia el Objetivo del Producto.
- **Definición de Terminado (DoD)**: estado formal de calidad que debe cumplir un Increment.
- **Historia de usuario / Épica**: requerimiento desde el usuario / requerimiento genérico que se desglosa en HU.
- **Criterios de aceptación**: condiciones específicas de una HU para ser aprobada.
- **Punto de historia**: unidad relativa de esfuerzo, complejidad e incertidumbre.
- **Velocidad**: trabajo completado por sprint.
- **Burndown**: gráfico de trabajo restante en el tiempo.
- **Lead time**: tiempo desde la solicitud hasta la entrega.
- **Time-box**: duración máxima fija de un evento.
- **Refinamiento**: actividad continua de detallar, dividir, ordenar y dimensionar PBIs.
- **MVP**: versión más simple para validar hipótesis de negocio.
- **Roadmap**: distribución de releases, sprints y HU.
- **Scrum-But**: hacer Scrum omitiendo elementos esenciales.
- **Cynefin**: marco de decisión con dominios obvio, complicado, complejo, caótico y desordenado.
- **Kokoro**: esencia; en Cockburn, Colabora-Entrega-Reflexiona-Mejora.
- **VUCA**: volatilidad, incertidumbre, complejidad, ambigüedad.

---

## 10. Vacíos de extracción

- Varias láminas son imágenes sin texto extraíble; se renderizaron y revisaron: S1 págs 13, 18, 20, 21, 31-33, 45, 47; S2 págs 5, 19, 34, 36, 38, 47; S3 págs 4, 10, 19, 23, 36, 45; S4 págs 16, 18; Corazón págs 2-3. Su contenido se integró arriba.
- No se renderizaron (prioridad baja o redundantes): S1 pág 7 (imagen BANI, solo título extraído), pág 22 (diagrama cascada vs Scrum, texto extraído suficiente), pág 29 (mapa de métodos); S2 págs 7, 9, 11-13 (diagramas cuyo texto se extrajo); S3 págs 48-51 (solo texto). Los detalles gráficos de esas láminas pueden estar incompletos.
- S1 pág 7: el contenido del gráfico BANI no se transcribe en el texto; solo se cita como "entornos actuales".
- S1 pág 48, S2 pág 53, S3 pág 52 y S4 pág 21: láminas de "tiempo de preguntas" sin contenido técnico (S2 pág 53 verificada visualmente).
- El ejemplo de velocity (S3 pág 43) no indica la unidad (se asume puntos de historia).
- S3 pág 10: el texto de las tarjetas de tallas está en imagen pequeña; la descripción de la talla L se leyó parcialmente ("Demasiada incertidumbre, dependencia de otras áreas con desarrollos nuevos").
- No hay plantillas pptx/docx/xlsx en la carpeta del ramo; las plantillas de §6 se derivan de las láminas.
- Las tablas de datos de encuestas citadas en S1 (State of Agile 2025, #18 y Scrum Network 2024) provienen de imágenes; no hay documento fuente completo en el material salvo el 17th report.
- Casos de la actividad S4 pág 13 usan nombres de empresas (aparentemente ficticios); se refieren genéricamente.
- Los enlaces a Mural y Menti de las actividades se omiten intencionalmente.

---

*Nota: esta ficha resume material académico; antes de usarla para decisiones de diseño o comunicaciones oficiales, revise y verifique su contenido contra las fuentes originales.*
