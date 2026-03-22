# Roadmap del App por Fases

## 1. Proposito

Este roadmap organiza la evolución del `app` por fases funcionales y bloques de implementación.

No está pensado por meses. Está pensado para:

- construir con foco,
- implementar por bloques,
- delegar trabajo entre agentes,
- y mantener una secuencia clara de dependencia.

## 2. Principio de ejecución

Cada fase debe cerrar una capacidad real del producto.

No se avanza a la siguiente fase por cantidad de pantallas construidas, sino cuando el bloque anterior ya permite un uso real y coherente.

## 3. Fase 0. Base de Contratos y Producto

Objetivo:

- asegurar que el `app` tenga una base documental y estructural estable.

Incluye:

- visión del producto,
- arquitectura funcional,
- módulos y pantallas,
- metadata normalizada,
- validación de `base/masters`,
- `base/json` consistente.

Estado esperado de salida:

- el producto ya tiene dirección,
- la data es utilizable,
- y los agentes pueden trabajar con contratos claros.

Bloques implementables:

### Bloque 0A. Vision y definicion

- `docs/`
- criterios de producto
- alcance del `app`

### Bloque 0B. Contratos de datos

- revisión de `base/json`
- consistencia entre API y JSON
- validaciones del builder

## 4. Fase 1. Knowledge Hub Operable

Objetivo:

- permitir que el equipo encuentre rápido el recurso correcto.

Resultado funcional:

- el usuario ya puede explorar prompts, agentes, servicios, manuales y flujos desde una interfaz central.

Incluye:

- shell del producto,
- navegación principal,
- exploración por rol,
- exploración por disciplina,
- fichas de recursos,
- búsqueda básica,
- lectura de flujos.

Bloques implementables:

### Bloque 1A. Shell y navegación

- layout base
- navegación principal
- home
- rutas principales

### Bloque 1B. Exploración por rol y disciplina

- vistas por rol
- vistas por disciplina
- conexión con `roles_map.json` y `navigation_map.json`

### Bloque 1C. Biblioteca de recursos

- prompts
- agentes
- servicios
- manuales

### Bloque 1D. Búsqueda inicial

- búsqueda por texto
- filtros por metadata
- resultados por tipo de recurso

Dependencias:

- Fase 0 cerrada

## 5. Fase 2. Workspace Operativo

Objetivo:

- convertir el descubrimiento en acción guiada.

Resultado funcional:

- el usuario no solo encuentra recursos, sino que puede iniciar una tarea y estructurar inputs.

Incluye:

- formularios por `input_type`,
- vista de detalle de prompt accionable,
- lanzador de tareas,
- outputs estructurados por `deliverable_type`,
- acceso contextual a manuales.

Bloques implementables:

### Bloque 2A. Motor de briefs

- formularios base
- validación de campos
- plantillas por tipo de tarea

### Bloque 2B. Lanzador de prompts

- selección del prompt
- carga de contexto
- preparación de ejecución

### Bloque 2C. Vistas de salida

- resultados por tipo de entregable
- estructura legible
- recursos relacionados

### Bloque 2D. Flujos operativos guiados

- cotización
- contenido
- desarrollo
- CX/CRM

Dependencias:

- Fase 1 cerrada

## 6. Fase 3. Estado Ligero y Trazabilidad

Objetivo:

- permitir continuidad de trabajo sin convertir todavía el sistema en un CRM completo.

Resultado funcional:

- el usuario puede retomar trabajo, revisar sesiones y derivar tareas.

Incluye:

- historial de sesiones,
- guardado de briefs,
- estados simples,
- ownership básico,
- continuidad entre exploración y ejecución.

Bloques implementables:

### Bloque 3A. Sesiones

- creación
- guardado
- reanudación

### Bloque 3B. Estado operativo

- borrador
- en progreso
- listo para revisión
- archivado

### Bloque 3C. Trazabilidad mínima

- recursos usados
- inputs principales
- outputs generados

Dependencias:

- Fase 2 cerrada

## 7. Fase 4. Calidad, Revisión y Handoff

Objetivo:

- hacer que el producto no solo genere trabajo, sino que ayude a controlarlo antes de entrega.

Resultado funcional:

- el usuario puede revisar, validar y derivar outputs entre áreas.

Incluye:

- checklists por disciplina,
- vista de revisión,
- conexión con fuentes de verdad,
- handoff básico entre funciones.

Bloques implementables:

### Bloque 4A. Calidad por disciplina

- checklists
- warnings
- criterios mínimos

### Bloque 4B. Revisión de entregables

- vistas comparables
- resumen de insumos
- links a fuentes de verdad

### Bloque 4C. Derivación y siguiente paso

- qué sigue
- a qué rol pasa
- qué falta

Dependencias:

- Fase 3 cerrada

## 8. Fase 5. Sistema Operativo Asistido por IA

Objetivo:

- elevar el `app` de navegador operativo a asistente de trabajo contextual.

Resultado funcional:

- el sistema recomienda mejor, guía mejor y compone contexto de forma útil.

Incluye:

- recomendación contextual de prompts,
- composición de contexto desde servicios, agentes y manuales,
- ayudas de autocompletado estructurado,
- outputs más conectados al trabajo real.

Bloques implementables:

### Bloque 5A. Recomendación contextual

- sugerencia por intención
- sugerencia por servicio
- sugerencia por etapa

### Bloque 5B. Composición automática de contexto

- prompt + agente + manual + servicio
- contexto mínimo sugerido

### Bloque 5C. Asistencia de salida

- formatos sugeridos
- checklist contextual
- mejoras de entregabilidad

### Bloque 5D. Runtime de ejecucion real

- contrato minimo frontend-runtime
- adaptador de ejecucion
- normalizacion de salida
- manejo de error y fallback controlado

Dependencias:

- Fase 4 cerrada

## 9. Fase intermedia. Runtime de Ejecucion Real

Objetivo:

- cerrar la brecha entre UX operativa y ejecucion simulada antes de abrir la capa de estado expandida.

Resultado funcional:

- el sistema ya puede ejecutar de verdad, aunque todavia con arquitectura minima.

Incluye:

- contrato de ejecucion real,
- adaptador de runtime,
- normalizacion de outputs,
- manejo de error y degradacion.

Esta fase debe ocurrir entre Fase 5 y Fase 6.

No debe mezclarse con:

- DB completa,
- permisos,
- ownership,
- multiusuario.

## 10. Fase 6. Capa de Estado Expandida

Objetivo:

- preparar el salto a backend/DB cuando el producto lo justifique.

Resultado funcional:

- el sistema ya está listo para soportar más usuarios, más sesiones y mayor trazabilidad.

Incluye:

- modelo de estado más serio,
- permisos,
- ownership ampliado,
- integración futura con CRM, oportunidades o proyectos.

Esta fase no debe abrirse antes de validar que las fases anteriores realmente se usan.

## 11. Estrategia de implementacion con agentes

La implementación debe pensarse por bloques con ownership claro.

Ejemplo de reparto sano:

- agente A: shell y navegación,
- agente B: exploradores y fichas,
- agente C: búsqueda,
- agente D: briefs y lanzadores,
- agente E: salidas y sesiones,
- agente F: revisión y calidad.

Regla:

- cada agente debe tener write scope acotado,
- cada bloque debe integrarse contra contratos ya definidos,
- y el frontend no debe inventar estructura fuera de `base/json` salvo justificación explícita.

## 12. Criterio de cierre por fase

Una fase se considera cerrada cuando:

- resuelve una necesidad real,
- está integrada con los contratos actuales,
- no depende de heurísticas ad hoc,
- y puede ser usada por una persona del equipo sin explicación excesiva.

## 13. Definicion ejecutiva

Si hubiera que resumir este roadmap en una frase:

**el `app` debe construirse por fases funcionales cerradas, y cada fase debe dividirse en bloques que puedan implementarse por agentes sin perder coherencia de producto.**
