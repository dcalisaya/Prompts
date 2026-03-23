# Estrategia y Sitemap: Web Institucional Live Developer

**Objetivo del documento:** Proponer la arquitectura de información y la navegación del sitio web institucional, derivando los contenidos de la base canónica (`09-SERVICE-MATRIX.md`). Este documento es una propuesta de implementación y no reemplaza la navegación canónica maestra.

## 1. Arquitectura de Información (Sitemap Propuesto)

La navegación principal prioriza la separación conceptual (Razón/Emoción) sin romper la taxonomía oficial de servicios.

- **Home (`/`)**
  - Propuesta de valor: "Razón + Emoción".
  - Selector de áreas: Tecnología vs. Creatividad.
- **Tecnología (`/tecnologia`)**
  - Desarrollo de Software y Apps (`/tecnologia/desarrollo`)
  - Infraestructura y Web (`/tecnologia/infraestructura`)
  - Soluciones IA y Automatización (`/tecnologia/ia`)
  - Data, Analytics e Insights (`/tecnologia/data`)
- **Creatividad (`/creatividad`)**
  - Producción Audiovisual (`/creatividad/audiovisual`)
  - Marketing Digital (`/creatividad/marketing`)
  - Diseño y Branding (`/creatividad/diseno`)
  - Relaciones Públicas y Comunicación (`/creatividad/pr`)
  - Media Planning y Performance (`/creatividad/media`)
  - Content Strategy y Copy (`/creatividad/contenido`)
  - Influencer Marketing (`/creatividad/influencer`)
  - Experiential y Eventos (`/creatividad/eventos`)
- **Consultoría y Negocio (`/consultoria`)**
  - Consultoría de Negocio (`/consultoria/negocio`)
  - Commerce Avanzado (`/consultoria/commerce`)
  - Customer Experience y CRM (`/consultoria/cx`)
  - Healthcare Marketing (`/consultoria/healthcare`)
  - Sostenibilidad y ESG (`/consultoria/esg`)
- **Comunes**
  - Casos de Uso / Portafolio (`/casos`)
  - Contacto (`/contacto`)

## 2. Estrategia de Navegación del Usuario
1. **Entrada:** El usuario ingresa a la Home y se le presenta la dicotomía constructiva de Live Developer (Ingeniería vs. Creatividad).
2. **Exploración:** Según su necesidad (ej. `DEV-002` o `AV-005`), navega por la categoría correspondiente, las cuales son agrupaciones directas del `09-SERVICE-MATRIX.md`.
3. **Conversión:** En cada vista de categoría o servicio, existe un Call to Action (CTA) claro hacia el formulario de contacto, pre-llenando el interés del usuario.

## Acción Requerida
- Validar la agrupación propuesta (Tecnología, Creatividad, Consultoría) para el menú de navegación front-end frente a la taxonomía canónica.
