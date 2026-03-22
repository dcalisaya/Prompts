# Vision del App

## 1. Que es el app

El `app` es la capa operativa principal de Live Developer sobre la base canónica de `base/masters`.

No es:

- un visor de Markdown,
- un simple chatbot,
- un reemplazo del repositorio,
- ni una interfaz secundaria para usuarios técnicos.

Sí es:

- un **workspace operativo interno asistido por IA**,
- una interfaz para navegar servicios, prompts, agentes, manuales y flujos,
- una herramienta para convertir requerimientos en entregables operativos,
- y la futura puerta principal de trabajo para equipos no técnicos.

## 2. Para que existe

El `app` existe para resolver tres problemas concretos:

1. encontrar rápido qué recurso usar,
2. estructurar mejor el trabajo antes de ejecutar,
3. estandarizar cómo opera el equipo sobre una sola fuente de verdad.

En términos prácticos, debe permitir que una persona pase de:

- "tengo una necesidad"

a:

- "sé qué servicio aplica",
- "sé qué prompt o agente usar",
- "sé qué inputs necesito",
- "y ya tengo una salida inicial lista para operar".

## 3. Problema que resuelve

Hoy la base de conocimiento ya existe, pero navegarla directamente desde archivos no escala para un equipo amplio, menos aún para uso móvil o para personas no técnicas.

El `app` debe resolver:

- dispersión de información,
- dependencia de conocer nombres de archivos,
- fricción para encontrar el prompt correcto,
- inconsistencia en briefs e inputs,
- baja trazabilidad entre servicio, prompt, agente y entregable,
- y dificultad para convertir conocimiento en operación diaria.

## 4. Propuesta de valor

La propuesta de valor del `app` es:

**convertir la biblioteca operativa de Live Developer en un sistema de trabajo usable, guiado y accionable.**

Eso significa que el `app` debe ayudar a:

- descubrir,
- decidir,
- ejecutar,
- revisar,
- y eventualmente registrar.

## 5. Usuarios principales

### Comercial y cotizacion

Necesitan:

- encontrar servicios,
- mapear necesidades,
- armar propuestas preliminares,
- detectar vacíos antes de cotizar.

### Estrategia y contenido

Necesitan:

- elegir prompts correctos,
- estructurar mensajes,
- construir planes, funnels, copy o narrativas,
- operar sin perder consistencia editorial.

### Produccion y delivery

Necesitan:

- acceder a manuales y prompts,
- preparar entregables,
- reducir errores de interpretación,
- mantener coherencia entre áreas.

### Desarrollo y operaciones internas

Necesitan:

- consumir metadata estructurada,
- conectar flujos,
- construir formularios y vistas confiables,
- evolucionar el sistema sin depender de heurísticas frágiles.

### Dirección

Necesita:

- control,
- estandarización,
- claridad de oferta,
- trazabilidad entre conocimiento, operación y producto.

## 6. Casos de uso principales

Los primeros casos de uso del `app` deberían ser:

1. navegación por rol, disciplina y necesidad,
2. descubrimiento de servicios y recursos relacionados,
3. selección guiada de prompts y agentes,
4. formularios de brief según `input_type`,
5. salidas orientadas por `deliverable_type`,
6. consulta de manuales y fuentes de verdad,
7. flujos operativos como cotización, contenido, desarrollo o CX,
8. búsqueda estructurada de activos por metadata.

## 7. Como debe usarse

La experiencia ideal no debería empezar en archivos, sino en intención.

El flujo de uso correcto del `app` debería ser:

1. el usuario entra por rol, área o necesidad,
2. el sistema propone recursos relevantes,
3. el usuario selecciona servicio, prompt o flujo,
4. el sistema pide inputs concretos,
5. el usuario genera o consulta una salida operativa,
6. el resultado puede revisarse, escalarse o derivarse.

Ejemplos:

- "quiero cotizar una necesidad" -> flujo comercial -> servicios -> prompt -> output preliminar
- "quiero construir una estrategia editorial" -> disciplina content -> prompt adecuado -> brief guiado -> entregable
- "quiero definir arquitectura técnica" -> flujo desarrollo -> manuales + prompt + agente

## 8. Fuente de verdad del app

La fuente de verdad no debe vivir en el frontend.

La lógica correcta es:

- `base/masters/`: fuente canónica humana y operativa,
- `base/json/`: capa estructurada derivada,
- `app/`: producto que consume esa estructura,
- backend/DB futura: capa de estado, workflow y multiusuario cuando haga falta.

El `app` debe consumir especialmente:

- `prompts_operativos.json`,
- `agentes_maestros.json`,
- `services.json`,
- `service_matrix.json`,
- `pricing.json`,
- `roles_map.json`,
- `navigation_map.json`,
- `taxonomy.json`.

## 9. Modulos recomendados

## 9.1 Knowledge Hub

Debe incluir:

- home orientado por rol o necesidad,
- exploracion por disciplina,
- buscador,
- fichas de prompts,
- fichas de agentes,
- fichas de servicios,
- fichas de manuales,
- mapas de flujo.

## 9.2 Workspace Operativo

Debe incluir:

- formularios guiados por `input_type`,
- vistas de salida por `deliverable_type`,
- briefs estructurados,
- handoff entre áreas,
- historial ligero de ejecuciones o consultas.

## 9.3 Capa Comercial

Debe incluir:

- descubrimiento de servicios,
- relación entre necesidad y `service_code`,
- apoyo a proformas,
- visibilidad de pricing interno donde corresponda por permisos.

## 9.4 Capa Editorial y de Producción

Debe incluir:

- acceso rápido a sistemas editoriales,
- prompts de copy, transcreación y QA,
- manuales y lineamientos de calidad,
- rutas por tipo de entregable.

## 9.5 Capa Técnica

Debe incluir:

- API estable,
- consumo de JSON estructurado,
- validaciones de metadata,
- base lista para evolucionar a sistema multiusuario.

## 10. Lo que no debe ser prioridad

En esta etapa no debería priorizarse:

- el CLI como canal principal,
- automatización excesiva sin casos reales,
- features de colaboración complejas antes de estabilizar la experiencia base,
- una DB para todo el contenido,
- un chatbot genérico sin contexto estructurado.

## 11. Roadmap sugerido

### Fase 1. Knowledge Hub Operable

Objetivo:

- hacer que el equipo encuentre rápido el recurso correcto.

Debe incluir:

- navegación por roles y disciplinas,
- buscador,
- vista de prompts/agentes/manuales/servicios,
- consumo sólido de `base/json`.

### Fase 2. Workspace Operativo

Objetivo:

- convertir descubrimiento en ejecución guiada.

Debe incluir:

- formularios por tipo de tarea,
- briefs,
- outputs estructurados,
- flujos por área.

### Fase 3. Operación Ligera con Estado

Objetivo:

- registrar trabajo y hacerlo trazable.

Debe incluir:

- sesiones,
- historiales,
- ownership,
- estados básicos,
- handoff entre áreas.

### Fase 4. Sistema Operativo Asistido por IA

Objetivo:

- conectar asistentes a contexto real de operación.

Debe incluir:

- recomendación de prompts,
- composición de contexto,
- salidas reutilizables,
- integración con oportunidades, proyectos o CRM cuando exista esa capa.

## 12. Decision estrategica

La apuesta principal debe ser:

- `app` como producto central,
- `base/masters` como fuente canónica,
- `base/json` como contrato estructural,
- y `docs/` como capa de visión y definición del producto.

## 13. Definicion ejecutiva

Si hubiera que describir el `app` en una sola frase:

**El app de Live Developer es un workspace operativo interno que convierte conocimiento, prompts, servicios y agentes en una experiencia guiada de ejecución para equipos reales.**
