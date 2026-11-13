# Ficha de conocimiento: 08_six_sigma (Six Sigma)

> Fuente: material del ramo en `/home/user/material/08_six_sigma/` (4 PDFs de sesiones + `Template FMEA.xls`) y texto extraído en `/home/user/conocimiento/_texto/08_six_sigma/`. Las referencias "S N, pág X" indican sesión y página del PDF. Lo que no proviene del material va marcado "(complemento, no del material)".
>
> Aviso: esta ficha es un apoyo de estudio y de diseño de producto generado con asistencia de IA. Las fórmulas, umbrales y tablas deben verificarse contra el material original y fuentes estadísticas reconocidas antes de usarlas en decisiones de negocio o en la implementación de cálculos de la plataforma.

---

## 1. Resumen del ramo

- **Objetivo general:** comprender los fundamentos de la calidad y de Six Sigma, como filosofía y como metodología de resolución de problemas basada en datos. El ramo cubre la estadística necesaria para analizar procesos (descriptiva, control estadístico, inferencial) y el ciclo **DMAIC** en 15 pasos, con sus herramientas.
- **Nº de sesiones:** 4 (mayo y junio de 2026).
  - S1: Introducción y fundamentos Six Sigma (82 págs.)
  - S2: Análisis de datos (85 págs.)
  - S3: El ciclo DMAIC, parte 1: Definir y Medir (66 págs.)
  - S4: El ciclo DMAIC, parte 2: Analizar, Mejorar y Controlar (71 págs.)
- **Materiales:** 4 presentaciones PDF y la plantilla **Template FMEA.xls** (formulario FMEA de proceso/producto).
- **Dinámica:** cada sesión alterna teoría con **trabajos grupales** de 10 a 30 min sobre un proyecto real de algún integrante del equipo (cálculo de DPMO, Cp/Cpk, Project Charter, VOC→CCR, SIPOC, plan de medición, Ishikawa, lluvia de ideas, FMEA). Cada sesión cierra con test y encuesta.
- **Bibliografía citada:** Juran's Quality Handbook (J. M. Juran); CSSGB Primer (Quality Council of Indiana); The Goal (Goldratt & Cox); Rath & Strong's Six Sigma Pocket Guide; The Cartoon Guide to Statistics (L. Gonick); Understanding Variation (D. Wheeler); Six Sigma for Dummies (Gygi, DeCarlo, Williams).

---

## 2. Contenido por sesión

### Sesión 1: Introducción y fundamentos Six Sigma

**Objetivos (pág. 4):** comprender los fundamentos de la calidad; conocer la evolución de la calidad y el costo de la mala calidad; comprender la definición de Six Sigma; identificar roles y responsabilidades en un proyecto Six Sigma.

**Conceptos de calidad**
- **Calidad (ASQ, pág. 8):** término subjetivo que en sentido técnico significa (a) las características de un producto o servicio que le dan la habilidad de satisfacer necesidades y (b) un producto o servicio sin deficiencias.
- **Calidad con minúscula frente a Calidad con Mayúscula (págs. 9-10):**

| Tópico | calidad (tradicional) | Calidad (actual) |
|---|---|---|
| Productos | Bienes manufacturados | Todos los productos, bienes, servicios e información |
| Procesos | Ligados a manufactura | Todos (soporte, servicios, negocio) |
| Industrias | Manufactura | Todas (incluido gobierno) |
| Se considera | Problema tecnológico | Problema del negocio |
| Cliente | Quien compra | Todos los afectados, internos y externos |
| Cómo pensar | Cultura de departamentos funcionales | Trilogía universal |
| Objetivos | De fábrica | En el plan de negocio |
| Costos de calidad | Asociados a bienes defectuosos | Todos los costos que desaparecerían si todo fuera perfecto |
| Evaluación | Conformidad con especificaciones | Capacidad de responder a necesidades del cliente |
| Mejoras dirigidas a | Desempeño departamental | Desempeño de la compañía |
| Entrenamiento | Departamento de Calidad | Toda la compañía |
| Coordinación | Gerente de Calidad | Comité de Alta Dirección |

- **Salón de la fama de la calidad (pág. 11):** Shewhart, Deming, Juran, Shingo, Ohno, Ishikawa, Taguchi, Crosby.
- **Las 7 herramientas básicas de control de calidad (pág. 12):** diagrama de flujo, diagrama causa-efecto, Pareto, hojas de verificación, histograma, gráficas de control, diagrama de dispersión.
- **Costos de calidad (págs. 13-15):** "todos los costos que desaparecerían si hiciéramos todo perfecto". Hay cuatro categorías:
  - *Prevención:* planificación, revisiones de diseño, educación y entrenamiento, procedimientos, orden y limpieza, mantención de equipos, encuestas.
  - *Evaluación:* inspecciones, auditorías, controles, test.
  - *Fallas internas:* reprocesos, retrasos, faltantes/merma/scrap, tiempos improductivos, proveedores.
  - *Fallas externas:* devoluciones, reclamos, logística inversa, garantías, pérdida de servicio.
- **Línea de tiempo (pág. 16):** línea de ensamblaje de Ford (1900s), SPC de Shewhart en Bell Labs (1920s), SPC de Deming (1940s), TQM en Japón (1950-60s), Toyota Production System (1960s), TQM en EE.UU. y Six Sigma en Motorola (1980s), Lean (1990s).

**Definiciones Six Sigma (págs. 17-25)**
- Historia: Motorola fue el primer promotor en los 80. Six Sigma usa herramientas estadísticas y el enfoque estructurado DMAIC sobre proyectos de alto retorno. Los ejecutores ("Black Belts") debían lograr beneficios financieros con 3 a 6 proyectos al año. Entre los primeros adoptantes estuvieron GE, Allied Signal, Sony, ITT, Caterpillar y Bombardier (pág. 18).
- Qué es: una filosofía y metodología basada en datos que mide qué tan cerca estamos de lo planeado y mejora para alcanzarlo. Separa la decisión de lo emocional y lo perceptivo, y hace los procesos más capaces y predecibles (pág. 19). Es a la vez una medición de calidad, un proceso de mejora continua y un impulsor de cambio cultural (pág. 20).
- **Principios clave (pág. 21):** pensamiento centrado en el cliente; decisión basada en datos; enfoque estructurado y estadístico para diagnosticar y eliminar defectos y reducir la variación; mejoras incrementales y exponenciales; foco en la capacidad del proceso para cumplir los requerimientos del cliente.
- **Sigma (σ, págs. 22-24):** desviación estándar, la medida de la variación de un proceso en el tiempo. Ejemplo: una lata de 355 ml.
- **Niveles de compañía (pág. 25):** promedio, 3σ (93,319 % bueno); superior al promedio, 4σ (99 %); clase mundial, 6σ (99,9997 %). "El 99 % no es suficiente" (pág. 28): ejemplos de 200.000 recetas equivocadas al año o 5.000 cirugías incorrectas por semana.
- **Meta Six Sigma (pág. 29):** 99,9997 % de precisión, es decir menos de 3,4 DPMO. El gráfico muestra la curva normal, el límite de especificación, el valor Z y la cola de probabilidad de un defectuoso (ejemplo 0,028066).
- **Orden de magnitud (págs. 30-31):** tablas de % bueno, DPMO y σ, con analogías de errores ortográficos (ver §7).
- **Unidad, oportunidad, defecto, DPU, DPO, DPMO (págs. 32-37):** ejemplo gráfico con 4 unidades, 5 oportunidades por unidad y 9 defectos, que da DPU 2,25, DPO 0,45, DPMO 450.000, 55 % bueno y ≈ 1,6σ (ver §7).
- **Tabla de equivalencias desempeño, DPMO y σ (pág. 36):** incluida completa en §7.
- **"Usa los datos" (págs. 38-40):** cita de Lord Kelvin. Sin datos no sabemos si hay un problema ni cuándo lo resolvimos. Los datos evitan el "siempre lo hemos hecho así".
- *Trabajo grupal (pág. 41):* para un producto o servicio y un mes, calcular unidades, oportunidades, DPU, OT, DPO, DPMO, desempeño y nivel sigma.

**Capacidad de un proceso (págs. 26-27, 42-51)**
- "Capability" se traduce como **capacidad estadística** (no "capacity", que es volumen).
- La capacidad es la comparación cuantificable entre la opinión del cliente (límites de especificación) y la opinión del proceso (límites de control) (pág. 42). Un proceso es **capaz** cuando sus salidas cumplen las especificaciones. Con distribución normal, el 99,73 % de los valores cae en ±3σ, lo que da una dispersión natural de 6σ (pág. 43).
- A menos variación, caben más "sigmas" entre la media y el límite de especificación más cercano (pág. 44).
- Cp y su tabla de interpretación (pág. 45), fórmulas de Cp y Cpk (pág. 46). Con **Cp frente a Cpk** (pág. 47), dos procesos con Cp = 1,45 pueden diferir: el descentrado produce no conformes. Cpk considera la posición de la media; se calculan ambos y se informa el menor.
- *Trabajo grupal (págs. 49-51):* una fábrica produce tornillos de 100 ± 5 mm (5.000 al día). Se toman 8 muestras de 5 unidades (40 en total). Se pide calcular los límites de especificación, Cp y Cpk, y graficar la gaussiana. Los datos están en §6.

**Rendimiento acumulado (págs. 52-60)**
- Ejemplo de 4 partes con inspecciones sucesivas: rendimiento 25 % → 50 % → 75 %.
- **Rendimiento clásico** YC = 3/4 = 75 %. Oculta el desempeño real.
- **Rendimiento de primera vez** YFT = 1/4 = 25 %. Es una métrica superior para impulsar la mejora.
- **"Fábrica escondida"** (pág. 55): la reelaboración, el desperdicio, el tiempo, el costo y los recursos que consume lo que no sale bien a la primera. Las métricas tradicionales la ignoran.
- **Rendimiento acumulado (RTY / YRT)** = producto de los rendimientos de primera vez de cada paso. Ejemplos: 99 % × 99 % ≈ 98 %. En un proceso de recepción, mecanizado y especificación: 0,955 × 0,97 × 0,944 = 87,5 %, con 125.526 DPMO "malgastados" (pág. 58). Cinco pasos al 90 % dan 90 → 81 → 73 → 66 %, y "66 % no es 90 %" (págs. 59-60).

**Función de transferencia (págs. 61-66)**
- **Y = f(X1, X2, … Xn):** la salida (Y) depende de las entradas (Xs). Si controlamos las X, podemos predecir la Y. Ejemplos: un plato de comida; la eficiencia de combustible según peso, marca del auto, gasolina, octanaje y edad del conductor.
- Pregunta clave: ¿cuáles son las X críticas que definen el desempeño de Y?
- *Trabajo grupal:* identificar la Y y las Xs de un proceso y clasificar las X en controlables y no controlables.

**DMAIC (págs. 67-70)**
- **Enfoque de resolución de problemas en 6 pasos (pág. 68):** problema práctico ("tardamos en responder cotizaciones") → problema gráfico (mapa de cadena de valor actual) → problema analítico ("¿por qué el 63 % del tiempo es espera?") → solución analítica (Pareto de tiempos de espera) → solución gráfica (VSM futuro) → solución práctica (sistema pull a prueba de errores, *mistake proofing*).
- **Enfoque conceptual (pág. 69):** Definir (de varios proyectos potenciales se elige uno) → Medir (línea base: "¿dónde estamos?") → Analizar (de varias causas probables a causas identificadas y verificadas) → Mejorar (mejoras probadas y medidas) → Controlar (proceso institucionalizado y autosustentable).
- **Proceso de 15 pasos (pág. 70),** con revisión del Resumen Ejecutivo al cierre de cada fase:
  - D: 1 Resumen ejecutivo del proyecto (Project Charter) · 2 Obtención y traducción de la VOC · 3 Mapa de alto nivel (SIPOC)
  - M: 4 Mapa de la cadena de valor · 5 Integridad y obtención de datos · 6 Desempeño del proceso
  - A: 7 Acotar causas potenciales (Xs) · 8 Validar causas críticas (Xs) · 9 Cuantificar la oportunidad
  - I: 10 Soluciones potenciales · 11 Optimizar la mejor solución · 12 Prueba piloto
  - C: 13 Implementación a escala total · 14 Monitoreo, control y transición · 15 Validar beneficios y cerrar

**Roles (págs. 71-76)**
- Jerarquía: Master Black Belt (MBB: maestro, mentor, consultor; tiempo completo), Black Belt (BB: resuelve problemas, experto en herramientas; tiempo completo), Green Belt (GB: conocimiento práctico), Yellow Belt (YB: participante del equipo, conoce las herramientas), Champions, Contralor Financiero y Process Owners (CCFPO: eliminan barreras y responden por los beneficios del proyecto).
- **Champion:** gerente o gerente senior responsable del presupuesto. Elimina obstáculos, aporta recursos, administra los efectos culturales del cambio y reconoce los logros.
- **Dueño del proceso:** responsable directo del proceso. Es miembro activo del equipo, aporta conocimiento y es dueño de las acciones de cambio.
- **Contralor financiero:** revisa el modelo de beneficios, desafía los supuestos de ahorro y verifica los ahorros tras el cierre.
- **GB:** jefe de proyecto a tiempo parcial. Lidera proyectos departamentales, forma a YB y dueños de proceso, y apoya a los BB.
- **YB:** todo empleado con formación básica. Es miembro del equipo y promueve la cultura de mejora.
- **BB:** agente de cambio. Lidera proyectos de planta o multi-departamento, presenta a la Dirección, facilita equipos, comparte buenas prácticas y forma a los GB.
- **MBB:** gestiona proyectos de división o entre divisiones, es mentor de BB, GB y YB, desarrolla material de formación y expande el conocimiento.
- **Responsabilidad de la mejora (pág. 76):** el control del proceso pasa de los Belts (100 % en Definir) a los Dueños del Proceso (mayoría en Controlar). Las curvas se cruzan en Analizar.

**Lean frente a Six Sigma (págs. 77-78):** no son excluyentes. Lean reduce el desperdicio, quita cuellos de botella y da velocidad. Six Sigma reduce la variación y hace los procesos predecibles.

### Sesión 2: Análisis de datos

**Objetivos (pág. 2):** colectar y analizar datos; aplicar estadística básica; reconocer la importancia de la variación para decidir.

**Colección y representación de datos (págs. 6-16)**
- **Representaciones (pág. 7):** *series de tiempo* (gráficos de proceso y gráficas de control, con valores en orden secuencial) y *datos agrupados* (histogramas, boxplots, dot plots, con valores agrupados por frecuencia).
- **Tipos de datos (pág. 8):**
  - *Variables o continuos:* medidos, con infinitos valores posibles. Ejemplos: tiempo de entrega, costo, duración de llamada, temperatura, dimensión, altura.
  - *Atributos o discretos:* contados, con valores finitos. Incluyen proporciones (sí/no, bueno/malo, % defectuosos, unidades por día) y cantidades de eventos (errores, entregas tarde, tipos de producto, SKUs activos).
- **Población frente a muestra (págs. 10-11):** los parámetros describen la población y usan letras griegas (µ, σ). Los estadísticos describen la muestra y usan letras latinas (x̄, s). Muestras distintas dan estadísticos distintos.
- **Muestreo (pág. 12):** usar un grupo pequeño para representar el todo. *Ventajas:* ahorra tiempo y dinero, permite obtener más datos importantes, simplifica la medición en el tiempo y puede mejorar la exactitud. *Desventaja:* se acepta incertidumbre.
- **Tamaño de muestra continuo y discreto (págs. 13-14):** fórmulas y ejemplos en §7.
- *Ejercicios (págs. 15-16):* desayuno a la habitación con requisito ± 10 min. Para el caso continuo s = 7,16 min y Δ = 2 min; para el discreto P = 0,30 y Δ = 5 %. Calcular n en ambos casos y luego para un indicador propio.

**Estadística descriptiva (págs. 17-38)**
- Cuatro dimensiones de los datos: **centro, dispersión, forma y estabilidad** (pág. 18). Se necesita medir tanto la tendencia central como la variabilidad, "la mano derecha y la mano izquierda" (pág. 19).
- **Media (págs. 21-24):** fórmulas muestral y poblacional. Ejemplo: 5,3,7,9,8,5,4,5,8 → 6. *Ventajas:* es el centro de gravedad, usa todos los datos y no requiere ordenar. *Desventajas:* se distorsiona con extremos y puede no coincidir con ningún dato real (ejemplo: media 400 sin extremo y 600 con extremo).
- **Mediana (págs. 25-28):** valor central de los datos ordenados; con n par, promedio de los dos centrales. Ejemplos: 2,3,5,7,8,2,9,8,4 → 5 y 6,2,3,8,7,2,2,9,7,4 → 5. *Ventajas:* es insensible a extremos y requiere pocos cálculos. *Desventajas:* hay que ordenar, no se pueden promediar medianas y varía más que la media entre muestras.
- **Moda (págs. 29-30):** valor más frecuente. Puede no existir o haber varias (edades 32…44 → modas 34 y 37; media 36,6). Es un valor real de la muestra.
- **Variabilidad (págs. 32-35):** rango = máx − mín (44 − 32 = 12), desviación estándar muestral (ejemplo s = 3,81) y varianza.
- **Estabilidad (págs. 36-38):** patrones que invalidan una media simple: **tendencia** (la media se desplaza), **mezcla de datos** (varias familias o procesos) y **oscilación o ciclos** (estacionalidad).

**Control estadístico de procesos (págs. 40-59)**
- Todo varía. Parte de la variación es la **"voz del proceso"** y el resto la agrega el sistema de medición (pág. 41).
- **Causas especiales frente a comunes (págs. 42-44):** las especiales son factores conocidos, externos y fáciles de identificar (corte eléctrico, accidente, caída de servidor). Las comunes son aleatorias, estables e inherentes al proceso, y solo se alteran cambiando el proceso (rotación, ausentismo, experiencia). **Según Deming, el 94 % de la variación es por causa común y el 6 % por causa especial.**
- Ejercicio de firma con ambas manos (pág. 45).
- **Manipulación o sobrecontrol (pág. 46):** ajustar el proceso según mediciones individuales. Es una fuente común de causa especial, y eliminarla puede reducir la variación a la mitad.
- **¿Podemos tolerar la variación? (pág. 47):** sí, si el proceso está en objetivo, es estable y predecible y la variación es pequeña frente a la especificación. Si no lo es, hay que **cambiar** el proceso, no manipularlo.
- **Estrategia según el tipo de causa (pág. 49):** ver la matriz en §5.
- **En control / fuera de control (pág. 50):** en control significa variación estable y predecible por causa común. **Eso no implica que sea "buena".** Fuera de control significa variación inestable que incluye causas especiales.
- **Gráficas de control (págs. 51-57):** identifican la variación por causa especial pero no dicen el porqué. Supervisan el proceso de forma continua. Ejemplos: un gráfico "en control" (LCS 2028, x̄ 397, LCI −1234) y uno "fuera de control" con un punto sobre el LCS (pág. 52). El árbol de selección de gráfica está en §7. Ejemplo simplificado de OTD mensual: se agrega la media, luego límites a ±3σ (topados en 100 %) y se detecta un punto fuera de control (págs. 54-57).
- **Control frente a capacidad (pág. 58):** un proceso puede estar en control y aun así **no ser capaz** (por ejemplo, LCL bajo el límite de especificación de OTD 85 %).
- *Trabajo grupal (pág. 59):* calcular límites de control para 3 KPIs, graficar, determinar si están en control, agregar límites de especificación y concluir.

**Estadística para toma de decisiones (págs. 60-81)**
- **Inferencial (pág. 61):** concluir sobre la población a partir de una muestra y predecir cómo reaccionará la métrica primaria.
- **Prueba de hipótesis (págs. 62-68):** H0 contiene la igualdad y H1 es la alternativa. Matriz de errores: rechazar H0 verdadera es **error tipo I**; no rechazar H0 falsa es **error tipo II**. Valor p con regla α = 0,05: "si p es bajo, rechazar H0; si p es alto, aceptar H0". El material define el valor p como "la probabilidad de rechazar la H0 cuando en realidad es verdadera" (pág. 64).
  - Ejemplo 1 (pág. 66), **2-Sample T-Test** con 12 + 12 muestras: medias 56,16 frente a 45,36 (s 5,44 y 3,73), IC 95 % de la diferencia (8,816; 16,784), T = 6,72, p = 0,000. Se rechaza H0: hubo cambio significativo.
  - Ejemplo 2 (pág. 68), 12 + 8 muestras con p > 0,05: no se puede afirmar un cambio.
- **Regresión (págs. 69-71):** verifica la correlación entre variables y produce una función predictiva. Ejemplo: precio del auto = −0,545 + 0,5799·salario, con S = 9,65, R² = 66,1 % y R²(adj) = 65,2 % (correlación "moderada"). La interpretación de R²(adj) está en §7.
- **Significancia práctica frente a estadística (págs. 72-73):** un aumento observado puede no ser estadísticamente significativo. Confundir ambas es uno de los errores más comunes.
- **Análisis delta/sigma (págs. 74-81):** herramienta simplificada para demostrar que la mejora no fue azar. Delta = diferencia de medias antes y después; sigma = desviación estándar después de la mejora. Un delta grande requiere pocos datos; un sigma grande requiere muchos (traslape). Ejemplo de OTD mensual de despacho a domicilio: antes 94, 92, 14, 18, 90, 94 % (media 67 %); después 99, 99, 54, 98 % (media 88 %); delta 21 puntos, sigma nueva 0,2233, delta/sigma ≈ 0,94. Según la tabla (α 5 %, β 10 %) se necesitan **23 a 27 muestras**, unos 2 años de datos mensuales. Remedios: hacer un cambio más grande o reducir la variación posterior.

### Sesión 3: El ciclo DMAIC, parte 1 (Definir y Medir)

**Objetivos (pág. 2):** conocer las fases Definir y Medir y sus herramientas.
- **PDCA frente a DMAIC (pág. 5):** Plan ≈ Define, Measure y Analyze; Do ≈ Improve; Check y Act ≈ Control.

**Paso 1: Resumen ejecutivo del proyecto / Project Charter / Acta de constitución (págs. 7-16)**
- Lo elabora el líder y define la misión del equipo. **No resuelve el problema ni es un informe de avance** (pág. 7).
- Elementos y preguntas guía (pág. 8):
  - *Impacto en el negocio:* ¿por qué hacerlo?, ¿beneficio?, ¿alineación estratégica?, ¿valor cuantificado ($)?
  - *Problema u oportunidad:* ¿qué "dolores" sufren los clientes?, ¿qué está mal?
  - *Objetivo:* metas de mejora, qué se entregará, cómo se medirá el éxito.
  - *Alcance:* límites (pasos inicial y final), autoridad, qué queda fuera.
  - *Plan:* cómo, cuándo, hitos.
  - *Equipo:* miembros, rol, dedicación.
- **Impacto en el negocio (pág. 10):** (1) aumento de ganancias por volumen o precio; (2) reducción de costos (insumos, desperdicio, trabajo, productividad, reprocesos); (3) reducción de capital de trabajo (inventario, cuentas por cobrar, activos); (4) otros (imagen, reputación, medio ambiente, impacto social).
- **Enunciado del problema (pág. 11):** describe el "dolor" y la línea base, **sin varios problemas ni causas**. Debe responder cuándo comenzó, qué ocurrió y en qué producto o proceso (con la métrica primaria Y), dónde, y la extensión del problema (por ejemplo, número de órdenes y monto).
- **Objetivo (pág. 12):** sin soluciones; comienza con un verbo; identifica la Y, el valor meta y la fecha límite. Ejemplo: "Reducir el tiempo de aprobación de solicitudes en un 50 % al final del 1er trimestre".
- Problema y objetivo deben ser **SMART** (pág. 13).
- **Alcance (pág. 14):** qué está dentro (aplicar 80/20 para acotar) y qué está fuera (áreas, ubicaciones, problemas asociados para después).
- **Plan y equipo (pág. 15):** duración **máxima de 6 meses** para proyectos de mejora de procesos, hitos DMAIC, recursos, habilidades y % de dedicación.
- Plantilla del charter en §6 (pág. 9).

**Paso 2: Voz del cliente (págs. 17-24)**
- **VOC** expresa necesidades y deseos del cliente; si el cliente es interno se habla de **VOB** (*Voice of the Business*). Determina el objetivo del proyecto (pág. 17).
  - Fuentes externas: experiencia de compra, NPS, reclamos, devoluciones.
  - Fuentes internas: ventas, costos, productividad, FTEs, OTIF.
- **Traducción (págs. 18-19):** VOC → tema clave → **CCR** (Requerimiento Crítico del Cliente) o **CBR** (del Negocio) si es interno. Un buen requerimiento es específico y mensurable (con método de medición), se relaciona con un atributo, no impone una tecnología, es completo e inequívoco y describe qué, no cómo. Ejemplos: "siempre entregan tarde" → plazo de entrega de 10 días ± 1; "no quiero que me dejen en espera" → llega a la persona correcta en la primera instancia dentro de 30 s.
- **Priorizar un CCR (pág. 20):** idealmente uno por proyecto. Cada CCR adicional implica otra Y, otro plan de datos, otro análisis de causa raíz, otras soluciones y otro plan de control.
- **Convertir el CCR en la Y del proyecto (págs. 21-22):** la Y debe ser tangible, significativa y mensurable; mejor continua que discreta; debe seguir la unidad individual y estar ligada a la necesidad. Ejemplo: Y buena = días hasta que el cliente recibe la factura; Y mala = cantidad de reclamos por facturas atrasadas.
- **Elementos Y del proyecto (pág. 23):** ver la plantilla en §6.

**Paso 3: SIPOC (págs. 25-28)**
- Proveedores, Entradas, Proceso, Salidas y Clientes. Es un diagrama del proceso **actual** de alto nivel (5-6 pasos), con límites de inicio y fin que definen el alcance. Ayuda a visualizar la VOC y la relación entre la Y y las X.
- Ejemplo de reclutamiento (pág. 27). Pasos: acuerdo de especificaciones, aprobación para contratar, búsqueda, entrevistas, evaluación y selección, ofrecimiento. El límite inicial es la fecha en que el gerente activa el proceso; el final, la fecha de inicio del nuevo recluta.

**Paso 4: Mapa de la cadena de valor / mapa detallado (págs. 30-32)**
- Mapa detallado con actividades, eventos y puntos de decisión. Es un "zoom" del SIPOC con tres niveles: proceso de alto nivel, subproceso y actividad.
- Mensaje clave (pág. 32): "Lo que Ud. **piensa** que es / lo que **actualmente** es / lo que **debería** ser".

**Paso 5: Integridad y obtención de datos (págs. 33-63)**
- Pasos: desarrollar el plan de obtención de datos y realizar el **MSA**. El lema de la pág. 34 es "Todos mienten".
- **Fuentes de error de medición (pág. 35):** humano (conocimiento, habilidad, técnica), equipamiento (capacidad, calibración, facilidad de uso), métodos (documentados, implementados, poco claros) y material (proveedores, calidad, tipo).
- **Plan de medición de datos (págs. 36-49):** 8 columnas (detalle en §6).
  - (1) KPI y factores de estratificación: qué, cuándo, dónde y quién. Ejemplos: tipo de producto; mes o día; región o ciudad; departamento o individuo. Si no se estratifica de antemano puede haber que reiniciar; demasiados factores encarecen.
  - **Matriz de estratificación (págs. 39-40):** preguntas sobre el proceso → factores → mediciones. Ejemplo con OTD por tipo de producto, día o turno, lugar y operario.
  - (2) **Definición operacional (págs. 41-42):** qué es y cómo se mide exactamente, para que todos "cuenten" igual. Ejemplo: tiempo de escaneo en caja (qué productos, en qué unidades, inicio y fin).
  - (3) **Fuentes (pág. 43):** datos existentes (si cumplen la definición, si son representativos y suficientes, si el sistema de medición es competente) frente a datos nuevos (costo y tiempo).
  - (4) **Cómo, con hojas de verificación (págs. 44-45):** principal herramienta de captura; rápida, consistente y diseñada para cada trabajo. Ejemplo: registro de reclamos de un hotel por tipo (TV, humo, aire acondicionado, control remoto, ducha, ventana) con fecha, hora, iniciales, tiempo de solución y notas.
  - (5) **Quién (pág. 46):** familiaridad, disponibilidad (**si toma más de 15 min diarios, probablemente no se haga**), sesgo potencial y beneficio para quien recolecta.
  - (6) **Rango esperado (pág. 47):** permite comprobar si el muestreo cubrió todo el rango.
  - (7) **Plan de muestreo (pág. 48).**
  - (8) **Fecha (pág. 49).**
- **MSA, Measurement System Analysis (págs. 51-63):** los sistemas de medición son "como anteojos". La variación de la medición hace ver peor la capacidad.
  - σ²Total = σ²Producto + σ²Sistema de medición; es decir, VT = VP + VSM (pág. 53).
  - Árbol (pág. 54): variación observada = unidad a unidad + error del sistema de medición. Ese error se divide en **precisión** (repetibilidad y reproducibilidad) y **exactitud** (estabilidad y bias).
  - **Precisión:** baja variación pero descentrado. **Exactitud:** centrado en promedio pero con gran variación (pág. 55).
  - **Repetibilidad:** variación del instrumento con la misma pieza, característica, persona, instrumento, ajuste y ambiente. **Reproducibilidad:** variación entre los promedios de distintos operadores con el mismo instrumento. σ²m = σ²rpt + σ²o (pág. 56).
  - Causas de falla del R&R (pág. 57): definiciones operativas, estabilidad, uso consistente, capacitación, ambiente, auditoría, exigencias poco claras, estándar no comprendido.
  - **Ejemplo continuo (págs. 58-63):** 10 partes, 3 inspectores, 3 réplicas en orden aleatorio, tolerancia 8. Se hace un estudio **R&R cruzado** (método Xbar & R) en software estadístico, con 6σ por defecto (99,73 %). Resultado: Gage R&R 7,12 % (repetibilidad 3,10 %, reproducibilidad 4,02 %) y parte a parte 92,88 %. Como es menor al 10 %, el sistema es **aceptable** según el criterio AIAG.

**Paso 6: Desempeño del proceso (pág. 64):** analizar gráficamente forma, centro y dispersión; evaluar la estabilidad con gráficas de control; determinar la capacidad. Todo esto se vio en S1 y S2.

### Sesión 4: El ciclo DMAIC, parte 2 (Analizar, Mejorar y Controlar)

**Paso 7: Causas potenciales (Xs) (págs. 6-10)**
- Identificar todas las causas raíz potenciales y priorizarlas. Herramientas: **tormenta de ideas, diagrama de Ishikawa, técnica de grupo nominal, diagrama de afinidad, análisis de campo de fuerza, gráfico de Pareto** (pág. 6).
- **Ishikawa o espina de pescado (págs. 7-9):** relaciona el efecto con sus causas potenciales, asegura una lista balanceada, clasifica factores cuando hay pocos datos y guía la discusión. Usa las categorías **6M**: Métodos, Máquinas, Materiales, Medio ambiente, Mano de obra, Medición. Ejemplo (pág. 9), efecto "demasiados ajustes de precio en el check-out": tabla de descuentos desactualizada, capacitación incompleta, falta de personal en horas pico, métricas de marketing contraproducentes, cortes eléctricos, etc.

**Paso 8: Validación de causas críticas (págs. 11-17)**
- Se validan con datos las causas seleccionadas, que hasta aquí no están verificadas. Métodos (pág. 11): **spaghetti chart, estudios de números, regresión, estudio de casos, estudio de polivalencia**.
- **Regresión (págs. 12-15):** si una X no se correlaciona con la Y, se descarta. Ejemplo de encuesta de clima, Y = nota al supervisor y X1…X6. Resultado: Y = 10,8 + 0,613 X1 − 0,073 X2 + 0,320 X3 + 0,082 X4 + 0,038 X5 − 0,217 X6, con R² = 73,3 %, R²(adj) = 66,3 % (moderada) y p ANOVA = 0,000 (modelo significativo). X1 (quejas no tratadas, p = 0,001) y X3 (oportunidades de mejora, p = 0,070) son las de menor p.
- **Correlación no implica causalidad (págs. 16-17):** la causalidad requiere correlación significativa, que el efecto nunca ocurra antes que la causa y que causa y efecto estén conectados. Ejemplo espurio: ahogados en piscinas frente a películas de un actor.

**Paso 9: Cuantificar la oportunidad (págs. 18-20)**
- El equipo estima los beneficios potenciales (tangibles e intangibles) y monetiza solo los tangibles. Da el fundamento financiero para continuar y el gasto admisible de las soluciones. Se hace luego de verificar algunas causas vitales.
- **Diferencias con el análisis costo/beneficio (pág. 19):**

| | Cuantificar la oportunidad | Análisis costo/beneficio |
|---|---|---|
| Fase | Analizar | Mejorar |
| Objeto | No es para una solución específica | Para una solución específica |
| Precisión | Números en bruto | Valores detallados |
| Alcance | Todo el proceso | Una parte del proceso |

- **Decisión (pág. 20):** continuar tal cual, modificar el alcance o detener el proyecto. Es una compuerta explícita.

**Paso 10: Soluciones potenciales (págs. 22-29)**
- Se obtienen con benchmarking o ideación. **Es momento de** pensar nuevas maneras, atacar causas raíz, rediseñar y explorar. **No es momento de** re-capacitar con el mismo método, insistir con estándares sin adherencia o "bajar línea" sin resultados.
- **Benchmarking (pág. 23):** comparar el desempeño con uno mismo o con otros. Tipos: interno, competencia directa, mejores de la industria, otras industrias.
- **Brainstorming (págs. 24-28):** método estructurado donde todas las ideas valen y se buscan muchas.
  - *Guiado:* un líder modera; ideas en post-it que se leen en voz alta; se repite.
  - *3×3×3:* cada participante escribe 3 ideas, las pasa a otro, que agrega 3; termina cuando todos generaron al menos 3.
  - *Antisolución:* idear lo opuesto al objetivo.
  - *Grupo silencioso:* escribir en lugar de hablar, para neutralizar a los dominantes; se agrupan las ideas y se eliminan repeticiones.
- *Trabajo grupal (pág. 29):* embarque de aerolínea (máx. 10 min) o equipaje en carrusel (máx. 15 min).

**Paso 11: Optimización de la solución (págs. 30-41)**
- Se descartan soluciones no aceptables con: **matriz esfuerzo-impacto, matriz de criterios múltiples, matriz Pugh y DOE** (pág. 30).
- **Matriz esfuerzo-impacto (pág. 31):** cuadrantes bajo/alto × bajo/alto. Se priorizan las de bajo esfuerzo y alto impacto ("quick wins") para obtener un portafolio de iniciativas. El esfuerzo incluye costo, tiempo, complejidad técnica y cultural.
- **Matriz de criterios múltiples (pág. 32):** ver §6 y §7. Ejemplo: 6 soluciones; D obtiene 7,6 y A 6,2.
- **Matriz Pugh (págs. 33-38):** se compara cada concepto con una **referencia** con +, − y S, por criterio ponderado. Ejemplo de vacaciones con 3 conceptos. Pasos y lista de control en §5.
- **DOE (págs. 39-41):** frente al ensayo y error o a cambiar una variable por vez, ofrece un enfoque orientado, un modelo matemático que relaciona variables y respuesta, optimización con fin claro, significancia estadística conocida y detección de interacciones. Ejemplo de consumo de combustible (meta > 30 km/l desde 20): un experimento de una variable por vez (velocidad, octanaje, presión) da 25, 23, 27 y 27 km/l y deja sin responder las interacciones.

**Paso 12: Prueba piloto (págs. 42-47)**
- Es una prueba de la solución a escala real. Detecta fallas de la solución y de su aplicación, valida resultados esperados, expone restricciones y riesgos, y verifica especificaciones de diseño y expectativas del cliente (pág. 43).
- **Beneficios (pág. 44):** mejor solución y plan, más participación, beneficios anticipados, menor riesgo, confirmación de causa-efecto, mejor cuantificación de costos y beneficios. "Una mejor solución con menos sorpresas".
- **Plan de implementación del piloto (pág. 45):** qué, dónde, quién, cuándo y cómo.
- **Ejemplo de check-in de hotel (págs. 46-47):** tres pruebas en serie (interfase de dispositivos, verificación con empleados como huéspedes, validación con 25 huéspedes invitados) con criterios de éxito (precisión < 3,4 DPMO, demora < 6 s, CCRs del *scorecard*), equipo y plazo. Le sigue un cronograma de 8 semanas y el roll-out.

**FMEA, Análisis de Modos y Efectos de Falla (págs. 48-53)**
- Metodología para gestionar el riesgo evaluando modos de falla y efectos en procesos existentes y en diseños de soluciones (pág. 48).
- **Cuándo usarlo:** al inicio de la investigación de mejora; al diseñar sistemas, productos o procesos nuevos; al cambiar diseños existentes; al transferir diseños a nuevas aplicaciones; tras definir funciones y antes de elegir hardware o liberar a fabricación; para fallas de equipos o componentes.
- **Formato (pág. 49)** en 4 bloques: identificar modos de falla y efectos → identificar causas y controles → priorizar (RPN) → determinar y evaluar acciones. Columnas en §6.
- **Escalas S, O y D de 1 a 10 (pág. 50)** y **RPN = S × O × D (pág. 51):** ver §7.
- **Ejemplo "servir un café en una tienda" (pág. 52):** ver §6.

**Paso 13: Implementación a escala total (págs. 55-57)**
- Actividades: **MSA sobre las Xs críticas**, verificación de errores (*error proofing*), gestión de riesgos (parte derecha del FMEA), procedimientos operativos estándar, herramientas visuales de control y plan de implementación a escala total.
- Para escalar: piloto → aprendizaje y gestión del conocimiento → escalamiento → impacto significativo (pág. 56).
- **Cierre de la implementación (pág. 57):** resultados antes/después y testimonios, material de soporte y capacitación, backlog de mejora continua, validar rendimiento y resultados financieros varios meses después.

**Paso 14: Monitoreo, control y transición (págs. 58-64)**
- El **plan de control** describe por escrito los sistemas que minimizan la variación. No reemplaza a las instrucciones detalladas, cubre entradas y proceso para mantener las salidas en control y es un documento vivo (pág. 58).
- **Por qué (pág. 59):** los procesos se degradan, el proceso sale de las manos del equipo, hay que comunicar y capacitar, y se necesita un plan de datos que confirme el impacto.
- **5 preguntas (pág. 60):** (1) ¿qué proceso está bajo control?, (2) ¿qué salidas se monitorean?, (3) ¿qué entradas se monitorean para mantener la salida en objetivo?, (4) ¿cómo se miden, monitorean y controlan?, (5) ¿cómo reaccionaremos si salen de control?
- Estructura en tres bloques, **Documentación, Monitoreo y Plan de respuesta** (págs. 61-63). Ejemplo de proceso de cotizaciones (RFQ): defectos por solicitud con meta 0, monitoreados con diagrama C y Pareto; tiempo de transferencia con meta 3 h, monitoreado con diagrama I-MR (pág. 63).
- **Plantilla AIAG** (pág. 64): ver §6.

**Paso 15: Validación de beneficios y cierre (págs. 65-69)**
- Hay dos evidencias estadísticas: la **capacidad** del nuevo proceso y una **prueba de hipótesis** antes/después (proporción defectuosa, promedio, desviación estándar), más la **estabilidad** con gráficas de control (pág. 65).
- **Costo/beneficio final (pág. 66):** en comités de costos o de proyectos, donde el dueño del proceso reporta los beneficios mensuales. **Se monitorean y reportan durante 1 año** tras la implementación, siguiendo las reglas de negocio para reclamar beneficios.
- **Reunión de cierre (págs. 67-69):** no esperar demasiado. Asiste todo participante (con mini-reuniones si el grupo es grande). Se documenta, se da a todos la oportunidad de revisar, se publica y se usa como parte de la transferencia al dueño del proceso. Claves: integrar a todos, ser autocrítico, profesional (nunca personal), fáctico, breve y concentrado, y dar un incentivo al equipo para las lecciones aprendidas.

---

## 3. Lecturas complementarias

El material no incluye lecturas complementarias como documentos. Solo hay **bibliografía referenciada** al final de cada sesión (ver §1) y un código QR de ejemplos de tipos de datos (S2, pág. 9) cuyo contenido no se extrajo. No es posible resumir tesis de lecturas sin inventar contenido.

---

## 4. Marcos, estándares y modelos referenciados

- **Six Sigma / DMAIC** en 5 fases y 15 pasos con revisión del Resumen Ejecutivo por fase (S1 pág. 70; S3 pág. 4; S4 pág. 4).
- **PDCA** (Deming), con su correspondencia con DMAIC (S3 pág. 5).
- **Lean / Toyota Production System**, como complemento de Six Sigma (S1 págs. 16, 77-78).
- **TQM y SPC** de Shewhart y Deming (S1 pág. 16).
- **Trilogía universal** de Juran, mencionada en la tabla de Calidad con Mayúscula (S1 pág. 9).
- **Estructura de roles por cinturones** (MBB, BB, GB, YB, Champions, Dueño de proceso, Contralor) (S1 págs. 72-75).
- **AIAG (Automotive Industry Action Group):** criterio de aceptación del MSA (<10 %, 10-30 %, >30 %) y plantilla de plan de control (S3 pág. 62; S4 pág. 64).
- **ASQ:** definición de calidad (S1 pág. 8).
- **SMART** para problema y objetivo (S3 pág. 13).
- **Regla 80/20 (Pareto)** para acotar el alcance (S3 pág. 14).
- **Teorema del límite central y distribuciones Normal, Poisson y Binomial,** asociadas a la selección de gráficas de control (S2 pág. 53).
- **ISO,** mencionada como fuente de normas de monitoreo en el plan de control (S4 pág. 62).

---

## 5. Técnicas y herramientas

Formato: **qué es · cuándo (fase y paso) · estructura · entradas → salidas**.

| Herramienta | Qué es | Cuándo | Estructura / pasos | Entradas → Salidas |
|---|---|---|---|---|
| **Project Charter (Resumen ejecutivo)** | Acta que define la misión del equipo | D, paso 1; se revisa al cierre de cada fase | Impacto, Problema, Objetivo, Alcance, Plan, Equipo | Idea de proyecto, datos de línea base, estrategia → charter aprobado con Y, meta, fecha, alcance y equipo |
| **VOC/VOB → CCR/CBR** | Traducción de la voz del cliente en requisitos medibles | D, paso 2 | Afirmación del cliente → tema clave → requerimiento específico y mensurable | NPS, reclamos, devoluciones, objetivos internos → CCR priorizado (uno) |
| **Elementos Y del proyecto** | Ficha de definición de la métrica primaria | D, paso 2 | Ver §6 | CCR → Y operacionalizada con LSL/USL, objetivo, defecto y oportunidades |
| **SIPOC** | Mapa de alto nivel del proceso actual | D, paso 3 | Proveedores, Entradas, Proceso (5-6 pasos), Salidas, Clientes, límites de inicio y fin | Conocimiento del proceso → alcance delimitado y relación preliminar entre Y y X |
| **Mapa de cadena de valor / mapa detallado** | Zoom del SIPOC a nivel de actividad | M, paso 4 | Proceso → subproceso → actividad; "lo que se piensa / lo que es / lo que debería ser" | SIPOC, observación → mapa "as-is" con decisiones, esperas y retrabajos |
| **Plan de medición de datos** | Planificación de la recolección | M, paso 5 | 8 columnas (§6) | Y y Xs candidatas → plan con definiciones, fuentes, responsables, muestreo y fechas |
| **Matriz de estratificación** | Desglose del KPI por factores | M, paso 5 | Preguntas → factores (qué, cuándo, dónde, quién) → mediciones | KPI → mediciones por subgrupo |
| **Definición operacional** | Descripción precisa de qué y cómo medir | M, paso 5 | Qué es, qué se incluye, unidad, inicio y fin | Variable → regla de medición única |
| **Hoja de verificación** | Formulario de captura | M, paso 5 (y una de las 7 herramientas básicas) | Diseñada por trabajo: fecha, hora, responsable, categorías, tiempo, notas | Eventos → datos consistentes y fáciles de compilar |
| **Cálculo de tamaño de muestra** | n mínimo para estimar una media o una proporción | M, paso 5 | Fórmulas en §7 | s o P, Δ, 95 % → n |
| **MSA / Gage R&R cruzado** | Cuantificar la variación del sistema de medición | M, paso 5; C, paso 13 (sobre Xs críticas) | 10 partes × 3 operadores × 3 réplicas aleatorias; Xbar & R; 6σ; tolerancia | Mediciones → % R&R, repetibilidad, reproducibilidad; aceptable si <10 % |
| **Estadística descriptiva y gráficos** | Centro, dispersión, forma, estabilidad | M, paso 6 | Media, mediana, moda, rango, s; histograma, boxplot, dot plot, series de tiempo | Datos → descripción y detección de tendencia, mezcla o ciclos |
| **Gráficas de control (SPC)** | Detectar causas especiales | M, paso 6; C, paso 14; cierre, paso 15 | Selección según tipo de dato (§7); media ± 3σ | Serie temporal → estado en control / fuera de control |
| **Capacidad (Cp, Cpk, DPMO, nivel σ, RTY)** | Cuánto cumple el proceso la especificación | M, paso 6 (línea base); paso 15 (después) | Fórmulas en §7 | Datos + LSL/USL → índices y nivel σ |
| **Pareto** | Priorización 80/20 | A, paso 7; alcance en D; monitoreo en C | Barras ordenadas más % acumulado (complemento: el material lo nombra sin detallarlo) | Conteos por categoría → pocas categorías vitales |
| **Lluvia de ideas, grupo nominal, diagrama de afinidad, campo de fuerza** | Generar y ordenar causas | A, paso 7 | Solo se listan (S4 pág. 6), salvo la lluvia de ideas | Conocimiento del equipo → lista de causas |
| **Ishikawa (6M)** | Diagrama causa-efecto | A, paso 7 | Efecto a la derecha; espinas: Métodos, Máquinas, Materiales, Medio ambiente, Mano de obra, Medición | Problema (Y) → causas potenciales (Xs) clasificadas |
| **Spaghetti chart, estudios de números, estudio de casos, estudio de polivalencia** | Métodos de validación de causas | A, paso 8 | Solo se nombran con imagen (S4 pág. 11) | Xs candidatas → Xs validadas |
| **Regresión (simple y múltiple) con ANOVA** | Correlación entre Xs y Y | A, paso 8 (también S2) | Ecuación, coeficientes y p por predictor, R², R²(adj), p del modelo | Datos pareados → Xs significativas y modelo Y = f(X) |
| **Cuantificar la oportunidad** | Estimación gruesa del beneficio | A, paso 9 | Beneficios tangibles monetizados + intangibles | Causas validadas, línea base → monto y decisión continuar / modificar / detener |
| **Benchmarking** | Comparación de desempeño | I, paso 10 | Interno, competencia, mejores de la industria, otras industrias | Referentes → ideas y potencial de mejora |
| **Brainstorming (guiado, 3×3×3, antisolución, grupo silencioso)** | Ideación de soluciones | I, paso 10 | Ver S4 págs. 24-28 | Causas raíz → soluciones potenciales |
| **Matriz esfuerzo-impacto** | Priorización 2×2 | I, paso 11 | Cuadrantes; primero bajo esfuerzo y alto impacto | Soluciones → portafolio priorizado |
| **Matriz de criterios múltiples** | Puntuación ponderada | I, paso 11 | 9 criterios con pesos y escala 9/3/1 (§6) | Soluciones → puntaje y ranking |
| **Matriz Pugh** | Comparación con una referencia | I, paso 11 | 1) conceptos y referencia; 2) criterios; 3) importancia; 4) comparar (+, −, S); 5) sumar simples y ponderados; 6) fortalezas y debilidades; atacar debilidades, reingresar soluciones modificadas y eliminar las débiles | Conceptos → concepto elegido o híbrido |
| **DOE** | Experimentación estructurada multifactor | I, paso 11 | Solo se plantea la motivación (sin diseño factorial en el material) | Factores y niveles → modelo, óptimo e interacciones |
| **Prueba piloto + plan de implementación** | Prueba a escala real | I, paso 12 | Qué, dónde, quién, cuándo, cómo; criterios de éxito; cronograma | Solución → solución validada y plan de roll-out |
| **FMEA** | Gestión de riesgo por modo de falla | I, paso 12 (sobre la solución); C, paso 13 (parte derecha); también al inicio | Ver §6 y §7 | Pasos del proceso → RPN priorizado, acciones y RPN recalculado |
| **Error proofing (mistake proofing)** | Prevención de errores | C, paso 13 (y solución práctica en S1 pág. 68) | Solo se menciona | — |
| **SOP y controles visuales** | Estandarización | C, paso 13 | Solo se menciona | — |
| **Plan de control** | Documento vivo de control del proceso | C, paso 14 | Documentación, Monitoreo y Plan de respuesta; plantilla AIAG | Proceso mejorado → controles, frecuencias y reacciones |
| **Prueba de hipótesis (2-Sample T)** | Comparar antes y después | S2; C, paso 15 | H0/H1, α 0,05, valor p | Dos muestras → ¿hay diferencia significativa? |
| **Análisis delta/sigma** | Verificación simplificada de mejora y tamaño de muestra | S2; C, paso 15 | δ/σ → tabla (α, β) → n | Medias antes y después, s después → n requerido / evidencia |
| **Análisis costo/beneficio y reunión de cierre** | Validación financiera y lecciones | C, paso 15 | Reporte mensual por 1 año; reunión documentada | Resultados → beneficios validados, transferencia, lecciones aprendidas |

**Matriz de ataque a la variación (S2 pág. 49)**

| Tipo de variación \ acción | Buscar qué fue diferente y actuar sobre la diferencia | Estudiar todos los datos y hacer cambios fundamentales |
|---|---|---|
| **Causa común** | Pérdida de tiempo e **incrementa** la variación | Mejor comprensión y **reduce** la variación |
| **Causa especial** | Información útil y **reduce** la variación | Pierde tiempo y pérdida de tiempo |

---

## 6. Plantillas y artefactos (campos concretos)

### 6.1 Project Charter / Resumen ejecutivo (S3 pág. 9)
- **Impacto en el negocio** (texto y valor $)
- **Problema u oportunidad** (cuándo, qué con métrica Y, dónde, extensión)
- **Objetivo** (verbo + Y + meta + fecha; SMART)
- **Alcance del proyecto** (dentro / fuera; límites de inicio y fin)
- **Plan del proyecto** (hitos D-M-A-I-C, ≤ 6 meses)
- **Selección del equipo:** Líder, Coach, Sponsor, Controller Financiero, Stakeholders, Miembros del equipo, Foto del equipo, **Fecha**

### 6.2 Herramienta de traducción VOC (S3 pág. 19)
Columnas: **Voz del cliente** (afirmaciones reales) | **Tema clave** (preocupación o expectativa real) | **Requerimiento del cliente / CCR** (característica específica, precisa y mensurable).

### 6.3 Elementos Y del proyecto (S3 pág. 23)
| Campo | Pregunta |
|---|---|
| Necesidad de alto nivel (VOC/VOB) | De la herramienta de traducción |
| Características de salida | Exactitud, oportunidad, velocidad, costo unitario, calidad, volumen… |
| Unidad de salida | ¿Qué se mueve por el proceso? (factura, entrega…) |
| Qué medir | Unidad exacta (días o minutos; 0:15 frente a 0,25 min) |
| Cómo medir | Instrucciones, puntos de inicio y fin, reloj a usar |
| Límites de especificación | USL / LSL (si aplica) |
| Objetivo | Tendencia central buscada |
| Defecto | Definición según LSL/USL |
| Nº de oportunidades de defecto por unidad | ¿Cuántos defectos posibles por unidad? |

### 6.4 SIPOC (S3 págs. 25-27)
Columnas: **Proveedores | Entradas | Proceso (5-6 pasos) | Salidas | Clientes**, más **Límite de alcance – Inicio** y **Límite de alcance – Final**. Abajo: requerimientos, especificaciones e información.

### 6.5 Plan de medición de datos (S3 págs. 36-37)
| 1 KPI de proyecto (Y) y factores de estratificación (Xs) | 2 Definición operacional | 3 Fuente y ubicación de datos | 4 Cómo se obtendrán | 5 Quién los obtendrá | 6 Rango de valores esperados | 7 Plan de muestreo | 8 Fecha |

Complementos: **Matriz de estratificación** (Preguntas sobre el proceso | Factores | Mediciones) y **Hoja de verificación** (Fecha | Hora | Iniciales | categorías del defecto | Tiempo de solución | Notas; cabecera Semana y Completado por).

### 6.6 Estudio Gage R&R (S3 págs. 58-63)
Parámetros: nº de partes (10), operadores (3), réplicas (3), orden aleatorio, tolerancia (USL − LSL), desviación histórica del proceso (opcional), multiplicador de variación de estudio (6). Salida: tabla de componentes de varianza (Fuente | CompVar | %Contribución): Gage R&R total, repetibilidad, reproducibilidad, parte a parte y variación total.

### 6.7 Matriz de criterios múltiples (S4 pág. 32)
| Criterio | Peso | Pregunta | 9 | 3 | 1 |
|---|---|---|---|---|---|
| Prevención de recurrencia | 0,2 | ¿Evita que se repita? | Sí | Parcial | No |
| Seguridad de la situación resultante | 0,1 | ¿Es segura para personas, infraestructura, tecnología? | Sí | Parcial | No |
| Tiempo de implementación | 0,1 | Plazo requerido | Corto | Mediano | Largo |
| Costo de implementación | 0,1 | Costo | Bajo | Medio | Alto |
| Facilidad de implementación | 0,1 | Diseño, tecnología | Fácil | Medio | Difícil |
| Adherencia | 0,1 | ¿Qué tan fácil lograr adherencia? | Fácil | Medio | Difícil |
| Riesgos de implementación | 0,1 | Riesgo de que falle | Bajo | Medio | Alto |
| Impacto en desempeño (KPI) | 0,1 | Impacto en el KPI | Alto (directo) | Medio (indirecto) | Bajo (no impacta) |
| Impacto (económico, servicio, otros) | 0,1 | — | Alto | Medio | Bajo |

Puntaje = Σ (peso × nota). La suma de los pesos es 100 %. Ejemplo: A = 6,2; B = 2,4; C = 2,0; D = 7,6; E = 2,6; F = 2,4.

### 6.8 Matriz Pugh (S4 págs. 33-34)
Filas de criterios con **calificación de importancia**. Columnas: **referencia** (todo S) y conceptos. Celdas con +, −, S. Totales: suma de positivos, de negativos y de iguales; **total ponderado de positivos** y **de negativos**. Ejemplo de vacaciones (importancias 9, 5, 10, 10, 8, 6, 8): el concepto 1 obtiene +2/−2/S3 con ponderados 14/19.

### 6.9 Plan de implementación del piloto (S4 págs. 45-47)
**Qué cosa | Dónde | Quién | Cuándo | (Cómo)**. En la versión extendida: **Prueba piloto | Descripción | Criterio de éxito | Equipo | Plazo (comienzo / finalización)**, más un cronograma semanal (Gantt) que termina en el roll-out.

### 6.10 Template FMEA (archivo `Template FMEA.xls`, hoja "FMEA"; S4 págs. 49-52)
**Cabecera:** FMEA de Proceso / Producto · Proceso · Preparado por · Página _ de _ · Responsables · FMEA fecha (orig.) · Rev.

| Columna | Pregunta guía (texto de la plantilla) |
|---|---|
| Paso del proceso / Entrada | ¿Cuál es el proceso o entrada bajo investigación? |
| Modo de falla potencial / ¿Qué puede salir mal? | ¿En qué forma van equivocadas las entradas clave? |
| Efecto de falla potencial | ¿Cuál es el impacto en las variables clave de salida o en los requisitos internos? |
| **SEV** | ¿Qué tan severo es el efecto para el cliente o el próximo paso? |
| Causa potencial | ¿Qué provoca que las entradas clave vayan mal? |
| **OCC** | ¿Qué tan frecuente es? |
| Controles actuales | Controles y procedimientos existentes (inspección o prueba) que previenen la causa o el modo de falla; puede incluir un número de SOP |
| **DET** | ¿Qué tan bien se puede detectar la causa o el modo de falla? |
| **RPN** | SEV × OCC × DET |
| Acciones recomendadas | Acciones para reducir la ocurrencia de la causa o mejorar la detección |
| Persona responsable | Responsable de las acciones recomendadas |
| Acciones terminadas | ¿Cuáles son las acciones terminadas? Recalcular el RPN e incluir mes/año de término |
| **SEV / OCC / DET / RPN** (post) | Re-evaluación tras las acciones |

**Ejemplo "servir un café" (S4 pág. 52), paso "llenar la jarra con agua":**

| Modo de falla | Efecto | S | Causa | O | Control | D | RPN | Acción | S' | O' | D' | RPN' |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Cantidad de agua incorrecta | Café muy fuerte o liviano | 8 | Marcas de nivel ilegibles | 4 | Inspección visual | 4 | 128 | Reemplazar jarra | 8 | 1 | 3 | 24 |
| ídem | ídem | 8 | Agua derramada | 5 | Ninguno | 9 | 360 | Capacitar | 8 | 2 | 7 | 112 |
| Agua demasiado caliente | Café muy fuerte | 8 | No se dejó enfriar el agua del grifo | 8 | "Dedo" | 4 | 256 | Capacitar | 8 | 2 | 5 | 96* |
| ídem | ídem | 8 | Empleado no sabía que debía agregar agua fría | 7 | Ninguno | 10 | 560 | Capacitar | 8 | 1 | 8 | 64 |
| Jarra no limpia | Residuos en el café | 10 | No se lavó | 4 | Inspección visual | 4 | 160 | Designar inspector | 10 | 1 | 4 | 40 |
| ídem | Feo gusto | 10 | Guardado inadecuado | 7 | Capacitación | 5 | 350 | Recipiente de guardado + capacitación | 10 | 2 | 3 | 60 |

\* Inconsistencia del material: 8 × 2 × 5 = 80, no 96.

Nota: la severidad no cambia tras las acciones, coherente con "con frecuencia no se puede hacer nada al respecto" (S4 pág. 50).

### 6.11 Plan de control
**Formato de tres bloques (S4 págs. 62-63):**
- **Documentación** ("el plan para hacer el trabajo"): Flujograma de desarrollo (pasos por función, transferencias y responsables) | Detalle sobre tareas clave (cómo hacerla o referencia a procedimiento).
- **Monitoreo** ("verificar el trabajo"): Medidas clave del proceso y de la salida (signos vitales: defectos, oportunidad, etc.) | Normas de monitoreo (metas, límites, tolerancias; provienen de clientes, normativas como ISO o experiencia) | Método de registro de datos (lista de verificación, gráfico de proceso, dispersión, Pareto; quién registra).
- **Plan de respuesta** ("respuesta a causas especiales"): Contención (qué hacer con la salida defectuosa y con quien la recibió) | Procedimiento de ajuste del proceso | Procedimiento de mejora del sistema (quién necesita qué datos para decisiones de fondo).

**Plantilla AIAG (S4 pág. 64):**
- Cabecera: Plan de control Nº; Contactos clave / teléfono; Fecha (orig.); Fecha (rev.); Vigencia; Servicio Nº / nivel del último cambio; Equipo principal; Aprobación de ingeniería del cliente / fecha; Nombre de la pieza / descripción; Aprobación del proveedor / fecha; Aprobación de calidad del cliente / fecha; Proveedor; Código del proveedor; Otras aprobaciones.
- Cuerpo: Servicio / Nº de proceso; Nombre del proceso / descripción de la operación; Equipo; Características (Nº, Servicio, Proceso); Clasificación especial; Métodos (Especificación / tolerancia; Técnica de medición o evaluación; Muestra: tamaño y frecuencia; Método de control); Plan de reacción.

### 6.12 Datos del ejercicio de tornillos (S1 pág. 50)
Especificación 100 ± 5 mm. Ocho muestras de 5 unidades:

| Orden | M1 | M2 | M3 | M4 | M5 | M6 | M7 | M8 |
|---|---|---|---|---|---|---|---|---|
| 1 | 100 | 101 | 102 | 100 | 96 | 102 | 106 | 99 |
| 2 | 96 | 95 | 99 | 100 | 97 | 99 | 107 | 95 |
| 3 | 97 | 105 | 98 | 102 | 98 | 103 | 105 | 99 |
| 4 | 105 | 104 | 96 | 95 | 99 | 98 | 104 | 98 |
| 5 | 99 | 106 | 99 | 99 | 100 | 99 | 105 | 105 |

(complemento, no del material) Con s global: x̄ = 100,3, s ≈ 3,44, Cp ≈ 0,48 y Cpk ≈ 0,45. Con σ intra-subgrupo estimada como R̄/d2 = 6,875/2,326 ≈ 2,96: Cp ≈ 0,56 y Cpk ≈ 0,53. En ambos casos el proceso **no es adecuado** (Cp ≤ 1 según la tabla del material).

---

## 7. Fórmulas, indicadores y escalas

### 7.1 Métricas de defectos (S1 págs. 34-37)
- **Unidad (U):** elementos inspeccionados en el período.
- **Oportunidad (O):** formas en que una unidad puede fallar (por ejemplo, una solicitud enviada tarde, con errores, incompleta, no solicitada).
- **Defecto (D):** todo lo que causa insatisfacción o no conformidad; es un subconjunto de las oportunidades.
- **DPU** = D / U → 9 / 4 = 2,25
- **OT** (oportunidades totales) = U × O → 4 × 5 = 20
- **DPO** = D / OT → 9 / 20 = 0,45
- **DPMO** = DPO × 1.000.000 → 450.000
- **Desempeño (% bueno)** = 1 − DPO → 55 %. Con la tabla, el **nivel sigma es ≈ 1,6**.

### 7.2 Tabla de equivalencias desempeño, DPMO y sigma (S1 pág. 36)
| σ | Desempeño | DPMO | | σ | Desempeño | DPMO | | σ | Desempeño | DPMO |
|---|---|---|---|---|---|---|---|---|---|---|
| 0 | 6,6 % | 934.000 | | 2,0 | 69,2 % | 308.000 | | 4,0 | 99,4 % | 6.210 |
| 0,1 | 8,0 % | 920.000 | | 2,1 | 72,6 % | 274.000 | | 4,1 | 99,5 % | 4.660 |
| 0,2 | 10,0 % | 900.000 | | 2,2 | 75,8 % | 242.000 | | 4,2 | 99,7 % | 3.460 |
| 0,3 | 12,0 % | 880.000 | | 2,3 | 78,8 % | 212.000 | | 4,3 | 99,75 % | 2.550 |
| 0,4 | 14,0 % | 860.000 | | 2,4 | 81,6 % | 184.000 | | 4,4 | 99,81 % | 1.860 |
| 0,5 | 16,0 % | 840.000 | | 2,5 | 84,2 % | 158.000 | | 4,5 | 99,87 % | 1.350 |
| 0,6 | 19,0 % | 810.000 | | 2,6 | 86,5 % | 135.000 | | 4,6 | 99,90 % | 960 |
| 0,7 | 22,0 % | 780.000 | | 2,7 | 88,5 % | 115.000 | | 4,7 | 99,93 % | 680 |
| 0,8 | 25,0 % | 750.000 | | 2,8 | 90,3 % | 96.800 | | 4,8 | 99,95 % | 480 |
| 0,9 | 28,0 % | 720.000 | | 2,9 | 91,9 % | 80.800 | | 4,9 | 99,97 % | 330 |
| 1,0 | 31,0 % | 690.000 | | 3,0 | 93,3 % | 66.800 | | 5,0 | 99,977 % | 230 |
| 1,1 | 35,0 % | 650.000 | | 3,1 | 94,5 % | 54.800 | | 5,1 | 99,985 % | 150 |
| 1,2 | 39,0 % | 610.000 | | 3,2 | 95,5 % | 44.600 | | 5,2 | 99,990 % | 100 |
| 1,3 | 43,0 % | 570.000 | | 3,3 | 96,4 % | 35.900 | | 5,3 | 99,993 % | 70 |
| 1,4 | 46,0 % | 540.000 | | 3,4 | 97,1 % | 28.700 | | 5,4 | 99,996 % | 40 |
| 1,5 | 50,0 % | 500.000 | | 3,5 | 97,7 % | 22.700 | | 5,5 | 99,997 % | 30 |
| 1,6 | 54,0 % | 460.000 | | 3,6 | 98,2 % | 17.800 | | 5,6 | 99,9980 % | 20 |
| 1,7 | 58,0 % | 420.000 | | 3,7 | 98,6 % | 13.900 | | 5,7 | 99,9990 % | 10 |
| 1,8 | 61,8 % | 382.000 | | 3,8 | 98,9 % | 10.700 | | 5,8 | 99,9992 % | 8 |
| 1,9 | 65,6 % | 344.000 | | 3,9 | 99,2 % | 8.190 | | 5,9 | 99,9995 % | 5 |
| | | | | | | | | 6,0 | 99,99966 % | 3,4 |

Tabla resumida (S1 pág. 30): 93 % → 66.807 → 3,0σ · 98 % → 22.750 → 3,5σ · 99 % → 6.210 → 4,0σ · 99,87 % → 1.350 → 4,5σ · 99,9997 % → 3,4 → 6,0σ.

Analogías (S1 pág. 31): 3σ equivale a 1,5 palabras mal escritas por página (66.807); 4σ, a 1 cada 30 páginas (6.210); 5σ, a 1 en una enciclopedia (233); 6σ, a 1 en una pequeña biblioteca (3,4).

(complemento, no del material) La tabla corresponde a la convención de **desplazamiento de 1,5σ** de largo plazo: nivel σ = Z(1 − DPMO/10⁶) + 1,5. Es la fórmula que la plataforma debe usar para que sus resultados coincidan con la tabla del curso. En Excel: `=NORM.S.INV(1-DPMO/1000000)+1.5`.

### 7.3 Capacidad del proceso (S1 págs. 43-47)
- Dispersión natural = 6σ (±3σ contiene el 99,73 % con distribución normal). Tolerancia = USL − LSL (LES − LEI).
- **Cp = (USL − LSL) / 6σ**
- **Cpk = mín[(USL − x̄) / 3σ ; (x̄ − LSL) / 3σ]**
- Cp y Cpk usan la **σ de corto plazo** (período acotado). Se calculan ambos y se informa el menor; Cpk refleja el descentrado.
- **Interpretación de Cp (S1 pág. 45):**

| Cp | Interpretación |
|---|---|
| Cp > 2 | Proceso con nivel de calidad 6σ |
| 1,67 < Cp ≤ 2 | Más que adecuado |
| 1,33 < Cp ≤ 1,67 | Adecuado |
| 1 < Cp ≤ 1,33 | Necesita control |
| 0,67 < Cp ≤ 1 | No adecuado |

(complemento, no del material) Para Cp ≤ 0,67 la plataforma puede mostrar "No adecuado / requiere modificaciones serias". Pp y Ppk, con σ de largo plazo, no aparecen en el material.

### 7.4 Rendimientos (S1 págs. 53-60)
- **Rendimiento clásico YC** = unidades buenas al final / unidades inspeccionadas (3/4 = 75 %).
- **Rendimiento de primera vez YFT** = unidades buenas a la primera / unidades inspeccionadas la primera vez (1/4 = 25 %).
- **Rendimiento acumulado RTY (YRT)** = Π YFT,i. Ejemplos: 0,99 × 0,99 = 98 %; 0,955 × 0,97 × 0,944 = 87,5 %; 0,9⁴ = 66 %.
- "DPMO malgastados" por etapa en el ejemplo: 45.000 + 28.650 + 51.876 = 125.526, es decir (1 − RTY) × 10⁶.

### 7.5 Estadística descriptiva (S2)
- Media muestral x̄ = Σxi / n; media poblacional µ = Σxi / N.
- Mediana: valor central (n impar) o promedio de los dos centrales (n par). Moda: valor más frecuente.
- Rango = Máx − Mín.
- **Desviación estándar muestral s = √[Σ(xi − x̄)² / (n − 1)]**. Ejemplo: s = 3,81 para las edades 32…44.
- Varianza = s² (se menciona como medida de variabilidad).

### 7.6 Tamaño de muestra (S2 págs. 13-14)
- **Continuo:** n = (1,96 · s / Δ)². Ejemplo: s = 2 h, Δ = 1 h → 15 reposiciones.
- **Discreto:** n = (1,96 / Δ)² · P · (1 − P). Ejemplo: P = 0,25, Δ = 0,10 → 384 × 0,1875 = 72 reposiciones.
- 1,96 corresponde al 95 % de confianza; Δ es la precisión deseada en las unidades de s, o en unidades de proporción.
- (complemento, no del material) La práctica habitual es redondear n hacia arriba (15,37 → 16). Ejercicio 1 resuelto con las mismas fórmulas: continuo (1,96 × 7,16 / 2)² ≈ 49,2 → 50; discreto (1,96 / 0,05)² × 0,3 × 0,7 ≈ 322,7 → 323.

### 7.7 Control estadístico (S2 págs. 53-57)
- **Límites de control (fórmula aproximada del material):** UCL = x̄ + 3σ; LCL = x̄ − 3σ. Se topan en los límites físicos (por ejemplo, OTD ≤ 100 %).
- **Selección de la gráfica de control (S2 pág. 53):**

| Tipo de dato | Subtipo | Condición | Gráfica | Mide | Distribución |
|---|---|---|---|---|---|
| Discreto, **defectos** | — | Área de oportunidad constante | **C** | Número de incidencias | Poisson |
| Discreto, defectos | — | Variable | **U** | Incidencias por unidad | Poisson |
| Discreto, **defectuosos** | — | Subgrupo constante | **NP** | Número de defectuosos | Binomial |
| Discreto, defectuosos | — | Subgrupo variable | **P** | Proporción de defectuosos | Binomial |
| **Continuo** | Sin subgrupos | — | **I-MR** | Individuales y rango móvil | Normal / TLC |
| Continuo | Con subgrupos | — | **X̄-R** | Media y rango | Normal / TLC |

- (complemento, no del material) Fórmulas estándar que la plataforma debería usar en lugar de la aproximación ±3s global:
  - I-MR: x̄ ± 2,66·MR̄; UCL_MR = 3,267·MR̄.
  - X̄-R: X̿ ± A2·R̄; UCL_R = D4·R̄; LCL_R = D3·R̄.
  - P: p̄ ± 3√(p̄(1 − p̄)/n).
  - NP: np̄ ± 3√(np̄(1 − p̄)).
  - C: c̄ ± 3√c̄.
  - U: ū ± 3√(ū/n).
  - Reglas de Western Electric / Nelson para detectar patrones (rachas, tendencias). El material solo ilustra puntos fuera de límites y patrones visuales de tendencia, mezcla y ciclos.
- **Deming:** 94 % de la variación por causa común y 6 % por causa especial.

### 7.8 Inferencia (S2 págs. 62-81; S4 págs. 13-17)
- H0 (igualdad) frente a H1. Error tipo I: rechazar H0 verdadera. Error tipo II: no rechazar H0 falsa.
- **Regla de decisión:** α = 0,05. Si p < 0,05, se rechaza H0; si p > 0,05, no se rechaza.
- Prueba citada: **2-Sample T-Test** (antes/después). Para el paso 15 se pregunta "¿qué prueba de hipótesis podríamos utilizar?" para proporción, promedio o desviación estándar, sin detallar más.
- (complemento, no del material) Pruebas típicas: 1-Sample t, 2-Sample t, t pareada, 2 proporciones, F o Levene para varianzas, ANOVA, chi-cuadrado y Mann-Whitney.
- **Regresión:** Y = b0 + b1X1 + … Se interpretan los p por coeficiente (X significativa si p < 0,05), el p del ANOVA del modelo, R² y R²(adj).
- **Interpretación de R²(adj) (S2 pág. 71):** > 0,8, correlación fuerte; entre 0,5 y 0,8, moderada; < 0,5, poca o ninguna.
- **Causalidad** = correlación significativa + precedencia temporal de la causa + conexión causa-efecto.
- **Delta/sigma:** δ = x̄después − x̄antes; σ = s después de la mejora; δ/σ → n según la tabla.

**Tabla de tamaño de muestra delta/sigma (derivada de 2-Sample T-Test; S2 pág. 80), valores n:**

| δ/σ | α20 β20 | α20 β10 | α20 β5 | α20 β1 | α10 β20 | α10 β10 | α10 β5 | α10 β1 | α5 β20 | **α5 β10** | α5 β5 | α5 β1 | α1 β20 | α1 β10 | α1 β5 | α1 β1 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 0,1 | 903 | 1315 | 1714 | 2605 | 1238 | 1714 | 2166 | 3156 | 1571 | **2103** | 2600 | 3676 | 2337 | 2977 | 3564 | 4808 |
| 0,2 | 227 | 330 | 430 | 652 | 311 | 430 | 543 | 790 | 394 | **527** | 651 | 920 | 585 | 745 | 892 | 1203 |
| 0,3 | 102 | 147 | 192 | 291 | 139 | 192 | 242 | 352 | 176 | **235** | 290 | 410 | 261 | 332 | 397 | 536 |
| 0,4 | 58 | 84 | 109 | 164 | 79 | 109 | 137 | 199 | 100 | **133** | 164 | 231 | 147 | 187 | 224 | 302 |
| 0,5 | 38 | 54 | 70 | 106 | 51 | 70 | 88 | 128 | 64 | **86** | 105 | 148 | 95 | 121 | 144 | 194 |
| 0,6 | 27 | 38 | 49 | 74 | 36 | 49 | 62 | 89 | 45 | **60** | 74 | 104 | 66 | 84 | 100 | 135 |
| 0,7 | 20 | 28 | 36 | 55 | 27 | 36 | 46 | 66 | 34 | **44** | 55 | 76 | 49 | 62 | 74 | 100 |
| 0,8 | 16 | 22 | 28 | 42 | 21 | 28 | 35 | 51 | 26 | **34** | 42 | 59 | 38 | 48 | 57 | 77 |
| 0,9 | 13 | 18 | 23 | 34 | 17 | 23 | 28 | 40 | 21 | **27** | 34 | 47 | 30 | 38 | 45 | 61 |
| 1,0 | 11 | 15 | 19 | 28 | 14 | 19 | 23 | 33 | 17 | **23** | 27 | 38 | 25 | 31 | 37 | 50 |
| 1,1 | 9 | 12 | 16 | 23 | 12 | 16 | 19 | 28 | 14 | **19** | 23 | 32 | 21 | 26 | 31 | 41 |
| 1,2 | 8 | 11 | 13 | 20 | 10 | 13 | 17 | 23 | 12 | **16** | 20 | 27 | 18 | 22 | 26 | 35 |
| 1,3 | 7 | 9 | 12 | 17 | 9 | 12 | 14 | 20 | 11 | **14** | 17 | 23 | 15 | 19 | 23 | 30 |
| 1,4 | 6 | 8 | 10 | 15 | 8 | 10 | 13 | 18 | 10 | **12** | 15 | 20 | 13 | 17 | 20 | 26 |
| 1,5 | 6 | 7 | 9 | 13 | 7 | 9 | 11 | 16 | 8 | **11** | 13 | 18 | 12 | 15 | 17 | 23 |
| 1,6 | 5 | 7 | 8 | 12 | 6 | 8 | 10 | 14 | 8 | **10** | 12 | 16 | 11 | 13 | 15 | 20 |
| 1,7 | 5 | 6 | 7 | 11 | 6 | 7 | 9 | 12 | 7 | **9** | 10 | 14 | 10 | 12 | 14 | 18 |
| 1,8 | 4 | 6 | 7 | 10 | 5 | 7 | 8 | 11 | 6 | **8** | 10 | 13 | 9 | 11 | 12 | 16 |
| 1,9 | 4 | 5 | 6 | 9 | 5 | 6 | 7 | 10 | 6 | **7** | 9 | 12 | 8 | 10 | 11 | 15 |
| 2,0 | 4 | 5 | 6 | 8 | 5 | 6 | 7 | 9 | 5 | **7** | 8 | 11 | 7 | 9 | 10 | 14 |
| 2,1 | 4 | 4 | 5 | 7 | 4 | 5 | 6 | 9 | 5 | **6** | 7 | 10 | 7 | 8 | 10 | 12 |
| 2,2 | 3 | 4 | 5 | 7 | 4 | 5 | 6 | 8 | 5 | **6** | 7 | 9 | 6 | 8 | 9 | 11 |

La columna destacada en el material es α = 5 %, β = 10 %. Nota: en el ejemplo, el material escribe "Delta = 21" y lo divide por σ = 0,2233. El cálculo coherente en unidades es 0,21 / 0,2233 ≈ 0,94.

### 7.9 MSA (S3 págs. 53-63)
- σ²Total = σ²Producto + σ²SM (VT = VP + VSM); σ²SM = σ²repetibilidad + σ²reproducibilidad.
- **Criterio AIAG:** error < 10 %, aceptable; 10-30 %, puede ser aceptable según riesgo, costo del instrumento o reparación; > 30 %, inaceptable (mejorar el sistema de medición).
- Ejemplo: Gage R&R = 7,12 % de contribución (repetibilidad 3,10 %, reproducibilidad 4,02 %), parte a parte 92,88 %. Resultado: aceptable.
- (complemento, no del material) En la práctica AIAG, los umbrales 10/30 % se aplican a **%Variación de estudio** (o %Tolerancia). Para **%Contribución** (varianza) los umbrales equivalentes son 1 % y 9 %. La plataforma debería mostrar ambas métricas y aclarar qué umbral aplica.

### 7.10 FMEA, escalas y RPN (S4 págs. 50-51; Template FMEA)
| Factor | Definición | 1 | 10 |
|---|---|---|---|
| **Severidad (SEV)** | Importancia del efecto sobre los requerimientos del cliente; con frecuencia no se puede cambiar | No grave | Muy grave |
| **Ocurrencia (OCC)** | Frecuencia con que una causa ocurre y crea el modo de falla | No probable | Muy probable |
| **Detección (DET)** | Capacidad del control actual para detectar o evitar la causa | Probablemente la detecte | No es probable que la detecte |

- **RPN = SEV × OCC × DET** (rango 1 a 1.000). Tras las acciones se recalcula el RPN y se registra el mes/año.
- El material **no** entrega las tablas detalladas de los niveles intermedios (2 a 9). (complemento, no del material) Suelen usarse tablas tipo AIAG/VDA y criterios de acción adicionales a la sola priorización por RPN, por ejemplo atender toda severidad ≥ 9.

### 7.11 Otros indicadores mencionados
- Matriz de criterios múltiples: puntaje = Σ wᵢ · notaᵢ, con notas 9/3/1 y Σw = 1.
- Pugh: Σ+, Σ−, ΣS y totales ponderados (Σ importancia de los criterios con + o con −).
- Duración máxima del proyecto: 6 meses. Seguimiento de beneficios: 12 meses. Carga máxima razonable para el recolector de datos: 15 min al día.
- KPIs de ejemplo: OTD / % on time, OTIF, NPS, reclamos, devoluciones, tiempo de ciclo, FTE, productividad, quiebres de stock.

---

## 8. Aplicación en la plataforma

### 8.1 Módulos y funcionalidades

1. **Módulo "Proyecto DMAIC"** (contenedor). Estructura fija de **5 fases y 15 pasos** (S1 pág. 70), con estado por paso (no iniciado / en curso / completo / aprobado) y avance por fase. La **revisión del Resumen Ejecutivo** queda como entregable obligatorio de cada compuerta (*tollgate*). Roles y permisos según S1 págs. 72-75:
   - Líder (GB/BB): edita.
   - Coach / MBB: revisa la metodología.
   - Champion / Sponsor: aprueba compuertas y elimina barreras.
   - Dueño del proceso: co-aprueba Mejorar y Controlar y recibe la transferencia.
   - Contralor financiero: valida el paso 9 y el paso 15.
   - YB / miembros: contribuyen.
2. **Plantillas digitales vinculadas** (ver §6): charter, traducción VOC → CCR, elementos Y, SIPOC, mapa de proceso (editor de flujos "as-is / to-be"), plan de medición con matriz de estratificación, hoja de verificación configurable (genera formularios de captura móvil), Gage R&R, Ishikawa 6M, registro de ideas, esfuerzo-impacto, criterios múltiples, Pugh, plan de piloto, **FMEA** (réplica del Template FMEA.xls), plan de control (3 bloques + AIAG) y acta de cierre. Los campos se reutilizan entre plantillas: la Y, el LSL/USL y la unidad definidos en "Elementos Y" alimentan automáticamente el plan de medición, los cálculos de capacidad, las gráficas de control y el plan de control.
3. **Motor estadístico** (cálculos automáticos, ver 8.3), con carga de datos por CSV o Excel, captura manual o integración con sistemas fuente.
4. **Panel de proyecto / portafolio:** línea base frente a actual de la Y, nivel σ, DPMO, Cpk, RTY, beneficio estimado (paso 9) frente a validado (paso 15), estado de compuertas y semáforo de riesgo (RPN máximo abierto).
5. **Biblioteca de conocimiento:** lecciones aprendidas del cierre (paso 15), plantillas reutilizables, backlog de mejora continua (S4 pág. 57) y mejores prácticas compartidas entre sitios (rol BB).
6. **Monitoreo post-proyecto:** gráficas de control vivas sobre la Y y las Xs críticas del plan de control, alertas de causa especial que disparan el plan de respuesta (contención, ajuste, mejora del sistema) y seguimiento mensual de beneficios durante **12 meses**.

### 8.2 Flujo DMAIC completo con compuertas (tollgates)

| Fase / pasos | Entregables en la plataforma | Cálculos automáticos | **Compuerta: criterios de salida** (aprobador) |
|---|---|---|---|
| **Definir** (1-3) | Charter; VOC → CCR (uno priorizado); ficha Y; SIPOC con límites | Valor del impacto ($); gráfico de serie de tiempo de la Y histórica (si existe); verificación SMART del objetivo (verbo, Y, meta numérica, fecha) | **TG-D:** problema sin causas ni soluciones; objetivo SMART; un solo CCR / una Y; alcance dentro/fuera explícito; plan ≤ 6 meses; equipo y dedicación definidos; SIPOC con 5-6 pasos y límites. (Champion + Coach) |
| **Medir** (4-6) | Mapa detallado "as-is"; plan de medición (8 columnas) + matriz de estratificación; hojas de verificación; estudio MSA; informe de línea base | Tamaño de muestra (continuo/discreto); descriptivos (media, mediana, moda, rango, s); histograma, boxplot y serie de tiempo; detección de tendencia, mezcla y ciclos; Gage R&R; selección automática y cálculo de la gráfica de control; Cp, Cpk, DPU, DPO, DPMO, % bueno, **nivel σ**, YFT y RTY de línea base | **TG-M:** definición operacional aprobada; n recolectado ≥ n requerido; datos cubren el rango esperado; **MSA aceptable** (< 10 %, o 10-30 % con justificación de riesgo); estabilidad evaluada (causas especiales identificadas o explicadas); línea base de la Y (σ, DPMO, Cpk) registrada en el charter. (Coach + Champion) |
| **Analizar** (7-9) | Ishikawa 6M y lluvia de ideas; Pareto; lista priorizada de Xs; validación de Xs (regresión, estudios); cuantificación de la oportunidad | Pareto con % acumulado y corte 80 %; regresión simple/múltiple (coeficientes, p, R², R²(adj), ANOVA) con semáforo fuerte/moderado/débil; pruebas de hipótesis por estrato (por ejemplo, OTD por turno o lugar); alerta "correlación ≠ causalidad"; modelo de beneficio (ahorro anual, costo evitado, capital de trabajo) | **TG-A:** cada X crítica validada con datos (p < 0,05 o evidencia equivalente) y vinculada a la Y; X no validadas descartadas; oportunidad cuantificada y **revisada por el Contralor**; decisión registrada: **continuar / modificar alcance / detener**. (Champion + Contralor) |
| **Mejorar** (10-12) | Registro de soluciones (benchmarking, brainstorming); matriz esfuerzo-impacto; criterios múltiples; Pugh; DOE (opcional); plan de piloto con criterios de éxito; **FMEA de la solución**; costo/beneficio de la solución | Puntajes ponderados (criterios múltiples, Pugh); análisis factorial del DOE (efectos principales e interacciones; complemento); RPN y ranking; prueba de hipótesis antes/después en el piloto (2-Sample t / 2 proporciones); **delta/sigma** con n requerido; Cpk y σ proyectados | **TG-I:** solución seleccionada con trazabilidad a las X validadas; piloto ejecutado con criterios de éxito cumplidos; mejora **estadísticamente significativa** (p < 0,05) y prácticamente relevante; FMEA sin RPN altos abiertos sin acción (umbral configurable) y acciones con responsable; costo/beneficio aprobado. (Champion + Dueño del proceso + Contralor) |
| **Controlar** (13-15) | Plan de implementación a escala; MSA sobre Xs críticas; SOP y controles visuales; error proofing; **plan de control** (3 bloques + AIAG); transferencia; costo/beneficio final; acta de cierre y lecciones aprendidas | Gráficas de control de la Y y las Xs con límites recalculados en el nuevo proceso; alertas de causa especial; Cp/Cpk y nivel σ finales; prueba de hipótesis final frente a la línea base; RTY final; beneficios mensuales acumulados frente a lo comprometido | **TG-C:** proceso estable (en control) y capaz frente a la especificación del cliente; plan de control con dueño, frecuencia y plan de reacción; MSA de las Xs críticas aceptable; capacitación y documentación entregadas; **dueño del proceso acepta la transferencia**; beneficios validados por el Contralor (seguimiento a 12 meses activado); reunión de cierre documentada. (Champion + Dueño del proceso + Contralor) |

Reglas transversales sugeridas:
- No se puede aprobar una compuerta con entregables obligatorios incompletos.
- Cada compuerta guarda una **versión congelada del charter** (historial de revisiones del Resumen Ejecutivo).
- La plataforma muestra la curva de traspaso de responsabilidad de los Belts al Dueño del proceso (S1 pág. 76) y exige la incorporación del dueño desde Analizar.
- Alertas metodológicas:
  - más de un CCR o una Y: "es otro proyecto dentro del proyecto";
  - problema que contiene una causa o una solución;
  - objetivo sin fecha;
  - carga de recolección mayor a 15 min al día;
  - n insuficiente para el δ/σ esperado.

(Aviso: las compuertas y los umbrales propuestos son orientativos. Su adopción formal debe pasar por el proceso interno de aprobación de metodología y gobierno de proyectos de la organización.)

### 8.3 Cálculos estadísticos automáticos (especificación)

| Grupo | Cálculo | Entradas | Salida / regla |
|---|---|---|---|
| Defectos | DPU, OT, DPO, DPMO, % bueno, **nivel σ** | U, O por unidad, D | Nivel σ por tabla del curso o por Z(1 − DPO) + 1,5 (complemento); comparación con el benchmark 3σ / 4σ / 6σ |
| Rendimiento | YC, YFT, **RTY**, DPMO "malgastados" por etapa | Unidades por paso: entradas, buenas a la primera, reprocesadas, descartadas | RTY = Π YFT; visualización de la "fábrica escondida" |
| Capacidad | **Cp, Cpk** (σ corto plazo); opcional Pp/Ppk (complemento) | Datos continuos, LSL/USL, subgrupos | Clasificación de Cp según la tabla del curso; alerta si Cpk < Cp (descentrado); curva normal con LSL/USL |
| Descriptiva | Media, mediana, moda, mín, máx, rango, s, varianza | Serie | Histograma, boxplot, dot plot, serie de tiempo; aviso de extremos (media frente a mediana) |
| Estabilidad | Detección de tendencia, mezcla y ciclos (complemento: pruebas de rachas / reglas de Nelson) | Serie temporal + factores de estratificación | Sugerencia de estratificar antes de promediar |
| Muestreo | n continuo = (1,96·s/Δ)²; n discreto = (1,96/Δ)²·P(1 − P) | s o P, Δ, confianza | n redondeado hacia arriba |
| SPC | Selector automático **C / U / NP / P / I-MR / X̄-R** según tipo de dato, defecto/defectuoso y subgrupo | Tipo de dato, tamaño de subgrupo | Límites UCL/LCL (fórmulas estándar; aproximación ±3σ del curso como modo didáctico), puntos fuera de control y topes físicos (0-100 %) |
| MSA | Gage R&R cruzado (ANOVA o Xbar-R; complemento: método de cálculo) | Partes × operadores × réplicas, tolerancia | %Contribución, %Var. estudio, %Tolerancia; veredicto AIAG < 10 / 10-30 / > 30 % |
| Inferencia | 2-Sample t (y complemento: t pareada, 2 proporciones, varianzas, ANOVA, chi²) | Muestras antes/después o por estrato | p, IC 95 %, decisión "rechazar / no rechazar H0" en lenguaje llano; recordatorio de significancia práctica frente a estadística |
| Delta/sigma | δ/σ y n requerido | Medias antes/después, s después, α, β | Búsqueda en la tabla del curso (§7.8); estimación del tiempo para reunir n según la frecuencia del dato; recomendaciones ("cambio más grande" / "reducir σ") |
| Regresión | Simple y múltiple, ANOVA | Y, X1…Xn | Ecuación, p por X, R², R²(adj) con semáforo > 0,8 / 0,5-0,8 / < 0,5; ranking de Xs |
| Priorización | Pareto (% acumulado), criterios múltiples (Σw·nota), Pugh (Σ+, Σ−, S, ponderados), esfuerzo-impacto | Conteos / notas / pesos | Ranking y cuadrante "quick wins" |
| Riesgo | **RPN = SEV × OCC × DET**, antes y después | Escalas 1-10 | Orden por RPN; alertas por RPN ≥ umbral o SEV ≥ 9 (complemento); verificación de que el RPN posterior se recalcula y se fecha (mes/año) |
| Beneficios | Oportunidad (paso 9) frente a costo/beneficio (paso 11) frente a beneficio validado (paso 15) | Supuestos financieros, datos reales mensuales | Curva acumulada a 12 meses y desvío frente a lo comprometido |

Advertencia de diseño: los resultados estadísticos automáticos deben presentarse con sus supuestos (normalidad, independencia, tamaño de muestra) y ser revisados por un Belt certificado o un especialista antes de usarse en decisiones formales.

### 8.4 Flujos concretos de ejemplo
- **Flujo "línea base en 1 clic":** el usuario sube una serie de la Y. La plataforma detecta el tipo de dato, propone la gráfica de control, calcula límites, marca causas especiales, calcula Cp/Cpk (si hay LSL/USL) o DPMO y nivel σ (si es discreto) y escribe la línea base en el charter.
- **Flujo FMEA:** se importan los pasos del SIPOC o del mapa detallado como filas "Paso / Entrada". El equipo completa modo, efecto, S, causa, O, control y D, y la plataforma calcula y ordena el RPN. Las acciones se convierten en tareas con responsable y fecha. Al cerrarlas se pide re-puntuar S, O y D y se registra el mes/año.
- **Flujo de verificación de mejora:** con los datos antes y después del piloto, la plataforma ejecuta la 2-Sample t y el delta/sigma. Si n es insuficiente, informa cuántos datos faltan y el plazo estimado (por ejemplo, "≈ 2 años con datos mensuales"), y sugiere aumentar la frecuencia de medición.
- **Flujo de transferencia:** al aprobar TG-C se genera el plan de control, se asignan las alertas SPC al dueño del proceso, se programan las revisiones mensuales de beneficios y la reunión de cierre, y se publican las lecciones en la biblioteca.

---

## 9. Glosario breve

- **σ (sigma):** desviación estándar; mide la variación.
- **Nivel sigma:** capacidad expresada en sigmas; 6σ equivale a 3,4 DPMO.
- **Unidad / Oportunidad / Defecto:** elemento evaluado / forma posible de fallar / no conformidad que causa insatisfacción.
- **DPU, DPO, DPMO:** defectos por unidad, por oportunidad y por millón de oportunidades.
- **YC, YFT, RTY (YRT):** rendimiento clásico, de primera vez y acumulado.
- **Fábrica escondida:** recursos consumidos en reprocesos y desperdicio que las métricas tradicionales no muestran.
- **Cp / Cpk:** índices de capacidad potencial y real (con centrado).
- **LSL/USL (LEI/LES):** límites de especificación inferior y superior (voz del cliente).
- **LCL/UCL (LCI/LCS):** límites de control inferior y superior (voz del proceso).
- **Causa común / especial:** variación inherente y estable / variación por factores identificables.
- **Manipulación (tampering):** sobreajuste del proceso según datos individuales.
- **Y = f(X):** función de transferencia; la salida depende de las entradas.
- **VOC / VOB:** voz del cliente / del negocio.
- **CCR / CBR:** requerimiento crítico del cliente / del negocio.
- **CTQ:** (complemento, no del material) "Critical to Quality", equivalente usual del CCR.
- **SIPOC:** Proveedores, Entradas, Proceso, Salidas, Clientes.
- **Definición operacional:** regla precisa de qué y cómo medir.
- **MSA / Gage R&R:** análisis del sistema de medición / estudio de repetibilidad y reproducibilidad.
- **Repetibilidad / Reproducibilidad:** variación del instrumento / entre operadores.
- **Precisión / Exactitud (bias):** dispersión baja / centrado en el valor real.
- **H0 / H1, valor p, error tipo I / II:** elementos de la prueba de hipótesis.
- **R² (adj):** proporción de la variación explicada por el modelo.
- **Delta/sigma:** relación entre el cambio de medias y la σ posterior, que determina el n necesario.
- **Ishikawa (6M):** diagrama causa-efecto.
- **Pugh:** comparación de conceptos frente a una referencia.
- **DOE:** diseño de experimentos.
- **FMEA (AMEF):** análisis de modos y efectos de falla.
- **SEV / OCC / DET / RPN:** severidad, ocurrencia, detección y número de prioridad de riesgo.
- **Plan de control:** documento vivo con documentación, monitoreo y plan de respuesta.
- **Tollgate / Revisión del Resumen Ejecutivo:** revisión al cierre de cada fase DMAIC.
- **MBB / BB / GB / YB / Champion / Dueño del proceso / Contralor:** roles Six Sigma.
- **OTD / OTIF / NPS / FTE:** entrega a tiempo / a tiempo y completa / Net Promoter Score / equivalente a tiempo completo.

---

## 10. Vacíos de extracción

- **Gráficos sin texto:** las 7 herramientas básicas, las curvas de capacidad, las gráficas de control del ejemplo de OTD, el árbol de selección de gráficas y las capturas de software se reconstruyeron a partir del texto y de páginas renderizadas: S1 págs. 25, 29, 33, 36, 45-47, 50 y 76; S2 págs. 13-14, 52, 66 y 80; S3 págs. 9, 32, 53 y 63; S4 págs. 12, 15, 31 y 41. Otras páginas con imágenes no se revisaron visualmente (por ejemplo, S4 pág. 11, ilustraciones de spaghetti chart y estudios de casos; S4 pág. 64, plantilla AIAG, tomada del texto).
- **Código QR** (S2 pág. 9) con ejemplos de tipos de datos: contenido externo no disponible.
- **Pareto:** el material lo nombra (7 herramientas, paso 7, plan de control) pero no incluye una explicación ni un ejemplo dedicado.
- **Técnica de grupo nominal, diagrama de afinidad, análisis de campo de fuerza, spaghetti chart, estudios de números, de casos y de polivalencia, error proofing:** solo se nombran.
- **DOE:** solo hay motivación y un ejemplo de una variable por vez; no hay diseño factorial, análisis de efectos ni tabla de corridas.
- **Pruebas de hipótesis:** solo se ejemplifica la 2-Sample T-Test (con salida de software). No hay guía de selección de pruebas ni pruebas de normalidad.
- **Escalas FMEA:** solo se dan los extremos (1 y 10) de SEV, OCC y DET; no hay tablas de niveles intermedios ni umbral de acción por RPN. El Template FMEA.xls contiene solo la estructura (cabecera y columnas con preguntas guía), sin filas de ejemplo ni tablas de escalas.
- **Límites de control:** el material usa la aproximación x̄ ± 3σ; no incluye constantes (A2, D3, D4, d2) ni reglas de Western Electric / Nelson.
- **Pp/Ppk, nivel sigma de largo y corto plazo, desplazamiento de 1,5σ:** no se explican explícitamente, aunque la tabla de equivalencias es coherente con la convención 1,5σ.
- **Inconsistencias detectadas en el material:**
  - RPN posterior de 96 en el ejemplo del café (debería ser 8 × 2 × 5 = 80).
  - En delta/sigma se divide "21" por 0,2233; lo coherente es 0,21 / 0,2233.
  - El criterio AIAG (10/30 %) se aplica a %Contribución en el ejemplo de MSA.
  - Diferencias menores de redondeo entre tablas (66.807 frente a 66.800 DPMO para 3σ).
  - Tamaño de muestra continuo de 15 sin redondeo hacia arriba.
- **Datos personales:** la diapositiva de presentación del docente (S1 pág. 2) contiene datos de contacto y antecedentes laborales personales; no se reproducen. Los nombres de personas y lugares de los ejemplos se trataron genéricamente.
- **Lecturas complementarias:** no hay documentos de lectura en el material, solo bibliografía.
