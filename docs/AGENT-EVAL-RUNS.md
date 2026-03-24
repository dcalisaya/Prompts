# Agent Eval Runs

## Proposito

Este documento registra corridas reales de evaluación sobre agentes distintos.

## Regla

Cada corrida debe basarse en `AGENT-EVAL-TEMPLATE.md`.

## 2026-03-23

### Codex

- estado: onboarding aprobado
- lectura principal: framework operativo gobernado por datos
- señales positivas:
  - entendió `base` como verdad
  - entendió `projects` como memoria operativa
  - reconoció la relación entre prompts, agentes y servicios
- observaciones:
  - falta validar ejecución real con casos operativos

### Gemini CLI

- estado: onboarding aprobado
- lectura principal: ecosistema de automatización y gestión de servicios profesionales impulsado por IA
- señales positivas:
  - entendió agentes, manuales, prompts y casos reales
  - no tomó `app/web` como fuente normativa
- observaciones:
  - conviene vigilar que no sobredimensione la capa producto sobre la base canónica

### Ollama + gpt-oss-20b

- estado: onboarding aprobado
- lectura principal: workspace de referencia central para documentación operativa y lógica consultada por agentes
- señales positivas:
  - lectura sobria y bastante alineada con la estructura real
  - reconoció `app/web` como consumidor
  - entendió `archive` como fuera del flujo activo
- observaciones:
  - falta validar desempeño en casos reales y manejo de ambigüedad

## Próxima ronda de pruebas

Casos a correr para todos:

1. proforma de video animado
2. propuesta de 36 podcasts con pauta
3. revisión antes de enviar
4. paso a ejecución de proyecto aprobado

## Regla de mantenimiento

Este archivo no debe usarse para opiniones informales.

Cada entrada debe registrar:

- qué agente se probó
- qué entendió bien
- qué entendió mal
- si pasó o no pasó la prueba del workspace
