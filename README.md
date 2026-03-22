# Workspace de Prompts Live Developer

Este repositorio se usa como base canónica de conocimiento y como base de producto para el `app` de Live Developer.

## Ruta activa del repo

Hoy la ruta activa para avanzar producto y fases es:

- [`base/masters/`](base/masters/) como fuente canónica,
- [`base/json/`](base/json/) como capa estructurada,
- [`app/`](app/) como capa de implementación,
- [`docs/`](docs/) como definición de producto,
- [`projects/`](projects/) como capa de casos reales y trazabilidad de proyectos,
- [`archive/`](archive/) como preservación de material fuera del camino activo.

## Puntos de entrada recomendados

| Punto | Ubicación | Uso |
| :--- | :--- | :--- |
| Visión del producto | [`docs/VISION-APP.md`](docs/VISION-APP.md) | Entender qué es el `app` |
| Arquitectura funcional | [`docs/ARQUITECTURA-FUNCIONAL.md`](docs/ARQUITECTURA-FUNCIONAL.md) | Definir capas y contratos |
| Módulos y pantallas | [`docs/MODULOS-Y-PANTALLAS.md`](docs/MODULOS-Y-PANTALLAS.md) | Diseñar experiencia e implementación |
| Roadmap por fases | [`docs/ROADMAP-POR-FASES.md`](docs/ROADMAP-POR-FASES.md) | Planificar bloques de trabajo |
| Inicio rápido de la base | [`base/masters/company/00-INICIO-RAPIDO.md`](base/masters/company/00-INICIO-RAPIDO.md) | Entrar a la librería operativa |

## Estructura relevante

```text
base/
  masters/      fuente canónica humana y operativa
  json/         datos estructurados generados

app/
  api/          capa de API
  scripts/      builders y utilidades activas
  docker/       infraestructura disponible, no prioritaria para fases de producto
  cli/          canal secundario, no foco principal

docs/
  visión, arquitectura, módulos y roadmap del app

projects/
  proyectos reales documentados con rastro operativo

archive/
  material preservado fuera del camino activo
```

## Regla de trabajo

1. Cambios de conocimiento y taxonomía van primero en `base/masters/`.
2. Se regeneran estructuras con `python3 app/scripts/build_json.py`.
3. Si se necesita una salida derivada de navegación, se puede regenerar con `python3 app/scripts/build_indices.py`.
4. La implementación del `app` debe seguir lo definido en `docs/`.
5. Los casos reales o pilotos que ya tienen brief y entregables deben normalizarse en `projects/`, no quedarse como archivos sueltos en `archive/projects/`.

## Archivo histórico

La documentación táctica, fixes, setups legacy, proyectos puntuales, scripts root-level y prototipos generados fueron movidos a [`archive/`](archive/) para reducir ruido en la raíz sin perder trazabilidad histórica.
