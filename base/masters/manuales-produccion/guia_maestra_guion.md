---
id: MAN-PROD-001
name: Guía Maestra de Guion para AI
category: Producción Audiovisual
discipline: Producción Audiovisual
type: operativo
---

# Guía Maestra de Guion para AI
## Ingeniería de Prompts para Guionistas

Esta guía asegura que la Inteligencia Artificial opere bajo los estándares de un guionista profesional, priorizando el formato técnico y la gestión del conflicto narrativo sobre la redacción genérica.

---

### 1. El Formato de Salida Obligatorio

Para evitar formatos narrativos o teatrales incorrectos, se debe exigir explícitamente el uso de **Fountain** o **Markdown-Script**.

*   **Instrucción Clave**: "Genera el contenido siguiendo el formato de guion estándar: encabezados de escena (sluglines) en mayúsculas, descripción de acción en presente y diálogos centrados. Prohibido el uso de prosa literaria o listas numeradas".

---

### 2. Diccionario de Disparadores (Triggers) de Estilo

| Género / Tono | Trigger Recomendado | Efecto en la IA |
| :--- | :--- | :--- |
| **Drama Serio** | `Gritty, grounded, Sorkin-esque dialogue, subtext-heavy` | Diálogos punzantes, inteligencia emocional y tensión latente. |
| **Comedia** | `Witty, situational irony, comedic timing, punchlines` | Prioriza el humor situacional y el contraste narrativo. |
| **Thriller** | `Pacing, suspense, ticking clock, mystery` | Frases breves, ritmo acelerado y revelaciones medidas. |
| **Comercial / Spot** | `Emotionally resonant, aspirational, brand-focused` | Conexión emocional inmediata y una resolución clara de marca. |
| **Manifiesto** | `Poetic voice-over, anthemic tone, inspiring` | Estructura rítmica, imágenes potentes y tono de autoridad cálida. |

---

### 3. Mitigación de Errores Comunes

*   **Diálogo Explicativo (On-the-Nose)**: Personajes que verbalizan sus sentimientos de forma literal.
    *   *Solución*: `Prompt: "Implementa subtexto. El personaje A tiene un deseo X pero habla sobre un tema Y. No permitas que expresen sus emociones directamente".`
*   **Abuso de Acotaciones (Wrylies)**: Inclusión excesiva de estados de ánimo entre paréntesis.
    *   *Solución*: `Prompt: "Elimina acotaciones parentéticas a menos que sean estrictamente necesarias para la comprensión de la acción física".`
*   **Voz Pasiva y Narración**: Uso de "vemos que" o "la cámara enfoca".
    *   *Solución*: `Prompt: "Utiliza exclusivamente voz activa y presente. Ejemplo: 'JUAN ENTRA'. Evita referencias a la cámara o al espectador".`

---

### 4. Plantillas de Ingeniería de Prompts

#### **A. Escena Narrativa (Ficción)**
> **GÉNERO**: [Definir]
> **PERSONAJES**: [Nombre y rasgo psicológico clave]
> **ESCENARIO**: [Lugar y tiempo]
> **CONFLICTO**: [Lo que busca el personaje A vs. el impedimento del personaje B]
> **ESTILO**: `Show, don't tell. Acción en presente. Diálogo con subtexto.`

#### **B. Spot Publicitario (30s / 60s)**
> **MARCA**: [Nombre]
> **PÚBLICO**: [Target]
> **PROBLEMA**: [Pain Point inicial]
> **SOLUCIÓN**: [Beneficio central del producto]
> **ESTRUCTURA**: `Gancho (0-5s) -> Problema (5-15s) -> Solución (15-25s) -> CTA (25-30s).`

---
*Este documento optimiza la transición de la IA de un redactor pasivo a un arquitecto de historias técnico.*
