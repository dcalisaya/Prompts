# Fundamentos del Storyboard (Base Teórica)
## La Pre-visualización de la Narrativa

El Storyboard no es un cómic bonito; es el **plano arquitectónico** de la producción audiovisual. Su función es resolver problemas *antes* de rodar (o generar).

---

### 1. La Unidad Mínima: La Toma (Shot)

Veo en tu interfaz que ya dividen por "Escenas" y "Tomas". Esto es correcto.
*   **Escena:** Unidad de acción en un mismo lugar y tiempo (e.g., "Habitación Hospital").
*   **Toma (Shot):** La unidad ininterrumpida de grabación/generación. Si la cámara corta o cambia drasticamente de ángulo, es una nueva toma (Toma A, Toma B...).

---

### 2. Continuidad (Raccord)

El error más grave en storyboards generados por IA es la falta de continuidad.
*   **Raccord de Mirada:** Si en la Toma A el personaje mira a la derecha, en la Toma B (contraplano) el otro personaje debe mirar a la izquierda. Si ambos miran a la derecha, parecerá que miran lo mismo, no el uno al otro.
*   **Raccord de Movimiento:** Si un personaje sale por la derecha del cuadro, debe entrar por la izquierda en la siguiente toma.
*   **Consistencia de Utilería:** Si en la Toma A tiene una tablet en la mano izquierda, no puede aparecer en la derecha en la Toma B sin explicación.

---

### 3. Cobertura Básica de Escena (Scene Coverage)

Para que una escena funcione en edición, necesitamos variedad de planos.
1.  **Master Shot (Plano Master):** Plano abierto que cubre toda la acción. Establece la geografía.
2.  **Two-Shot (Plano de Dos):** Encuadre que incluye a dos personajes interactuando.
3.  **Over the Shoulder (OTS):** Plano sobre el hombro de un personaje viendo al otro. Clásico para diálogos.
4.  **Insert (Inserto):** Plano detalle de un objeto importante (e.g., la pantalla de la tablet, una mano temblando).

---

### 4. Anotaciones Técnicas (La "Data" del Storyboard)

Un buen cuadro de storyboard debe indicar:
*   **Flechas de Movimiento:**
    *   Flechas *dentro* del cuadro: Movimiento del personaje.
    *   Flechas *fuera* del cuadro (o 3D): Movimiento de cámara (Pan, Tilt, Dolly).
*   **Descripción de Audio:** ¿Qué se oye mientras vemos esto? (Diálogo, efectos SFX, música). Fundamental para calcular la duración.

---

### 5. El Ritmo Visual

*   Plano abierto = Contexto / Calma / Soledad.
*   Plano cerrado = Emoción / Tensión / Detalle.
*   La alternancia entre ellos crea el ritmo. No abuses de los primeros planos ni de los planos generales.

---

*Para tu sistema:* Es vital que el campo "Visual (Acción)" de tu software no solo diga "Enfermera camina", sino que especifique el **plano** y la **dirección** para guiar al generador de IA correctamente.
