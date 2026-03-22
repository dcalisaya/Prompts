Quiero que implementes la **Fase 4 / Bloque 4A** del `app` de este repositorio.

## Objetivo del bloque

Construir la primera capa de calidad por disciplina para que los outputs y sesiones tengan criterios minimos de revision antes de pasar a la siguiente etapa.

No quiero aprobaciones complejas, ni scoring avanzado, ni auditoria completa. Solo este bloque.

## Contexto actual

La base ya existe y esta funcional:

- Fase 1 cerrada
- Fase 2 cerrada
- Fase 3 debe haber dejado sesiones, estado y trazabilidad minima

Debes trabajar **sobre la implementacion existente**, no rehacerla.

## Fuente de verdad documental

Antes de tocar codigo, usa estos documentos:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-4-BLOQUE-4A.md`

Tambien debes revisar la implementacion actual de `app/web`, en especial:

- outputs
- sesiones
- detalle de sesiones
- flujos
- metadata de disciplina y deliverable

## Objetivo funcional concreto

Quiero que el usuario pueda:

- ver que revisar segun la disciplina,
- detectar warnings minimos,
- y usar esos criterios antes de marcar el trabajo como listo para revision.

## Alcance esperado

### 1. Checklists por disciplina

Necesito una capa base de checklists o reglas minimas por disciplina.

### 2. Warnings basicos

Quiero deteccion minima de faltantes o riesgos obvios.

### 3. Integracion con outputs y sesiones

La calidad debe verse donde el usuario revisa trabajo real.

### 4. Base extensible

No quiero algo que solo sirva para dos casos y luego obligue a rehacer todo.

## Restricciones importantes

- No implementes aprobaciones multiusuario
- No metas backend
- No conviertas esto en 4B o 4C
- No metas scoring sofisticado

## Criterios de calidad

- la revision debe ser accionable
- los warnings deben servir
- la capa debe ser extensible
- la UI no debe sentirse pesada

## Entregables esperados

Quiero que entregues:

1. implementacion del bloque
2. archivos creados o modificados
3. como modelaste checklists y warnings
4. como lo integraste en outputs o sesiones
5. limitaciones conocidas
6. verificacion de build

## Verificacion

Al final ejecuta:

- `npm run build`

## Instruccion final

Empieza revisando `app/web` y la documentacion de `docs/`. Luego implementa directamente el Bloque 4A sin expandir el alcance mas alla de calidad minima por disciplina.
