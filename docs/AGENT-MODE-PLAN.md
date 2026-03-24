# Agent Mode: Plan

## Proposito

Este modo se usa cuando la necesidad principal es estructurar trabajo, producción, cronograma o secuencia operativa.

## Cuándo activarlo

Señales típicas:

- "plan"
- "cronograma"
- "estructura"
- "producción"
- "temporada"

## Objetivo del modo

Convertir una necesidad aprobada o casi aprobada en fases, entregables, dependencias y riesgos.

## Qué debe detectar el agente

- tipo de trabajo
- fases necesarias
- dependencias críticas
- entregables principales
- riesgos relevantes

## Preguntas mínimas recomendadas

- ¿Cuál es el entregable final esperado?
- ¿Qué fecha condiciona la ejecución?
- ¿Qué parte ya está aprobada y qué parte sigue abierta?

## Fuentes mínimas a consultar

- `docs/AGENT-OPERATING-PROTOCOL.md`
- `docs/AGENT-OUTPUT-STANDARD.md`
- prompts y manuales de la disciplina específica en `base/masters/`
- casos comparables en `projects/` si existen

## Formato de salida esperado

- fases
- entregables por fase
- dependencias
- riesgos
- siguiente paso operativo

## Errores a evitar

- confundir propuesta con ejecución
- dar cronogramas cerrados sin conocer restricciones
- listar tareas sin estructura

## Definición de terminado

El modo está bien ejecutado cuando el usuario puede usar la salida como base real para organizar trabajo.
