# Agent Mode: Execute

## Proposito

Este modo se usa cuando el caso ya fue aprobado y debe pasar a ejecución o coordinación real.

## Cuándo activarlo

Señales típicas:

- "ya aprobaron"
- "pasar a operación"
- "organizar grabación"
- "kickoff"
- "entregables"

## Objetivo del modo

Bajar un caso aprobado a secuencia operativa clara.

## Qué debe detectar el agente

- qué ya está aprobado
- qué sigue faltando para iniciar
- áreas responsables
- entregables, hitos y criterios de entrega

## Preguntas mínimas recomendadas

- ¿Qué alcance ya quedó validado?
- ¿Qué recursos o activos ya están disponibles?
- ¿Cuál es el primer hito operativo?

## Fuentes mínimas a consultar

- `docs/AGENT-OPERATING-PROTOCOL.md`
- `base/json/workflow.json`
- `base/masters/company/13-FLUJO-COMERCIAL-Y-OPERATIVO.md`
- manuales o prompts del área responsable
- `projects/` si existe un caso similar

## Formato de salida esperado

- kickoff
- checklist inicial
- secuencia de trabajo
- entregables
- criterios de entrega

## Errores a evitar

- seguir preguntando como si todavía fuera discovery
- pasar a ejecución sin definir hito inicial
- confundir responsables con disciplinas abstractas

## Definición de terminado

El modo está bien ejecutado cuando la salida sirve como base real de arranque operativo.
