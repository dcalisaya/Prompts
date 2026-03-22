# Prompt para Agente

## Fase 1 · Bloque 1A

Usa este prompt con el agente que va a implementar el primer bloque real del `app`.

```text
Quiero que implementes la **Fase 1 / Bloque 1A** del `app` de este repositorio.

## Objetivo del bloque

Construir la base navegable del producto:

- shell del app
- navegación principal
- home
- rutas principales

No quiero que intentes implementar toda la Fase 1. Solo este bloque.

## Contexto del producto

Antes de tocar código, usa estos documentos como fuente de verdad:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-1-BLOQUE-1A.md`

El producto no es un visor de archivos. Es un workspace operativo interno asistido por IA.

## Qué debes construir

### 1. Shell base

Necesito una estructura de app con:

- layout principal,
- navegación persistente,
- área principal de contenido,
- base responsiva para desktop y móvil.

### 2. Home

La pantalla inicial debe ayudar a entrar por:

- rol,
- disciplina,
- flujo,
- búsqueda.

No debe ser un dashboard vacío ni un landing genérico.

### 3. Rutas principales

Quiero rutas base para:

- `/`
- `/roles`
- `/disciplinas`
- `/flujos`
- `/prompts`
- `/agentes`
- `/servicios`
- `/manuales`
- `/buscar`

Si algunas rutas todavía no tienen contenido real, usa placeholders dignos y coherentes.

### 4. Navegación principal

Debe quedar clara y extensible.

No quiero una navegación acoplada a una sola vista.

## Qué no debes hacer

- no implementes todavía búsqueda real,
- no implementes fichas completas de recursos,
- no intentes resolver formularios ni outputs,
- no metas estado complejo,
- no conviertas este bloque en un rediseño total del producto.

## Dependencias útiles

Puedes usar como base estructural:

- `base/json/navigation_map.json`
- `base/json/roles_map.json`
- `base/json/taxonomy.json`

Si no existe aún un frontend claro en el repo, propón e implementa una base mínima razonable dentro de `app/`.

## Criterios de calidad

- el layout debe ser limpio y escalable,
- la home debe orientar,
- la navegación debe sentirse producto real,
- debe funcionar bien en desktop y móvil,
- y el código debe dejar el camino listo para Bloque 1B.

## Entregables esperados

Quiero que entregues:

1. implementación del bloque,
2. archivos creados o modificados,
3. decisiones principales,
4. cómo dejaste preparado el terreno para Bloque 1B,
5. verificación de que corre o compila.

## Instrucción final

Empieza revisando el repo y los documentos de `docs/`. Luego implementa directamente el Bloque 1A.
```
