# Estandar de Organizacion y Nomenclatura

Este documento fija la convención oficial para organizar `base/masters` y nombrar archivos nuevos sin introducir deuda estructural.

## Principios

- `base/masters` es la fuente canónica del conocimiento.
- cada activo debe vivir en una sola ubicación lógica,
- los nombres deben ser predecibles para humanos y agentes IA,
- la nomenclatura debe permitir crecimiento por disciplina sin romper navegación,
- los índices, JSON y portal deben derivarse de esta estructura, no corregirla manualmente.

## Estructura canónica

`base/masters` se divide en:

- `company/`: gobierno documental, navegación, pricing, reglas, roadmap y taxonomía.
- `catalog/`: catálogo comercial y definición de servicios.
- `agents/`: agentes maestros por especialidad.
- `prompts-operativos/`: prompts listos para producir entregables.
- `manuales-produccion/`: fundamentos, guías y soporte de producción audiovisual e IA visual.
- `manuales-desarrollo/`: fundamentos, guías y soporte de arquitectura, código, seguridad y despliegue.

## Nomenclatura de carpetas

### Carpetas de prompts operativos

Formato:

`NN-Disciplina-Subarea`

Reglas:

- `NN` siempre tiene 2 dígitos.
- usar `Title-Case` con guiones.
- no repetir el mismo número en dos carpetas distintas.
- el nombre debe representar una disciplina o bloque funcional, no un proyecto puntual.

Ejemplos correctos:

- `01-Estrategia-Funnels`
- `05-Programacion`
- `08-Media-Performance`
- `11-CX-CRM`

## Nomenclatura de prompts operativos

Formato:

`CODIGO-Numero-Nombre-Entregable.md`

Reglas:

- `CODIGO` identifica la familia del prompt.
- `Numero` tiene 3 dígitos.
- el resto del nombre describe el entregable, no el área completa.
- usar guiones y evitar espacios.
- no usar versiones en el nombre del archivo.
- la versión va en el front matter.

Ejemplos:

- `COM-001-Asesor-Servicios-LiveDeveloper.md`
- `DATA-003-Plan-Medicion.md`
- `DEV-004-Code-Review.md`

## Prefijos oficiales de prompts

- `COM`: comercial y proformas
- `FUN`: estrategia de funnels
- `STRAT`: diagnóstico y estrategia
- `PROD`: producción audiovisual
- `SCRIPT`: guion y copy
- `AUDIO`: dirección o asset de audio
- `ADS`: pauta y anuncios
- `PR`: relaciones públicas y comunicación
- `DATA`: medición, analytics e insights
- `MEDIA`: media planning y performance
- `SEO`: posicionamiento orgánico y search
- `BIZ`: consultoría de negocio
- `ECOM`: commerce y e-commerce
- `CX`: customer experience
- `CRM`: CRM y retención
- `COPY`: content strategy, brand voice y sistema editorial
- `INFL`: influencer marketing y creator partnerships
- `EXP`: experiential, eventos y activaciones
- `HLTH`: healthcare marketing
- `ESG`: sostenibilidad y comunicación ESG
- `DEV`: desarrollo de software

## Nomenclatura de agentes

Formato:

`NombreEspecialidad.md`

Reglas:

- usar `PascalCase`,
- evitar prefijos numéricos,
- evitar nombres genéricos como `Especialista.md`,
- el nombre debe representar una función experta estable.

Ejemplos:

- `SEOSpecialist.md`
- `BusinessConsultant.md`
- `TechLeadFullStack.md`

## Nomenclatura de documentos empresariales

Formato:

`NN-NOMBRE-DESCRIPTIVO.md` o `NN-NOMBRE-DESCRIPTIVO.json`

Reglas:

- usar numeración secuencial de 2 dígitos,
- reservar estos archivos para gobierno, operación y navegación,
- no mezclar documentos de disciplina dentro de `company/`.

Ejemplos:

- `06-MAPA-POR-ROLES.md`
- `18-NAVEGACION-CANONICA.json`
- `19-ESTANDAR-ORGANIZACION-Y-NOMENCLATURA.md`

## Reglas de mantenimiento

Antes de crear un archivo o carpeta nueva:

1. validar si la disciplina ya existe,
2. validar si el activo corresponde a `agent`, `prompt`, `manual`, `catalog` o `company`,
3. definir nombre final según esta convención,
4. actualizar `18-NAVEGACION-CANONICA.json` si cambia navegación, rol o taxonomía,
5. regenerar `base/json` y `portal/`.

## Antipatrones a evitar

- carpetas vacías reservadas sin documentación,
- numeración duplicada entre carpetas hermanas,
- nombres de archivo con versión incrustada,
- mezclar entregables de negocio dentro de `manuales-*`,
- usar un README como sustituto del índice canónico,
- agregar prompts sin prefijo y sin taxonomía.
