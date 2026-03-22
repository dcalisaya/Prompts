# Arquitectura Funcional del App

## 1. Proposito

Este documento define como debe funcionar el `app` como producto, no solo como proyecto técnico.

Su objetivo es traducir la visión del `app` en una arquitectura funcional clara, con capas, responsabilidades y contratos de información que permitan implementar por bloques sin perder coherencia.

## 2. Principio central

La arquitectura funcional del `app` se sostiene en una idea:

**el conocimiento vive en `base/masters`, la estructura vive en `base/json` y la experiencia operativa vive en `app`.**

Eso implica que:

- `base/masters` define contenido, reglas y criterio,
- `app/scripts/build_json.py` transforma esa base en estructura consumible,
- `base/json` actúa como contrato de datos,
- `app` convierte ese contrato en navegación, formularios, flujos y salidas.

## 3. Capas funcionales

## 3.1 Capa de Conocimiento Canonico

Fuente:

- `base/masters/company/`
- `base/masters/catalog/`
- `base/masters/agents/`
- `base/masters/prompts-operativos/`
- `base/masters/manuales-*`

Responsabilidad:

- definir la verdad operativa y editorial,
- mantener prompts, agentes, servicios, manuales y governance,
- servir como base humana y auditable.

No debe asumir:

- lógica de interfaz,
- estado de usuario,
- comportamiento de frontend.

## 3.2 Capa de Estructuracion

Fuente principal:

- `app/scripts/build_json.py`
- `app/scripts/build_indices.py`

Salida:

- `base/json/*.json`

Responsabilidad:

- normalizar metadata,
- validar consistencia,
- convertir Markdown a estructura estable para producto.

Esta capa es el puente entre conocimiento y software.

## 3.3 Capa de Datos de Producto

Artefactos principales:

- `services.json`
- `service_matrix.json`
- `pricing.json`
- `prompts_operativos.json`
- `agentes_maestros.json`
- `roles_map.json`
- `navigation_map.json`
- `taxonomy.json`

Responsabilidad:

- ofrecer contratos legibles para frontend y API,
- permitir filtros, vistas, búsqueda y flujos,
- reducir dependencia de parsing dinámico en runtime.

## 3.4 Capa de API

Fuente actual:

- [app/api/main.py](/Users/dcalisaya/Developer/Prompts/app/api/main.py)

Responsabilidad:

- exponer datos estructurados,
- resolver búsquedas y filtros,
- ofrecer endpoints de consulta para el frontend,
- evolucionar hacia validación de briefs, propuestas y sesiones.

La API no debe convertirse en otra fuente de verdad. Debe ser una interfaz estable sobre `base/json` y, más adelante, sobre una capa de estado.

## 3.5 Capa de Experiencia

Responsabilidad:

- convertir estructura en experiencia usable,
- permitir navegación por intención, rol, disciplina y flujo,
- guiar inputs,
- mostrar outputs,
- y reducir fricción operativa.

Aquí viven:

- dashboard inicial,
- exploradores,
- fichas de recursos,
- formularios,
- resultados,
- historial ligero.

## 3.6 Capa de Estado Operativo

Esta capa todavía no es central, pero debe contemplarse.

Responsabilidad futura:

- guardar sesiones,
- registrar briefs,
- almacenar borradores,
- manejar estados,
- y soportar ownership y handoff.

Esta capa puede comenzar en archivos o backend ligero antes de migrar a DB.

## 4. Objetos funcionales principales

El `app` gira alrededor de seis objetos principales:

### Servicio

Representa:

- la unidad comercial y operativa cotizable.

Debe responder:

- qué se vende,
- qué incluye,
- qué no incluye,
- qué inputs requiere,
- quién lo opera.

### Prompt Operativo

Representa:

- la unidad de ejecución guiada.

Debe responder:

- cuándo usarlo,
- qué inputs pide,
- qué salida produce,
- con qué agente y servicios se relaciona.

### Agente Maestro

Representa:

- la capa de criterio especializado.

Debe responder:

- qué rol cumple,
- qué sabe hacer,
- qué tipo de entregables domina.

### Manual

Representa:

- la fuente técnica o metodológica de respaldo.

Debe responder:

- qué norma, marco o criterio soporta un resultado.

### Flujo

Representa:

- una secuencia operativa entre varios recursos.

Debe responder:

- cómo avanzar desde una intención hasta un entregable.

### Sesion

Representa:

- el trabajo de un usuario dentro del `app`.

Debe responder:

- qué quiso hacer,
- qué recurso usó,
- qué inputs dejó,
- qué salida obtuvo.

## 5. Flujo funcional ideal

El recorrido base del `app` debería ser:

1. intención del usuario,
2. clasificación por rol, disciplina o necesidad,
3. recomendación de recurso,
4. selección de servicio, prompt o flujo,
5. captura guiada de inputs,
6. generación o consulta de salida,
7. revisión, derivación o guardado.

## 6. Contratos funcionales clave

Para que el producto funcione bien, hay contratos que no deben romperse:

### Prompt -> Agente

- un prompt debe apuntar a un `agent_core` existente.

### Prompt -> Servicio

- un prompt debe poder relacionarse con uno o varios `related_services`.

### Prompt -> Manual

- un prompt debe tener `source_of_truth` válido cuando dependa de criterio técnico o editorial.

### Rol -> Recursos

- cada rol debe poder descubrir sus prompts, agentes y docs relevantes.

### Input -> UI

- `input_type` debe informar el tipo de formulario o captura de contexto.

### Deliverable -> Output UI

- `deliverable_type` debe informar el tipo de salida que el producto presenta.

## 7. Navegacion funcional

El `app` no debe navegar solo por carpetas. Debe navegar por:

- rol,
- disciplina,
- necesidad,
- flujo,
- tipo de entregable,
- y búsqueda libre.

La navegación principal debería apoyarse en:

- `roles_map.json`
- `navigation_map.json`
- `taxonomy.json`

## 8. Principios de interfaz funcional

- El usuario entra por intención, no por nombre de archivo.
- Cada vista debe responder una sola pregunta principal.
- El producto debe sugerir el siguiente paso natural.
- La metadata debe convertirse en experiencia, no quedar visible como ruido.
- El contenido canónico debe ser accesible, pero no dominar la experiencia.

## 9. Fronteras del sistema

El `app` sí debe hacer:

- exploración,
- guía,
- estructuración,
- consulta,
- y preparación de outputs.

El `app` no tiene que resolver todavía:

- colaboración compleja,
- aprobaciones formales,
- CRM completo,
- PM completo,
- ni automatización total del negocio.

## 10. Criterio para implementar por bloques con agentes

La arquitectura funcional está pensada para implementación por bloques independientes.

Los bloques correctos son:

- bloque de datos y contratos,
- bloque de navegación,
- bloque de vistas de recursos,
- bloque de formularios,
- bloque de outputs,
- bloque de sesiones/estado.

Cada bloque debe poder ser tomado por un agente distinto, siempre que el write scope sea claro y el contrato de integración esté definido.

## 11. Definicion ejecutiva

Si hubiera que resumir esta arquitectura funcional en una frase:

**el `app` es una interfaz operativa sobre contratos estructurados derivados de `base/masters`, diseñada para guiar trabajo real sin reemplazar la fuente canónica.**
