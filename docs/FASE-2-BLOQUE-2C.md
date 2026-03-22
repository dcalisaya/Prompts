# Fase 2 · Bloque 2C

## Vistas de Salida

## 1. Objetivo del bloque

Implementar la capa que toma una ejecución ya preparada y la convierte en una salida legible, utilizable y contextualizada dentro del `app`.

Este bloque debe resolver cómo presentar resultados según el tipo de entregable esperado, sin convertir todavía el sistema en una plataforma completa de sesiones o QA avanzada.

## 2. Resultado esperado

Al cerrar este bloque, el usuario ya debe poder:

- ver una salida estructurada,
- entender qué se generó,
- relacionar el resultado con el brief, el prompt y las fuentes usadas,
- y visualizar un siguiente paso operativo.

En otras palabras:

**el `app` pasa de “ejecución preparada” a “resultado visible y usable”.**

## 3. Lo que sí incluye

### 3.1 Vista base de salida

Debe existir una pantalla o módulo que muestre:

- resultado principal,
- contexto de origen,
- prompt usado,
- tipo de entregable,
- y recursos relacionados.

### 3.2 Presentación por `deliverable_type`

Este bloque debe interpretar `deliverable_type` de forma práctica.

Como mínimo, debe contemplar variantes razonables como:

- texto largo,
- checklist,
- plan estructurado,
- lista de recomendaciones,
- brief enriquecido,
- resumen ejecutivo,
- arquitectura o esquema por bloques.

No hace falta cubrir todos los formatos perfectos, pero sí dejar una base extensible.

### 3.3 Estructura legible del resultado

La salida no debe sentirse como dump de texto.

Debe mostrar, cuando aplique:

- secciones claras,
- bloques distinguibles,
- títulos o labels útiles,
- contexto de lectura,
- y una jerarquía visual que facilite revisión.

### 3.4 Contexto y trazabilidad inmediata

Debe mostrar, como mínimo:

- qué prompt originó la salida,
- qué brief la alimentó,
- qué tipo de entregable representa,
- qué recursos relacionados la respaldan.

### 3.5 Siguiente paso visible

La salida debe indicar al usuario, de forma útil:

- si puede refinar,
- si puede volver a editar el brief,
- si debe revisar manuales,
- o si el siguiente paso natural es pasar a un flujo mayor.

## 4. Lo que no incluye

Este bloque no debe implementar todavía:

- historial persistente,
- sesiones completas,
- revisión de calidad por disciplina,
- handoff formal entre áreas,
- colaboración multiusuario,
- aprobaciones,
- scoring automático del resultado.

Tampoco debe depender de backend nuevo si puede modelarse con estado local o estructuras transitorias.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- la estructura de ejecución preparada en 2B,
- `deliverable_type`,
- `expected_output`,
- metadata del prompt,
- brief consolidado,
- servicios, manuales y agente cuando aporten contexto.

Si hace falta una capa de renderers o adaptadores por `deliverable_type`, puede construirse dentro de `app/web`.

## 6. Preguntas que este bloque debe resolver

El usuario debe poder responder rápidamente:

- ¿qué resultado salió de esta ejecución?
- ¿cómo debo leerlo?
- ¿qué tipo de entregable es esto?
- ¿de dónde viene este resultado?
- ¿qué hago después con esto?

## 7. Criterios de UX

- La salida debe ser escaneable.
- Debe sentirse útil para trabajo real, no como texto pegado.
- La jerarquía visual debe ayudar a revisar rápido.
- Los resultados deben poder leerse bien en desktop y aceptablemente en móvil.
- El usuario debe ver contexto sin tener que volver atrás todo el tiempo.

## 8. Criterios técnicos

- separar renderizado por `deliverable_type` de la pantalla contenedora,
- no acoplar toda la salida a un solo formato,
- permitir crecimiento de nuevos tipos sin reescribir la vista completa,
- reutilizar lo construido en 2A y 2B,
- preparar el terreno para Bloque 2D y Fase 3.

## 9. Contratos mínimos esperados

La implementación debería apoyarse, como mínimo, en:

- estructura de ejecución de 2B,
- `deliverable_type`,
- `expected_output`,
- brief consolidado,
- metadata del prompt,
- recursos relacionados disponibles.

Si el contenido real de salida aún es preliminar o simulado, la UI debe dejar eso claro sin romper la experiencia.

## 10. Entregables concretos

El agente que implemente este bloque debería entregar:

1. una vista base de salida,
2. renderers o adaptadores por `deliverable_type`,
3. integración con brief y ejecución,
4. contexto visible del resultado,
5. siguiente paso sugerido,
6. nota breve de decisiones de modelado tomadas.

## 11. Definicion de terminado

El Bloque 2C se considera terminado cuando:

- el usuario puede ver una salida estructurada en el `app`,
- la vista cambia de forma razonable según `deliverable_type`,
- el resultado está contextualizado con brief, prompt y recursos,
- existe una lectura clara del siguiente paso,
- y el sistema queda listo para flujos operativos guiados en 2D.
