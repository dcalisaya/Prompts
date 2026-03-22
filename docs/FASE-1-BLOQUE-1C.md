# Fase 1 · Bloque 1C

## Biblioteca de Recursos

## 1. Objetivo del bloque

Implementar la biblioteca central de recursos del `app` para que el usuario pueda descubrir y consultar los cuatro tipos de activos principales del sistema:

- prompts,
- agentes,
- servicios,
- manuales.

Este bloque debe convertir la estructura documental en una interfaz navegable por tipo de recurso, sin entrar todavía en ejecución operativa ni formularios.

## 2. Resultado esperado

Al cerrar este bloque, el usuario ya debe poder:

- listar prompts, agentes, servicios y manuales,
- abrir una ficha útil de cada tipo de recurso,
- entender qué hace cada recurso,
- y navegar entre recursos relacionados cuando esa relación exista en los datos actuales.

En otras palabras:

**el `app` deja de depender solo de entradas por rol o disciplina y ya ofrece una biblioteca operable de activos.**

## 3. Lo que sí incluye

### 3.1 Biblioteca de prompts

Debe incluir:

- listado de prompts,
- filtros básicos por disciplina, etapa o tipo si resulta razonable,
- ficha de prompt,
- lectura clara de objetivo, cuándo usarlo, agente asociado, `source_of_truth`, `input_type`, `deliverable_type` y `expected_output`.

### 3.2 Biblioteca de agentes

Debe incluir:

- listado de agentes,
- ficha de agente,
- lectura clara de rol, disciplina, descripción, filosofía, habilidades, tareas y entregable principal.

### 3.3 Biblioteca de servicios

Debe incluir:

- listado de servicios,
- ficha de servicio,
- lectura clara de `service_code`, categoría, nombre, descripción y señales útiles de alcance o disciplina.

Si el modelo actual de `services.json` y `service_matrix.json` obliga a combinar información, eso debe resolverse en adaptadores, no en la UI.

### 3.4 Biblioteca de manuales

Debe incluir:

- listado de manuales,
- agrupación mínima por disciplina o familia,
- ficha o vista de detalle básica,
- acceso al documento fuente y contexto suficiente para entender por qué sirve.

### 3.5 Navegación entre recursos

Debe incluir, cuando la data lo permita:

- links desde prompt a agente,
- links desde prompt a manuales relacionados,
- links desde servicio a recursos asociados,
- links desde agente a prompts o disciplina.

Cuando la relación no exista todavía en JSON, la UI no debe inventarla. Debe mostrar estado parcial de forma honesta.

## 4. Lo que no incluye

Este bloque no debe implementar todavía:

- ejecución de prompts,
- formularios de briefs,
- búsqueda global completa,
- sesiones,
- edición de recursos,
- permisos,
- integración conversacional con IA.

Tampoco debe bloquearse esperando que toda la metadata esté perfecta. Debe aprovechar lo que ya existe y degradar con dignidad donde falten relaciones.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- `base/json/prompts_operativos.json`
- `base/json/agentes_maestros.json`
- `base/json/services.json`
- `base/json/service_matrix.json`
- `base/json/navigation_map.json`
- `base/json/taxonomy.json`

Para manuales, puede apoyarse además en rutas derivadas desde `source_of_truth`, `navigation_map.json` o índices calculados a partir de `base/masters/manuales-*`, según lo que resulte más estable dentro del frontend.

## 6. Limitaciones actuales a considerar

La implementación debe asumir explícitamente estas realidades del repo actual:

- muchos `related_services` siguen vacíos,
- no todas las relaciones entre agentes, prompts y servicios están completas,
- los manuales no tienen todavía un JSON dedicado tan rico como prompts o agentes,
- algunos cruces deberán inferirse de forma segura y otros deberán mostrarse como no disponibles.

La regla es:

- preferir relaciones explícitas,
- inferir solo cuando sea seguro y trazable,
- no falsear completitud.

## 7. Preguntas que este bloque debe resolver

El usuario debe poder responder rápidamente:

- ¿qué prompt necesito?
- ¿qué agente me aporta criterio?
- ¿qué servicio vende u operacionaliza esto?
- ¿qué manual respalda la tarea?
- ¿qué recurso debo abrir después?

## 8. Criterios de UX

- Cada biblioteca debe sentirse parte del mismo producto, no cuatro módulos sueltos.
- Las fichas deben priorizar comprensión rápida.
- La metadata debe ayudar, no saturar.
- Los estados parciales o faltantes deben verse controlados, no rotos.
- Móvil debe seguir siendo utilizable para consulta rápida.

## 9. Criterios técnicos

- separar carga y adaptación de datos por tipo de recurso,
- normalizar en frontend una interfaz mínima por recurso si hace falta,
- evitar acoplar las vistas a la forma cruda de cada JSON,
- preparar componentes reusables de listado, ficha y relaciones,
- dejar el terreno listo para Bloque 1D y Fase 2.

## 10. Contratos mínimos esperados por tipo

### Prompts

La UI debería aprovechar, como mínimo:

- `id`
- `name`
- `discipline`
- `stage`
- `agent_core`
- `source_of_truth`
- `input_type`
- `deliverable_type`
- `expected_output`
- `related_services`

### Agentes

La UI debería aprovechar, como mínimo:

- `name`
- `role`
- `discipline`
- `description`
- `philosophy`
- `skills`
- `tasks`
- `deliverable_type`
- `related_services`

### Servicios

La UI debería aprovechar, como mínimo:

- `service_code`
- `category`
- `service`
- `description`

Si se necesita enriquecer con matriz, debe hacerse en una capa de composición de datos.

### Manuales

La UI debería mostrar, como mínimo:

- nombre legible,
- familia o disciplina,
- ruta fuente,
- y relaciones disponibles desde prompts, agentes o flujos.

## 11. Entregables concretos

El agente que implemente este bloque debería entregar:

1. listado y ficha de prompts,
2. listado y ficha de agentes,
3. listado y ficha de servicios,
4. listado y ficha básica de manuales,
5. adaptadores o selectores por tipo de recurso,
6. navegación entre recursos cuando exista relación real,
7. nota breve de limitaciones de datos encontradas y cómo fueron resueltas en UI.

## 12. Definicion de terminado

El Bloque 1C se considera terminado cuando:

- el usuario puede consultar bibliotecas por tipo de recurso,
- cada tipo tiene al menos listado y ficha funcional,
- las pantallas consumen datos reales del sistema,
- las relaciones disponibles se muestran sin inventar completitud,
- y el `app` queda listo para sumar búsqueda inicial en Bloque 1D.
