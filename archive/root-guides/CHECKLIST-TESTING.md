# Checklist de Testing - Live Developer Workspace

Guía paso a paso para validar que todo el sistema funciona correctamente.

## Pre-requisitos

- [ ] macOS con terminal (para Mac Studio)
- [ ] Docker Desktop instalado y corriendo
- [ ] Python 3.10+ instalado
- [ ] Node.js instalado (para Codex CLI)

---

## Fase 1: Estructura Base

### 1.1 Verificar archivos creados

```bash
cd /Users/dcalisaya/Developer/Prompts

# Verificar agentes de desarrollo
ls -la base/masters/agents/*.md | wc -l
# ✅ Esperado: 13 archivos

# Verificar prompts DEV
ls -la base/masters/prompts-operativos/05-Programacion/*.md
# ✅ Esperado: 8 archivos DEV-001 a DEV-008

# Verificar manuales de desarrollo
ls -la base/masters/manuales-desarrollo/*.md
# ✅ Esperado: 6 archivos

# Verificar portal generado
ls -la portal/por-rol/*.md
# ✅ Esperado: 9 índices por rol
```

### 1.2 Generar JSON e índices

```bash
# Regenerar datos estructurados
python3 app/scripts/build_json.py
# ✅ Sin errores, archivos en base/json/

python3 app/scripts/build_indices.py
# ✅ "Índices generados exitosamente"

# Verificar JSONs generados
ls -la base/json/*.json
# ✅ Esperado: 11 archivos JSON
```

---

## Fase 2: CLI Tool (`ld`)

### 2.1 Instalación

```bash
# Crear virtualenv (recomendado)
python3 -m venv .venv
source .venv/bin/activate

# Instalar CLI
pip install app/cli/

# Verificar instalación
which live
live --version
# ✅ Esperado: "ld (Live Developer CLI) v0.1.0"
```

### 2.2 Comandos básicos

```bash
# Test: Navegación por rol
live role comercial
# ✅ Muestra documentos relevantes para comercial

live role desarrollo
# ✅ Muestra DEV-001, ArquitectoSoftware, etc.

# Test: Buscar agentes
live agent estratega
# ✅ Abre EstrategaDigital.md

live agent techlead
# ✅ Abre TechLeadFullStack.md

# Test: Buscar prompts
live prompt DEV-001
# ✅ Muestra info y abre archivo

live prompt COM-001
# ✅ Muestra info del prompt comercial

# Test: Flujos
live flow proforma
# ✅ Muestra secuencia de documentos

# Test: Búsqueda
live find "cotización"
# ✅ Muestra resultados de búsqueda

# Test: Servicios
live servicio AV-001
# ✅ Muestra información del servicio
```

### 2.3 Criterios de éxito CLI

- [ ] Todos los comandos responden sin errores
- [ ] Los archivos se abren correctamente (con `open` en macOS)
- [ ] La navegación por rol muestra documentos relevantes
- [ ] La búsqueda encuentra resultados

---

## Fase 3: Infraestructura Local (Ollama)

### 3.1 Instalar Ollama

```bash
# Instalar
brew install ollama

# Verificar
ollama --version
# ✅ ollama version X.X.X
```

### 3.2 Descargar modelos

```bash
# Modelo pequeño para pruebas (rápido)
ollama pull llama3.2:3b

# Modelos recomendados (para uso real)
# ollama pull llama3.1:70b      # ~40GB
# ollama pull qwen2.5-coder:32b # ~20GB

# Verificar modelos
ollama list
# ✅ Muestra modelos descargados
```

### 3.3 Iniciar servidor Ollama

```bash
# En terminal 1
ollama serve

# En terminal 2, probar:
curl http://localhost:11434/api/tags
# ✅ JSON con modelos disponibles
```

### 3.4 Levantar stack Docker

```bash
cd app/docker

# Configurar
cp .env.example .env
# Editar .env y agregar OPENAI_API_KEY (para fallback)

# Levantar stack
docker-compose up -d

# Verificar contenedores
docker-compose ps
# ✅ litellm y open-webui en estado "Up"

# Logs (si hay problemas)
docker-compose logs -f litellm
docker-compose logs -f open-webui
```

### 3.5 Verificar endpoints

```bash
# LiteLLM proxy
curl http://localhost:4000/health
# ✅ {"status":"healthy"}

# Modelos disponibles
curl http://localhost:4000/v1/models
# ✅ Lista con modelos de Ollama

# Open WebUI
open http://localhost:3000
# ✅ Carga interfaz web
```

### 3.6 Test de inferencia

```bash
# Test via LiteLLM
curl -X POST http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.2:3b",
    "messages": [{"role": "user", "content": "Hola, ¿cómo estás?"}],
    "max_tokens": 100
  }'
# ✅ Respuesta del modelo
```

---

## Fase 4: Infraestructura Cloud (Opcional)

### 4.1 Configurar API keys

```bash
cd app/docker
cp .env.cloud.example .env

# Editar .env
# OPENAI_API_KEY=sk-proj-...
# ANTHROPIC_API_KEY=sk-ant-...
```

### 4.2 Levantar stack cloud

```bash
docker-compose -f docker-compose.cloud.yml up -d

# Verificar
curl http://localhost:4000/v1/models
# ✅ Debe mostrar gpt-4o-ld, claude-sonnet-ld, etc.
```

### 4.3 Test de modelos cloud

```bash
# Test GPT-4o
curl -X POST http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-ld",
    "messages": [{"role": "user", "content": "Hola"}]
  }'
# ✅ Respuesta de GPT-4o

# Test o3-mini
curl -X POST http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "o3-mini-ld",
    "messages": [{"role": "user", "content": "Resuelve: 2+2"}]
  }'
# ✅ Respuesta con razonamiento
```

---

## Fase 5: Codex Bridge (gpt-5.3-codex)

### 5.1 Instalar Codex CLI

```bash
npm install -g @openai/codex
codex --version
# ✅ v0.115.0 o superior
```

### 5.2 Autenticar

```bash
codex login
# ✅ Abre browser, completa auth, vuelve a terminal

# Verificar auth
codex list
# ✅ Muestra información de la cuenta
```

### 5.3 Iniciar bridge

```bash
# En nueva terminal
cd /Users/dcalisaya/Developer/Prompts
cd app/codex-bridge

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

python3 main.py
# ✅ "Codex Bridge iniciado"
# ✅ "URL: http://localhost:5001"
```

### 5.4 Verificar bridge

```bash
# Health check
curl http://localhost:5001/health
# ✅ {"status": "ok", "model": "gpt-5.3-codex"}

# Test chat completion
curl -X POST http://localhost:5001/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5.3-codex",
    "messages": [{"role": "user", "content": "Escribe una función Python para calcular fibonacci"}]
  }'
# ✅ Código generado (puede tardar 30-60s)
```

### 5.5 Integrar con LiteLLM

```bash
# Verificar que LiteLLM puede ver el bridge
curl http://localhost:4000/v1/models
# ✅ Debe incluir "gpt-5.3-codex-ld"
```

---

## Fase 6: API Live Developer

### 6.1 Levantar API

```bash
cd app/api

# Instalar dependencias
pip install -r requirements.txt

# Levantar
uvicorn main:app --reload --port 8000
```

### 6.2 Test endpoints

```bash
# Health
curl http://localhost:8000/health
# ✅ {"status": "ok"}

# Servicios
curl http://localhost:8000/api/v1/services | head -20
# ✅ JSON con servicios

# Agente específico
curl http://localhost:8000/api/v1/agents/ArquitectoSoftware
# ✅ Info del agente

# Prompt específico
curl http://localhost:8000/api/v1/prompts/DEV-001
# ✅ Info del prompt

# Generar quote (test)
curl -X POST http://localhost:8000/api/v1/quote \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "Test Client",
    "services": ["DEV-001", "DEV-002"],
    "notes": "Proyecto de prueba"
  }'
# ✅ Estructura de proforma
```

---

## Fase 7: Open WebUI - Configuración Manual

### 7.1 Primer acceso

1. Abrir http://localhost:3000
2. Crear cuenta admin (primera vez)
3. Verificar que los modelos aparecen en el dropdown

### 7.2 Crear agentes personalizados

**Estratega Digital:**
1. Admin Panel → Models → Create Model
2. Model ID: `estratega-digital`
3. Base Model: `llama-3.1-70b-ld` (local) o `gpt-4o-ld` (cloud)
4. System Prompt: Copiar contenido de `base/masters/agents/EstrategaDigital.md`
5. Save

**Tech Lead (si usas Codex):**
1. Create Model
2. Model ID: `tech-lead-codex`
3. Base Model: `gpt-5.3-codex-ld`
4. System Prompt: Copiar de `TechLeadFullStack.md`
5. Save

### 7.3 Subir Knowledge Collections

1. Admin Panel → Knowledge → Create Collection
2. Name: "Servicios Live Developer"
3. Upload: `base/masters/catalog/08-SERVICES.md`
4. Upload: `base/masters/company/09-SERVICE-MATRIX.md`
5. Save

### 7.4 Test de chat

1. Seleccionar modelo "🇪🇸 Estratega Digital"
2. Mensaje: "Necesito crear un funnel para vender cursos online"
3. ✅ Respuesta estructurada con arquitectura TOFU/MOFU/BOFU

---

## Fase 8: Sincronización Automática

### 8.1 Sincronizar agentes con Open WebUI

```bash
# Obtener token de Open WebUI
# Admin Panel → Settings → API Keys → Create

export OPEN_WEBUI_TOKEN=sk-...
export OPEN_WEBUI_URL=http://localhost:3000

# Sincronizar (modo local)
python3 app/scripts/sync_agents_to_webui.py

# O modo cloud
python3 app/scripts/sync_agents_to_webui.py --cloud

# ✅ Debe mostrar "Exitosos: 13"
```

---

## Fase 9: Integración Completa

### 9.1 Flujo end-to-end: Cotización

1. **CLI**: `ld flow proforma`
2. **Abrir**: COM-001, responder pregunta de cliente
3. **Abrir**: COM-002, generar estructura de proforma
4. **API**: Validar servicios contra `/api/v1/services`
5. **WebUI**: Consultar "Estratega Digital" sobre alcance

### 9.2 Flujo end-to-end: Desarrollo

1. **CLI**: `ld flow desarrollo`
2. **Abrir**: DEV-001, especificar requerimientos
3. **Abrir**: DEV-002, generar arquitectura
4. **WebUI**: Consultar "Tech Lead" sobre decisiones técnicas
5. **Codex** (opcional): Deep dive en arquitectura compleja

---

## Solución de Problemas Comunes

### "ld command not found"

```bash
# Verificar que está instalado
pip show live-dev

# Si no, reinstalar
pip install -e app/cli/

# O usar python directamente
python3 -m live_dev.main role comercial
```

### "Ollama connection refused"

```bash
# Verificar que ollama está corriendo
ps aux | grep ollama

# Si no, iniciar
ollama serve

# O configurar para iniciar automáticamente
brew services start ollama
```

### "Docker containers exit immediately"

```bash
# Ver logs
docker-compose logs

# Problema común: puertos ocupados
lsof -i :3000
lsof -i :4000
lsof -i :8000

# Matar procesos o cambiar puertos en docker-compose.yml
```

### "Codex Bridge: not authenticated"

```bash
# Verificar auth
codex list

# Si falla, reautenticar
codex logout
codex login
```

### "LiteLLM no encuentra modelos de Ollama"

```bash
# Verificar Ollama expone en red
curl http://localhost:11434/api/tags

# Configurar Ollama para escuchar en todas las interfaces
export OLLAMA_HOST=0.0.0.0
ollama serve
```

---

## Checklist Final

### Estructura
- [ ] 13 agentes en `base/masters/agents/`
- [ ] 16 prompts en `base/masters/prompts-operativos/`
- [ ] 6 manuales en `base/masters/manuales-desarrollo/`
- [ ] 11 JSONs en `base/json/`
- [ ] Portal generado en `portal/`

### CLI
- [ ] `ld` instalado y funciona
- [ ] `ld role comercial` muestra resultados
- [ ] `ld agent estratega` abre archivo
- [ ] `ld prompt DEV-001` funciona

### Infraestructura Local
- [ ] Ollama instalado y corriendo
- [ ] Al menos 1 modelo descargado
- [ ] Docker containers "Up"
- [ ] Open WebUI accesible en :3000
- [ ] LiteLLM proxy responde en :4000

### Infraestructura Cloud (si aplica)
- [ ] API keys configuradas
- [ ] Stack cloud levantado
- [ ] GPT-4o responde

### Codex Bridge (si aplica)
- [ ] Codex CLI instalado
- [ ] Auth completado
- [ ] Bridge corriendo en :5001
- [ ] gpt-5.3-codex responde

### API
- [ ] API levantada en :8000
- [ ] Endpoints responden correctamente

### Open WebUI
- [ ] Acceso web funciona
- [ ] Modelos visibles en dropdown
- [ ] Chat funciona con al menos 1 modelo
- [ ] Agentes creados (o sincronizados)

---

## Métricas de Éxito

| Métrica | Objetivo | Actual |
|---------|----------|--------|
| Tiempo CLI response | < 2s | ___s |
| Tiempo model inference (local) | < 30s | ___s |
| Tiempo model inference (cloud) | < 10s | ___s |
| Tiempo Codex response | < 2min | ___s |
| Agentes funcionando | 13/13 | ___/13 |
| Prompts accesibles | 16/16 | ___/16 |

---

## Próximos Pasos Post-Testing

1. **Capacitación del equipo**: Demo de navegación CLI + WebUI
2. **Knowledge Collections**: Subir documentación específica de proyectos
3. **Autenticación OAuth**: Configurar Google/Microsoft para login
4. **Backup**: Configurar backups de PostgreSQL (datos de chat)
5. **Monitoreo**: Configurar Langfuse para tracking de uso

---

## Comandos Útiles para Debugging

```bash
# Estado completo del sistema
docker-compose ps
docker-compose logs --tail=50

# Uso de recursos
docker stats
top -u $(whoami)

# Logs específicos
tail -f app/codex-bridge/codex.log  # si agregas logging

# Test rápido de todo
./scripts/test-all.sh  # si creas un script de test
```

---

**¿Listo para producción?** Verifica que todos los checkboxes estén marcados ✅
