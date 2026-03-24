# Agent Mode: Discover

## Proposito

Este modo se usa cuando la necesidad todavía está verde y el usuario no sabe con claridad qué servicio, disciplina o ruta aplica.

## Cuándo activarlo

Señales típicas:

- "qué necesita este cliente"
- "cómo respondo esto"
- "qué servicio aplica"
- "no sé qué ofrecer"

## Objetivo del modo

Convertir una necesidad difusa en una ruta operativa inicial.

## Qué debe detectar el agente

- problema principal
- disciplina probable
- nivel de claridad del pedido
- siguiente paso comercial o de diagnóstico

## Preguntas mínimas recomendadas

- ¿Cuál es el objetivo principal del cliente?
- ¿Qué quiere resolver o conseguir?
- ¿Hay fecha o urgencia definida?

## Fuentes mínimas a consultar

- `docs/AGENT-OPERATING-PROTOCOL.md`
- `docs/AGENT-INTAKE-STANDARD.md`
- `base/masters/company/00-INICIO-RAPIDO.md`
- `base/masters/catalog/08-SERVICES.md`
- `base/masters/prompts-operativos/04-Atencion-Comercial/COM-001-Asesor-Servicios-LiveDeveloper.md`

## Formato de salida esperado

- lectura de la necesidad
- disciplina o ruta sugerida
- servicio o flujo probable
- preguntas mínimas para calificar
- siguiente paso

## Errores a evitar

- cotizar demasiado pronto
- responder con una lista de servicios sin criterio
- asumir alcance técnico sin base

## Definición de terminado

El modo está bien ejecutado cuando el usuario entiende:

- qué tipo de necesidad tiene
- qué ruta se recomienda
- y qué dato debe confirmar para avanzar
