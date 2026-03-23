# Decisión de Arquitectura: Web Live Developer

**Objetivo del documento:** Fijar la decisión técnica base para la implementación del sitio institucional de Live Developer, evitando interferencia con otras soluciones web activas del workspace.

## 1. Decisión

La web institucional de Live Developer se implementará en:

- `projects/web-live-developer/site/`

El stack base recomendado es:

- **Astro** como framework principal.
- **React** solo para islas interactivas.
- **TypeScript** como estándar.
- **Tailwind CSS** como sistema utilitario, sujeto a instalación dentro de este proyecto y no en `app/web/`.

## 2. Justificación

- **Aislamiento técnico:** `app/web/` ya está en uso y no debe absorber otro proyecto con objetivos, navegación y roadmap distintos.
- **SEO y performance:** La web es principalmente institucional, orientada a contenido, servicios, casos y conversión; Astro encaja mejor que una SPA global.
- **Interactividad controlada:** El selector de áreas, formularios, tracking y algunos widgets pueden resolverse como islas React sin cargar JavaScript innecesario en todo el sitio.
- **Mantenibilidad:** Separar la base técnica del proyecto evita acoplar decisiones de producto con una solución web que ya tiene otro alcance operativo.

## 3. Tradeoffs

- **Ventaja de Astro:** Mejor rendimiento por defecto, mejor ergonomía para páginas de contenido y menor costo de JavaScript en cliente.
- **Costo de Astro:** Requiere definir una estructura nueva del proyecto y no reutiliza directamente el pipeline actual de `app/web/`.
- **Ventaja de Vite + React:** Más simple si toda la experiencia fuera una app interactiva.
- **Desventaja de Vite + React en este caso:** Entrega más JavaScript del necesario para una web institucional y fuerza una arquitectura menos eficiente para SEO y contenido.

## 4. Regla Operativa

- `app/web/` queda fuera del alcance de este proyecto.
- Toda implementación nueva del sitio institucional debe vivir dentro de `projects/web-live-developer/site/`.
- Toda referencia documental a `app/web/` o a stacks heredados debe considerarse obsoleta para este proyecto.

## Acción Requerida

- Crear la base técnica en `projects/web-live-developer/site/`.
- Usar Astro como punto de partida para la Fase 1.
