# Docker Cheatsheet - Live Developer

## 🚀 Inicio Rápido

```bash
# Iniciar
docker-compose -f app/docker/docker-compose.direct.yml up -d

# O con alias (ver docker-aliases.sh)
ld-up
```

## 📊 Comandos Esenciales

| Acción | Comando |
|--------|---------|
| **Estado** | `docker-compose -f app/docker/docker-compose.direct.yml ps` |
| **Logs** | `docker-compose -f app/docker/docker-compose.direct.yml logs -f` |
| **Detener** | `docker-compose -f app/docker/docker-compose.direct.yml down` |
| **Reiniciar** | `docker-compose -f app/docker/docker-compose.direct.yml restart` |

## 📝 Alias Recomendados

Agrega a `~/.zshrc`:

```bash
source /Users/dcalisaya/Developer/Prompts/scripts/docker-aliases.sh
```

Luego usa:
- `ld-up` - Iniciar
- `ld-down` - Detener
- `ld-logs` - Logs
- `ld-status` - Estado
- `ld-url` - Abrir WebUI

## 💾 Backup

```bash
./scripts/backup-docker.sh
```

Crea backup en `backups/YYYYMMDD_HHMMSS/` con:
- Datos de Open WebUI
- Configuraciones Docker
- Lista de modelos

## 🔍 Troubleshooting

```bash
# Puerto ocupado
lsof -i :3000

# Espacio en disco
docker system df
docker system prune -f

# Reset completo (⚠️ pierde datos)
docker-compose -f app/docker/docker-compose.direct.yml down -v
```

## 🌐 URLs

| Servicio | URL |
|----------|-----|
| Open WebUI | http://localhost:3000 |
| Ollama API | http://localhost:11434 |

## 🐳 Docker Compose Files

| Archivo | Uso |
|---------|-----|
| `docker-compose.direct.yml` | **Actual** - Directo a Ollama |
| `docker-compose.simple.yml` | Con PostgreSQL (LiteLLM) |
| `docker-compose.cloud.yml` | Stack cloud (APIs) |

## 📚 Documentación Completa

- `DOCKER-GUIDE.md` - Guía completa
- `SETUP-DIRECTO.md` - Setup actual
- `SETUP-KNOWLEDGE.md` - Configurar knowledge base
