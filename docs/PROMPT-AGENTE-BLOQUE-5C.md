Quiero que implementes la **Fase 5 / Bloque 5C** del `app` de este repositorio.

## Objetivo del bloque

Construir la primera capa de asistencia de salida para que el sistema ayude a mejorar formato, claridad y entregabilidad del output.

No quiero evaluacion avanzada con IA ni scoring complejo. Solo este bloque.

## Contexto actual

La base ya existe y esta funcional:

- Fases 1 a 4 deben estar cerradas
- `5A` debe haber dejado recomendacion contextual
- `5B` debe haber dejado composicion automatica de contexto

Debes trabajar **sobre la implementacion existente**, no rehacerla.

## Fuente de verdad documental

Antes de tocar codigo, usa estos documentos:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-5-BLOQUE-5A.md`
- `docs/FASE-5-BLOQUE-5B.md`
- `docs/FASE-5-BLOQUE-5C.md`

Tambien debes revisar la implementacion actual de `app/web`, en especial:

- output views
- revision
- calidad
- recomendaciones
- contexto sugerido

## Objetivo funcional concreto

Quiero que el usuario pueda:

- ver sugerencias concretas para mejorar el output,
- entender si le falta algo para ser entregable,
- y aplicar una ultima capa de asistencia antes de cerrar el trabajo.

## Alcance esperado

### 1. Formatos sugeridos

### 2. Checklist contextual del output

### 3. Mejoras de entregabilidad

### 4. Integracion con output o revision

## Restricciones importantes

- No implementes evaluacion avanzada con IA
- No metas backend nuevo
- No conviertas esto en Fase 6
- No metas feedback multiusuario

## Criterios de calidad

- la asistencia debe ser concreta
- debe mejorar el output sin friccion excesiva
- debe usar metadata real y contexto existente
- debe sentirse util para trabajo real

## Entregables esperados

Quiero que entregues:

1. implementacion del bloque
2. archivos creados o modificados
3. como modelaste las sugerencias y el checklist
4. donde aparece la asistencia en el producto
5. limitaciones conocidas
6. verificacion de build

## Verificacion

Al final ejecuta:

- `npm run build`

## Instruccion final

Empieza revisando `app/web` y la documentacion de `docs/`. Luego implementa directamente el Bloque 5C sin expandir el alcance mas alla de asistencia minima de salida.
