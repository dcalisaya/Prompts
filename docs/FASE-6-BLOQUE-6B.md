# Fase 6 · Bloque 6B

## Ownership y Permisos Basicos

## 1. Objetivo del bloque

Implementar la primera capa de ownership y permisos basicos del `app` para preparar el sistema para trabajo de equipo mas serio sin convertirlo todavia en una plataforma enterprise completa.

Este bloque debe profundizar Fase 6 resolviendo:

- como representar responsable o area,
- como limitar ciertas acciones segun rol o contexto,
- y como preparar la futura colaboracion multiusuario.

## 2. Resultado esperado

Al cerrar este bloque, el sistema ya debe poder:

- representar ownership minimo,
- modelar permisos basicos,
- y distinguir entre lo que cualquiera puede ver y lo que requiere mas control.

En otras palabras:

**el `app` deja de asumir un unico usuario sin restricciones y empieza a prepararse para operacion mas amplia.**

## 3. Lo que si incluye

### 3.1 Ownership basico

Debe existir una forma de representar al menos:

- responsable,
- area dueña,
- o unidad operativa asociada a un trabajo.

### 3.2 Permisos basicos

El sistema debe poder modelar permisos minimos como:

- ver,
- editar,
- archivar,
- derivar,
- o revisar.

### 3.3 Reglas visibles y acotadas

No hace falta enforcement completo si la arquitectura aun no lo soporta, pero si una capa clara de reglas y puntos de integracion.

## 4. Lo que no incluye

Este bloque no debe implementar todavia:

- auth completa,
- RBAC complejo,
- invitaciones de usuarios,
- administracion avanzada,
- SSO.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- modelo expandido de 6A,
- metadata de roles y disciplinas,
- estado y derivacion de fases anteriores,
- y contratos preparados para colaboracion futura.

## 6. Preguntas que este bloque debe resolver

El equipo debe poder responder rapidamente:

- ¿quien o que area es dueña de este trabajo?
- ¿que acciones deberian estar permitidas?
- ¿como se prepara el sistema para mas usuarios?

## 7. Criterios de UX

- La capa de ownership debe ser clara pero ligera.
- Los permisos no deben sentirse arbitrarios.
- La UI debe anticipar colaboracion sin volverse pesada.

## 8. Criterios tecnicos

- modelar ownership y permisos sin sobreingenieria,
- dejar puntos claros para enforcement futuro,
- y mantener compatibilidad con la app actual.

## 9. Contratos minimos esperados

La implementacion deberia apoyarse, como minimo, en:

- ownership minimo,
- permisos basicos,
- y reglas claras asociadas a trabajos o sesiones.

## 10. Entregables concretos

El agente que implemente este bloque deberia entregar:

1. modelo de ownership basico,
2. capa de permisos minimos,
3. integracion razonable con trabajos o sesiones,
4. nota breve de decisiones de modelado tomadas,
5. verificacion de build.

## 11. Definicion de terminado

El Bloque 6B se considera terminado cuando:

- el sistema ya puede representar ownership y permisos minimos,
- la colaboracion futura tiene una base clara,
- y la base queda lista para integraciones mayores en 6C.
