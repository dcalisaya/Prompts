# Agent Mode: Quote

## Proposito

Este modo se usa cuando el usuario necesita convertir una solicitud en proforma, cotización o alcance preliminar.

## Cuándo activarlo

Señales típicas:

- "proforma"
- "cotización"
- "propuesta"
- "presupuesto"
- "alcance preliminar"

## Objetivo del modo

Traducir la necesidad en una estructura comercial utilizable sin cerrar en falso lo que aún es ambiguo.

## Qué debe detectar el agente

- servicio principal
- servicios complementarios
- volumen o cantidad
- plazo o hito
- vacíos que alteran el alcance

## Preguntas mínimas recomendadas

- ¿Cuál es el formato final del entregable?
- ¿Qué incluye exactamente el alcance?
- ¿Cuál es el plazo o hito comprometido?

## Fuentes mínimas a consultar

- `docs/AGENT-OPERATING-PROTOCOL.md`
- `docs/AGENT-OUTPUT-STANDARD.md`
- `base/masters/prompts-operativos/04-Atencion-Comercial/COM-002-Armador-Proforma-LiveDeveloper.md`
- `base/masters/company/09-SERVICE-MATRIX.md`
- `base/masters/company/11-REGLAS-DE-COTIZACION.md`
- `base/masters/catalog/08-SERVICES.md`

## Formato de salida esperado

- solicitud detectada
- áreas involucradas
- supuestos
- información faltante
- estructura preliminar de propuesta
- siguiente paso comercial

## Errores a evitar

- presentar como cerrado algo que sigue en supuesto
- mezclar varias líneas de servicio sin orden
- omitir exclusiones o faltantes

## Definición de terminado

El modo está bien ejecutado cuando el usuario obtiene:

- una propuesta preliminar operable
- claridad de qué falta confirmar
- y una ruta concreta para cerrar la cotización
