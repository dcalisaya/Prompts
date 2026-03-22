# App Layer

Esta carpeta queda preparada para la siguiente fase del workspace:

- servicio interno con LLM,
- API para consultar servicios, prompts y pricing,
- pipeline de construccion JSON,
- futuras integraciones con CRM o dashboard.

La vision de producto del `app` ahora vive en:

- [docs/VISION-APP.md](/Users/dcalisaya/Developer/Prompts/docs/VISION-APP.md)

## Estructura actual

- `scripts/build_json.py`: genera la base JSON desde las fuentes maestras actuales.

## Flujo recomendado

1. actualizar documentos en `base/masters/`,
2. correr `python3 app/scripts/build_json.py`,
3. consumir `base/json/*.json` desde la API o desde la futura interfaz del `app`.
