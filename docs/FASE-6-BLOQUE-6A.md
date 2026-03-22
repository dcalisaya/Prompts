# Fase 6 · Bloque 6A

## Modelo de Estado Expandido

## 1. Objetivo del bloque

Implementar la primera ampliacion seria del modelo de estado del `app` para preparar el salto desde un workspace personal con persistencia ligera hacia un sistema con estructuras mas estables.

Este bloque debe abrir Fase 6 resolviendo:

- como escalar el modelo actual de sesiones y trabajos,
- como separar mejor entidades de trabajo,
- y como preparar una futura capa backend sin romper el producto actual.

## 2. Resultado esperado

Al cerrar este bloque, el sistema ya debe tener una base de modelo mas formal para:

- trabajos,
- sesiones,
- estados,
- referencias a recursos,
- y relaciones entre oportunidad, trabajo o entregable cuando aplique.

En otras palabras:

**el `app` deja de depender de modelos ligeros pensados solo para frontend y empieza a prepararse para persistencia expandida.**

## 3. Lo que si incluye

### 3.1 Modelo de trabajo mas formal

Debe existir una capa de modelado que permita distinguir mejor entre:

- sesion de trabajo,
- trabajo operativo,
- output o entregable,
- y flujo asociado.

### 3.2 Separacion de entidades

La estructura debe reducir el acoplamiento excesivo entre:

- estado,
- trazabilidad,
- y payload operativo.

### 3.3 Contratos preparados para persistencia futura

No hace falta backend real en este bloque, pero si contratos que puedan migrar con menos friccion a una DB o API.

### 3.4 Compatibilidad con el estado actual

La evolucion no debe romper la experiencia ya existente del producto.

## 4. Lo que no incluye

Este bloque no debe implementar todavia:

- base de datos real,
- migraciones backend completas,
- auth compleja,
- permisos ejecutables,
- integracion con CRM real.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- sesiones, estados y trazabilidad de Fase 3,
- calidad, revision y derivacion de Fase 4,
- recomendacion y contexto de Fase 5,
- y contratos funcionales ya existentes en `app/web`.

## 6. Preguntas que este bloque debe resolver

El equipo debe poder responder rapidamente:

- ¿que entidad representa realmente el trabajo?
- ¿que partes son sesion y cuales son trabajo persistible?
- ¿que contratos conviene estabilizar antes de backend?

## 7. Criterios de UX

- La evolucion del modelo no debe romper la experiencia actual.
- El usuario no debe sentir complejidad extra si no aporta valor inmediato.

## 8. Criterios tecnicos

- separar mejor entidades,
- reducir acoplamiento accidental,
- permitir futura persistencia seria,
- y mantener compatibilidad razonable con la UI actual.

## 9. Contratos minimos esperados

La implementacion deberia apoyarse, como minimo, en:

- un modelo mas formal de trabajo,
- contratos preparados para persistencia futura,
- y adaptadores o compatibilidad con la capa actual.

## 10. Entregables concretos

El agente que implemente este bloque deberia entregar:

1. propuesta o implementacion de modelo expandido,
2. integracion razonable con estructuras actuales,
3. nota de compatibilidad y migracion futura,
4. verificacion de build.

## 11. Definicion de terminado

El Bloque 6A se considera terminado cuando:

- el producto ya tiene una base de estado mas seria,
- el modelo actual deja de estar tan acoplado a solo localStorage,
- y la base queda lista para ownership y permisos en 6B.
