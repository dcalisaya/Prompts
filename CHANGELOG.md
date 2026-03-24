# Changelog

Registro resumido de cambios relevantes del workspace.

## Formato

Cada entrada debería incluir:

- fecha
- tipo de cambio
- áreas afectadas
- resumen corto

## 2026-03-23

### Limpieza estructural del repo

- se retiraron capas experimentales o fallidas fuera de la ruta activa:
  - `app/api`
  - `app/cli`
  - `app/codex-bridge`
  - `app/docker`
- se eliminaron residuos regenerables y cachés
- se reafirmó que la fuente de verdad vive en:
  - `base/masters`
  - `base/json`
  - `docs`
  - `projects`

### Depuración de `docs/`

- se eliminaron documentos tácticos ligados a fases de `app/web`
- `docs/` quedó enfocado en:
  - visión
  - arquitectura
  - operación de agentes

### Capa operativa para agentes

- se agregaron protocolos de operación, intake, output y compatibilidad en `docs/`
- se agregaron guías por modo:
  - `discover`
  - `quote`
  - `plan`
  - `review`
  - `execute`
  - `upsell`
- se agregó contexto de entrada y prompt de arranque para agentes externos

### Mapa operativo canónico

- se agregó `base/masters/company/21-MAPA-OPERATIVO-PARA-AGENTES.md`
- se agregó `base/json/agent_resource_map.v1.json`
- quedó definida una primera versión de rutas mínimas entre:
  - necesidad
  - modo
  - servicio
  - prompt
  - agente
  - soporte normativo
