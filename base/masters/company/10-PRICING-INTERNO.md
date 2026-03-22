# Pricing Interno y Estructura de Costos

Este documento define la estructura para pricing interno y precio de venta. Puede operar desde hoy con campos pendientes y luego completarse con valores reales.

## Objetivo

- separar costo interno de precio de venta,
- estandarizar margenes,
- evitar cotizaciones arbitrarias,
- preparar el workspace para una futura automatizacion comercial.

## Campos obligatorios por servicio

| field | descripcion |
| :--- | :--- |
| `service_code` | codigo unico del servicio |
| `cost_type` | fijo, variable o mixto |
| `internal_cost_base` | costo interno minimo |
| `recommended_margin_pct` | margen recomendado |
| `sale_price_floor` | precio minimo permitido |
| `sale_price_target` | precio objetivo |
| `rush_fee_pct` | recargo por urgencia |
| `revision_extra_fee` | cargo por revision adicional |
| `travel_fee_rule` | regla de viaticos o desplazamiento |
| `approval_required` | si requiere aprobacion para bajar precio |

## Regla general de pricing

- `sale_price_floor` nunca debe ser menor al costo interno total.
- `sale_price_target` debe considerar margen, carga operativa, riesgo y soporte.
- descuentos por debajo del piso requieren aprobacion comercial.
- urgencias, alcance cambiante o multiples revisiones deben tener recargo visible.

## Plantilla base para completar

| service_code | service_name | cost_type | internal_cost_base | recommended_margin_pct | sale_price_floor | sale_price_target | rush_fee_pct | revision_extra_fee | travel_fee_rule | approval_required | status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `AV-001` | Grabacion en Quito | mixto | PENDIENTE | 40-60 | PENDIENTE | PENDIENTE | 20-30 | PENDIENTE | no aplica dentro de Quito salvo horas extra | si | pendiente |
| `AV-002` | Grabacion en Sierra | mixto | PENDIENTE | 45-65 | PENDIENTE | PENDIENTE | 20-30 | PENDIENTE | incluir viaticos y transporte | si | pendiente |
| `AV-003` | Grabacion en Costa | mixto | PENDIENTE | 45-65 | PENDIENTE | PENDIENTE | 20-30 | PENDIENTE | incluir viaticos y transporte | si | pendiente |
| `AV-004` | Edicion de Video | mixto | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | 20-30 | PENDIENTE | no aplica | si | pendiente |
| `AV-005` | Video Corporativo | mixto | PENDIENTE | 50-70 | PENDIENTE | PENDIENTE | 25-35 | PENDIENTE | segun locacion | si | pendiente |
| `AV-006` | Video Animado 2D | mixto | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 25-35 | PENDIENTE | no aplica | si | pendiente |
| `AV-007` | Video Formato Vertical | variable | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | 20-30 | PENDIENTE | no aplica | no | pendiente |
| `AV-008` | Subtitulacion | variable | PENDIENTE | 40-60 | PENDIENTE | PENDIENTE | 15-25 | PENDIENTE | no aplica | no | pendiente |
| `AV-009` | Traduccion de Video | variable | PENDIENTE | 40-60 | PENDIENTE | PENDIENTE | 15-25 | PENDIENTE | no aplica | no | pendiente |
| `AV-010` | Produccion Radial | mixto | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | 20-30 | PENDIENTE | no aplica | si | pendiente |
| `AV-011` | Locucion Espanol | variable | PENDIENTE | 40-60 | PENDIENTE | PENDIENTE | 15-25 | PENDIENTE | no aplica | no | pendiente |
| `AV-012` | Locucion Ingles | variable | PENDIENTE | 45-65 | PENDIENTE | PENDIENTE | 15-25 | PENDIENTE | no aplica | no | pendiente |
| `AV-013` | Podcast (A/V) | mixto | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | 20-30 | PENDIENTE | segun locacion | si | pendiente |
| `AV-014` | Sesion Fotografica | mixto | PENDIENTE | 45-65 | PENDIENTE | PENDIENTE | 20-30 | PENDIENTE | segun locacion | si | pendiente |
| `AV-015` | Cobertura Evento | mixto | PENDIENTE | 45-65 | PENDIENTE | PENDIENTE | 20-30 | PENDIENTE | segun jornada y traslado | si | pendiente |
| `AV-016` | Fotografia Producto | mixto | PENDIENTE | 45-65 | PENDIENTE | PENDIENTE | 20-30 | PENDIENTE | segun retiro/entrega | si | pendiente |
| `MK-001` | Analisis de Redes | fijo | PENDIENTE | 50-70 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | no | pendiente |
| `MK-002` | Estrategia Digital | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `MK-003` | Community Manager | mixto | PENDIENTE | 45-65 | PENDIENTE | PENDIENTE | no aplica | PENDIENTE | no aplica | si | pendiente |
| `MK-004` | Pauta Digital | mixto | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | no aplica | PENDIENTE | no aplica | si | pendiente |
| `BR-001` | Diseno de Identidad | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `BR-002` | Diseno Presentacion | variable | PENDIENTE | 45-65 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | no | pendiente |
| `BR-003` | Diseno Impreso | variable | PENDIENTE | 45-65 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | no | pendiente |
| `BR-004` | Infografia | variable | PENDIENTE | 45-65 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | no | pendiente |
| `BR-005` | Roll Up | mixto | PENDIENTE | 35-55 | PENDIENTE | PENDIENTE | no aplica | PENDIENTE | logistica adicional segun entrega | si | pendiente |
| `BR-006` | Banner | mixto | PENDIENTE | 35-55 | PENDIENTE | PENDIENTE | no aplica | PENDIENTE | segun m2 e instalacion | si | pendiente |
| `BR-007` | Flyer (Impresion) | mixto | PENDIENTE | 35-55 | PENDIENTE | PENDIENTE | no aplica | PENDIENTE | segun lote y entrega | si | pendiente |
| `BR-008` | Tarjetas (Impresion) | mixto | PENDIENTE | 35-55 | PENDIENTE | PENDIENTE | no aplica | PENDIENTE | segun lote y entrega | si | pendiente |
| `INF-001` | Dominio .com/.org | fijo | PENDIENTE | 20-40 | PENDIENTE | PENDIENTE | no aplica | no aplica | no aplica | no | pendiente |
| `INF-002` | Dominio .ec | fijo | PENDIENTE | 20-40 | PENDIENTE | PENDIENTE | no aplica | no aplica | no aplica | no | pendiente |
| `INF-003` | Hosting Economico | fijo | PENDIENTE | 35-60 | PENDIENTE | PENDIENTE | no aplica | no aplica | no aplica | no | pendiente |
| `INF-004` | Hosting Premium | fijo | PENDIENTE | 35-60 | PENDIENTE | PENDIENTE | no aplica | no aplica | no aplica | no | pendiente |
| `INF-005` | Servidor VPS | mixto | PENDIENTE | 35-60 | PENDIENTE | PENDIENTE | 15 | no aplica | no aplica | si | pendiente |
| `INF-006` | Certificado SSL | fijo | PENDIENTE | 25-45 | PENDIENTE | PENDIENTE | no aplica | no aplica | no aplica | no | pendiente |
| `INF-007` | SSL Wildcard | fijo | PENDIENTE | 25-45 | PENDIENTE | PENDIENTE | no aplica | no aplica | no aplica | no | pendiente |
| `INF-008` | Email Corporativo | variable | PENDIENTE | 30-50 | PENDIENTE | PENDIENTE | no aplica | PENDIENTE | no aplica | no | pendiente |
| `DEV-001` | Landing Page | mixto | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20-30 | PENDIENTE | no aplica | si | pendiente |
| `DEV-002` | Web Corporativa | mixto | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20-30 | PENDIENTE | no aplica | si | pendiente |
| `DEV-003` | E-commerce | mixto | PENDIENTE | 55-80 | PENDIENTE | PENDIENTE | 25-35 | PENDIENTE | no aplica | si | pendiente |
| `DEV-004` | App Movil | mixto | PENDIENTE | 55-85 | PENDIENTE | PENDIENTE | 25-35 | PENDIENTE | no aplica | si | pendiente |
| `DEV-005` | Sistema de Gestion | mixto | PENDIENTE | 55-85 | PENDIENTE | PENDIENTE | 25-35 | PENDIENTE | no aplica | si | pendiente |
| `DEV-006` | CRM Personalizado | mixto | PENDIENTE | 55-85 | PENDIENTE | PENDIENTE | 25-35 | PENDIENTE | no aplica | si | pendiente |
| `DEV-007` | Aplicacion Web Custom | mixto | PENDIENTE | 55-85 | PENDIENTE | PENDIENTE | 25-35 | PENDIENTE | no aplica | si | pendiente |
| `DEV-008` | Integracion API | mixto | PENDIENTE | 50-80 | PENDIENTE | PENDIENTE | 20-30 | PENDIENTE | no aplica | si | pendiente |
| `DEV-009` | Mantenimiento Web | mixto | PENDIENTE | 40-65 | PENDIENTE | PENDIENTE | no aplica | PENDIENTE | no aplica | si | pendiente |
| `DEV-010` | Soporte Tecnico | variable | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | no aplica | no aplica | no aplica | si | pendiente |
| `IA-001` | Chatbot Informativo | mixto | PENDIENTE | 50-80 | PENDIENTE | PENDIENTE | 20-30 | PENDIENTE | no aplica | si | pendiente |
| `IA-002` | Automatizacion con IA | mixto | PENDIENTE | 55-85 | PENDIENTE | PENDIENTE | 25-35 | PENDIENTE | no aplica | si | pendiente |
| `PR-001` | Comunicado de Prensa | fijo | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | no | pendiente |
| `PR-002` | Plan de Comunicacion | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `PR-003` | Media Training | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `PR-004` | Plan de Crisis | fijo | PENDIENTE | 55-80 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `PR-005` | Monitoreo de Medios | mixto | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | no aplica | PENDIENTE | no aplica | si | pendiente |
| `PR-006` | Comunicacion Interna | fijo | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `DAT-001` | Dashboard de KPIs | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `DAT-002` | Plan de Medicion | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `DAT-003` | Auditoria de Datos | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `DAT-004` | Informe de Insights | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `DAT-005` | Configuracion GA4 + GTM | mixto | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `MED-001` | Plan de Medios Integral | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `MED-002` | Campana Meta Ads | mixto | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | no aplica | PENDIENTE | no aplica | si | pendiente |
| `MED-003` | Campana Google Ads | mixto | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | no aplica | PENDIENTE | no aplica | si | pendiente |
| `MED-004` | Campana TikTok Ads | mixto | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | no aplica | PENDIENTE | no aplica | si | pendiente |
| `MED-005` | Auditoria SEO | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `MED-006` | SEO Mensual | mixto | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | no aplica | PENDIENTE | no aplica | si | pendiente |
| `MED-007` | Local SEO | fijo | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `BIZ-001` | Diagnostico de Madurez Digital | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `BIZ-002` | Estrategia Go-to-Market | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `BIZ-003` | Business Model Canvas | fijo | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | no | pendiente |
| `BIZ-004` | Taller de Design Thinking | fijo | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | no | pendiente |
| `ECO-001` | Estrategia E-commerce | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `ECO-002` | Optimizacion de Marketplace | fijo | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `ECO-003` | Social Commerce | fijo | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `ECO-004` | CRO (Conversion Rate) | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `CX-001` | Customer Journey Map | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `CX-002` | Implementacion CRM | mixto | PENDIENTE | 50-80 | PENDIENTE | PENDIENTE | 20-30 | PENDIENTE | no aplica | si | pendiente |
| `CX-003` | Email Marketing | mixto | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | no aplica | PENDIENTE | no aplica | si | pendiente |
| `CX-004` | Programa de Fidelizacion | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `CX-005` | Auditoria CX | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `CNT-001` | Estrategia de Contenidos | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `CNT-002` | Brand Voice System | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `CNT-003` | Arquitectura de Mensajes | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `IMK-001` | Estrategia de Influencer Marketing | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `IMK-002` | Gestion de Campana con Creadores | mixto | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `IMK-003` | Creator Sourcing y Outreach | fijo | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | no | pendiente |
| `EXP-001` | Concepto de Evento o Activacion | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | segun ciudad o venue | si | pendiente |
| `EXP-002` | Diseno de Experiencia y Run of Show | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | segun ciudad o venue | si | pendiente |
| `EXP-003` | Amplificacion de Evento | mixto | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | segun cobertura y traslado | si | pendiente |
| `HLT-001` | Estrategia Healthcare Marketing | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `HLT-002` | Embudo de Captacion de Pacientes | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `HLT-003` | Contenido Educativo para Pacientes | mixto | PENDIENTE | 45-70 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `ESG-001` | Estrategia de Comunicacion ESG | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `ESG-002` | Reporte de Sostenibilidad Narrativo | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |
| `ESG-003` | Mensajeria para Stakeholders ESG | fijo | PENDIENTE | 50-75 | PENDIENTE | PENDIENTE | 20 | PENDIENTE | no aplica | si | pendiente |

## Reglas de descuento

- descuento maximo sin aprobacion: `0% - 10%` sobre precio objetivo.
- descuento `11% - 20%`: aprobacion comercial.
- descuento `>20%`: aprobacion comercial y validacion de margen.
- no se puede aplicar descuento si el precio cae por debajo de `sale_price_floor`.

## Reglas de recargo

- urgencia menor a 72 horas: aplicar `rush_fee_pct`.
- revisiones fuera del paquete: aplicar `revision_extra_fee`.
- cambios de alcance: recalcular precio y emitir anexo o nueva propuesta.

## Estado actual

Este documento queda listo para completarse con costos reales. La estructura ya soporta cotizacion manual o futura integracion a sistema.
