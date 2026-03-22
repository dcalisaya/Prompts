# Fase 4 · Bloque 4C

## Derivacion y Siguiente Paso

## 1. Objetivo del bloque

Implementar la primera capa de derivacion y siguiente paso del `app` para que el trabajo no termine en una revision aislada, sino que pueda orientarse hacia la accion siguiente.

Este bloque debe cerrar Fase 4 resolviendo:

- que sigue despues de revisar,
- a que rol o tipo de trabajo conviene derivar,
- y que faltantes deben quedar visibles antes de continuar.

## 2. Resultado esperado

Al cerrar este bloque, el usuario ya debe poder:

- ver una orientacion clara de siguiente paso,
- entender a que disciplina o rol podria pasar el trabajo,
- identificar faltantes antes de derivar,
- y dejar el trabajo mejor preparado para continuidad posterior.

En otras palabras:

**el `app` deja de cerrar en revision y pasa a orientar continuidad operativa entre funciones.**

## 3. Lo que si incluye

### 3.1 Recomendacion de siguiente paso

El sistema debe poder orientar, de forma minima:

- que hacer ahora,
- si volver a editar,
- si continuar con otro prompt,
- o si el trabajo ya esta listo para otra funcion.

### 3.2 Derivacion basica por rol o disciplina

No hace falta handoff formal, pero si una orientacion razonable de:

- siguiente rol sugerido,
- disciplina relacionada,
- o recurso que conviene abrir despues.

### 3.3 Visibilidad de faltantes

Antes de derivar, el sistema debe ayudar a ver:

- que falta,
- que warning sigue abierto,
- y si el trabajo esta suficientemente preparado.

### 3.4 Integracion con revision

La derivacion debe apoyarse en la vista de revision y en el estado del trabajo, no vivir desconectada.

## 4. Lo que no incluye

Este bloque no debe implementar todavia:

- asignacion real a usuarios,
- handoff multiusuario formal,
- notificaciones,
- colas de trabajo,
- aprobaciones jerarquicas.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- revision de 4B,
- calidad de 4A,
- sesiones, estado y trazabilidad de Fase 3,
- metadata de roles, disciplinas y recursos del ecosistema.

## 6. Preguntas que este bloque debe resolver

El usuario debe poder responder rapidamente:

- ¿que sigue despues de esta revision?
- ¿a que rol o disciplina pasa esto?
- ¿que falta antes de continuarlo?
- ¿que recurso conviene abrir despues?

## 7. Criterios de UX

- El siguiente paso debe ser claro y concreto.
- La derivacion debe reducir duda, no crearla.
- La experiencia debe mantener continuidad operativa.

## 8. Criterios tecnicos

- separar reglas de derivacion de la UI,
- reutilizar metadata de roles, disciplinas y recursos,
- no inventar relaciones que la data no soporta,
- y dejar el terreno listo para Fase 5.

## 9. Contratos minimos esperados

La implementacion deberia apoyarse, como minimo, en:

- recomendacion de siguiente paso,
- sugerencia de rol o disciplina,
- faltantes visibles,
- y acciones minimas de continuidad.

## 10. Entregables concretos

El agente que implemente este bloque deberia entregar:

1. capa minima de siguiente paso,
2. recomendaciones o derivaciones basicas,
3. visibilidad de faltantes antes de continuar,
4. integracion con revision y estado,
5. nota breve de decisiones de modelado tomadas.

## 11. Definicion de terminado

El Bloque 4C se considera terminado cuando:

- el usuario ya puede ver que sigue despues de revisar,
- el sistema orienta continuidad por rol, disciplina o recurso,
- y Fase 4 queda cerrada como capa de calidad, revision y derivacion minima.
