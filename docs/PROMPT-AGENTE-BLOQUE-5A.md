Quiero que implementes la **Fase 5 / Bloque 5A** del `app` de este repositorio.

## Objetivo del bloque

Construir la primera capa de recomendacion contextual para que el sistema sugiera recursos utiles segun intencion, servicio, disciplina o etapa.

No quiero IA conversacional compleja, ni embeddings, ni ranking sofisticado. Solo este bloque.

## Contexto actual

La base ya existe y esta funcional:

- Fase 1 cerrada
- Fase 2 cerrada
- Fase 3 debe haber dejado sesiones, estado y trazabilidad
- Fase 4 debe haber dejado calidad, revision y siguiente paso

Debes trabajar **sobre la implementacion existente**, no rehacerla.

## Fuente de verdad documental

Antes de tocar codigo, usa estos documentos:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-5-BLOQUE-5A.md`

Tambien debes revisar la implementacion actual de `app/web`, en especial:

- busqueda
- flujos
- prompts
- servicios
- sesiones
- siguiente paso

## Objetivo funcional concreto

Quiero que el usuario pueda:

- ver sugerencias utiles de recursos,
- entender por que se recomiendan,
- y elegir mas rapido que navegando manualmente por toda la biblioteca.

## Alcance esperado

### 1. Recomendacion por intencion

### 2. Recomendacion por servicio o disciplina

### 3. Recomendacion por etapa del trabajo

### 4. Explicacion minima de la recomendacion

## Restricciones importantes

- No implementes IA conversacional
- No metas embeddings
- No metas backend nuevo
- No conviertas esto en 5B o 5C

## Criterios de calidad

- la recomendacion debe ser util
- debe estar justificada
- debe usar metadata real
- no debe romper la navegacion manual

## Entregables esperados

Quiero que entregues:

1. implementacion del bloque
2. archivos creados o modificados
3. como modelaste las recomendaciones
4. donde aparecen dentro del producto
5. limitaciones conocidas
6. verificacion de build

## Verificacion

Al final ejecuta:

- `npm run build`

## Instruccion final

Empieza revisando `app/web` y la documentacion de `docs/`. Luego implementa directamente el Bloque 5A sin expandir el alcance mas alla de recomendacion contextual minima usable.
