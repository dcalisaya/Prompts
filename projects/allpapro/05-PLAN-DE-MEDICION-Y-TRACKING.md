# Plan de Medición y Tracking: AllpaPro - Workshop "Logra Financiar Tu Proyecto"

**Objetivo del documento:** Definir la infraestructura mínima de medición para evaluar el rendimiento real de la captación y conversión del workshop de AllpaPro en **Google Search** y **LinkedIn**, evitando decisiones de pauta basadas en métricas de vanidad.

## 1. Principio Rector

No se debe optimizar la pauta por:

- impresiones,
- clics aislados,
- tráfico bruto,
- ni formularios sin contexto.

La medición debe responder a una pregunta central:

**¿Qué canal, campaña, mensaje y segmento está generando registros o leads realmente calificados para vender el workshop?**

## 2. Objetivo de Medición

La infraestructura debe permitir medir:

- origen del tráfico,
- calidad del lead,
- comportamiento en landing,
- intención de registro,
- conversión final,
- y, si es posible, cierre comercial.

## 3. Evento Principal de Negocio

El evento principal debe definirse según la operación real de la landing:

### Escenario A. Venta directa

- **Evento principal:** compra del workshop

### Escenario B. Registro previo / lead antes de pago

- **Evento principal:** lead calificado o registro completado

### Escenario C. Formulario de intención

- **Evento principal:** envío de formulario con datos completos

## Recomendación actual

Hasta que se confirme el flujo de pago, usar como evento principal:

- **Lead / Registro calificado**

y como evento secundario:

- **Inicio de registro**

## 4. Stack de Medición Recomendado

### Base mínima

- Google Tag Manager
- Google Analytics 4
- Google Ads Conversion Tracking
- LinkedIn Insight Tag

### Capa deseable

- integración con CRM o base de leads,
- UTMs limpias,
- thank you page o evento de conversión inequívoco,
- trazabilidad por fuente, campaña y anuncio.

## 5. Eventos Recomendados

## Evento 1. `page_view`

- Página vista en landing.
- Sirve para volumen base y segmentación.

## Evento 2. `scroll_50`

- Usuario llega al 50% de scroll.
- Indica consumo real de contenido.

## Evento 3. `scroll_90`

- Usuario llega al 90% de scroll.
- Indica alta intención o interés serio.

## Evento 4. `cta_click_primary`

- Clic en CTA principal de la landing.
- Permite medir intención de avance.

## Evento 5. `cta_click_secondary`

- Clic en CTA secundario si existe.

## Evento 6. `form_start`

- Usuario interactúa con el formulario por primera vez.

## Evento 7. `form_submit`

- Usuario envía el formulario correctamente.
- Este es el evento mínimo que debe quedar capturado.

## Evento 8. `checkout_start`

- Si existe paso de pago o reserva.

## Evento 9. `purchase`

- Si existe pago directo.
- Debe capturar valor monetario y moneda.

## Evento 10. `thank_you_view`

- Visita a página de gracias.
- Útil para validar conversión final cuando no hay compra inmediata.

## 6. Mapa de Conversión Recomendado

### Nivel 1. Tráfico

- `page_view`
- fuente / medio
- campaña
- contenido

### Nivel 2. Engagement

- `scroll_50`
- `scroll_90`
- `cta_click_primary`

### Nivel 3. Intención

- `form_start`
- `checkout_start`

### Nivel 4. Conversión

- `form_submit`
- `thank_you_view`
- `purchase`

## 7. Convención UTM Recomendada

Usar UTMs consistentes y sin improvisación.

### Estructura base

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

### Ejemplos

#### Google Search

- `utm_source=google`
- `utm_medium=cpc`
- `utm_campaign=allpapro_search_fondos_latam`
- `utm_content=rsa_dolor_01`
- `utm_term=como_postular_a_fondos`

#### LinkedIn

- `utm_source=linkedin`
- `utm_medium=paid-social`
- `utm_campaign=allpapro_linkedin_dolor_latam`
- `utm_content=singleimage_hook80_01`

## Regla

Toda campaña debe salir con nomenclatura estandarizada.
No mezclar nombres improvisados entre plataformas.

## 8. Convención de Nomenclatura de Campañas

### Google Search

Formato sugerido:

`ALLPAPRO_GS_OBJETIVO_MERCADO_INTENCION`

Ejemplos:

- `ALLPAPRO_GS_CONV_LATAM_FONDOS`
- `ALLPAPRO_GS_CONV_LATAM_POSTULACION`
- `ALLPAPRO_GS_CONV_USLATAM_WORKSHOP`

### LinkedIn

Formato sugerido:

`ALLPAPRO_LI_OBJETIVO_MERCADO_ANGULO`

Ejemplos:

- `ALLPAPRO_LI_TRAFFIC_LATAM_DOLOR`
- `ALLPAPRO_LI_CONV_LATAM_METODO`
- `ALLPAPRO_LI_RETARGET_LATAM_CIERRE`

## 9. Conversiones por Plataforma

## Google Ads

Importar o configurar como conversiones principales:

- `form_submit`
- `thank_you_view`
- `purchase` si existe

### Prioridad

- optimizar primero por la conversión más cercana al negocio real,
- no por clic ni permanencia.

## LinkedIn Ads

Configurar:

- website conversion para `form_submit` o `thank_you_view`
- audiencias de retargeting por visitantes y CTA clicks si la implementación lo permite

## 10. Métricas Clave por Nivel

## Métricas de tráfico

- sesiones
- usuarios
- CTR
- CPC
- CPM en LinkedIn

## Métricas de engagement

- scroll depth
- tiempo en página
- CTR a CTA
- porcentaje de form start

## Métricas de conversión

- tasa de conversión landing
- costo por form submit
- costo por lead
- costo por registro
- costo por compra

## Métricas de calidad

- porcentaje de leads con proyecto activo
- porcentaje de leads con organización real
- país / mercado de lead
- cargo o tipo de organización si el formulario lo recoge

## 11. Calidad del Lead

La pauta no debe evaluarse solo por volumen.

Se recomienda clasificar leads con al menos estos campos:

- nombre,
- correo,
- organización,
- país,
- tipo de proyecto,
- etapa del proyecto,
- principal necesidad.

### Lead calificado mínimo

Un lead puede considerarse más valioso si:

- tiene proyecto activo,
- pertenece a una organización o iniciativa real,
- expresa interés concreto en financiamiento,
- y encaja con el ICP del workshop.

## 12. Dashboard Recomendado

## Vista 1. Resumen ejecutivo

- inversión total,
- leads,
- CPL,
- registros,
- costo por registro,
- conversion rate,
- top canal.

## Vista 2. Rendimiento por canal

- Google Search vs LinkedIn
- CTR
- CPC / CPM
- conversion rate
- costo por lead

## Vista 3. Rendimiento por campaña

- campaña
- inversión
- clics
- leads
- registros
- CPL
- tasa de conversión

## Vista 4. Calidad de leads

- país
- tipo de organización
- etapa del proyecto
- fuente
- porcentaje de leads útiles

## 13. Reglas de Gobernanza de Datos

- No lanzar pauta sin GTM y GA4 instalados.
- No optimizar por leads si no existe validación mínima de calidad.
- No cambiar nombres de UTMs a mitad de campaña sin documentarlo.
- No mezclar eventos duplicados entre GA4, Google Ads y LinkedIn sin control.
- No declarar una campaña ganadora si no mejora una métrica de negocio real.

## 14. Checklist de Implementación

- GTM instalado en landing.
- GA4 configurado.
- Eventos base definidos.
- Google Ads Conversion Tracking configurado.
- LinkedIn Insight Tag configurado.
- Thank you page o evento final validado.
- UTMs estandarizadas.
- Convención de nombres aprobada.
- Prueba de eventos en entorno real.
- Validación de envío de datos antes de prender presupuesto.

## 15. Vacíos Pendientes

Este plan aún depende de confirmar:

- si la conversión final será lead, registro o compra,
- si existe checkout o solo formulario,
- qué datos recoge actualmente la landing,
- si existe CRM,
- si habrá seguimiento comercial manual o automatizado,
- qué dashboard se usará como fuente oficial,
- y precio final del workshop para medir costo por venta con criterio.

## 16. Revisión del Proyecto con Agentes Relevantes

## PerformanceMarketer

El proyecto ya está bien encaminado en captación, estructura de campañas y lógica de mensajes. La principal brecha desde este agente es que faltaba la **infraestructura de medición** previa al gasto. Este documento corrige esa omisión y alinea el proyecto con su protocolo: no desplegar presupuesto sin tracking funcional.

## MediaPlanner

La mezcla de canales ya tiene una dirección razonable: Google Search como intención y LinkedIn como validación profesional. La brecha pendiente no es conceptual, sino presupuestaria: aún falta definir presupuesto real, mercados prioritarios de arranque y criterio de distribución por etapa.

## SEOSpecialist

La parte de Search ya tiene una base táctica útil, pero todavía falta un mapeo más fino entre:

- keyword,
- intención,
- landing section,
- y mensaje post-click.

Ese ajuste será importante para mejorar Quality Score y conversión.

## ContentStrategist

La narrativa central está consistente y ya tiene:

- mensaje maestro,
- pilares,
- hooks,
- variantes por canal.

La siguiente brecha natural sería ordenar una **arquitectura editorial corta** para nutrir LinkedIn orgánico y remarketing con una voz aún más consistente.

## BusinessConsultant

El proyecto ya tiene una propuesta más clara que al inicio, pero desde negocio siguen abiertos vacíos críticos:

- precio,
- modalidad,
- proceso de pago,
- credenciales,
- y política de cierre comercial.

Sin esos datos, la campaña puede quedar bien armada técnicamente, pero no completamente defendible como sistema comercial.

## Conclusión de la Revisión

El proyecto AllpaPro ya tiene una base sólida en:

- brief,
- funnel,
- arquitectura de campañas,
- copy,
- y medición.

Las brechas restantes ya no son de estructura estratégica principal, sino de **definición operativa y comercial**.

## Acción Requerida

- Confirmar el flujo real de conversión de la landing.
- Confirmar presupuesto y mercado inicial.
- Validar qué dato definirá un lead como calificado.
- Autorizar el siguiente entregable si quieres cerrar la capa táctica final:
  - `06-MATRIZ-DE-TESTS-Y-OPTIMIZACION.md`
  - o `06-BRIEF-DE-LANDING-Y-CHECKOUT.md`
