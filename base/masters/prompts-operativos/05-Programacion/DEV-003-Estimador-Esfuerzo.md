---
id: DEV-003
name: Estimador de Esfuerzo
category: Desarrollo de Software y Apps
agent_core: TechLeadFullStack
source_of_truth:
- manuales-desarrollo/arquitectura_base.md
- manuales-desarrollo/estandares_codigo.md
- manuales-desarrollo/flujo_git.md
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

# DEV-003: Estimador de Esfuerzo

**Objetivo:** Calcular estimaciones de esfuerzo precisas y realistas para funcionalidades de software, considerando toda la complejidad involucrada.

**Descripción:** Este prompt descompone funcionalidades en tareas detalladas, estima cada componente con factores de complejidad, identifica riesgos que impactan el tiempo, aplica buffers apropiados, y proporciona comparables con proyectos similares para validar las estimaciones.

## Contexto para el Usuario
Utiliza este prompt cuando necesites estimar una funcionalidad nueva para un cliente, planificar un sprint, o crear una propuesta comercial. Es especialmente útil para justificar tiempos ante stakeholders y para identificar tempranamente funcionalidades que podrían exceder presupuesto/tiempo.

## Cuando usar este prompt
- Se requiere estimar una funcionalidad nueva para presupuesto
- Planificación de roadmap/sprints
- Re-evaluación de estimaciones ante cambios de alcance
- Comparación de estimaciones vs. capacidad del equipo
- Identificación de funcionalidades que deben dividirse (muy grandes)

## Input necesario
**Descripción de la funcionalidad:** User stories, criterios de aceptación, mockups o referencias visuales, dependencias conocidas, y cualquier contexto técnico relevante.

## Output esperado
Desglose detallado con: estimación por tarea en horas/puntos, factor de complejidad, riesgos con impacto temporal, buffer calculado, rango de estimación (optimista/pesimista), y comparación con proyectos históricos.

## Prompt

```
Actúa como un Tech Lead Senior con amplia experiencia en estimación de software. Tu objetivo es producir estimaciones precisas, desglosadas y justificables para la siguiente funcionalidad.

## FUNCIONALIDAD A ESTIMAR (Input)
[COPIAR AQUÍ LA DESCRIPCIÓN DE LA FUNCIONALIDAD, USER STORIES, Y CRITERIOS DE ACEPTACIÓN]

---

## CONTEXTO DEL PROYECTO
- **Equipo disponible:** [Cantidad de desarrolladores y seniority]
- **Stack tecnológico:** [Tecnologías a utilizar]
- **Proyectos similares previos:** [Referencias si existen]
- **Restricciones de tiempo:** [Deadlines conocidos]
- **Estado del codebase:** [Greenfield / Brownfield / Legacy]
- **Calidad de documentación actual:** [Buena/Media/Pobre]
- **Disponibilidad de diseños/mockups:** [Sí/No - nivel de detalle]

---

## METODOLOGÍA DE ESTIMACIÓN
Usar combinación de:
1. **Desglose por tareas** (bottom-up)
2. **Puntos de historia** para complejidad relativa
3. **Análisis de riesgos** con impacto temporal
4. **Buffer para incertidumbre**

---

## FORMATO DE ENTREGA

### 1. RESUMEN EJECUTIVO
| Métrica | Valor |
|---------|-------|
| **Total Horas Estimadas** | [X horas] |
| **Total Story Points** | [Y pts] |
| **Rango Optimista** | [X horas] |
| **Rango Pesimista** | [Y horas] |
| **Duración Calendario** | [Z días/semanas] |
| **Complejidad Global** | Baja/Media/Alta |

**Recomendación:** [Ir más allá del tiempo estimado si supera cierto umbral]

### 2. DESGLOSE POR CAPA/TIPO DE TRABAJO

#### 2.1 Frontend
| Tarea | Descripción | Complejidad | Horas Est. | Riesgo |
|-------|-------------|-------------|------------|--------|
| FE-001 | [Descripción breve] | Baja/Media/Alta | Xh | Bajo/Medio/Alto |
| ... | | | | |
| **Subtotal Frontend** | | | **[Xh]** | |

#### 2.2 Backend
| Tarea | Descripción | Complejidad | Horas Est. | Riesgo |
|-------|-------------|-------------|------------|--------|
| BE-001 | [Descripción breve] | Baja/Media/Alta | Xh | Bajo/Medio/Alto |
| ... | | | | |
| **Subtotal Backend** | | | **[Xh]** | |

#### 2.3 Base de Datos
| Tarea | Descripción | Complejidad | Horas Est. | Riesgo |
|-------|-------------|-------------|------------|--------|
| DB-001 | [Descripción breve] | Baja/Media/Alta | Xh | Bajo/Medio/Alto |
| ... | | | | |
| **Subtotal BD** | | | **[Xh]** | |

#### 2.4 Integraciones/APIs Externas
| Tarea | Descripción | Complejidad | Horas Est. | Riesgo |
|-------|-------------|-------------|------------|--------|
| INT-001 | [Descripción breve] | Baja/Media/Alta | Xh | Bajo/Medio/Alto |
| ... | | | | |
| **Subtotal Integraciones** | | | **[Xh]** | |

#### 2.5 Testing
| Tarea | Descripción | Complejidad | Horas Est. | Riesgo |
|-------|-------------|-------------|------------|--------|
| TEST-001 | Tests unitarios | Media | Xh | Bajo |
| TEST-002 | Tests de integración | Alta | Yh | Medio |
| TEST-003 | Tests E2E críticos | Alta | Zh | Medio |
| **Subtotal Testing** | | | **[Xh]** | |

#### 2.6 DevOps/Infraestructura
| Tarea | Descripción | Complejidad | Horas Est. | Riesgo |
|-------|-------------|-------------|------------|--------|
| OPS-001 | [Descripción breve] | Baja/Media/Alta | Xh | Bajo/Medio/Alto |
| ... | | | | |
| **Subtotal DevOps** | | | **[Xh]** | |

#### 2.7 Documentación
| Tarea | Descripción | Complejidad | Horas Est. | Riesgo |
|-------|-------------|-------------|------------|--------|
| DOC-001 | README técnico | Baja | Xh | Bajo |
| DOC-002 | Documentación API | Media | Yh | Bajo |
| ... | | | | |
| **Subtotal Documentación** | | | **[Xh]** | |

### 3. ANÁLISIS DE COMPLEJIDAD TÉCNICA

Para cada factor, asignar peso y justificar:

| Factor | Peso (1-5) | Justificación |
|--------|-----------|---------------|
| **Algoritmos complejos** | | [Requiere algoritmos no triviales?] |
| **Concurrencia/Paralelismo** | | [Manejo de estados concurrentes?] |
| **Integraciones críticas** | | [Dependencia de sistemas externos?] |
| **Performance requerida** | | [Restricciones estrictas de tiempo?] |
| **Seguridad compleja** | | [Autorización granular, encriptación?] |
| **UX/UI compleja** | | [Interacciones avanzadas, animaciones?] |
| **Deuda técnica existente** | | [Código legacy a modificar?] |
| **Nuevo stack para el equipo** | | [Tecnología que no dominan?] |

**Puntaje Total:** [Suma de pesos]
**Interpretación:** [Baja < 10, Media 10-20, Alta > 20]

### 4. RIESGOS CON IMPACTO TEMPORAL

| ID | Riesgo | Probabilidad | Impacto en horas | Mitigación |
|----|--------|-------------|------------------|------------|
| R-001 | [Descripción específica] | Alta/Media/Baja | +Xh | [Acción preventiva] |
| R-002 | API externa inestable | Media | +8h | Implementar circuit breaker |
| ... | | | | |
| **Total Impacto Riesgos** | | | **+[Xh]** | |

### 5. CÁLCULO DE BUFFER

**Fórmula aplicada:** 
- Base: Suma de horas estimadas
- Buffer de contingencia: [15-30%] según incertidumbre
- Buffer de riesgos: Suma de impactos de riesgos

| Concepto | Horas | % del Base |
|----------|-------|-----------|
| Estimación base (suma de tareas) | [Xh] | 100% |
| Buffer incertidumbre (X%) | +[Yh] | [X%] |
| Buffer riesgos identificados | +[Zh] | [X%] |
| **TOTAL ESTIMADO** | **[Total]** | **[X%]** |

**Justificación del % de buffer:** [Explicar por qué ese porcentaje]

### 6. ANÁLISIS DE INCERTIDUMBRE (Cono de incertidumbre)

| Escenario | Horas | Probabilidad | Condiciones |
|-----------|-------|--------------|-------------|
| **Optimista** | [Xh] | 10% | Todo sale perfecto, sin impedimentos |
| **Más Probable** | [Yh] | 60% | Escenario normal con buffer |
| **Pesimista** | [Zh] | 30% | Múltiples riesgos se materializan |
| **Pérdida total** | [Wh] | <5% | Replanificación completa necesaria |

### 7. COMPARACIÓN CON PROYECTOS SIMILARES

| Proyecto Similar | Funcionalidad | Horas Reales | Estimación vs. Real | Diferencia |
|------------------|---------------|--------------|---------------------|------------|
| [Nombre proyecto] | [Descripción] | [Xh] | Estimado [Yh] vs Real [Xh] | +/- X% |
| ... | | | | |

**Conclusión:** [La estimación está alineada con histórico / es más conservadora por X / es más optimista por Y]

### 8. RECOMENDACIONES

**¿Debe dividirse la funcionalidad?**
- [ ] No, el tamaño es apropiado
- [ ] Sí, recomiendo dividir en: [Partes sugeridas]

**Secuencia de implementación recomendada:**
1. [Primera parte a desarrollar]
2. [Segunda parte]
3. ...

**Red flags identificadas:**
- [Elemento que podría causar sobrepaso]
- [Dependencia inestable]

**Recomendaciones de mitigación:**
- [Acción concreta para reducir riesgos]
- [Spike investigación previa recomendada]

### 9. CAPACIDAD DEL EQUIPO

| Recurso | Disponibilidad | Capacidad Sprint | Capacidad Total |
|---------|---------------|------------------|-----------------|
| Senior Dev | [X%] | [Yh] | [Zh] |
| Mid Dev | [X%] | [Yh] | [Zh] |
| Junior Dev | [X%] | [Yh] | [Zh] |
| **Capacidad Total** | | **[Xh]** | **[Yh]** |

**Análisis:** [La estimación cabe en capacidad / se requiere ampliar equipo / extender timeline]

---

Genera la estimación completa con el mayor nivel de detalle posible. Sé conservador pero realista. Justifica cada número de horas con el razonamiento detrás.
```

## Ejemplo de Uso

**Input ejemplo:**
"Feature de checkout con múltiples métodos de pago (tarjeta de crédito, PayPal, transferencia). Debe incluir: carrito persistente, cálculo de impuestos según región, validación de tarjeta en tiempo real, confirmación por email, y panel admin para ver transacciones. Integración con Stripe y PayPal APIs."

**Output esperado:**
- Resumen: 120 horas totales, rango 100-150 horas, 3 semanas calendario
- Frontend: 40h (formulario checkout, validaciones, estados de pago)
- Backend: 50h (endpoints de pago, webhooks, lógica de impuestos)
- BD: 10h (tablas de transacciones, órdenes, carritos)
- Integraciones: 20h (Stripe, PayPal, email service)
- Testing: 15h (unitarios, integración con gateways sandbox)
- Buffer 20% aplicado por dependencia de APIs externas
- Riesgos: cambios en APIs de pago (+8h), complejidad de impuestos internacionales (+10h)
- Recomendación: implementar un método de pago primero, luego extender

## Notas de calidad
- [ ] Cada tarea tiene descripción clara y estimación justificada
- [ ] La complejidad técnica se evalúa con múltiples factores
- [ ] Los riesgos tienen impacto temporal cuantificado
- [ ] El buffer tiene justificación explícita del % aplicado
- [ ] Se incluyen escenarios optimista/pesimista
- [ ] Hay comparación con proyectos históricos similares
- [ ] Se analiza capacidad del equipo vs. estimación
- [ ] Se identifican red flags y recomendaciones de mitigación
- [ ] Se evalúa si la funcionalidad debe dividirse
- [ ] Las horas son desglosables por recurso
