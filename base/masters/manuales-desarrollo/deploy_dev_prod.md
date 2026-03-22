---
id: MAN-DEV-003
name: Despliegue y Entornos
category: Desarrollo de Software y Apps
discipline: Desarrollo de Software
type: tecnico
---

# Despliegue y Entornos

## Resumen
Este manual define los procesos, estrategias y mejores prácticas para el despliegue de aplicaciones en diferentes entornos, asegurando entregas confiables, seguras y con capacidad de reversión (*rollback*) en Live Developer.

---

## Sección 1: Entornos

### Definición de Entornos

```
Desarrollo → Staging → Producción
   (local)    (QA)      (en vivo)
```

#### Desarrollo (Dev)
| Característica | Descripción |
|----------------|-------------|
| **Propósito** | Desarrollo activo y pruebas locales. |
| **Datos** | Datos de prueba, objetos simulados (*mocks*). |
| **Acceso** | Desarrolladores. |
| **Estabilidad** | Variable, puede contener errores. |
| **URL típica** | `localhost:3000` o `dev.livedev.internal`. |

#### Staging (Pre-producción)
| Característica | Descripción |
|----------------|-------------|
| **Propósito** | Pruebas de QA y demostraciones al cliente. |
| **Datos** | Réplica anonimizada de los datos de producción. |
| **Acceso** | Equipo interno, QA y Cliente. |
| **Estabilidad** | Estable, replica fielmente el entorno de producción. |
| **URL típica** | `staging.app.com`. |

#### Producción (Prod)
| Característica | Descripción |
|----------------|-------------|
| **Propósito** | Entorno real para usuarios finales. |
| **Datos** | Datos reales; respaldos (*backups*) obligatorios. |
| **Acceso** | Solo lectura para desarrolladores; despliegues automatizados. |
| **Estabilidad** | Máxima estabilidad requerida. |
| **URL típica** | `app.com`. |

### Configuración por Entorno
```javascript
// config/environments.js
const environments = {
  development: {
    debug: true,
    logLevel: 'debug',
    database: { host: 'localhost', ssl: false },
    cache: { enabled: false },
    cors: { origin: '*' }
  },
  
  staging: {
    debug: false,
    logLevel: 'info',
    database: { host: 'staging.db.com', ssl: true },
    cache: { enabled: true, ttl: 300 },
    cors: { origin: ['https://staging.app.com'] }
  },
  
  production: {
    debug: false,
    logLevel: 'warn',
    database: { host: 'prod.db.com', ssl: true },
    cache: { enabled: true, ttl: 3600 },
    cors: { origin: ['https://app.com'] }
  }
};

module.exports = environments[process.env.NODE_ENV || 'development'];
```

---

## Sección 2: Pipelines de CI/CD

### GitHub Actions (Recomendado)

#### Pipeline básico (Node.js)
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Configuración de Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Instalación de dependencias
        run: npm ci
      
      - name: Ejecución del linter
        run: npm run lint
      
      - name: Ejecución de pruebas
        run: npm test
        env:
          CI: true
      
      - name: Construcción (Build)
        run: npm run build
      
      - name: Carga de cobertura (Coverage)
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Despliegue en Staging
        run: |
          echo "Desplegando en staging..."
          # Comandos de despliegue
      
  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Despliegue en Producción
        run: |
          echo "Desplegando en producción..."
          # Comandos de despliegue
```

#### Pipeline con aprobación manual
```yaml
  deploy-production:
    needs: [test, deploy-staging]
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://app.com
    steps:
      - name: Espera de aprobación
        run: echo "Esperando aprobación manual..."
      
      - name: Despliegue
        run: ./scripts/deploy.sh production
```

### GitLab CI
```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: node:20-alpine
  script:
    - npm ci
    - npm run lint
    - npm test
  only:
    - merge_requests
    - main
    - develop

deploy_staging:
  stage: deploy
  script:
    - ./deploy.sh staging
  environment:
    name: staging
    url: https://staging.app.com
  only:
    - develop

deploy_production:
  stage: deploy
  script:
    - ./deploy.sh production
  environment:
    name: production
    url: https://app.com
  when: manual
  only:
    - main
```

---

## Sección 3: Estrategias de Despliegue

### Despliegue Progresivo (Rolling Deployment)
```
Tiempo →

v1.0  [A] [A] [A] [A] [A]
v1.1      [B] [B] [B] [B] [B]
          └─ Reemplazo gradual de instancias
```

**Características:**
- Reemplaza las instancias una a una.
- No genera tiempo de inactividad (*zero downtime*).
- La reversión (*rollback*) puede ser lenta.
- **Uso recomendado:** Actualizaciones menores y correcciones rápidas (*hotfixes*).

```bash
# Actualización progresiva en Kubernetes
kubectl set image deployment/app app=app:v1.1 --record
kubectl rollout status deployment/app
```

### Despliegue Blue-Green
```
        ┌─────────────┐
   ┌────→   BLUE      │ ← Producción (v1.0)
   │    │ (en vivo)   │
LB │    └─────────────┘
   │    ┌─────────────┐
   └────→   GREEN     │ ← Staging (v1.1)
        │ (preparado) │
        └─────────────┘
        
# Transición: Cambiar el balanceador de carga (LB) a GREEN
```

**Características:**
- Coexisten dos entornos idénticos.
- El cambio entre versiones es instantáneo.
- La reversión es inmediata en caso de fallo.
- Requiere duplicar la infraestructura.
- **Uso recomendado:** Lanzamientos mayores y cambios críticos de arquitectura.

```bash
# AWS CodeDeploy Blue-Green
aws deploy create-deployment \
  --application-name my-app \
  --deployment-group-name blue-green \
  --revision revisionType=AppSpecContent
```

### Despliegue Canary
```
Tiempo →

100% v1.0  [A] [A] [A] [A] [A] [A] [A] [A] [A] [A]
90/10      [A] [A] [A] [A] [A] [A] [A] [A] [B] [B]
70/30      [A] [A] [A] [A] [A] [A] [B] [B] [B] [B]
50/50      [A] [A] [A] [A] [A] [B] [B] [B] [B] [B]
0/100      [B] [B] [B] [B] [B] [B] [B] [B] [B] [B]
```

**Características:**
- Despliegue gradual a un porcentaje específico de usuarios.
- Monitoreo continuo de métricas de salud.
- Reversión automática si se detectan errores.
- **Uso recomendado:** Nuevas funcionalidades de alto impacto o pruebas A/B.

```yaml
# Kubernetes Canary con Flagger
apiVersion: flagger.app/v1beta1
kind: Canary
metadata:
  name: app
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: app
  service:
    port: 80
  analysis:
    interval: 30s
    threshold: 5
    maxWeight: 50
    stepWeight: 10
    metrics:
      - name: request-success-rate
        thresholdRange:
          min: 99
      - name: request-duration
        thresholdRange:
          max: 500
```

### Banderas de Funcionalidad (Feature Flags)
```javascript
// Despliegue de código manteniendo la funcionalidad oculta
if (featureFlags.isEnabled('new-checkout', user.id)) {
  return <NewCheckout />;
}
return <OldCheckout />;
```

**Herramientas recomendadas:**
- LaunchDarkly.
- Unleash.
- Flagsmith.
- Configuraciones persistidas en base de datos.

---

## Sección 4: Reversión (Rollback)

### Estrategias de Reversión

#### Reversión por Etiqueta (Git Tag)
```bash
# Identificar la última versión estable
git tag -l "v*" | sort -V | tail -5

# Reversión a una versión anterior
git checkout v1.2.3

# O creación de una rama de hotfix para la reversión
git checkout -b hotfix/rollback v1.2.3
```

#### Reversión en Docker
```bash
# Listado de versiones anteriores
docker images | grep myapp

# Reversión inmediata mediante contenedores
docker-compose up -d --no-deps --build app

# Reversión en Kubernetes
kubectl rollout undo deployment/app
kubectl rollout undo deployment/app --to-revision=3
```

#### Reversión de Base de Datos
```bash
# Respaldo antes de ejecutar migraciones
pg_dump -h dbhost -U user dbname > backup_$(date +%Y%m%d_%H%M%S).sql

# Reversión de migraciones (ejemplo con Prisma)
npx prisma migrate resolve --rolled-back "20231201120000_migration_name"
```

### Criterios para Reversión Automática
```yaml
# Ejemplo de configuración para reversión automática en Canary
automatedRollback:
  triggers:
    - metric: error_rate
      threshold: "> 5%"
      duration: 2m
    - metric: response_time_p95
      threshold: "> 1000ms"
      duration: 5m
    - metric: cpu_usage
      threshold: "> 80%"
      duration: 3m
```

---

## Sección 5: Docker y Contenedorización

### Dockerfile de Producción (Multi-stage Build)
```dockerfile
# Etapa de construcción
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa de producción
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Creación de usuario sin privilegios de root (seguridad)
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./

USER nodejs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "dist/main.js"]
```

---

## Sección 6: Monitoreo Post-Despliegue

### Verificaciones de Salud (Health Checks)
```javascript
// Endpoints de verificación para Express
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version
  });
});

app.get('/ready', async (req, res) => {
  // Verificación de dependencias críticas
  const checks = await Promise.all([
    checkDatabase(),
    checkRedis(),
    checkExternalAPI()
  ]);
  
  const allHealthy = checks.every(c => c.healthy);
  
  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? 'ready' : 'not ready',
    checks: checks
  });
});
```

### Métricas Clave a Monitorear

| Métrica | Umbral de Alerta | Acción Recomendada |
|---------|-------------------|--------|
| Tasa de Errores (*Error Rate*) | > 1% | Generar alerta e investigar registros. |
| Tasa de Errores (*Error Rate*) | > 5% | Ejecutar reversión automática. |
| Tiempo de Respuesta (p95) | > 500ms | Escalar recursos de infraestructura. |
| Tiempo de Respuesta (p95) | > 1000ms | Considerar la reversión de la versión. |
| Uso de CPU | > 80% | Activar escalado automático (*Auto-scaling*). |
| Uso de Memoria | > 85% | Alerta por posible fuga de memoria (*memory leak*). |

---

## Sección 7: Checklist de Despliegue

### Pre-despliegue
- [ ] Pruebas superadas (unitarias, integración, E2E).
- [ ] Revisión de código (*Code Review*) aprobada.
- [ ] Análisis de vulnerabilidades de seguridad completado.
- [ ] Variables de entorno configuradas correctamente.
- [ ] Migraciones de base de datos validadas.
- [ ] Respaldo actualizado de la base de datos de producción.
- [ ] Plan de reversión (*rollback*) definido y comunicado.

### Despliegue
- [ ] Despliegue ejecutado en Staging satisfactoriamente.
- [ ] Pruebas de humo (*Smoke tests*) en Staging superadas.
- [ ] Verificación de registros (*logs*) sin errores críticos.
- [ ] Métricas de rendimiento estables.
- [ ] Despliegue en Producción (con autorización pertinente).
- [ ] Monitoreo activo de métricas durante los primeros 30 minutos.

### Post-despliegue
- [ ] Funcionalidades críticas verificadas en vivo.
- [ ] Equipo y cliente notificados del lanzamiento.
- [ ] Cambios documentados en el historial de cambios (*changelog*).
- [ ] Eliminación de ramas y banderas de funcionalidad obsoletas.

---

## Recursos Adicionales

- [The Twelve-Factor App](https://12factor.net/)
- [Documentación oficial de Kubernetes](https://kubernetes.io/docs/)
- [Mejores prácticas de Docker](https://docs.docker.com/develop/dev-best-practices/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Google SRE Book](https://sre.google/books/)
