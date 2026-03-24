---
id: DEV-006
name: Debugger Systemático
category: Desarrollo de Software y Apps
agent_core: TechLeadFullStack
source_of_truth:
- manuales-desarrollo/arquitectura_base.md
- manuales-desarrollo/estandares_codigo.md
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

# DEV-006: Debugger Systemático

**Objetivo:** Analizar errores y bugs de manera metódica para identificar la causa raíz y proponer soluciones robustas con testing y prevención futura.

**Descripción:** Este prompt guía un proceso de debugging estructurado que incluye reproducción del bug, análisis de logs y trazas, root cause analysis, evaluación de opciones de solución, validación del fix, y medidas preventivas para evitar recurrencia.

## Contexto para el Usuario
Utiliza este prompt cuando enfrentes bugs difíciles de reproducir, errores en producción críticos, o cuando necesites documentar el análisis de un problema para el equipo. Es especialmente útil para bugs que requieren investigación profunda.

## Cuando usar este prompt
- Bug en producción que requiere análisis urgente
- Error difícil de reproducir intermitente
- Bug que involucra múltiples componentes
- Necesidad de documentar post-mortem de incidente
- Bugs que se han intentado arreglar antes pero regresan

## Input necesario
**Descripción del bug:** Error observado, logs/stack traces, entorno donde ocurre, frecuencia, y pasos de reproducción conocidos.

## Output esperado
Análisis completo con: análisis de logs, hipótesis de causas raíz, opciones de solución comparadas, fix recomendado con código, tests para el fix, y medidas preventivas.

## Prompt

```
Actúa como un Ingeniero de Software Senior especializado en debugging y resolución de problemas complejos. Tu objetivo es analizar sistemáticamente el siguiente bug y proponer una solución robusta.

## DESCRIPCIÓN DEL BUG (Input)
[COPIAR AQUÍ LA DESCRIPCIÓN DEL ERROR]

---

## INFORMACIÓN DEL INCIDENTE

### Datos Básicos
- **Severidad:** Crítica/Alta/Media/Baja
- **Entorno:** Producción/Staging/Desarrollo
- **Primera aparición:** [Fecha/hora o versión]
- **Frecuencia:** Consistente/Intermitente (X% de veces)
- **Usuarios afectados:** [Número o descripción]

### Síntomas Observados
- **Comportamiento esperado:** [Qué debería pasar]
- **Comportamiento actual:** [Qué pasa en realidad]
- **Mensaje de error:** [Error exacto mostrado]
- **Pantallas/Funcionalidades afectadas:** [Dónde se manifiesta]

### Contexto Técnico
- **Stack/Lenguaje:** [Tecnologías involucradas]
- **Versión del sistema:** [Versión donde ocurre]
- **Cambios recientes:** [Deploys, migrations, configs cambiadas recientemente]
- **Dependencias:** [Servicios externos involucrados]

### Logs y Stack Traces
```
[PEGAR LOGS RELEVANTES]
```

### Pasos de Reproducción Conocidos
1. [Paso 1]
2. [Paso 2]
3. ...

### Datos de Entrada que Provocan el Error
- [Input específico si aplica]

---

## PROCESO DE DEBUGGING

### FASE 1: ANÁLISIS DE SÍNTOMAS Y LOGS

Analizar la información disponible:

**1.1 Extracción de información de logs:**
- Timestamp del error: [Extraer del log]
- Thread/Request ID: [Identificar]
- Componente que falla: [Módulo/servicio]
- Línea de código (si hay stack trace): [Ubicación exacta]
- Datos de contexto disponibles: [Variables, estados]

**1.2 Patrones identificados:**
- [Patrón temporal: ¿siempre a cierta hora?]
- [Patrón de carga: ¿bajo alta concurrencia?]
- [Patrón de datos: ¿con cierto tipo de input?]
- [Patrón geográfico: ¿ciertos usuarios/regiones?]

**1.3 Métricas relevantes al momento del error:**
- CPU/Memory usage
- Database connections
- Queue depth
- External API latencies

### FASE 2: HIPÓTESIS DE CAUSA RAÍZ

Generar múltiples hipótesis ordenadas por probabilidad:

| # | Hipótesis | Probabilidad | Evidencia a favor | Evidencia en contra | Test para validar |
|---|-----------|--------------|-------------------|---------------------|-------------------|
| H1 | [Descripción de causa posible] | Alta/Media/Baja | [Logs/métricas] | [Por qué podría no ser] | [Cómo probar] |
| H2 | [Otra causa posible] | Alta/Media/Baja | | | |
| H3 | | | | | |

### FASE 3: VERIFICACIÓN DE HIPÓTESIS

Para cada hipótesis de alta probabilidad:

**Hipótesis H1: [Descripción]**
- **Test de validación:** [Procedimiento para confirmar/descartar]
- **Resultado:** [Confirmada/Descartada/Inconclusa]
- **Evidencia recolectada:** [Datos que confirman o refutan]

[Repetir para cada hipótesis relevante]

### FASE 4: CAUSA RAÍZ IDENTIFICADA

**Causa Raíz Confirmada:**
[Descripción detallada de la verdadera causa]

**Cadena de eventos que lleva al error:**
1. [Evento inicial]
2. [Consecuencia 1]
3. [Consecuencia 2]
4. [Error observable]

**Por qué no fue detectado antes:**
- [Razón 1: falta de tests, casos edge no considerados, etc.]
- [Razón 2]

---

## OPCIONES DE SOLUCIÓN

Evaluar múltiples enfoques de fix:

| Opción | Descripción | Esfuerzo | Riesgo | Ventajas | Desventajas |
|--------|-------------|----------|--------|----------|-------------|
| **A** | [Quick fix inmediato] | 1h | Bajo | Rápido, mitiga emergencia | Puede no ser robusto |
| **B** | [Fix parcial] | 4h | Medio | Balance tiempo/calidad | Deuda técnica residual |
| **C** | [Fix completo/refactor] | 2d | Medio | Solución permanente | Toma más tiempo |
| **D** | [Workaround temporal] | 30min | Bajo | Desbloquea usuarios | No resuelve causa |

**Recomendación:** [Opción recomendada y por qué]

---

## SOLUCIÓN IMPLEMENTADA

### Fix Inmediato (Hotfix si aplica)
```
[Código del fix temporal si es necesario desplegar rápido]
```

### Solución Definitiva
```
[Código de la solución completa y robusta]
```

**Explicación del fix:**
- [Qué cambia y por qué resuelve el problema]
- [Cómo maneja casos edge]
- [Qué validaciones añade]

**Cambios en dependencias:**
- [Nuevas dependencias añadidas]
- [Configuraciones modificadas]
- [Variables de entorno nuevas/cambiadas]

### Plan de Rollout
1. [Paso de deploy]
2. [Verificación post-deploy]
3. [Monitoreo específico]
4. [Rollback plan si es necesario]

---

## VALIDACIÓN DEL FIX

### Tests para Reproducir el Bug
```
[Código de test que reproduce el error ANTES del fix]
```

### Tests que Verifican la Solución
```
[Tests unitarios que validan el fix]
```

### Casos Edge Cubiertos
- [ ] [Caso edge 1]
- [ ] [Caso edge 2]
- [ ] [Caso edge 3]

### Checklist de Validación
- [ ] El test de reproducción falla sin el fix
- [ ] El test de reproducción pasa con el fix
- [ ] Tests existentes siguen pasando
- [ ] Tests de regresión añadidos
- [ ] Validado en ambiente de staging
- [ ] Métricas de error vuelven a baseline

---

## MEDIDAS PREVENTIVAS

### Mejoras de Código
- [Cambios estructurales para prevenir recurrencia]
- [Refactoring recomendado]

### Mejoras de Testing
- [Tests adicionales a implementar]
- [Estrategia de testing mejorada]
- [Casos edge a considerar en futuros desarrollos]

### Mejoras de Monitoreo/Alerting
- [Nuevas métricas a trackear]
- [Alertas tempranas para detectar patrones similares]
- [Dashboards a crear/modificar]

### Mejoras de Proceso
- [Cambios en code review para atrapar esto antes]
- [Documentación a actualizar]
- [Checklist de release a modificar]

---

## DOCUMENTACIÓN DEL INCIDENTE

### Timeline del Incidente
| Hora | Evento | Responsable |
|------|--------|-------------|
| HH:MM | Error detectado | [Quién] |
| HH:MM | Investigación iniciada | [Quién] |
| HH:MM | Causa raíz identificada | [Quién] |
| HH:MM | Fix desplegado | [Quién] |
| HH:MM | Incidente resuelto | [Quión] |

### Impacto
- **Usuarios afectados:** [Cantidad]
- **Funcionalidad degradada:** [Qué dejó de funcionar]
- **Duración:** [Tiempo total del incidente]
- **SLA impactado:** [Sí/No - cuánto]

### Lecciones Aprendidas
- [Qué funcionó bien en la respuesta]
- [Qué se podría mejorar]
- [Conocimiento adquirido]

### Action Items Post-Incidente
| # | Acción | Responsable | Due Date | Estado |
|---|--------|-------------|----------|--------|
| 1 | [Acción concreta] | [Nombre] | [Fecha] | Pendiente |
| 2 | | | | |

---

Genera el análisis de debugging completo siguiendo esta estructura. Sé metódico, documenta tu razonamiento en cada fase, y no te saltes pasos por asumir "lo obvio".
```

## Ejemplo de Uso

**Input ejemplo:**
"Intermittent 500 errors en endpoint /api/orders. Logs muestran 'Connection timeout' en servicio de pagos. Ocurre ~5% de requests, más frecuente en horas pico. Stack: Node.js, PostgreSQL, Stripe API. Cambio reciente: upgrade de versión de axios."

**Output esperado:**
- Análisis de logs: timeout de 30s en llamada a Stripe, sin retry
- Hipótesis: H1) Falta timeout configurado en axios v1.x vs v0.x, H2) Rate limiting de Stripe, H3) Pool de conexiones agotado
- Verificación: H1 confirmada - axios v1 cambió default timeout a 0 (sin timeout)
- Causa raíz: falta de timeout explícito + falta de retry + falta de circuit breaker
- Opciones: A) Agregar timeout (rápido), B) Agregar timeout + retry + circuit breaker (recomendado)
- Solución: código con timeout de 10s, retry con backoff exponencial, circuit breaker
- Tests: test de timeout, test de retry, test de circuit breaker abierto
- Preventivo: revisar otros servicios externos por mismo patrón, agregar monitoreo de latencia

## Notas de calidad
- [ ] Se identifica la causa raíz, no solo síntomas
- [ ] Hay múltiples hipótesis evaluadas sistemáticamente
- [ ] Los logs son analizados en detalle con extracción de información relevante
- [ ] Se proponen múltiples opciones de solución comparadas
- [ ] El fix incluye manejo de casos edge
- [ ] Hay tests que reproducen el bug antes del fix
- [ ] Hay tests que validan la solución después del fix
- [ ] Se incluyen medidas preventivas a largo plazo
- [ ] Hay timeline del incidente para post-mortem
- [ ] Se documentan lecciones aprendidas y action items
