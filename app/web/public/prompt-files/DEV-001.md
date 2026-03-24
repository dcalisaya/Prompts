---
id: DEV-001
name: Especificador de Requerimientos Técnicos
category: Desarrollo de Software y Apps
agent_core: ArquitectoSoftware
source_of_truth:
- manuales-desarrollo/stack_tecnologico.md
- manuales-desarrollo/arquitectura_base.md
- manuales-desarrollo/estandares_codigo.md
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

# DEV-001: Especificador de Requerimientos Técnicos

**Objetivo:** Transformar necesidades de negocio vagas o generales en especificaciones técnicas detalladas, accionables y estimables.

**Descripción:** Este prompt analiza una necesidad de negocio y la descompone en user stories técnicamente sólidas, criterios de aceptación medibles, dependencias identificadas y riesgos técnicos evaluados. Sirve como puente entre el dominio del negocio y el dominio técnico.

## Contexto para el Usuario
Utiliza este prompt cuando recibas requerimientos de clientes o stakeholders que necesiten ser traducidos a lenguaje técnico antes de iniciar el desarrollo. Es especialmente útil en la fase de discovery o refinamiento de backlog.

## Cuando usar este prompt
- Un cliente presenta una necesidad de negocio sin especificaciones técnicas
- Se requiere estimar una funcionalidad nueva pero falta definición
- El equipo técnico necesita claridad sobre alcance y comportamiento esperado
- Se debe documentar el análisis de un requerimiento para aprobación del cliente

## Input necesario
**Requerimiento de negocio:** Descripción de la necesidad del cliente en lenguaje de negocio (puede incluir objetivos, usuarios afectados, restricciones y resultados esperados)

## Output esperado
Documento estructurado con: análisis del problema, user stories (formato Connextra + criterios Gherkin), dependencias técnicas, riesgos identificados con mitigación, y notas de implementación.

## Prompt

```
Actúa como un Arquitecto de Software Senior especializado en análisis de requerimientos. Tu tarea es convertir la siguiente necesidad de negocio en especificaciones técnicas detalladas.

## REQUERIMIENTO DE NEGOCIO (Input)
[COPIAR AQUÍ LA NECESIDAD DE NEGOCIO]

---

## INSTRUCCIONES DE ANÁLISIS

### 1. ANÁLISIS DEL PROBLEMA
- **Contexto actual:** ¿Cuál es la situación que generó este requerimiento?
- **Dolor/Pain point:** ¿Qué problema específico resuelve?
- **Beneficio esperado:** ¿Qué valor agrega al negocio?
- **Usuarios impactados:** ¿Quiénes son los actores principales y secundarios?

### 2. USER STORIES
Para cada funcionalidad identificada, crear user stories siguiendo este formato:

```
**US-[NÚMERO]: [Título descriptivo]**
- **Como** [tipo de usuario]
- **Quiero** [acción/objetivo]
- **Para que** [beneficio/valor]

**Criterios de Aceptación (Gherkin):**
```gherkin
Escenario: [Título del escenario]
  Dado [contexto inicial]
  Cuando [acción realizada]
  Entonces [resultado esperado]
  Y [resultado adicional si aplica]
```

**Notas técnicas:**
- Reglas de negocio relevantes
- Validaciones requeridas
- Estados posibles
- Casos edge identificados
```

### 3. DEPENDENCIAS TÉCNICAS
Identificar todas las dependencias necesarias:
- **Servicios/APIs externos:** ¿Qué integraciones requiere?
- **Base de datos:** ¿Nuevas tablas, campos o migraciones?
- **Frontend:** ¿Nuevos componentes, pantallas, estados?
- **Backend:** ¿Nuevos endpoints, servicios, workers?
- **Infraestructura:** ¿Cambios en deploy, variables de entorno, servicios cloud?
- **Equipos/terceros:** ¿Dependerá de otros equipos o proveedores?

### 4. RIESGOS TÉCNICOS
Para cada riesgo identificado:
| Riesgo | Probabilidad | Impacto | Estrategia de Mitigación |
|--------|-------------|---------|-------------------------|
| [Descripción] | Alta/Media/Baja | Alto/Medio/Bajo | [Acción concreta] |

Categorías a evaluar:
- Riesgos de integración con sistemas externos
- Riesgos de performance o escalabilidad
- Riesgos de seguridad o compliance
- Riesgos de conocimiento técnico del equipo
- Riesgos de dependencias de terceros

### 5. PREGUNTAS ABIERTAS
Lista de preguntas que deben responderse antes de iniciar desarrollo.

### 6. CRITERIOS DE DONE TÉCNICO
Checklist de lo que debe cumplirse para considerar el requerimiento completado:
- [ ] Código implementado y revisado
- [ ] Tests unitarios con cobertura mínima requerida
- [ ] Tests de integración pasando
- [ ] Documentación técnica actualizada
- [ ] Documentación de usuario (si aplica)
- [ ] Validación en ambiente de staging
- [ ] Aprobación de QA
- [ ] Aprobación del cliente/stakeholder

### 7. NOTAS DE IMPLEMENTACIÓN
- **Complejidad estimada:** Baja/Media/Alta
- **Stack recomendado:** Tecnologías específicas a utilizar
- **Patrones sugeridos:** Arquitecturas o patrones de diseño aplicables
- **Restricciones técnicas:** Limitaciones conocidas
- **Consideraciones de UX/UI:** Elementos de diseño a tener en cuenta

---

Genera el análisis completo siguiendo esta estructura exacta. Sé específico, evita generalidades, y cuestiona cualquier ambigüedad en el requerimiento original.
```

## Ejemplo de Uso

**Input ejemplo:**
"Necesitamos que los clientes puedan rastrear sus pedidos en tiempo real desde la app móvil. Ahora mismo reciben un email con el número de seguimiento, pero tienen que ir a la página del transportista. Queremos que vean el estado directamente en nuestra app."

**Output esperado:**
- Análisis del problema identificando la fricción actual del usuario
- User stories para: visualización de tracking, integración con transportistas, notificaciones de cambio de estado
- Criterios de aceptación Gherkin para cada escenario (tracking encontrado, no encontrado, error de API)
- Dependencias: APIs de transportistas (DHL, FedEx, etc.), base de datos de pedidos, servicio de notificaciones push
- Riesgos: disponibilidad de APIs de terceros, rate limits, normalización de datos entre transportistas
- Preguntas abiertas: ¿Qué transportistas priorizar?, ¿Se requiere mapa en tiempo real o solo estados?

## Notas de calidad
- [ ] Cada user story tiene criterios de aceptación medibles y testeables
- [ ] Los criterios Gherkin usan lenguaje preciso (Dado/Cuando/Entonces)
- [ ] Se identifican al menos los riesgos de mayor probabilidad/impacto
- [ ] Las dependencias están mapeadas con su tipo (bloqueante/nice-to-have)
- [ ] Se incluyen casos edge en las notas técnicas de cada US
- [ ] El análisis cuestiona ambigüedades del requerimiento original
- [ ] El output puede usarse directamente para estimación y planificación
