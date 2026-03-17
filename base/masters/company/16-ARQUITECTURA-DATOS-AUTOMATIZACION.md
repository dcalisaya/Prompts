# Arquitectura de Datos para Automatizacion

Este documento define la estructura minima para que el workspace pueda conectarse en el futuro a CRM, sistema de proformas, formularios o agentes internos.

## Entidades recomendadas

### Cliente
- `client_id`
- `client_name`
- `contact_name`
- `contact_role`
- `email`
- `phone`
- `industry`

### Oportunidad
- `opportunity_id`
- `client_id`
- `stage_code`
- `need_summary`
- `source_channel`
- `estimated_close_date`
- `owner_user`

### Servicio
- `service_code`
- `service_name`
- `category`
- `unit`
- `owner_area`
- `status`

### Proforma
- `proforma_id`
- `opportunity_id`
- `version`
- `issue_date`
- `status`
- `subtotal`
- `discount_pct`
- `total`

### Proforma Item
- `proforma_item_id`
- `proforma_id`
- `service_code`
- `description`
- `quantity`
- `unit_price`
- `total_price`
- `scope_note`

### Brief
- `brief_id`
- `opportunity_id`
- `service_code`
- `brief_status`
- `inputs_received`
- `missing_items`

### Proyecto
- `project_id`
- `opportunity_id`
- `kickoff_date`
- `current_stage`
- `delivery_date`
- `project_owner`

## IDs y normalizacion

- usar siempre `service_code` como llave funcional,
- evitar nombres libres para servicios en propuestas,
- usar `stage_code` del flujo comercial-operativo,
- separar `proforma` de `proyecto`.

## Estados recomendados para automatizacion

- `draft`
- `pending_info`
- `ready_for_quote`
- `quoted`
- `approved`
- `in_production`
- `delivered`
- `closed`
- `lost`

## Reglas de integracion futura

- los prompts comerciales deben leer `08-SERVICES.md` y `09-SERVICE-MATRIX.md`,
- el sistema de pricing debe leer `10-PRICING-INTERNO.md`,
- la cotizacion debe aplicar `11-REGLAS-DE-COTIZACION.md`,
- la ejecucion debe apoyarse en `12-BRIEFS-POR-SERVICIO.md` y `13-FLUJO-COMERCIAL-Y-OPERATIVO.md`.

## Resultado esperado a futuro

Con esta estructura, Live Developer puede conectar:

- formulario de captura,
- CRM,
- generador automatico de proformas,
- tablero de proyectos,
- agente interno para consultas comerciales,
- reportes de conversion y rentabilidad.
