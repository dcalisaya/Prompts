# Guía Maestra de Movimientos de Cámara para I2V (Image-to-Video)
## Protocolo Técnico de Prompt Engineering para IA Generativa

**Versión:** 1.0  
**Objetivo:** Estandarización de comandos para Runway, Kling, Pika, Veo y Luma.  
**Nivel:** Avanzado / Producción Técnica

> [!IMPORTANT]
> **Modo de Uso para el Equipo:**
> 1. **Consulta:** Identifica el movimiento deseado en el "Diccionario de Movimientos".
> 2. **Copia:** Usa el *Trigger* exacto y las *Prohibiciones* listadas.
> 3. **Aplica:** Si usas las **Plantillas (Sección 5)**, reemplaza solo el campo `DESCRIPTION`. MANTÉN los `CONSTRAINTS` y `metadatos` intactos para asegurar la consistencia.
> 4. **Itera:** Si la IA falla, consulta la tabla de "Riesgos Comunes" antes de regenerar.

---

### 1. Introducción Técnica I2V

En la generación de video con IA (I2V), la "cámara" no es un objeto físico, sino un patrón de transformación de píxeles latentes. A diferencia de un operador humano que entiende intuitivamente la física de un set, **la IA no tiene contexto espacial ni físico.**

Por lo tanto, los términos cinematográficos tradicionales deben traducirse a **instrucciones semánticas explícitas**. Un prompt vago ("cinematic shot") resultará en alucinaciones o movimientos genéricos. Para el éxito en la producción, el operador debe:
1.  **Desacoplar la intención artística de la instrucción técnica.**
2.  **Eliminar toda ambigüedad:** Si un movimiento no está prohibido explícitamente, la IA podría ejecutarlo aleatoriamente.
3.  **Definir la física simulada:** Explicar *qué* se mueve (fondo o sujeto) y *cómo*.

---

### 2. Riesgos Comunes en I2V (Análisis de Fallos)

Identificación de errores frecuentes y sus soluciones técnicas.

| Riesgo / Confusión | Descripción del Fallo | Solución Técnica (Prompt Fix) |
| :--- | :--- | :--- |
| **Dolly vs. Zoom** | La IA escala la imagen 2D (Zoom) en lugar de simular profundidad 3D (Dolly). | Usar: `Camera physically moves through space`, `Parallax effect`, `Background expansion`. |
| **Truck vs. Pan** | La IA rota sobre el eje (Pan) en lugar de desplazarse lateralmente (Truck). | Usar: `Lateral camera slide`, `Side-scrolling tracking`, `Camera stays parallel to subject`. |
| **Deformación del Sujeto** | El rostro o cuerpo se muta al intentar seguir un movimiento complejo (Arc/Zoom). | Añadir Constraint: `Subject features locked`, `No morphing`, `Face remains consistent`. |
| **Mezcla de Ejes** | El modelo combina Tilt + Pan + Roll aleatoriamente, creando efecto "gelatina". | Constraint Negativa: `Single axis movement only`, `No rotation`, `No tilt`. |
| **Exageración (Overshoot)** | Movimientos demasiado rápidos o agresivos por defecto. | Modificadores: `Slow motion`, `Subtle movement`, `Minimal shift`. |

---

### 3. Diccionario de Movimientos de Cámara I2V

Especificaciones técnicas para instruir al modelo.

#### **Dolly In**
*   **Definición:** La cámara avanza físicamente hacia el sujeto.
*   **Trigger:** `Camera moves forward changing perspective`
*   **Ejemplo Prompt:** `Slow camera push-in towards the subject, parallax effect on background, increasing intimacy.`
*   **PROHIBICIONES (Negative Constraints):**
    *   `No zoom`
    *   `No optical scaling`
    *   `No subject deformation`
*   **Advertencia:** En I2V, un Dolly In excesivo suele atravesar al sujeto. Usar `stops before subject`.

#### **Dolly Out**
*   **Definición:** La cámara retrocede físicamente.
*   **Trigger:** `Camera pulls back revealing environment`
*   **Ejemplo Prompt:** `Cinematic pull-back shot, revealing the surrounding office space, wide angle expansion.`
*   **PROHIBICIONES:**
    *   `No zoom out`
    *   `No rotation`
    *   `No tilt`

#### **Truck (Tracking)**
*   **Definición:** Desplazamiento lateral paralelo al sujeto.
*   **Trigger:** `Lateral camera slide`
*   **Ejemplo Prompt:** `Smooth lateral tracking shot following the walking subject, maintain parallel distance.`
*   **PROHIBICIONES:**
    *   `No panning`
    *   `No rotation`
    *   `No angle change`

#### **Pedestal**
*   **Definición:** Movimiento vertical puro (ascensor).
*   **Trigger:** `Vertical rising camera` / `Vertical descending camera`
*   **Ejemplo Prompt:** `Slow pedestal up movement, revealing the skyscraper height, camera remains level.`
*   **PROHIBICIONES:**
    *   `No tilt` (Critico: no inclinar hacia arriba/abajo)
    *   `No zoom`

#### **Arc (Orbit)**
*   **Definición:** Movimiento circular alrededor del sujeto.
*   **Trigger:** `Circular orbit shot`
*   **Ejemplo Prompt:** `180-degree arc shot around subject, background rotates while subject remains centered.`
*   **PROHIBICIONES:**
    *   `No face distortion`
    *   `No rapid spin`
    *   `Subject must not rotate` (La cámara rota, no el sujeto)

#### **Pan**
*   **Definición:** Rotación horizontal sobre el eje (cuello).
*   **Trigger:** `Camera pans [left/right]`
*   **Ejemplo Prompt:** `Slow panoramic scan from left to right, surveying the landscape.`
*   **PROHIBICIONES:**
    *   `No lateral movement`
    *   `No truck`

#### **Whip Pan**
*   **Definición:** Barrido a alta velocidad con desenfoque.
*   **Trigger:** `Fast whip pan transition`
*   **Ejemplo Prompt:** `Aggressive whip pan right with motion blur, transitioning context.`
*   **PROHIBICIONES:**
    *   `No static focus`
    *   `No slow movement`

#### **Handheld**
*   **Definición:** Cámara en mano, movimiento orgánico.
*   **Trigger:** `Handheld camera shake`
*   **Ejemplo Prompt:** `Subtle handheld movement, documentary style, organic breathing motion.`
*   **PROHIBICIONES:**
    *   `No mechanical smoothness`
    *   `No stabilization`

#### **Dolly Zoom (Zolly)**
*   **Definición:** Efecto vértigo (Dolly In + Zoom Out).
*   **Trigger:** `Vertigo effect`
*   **Ejemplo Prompt:** `Dolly zoom effect, background expands drastically while subject size remains constant, disorienting.`
*   **PROHIBICIONES:**
    *   `Subject size change`
    *   `No standard zoom`

---

### 4. Modificadores de Control

Estos parámetros deben incluirse siempre para definir la física del movimiento.

#### A. Velocidad
*   `Slow / Cinematic Slow`: Para tomas institucionales, emocionales o descriptivas.
*   `Subtle / Minimal`: Para entrevistas o escenas estáticas donde solo se requiere "vida".
*   `Fast / Dynamic`: Para acción, deportes o transiciones (Whip Pan).
*   `Aggressive`: Para efectos de impacto (Crash Zoom).

#### B. Intensidad (Amplitude)
*   `Micro-movement`: Apenas perceptible (respiración).
*   `Wide sweep`: Recorre gran parte del escenario.
*   `Tight`: Mantiene el encuadre cerrado.

#### C. Anclaje del Sujeto (Subject Locking)
Es vital para evitar que la IA "imagine" nuevas caras o cuerpos.
*   `Subject remains centered`
*   `Face locked in frame`
*   `No character morphing`
*   `Maintain eye contact`

---

### 5. Plantillas Ejecutables I2V

Copiar y pegar estas estructuras para garantizar consistencia.

#### **Template 1: Institutional / Corporate (Estabilidad)**
> **CAMERA TYPE:** Professional Tripod / Dolly
> **MOVEMENT:** Slow Dolly In
> **DESCRIPTION:** `Slow, barely perceptible camera push-in towards the speaker to emphasize authority.`
> **CONSTRAINTS:** `No shake, no zoom, steady horizon, no rotation.`
> **SUBJECT LOCK:** `Face centered, sharp focus.`
> **SPEED:** `Very Slow.`
> **INTENSITY:** `Subtle.`

#### **Template 2: Dynamic / Commercial (Energía)**
> **CAMERA TYPE:** Steadicam / Gimbal
> **MOVEMENT:** Truck + Pan (Tracking)
> **DESCRIPTION:** `Side-scrolling tracking shot following subject walking, keeping pace with movement.`
> **CONSTRAINTS:** `No vertical shake, fluid motion, keep subject in middle third.`
> **SUBJECT LOCK:** `Body profile consistent.`
> **SPEED:** `Normal walking pace.`
> **INTENSITY:** `Moderate.`

#### **Template 3: Dramatic / Emotional (Narrativa)**
> **CAMERA TYPE:** Handheld (Controlled)
> **MOVEMENT:** Subtle Arc
> **DESCRIPTION:** `Slow, intimate arc movement around the seated subject, creating depth with foreground elements.`
> **CONSTRAINTS:** `No fast spins, keep focus on eyes, no background distortion.`
> **SUBJECT LOCK:** `Eyes locked.`
> **SPEED:** `Slow.`
> **INTENSITY:** `Intimate/Close.`

---

### 6. Estética y Metadatos Ópticos

El uso de referencias de hardware (Canon R5, Lentes 35mm) funciona como "estilo" o "filtro", pero **no controla el movimiento**. Úsalos como capa final.

*   **Uso Correcto:** `...shot on Canon R5, 35mm lens.` (Define la textura, color y bokeh).
*   **Advertencia de Bokeh:** Si pides `f/1.2` (muy desenfocado) junto con mucho movimiento, la IA sufrirá para mantener el foco. En I2V complejo, prefiere `f/2.8` o `f/4` para asegurar nitidez en el sujeto durante el trayecto.

---

### 7. Reglas de Oro I2V

1.  **Declaración Única:** Nunca pidas "Un poco de pan, con algo de zoom y tal vez dolly". Pide **UNA** cosa: "Dolly In".
2.  **La Ley de la Negación:** Define lo que NO quieres. (`No blur`, `No rotation`) es tan importante como lo que sí quieres.
3.  **Monocultivo de Ejes:** Prohibido mezclar ejes en promts básicos. O te mueves X (Lateral), o te mueves Y (Vertical), o te mueves Z (Profundidad).
4.  **Institucional = Lento:** En escenas de salud, administración o banca, la velocidad debe ser siempre `Slow` o `Subtle`. La velocidad rápida connota inestabilidad o urgencia no deseada.

---
*Documento optimizado para ingesta directa en workflows de generación de video con IA.*
