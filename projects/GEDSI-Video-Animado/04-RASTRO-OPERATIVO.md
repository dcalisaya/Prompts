# Rastro Operativo

## Estado del rastro

Este documento mezcla:

- `rastro confirmado`: lo que sí existe en los archivos históricos
- `rastro inferido`: reconstrucción razonable usando la librería actual de Live Developer

## Servicio principal

- `AV-006` Video Animado 2D

## Servicios complementarios posibles

- `AV-011` Locución Español
- `AV-004` Edición de Video

## Flujo operativo reconstruido

### Etapa 1. Brief / Concepto

- input: objetivo educativo sobre GEDSI, público amplio, formato vertical
- output: enfoque narrativo y lineamientos visuales
- estado: `inferido`

### Etapa 2. Guion

- documento: [02-GUION.md](/Users/dcalisaya/Developer/Prompts/projects/GEDSI-Video-Animado/02-GUION.md)
- agente recomendado: [GuionistaCinematografico.md](/Users/dcalisaya/Developer/Prompts/base/masters/agents/GuionistaCinematografico.md)
- apoyo directivo: [DirectorAudiovisual.md](/Users/dcalisaya/Developer/Prompts/base/masters/agents/DirectorAudiovisual.md)
- prompt recomendado:
  - [SCRIPT-001-Guiones-Retencion.md](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/02-Produccion-Audiovisual/SCRIPT-001-Guiones-Retencion.md)
- estado: `parcialmente confirmado`

### Etapa 3. Storyboard / Desglose de tomas

- documento: [03-STORYBOARD-DESGLOSE-TOMAS.md](/Users/dcalisaya/Developer/Prompts/projects/GEDSI-Video-Animado/03-STORYBOARD-DESGLOSE-TOMAS.md)
- agente recomendado: [ArtistaStoryboard.md](/Users/dcalisaya/Developer/Prompts/base/masters/agents/ArtistaStoryboard.md)
- prompt recomendado:
  - [STORY-001-Storyboard-Desglose-Tomas.md](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/02-Produccion-Audiovisual/STORY-001-Storyboard-Desglose-Tomas.md)
- estado: `confirmado`

### Etapa 4. Imagen generativa / continuidad visual

- agentes recomendados:
  - [DirectorFotografiaT2I.md](/Users/dcalisaya/Developer/Prompts/base/masters/agents/DirectorFotografiaT2I.md)
  - [DirectorTecnicoI2V.md](/Users/dcalisaya/Developer/Prompts/base/masters/agents/DirectorTecnicoI2V.md)
- manuales recomendados:
  - [guia_maestra_storyboard.md](/Users/dcalisaya/Developer/Prompts/base/masters/manuales-produccion/guia_maestra_storyboard.md)
  - [guia_maestra_i2v.md](/Users/dcalisaya/Developer/Prompts/base/masters/manuales-produccion/guia_maestra_i2v.md)
- estado: `no capturado en los archivos históricos`

### Etapa 5. Música / ambiente sonoro

- prompt aplicable:
  - [AUDIO-001-Musica-Animacion.md](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/02-Produccion-Audiovisual/AUDIO-001-Musica-Animacion.md)
- estado: `posible uso directo`

## Manuales fuente de verdad recomendados

- [guia_maestra_guion.md](/Users/dcalisaya/Developer/Prompts/base/masters/manuales-produccion/guia_maestra_guion.md)
- [fundamentos_guion.md](/Users/dcalisaya/Developer/Prompts/base/masters/manuales-produccion/fundamentos_guion.md)
- [fundamentos_storyboard.md](/Users/dcalisaya/Developer/Prompts/base/masters/manuales-produccion/fundamentos_storyboard.md)
- [guia_maestra_storyboard.md](/Users/dcalisaya/Developer/Prompts/base/masters/manuales-produccion/guia_maestra_storyboard.md)
- [guia_maestra_i2v.md](/Users/dcalisaya/Developer/Prompts/base/masters/manuales-produccion/guia_maestra_i2v.md)

## Qué faltó capturar en el caso original

- brief operativo original
- prompt exacto usado para el guion
- prompt exacto usado para el storyboard
- prompts T2I por escena
- prompts I2V por plano
- configuración del motor de voz
- lista final de assets y renders

## Recomendación para siguientes proyectos IA

Todo proyecto audiovisual IA debería conservar, como mínimo:

1. brief aprobado
2. guion
3. storyboard / shot list
4. prompts T2I
5. prompts I2V
6. manuales y agentes usados
7. servicios asociados
8. rastro de decisiones y versiones

