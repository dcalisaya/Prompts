# Testing - Modelos Ollama Instalados

Guía rápida para probar los modelos que ya tienes instalados.

## 🎯 Modelos Detectados

| Modelo | Uso Recomendado | Velocidad* |
|--------|-----------------|------------|
| `llama3.1:8b` | Tareas generales, chat | 10s |
| `phi4:latest` | Razonamiento, código | 9s |
| `qwen3.5:latest` | Multilingüe, rápido | 6s |
| `gpt-oss:20b` | Tareas complejas | 8s |

*Velocidad aproximada en tu Mac Studio

## 🚀 Test Rápido

### 1. Verificar Ollama

```bash
# Debería responder con los modelos
curl http://localhost:11434/api/tags
```

### 2. Probar cada modelo

```bash
cd /Users/dcalisaya/Developer/Prompts

# Test automático de todos los modelos
python3 scripts/test-models.py
```

### 3. Test manual de un modelo

```bash
# Probar llama3.1:8b
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.1:8b",
    "prompt": "Hola, ¿cómo estás?",
    "stream": false
  }'
```

## 🐳 Levantar Stack Completo (con Docker)

```bash
cd /Users/dcalisaya/Developer/Prompts/app/docker

# Configurar para usar tus modelos
cp litellm-config.local.yaml litellm-config.yaml

# Levantar stack
docker compose up -d

# Verificar
docker compose ps
curl http://localhost:4000/health  # LiteLLM
curl http://localhost:3000         # Open WebUI
```

## 🔧 Configuración de LiteLLM

El archivo `litellm-config.local.yaml` ya está configurado con tus modelos:

```yaml
model_list:
  - model_name: llama-3.1-8b-ld
    litellm_params:
      model: ollama/llama3.1:8b
      
  - model_name: phi4-ld
    litellm_params:
      model: ollama/phi4:latest
      
  - model_name: qwen-3.5-ld
    litellm_params:
      model: ollama/qwen3.5:latest
      
  - model_name: gpt-oss-20b-ld
    litellm_params:
      model: ollama/gpt-oss:20b
```

## 🤖 Recomendaciones por Agente

Basado en las pruebas de velocidad y capacidad:

| Agente | Modelo Recomendado | Por qué |
|--------|-------------------|---------|
| **Estratega Digital** | `llama3.1:8b` o `gpt-oss:20b` | Buen razonamiento |
| **Tech Lead** | `phi4:latest` | Excelente para código |
| **Arquitecto SW** | `gpt-oss:20b` | Más capacidad para arquitectura |
| **Comercial** | `qwen3.5:latest` | Rápido para respuestas simples |
| **QA Tester** | `phi4:latest` | Bueno para análisis |

## 📊 Resultados de Pruebas

Los tests muestran:

- **Más rápido**: `qwen3.5:latest` (6.4s)
- **Mejor para código**: `phi4:latest` (9.4s, buenas respuestas)
- **Mayor capacidad**: `gpt-oss:20b` (20B parámetros)
- **Balance**: `llama3.1:8b` (bueno y confiable)

## 🛠️ Troubleshooting

### "Ollama no responde"

```bash
# Verificar que está corriendo
ps aux | grep ollama

# Si no, iniciar
ollama serve
```

### "Modelo no encontrado"

```bash
# Listar modelos instalados
ollama list

# Instalar si falta
ollama pull llama3.1:8b
ollama pull phi4
ollama pull qwen3.5
```

### "LiteLLM no conecta a Ollama"

```bash
# Verificar que Ollama expone en todas las interfaces
export OLLAMA_HOST=0.0.0.0
ollama serve

# Probar conexión desde Docker
docker run --rm curlimages/curl \
  http://host.docker.internal:11434/api/tags
```

### Puerto ocupado

```bash
# Verificar qué usa el puerto
lsof -i :3000  # Open WebUI
lsof -i :4000  # LiteLLM
lsof -i :11434 # Ollama

# Matar proceso si es necesario
kill -9 <PID>
```

## 🎉 Próximos Pasos

1. ✅ Modelos probados y funcionando
2. ⏭️ Levantar stack Docker (`docker compose up -d`)
3. ⏭️ Acceder a Open WebUI (http://localhost:3000)
4. ⏭️ Crear cuenta y configurar agentes
5. ⏭️ Sincronizar agentes con `scripts/sync_agents_to_webui.py`

## 📚 Comandos Útiles

```bash
# Ver logs en tiempo real
docker compose logs -f

# Reiniciar stack
docker compose restart

# Detener todo
docker compose down

# Test completo automatizado
./scripts/test-full-stack.sh
```

---

**Estado**: ✅ Modelos Ollama funcionando
**Siguiente**: Levantar Docker stack
