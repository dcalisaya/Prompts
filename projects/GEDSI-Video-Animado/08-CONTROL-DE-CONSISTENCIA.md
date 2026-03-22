# Control de Consistencia

## Objetivo

Usar este documento como checklist operativo para revisar, aprobar o rechazar:

- personajes,
- escenarios,
- keyframes T2I,
- clips I2V,
- y bloques completos de producción.

La idea es detectar drift antes de que se propague al siguiente lote.

## Regla general

No aprobar una imagen o clip porque “se ve bonito”.  
Aprobar solo si:

1. pertenece al mismo universo visual,
2. respeta la biblia del cast,
3. respeta la geografía del storyboard,
4. y puede convivir sin fricción con los shots anteriores y siguientes.

## Fuentes de control

Revisar siempre contra:

- [01-BRIEF.md](/Users/dcalisaya/Developer/Prompts/projects/GEDSI-Video-Animado/01-BRIEF.md)
- [03-STORYBOARD-DESGLOSE-TOMAS.md](/Users/dcalisaya/Developer/Prompts/projects/GEDSI-Video-Animado/03-STORYBOARD-DESGLOSE-TOMAS.md)
- [05-PROMPTS-T2I.md](/Users/dcalisaya/Developer/Prompts/projects/GEDSI-Video-Animado/05-PROMPTS-T2I.md)
- [06-PROMPTS-I2V.md](/Users/dcalisaya/Developer/Prompts/projects/GEDSI-Video-Animado/06-PROMPTS-I2V.md)
- [07-PLAN-DE-PRODUCCION.md](/Users/dcalisaya/Developer/Prompts/projects/GEDSI-Video-Animado/07-PLAN-DE-PRODUCCION.md)

## Semáforo de decisión

- `Aprobado`: puede pasar al siguiente bloque
- `Aprobado con observaciones`: usable, pero requiere nota de ajuste menor
- `Rehacer`: no debe entrar al lote maestro

## Checklist maestro del cast

### Proporción

- misma relación cabeza/cuerpo entre Ana, Mateo y secundarios
- misma lógica de ojos, manos y hombros
- sin cuerpos excesivamente delgados o desbalanceados
- sin edades visuales incoherentes entre personajes del mismo rango

### Rostro

- ojos grandes expresivos pero consistentes
- nariz, boca y mentón dentro de la misma familia de diseño
- sin drift de rasgos entre vista frontal, tres cuartos y perfil
- sin asimetrías accidentales entre imágenes del mismo personaje

### Piel y shading

- piel satinada, viva, no plástica
- `subsurface scattering` perceptible pero controlado
- tono de piel estable entre shots
- sin cambios bruscos por iluminación mal interpretada

### Cabello

- grooming consistente
- silueta del peinado estable
- brillo natural, no plástico
- sin mechones aleatorios o masa capilar distinta entre shots

### Vestuario

- misma paleta aprobada por personaje
- textura táctil visible y coherente
- patrones culturales respetuosos y no exagerados
- sin cambios accidentales de prenda, color o accesorios

## Checklist de diversidad y representación

- representación visible de sierra, costa y amazonía ecuatoriana
- diversidad infantil, adolescente y comunitaria legible
- inclusión de discapacidad representada con dignidad
- sin exotización ni caricaturización cultural
- sin tratar la diversidad como “decorado”; debe sentirse integrada al mundo

## Checklist de escenarios

### Geografía

- plaza central reconocible
- escuela y zona educativa a la izquierda
- comunidad, juegos y familias a la derecha
- fondo con montañas andinas y vegetación amazónica integradas

### Continuidad espacial

- el mismo entorno debe parecer el mismo entre shots relacionados
- las rampas, señalética y mural deben mantenerse si ya fueron aprobados
- foreground, midground y background deben ser legibles
- no debe aparecer arquitectura nueva que contradiga el layout maestro

### Luz

- luz cálida, suave, limpia y optimista
- rim light consistente
- sombras suaves tipo estudio
- baja de contraste solo en escenas de obstáculo

## Checklist de keyframes T2I

### Antes de aprobar un keyframe

- ¿corresponde exactamente a la función del shot?
- ¿mantiene el eje y blocking definidos?
- ¿usa el personaje correcto con diseño correcto?
- ¿usa el entorno correcto?
- ¿la luz coincide con el bloque narrativo?
- ¿el frame ya parece parte del mismo corto y no de otra pieza?

### Errores de rechazo inmediato

- cabeza visiblemente más grande o más pequeña que en el cast bible
- manos deformes
- ojos rotos o mirada desviada sin intención
- fondo incoherente con el universo maestro
- vestuario alterado
- barrera, GEDSI o balanza rediseñados sin autorización

## Checklist de clips I2V

### Movimiento

- movimiento de cámara limpio y lento
- sin jitter
- sin cámara nerviosa
- sin zoom agresivo innecesario

### Integridad del personaje

- cara estable del primer al último frame
- ojos y boca sin morphing extraño
- manos y dedos legibles
- peinado estable
- vestuario sin cambio de forma o color

### Integridad del entorno

- fondo estable
- arquitectura sin respiración artificial
- props sin duplicación o desaparición errática
- profundidad consistente

### Integridad narrativa

- la microacción corresponde al storyboard
- no aparecen acciones extra que contradigan el mensaje
- la emoción del plano se mantiene controlada
- el shot empalma con el anterior y el siguiente

## Checklist por bloques críticos

### Bloque 1: `1-4`

- Ana entra por izquierda
- Mateo entra por derecha
- two-shot respeta el eje
- la plaza queda establecida como mundo maestro

### Bloque 2: `7-10`

- la barrera invisible se ve igual en `7`, `8` y `9`
- el tono baja levemente pero sigue dentro del mismo universo
- en `10` la resolución visual se siente como consecuencia real de los shots anteriores

### Bloque 3: `11-12`

- la balanza mantiene mismo diseño en ambos shots
- el cambio a equilibrio es claro y legible

### Bloque 4: `13-15`

- diversidad visible y ordenada
- mismos criterios de proporción en todos los rostros
- close-ups no rompen la familia visual

### Bloque 5: `16-22`

- colaboración y accesibilidad se ven naturales
- el aula inclusiva y el taller siguen sintiéndose parte del mismo mundo
- manos y señas se revisan con especial atención

### Bloque 6: `23-27`

- la transformación del entorno reutiliza el layout maestro
- la celebración final recupera personajes ya vistos
- cierre con Ana izquierda y Mateo derecha

## Plantilla de revisión por lote

Usar esta plantilla cada vez que generes un lote:

```text
Lote:
Tipo: personajes / entorno / keyframes / I2V
Shots relacionados:
Referencia maestra usada:

Resultado:
- Aprobado / Aprobado con observaciones / Rehacer

Hallazgos:
- 
- 
- 

Ajustes requeridos:
- 
- 
- 

Decisión:
- pasa a siguiente bloque / repetir generación / volver a referencia maestra
```

## Matriz rápida de decisión

### Aprobar

- mismo personaje
- mismo mundo
- misma luz
- misma narrativa
- sin artefactos visibles

### Aprobar con observaciones

- hay microdrift corregible
- hay detalles menores de fondo
- hay una expresión que puede mejorar, pero no rompe continuidad

### Rehacer

- drift anatómico
- drift cultural o de vestuario
- fondo incompatible
- acción incorrecta
- artefactos graves en manos, ojos o cara

## Recomendación final

La consistencia debe revisarse por lotes, no solo por imagen suelta.

La regla práctica es:

- comparar siempre con referencia aprobada,
- rechazar rápido el drift fuerte,
- y congelar cada victoria visual antes de seguir generando.
