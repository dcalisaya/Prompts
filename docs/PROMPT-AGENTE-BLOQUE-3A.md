Quiero que implementes la **Fase 3 / Bloque 3A** del `app` de este repositorio.

## Objetivo del bloque

Construir la primera capa de sesiones del producto para que el trabajo iniciado en Fase 2 pueda guardarse y retomarse despues.

No quiero CRM, ni multiusuario, ni backend complejo. Solo este bloque.

## Contexto actual

La base ya existe y esta funcional:

- `1A`: shell, home y rutas base
- `1B`: exploracion por rol y disciplina
- `1C`: biblioteca de recursos
- `1D`: busqueda
- `2A`: motor de briefs
- `2B`: launcher de ejecucion
- `2C`: vistas de salida
- `2D`: flujos operativos guiados

Debes trabajar **sobre la implementacion existente**, no rehacerla.

## Fuente de verdad documental

Antes de tocar codigo, usa estos documentos:

- `docs/VISION-APP.md`
- `docs/ARQUITECTURA-FUNCIONAL.md`
- `docs/MODULOS-Y-PANTALLAS.md`
- `docs/ROADMAP-POR-FASES.md`
- `docs/FASE-3-BLOQUE-3A.md`

Tambien debes revisar la implementacion actual de `app/web`, en especial:

- briefs
- execution
- flows
- search
- y rutas activas del producto

## Objetivo funcional concreto

Quiero que el usuario pueda:

- crear una sesion al iniciar trabajo,
- guardar esa sesion,
- ver sesiones recientes,
- y reanudar brief, ejecucion o flujo sin empezar de cero.

## Alcance esperado

### 1. Modelo de sesion

Necesito un modelo claro para sesiones.

Como minimo debe contemplar:

- `sessionId`
- `title`
- `originType`
- `originId`
- `status`
- `createdAt`
- `updatedAt`
- payload suficiente para restaurar trabajo

La sesion debe poder representar al menos:

- trabajo iniciado desde un prompt,
- trabajo iniciado desde un flujo,
- y trabajo que ya llego a brief, launcher o output.

### 2. Persistencia ligera

No metas backend nuevo.

Quiero una persistencia ligera razonable dentro de `app/web`, por ejemplo:

- `localStorage`
- o una capa equivalente

La implementacion debe ser clara y mantenible.

### 3. Creacion y guardado de sesiones

Debe existir una forma real de guardar sesion desde puntos clave del workspace.

Como minimo evalua integrarlo en:

- brief
- launcher
- output
- flujo guiado

No hace falta poner botones en absolutamente todas partes si eso vuelve la UX ruidosa, pero si debe existir un camino claro y util.

### 4. Vista de sesiones

Necesito una vista dedicada para:

- listar sesiones
- mostrar tipo, origen, fecha y estado
- abrir o reanudar una sesion

La vista puede ser simple, pero debe ser util.

### 5. Reanudacion

La app debe poder retomar una sesion y llevar al usuario al punto correcto o al punto mas cercano posible.

Si una restauracion exacta no es viable en todos los casos:

- degrada bien,
- dejalo claro en UI,
- pero no pierdas el trabajo principal.

## Restricciones importantes

- No implementes multiusuario
- No implementes ownership formal todavia
- No metas backend
- No conviertas esto en Fase 3B o 3C
- No rehagas la arquitectura de Fase 2

## Criterios de calidad

- guardar y retomar debe sentirse real, no decorativo
- la sesion debe tener suficiente contexto para continuar trabajo
- la persistencia debe estar encapsulada
- la UI debe explicar bien si la sesion es nueva o reanudada
- el sistema debe degradar bien si faltan campos o cambia la data

## Sugerencia tecnica

Quiero una arquitectura limpia.

Eso implica:

- separar `sessionService` o equivalente
- no meter toda la logica en componentes
- reutilizar `Brief`, `Execution` y `Flow`
- dejar el terreno listo para 3B y 3C

## Entregables esperados

Quiero que entregues:

1. implementacion del bloque
2. archivos creados o modificados
3. como modelaste la sesion
4. como resolviste persistencia y reanudacion
5. desde que puntos del producto se puede guardar
6. limitaciones conocidas
7. verificacion de build

## Verificacion

Al final ejecuta:

- `npm run build`

## Instruccion final

Empieza revisando `app/web` y los documentos de `docs/`. Luego implementa directamente el Bloque 3A sin expandir el alcance mas alla de sesiones y continuidad minima.
