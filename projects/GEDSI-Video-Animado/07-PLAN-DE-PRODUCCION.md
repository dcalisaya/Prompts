# Plan de Producción

## Objetivo

Ordenar la producción visual del proyecto `GEDSI-Video-Animado` para:

- reducir drift entre shots,
- congelar referencias críticas antes de animar,
- optimizar reutilización de personajes y escenarios,
- y asegurar consistencia estética entre T2I e I2V.

## Alcance

Este plan cubre:

1. orden de generación de assets,
2. priorización de shots,
3. paquetes de producción,
4. criterios de aprobación,
5. puntos de congelamiento,
6. y control de continuidad entre bloques.

## Principio operativo

No producir el video shot por shot desde cero.  
La lógica correcta es:

1. aprobar biblioteca visual,
2. congelar referencias,
3. producir keyframes por familias de shot,
4. validar continuidad,
5. recién después pasar a I2V.

## Paquetes de producción

### Paquete 1. Biblia visual y consistencia del cast

**Objetivo**

Definir la gramática visual base del proyecto.

**Assets**

- biblia de estilo general
- cast bible con proporción unificada
- turnaround de `Ana`
- turnaround de `Mateo`
- lineup de secundarios

**Archivos base**

- [01-BRIEF.md](/Users/dcalisaya/Developer/Prompts/projects/GEDSI-Video-Animado/01-BRIEF.md)
- [05-PROMPTS-T2I.md](/Users/dcalisaya/Developer/Prompts/projects/GEDSI-Video-Animado/05-PROMPTS-T2I.md)

**Criterios de aprobación**

- misma relación cabeza/cuerpo entre todos los niños y adolescentes
- misma lógica de ojos, manos, hombros y silueta
- materiales de piel, pelo y ropa consistentes
- diversidad visible de sierra, costa y amazonía sin caricaturización

**No avanzar si**

- algún personaje se ve en otra “familia de diseño”
- hay drift evidente de anatomía
- Ana y Mateo no se sienten parte del mismo universo visual

### Paquete 2. Escenarios maestros

**Objetivo**

Congelar el universo espacial del proyecto.

**Assets**

- plaza comunitaria / escuela abierta
- taller comunitario
- aula inclusiva
- reunión comunitaria
- assets simbólicos: GEDSI, balanza, barrera, rampa

**Archivos base**

- [03-STORYBOARD-DESGLOSE-TOMAS.md](/Users/dcalisaya/Developer/Prompts/projects/GEDSI-Video-Animado/03-STORYBOARD-DESGLOSE-TOMAS.md)
- [05-PROMPTS-T2I.md](/Users/dcalisaya/Developer/Prompts/projects/GEDSI-Video-Animado/05-PROMPTS-T2I.md)

**Criterios de aprobación**

- geografía estable: escuela izquierda, comunidad/juegos derecha, plaza central
- fondo andino-amazónico legible pero no invasivo
- accesibilidad visible: rampas, señalética, espacios inclusivos
- luz cálida, limpia, optimista

**No avanzar si**

- el espacio cambia radicalmente entre planos
- la plaza no puede reconocerse en shots recurrentes
- la iluminación base no está consistente

### Paquete 3. Shots hero y anchors visuales

**Objetivo**

Aprobar los planos que fijan el tono del proyecto y arrastran continuidad al resto.

**Shots prioritarios**

- `1` plaza maestra
- `2` Ana
- `3` Mateo
- `4` two-shot principal
- `10` resolución hero
- `13` lineup de diversidad
- `21` aula inclusiva
- `26` celebración colectiva
- `27` cierre con protagonistas

**Razón**

Estos shots fijan:

- diseño final de personajes,
- layout del mundo,
- temperatura visual,
- escala emocional,
- y cierre narrativo.

**Criterios de aprobación**

- continuidad de vestuario y peinado
- eje Ana izquierda / Mateo derecha
- calidad facial alta
- fondos estables
- comunidad coherente con el brief

### Paquete 4. Bloques narrativos intermedios

**Objetivo**

Expandir el universo aprobado hacia los shots de explicación.

**Bloques**

- `5-6`: GEDSI gráfico
- `7-10`: barreras y resolución
- `11-12`: equidad
- `13-15`: diversidad e inclusión
- `16-18`: género y colaboración
- `19-22`: discapacidad y apoyos
- `23-27`: transformación y cierre

**Criterio**

Cada bloque debe producirse usando los anchors ya aprobados.

## Orden recomendado de producción

### Etapa 1. Diseño base

1. cast bible
2. Ana
3. Mateo
4. secundarios recurrentes

### Etapa 2. Mundo y assets

1. plaza maestra
2. taller comunitario
3. aula inclusiva
4. reunión comunitaria
5. GEDSI gráfico
6. balanza
7. barrera
8. rampa

### Etapa 3. Keyframes hero

1. shot `1`
2. shot `2`
3. shot `3`
4. shot `4`
5. shot `10`
6. shot `13`
7. shot `21`
8. shot `26`
9. shot `27`

### Etapa 4. Keyframes de soporte

Producir el resto por familias de bloque, no por orden aislado.

### Etapa 5. I2V

Empezar por:

1. shots `2`, `3`, `4`
2. shots `7`, `8`, `9`, `10`
3. shots `23`, `24`, `26`, `27`

Porque son los grupos donde más rápido se detecta drift de continuidad.

## Congelamiento de referencias

### Freeze obligatorio 1

Después del cast bible y personajes principales:

- Ana reference final
- Mateo reference final
- lineup de secundarios final

### Freeze obligatorio 2

Después de escenarios maestros:

- plaza maestra final
- aula final
- taller final
- meeting space final

### Freeze obligatorio 3

Después de shots hero:

- shot `1`
- shot `4`
- shot `10`
- shot `26`
- shot `27`

Estos deben actuar como referencia maestra para color, luz y escala emocional.

## Reutilización inteligente de assets

### Personajes

Reutilizar directamente:

- Ana: `2`, `4`, `10`, `27`
- Mateo: `3`, `4`, `10`, `27`
- comunidad recurrente: `1`, `4`, `13`, `14`, `24`, `26`

### Entornos

Reutilizar:

- plaza maestra: `1`, `4`, `10`, `23`, `24`, `26`, `27`
- zona educativa / escuela: `8`, `17`, `21`
- taller / participación comunitaria: `9`, `16`, `18`

### Assets simbólicos

Reutilizar familia gráfica:

- GEDSI: `5`, `6`
- barrera: `7`, `8`, `9`, `10`
- equidad / balanza: `11`, `12`
- accesibilidad física: `20`

## Riesgos críticos

### Riesgo 1. Drift proporcional del cast

**Dónde aparece**

- close-ups
- planos con secundarios nuevos
- shots generados con diferentes seeds o modelos

**Mitigación**

- usar siempre el cast bible aprobado
- comparar cada nuevo personaje contra lineup maestro

### Riesgo 2. Drift del entorno

**Dónde aparece**

- plaza y escuela
- transformación de color en shots `23` y `24`

**Mitigación**

- congelar layout maestro
- no regenerar entorno desde cero si ya existe uno aprobado

### Riesgo 3. Drift de barreras y metáforas

**Dónde aparece**

- shots `7`, `8`, `9`, `10`
- shots `11`, `12`

**Mitigación**

- usar una sola familia visual por símbolo
- no reinterpretar barrera o balanza en cada shot

### Riesgo 4. Drift de manos y señas

**Dónde aparece**

- shot `21`
- shot `22`
- close-ups y gestos de `2`, `3`, `25`

**Mitigación**

- hacer pruebas cortas
- revisar hands/fingers antes de validar

## Criterios de aprobación por shot

Antes de aprobar cualquier shot:

1. ¿El personaje mantiene la misma anatomía del cast bible?
2. ¿El vestuario coincide con la referencia congelada?
3. ¿El fondo pertenece al mismo universo ya aprobado?
4. ¿La luz coincide con el bloque narrativo?
5. ¿El eje Ana izquierda / Mateo derecha se respeta cuando aplica?
6. ¿La toma sirve realmente a la función del storyboard?
7. ¿El shot puede empalmar visualmente con el anterior y el siguiente?

## Secuencia sugerida de entregables

### Entregable 1

- cast bible
- personajes principales
- secundarios recurrentes

### Entregable 2

- escenarios maestros
- assets simbólicos

### Entregable 3

- keyframes hero

### Entregable 4

- keyframes restantes por bloque

### Entregable 5

- pruebas I2V de shots críticos

### Entregable 6

- animación final por shot

## Recomendación final

Este proyecto no debe tratarse como una secuencia de prompts aislados.  
Debe tratarse como una producción con biblioteca visual congelada.

La regla práctica es:

- primero consistencia,
- después cobertura,
- después movimiento,
- y recién al final refinamiento.
