# Fase 2 · Bloque 2B

## Lanzador de Prompts

## 1. Objetivo del bloque

Implementar la capa que toma un brief ya preparado y lo convierte en una ejecución estructurada lista para correr el prompt correcto con el contexto adecuado.

Este bloque no debe resolver todavía la salida final del sistema. Su foco es:

- selección final del prompt,
- composición de contexto,
- revisión de insumos,
- y preparación de ejecución.

## 2. Resultado esperado

Al cerrar este bloque, el usuario ya debe poder:

- tomar un brief válido,
- revisar qué prompt se va a ejecutar,
- ver el contexto consolidado,
- entender qué fuentes respaldan la tarea,
- y dejar todo listo para pasar a la vista de salida.

En otras palabras:

**el `app` pasa de “preparar un brief” a “preparar una ejecución real”.**

## 3. Lo que sí incluye

### 3.1 Selección y confirmación del prompt

Debe permitir:

- confirmar el prompt elegido,
- cambiarlo si hace falta,
- ver metadata crítica antes de ejecutar,
- y entender por qué ese prompt aplica.

### 3.2 Composición del contexto

Debe consolidar, como mínimo:

- datos del brief,
- metadata del prompt,
- servicios relacionados,
- agente asociado,
- manuales o `source_of_truth` disponibles.

La intención es que el usuario no vea piezas sueltas, sino un paquete de ejecución claro.

### 3.3 Vista previa de ejecución

Debe existir una pantalla, panel o resumen que muestre:

- prompt seleccionado,
- entregable esperado,
- contexto cargado,
- inputs faltantes si los hubiera,
- y siguiente paso de ejecución.

### 3.4 Validación pre-ejecución

Debe validar:

- que exista un prompt válido,
- que el brief tenga contexto mínimo suficiente,
- que no falten campos críticos,
- y que la ejecución no empiece con insumos claramente incompletos.

### 3.5 Preparación del payload o estructura de ejecución

Aunque este bloque no tenga que llamar todavía a un modelo real, sí debe dejar preparada una estructura clara de ejecución.

Como mínimo debería existir una representación consistente de:

- prompt,
- contexto,
- recursos relacionados,
- brief consolidado.

## 4. Lo que no incluye

Este bloque no debe implementar todavía:

- render final de outputs complejos,
- historial persistente,
- guardado definitivo de sesiones,
- colaboración multiusuario,
- ejecución con múltiples pasos encadenados,
- optimización automática o recomendación avanzada.

Tampoco debe bloquearse esperando backend si puede representarse con estado local bien modelado.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- el brief estructurado de Bloque 2A,
- `public/data/prompts_operativos.json`,
- la metadata ya existente del prompt,
- servicios relacionados,
- agente asociado,
- manuales disponibles,
- y las rutas/fichas ya implementadas en Fase 1.

## 6. Preguntas que este bloque debe resolver

El usuario debe poder responder rápidamente:

- ¿qué prompt se va a ejecutar exactamente?
- ¿con qué contexto se va a ejecutar?
- ¿qué manuales o servicios respaldan esta tarea?
- ¿qué falta antes de correrla?
- ¿qué tipo de resultado debería salir de aquí?

## 7. Criterios de UX

- La ejecución debe sentirse controlada, no mágica.
- El usuario debe poder revisar lo que se va a mandar antes de continuar.
- La pantalla debe reducir incertidumbre.
- Los warnings deben ser útiles, no alarmistas.
- Móvil debe poder revisar contexto, aunque la experiencia principal sea desktop.

## 8. Criterios técnicos

- separar composición de contexto de la UI,
- no acoplar el lanzador a un solo prompt,
- reutilizar la estructura de briefs del Bloque 2A,
- preparar contratos claros para Bloque 2C,
- dejar una forma consistente de representar una ejecución.

## 9. Contratos mínimos esperados

La implementación debería apoyarse, como mínimo, en:

- brief estructurado de 2A,
- `agent_core`,
- `related_services`,
- `source_of_truth`,
- `deliverable_type`,
- `expected_output`.

Si faltan relaciones o metadata en algunos prompts, la UI debe mostrarlo sin romperse.

## 10. Entregables concretos

El agente que implemente este bloque debería entregar:

1. una vista o módulo de lanzador,
2. consolidación del brief con metadata del prompt,
3. validación pre-ejecución,
4. contexto compuesto listo para salida,
5. nota breve de decisiones de modelado tomadas,
6. preparación explícita para Bloque 2C.

## 11. Definicion de terminado

El Bloque 2B se considera terminado cuando:

- el usuario puede pasar de brief a ejecución preparada,
- el contexto ya se ve consolidado,
- existen validaciones mínimas antes de ejecutar,
- la estructura de ejecución es clara y reutilizable,
- y el sistema queda listo para que Bloque 2C renderice resultados sin rehacer esta capa.
