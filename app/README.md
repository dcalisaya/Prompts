# App Layer

`app/` ya no debe entenderse como fuente de verdad del workspace.

Su función actual es únicamente consumir o derivar estructura desde la base canónica.

## Foco actual

- `web/`: consumidor actual de la base
- `scripts/`: builders y utilidades auxiliares

## Regla operativa

Si una mejora no fortalece `base/`, `docs/`, `projects/` o el consumo directo de esa base, probablemente no debe entrar en la ruta activa.

La visión de producto del `app` vive en:

- [docs/VISION-APP.md](/Users/dcalisaya/Developer/Prompts/docs/VISION-APP.md)

## Flujo recomendado

1. actualizar documentos en `base/masters/`
2. correr `python3 app/scripts/build_json.py`
3. consumir `base/json/*.json` desde `app/web` o desde cualquier otra superficie activa sin convertir `app/` en la fuente de verdad
