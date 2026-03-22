# Lecciones Aplicables

## Objetivo

Convertir el caso `GEDSI-Video-Animado` en un patrón reusable para futuros proyectos audiovisuales asistidos por IA dentro de Live Developer.

Este documento resume qué funcionó, qué faltó capturar originalmente y qué reglas conviene convertir en estándar operativo.

## 1. Un proyecto IA no debe vivir solo como entregable final

### Hallazgo

El caso original conservaba piezas útiles, pero estaban sueltas:

- guion,
- desglose de tomas,
- y resultado creativo implícito.

No había trazabilidad suficiente sobre:

- brief,
- prompts usados,
- agentes aplicables,
- manuales de referencia,
- ni secuencia de producción.

### Lección

Todo proyecto IA debe tratarse como sistema documental, no solo como output.

### Regla aplicable

Todo proyecto audiovisual IA debería conservar como mínimo:

1. brief
2. guion
3. storyboard / shot list
4. prompts T2I
5. prompts I2V
6. plan de producción
7. control de consistencia
8. pipeline de renders
9. rastro operativo

## 2. El storyboard técnico debe existir antes de escalar la imagen

### Hallazgo

El desglose de tomas inicial era útil, pero todavía no estaba listo para producción IA rigurosa porque faltaban:

- función por shot,
- continuidad por plano,
- capas espaciales,
- y sugerencia de cámara / movimiento.

### Lección

Si el storyboard no define continuidad visual y función narrativa por plano, la IA empieza a improvisar.

### Regla aplicable

No pasar a prompts de imagen hasta que el storyboard incluya:

- función narrativa,
- sujetos,
- contexto espacial,
- nota de continuidad,
- y sugerencia I2V.

## 3. La consistencia del cast es más importante que la cantidad de shots

### Hallazgo

En proyectos con niños, adolescentes y personajes diversos, el riesgo más alto no es “que falten imágenes”, sino que cada generación parezca de otra película.

### Lección

La biblia del cast y la congelación de personajes principales deben aprobarse antes de escalar el resto.

### Regla aplicable

Antes de generar shots por escena:

- aprobar Ana
- aprobar Mateo
- aprobar lineup de secundarios
- congelar proporciones, peinados, vestuario y lenguaje de shading

## 4. La diversidad cultural necesita reglas visuales explícitas

### Hallazgo

La intención de diversidad no basta por sí sola. Sin reglas, la IA puede caer en:

- exotización,
- folclorización superficial,
- o mezcla incoherente de identidades.

### Lección

La representación de sierra, costa y amazonía debe ser explícita, respetuosa y controlada.

### Regla aplicable

Todo proyecto con diversidad territorial debe definir:

- qué identidades deben aparecer,
- qué elementos visuales son válidos,
- qué iconografía sí usar,
- y qué exageraciones evitar.

## 5. Los entornos maestros deben congelarse temprano

### Hallazgo

La plaza, escuela, taller y aula inclusiva funcionan como columnas del universo visual. Si estos entornos no se fijan temprano, el proyecto deriva rápido.

### Lección

El drift de entorno destruye continuidad tan rápido como el drift de personaje.

### Regla aplicable

Congelar antes de animar:

- plaza maestra,
- aula maestra,
- taller maestro,
- meeting space maestro,
- assets simbólicos recurrentes.

## 6. T2I e I2V deben tratarse como capas distintas

### Hallazgo

El caso GEDSI mostró con claridad que T2I e I2V no cumplen el mismo trabajo.

### Lección

T2I sirve para:

- diseñar,
- congelar,
- comparar,
- aprobar visualmente.

I2V sirve para:

- animar,
- mantener continuidad temporal,
- y traducir emoción y movimiento.

### Regla aplicable

No usar I2V para resolver diseño base.
No usar T2I como sustituto de timing y cámara.

## 7. Los shots hero reducen el caos del resto del proyecto

### Hallazgo

No todos los shots tienen el mismo peso. Algunos fijan el universo completo.

### Lección

Si los shots hero están aprobados, los bloques intermedios son más fáciles de controlar.

### Regla aplicable

Definir y aprobar temprano:

- plaza maestra,
- presentación de protagonistas,
- two-shot principal,
- shot hero de resolución,
- shot de diversidad,
- shot de aula inclusiva,
- cierre colectivo,
- cierre con protagonistas.

## 8. La continuidad debe revisarse por lote, no por imagen aislada

### Hallazgo

Una imagen puede verse excelente en solitario y aun así romper el proyecto entero cuando se la compara con el plano anterior o siguiente.

### Lección

La unidad mínima de revisión no debe ser solo la imagen, sino:

- el bloque,
- el par de shots,
- o la familia narrativa.

### Regla aplicable

Revisar por:

- `1-4`
- `7-10`
- `11-12`
- `13-15`
- `16-22`
- `23-27`

## 9. El naming y versionado son parte de la producción, no un detalle administrativo

### Hallazgo

Sin convención de nombres, los renders aprobados, rechazados y finales se mezclan muy rápido.

### Lección

La trazabilidad de renders debe diseñarse antes de producir grandes volúmenes.

### Regla aplicable

Todo proyecto audiovisual IA debe tener:

- convención de nombres,
- separación por `review / approved / rejected`,
- política de versiones,
- registro mínimo de seeds y referencias.

## 10. Los proyectos reales deben vivir fuera de `base/masters`

### Hallazgo

Este caso confirmó que:

- `base/masters` sirve para librería canónica,
- `projects/` sirve para ejecución real documentada.

### Lección

Mezclar proyectos reales con la base maestra debilita ambos.

### Regla aplicable

Usar:

- `base/masters/` para prompts, agentes, manuales, servicios y reglas
- `projects/<nombre>/` para casos reales, flujos y producción documentada
- `archive/projects/` para históricos previos o materiales no normalizados

## 11. El valor del caso real está en su reutilización

### Hallazgo

El caso GEDSI ya no es solo “un proyecto hecho”, sino una plantilla reusable.

### Lección

Cada caso bien documentado debe mejorar la capacidad del sistema para producir el siguiente.

### Regla aplicable

Después de cerrar un proyecto real, extraer:

- prompts faltantes detectados,
- reglas operativas nuevas,
- patrones de naming,
- riesgos frecuentes,
- y secuencias de producción replicables.

## 12. Estándar mínimo sugerido para futuros proyectos IA audiovisuales

### Estructura recomendada

```text
projects/<nombre>/
  00-README.md
  01-BRIEF.md
  02-GUION.md
  03-STORYBOARD-DESGLOSE-TOMAS.md
  04-RASTRO-OPERATIVO.md
  05-PROMPTS-T2I.md
  06-PROMPTS-I2V.md
  07-PLAN-DE-PRODUCCION.md
  08-CONTROL-DE-CONSISTENCIA.md
  09-PIPELINE-DE-RENDERS.md
  10-LECCIONES-APLICABLES.md
```

## Recomendación final

El aprendizaje principal de este caso es simple:

La IA acelera la producción, pero solo escala bien cuando el proyecto está estructurado como sistema.

La regla práctica para futuros casos es:

- primero estructura,
- luego consistencia,
- luego producción,
- y solo al final volumen.
