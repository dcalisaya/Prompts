Quiero que implementes la **Fase 6 / Bloque 6C** del `app` de este repositorio.

## Objetivo del bloque

Construir la capa final de preparacion para integraciones futuras, dejando claro como podria conectarse el producto a backend, CRM, oportunidades o proyectos sin implementarlo todavia.

No quiero integraciones reales ni backend productivo. Solo este bloque.

## Contexto actual

La base ya existe y esta funcional:

- Fases 1 a 5 deben estar cerradas o claramente modeladas
- `6A` y `6B` deben haber dejado modelos mas estables y ownership/permisos basicos

Debes trabajar **sobre la implementacion existente**, no rehacerla.

## Fuente de verdad documental

Antes de tocar codigo, usa estos documentos:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-6-BLOQUE-6A.md`
- `docs/FASE-6-BLOQUE-6B.md`
- `docs/FASE-6-BLOQUE-6C.md`

## Objetivo funcional concreto

Quiero que el sistema quede preparado para integraciones futuras sin ensuciar el producto actual ni abrir complejidad prematura.

## Alcance esperado

### 1. Contratos de integracion

### 2. Puntos de extension

### 3. Preparacion del frontend para evolucion futura

## Restricciones importantes

- No implementes CRM real
- No metas backend productivo
- No metas sincronizacion remota
- No conviertas esto en una integracion prematura

## Criterios de calidad

- los contratos deben ser claros
- la arquitectura debe quedar preparada
- la app actual no debe complicarse sin necesidad
- debe cerrarse una base creible para evolucion futura

## Entregables esperados

Quiero que entregues:

1. implementacion del bloque
2. archivos creados o modificados
3. como preparaste el sistema para integraciones futuras
4. que contratos o adaptadores dejaste claros
5. limitaciones conocidas
6. verificacion de build

## Verificacion

Al final ejecuta:

- `npm run build`

## Instruccion final

Empieza revisando `app/web` y la documentacion de `docs/`. Luego implementa directamente el Bloque 6C sin expandir el alcance mas alla de preparacion de integraciones futuras.
