# Auditoría y Propuesta: Capa de Manuales

## A. Hallazgos

### A.1. Estado Actual

**Manuales existentes: 14 archivos totales**

| Ubicación | Cantidad | Disciplina | Cobertura |
|-----------|----------|-------------|-----------|
| `manuales-produccion/` | 8 | Producción Audiovisual + Imagen y Video IA | ~50% de servicios AV |
| `manuales-desarrollo/` | 6 | Desarrollo de Software | ~60% de servicios DEV |

**Metadata:** 100% de manuales tienen front matter estandarizado con campos `id`, `name`, `category`, `discipline`, `type`.

### A.2. Fortalezas

- Manuales con metadata estandarizada y IDs propios (MAN-PROD-001 a MAN-PROD-008, MAN-DEV-001 a MAN-DEV-006)
- Cobertura fuerte en Producción Audiovisual y Desarrollo de Software
- Alineación con servicio para la cobertura que existe
- Documentación interna de calidad (guías maestras con plantillas, estándares con checklists)

### A.3. Límites

- Solo 2 de 17 disciplinas tienen manuales
- ~80 servicios sin manual propio (de ~100 servicios existentes)
- La división binaria producción/desarrollo ya no refleja la realidad multi-disciplina
- Varias disciplinas con agentes activos tienen 0 manuales (PR, Data, Media, CX, Commerce, etc.)
- Un manual cubre dos disciplinas a la vez (`guia_maestra_i2v.md` → Imagen y Video IA) pero vive en producción

### A.4. Áreas Faltantes

| Disciplina | Agentes | Prompts | Manuales | Gap |
|------------|---------|---------|----------|-----|
| PR y Comunicación | 2 | 3 | 0 | Agentes activos sin manual fundacional |
| Data, Analytics e Insights | 2 | 3 | 0 | Sin manual de metodologías |
| Media, Performance y SEO | 4 | 6 | 0 | Sin manual operativo |
| Content Strategy y Copy | 1 | 5 | 0 | Sin manual de sistema |
| CX, CRM y Retención | 2 | 3 | 0 | Sin manual de journey/email |
| Commerce y E-commerce | 1 | 2 | 0 | Sin manual de estrategia |
| Consultoría de Negocio | 1 | 2 | 0 | Sin manual de frameworks |
| Influencer Marketing | 1 | 2 | 0 | Sin manual operativo |
| Experiential y Eventos | 1 | 2 | 0 | Sin manual operativo |
| Healthcare Marketing | 1 | 2 | 0 | Sin manual operativo |
| Sostenibilidad y ESG | 1 | 2 | 0 | Sin manual operativo |
| Branding y Diseño | 0 | 0 | 0 | Sin agente, sin prompts, sin manuales |
| Infraestructura y Web | 0 | 0 | 0 | Servicios INF sin ningún activo |
| IA y Automatización | 0 | 0 | 0 | Servicios IA sin ningún activo |
| Estrategia Digital | 1 | 2 | 0 | Sin manual de frameworks |

---

## B. Estructura Objetivo Propuesta

### B.1. Árbol de directorio

```
base/masters/manuales/
├── INDEX.md                          # Navegación y mapa de manuales
├── ESTANDAR-MANUALES.md              # Este documento - guía de organización
│
├── produccion-audiovisual/           # Disciplina: Producción Audiovisual
│   ├── guia_maestra_guion.md        # (migrado de manuales-produccion)
│   ├── composicion_cinematografica.md
│   ├── fundamentos_guion.md
│   ├── fundamentos_storyboard.md
│   ├── movimientos_camara.md
│   └── metadata.yaml                # Index de la disciplina
│
├── imagen-video-ia/                  # Disciplina: Imagen y Video IA
│   ├── guia_maestra_i2v.md          # (migrado de manuales-produccion)
│   ├── guia_maestra_storyboard.md
│   ├── guia_maestra_t2i.md
│   └── metadata.yaml
│
├── desarrollo-software/              # Disciplina: Desarrollo de Software
│   ├── stack_tecnologico.md         # (migrado de manuales-desarrollo)
│   ├── arquitectura_base.md
│   ├── deploy_dev_prod.md
│   ├── estandares_codigo.md
│   ├── flujo_git.md
│   ├── seguridad_codigo.md
│   └── metadata.yaml
│
├── pr-comunicacion/                  # Disciplina: PR y Comunicación
│   └── metadata.yaml                # (pendiente: manuales por crear)
│
├── data-analytics-insights/          # Disciplina: Data, Analytics e Insights
│   └── metadata.yaml
│
├── media-performance-seo/            # Disciplina: Media, Performance y SEO
│   └── metadata.yaml
│
├── content-strategy-copy/            # Disciplina: Content Strategy y Copy
│   └── metadata.yaml
│
├── cx-crm-retencion/                # Disciplina: CX, CRM y Retención
│   └── metadata.yaml
│
├── commerce-ecommerce/              # Disciplina: Commerce y E-commerce
│   └── metadata.yaml
│
├── consultoria-negocio/             # Disciplina: Consultoría de Negocio
│   └── metadata.yaml
│
├── estrategia-digital/             # Disciplina: Estrategia Digital
│   └── metadata.yaml
│
├── comercial-ventas/               # Disciplina: Comercial y Ventas
│   └── metadata.yaml
│
├── influencer-marketing/           # Disciplina: Influencer Marketing
│   └── metadata.yaml
│
├── experiential-eventos/            # Disciplina: Experiential y Eventos
│   └── metadata.yaml
│
├── healthcare-marketing/           # Disciplina: Healthcare Marketing
│   └── metadata.yaml
│
├── sostenibilidad-esg/              # Disciplina: Sostenibilidad y ESG
│   └── metadata.yaml
│
├── branding-diseno/                # Disciplina: Branding y Diseño
│   └── metadata.yaml
│
├── infraestructura-web/             # Disciplina: Infraestructura y Web
│   └── metadata.yaml
│
└── ia-automatizacion/              # Disciplina: IA y Automatización
    └── metadata.yaml
```

### B.2. Criterios de organización

1. **Un directorio por disciplina** alineado con `18-NAVEGACION-CANONICA.json`
2. **Nomenclatura slug** con guiones bajos para legibilidad en terminal
3. **metadata.yaml** en cada carpeta de disciplina para servir como índice local y facilitar la lectura por el builder
4. **Compatibilidad con front matter** - cada manual sigue teniendo sus campos YAML propios
5. **Manuales de producción y desarrollo migran** a la nueva estructura sin perder IDs originales
6. **Disciplinas huérfanas** se crean con `metadata.yaml` placeholder indicando "pendiente"

### B.3. Jerarquía interna de cada disciplina

Dentro de cada carpeta de disciplina, si hay 3+ manuales, se recomienda la siguiente organización opcional:

```
disciplina/
├── fundamentos/                    # Docs base, teorías, principios
├── guias-maestras/                # Guías completas de referencia
├── estandares-qa/                 # Checklists, estándares de calidad
├── playbooks/                     # Procedimientos paso a paso
└── operacion/                     # Guías día-a-día, templates
```

**Regla:** No crear subcarpetas si hay menos de 3 manuales. Mantenerlo plano hasta que crezca.

---

## C. Plan de Migración No Destructivo

### Fase 1: Estructura base (ejecutar ahora)

1. Crear `base/masters/manuales/` con directorio raíz
2. Crear `INDEX.md` de navegación
3. Crear `ESTANDAR-MANUALES.md` con este documento
4. Crear carpetas de disciplina con `metadata.yaml` placeholder para todas las 19 disciplinas
5. **Duplicar** los 14 manuales actuales a sus ubicaciones de disciplina (copia, no movimiento)
6. Mantener `manuales-produccion/` y `manuales-desarrollo/` intactos

### Fase 2: Actualización del builder (ejecutar después de Fase 1)

1. Actualizar `build_json.py` para escanear `base/masters/manuales/` además de los directorios antiguos
2. Añadir validación de `metadata.yaml` por disciplina
3. Verificar que `manuales_maestros.json` se genera correctamente
4. Mantener validación de `source_of_truth` para ambas estructuras

### Fase 3: Migración activa (gradual, disciplina por disciplina)

1. Cuando se cree el primer manual de una disciplina huérfana, crearlo directamente en la nueva estructura
2. Actualizar `source_of_truth` en prompts relacionados para apuntar a la nueva ruta
3. Mantener referencias antiguas como aliases en `metadata.yaml`

### Fase 4: Deprecación controlada (futuro, cuando sea seguro)

1. Una vez que todos los manuales estén migrados y referencias actualizadas, deprecar `manuales-produccion/` y `manuales-desarrollo/`
2. Convertirlos en enlaces simbólicos a `manuales/` o mover a `base/masters/_deprecated/`

---

## D. Documento Estándar de Manuales

### D.1. Propósito

Este documento establece el estándar de creación, organización y metadata para todos los manuales del sistema.

### D.2. Front matter canónico

Todo manual en `base/masters/manuales/` debe incluir:

```yaml
---
id: [ID-UNICO]           # Ej: MAN-AV-001, MAN-DEV-001
name: [NOMBRE-DESCRIPTIVO]
category: [CATEGORIA-CATALOGO]  # Alineado con 08-SERVICES.md
discipline: [DISCIPLINA]        # Alineado con 18-NAVEGACION-CANONICA.json
type: [fundamento|guia-maestra|estandar|playbook|operativo]
version: 1.0.0
author: [nombre o area]
date_created: [YYYY-MM-DD]
date_updated: [YYYY-MM-DD]
related_services: [lista de service_code]
related_agents: [lista de agent_id]
related_prompts: [lista de prompt_id]
source_of_truth: true|false    # Si este manual es fuente autoritativa
tags: [tag1, tag2, tag3]
---
```

### D.3. Convenciones de nombre

- Archivos: `kebab-case.md` (ej: `guia-maestra-guion.md`)
- IDs: Prefijo de disciplina + número secuencial (ej: `MAN-AV-001`, `MAN-PR-001`)
- Carpetas: `slug-case` alineado con navegación canónica

### D.4. Tipos de manual

| Tipo | Propósito | Ejemplo |
|------|-----------|---------|
| `fundamento` | Teoría, principios, marcos conceptuales | Fundamentos del storytelling |
| `guia-maestra` | Referencia completa de una herramienta o proceso | Guía Maestra de Guion para AI |
| `estandar` | Convenciones, checklists de QA | Estándares de Código |
| `playbook` | Procedimientos paso a paso | Plan de Crisis Comunicacional |
| `operativo` | Guías día-a-día, templates | Script para Spotify Ads |

### D.5. metadata.yaml por disciplina

Cada carpeta de disciplina contiene un `metadata.yaml`:

```yaml
discipline: "Producción Audiovisual"
slug: "produccion-audiovisual"
nomenclature_folder: "02-Produccion-Audiovisual"  # Para compatibilidad con prompts-operativos
canonical_id_prefix: "MAN-AV"
manuals:
  - id: "MAN-AV-001"
    file: "guias-maestras/guia_maestra_guion.md"
    name: "Guía Maestra de Guion para AI"
    type: "guia-maestra"
    migrated_from: "base/masters/manuales-produccion/guia_maestra_guion.md"
  - id: "MAN-AV-002"
    file: "fundamentos/composicion_cinematografica.md"
    name: "Composición Cinematográfica"
    type: "fundamento"
    migrated_from: "base/masters/manuales-produccion/composicion_cinematografica.md"
pending:
  - "Manual de dirección de arte (pendiente)"
  - "Playbook de producción de podcast (pendiente)"
related_agents:
  - "DirectorAudiovisual"
  - "GuionistaCinematografico"
  - "ArtistaStoryboard"
related_prompts:
  - "PROD-001"
  - "SCRIPT-001"
  - "STORY-001"
notes: "Cubrimos producción audiovisual y producción de podcast. Falta manual de dirección de arte y de motion graphics."
```

---

## E. Impacto Técnico

### E.1. Impacto en build_json.py

El script `build_json.py` actualmente define:

```python
MANUAL_DIRS = [
    MASTERS / "manuales-desarrollo",
    MASTERS / "manuales-produccion",
]
```

**Cambios necesarios:**

1. Añadir `MASTERS / "manuales"` como directorio a escanear
2. Mantener los directorios antiguos para backwards compatibility durante la migración
3. Crear función `parse_manual_metadata_yaml()` para leer `metadata.yaml` por disciplina
4. Generar `manuales_maestros.json` que unifique todos los manuales de todas las disciplinas
5. Añadir campo `discipline_slug` a cada manual para facilitar filtrado en el app
6. Validar que `source_of_truth` references funcionen con ambas rutas (vieja y nueva)

**Schema propuesto para `manuales_maestros.json`:**

```json
{
  "manuals": [
    {
      "id": "MAN-AV-001",
      "name": "Guía Maestra de Guion para AI",
      "category": "Producción Audiovisual",
      "discipline": "Producción Audiovisual",
      "discipline_slug": "produccion-audiovisual",
      "type": "operativo",
      "version": "1.0.0",
      "path": "base/masters/manuales/produccion-audiovisual/guias-maestras/guia_maestra_guion.md",
      "legacy_path": "base/masters/manuales-produccion/guia_maestra_guion.md",
      "related_services": ["AV-001", "AV-002", "AV-013"],
      "related_agents": ["DirectorAudiovisual", "GuionistaCinematografico"],
      "related_prompts": ["PROD-001", "SCRIPT-001"],
      "source_of_truth": true,
      "migrated": true,
      "tags": ["guion", "ia", "audiovisual"]
    }
  ],
  "disciplines": [
    {
      "slug": "produccion-audiovisual",
      "name": "Producción Audiovisual",
      "manual_count": 8,
      "complete": true
    },
    {
      "slug": "pr-comunicacion",
      "name": "PR y Comunicación",
      "manual_count": 0,
      "complete": false
    }
  ]
}
```

### E.2. Impacto en source_of_truth

Las referencias actuales en prompts son del tipo:

```yaml
source_of_truth:
  - base/masters/manuales-produccion/guia_maestra_guion.md
```

**Plan de transición:**
- Mantener解析 de rutas antiguas durante Fase 1 y 2
- En Fase 3, actualizar `source_of_truth` a nuevas rutas
- Usar `legacy_path` en JSON para compatibilidad

### E.3. Compatibilidad temporal

Durante toda la migración:
- El builder debe leer tanto estructura vieja como nueva
- Las referencias rotas deben warn (no error) durante transición
- El app puede leer de `manuales_maestros.json` sin conocer la estructura de archivos
