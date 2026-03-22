# Setup Directo - Sin LiteLLM

## Arquitectura Simplificada

```
Usuario → Open WebUI → Ollama (directo)
```

Sin LiteLLM proxy, sin PostgreSQL. Más simple y rápido.

## Iniciar

```bash
cd /Users/dcalisaya/Developer/Prompts
./scripts/start-direct.sh
```

## Acceder

- **Open WebUI**: http://localhost:3000

Los modelos de Ollama aparecerán automáticamente:
- `llama3.1:8b`
- `phi4:latest`
- `qwen3.5:latest`
- `gpt-oss:20b`

## Diferencias vs Stack Completo

| Feature | Stack Directo | Stack Completo (con LiteLLM) |
|---------|--------------|------------------------------|
| **Modelos locales** | ✅ Directo | ✅ Vía LiteLLM |
| **Modelos cloud** | ❌ No | ✅ OpenAI/Claude |
| **Fallback** | ❌ No | ✅ Automático |
| **Rate limiting** | ❌ No | ✅ Sí |
| **Logging** | Básico | Avanzado |
| **Complejidad** | Simple | Mayor |

## Para agregar LiteLLM después

Si necesitas modelos cloud más adelante:

```bash
# Detener directo
./scripts/start-direct.sh down

# Iniciar con LiteLLM (cuando lo necesites)
./scripts/start-stack.sh
```

## Uso

1. Abre http://localhost:3000
2. Crea tu cuenta
3. Los modelos de Ollama aparecen automáticamente en el selector
4. ¡Listo para usar!

## Comandos

```bash
# Ver logs
docker-compose -f app/docker/docker-compose.direct.yml logs -f

# Detener
docker-compose -f app/docker/docker-compose.direct.yml down

# Reiniciar
./scripts/start-direct.sh
```
