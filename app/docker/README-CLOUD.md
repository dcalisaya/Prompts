# Live Developer - Cloud-Only Deployment

Guía para desplegar el stack en una VM sin GPU, usando solo APIs pagadas (OpenAI, Anthropic, etc.)

## Comparación: Local vs Cloud

| Característica | Local (Mac Studio) | Cloud (VM) |
|----------------|-------------------|------------|
| **Hardware** | Mac M4 Max 36-128GB | VM cualquier tamaño |
| **Costo** | $0 inferencia | Pago por uso API |
| **Privacidad** | 100% local | Depende del provider |
| **Modelos** | Llama, Qwen, Mistral | GPT-4o, Claude, o3-mini |
| **Auth** | Local simple | OAuth/Google/SSO |
| **Velocidad** | Depende de hardware | Siempre rápido |

## Arquitectura Cloud

```
Usuario → Open WebUI → LiteLLM Proxy → OpenAI/Anthropic API
                ↓
           PostgreSQL (historial)
```

**Sin Ollama, sin modelos locales.**

## Opciones de Autenticación

### Opción 1: API Key Compartida (Simple)
La empresa pone una API key de OpenAI, todos usan el mismo pool.

```env
OPENAI_API_KEY=sk-proj-xxxxx
```

**Pros**: Fácil setup, control centralizado  
**Cons**: Todos comparten el mismo límite de rate/budget

### Opción 2: "Bring Your Own Key" (Recomendado)
Cada usuario pone su propia API key en su perfil de Open WebUI.

**Configuración en Open WebUI:**
1. Usuario entra a Settings → Connections
2. Agrega su `OPENAI_API_KEY` personal
3. Usa los modelos directamente

**Pros**: Cada uno paga lo que usa, trackeo individual  
**Cons**: Requiere que cada usuario tenga cuenta OpenAI

### Opción 3: OAuth/SSO (Enterprise)
Login con Google Workspace, Microsoft, etc.

**Soportado**: Google OAuth, Azure AD, OIDC genérico

```env
OAUTH_CLIENT_ID=xxx
OAUTH_CLIENT_SECRET=xxx
OPENID_PROVIDER_URL=https://accounts.google.com/.well-known/openid-configuration
```

## Deploy Rápido

### 1. Clonar y configurar

```bash
git clone <repo>
cd Prompts/app/docker

# Configurar environment
cp .env.cloud.example .env
nano .env  # Editar con tus API keys
```

### 2. Elegir modo

#### A) API Key Compartida (modo empresa)

```env
# .env
OPENAI_API_KEY=sk-proj-tu-key-aqui
LITELLM_MASTER_KEY=sk-ld-cloud-secret
ENABLE_SIGNUP=false  # Controlar quién entra
```

```bash
docker-compose -f docker-compose.cloud.yml up -d
```

#### B) Bring Your Own Key (modo individual)

```env
# .env - solo necesitas esto
LITELLM_MASTER_KEY=sk-ld-cloud-secret
ENABLE_SIGNUP=true
# No pongas OPENAI_API_KEY aquí
```

```bash
docker-compose -f docker-compose.cloud.yml up -d
```

Luego cada usuario:
1. Crea cuenta en Open WebUI
2. Va a Settings → Connections
3. Agrega su propio `OPENAI_API_KEY`
4. Listo

### 3. Configurar Agentes

Los agentes son los mismos, solo cambia el modelo base:

| Agente | Modelo Local | Modelo Cloud |
|--------|-------------|--------------|
| Estratega Digital | llama3.1:70b | gpt-4o-ld |
| Tech Lead | qwen2.5-coder:32b | claude-sonnet-ld |
| Arquitecto SW | qwen2.5-coder:32b | o3-mini-ld |

```bash
# Sincronizar agentes (usa los modelos cloud)
export OPEN_WEBUI_URL=http://localhost:3000
export OPEN_WEBUI_TOKEN=tu-token
python3 ../scripts/sync_agents_to_webui.py --cloud
```

## Costos Estimados

### GPT-4o (Precios OpenAI Dic 2024)

| Uso | Input | Output | Costo/mes estimado |
|-----|-------|--------|-------------------|
| Light (100 chats/día, 2k tokens c/u) | 200K | 200K | ~$15-20 |
| Medium (500 chats/día) | 1M | 1M | ~$75-100 |
| Heavy (8 creativos, uso intensivo) | 5M | 5M | ~$400-500 |

### Comparación de Modelos

| Modelo | Input/1M | Output/1M | Velocidad | Calidad Código |
|--------|----------|-----------|-----------|----------------|
| GPT-4o | $2.50 | $10.00 | ⚡⚡⚡ | ⭐⭐⭐⭐ |
| GPT-4o-mini | $0.15 | $0.60 | ⚡⚡⚡⚡ | ⭐⭐⭐ |
| o3-mini | $1.10 | $4.40 | ⚡⚡ | ⭐⭐⭐⭐⭐ |
| Claude 3.5 Sonnet | $3.00 | $15.00 | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ |
| Claude 3.5 Haiku | $1.00 | $5.00 | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ |

**Recomendación para desarrollo:** Claude 3.5 Sonnet o o3-mini

## Configuraciones Avanzadas

### Rate Limiting por Usuario

En `litellm-config.cloud.yaml`:

```yaml
rate_limit:
  - model: gpt-4o-ld
    tpm: 50000   # Tokens por minuto por usuario
    rpm: 50      # Requests por minuto por usuario
```

### Budget Alerts

```yaml
general_settings:
  user_budget: 20.0  # $20 USD por usuario/mes
  
budget_alerts:
  - type: email
    threshold: 0.8   # Alerta al 80%
    email: admin@livedeveloper.com
```

### Fallback entre providers

Si OpenAI falla, usa Anthropic:

```yaml
router_settings:
  fallback_strategy:
    - gpt-4o-ld: ["claude-sonnet-ld"]
    - claude-sonnet-ld: ["gpt-4o-ld"]
```

## Troubleshooting

### "Rate limit exceeded"

- Subir límites en dashboard de OpenAI
- Habilitar tier más alto (requiere historial de pago)
- Usar múltiples API keys con load balancing

### "Model not found"

Verificar que la API key tiene acceso al modelo:
```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Costos inesperados

1. Revisar logs de LiteLLM:
```bash
docker-compose -f docker-compose.cloud.yml logs litellm
```

2. Ver usage en dashboard de OpenAI

3. Setear budget limits más agresivos

## Migración: Local → Cloud

Si ya tenías el stack local y quieres migrar:

```bash
# 1. Backup de datos
docker exec ld-openwebui tar czf /tmp/backup.tar.gz /app/backend/data
docker cp ld-openwebui:/tmp/backup.tar.gz ./backup-local.tar.gz

# 2. Detener local
docker-compose down

# 3. Iniciar cloud
docker-compose -f docker-compose.cloud.yml up -d

# 4. Restaurar datos (opcional)
docker cp backup-local.tar.gz ld-openwebui-cloud:/tmp/
docker exec ld-openwebui-cloud tar xzf /tmp/backup-local.tar.gz -C /
```

## Seguridad

### En producción:

1. **HTTPS obligatorio** - Usar reverse proxy (nginx, traefik, caddy)
2. **Autenticación fuerte** - OAuth + 2FA
3. **Rate limiting** - Prevenir abuso
4. **Budget alerts** - Detectar uso anómalo
5. **No exponer LiteLLM** - Solo Open WebUI y API deben ser públicos

### Ejemplo con Caddy (HTTPS automático):

```yaml
# docker-compose.cloud.yml (añadir)
  caddy:
    image: caddy:2
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy-data:/data
    depends_on:
      - open-webui
```

```
# Caddyfile
agentes.livedeveloper.com {
    reverse_proxy open-webui:8080
}
```

## Recursos

- [OpenAI Pricing](https://openai.com/pricing)
- [Anthropic Pricing](https://www.anthropic.com/pricing)
- [LiteLLM Docs](https://docs.litellm.ai/)
- [Open WebUI OAuth](https://docs.openwebui.com/features/sso)
