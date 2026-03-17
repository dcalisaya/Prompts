# Guía Maestra de Storyboard para AI
## Prompt Engineering para Narrativa Visual Secuencial

Esta guía está diseñada para alimentar tu sistema de "Escenas y Tomas". El objetivo es que cada cuadro generado por la IA (T2I) sea coherente con el anterior y el siguiente.

---

### 1. La Estructura del Prompt Perfecto para Storyboard

Para que tu sistema de "Mult-Take Workflow" funcione, el prompt de "AI PROMPT" debe seguir esta arquitectura:

`[ENCUADRE] + [ACCIÓN ESPECÍFICA] + [ÁNGULO] + [CONTINUIDAD VISUAL] + [ESTILO]`

*   **Ejemplo Malo:** "Enfermera camina hacia la cama." (La IA inventa el ángulo y la ropa cada vez).
*   **Ejemplo Maestro:** `Medium Shot. Nurse (same character) walks from Right to Left towards the bed. Eye Level. Matching lighting from previous shot. Cinematic storyboard style.`

---

### 2. Diccionario de Coherencia (Assets)

Tu interfaz tiene un campo "ASSET". Esto es crucial.
*   **Uso:** En Midjourney/Firefly, usa la imagen del personaje generado en la Toma A como "Image Reference" (`--cref`) para la Toma B.
*   **Instrucción:** "Mantener consistencia de personaje. Uniforme blanco, cabello recogido, misma paleta de colores."

---

### 3. Técnicas de "Blocking" (Puesta en Escena)

Define dónde están los actores *antes* de pedir la imagen.
*   **Rule of 180 (Eje de Acción):** Si estableces que la Cama está a la Izquierda y la Puerta a la Derecha, mantenlo así. No inviertas el escenario aleatoriamente.
*   **Triangulación:** Cama (Fondo), Enfermera (Medio), Tablet (Primer Plano). Usa estas capas en tu prompt: `Nurse in middleground, Bed in background`.

---

### 4. Plantillas para tu Sistema ("Visual Acción")

Copia estos bloques en tu campo "AI PROMPT":

#### **Template: Establecimiento de Escena (Master Shot)**
> `Extreme Wide Shot of [LOCATION]. Establishing shot. Cinematic lighting coming from [WINDOW/SOURCE]. Empty/Occupied by [SUBJECT] in center. High contrast, architectural symmetry.`

#### **Template: Acción de Personaje (Full Body)**
> `Wide Shot of [CHARACTER] walking from [LEFT/RIGHT] to center. Action: [VERB]. Eye level. Character wearing [COSTUME]. Depth of field showing [BACKGROUND] clearly.`

#### **Template: Diálogo / Emoción (OTS/MCU)**
> `Over the Shoulder shot from behind [CHARACTER A] looking at [CHARACTER B]. Focus on [CHARACTER B]'s face. [EMOTION] expression. Blurred foreground shoulder. Cinematic bokeh.`

#### **Template: Detalle / Inserto (Hands/Objects)**
> `Close-up insert shot of [OBJECT] in hands. Top-down view or Macro angle. High texture detail on [OBJECT]. Background completely blurred.`

---

### 5. Advertencias para el Operador

1.  **No pidas "Movimiento" en una foto:** No pidas "La cámara se mueve". Pide el "Resultado del movimiento" (e.g., "Motion blur background" para velocidad).
2.  **Cuidado con las manos:** En planos generales (Wide), las manos suelen salir mal. Si la acción requiere manos perfectas, haz un **PLAN DE INSERTO** (Close-up) solo de las manos.
