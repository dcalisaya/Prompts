# Comandos Docker para Live Developer

## Verificar tu instalación

```bash
# Ver versión de Docker
docker --version
docker-compose --version  # formato antiguo
docker compose version    # formato nuevo

# Script de verificación
./scripts/docker-check.sh
```

## Comandos según tu versión

### Si tienes `docker-compose` (formato antiguo con guión)

```bash
cd app/docker

# Levantar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down

# Reiniciar
docker-compose restart
```

### Si tienes `docker compose` (formato nuevo sin guión)

```bash
cd app/docker

# Levantar
docker compose up -d

# Ver logs
docker compose logs -f

# Detener
docker compose down

# Reiniciar
docker compose restart
```

### Script automático (detecta la versión)

```bash
./scripts/start-stack.sh
```

## Instalar Docker Compose si falta

```bash
# Opción 1: Con Docker Desktop (incluye docker-compose)
brew install --cask docker

# Opción 2: Solo CLI con Colima
brew install colima docker docker-compose

# Opción 3: Plugin de Docker (formato nuevo)
docker plugin install docker-compose
```

## Troubleshooting

### "docker compose up -d: unknown shorthand flag"

Tu versión de Docker no incluye el plugin compose. Soluciones:

**Opción A: Usar docker-compose (con guión)**
```bash
docker-compose up -d
```

**Opción B: Instalar plugin compose**
```bash
# En Mac con Homebrew
brew install docker-compose

# O manualmente
mkdir -p ~/.docker/cli-plugins
curl -L https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-darwin-arm64 -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose
```

**Opción C: Usar Colima (recomendado)**
```bash
brew install colima docker docker-compose
colima start
docker-compose up -d
```

## Alias útil

Agrega a tu `~/.zshrc` o `~/.bashrc`:

```bash
# Alias para docker compose
dc() {
    if docker compose version &>/dev/null; then
        docker compose "$@"
    else
        docker-compose "$@"
    fi
}

# Uso
cd app/docker
dc up -d
dc logs -f
dc down
```
