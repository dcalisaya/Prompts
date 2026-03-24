# Agent Compatibility Matrix

## Proposito

Este documento define cómo evaluar agentes distintos sobre el mismo repo y el mismo protocolo operativo.

## Objetivo

Evitar dependencia de un solo proveedor o runtime.

La librería debe poder operar con varios agentes siempre que respeten:

- la fuente de verdad
- el estándar de intake
- el estándar de salida
- el protocolo operativo

## Agentes a evaluar

Matriz inicial sugerida:

- Codex
- Gemini CLI
- Kimi
- OpenCode
- cualquier otro agente local o por terminal que use contexto del repo

## Criterios de evaluación

### 1. Lectura de contexto local

Preguntas:

- ¿lee bien archivos del repo?
- ¿encuentra rápido la fuente canónica?
- ¿confunde `app/web` con fuente de verdad?

## 2. Disciplina de protocolo

Preguntas:

- ¿sigue el intake correcto?
- ¿pregunta antes de asumir?
- ¿respeta la jerarquía `docs -> base -> projects`?

## 3. Detección de ambigüedad

Preguntas:

- ¿detecta vacíos reales?
- ¿pregunta lo correcto?
- ¿evita cerrar alcance demasiado pronto?

## 4. Calidad de salida

Preguntas:

- ¿la respuesta es operativa?
- ¿es clara para usuarios no técnicos?
- ¿es útil en comercial, producción y revisión?

## 5. Consistencia

Preguntas:

- ¿mantiene criterio entre casos similares?
- ¿depende demasiado de wording exacto?
- ¿se degrada rápido con solicitudes ambiguas?

## 6. Portabilidad

Preguntas:

- ¿funciona bien solo con archivos locales?
- ¿requiere un wrapper complejo?
- ¿tolera repos grandes sin perder dirección?

## Escala sugerida

Usar escala simple:

- `alto`
- `medio`
- `bajo`

o numérica:

- `1` a `5`

## Tabla base

| Agente | Contexto local | Sigue protocolo | Detecta ambigüedad | Calidad de salida | Portabilidad | Observaciones |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Codex | pendiente | pendiente | pendiente | pendiente | pendiente | pendiente |
| Gemini CLI | pendiente | pendiente | pendiente | pendiente | pendiente | pendiente |
| Kimi | pendiente | pendiente | pendiente | pendiente | pendiente | pendiente |
| OpenCode | pendiente | pendiente | pendiente | pendiente | pendiente | pendiente |

## Suite mínima de validación

Todos los agentes deben probarse con al menos estos casos:

1. proforma de video animado
2. propuesta de 36 podcasts
3. campaña con landing + pauta + CRM
4. revisión de propuesta antes de enviar
5. proyecto aprobado que pasa a ejecución

## Señales de compatibilidad alta

Un agente tiene buena compatibilidad cuando:

- entra por la necesidad y no por archivos
- respeta la fuente de verdad
- usa `projects/` como evidencia, no como norma
- pregunta poco pero bien
- devuelve salida accionable

## Señales de compatibilidad baja

Un agente tiene mala compatibilidad cuando:

- se pierde navegando archivos
- toma `app/web` como referencia normativa
- mezcla demasiadas fuentes sin jerarquía
- no detecta vacíos críticos
- responde bonito pero poco útil

## Regla de adopción

Un agente no debería considerarse apto para operación si no supera la suite mínima con consistencia aceptable.

## Regla de mantenimiento

Cada vez que se pruebe un agente nuevo:

- registrar resultado en esta matriz
- documentar debilidades reales
- ajustar el protocolo si el problema es estructural y no del agente
