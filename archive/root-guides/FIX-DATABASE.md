# Fix - Problema de Base de Datos LiteLLM

## Problema

LiteLLM está configurado para usar **PostgreSQL** pero le estábamos pasando **SQLite**.

Error:
```
error: Error validating datasource `client`: the URL must start with the protocol `postgresql://` or `postgres://`.
```

## Solución

Usar la configuración simplificada sin base de datos persistente.

### Pasos para aplicar el fix:

```bash
cd /Users/dcalisaya/Developer/Prompts/app/docker

# 1. Detener contenedores actuales
docker-compose down

# 2. Limpiar volúmenes (opcional, para empezar limpio)
docker-compose down -v

# 3. Usar el nuevo docker-compose.simple.yml
docker-compose -f docker-compose.simple.yml up -d

# 4. Verificar
docker-compose -f docker-compose.simple.yml ps
curl http://localhost:4000/health
```

### O usa el script automático:

```bash
cd /Users/dcalisaya/Developer/Prompts
./scripts/start-stack.sh
```

El script ahora detecta y usa `docker-compose.simple.yml` automáticamente.

## Diferencias

| Versión | Base de Datos | Uso |
|---------|--------------|-----|
| `docker-compose.yml` | SQLite/PostgreSQL | Con persistencia |
| `docker-compose.simple.yml` | En memoria | Setup rápido, sin persistencia |

## Notas

- La versión simple **no persiste** logs/historial de LiteLLM entre reinicios
- Open WebUI **sí persiste** sus datos en volumen Docker
- Para producción con persistencia, usar PostgreSQL real
