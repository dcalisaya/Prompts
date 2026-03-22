---
id: MAN-AV-005
name: Guía Maestra de Movimientos de Cámara
category: Producción Audiovisual
discipline: Producción Audiovisual
type: guia-maestra
version: 1.0.0
related_services: ["AV-001", "AV-002", "AV-003"]
related_agents: ["DirectorAudiovisual", "DirectorTecnicoI2V"]
related_prompts: []
source_of_truth: true
tags: [camara, movimientos, cinematografia, i2v]
legacy_id: MAN-PROD-008
migrated_from: base/masters/manuales-produccion/movimientos_camara.md
---

# Guía Maestra de Movimientos de Cámara para I2V
## Dirección de Fotografía e Ingeniería de Prompts

Esta guía adapta el lenguaje cinematográfico tradicional para la optimización de la generación de video con IA (Runway, Pika, Kling, Luma), priorizando la precisión semántica sobre el lenguaje coloquial.

---

### 1. Análisis de Precisión Técnica

En la generación por IA, es vital distinguir entre cambios ópticos y desplazamientos físicos:

*   **Dolly vs. Zoom**:
    *   *Confusión común*: La IA suele escalar píxeles (Zoom) en lugar de mover la cámara.
    *   *Solución*: Utilizar **"Perspective shift"** o **"Camera moves physically through space"** para garantizar el efecto de paralaje real.
*   **Truck vs. Pan**:
    *   *Confusión común*: La IA tiende a rotar sobre el eje (Pan) por simplicidad de cómputo.
    *   *Solución*: Utilizar **"Lateral camera travel"** o **"Side-scrolling tracking shot"** para forzar el desplazamiento lateral paralelo.

---

### 2. Diccionario de Disparadores (Triggers) de Movimiento

| Movimiento | Definición Técnica | Trigger Recomendado para IA |
| :--- | :--- | :--- |
| **Dolly In** | Acercamiento físico a la acción. | `Camera moves forward, changing perspective, 3D depth.` |
| **Dolly Out** | Alejamiento físico para revelar contexto. | `Camera pulls back, wide angle expansion, revealing environment.` |
| **Truck** | Desplazamiento lateral paralelo. | `Horizontal camera tracking, parallax background, lateral slide.` |
| **Pedestal** | Desplazamiento vertical puro. | `Vertical camera slide, keeping horizon level, pedestal up/down.` |
| **Arc** | Movimiento circular orbital. | `Circular orbit shot around subject, keeping subject centered.` |
| **Handheld** | Cámara en mano (orgánico). | `Shaky cam, organic handheld motion, documentary style.` |

---

### 3. Modificadores de Control (Tuning)

#### A. Gestión de la Velocidad
La velocidad dicta el tono narrativo de la toma:
*   **Solemne / Estable**: `Slow cinematic movement`, `Subtle floating camera`.
*   **Dinámico / Acción**: `Fast motion`, `Rapid camera transition`, `Dynamic tracking`.

#### B. Anclaje del Sujeto (Subject Anchoring)
Crucial para evitar deformaciones del personaje durante el movimiento:
*   *Instrucción*: `Keeping the face in focus and centered`, `Subject remains static relative to the frame`.

---

### 4. Estética y Coherencia Óptica

La inclusión de metadatos técnicos eleva la calidad del renderizado final:
*   **Configuración Base**: `Shot on Canon R5, 35mm lens, cinematic depth of field, 8k resolution`.
*   **Contexto Corporativo**: Se recomienda priorizar los movimientos de **Slow Pedestal** o **Slow Dolly In**, ya que transmiten una sensación de estabilidad, autoridad y profesionalismo.

---

**Nota Final**: La IA interpreta instrucciones físicas. No asumas que "entiende" la intención artística; sé explícito con el desplazamiento de los ejes espaciales (X, Y, Z).
