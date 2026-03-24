# Agent Intake Standard

## Proposito

Este documento fija el estándar mínimo para que cualquier agente procese una solicitud de entrada de forma consistente.

## Unidad de entrada

La unidad de entrada no es el prompt.

La unidad de entrada es la solicitud del usuario o del cliente.

Ejemplos:

- pedido de proforma
- mensaje reenviado por WhatsApp
- brief incompleto
- solicitud de revisión
- proyecto aprobado que pasa a ejecución

## Objetivo del intake

El intake debe responder cinco preguntas:

1. qué quiere lograr el usuario
2. en qué etapa está el caso
3. qué disciplina o disciplinas participan
4. qué información falta
5. cuál es el siguiente paso correcto

## Flujo de intake

### 1. Captura de solicitud

El agente recibe la solicitud tal como llega.

No debe exigir estructura perfecta de entrada.

## 2. Lectura inicial

El agente debe detectar:

- necesidad principal
- entregables aparentes
- urgencia o fecha
- tono del pedido
- si la solicitud es consulta, cotización, ejecución o revisión

## 3. Clasificación de modo

Debe mapear la solicitud a uno de estos modos:

- `discover`
- `quote`
- `plan`
- `review`
- `execute`
- `upsell`

Puede haber modos secundarios, pero siempre debe haber uno principal.

## 4. Clasificación de disciplina

Debe identificar una o varias disciplinas.

Ejemplos frecuentes:

- comercial / cotización
- producción audiovisual
- contenido / podcast / copy
- media / performance
- desarrollo
- CRM / retención
- data / analytics
- PR

## 5. Detección de vacíos

Antes de responder en firme, el agente debe revisar si faltan datos críticos.

Lista mínima:

- formato del entregable
- cantidad
- plazo
- alcance
- canal o medio
- estado del proyecto

## 6. Preguntas mínimas

Si hay ambigüedad, el agente debe preguntar solo lo indispensable.

Regla:

- máximo 2 a 4 preguntas en la primera ronda
- primero preguntar lo que más cambia el alcance

## 7. Respuesta preliminar

Aun cuando falte información, el agente debería dejar:

- una lectura de la solicitud
- supuestos explícitos
- una estructura preliminar
- el siguiente paso

## Criterios por tipo de solicitud

### Solicitud tipo `quote`

Ejemplos:

- proforma
- cotización
- propuesta
- presupuesto

El intake debe detectar:

- servicio principal
- servicios complementarios
- vacíos antes de cotizar

## Solicitud tipo `plan`

Ejemplos:

- cronograma
- plan de producción
- estructura de temporada

El intake debe detectar:

- fases
- dependencias
- responsables o áreas

## Solicitud tipo `review`

Ejemplos:

- revisa esta propuesta
- valida este plan

El intake debe detectar:

- objeto a revisar
- criterio de evaluación
- riesgo de envío o entrega

## Solicitud tipo `execute`

Ejemplos:

- ya aprobaron
- ahora necesito organizar
- pasa a operación

El intake debe detectar:

- estado aprobado
- recursos ya definidos
- qué falta para kickoff

## Preguntas modelo

### Para podcast

- ¿Será audio, video o video podcast?
- ¿La propuesta cubre solo grabación o producción integral?
- ¿La distribución será orgánica, pagada o ambas?

## Para video animado

- ¿Será 2D, 3D o realista con IA?
- ¿Incluye guion y locución o solo animación?
- ¿Cuál es el plazo real de entrega o aprobación?

## Para campañas integrales

- ¿Cuál es el objetivo principal?
- ¿Cuál es el producto o servicio?
- ¿Qué canal es prioritario?
- ¿Cuál es la fecha objetivo de salida?

## Errores que el agente debe evitar

- empezar citando archivos en vez de entender la necesidad
- responder con demasiada teoría
- asumir alcance completo sin confirmar
- hacer preguntas irrelevantes demasiado pronto
- derivar al usuario a varios recursos sin consolidar

## Definición de intake correcto

El intake es correcto cuando:

- el modo principal quedó claro
- la disciplina quedó clara
- la ambigüedad quedó detectada
- las preguntas son suficientes pero no excesivas
- el usuario entiende cuál es el siguiente paso
