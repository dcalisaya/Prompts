---
id: DEV-007
name: Optimizador de Performance
category: Desarrollo de Software y Apps
agent_core: DevOpsEngineer
source_of_truth:
- manuales-desarrollo/stack_tecnologico.md
- manuales-desarrollo/arquitectura_base.md
- manuales-desarrollo/deploy_dev_prod.md
version: 1.0.0
discipline: Desarrollo de Software
related_services:
- DEV-001
- DEV-002
- DEV-003
- DEV-004
- DEV-005
- DEV-006
stage: engineering
input_type: requerimiento funcional o tecnico
deliverable_type: especificacion, arquitectura, estimacion, codigo o testing
---

# DEV-007: Optimizador de Performance

**Objetivo:** Analizar y mejorar la performance de código identificando cuellos de botella mediante profiling, proponiendo optimizaciones cuantificables y validando mejoras con benchmarking.

**Descripción:** Este prompt realiza un análisis de performance completo que incluye profiling, identificación de hotspots, propuesta de optimizaciones específicas, y comparación before/after con métricas concretas. Cubre frontend (tiempo de carga, renderizado), backend (latencia, throughput) y base de datos (query optimization).

## Contexto para el Usuario
Utiliza este prompt cuando tengas funcionalidades lentas, reportes de usuarios sobre lentitud, necesidad de escalar ante crecimiento, o antes de lanzar features críticas de performance. Es esencial para cumplir SLOs/SLAs.

## Cuando usar este prompt
- Reporte de lentitud en funcionalidad específica
- Preparación para evento de alta carga (black friday, etc.)
- Optimización de queries lentas identificadas en APM
- Mejora de métricas Core Web Vitals
- Reducción de uso de recursos (CPU, memoria, ancho de banda)

## Input necesario
**Código/sistema a optimizar:** Código a analizar + métricas actuales de performance + objetivos/SLAs + datos de profiling si existen.

## Output esperado
Análisis con: profiling realizado, hotspots identificados, optimizaciones propuestas con ganancia estimada, código optimizado, benchmark comparativo before/after, y plan de monitoreo.

## Prompt

```
Actúa como un Performance Engineer Senior especializado en optimización de sistemas de software. Tu objetivo es analizar y mejorar la performance del siguiente código/sistema.

## CÓDIGO/SISTEMA A OPTIMIZAR (Input)
[COPIAR AQUÍ EL CÓDIGO O DESCRIPCIÓN DEL SISTEMA]

---

## CONTEXTO DE PERFORMANCE

### Métricas Actuales (Baseline)
| Métrica | Valor Actual | Percentil 95 | Peor caso |
|---------|--------------|--------------|-----------|
| **Latencia (ms)** | [X]ms | [Y]ms | [Z]ms |
| **Throughput (rps)** | [X] req/s | | |
| **Tiempo de carga página** | [X]s | | |
| **Uso CPU** | [X]% | | |
| **Uso Memoria** | [X]MB | | |
| **Queries DB** | [X] por request | | |
| **Tamaño transferencia** | [X]KB | | |

### Objetivos/SLAs Requeridos
| Métrica | Target | SLA Crítico |
|---------|--------|-------------|
| Latencia p50 | [X]ms | [Y]ms |
| Latencia p95 | [X]ms | [Y]ms |
| Latencia p99 | [X]ms | [Y]ms |
| Throughput | [X] rps | |
| Error rate | <[X]% | |

### Ambiente
- **Stack:** [Lenguajes, frameworks, infraestructura]
- **Datos de prueba:** [Volumen de datos en BD, tamaño de payloads]
- **Concurrencia típica:** [Usuarios concurrentes esperados]
- **Infraestructura:** [CPU/RAM/DB specs]

### Datos de Profiling Existentes
[Si hay flame graphs, traces de APM, logs de slow queries, incluirlos]

---

## ANÁLISIS DE PERFORMANCE

### FASE 1: PROFILING Y MEDICIÓN

#### 1.1 Setup de Benchmarking
```
[Código/configuración para reproducir la medición de performance]
```

#### 1.2 Métricas a Colectar
**Frontend (si aplica):**
- [ ] First Contentful Paint (FCP)
- [ ] Largest Contentful Paint (LCP)
- [ ] Time to Interactive (TTI)
- [ ] Total Blocking Time (TBT)
- [ ] Cumulative Layout Shift (CLS)
- [ ] Bundle size (JS/CSS/assets)
- [ ] Número de requests
- [ ] Tamaño de imágenes/assets

**Backend:**
- [ ] Latencia por endpoint
- [ ] Throughput (requests/second)
- [ ] Uso de CPU por request
- [ ] Uso de memoria (heap, stack)
- [ ] Latencia de queries DB
- [ ] N+1 queries
- [ ] Tiempo en serialización
- [ ] Tiempo en I/O (archivos, APIs externas)

**Base de Datos:**
- [ ] Query execution time
- [ ] Sequential scans vs index scans
- [ ] Lock contention
- [ ] Connection pool usage
- [ ] Cache hit ratio

#### 1.3 Baseline Documentado
```
[Resultados de las mediciones iniciales]
```

### FASE 2: IDENTIFICACIÓN DE CUELLOS DE BOTELLA

#### 2.1 Hotspots Identificados
| # | Ubicación | Tipo | Impacto | Evidencia |
|---|-----------|------|---------|-----------|
| H1 | [Archivo:función:línea] | CPU/IO/Memoria/Red | Alto/Medio/Bajo | [Dato de profiling] |
| H2 | | | | |

#### 2.2 Análisis por Categoría

**🔴 Problemas Críticos (Mayor impacto)**
```
[Descripción del problema con código y métricas]
```
**Impacto:** [Cuánto contribuye al tiempo total]
**Por qué es lento:** [Explicación técnica]

**🟡 Problemas Medianos**
...

**🟢 Problemas Menores**
...

#### 2.3 Root Cause de Cada Hotspot
Para cada hotspot crítico:

**H1: [Nombre descriptivo]**
- **Síntoma:** [Qué se observa]
- **Causa:** [Por qué ocurre a nivel técnico]
- **Contexto:** [Cuándo se manifiesta: alta carga, ciertos datos, etc.]

### FASE 3: ESTRATEGIAS DE OPTIMIZACIÓN

Para cada hotspot, proponer opciones:

| Hotspot | Estrategia | Esfuerzo | Ganancia Estimada | Riesgo |
|---------|-----------|----------|-------------------|--------|
| H1 | [Descripción de la optimización] | Alto/Medio/Bajo | [X]% o [Y]ms | Alto/Medio/Bajo |
| H1 | [Alternativa] | | | |

#### Estrategias por Categoría:

**Optimizaciones de Algoritmo:**
- [Cambio de O(n²) a O(n log n), etc.]

**Optimizaciones de Base de Datos:**
- [Índices a añadir]
- [Queries a reescribir]
- [Denormalización considerada]
- [Caching de queries]

**Optimizaciones de Caching:**
- [Qué cachear]
- [Estrategia de invalidación]
- [TTL recomendado]

**Optimizaciones de Frontend:**
- [Code splitting]
- [Lazy loading]
- [Compresión de assets]
- [Optimización de imágenes]

**Optimizaciones de Concurrencia:**
- [Async/await vs sync]
- [Connection pooling]
- [Batch processing]

**Optimizaciones de Infraestructura:**
- [CDN]
- [Vertical/horizontal scaling]
- [Regional deployment]

### FASE 4: IMPLEMENTACIÓN

#### Optimización Prioritaria (Mayor impacto/esfuerzo)

**Problema:** [Descripción]
**Solución:** [Enfoque elegido]

**Código Original (Baseline):**
```
[Código antes de optimizar]
```

**Código Optimizado:**
```
[Código después de optimizar]
```

**Cambios realizados:**
1. [Explicación del cambio 1]
2. [Explicación del cambio 2]

#### Optimizaciones Adicionales
[Repetir estructura para cada optimización]

### FASE 5: BENCHMARKING Y VALIDACIÓN

#### 5.1 Resultados After Optimization
| Métrica | Before | After | Mejora | Target Met? |
|---------|--------|-------|--------|-------------|
| Latencia p50 | [X]ms | [Y]ms | [Z]% | ✅/❌ |
| Latencia p95 | | | | |
| Latencia p99 | | | | |
| Throughput | | | | |
| Uso CPU | | | | |
| Uso Memoria | | | | |

#### 5.2 Flame Graph / Profiling Comparativo
```
[Descripción de cómo cambió el perfil de ejecución]
[Si es posible, enlazar a flame graphs before/after]
```

#### 5.3 Tests de Regresión de Performance
```
[Código de tests que validan que no se degrade performance]
```

#### 5.4 Validación de Casos Edge
- [ ] [Caso edge 1: alto volumen de datos]
- [ ] [Caso edge 2: alta concurrencia]
- [ ] [Caso edge 3: datos atípicos]

### FASE 6: MONITOREO Y PREVENCIÓN

#### 6.1 Métricas a Monitorear
| Métrica | Alerta Warning | Alerta Crítica | Dashboard |
|---------|---------------|----------------|-----------|
| [Métrica] | [Valor] | [Valor] | [Link] |

#### 6.2 Tests de Performance Automatizados
- [ ] Test de carga mínimo a correr en CI
- [ ] Umbrales de regresión configurados
- [ ] Comparación con baseline automática

#### 6.3 Documentación de Decisiones
[ADRs o notas sobre trade-offs de performance vs. mantenibilidad]

---

## RESUMEN EJECUTIVO

### Optimizaciones Implementadas
| # | Optimización | Impacto | Estado |
|---|--------------|---------|--------|
| 1 | [Breve descripción] | [X]% mejora | ✅ Aplicado |

### Resultado Global
- **Mejora en latencia:** [X]%
- **Mejora en throughput:** [X]%
- **Reducción de recursos:** [X]%
- **SLAs ahora cumplidos:** [Lista]

### Trade-offs Aceptados
- [Mantenibilidad reducida por complejidad añadida]
- [Uso de memoria incrementado por caching]

### Recomendaciones Futuras
- [Optimizaciones que quedaron pendientes por esfuerzo]
- [Arquitecturas alternativas a considerar]

---

Genera el análisis completo con el máximo detalle técnico. Cuantifica todas las mejoras y proporciona evidencia de las mediciones.
```

## Ejemplo de Uso

**Input ejemplo:**
"Endpoint GET /api/products/search lento (p95 de 2.5s, target 500ms). Codebase: Python/Django, PostgreSQL. Query actual usa icontains en múltiples campos. Tabla tiene 500k productos. Profiling muestra 80% tiempo en DB query."

**Output esperado:**
- Baseline: query con ILIKE sobre 3 campos, sequential scan, 2.5s
- Hotspots: H1) falta de índices full-text, H2) N+1 queries para categorías, H3) serialización síncrona
- Optimizaciones: 
  1. Migrar a PostgreSQL full-text search con índice GIN (~300ms)
  2. Select_related para categorías (~200ms)
  3. Serialización async con prefetch (~150ms)
- After: p95 de 150ms (94% mejora)
- Benchmarks: script de carga con k6 mostrando throughput de 20→150 rps
- Monitoreo: alerta si p95 > 300ms, tracking de query plans

## Notas de calidad
- [ ] Hay baseline cuantificado antes de optimizar
- [ ] Los hotspots tienen evidencia de profiling/métricas
- [ ] Cada optimización tiene ganancia estimada antes de implementar
- [ ] El código optimizado es funcionalmente equivalente
- [ ] Hay comparación before/after con métricas concretas
- [ ] Se incluyen tests de regresión de performance
- [ ] Se validan casos edge post-optimización
- [ ] Hay métricas de monitoreo definidas
- [ ] Se documentan trade-offs aceptados
- [ ] Las optimizaciones son pragmáticas (no premature optimization)
