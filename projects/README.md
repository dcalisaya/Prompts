# Proyectos Canónicos

Esta carpeta contiene proyectos reales documentados con una estructura operativa trazable.

## Propósito

`projects/` no reemplaza a `base/masters/`.

Su función es distinta:

- `base/masters/` define la librería canónica de servicios, prompts, agentes, manuales y reglas.
- `projects/` registra ejecuciones reales o casos de uso que atraviesan esa librería.

## Criterio de uso

Un proyecto debe vivir en `projects/<nombre-del-proyecto>/` cuando:

- ya existe un caso real con brief, entregables o flujo ejecutado,
- conviene preservar rastro operativo,
- el proyecto puede servir como referencia interna, demo o caso de validación,
- y el material ya no debe quedar como archivo suelto sin contexto.

## Estructura recomendada por proyecto

Cada proyecto puede tener variaciones según el tipo de trabajo, pero la base recomendada es:

1. `00-README.md`
2. `01-BRIEF.md`
3. `02-GUION.md` o documento equivalente de estrategia
4. `03-STORYBOARD-DESGLOSE.md` o equivalente de ejecución
5. `04-RASTRO-OPERATIVO.md`

Si el proyecto requiere más detalle, se pueden añadir archivos como:

- `05-PROMPTS-GENERATIVOS.md`
- `06-ASSETS-Y-ENTREGABLES.md`
- `07-RETRO-Y-APRENDIZAJES.md`

## Relación con CLI y app

Mi recomendación es esta:

- `projects/` debe existir como capa propia del repositorio, no dentro de `base/masters/`
- el `CLI` puede navegar proyectos como carpetas y archivos sin imponer una UI única
- el `app` puede incorporar proyectos más adelante como una capa de sesiones/casos, pero sin asumir que todos los proyectos comparten exactamente el mismo flujo

En otras palabras:

- `base/masters/` = sistema normativo
- `projects/` = casos reales y ejecución documentada
- `archive/projects/` = histórico no normalizado o legado

## Regla de preservación

Si un caso existe solo en `archive/projects/`, no debe borrarse.
Primero debe transformarse en proyecto canónico dentro de `projects/`.

