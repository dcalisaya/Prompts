# Brief Operativo: Web Institucional Live Developer

**Objetivo del documento:** Definir los parámetros mínimos de ejecución para el desarrollo del sitio web institucional de Live Developer, alineado con los estándares canónicos del workspace y con una base técnica aislada del resto de soluciones web del repositorio.

## 1. Información General (Regla Transversal)
- **Qué quiere lograr el cliente (Live Developer):** Centralizar la oferta comercial en un único portal que exprese el ADN "Razón + Emoción", unificando la venta de servicios tecnológicos y creativos sin fricciones.
- **Qué pieza o sistema necesita:** Un sitio web corporativo público, responsivo y orientado a la conversión (generación de leads B2B).
- **Para cuándo lo necesita:** [Pendiente de definición - Vacío de información].
- **Quién aprueba:** Dirección y equipo técnico core.
- **Qué activos ya existen:** Catálogo de servicios (`08-SERVICES.md`), matriz operativa (`09-SERVICE-MATRIX.md`), lineamientos de marca base y la propuesta documental consolidada en `projects/web-live-developer/`.
- **Qué restricciones hay:** El sitio debe respetar estrictamente la nomenclatura y taxonomía de servicios de `base/masters/`, y no debe reutilizar `app/web/` porque esa solución ya está en uso por otro frente del workspace.

## 2. Requerimientos de Web y Desarrollo
- **Problema a resolver:** Dispersión en la comunicación comercial. Se requiere un canal unificado que ofrezca claridad sobre qué hace Live Developer (Desarrollo, IA, Infraestructura, Audiovisual, Marketing, Consultoría).
- **Usuarios objetivo:** Directivos (C-Level), gerentes de operaciones, gerentes de marketing y fundadores de empresas que buscan soluciones tecnológicas o creativas.
- **Funcionalidades requeridas:**
  - Landing principal que explique la propuesta dual (Tecnología y Creatividad).
  - Vistas dinámicas por categoría basadas en `09-SERVICE-MATRIX.md`.
  - Formularios de captación de leads integrados al CRM.
  - Soporte de modo oscuro y claro (Dark/Light mode).
- **Integraciones:**
  - Google Analytics 4 y Google Tag Manager (`DAT-005`).
  - CRM interno (`CX-002`).
- **Stack deseado:** Astro como framework principal para contenido, performance y SEO, con islas de React solo en componentes que requieran interactividad real. Ver `06-DECISION-ARQUITECTURA.md`.
- **Accesos existentes:** Directorio de implementación a crear en `projects/web-live-developer/site/`.
- **Dependencias externas:** Contenido final bilingüe (copywriting), assets visuales definitivos.
- **Criterio de éxito:** Reducción de la tasa de rebote respecto al sitio anterior, aumento en la tasa de conversión de leads cualificados por los formularios, y velocidad de carga LCP < 1.5s.

## 3. ADN de Marca
- **Razón (Área Tecnológica):** Foco en eficiencia, arquitectura, IA y performance. Tono técnico, claro y solvente.
- **Emoción (Área Creativa):** Foco en narrativa, impacto audiovisual y marketing. Tono empático, directo e inspirador.

## Acción Requerida
- Aprobación de este brief por parte de Dirección.
- Definición de la fecha objetivo de lanzamiento.
- Confirmación del uso de `projects/web-live-developer/site/` como raíz técnica del sitio.
