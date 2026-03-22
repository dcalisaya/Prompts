# Prompt para Agente

## Fase 2 · Bloque 2A

Usa este prompt con el agente que va a implementar el motor de briefs del `app`.

```text
Quiero que implementes la **Fase 2 / Bloque 2A** del `app` de este repositorio.

## Objetivo del bloque

Construir la primera capa operativa del producto:

- formularios base de brief
- validación de campos
- plantillas por tipo de tarea o `input_type`

No quiero que intentes resolver todavía ejecución real, outputs finales, sesiones persistentes ni backend nuevo. Solo este bloque.

## Contexto actual

La Fase 1 ya existe en `app/web`:

- shell y navegación
- exploración por rol y disciplina
- biblioteca de prompts, agentes, servicios y manuales
- búsqueda global inicial

Ahora el producto debe pasar de descubrimiento a preparación de trabajo.

## Documentos fuente de verdad

Antes de tocar código, usa estos documentos:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-2-BLOQUE-2A.md`

Si necesitas contexto adicional de la fase anterior, puedes revisar:

- `docs/FASE-1-BLOQUE-1C.md`
- `docs/FASE-1-BLOQUE-1D.md`

## Dependencias de datos

Debes apoyarte principalmente en:

- `public/data/prompts_operativos.json`
- la capa de datos ya existente en `src/services/`
- las fichas de prompts ya implementadas en la biblioteca

Presta atención especial a estos campos:

- `input_type`
- `input_required`
- `deliverable_type`
- `expected_output`
- `related_services`
- `source_of_truth`

## Qué debes construir

### 1. Entrada a nuevo brief

Necesito una forma clara de iniciar un brief desde el app.

Puede ser:

- una nueva ruta dedicada,
- una acción desde la ficha de prompt,
- o ambas si lo ves razonable.

Pero debe sentirse integrada al producto actual.

### 2. Formulario base

Necesito formularios guiados que permitan preparar el contexto mínimo de trabajo.

Como mínimo, el brief debe capturar:

- prompt seleccionado,
- input principal,
- contexto adicional,
- notas o restricciones relevantes,
- y cualquier campo que el `input_type` vuelva necesario.

### 3. Plantillas por `input_type`

No quiero un único textarea genérico para todo.

Necesito una base razonable por patrones de `input_type`, por ejemplo:

- texto libre,
- brief estructurado,
- URL,
- lista de requerimientos,
- referencia de servicio,
- combinaciones simples.

No hace falta resolver todos los casos perfectos, pero sí una base extensible.

### 4. Validación

Debe validar, como mínimo:

- campos obligatorios,
- campos vacíos,
- formato razonable cuando aplique,
- y preparación mínima antes de continuar.

### 5. Resumen del brief

Antes de terminar el bloque, el usuario debe poder ver:

- qué prompt eligió,
- qué entregable espera,
- qué contexto cargó,
- y cuál sería el siguiente paso.

## Qué no debes hacer

- no implementes ejecución real del prompt,
- no metas IA conversacional,
- no metas guardado persistente,
- no metas historial,
- no metas outputs finales,
- no conviertas este bloque en Bloque 2B o 2C.

## Criterios de calidad

- debe sentirse como preparación de trabajo real,
- no como una demo ni un formulario burocrático,
- debe reutilizar la base actual de `app/web`,
- la lógica debe apoyarse en metadata real de prompts,
- y la arquitectura debe quedar lista para Bloque 2B.

## Sugerencia técnica

Quiero que mantengas la base limpia.

Eso implica:

- separar configuración/plantillas de brief de la UI,
- no hardcodear demasiada lógica por prompt individual,
- reutilizar componentes donde tenga sentido,
- mantener estados de loading/error coherentes con lo ya existente.

## Entregables esperados

Quiero que entregues:

1. implementación del bloque,
2. archivos creados o modificados,
3. cómo resolviste las plantillas por `input_type`,
4. cómo integraste la entrada desde la biblioteca de prompts,
5. qué validaciones mínimas implementaste,
6. cómo dejaste preparado el terreno para Bloque 2B,
7. verificación de build.

## Verificación

Al final ejecuta:

- `npm run build`

Si agregas otra verificación útil, inclúyela también.

## Instrucción final

Empieza revisando la implementación actual de `app/web`, luego los documentos de `docs/`, y después implementa directamente el Bloque 2A sobre la base existente.
```
