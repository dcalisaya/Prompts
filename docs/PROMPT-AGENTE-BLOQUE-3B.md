Quiero que implementes la **Fase 3 / Bloque 3B** del `app` de este repositorio.

## Objetivo del bloque

Construir la primera capa de estado operativo del producto para que las sesiones ya no sean solo continuidad de trabajo, sino elementos con progreso visible y control minimo.

No quiero CRM, ni aprobaciones complejas, ni multiusuario. Solo este bloque.

## Contexto actual

La base ya existe y esta funcional:

- Fase 1 cerrada
- Fase 2 cerrada
- `3A` debe haber dejado sesiones, guardado y reanudacion minima

Debes trabajar **sobre la implementacion existente**, no rehacerla.

## Fuente de verdad documental

Antes de tocar codigo, usa estos documentos:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-3-BLOQUE-3A.md`
- `docs/FASE-3-BLOQUE-3B.md`

Tambien debes revisar la implementacion actual de `app/web`, en especial:

- sesiones
- briefs
- execution
- flows
- vistas de reanudacion y continuidad

## Objetivo funcional concreto

Quiero que el usuario pueda:

- ver el estado de una sesion o trabajo,
- cambiarlo de forma controlada,
- filtrar sesiones por estado,
- y entender rapidamente que esta en borrador, en progreso, listo para revision o archivado.

## Alcance esperado

### 1. Modelo de estado

Necesito un set claro de estados operativos, como minimo:

- `draft`
- `in_progress`
- `ready_for_review`
- `archived`

Si usas otros nombres, deben seguir siendo claros, consistentes y faciles de mapear en UI.

### 2. Integracion con sesiones

El estado debe vivir dentro del modelo de sesion o en una capa claramente vinculada a ella.

Debe persistir junto con la sesion y sobrevivir recarga o reanudacion.

### 3. Cambios de estado

Debe existir una forma real de cambiar estado, con reglas minimas coherentes.

No quiero dropdowns arbitrarios sin logica.

### 4. Estado visible en UI

Necesito que el estado se vea al menos en:

- listado de sesiones
- detalle o cabecera de sesion
- y en vistas donde el usuario retoma trabajo

### 5. Filtros o agrupacion

La bandeja de sesiones debe poder:

- filtrar por estado
- o agrupar por estado

No hace falta complejidad extra si una de las dos resuelve bien el problema.

## Restricciones importantes

- No implementes multiusuario
- No implementes ownership formal
- No metas backend
- No conviertas esto en 3C
- No metas un workflow engine excesivo

## Criterios de calidad

- el estado debe leerse de un vistazo
- las transiciones deben ser coherentes
- la persistencia debe seguir encapsulada
- la UI no debe sentirse burocratica
- debe quedar una base limpia para trazabilidad posterior

## Sugerencia tecnica

Quiero una arquitectura limpia.

Eso implica:

- separar helpers o reglas de estado
- no dispersar los estados como strings sueltos por todo el proyecto
- integrar con sesiones de forma natural
- dejar el terreno listo para 3C

## Entregables esperados

Quiero que entregues:

1. implementacion del bloque
2. archivos creados o modificados
3. como modelaste estados y transiciones
4. como integraste esto con sesiones
5. como resolviste filtros o agrupacion
6. limitaciones conocidas
7. verificacion de build

## Verificacion

Al final ejecuta:

- `npm run build`

## Instruccion final

Empieza revisando `app/web`, el estado de `3A` y los documentos de `docs/`. Luego implementa directamente el Bloque 3B sin expandir el alcance mas alla de estado operativo minimo usable.
