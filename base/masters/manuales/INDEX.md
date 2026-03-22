# Índice de Manuales Maestros

Este índice es la puerta de navegación para todos los manuales del sistema. Cada manual serve como **source of truth** autoritativo para una disciplina o proceso específico.

## Antes de usar este índice

Si no conoces el workspace, entra primero por:

1. [00-INICIO-RAPIDO.md](../company/00-INICIO-RAPIDO.md)
2. [06-MAPA-POR-ROLES.md](../company/06-MAPA-POR-ROLES.md)
3. [ESTANDAR-MANUALES.md](./ESTANDAR-MANUALES.md) — Estándar de organización

## Navegación por disciplina

| Disciplina | Manuales | Estado | Carpeta |
|------------|----------|--------|---------|
| **Producción Audiovisual** | 8 | ✅ Completo | `produccion-audiovisual/` |
| **Imagen y Video IA** | 3 | ✅ Completo | `imagen-video-ia/` |
| **Desarrollo de Software** | 6 | ✅ Completo | `desarrollo-software/` |
| **PR y Comunicación** | 0 | 🔴 Pendiente | `pr-comunicacion/` |
| **Data, Analytics e Insights** | 0 | 🔴 Pendiente | `data-analytics-insights/` |
| **Media, Performance y SEO** | 0 | 🔴 Pendiente | `media-performance-seo/` |
| **Content Strategy y Copy** | 0 | 🔴 Pendiente | `content-strategy-copy/` |
| **CX, CRM y Retención** | 0 | 🔴 Pendiente | `cx-crm-retencion/` |
| **Commerce y E-commerce** | 0 | 🔴 Pendiente | `commerce-ecommerce/` |
| **Consultoría de Negocio** | 0 | 🔴 Pendiente | `consultoria-negocio/` |
| **Estrategia Digital** | 0 | 🔴 Pendiente | `estrategia-digital/` |
| **Comercial y Ventas** | 0 | 🔴 Pendiente | `comercial-ventas/` |
| **Influencer Marketing** | 0 | 🔴 Pendiente | `influencer-marketing/` |
| **Experiential y Eventos** | 0 | 🔴 Pendiente | `experiential-eventos/` |
| **Healthcare Marketing** | 0 | 🔴 Pendiente | `healthcare-marketing/` |
| **Sostenibilidad y ESG** | 0 | 🔴 Pendiente | `sostenibilidad-esg/` |
| **Branding y Diseño** | 0 | 🔴 Pendiente | `branding-diseno/` |
| **Infraestructura y Web** | 0 | 🔴 Pendiente | `infraestructura-web/` |
| **IA y Automatización** | 0 | 🔴 Pendiente | `ia-automatizacion/` |

## Manuales completos

### Producción Audiovisual

| ID | Manual | Tipo | Uso |
|----|--------|------|-----|
| MAN-AV-001 | [Guía Maestra de Guion para AI](./produccion-audiovisual/guia_maestra_guion.md) | guia-maestra | Generación de guiones con IA |
| MAN-AV-002 | [Composición Cinematográfica](./produccion-audiovisual/composicion_cinematografica.md) | fundamento | Principios de encuadre y composición |
| MAN-AV-003 | [Fundamentos de Guion](./produccion-audiovisual/fundamentos_guion.md) | fundamento | Estructura narrativa y storytelling |
| MAN-AV-004 | [Fundamentos de Storyboard](./produccion-audiovisual/fundamentos_storyboard.md) | fundamento | Principios de storyboarding |
| MAN-AV-005 | [Movimientos de Cámara](./produccion-audiovisual/movimientos_camara.md) | fundamento | Tipos y uso de movimientos |
| MAN-AV-006 | [Guía Maestra I2V](./imagen-video-ia/guia_maestra_i2v.md) | guia-maestra | Imagen a Video con IA |
| MAN-AV-007 | [Guía Maestra Storyboard](./imagen-video-ia/guia_maestra_storyboard.md) | guia-maestra | Storyboard con IA |
| MAN-AV-008 | [Guía Maestra T2I](./imagen-video-ia/guia_maestra_t2i.md) | guia-maestra | Texto a Imagen con IA |

### Desarrollo de Software

| ID | Manual | Tipo | Uso |
|----|--------|------|-----|
| MAN-DEV-001 | [Stack Tecnológico](./desarrollo-software/stack_tecnologico.md) | guia-maestra | Stack y herramientas del equipo |
| MAN-DEV-002 | [Arquitectura Base](./desarrollo-software/arquitectura_base.md) | guia-maestra | Patrones y arquitectura |
| MAN-DEV-003 | [Deploy Dev y Prod](./desarrollo-software/deploy_dev_prod.md) | operativo | Pipelines y despliegue |
| MAN-DEV-004 | [Estándares de Código](./desarrollo-software/estandares_codigo.md) | estandar | Convenciones y calidad |
| MAN-DEV-005 | [Flujo Git](./desarrollo-software/flujo_git.md) | estandar | Workflow de versionado |
| MAN-DEV-006 | [Seguridad en Código](./desarrollo-software/seguridad_codigo.md) | estandar | Buenas prácticas de seguridad |

## Disciplinas pendientes

Las disciplinas sin manuales están marcadas en `metadata.yaml` de cada carpeta con la lista de manuales por crear. Ver [ESTANDAR-MANUALES.md](./ESTANDAR-MANUALES.md) para el plan de creación.

## Relación con agentes

Cada disciplina tiene agentes asociados en `../agents/`. Los manuales sirven como fuente autoritativa (`source_of_truth`) para esos agentes.

## Relación con prompts operativos

Los prompts en `../prompts-operativos/` referencian manuales en su campo `source_of_truth`. Verificar que las referencias apunten a la estructura correcta.

## Compatibilidad

Esta estructura coexiste con `../manuales-produccion/` y `../manuales-desarrollo/` durante la fase de migración. Ver [ESTANDAR-MANUALES.md](./ESTANDAR-MANUALES.md) para el plan completo.

## Metadata

Los metadatos consolidados de todos los manuales están disponibles en `base/json/manuales_maestros.json` (generado por `app/scripts/build_json.py`).
