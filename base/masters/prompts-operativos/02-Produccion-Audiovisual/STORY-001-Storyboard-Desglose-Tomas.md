---
id: STORY-001
name: Storyboard y Desglose de Tomas para Producción IA
version: 1.0.0
category: Producción Audiovisual
discipline: Producción Audiovisual
agent_core: ArtistaStoryboard
source_of_truth:
  - manuales-produccion/fundamentos_storyboard.md
  - manuales-produccion/guia_maestra_storyboard.md
  - manuales-produccion/guia_maestra_guion.md
  - manuales-produccion/guia_maestra_i2v.md
related_services:
  - AV-006
  - AV-005
  - AV-007
stage: storyboarding
input_type: guion, duración, formato, personajes, geografía y estilo visual
deliverable_type: storyboard, shot list y base para prompts T2I/I2V
tags:
  - storyboard
  - shot-list
  - blocking
  - continuidad
  - raccord
  - t2i
  - i2v
---

# Prompt: Storyboard y Desglose de Tomas para Producción IA

**Objetivo:** Transformar un guion o narración audiovisual en una secuencia técnica clara de tomas, con geografía de escena, continuidad visual y base lista para generación T2I/I2V.

## Contexto para el Usuario

Usa este prompt cuando ya existe un guion o una narrativa audiovisual y se necesita bajar el proyecto a una estructura de storyboard utilizable por dirección, imagen generativa y video IA.

---

## Prompt Operativo

"Actúa como el **ArtistaStoryboard ('Vision')** y convierte el siguiente guion o narrativa en un storyboard técnico listo para producción con IA.

Necesito que estructures la salida en este orden:

1. **Geografía de la escena**
   - espacio base
   - ejes de acción
   - posiciones relativas de personajes
   - elementos recurrentes

2. **Assets de personaje y continuidad**
   - rasgos visuales obligatorios
   - vestuario o códigos de color
   - reglas de consistencia entre tomas

3. **Shot list**
   - número de toma
   - duración estimada
   - acción visual
   - encuadre / ángulo
   - audio o línea asociada
   - prompt base T2I en inglés
   - sugerencia de movimiento I2V si aplica

4. **Directrices de continuidad y raccord**
   - dirección de miradas
   - vectores de movimiento
   - iluminación
   - fondo y elementos persistentes
   - transiciones críticas a cuidar

Si detectas ambigüedad en el guion, debes resolverla proponiendo la versión más clara y coherente para producción visual. No escribas prosa literaria. Produce una salida técnica, ordenada y ejecutable."

---

## Guía de Uso

- **Input necesario:** guion o narración, duración, formato, personajes, estilo visual y restricciones de continuidad.
- **Output esperado:** storyboard técnico con shot list, blocking y base de prompts T2I/I2V.

## Ejemplo de Uso

**Input ejemplo:** "Convierte este guion educativo de 3 minutos para un video animado vertical sobre inclusión social en un storyboard con 20 a 30 tomas, manteniendo dos personajes principales y una comunidad recurrente."

**Resultado esperado:**

- geografía de escena,
- assets de personaje,
- shot list secuencial,
- prompts base en inglés para cada toma,
- notas de continuidad y raccord.

