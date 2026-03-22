# Service Matrix Live Developer

Este documento traduce el catalogo comercial en una matriz operativa util para ventas, administracion, coordinacion, produccion y futura automatizacion.

## Como usar esta matriz

- `service_code`: identificador interno unico.
- `unit`: como se cobra o controla el servicio.
- `scope_base`: alcance minimo esperado.
- `not_included`: limites del servicio para evitar sobrepromesa.
- `inputs`: lo minimo que el equipo necesita para iniciar.
- `owner_area`: area responsable principal.

## Matriz de servicios

| service_code | service_name | category | unit | scope_base | not_included | inputs | owner_area |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `AV-001` | Grabacion en Quito | Produccion Audiovisual | jornada | Grabacion profesional en Quito con equipos | Edicion, locucion, pauta, viaticos fuera de Quito | fecha, locacion, objetivo, tipo de pieza | Produccion |
| `AV-002` | Grabacion en Sierra | Produccion Audiovisual | jornada | Grabacion fuera de Quito en region Sierra | Edicion extra, pauta, costos no definidos de cliente | fecha, ciudad, locacion, plan de rodaje | Produccion |
| `AV-003` | Grabacion en Costa | Produccion Audiovisual | jornada | Grabacion en provincias de la Costa | Edicion extra, pauta, costos no definidos de cliente | fecha, ciudad, locacion, plan de rodaje | Produccion |
| `AV-004` | Edicion de Video | Produccion Audiovisual | pieza | Edicion de material existente | Rodaje, locucion, subtitulado extra, motion avanzado | material fuente, objetivo, formato final | Postproduccion |
| `AV-005` | Video Corporativo | Produccion Audiovisual | proyecto | Preproduccion, grabacion y postproduccion de video corporativo | Pauta, multiples versiones no acordadas, traducciones | brief, objetivo, locacion, voceros, referencias | Produccion |
| `AV-006` | Video Animado 2D | Produccion Audiovisual | pieza | Video animado explicativo o corporativo | Grabacion real, voz no incluida salvo acuerdo | guion, branding, duracion, referencias | Diseno/Animacion |
| `AV-007` | Video Formato Vertical | Produccion Audiovisual | pieza | Adaptacion o edicion a formato vertical | Rodaje adicional no acordado | material base, plataforma, duracion | Postproduccion |
| `AV-008` | Subtitulacion | Produccion Audiovisual | pieza | Subtitulado de video en idioma definido | Traduccion, quemado en varios formatos salvo acuerdo | video final, idioma, estilo | Postproduccion |
| `AV-009` | Traduccion de Video | Produccion Audiovisual | pieza | Traduccion de guion o contenido audiovisual | Locucion y subtitulado salvo acuerdo | guion o video, idioma origen/destino | Contenido |
| `AV-010` | Produccion Radial | Produccion Audiovisual | pieza | Cuna radial con estructura base | Compra de medios, multiples voces no acordadas | brief, duracion, CTA, tono | Audio |
| `AV-011` | Locucion Espanol | Produccion Audiovisual | pieza | Locucion profesional en espanol | Edicion compleja de audio, traduccion | texto final, tono, duracion | Audio |
| `AV-012` | Locucion Ingles | Produccion Audiovisual | pieza | Locucion profesional en ingles | Traduccion y casting ampliado | texto final, tono, variante de ingles | Audio |
| `AV-013` | Podcast (A/V) | Produccion Audiovisual | episodio | Produccion de episodio de podcast en audio y video | Pauta, distribucion paga, cortes ilimitados | concepto, invitados, duracion, formato | Produccion |
| `AV-014` | Sesion Fotografica | Produccion Audiovisual | sesion | Sesion fotografica con iluminacion y retoque base | Arte complejo, modelos, alquileres no definidos | objetivo, locacion, shot list | Fotografia |
| `AV-015` | Cobertura Evento | Produccion Audiovisual | evento | Cobertura fotografica de evento | Video, streaming, edicion compleja no acordada | agenda, locacion, horario, entregables | Fotografia |
| `AV-016` | Fotografia Producto | Produccion Audiovisual | lote | Fotografia de producto para catalogo o e-commerce | Modelado 3D, arte no acordado, copy | cantidad de productos, fondo, estilo | Fotografia |
| `MK-001` | Analisis de Redes | Marketing Digital | diagnostico | Revision de redes actuales con recomendaciones | Community management o pauta | links, objetivo, publico, benchmark | Marketing |
| `MK-002` | Estrategia Digital | Marketing Digital | proyecto | Estrategia de marketing y plan de contenidos | Ejecucion operativa mensual salvo acuerdo | objetivo, oferta, publico, canales | Estrategia |
| `MK-003` | Community Manager | Marketing Digital | mes | Gestion mensual de contenido, publicacion y respuesta | Produccion audiovisual compleja, pauta | canales, tono, calendario, accesos | Social Media |
| `MK-004` | Pauta Digital | Marketing Digital | mes | Gestion de campanas pagadas en plataformas definidas | Presupuesto de medios, produccion creativa salvo acuerdo | objetivo, presupuesto, pixel, activos | Paid Media |
| `BR-001` | Diseno de Identidad | Diseno y Branding | proyecto | Logo, paleta, tipografia y manual base | Registro de marca, web completa | brief, referencias, valores de marca | Diseno |
| `BR-002` | Diseno Presentacion | Diseno y Branding | pieza | Presentacion corporativa en PPT o Google Slides | Copy extenso o investigacion profunda salvo acuerdo | contenido, branding, objetivo | Diseno |
| `BR-003` | Diseno Impreso | Diseno y Branding | pieza | Diseno de material impreso | Impresion y distribucion salvo acuerdo | medidas, contenido, branding | Diseno |
| `BR-004` | Infografia | Diseno y Branding | pieza | Infografia para presentacion o redes | Data cleaning complejo o animacion | contenido, jerarquia, branding | Diseno |
| `BR-005` | Roll Up | Diseno y Branding | unidad | Diseno y/o gestion de roll up | Logistica adicional no acordada | medida, mensaje, branding | Diseno |
| `BR-006` | Banner | Diseno y Branding | m2 | Diseno y/o gestion de banner en lona | Instalacion in situ salvo acuerdo | medida, ubicacion, branding | Diseno |
| `BR-007` | Flyer (Impresion) | Diseno y Branding | lote | Diseno y/o impresion de flyers | Distribucion, copy extenso | medida, cantidad, mensaje, branding | Diseno |
| `BR-008` | Tarjetas (Impresion) | Diseno y Branding | lote | Diseno y/o impresion de tarjetas | Branding completo, redaccion extensa | nombres, cargos, branding, cantidad | Diseno |
| `INF-001` | Dominio .com/.org | Infraestructura y Web | anualidad | Gestion de registro de dominio internacional | Diseno web, hosting | dominio deseado, titular, correo | Infraestructura |
| `INF-002` | Dominio .ec | Infraestructura y Web | bienio | Gestion de dominio Ecuador | Diseno web, hosting | dominio deseado, titular, correo | Infraestructura |
| `INF-003` | Hosting Economico | Infraestructura y Web | anualidad | Hosting compartido con configuracion base | Desarrollo, migracion compleja, soporte premium | dominio, volumen estimado, correo tecnico | Infraestructura |
| `INF-004` | Hosting Premium | Infraestructura y Web | anualidad | Hosting premium con backups diarios | Desarrollo, devops avanzado | dominio, trafico estimado, requerimientos | Infraestructura |
| `INF-005` | Servidor VPS | Infraestructura y Web | mensualidad | Provision y configuracion base de VPS | Arquitectura compleja, soporte 24/7 salvo acuerdo | stack, trafico, acceso, sistema | Infraestructura |
| `INF-006` | Certificado SSL | Infraestructura y Web | anualidad | Emision e instalacion de SSL | Migracion o hardening extra | dominio, hosting, acceso tecnico | Infraestructura |
| `INF-007` | SSL Wildcard | Infraestructura y Web | anualidad | SSL para multiples subdominios | Arquitectura compleja y DNS no acordado | dominio raiz, subdominios, acceso tecnico | Infraestructura |
| `INF-008` | Email Corporativo | Infraestructura y Web | cuenta | Configuracion de correo corporativo por usuario | Migraciones masivas no acordadas | dominio, cuentas, proveedor | Infraestructura |
| `DEV-001` | Landing Page | Desarrollo de Software y Apps | proyecto | Landing responsive con formulario y analitica | CRM complejo, automatizaciones no acordadas | brief, copy, branding, CTA | Desarrollo Web |
| `DEV-002` | Web Corporativa | Desarrollo de Software y Apps | proyecto | Sitio corporativo con CMS y SEO base | Integraciones complejas, ecommerce | mapa de sitio, branding, contenido | Desarrollo Web |
| `DEV-003` | E-commerce | Desarrollo de Software y Apps | proyecto | Tienda online con carrito, pagos y gestion | ERP complejo, marketplace multivendor salvo acuerdo | catalogo, pagos, envios, branding | Desarrollo Web |
| `DEV-004` | App Movil | Desarrollo de Software y Apps | proyecto | Desarrollo de app iOS/Android | Backend complejo no acordado, soporte extendido | alcance funcional, usuarios, plataformas | Desarrollo |
| `DEV-005` | Sistema de Gestion | Desarrollo de Software y Apps | proyecto | Software empresarial a medida | Integraciones y migraciones no definidas | procesos, usuarios, modulos, reglas | Desarrollo |
| `DEV-006` | CRM Personalizado | Desarrollo de Software y Apps | proyecto | CRM adaptado a operacion comercial | Automatizaciones externas no acordadas | proceso comercial, usuarios, pipeline | Desarrollo |
| `DEV-007` | Aplicacion Web Custom | Desarrollo de Software y Apps | hora/proyecto | Desarrollo de web app segun alcance | Soporte ilimitado, infraestructura no definida | requerimiento funcional, prioridad | Desarrollo |
| `DEV-008` | Integracion API | Desarrollo de Software y Apps | integracion | Conexion con terceros y endpoints | Licencias de terceros, soporte extendido | API docs, credenciales, flujo esperado | Desarrollo |
| `DEV-009` | Mantenimiento Web | Desarrollo de Software y Apps | mes | Actualizaciones, backups y soporte base | Desarrollo evolutivo grande | accesos, stack, frecuencia, SLA acordado | Soporte |
| `DEV-010` | Soporte Tecnico | Desarrollo de Software y Apps | hora/bolsa | Soporte tecnico y desarrollo adicional | Rebuild completo, guardias no acordadas | incidencia, prioridad, accesos | Soporte |
| `IA-001` | Chatbot Informativo | Soluciones IA y Automatizacion | proyecto | Implementacion de chatbot informativo | Entrenamiento avanzado, integraciones no acordadas | objetivo, FAQs, canal, tono | IA |
| `IA-002` | Automatizacion con IA | Soluciones IA y Automatizacion | proyecto | Solucion de automatizacion de procesos con IA | Reingenieria completa no definida | proceso actual, inputs, outputs, riesgos | IA |
| `PR-001` | Comunicado de Prensa | Relaciones Publicas y Comunicacion | pieza | Redaccion y distribucion de comunicados | PR tactico extendido, eventos en vivo | brief, quotes, objetivo, medios target | Comunicacion |
| `PR-002` | Plan de Comunicacion | Relaciones Publicas y Comunicacion | proyecto | Estrategia de comunicacion 360 | Ejecucion de pauta, produccion AV | objetivo, audiencia, presupuesto, timing | Comunicacion |
| `PR-003` | Media Training | Relaciones Publicas y Comunicacion | sesion | Entrenamiento de voceros (teorico/practico) | Produccion AV compleja | voceros, mensajes clave, Q&A base | Comunicacion |
| `PR-004` | Plan de Crisis | Relaciones Publicas y Comunicacion | proyecto | Protocolo de crisis y holding statements | Asesoria legal, voceria directa | riesgos, equipo interno, manuales | Comunicacion |
| `PR-005` | Monitoreo de Medios | Relaciones Publicas y Comunicacion | mes | Social listening y clipping mensual | Respuesta a usuarios (CM) | keywords, competidores, topics | Comunicacion |
| `PR-006` | Comunicacion Interna | Relaciones Publicas y Comunicacion | proyecto | Campanhas para colaboradores y boletines | Produccion de eventos presenciales | cultura, objetivos, canales internos | Comunicacion |
| `DAT-001` | Dashboard de KPIs | Data, Analytics e Insights | proyecto | Dashboard ejecutivo (Looker/Power BI) | Data cleaning masivo, ingenieria de datos | KPIs, fuentes, accesos, publico | Data |
| `DAT-002` | Plan de Medicion | Data, Analytics e Insights | proyecto | Framework de medicion y eventos | Implementacion dev compleja | objetivos de negocio, embudo actual | Data |
| `DAT-003` | Auditoria de Datos | Data, Analytics e Insights | diagnostico | Evaluacion de tags, conversiones y calidad | Correccion automatica de codigo legacy | accesos GA4/GTM/Pixel, documentacion | Data |
| `DAT-004` | Informe de Insights | Data, Analytics e Insights | informe | Investigacion y analisis cuali/cuanti | Compra de paneles costosos | objetivo del estudio, publico target | Data |
| `DAT-005` | Configuracion GA4 + GTM | Data, Analytics e Insights | proyecto | Setup de eventos y conversiones base | eCommerce tracking complejo | accesos web, lista de eventos | Data |
| `MED-001` | Plan de Medios Integral | Media Planning y Performance | proyecto | Mix de medios, presupuesto y flowchart | Ejecucion (compra real) | presupuesto, objetivo, target, timing | Media |
| `MED-002` | Campana Meta Ads | Media Planning y Performance | mes | Gestion de campana Facebook/Instagram | Produccion de creativos | presupuesto, objetivo, creativos, accesos | Media |
| `MED-003` | Campana Google Ads | Media Planning y Performance | mes | Gestion de Search, Display o PMax | Landing pages, creativos HTML5 | presupuesto, keywords target, accesos | Media |
| `MED-004` | Campana TikTok Ads | Media Planning y Performance | mes | Gestion de TikTok Ads | Creacion de UGC (User Generated Content) | presupuesto, videos verticales | Media |
| `MED-005` | Auditoria SEO | Media Planning y Performance | diagnostico | Auditoria tecnica, on-page y off-page | Implementacion de los fixes tecnicos | accesos Search Console, CMS | Media |
| `MED-006` | SEO Mensual | Media Planning y Performance | mes | Optimizacion continua y link building | Redaccion masiva de blogs (copywriting) | palabras clave objetivo, accesos CMS | Media |
| `MED-007` | Local SEO | Media Planning y Performance | proyecto | Optimizacion de Google Business Profile | Resenas falsas, fotografia local | ubicacion, horario, fotos reales | Media |
| `BIZ-001` | Diagnostico de Madurez Digital | Consultoria de Negocio | diagnostico | Evaluacion 6 dimensiones y roadmap | Ejecucion del roadmap | data basica de la empresa, entrevistas | Consultoria |
| `BIZ-002` | Estrategia Go-to-Market | Consultoria de Negocio | proyecto | Estrategia de lanzamiento 90 dias | Ejecucion de la pauta/canales | propuesta de valor, producto, mercado | Consultoria |
| `BIZ-003` | Business Model Canvas | Consultoria de Negocio | taller | Taller y definicion del modelo de negocio | Plan de negocios financiero detallado | informacion financiera basica | Consultoria |
| `BIZ-004` | Taller de Design Thinking | Consultoria de Negocio | taller | Facilitacion de sesion de ideacion | Desarrollo del prototipo funcional | reto a resolver, equipo participante | Consultoria |
| `ECO-001` | Estrategia E-commerce | Commerce Avanzado | proyecto | Arquitectura y estrategia de tienda | Desarrollo de la tienda (Shopify/Web) | catalogo, pricing, logistica actual | Commerce |
| `ECO-002` | Optimizacion de Marketplace | Commerce Avanzado | proyecto | Setup/optimizacion en MELI/Amazon | Atencion al cliente directa | catalogo base, fotos, precios | Commerce |
| `ECO-003` | Social Commerce | Commerce Avanzado | proyecto | Setup Instagram/TikTok Shops | Gestion diaria del catalogo (sync) | catalogo de FB, cuenta de IG/TikTok | Commerce |
| `ECO-004` | CRO (Conversion Rate) | Commerce Avanzado | diagnostico | Auditoria de checkout y navegacion | Redeseno total de la web | acceso Analytics, heatmaps | Commerce |
| `CX-001` | Customer Journey Map | Customer Experience y CRM | proyecto | Mapeo de experiencia y pain points | Solucion a los pain points detectados | entrevistas a clientes, data de quejas | CX |
| `CX-002` | Implementacion CRM | Customer Experience y CRM | proyecto | Setup inicial (HubSpot/Brevo), pipelines | Licencias del CRM, integracion ERP | base de datos limpia, proceso de ventas | CX |
| `CX-003` | Email Marketing | Customer Experience y CRM | mes | Gestion de newsletters y flows | Redaccion de +10 emails mensuales | base de datos, linea grafica, promos | CX |
| `CX-004` | Programa de Fidelizacion | Customer Experience y CRM | proyecto | Mecanica, niveles y unidad economica | Software de fidelizacion complejo | ticket promedio, frecuencia de compra | CX |
| `CX-005` | Auditoria CX | Customer Experience y CRM | diagnostico | Medicion de NPS, CSAT, CES | Encuestas telefonicas masivas | base de clientes, software de encuestas | CX |
| `CNT-001` | Estrategia de Contenidos | Content Strategy y Copy | proyecto | Sistema editorial con pilares, territorios y calendario base | Produccion completa de piezas salvo acuerdo | objetivo de negocio, audiencia, canales, oferta | Contenido |
| `CNT-002` | Brand Voice System | Content Strategy y Copy | proyecto | Tono de voz, do/don't, lexicon y ejemplos por canal | Rebranding visual o reposicionamiento completo salvo acuerdo | atributos de marca, audiencia, ejemplos actuales | Contenido |
| `CNT-003` | Arquitectura de Mensajes | Content Strategy y Copy | proyecto | Jerarquia de mensajes, claims y proof points | Campana creativa completa o manual visual | propuesta de valor, diferenciadores, oferta, audiencia | Estrategia/Contenido |
| `IMK-001` | Estrategia de Influencer Marketing | Influencer Marketing | proyecto | Estrategia de creators, criterios de seleccion y KPIs | Negociacion contractual compleja salvo acuerdo | objetivo, audiencia, presupuesto, categoria | Influencer |
| `IMK-002` | Gestion de Campana con Creadores | Influencer Marketing | campana | Coordinacion de briefs, entregables y seguimiento | Pago a talentos y pauta adicional salvo acuerdo | shortlist, calendario, entregables, budget | Influencer |
| `IMK-003` | Creator Sourcing y Outreach | Influencer Marketing | lote/proyecto | Busqueda, shortlist y contacto inicial con creadores | Cierre legal o administracion completa de contratos | categoria, audiencia, territorio, tono de marca | Influencer |
| `EXP-001` | Concepto de Evento o Activacion | Experiential y Eventos | proyecto | Concepto estrategico de evento o activacion | Produccion tecnica o logistica final salvo acuerdo | objetivo, audiencia, formato, presupuesto | Experiential |
| `EXP-002` | Diseno de Experiencia y Run of Show | Experiential y Eventos | proyecto | Journey del asistente, agenda y momentos clave | Produccion fisica del evento salvo acuerdo | concepto, venue, agenda base, stakeholders | Experiential |
| `EXP-003` | Amplificacion de Evento | Experiential y Eventos | proyecto | Plan de contenido, PR y follow-up del evento | Compra de medios y cobertura ilimitada salvo acuerdo | objetivo, agenda, canales, activos disponibles | Experiential/Comunicacion |
| `HLT-001` | Estrategia Healthcare Marketing | Healthcare Marketing | proyecto | Estrategia de captacion etica y posicionamiento | Asesoria legal/regulatoria especializada | especialidad, paciente objetivo, servicios prioritarios | Healthcare |
| `HLT-002` | Embudo de Captacion de Pacientes | Healthcare Marketing | proyecto | Funnel por especialidad con puntos de confianza y conversion | Implementacion tecnologica completa salvo acuerdo | especialidad, canales, objeciones, conversion actual | Healthcare |
| `HLT-003` | Contenido Educativo para Pacientes | Healthcare Marketing | proyecto/mes | Sistema de contenido educativo para pacientes | Validacion clinica profunda por terceros salvo acuerdo | dudas frecuentes, especialidad, tono, canales | Healthcare/Contenido |
| `ESG-001` | Estrategia de Comunicacion ESG | Sostenibilidad y ESG | proyecto | Narrativa ESG con stakeholders y claims defendibles | Auditoria tecnica de sostenibilidad o certificacion | iniciativas, evidencia, stakeholders, objetivos | ESG |
| `ESG-002` | Reporte de Sostenibilidad Narrativo | Sostenibilidad y ESG | proyecto | Estructura y mensajeria para reporte o resumen ESG | Recoleccion completa de data o assurance externa | materialidad, datos base, stakeholders, hitos | ESG |
| `ESG-003` | Mensajeria para Stakeholders ESG | Sostenibilidad y ESG | proyecto | Adaptacion de mensajes ESG por audiencia | Reputacion reactiva o crisis compleja salvo acuerdo | audiencias, claims, evidencia, canal | ESG/Comunicacion |

## Reglas operativas de la matriz

- Todo servicio cotizable debe usar `service_code`.
- Toda proforma debe listar nombre exacto del servicio y, cuando sea posible, `service_code`.
- Si un requerimiento mezcla varias areas, se debe desglosar por multiples filas.
- Si algo no existe en esta matriz, no debe cotizarse como servicio estandar sin revision interna.
