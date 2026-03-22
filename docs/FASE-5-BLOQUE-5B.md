# Fase 5 · Bloque 5B

## Composicion Automatica de Contexto

## 1. Objetivo del bloque

Implementar la primera capa de composicion automatica de contexto del `app` para que el sistema no solo recomiende recursos, sino que prepare un contexto minimo sugerido para ejecutar mejor.

Este bloque debe profundizar Fase 5 resolviendo:

- que recursos conviene juntar,
- que contexto minimo necesita una tarea,
- y como reducir trabajo manual al preparar ejecucion.

## 2. Resultado esperado

Al cerrar este bloque, el usuario ya debe poder:

- recibir un contexto sugerido compuesto por prompt, agente, servicio y manual,
- entender que piezas respaldan una tarea,
- y editar o aceptar una preparacion contextual mas rica que la actual.

En otras palabras:

**el `app` deja de solo sugerir recursos aislados y empieza a componer el contexto minimo de trabajo de forma automatica.**

## 3. Lo que si incluye

### 3.1 Composicion de contexto

Como minimo, el sistema debe poder sugerir combinaciones como:

- prompt + agente
- prompt + servicios
- prompt + manuales
- flujo + recursos relacionados

### 3.2 Contexto minimo sugerido

La composicion debe poder traducirse en:

- recursos vinculados,
- notas o contexto minimo sugerido,
- y ayudas para ejecutar mejor sin partir de cero.

### 3.3 Integracion con ejecucion

La composicion debe integrarse donde tenga impacto real, por ejemplo:

- brief,
- launcher,
- output,
- o revision.

### 3.4 Edicion o aceptacion

El usuario debe poder:

- aceptar el contexto sugerido,
- ajustarlo,
- o ignorarlo cuando no aplique.

## 4. Lo que no incluye

Este bloque no debe implementar todavia:

- orquestacion compleja entre multiples agentes,
- memoria larga externa,
- RAG avanzado,
- backend de contexto,
- asistentes conversacionales completos.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- metadata de prompts, agentes, servicios y manuales,
- flujos operativos,
- sesiones y trazabilidad,
- y reglas contextuales de 5A.

## 6. Preguntas que este bloque debe resolver

El usuario debe poder responder rapidamente:

- ¿con que contexto deberia ejecutar esto?
- ¿que recursos conviene incluir?
- ¿que me sugiere el sistema como respaldo minimo?

## 7. Criterios de UX

- El contexto sugerido debe ahorrar trabajo.
- Debe ser editable.
- Debe verse como ayuda, no como caja negra.

## 8. Criterios tecnicos

- separar composicion de contexto de la UI,
- reutilizar contratos existentes antes de crear nuevos modelos pesados,
- mantener reglas transparentes y extensibles,
- y dejar el terreno listo para asistencia de salida en 5C.

## 9. Contratos minimos esperados

La implementacion deberia apoyarse, como minimo, en:

- una estructura de contexto sugerido,
- reglas de composicion,
- integracion con brief o launcher,
- y mecanismos para aceptar o ajustar contexto.

## 10. Entregables concretos

El agente que implemente este bloque deberia entregar:

1. capa base de composicion automatica de contexto,
2. integracion con ejecucion o preparacion de trabajo,
3. UI para aceptar o ajustar contexto sugerido,
4. nota breve de decisiones de modelado tomadas.

## 11. Definicion de terminado

El Bloque 5B se considera terminado cuando:

- el sistema ya puede preparar un contexto minimo sugerido,
- el usuario lo puede aprovechar sin perder control,
- y la base queda lista para asistencia de salida en 5C.
