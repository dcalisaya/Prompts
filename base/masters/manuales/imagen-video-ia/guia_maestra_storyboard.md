---
id: MAN-AV-007
name: Guía Maestra de Storyboard para AI
category: Imagen y Video IA
discipline: Imagen y Video IA
type: guia-maestra
version: 1.0.0
related_services: ["AV-004", "AV-005", "AV-006", "AV-007"]
related_agents: ["ArtistaStoryboard", "DirectorFotografiaT2I"]
related_prompts: ["STORY-001"]
source_of_truth: true
tags: [storyboard, ia, t2i, prompting, midjourney]
legacy_id: MAN-PROD-006
migrated_from: base/masters/manuales-produccion/guia_maestra_storyboard.md
---

# Guía Maestra de Storyboard para AI
## Ingeniería de Prompts para Narrativa Visual Secuencial

Esta guía define el protocolo de comunicación con los sistemas generativos de imagen para asegurar la coherencia visual entre las distintas escenas y tomas de una producción.

---

### 1. Arquitectura del Prompt de Storyboard

Para que el flujo de trabajo multi-toma sea efectivo, cada petición debe estructurarse de la siguiente manera:

`[ENCUADRE] + [ACCIÓN ESPECÍFICA] + [ÁNGULO] + [CONTINUIDAD VISUAL] + [ESTILO]`

*   **Ejemplo Correcto**: `Medium Shot. Nurse (same character) walks from Right to Left. Eye Level. Matching lighting from previous shot. Cinematic storyboard style.`

---

### 2. Gestión de la Coherencia (Assets)

La consistencia de los personajes y entornos es el pilar de un storyboard profesional.
*   **Referencias Visuales**: Utilizar la imagen de referencia del personaje (`--cref` en Midjourney) para todas las tomas de una misma secuencia.
*   **Descriptor de Consistencia**: "Mantener uniforme blanco, rasgos faciales idénticos y paleta de colores corporativa".

---

### 3. Puesta en Escena (Blocking)

Es fundamental definir la disposición espacial antes de generar la imagen:
*   **Ley de los 180 Grados**: Si se establece un eje de acción, los personajes deben mantener su posición relativa (izquierda/derecha) para no desorientar al espectador.
*   **Capas de Profundidad**: Especificar claramente qué elementos ocupan el primer plano (*foreground*), el término medio y el fondo (*background*).

---

### 4. Plantillas Operativas

#### **Escena de Establecimiento (Master Shot)**
> `Extreme Wide Shot of [LOCATION]. Establishing shot. Cinematic lighting. Architectural symmetry. High detail on environment.`

#### **Acción de Personaje (Full Body)**
> `Wide Shot of [CHARACTER] performing [ACTION]. Eye level. Maintaining character consistency and costume. Sharp focus on subject.`

#### **Diálogo y Emoción (OTS / MCU)**
> `Over the Shoulder shot of [CHARACTER A] looking at [CHARACTER B]. Focus on [CHARACTER B]'s expression. Cinematic bokeh. Blurred foreground shoulder.`

---

### 5. Directrices para el Operador

1.  **Estática vs. Dinámica**: En una imagen fija (T2I), no se solicita "movimiento de cámara", sino el "resultado visual" de dicho movimiento (ej. *Motion blur* para indicar velocidad).
2.  **Tratamiento de Detalles**: Si una acción requiere precisión en las manos o en objetos pequeños, es preferible planificar un **Plano de Inserto** específico en lugar de confiar en un plano general.
3.  **Iluminación**: Definir siempre la fuente de luz principal para mantener la lógica visual entre tomas consecutivas.
