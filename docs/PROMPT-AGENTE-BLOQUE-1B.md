# Prompt para Agente

## Fase 1 · Bloque 1B

Usa este prompt con el agente que va a implementar la exploración por rol y disciplina del `app`.

```text
Quiero que implementes la **Fase 1 / Bloque 1B** del `app` de este repositorio.

## Objetivo del bloque

Construir la primera capa real de exploración del producto:

- listado de roles
- detalle de rol
- listado de disciplinas
- detalle de disciplina

No quiero que intentes resolver toda la Fase 1. Solo este bloque.

## Contexto del producto

Antes de tocar código, usa estos documentos como fuente de verdad:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-1-BLOQUE-1A.md`
- `docs/FASE-1-BLOQUE-1B.md`

El producto no es un visor de archivos. Es un workspace operativo interno asistido por IA.

## Dependencias de datos

Debes apoyarte principalmente en:

- `base/json/roles_map.json`
- `base/json/navigation_map.json`
- `base/json/taxonomy.json`

No hardcodees roles o disciplinas si ya están en los JSON.

## Qué debes construir

### 1. Exploración por rol

Necesito:

- una vista de listado de roles,
- una vista de detalle por rol,
- navegación clara entre ambas.

Cada rol debería mostrar, como mínimo:

- nombre,
- disciplina,
- descripción,
- outcomes,
- documentos o recursos asociados.

### 2. Exploración por disciplina

Necesito:

- una vista de listado de disciplinas,
- una vista de detalle por disciplina,
- agrupación consistente de roles por disciplina.

Cada disciplina debería mostrar, como mínimo:

- nombre,
- roles asociados,
- recursos relacionados inferidos desde los datos actuales,
- estructura preparada para crecer hacia fichas completas en Bloque 1C.

### 3. Integración con el shell existente

Este bloque debe reutilizar el layout y navegación del Bloque 1A.

No quiero duplicación innecesaria de layout ni rutas improvisadas.

### 4. Adaptadores o selectores de datos

Si el formato crudo de los JSON no es cómodo para la UI, crea una capa simple de adaptación.

La lógica de agrupación por disciplina no debe quedar repartida en componentes visuales.

## Qué no debes hacer

- no implementes todavía fichas completas de prompts, agentes, manuales o servicios,
- no implementes búsqueda,
- no implementes lanzador de prompts,
- no metas persistencia o sesiones,
- no conviertas este bloque en una biblioteca completa.

Si necesitas placeholders de recursos, que sean dignos y coherentes.

## Criterios de calidad

- debe sentirse como producto real, no como lista técnica de JSON,
- la exploración debe ser clara para personas no técnicas,
- la agrupación por disciplina debe tener sentido visual y funcional,
- debe funcionar bien en desktop y móvil,
- y debe dejar el terreno listo para Bloque 1C.

## Entregables esperados

Quiero que entregues:

1. implementación del bloque,
2. archivos creados o modificados,
3. decisiones principales de modelado,
4. cómo dejaste preparado el terreno para Bloque 1C,
5. verificación de que corre o compila.

## Instrucción final

Empieza revisando el repo, los documentos de `docs/` y los JSON en `base/json/`. Luego implementa directamente el Bloque 1B.
```
