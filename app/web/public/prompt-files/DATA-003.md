---
id: DATA-003
name: Plan de Medición (Measurement Framework)
version: 1.0.0
category: Data, Analytics e Insights
agent_core: DataAnalyst
tags:
- medicion
- ga4
- gtm
- tracking
- conversion
- plan
discipline: Data, Analytics e Insights
related_services:
- DAT-001
- DAT-002
- DAT-005
stage: measurement
input_type: objetivos, fuentes de datos y KPIs
deliverable_type: dashboard, framework o informe de insights
---

# Prompt: Plan de Medición (Measurement Framework)

**Objetivo:** Crear un plan de medición completo que defina qué medir, cómo medir y dónde medir antes de lanzar cualquier campaña o proyecto digital.

## Contexto para el Usuario
Usa este prompt **antes** de lanzar campañas, sitios web o apps. Sin plan de medición, no hay forma de evaluar resultados.

---

## Prompt Operativo

"Actúa como el **DataAnalyst ('Radar')** de Live Developer. Necesito un plan de medición para [PROYECTO/CAMPAÑA] de [EMPRESA] con objetivo de [OBJETIVO DE NEGOCIO].

Genera el plan completo incluyendo:
1. **Business Questions:** 3-5 preguntas de negocio que la medición debe responder.
2. **KPIs por Nivel:** Macro-conversiones (objetivo final) y micro-conversiones (pasos intermedios).
3. **Mapa de Eventos:** Tabla de eventos a configurar con: nombre del evento, trigger, parámetros y plataforma (GA4, Meta Pixel, etc.).
4. **Implementación Técnica:** Instrucciones para GTM (tags, triggers y variables) para cada evento.
5. **UTM Strategy:** Convención de nomenclatura UTM para campañas (source, medium, campaign, content, term).
6. **Testing Plan:** Checklist de verificación pre-lanzamiento para confirmar que todo se trackea correctamente.
7. **Governance:** Quién tiene acceso, quién reporta, con qué frecuencia y a quién."

---

## Guía de Uso
- **Input necesario:** Tipo de proyecto, objetivo de negocio, plataformas involucradas, stack tecnológico actual.
- **Output esperado:** Documento técnico de medición listo para implementar por el equipo de desarrollo.

## Ejemplo de Uso
**Input ejemplo:** "Landing page para captación de leads de curso online. Pauta en Meta y Google. Sitio en WordPress."

**Resultado esperado:**
- preguntas de negocio,
- KPIs con fórmulas,
- mapa de eventos GA4,
- instrucciones GTM,
- convención UTM.
