# Guía Completa de Docker - Live Developer

Todo lo que necesitas saber para manejar el stack Docker.

## 📁 Estructura de Archivos Docker

```
app/docker/
├── docker-compose.direct.yml      # Stack actual (recomendado)
├── docker-compose.minimal.yml     # Con LiteLLM (sin DB)
├── docker-compose.simple.yml      # Con PostgreSQL
├── docker-compose.cloud.yml       # Stack cloud (APIs)
├── docker-compose.yml             # Original local
├── litellm-config.local.yaml      # Config modelos locales
├── litellm-config.yaml            # Config activa
└── litellm-config.cloud.yaml      # Config cloud
```

## 🚀 Comandos Básicos

### Iniciar el Stack

```bash
cd /Users/dcalisaya/Developer/Prompts/app/docker

# Stack actual (directo a Ollama)
docker-compose -f docker-compose.direct.yml up -d

# O usa el script
../../scripts/start-direct.sh
```

### Ver Estado

```bash
# Contenedores corriendo
docker-compose -f docker-compose.direct.yml ps

# Todos los contenedores (incluyendo parados)
docker-compose -f docker-compose.direct.yml ps -a

# Uso de recursos
docker stats
```

### Ver Logs

```bash
# Logs en tiempo real
docker-compose -f docker-compose.direct.yml logs -f

# Logs de Open WebUI
docker-compose -f docker-compose.direct.yml logs -f open-webui

# Últimas 100 líneas
docker-compose -f docker-compose.direct.yml logs --tail=100
```

### Detener y Reiniciar

```bash
# Detener (conserva datos)
docker-compose -f docker-compose.direct.yml down

# Detener y eliminar volúmenes (⚠️ pierde datos)
docker-compose -f docker-compose.direct.yml down -v

# Reiniciar contenedor específico
docker-compose -f docker-compose.direct.yml restart open-webui

# Recrear contenedores
docker-compose -f docker-compose.direct.yml up -d --force-recreate
```

## 💾 Backup y Restore

### Backup de Datos

```bash
cd /Users/dcalisaya/Developer/Prompts

# Crear directorio de backup
mkdir -p backups/$(date +%Y%m%d)

# Backup de volúmenes Docker
docker run --rm -v docker_open-webui-data:/data -v $(pwd)/backups/$(date +%Y%m%d):/backup alpine tar czf /backup/open-webui-data.tar.gz -C /data .

# Backup de configuraciones
cp -r app/docker backups/$(date +%Y%m%d)/
cp -r base/json backups/$(date +%Y%m%d)/

echo "Backup creado en: backups/$(date +%Y%m%d)/"
```

### Restore de Datos

```bash
# Detener contenedores
docker-compose -f app/docker/docker-compose.direct.yml down

# Restaurar volumen
docker run --rm -v docker_open-webui-data:/data -v $(pwd)/backups/20260319:/backup alpine sh -c "cd /data && tar xzf /backup/open-webui-data.tar.gz"

# Reiniciar
docker-compose -f app/docker/docker-compose.direct.yml up -d
```

## 🔄 Actualizar Imágenes

```bash
cd /Users/dcalisaya/Developer/Prompts/app/docker

# Descargar nuevas versiones
docker-compose -f docker-compose.direct.yml pull

# Reiniciar con nuevas imágenes
docker-compose -f docker-compose.direct.yml up -d

# Limpiar imágenes viejas
docker image prune -f
```

## 🔍 Troubleshooting

### "Port already in use"

```bash
# Ver qué usa el puerto
lsof -i :3000
lsof -i :4000

# Cambiar puerto en docker-compose.yml
# ports:
#   - "3001:8080"  # Cambiar 3000 a 3001
```

### "Cannot connect to Docker daemon"

```bash
# Verificar Docker Desktop/Colima está corriendo
docker info

# Si usas Colima
colima status
colima start
```

### Volumen lleno

```bash
# Ver uso de disco
docker system df

# Limpiar
docker system prune -f          # Contenedores/volúmenes no usados
docker volume prune -f          # Volúmenes no usados
docker image prune -f           # Imágenes no usadas
```

### Reset completo

```bash
# ⚠️ PELIGRO: Pierde TODOS los datos
docker-compose -f docker-compose.direct.yml down -v
docker volume rm docker_open-webui-data 2>/dev/null || true
docker-compose -f docker-compose.direct.yml up -d
```

## 🌐 Redes

```bash
# Ver redes
docker network ls

# Inspeccionar red del proyecto
docker network inspect docker_ld-network

# Conectar contenedor manualmente
docker network connect docker_ld-network <contenedor>
```

## 🛠️ Ejecutar Comandos en Contenedores

```bash
# Shell en Open WebUI
docker exec -it ld-openwebui /bin/bash

# Ver archivos
docker exec ld-openwebui ls -la /app/backend/data

# Ver variables de entorno
docker exec ld-openwebui env
```

## 📊 Monitoreo

```bash
# Uso de recursos en tiempo real
docker stats

# Logs con timestamp
docker-compose -f docker-compose.direct.yml logs -tf

# Health check
docker inspect --format='{{.State.Health.Status}}' ld-openwebui
```

## 🎯 Cambiar Configuración

### Modificar variables de entorno

Edita `docker-compose.direct.yml`:

```yaml
environment:
  - OLLAMA_BASE_URL=http://host.docker.internal:11434
  - ENABLE_SIGNUP=true
  - DEFAULT_LOCALE=es
  # Agregar nuevas variables aquí
```

Luego reinicia:
```bash
docker-compose -f docker-compose.direct.yml up -d
```

## 📝 Docker Compose de Referencia

### Stack Actual (Directo)

```bash
# Usar siempre este para tu setup actual
docker-compose -f docker-compose.direct.yml up -d
```

### Con LiteLLM (Futuro)

Si necesitas modelos cloud más adelante:

```bash
# Requiere PostgreSQL
docker-compose -f docker-compose.simple.yml up -d
```

## 🔐 Seguridad

```bash
# No exponer puertos a internet
# Solo localhost (ya configurado así)

# Ver contenedores expuestos
docker ps --format "table {{.Names}}\t{{.Ports}}"
```

## 📚 Alias Útiles (agregar a ~/.zshrc)

```bash
# Alias para Live Developer
alias ld-up='cd /Users/dcalisaya/Developer/Prompts/app/docker && docker-compose -f docker-compose.direct.yml up -d'
alias ld-down='cd /Users/dcalisaya/Developer/Prompts/app/docker && docker-compose -f docker-compose.direct.yml down'
alias ld-logs='cd /Users/dcalisaya/Developer/Prompts/app/docker && docker-compose -f docker-compose.direct.yml logs -f'
alias ld-ps='cd /Users/dcalisaya/Developer/Prompts/app/docker && docker-compose -f docker-compose.direct.yml ps'
alias ld-restart='cd /Users/dcalisaya/Developer/Prompts/app/docker && docker-compose -f docker-compose.direct.yml restart'
```

## ⚡ Comandos Rápidos

| Acción | Comando |
|--------|---------|
| Iniciar | `docker-compose -f docker-compose.direct.yml up -d` |
| Detener | `docker-compose -f docker-compose.direct.yml down` |
| Logs | `docker-compose -f docker-compose.direct.yml logs -f` |
| Reiniciar | `docker-compose -f docker-compose.direct.yml restart` |
| Estado | `docker-compose -f docker-compose.direct.yml ps` |
| Actualizar | `docker-compose -f docker-compose.direct.yml pull && docker-compose -f docker-compose.direct.yml up -d` |

---

**Stack actual:** Open WebUI → Ollama (directo)  
**Puertos:** 3000 (WebUI), 11434 (Ollama)
