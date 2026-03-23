# Mapeo de Servicios Web: Live Developer

**Objetivo del documento:** Establecer la relación entre el catálogo canónico (`09-SERVICE-MATRIX.md`) y la estructura de presentación front-end para la web. 
*Nota: Este documento es un derivado operativo exclusivo para la interfaz web. La única fuente de verdad sobre servicios sigue siendo `base/masters/company/09-SERVICE-MATRIX.md` y `base/masters/catalog/08-SERVICES.md`.*

## 1. Enfoque Web: "Emoción" (Área Creativa y Estratégica)

Las siguientes categorías canónicas se agruparán bajo la experiencia de navegación enfocada en narrativa, impacto y estrategia:

*   **Producción Audiovisual** (`AV-001` a `AV-016`)
*   **Diseño y Branding** (`BR-001` a `BR-008`)
*   **Marketing Digital** (`MK-001` a `MK-004`)
*   **Media Planning y Performance** (`MED-001` a `MED-007`)
*   **Relaciones Públicas y Comunicación** (`PR-001` a `PR-006`)
*   **Content Strategy y Copy** (`CNT-001` a `CNT-003`)
*   **Influencer Marketing** (`IMK-001` a `IMK-003`)
*   **Experiential y Eventos** (`EXP-001` a `EXP-003`)

## 2. Enfoque Web: "Razón" (Área Tecnológica e Infraestructura)

Las siguientes categorías canónicas se agruparán bajo la experiencia de navegación técnica y de sistemas:

*   **Infraestructura y Web** (`INF-001` a `INF-008`)
*   **Desarrollo de Software y Apps** (`DEV-001` a `DEV-010`)
*   **Soluciones IA y Automatización** (`IA-001` a `IA-002`)
*   **Data, Analytics e Insights** (`DAT-001` a `DAT-005`)

## 3. Enfoque Web: Consultoría y Negocio (Cross-Domain)

Categorías que por su naturaleza aplican tanto a la optimización de procesos (Razón) como a la propuesta de valor (Emoción):

*   **Consultoría de Negocio** (`BIZ-001` a `BIZ-004`)
*   **Commerce Avanzado** (`ECO-001` a `ECO-004`)
*   **Customer Experience y CRM** (`CX-001` a `CX-005`)
*   **Healthcare Marketing** (`HLT-001` a `HLT-003`)
*   **Sostenibilidad y ESG** (`ESG-001` a `ESG-003`)

## Reglas de Renderizado en Front-end
- Los nombres de las categorías y servicios deben consumirse idealmente de una fuente estructurada (JSON) o respetarse literalmente del Markdown canónico.
- No se permiten alias o nombres comerciales alternativos para los servicios oficiales.

## Acción Requerida
- Implementar un script que parseé `09-SERVICE-MATRIX.md` y genere el JSON final consumible por Vite/React en tiempo de compilación.
