# Flujo Comercial y Operativo

Este documento define el recorrido del trabajo desde la consulta inicial hasta el cierre del proyecto.

## Estados del flujo

| stage_code | estado | objetivo | responsable principal |
| :--- | :--- | :--- | :--- |
| `L01` | Lead recibido | registrar necesidad inicial | Comercial |
| `L02` | Calificacion | entender si hay fit y prioridad | Comercial |
| `L03` | Brief en levantamiento | reunir insumos minimos | Comercial / Coordinacion |
| `L04` | Proforma preliminar | traducir requerimiento en servicios | Administracion / Comercial |
| `L05` | Cotizacion final | emitir propuesta validada | Comercial |
| `L06` | Negociacion | resolver objeciones y ajustes | Comercial |
| `L07` | Aprobado | confirmar cierre y condiciones | Comercial / Administracion |
| `O01` | Kickoff interno | transferir contexto a operacion | Coordinacion |
| `O02` | Produccion en curso | ejecutar servicio | Area responsable |
| `O03` | Revision interna | validar contra calidad | Coordinacion / Calidad |
| `O04` | Entrega cliente | enviar entregable o hito | Area responsable |
| `O05` | Cambios | gestionar observaciones | Area responsable |
| `O06` | Cierre | cerrar entrega y documentar | Coordinacion |
| `O07` | Postventa | detectar continuidad, upsell o soporte | Comercial / Cuenta |

## Flujo recomendado

1. Comercial recibe necesidad.
2. Usa `COM-001` para orientar servicio si el requerimiento esta verde.
3. Usa `COM-002` para estructurar proforma si ya hay una necesidad concreta.
4. Valida servicios con [09-SERVICE-MATRIX.md](/Users/dcalisaya/Developer/Prompts/base/masters/company/09-SERVICE-MATRIX.md).
5. Valida pricing con [10-PRICING-INTERNO.md](/Users/dcalisaya/Developer/Prompts/base/masters/company/10-PRICING-INTERNO.md).
6. Emite propuesta segun [11-REGLAS-DE-COTIZACION.md](/Users/dcalisaya/Developer/Prompts/base/masters/company/11-REGLAS-DE-COTIZACION.md).
7. Una vez aprobado, Coordinacion arma kickoff.
8. Operacion trabaja con brief y prompt correspondiente.
9. Antes de entregar, pasa por calidad.
10. Se documenta cierre y siguiente oportunidad.

## Checklist de kickoff interno

- brief aprobado
- alcance aprobado
- responsables definidos
- cronograma preliminar
- canal de comunicacion
- activos recibidos
- riesgos detectados
- criterio de entrega definido

## Riesgos frecuentes

- venta sin brief completo,
- mezcla de servicios en una sola linea,
- ausencia de exclusiones,
- tiempos comprometidos sin validacion,
- cambios de alcance no documentados,
- activos del cliente incompletos.

## Regla final

Ningun proyecto debe pasar de `L04` a `L05` sin tener al menos servicios claros, vacios identificados y pricing validable.
