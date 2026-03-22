
# Conversion Gaps

- Las fuentes markdown ya viven en `base/masters/`. Las rutas antiguas se mantienen por compatibilidad mediante enlaces simbolicos.
- Algunos prompts tienen estructura mas narrativa que tabular; por eso `when_to_use` y `expected_output` se resuelven combinando secciones y ejemplos.
- `pricing.json` conserva `PENDIENTE` donde no existen costos reales.
- `workflow.json` reutiliza la tabla de estados y completa pasos adicionales desde texto narrativo.
- Validacion de codigos faltantes en pricing vs matriz: sin faltantes.
- Total de prompts operativos convertidos: 48.
- Total de agentes maestros convertidos: 30.
