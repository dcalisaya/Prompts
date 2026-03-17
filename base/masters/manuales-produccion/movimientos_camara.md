# Guía Maestra de Movimientos de Cámara para I2V (Image-to-Video)
## Dirección de Fotografía & Prompt Engineering

Esta guía adapta el lenguaje cinematográfico tradicional para optimizar la generación de video con IA (Runway, Pika, Kling, etc.), donde la precisión semántica es crucial para evitar alucinaciones o interpretaciones erróneas del modelo.

---

### 1. Análisis de Precisión Técnica (IA Nuances)

Para la IA, la física real no existe, solo la interpretación de píxeles.

*   **Dolly vs. Zoom:**
    *   *El problema:* Las IAs confunden ambos. Un "Zoom" digital solo escala píxeles.
    *   *La solución:* Para *Dolly*, usa el prompt **"Perspective shift"** o **"Camera moves physicaly"** para forzar el paralaje y la tridimensionalidad real.
*   **Truck vs. Pan:**
    *   *El problema:* La IA tiende a rotar (Pan) en lugar de desplazar (Truck).
    *   *La solución:* Usa **"Lateral camera travel"** o **"Side-scrolling movement"** en lugar de solo "Move left/right".
*   **Roll:**
    *   *Advertencia:* Movimiento de alto riesgo. La IA suele rotar al *sujeto* en lugar de la cámara. Usar solo si es estrictamente necesario o combinado con **"Camera angle tilts"**.

---

### 2. Diccionario de Comandos (Prompt Triggers)

| Movimiento | Definición Cine | Prompt Sugerido para AI (Trigger) |
| :--- | :--- | :--- |
| **Dolly In** | Acercamiento físico | `Camera moves forward towards the subject, changing perspective, 3D depth` |
| **Dolly Out** | Alejamiento físico | `Camera pulls back revealing environment, wide angle expansion` |
| **Truck** | Desplazamiento lateral | `Horizontal camera tracking, side-scrolling movement, parallax background` |
| **Pedestal** | Movimiento vertical puro | `Vertical camera slide up/down, keeping axis straight` |
| **Arc** | Giro alrededor del sujeto | `Circular arc shot around the subject, keeping the face in focus and centered` |
| **Pan** | Rotación sobre eje | `Slow cinematic pan [left/right], scanning the horizon` |
| **Whip Pan** | Barrido rápido | `Fast motion blur whip pan, transition effect` |
| **Handheld** | Cámara en mano | `Shaky cam, organic handheld movement, documentary style, raw footage` |
| **Dolly Zoom** | Efecto Vértigo | `Vertiginous composition, background expands while subject remains same size` |

---

### 3. Modificadores de Control (Tuning)

#### A. Velocidad (Crucial)
Las IAs asumen "slow motion" por defecto. Debes forzar la intención.
*   **Lento/Solemne:** `Slow cinematic [movement]`, `Subtle floating camera`.
*   **Rápido/Acción:** `Fast [movement]`, `Dynamic speed`, `Rapid transition`.

#### B. Anclaje del Sujeto (Subject Anchoring)
Para evitar que la IA deforme al protagonista durante movimientos complejos (especialmente Arcs o Dollys agresivos):
*   *Prompt:* `...keeping the face in focus and centered`, `Subject remains static relative to frame`.

---

### 4. Estética y Coherencia Visual ("Golden Advice")

Dado el uso de equipos como **Canon R5/R6 Mark II** y lentes **35mm**, inyectar estos metadatos ayuda a la IA a "renderizar" con esa calidad óptica.

*   **Prompt de Calidad Base:**
    > `Shot on Canon R5, 35mm wide angle perspective, cinematic depth of field, sharp focus, 8k resolution.`

*   **Contexto Institucional (Administración/Cajero):**
    *   Evita el *Pan* errático.
    *   Usa: **Slow Pedestal Up** o **Slow Dolly In**.
    *   *Por qué:* Transmiten estabilidad, autoridad y limpieza profesional.

*   **Nota sobre el Zolly (Dolly Zoom):**
    *   Es el "Santo Grial" difícil de la IA.
    *   *Tip:* En lugar de pelear con el prompt, genera un **Dolly In** limpio en alta resolución y aplica el **Zoom Out** (digital) en post-producción para simular el efecto óptico.

---

**Recuerda:** La IA es un "operador ciego". No asumas que conoce el contexto. Sé explícito con la *física* del movimiento, no solo con el nombre.
