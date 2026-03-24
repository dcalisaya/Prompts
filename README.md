# Workspace de Prompts Live Developer

Este repositorio se usa como base canónica de conocimiento para agentes con contexto del repo y para documentar trabajo real.

## Ruta activa del repo

Hoy la ruta activa del repo es:

- [`base/masters/`](base/masters/) como fuente canónica operativa,
- [`base/json/`](base/json/) como capa estructurada derivada,
- [`docs/`](docs/) como definición y decisiones,
- [`projects/`](projects/) como capa de casos reales y trazabilidad de proyectos,
- [`app/web/`](app/web/) como consumidor actual de esa base,
- [`archive/`](archive/) como preservación de material fuera del camino activo.

## Puntos de entrada recomendados

| Punto | Ubicación | Uso |
| :--- | :--- | :--- |
| Changelog | [`CHANGELOG.md`](CHANGELOG.md) | Revisar cambios estructurales del workspace |
| Inicio rápido de la base | [`base/masters/company/00-INICIO-RAPIDO.md`](base/masters/company/00-INICIO-RAPIDO.md) | Entrar a la librería operativa |
| Visión y decisiones | [`docs/VISION-APP.md`](docs/VISION-APP.md) | Entender contexto, producto y dirección |
| Arquitectura funcional | [`docs/ARQUITECTURA-FUNCIONAL.md`](docs/ARQUITECTURA-FUNCIONAL.md) | Revisar contratos y capas |
| Casos reales | [`projects/README.md`](projects/README.md) | Navegar trabajos reales documentados |

## Estado actual

La fuente de verdad del workspace es:

- `base/masters/`
- `base/json/`
- `docs/`
- `projects/`

`app/web` debe entenderse como consumidor o superficie de implementación, no como fuente de verdad.

El uso operativo recomendado del workspace es con agentes que lean el repo y usen esta librería como backend de conocimiento.

## Componentes fuera del foco principal

Fuera de `base`, `docs`, `projects` y el consumidor actual `app/web`, el resto de superficies debe considerarse:

- experimental
- auxiliar
- o candidata a deprecación si no está en uso real

El `CLI standalone` fue retirado de la ruta activa.

## Estructura relevante

```text
base/
  masters/      fuente canónica humana y operativa
  json/         datos estructurados generados

app/
  scripts/      utilidades auxiliares para derivar estructura
  web/          consumidor actual de la base, no fuente de verdad

docs/
  visión, arquitectura, decisiones y roadmap

projects/
  proyectos reales documentados con rastro operativo

archive/
  material preservado fuera del camino activo
```

## Regla de trabajo

1. Cambios de conocimiento y taxonomía van primero en `base/masters/`.
2. Se regeneran estructuras con `python3 app/scripts/build_json.py`.
3. Si se necesita una salida derivada de navegación, se puede regenerar con `python3 app/scripts/build_indices.py`.
4. Cualquier implementación debe seguir lo definido en `docs/` y consumir la base canónica sin reemplazarla.
5. Los casos reales o pilotos que ya tienen brief y entregables deben normalizarse en `projects/`, no quedarse como archivos sueltos en `archive/projects/`.

## Criterio de limpieza

Para mantener el repo liviano en contexto para agentes:

- mantener solo capas activas o claramente canónicas
- retirar o deprecar pruebas que no estén conectadas al camino real
- evitar multiplicar superficies paralelas si `app/web` es la única desarrollada a profundidad
- `projects/` se mantiene como capa de casos reales y trazabilidad de trabajos ejecutados
