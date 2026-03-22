Quiero que implementes la **Fase 4 / Bloque 4C** del `app` de este repositorio.

## Objetivo del bloque

Construir la primera capa de derivacion y siguiente paso para que el trabajo revisado no quede aislado y el sistema pueda orientar continuidad operativa.

No quiero asignacion multiusuario real ni handoff complejo. Solo este bloque.

## Contexto actual

La base ya existe y esta funcional:

- Fase 1 cerrada
- Fase 2 cerrada
- Fase 3 debe haber dejado sesiones, estado y trazabilidad
- `4A` debe haber dejado calidad minima
- `4B` debe haber dejado revision de entregables con contexto

Debes trabajar **sobre la implementacion existente**, no rehacerla.

## Fuente de verdad documental

Antes de tocar codigo, usa estos documentos:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-4-BLOQUE-4A.md`
- `docs/FASE-4-BLOQUE-4B.md`
- `docs/FASE-4-BLOQUE-4C.md`

Tambien debes revisar la implementacion actual de `app/web`, en especial:

- sesiones
- estado
- trazabilidad
- revision
- metadata de roles, disciplinas y recursos

## Objetivo funcional concreto

Quiero que el usuario pueda:

- saber que sigue despues de revisar,
- ver a que rol, disciplina o recurso conviene derivar,
- y entender que faltantes siguen abiertos antes de continuar.

## Alcance esperado

### 1. Recomendacion de siguiente paso

Necesito una capa minima que sugiera continuidad operativa.

### 2. Derivacion basica

Quiero orientacion por rol, disciplina o recurso, sin convertir esto en asignacion real.

### 3. Faltantes visibles

Antes de continuar, el sistema debe mostrar si aun hay warnings o faltantes importantes.

### 4. Integracion con revision

La derivacion debe salir de la experiencia de revision y estado, no ser una pantalla aislada sin contexto.

## Restricciones importantes

- No implementes asignacion a usuarios
- No implementes notificaciones
- No metas backend
- No conviertas esto en Fase 5

## Criterios de calidad

- el siguiente paso debe ser util y concreto
- la derivacion no debe inventar relaciones falsas
- la UI debe reducir duda
- debe quedar una base limpia para recomendaciones mas inteligentes en Fase 5

## Entregables esperados

Quiero que entregues:

1. implementacion del bloque
2. archivos creados o modificados
3. como modelaste siguiente paso y derivacion
4. como integraste faltantes o warnings
5. limitaciones conocidas
6. verificacion de build

## Verificacion

Al final ejecuta:

- `npm run build`

## Instruccion final

Empieza revisando `app/web` y la documentacion de `docs/`. Luego implementa directamente el Bloque 4C sin expandir el alcance mas alla de derivacion minima y siguiente paso.
