# Fase 3 · Bloque 3A

## Sesiones

## 1. Objetivo del bloque

Implementar la primera capa de sesiones del `app` para que el trabajo iniciado en Fase 2 ya no viva solo en memoria de la pantalla actual.

Este bloque debe abrir Fase 3 resolviendo la continuidad básica del trabajo:

- crear una sesion,
- guardar un brief o flujo en curso,
- reanudarlo despues,
- y mantener visible el contexto minimo de lo ya trabajado.

## 2. Resultado esperado

Al cerrar este bloque, el usuario ya debe poder:

- iniciar una sesion de trabajo,
- guardar su progreso sin perderlo al salir de la vista,
- volver a abrir una sesion reciente,
- y retomar desde un brief, launcher, output o flujo ya comenzado.

En otras palabras:

**el `app` deja de ser solo un workspace temporal y pasa a tener memoria operativa minima.**

## 3. Lo que si incluye

### 3.1 Creacion de sesiones

Debe existir una forma clara de abrir una sesion desde al menos estos puntos:

- ficha de prompt,
- motor de briefs,
- flujo guiado,
- y si es razonable, desde home o busqueda.

La sesion debe tener, como minimo:

- `sessionId`,
- tipo de origen,
- recurso origen,
- fecha de creacion,
- fecha de actualizacion,
- estado basico,
- y payload operativo asociado.

### 3.2 Guardado local o persistencia ligera

Este bloque debe guardar sesiones de manera ligera y usable.

La implementacion puede resolverlo con una estrategia local razonable, por ejemplo:

- `localStorage`,
- `indexedDB`,
- o una capa equivalente del frontend.

No hace falta backend nuevo en este bloque si la continuidad puede resolverse bien desde el cliente.

### 3.3 Reanudacion de sesiones

Debe existir una forma clara de ver sesiones guardadas y retomarlas.

Como minimo, el usuario debe poder:

- ver una lista de sesiones recientes,
- identificar de que prompt o flujo vienen,
- saber en que estado quedaron,
- y reabrirlas en el punto correcto.

### 3.4 Continuidad entre bloques de Fase 2

La sesion debe poder capturar y restaurar, segun aplique:

- brief,
- ejecucion preparada,
- salida generada,
- progreso del flujo,
- y recursos asociados.

No hace falta restaurar absolutamente todo si el costo es alto, pero si debe recuperarse una continuidad creible de trabajo.

### 3.5 Vista basica de sesiones

Debe existir al menos una vista o modulo para:

- listar sesiones,
- filtrarlas de forma minima,
- abrirlas,
- y continuar trabajo.

No hace falta una bandeja compleja; si hace falta, puede ser una vista sencilla pero clara.

## 4. Lo que no incluye

Este bloque no debe implementar todavia:

- multiusuario,
- permisos,
- ownership formal,
- estados de aprobacion complejos,
- backend persistente,
- CRM,
- handoff entre areas,
- versionado fuerte de entregables.

Tampoco debe convertirse en una auditoria historica completa. El objetivo aqui es continuidad minima usable.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- estructuras ya creadas en Fase 2 para `Brief`, `Execution` y `Flow`,
- metadata de prompts, agentes, servicios y manuales,
- rutas activas del `app`,
- y la arquitectura funcional ya definida en `docs/`.

Si hace falta crear una capa nueva como `sessionService.ts`, debe vivir en `app/web` y dejar una API clara para los bloques siguientes.

## 6. Preguntas que este bloque debe resolver

El usuario debe poder responder rapidamente:

- ¿como guardo este trabajo para retomarlo despues?
- ¿donde veo mis sesiones recientes?
- ¿puedo volver a un brief ya armado?
- ¿puedo retomar un flujo desde el paso en que me quede?
- ¿que contexto conserva el sistema cuando reabro una sesion?

## 7. Criterios de UX

- Guardar y retomar debe sentirse natural.
- La sesion no debe competir con la tarea; debe sostenerla.
- Debe quedar claro si el usuario esta en una sesion nueva o reanudada.
- La lista de sesiones debe ser escaneable.
- Móvil debe poder revisar y retomar sesiones, aunque desktop siga siendo la experiencia principal.

## 8. Criterios tecnicos

- separar modelo de sesion de la UI,
- no dispersar persistencia en muchos componentes,
- reutilizar contratos de `Brief`, `Execution` y `Flow`,
- dejar la puerta abierta para persistencia backend futura,
- evitar acoplar la sesion a un solo tipo de recurso,
- y mantener trazabilidad suficiente para Fase 3B y 3C.

## 9. Contratos minimos esperados

La implementacion deberia apoyarse, como minimo, en:

- un `Session` model claro,
- una capa de guardado/carga,
- metadata de origen,
- estado del trabajo,
- y rutas de reanudacion.

Si alguna parte no puede restaurarse de forma exacta, la UI debe dejarlo claro y degradar bien.

## 10. Entregables concretos

El agente que implemente este bloque deberia entregar:

1. modelo de sesion y capa de persistencia ligera,
2. creacion de sesiones desde puntos clave del workspace,
3. vista o bandeja de sesiones,
4. reanudacion de brief, ejecucion o flujo cuando sea posible,
5. estado visible de sesion activa o reanudada,
6. nota breve de decisiones de modelado tomadas.

## 11. Definicion de terminado

El Bloque 3A se considera terminado cuando:

- el usuario puede guardar trabajo iniciado en Fase 2,
- puede volver a verlo y reanudarlo,
- el `app` ya tiene memoria operativa minima,
- y la base queda lista para agregar estado operativo y trazabilidad en 3B y 3C.
