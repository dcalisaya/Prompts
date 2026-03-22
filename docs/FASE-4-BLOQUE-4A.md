# Fase 4 · Bloque 4A

## Calidad por Disciplina

## 1. Objetivo del bloque

Implementar la primera capa de control de calidad del `app` para que los outputs y sesiones ya no dependan solo del criterio informal del usuario, sino de chequeos minimos por disciplina.

Este bloque debe abrir Fase 4 resolviendo:

- que revisar antes de dar un trabajo por aceptable,
- que riesgos minimos detectar,
- y como orientar la revision segun la naturaleza del entregable.

## 2. Resultado esperado

Al cerrar este bloque, el usuario ya debe poder:

- ver checklists minimos por disciplina,
- entender que falta revisar,
- identificar warnings basicos,
- y usar esos criterios antes de avanzar a revision o handoff.

En otras palabras:

**el `app` deja de solo generar trabajo y empieza a ayudar a controlarlo con criterios minimos por dominio.**

## 3. Lo que si incluye

### 3.1 Checklists por disciplina

Como minimo, el sistema debe soportar checklists para familias como:

- contenido,
- desarrollo,
- CX/CRM,
- cotizacion,
- y otras disciplinas relevantes si la metadata actual lo permite.

### 3.2 Criterios minimos de revision

Cada checklist debe ayudar a validar cosas como:

- completitud,
- coherencia,
- claridad,
- alineacion con el objetivo,
- y riesgos evidentes.

### 3.3 Warnings visibles

El sistema debe poder mostrar alertas o warnings cuando:

- falten secciones esperadas,
- no haya recursos de respaldo,
- el output sea demasiado pobre,
- o el flujo no tenga continuidad suficiente.

### 3.4 Integracion con outputs y sesiones

Los criterios de calidad deben verse al menos en:

- outputs,
- detalle de sesion,
- y si aplica, flujos guiados en puntos de control.

### 3.5 Base extensible

La estructura debe permitir agregar nuevos criterios por disciplina sin rehacer toda la UI.

## 4. Lo que no incluye

Este bloque no debe implementar todavia:

- aprobaciones multiusuario,
- scoring avanzado,
- benchmarking,
- validaciones automaticas sofisticadas,
- QA asistido por IA complejo,
- cumplimiento normativo profundo.

Tampoco debe convertirse en un sistema de auditoria completa. El objetivo aqui es calidad minima usable.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- sesiones y estado de Fase 3,
- briefs, execution y outputs de Fase 2,
- metadata de disciplina ya existente,
- y reglas ligeras definidas en frontend si hace falta.

## 6. Preguntas que este bloque debe resolver

El usuario debe poder responder rapidamente:

- ¿que debo revisar antes de dar esto por bueno?
- ¿que falta para que este output sea aceptable?
- ¿hay riesgos evidentes en este entregable?
- ¿este trabajo ya esta listo para revision?

## 7. Criterios de UX

- Los checklists deben ser legibles y accionables.
- La calidad debe ayudar, no frenar artificialmente.
- Los warnings deben ser utiles, no ruido.
- Móvil debe poder leer el estado minimo de calidad.

## 8. Criterios tecnicos

- separar reglas de calidad de la UI,
- mantener configuracion extensible por disciplina,
- no hardcodear decisiones en demasiados componentes,
- y dejar el terreno listo para 4B y 4C.

## 9. Contratos minimos esperados

La implementacion deberia apoyarse, como minimo, en:

- una capa de reglas o checklists por disciplina,
- warnings minimos,
- visualizacion del estado de calidad,
- e integracion con sesiones o outputs.

## 10. Entregables concretos

El agente que implemente este bloque deberia entregar:

1. checklists base por disciplina,
2. visualizacion de warnings y criterios minimos,
3. integracion con outputs o sesiones,
4. estructura extensible para nuevas disciplinas,
5. nota breve de decisiones de modelado tomadas.

## 11. Definicion de terminado

El Bloque 4A se considera terminado cuando:

- el usuario ya puede revisar calidad minima por disciplina,
- el sistema muestra warnings utiles,
- y la base queda lista para revision de entregables en 4B.
