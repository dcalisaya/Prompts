# Auditoría y Estándar de Metadatos - base/masters

Este documento detalla los hallazgos de la auditoría estructural y define el estándar canónico para la metadata del ecosistema Live Developer.

## A. Hallazgos Principales

1.  **Metadata Fragmentada**: Actualmente la metadata de los agentes maestros vive en un JSON centralizado (`18-NAVEGACION-CANONICA.json`), mientras que la de los prompts vive parcialmente en el YAML de los archivos `.md` y parcialmente en reglas de prefijos en el JSON. Esto dificulta la edición manual y la consistencia.
2.  **Inconsistencia de Taxonomía**: Existen tres capas de nombres para las mismas áreas:
    *   Nombres de carpetas (ej. `05-Programacion`)
    *   Nombres de categorías en YAML (ej. `Programacion`)
    *   Nombres en el Catálogo de Servicios (ej. `Desarrollo de Software y Apps`)
    *   Disciplinas en Navegación Canónica (ej. `Desarrollo de Software`)
3.  **Falta de Vinculación con Servicios**: La mayoría de los prompts no declaran explícitamente a qué `service_code` (ej. `DEV-001`, `AV-004`) del catálogo pertenecen, lo que debilita el uso de la app para ventas y operaciones.
4.  **Agentes sin Metadata Local**: Los archivos de agentes en `base/masters/agents/` carecen de front matter. Toda su "inteligencia" de mapeo es externa al archivo.
5.  **Manuales no Estructurados**: Los manuales de producción y desarrollo no tienen metadata, lo que impide que el sistema sepa automáticamente qué manual es `source_of_truth` para qué prompt sin mapeo manual en el JSON.

## B. Estándar de Metadatos Canónico

A partir de ahora, todos los activos en `base/masters` deben incluir el siguiente front matter YAML:

### 1. Prompts Operativos (`base/masters/prompts-operativos/`)

```yaml
---
id: [ID-UNICO]            # Ej: CRM-001
name: [NOMBRE-CORTO]      # Ej: Estrategia de Email Marketing
version: 1.0.0
category: [CATEGORIA-CATALOGO] # Alineado con 08-SERVICES.md
discipline: [DISCIPLINA]       # Alineado con 18-NAVEGACION-CANONICA.json
agent_core: [AGENT_ID]         # ID del agente responsable
tags: [tag1, tag2]
source_of_truth:               # Lista de manuales o docs base
  - base/masters/manuales-produccion/guia_maestra.md
related_services:              # Lista de service_code de 09-SERVICE-MATRIX.md
  - CX-003
stage: [ETAPA]                 # discovery, strategy, production, audit, etc.
deliverable_type: [TIPO]       # Ej: Plan de contenidos, Guion, Auditoria
input_type: [INPUT]            # Ej: Brief comercial, URL, Documento
---
```

### 2. Agentes Maestros (`base/masters/agents/`)

```yaml
---
name: [AGENT_ID]
role: [NOMBRE-Y-NICKNAME]      # Ej: CRMStrategist ("Retención")
discipline: [DISCIPLINA]
related_services: [LISTA-SERVICE-CODE]
stage: [FOCO-PRINCIPAL]
deliverable_type: [PRINCIPAL-ENTREGABLE]
---
```

### 3. Manuales (`base/masters/manuales-*/`)

```yaml
---
id: [ID-MANUAL]
name: [NOMBRE-MANUAL]
category: [CATEGORIA]
discipline: [DISCIPLINA]
type: [tecnico|operativo|comercial]
---
```

## C. Mapa de Normalización de Categorías (Propuesta)

| Categoría Actual | Categoría Catálogo (Propuesta para YAML) | Disciplina (Navegación) |
| :--- | :--- | :--- |
| Programación | Desarrollo de Software y Apps | Desarrollo de Software |
| PR y Comunicación | Relaciones Públicas y Comunicación | PR y Comunicación |
| Data y Analytics | Data, Analytics e Insights | Data, Analytics e Insights |
| Media y Performance | Media Planning y Performance | Media, Performance y SEO |
| Tráfico y Spotify | Media Planning y Performance | Media, Performance y SEO |
| CX y CRM | Customer Experience y CRM | CX, CRM y Retención |
| Estrategia y Funnels | Marketing Digital y Contenidos | Estrategia Digital |
| Atención Comercial | Gestión Comercial | Comercial y Ventas |
| Commerce | Commerce Avanzado | Commerce y E-commerce |

## D. Impacto en el App

1.  **Filtros Dinámicos**: El app podrá filtrar prompts por `discipline` o `related_services` directamente desde el objeto JSON.
2.  **Mapeo de Ventas**: Al ver un servicio en el catálogo, el app puede sugerir automáticamente el prompt operativo asociado.
3.  **Validación de Entregables**: El campo `deliverable_type` permite que el app prepare la interfaz de salida adecuadamente.
4.  **Insumos Requeridos**: El campo `input_type` permite que el app solicite los archivos o textos necesarios antes de ejecutar el prompt.
