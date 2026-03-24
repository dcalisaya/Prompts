---
id: MAN-MED-002
name: Playbook de Campañas por Plataforma
category: Media Planning y Performance
discipline: Media, Performance y SEO
type: playbook
version: 1.0.0
related_services: ["MED-002", "MED-003", "MED-004"]
related_agents: ["PerformanceMarketer", "TraffickerEspecialista", "MediaPlanner"]
related_prompts: ["MEDIA-002", "ADS-001", "ADS-002", "ADS-003"]
source_of_truth: true
tags: [meta-ads, google-ads, tiktok-ads, spotify-ads, plataforma, pauta]
---

# Playbook de Campañas por Plataforma
## Guía de Operación Paso a Paso para Meta, Google, TikTok y Spotify Ads

Este playbook traduce los principios de la Guía Maestra de Media, Performance y SEO en procedimientos operativos concretos para cada plataforma. Cada sección cubre: setup inicial, arquitectura recomendada, criterios de optimización y errores comunes a evitar.

---

## 1. Meta Ads (Facebook / Instagram / Audience Network)

### 1.1 Setup Inicial

**Antes de crear la primera campaña:**

```
CHECKLIST DE SETUP META ADS
□ Business Manager creado y verificado
□ Pixel instalado en sitio de destino (base + eventos estándar)
□ CAPI configurado si hay más de 100 eventos/semana
□ Catálogo de productos vinculado (para e-commerce)
□ Método de facturación verificado
□ Account roles configurados (admin, advertiser, analyst)
□ Fuentes de conversión declaradas (Google Analytics + Meta)
```

### 1.2 Arquitectura Recomendada

**Para campañas de conversión:**

```
Campaña: [OBJETIVO] - [CLIENTE] - [MES]
│
├── Ad Set: CBO - Interés/Público amplio
│   ├── Budget: ~30% del total
│   ├── Bidding: Lower Cost (automático)
│   └── Targeting: Intereses amplios + ubicación
│
├── Ad Set: CBO - Lookalike
│   ├── Budget: ~30% del total
│   ├── Bidding: Lower Cost
│   └── Targeting: LAL 3% de mejores clientes
│
├── Ad Set: ABO - Retargeting activo
│   ├── Budget: ~30% del total
│   ├── Bidding: Target CPA o Manual
│   └── Targeting: Website visitors 30d + engaged
│
└── Ad Set: ABO - Interés específico
    ├── Budget: ~10% del total
    ├── Bidding: Target CPA
    └── Targeting: Intereses narrow (testing)
```

**Regla CBO vs. ABO:**
- Usar **CBO** cuando hay más de $50/día y múltiples Ad Sets similares.
- Usar **ABO** para control granular o cuando se testean audiencias muy distintas.

### 1.3 Criterios de Optimización

| Día | Acción |
|:----|:-------|
| 1-3 | Verificar que el pixel envía eventos. Sin eventos, pausar la campaña. |
| 4-7 | Revisar CTR. Si CTR < 0.5%, evaluar creativo o audiencia. |
| 7-14 | Analizar CPA/ROAS. Si CPA > 1.5x del objetivo, reducir budget o pausar. |
| 14-21 | Escalar lo que funciona. Pausar lo que no. |
| 21-30 | Nueva tanda de creativas. Testing es continuo. |

**Señales de alerta:**
- CPI (Cost per Install) > 2x del benchmark del mercado
- CPM > $15 USD sin justificación de reach
- Frequency > 8 en audiencias frías (fatiga de exposición)
- ROAS < 1x después de 14 días con 50+ conversiones

### 1.4 Formatos y Especificaciones

| Formato | Tamaño | Duración | Texto | Notas |
|:--------|:-------|:---------|:------|:------|
| Feed Image | 1:1 (1080x1080) | — | 125 caracteres | Mayor CTR |
| Feed Video | 1:1 o 4:5 | 15s-60s | 125 caracteres | Mayor engagement |
| Stories | 9:16 | 15s máx | — | Vertical nativo |
| Reels | 9:16 | 15s-30s | — | Alcance alto |
| Carousel | 1:1 cada | — | 125 caracteres | Para catálogo |

---

## 2. Google Ads (Search + Performance Max)

### 2.1 Setup Inicial

```
CHECKLIST DE SETUP GOOGLE ADS
□ Cuenta de Google Ads creada
□ Vinculación con Google Analytics 4
□ Conversiones configuradas en GA4 y importadas a Google Ads
□ Extensions configuradas (Sitelinks, Callouts, Phone, Location)
□ Negative keywords list creada (competidores, términos genéricos)
□ Budgets configurados por campaña
□ Targeting geográfico definido
□ Targeting de horario (si aplica)
□ Audience signals declarados
```

### 2.2 Arquitectura Recomendada (Search)

```
Campaña: [CLIENTE] - Brand - Search
├── Grupo: Brand Exact
│   └── Keywords: [nombre de marca], [marca + producto]
├── Grupo: Brand Modified Broad
│   └── Keywords: +marca +producto
└── Presupuesto: $5-15/día | Puja: Manual CPC o Target CPA

Campaña: [CLIENTE] - Non-Brand - Search
├── Grupo: Producto/Servicio Core
│   └── Keywords: intención transaccional alta
├── Grupo: Problema/Solución
│   └── Keywords: informacionales con intención comercial
├── Grupo: Competidores
│   └── Keywords: [competidor + producto]
└── Presupuesto: según objetivo | Puja: Target CPA o Maximize Conversions

Campaña: [CLIENTE] - Remarketing
├── Audience: Website visitors 30d
├── Audience: cart abandoners
├── Audience: past customers
└── Presupuesto: 15-20% del total | Puja: Target CPA agresivo
```

### 2.3 Keyword Research Estandar

**Estructura de grupos por intención:**

| Intención | Tipo de Keyword | Ejemplo | Copy |
|:----------|:---------------|:--------|:-----|
| Transaccional | Marca + producto + comprar | "comprar hosting ecuador" | Directo, CTA claro |
| Comercial | Marca + alternativa + review | "mejor hosting que godaddy" | Comparativo, persuasivo |
| Informacional | Cómo + problema | "cómo migrar mi web" | Educativo, no vendáš directamente |
| Navegacional | Marca directa | "live developer quito" | Asegurar presencia |

### 2.4 Performance Max: Configuración

```
ASSET GROUPS (mínimo 5 por grupo)
├── Imágenes: 3-5 (landscape, square, portrait)
├── Videos: 2-3 (15s, 30s, 60s)
├── Headlines: 5 (máx 30 caracteres)
├── Descriptions: 3-5 (máx 90 caracteres)
├── CTA: 2-3 (Shop Now, Get Quote, Learn More)
└── Logo: 1 (vector o alta resolución)

AUDIENCE SIGNALS
├── In-market audiences relevantes
├── Combination audience (demografía + comportamiento)
└── Customer match (si hay base de datos)
```

### 2.5 Negative Keywords Comunes por Industria

```
SIEMPRE EXCLUIR:
• "gratis", "gratuito", "pdf", "youtube", "facebook"
• "empleo", "trabajo", "salario", "carrera"
• "definicion", "que es", "como hacer", "tutorial"
• Nombres de competidores (en campañas no-competitivas)
```

---

## 3. TikTok Ads

### 3.1 Setup Inicial

```
CHECKLIST DE SETUP TIKTOK ADS
□ TikTok Business Center creado
□ Pixel SDK instalado en app o web
□ Eventos de conversión configurados
□ Catálogo vinculado (para Dynamic Ads)
□ Billing configurado
□ Creative permissions verificados
```

### 3.2 Enfoque Creativo para TikTok

**TikTok NO es televisión.** Las reglas son diferentes:

- **Autenticidad > Producción**: Contenido que parece real > spots producidos.
- **Hook en los primeros 1-2 segundos**: Sin hook, no hay retention.
- **No más de 15 segundos** al inicio (genera más completions).
- **Caption/subtítulos**: Obligatorios (mute rate > 80%).
- **Trending sounds**: Usar audios trending del momento.
- **CTAs claros**: "Tap the link", "Shop now" al final.

### 3.3 Estructura de Campaña

```
Campaña: Spark Ads (alcance orgánico potenciado)
├── Objetivo: Video Views o Traffic
├── Formato: Anúnciar posts orgánicos como ads
└── Target: Intereses amplios, 18-35

Campaña: In-Feed Ads
├── Objetivo: Conversiones o Leads
├── Targeting: In-market + comportamientos
└── Formato: Vertical 9:16, 9-15s

Campaña: Catalog Sales (e-commerce)
├── Objetivo: Catalog Sales
├── Feed de catálogo: productos
└── Targeting: Dynamic product ads
```

---

## 4. Spotify Ads

### 4.1 Formatos Disponibles

| Formato | Duración | Objetivo | Notas |
|:--------|:---------|:--------|:------|
| Sponsored Discovery | — | Awareness | Logo + texto en browse |
| Audio Ad | 15-30s | Brand + Conversion | Formato principal |
| Podcast Ad | 15-60s | Niche targeting | Por show o género |

### 4.2 Script para Spotify Audio Ads (15 segundos)

```
ESTRUCTURA DE SCRIPT (15 segundos)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[0:00-0:03] AMBIENTE
  "Estás manejando por [ciudad] y [situación]..."

[0:03-0:10] PROBLEMA / DESEO
  "Pero [problema]. [Pain point relevante]..."

[0:10-0:14] SOLUCIÓN
  "[Nombre de marca] tiene exactamente lo que necesitas..."

[0:14-0:15] CTA
  "Visita [URL] o busca '[nombre de marca]' en Spotify."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOTA: En Spotify el oyente NO VE la pantalla.
      Todo el mensaje debe funcionar solo con audio.
```

### 4.3 Briefing de Creativo para Spotify

- **Audience**: Define el momento y contexto (ej: "personas escuchando Jazz clásico en oficina").
- **Tono**: No grites. Habla como un amigo que recomienda.
- **Números**: Si hay cifras, pronúncialas claro.
- **CTA**: Spotify permite tap-to-action. El CTA debe ser accionable.

---

## 5. Errores Comunes a Evitar

### Errores Universales

| Error | Consecuencia | Solución |
|:------|:-------------|:---------|
| Sin pixel / tracking | Ceguera total de resultados | Instalar antes de lanzar |
| Audiencias solapadas | Cannibalización de budget | Revisar overlap con Audience Insights |
| Creatividades idénticas | Fatiga rápida | Mínimo 3-5 variantes por Ad Set |
| Pujas automáticas sin data | Overspend ineficiente | Esperar 30+ conversiones para Bid Strategy |
| No excluir búsquedas internas | GASTO en clicks del equipo | Agregar IP exclusions + employee emails |

### Errores por Plataforma

| Plataforma | Error Frecuente | Solución |
|:-----------|:----------------|:---------|
| Meta | CBO aplasta Ad Sets nuevos | Desactivar CBO en fases de test |
| Google Search | Too many keywords sin agrupar | Quality Score cae con KW杂乱 |
| TikTok | Copiar creatives de Meta | Adaptar a formato y tono TikTok |
| Spotify | Leer un script de TV | Escribir específicamente para audio |

---

*Este playbook complementa la Guía Maestra de Media, Performance y SEO (MAN-MED-001) y está alineado con los prompts ADS-001, ADS-002 y ADS-003.*
