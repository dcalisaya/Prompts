Quiero que implementes la **Fase 4 / Bloque 4B** del `app` de este repositorio.

## Objetivo del bloque

Construir la primera capa de revision de entregables para que el usuario pueda evaluar outputs con contexto antes de seguir o derivarlos.

No quiero aprobaciones multiusuario ni comparacion avanzada de versiones. Solo este bloque.

## Contexto actual

La base ya existe y esta funcional:

- Fase 1 cerrada
- Fase 2 cerrada
- Fase 3 debe haber dejado sesiones, estado y trazabilidad
- `4A` debe haber dejado checklists y warnings minimos

Debes trabajar **sobre la implementacion existente**, no rehacerla.

## Fuente de verdad documental

Antes de tocar codigo, usa estos documentos:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-4-BLOQUE-4A.md`
- `docs/FASE-4-BLOQUE-4B.md`

Tambien debes revisar la implementacion actual de `app/web`, en especial:

- outputs
- sessions
- estado
- trazabilidad
- calidad por disciplina

## Objetivo funcional concreto

Quiero que el usuario pueda:

- revisar un entregable con brief, recursos y warnings en una sola experiencia,
- y decidir mejor si debe ajustarlo o seguir adelante.

## Alcance esperado

### 1. Vista de revision

Necesito una vista o modo claro de revision de entregable.

### 2. Integracion de contexto

Debe mostrar output, brief, recursos y calidad en conjunto.

### 3. Acciones basicas

Debe permitir volver a editar, volver a ejecutar o marcar siguiente paso razonable.

## Restricciones importantes

- No implementes comentarios multiusuario
- No implementes aprobaciones formales
- No metas backend
- No conviertas esto en 4C

## Criterios de calidad

- la revision debe ser legible
- debe concentrar contexto util
- no debe sentirse como dump de datos
- debe dejar la decision mas clara

## Entregables esperados

Quiero que entregues:

1. implementacion del bloque
2. archivos creados o modificados
3. como integraste revision con calidad y trazabilidad
4. acciones disponibles desde la vista
5. limitaciones conocidas
6. verificacion de build

## Verificacion

Al final ejecuta:

- `npm run build`

## Instruccion final

Empieza revisando `app/web` y la documentacion de `docs/`. Luego implementa directamente el Bloque 4B sin expandir el alcance mas alla de revision de entregables con contexto.
