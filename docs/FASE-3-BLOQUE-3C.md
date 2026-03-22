# Fase 3 · Bloque 3C

## Trazabilidad Minima

## 1. Objetivo del bloque

Implementar la primera capa de trazabilidad del `app` para que las sesiones y trabajos no solo puedan guardarse y moverse entre estados, sino tambien explicar que recursos se usaron, que inputs entraron y que outputs se generaron.

Este bloque debe cerrar Fase 3 resolviendo:

- de donde salio un trabajo,
- con que insumos se construyo,
- que recursos participaran,
- y que resultado produjo.

## 2. Resultado esperado

Al cerrar este bloque, el usuario ya debe poder:

- ver el rastro basico de una sesion o trabajo,
- entender que prompt, agente, servicios y manuales participaron,
- revisar los inputs principales,
- y reconocer que output se genero y en que estado quedo.

En otras palabras:

**el `app` deja de tener solo memoria y estado, y pasa a mostrar trazabilidad minima del trabajo realizado.**

## 3. Lo que si incluye

### 3.1 Registro de recursos usados

La sesion o trabajo debe poder mostrar, como minimo:

- prompt usado,
- agente asociado,
- servicios relacionados,
- manuales de referencia,
- y flujo de origen si aplica.

### 3.2 Registro de inputs principales

No hace falta guardar absolutamente todo con granularidad extrema, pero si debe quedar visible:

- brief usado,
- campos principales llenados,
- contexto adicional,
- notas relevantes.

### 3.3 Registro de outputs generados

Debe quedar visible, como minimo:

- tipo de entregable,
- resumen del output,
- fecha de generacion,
- y estado de ese resultado dentro de la sesion.

### 3.4 Vista de trazabilidad

Debe existir una forma razonable de consultar esta informacion.

Puede resolverse como:

- una vista dedicada de detalle de sesion,
- un panel dentro de la sesion,
- o una combinacion sencilla de ambas.

Lo importante es que el usuario pueda seguir el rastro del trabajo.

### 3.5 Trazabilidad de flujos

Cuando el trabajo venga de un flujo guiado, la trazabilidad debe poder mostrar:

- pasos recorridos,
- prompts ejecutados,
- resultados intermedios si existen,
- y estado del flujo.

No hace falta auditoria profunda, pero si un rastro operativo util.

## 4. Lo que no incluye

Este bloque no debe implementar todavia:

- auditoria forense,
- versionado fuerte,
- comparacion avanzada entre versiones,
- aprobaciones multiusuario,
- historial completo de cada cambio,
- backend analitico,
- reporting ejecutivo.

Tampoco debe convertirse en una capa pesada de compliance. El objetivo aqui es trazabilidad operativa minima usable.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- sesiones creadas en 3A,
- estados definidos en 3B,
- contratos de `Brief`, `Execution` y `Flow`,
- metadata de prompts, agentes, servicios y manuales,
- y el trabajo ya realizado en Fase 2.

Si hace falta ampliar el modelo de sesion o de ejecucion para exponer mejor la trazabilidad, debe hacerse de forma clara y acotada.

## 6. Preguntas que este bloque debe resolver

El usuario debe poder responder rapidamente:

- ¿que prompt genero este resultado?
- ¿que agente estaba asociado?
- ¿que servicios y manuales respaldaron el trabajo?
- ¿que brief o inputs se usaron?
- ¿que pasos se recorrieron en este flujo?
- ¿que output salio de todo esto?

## 7. Criterios de UX

- La trazabilidad debe ser facil de leer.
- Debe ayudar a entender, no a saturar.
- Debe permitir reconstruir el trabajo sin abrir diez pantallas.
- Debe ser util tanto para revisar como para retomar.
- Móvil debe poder consultar el rastro minimo, aunque desktop sea mas comodo para detalle.

## 8. Criterios tecnicos

- separar modelo de trazabilidad de la UI,
- reutilizar datos ya existentes antes de duplicarlos,
- no convertir cada vista en un dump crudo de JSON,
- permitir ampliacion futura hacia historial mas rico,
- y mantener un contrato claro entre sesion, ejecucion y trazabilidad.

## 9. Contratos minimos esperados

La implementacion deberia apoyarse, como minimo, en:

- una estructura de trazabilidad por sesion o trabajo,
- recursos usados,
- inputs principales,
- outputs generados,
- pasos del flujo si existen,
- y referencias temporales basicas.

Si algun dato no esta disponible, la UI debe degradar bien y decirlo con claridad.

## 10. Entregables concretos

El agente que implemente este bloque deberia entregar:

1. capa minima de trazabilidad integrada a sesiones,
2. vista o panel de detalle con recursos usados,
3. resumen de inputs y outputs,
4. trazabilidad de pasos en flujos cuando aplique,
5. integracion con estados y continuidad previa,
6. nota breve de decisiones de modelado tomadas.

## 11. Definicion de terminado

El Bloque 3C se considera terminado cuando:

- una sesion o trabajo ya puede explicar de forma legible su rastro minimo,
- el usuario puede ver recursos, inputs y outputs asociados,
- los flujos pueden mostrar los pasos recorridos,
- y Fase 3 queda cerrada como base de continuidad, estado y trazabilidad minima.
