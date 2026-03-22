# Masters Layer

Esta carpeta es ahora la fuente primaria del workspace.

## Estructura canonica

- `catalog/`: catalogo oficial de servicios.
- `company/`: navegacion, operacion, pricing, reglas y capa empresarial.
- `agents/`: prompts maestros por especialidad.
- `prompts-operativos/`: prompts listos para tareas reales.
- `manuales-produccion/`: base tecnica de apoyo audiovisual e IA visual.
- `manuales-desarrollo/`: base tecnica de arquitectura, codigo, seguridad y despliegue.

## Navegacion canonica

La taxonomia de navegacion para roles, disciplinas, flujos, portal y CLI se define en:

- `company/18-NAVEGACION-CANONICA.json`
- `company/19-ESTANDAR-ORGANIZACION-Y-NOMENCLATURA.md`
- `company/20-PLAN-DE-EXPANSION-FASE-2.md`

Ese archivo debe ser la fuente unica para:

- `roles_map.json`,
- `navigation_map.json`,
- `taxonomy.json`,
- indices del `portal/`,
- y comportamiento de descubrimiento del CLI.

## Regla de crecimiento

Si entra una disciplina nueva:

1. primero se reserva su lugar en `20-PLAN-DE-EXPANSION-FASE-2.md` o el plan vigente,
2. luego se actualiza `18-NAVEGACION-CANONICA.json`,
3. y solo después se crean agentes, prompts y manuales.

## Compatibilidad

Las rutas antiguas bajo `Agentes-Marketing/` y el archivo raiz `08-SERVICES.md` se conservaron como enlaces simbolicos para no romper referencias existentes durante la transicion.
