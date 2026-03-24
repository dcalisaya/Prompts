---
id: MAN-AV-006
name: Guía Maestra de Imagen a Video IA
category: Imagen y Video IA
discipline: Imagen y Video IA
type: guia-maestra
version: 1.0.0
related_services: ["AV-004", "AV-005", "AV-006"]
related_agents: ["DirectorTecnicoI2V", "ArtistaStoryboard"]
related_prompts: ["STORY-001"]
source_of_truth: true
tags: [i2v, video, ia, prompting, runway, kling]
legacy_id: MAN-PROD-005
migrated_from: base/masters/manuales-produccion/guia_maestra_i2v.md
---

# Guía Maestra de Movimientos de Cámara para I2V
## Protocolo Técnico de Ingeniería de Prompts para Video Generativo

**Objetivo**: Estandarización de comandos para motores de video como Runway, Kling, Pika y Luma.

---

### 1. Introducción Técnica al I2V (Image-to-Video)

En la generación de video por IA, la "cámara" es una simulación de transformación de píxeles latentes. Dado que **la IA no posee noción intrínseca del espacio físico**, los términos cinematográficos deben traducirse a instrucciones semánticas explícitas y libres de ambigüedad.

---

### 2. Análisis de Riesgos y Fallos Comunes

| Fallo Detectado | Descripción | Solución Técnica |
| :--- | :--- | :--- |
| **Dolly vs. zoom** | La IA escala la imagen (2D) en lugar de mover la cámara (3D). | Usar: `Camera moves physically through space`, `Parallax effect`. |
| **Truck vs. Pan** | La IA rota sobre el eje en lugar de desplazarse lateralmente. | Usar: `Lateral camera slide`, `Side-scrolling tracking`. |
| **Deformación** | El sujeto muta durante movimientos complejos. | Usar restricción: `Subject features locked`, `No morphing`. |
| **Efecto Gelatina** | Mezcla caótica de ejes de movimiento. | Usar: `Single axis movement only`, `No rotation`. |

---

### 3. Diccionario Operativo de Movimientos

#### **Dolly In (Acercamiento Físico)**
*   **Trigger**: `Camera moves forward changing perspective`.
*   **Restricción**: `No zoom, no optical scaling`.
*   **Nota**: Forzar el efecto de paralaje (*parallax*) para asegurar la tridimensionalidad.

#### **Dolly Out (Alejamiento Físico)**
*   **Trigger**: `Camera pulls back revealing environment`.
*   **Restricción**: `No zoom out, no rotation`.

#### **Truck / Tracking (Seguimiento Lateral)**
*   **Trigger**: `Lateral camera slide parallel to subject`.
*   **Restricción**: `No panning, no axis rotation`.

#### **Pedestal (Movimiento Vertical)**
*   **Trigger**: `Vertical rising/descending camera`.
*   **Restricción**: `No tilt, camera remains level`.

#### **Arc / Orbit (Órbita Circular)**
*   **Trigger**: `Circular orbit shot around subject`.
*   **Restricción**: `Subject remains centered, no face distortion`.

---

### 4. Modificadores de Control Críticos

#### A. Velocidad
*   `Slow / Cinematic Slow`: Para entornos corporativos o institucionales.
*   `Subtle / Minimal`: Para añadir "vida" a escenas estáticas sin distracciones.
*   `Fast / Dynamic`: Para secuencias de acción o transiciones de impacto.

#### B. Anclaje del Sujeto (Subject Locking)
Esencial para mantener la integridad visual del personaje:
- `Subject remains centered in frame`.
- `No character morphing`.
- `Maintain consistent features`.

---

### 5. Plantillas de Ejecución

#### **Pila 1: Estabilidad Institucional**
> **MOVEMENT**: Slow Dolly In
> **DESCRIPTION**: `Slow, barely perceptible camera push-in towards the subject to emphasize authority.`
> **CONSTRAINTS**: `No shake, no zoom, steady horizon, no rotation.`
> **SPEED**: `Very Slow.`

#### **Pila 2: Dinamismo Comercial**
> **MOVEMENT**: Truck + Pan (Tracking)
> **DESCRIPTION**: `Side-scrolling tracking shot following subject walking, keeping pace with movement.`
> **CONSTRAINTS**: `Fluid motion, keep subject in middle third, no vertical shake.`
> **SPEED**: `Normal.`

---

### 6. Reglas de Oro para Operadores I2V

1.  **Declaración de Eje Único**: No mezclar múltiples movimientos en un mismo prompt base para evitar alucinaciones.
2.  **Uso de la Negación**: Definir lo que **NO** debe ocurrir (`No blur`, `No rotation`) es tan relevante como la instrucción positiva.
3.  **Coherencia Óptica**: Incluir metadatos de hardware (`Shot on 35mm lens`) ayuda a la IA a definir la profundidad de campo y la textura de la imagen.
