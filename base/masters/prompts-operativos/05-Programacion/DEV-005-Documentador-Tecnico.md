---
id: DEV-005
name: Documentador Técnico
category: Desarrollo de Software y Apps
agent_core: TechLeadFullStack
source_of_truth:
- manuales-desarrollo/arquitectura_base.md
- manuales-desarrollo/estandares_codigo.md
- manuales-desarrollo/stack_tecnologico.md
version: 1.0.0
discipline: Desarrollo de Software
related_services:
- DEV-001
- DEV-002
- DEV-003
- DEV-004
- DEV-005
- DEV-006
stage: engineering
input_type: requerimiento funcional o tecnico
deliverable_type: especificacion, arquitectura, estimacion, codigo o testing
---

# DEV-005: Documentador Técnico

**Objetivo:** Generar documentación técnica completa y profesional para proyectos de software, incluyendo READMEs, ADRs, documentación de APIs y guías de contribución.

**Descripción:** Este prompt crea documentación técnica de alta calidad adaptada al público objetivo (desarrolladores, DevOps, stakeholders). Genera READMEs estructurados, Architecture Decision Records, especificaciones OpenAPI, y guías de contribución que facilitan el onboarding y mantenimiento del proyecto.

## Contexto para el Usuario
Utiliza este prompt cuando necesites crear documentación para un nuevo proyecto, actualizar docs existentes tras cambios arquitectónicos, o estandarizar la documentación del equipo. Es esencial para proyectos que serán mantenidos por múltiples personas o durante largo tiempo.

## Cuando usar este prompt
- Inicio de proyecto: crear README y docs base
- Diseño arquitectónico: documentar decisiones (ADRs)
- Desarrollo de APIs: crear documentación OpenAPI/Swagger
- Onboarding de nuevos desarrolladores: guías de contribución
- Transferencia de proyecto: documentación de contexto
- Actualización post-refactorización

## Input necesario
**Tipo de documentación requerida:** Tipo (README/API docs/ADR/Guía) + información del proyecto (stack, arquitectura, APIs, decisiones) + audiencia objetivo.

## Output esperado
Documento técnico completo en formato markdown, listo para publicar en el repositorio o herramienta de documentación.

## Prompt

```
Actúa como un Technical Writer Senior con experiencia en documentación de software para equipos de desarrollo. Tu objetivo es crear documentación técnica clara, completa y útil.

## TIPO DE DOCUMENTACIÓN REQUERIDA
[TIPO: README / ADR / API_DOCS / GUIA_CONTRIBUCION / GUIA_DESPLIEGUE / RUNBOOK / OTRO]

## INFORMACIÓN DEL PROYECTO/CONTEXTO (Input)
[COPIAR AQUÍ LA INFORMACIÓN RELEVANTE]

---

## CONTEXTO ADICIONAL
- **Nombre del proyecto:** [Nombre]
- **Stack tecnológico:** [Lenguajes, frameworks, herramientas]
- **Arquitectura:** [Monolito/Microservicios/Serverless/etc.]
- **Audiencia objetivo:** [Devs nuevos / Devs externos / DevOps / Stakeholders]
- **Nivel de detalle requerido:** [Básico / Intermedio / Avanzado]
- **Ubicación del documento:** [Repo / Wiki / Confluence / docs/]
- **Formato de salida:** [Markdown / YAML / JSON]

---

## PLANTILLAS POR TIPO DE DOCUMENTACIÓN

### SI ES README PRINCIPAL DEL PROYECTO

```markdown
# [Nombre del Proyecto]

[Badge de build] [Badge de coverage] [Badge de versión]

> [One-liner descriptivo del propósito del proyecto]

## 🎯 Descripción

[Descripción más detallada del problema que resuelve y cómo lo resuelve]

### Características principales
- ✅ [Feature 1]
- ✅ [Feature 2]
- ✅ [Feature 3]

## 🚀 Instalación Rápida

### Prerrequisitos
- [Requisito 1] (versión X+)
- [Requisito 2]

### Instalación

```bash
# Clonar el repositorio
git clone [URL]
cd [directorio]

# Instalar dependencias
[comando]

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Ejecutar migraciones (si aplica)
[comando]

# Iniciar el proyecto
[comando]
```

## 📁 Estructura del Proyecto

```
.
├── [directorio]/          # [Propósito]
├── [directorio]/          # [Propósito]
└── ...
```

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción | Requerida | Default |
|----------|-------------|-----------|---------|
| `VAR_1`  | [Descripción] | Sí/No | [valor] |

### Configuración por Ambiente
- **Development:** [Instrucciones]
- **Staging:** [Instrucciones]
- **Production:** [Instrucciones]

## 🧪 Testing

```bash
# Ejecutar todos los tests
[comando]

# Tests con cobertura
[comando]

# Tests específicos
[comando]
```

## 📝 Guía de Uso

### [Caso de uso 1]
[Instrucciones con ejemplos de código]

### [Caso de uso 2]
[Instrucciones con ejemplos de código]

## 🤝 Contribución

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para guías de contribución.

## 📚 Documentación Adicional

- [Link a docs de API](./docs/api.md)
- [Link a ADRs](./docs/adrs/)
- [Link a Wiki]

## 📄 Licencia

[MIT/Apache/etc.] - ver [LICENSE](./LICENSE)

## 👥 Equipo/Mantenimiento

- [Nombre] - [Rol] - [Contacto]
```

### SI ES ARCHITECTURE DECISION RECORD (ADR)

```markdown
# ADR-[NNN]: [Título corto de la decisión]

- **Estado:** Proposed / Accepted / Deprecated / Superseded by ADR-XXX
- **Fecha:** [YYYY-MM-DD]
- **Autor(es):** [Nombre(s)]
- **Stakeholders:** [Personas/grupos consultados]

## Contexto y Problema

[Descripción del problema que motiva esta decisión]
[Contexto técnico, de negocio o de equipo relevante]

## Opciones Consideradas

### Opción 1: [Nombre]
**Descripción:** [Qué es y cómo funciona]
**Pros:**
- [Beneficio 1]
- [Beneficio 2]
**Contras:**
- [Desventaja 1]
- [Desventaja 2]

### Opción 2: [Nombre]
**Descripción:** [Qué es y cómo funciona]
**Pros:**
- [Beneficio 1]
**Contras:**
- [Desventaja 1]
- [Desventaja 2]

### Opción 3: [Nombre]
...

## Decisión

**Decidimos:** [Opción elegida]

**Justificación:**
[Explicación de por qué se eligió esta opción sobre las demás]

**Consecuencias:**
- ✅ **Positivas:** [Beneficios que obtendremos]
- ⚠️ **Negativas:** [Trade-offs que aceptamos]
- 🔄 **Migración:** [Pasos necesarios para migrar si aplica]

## Implicaciones

### Técnicas
- [Impacto en arquitectura]
- [Nuevas dependencias]
- [Cambios en infraestructura]

### De equipo
- [Curva de aprendizaje]
- [Cambios en procesos]

### De negocio
- [Costos]
- [Timeline impactado]

## Notas de Implementación

[Detalles específicos de cómo se implementó o se implementará]

## Referencias

- [Link a documentación relevante]
- [Link a discusión/spike]
- [Link a benchmarks comparativos]
```

### SI ES DOCUMENTACIÓN DE API (OpenAPI/Swagger)

```yaml
openapi: 3.0.3
info:
  title: [Nombre API]
  description: |
    [Descripción de la API]
    
    ## Autenticación
    [Explicación del método de auth]
    
  version: 1.0.0
  contact:
    name: [Nombre equipo]
    email: [email]

servers:
  - url: https://api.ejemplo.com/v1
    description: Production
  - url: https://staging-api.ejemplo.com/v1
    description: Staging

paths:
  /recurso:
    get:
      summary: [Resumen de la operación]
      description: [Descripción detallada]
      tags:
        - [Categoría]
      parameters:
        - name: param1
          in: query
          description: [Descripción]
          required: false
          schema:
            type: string
            example: "valor-ejemplo"
      responses:
        '200':
          description: Éxito
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ResponseModel'
              example:
                campo: "valor"
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/InternalError'

components:
  schemas:
    [Modelo]:
      type: object
      properties:
        campo:
          type: string
          description: [Descripción]
      required:
        - campo
        
  responses:
    BadRequest:
      description: Solicitud inválida
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```

### SI ES GUÍA DE CONTRIBUCIÓN

```markdown
# Guía de Contribución

¡Gracias por tu interés en contribuir! Este documento describe el proceso y estándares para contribuir al proyecto.

## 📋 Proceso de Contribución

### 1. Antes de empezar
- [ ] Lee el [README](./README.md)
- [ ] Configura tu ambiente de desarrollo
- [ ] Familiarízate con la arquitectura (ver [ADRs](./docs/adrs/))

### 2. Crear un Issue (si aplica)
- Describe el bug o feature
- Incluye pasos para reproducir (bugs)
- Menciona el ambiente (OS, versión, etc.)

### 3. Flujo de Trabajo

```bash
# 1. Fork y clone
git clone [tu-fork]

# 2. Crear branch
git checkout -b tipo/descripcion-corta
# tipos: feature/, bugfix/, docs/, refactor/, test/

# 3. Commits
# Seguir conventional commits:
# feat: nueva característica
# fix: corrección de bug
# docs: documentación
# refactor: refactorización
# test: tests
# chore: tareas de mantenimiento

git commit -m "feat: agrega autenticación con OAuth"

# 4. Push y PR
git push origin feature/nueva-funcionalidad
# Crear PR siguiendo el template
```

## 📝 Estándares de Código

### Estilo
- [Linter/Formatter usado] debe pasar sin errores
- Máximo [X] líneas por función
- Nomenclatura: [camelCase/snake_case/etc.]

### Testing
- Cobertura mínima: [X]%
- Todos los tests deben pasar
- Incluir tests para casos edge

### Documentación
- Actualizar README si cambia la interfaz
- Documentar funciones públicas con [JSDoc/PyDoc/etc.]
- Actualizar CHANGELOG.md

## 🔍 Proceso de Code Review

Todo código debe ser revisado por al menos [X] reviewer(s):

### Checklist del autor
- [ ] Tests pasan localmente
- [ ] Linting pasa
- [ ] Documentación actualizada
- [ ] Commits son atómicos y descriptivos

### Checklist del reviewer
- [ ] Entiende el propósito del cambio
- [ ] Verifica que cumple requisitos
- [ ] Revisa tests
- [ ] Valida que no introduce deuda técnica

## 🏷️ Versionado

Seguimos [SemVer](https://semver.org/):
- MAJOR: breaking changes
- MINOR: features backwards compatible
- PATCH: bug fixes

## 🆘 Obtener Ayuda

- [Slack/Discord channel]
- [Email del equipo]
- Issues con label `question`

## 📜 Código de Conducta

Ver [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
```

---

Genera el documento técnico completo basado en el tipo seleccionado y la información proporcionada. El output debe ser production-ready, sin placeholders genéricos.
```

## Ejemplo de Uso

**Input ejemplo:**
"Tipo: ADR. Decisión entre usar PostgreSQL vs MongoDB para sistema de e-commerce. Contexto: equipo con experiencia en SQL, necesidad de transacciones ACID, modelo de datos relacional, pero posible crecimiento en catálogo de productos. Stack actual: Node.js."

**Output esperado:**
- ADR completo con estado "Accepted"
- Contexto: necesidad de consistencia en órdenes vs. flexibilidad de catálogo
- Opciones evaluadas: PostgreSQL, MongoDB, ambas (híbrido)
- Decisión: PostgreSQL con JSONB para atributos de productos
- Justificación: ACID para transacciones financieras, conocimiento del equipo, JSONB da flexibilidad
- Consecuencias: curva menor, consistencia garantizada, sharding más complejo si escala masivamente

## Notas de calidad
- [ ] El documento no tiene placeholders genéricos ([...])
- [ ] El contenido es específico al proyecto/contexto proporcionado
- [ ] La estructura sigue el template del tipo de documento
- [ ] La información es completa para el propósito del documento
- [ ] El lenguaje es claro y profesional
- [ ] Los ejemplos de código son sintácticamente correctos
- [ ] Las decisiones (en ADRs) incluyen trade-offs explícitos
- [ ] La documentación de API incluye ejemplos realistas
- [ ] Las guías de contribución son accionables
- [ ] El documento es mantenible (no información que cambie constantemente)
