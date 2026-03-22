# Guía de Modelos - Local vs Cloud

Comparativa de modelos disponibles y recomendaciones por caso de uso.

## Resumen Ejecutivo

| Tu necesidad | Local (Ollama) | Cloud (API) | Nota |
|-------------|----------------|-------------|------|
| **Razonamiento complejo** | Llama 3.1 70B | o3-mini, GPT-4o | Cloud gana en consistencia |
| **Código/arquitectura** | Qwen 2.5 Coder | Claude 3.5 Sonnet | Claude es el estándar oro |
| **Tareas simples rápidas** | Mistral Nemo | GPT-4o-mini | Local es gratis y rápido |
| **Creatividad/marketing** | Llama 3.1 70B | GPT-4o | Parejos, local tiene ventaja privacidad |
| **Análisis de imágenes** | LLaVA 34B | GPT-4o Vision | Cloud es mucho mejor |

## Modelos Locales (Ollama)

### Requisitos de Hardware

| Modelo | VRAM/RAM Requerida | Velocidad (M4 Max) | Calidad |
|--------|-------------------|-------------------|---------|
| Llama 3.1 70B | ~40GB | 10-20 tok/s | ⭐⭐⭐⭐ |
| Qwen 2.5 Coder 32B | ~20GB | 20-30 tok/s | ⭐⭐⭐⭐ |
| Mistral Nemo 12B | ~8GB | 40-50 tok/s | ⭐⭐⭐ |
| LLaVA 34B | ~20GB | 10-15 tok/s | ⭐⭐⭐ |

**Recomendación M4 Max**: 64GB RAM unificada permite correr Llama 70B + Qwen 32B simultáneamente.

### Ventajas Locales

- ✅ **Costo cero** de inferencia
- ✅ **Privacidad total** - datos nunca salen
- ✅ **Sin rate limits** - usa todo el hardware
- ✅ **Funciona offline**
- ✅ **Sin dependencia de terceros**

### Desventajas Locales

- ❌ Requiere hardware potente
- ❌ Velocidad menor vs cloud
- ❌ Calidad ligeramente inferior en tareas complejas
- ❌ Mantenimiento del hardware

## Modelos Cloud (APIs)

### OpenAI

| Modelo | Input/1M tokens | Output/1M tokens | Mejor para |
|--------|----------------|------------------|------------|
| **o3-mini** | $1.10 | $4.40 | Razonamiento, matemáticas, código complejo |
| **GPT-4o** | $2.50 | $10.00 | General purpose, multimodal, instrucciones |
| **GPT-4o-mini** | $0.15 | $0.60 | Tareas simples, clasificación, extracción |

**o3-mini** (anteriormente "Codex" en conversaciones): 
- Modelo de razonamiento (chain-of-thought)
- Mejor que GPT-4o en: matemáticas, ciencias, debugging complejo
- Más lento (razona antes de responder)
- No soporta `temperature` (siempre determinista)

### Anthropic

| Modelo | Input/1M tokens | Output/1M tokens | Mejor para |
|--------|----------------|------------------|------------|
| **Claude 3.5 Sonnet** | $3.00 | $15.00 | Código, análisis largos, calidad de texto |
| **Claude 3.5 Haiku** | $1.00 | $5.00 | Velocidad, tareas simples |

**Claude 3.5 Sonnet**:
- Estándar de la industria para coding
- Excelente en seguir instrucciones complejas
- Mejor manejo de contexto largo (200K tokens)
- Más "honesto" cuando no sabe algo

### Comparación para Coding

| Tarea | Mejor Modelo | Por qué |
|-------|-------------|---------|
| Code review | Claude 3.5 Sonnet | Detecta más edge cases |
| Generar boilerplate | GPT-4o | Más rápido, suficiente |
| Debugging complejo | o3-mini | Razona paso a paso |
| Refactorización | Claude 3.5 Sonnet | Mejor manteniendo semántica |
| Tests unitarios | GPT-4o | Buen balance velocidad/calidad |

## Configuraciones Recomendadas

### Opción A: Todo Local (Privacidad máxima)

```yaml
# Para: Datos sensibles, compliance estricto, sin internet

Estratega Digital → Llama 3.1 70B
Tech Lead → Qwen 2.5 Coder 32B
Arquitecto SW → Qwen 2.5 Coder 32B
Comercial → Llama 3.1 70B
Audiovisual → Llama 3.1 70B
QA → Llama 3.1 70B
```

**Costo**: $0 + hardware  
**Trade-off**: 5-10% menos de calidad que cloud en tareas complejas

### Opción B: Híbrido Inteligente (Recomendado)

```yaml
# Para: Balance optimo, fallback seguro

Tareas críticas/código → Claude 3.5 Sonnet (API)
Razonamiento profundo → o3-mini (API)
Tareas simples/rápidas → Mistral Nemo (Local)
Creatividad/estrategia → Llama 3.1 70B (Local)
```

**Configuración LiteLLM**:
```yaml
router_settings:
  fallback_strategy:
    - llama-3.1-70b-ld: ["gpt-4o-ld"]
    - qwen-coder-32b-ld: ["claude-sonnet-ld"]
```

### Opción C: Todo Cloud (Máxima calidad)

```yaml
# Para: Sin hardware GPU, equipo distribuido, máxima calidad

Estratega Digital → GPT-4o
Tech Lead → Claude 3.5 Sonnet
Arquitecto SW → o3-mini
Comercial → GPT-4o
Audiovisual → GPT-4o
QA → Claude 3.5 Haiku (económico)
```

**Costo estimado**: $200-500/mes para equipo de 8 personas

## Estimador de Costos Cloud

### Metodología

```
Costo = (Input Tokens × Input Price) + (Output Tokens × Output Price)
```

### Escenarios

#### Equipo pequeño (2-3 personas)

| Uso diario | Tokens input | Tokens output | Modelo | Costo/día | Costo/mes |
|------------|-------------|--------------|---------|-----------|-----------|
| Light (20 consultas) | 40K | 20K | GPT-4o-mini | $0.18 | ~$5 |
| Medium (50 consultas) | 100K | 50K | GPT-4o | $3.00 | ~$90 |
| Heavy (100 consultas) | 200K | 100K | Mixto | $5.00 | ~$150 |

#### Equipo mediano (5-8 personas)

| Uso diario | Tokens input | Tokens output | Modelo | Costo/día | Costo/mes |
|------------|-------------|--------------|---------|-----------|-----------|
| Light (100 consultas) | 200K | 100K | GPT-4o-mini | $0.90 | ~$27 |
| Medium (300 consultas) | 600K | 300K | GPT-4o | $18.00 | ~$540 |
| Heavy (500 consultas) | 1M | 500K | Mixto | $35.00 | ~$1,050 |

#### Tips para reducir costos

1. **Usar GPT-4o-mini** para tareas simples (15x más barato)
2. **Cachear prompts de sistema** (25% descuento en OpenAI)
3. **Truncar historial** largo de conversaciones
4. **Resumir contexto** antes de enviar al modelo
5. **Modelos locales** para tareas predecibles

### Calculadora Rápida

```python
# Ejemplo: 1000 consultas/mes, 2K tokens c/u, 50/50 input/output
total_tokens = 1000 * 2000
input_tokens = total_tokens * 0.5
output_tokens = total_tokens * 0.5

# GPT-4o
costo_gpt4o = (input_tokens / 1e6 * 2.50) + (output_tokens / 1e6 * 10.00)
# ≈ $12.50

# Claude Sonnet
costo_claude = (input_tokens / 1e6 * 3.00) + (output_tokens / 1e6 * 15.00)
# ≈ $18.00

# GPT-4o-mini
costo_mini = (input_tokens / 1e6 * 0.15) + (output_tokens / 1e6 * 0.60)
# ≈ $0.75
```

## Decision Tree

```
¿Tienes Mac Studio M4 Max o equivalente?
│
├─ SÍ → ¿Datos muy sensibles/compliance?
│   │
│   ├─ SÍ → TODO LOCAL (Llama 70B + Qwen)
│   │
│   └─ NO → HÍBRIDO
│       - Local para simples
│       - Claude para código crítico
│       - GPT-4o para estrategia
│
└─ NO → ¿Presupuesto > $300/mes?
    │
    ├─ SÍ → TODO CLOUD
    │   - Claude Sonnet (código)
    │   - GPT-4o (general)
    │   - o3-mini (razonamiento)
    │
    └─ NO → CLOUD ECONÓMICO
        - GPT-4o-mini (80% de tareas)
        - Claude Haiku (código simple)
        - GPT-4o solo cuando se necesite
```

## Benchmarks

### HumanEval (Coding)

| Modelo | Pass@1 | Pass@10 |
|--------|--------|---------|
| o3-mini | 92.4% | 97.6% |
| Claude 3.5 Sonnet | 92.0% | 97.1% |
| GPT-4o | 90.2% | 95.4% |
| Qwen 2.5 Coder 32B | 85.2% | 92.1% |
| Llama 3.1 70B | 81.7% | 89.8% |

### MMLU (Razonamiento general)

| Modelo | Score |
|--------|-------|
| o3-mini | 86.9% |
| GPT-4o | 87.2% |
| Claude 3.5 Sonnet | 85.7% |
| Llama 3.1 70B | 79.3% |

### Velocidad (tokens/segundo)

| Modelo | Cloud | Local M4 Max |
|--------|-------|--------------|
| GPT-4o | 50-100 | N/A |
| Claude Sonnet | 30-60 | N/A |
| Llama 3.1 70B | N/A | 10-20 |
| Qwen 2.5 32B | N/A | 20-30 |

## Recursos

- [OpenAI Pricing](https://openai.com/pricing)
- [Anthropic Pricing](https://www.anthropic.com/pricing)
- [Ollama Models](https://ollama.com/library)
- [LiteLLM Router Docs](https://docs.litellm.ai/docs/routing)
- [OpenRouter](https://openrouter.ai/) - Alternativa unificada de APIs
