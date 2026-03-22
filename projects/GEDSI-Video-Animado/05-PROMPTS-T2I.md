# Prompts T2I

## Objetivo

Construir una base visual consistente para el proyecto `GEDSI-Video-Animado`, empezando por:

1. biblia visual del estilo,
2. personajes principales y secundarios,
3. escenarios maestros,
4. assets simbólicos,
5. prompts T2I por shot list para generar keyframes consistentes antes de pasar a I2V.

## Dirección visual maestra

### Look and feel

- animación 3D estilizada de alta fidelidad
- inspiración en estudios como Disney o Pixar, pero con tinte documental y antropológico contemporáneo
- expresividad emocional alta, lenguaje visual optimista, cálido y pedagógico
- composición vertical `9:16`
- fondos limpios, legibles y controlados
- respeto cultural en indumentaria, iconografía y diversidad corporal

### Reglas duras de consistencia

- todos los personajes infantiles y adolescentes deben mantener una proporción base homogénea
- no permitir cabezas desproporcionadamente más grandes en unos personajes que en otros
- no permitir cuerpos excesivamente delgados en unos y robustos en otros sin intención narrativa explícita
- mantener la misma lógica de ojos grandes expresivos, nariz pequeña naturalista y manos suaves estilizadas
- el shading de piel debe conservar `subsurface scattering`, suavidad satinada y reflejos controlados
- el cabello debe verse como `high density groom`, con caída natural, sin aspecto plástico
- el vestuario debe mezclar estilización cinematográfica con textura táctil creíble

### Prompt base de estilo

Usar como base transversal en casi todos los prompts:

```text
high fidelity stylized 3D animation, contemporary anthropological documentary tone, premium cinematic character design, subtle Disney Pixar inspired visual language, expressive eyes with realistic reflections, soft satin skin shading, subsurface scattering, high density hair grooming, soft studio lighting, clean rim light separation, tactile fabric detail, respectful cultural representation, vibrant but balanced color palette, vertical composition 9:16, polished animation keyframe, production-ready frame
```

### Negative prompt base

Usar como base transversal para limpieza:

```text
low poly, plastic skin, oversized head mismatch, inconsistent anatomy, thin weak limbs, broken hands, extra fingers, asymmetrical proportions between characters, flat lighting, harsh shadows, washed colors, generic cartoon, cheap children's illustration, text artifacts, watermark, logo, deformed face, duplicate person, blurry eyes, noisy background
```

## Biblia de personajes

### Prompt maestro de consistencia de cast

Usar antes de generar personajes individuales:

```text
create a consistent cast bible for a stylized 3D animated educational film set in Ecuador, all children and teenagers must share the same proportional system, same head-to-body ratio, same eye scale logic, same hand size logic, same shoulder width logic, same stylized anatomy rules, cultural diversity from Andes, Coast and Amazon of Ecuador, documentary warmth, respectful representation, premium cinematic quality, white or neutral gray seamless studio background, front view, three quarter view, side view, expression sheet, full body turnaround, vertical 9:16
```

## Personajes principales

### Ana

**Notas de diseño**

- niña de `10-11` años
- eje cálido
- cabello oscuro semilargo
- expresión curiosa, amable y empática
- vestuario colorido cálido con referencias sutiles a tejido andino contemporáneo

**Prompt**

```text
Ana, Ecuadorian girl age 10 to 11, stylized high fidelity 3D character, same proportional system as full cast, slightly large expressive eyes, soft satin skin, subtle cheek blush, dark medium-length hair with natural groom, warm color outfit inspired by contemporary Andean textiles, respectful geometric accents, curious and empathetic smile, cinematic studio softbox lighting, subtle rim light, white seamless background, full body character sheet, front three-quarter and side pose, premium animation model reference, vertical 9:16
```

### Mateo

**Notas de diseño**

- niño de `10-11` años
- eje azul/verde
- cabello corto oscuro
- expresión segura, cercana y amigable
- vestuario limpio con referencias contemporáneas comunitarias

**Prompt**

```text
Mateo, Ecuadorian boy age 10 to 11, stylized high fidelity 3D character, same proportional system as Ana and full cast, slightly large expressive eyes, soft realistic skin with subsurface scattering, short dark hair with premium grooming, blue and green wardrobe with contemporary community-inspired details, confident and friendly expression, clean studio lighting, rim light separation, neutral seamless background, full body turnaround, front three-quarter and side pose, premium animation model reference, vertical 9:16
```

## Personajes secundarios recurrentes

### Set de secundarios infantiles y adolescentes

**Criterio**

- diversidad visible de sierra, costa y amazonía ecuatoriana
- niñas, niños y adolescentes
- misma familia proporcional
- sin exotización
- sin romper la simetría corporal entre personajes

**Prompt grupal**

```text
diverse Ecuadorian children and teenagers character lineup for a stylized high fidelity 3D animated film, same proportional system across all characters, balanced anatomy, no oversized head mismatch, no extreme body thinness, representation from Andes, Coast and Amazon of Ecuador, indigenous Andean girl, Afro-Ecuadorian coastal teenager, Amazonian boy, mestizo schoolgirl, coastal boy, teenage girl with hearing aid, teen wheelchair user, all with premium tactile wardrobe, respectful cultural identity, front-facing lineup on neutral studio background, cinematic soft lighting, high production character bible sheet, vertical 9:16
```

### Niña indígena andina

```text
indigenous Andean Ecuadorian girl age 10 to 12, stylized high fidelity 3D animation, same cast proportions, warm brown skin, expressive crystal eyes, dark braided hair, contemporary Andean poncho with visible woven wool texture, respectful geometric motifs in carmine red and cobalt blue balanced with earth tones, soft studio lighting, rim light, neutral background, full body character sheet, vertical 9:16
```

### Niño amazónico

```text
Amazonian Ecuadorian boy age 10 to 12, stylized high fidelity 3D animation, same cast proportions, healthy balanced anatomy, deep expressive eyes, dark straight hair, contemporary wardrobe with respectful Amazonian beaded accessories and subtle symbolic patterns, tactile natural fibers, soft cinematic lighting, white seamless background, full body character sheet, vertical 9:16
```

### Adolescente afroecuatoriana de la costa

```text
Afro-Ecuadorian teenage girl from the Coast of Ecuador, stylized high fidelity 3D animation, same proportional logic as the full cast, expressive eyes, natural curly hair with high quality grooming, contemporary casual clothing with subtle coastal color accents, athletic but balanced anatomy, respectful identity, premium studio character sheet, softbox lighting, neutral background, vertical 9:16
```

### Adolescente con discapacidad auditiva

```text
Ecuadorian teenage girl with hearing aid, stylized premium 3D animation character, same proportional system as main cast, expressive eyes, natural posture, contemporary wardrobe, hearing aid visible but integrated naturally, warm empathetic presence, clean studio lighting, high detail fabric shading, neutral seamless background, full body turnaround, vertical 9:16
```

### Niño o adolescente usuario de silla de ruedas

```text
Ecuadorian child or young teenager wheelchair user, stylized high fidelity 3D animation, same cast proportions and anatomy logic, premium wheelchair design integrated naturally, confident friendly expression, contemporary clothing with tactile detail, respectful inclusive representation, cinematic studio soft lighting, white or neutral gray seamless background, full body character sheet, vertical 9:16
```

## Escenarios maestros

### Plaza comunitaria / escuela abierta

```text
inclusive community plaza connected to an open school in Ecuador, stylized high fidelity 3D animated environment, vertical 9:16, central plaza, school and educational workshop on the left, games and families on the right, Andes mountains and Amazonian vegetation blended in the background, ramps, inclusive signage, colorful community mural, warm daylight, soft shadows, optimistic tone, premium environment concept art, production-ready keyframe
```

### Taller comunitario

```text
community workshop in Ecuador for an inclusive animated film, stylized premium 3D environment, tactile wood and painted walls, accessibility details, educational tools, warm daylight, connected to the same plaza universe, anthropological documentary warmth, vertical 9:16, production concept frame
```

### Aula inclusiva

```text
inclusive classroom in Ecuador, stylized high fidelity 3D animated environment, warm interior daylight, clear foreground midground background separation, teacher and student interaction space, visual accessibility, sign language friendly composition, colorful but controlled educational palette, vertical 9:16, premium cinematic keyframe
```

### Reunión comunitaria

```text
inclusive community meeting space in Ecuador, stylized premium 3D environment, warm collaborative mood, people seated in respectful circular or semi-circular composition, tactile furniture, mural and signage details, soft optimistic daylight, vertical 9:16, polished cinematic frame
```

## Assets simbólicos

### GEDSI tipográfico

```text
GEDSI acronym as premium stylized animated educational graphic, bold clean letters, integrated inclusive symbols, vibrant but balanced colors, same palette as the film, clean neutral background, polished 3D infographic look, vertical 9:16
```

### Balanza de equidad

```text
symbolic scale of equity in a premium stylized 3D animated educational film, tactile materials, clean neutral support background, bright and optimistic studio lighting, visually clear asymmetry and later balance, vertical 9:16
```

### Barrera invisible

```text
transparent invisible social barrier visual metaphor in a stylized high fidelity 3D animated world, subtle glass-like distortion, readable but not aggressive, integrated into an inclusive Ecuadorian community environment, vertical 9:16
```

## Protocolo de generación T2I

### Orden recomendado

1. generar biblia de cast
2. aprobar `Ana` y `Mateo`
3. aprobar secundarios recurrentes
4. aprobar escenarios maestros
5. aprobar assets simbólicos
6. generar keyframes por shot list usando referencias ya aprobadas

### Regla de consistencia

Todo prompt por toma debe repetir, cuando aplique:

- `same character design as approved Ana reference`
- `same character design as approved Mateo reference`
- `same environment language as approved community plaza`
- `same proportional system as approved cast bible`

## Prompts T2I por shot list

### Shots 1-4: apertura y presentación

#### Shot 1

```text
inclusive Ecuadorian community plaza, same environment language as approved plaza master, same proportional system as approved cast bible, Ana and Mateo implied within the world, indigenous Andean and Amazonian children visible, wheelchair user participating, adults collaborating, school on the left, community life on the right, Andes mountains and Amazonian vegetation in the background, high angle master shot, bright warm daylight, soft studio-style lighting, subtle rim light, premium stylized 3D animation, documentary warmth, vertical 9:16
```

#### Shot 2

```text
Ana, same character design as approved Ana reference, entering from the left side of frame, medium shot, direct and empathetic greeting to camera, warm wardrobe, soft satin skin, high density hair grooming, community plaza softly blurred behind her, warm daylight, softbox lighting, premium stylized 3D animation, vertical 9:16
```

#### Shot 3

```text
Mateo, same character design as approved Mateo reference, entering from the right side of frame, medium shot, friendly confident response to camera, blue-green wardrobe, same environment language as approved plaza master, warm daylight, soft cinematic lighting, premium stylized 3D animation, vertical 9:16
```

#### Shot 4

```text
Ana on the left and Mateo on the right, same approved character designs, centered two shot with inclusive community in the background, readable depth layers, plaza master environment, warm optimistic daylight, clean rim light separation, premium stylized 3D animated keyframe, vertical 9:16
```

### Shots 5-6: GEDSI gráfico

#### Shot 5

```text
GEDSI acronym emerging as premium educational 3D graphic, same film color palette, clean neutral background derived from the film universe, bright polished lettering, contemporary documentary-friendly design, vertical 9:16
```

#### Shot 6

```text
GEDSI acronym with clear icons for gender equality diversity social inclusion and disability, polished stylized 3D infographic, same palette and design family as shot 5, vertical educational composition, vertical 9:16
```

### Shots 7-10: barreras y resolución

#### Shot 7

```text
secondary Ecuadorian girl from the Coast, same cast proportional system, trying to play in the right side games area, transparent invisible barrier stopping her, warm world with slightly reduced contrast, inclusive community background, premium stylized 3D animation, vertical 9:16
```

#### Shot 8

```text
Amazonian Ecuadorian boy, same approved cast proportional system, trying to study near the left educational zone, transparent invisible barrier between him and the book, same visual language as shot 7, warm but slightly muted lighting, premium stylized 3D animation, vertical 9:16
```

#### Shot 9

```text
Ecuadorian wheelchair user in front of a community workshop, same approved cast proportional system, transparent invisible barrier blocking participation, same barrier design as shots 7 and 8, respectful dignified framing, vertical 9:16
```

#### Shot 10

```text
Ana on the left and Mateo on the right, same approved character designs, heroic low angle two shot, lifting transparent barriers together in the center of the plaza, bright light returning, premium stylized 3D animation, inclusive hopeful mood, vertical 9:16
```

### Shots 11-12: equidad

#### Shot 11

```text
symbolic scale of equity slightly unbalanced, clean support background, premium 3D educational metaphor, same film palette, crisp readable composition, vertical 9:16
```

#### Shot 12

```text
symbolic scale of equity receiving different supports until balanced, same object design as shot 11, positive transition, polished educational animation keyframe, vertical 9:16
```

### Shots 13-15: diversidad e inclusión

#### Shot 13

```text
diverse Ecuadorian group lineup, same approved cast proportional system, Andes Coast and Amazon visible in the character mix, wheelchair user, hearing aid, adult elder, children and teenagers, clean readable vertical composition, celebratory warm lighting, premium stylized 3D animation, vertical 9:16
```

#### Shot 14

```text
diverse inclusive Ecuadorian group in a participation circle, top shot, same approved character designs and proportional system, circle in central plaza, bright warm light, open composition, premium stylized 3D animation, vertical 9:16
```

#### Shot 15

```text
sequence-ready close-up portraits of diverse Ecuadorian faces, same approved cast bible, Andes Coast and Amazon representation, warm emotional lighting, shallow depth of field, premium stylized 3D animation, vertical 9:16
```

### Shots 16-18: género y colaboración

#### Shot 16

```text
men and women collaboratively painting a community mural in Ecuador, same visual universe as approved plaza master, respectful gender balance, tactile paint and wall textures, side angle, warm active daylight, premium stylized 3D animation, vertical 9:16
```

#### Shot 17

```text
Ecuadorian schoolgirl and schoolboy building a school project together, same cast proportional system, frontal two shot, inclusive school setting, warm clean classroom lighting, premium stylized 3D animation, vertical 9:16
```

#### Shot 18

```text
diverse Ecuadorian adults collaborating at a community table, same universe and palette as previous shots, warm collaborative atmosphere, readable midground composition, premium stylized 3D animation, vertical 9:16
```

### Shots 19-22: discapacidad y apoyos

#### Shot 19

```text
Ecuadorian child guiding a visually impaired person through an inclusive community path, respectful dignified tone, lateral composition, warm soft daylight, same visual universe as approved plaza, premium stylized 3D animation, vertical 9:16
```

#### Shot 20

```text
architectural accessibility transformation, close-up of stairs becoming a ramp, same material language as plaza and school, symbolic but grounded, warm optimistic light, premium stylized 3D animation, vertical 9:16
```

#### Shot 21

```text
inclusive classroom in Ecuador with sign language interaction, same approved classroom environment, teacher and student readable in layered composition, warm interior light, respectful communication accessibility, premium stylized 3D animation, vertical 9:16
```

#### Shot 22

```text
close-up of a supportive hand offering an adaptive tool, tactile detail, soft warm lighting, same inclusive visual world, educational symbolic insert, premium stylized 3D animation, vertical 9:16
```

### Shots 23-27: transformación y cierre

#### Shot 23

```text
same community architecture as approved opening plaza, buildings transforming from muted gray into vibrant inclusive color, readable before-and-after feeling within one frame, symbolic social transformation, premium stylized 3D animation, vertical 9:16
```

#### Shot 24

```text
entire Ecuadorian community working together in the recovered plaza, same approved cast system, same plaza master, warm vibrant daylight, visible collective action, premium stylized 3D animation, vertical 9:16
```

#### Shot 25

```text
close-up of a raised hand taking the floor in a community meeting, warm focused light on the gesture, softly blurred people in the background, same visual world, premium stylized 3D animation, vertical 9:16
```

#### Shot 26

```text
inclusive community celebration in the central plaza, all recurring characters visible again, festive but elegant color, strong emotional closure, warm daylight with celebratory energy, premium stylized 3D animation, vertical 9:16
```

#### Shot 27

```text
Ana on the left and Mateo on the right, same approved character designs, centered emotional closing two shot, soft community background, direct eye contact to camera, bright clean optimistic lighting, premium stylized 3D animation, vertical 9:16
```

## Recomendación operativa

- generar primero versiones `studio character sheet`
- luego pasar a `environment master frames`
- después generar `hero keyframes` por shot
- congelar seeds o referencias aprobadas por personaje y entorno
- no avanzar a `I2V` hasta aprobar:
  - consistencia proporcional del cast
  - continuidad de vestuario
  - continuidad de color y luz
  - continuidad de fondo maestro
