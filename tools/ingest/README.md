# Ingesta de Archivos para Agentes

Esta carpeta contiene utilidades locales del workspace para que los agentes lean archivos ubicados en `projects/` sin depender de `app/web`.

## Objetivo

Permitir que un agente CLI pueda extraer contenido de:

- `pdf`
- `docx`
- `xlsx`
- `csv`
- `txt`
- `md`
- `json`

## Uso recomendado

Leer un archivo y devolver texto resumido en consola:

```bash
python3 tools/ingest/read_any.py projects/cliente-x/brief.docx
```

Leer un archivo y devolver salida estructurada:

```bash
python3 tools/ingest/read_any.py projects/cliente-x/meta_ads.csv --json
```

Guardar un derivado junto al archivo original:

```bash
python3 tools/ingest/read_any.py projects/cliente-x/tdr.docx --write-derived
```

## Criterio de salida

- `stdout` por defecto: texto legible para agentes
- `--json`: estructura estable para procesamiento posterior
- `--write-derived`: genera un derivado en `derived/` dentro de la carpeta del archivo original

## Soporte por formato

- `csv`: soporte nativo con librería estándar
- `xlsx`: soporte nativo básico para celdas de texto y números en archivos `.xlsx`
- `docx`: soporte nativo básico para texto de párrafos y tablas en archivos `.docx`
- `pdf`: soporte opcional vía `pypdf`

## Nota sobre PDF

La extracción de `pdf` no está resuelta con librería estándar de Python. Para habilitarla:

```bash
python3 -m pip install pypdf
```

Si `pypdf` no está instalado, el script devolverá un error claro indicando cómo activarlo.
