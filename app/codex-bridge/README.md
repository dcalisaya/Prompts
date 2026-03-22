# Codex Bridge

Bridge HTTP para exponer `gpt-5.3-codex` (via Codex CLI) como API compatible con OpenAI.

## Problema que resuelve

- Codex CLI requiere auth browser (`codex login`)
- No expone API REST directamente
- Cada usuario necesitaría autenticarse individualmente

**Solución**: Este bridge corre en la Mac Studio (donde Codex está autenticado) y expone un endpoint HTTP que el equipo puede usar.

## Arquitectura

```
Usuario → Open WebUI → LiteLLM → Codex Bridge (Mac Studio) → Codex CLI → gpt-5.3-codex
```

## Instalación

### 1. Prerrequisitos (Mac Studio)

```bash
# Instalar Codex CLI y autenticar
npm install -g @openai/codex
codex login  # Browser auth

# Verificar que funciona
codex --version
codex --model gpt-5.3-codex --help
```

### 2. Instalar Bridge

```bash
cd /Users/dcalisaya/Developer/Prompts/app/codex-bridge

# Crear virtualenv
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 3. Iniciar Bridge

```bash
# Opción A: Directo
python3 main.py

# Opción B: Con Docker
docker build -t codex-bridge .
docker run -d \
  -p 5001:5001 \
  -v ~/.codex:/root/.codex \
  -v /path/to/workspace:/workspace \
  --name codex-bridge \
  codex-bridge
```

## Configuración en LiteLLM

Agregar a `litellm-config.yaml`:

```yaml
model_list:
  # Codex via Bridge
  - model_name: gpt-5.3-codex-ld
    litellm_params:
      model: openai/gpt-5.3-codex
      api_base: http://host.docker.internal:5001/v1
      api_key: "not-needed"  # Auth es via CLI
      timeout: 300
    model_info:
      mode: chat
      description: "gpt-5.3-codex via Codex CLI Bridge"
```

## Uso

### Desde Open WebUI

1. Crear nuevo modelo: `🇪🇸 Codex Architect`
2. Base model: `gpt-5.3-codex-ld`
3. System prompt: (igual que ArquitectoSoftware.md)

### API Directa

```bash
# Health check
curl http://localhost:5001/health

# Chat completion
curl -X POST http://localhost:5001/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5.3-codex",
    "messages": [
      {"role": "user", "content": "Review this code for security issues..."}
    ]
  }'

# Code review específico
curl -X POST http://localhost:5001/v1/codex/review \
  -H "Content-Type: application/json" \
  -d '{
    "file_path": "/workspace/src/auth.js",
    "instructions": "Check for SQL injection vulnerabilities"
  }'
```

## Diferencias vs API OpenAI

| Feature | OpenAI API | Codex Bridge |
|---------|-----------|--------------|
| Auth | API Key | Browser (CLI) |
| Streaming | ✅ Nativo | ⚠️ Simulado |
| Temperature | ✅ | ⚠️ Mapeado a approval-mode |
| Functions/Tools | ✅ | ❌ No soportado |
| Vision | ✅ | ❌ No soportado |

## Limitaciones

1. **Codex CLI trabaja con archivos**, no chat continuo
2. **Approval modes**: `suggest`, `autoSuggest`, `fullAuto`
3. **No streaming real** (Codex CLI no soporta)
4. **Tiempo de respuesta**: 30s - 5min (depende de la tarea)

## Troubleshooting

### "Codex CLI no encontrado"

```bash
which codex
codex --version

# Si no está, reinstalar:
npm install -g @openai/codex
```

### "No autenticado"

```bash
codex login
# Seguir flujo de auth en browser
```

### "Timeout"

Codex CLI puede tardar varios minutos. Aumentar timeout en LiteLLM:
```yaml
litellm_params:
  timeout: 300  # 5 minutos
```

## Seguridad

⚠️ **Este bridge expone tu sesión de Codex a la red local**

Recomendaciones:
1. Correr solo en red local/VPN
2. No exponer a internet público
3. Usar firewall para puerto 5001
4. Considerar auth básica:

```python
# Agregar a main.py para proteger con token
BRIDGE_TOKEN = os.environ.get("BRIDGE_TOKEN", "change-me")

@app.middleware("http")
async def auth_middleware(request: Request, call_next):
    if request.url.path in ["/health", "/docs", "/openapi.json"]:
        return await call_next(request)
    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    if token != BRIDGE_TOKEN:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    return await call_next(request)
```
