Quiero que implementes la **Fase 5 / Bloque 5D** del `app`: **Runtime de Ejecucion Real**.

## Objetivo

Reemplazar la dependencia principal de `executeMock` por una arquitectura minima de ejecucion real, manteniendo la UX ya construida en `app/web`.

No quiero una gran plataforma backend. Quiero el puente minimo, serio y extensible para que el producto deje de ser solo simulacion.

## Contexto

Hoy el `app` ya tiene:

- discovery y biblioteca de recursos
- briefs
- launcher
- output
- sesiones
- estados
- trazabilidad
- calidad
- revision
- derivacion
- recomendacion
- composicion de contexto
- asistencia de salida

Pero la ejecucion central sigue siendo mockeada.

## Documentos a usar

Revisa obligatoriamente:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-2-BLOQUE-2A.md`
- `docs/FASE-2-BLOQUE-2B.md`
- `docs/FASE-2-BLOQUE-2C.md`
- `docs/FASE-5-BLOQUE-5D.md`

Y revisa el codigo actual en:

- `app/web/src/services/executionService.ts`
- `app/web/src/services/types.ts`
- `app/web/src/pages/Briefs/BriefPage.tsx`
- `app/web/src/pages/Briefs/components/Launcher.tsx`
- `app/web/src/pages/Briefs/components/OutputView.tsx`

## Lo que debes construir

### 1. Contrato de ejecucion real

Necesito una capa clara para:

- request
- response
- error
- fallback

No metas la llamada al proveedor directamente dentro de la vista.

### 2. Adaptador de runtime

Debe existir una capa que permita hoy usar un runtime minimo y mañana cambiarlo por otro sin romper la UI.

### 3. Integracion con el flujo actual

El flujo debe seguir siendo:

- brief
- launcher
- ejecucion
- output

Pero ya con una llamada real.

### 4. Normalizacion de salida

La respuesta real puede venir:

- como texto
- mal formateada
- parcialmente estructurada
- o incompleta

Necesito una capa minima de normalizacion para que:

- `OutputRenderer`
- `OutputView`
- trazabilidad
- y revision

no se rompan.

### 5. Manejo de errores

Debes cubrir como minimo:

- error de red
- error del runtime
- timeout razonable
- respuesta vacia
- respuesta no estructurada

## Restricciones

- no abras todavia Fase 6
- no implementes DB
- no metas ownership
- no metas permisos
- no rehagas discovery ni sessions
- no metas multiagente real

## Criterios de calidad

- la UX existente debe sobrevivir
- la ejecucion debe ser real
- el acoplamiento al proveedor debe ser bajo
- la salida debe degradar bien
- el build debe seguir funcionando

## Entregables esperados

Quiero que entregues:

1. arquitectura minima implementada
2. archivos creados o modificados
3. contrato de request/response
4. como normalizas la salida real
5. como manejas errores
6. verificacion de build
7. nota breve de limites actuales

## Verificacion

Al final ejecuta:

- `npm run build`

Si hay un flujo de prueba local razonable, incluyelo tambien.

## Instruccion final

Empieza revisando el flujo actual de ejecucion y luego implementa el puente minimo para que el `app` deje de depender solo de `executeMock`.
