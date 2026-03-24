---
id: MAN-DEV-003
name: Despliegue y Entornos
category: Desarrollo de Software y Apps
discipline: Desarrollo de Software
type: operativo
version: 1.0.0
related_services: ["DEV-001", "DEV-002", "DEV-003"]
related_agents: ["DevOpsEngineer", "TechLeadFullStack"]
related_prompts: []
source_of_truth: true
tags: [deploy, devops, ci-cd, docker, kubernetes]
legacy_id: MAN-DEV-003
migrated_from: base/masters/manuales-desarrollo/deploy_dev_prod.md
---

# Despliegue y Entornos

## Resumen
Este manual define los procesos, estrategias y mejores prácticas para el despliegue de aplicaciones en diferentes entornos, asegurando entregas confiables, seguras y con capacidad de reversión (*rollback*) en Live Developer.

---

## Sección 1: Entornos

```
Desarrollo → Staging → Producción
   (local)    (QA)      (en vivo)
```

| Característica | Desarrollo | Staging | Producción |
|----------------|-----------|---------|-----------|
| **Propósito** | Desarrollo activo y pruebas locales | Pruebas de QA y demostraciones | Entorno real para usuarios finales |
| **Datos** | Datos de prueba, objetos simulados | Réplica anonimizada de producción | Datos reales; respaldos obligatorios |
| **Acceso** | Desarrolladores | Equipo interno, QA y Cliente | Solo lectura para desarrolladores |
| **Estabilidad** | Variable | Estable | Máxima estabilidad requerida |

---

## Sección 2: Pipelines de CI/CD

### GitHub Actions (Recomendado)

Pipeline básico (Node.js):
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

---

## Sección 3: Estrategias de Despliegue

### Despliegue Progresivo (Rolling Deployment)
- Reemplaza las instancias una a una.
- No genera tiempo de inactividad (*zero downtime*).
- **Uso:** Actualizaciones menores y hotfixes.

### Despliegue Blue-Green
- Coexisten dos entornos idénticos.
- El cambio entre versiones es instantáneo.
- La reversión es inmediata.
- **Uso:** Lanzamientos mayores y cambios críticos.

### Despliegue Canary
- Despliegue gradual a un porcentaje específico de usuarios.
- Monitoreo continuo de métricas de salud.
- **Uso:** Nuevas funcionalidades de alto impacto.

---

## Sección 4: Docker y Contenedorización

Dockerfile de Producción (Multi-stage Build):
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:3000/health
CMD ["node", "dist/main.js"]
```

---

## Sección 5: Checklist de Despliegue

### Pre-despliegue
- [ ] Pruebas superadas (unitarias, integración, E2E).
- [ ] Revisión de código (*Code Review*) aprobada.
- [ ] Variables de entorno configuradas correctamente.
- [ ] Respaldo actualizado de la base de datos.
- [ ] Plan de reversión (*rollback*) definido.

### Despliegue
- [ ] Despliegue en Staging satisfactorio.
- [ ] Pruebas de humo (*Smoke tests*) superadas.
- [ ] Métricas de rendimiento estables.

### Post-despliegue
- [ ] Funcionalidades críticas verificadas en vivo.
- [ ] Equipo y cliente notificados.
- [ ] Cambios documentados en *changelog*.

---

## Recursos Adicionales

- [The Twelve-Factor App](https://12factor.net/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Google SRE Book](https://sre.google/books/)
