---
id: MAN-DEV-001
name: Stack Tecnológico Live Developer
category: Desarrollo de Software y Apps
discipline: Desarrollo de Software
type: guia-maestra
version: 1.0.0
related_services: ["DEV-001", "DEV-002", "DEV-003", "DEV-004", "DEV-005", "DEV-006", "DEV-007", "DEV-008", "DEV-009", "DEV-010"]
related_agents: ["ArquitectoSoftware", "TechLeadFullStack", "DevOpsEngineer"]
related_prompts: ["DEV-001", "DEV-002"]
source_of_truth: true
tags: [stack, tecnologias, frontend, backend, database]
legacy_id: MAN-DEV-001
migrated_from: base/masters/manuales-desarrollo/stack_tecnologico.md
---

# Pila Tecnológica (Stack)

## Resumen
Este manual define las tecnologías, marcos de trabajo (*frameworks*) y herramientas estándares que Live Developer emplea en cada proyecto, garantizando consistencia arquitectónica, calidad técnica y eficiencia operativa.

---

## Sección 1: Frontend

### Marcos de Trabajo de Interfaz (UI Frameworks)

#### React (Estándar Recomendado)
**Criterios de uso:**
- Aplicaciones de una sola página (SPA).
- Interfaces altamente interactivas y dinámicas.
- Sistemas con gestión de estado compleja.

**Pila recomendada:**
- **Núcleo**: React 18+, TypeScript 5+.
- **Enrutamiento (Routing)**: React Router 6+ o Next.js App Router.
- **Gestión de Estado**: Zustand (estado global ligero) y TanStack Query (estado del servidor).
- **Formularios y Validación**: React Hook Form y Zod.
- **Estilos**: Tailwind CSS (prioritario) o Styled Components.

---

### Marcos de Trabajo Full-stack

#### Next.js
**Criterios de uso:**
- El SEO y el rendimiento de carga inicial son críticos.
- Necesidad de renderizado del lado del servidor (SSR) o generación de sitios estáticos (SSG).
- Integración nativa de API Routes.

---

## Sección 2: Backend

### Node.js / TypeScript

#### Express.js (Versatilidad)
Ideal para servicios tradicionales, microservicios rápidos y middleware de integración.

#### Fastify (Alto Rendimiento)
Recomendado para APIs con alta concurrencia y requisitos críticos de latencia.

#### NestJS (Estructura Enterprise)
Obligatorio para proyectos de gran escala que requieran una arquitectura estricta, modularidad y uso de inyección de dependencias nativa.

---

### Python

#### FastAPI (Recomendado)
Pila de referencia para servicios modernos basados en Python por su validación automática mediante Pydantic y soporte nativo de operaciones asíncronas.

#### Django / Django REST Framework
Reservado para proyectos que se beneficien de su panel administrativo integrado, ORM robusto y ecosistema de seguridad maduro.

---

## Sección 3: Gestión de Datos

### Bases de Datos Relacionales (SQL)
- **PostgreSQL**: Opción preferente por su robustez, soporte de tipos JSONB y capacidades avanzadas de indexación.

### Bases de Datos NoSQL
- **Redis**: Empleada exclusivamente para caché de alto rendimiento, gestión de sesiones y limitación de tasa (*rate limiting*).
- **MongoDB**: Evaluada para casos específicos con esquemas de datos altamente flexibles y documentos complejos.

---

## Sección 4: Proveedores de Nube e Infraestructura

### AWS (Infraestructura Principal)
Servicios críticos empleados:
- **EC2 / ECS / EKS**: Cómputo y gestión de contenedores.
- **RDS**: Bases de datos gestionadas.
- **S3**: Almacenamiento de objetos.
- **CloudFront**: Red de entrega de contenido (CDN).

---

## Sección 5: Herramientas de Desarrollo

### Contenedorización
Todo servicio debe ser contenedorizado mediante **Docker** para asegurar la paridad entre los entornos de desarrollo, pre-producción y producción.

### Calidad de Código
- **ESLint / Prettier**: Análisis estático y formateo obligatorio.
- **GitHub Actions**: Automatización de CI/CD para pruebas y despliegues.

---

## Sección 6: Configuración por Tipo de Proyecto

| Tipo de Proyecto | Pila Tecnológica Sugerida |
|------------------|---------------------------|
| **MVP / Startup** | React + FastAPI + PostgreSQL |
| **Enterprise App** | Next.js + NestJS + AWS |
| **E-commerce** | Next.js + Node.js + Stripe |
| **Mobile App** | React Native o Flutter + FastAPI |

---

## Checklist de Inicio de Proyecto

- [ ] Versiones de lenguajes y herramientas fijadas en archivos de configuración.
- [ ] Estructura de directorios alineada con el manual de estándares.
- [ ] Configuración de Docker validada para el entorno local.
- [ ] Documentación inicial de la API proyectada (OpenAPI).
- [ ] Pipeline de integración continua configurado y funcional.
