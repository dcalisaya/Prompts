---
id: MAN-AV-008
name: Guía Maestra de Fotografía para T2I
category: Imagen y Video IA
discipline: Imagen y Video IA
type: guia-maestra
version: 1.0.0
related_services: ["AV-004", "AV-005", "AV-006", "AV-007"]
related_agents: ["DirectorFotografiaT2I", "ArtistaStoryboard"]
related_prompts: []
source_of_truth: true
tags: [t2i, fotografia, ia, prompting, midjourney, sdxl]
legacy_id: MAN-PROD-007
migrated_from: base/masters/manuales-produccion/guia_maestra_t2i.md
---

# Guía Maestra de Fotografía para T2I
## Dirección de Fotografía e Ingeniería de Prompts para Generación de Imágenes

Esta guía traduce los principios de la fotografía profesional a parámetros semánticos optimizados para modelos como Midjourney, SDXL y modelos de difusión avanzados.

---

### 1. Fundamentos Técnicos para IA

En la generación de imágenes (*Text-to-Image*), el éxito depende de la precisión en la definición de la coherencia espacial y la textura.
*   **Tokenización de Lentes**: Los modelos asocian distancias focales con estilos narrativos específicos. "35mm" invoca una estética documental o de *lifestyle*, mientras que "85mm" se orienta a retratos de alta costura o moda.
*   **Iluminación Volumétrica**: La luz debe especificarse para definir la forma y evitar resultados planos o con aspecto de "render" genérico.

---

### 2. Diccionario de Disparadores (Triggers) Técnicos

| Concepto Visual | Trigger Recomendado | Efecto en la IA |
| :--- | :--- | :--- |
| **Retrato Íntimo** | `85mm lens, f/1.8, shallow depth of field, sharp focus on eyes` | Separación nítida del sujeto y efecto Bokeh estético. |
| **Escena Documental** | `35mm lens, f/5.6, deep depth of field, candid moment` | Mayor contexto ambiental y nitidez en múltiples planos. |
| **Arquitectura** | `24mm wide angle, rectilinear lens, vanishing point` | Líneas ortogonales perfectas y sensación de amplitud espacial. |
| **Iluminación Dramática** | `Chiaroscuro, Rembrandt lighting, high contrast` | Sombras profundas, volumen y peso narrativo. |
| **Iluminación Suave** | `Softbox lighting, diffused window light, high key` | Estética limpia, ideal para entornos médicos o comerciales. |

---

### 3. Mitigación de Riesgos en T2I

*   **Sangrado de Color (Bleeding)**: Evitar que los colores del sujeto contaminen el fondo utilizando descriptores de separación o pesos de prompt.
*   **Anatomía de Manos**: Para mitigar deformaciones, se recomienda especificar acciones concretas: `hands in pockets`, `holding a device` o ajustar el encuadre a `medium close-up`.
*   **Textura de Piel Artificial**: Combatir el aspecto "plástico" mediante términos como `skin pores, imperfections, natural skin texture, raw photo`.

---

### 4. Modificadores de Estilo Final

*   **Editorial de Moda**: `Vogue style, fashion shoot, studio lighting, high-end retouching`.
*   **Cinematográfico**: `Cinematic still, teal and orange color grading, anamorphic lens flares`.
*   **Analógico**: `Kodak Portra 400, film grain, light leaks, nostalgic aesthetic`.

---

### 5. Plantillas de Producción

#### **A. Retrato Corporativo Profesional**
> **SUBJECT**: [Descripción]
> **COMPOSITION**: `Medium shot, eye level, center framing.`
> **TECH**: `Shot on Sony A7R IV, 85mm lens, f/2.8, softbox lighting.`
> **STYLE**: `Sharp focus, professional headshot, clean studio background.`

#### **B. Escena de Estilo de Vida (Lifestyle)**
> **SUBJECT**: [Acción natural]
> **COMPOSITION**: `Wide shot, rule of thirds, candid framing.`
> **TECH**: `Shot on Leica M10, 35mm lens, natural sunlight.`
> **STYLE**: `Authentic, unposed, raw photography, natural colors.`

---
*Este manual garantiza que cada petición a la IA cubra los cuatro pilares: Sujeto, Composición, Técnica y Estilo.*
