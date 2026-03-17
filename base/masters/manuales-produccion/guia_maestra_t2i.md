# Guía Maestra de Fotografía para T2I (Text-to-Image) / I2I
## Dirección de Fotografía & Prompt Engineering para Midjourney, SDXL, Mystic

Esta guía traduce el lenguaje visual de la fotografía profesional a instrucciones semánticas precisas para modelos de generación de imágenes.

---

### 1. Principios Técnicos para IA

A diferencia del video (I2V), en T2I el desafío es la **coherencia espacial** y la **textura**.
*   **Tokenización de Lentes:** La IA asocia "35mm" no solo con una distancia focal, sino con un estilo de vida/documental. "85mm" lo asocia con retratos de moda. Usa el lente como "trigger de estilo".
*   **Iluminación Volumétrica:** La luz define la forma. Sin una especificación de luz, la imagen se siente "plana" o "renderizada".

---

### 2. Diccionario de Comandos (Prompt Triggers)

| Concepto Visual | Trigger de Prompt Recomendado | Efecto en IA |
| :--- | :--- | :--- |
| **Retrato Íntimo** | `85mm lens, f/1.8, shallow depth of field, sharp focus on eyes` | Fondo desenfocado (Bokeh), sujeto separado, cara favorecida. |
| **Escena Documental** | `35mm lens, f/5.6, deep depth of field, street photography, candid moment` | Más contexto, todo más enfocado, sensación de "estar ahí". |
| **Arquitectura/Espacio** | `24mm wide angle lens, rectilinear lens, vanishing point, symmetrical framing` | Líneas rectas, sensación de amplitud sin distorsión ojo de pez. |
| **Detalle Macro** | `100mm macro lens, extreme close-up, intricate texture, microscopic detail` | Texturas hiperrealistas, fondo totalmente abstracto. |
| **Iluminación Dramática** | `Chiaroscuro, Rembrandt lighting, high contrast, volumetric god rays` | Sombras duras, drama, seriedad. |
| **Iluminación Suave** | `Softbox lighting, diffused window light, high key, pastel tones` | Belleza, calma, comercial, médico. |

---

### 3. Riesgos Comunes en T2I

*   **Bleeding (Sangrado):** Cuando el color o estilo del sujeto contamina el fondo.
    *   *Solución:* Separar descripciones con `BREAK` (en MJ) o usar pesos `(background:0.5)`.
*   **Limbs/Hands:** El clásico problema de manos deformes.
    *   *Solución:* `Hands in pockets`, `Holding a specific object`, o encuadre `Head and shoulders` para evitar las manos.
*   **Plastic Skin:** Piel demasiado perfecta o cerosa.
    *   *Solución:* `Skin texture, pores, imperfections, freckles, raw photo`.

---

### 4. Modificadores de Estilo (The Secret Sauce)

Añadir estos al final del prompt para cambiar el "Look & Feel":
*   **Editorial de Moda:** `Editorial photography, Vogue style, fashion shoot, studio lighting`.
*   **Cinematográfico:** `Cinematic still, color graded, teal and orange, movie scene`.
*   **Analógico:** `Kodak Portra 400, film grain, analog photography, light leak`.
*   **Corporativo/Stock:** `Stock photo, professional, crisp, bright, commercial`.

---

### 5. Plantillas de Producción (Copy-Paste)

#### **Template A: Retrato Corporativo / LinkedIn**
> **SUBJECT:** [Descripción del sujeto]
> **COMPOSITION:** `Medium shot, eye level, center framing.`
> **TECH:** `Shot on Sony A7R IV, 85mm lens, f/2.8, studio lighting, softbox.`
> **STYLE:** `Professional headshot, sharp focus, clean background, high resolution.`
> **NEGATIVE:** `(Casual, messy, dark, distorted eyes, extra fingers, cartoon)`

#### **Template B: Escena de Estilo de Vida (Lifestyle)**
> **SUBJECT:** [Descripción de la acción]
> **COMPOSITION:** `Wide shot, rule of thirds, candid moment.`
> **TECH:** `Shot on Leica M10, 35mm lens, natural light, sun flare.`
> **STYLE:** `Street photography, authentic, raw, unposed, analog aesthetic.`
> **NEGATIVE:** `(Posed, studio, artificial light, plastic skin, render)`

#### **Template C: Producto / Arquitectura (Clean)**
> **SUBJECT:** [Descripción del objeto/espacio]
> **COMPOSITION:** `Eye level, symmetry, minimalist framing.`
> **TECH:** `Shot on Phase One, 50mm lens, f/8, sharp details.`
> **STYLE:** `Architectural digest style, interior design, product photography, studio light.`
> **NEGATIVE:** `(Dust, messy, low resolution, blurry, distorted lines)`

---
*Esta guía está diseñada para estructurar la petición a la IA, asegurando que se cubran: Sujeto + Composición + Técnica + Estilo.*
