# Fases y Bloques de Ejecución: Web Live Developer

**Objetivo del documento:** Definir la secuencia de ejecución del proyecto web institucional de Live Developer en fases y bloques trazables, con criterios claros de salida entre etapas.

## Fase 0: Normalización y Cierre Estratégico

### Bloque 0A. Higiene documental
- Eliminar borradores residuales, referencias a proyectos ajenos y documentos obsoletos.
- Confirmar que `projects/web-live-developer/` contiene solo documentación vigente.
- Verificar que ningún documento derivado se presente como fuente de verdad.

### Bloque 0B. Decisión arquitectónica
- Confirmar Astro como stack base.
- Confirmar `projects/web-live-developer/site/` como raíz técnica del proyecto.
- Definir alcance exacto de uso de React como capa de islas.

### Bloque 0C. Aprobación funcional
- Validar brief, sitemap, UI system, flujo de conversión y mapeo de servicios.
- Cerrar vacíos críticos: fecha objetivo, endpoint de captura, contenido bilingüe, activos visuales.

### Criterio de salida Fase 0
- Documentación alineada.
- Stack aprobado.
- Ruta técnica aprobada.
- Sin residuos heredados.

## Fase 1: Base Técnica del Proyecto

### Bloque 1A. Bootstrap del sitio
- Crear `projects/web-live-developer/site/`.
- Inicializar Astro con TypeScript.
- Configurar estructura inicial de layouts, páginas y componentes.

### Bloque 1B. Sistema de estilos
- Instalar y configurar Tailwind CSS dentro del nuevo proyecto.
- Cargar fuentes y tokens definidos en `03-UI-DESIGN-SYSTEM.md`.
- Implementar dark/light mode con enfoque consistente y no ornamental.

### Bloque 1C. Capa de datos
- Definir el mecanismo para derivar data desde la base canónica.
- Crear script o proceso que consuma servicios y categorías sin romper la fuente oficial.
- Establecer contratos de datos para categorías, servicios, CTA y navegación.

### Criterio de salida Fase 1
- Proyecto compila.
- Layout base operativo.
- Tokens visuales implementados.
- Datos canónicos disponibles en formato consumible.

## Fase 2: Arquitectura de Contenido y Navegación

### Bloque 2A. Home institucional
- Construir la Home con la narrativa "Razón + Emoción".
- Implementar hero, propuesta de valor, selector de áreas y rutas principales.

### Bloque 2B. Áreas y categorías
- Construir navegación por Tecnología, Creatividad y Consultoría.
- Crear páginas de categoría con estructura uniforme y CTA contextuales.

### Bloque 2C. Servicios y páginas comunes
- Crear páginas o vistas por servicio según el modelo definido.
- Implementar `contacto`, `gracias`, `casos` y demás páginas comunes.

### Criterio de salida Fase 2
- Navegación completa.
- Páginas principales renderizadas.
- Coherencia entre taxonomía, rutas y contenido.

## Fase 3: Conversión, Integraciones y Medición

### Bloque 3A. Captación de leads
- Implementar formulario de contacto.
- Definir validación, payload y persistencia de contexto de navegación.

### Bloque 3B. Tracking y analítica
- Configurar GA4, GTM y captura de UTM.
- Medir selección de áreas, visitas a categorías y envíos de formularios.

### Bloque 3C. Integración operativa
- Conectar formulario con endpoint o webhook.
- Integrar entrega al CRM y respuesta automática.

### Criterio de salida Fase 3
- Conversión funcional de punta a punta.
- Eventos medidos correctamente.
- Payload operativo validado.

## Fase 4: QA, Performance y Lanzamiento

### Bloque 4A. QA funcional
- Probar formularios, navegación, estados vacíos, responsive y accesibilidad base.
- Revisar consistencia de contenido, etiquetas y CTA.

### Bloque 4B. SEO y rendimiento
- Validar metadatos, sitemap, enlaces internos y headings.
- Optimizar LCP, imágenes, fuentes y carga de JavaScript.

### Bloque 4C. Preparación de salida
- Checklist final de lanzamiento.
- Documentación de operación y mantenimiento.
- Handoff técnico y comercial.

### Criterio de salida Fase 4
- Sitio listo para publicación.
- QA aprobado.
- Tracking y SEO validados.
- Handoff completado.

## Regla de Gobernanza

- Ninguna fase inicia sin criterio de salida cumplido de la anterior.
- Todo cambio de alcance debe reflejarse primero en la documentación de `projects/web-live-developer/`.
- La base canónica permanece en `base/masters/`; esta carpeta solo registra la ejecución del proyecto.

## Acción Requerida

- Usar este documento como secuencia oficial para planificar las siguientes tareas del proyecto.
