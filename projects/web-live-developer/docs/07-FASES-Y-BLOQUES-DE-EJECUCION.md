# Fases y Bloques de Ejecución: Web Institucional Live Developer (v2.0)

**Objetivo del documento:** Definir la ruta crítica de desarrollo para el sitio web institucional, asegurando una arquitectura limpia basada en Astro y una capa de datos gobernada por los maestros del workspace.

---

## Fase 1: Setup y Capa de Datos (Bloque Técnico)
*Objetivo: Establecer los cimientos del proyecto en `site/` y la sincronización automatizada.*

- **1.1. Inicialización del Sitio Astro:**
    - Configuración de `astro.config.mjs` con integraciones de React y Tailwind.
    - Definición de estructura: `src/layouts`, `src/pages`, `src/components`, `src/data`, `scripts/`.
    - Configuración de tokens de diseño en `src/styles/global.css` y `tailwind.config.mjs`.
- **1.2. Gobernanza de Datos (Sync Script):**
    - Refactorización de `scripts/sync-data.mjs` para extraer servicios desde `09-SERVICE-MATRIX.md`.
    - Implementación de lógica de clasificación web (Track: Creativa, Tecnológica, Consultoría) integrada en el proceso de sincronización.
    - Generación de `src/data/services.json` como derivado oficial para el frontend.
- **1.3. Layout Maestro y Tipografía:**
    - Creación de `MainLayout.astro` con soporte para metadatos dinámicos y esquemas de color Dark/Light.
    - Carga estática de fuentes (`Outfit` e `Instrument Sans`).

## Fase 2: Componentes Atómicos y UI (Bloque Visual)
*Objetivo: Materializar el sistema de diseño mediante islas de interactividad.*

- **2.1. Navegación Global:**
    - Header y Footer en Astro para máximo rendimiento SEO.
    - Islas React solo para elementos con estado (Toggle de tema, Selectores dinámicos).
- **2.2. Componentes de Presentación:**
    - `ServiceCard` para renderizar datos técnicos de forma visual.
    - Sistema de grillas adaptativas para las categorías de servicios.

## Fase 3: Rutas y Experiencia de Usuario (Bloque de Navegación)
*Objetivo: Construir el flujo de descubrimiento segmentado.*

- **3.1. Landing Selector (The Gate):**
    - Home indexada que segmenta el tráfico hacia las áreas core.
- **3.2. Páginas de Área y Silos SEO:**
    - Rutas dinámicas o estáticas para `/creativa`, `/tecnologica` y `/consultoria`.
    - Agrupación automática de servicios por categoría canónica sin hardcoding.

## Fase 4: Conversión e Integraciones (Bloque de Negocio)
*Objetivo: Captura de leads y rastro operativo.*

- **4.1. Formularios de Captación:**
    - Integración de formularios reactivos para validación avanzada.
- **4.2. Analytics y Trazabilidad:**
    - Implementación de GA4/GTM según estándar `DAT-005`.

## Fase 5: QA y Lanzamiento (Bloque de Excelencia)
*Objetivo: Validación final y despliegue.*

- **5.1. Certificación de Datos:**
    - Verificación de que el 100% de los servicios en `09-SERVICE-MATRIX.md` se visualizan correctamente.
- **5.2. Optimización de Performance:**
    - Verificación de Core Web Vitals (LCP < 1.5s).
- **5.3. Build y Deploy:**
    - Ejecución de `npm run build` y despliegue a producción.

---

## Acción Requerida
- Mantener la Fase 1 como prioridad absoluta antes de avanzar a UI.
- No utilizar frameworks de enrutamiento adicionales (Astro se encarga del routing).
