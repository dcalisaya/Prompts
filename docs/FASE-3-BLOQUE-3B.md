# Fase 3 · Bloque 3B

## Estado Operativo

## 1. Objetivo del bloque

Implementar la primera capa de estado operativo del `app` para que las sesiones y trabajos guardados no sean solo snapshots, sino elementos con progreso visible y control minimo.

Este bloque debe profundizar Fase 3 resolviendo:

- en que estado esta un trabajo,
- que puede hacerse con el segun ese estado,
- y como cambia su situacion a medida que avanza.

## 2. Resultado esperado

Al cerrar este bloque, el usuario ya debe poder:

- ver el estado de una sesion o trabajo,
- cambiarlo de forma controlada,
- filtrar o agrupar trabajo por estado,
- y entender rapidamente que esta activo, que esta listo y que ya no requiere atencion.

En otras palabras:

**el `app` deja de tener solo memoria operativa y pasa a mostrar progreso de trabajo de forma legible.**

## 3. Lo que si incluye

### 3.1 Estados base del trabajo

Como minimo, el sistema debe soportar estados como:

- borrador,
- en progreso,
- listo para revision,
- archivado.

Si aparece un estado adicional realmente util, puede agregarse, pero no se debe convertir esto en un workflow excesivo.

### 3.2 Cambios de estado

Debe existir una forma clara de mover una sesion o trabajo entre estados validos.

El sistema debe dejar claro:

- cual es el estado actual,
- que acciones lo cambian,
- y cuando un estado ya no admite ciertas acciones.

### 3.3 Estado visible en el producto

El estado debe verse al menos en:

- lista de sesiones,
- detalle o cabecera de sesion,
- y si aplica, vistas de brief, launcher, output o flujo reanudado.

### 3.4 Filtros y agrupacion por estado

El usuario debe poder:

- filtrar sesiones por estado,
- identificar rapidamente trabajo pendiente,
- y encontrar lo listo para revision o lo archivado.

No hace falta analitica; hace falta utilidad operativa.

### 3.5 Reglas minimas de transicion

Debe existir una logica minima y coherente de transiciones.

Ejemplos:

- un trabajo en borrador puede pasar a en progreso,
- uno en progreso puede pasar a listo para revision,
- uno listo para revision puede volver a en progreso o archivarse.

No hace falta un motor complejo de estados, pero si reglas claras.

## 4. Lo que no incluye

Este bloque no debe implementar todavia:

- aprobaciones multiusuario,
- ownership formal por persona,
- SLA,
- notificaciones,
- auditoria completa,
- paneles de gestion,
- automation rules.

Tampoco debe convertirse en un CRM o PM system completo. El objetivo aqui es estado operativo minimo usable.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- sesiones creadas en 3A,
- briefs, ejecuciones y flujos ya modelados,
- metadata de prompts, agentes y servicios cuando aporte contexto,
- y la arquitectura funcional ya definida en `docs/`.

Si hace falta ampliar el modelo `Session`, esa extension debe ser clara y dejar buen terreno para 3C.

## 6. Preguntas que este bloque debe resolver

El usuario debe poder responder rapidamente:

- ¿que trabajos siguen en borrador?
- ¿que esta realmente en progreso?
- ¿que ya esta listo para revision?
- ¿que puedo archivar?
- ¿como cambia el estado de este trabajo sin perder continuidad?

## 7. Criterios de UX

- El estado debe leerse de un vistazo.
- Cambiar de estado no debe sentirse burocratico.
- La interfaz debe evitar ambiguedad.
- La sesion debe seguir siendo el centro; el estado la complementa.
- Móvil debe poder leer y cambiar estados basicos.

## 8. Criterios tecnicos

- separar modelo de estado de la UI,
- mantener transiciones explicitas y sencillas,
- no duplicar logica de estado en muchos componentes,
- dejar el terreno listo para trazabilidad en 3C,
- y evitar que los estados dependan de strings dispersos sin control.

## 9. Contratos minimos esperados

La implementacion deberia apoyarse, como minimo, en:

- estados definidos de forma canonica,
- helpers de transicion,
- persistencia integrada con sesiones,
- y presentacion consistente del estado en el producto.

Si alguna transicion no es valida, la UI debe dejarlo claro y no romper.

## 10. Entregables concretos

El agente que implemente este bloque deberia entregar:

1. modelo de estado operativo,
2. transiciones basicas entre estados,
3. estado visible en lista y detalle de sesiones,
4. filtros o agrupacion por estado,
5. integracion razonable con brief, output o flujo reanudado,
6. nota breve de decisiones de modelado tomadas.

## 11. Definicion de terminado

El Bloque 3B se considera terminado cuando:

- las sesiones o trabajos ya tienen estado legible,
- el usuario puede moverlos entre estados coherentes,
- puede filtrar y retomar trabajo segun su estado,
- y la base queda lista para trazabilidad minima en 3C.
