#!/bin/bash
# Script de prueba completa del stack Live Developer
# Ejecutar en Mac Studio donde tienes Ollama y Docker

set -e  # Salir si hay error

echo "======================================================================"
echo "🧪 TEST COMPLETO - LIVE DEVELOPER STACK"
echo "======================================================================"

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir éxito
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Función para imprimir error
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Función para imprimir advertencia
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 1. Verificar Ollama
echo ""
echo "📡 1. Verificando Ollama..."
if ! curl -s http://localhost:11434/api/tags > /dev/null; then
    print_error "Ollama no responde"
    echo "   Ejecuta: ollama serve"
    exit 1
fi
print_success "Ollama funcionando"

# Listar modelos
echo ""
echo "📦 Modelos disponibles:"
curl -s http://localhost:11434/api/tags | grep -o '"name":"[^"]*"' | cut -d'"' -f4 | while read model; do
    echo "   • $model"
done

# 2. Probar modelos con script Python
echo ""
echo "🧠 2. Probando modelos..."
if [ -f "scripts/test-models.py" ]; then
    python3 scripts/test-models.py
else
    print_warning "Script test-models.py no encontrado"
fi

# 3. Verificar Docker
echo ""
echo "🐳 3. Verificando Docker..."
if ! command -v docker &> /dev/null; then
    print_error "Docker no instalado"
    exit 1
fi

if ! docker info > /dev/null 2>&1; then
    print_error "Docker no está corriendo"
    echo "   Inicia Docker Desktop"
    exit 1
fi
print_success "Docker funcionando"

# 4. Levantar stack
echo ""
echo "🚀 4. Levantando stack Live Developer..."
# Detectar docker compose
if docker compose version &>/dev/null; then
    DOCKER_COMPOSE="docker compose"
elif docker-compose --version &>/dev/null; then
    DOCKER_COMPOSE="docker-compose"
else
    print_error "Docker Compose no encontrado"
    exit 1
fi

# Usar docker-compose simple si existe
DOCKER_COMPOSE_FILE="docker-compose.simple.yml"
if [ ! -f "app/docker/$DOCKER_COMPOSE_FILE" ]; then
    DOCKER_COMPOSE_FILE="docker-compose.yml"
fi

cd app/docker

# Verificar si ya está corriendo
if $DOCKER_COMPOSE -f $DOCKER_COMPOSE_FILE ps | grep -q "Up"; then
    print_warning "Stack ya está corriendo. Reiniciando..."
    $DOCKER_COMPOSE -f $DOCKER_COMPOSE_FILE down
fi

$DOCKER_COMPOSE -f $DOCKER_COMPOSE_FILE up -d

# Esperar a que esté listo
echo "   Esperando servicios..."
sleep 5

# 5. Verificar LiteLLM
echo ""
echo "🔗 5. Verificando LiteLLM Proxy..."
if curl -s http://localhost:4000/health > /dev/null; then
    print_success "LiteLLM responde en :4000"
else
    print_error "LiteLLM no responde"
    $DOCKER_COMPOSE -f $DOCKER_COMPOSE_FILE logs litellm --tail=20
    exit 1
fi

# Verificar modelos en LiteLLM
echo ""
echo "📋 Modelos configurados en LiteLLM:"
curl -s http://localhost:4000/v1/models | grep -o '"id":"[^"]*"' | cut -d'"' -f4 | while read model; do
    echo "   • $model"
done

# 6. Verificar Open WebUI
echo ""
echo "🌐 6. Verificando Open WebUI..."
if curl -s http://localhost:3000 > /dev/null; then
    print_success "Open WebUI responde en :3000"
    echo "   Accede en: http://localhost:3000"
else
    print_error "Open WebUI no responde"
    $DOCKER_COMPOSE -f $DOCKER_COMPOSE_FILE logs open-webui --tail=20
    exit 1
fi

# 7. Test de inferencia vía LiteLLM
echo ""
echo "🎯 7. Test de inferencia vía LiteLLM..."

# Probar con llama3.1:8b
RESPONSE=$(curl -s -X POST http://localhost:4000/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "llama-3.1-8b-ld",
        "messages": [{"role": "user", "content": "Hola, responde en español"}],
        "max_tokens": 50
    }' | grep -o '"content":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -n "$RESPONSE" ]; then
    print_success "Inferencia funcionando"
    echo "   Respuesta: ${RESPONSE:0:50}..."
else
    print_error "Falló la inferencia"
    exit 1
fi

# 8. Resumen
echo ""
echo "======================================================================"
echo "📊 RESUMEN DE PRUEBAS"
echo "======================================================================"
print_success "Ollama: OK"
print_success "Docker: OK"
print_success "LiteLLM Proxy: OK"
print_success "Open WebUI: OK"
print_success "Inferencia: OK"

echo ""
echo "======================================================================"
echo "🎉 TODO FUNCIONA CORRECTAMENTE"
echo "======================================================================"
echo ""
echo "URLs disponibles:"
echo "   • Open WebUI: http://localhost:3000"
echo "   • LiteLLM:    http://localhost:4000"
echo "   • Ollama API: http://localhost:11434"
echo ""
echo "Próximos pasos:"
echo "   1. Abre http://localhost:3000"
echo "   2. Crea una cuenta admin"
echo "   3. Configura los agentes (usa scripts/sync_agents_to_webui.py)"
echo "   4. Prueba los modelos en la interfaz web"
echo ""
