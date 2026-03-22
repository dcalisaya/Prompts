# Fase 2 · Bloque 2D

## Flujos Operativos Guiados

## 1. Objetivo del bloque

Implementar la primera capa de flujos guiados del `app` para que el usuario no tenga que construir todo desde cero, sino seguir rutas operativas según la naturaleza de la tarea.

Este bloque debe cerrar Fase 2 conectando:

- descubrimiento,
- brief,
- ejecución preparada,
- y salida estructurada

en experiencias orientadas a casos de uso concretos.

## 2. Resultado esperado

Al cerrar este bloque, el usuario ya debe poder iniciar recorridos guiados para dominios específicos y avanzar con menos fricción que navegando recurso por recurso.

Como mínimo, el sistema debe cubrir:

- cotización,
- contenido,
- desarrollo,
- CX/CRM.

En otras palabras:

**el `app` deja de ser solo un conjunto de pantallas conectadas y pasa a ofrecer rutas operativas completas por tipo de trabajo.**

## 3. Lo que sí incluye

### 3.1 Flujos guiados por dominio

Debe existir una capa de flujos que oriente al usuario según la intención operativa.

Como mínimo, debe haber rutas o experiencias para:

- cotización,
- contenido,
- desarrollo,
- CX/CRM.

### 3.2 Secuencia guiada de pasos

Cada flujo debe ayudar a recorrer, de forma clara:

- selección del contexto,
- armado del brief,
- preparación de ejecución,
- revisión de salida,
- siguiente paso sugerido.

No hace falta resolver todos los edge cases, pero sí mostrar una secuencia coherente y usable.

### 3.3 Preconfiguración de recursos

El flujo debe poder sugerir o preseleccionar:

- prompts,
- servicios,
- manuales,
- y criterio contextual

cuando la intención del usuario ya da suficiente señal.

### 3.4 Vista de progreso del flujo

Debe existir una forma clara de mostrar:

- en qué paso está el usuario,
- qué ya completó,
- qué falta,
- y qué bloque del sistema está usando.

### 3.5 Salida orientada al flujo

La salida no debe sentirse aislada.

Cada flujo debe orientar:

- qué significa ese resultado,
- qué debe hacerse después,
- si hay que volver a ajustar el brief,
- o si ya está listo para derivación o revisión posterior.

## 4. Lo que no incluye

Este bloque no debe implementar todavía:

- sesiones persistentes completas,
- CRM real,
- estados multiusuario,
- handoff formal entre áreas,
- quality gates avanzados,
- automatización completa del negocio.

Tampoco debe requerir backend nuevo si puede construirse razonablemente sobre el estado y contratos ya existentes.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- `navigation_map.json`
- `workflow.json` si aporta estructura útil
- prompts, servicios y manuales ya expuestos por Fase 1
- briefs, launcher y salidas de Bloques 2A, 2B y 2C

Si hace falta una capa de configuración de flujos en frontend, puede crearse dentro de `app/web`.

## 6. Preguntas que este bloque debe resolver

El usuario debe poder responder rápidamente:

- ¿por dónde empiezo si quiero cotizar?
- ¿qué camino sigo si quiero preparar contenido?
- ¿qué pasos debo seguir para un encargo de desarrollo?
- ¿cómo arranco un flujo de CX/CRM sin conocer todos los prompts?
- ¿qué sigue después de cada paso?

## 7. Criterios de UX

- El flujo debe reducir fricción, no añadirla.
- El usuario debe ver progreso.
- La navegación debe ser guiada pero no rígida.
- Debe sentirse como una ruta de trabajo real, no como wizard artificial.
- Móvil debe poder seguir el flujo, aunque desktop sea la experiencia principal.

## 8. Criterios técnicos

- separar definición de flujos de la UI,
- no hardcodear demasiada lógica en una sola pantalla,
- reutilizar 2A, 2B y 2C en vez de reimplementar sus piezas,
- permitir agregar nuevos flujos sin rehacer toda la arquitectura,
- dejar el terreno listo para Fase 3.

## 9. Contratos mínimos esperados

La implementación debería apoyarse, como mínimo, en:

- prompts relevantes por dominio,
- briefs estructurados,
- ejecución preparada,
- salida estructurada,
- metadata de servicios,
- y recursos relacionados del ecosistema.

Si una parte del flujo todavía depende de metadata incompleta, la UI debe dejarlo claro sin romper la experiencia.

## 10. Entregables concretos

El agente que implemente este bloque debería entregar:

1. flujos guiados para cotización, contenido, desarrollo y CX/CRM,
2. vista de progreso o pasos,
3. integración con brief, launcher y salida,
4. preconfiguración contextual cuando sea razonable,
5. siguiente paso claro al final de cada flujo,
6. nota breve de decisiones de modelado tomadas.

## 11. Definicion de terminado

El Bloque 2D se considera terminado cuando:

- existen flujos operativos guiados para los dominios definidos,
- el usuario puede recorrer una secuencia completa dentro del `app`,
- los pasos reutilizan los bloques previos en vez de duplicarlos,
- cada flujo orienta el siguiente paso,
- y Fase 2 queda cerrada como workspace operativo usable.
