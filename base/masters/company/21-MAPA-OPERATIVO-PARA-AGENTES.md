# Mapa Operativo para Agentes

## Proposito

Este documento existe para acelerar el trabajo de agentes sobre la base canónica.

No reemplaza:

- prompts
- agentes maestros
- manuales
- reglas comerciales

Su función es decirle al agente por dónde debe entrar según el tipo de necesidad detectada.

## Regla principal

Cuando un agente recibe una solicitud, no debe empezar recorriendo carpetas al azar.

Debe resolver en este orden:

1. modo operativo
2. disciplina principal
3. servicio probable
4. prompt principal
5. agente maestro de soporte
6. manual o regla de verdad si aplica
7. proyecto real comparable si existe

## Mapa mínimo por modo

### `discover`

Uso:

- necesidad verde
- duda sobre qué servicio aplica
- respuesta comercial consultiva

Ruta base:

- prompt principal: `COM-001`
- agente principal: `AsesorComercialServicios`
- soporte normativo: `08-SERVICES.md`
- salida esperada: recomendación comercial y siguiente paso

## `quote`

Uso:

- proforma
- cotización
- alcance preliminar

Ruta base:

- prompt principal: `COM-002`
- agente principal: `AsesorComercialServicios`
- soporte normativo:
  - `09-SERVICE-MATRIX.md`
  - `11-REGLAS-DE-COTIZACION.md`
  - `10-PRICING-INTERNO.md` cuando aplique
- salida esperada: estructura preliminar de propuesta

## `plan`

Uso:

- cronograma
- estructura de producción
- plan de trabajo

Ruta base:

- prompt principal: depende de disciplina
- agente principal: depende de disciplina
- soporte normativo: manuales y casos reales
- salida esperada: fases, entregables, dependencias y riesgos

## `review`

Uso:

- revisión antes de enviar
- validación de propuesta o entregable

Ruta base:

- agente principal: `AuditorCalidad`
- soporte normativo:
  - `05-ESTANDAR-DE-CALIDAD.md`
  - reglas específicas del área
- salida esperada: hallazgos, riesgos, ajustes

## `execute`

Uso:

- caso aprobado
- paso a operación
- kickoff

Ruta base:

- soporte normativo:
  - `13-FLUJO-COMERCIAL-Y-OPERATIVO.md`
  - `12-BRIEFS-POR-SERVICIO.md`
  - manuales del área
- salida esperada: secuencia operativa y criterios de entrega

## `upsell`

Uso:

- continuidad
- expansión
- siguiente fase

Ruta base:

- prompt principal: `COM-001`
- agente principal: `AsesorComercialServicios`
- soporte normativo: `08-SERVICES.md`
- salida esperada: oportunidad de continuidad defendible

## Rutas mínimas por necesidad frecuente

### 1. Proforma de video animado

Detección:

- modo: `quote`
- disciplina: producción audiovisual / imagen y video IA
- servicio probable: `AV-006`

Ruta:

- prompt principal: `COM-002`
- prompt de soporte: `STORY-001`
- agente principal: `AsesorComercialServicios`
- agente de soporte: `ArtistaStoryboard`
- soporte normativo:
  - `08-SERVICES.md`
  - `09-SERVICE-MATRIX.md`

Salida esperada:

- descripción corta
- fases de preproducción, producción y postproducción
- vacíos por confirmar

## 2. Producción de podcasts

Detección:

- modo: `quote` o `plan`
- disciplina: producción audiovisual / contenido
- servicio probable: `AV-013`

Ruta:

- prompt principal: `PROD-001`
- prompt comercial de soporte: `COM-002`
- prompt de piezas derivadas: `SCRIPT-001`
- agente principal: `DirectorAudiovisual`
- soporte normativo:
  - `03-FLOW-PODCAST.md`
  - `08-SERVICES.md`
  - `09-SERVICE-MATRIX.md`

Salida esperada:

- propuesta preliminar
- estructura de temporada o producción
- preguntas mínimas de formato, alcance y distribución

## 3. Podcast con pauta o distribución paga

Detección:

- modo: `quote` o `plan`
- disciplinas: producción audiovisual + media / performance

Ruta:

- prompt principal: `COM-002` o `PROD-001` según foco
- prompt de media: `MEDIA-001`
- prompt de performance: `MEDIA-002`, `ADS-001`, `ADS-002` o `ADS-003` según canal
- agentes de soporte:
  - `DirectorAudiovisual`
  - `MediaPlanner`
  - `PerformanceMarketer`

Salida esperada:

- propuesta consolidada
- bloque de producción
- bloque de distribución o pauta

## 4. Campaña con landing + pauta + automatización

Detección:

- modo: `discover` o `quote`
- disciplinas:
  - estrategia
  - media
  - CRM
  - desarrollo

Ruta:

- prompt principal: `COM-001` o `COM-002`
- prompts de soporte:
  - `FUN-001`
  - `MEDIA-001`
  - `CRM-001`
  - `DEV-001`
- agentes de soporte:
  - `EstrategaDigital`
  - `MediaPlanner`
  - `CRMStrategist`
  - `ArquitectoSoftware`

Salida esperada:

- lectura multidisciplinaria
- vacíos críticos antes de cotizar
- estructura preliminar por bloques

## 5. Revisión antes de enviar a cliente

Detección:

- modo: `review`

Ruta:

- agente principal: `AuditorCalidad`
- agente secundario: según disciplina
- soporte normativo: reglas del área implicada

Salida esperada:

- observaciones accionables
- riesgos
- mejoras previas al envío

## Regla de uso de `projects/`

Cuando exista un caso real comparable en `projects/`, el agente debe usarlo para:

- validar estructura
- revisar precedentes
- mejorar criterio práctico

Pero no debe usarlo como norma si contradice la base canónica.

## Regla de salida mínima

Toda ruta debería poder terminar en:

- solicitud detectada
- disciplinas involucradas
- supuestos
- vacíos críticos
- respuesta preliminar
- siguiente paso

## Uso recomendado para agentes

Un agente que entra por primera vez al repo debería leer, en este orden:

1. `docs/AGENT-OPERATING-PROTOCOL.md`
2. `docs/AGENT-INTAKE-STANDARD.md`
3. `docs/AGENT-OUTPUT-STANDARD.md`
4. este documento
5. luego ir a prompts, agentes, manuales o proyectos según el caso
