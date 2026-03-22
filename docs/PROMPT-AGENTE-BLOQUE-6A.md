Quiero que implementes la **Fase 6 / Bloque 6A** del `app` de este repositorio.

## Objetivo del bloque

Construir la primera ampliacion seria del modelo de estado del producto para preparar el salto futuro a backend o DB sin romper la experiencia actual.

No quiero backend completo ni auth compleja. Solo este bloque.

## Contexto actual

La base ya existe y esta funcional:

- Fases 1 a 5 deben estar cerradas o claramente modeladas
- el sistema ya tiene sesiones, estado, trazabilidad, revision y capas de recomendacion/contexto

Debes trabajar **sobre la implementacion existente**, no rehacerla.

## Fuente de verdad documental

Antes de tocar codigo, usa estos documentos:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-6-BLOQUE-6A.md`

## Objetivo funcional concreto

Quiero que el sistema quede mejor preparado para escalar su persistencia y su modelo de trabajo, sin perder compatibilidad con la UI actual.

## Alcance esperado

### 1. Modelo de trabajo mas formal

### 2. Separacion de entidades

### 3. Contratos listos para persistencia futura

### 4. Compatibilidad con la experiencia actual

## Restricciones importantes

- No implementes DB real
- No metas auth compleja
- No conviertas esto en 6B o 6C

## Criterios de calidad

- el modelo debe ser mas claro
- debe reducir acoplamiento
- debe preparar backend futuro
- no debe romper la app actual

## Entregables esperados

Quiero que entregues:

1. implementacion del bloque
2. archivos creados o modificados
3. como modelaste la expansion del estado
4. compatibilidad con la capa actual
5. limitaciones conocidas
6. verificacion de build

## Verificacion

Al final ejecuta:

- `npm run build`

## Instruccion final

Empieza revisando `app/web` y la documentacion de `docs/`. Luego implementa directamente el Bloque 6A sin expandir el alcance mas alla de preparar el modelo para estado expandido futuro.
