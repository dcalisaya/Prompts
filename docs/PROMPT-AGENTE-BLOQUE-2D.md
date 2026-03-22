# Prompt para Agente

## Fase 2 · Bloque 2D

Usa este prompt con el agente que va a implementar los flujos operativos guiados del `app`.

```text
Quiero que implementes la **Fase 2 / Bloque 2D** del `app` de este repositorio.

## Objetivo del bloque

Construir flujos operativos guiados para:

- cotización
- contenido
- desarrollo
- CX/CRM

Este bloque debe cerrar Fase 2 conectando briefs, launcher y salida en recorridos reales por dominio.

## Contexto actual

La Fase 2 debería venir así:

- `2A`: motor de briefs
- `2B`: lanzador de prompts
- `2C`: vistas de salida
- `2D`: rutas guiadas por caso de uso

No quiero otro módulo aislado. Quiero flujos que usen lo ya construido.

## Documentos fuente de verdad

Antes de tocar código, usa estos documentos:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-2-BLOQUE-2A.md`
- `docs/FASE-2-BLOQUE-2B.md`
- `docs/FASE-2-BLOQUE-2C.md`
- `docs/FASE-2-BLOQUE-2D.md`

## Dependencias de datos

Debes apoyarte principalmente en:

- `navigation_map.json`
- `workflow.json` si aporta valor
- prompts, servicios y manuales ya integrados en el app
- briefs, launcher y salidas ya construidos en 2A, 2B y 2C

## Qué debes construir

### 1. Flujos guiados por dominio

Necesito flujos claros para:

- cotización
- contenido
- desarrollo
- CX/CRM

Cada flujo debe orientar al usuario desde la intención hasta una salida usable.

### 2. Secuencia visible de pasos

Cada flujo debe mostrar:

- en qué paso está el usuario,
- qué completó,
- qué falta,
- y cuál es el siguiente movimiento.

### 3. Reutilización de bloques previos

No quiero que reimplementes briefs, launcher o salida.

Quiero que los flujos:

- compongan 2A,
- compongan 2B,
- compongan 2C,
- y agreguen guía contextual.

### 4. Preconfiguración contextual

Cuando el flujo lo justifique, debe poder:

- sugerir prompt,
- sugerir servicios,
- mostrar manuales relevantes,
- y orientar el brief inicial sin que el usuario tenga que empezar de cero.

### 5. Cierre con siguiente paso

Al final del flujo, el usuario debe entender:

- qué logró,
- qué sigue,
- si debe refinar,
- o si puede pasar a una etapa posterior del sistema.

## Qué no debes hacer

- no metas sesiones persistentes completas,
- no metas CRM real,
- no metas colaboración multiusuario,
- no metas quality gates avanzados,
- no conviertas esto en Fase 3.

## Criterios de calidad

- debe sentirse como una ruta de trabajo real,
- no como wizard artificial,
- debe reducir fricción,
- debe reutilizar bien lo ya construido,
- y debe dejar el terreno listo para Fase 3.

## Sugerencia técnica

Quiero una arquitectura limpia.

Eso implica:

- separar definición/configuración de flujos de la UI,
- no meter toda la lógica en una pantalla gigante,
- reutilizar componentes y estados existentes,
- mantener contratos claros entre pasos del flujo.

## Entregables esperados

Quiero que entregues:

1. implementación del bloque,
2. archivos creados o modificados,
3. cómo modelaste los flujos por dominio,
4. cómo reutilizaste 2A, 2B y 2C,
5. qué preconfiguración contextual agregaste,
6. cómo dejaste preparado el terreno para Fase 3,
7. verificación de build.

## Verificación

Al final ejecuta:

- `npm run build`

Si agregas otra verificación útil, inclúyela también.

## Instrucción final

Empieza revisando la implementación actual de `app/web`, el estado de Fase 2 y los documentos de `docs/`. Luego implementa directamente el Bloque 2D sobre la base existente.
```
