Quiero que implementes la **Fase 3 / Bloque 3C** del `app` de este repositorio.

## Objetivo del bloque

Construir la primera capa de trazabilidad del producto para que las sesiones y trabajos puedan explicar que recursos se usaron, que inputs entraron y que outputs se generaron.

No quiero auditoria avanzada, ni versionado fuerte, ni reporting. Solo este bloque.

## Contexto actual

La base ya existe y esta funcional:

- Fase 1 cerrada
- Fase 2 cerrada
- `3A` debe haber dejado sesiones y reanudacion
- `3B` debe haber dejado estado operativo minimo

Debes trabajar **sobre la implementacion existente**, no rehacerla.

## Fuente de verdad documental

Antes de tocar codigo, usa estos documentos:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-3-BLOQUE-3A.md`
- `docs/FASE-3-BLOQUE-3B.md`
- `docs/FASE-3-BLOQUE-3C.md`

Tambien debes revisar la implementacion actual de `app/web`, en especial:

- sesiones
- estado operativo
- briefs
- execution
- flows
- vistas de salida y reanudacion

## Objetivo funcional concreto

Quiero que el usuario pueda:

- abrir una sesion o trabajo,
- ver que prompt, agente, servicios y manuales participaron,
- revisar los inputs principales,
- y entender que output salio y de que flujo vino si aplica.

## Alcance esperado

### 1. Modelo de trazabilidad

Necesito una estructura clara para mostrar trazabilidad minima.

Debe contemplar, como minimo:

- recurso origen
- prompt usado
- agente asociado
- servicios relacionados
- manuales de referencia
- inputs principales
- output generado
- fechas basicas
- pasos del flujo si existen

### 2. Integracion con sesiones

La trazabilidad debe vivir vinculada a la sesion o al trabajo guardado.

No quiero una capa paralela desconectada.

### 3. Vista de trazabilidad

Debe existir una forma real de consultar este rastro.

Puede ser:

- una vista de detalle de sesion
- un panel dentro de la sesion
- o una solucion equivalente

Pero debe ser util y legible.

### 4. Trazabilidad de flujos

Si el trabajo viene de un flujo, quiero que se vea:

- que pasos se recorrieron
- que prompts se ejecutaron
- y que resultados intermedios hubo cuando existan

### 5. Degradacion razonable

Si falta metadata o alguna relacion no existe:

- no inventes datos,
- degrada bien,
- y deja claro lo que si se conoce.

## Restricciones importantes

- No implementes auditoria avanzada
- No implementes versionado completo
- No metas backend
- No conviertas esto en Fase 4
- No hagas una vista llena de JSON crudo sin criterio

## Criterios de calidad

- el rastro debe ser facil de leer
- la trazabilidad debe servir para revisar y retomar
- debe haber continuidad con sesiones y estado
- no debe sentirse como dump tecnico
- debe quedar base clara para Fase 4

## Sugerencia tecnica

Quiero una arquitectura limpia.

Eso implica:

- separar helpers de trazabilidad de la UI
- reutilizar `Brief`, `Execution`, `Flow` y `Session`
- evitar duplicar datos innecesariamente
- dejar el terreno listo para revisiones y handoff posteriores

## Entregables esperados

Quiero que entregues:

1. implementacion del bloque
2. archivos creados o modificados
3. como modelaste la trazabilidad
4. como la integraste con sesiones y estado
5. como resolviste trazabilidad de flujos
6. limitaciones conocidas
7. verificacion de build

## Verificacion

Al final ejecuta:

- `npm run build`

## Instruccion final

Empieza revisando `app/web`, el estado de `3A` y `3B`, y los documentos de `docs/`. Luego implementa directamente el Bloque 3C sin expandir el alcance mas alla de trazabilidad minima usable.
