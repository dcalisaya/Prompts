# Prompt para Agente

## Fase 1 · Bloque 1C

Usa este prompt con el agente que va a implementar la biblioteca de recursos del `app`.

```text
Quiero que implementes la **Fase 1 / Bloque 1C** del `app` de este repositorio.

## Objetivo del bloque

Construir la biblioteca de recursos del producto:

- prompts
- agentes
- servicios
- manuales

No quiero que intentes resolver todavía ejecución, búsqueda completa ni formularios. Solo este bloque.

## Contexto del producto

Antes de tocar código, usa estos documentos como fuente de verdad:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-1-BLOQUE-1A.md`
- `docs/FASE-1-BLOQUE-1B.md`
- `docs/FASE-1-BLOQUE-1C.md`

El producto no es un visor de archivos. Es un workspace operativo interno asistido por IA.

## Dependencias de datos

Debes apoyarte principalmente en:

- `base/json/prompts_operativos.json`
- `base/json/agentes_maestros.json`
- `base/json/services.json`
- `base/json/service_matrix.json`
- `base/json/navigation_map.json`
- `base/json/taxonomy.json`

Para manuales, puedes construir una capa razonable usando:

- `source_of_truth`,
- relaciones ya presentes en prompts y flujos,
- o un índice derivado si es necesario.

## Realidad actual que debes respetar

Debes asumir que:

- muchos `related_services` todavía están vacíos,
- no todas las relaciones entre recursos son completas,
- manuales no tienen un JSON tan rico como prompts y agentes.

No inventes relaciones falsas. Si una relación no existe, muestra una interfaz honesta y estable.

## Qué debes construir

### 1. Biblioteca de prompts

Necesito:

- vista de listado,
- ficha de prompt,
- lectura clara de metadata útil,
- preparación visible para un futuro lanzador.

Como mínimo, cada ficha debería mostrar:

- objetivo,
- cuándo usarlo,
- agente asociado,
- `input_type`,
- `deliverable_type`,
- `source_of_truth`,
- salida esperada.

### 2. Biblioteca de agentes

Necesito:

- vista de listado,
- ficha de agente,
- explicación clara de qué aporta ese agente.

Como mínimo, cada ficha debería mostrar:

- rol,
- disciplina,
- descripción,
- filosofía,
- habilidades,
- tareas,
- prompts o recursos relacionados si existen.

### 3. Biblioteca de servicios

Necesito:

- vista de listado,
- ficha de servicio,
- lectura útil para negocio y operación.

Como mínimo, cada ficha debería mostrar:

- `service_code`,
- categoría,
- nombre,
- descripción,
- y recursos relacionados cuando exista relación real.

### 4. Biblioteca de manuales

Necesito:

- listado,
- ficha o detalle básico,
- agrupación útil por familia o disciplina,
- enlace claro al documento fuente.

### 5. Navegación cruzada entre recursos

Donde exista relación real, enlaza:

- prompt -> agente,
- prompt -> manual,
- servicio -> recurso,
- agente -> disciplina o prompt.

Si la relación es incompleta, no la simules.

## Qué no debes hacer

- no implementes lanzador de prompts,
- no implementes formularios,
- no implementes búsqueda global completa,
- no metas sesiones,
- no metas edición de recursos,
- no conviertas este bloque en una capa de ejecución.

## Criterios de calidad

- debe sentirse como una biblioteca de producto real, no como un dump de JSON,
- la metadata debe mejorar la decisión del usuario,
- las fichas deben ser escaneables y útiles,
- la interfaz debe funcionar bien en desktop y móvil,
- y debe dejar el terreno listo para Bloque 1D y Fase 2.

## Entregables esperados

Quiero que entregues:

1. implementación del bloque,
2. archivos creados o modificados,
3. adaptadores o selectores creados,
4. decisiones de modelado,
5. limitaciones de datos encontradas,
6. cómo dejaste preparado el terreno para Bloque 1D,
7. verificación de que corre o compila.

## Instrucción final

Empieza revisando el repo, los documentos de `docs/` y los JSON de `base/json/`. Luego implementa directamente el Bloque 1C.
```
