Quiero que implementes la **Fase 5 / Bloque 5B** del `app` de este repositorio.

## Objetivo del bloque

Construir la primera capa de composicion automatica de contexto para que el sistema no solo recomiende recursos, sino que prepare un contexto minimo sugerido para la ejecucion.

No quiero RAG avanzado, ni backend de contexto, ni multiagente complejo. Solo este bloque.

## Contexto actual

La base ya existe y esta funcional:

- Fases 1 a 4 deben estar cerradas
- `5A` debe haber dejado recomendacion contextual minima

Debes trabajar **sobre la implementacion existente**, no rehacerla.

## Fuente de verdad documental

Antes de tocar codigo, usa estos documentos:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-5-BLOQUE-5A.md`
- `docs/FASE-5-BLOQUE-5B.md`

Tambien debes revisar la implementacion actual de `app/web`, en especial:

- brief
- launcher
- output
- recomendaciones
- metadata de recursos

## Objetivo funcional concreto

Quiero que el usuario pueda:

- recibir un contexto minimo sugerido,
- ver que recursos lo componen,
- y aceptarlo o ajustarlo antes de ejecutar.

## Alcance esperado

### 1. Composicion de contexto

### 2. Contexto minimo sugerido

### 3. Integracion con brief o launcher

### 4. Aceptacion o ajuste del contexto

## Restricciones importantes

- No implementes RAG avanzado
- No metas backend nuevo
- No conviertas esto en 5C
- No metas multiagente complejo

## Criterios de calidad

- el contexto sugerido debe ser util
- debe ser editable
- debe usar metadata real
- debe ahorrar trabajo manual

## Entregables esperados

Quiero que entregues:

1. implementacion del bloque
2. archivos creados o modificados
3. como modelaste la composicion de contexto
4. donde se integra en el flujo de trabajo
5. limitaciones conocidas
6. verificacion de build

## Verificacion

Al final ejecuta:

- `npm run build`

## Instruccion final

Empieza revisando `app/web` y la documentacion de `docs/`. Luego implementa directamente el Bloque 5B sin expandir el alcance mas alla de composicion automatica de contexto minima usable.
