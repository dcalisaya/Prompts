# Fase 2 · Bloque 2A

## Motor de Briefs

## 1. Objetivo del bloque

Implementar la primera capa operativa del `app` para que el usuario no solo descubra recursos, sino que pueda iniciar una tarea con inputs estructurados.

Este bloque debe convertir el conocimiento explorado en Fase 1 en una experiencia accionable:

- seleccionar un prompt o tipo de tarea,
- capturar contexto mínimo,
- validar campos necesarios,
- y dejar un brief listo para pasar al siguiente bloque.

## 2. Resultado esperado

Al cerrar este bloque, el usuario ya debe poder:

- iniciar un nuevo brief,
- ver formularios guiados por `input_type`,
- completar datos mínimos con validación,
- y terminar con una estructura clara lista para ejecución.

En otras palabras:

**el `app` deja de ser solo un knowledge hub y pasa a ser un workspace operativo inicial.**

## 3. Lo que sí incluye

### 3.1 Entrada desde biblioteca de prompts

Debe permitir arrancar un brief desde:

- ficha de prompt,
- listado de prompts,
- o una ruta dedicada de creación si la implementación lo necesita.

La intención es que el usuario pueda pasar de “este prompt me sirve” a “voy a preparar el contexto para usarlo”.

### 3.2 Formulario base de brief

Debe incluir, como mínimo:

- identificación del prompt o tipo de tarea,
- campo principal según `input_type`,
- contexto adicional,
- metadatos útiles para trabajo posterior,
- y validación de campos obligatorios.

### 3.3 Plantillas por `input_type`

Este bloque debe interpretar `input_type` de forma práctica.

Como mínimo, debe contemplar patrones como:

- texto libre,
- brief estructurado,
- URL,
- lista de requerimientos,
- referencia de servicio,
- combinación simple de campos.

No hace falta cubrir todos los edge cases del sistema, pero sí dejar una base extensible.

### 3.4 Validación inicial

Debe validar:

- campos requeridos,
- inputs vacíos,
- formatos razonables cuando aplique,
- y preparación mínima antes de continuar.

### 3.5 Resumen del brief

Debe existir una vista o sección de resumen que permita confirmar:

- qué prompt se va a usar,
- qué contexto se capturó,
- qué falta,
- y cuál sería el siguiente paso natural.

## 4. Lo que no incluye

Este bloque no debe implementar todavía:

- ejecución real del prompt,
- integración conversacional,
- guardado persistente de sesiones,
- outputs finales,
- historial completo,
- workflows multi-step complejos,
- permisos o colaboración multiusuario.

Tampoco debe bloquearse esperando backend nuevo si puede resolverse bien en frontend con estado local.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- `public/data/prompts_operativos.json`
- la biblioteca y fichas ya implementadas en Fase 1
- la metadata de prompts, especialmente:
  - `input_type`
  - `input_required`
  - `deliverable_type`
  - `expected_output`
  - `related_services`
  - `source_of_truth`

Si hace falta una capa de plantillas o adaptadores en frontend, puede crearse dentro de `app/web`.

## 6. Preguntas que este bloque debe resolver

El usuario debe poder responder rápidamente:

- ¿cómo empiezo una tarea real desde un prompt?
- ¿qué información necesito reunir?
- ¿qué campos son obligatorios?
- ¿qué tipo de entregable estoy preparando?
- ¿qué tan listo está mi brief para pasar al siguiente paso?

## 7. Criterios de UX

- El formulario debe orientar, no intimidar.
- Debe sentirse como “preparar trabajo”, no como llenar burocracia.
- El usuario debe entender por qué se pide cada dato.
- Los errores deben ser claros y accionables.
- Móvil debe seguir siendo usable para captura básica.

## 8. Criterios técnicos

- separar plantillas de brief de componentes visuales,
- no hardcodear lógica por prompt si puede agruparse por `input_type`,
- permitir agregar nuevos tipos sin rehacer toda la UI,
- preparar el terreno para Bloque 2B y 2C,
- mantener compatibilidad con rutas y fichas ya existentes.

## 9. Contratos mínimos esperados

La implementación debería apoyarse, como mínimo, en:

- `input_type` para definir la forma principal del formulario,
- `input_required` para mostrar y validar requerimientos,
- `deliverable_type` para orientar el resultado esperado,
- `expected_output` para explicar qué se está preparando,
- `source_of_truth` para conectar contexto técnico cuando exista.

Si un prompt tiene metadata incompleta, la UI debe degradar con dignidad y no romperse.

## 10. Entregables concretos

El agente que implemente este bloque debería entregar:

1. una ruta o módulo de nuevo brief,
2. formularios base por `input_type`,
3. validación inicial de campos,
4. integración desde fichas de prompt,
5. resumen del brief antes de continuar,
6. nota breve de decisiones de modelado tomadas.

## 11. Definicion de terminado

El Bloque 2A se considera terminado cuando:

- el usuario puede iniciar un brief desde el `app`,
- la captura de inputs ya es guiada por metadata real,
- existen validaciones mínimas razonables,
- el brief queda estructurado y visible,
- y el terreno queda listo para Bloque 2B sin rehacer la arquitectura.
