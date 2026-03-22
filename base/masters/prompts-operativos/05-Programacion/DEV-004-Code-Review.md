---
id: DEV-004
name: Code Review Systemático
category: Desarrollo de Software y Apps
agent_core: CodeAuditor
source_of_truth:
- manuales-desarrollo/estandares_codigo.md
- manuales-desarrollo/seguridad_codigo.md
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

# DEV-004: Code Review Systemático

**Objetivo:** Revisar código fuente de manera exhaustiva según estándares del equipo, identificando bugs, problemas de performance, deuda técnica y vulnerabilidades de seguridad.

**Descripción:** Este prompt realiza una revisión de código estructurada aplicando un checklist de calidad completo, detectando problemas funcionales, sugiriendo mejoras de performance, proponiendo refactorizaciones, y verificando aspectos de seguridad críticos.

## Contexto para el Usuario
Utiliza este prompt antes de enviar un PR a revisión humana, o como revisión inicial cuando recibes código de otro desarrollador. Es especialmente útil para asegurar calidad consistente cuando el equipo crece o para revisar código crítico.

## Cuando usar este prompt
- Revisión de PR antes de enviar a reviewers humanos
- Revisión de código generado por herramientas de IA
- Auditoría de código crítico (pagos, seguridad, datos sensibles)
- Onboarding: revisar código de desarrolladores nuevos
- Refactorización: revisar cambios en código legacy

## Input necesario
**Código a revisar:** Bloque de código (función, clase, módulo o diff de PR) + contexto del cambio (qué problema resuelve, requisitos relacionados).

## Output esperado
Reporte estructurado con: hallazgos por categoría, severidad de cada issue, sugerencias de mejora con código de ejemplo, y veredicto general de aprobación/condicional/rechazo.

## Prompt

```
Actúa como un Senior Code Reviewer con experiencia en múltiples stacks y especialización en clean code, performance y seguridad. Realiza una revisión exhaustiva del siguiente código.

## CÓDIGO A REVISAR (Input)
[COPIAR AQUÍ EL CÓDIGO - Puede ser función, clase, archivo completo, o diff de PR]

---

## CONTEXTO DEL CAMBIO
- **Propósito:** [¿Qué problema resuelve este código?]
- **Requisitos relacionados:** [User story o ticket]
- **Stack/Lenguaje:** [Lenguaje y framework]
- **Áreas críticas:** [¿Toca seguridad, pagos, datos sensibles?]
- **Nivel de urgencia:** [Crítica/Media/Baja]
- **Base de código:** [Nuevo código / Modificación de existente]

---

## CHECKLIST DE REVISIÓN
Evaluar el código en cada una de estas categorías:

### 1. CORRECCIÓN FUNCIONAL (Blocking Issues)
- [ ] El código cumple con los requisitos funcionales
- [ ] Maneja correctamente casos edge y errores
- [ ] No tiene bugs lógicos evidentes
- [ ] Validaciones de input son apropiadas

### 2. CALIDAD Y MANTENIBILIDAD
- [ ] Nomenclatura clara y consistente (variables, funciones, clases)
- [ ] Funciones son pequeñas y con un solo propósito (SRP)
- [ ] No hay código duplicado (DRY)
- [ ] Complejidad ciclomática aceptable
- [ ] Comentarios son necesarios y actuales (no obvios)
- [ ] Estructura del código sigue convenciones del equipo

### 3. TESTING
- [ ] Tiene tests unitarios que cubren el caso feliz
- [ ] Tiene tests para casos edge y errores
- [ ] Tests son determinísticos (no flaky)
- [ ] Cobertura es apropiada para la criticidad del código
- [ ] Mocks/stubs son apropiados

### 4. PERFORMANCE Y OPTIMIZACIÓN
- [ ] No hay N+1 queries en BD
- [ ] No hay memory leaks evidentes
- [ ] Operaciones costosas están optimizadas
- [ ] Caching aplicado donde corresponde
- [ ] No hay bloqueos innecesarios

### 5. SEGURIDAD (Security Hotspots)
- [ ] No hay SQL/NoSQL/Command injection
- [ ] No hay XSS vulnerabilities
- [ ] Datos sensibles no se loggean
- [ ] Secrets no están hardcodeados
- [ ] Validación de autorización (ownership de recursos)
- [ ] Rate limiting considerado
- [ ] Inputs sanitizados
- [ ] Dependencias no tienen vulnerabilidades conocidas

### 6. ARQUITECTURA Y DISEÑO
- [ ] Sigue principios SOLID
- [ ] No viola la arquitectura establecida
- [ ] Dependencias son explícitas y justificadas
- [ ] No hay acoplamiento innecesario
- [ ] Abstracciones son apropiadas

### 7. MANEJO DE ERRORES
- [ ] Errores son capturados apropiadamente
- [ ] Mensajes de error son útiles (sin filtrar info sensible)
- [ ] Logs son apropiados (nivel, contexto)
- [ ] Rollback/estado consistente ante fallos

### 8. API/INTERFACES (si aplica)
- [ ] Contrato de API es consistente
- [ ] Versionado considerado
- [ ] Documentación de API actualizada
- [ ] Backward compatibility mantenido (si aplica)

### 9. BASE DE DATOS (si aplica)
- [ ] Queries son eficientes
- [ ] Índices considerados para queries frecuentes
- [ ] Migraciones son reversibles
- [ ] No hay pérdida de datos en migraciones

### 10. DOCUMENTACIÓN
- [ ] README actualizado si es necesario
- [ ] Changelog actualizado
- [ ] Decisiones complejas están documentadas

---

## FORMATO DE ENTREGA

### RESUMEN EJECUTIVO
| Métrica | Valor |
|---------|-------|
| **Veredicto** | ✅ Aprobado / ⚠️ Aprobado con comentarios / ❌ Cambios requeridos |
| **Issues Críticos** | [X] |
| **Issues Mayores** | [X] |
| **Issues Menores** | [X] |
| **Sugerencias** | [X] |
| **Puntaje General** | [X/10] |

### HALLAZGOS POR SEVERIDAD

#### 🔴 CRÍTICO (Blocking - Debe corregirse antes de merge)
| # | Línea(s) | Problema | Impacto | Sugerencia de Fix |
|---|----------|----------|---------|-------------------|
| C1 | [Núm] | [Descripción clara] | [Qué puede fallar] | [Código sugerido] |

#### 🟠 MAYOR (Should Fix - Fuerte recomendación)
| # | Línea(s) | Problema | Por qué importa | Sugerencia de Mejora |
|---|----------|----------|-----------------|----------------------|
| M1 | [Núm] | [Descripción clara] | [Explicación] | [Código sugerido] |

#### 🟡 MENOR (Nice to have - Sugerencia opcional)
| # | Línea(s) | Observación | Sugerencia |
|---|----------|-------------|------------|
| m1 | [Núm] | [Descripción] | [Sugerencia] |

#### 💡 REFACTORING PROPUESTO
Para mejoras de diseño que no son bugs:

| # | Área | Problema de diseño | Propuesta de refactor | Beneficio |
|---|------|-------------------|----------------------|-----------|
| R1 | [Función/Clase] | [Qué viola] | [Cómo reestructurar] | [Mejora esperada] |

#### ⚡ OPTIMIZACIONES DE PERFORMANCE
| # | Línea(s) | Problema | Optimización sugerida | Ganancia estimada |
|---|----------|----------|----------------------|-------------------|
| P1 | [Núm] | [Ineficiencia] | [Código optimizado] | [X% más rápido / menos memoria] |

#### 🔒 PROBLEMAS DE SEGURIDAD
| # | Línea(s) | Vulnerabilidad | Severidad | Fix requerido |
|---|----------|---------------|-----------|---------------|
| S1 | [Núm] | [Tipo de vuln] | Crítica/Alta/Media | [Código seguro] |

### POSITIVOS DESTACADOS
Reconocer lo que se hizo bien:
- ✅ [Aspecto positivo del código]
- ✅ [Buena práctica aplicada]
- ✅ [Diseño elegante]

### PATRONES IDENTIFICADOS
Si hay problemas recurrentes:
- [Patrón observado y cómo evitarlo en el futuro]

### SUGERENCIAS DE APRENDIZAJE
Recursos para profundizar:
- [Link o referencia sobre tema relacionado]

### CONVERSACIONES SUGERIDAS
Temas que podrían discutirse en equipo:
- [Pregunta arquitectónica]
- [Trade-off de diseño]

---

## INSTRUCCIONES ADICIONALES

1. Sé específico: indica números de línea exactos
2. Sé constructivo: explica el "por qué" detrás de cada sugerencia
3. Sé pragmático: prioriza issues reales sobre preferencias de estilo
4. Sé educado: el objetivo es mejorar el código, no criticar al autor
5. Proporciona código de ejemplo para fixes importantes
6. Considera el contexto: no apliques estándares de NASA a un script interno

Genera la revisión completa siguiendo esta estructura.
```

## Ejemplo de Uso

**Input ejemplo:**
```javascript
async function processPayment(orderId, cardToken) {
  const order = await db.query(`SELECT * FROM orders WHERE id = ${orderId}`);
  
  if (!order) {
    console.log("Order not found");
    return;
  }
  
  const payment = await stripe.charges.create({
    amount: order.total * 100,
    currency: 'usd',
    source: cardToken
  });
  
  await db.query(`UPDATE orders SET status = 'paid', payment_id = '${payment.id}' WHERE id = ${orderId}`);
  
  return payment;
}
```

**Output esperado:**
- Veredicto: ❌ Cambios requeridos
- Crítico: SQL Injection en queries (línea 2, 14), falta manejo de errores de Stripe
- Mayor: No se verifica ownership de la orden, no hay idempotency key
- Seguridad: datos de tarjeta procesados sin validación adicional
- Performance: queries sin prepared statements
- Refactoring: extraer lógica de pago a servicio, usar repository pattern
- Positivo: uso de async/await

## Notas de calidad
- [ ] Cada issue identificado tiene línea(s) específica(s)
- [ ] Las sugerencias incluyen código de ejemplo cuando es útil
- [ ] El veredicto es claro (aprobar/aprobado con comentarios/cambios requeridos)
- [ ] Se distinguen issues de estilo vs. issues funcionales
- [ ] Se identifican vulnerabilidades de seguridad reales
- [ ] Se reconocen aspectos positivos del código
- [ ] El tono es constructivo y profesional
- [ ] Se considera el contexto y criticidad del código
- [ ] Se sugieren recursos de aprendizaje cuando aplica
- [ ] Se identifican patrones problemáticos recurrentes
