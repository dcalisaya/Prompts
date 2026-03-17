# Guía Maestra de Guion para AI (Text-to-Text)
## Prompt Engineering para Guionistas

Esta guía asegura que la IA (ChatGPT, Claude, Gemini) actúe como un guionista de Hollywood y no como un asistente de redacción genérico. La clave está en. forzar el **formato** y el **conflicto**.

---

### 1. El Formato de Salida (Obligatorio)

La IA tiende a escribir guiones en formato "teatral" o novelado. Debemos forzar el formato **Fountain** o **Markdown-Script**.

*   **Instrucción Clave:** "Usa formato de guion estándar (Sluglines en mayúsculas, Acción en presente, Diálogo centrado). No uses listas numeradas ni narración en prosa."

---

### 2. Diccionario de Tonos y Estilos

| Género/Tono | Trigger de Prompt Recomendado | Efecto en IA |
| :--- | :--- | :--- |
| **Drama Serio** | `Gritty, grounded, Sorkin-esque dialogue, high stakes, subtext-heavy` | Diálogos rápidos, inteligentes, situaciones realistas y tensas. |
| **Comedia** | `Witty, situational irony, visual gags, comedic timing, punchlines` | Busca el humor en la situación o el contraste, no solo en chistes. |
| **Thriller** | `Pacing, suspense, ticking clock, mystery, unreliable narrator` | Frases cortas, acción tensa, revelaciones dosificadas. |
| **Comercial / Spot** | `Emotionally resonant, aspirational, cinematic storytelling, brand-focused` | Conexión emocional rápida, solución clara, visualmente atractivo. |
| **Manifiesto** | `Poetic voice-over, anthemic tone, inspiring, abstract imagery` | Frases poderosas, imágenes evocadoras, ritmo in-crescendo. |

---

### 3. Riesgos Comunes en Guiones por IA

*   **"On-the-Nose" Dialogue:** Personajes diciendo exactamente cómo se sienten.
    *   *Solución:* `Prompt: "Write subtext. Character A wants X but speaks about Y. Do not let them state their feelings directly."`
*   **Exceso de Acotaciones:** (angry), (sadly), (happily) en cada línea.
    *   *Solución:* `Prompt: "Do not use parentheticals/wrylies unless absolutely necessary for action."`
*   **Narración Pasiva:** "Vemos que Juan entra..."
    *   *Solución:* `Prompt: "Use active voice. 'Juan ENTERS'. Never write 'We see' or 'Camera angles'."`

---

### 4. Plantillas de Prompting (Copy-Paste)

#### **Template A: Escena Narrativa (Drama/Ficción)**
> **GENRE:** [Género]
> **CHARACTERS:** [Nombre y breve descripción de personalidad/deseo]
> **SETTING:** [Lugar y Hora]
> **CONFLICT:** [Qué quiere A y qué quiere B. Por qué no pueden tenerlo.]
> **STYLE:** `Show, don't tell. Active verbs. Realistic dialogue with subtext.`
> **CONSTRAINT:** `Script format only. No camera directions.`

#### **Template B: Spot Publicitario (30s / 60s)**
> **PRODUCT/BRAND:** [Marca]
> **TARGET AUDIENCE:** [Público Objetivo]
> **PAIN POINT:** [El problema inicial]
> **SOLUTION:** [Cómo la marca resuelve el problema]
> **TONE:** `Inspirational, energetic, dynamic.`
> **STRUCTURE:** `Hook (0-5s) -> Problem (5-15s) -> Solution (15-25s) -> CTA (25-30s).`

#### **Template C: Video Manifiesto (Voice Over)**
> **THEME:** [Tema central: Innovación, Libertad, Futuro...]
> **KEY MESSAGE:** [La frase final]
> **VISUAL STYLE:** `Abstract, cinematic, human connection.`
> **VO TONE:** `Deep, warm, authoritative, slow paced.`
> **FORMAT:** `Double column: [Left: VISUALS] [Right: AUDIO/VO]`

---
*Esta guía transforma a la IA de un redactor pasivo a un arquitecto de historias.*
