---
id: MAN-DAT-001
name: Guía Maestra de Medición Digital
category: Data, Analytics e Insights
discipline: Data, Analytics e Insights
type: guia-maestra
version: 1.0.0
related_services: ["DAT-001", "DAT-002", "DAT-003", "DAT-004", "DAT-005"]
related_agents: ["DataAnalyst", "InsightsStrategist"]
related_prompts: ["DATA-001", "DATA-002", "DATA-003"]
source_of_truth: true
tags: [medicion, analytics, ga4, gtm, kpi, dashboard, atribucion]
---

# Guía Maestra de Medición Digital
## Marco de Medición, Implementación y Uso de Analytics

Esta guía establece los principios rectores para el diseño, implementación y operación de sistemas de medición digital. Es la fuente de verdad para los agentes DataAnalyst e InsightsStrategist y los prompts DATA-001 a DATA-003.

---

## 1. Los Tres Componentes de un Sistema de Medición

Todo sistema de medición digital se compone de tres capas:

```
CAPA 1: RECOLECCIÓN (Tags)
├── Qué datos se capturan
├── Dónde se capturan (sitio, app, plataforma)
└── Con qué herramienta (GA4, GTM, pixels)

CAPA 2: PROCESAMIENTO (Configuración)
├── Cómo se procesan los datos
├── Modelos de atribución
├── Eventos y conversiones
└── Filtros y segmentos

CAPA 3: VISUALIZACIÓN (Consumo)
├── Quién consume los datos
├── Con qué frecuencia
├── En qué formato
└── Para qué decisiones
```

Sin la Capa 1, no hay datos. Sin la Capa 2, los datos son ruido. Sin la Capa 3, los datos no se usan.

---

## 2. El Marco de Medición: Del Negocio al Dato

### 2.1 Pirámide de KPIs

```
                    ┌─────────────────┐
                    │   BUSINESS KPIs │
                    │ Revenue, LTV,   │
                    │ CAC, Churn Rate  │
                    ├─────────────────┤
                    │  CAMPAIGN KPIs  │
                    │ ROAS, CPA, CPM, │
                    │ CTR, CR, AOV    │
                    ├─────────────────┤
                    │  BEHAVIORAL KPIs│
                    │ Sessions, Pages │
                    │ /Session, Bounce│
                    ├─────────────────┤
                    │   TECHNICAL KPIs │
                    │ Page Speed,     │
                    │ Errors, Uptime   │
                    └─────────────────┘
```

### 2.2 Definición de Objetivos por Tipo de Cliente

| Tipo de Cliente | Objetivo Principal | KPIs Clave | Métrica de Éxito |
|:----------------|:------------------|:-----------|:----------------|
| **E-commerce** | Venta online | Revenue, ROAS, Conversion Rate | Revenue > [meta] |
| **Lead Generation** | Captación de leads | CPL, Lead quality, Cost per lead | Leads > [meta] a CPL < [tope] |
| **Brand / Awareness** | Reconocimiento | Reach, Impressions, CPM | CPM efectivo < benchmark |
| **SaaS / Suscripción** | Activación y retención | Signups, Activation rate, Churn | Trial → Paid > [tasa] |
| **Contenido / Media** | Engagement | Page views, Time on site, Scroll depth | Pages/session > [X] |
| **App Móvil** | Engagement + Retention | DAU/MAU, Sessions, In-app events | DAU > [X], Retention D7 > [Y]% |

---

## 3. Implementación: GA4 + GTM

### 3.1 Arquitectura de un Container GTM

```
CONTAINER GTM: [CLIENTE] - [ENTORNO]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TAGS DE PLATAFORMA
├── Google Analytics 4 (GA4)
│   ├── Page view (all pages)
│   ├── Scroll tracking
│   ├── Site search tracking
│   └── Outbound link tracking
├── Google Ads Conversion Tag
│   ├── Purchase / Lead / Submit
│   └── Remarketing audiences
├── Meta Pixel
│   ├── PageView
│   ├── ViewContent
│   ├── AddToCart
│   ├── InitiateCheckout
│   ├── AddPaymentInfo
│   └── Purchase
└── Otros pixels (TikTok, LinkedIn, etc.)
    └── Según plataforma de campaña activa

TRIGGERS
├── All Pages (pageview)
├── Specific Pages (conversions)
├── Scroll Depth (engagement)
├── Form Submit (lead capture)
├── Click → External Link (referral)
├── Video Play (engagement)
└── E-commerce (según platforma)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 3.2 Eventos GA4: Estandar vs. Personalizados

**Eventos Estandar de GA4 (automáticos):**
- `page_view`
- `first_visit`
- `session_start`
- `user_engagement`
- `app_exception`

**Eventos Recomendados por Plataforma:**

| Plataforma | Eventos a Configurar |
|:-----------|:-------------------|
| **E-commerce** | view_item, add_to_cart, begin_checkout, add_payment_info, purchase |
| **Lead Gen** | generate_lead, form_submit, contact |
| **SaaS** | sign_up, tutorial_begin, tutorial_complete, subscription_start |
| **Contenido** | video_start, video_complete, page_scroll, share |

### 3.3 Setup de Conversiones en GA4

```
JERARQUÍA DE CONVERSIONES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MACRO-CONVERSIONES (KPIs de negocio)
└── Purchase / Lead submit / Subscription
    Frecuencia: rara, impacto alto
    Usar para: aprendizaje algorítmico

MICRO-CONVERSIONES (engagement avanzado)
├── Add to cart
├── Initiate checkout
├── Sign up
└── Video complete
    Frecuencia: moderada, indicador de intención
    Usar para: remarketing, audiencias

CONVERSIONES DE CALIDAD
├── Scroll 75%+ (engagement real)
├── Time on site > 2min (interés real)
├── Page depth > 3 (exploración real)
    Frecuencia: frecuente, filtro de calidad
    Usar para: audiencias de alta intención
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 4. Modelos de Atribución y Reporting

### 4.1 Modelos de Atribución en GA4

| Modelo | Crédito | Mejor para |
|:------|:-------|:----------|
| **Direct** (no_interaction) | Última interacción directa | Recuperación de carritos |
| **Paid channels** | Último clic de canal pagado | Optimización de pauta |
| **Paid and organic** | Último clic de búsqueda | SEO + SEM holístico |
| **All channels** | Último clic de cualquier canal | Análisis completo |
| **First touch / Cross-channel** | Primera interacción | Estrategia de adquisición |
| **Data-driven** | Algoritmo de ML de GA4 | Optimización avanzada |

### 4.2 Cómo Leer Reports de GA4

```
SECCIONES PRIORITARIAS DE GA4
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ADQUISICIÓN
├── Traffic Acquisition: De dónde vienen los usuarios
├── User Acquisition: Primera fuente por usuario
└── Session channels: Canales por sesión
   → Usar para: Dónde invertir en adquisición

2. ENGAGEMENT
├── Pages and screens: Contenido más visto
├── Events: Interacciones específicas
├── Conversions: Eventos marcados como conversión
└── Cohorts: Retención por cohorte
   → Usar para: Optimizar contenido y UX

3. MONETIZATION (si aplica)
├── Revenue: Datos de e-commerce
├── Publisher ads: Ingresos AdSense
└── User lifetime: Valor proyectado
   → Usar para: Entender rentabilidad

4. DEMOGRAPHY
├── Overview: Edad, género, intereses
└── Geo: País, ciudad, idioma
   → Usar para: Segmentar audiencias
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 5. Auditoría de Medición: Checklist

### 5.1 Auditoría de Tags

| Verificación | Método | Qué buscar |
|:-----------|:-------|:---------|
| **GA4 instalado** | GA4 DebugView o Tag Assistant | page_view firing en cada página |
| **Conversiones disparando** | GA4 DebugView + GTM Preview | eventos de conversión con parámetros |
| **Meta Pixel** | Meta Pixel Helper | PageView + eventos correctos |
| **Google Ads** | Tag Assistant | Conversion ID + Label correctos |
| **Duplicación** | Tag Assistant | No más de 1 GA4 por página |
| **GTM Preview** | GTM Preview Mode | Tags disparando en los triggers correctos |

### 5.2 Auditoría de Datos

| Problema Común | Diagnóstico | Solución |
|:--------------|:-----------|:---------|
| Conversiones infladas | Verificar deduplicación de transacciones | Confirmar transaction ID único |
| Datos faltantes | Cross-domain tracking | Configurar referral exclusion list |
| Alta tasa de rebote | Segmentar por fuente | Evaluar calidad del tráfico |
| Números diferentes entre plataformas | Attribution model differs | Estandarizar modelo en reporting |
| Eventos duplicados | GTM + hardcoded tags | Consolidar en GTM solo |

### 5.3 Checklist de Auditoría Completa

```
□ GA4 funcionando en todas las páginas
□ Pageview es el evento base
□ Scroll tracking configurado (75% depth)
□ Site search tracking (si hay search)
□ Eventos de comercio configurados (GA4 + Pixel)
□ Conversiones de Google Ads linkage correcto
□ Meta Pixel con eventos correctos
□ CAPI de Meta configurado (si > 100 eventos/semana)
□ Referral exclusion list configurada (dominio.com, checkout)
□ Filtros de bots en GA4 activos
□ Goals/Conversiones en GA4 correctos
□ Dashboard de KPIs configurado
□ Segmentos de audiencia creados
□ Alertas automáticas configuradas
□ Data retention en GA4: 14 meses (máximo)
```

---

## 6. Dashboard de KPIs: Diseño

### 6.1 Estructura de un Dashboard Efectivo

```
DASHBOARD DE KPIs - ESTRUCTURA ESTANDAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECCIÓN 1: RESUMEN EJECUTIVO (1 pantalla)
├── KPIs principales del período
│   ├── Revenue / Conversiones
│   ├── CPA / ROAS (si aplica)
│   ├── Crecimiento vs. período anterior
│   └── Traffic total
└── Alertas y anomalías del período

SECCIÓN 2: ADQUISICIÓN (1-2 pantallas)
├── Performance por canal
│   ├── Paid vs. Organic vs. Direct vs. Referral vs. Social
│   ├── CPA / ROAS por canal
│   └── Tendencia por canal (últimos 3 meses)
└── Eficiencia de gasto publicitario

SECCIÓN 3: CONVERSIÓN (1-2 pantallas)
├── Funnel de conversión (top → bottom)
├── Tasa de conversión por fuente
├── Dispositivo: desktop vs. mobile vs. tablet
└── Productos/páginas más convertidoras

SECCIÓN 4: ENGAGEMENT Y CONTENIDO (1 pantalla)
├── Top 10 páginas por tráfico
├── Tiempo promedio en página
├── Tasa de rebote
└── Scroll depth promedio

SECCIÓN 5: AUDIENCIA (1 pantalla)
├── Demografía: edad, género
├── Geografía
├── Dispositivos
└── Nuevos vs. recurrentes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 7. Data Privacy y Compliance

### 7.1 Checklist de Consentimiento (GDPR / PDPA / LGPD)

```
COOKIE BANNER / CMP
□ Consentimiento granular (no "aceptar todo" único)
□ Opciones de拒绝/rechazar igualmente visibles
□ Categorías de cookies claras (analytics, marketing, preferences)
□ No setear cookies antes del consentimiento
□ Mecanismo de opt-out funcional
□ Actualización automática al cambiar preferencias

DATOS DE USUARIO
□ Anonimización de IPs (GA4 lo hace por defecto)
□ No enviar PII a GA4 (no email, no nombre, no teléfono)
□ Data retention configurado (14 meses máximo recomendado)
□ Derecho de eliminación configurado (si aplica)
□ DPA (Data Processing Agreement) firmado con proveedores
```

---

*Este manual es la fuente de verdad para los agentes DataAnalyst e InsightsStrategist, y los prompts DATA-001, DATA-002 y DATA-003.*
