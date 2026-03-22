# Fix - PostgreSQL Requerido para LiteLLM

## Problema

LiteLLM requiere PostgreSQL, no acepta SQLite.

Error:
```
error: Error validating datasource `client`: the URL must start with the protocol `postgresql://` or `postgres://`.
```

## Solución

El `docker-compose.simple.yml` ahora incluye PostgreSQL.

### Pasos para aplicar el fix:

```bash
cd /Users/dcalisaya/Developer/Prompts/app/docker

# 1. Detener y eliminar contenedores actuales
docker-compose -f docker-compose.simple.yml down -v

# 2. Levantar con nueva configuración (incluye PostgreSQL)
docker-compose -f docker-compose.simple.yml up -d

# 3. Verificar que todo está corriendo
docker-compose -f docker-compose.simple.yml ps

# 4. Ver logs
docker-compose -f docker-compose.simple.yml logs -f
```

### O usa el script actualizado:

```bash
cd /Users/dcalisaya/Developer/Prompts
./scripts/start-stack.sh
```

## Verificación

```bash
# Test LiteLLM
curl http://localhost:4000/health

# Test Open WebUI
curl http://localhost:3000

# Ver modelos
curl http://localhost:4000/v1/models
```

## Servicios incluidos

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| PostgreSQL | - | Base de datos para LiteLLM |
| LiteLLM | 4000 | Proxy de modelos |
| Open WebUI | 3000 | Interfaz web |

## Notas

- PostgreSQL corre **solo internamente** (no expone puerto)
- Los datos persisten en volumen Docker
- Para resetear: `docker-compose down -v`
