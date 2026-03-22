# Setup Open WebUI - Live Developer

## ✅ WebUI está funcionando

Abre: http://localhost:3000

---

## Primeros Pasos

### 1. Crear cuenta Admin

1. Ve a http://localhost:3000
2. Click en "Sign up"
3. Crea tu cuenta (será automáticamente admin)

### 2. Configurar Modelos (Agentes)

Ve a **Admin Panel** → **Models** → **Create Model**

#### Agente: Estratega Digital

| Campo | Valor |
|-------|-------|
| Model Name | `estratega-digital` |
| Base Model | `llama-3.1-8b-ld` |
| System Prompt | *(ver abajo)* |

**System Prompt** (copia de `base/masters/agents/EstrategaDigital.md`):
```
Actúa como un Estratega de Marketing Digital, Arquitecto de Funnels y Psicólogo del Consumidor con más de 10 años de experiencia...
[Copia el contenido completo del archivo]
```

#### Agente: Tech Lead

| Campo | Valor |
|-------|-------|
| Model Name | `tech-lead` |
| Base Model | `phi4-ld` o `gpt-oss-20b-ld` |
| System Prompt | *(de TechLeadFullStack.md)* |

#### Agente: Arquitecto Software

| Campo | Valor |
|-------|-------|
| Model Name | `arquitecto-software` |
| Base Model | `gpt-oss-20b-ld` (más capacidad) |
| System Prompt | *(de ArquitectoSoftware.md)* |

### 3. Verificar Modelos Disponibles

En el chat, el dropdown de modelos debería mostrar:
- `llama-3.1-8b-ld`
- `phi4-ld`
- `qwen-3.5-ld`
- `gpt-oss-20b-ld`
- `estratega-digital` (el que creaste)
- `tech-lead` (el que creaste)
- etc.

---

## Sincronización Automática

Para crear todos los agentes automáticamente:

```bash
cd /Users/dcalisaya/Developer/Prompts

# 1. Obtener token de Open WebUI
# Admin Panel → Settings → API Keys → Create Key
export OPEN_WEBUI_TOKEN=sk-xxxxxxxxx

# 2. Sincronizar
python3 scripts/sync_agents_to_webui.py
```

---

## Probar el Chat

1. Selecciona un modelo (ej: `llama-3.1-8b-ld`)
2. Escribe: "Hola, ¿cómo estás?"
3. Debería responder en español usando Ollama local

---

## Configurar Knowledge (RAG)

Para que los agentes consulten documentos:

1. **Admin Panel** → **Knowledge** → **Create Collection**
2. Nombre: "Servicios Live Developer"
3. Upload files:
   - `base/masters/catalog/08-SERVICES.md`
   - `base/masters/company/09-SERVICE-MATRIX.md`
4. Guarda

Ahora los agentes pueden consultar estos documentos.

---

## Uso del Equipo

### Para el equipo (8 personas):

1. Cada uno crea su cuenta en http://localhost:3000
2. Selecciona el agente según su rol:
   - Comercial → `estratega-digital`
   - Desarrolladores → `tech-lead` o `arquitecto-software`
3. Preguntan en lenguaje natural

### Ejemplos de prompts:

**Comercial:**
```
"Necesito ayuda para responder a un cliente que pregunta por servicios de podcast"
```

**Desarrollador:**
```
"Review este código para seguridad: [pega código]"
```

---

## Troubleshooting

### "No aparecen los modelos de Ollama"

```bash
# Verificar que Ollama está accesible desde Docker
docker exec ld-litellm curl http://host.docker.internal:11434/api/tags

# Si falla, reiniciar Ollama con:
export OLLAMA_HOST=0.0.0.0
ollama serve
```

### "LiteLLM no responde"

```bash
# Ver logs
docker-compose -f docker-compose.simple.yml logs litellm

# Reiniciar
docker-compose -f docker-compose.simple.yml restart litellm
```

### "Modelo muy lento"

- Usa `llama-3.1-8b-ld` para respuestas rápidas
- Usa `gpt-oss-20b-ld` solo para tareas complejas
- `qwen-3.5-ld` es buen balance

---

## URLs Importantes

| Servicio | URL | Uso |
|----------|-----|-----|
| Open WebUI | http://localhost:3000 | Interfaz principal |
| LiteLLM | http://localhost:4000 | API directa |
| Ollama | http://localhost:11434 | API de modelos |

---

## Comandos Útiles

```bash
# Ver estado
docker-compose -f docker-compose.simple.yml ps

# Logs
docker-compose -f docker-compose.simple.yml logs -f

# Reiniciar
docker-compose -f docker-compose.simple.yml restart

# Detener todo
docker-compose -f docker-compose.simple.yml down
```

---

**¡Listo para usar!** 🎉
