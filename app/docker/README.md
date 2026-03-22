# Live Developer - Local LLM Infrastructure

Stack completo para correr LLMs localmente en Mac Studio M4 Max con fallback a APIs pagadas.

## Arquitectura

```
Equipo (Browser)
       │
       ▼
Open WebUI (puerto 3000) ←→ LiteLLM Proxy (puerto 4000) ←→ Ollama (local)
                                    │
                                    └── Fallback → OpenAI/Anthropic (si falla)
```

## Requisitos

- Mac Studio M4 Max (36GB+ RAM recomendado)
- Docker Desktop instalado
- Ollama instalado: `brew install ollama`

## Instalación Rápida

### 1. Preparar Ollama (en Mac Studio)

```bash
# Instalar modelos recomendados
ollama pull llama3.1:70b
ollama pull qwen2.5-coder:32b
ollama pull mistral-nemo
ollama pull llava:34b

# Iniciar servidor
ollama serve
```

### 2. Configurar Docker Stack

```bash
cd app/docker

# Copiar configuración
cp .env.example .env
# Editar .env con tus API keys (para fallback)

# Iniciar stack
docker-compose up -d
```

### 3. Acceder

- **Open WebUI**: http://localhost:3000
- **LiteLLM Proxy**: http://localhost:4000

## Configuración de Agentes en Open WebUI

1. Ir a Admin Panel → Models
2. Crear modelo por cada agente:

| Nombre | Base Model | System Prompt |
|--------|-----------|---------------|
| 🇪🇸 Estratega Digital | llama-3.1-70b-ld | Contenido de `EstrategaDigital.md` |
| 🇪🇸 Tech Lead | qwen-coder-32b-ld | Contenido de `TechLeadFullStack.md` |
| 🇪🇸 Arquitecto SW | qwen-coder-32b-ld | Contenido de `ArquitectoSoftware.md` |
| 🇪🇸 Comercial | llama-3.1-70b-ld | Contenido de `COM-001` |
| 🇪🇸 Cotizador | llama-3.1-70b-ld | Contenido de `COM-002` |

3. Crear Knowledge Collections con la documentación del workspace.

## Comandos Útiles

```bash
# Ver logs
docker-compose logs -f open-webui
docker-compose logs -f litellm

# Reiniciar
docker-compose restart

# Detener
docker-compose down

# Actualizar imágenes
docker-compose pull
docker-compose up -d
```

## Troubleshooting

### Ollama no responde desde Docker

Asegúrate que Ollama esté escuchando en todas las interfaces:

```bash
OLLAMA_HOST=0.0.0.0 ollama serve
```

O configura en `~/.zshrc`:
```bash
export OLLAMA_HOST=0.0.0.0
```

### Modelos no aparecen en Open WebUI

1. Verificar que Ollama está corriendo: `ollama list`
2. Reiniciar Open WebUI: `docker-compose restart open-webui`

### Fallback no funciona

Verificar que las API keys están configuradas en `.env` y que LiteLLM las lee correctamente.

## Recursos

- [Open WebUI Docs](https://docs.openwebui.com/)
- [LiteLLM Docs](https://docs.litellm.ai/)
- [Ollama Docs](https://github.com/ollama/ollama)
