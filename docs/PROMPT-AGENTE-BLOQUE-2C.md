# Prompt para Agente

## Fase 2 · Bloque 2C

Usa este prompt con el agente que va a implementar las vistas de salida del `app`.

```text
Quiero que implementes la **Fase 2 / Bloque 2C** del `app` de este repositorio.

## Objetivo del bloque

Construir la capa que toma una ejecución ya preparada y la convierte en una salida legible y usable:

- resultados por tipo de entregable
- estructura legible
- recursos relacionados

No quiero todavía historial persistente, calidad avanzada, handoff ni sesiones completas. Solo este bloque.

## Contexto actual

La Fase 1 ya existe en `app/web`, y Fase 2 debería venir así:

- `2A`: briefs estructurados
- `2B`: ejecución preparada
- `2C`: visualización de resultados

Este bloque debe tomar la salida preparada por 2B y convertirla en una experiencia usable para trabajo real.

## Documentos fuente de verdad

Antes de tocar código, usa estos documentos:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-2-BLOQUE-2B.md`
- `docs/FASE-2-BLOQUE-2C.md`

Si necesitas contexto adicional:

- `docs/FASE-1-BLOQUE-1C.md`
- `docs/FASE-1-BLOQUE-1D.md`

## Dependencias de datos

Debes apoyarte principalmente en:

- la estructura de ejecución generada en 2B,
- `deliverable_type`,
- `expected_output`,
- metadata del prompt,
- brief consolidado,
- recursos relacionados disponibles.

## Qué debes construir

### 1. Vista base de salida

Necesito una pantalla o módulo donde el usuario pueda ver:

- resultado principal,
- prompt usado,
- brief de origen,
- tipo de entregable,
- recursos relacionados.

### 2. Render por `deliverable_type`

No quiero una sola caja de texto para todo.

Necesito una base razonable de presentación según `deliverable_type`, por ejemplo:

- texto largo,
- checklist,
- plan estructurado,
- lista,
- brief enriquecido,
- resumen ejecutivo,
- esquema por bloques.

No hace falta perfección absoluta, pero sí una arquitectura extensible.

### 3. Contexto visible

La salida debe dejar claro:

- qué originó ese resultado,
- qué tipo de entregable representa,
- qué recursos lo respaldan,
- y qué paso sigue.

### 4. Siguiente paso sugerido

La pantalla debe orientar al usuario:

- volver a brief,
- ajustar ejecución,
- revisar manuales,
- o continuar a un flujo posterior.

## Qué no debes hacer

- no implementes historial persistente,
- no metas sesiones completas,
- no metas checklist de calidad avanzada,
- no metas handoff entre áreas,
- no conviertas esto en 2D.

## Criterios de calidad

- la salida debe ser escaneable,
- debe sentirse útil para trabajo real,
- no debe parecer dump de texto,
- debe reutilizar la base de 2A y 2B,
- y debe dejar el terreno listo para 2D y Fase 3.

## Sugerencia técnica

Quiero una arquitectura limpia.

Eso implica:

- separar renderers por `deliverable_type`,
- no meter toda la lógica en un único componente gigante,
- mantener contratos claros entre ejecución y salida,
- reutilizar patrones de estado/error existentes en `app/web`.

## Entregables esperados

Quiero que entregues:

1. implementación del bloque,
2. archivos creados o modificados,
3. cómo resolviste el render por `deliverable_type`,
4. cómo conectaste la vista con la ejecución preparada,
5. qué información contextual muestra la salida,
6. cómo dejaste preparado el terreno para 2D,
7. verificación de build.

## Verificación

Al final ejecuta:

- `npm run build`

Si agregas otra verificación útil, inclúyela también.

## Instrucción final

Empieza revisando la implementación actual de `app/web`, el estado de 2B y los documentos de `docs/`. Luego implementa directamente el Bloque 2C sobre la base existente.
```
