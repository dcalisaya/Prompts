#!/bin/bash
# Verificación rápida del stack Live Developer

echo "======================================================================"
echo "✅ VERIFICACIÓN - Live Developer Stack"
echo "======================================================================"

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

check_service() {
    local name=$1
    local url=$2
    local expected=${3:-200}
    
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    if [ "$status" = "$expected" ] || [ "$status" = "302" ]; then
        echo -e "${GREEN}✅${NC} $name: OK (HTTP $status)"
        return 0
    else
        echo -e "${RED}❌${NC} $name: No responde (HTTP $status)"
        return 1
    fi
}

echo ""
echo "🌐 Servicios Web:"
check_service "Open WebUI" "http://localhost:3000"
check_service "LiteLLM" "http://localhost:4000/health"

echo ""
echo "🤖 Ollama:"
if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo -e "${GREEN}✅${NC} Ollama: OK"
    echo "   Modelos disponibles:"
    curl -s http://localhost:11434/api/tags | grep -o '"name":"[^"]*"' | cut -d'"' -f4 | while read model; do
        echo "      • $model"
    done
else
    echo -e "${RED}❌${NC} Ollama: No responde"
fi

echo ""
echo "🔗 Modelos en LiteLLM:"
models=$(curl -s http://localhost:4000/v1/models 2>/dev/null)
if [ $? -eq 0 ] && [ -n "$models" ]; then
    echo "$models" | grep -o '"id":"[^"]*"' | cut -d'"' -f4 | while read model; do
        echo -e "   ${GREEN}•${NC} $model"
    done
else
    echo -e "   ${YELLOW}⚠️${NC} No se pudieron obtener modelos"
fi

echo ""
echo "======================================================================"
echo "📝 PRUEBA DE INFERENCIA"
echo "======================================================================"

echo ""
echo "Probando modelo llama-3.1-8b-ld..."
response=$(curl -s -X POST http://localhost:4000/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "llama-3.1-8b-ld",
        "messages": [{"role": "user", "content": "Responde en español: ¿Qué es Live Developer?"}],
        "max_tokens": 50
    }' 2>/dev/null | grep -o '"content":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -n "$response" ]; then
    echo -e "${GREEN}✅${NC} Inferencia funcionando"
    echo "   Respuesta: ${response:0:100}..."
else
    echo -e "${YELLOW}⚠️${NC} No se pudo probar inferencia"
fi

echo ""
echo "======================================================================"
echo "💡 PRÓXIMOS PASOS"
echo "======================================================================"
echo ""
echo "1. Abre Open WebUI en tu navegador:"
echo "   http://localhost:3000"
echo ""
echo "2. Crea tu cuenta de administrador (primera vez)"
echo ""
echo "3. Ve a Admin Panel → Models → Create Model"
echo "   Crea agentes como 'Estratega Digital', 'Tech Lead', etc."
echo ""
echo "4. Para sincronizar agentes automáticamente:"
echo "   export OPEN_WEBUI_TOKEN=sk-..."
echo "   python3 scripts/sync_agents_to_webui.py"
echo ""
echo "======================================================================"
