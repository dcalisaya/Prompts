# Indice de Prompts Operativos

Este documento ya no funciona solo como inventario. Tambien sirve como tabla de navegacion para que cualquier persona del equipo encuentre rapido el prompt correcto segun su tarea.

## Antes de usar este indice

Si no conoces el workspace, entra primero por:

1. [00-INICIO-RAPIDO.md](/Users/dcalisaya/Developer/Prompts/base/masters/company/00-INICIO-RAPIDO.md)
2. [06-MAPA-POR-ROLES.md](/Users/dcalisaya/Developer/Prompts/base/masters/company/06-MAPA-POR-ROLES.md)

## Cobertura actual

La libreria ya cubre comercial, estrategia, producción, paid media, PR, analytics, consultoría, commerce, CX/CRM y desarrollo. Este índice es la puerta principal para encontrar el prompt operativo correcto.

## Regla de mantenimiento

La taxonomía canónica de roles, disciplinas y flujos vive en [18-NAVEGACION-CANONICA.json](/Users/dcalisaya/Developer/Prompts/base/masters/company/18-NAVEGACION-CANONICA.json). Si se agrega una nueva disciplina o prompt, primero se actualiza esa fuente y luego se regeneran JSON e índices.

La convención de nombres y carpetas vive en [19-ESTANDAR-ORGANIZACION-Y-NOMENCLATURA.md](/Users/dcalisaya/Developer/Prompts/base/masters/company/19-ESTANDAR-ORGANIZACION-Y-NOMENCLATURA.md).

## Biblioteca operativa

| ID | Prompt | Lo usa | Cuando usarlo | Fuente base |
| :--- | :--- | :--- | :--- | :--- |
| **`COM-001`** | [Asesor Comercial de Servicios Live Developer](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/04-Atencion-Comercial/COM-001-Asesor-Servicios-LiveDeveloper.md) | Comercial / Ventas | Cuando alguien pregunta que servicio necesita o como responder profesionalmente | `08-SERVICES.md` |
| **`COM-002`** | [Armador de Proforma y Alcance Preliminar Live Developer](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/04-Atencion-Comercial/COM-002-Armador-Proforma-LiveDeveloper.md) | Administracion / Proformas / Coordinacion | Cuando hay que desglosar servicios para cotizar o preparar propuesta base | `08-SERVICES.md` |
| **`FUN-001`** | [Generador de Arquitectura de Funnel](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/01-Estrategia-Funnels/FUN-001-Generador-Arquitectura.md) | Estratega / Marketing | Cuando se necesita estructurar un funnel desde cero | `EstrategaDigital` |
| **`STRAT-002`** | [Auditoria de Ecosistema Digital](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/01-Estrategia-Funnels/STRAT-002-Auditoria-Ecosistema.md) | Estratega / Comercial consultivo | Cuando el cliente ya tiene activos y se requiere diagnostico | `EstrategaDigital` |
| **`PROD-001`** | [Estructurador de Temporada de Podcast](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/02-Produccion-Audiovisual/PROD-001-Temporada-Podcast.md) | Produccion / Contenido | Cuando hay que planificar una temporada de podcast | `DirectorAudiovisual` |
| **`SCRIPT-001`** | [Guiones Hook-Retencion-CTA](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/02-Produccion-Audiovisual/SCRIPT-001-Guiones-Retencion.md) | Copy / Contenido / Social media | Cuando hay que escribir guiones cortos o piezas de retencion | `DirectorAudiovisual` |
| **`STORY-001`** | [Storyboard y Desglose de Tomas para Producción IA](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/02-Produccion-Audiovisual/STORY-001-Storyboard-Desglose-Tomas.md) | Produccion / Storyboard / IA visual | Cuando un guion debe convertirse en shot list, blocking y base para T2I/I2V | `ArtistaStoryboard` |
| **`AUDIO-001`** | [Música para Video Animado (Ecuador)](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/02-Produccion-Audiovisual/AUDIO-001-Musica-Animacion.md) | Produccion / Contenido | Generación de música para videos animados con contexto cultural | `DirectorAudiovisual` |
| **`ADS-001`** | [Guionista para Spotify Ads](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/03-Trafico-Spotify/ADS-001-Spotify-Ads-Script.md) | Trafficker / Paid media | Cuando se necesita un guion para pauta en Spotify | `TraffickerEspecialista` |
| **`PR-001`** | [Generador de Comunicado de Prensa](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/06-PR-Comunicacion/PR-001-Comunicado-Prensa.md) | PR / Comunicacion / Institucional | Cuando hay que anunciar lanzamiento, evento o posicionamiento a medios | `PRStrategist` |
| **`PR-002`** | [Plan de Crisis Comunicacional](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/06-PR-Comunicacion/PR-002-Plan-Crisis.md) | PR / Direccion / Legal | Cuando se necesita protocolo preventivo o reactivo ante crisis reputacional | `CrisisManager` |
| **`PR-003`** | [Brief de Media Training](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/06-PR-Comunicacion/PR-003-Media-Training.md) | PR / Voceros / Direccion | Cuando un vocero va a aparecer en medios y necesita preparacion | `PRStrategist` |
| **`DATA-001`** | [Dashboard de KPIs para Cliente](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/07-Data-Analytics/DATA-001-Dashboard-KPIs.md) | Data / Analytics / Estrategia | Cuando necesitas diseñar un dashboard con KPIs accionables | `DataAnalyst` |
| **`DATA-002`** | [Informe de Insights Accionables](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/07-Data-Analytics/DATA-002-Informe-Insights.md) | Insights / Estrategia / Comercial | Cuando necesitas fundamentar estrategia con investigacion de mercado | `InsightsStrategist` |
| **`DATA-003`** | [Plan de Medición (Measurement Framework)](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/07-Data-Analytics/DATA-003-Plan-Medicion.md) | Data / Desarrollo / Media | Antes de lanzar campañas o proyectos digitales sin tracking | `DataAnalyst` |
| **`MEDIA-001`** | [Plan de Medios Integral](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/08-Media-Performance/MEDIA-001-Plan-Medios-Integral.md) | Media / Estrategia / Comercial | Cuando hay campaña multicanal y hay que definir mix de medios | `MediaPlanner` |
| **`MEDIA-002`** | [Campaña de Performance Marketing](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/08-Media-Performance/MEDIA-002-Campana-Performance.md) | Performance / Growth / Paid media | Cuando el objetivo es conversión medible | `PerformanceMarketer` |
| **`SEO-001`** | [Auditoría SEO Completa](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/08-Media-Performance/SEO-001-Auditoria-SEO.md) | SEO / Desarrollo / Contenido | Cuando un sitio tiene bajo posicionamiento o antes de migracion/rediseño | `SEOSpecialist` |
| **`ADS-002`** | [Campaña Meta Ads (Facebook/Instagram)](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/08-Media-Performance/ADS-002-Meta-Ads.md) | Performance / Paid media | Cuando se necesita pauta en Facebook/Instagram con estructura completa | `PerformanceMarketer` |
| **`ADS-003`** | [Campaña Google Ads (Search + PMax)](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/08-Media-Performance/ADS-003-Google-Ads.md) | Performance / SEM / Paid media | Cuando se necesita capturar demanda en buscadores de Google | `PerformanceMarketer` |
| **`BIZ-001`** | [Diagnóstico de Madurez Digital](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/09-Consultoria-Negocio/BIZ-001-Diagnostico-Madurez.md) | Consultoria / Comercial / Direccion | Cuando el cliente dice "quiero digitalizarme" y hay que evaluar estado actual | `BusinessConsultant` |
| **`BIZ-002`** | [Estrategia Go-to-Market](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/09-Consultoria-Negocio/BIZ-002-Estrategia-GoToMarket.md) | Consultoria / Producto / Estrategia | Cuando hay lanzamiento de producto o servicio nuevo al mercado | `BusinessConsultant` |
| **`ECOM-001`** | [Estrategia de E-commerce](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/10-Commerce/ECOM-001-Estrategia-Ecommerce.md) | Commerce / Desarrollo / Estrategia | Cuando un cliente quiere vender online o su tienda no rinde | `CommerceStrategist` |
| **`ECOM-002`** | [Optimización de Marketplace](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/10-Commerce/ECOM-002-Optimizacion-Marketplace.md) | Commerce / Marketing | Cuando se vende en MercadoLibre o Amazon y se quiere optimizar | `CommerceStrategist` |
| **`CX-001`** | [Customer Journey Map](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/11-CX-CRM/CX-001-Journey-Map.md) | CX / UX / Estrategia | Cuando necesitas mapear la experiencia del cliente e identificar fricciones | `CXDesigner` |
| **`CRM-001`** | [Estrategia de Email Marketing](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/11-CX-CRM/CRM-001-Email-Marketing.md) | CRM / Retencion / Marketing | Cuando hay base de contactos y se necesita activarla o implementar email marketing | `CRMStrategist` |
| **`CRM-002`** | [Programa de Fidelización y Retención](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/11-CX-CRM/CRM-002-Programa-Fidelizacion.md) | CRM / Retencion / Comercial | Cuando se quiere aumentar recompra, reducir churn o crear programa de lealtad | `CRMStrategist` |
| **`DEV-001`** | [Especificador de Requerimientos](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/05-Programacion/DEV-001-Especificador-Requerimientos.md) | Desarrollo / Ingenieria | Cuando hay que traducir una necesidad en requerimientos claros | `ArquitectoSoftware` |
| **`DEV-002`** | [Arquitectura de Software](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/05-Programacion/DEV-002-Arquitectura-Software.md) | Desarrollo / Ingenieria | Cuando se necesita definir stack, componentes y arquitectura | `ArquitectoSoftware` |
| **`DEV-003`** | [Estimador de Esfuerzo](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/05-Programacion/DEV-003-Estimador-Esfuerzo.md) | Desarrollo / Ingenieria | Cuando hay que estimar esfuerzo, alcance y complejidad | `TechLeadFullStack` |
| **`DEV-004`** | [Code Review](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/05-Programacion/DEV-004-Code-Review.md) | Desarrollo / Ingenieria | Cuando se necesita revisar calidad, bugs y riesgos del codigo | `CodeAuditor` |
| **`DEV-005`** | [Documentador Técnico](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/05-Programacion/DEV-005-Documentador-Tecnico.md) | Desarrollo / Ingenieria | Cuando hay que producir documentacion tecnica clara | `TechLeadFullStack` |
| **`DEV-006`** | [Debugger Sistemático](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/05-Programacion/DEV-006-Debugger-Systematico.md) | Desarrollo / Ingenieria | Cuando hay que aislar una falla y proponer correccion | `TechLeadFullStack` |
| **`DEV-007`** | [Optimizador de Performance](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/05-Programacion/DEV-007-Optimizador-Performance.md) | Desarrollo / Ingenieria | Cuando el sistema tiene cuellos de botella o problemas de performance | `CodeAuditor` |
| **`DEV-008`** | [Generador de Tests](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/05-Programacion/DEV-008-Generador-Tests.md) | Desarrollo / Ingenieria | Cuando hay que aumentar cobertura con tests utiles | `QATester` |
| **`COPY-001`** | [Brand Voice System](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/12-Content-Strategy-Copy/COPY-001-Brand-Voice-System.md) | Content Strategy / Copy | Cuando una marca necesita definir tono de voz y consistencia verbal | `ContentStrategist` |
| **`COPY-002`** | [Arquitectura de Contenido Editorial](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/12-Content-Strategy-Copy/COPY-002-Arquitectura-Contenido-Editorial.md) | Content Strategy / Copy | Cuando se necesita estructurar pilares editoriales y sistema de distribución | `ContentStrategist` |
| **`COPY-003`** | [Transcreación Bilingüe de Mensajes y Piezas](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/12-Content-Strategy-Copy/COPY-003-Transcreacion-Bilingue.md) | Content Strategy / Copy | Cuando un mensaje debe pasar de español a inglés o viceversa sin perder intención ni fuerza persuasiva | `ContentStrategist` |
| **`COPY-004`** | [Copy Bilingüe para Web, Email y Ads](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/12-Content-Strategy-Copy/COPY-004-Copy-Bilingue-Web-Email-Ads.md) | Content Strategy / Copy | Cuando se necesitan piezas bilingües orientadas a conversión para canales de negocio | `ContentStrategist` |
| **`COPY-005`** | [QA Editorial Bilingüe y Corrección de Estilo](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/12-Content-Strategy-Copy/COPY-005-QA-Editorial-Bilingue.md) | Content Strategy / Copy | Cuando un texto en español, inglés o ES/EN necesita revisión editorial seria antes de publicar | `ContentStrategist` |
| **`INFL-001`** | [Estrategia de Campaña con Creadores](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/13-Influencer-Marketing/INFL-001-Estrategia-Campana-Creadores.md) | Influencer Marketing | Cuando una marca quiere activar creadores con una estrategia clara | `InfluencerStrategist` |
| **`INFL-002`** | [Brief y Outreach para Creadores](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/13-Influencer-Marketing/INFL-002-Brief-Outreach-Creadores.md) | Influencer Marketing | Cuando ya existe una campaña y hay que preparar contacto y brief para talentos | `InfluencerStrategist` |
| **`EXP-001`** | [Concepto y Experiencia de Evento](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/14-Experiential-Eventos/EXP-001-Concepto-Experiencia-Evento.md) | Experiential / Eventos | Cuando se necesita conceptualizar un evento o activación | `ExperientialStrategist` |
| **`EXP-002`** | [Plan de Amplificación de Evento](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/14-Experiential-Eventos/EXP-002-Plan-Amplificacion-Evento.md) | Experiential / Eventos | Cuando el evento debe convertirse en contenido, PR o demanda posterior | `ExperientialStrategist` |
| **`HLTH-001`** | [Estrategia de Marketing Healthcare](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/15-Healthcare-Marketing/HLTH-001-Estrategia-Marketing-Healthcare.md) | Healthcare Marketing | Cuando una marca de salud necesita una estrategia de captación ética | `HealthcareMarketer` |
| **`HLTH-002`** | [Plan de Contenido y Educación al Paciente](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/15-Healthcare-Marketing/HLTH-002-Plan-Contenido-Educacion-Paciente.md) | Healthcare Marketing | Cuando hay que educar pacientes y generar confianza con contenido responsable | `HealthcareMarketer` |
| **`ESG-001`** | [Estrategia de Comunicación ESG](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/16-Sostenibilidad-ESG/ESG-001-Estrategia-Comunicacion-ESG.md) | Sostenibilidad / ESG | Cuando una empresa necesita comunicar sostenibilidad con credibilidad | `ESGStrategist` |
| **`ESG-002`** | [Mensajería para Reporte de Sostenibilidad](/Users/dcalisaya/Developer/Prompts/base/masters/prompts-operativos/16-Sostenibilidad-ESG/ESG-002-Mensajeria-Reporte-Sostenibilidad.md) | Sostenibilidad / ESG | Cuando se necesita estructurar narrativa y mensajes para reporte ESG | `ESGStrategist` |

## Orden correcto de uso

No todo el mundo debe entrar por un agente maestro. Para la mayoria de usuarios internos, el orden correcto es:

1. mapa por rol,
2. prompt operativo,
3. fuente base o agente maestro,
4. auditoria de calidad si el material saldra a cliente.

## Metadatos

Cada archivo de la libreria incluye un bloque YAML para facilitar indexacion en Obsidian, Notion o una base de datos propia.

## Proximas reservas de carpetas

Las siguientes áreas complementarias ya quedaron activadas en Fase 2:

- `12-Content-Strategy-Copy`
- `13-Influencer-Marketing`
- `14-Experiential-Eventos`
- `15-Healthcare-Marketing`
- `16-Sostenibilidad-ESG`
