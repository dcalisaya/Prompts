# Mapa Visual de Exploracion

Este mapa muestra como recorrer el workspace segun la necesidad real del usuario.

## Vista general

```text
Workspace de Prompts Live Developer
|
+-- README.md
|   +-- entrada principal del workspace
|
+-- base/masters
    |
    +-- catalog
    |   +-- 08-SERVICES.md
    |       +-- catalogo oficial de servicios
    |
    +-- company
    |   |
    |   +-- 00-INICIO-RAPIDO.md
    |   +-- por donde empezar si eres nuevo
    |   +-- 06-MAPA-POR-ROLES.md
    |   +-- a que documento ir segun perfil
    |   +-- 07-MAPA-VISUAL-EXPLORACION.md
    |   +-- mapa de navegacion del repositorio
    |   +-- 09 al 18
    |       +-- capa empresarial
    |       +-- service matrix
    |       +-- pricing
    |       +-- cotizacion
    |       +-- briefs
    |       +-- flujo
    |       +-- legal/comercial
    |       +-- conocimiento
    |       +-- automatizacion
    |       +-- navegacion canonica
    |
    +-- prompts-operativos
    |   |
    |   +-- 01-Estrategia-Funnels
    |   |   +-- FUN-001
    |   |   +-- STRAT-002
    |   |
    |   +-- 02-Produccion-Audiovisual
    |   |   +-- PROD-001
    |   |   +-- SCRIPT-001
    |   |
    |   +-- 03-Trafico-Spotify
    |   |   +-- ADS-001
    |   |
    |   +-- 04-Atencion-Comercial
    |       +-- COM-001
    |       +-- COM-002
    |   +-- 05-Programacion
    |   |   +-- DEV-001 a DEV-008
    |   +-- 06-PR-Comunicacion
    |   |   +-- PR-001 a PR-003
    |   +-- 07-Data-Analytics
    |   |   +-- DATA-001 a DATA-003
    |   +-- 08-Media-Performance
    |   |   +-- MEDIA-001 / MEDIA-002 / ADS-002 / ADS-003 / SEO-001
    |   +-- 09-Consultoria-Negocio
    |   |   +-- BIZ-001 / BIZ-002
    |   +-- 10-Commerce
    |   |   +-- ECOM-001 / ECOM-002
    |   +-- 11-CX-CRM
    |   |   +-- CX-001 / CRM-001 / CRM-002
    |   +-- 12-Content-Strategy-Copy
    |   |   +-- COPY-001 / COPY-002
    |   +-- 13-Influencer-Marketing
    |   |   +-- INFL-001 / INFL-002
    |   +-- 14-Experiential-Eventos
    |   |   +-- EXP-001 / EXP-002
    |   +-- 15-Healthcare-Marketing
    |   |   +-- HLTH-001 / HLTH-002
    |   +-- 16-Sostenibilidad-ESG
    |       +-- ESG-001 / ESG-002
    |
    +-- agents
    |   +-- prompts maestros por especialidad
    |
    +-- manuales-produccion
    |   +-- base tecnica para imagen, storyboard, guion e I2V
    |
    +-- manuales-desarrollo
        +-- base tecnica de arquitectura, codigo y despliegue
```

## Rutas de exploracion segun necesidad

### Quiero saber que servicio aplica

```text
README
-> 00-INICIO-RAPIDO
-> 06-MAPA-POR-ROLES
-> COM-001
-> 08-SERVICES
-> 09-SERVICE-MATRIX
```

### Quiero armar una proforma

```text
README
-> 00-INICIO-RAPIDO
-> 06-MAPA-POR-ROLES
-> COM-002
-> 08-SERVICES
-> 09-SERVICE-MATRIX
-> 10-PRICING-INTERNO
-> 11-REGLAS-DE-COTIZACION
-> 14-MARCO-LEGAL-COMERCIAL
```

### Quiero producir contenido o creatividad

```text
README
-> 06-MAPA-POR-ROLES
-> Prompt operativo
-> Agente maestro
-> Manual tecnico
-> AuditorCalidad
```

### Quiero explorar imagenes o video IA

```text
06-MAPA-POR-ROLES
-> DirectorFotografiaT2I / ArtistaStoryboard / DirectorTecnicoI2V
-> guia_maestra_t2i / storyboard / i2v
-> AuditorCalidad
```

### Quiero construir tono de marca o sistema editorial

```text
06-MAPA-POR-ROLES
-> Content Strategy / Copy
-> COPY-001 / COPY-002
-> ContentStrategist
```

### Quiero una campaña con influencers

```text
06-MAPA-POR-ROLES
-> Influencer Marketing
-> INFL-001 / INFL-002
-> InfluencerStrategist
```

### Quiero diseñar un evento o activación

```text
06-MAPA-POR-ROLES
-> Experiential / Eventos
-> EXP-001 / EXP-002
-> ExperientialStrategist
```

### Quiero marketing para salud o comunicación ESG

```text
06-MAPA-POR-ROLES
-> Healthcare Marketing o Sostenibilidad / ESG
-> HLTH-001 / HLTH-002 o ESG-001 / ESG-002
-> HealthcareMarketer o ESGStrategist
```

### Quiero entender como opera la empresa

```text
README
-> 09-SERVICE-MATRIX
-> 10-PRICING-INTERNO
-> 11-REGLAS-DE-COTIZACION
-> 12-BRIEFS-POR-SERVICIO
-> 13-FLUJO-COMERCIAL-Y-OPERATIVO
-> 14-MARCO-LEGAL-COMERCIAL
-> 15-BASE-DE-CONOCIMIENTO-COMERCIAL
-> 16-ARQUITECTURA-DATOS-AUTOMATIZACION
```

## Regla visual de navegacion

- si buscas resolver una tarea, entra por `Prompts-Operativos`
- si buscas criterio experto, entra por `Agentes`
- si buscas detalle tecnico, entra por `Manuales-Produccion`
- si buscas operar la empresa, entra por `09` a `16`
