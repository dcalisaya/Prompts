# Prompt para Agente

## Fase 1 · Bloque 1D

Usa este prompt con el agente que va a implementar la búsqueda inicial del `app`.

```text
Quiero que implementes la **Fase 1 / Bloque 1D** del `app` de este repositorio.

## Objetivo del bloque

Construir la búsqueda inicial del producto:

- búsqueda por texto
- filtros básicos por metadata
- resultados por tipo de recurso

No quiero búsqueda semántica, ni IA conversacional, ni backend complejo. Solo este bloque.

## Contexto del producto

Antes de tocar código, usa estos documentos como fuente de verdad:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-1-BLOQUE-1A.md`
- `docs/FASE-1-BLOQUE-1B.md`
- `docs/FASE-1-BLOQUE-1C.md`
- `docs/FASE-1-BLOQUE-1D.md`

El producto no es un visor de archivos. Es un workspace operativo interno asistido por IA.

## Dependencias de datos

Debes apoyarte principalmente en:

- `base/json/prompts_operativos.json`
- `base/json/agentes_maestros.json`
- `base/json/services.json`
- `base/json/service_matrix.json`
- la capa o adaptadores de manuales que ya existan desde Bloque 1C

## Realidad actual que debes respetar

Debes asumir que:

- `services.json` no trae `service_code`,
- parte de la metadata es más rica en prompts y agentes que en otros recursos,
- manuales tienen estructura más limitada,
- y no conviene inventar inteligencia falsa.

Si necesitas combinar `services.json` con `service_matrix.json`, hazlo en una capa de composición clara.

## Qué debes construir

### 1. Vista de búsqueda global

Necesito:

- una ruta de búsqueda útil,
- caja de búsqueda visible,
- estado vacío,
- resultados claros,
- y mensajes razonables cuando no haya coincidencias.

### 2. Resultados por tipo de recurso

Necesito resultados, como mínimo, para:

- prompts,
- agentes,
- servicios,
- manuales.

El usuario debe poder entender rápido qué tipo de recurso está viendo y abrir su ficha correspondiente.

### 3. Matching textual inicial

La búsqueda debe cubrir, como mínimo:

- nombre,
- descripción,
- disciplina,
- categoría,
- tags,
- stage,
- y `service_code` cuando aplique.

No quiero búsqueda semántica todavía. Quiero una primera capa sólida y honesta.

### 4. Filtros básicos

Necesito filtros razonables por:

- tipo de recurso,
- disciplina,
- etapa si aplica,
- categoría o familia si aplica.

No hardcodees opciones si pueden derivarse desde la data.

## Qué no debes hacer

- no implementes búsqueda semántica,
- no metas modelos,
- no metas autocompletado complejo,
- no metas historial de consultas,
- no metas sesiones,
- no conviertas esto en un motor de recomendación.

## Criterios de calidad

- buscar debe sentirse útil desde el primer uso,
- los resultados deben ser escaneables,
- la búsqueda debe integrarse con las fichas del Bloque 1C,
- la implementación debe ser clara y mantenible,
- y debe dejar el terreno listo para recomendaciones futuras en Fase 5.

## Entregables esperados

Quiero que entregues:

1. implementación del bloque,
2. archivos creados o modificados,
3. estrategia de indexación o matching usada,
4. decisiones principales,
5. limitaciones conocidas,
6. verificación de que corre o compila.

## Instrucción final

Empieza revisando el repo, los documentos de `docs/` y los JSON en `base/json/`. Luego implementa directamente el Bloque 1D.
```
