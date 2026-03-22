---
id: MAN-MED-001
name: Guía Maestra de Media, Performance y SEO
category: Media Planning y Performance
discipline: Media, Performance y SEO
type: guia-maestra
version: 1.0.0
related_services: ["MED-001", "MED-002", "MED-003", "MED-004", "MED-005", "MED-006", "MED-007"]
related_agents: ["MediaPlanner", "PerformanceMarketer", "TraffickerEspecialista", "SEOSpecialist"]
related_prompts: ["MEDIA-001", "MEDIA-002", "SEO-001", "ADS-001", "ADS-002", "ADS-003"]
source_of_truth: true
tags: [media-planning, performance, seo, pauta, kpis, atribucion]
---

# Guía Maestra de Media, Performance y SEO
## Fundamentos y Marco Operativo para el Equipo de Live Developer

Esta guía establece los principios rectores, marcos de medición y convenciones operativas que todo el equipo de Live Developer debe seguir al planificar, ejecutar y optimizar campañas de paid media, performance marketing y SEO. Sirve como fuente de verdad para los agentes y prompts operativos de la disciplina.

---

## 1. Los Tres Pilares de la Disciplina

La disciplina de Media, Performance y SEO se sustenta en tres pilares interdependientes:

```
MEDIA PLANNING          PERFORMANCE MARKETING              SEO
(Planificación)         (Ejecución pagada)                (Orgánico)
     │                        │                              │
Define el MIX            Optimiza el GASTO                Construye AUTORIDAD
de canales y             hacia resultados                  para reducir COSTO
presupuesto              medibles (ROAS/CPA)              de adquisición
```

Ninguno funciona aisladamente. Un plan de medios sin execution de performance es un documento decorativo. Performance sin SEO aumenta costos. SEO sin plan de medios es lento.

---

## 2. Marco de Objetivos y Métricas

### 2.1 Objetivos de Negocio vs. Objetivos de Campaña

| Objetivo de Negocio | Objetivo de Campaña | Métrica Prioritaria |
|:-------------------|:-------------------|:-------------------|
| Reconocimiento de marca | Alcance y frecuencia | Reach, Frequency, CPM |
| Captación de leads | Generación de contactos | CPL, Lead volume |
| Ventas directas | Conversiones online | ROAS, CPA, Conversion rate |
| Retención de clientes | Engagement profundo | LTV, Repeat purchase rate |
| Recuperación de carritos | Reactivación | Revenue recovery % |

### 2.2 KPIs por Etapa del Embudo

```
TOP DE FUNNEL (TOFU)          MIDDLE DE FUNNEL (MOFU)       BOTTOM DE FUNNEL (BOFU)
━━━━━━━━━━━━━━━━━━━━━━━━       ━━━━━━━━━━━━━━━━━━━━━━         ━━━━━━━━━━━━━━━━━━━━━
• Impresiones                  • Clics                       • Conversiones
• Alcance (Reach)              • CTR (Click-through rate)     • ROAS (Return on Ad Spend)
• Frecuencia                   • CPM efectivo                 • CPA (Cost per Acquisition)
• CPM                           • CPC (Cost per Click)         • Conversion Rate
• GRP (Gross Rating Points)    • Engagement rate              • AOV (Average Order Value)
• share-of-voice               • Bounce rate                 • LTV (Lifetime Value)
```

### 2.3 Niveles de Referencia por Industria

| Métrica | Benchmark General | E-commerce | SaaS / Servicios | B2B |
|:--------|:----------------|:-----------|:----------------|:-----|
| ROAS objetivo | 4x-6x | 5x-8x | 3x-5x | 2x-4x |
| CPA aceptable | <$15 USD | <$25 USD | <$50 USD | <$100 USD |
| CTR (Display) | 0.05-0.2% | 0.1-0.3% | 0.05-0.15% | 0.02-0.1% |
| CTR (Search) | 2-5% | 3-7% | 2-5% | 1-3% |
| Conversion Rate | 1-3% | 2-4% | 1-3% | 0.5-2% |

---

## 3. Marco de Atribución

### 3.1 Modelos de Atribución

| Modelo | Descripción | Uso Recomendado |
|:-------|:-----------|:----------------|
| **Last Click** | Todo el crédito al último touchpoint | Conversiones de bajo involvement |
| **First Click** | Todo el crédito al primer touchpoint | Estrategia de awareness |
| **Linear** | Crédito igual entre todos los puntos | Distribución equitativa |
| **Time Decay** | Mayor crédito a interacciones recientes | Ciclos de venta cortos |
| **Data-Driven** | Algoritmo de la plataforma | Campañas optimizadas por IA |
| **Position Based** | 40% primero, 20%中间, 40% último | Ciclo de venta medio |

### 3.2 Regla de Lectura

> **Nunca comparar ROAS de last-click con modelos data-driven.** Son métricas diferentes. Si el cliente pregunta "¿cuál es mi ROAS real?", la respuesta es: depende del modelo. Mostrar siempre los dos o tres modelos principales.

---

## 4. Planning: Cómo Construir un Mix de Medios

### 4.1 Análisis de Presencia Digital del Cliente

Antes de proponer un mix, documentar:

```
1. Canales actuales activos (propios y pagados)
2. Inversión mensual actual por canal
3. Rendimiento histórico (datos disponibles)
4. Estacionalidad del negocio
5. Audiencia objetivo: demografía, geografia, intereses
6. Competidores: dónde están presentes
```

### 4.2 Lógica de Distribución por Objetivo

| Objetivo | Paid Social | Paid Search | Display/Programmatic | SEO | TV/Radio |
|:---------|:-----------:|:-----------:|:-------------------:|:---:|:--------:|
| Awareness | ✅✅✅ | ❌ | ✅✅✅ | ✅ | ✅✅✅ |
| Consideration | ✅✅ | ✅✅ | ✅ | ✅✅ | ✅ |
| Conversion | ✅ | ✅✅✅ | ✅ | ✅✅✅ | ❌ |
| Retargeting | ✅✅✅ | ✅✅✅ | ✅✅ | ❌ | ❌ |

### 4.3 Reglas de Budget Allocation

- **Regla 50/30/20**: 50% a canales de conversion, 30% a canales de consideration, 20% a canales de awareness (clientes establecidos).
- **Regla de test**: 10-20% del presupuesto en testing experimental antes de escalar.
- **Audiencia fría vs. cálida**: No gastar más del 30% del presupuesto en audiencias frías para un cliente nuevo sin datos.

---

## 5. Performance Marketing: Arquitectura y Optimización

### 5.1 Arquitectura de Cuenta Universal

```
CAMPANA (Campaign)
│
├── AD SET / GRUPO DE ANUNCIOS
│   ├── Audiencias específicas
│   ├── keyword / intereses
│   ├── Presupuesto diario
│   ├── Puja (bidding)
│   │
│   └── ANUNCIOS (2-5 por set)
│       ├── Creatividad 1
│       ├── Creatividad 2
│       └── Creatividad 3
```

### 5.2 Estructura de Nomenclatura

```
[CLIENTE]_[CANAL]_[OBJETIVO]_[AUDIENCIA]_[FECHA]
Ejemplo: LD_META_CONV_CALIENTE_2025Q1
         LD_GOOGLE_SEARCH_BRAND_2025Q1
         LD_TIKTOK_AWARENESS_18-35_2025Q1
```

### 5.3 Criterios de Optimización por Plataforma

| Plataforma | Frecuencia de Optimización | Qué optimizar primero | Qué no tocar antes de 7 días |
|:-----------|:------------------------|:--------------------|:------------------------------|
| Meta Ads | Diaria (data > 50 eventos) | Audiencias, creativo | Estructura de campaña |
| Google Ads | Cada 3-7 días | Keywords, púas, extensiones | Arquitectura de cuenta |
| TikTok Ads | Semanal | Targeting, presupuestos | Creativos |
| SEO | Quincenal/Mensual | Contenido, enlaces | Estructura técnica base |

### 5.4 Protocolo de Test Creativo

```
SEMANA 1-2:  Run de 3-5 creatividades en ABO
             Objetivo: identificar ganadoras (CTR + CVR)

SEMANA 3:    Pause de perdedoras (CTR < 0.5x del promedio)
             Ampliar budget de ganadoras (+50%)

SEMANA 4:    Nueva tanda de variantes sobre la ganadora
             Testing de formato (Feed vs. Stories vs. Reels)

REGLA:       Mínimo 50 clics y 3 días por creatividad
             antes de declarar winner o loser.
```

---

## 6. SEO: Marco Técnico y Operativo

### 6.1 Arquitectura de Sitio para SEO

```
FUNDAMENTOS TECNICOS
├── Indexabilidad: sitemap.xml, robots.txt, canonical tags
├── Velocidad: Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
├── HTTPS: obligatorio
├── Mobile-first: diseño responsivo como default
└── Estructura de URLs: kebab-case, jerárquica, < 75 caracteres

CONTENIDO
├── Arquitectura de información: homepage > category > subcategory > post
├── Silo temático: agrupar contenido por pilares y racimos
├── orphan pages: identificar y linking interno
└── Content freshness: actualizar páginas de alto tráfico

AUTORIDAD
├── Backlinks: calidad > cantidad (DA/DR del sitio donante)
├── Anchor text: diversidad (no sobre-optimizar con exact keywords)
└── Links tóxicos: disavow de dominios spam
```

### 6.2 Taxonomía de Keywords por Intención

| Tipo | Intención | Ejemplo | Formato de contenido |
|:-----|:---------|:--------|:-------------------|
| **Informacional** | Aprender | "¿cómo elegir hosting?" | Blog, guía |
| **Navegacional** | Ir a un lugar | "Live Developer Quito" | Homepage, página específica |
| **Comercial** | Comparar | "mejor agencia marketing Quito" | Comparativa, review |
| **Transaccional** | Comprar | "cotizar landing page Quito" | Landing page, pricing |

### 6.3 Checklist de Auditoría SEO (para MEDIA-001)

- [ ] Sitemap.xml accesible y actualizado
- [ ] robots.txt permite rastreo de páginas importantes
- [ ] Canonical tags en todas las páginas
- [ ] Core Web Vitals en rango verde
- [ ] HTTPS activo con redirección 301 de HTTP
- [ ] мета title y description únicos por página
- [ ] Encabezados H1 único y H2-H6 jerárquicos
- [ ] Imágenes con alt text descriptivo
- [ ] Schema markup (Organization, LocalBusiness, FAQ, Product)
- [ ] Google Business Profile optimizado y verificado
- [ ] NAP consistente en todos los canales

---

## 7. Briefing de Campaña: Inputs Mínimos

Ninguna campaña debe iniciar sin los siguientes datos:

```
BRIEF MINIMO DE CAMPAÑA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Objetivo comercial claro (no "vender más")
□ Producto o servicio específico
□ Audiencia: demografía, geografía, intereses definidos
□ Presupuesto mensual o total
□ Período de campaña
□ KPI objetivo con cifra concreta (ej: CPL < $12 o ROAS > 4x)
□ URL de destino (land page) verificada y funcionando
□ Activos creativos disponibles (imágenes, videos, copy existente)
□ Pixel, SDK o tracking configurado
□ Accesos a plataformas de pauta
□ Datos históricos disponibles (si existen)
□ Competidores que el cliente identifica
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 8. Reporte Estándar de Campaña

Todo reporte de campaña debe incluir:

```
REPORTE MENSUAL ESTÁNDAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. RESUMEN EJECUTIVO (1 párrafo)
   - ¿Se cumplieron los KPIs objetivo?
   - Highlights y lowlights del período

2. INVERSIÓN Y RENDIMIENTO
   - Gasto total vs. presupuestado
   - ROAS / CPA / CPM / CTR / Conversion Rate

3. POR CANAL
   - Breakdown de rendimiento por plataforma
   - Top 3 creativas por conversión

4. AUDIENCIAS
   - Rendimiento por segmento de audiencia
   - Cost per result por audiencia

5. CREATIVIDAD
   - Performance de activos por formato
   - Insights de copy ganador

6. RECOMENDACIONES
   - Cambios propuestos para el siguiente período
   - Budget reallocation sugerido

7. PRÓXIMOS PASOS
   - Acciones confirmadas para el siguiente mes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 9. Servicios Vinculados en la Matriz

| Código | Servicio | Rol en la Disciplina |
|:-------|:---------|:-------------------|
| `MED-001` | Plan de Medios Integral | Estrategia de mix |
| `MED-002` | Campaña Meta Ads | Ejecución Meta |
| `MED-003` | Campaña Google Ads | Ejecución Google |
| `MED-004` | Campaña TikTok Ads | Ejecución TikTok |
| `MED-005` | Auditoría SEO | Diagnóstico técnico |
| `MED-006` | SEO Mensual | Ejecución orgánica |
| `MED-007` | Local SEO | SEO geolocalizado |

---

*Este manual es la fuente de verdad para los agentes MediaPlanner, PerformanceMarketer, TraffickerEspecialista y SEOSpecialist. Complementa pero no sustituye los prompts operativos MEDIA-001 a MEDIA-002 y ADS-001 a ADS-003.*
