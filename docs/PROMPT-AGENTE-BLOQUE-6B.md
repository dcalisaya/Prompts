Quiero que implementes la **Fase 6 / Bloque 6B** del `app` de este repositorio.

## Objetivo del bloque

Construir la primera capa de ownership y permisos basicos para preparar el sistema para operacion de equipo mas seria.

No quiero auth completa ni RBAC complejo. Solo este bloque.

## Contexto actual

La base ya existe y esta funcional:

- Fases 1 a 5 deben estar cerradas o claramente modeladas
- `6A` debe haber dejado un modelo de estado mas serio

Debes trabajar **sobre la implementacion existente**, no rehacerla.

## Fuente de verdad documental

Antes de tocar codigo, usa estos documentos:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-6-BLOQUE-6A.md`
- `docs/FASE-6-BLOQUE-6B.md`

## Objetivo funcional concreto

Quiero que el sistema pueda representar ownership minimo y permisos basicos sin volverse una plataforma enterprise completa.

## Alcance esperado

### 1. Ownership basico

### 2. Permisos minimos

### 3. Integracion con trabajos o sesiones

### 4. Preparacion para enforcement futuro

## Restricciones importantes

- No implementes auth completa
- No metas SSO
- No conviertas esto en 6C

## Criterios de calidad

- el modelo debe ser claro
- no debe sobrecomplicar la app
- debe preparar colaboracion futura
- debe mantener compatibilidad con el sistema actual

## Entregables esperados

Quiero que entregues:

1. implementacion del bloque
2. archivos creados o modificados
3. como modelaste ownership y permisos
4. donde se integra en el producto
5. limitaciones conocidas
6. verificacion de build

## Verificacion

Al final ejecuta:

- `npm run build`

## Instruccion final

Empieza revisando `app/web` y la documentacion de `docs/`. Luego implementa directamente el Bloque 6B sin expandir el alcance mas alla de ownership y permisos basicos.
