# Prompts I2V

## Objetivo

Traducir los keyframes aprobados de `05-PROMPTS-T2I.md` en prompts I2V utilizables para animación por shot, manteniendo:

- continuidad visual,
- proporción consistente del cast,
- estabilidad de entorno,
- intención narrativa del storyboard,
- y una gramática de cámara controlada.

## Principio de uso

Cada prompt I2V debe partir de un keyframe ya aprobado.

No usar I2V para “inventar” diseño de personaje o escenario.  
El I2V debe:

- animar lo ya aprobado,
- reforzar continuidad,
- y añadir movimiento de cámara, gesto, ritmo y microacción.

## Reglas duras de producción I2V

- mantener exactamente el mismo diseño de personaje aprobado en T2I
- no cambiar proporciones entre frames
- no modificar tamaño relativo de cabeza, manos, torso o piernas
- no introducir nuevos elementos culturales no aprobados
- no alterar vestuario, peinado, color de ojos o silueta
- no permitir drift de fondo entre inicio y fin del shot
- evitar jitter, morphing facial, manos extra, deformación de brazos y clipping de props
- priorizar movimientos de cámara lentos, limpios y cinematográficos
- mantener frame vertical `9:16`

## Fórmula recomendada

Usar esta lógica en cada prompt:

1. referencia al keyframe aprobado,
2. sujetos que deben permanecer idénticos,
3. acción principal,
4. movimiento de cámara,
5. restricción de continuidad,
6. calidad visual,
7. restricciones negativas.

## Prompt base I2V

```text
animate from approved keyframe, preserve exact character design, preserve exact wardrobe, preserve exact environment layout, preserve proportional consistency across all characters, smooth cinematic motion, subtle facial animation, stable background, premium high fidelity stylized 3D animation, soft studio-inspired lighting, clean rim light, no anatomy drift, no face warping, no extra fingers, no costume changes, no camera shake, vertical 9:16
```

## Negative prompt base I2V

```text
character drift, face morphing, body distortion, oversized head, thin limbs, unstable hands, extra fingers, flickering background, lighting inconsistency, wardrobe change, hair shape change, prop duplication, camera shake, fast chaotic motion, plastic skin, low detail, noisy frame, broken eyes, lip sync glitch, unnatural movement
```

## Parámetros de movimiento recomendados

- `Static Tripod`: casi sin desplazamiento, solo respiración visual y microacciones
- `Slow Push-in`: avance lento de cámara para reforzar atención emocional
- `Slow Pull-back`: retroceso suave para abrir lectura simbólica
- `Lateral Slide`: desplazamiento lateral controlado manteniendo profundidad
- `Slow Orbit`: órbita mínima y elegante, solo cuando el blocking lo tolere

## Protocolo de producción

1. aprobar keyframe T2I
2. fijar shot length según storyboard
3. elegir solo un movimiento principal de cámara por shot
4. limitar a 1-2 acciones dominantes por plano
5. validar continuidad con plano anterior y siguiente
6. exportar versiones cortas antes de render final

## Shot-by-shot I2V

### Shot 1

**Duración**: `3s`  
**Movimiento**: `Slow Push-in`

```text
animate from approved shot 1 community plaza keyframe, preserve exact plaza layout, preserve exact Andes mountains and Amazonian vegetation background, children playing softly, adults collaborating with subtle gestures, wheelchair user naturally participating, warm optimistic daylight, slow push-in camera, gentle ambient motion only, keep all character proportions stable, keep accessibility elements readable, premium stylized 3D animation, no background drift, no anatomy distortion, vertical 9:16
```

### Shot 2

**Duración**: `3s`  
**Movimiento**: `Lateral Slide`

```text
animate from approved Ana keyframe, preserve exact Ana character design, Ana enters softly from the left and greets camera with a small hand gesture and natural blink, light hair movement only, subtle lateral slide camera, warm plaza background softly stable, preserve facial proportions and wardrobe details, premium high fidelity stylized 3D animation, no face morphing, no hand distortion, vertical 9:16
```

### Shot 3

**Duración**: `3s`  
**Movimiento**: `Lateral Slide`

```text
animate from approved Mateo keyframe, preserve exact Mateo design, Mateo enters from the right with a friendly nod and subtle smile, minimal body motion, controlled lateral slide camera, same environment continuity as shot 2, preserve blue-green wardrobe and hairstyle exactly, premium stylized 3D animation, stable background, no anatomy drift, vertical 9:16
```

### Shot 4

**Duración**: `4s`  
**Movimiento**: `Static Tripod`

```text
animate from approved two-shot of Ana and Mateo, preserve Ana on the left and Mateo on the right, subtle speaking gestures and natural blinking, background community moves softly without stealing focus, static tripod camera, stable warm daylight, preserve exact spatial depth and cast proportions, premium stylized 3D animation, no crossing of action axis, vertical 9:16
```

### Shot 5

**Duración**: `3s`  
**Movimiento**: `Slow Push-in`

```text
animate from approved GEDSI graphic keyframe, letters emerge smoothly with elegant float and subtle glow, maintain exact palette and typography style, slow push-in, clean neutral support background, no jitter, no text warping, premium polished 3D educational graphic, vertical 9:16
```

### Shot 6

**Duración**: `4s`  
**Movimiento**: `Static Tripod`

```text
animate from approved GEDSI acronym infographic keyframe, icons appear or pulse gently around the acronym, preserve exact graphic system from shot 5, static tripod framing, clean readable motion, no graphic clutter, no palette drift, premium stylized 3D infographic, vertical 9:16
```

### Shot 7

**Duración**: `4s`  
**Movimiento**: `Slow Push-in`

```text
animate from approved barrier shot with coastal girl, preserve exact secondary girl design and game area layout, she moves toward the play area and softly meets the transparent barrier, slight pause and emotional reaction, slow push-in camera, slightly reduced contrast but same world continuity, keep barrier effect subtle and readable, premium stylized 3D animation, no melodrama, vertical 9:16
```

### Shot 8

**Duración**: `4s`  
**Movimiento**: `Static Tripod`

```text
animate from approved Amazonian boy study barrier keyframe, preserve exact child design and school zone, he leans toward the book and gently stops at the transparent barrier, minimal movement, static tripod camera, same barrier language as shot 7, preserve warm muted light continuity, premium stylized 3D animation, vertical 9:16
```

### Shot 9

**Duración**: `4s`  
**Movimiento**: `Static Tripod`

```text
animate from approved wheelchair user barrier keyframe, preserve exact workshop environment and wheelchair design, the subject approaches the workshop and is softly stopped by the same transparent barrier system, dignified restrained motion, static camera, maintain emotional continuity with shots 7 and 8, premium stylized 3D animation, no pity framing, vertical 9:16
```

### Shot 10

**Duración**: `4s`  
**Movimiento**: `Slow Pull-back`

```text
animate from approved heroic two-shot of Ana and Mateo, preserve Ana left and Mateo right, both raise or dissolve the transparent barriers together, light opens gradually, slow pull-back camera to reveal restored space, premium stylized 3D animation, preserve exact proportions and wardrobe, no barrier redesign, vertical 9:16
```

### Shot 11

**Duración**: `3s`  
**Movimiento**: `Static Tripod`

```text
animate from approved unbalanced equity scale keyframe, preserve exact object design, minimal symbolic sway of the scale, static camera, crisp readable composition, premium educational 3D metaphor, no object morphing, vertical 9:16
```

### Shot 12

**Duración**: `4s`  
**Movimiento**: `Slow Push-in`

```text
animate from approved balancing scale keyframe, supports appear one by one until the scale stabilizes, same object orientation and palette as shot 11, slow push-in camera, clean symbolic motion, premium stylized 3D educational animation, vertical 9:16
```

### Shot 13

**Duración**: `4s`  
**Movimiento**: `Static Tripod`

```text
animate from approved diverse lineup keyframe, preserve exact cast lineup and proportional consistency, subtle breathing, eye movement and slight posture variation only, static tripod camera, maintain clean readable vertical composition, celebratory warm light, premium stylized 3D animation, vertical 9:16
```

### Shot 14

**Duración**: `4s`  
**Movimiento**: `Slow Orbit`

```text
animate from approved top shot participation circle keyframe, preserve exact circle composition and approved character designs, gentle collective movement and hand gestures, very subtle slow orbit or drift around the circle, stable warm daylight, premium stylized 3D animation, no circle distortion, vertical 9:16
```

### Shot 15

**Duración**: `3s`  
**Movimiento**: `Static Tripod`

```text
animate from approved close-up portrait keyframes, preserve exact facial design for each subject, subtle blink and micro-smile only, no camera shake, warm emotional light, shallow depth of field preserved, premium stylized 3D portrait animation, vertical 9:16
```

### Shot 16

**Duración**: `4s`  
**Movimiento**: `Lateral Slide`

```text
animate from approved mural collaboration keyframe, preserve exact mural zone and all character designs, collaborative painting gestures with balanced gender participation, controlled lateral slide camera, tactile paint motion, warm active daylight, premium stylized 3D animation, no role stereotyping in movement, vertical 9:16
```

### Shot 17

**Duración**: `4s`  
**Movimiento**: `Static Tripod`

```text
animate from approved school project two-shot keyframe, preserve exact child designs and table setup, the two children work together with small coordinated hand movements, static tripod camera, warm classroom light, premium stylized 3D animation, preserve cooperation rhythm and no axis crossing, vertical 9:16
```

### Shot 18

**Duración**: `4s`  
**Movimiento**: `Slow Push-in`

```text
animate from approved adult collaboration keyframe, preserve exact community table and participants, subtle collaborative gestures and attentive listening, slow push-in camera, warm communal atmosphere, premium stylized 3D animation, stable proportions and background, vertical 9:16
```

### Shot 19

**Duración**: `4s`  
**Movimiento**: `Lateral Slide`

```text
animate from approved guidance support keyframe, preserve exact child and visually impaired person design, gentle walking support along the path, respectful calm pacing, controlled lateral slide camera, warm soft light, premium stylized 3D animation, no exaggerated dependency gestures, vertical 9:16
```

### Shot 20

**Duración**: `4s`  
**Movimiento**: `Slow Push-in`

```text
animate from approved stairs-to-ramp transformation keyframe, preserve same architectural materials and angle, smooth transformation from barrier to accessibility, slow push-in camera, readable symbolic transition, premium stylized 3D animation, no environment redesign, vertical 9:16
```

### Shot 21

**Duración**: `4s`  
**Movimiento**: `Static Tripod`

```text
animate from approved inclusive classroom keyframe, preserve exact teacher student composition and sign language readability, subtle hand signing motion and attentive reactions, static camera, warm interior light, premium stylized 3D animation, preserve hand clarity and avoid finger artifacts, vertical 9:16
```

### Shot 22

**Duración**: `4s`  
**Movimiento**: `Static Tripod`

```text
animate from approved adaptive tool insert keyframe, preserve exact hand design and tool, gentle offering motion only, shallow focus stable, soft warm light, premium stylized 3D animation, no hand distortion, vertical 9:16
```

### Shot 23

**Duración**: `4s`  
**Movimiento**: `Slow Pull-back`

```text
animate from approved transformation environment keyframe, preserve exact community architecture from shot 1, buildings and public space shift from muted gray to vibrant inclusive color, slow pull-back camera, symbolic but grounded transformation, premium stylized 3D animation, no layout drift, vertical 9:16
```

### Shot 24

**Duración**: `4s`  
**Movimiento**: `Slow Push-in`

```text
animate from approved united community keyframe, preserve exact recovered plaza world and recurring cast, visible cooperative microactions throughout the scene, slow push-in camera, full warm daylight and collective energy, premium stylized 3D animation, stable background and proportions, vertical 9:16
```

### Shot 25

**Duración**: `4s`  
**Movimiento**: `Static Tripod`

```text
animate from approved raised hand meeting insert keyframe, preserve exact gesture framing and community meeting background, the hand rises with intention and slight natural movement, static camera, warm focused light, premium stylized 3D animation, no background flicker, vertical 9:16
```

### Shot 26

**Duración**: `4s`  
**Movimiento**: `Slow Orbit`

```text
animate from approved celebration keyframe, preserve exact plaza and recurring character cast, joyful but controlled community celebration, small gestures and collective movement, slow elegant orbit camera, bright festive energy, premium stylized 3D animation, no chaotic crowd drift, vertical 9:16
```

### Shot 27

**Duración**: `3s`  
**Movimiento**: `Slow Push-in`

```text
animate from approved final two-shot of Ana and Mateo, preserve Ana left and Mateo right, gentle direct look to camera, soft smile and minimal closing gesture, slow push-in camera, warm emotional light, stable community background, premium stylized 3D animation, no face drift, vertical 9:16
```

## Recomendación de pipeline

- generar primero pruebas I2V de `2-3` segundos por shot
- validar drift facial y de manos antes de escalar duración
- asegurar continuidad entre pares críticos:
  - `1-4`
  - `7-10`
  - `11-12`
  - `13-15`
  - `23-27`
- si un shot deriva demasiado, volver al keyframe T2I y no intentar corregir todo en I2V

## Check final antes de render

- proporciones del cast intactas
- vestuario intacto
- fondo maestro intacto
- luz coherente con el bloque
- eje Ana izquierda / Mateo derecha respetado
- barreras visuales consistentes
- manos y ojos sin artefactos
- movimiento de cámara limpio y lento
