# Fase 4 · Bloque 4B

## Revision de Entregables

## 1. Objetivo del bloque

Implementar la primera capa de revision de entregables del `app` para que el usuario pueda evaluar un trabajo con contexto suficiente antes de aprobarlo o derivarlo.

Este bloque debe profundizar Fase 4 resolviendo:

- como revisar un entregable con sus insumos a la vista,
- como contrastar resultado con contexto,
- y como dejar una lectura mas fuerte que un simple output aislado.

## 2. Resultado esperado

Al cerrar este bloque, el usuario ya debe poder:

- revisar un output con su brief y contexto asociado,
- ver recursos de respaldo y criterios de calidad,
- y tomar una decision mejor informada sobre si continuar, ajustar o derivar.

En otras palabras:

**el `app` deja de mostrar solo resultados y pasa a ofrecer una vista de revision con contexto suficiente para decidir.**

## 3. Lo que si incluye

### 3.1 Vista de revision de entregable

Debe existir una vista o modo de revision que muestre, como minimo:

- output principal,
- brief de origen,
- recursos usados,
- criterios de calidad o warnings,
- y estado actual del trabajo.

### 3.2 Contraste entre resultado e insumos

La revision debe ayudar a responder si:

- el output corresponde al brief,
- usa bien los recursos asociados,
- y mantiene coherencia con el objetivo del trabajo.

### 3.3 Lectura integrada

No quiero que el usuario tenga que abrir demasiadas pantallas para revisar.

La experiencia debe reunir la informacion clave en una vista util.

### 3.4 Acciones basicas desde revision

La vista debe orientar al menos estas acciones:

- volver a editar,
- volver a ejecutar,
- marcar como listo para revision,
- o preparar siguiente paso.

## 4. Lo que no incluye

Este bloque no debe implementar todavia:

- comentarios multiusuario,
- aprobaciones formales,
- comparacion avanzada entre versiones,
- handoff complejo,
- notificaciones.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- outputs y execution de Fase 2,
- sesiones, estado y trazabilidad de Fase 3,
- checklists o warnings de 4A,
- y metadata de recursos del ecosistema.

## 6. Preguntas que este bloque debe resolver

El usuario debe poder responder rapidamente:

- ¿este output responde al brief?
- ¿con que recursos se hizo?
- ¿que warnings tiene?
- ¿debo ajustarlo o ya puedo seguir?

## 7. Criterios de UX

- La vista de revision debe ser clara y jerarquizada.
- Debe optimizar comprension, no solo mostrar mas informacion.
- Debe sentirse como una estacion de control de calidad.

## 8. Criterios tecnicos

- separar modo de revision del render normal de output,
- reutilizar sesiones, execution y trazabilidad,
- no duplicar datos sin necesidad,
- y dejar el terreno listo para derivacion en 4C.

## 9. Contratos minimos esperados

La implementacion deberia apoyarse, como minimo, en:

- una vista de revision,
- contexto del brief,
- recursos usados,
- estado y calidad,
- y acciones minimas de continuidad.

## 10. Entregables concretos

El agente que implemente este bloque deberia entregar:

1. vista de revision de entregables,
2. integracion de brief, output, recursos y calidad,
3. acciones basicas desde revision,
4. nota breve de decisiones de modelado tomadas.

## 11. Definicion de terminado

El Bloque 4B se considera terminado cuando:

- el usuario ya puede revisar un entregable con contexto suficiente,
- no depende de abrir varias pantallas para entenderlo,
- y la base queda lista para derivacion y siguiente paso en 4C.
