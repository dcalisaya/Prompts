---
id: DATA-001
name: Dashboard de KPIs para Cliente
version: 1.0.0
category: Data, Analytics e Insights
agent_core: DataAnalyst
tags:
- dashboard
- kpis
- ga4
- looker-studio
- reporting
discipline: Data, Analytics e Insights
related_services:
- DAT-001
- DAT-002
- DAT-005
stage: measurement
input_type: objetivos, fuentes de datos y KPIs
deliverable_type: dashboard, framework o informe de insights
---

# Prompt: Dashboard de KPIs para Cliente

**Objetivo:** Diseñar la estructura completa de un dashboard ejecutivo con KPIs accionables, fuentes de datos y lógica de visualización.

## Contexto para el Usuario
Usa este prompt cuando necesites crear un dashboard para un cliente nuevo o reestructurar el reporting de un cliente existente.

---

## Prompt Operativo

"Actúa como el **DataAnalyst ('Radar')** de Live Developer. Necesito diseñar un dashboard de KPIs para [EMPRESA/CLIENTE] del sector [INDUSTRIA] con objetivo principal de [OBJETIVO].

Diseña la estructura completa incluyendo:
1. **KPIs Principales (North Star + 4 soporte):** Definición, fórmula de cálculo y frecuencia de medición.
2. **Fuentes de Datos:** Plataformas a conectar (GA4, Meta Ads, CRM, etc.) con campos específicos.
3. **Layout del Dashboard:** Secciones (resumen ejecutivo, adquisición, comportamiento, conversión, ROI) con tipo de gráfico recomendado.
4. **Filtros y Segmentos:** Dimensiones clave para cortar la data (fecha, canal, campaña, dispositivo, ubicación).
5. **Alertas y Umbrales:** Valores de referencia (benchmarks) que disparan alertas automáticas.
6. **Cadencia de Reporting:** Frecuencia (diario, semanal, mensual) y audiencia de cada nivel de reporte."

---

## Guía de Uso
- **Input necesario:** Tipo de negocio, objetivo principal, plataformas actuales, audiencia del reporte.
- **Output esperado:** Especificación completa del dashboard lista para implementar en Looker Studio o Power BI.

## Ejemplo de Uso
**Input ejemplo:** "E-commerce de ropa con Shopify, pauta en Meta y Google. Objetivo: aumentar ROAS de 2.5 a 4.0."

**Resultado esperado:**
- KPIs jerarquizados,
- fuentes de datos con campos,
- layout con gráficos,
- filtros clave,
- benchmarks por métrica.
