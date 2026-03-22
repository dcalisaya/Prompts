# Prompt para Agente

## Fase 2 · Bloque 2B

Usa este prompt con el agente que va a implementar el lanzador de prompts del `app`.

```text
Quiero que implementes la **Fase 2 / Bloque 2B** del `app` de este repositorio.

## Objetivo del bloque

Construir la capa que toma un brief ya preparado y lo convierte en una ejecución estructurada lista para correr:

- selección del prompt
- carga de contexto
- preparación de ejecución

No quiero outputs finales todavía. No quiero historial persistente. Solo este bloque.

## Contexto actual

La Fase 1 ya existe en `app/web`, y el Bloque 2A está trabajando o ya resuelve:

- inicio de brief,
- formularios por `input_type`,
- validación mínima,
- resumen del brief.

Ahora el producto debe pasar de “brief listo” a “ejecución preparada”.

## Documentos fuente de verdad

Antes de tocar código, usa estos documentos:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-2-BLOQUE-2A.md`
- `docs/FASE-2-BLOQUE-2B.md`

Si necesitas contexto de la fase anterior:

- `docs/FASE-1-BLOQUE-1C.md`
- `docs/FASE-1-BLOQUE-1D.md`

## Dependencias de datos

Debes apoyarte principalmente en:

- el estado o estructura de brief generada en 2A,
- `public/data/prompts_operativos.json`,
- servicios relacionados,
- agente asociado,
- manuales disponibles,
- capa de datos ya existente en `src/services/`.

Presta atención especial a:

- `agent_core`
- `related_services`
- `source_of_truth`
- `deliverable_type`
- `expected_output`

## Qué debes construir

### 1. Vista de lanzador

Necesito una pantalla o módulo donde el usuario pueda:

- revisar el brief,
- confirmar el prompt,
- ver el contexto consolidado,
- y continuar a la siguiente etapa.

### 2. Composición de contexto

Necesito que el sistema junte de forma útil:

- datos del brief,
- metadata del prompt,
- servicios relacionados,
- agente asociado,
- manuales o fuentes de verdad.

No quiero piezas sueltas. Quiero una estructura clara de ejecución.

### 3. Validación pre-ejecución

Debe validar, como mínimo:

- prompt válido,
- contexto mínimo suficiente,
- campos críticos completos,
- advertencias si falta algo importante.

### 4. Representación estructurada de ejecución

Aunque este bloque no tenga que llamar todavía al modelo o motor real, sí debe dejar preparada una estructura consistente de ejecución.

El usuario debe poder entender:

- qué se va a ejecutar,
- con qué datos,
- y qué tipo de salida espera.

## Qué no debes hacer

- no implementes la salida final del sistema,
- no metas historial persistente,
- no metas sesiones completas,
- no metas automatización compleja,
- no conviertas esto en Bloque 2C.

## Criterios de calidad

- debe sentirse como una preparación seria de ejecución,
- no como un formulario decorado,
- debe reutilizar bien el trabajo de 2A,
- debe mostrar contexto consolidado con claridad,
- y debe dejar el terreno listo para 2C.

## Sugerencia técnica

Quiero que mantengas una arquitectura limpia.

Eso implica:

- separar composición de contexto de componentes visuales,
- evitar lógica caótica por prompt individual,
- dejar contratos claros entre brief y ejecución,
- seguir los patrones de estado/error ya existentes en `app/web`.

## Entregables esperados

Quiero que entregues:

1. implementación del bloque,
2. archivos creados o modificados,
3. cómo modelaste la estructura de ejecución,
4. cómo consolidaste el contexto,
5. qué validaciones pre-ejecución agregaste,
6. cómo dejaste preparado el terreno para Bloque 2C,
7. verificación de build.

## Verificación

Al final ejecuta:

- `npm run build`

Si agregas otra verificación útil, inclúyela también.

## Instrucción final

Empieza revisando la implementación actual de `app/web`, el estado de 2A y los documentos de `docs/`. Luego implementa directamente el Bloque 2B sobre la base existente.
```
