# Modulos y Pantallas del App

## 1. Proposito

Este documento define la estructura visible del `app`: qué módulos debe tener, qué pantallas componen cada módulo y qué pregunta principal responde cada una.

No es un documento visual de UI final. Es un mapa funcional para diseño, frontend y coordinación de implementación.

## 2. Principio de diseño

Cada pantalla debe ayudar al usuario a avanzar en una tarea concreta.

La navegación correcta del `app` no es:

- leer carpetas,
- abrir archivos,
- adivinar qué prompt usar.

La navegación correcta es:

- entender una necesidad,
- descubrir recursos relevantes,
- capturar inputs,
- generar un siguiente paso accionable.

## 3. Modulos principales

## 3.1 Inicio

Objetivo:

- orientar rápidamente al usuario hacia su necesidad.

Pantallas:

### Home

Debe mostrar:

- acceso por rol,
- acceso por disciplina,
- acceso por flujos,
- acceso rápido a búsqueda,
- recursos recientes o destacados.

Pregunta principal:

- "¿Por dónde empiezo?"

### Selector por necesidad

Debe mostrar:

- tarjetas o accesos tipo "quiero cotizar", "quiero escribir copy", "quiero diseñar un funnel", "quiero definir arquitectura", etc.

Pregunta principal:

- "¿Qué necesito resolver?"

## 3.2 Exploracion de Recursos

Objetivo:

- permitir encontrar activos correctos sin conocer el repositorio.

Pantallas:

### Explorar por rol

Debe mostrar:

- roles disponibles,
- descripción del rol,
- prompts, agentes y manuales asociados.

### Explorar por disciplina

Debe mostrar:

- disciplinas,
- cobertura,
- recursos asociados.

### Explorar por flujo

Debe mostrar:

- flujos como cotización, desarrollo, contenido, producción,
- secuencia de pasos,
- recursos vinculados.

### Busqueda global

Debe mostrar:

- resultados por prompts,
- agentes,
- manuales,
- servicios,
- coincidencias por metadata.

Pregunta principal del módulo:

- "¿Qué recurso me conviene usar?"

## 3.3 Biblioteca de Servicios

Objetivo:

- convertir el catálogo en una interfaz usable para comercial y operación.

Pantallas:

### Listado de servicios

Debe mostrar:

- categorías,
- nombre del servicio,
- descripción breve,
- relación con disciplina.

### Ficha de servicio

Debe mostrar:

- `service_code`,
- alcance base,
- no incluidos,
- inputs,
- owner area,
- prompts relacionados,
- agentes relacionados.

### Vista de apoyo a cotización

Debe mostrar:

- selección de servicios,
- relación con matriz,
- warnings de alcance,
- pricing si el rol tiene permiso.

Pregunta principal:

- "¿Qué servicio aplica y con qué se conecta?"

## 3.4 Biblioteca de Prompts

Objetivo:

- hacer que los prompts sean descubribles y accionables.

Pantallas:

### Listado de prompts

Debe mostrar:

- filtros por disciplina,
- filtros por etapa,
- filtros por servicio,
- búsqueda por intención.

### Ficha de prompt

Debe mostrar:

- objetivo,
- cuándo usarlo,
- agente asociado,
- servicios asociados,
- inputs,
- salida esperada,
- fuente de verdad.

### Lanzador de prompt

Debe mostrar:

- formulario según `input_type`,
- contexto mínimo requerido,
- acceso a manuales relacionados,
- opción de continuar a salida.

Pregunta principal:

- "¿Cómo uso este prompt para obtener un resultado real?"

## 3.5 Biblioteca de Agentes

Objetivo:

- explicar qué hace cada agente y cuándo conviene usarlo.

Pantallas:

### Listado de agentes

Debe mostrar:

- rol,
- disciplina,
- etapa,
- entregable principal.

### Ficha de agente

Debe mostrar:

- descripción,
- filosofía,
- habilidades,
- tareas,
- prompts relacionados,
- servicios relacionados.

Pregunta principal:

- "¿Qué criterio especializado aporta este agente?"

## 3.6 Biblioteca de Manuales

Objetivo:

- volver utilizables los manuales como fuentes de respaldo.

Pantallas:

### Listado de manuales

Debe mostrar:

- manuales por disciplina,
- tipo,
- conexión con prompts y agentes.

### Ficha de manual

Debe mostrar:

- resumen,
- disciplina,
- prompts relacionados,
- agentes relacionados,
- enlace al documento fuente.

Pregunta principal:

- "¿Qué criterio técnico o metodológico respalda esta tarea?"

## 3.7 Workspace Operativo

Objetivo:

- convertir descubrimiento en ejecución guiada.

Pantallas:

### Nuevo brief

Debe mostrar:

- tipo de tarea,
- campos según `input_type`,
- archivos o texto base,
- contexto adicional.

### Salida estructurada

Debe mostrar:

- resultado principal,
- formato acorde a `deliverable_type`,
- recursos usados,
- siguientes pasos sugeridos.

### Historial o sesiones

Debe mostrar:

- sesiones recientes,
- recursos usados,
- fecha,
- estado,
- acceso a continuar.

Pregunta principal:

- "¿Cómo paso de recurso a entregable?"

## 3.8 Calidad y Revision

Objetivo:

- asegurar que el sistema no solo genere trabajo, sino trabajo usable.

Pantallas:

### Checklist de calidad

Debe mostrar:

- criterios de revisión según disciplina,
- puntos críticos,
- validación rápida antes de entregar.

### Fuentes de verdad asociadas

Debe mostrar:

- manuales,
- documentos de gobierno,
- reglas operativas,
- referencias vinculadas al entregable.

Pregunta principal:

- "¿Esto está listo para salir?"

## 4. Pantallas prioritarias para primera implementación

Las primeras pantallas que sí deben existir en Fase 1 son:

1. Home
2. Explorar por rol
3. Explorar por disciplina
4. Listado de prompts
5. Ficha de prompt
6. Listado de servicios
7. Ficha de servicio
8. Listado de agentes
9. Ficha de agente
10. Busqueda global

## 5. Pantallas prioritarias para segunda implementación

1. Nuevo brief
2. Lanzador de prompt
3. Salida estructurada
4. Vista de flujo
5. Historial de sesiones
6. Checklist de calidad

## 6. Reglas de diseño funcional

- Ninguna pantalla debe depender de conocer nombres internos de archivos.
- Las fichas deben priorizar uso, no estructura del repositorio.
- Los formularios deben nacer de metadata, no de campos inventados pantalla por pantalla.
- Las salidas deben alinearse con `deliverable_type`.
- El contenido largo debe ser accesible sin bloquear la tarea principal.

## 7. Implementacion por bloques con agentes

Este mapa permite dividir implementación por bloques:

### Bloque A. Shell y navegación

Incluye:

- home,
- navegación principal,
- router base.

### Bloque B. Exploradores y fichas

Incluye:

- roles,
- disciplinas,
- prompts,
- agentes,
- servicios,
- manuales.

### Bloque C. Búsqueda

Incluye:

- búsqueda global,
- filtros,
- relevancia básica.

### Bloque D. Workspace operativo

Incluye:

- briefs,
- lanzadores,
- outputs.

### Bloque E. Sesiones y calidad

Incluye:

- historial,
- revisión,
- checklists,
- estado ligero.

## 8. Definicion ejecutiva

Si hubiera que resumir este documento en una frase:

**el `app` debe organizarse en módulos que conviertan la biblioteca en navegación guiada, y la navegación guiada en trabajo operativo.**
