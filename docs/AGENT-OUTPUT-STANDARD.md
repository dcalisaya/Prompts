# Agent Output Standard

## Proposito

Este documento define cómo debe verse una salida útil generada por un agente que opera sobre este repo.

## Principio

La respuesta del agente debe ayudar a operar.

No debe sentirse como:

- búsqueda de archivos
- resumen de documentos
- explicación abstracta

Debe sentirse como:

- una respuesta utilizable
- una propuesta preliminar
- un plan
- una revisión
- o una guía clara del siguiente paso

## Estructura base de salida

Toda salida debería intentar incluir:

1. lectura de la solicitud
2. áreas o disciplinas involucradas
3. supuestos
4. información faltante
5. respuesta preliminar
6. siguiente paso

## Formato recomendado

### Bloque 1. Solicitud detectada

Debe resumir la necesidad en una frase o lista corta.

## Bloque 2. Áreas involucradas

Debe nombrar las disciplinas que intervienen.

## Bloque 3. Supuestos

Debe dejar explícito lo que el agente está asumiendo.

## Bloque 4. Información faltante

Debe indicar lo que impide cerrar una respuesta definitiva.

## Bloque 5. Respuesta preliminar

Debe contener el cuerpo útil de la respuesta.

Ejemplos:

- estructura de proforma
- fases de producción
- observaciones de revisión
- checklist de kickoff

## Bloque 6. Siguiente paso

Debe dejar una acción clara.

Ejemplos:

- responder 3 preguntas
- validar alcance
- pasar a revisión
- iniciar kickoff

## Variantes por modo

### Salida para `discover`

Debe incluir:

- lectura de necesidad
- ruta sugerida
- preguntas de calificación

## Salida para `quote`

Debe incluir:

- estructura preliminar de propuesta
- fases incluidas
- entregables base
- exclusiones o vacíos

## Salida para `plan`

Debe incluir:

- fases
- dependencias
- entregables
- riesgos

## Salida para `review`

Debe incluir:

- hallazgos
- riesgos
- mejoras concretas

## Salida para `execute`

Debe incluir:

- kickoff
- checklist
- secuencia de trabajo
- criterios de entrega

## Salida para `upsell`

Debe incluir:

- oportunidad detectada
- ruta de ampliación
- argumento de continuidad

## Regla de profundidad

El agente debe responder con suficiente detalle para ser útil, pero no convertir cada salida en un ensayo.

La salida debe estar dimensionada al caso.

## Regla de claridad

La respuesta debe ser:

- concreta
- ordenada
- fácil de copiar a operación
- útil para tomar decisión

## Regla de supuestos

Si la salida depende de supuestos, eso debe verse.

Nunca debe parecer un alcance cerrado cuando todavía es preliminar.

## Regla de lenguaje

El agente debe usar lenguaje profesional y operativo.

Debe evitar:

- jerga innecesaria
- exceso de explicación técnica
- listas de recursos internos sin contexto

## Regla de soporte en la base

Aunque no siempre lo muestre, la salida debe poder sostenerse con:

- prompts de `base/masters/prompts-operativos/`
- agentes de `base/masters/agents/`
- manuales y reglas de `base/masters/`
- precedentes de `projects/`

## Ejemplo resumido de salida correcta

```text
Solicitud detectada:
- producción de 36 podcasts
- necesidad de propuesta comercial
- componente de pauta para redes

Áreas involucradas:
- comercial
- producción audiovisual
- media

Supuestos:
- se trata de una proforma preliminar
- el servicio principal es podcast A/V

Información faltante:
- formato final
- alcance incluido

Respuesta preliminar:
- preproducción
- producción
- postproducción
- bloque de pauta y distribución

Siguiente paso:
- confirmar formato y alcance para cerrar propuesta base
```

## Definición de salida correcta

Una salida es correcta cuando:

- el usuario entiende lo que el agente detectó
- sabe qué falta
- recibe algo utilizable
- sabe exactamente qué hacer después
