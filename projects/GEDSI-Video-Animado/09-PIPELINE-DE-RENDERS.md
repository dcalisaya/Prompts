# Pipeline de Renders

## Objetivo

Definir una estructura clara para:

- organizar renders T2I e I2V,
- congelar referencias visuales,
- controlar versiones,
- evitar confusión entre lotes,
- y facilitar edición final del proyecto.

## Principio operativo

Cada render debe poder responder rápidamente:

1. qué shot representa,
2. qué versión es,
3. de qué referencia parte,
4. si está aprobado o no,
5. y si sirve como insumo para el siguiente paso.

No guardar archivos con nombres genéricos tipo:

- `final.png`
- `final-final.mp4`
- `shotbueno2.mov`

## Estructura recomendada de carpetas

Dentro de una carpeta de producción externa o repositorio de assets, usar esta lógica:

```text
GEDSI-Video-Animado/
  00-CAST/
    ana/
    mateo/
    secundarios/
  01-ENVIRONMENTS/
    plaza/
    aula/
    taller/
    meeting/
    simbolos/
  02-T2I-KEYFRAMES/
    shot-01/
    shot-02/
    ...
    shot-27/
  03-I2V-PREVIEWS/
    shot-01/
    shot-02/
    ...
    shot-27/
  04-I2V-FINALS/
    shot-01/
    shot-02/
    ...
    shot-27/
  05-EDITS/
    assembly/
    review/
    final/
  06-AUDIO/
    music/
    vo/
    sfx/
  07-EXPORTS/
    internal-review/
    client-review/
    master/
```

## Convención de nombres

### Regla base

```text
GEDSI_<tipo>_<unidad>_<shot>_vNN
```

### Ejemplos

```text
GEDSI_CHAR_ANA_turnaround_v01.png
GEDSI_CHAR_MATEO_expression-sheet_v02.png
GEDSI_ENV_PLAZA_master_v03.png
GEDSI_T2I_shot-04_v02.png
GEDSI_I2VPREV_shot-04_v01.mp4
GEDSI_I2VFINAL_shot-04_v03.mov
GEDSI_EDIT_assembly_v01.mp4
GEDSI_MASTER_vertical-916_v01.mp4
```

## Nomenclatura por tipo de asset

### Personajes

```text
GEDSI_CHAR_<PERSONAJE>_<asset>_vNN
```

Ejemplos:

```text
GEDSI_CHAR_ANA_front_v01.png
GEDSI_CHAR_ANA_3q_v01.png
GEDSI_CHAR_MATEO_turnaround_v02.png
GEDSI_CHAR_SEC_lineup-v01.png
```

### Entornos

```text
GEDSI_ENV_<ENTORNO>_<asset>_vNN
```

Ejemplos:

```text
GEDSI_ENV_PLAZA_master_v01.png
GEDSI_ENV_AULA_master_v01.png
GEDSI_ENV_TALLER_master_v01.png
GEDSI_ENV_MEETING_master_v01.png
```

### T2I por shot

```text
GEDSI_T2I_shot-XX_vNN
```

Ejemplos:

```text
GEDSI_T2I_shot-01_v01.png
GEDSI_T2I_shot-01_v02.png
GEDSI_T2I_shot-10_v03.png
```

### I2V preview

```text
GEDSI_I2VPREV_shot-XX_vNN
```

### I2V final

```text
GEDSI_I2VFINAL_shot-XX_vNN
```

## Política de versiones

### Cuándo subir versión

Subir `vNN` cuando cambie al menos una de estas cosas:

- composición
- personaje
- entorno
- luz
- timing
- movimiento de cámara
- seed base o referencia usada

### Cuándo no subir versión

No subir versión si solo:

- renombraste el archivo,
- moviste de carpeta,
- o cambiaste una nota administrativa.

## Política de aprobaciones

### Estados sugeridos

Usar sufijos opcionales o carpeta separada para estado:

- `WIP`
- `REVIEW`
- `APPROVED`
- `REJECTED`

Ejemplo:

```text
GEDSI_T2I_shot-04_v02_REVIEW.png
GEDSI_T2I_shot-04_v03_APPROVED.png
GEDSI_I2VFINAL_shot-04_v01_REJECTED.mov
```

Si no quieres usar sufijos, separar por carpetas:

```text
shot-04/
  review/
  approved/
  rejected/
```

## Seeds y referencias congeladas

## Qué congelar

- seed o referencia de Ana
- seed o referencia de Mateo
- lineup aprobado de secundarios
- entorno maestro de plaza
- entorno maestro de aula
- entorno maestro de taller
- assets simbólicos aprobados

## Registro mínimo por asset aprobado

Guardar junto al render o en una hoja de control:

- nombre del archivo
- shot o asset
- versión
- seed usada
- referencia base usada
- fecha
- decisión: aprobado / rehacer

## Recomendación práctica

Crear un archivo auxiliar tipo:

```text
GEDSI_RENDER_LOG.md
```

o una hoja externa con:

- asset
- v
- estado
- prompt base
- seed
- notas

## Pipeline T2I

### Etapa 1

Generar varias opciones controladas para:

- Ana
- Mateo
- secundarios
- plaza
- aula
- taller

### Etapa 2

Seleccionar una sola referencia aprobada por asset maestro.

### Etapa 3

Generar shots hero:

- `01`
- `02`
- `03`
- `04`
- `10`
- `13`
- `21`
- `26`
- `27`

### Etapa 4

Generar shots restantes por bloque.

## Pipeline I2V

### Regla

No animar a máxima duración desde el primer intento.

### Secuencia recomendada

1. preview corto `1-2s`
2. revisión de drift
3. preview extendido
4. final aprobado

### Entregables por shot

Cada shot idealmente debería tener:

1. keyframe T2I aprobado
2. preview I2V corto
3. preview I2V ajustado
4. final I2V aprobado

## Parámetros de export recomendados

### T2I

- conservar PNG o formato sin pérdida cuando sea posible
- no sobrecomprimir keyframes aprobados

### I2V previews

- MP4 liviano para revisión rápida
- duración exacta o aproximada del shot
- nombre claramente versionado

### I2V finals

- formato de mayor calidad disponible dentro del flujo
- si habrá edición posterior, priorizar master de alta calidad antes de compresión final

### Edit review exports

- un ensamblaje de revisión interna
- un ensamblaje con audio temporal
- un master final vertical `9:16`

## Orden de armado para edición

### Assembly 1

Armar primero con:

- shots hero
- placeholders para shots faltantes

### Assembly 2

Sustituir bloques completos:

- apertura
- barreras
- equidad
- diversidad
- colaboración
- discapacidad
- transformación y cierre

### Assembly 3

Incorporar:

- locución
- música
- transiciones
- limpieza de ritmo

## Criterios de descarte

Descartar un render si:

- rompe proporción del cast
- rompe continuidad del fondo
- rompe eje narrativo
- introduce un diseño nuevo sin aprobación
- tiene manos, ojos o rostro con artefactos graves
- no empalma con el bloque al que pertenece

## Checklist de handoff a edición

Antes de pasar a edición final:

- todos los shots tienen versión aprobada
- todos los archivos están nombrados consistentemente
- no hay dos “finales” ambiguos del mismo shot
- los assets maestros están congelados
- las previews rechazadas están separadas
- el editor sabe qué archivo es el correcto por shot

## Ejemplo mínimo por shot

Para cada shot, aspirar a esta secuencia:

```text
shot-04/
  review/
    GEDSI_T2I_shot-04_v01_REVIEW.png
    GEDSI_T2I_shot-04_v02_REVIEW.png
    GEDSI_I2VPREV_shot-04_v01_REVIEW.mp4
  approved/
    GEDSI_T2I_shot-04_v03_APPROVED.png
    GEDSI_I2VFINAL_shot-04_v02_APPROVED.mov
  rejected/
    GEDSI_T2I_shot-04_v01_REJECTED.png
    GEDSI_I2VFINAL_shot-04_v01_REJECTED.mov
```

## Recomendación final

Este pipeline debe priorizar:

1. trazabilidad,
2. consistencia,
3. claridad para revisión,
4. y facilidad de handoff a edición.

La regla práctica es:

- un shot aprobado debe ser identificable en segundos,
- un render rechazado no debe confundirse con uno final,
- y toda versión importante debe quedar rastreable.
