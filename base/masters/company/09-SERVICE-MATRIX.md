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

## Reglas operativas de la matriz

- Todo servicio cotizable debe usar `service_code`.
- Toda proforma debe listar nombre exacto del servicio y, cuando sea posible, `service_code`.
- Si un requerimiento mezcla varias areas, se debe desglosar por multiples filas.
- Si algo no existe en esta matriz, no debe cotizarse como servicio estandar sin revision interna.
