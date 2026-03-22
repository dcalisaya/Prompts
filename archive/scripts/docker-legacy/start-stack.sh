#!/bin/bash
# Script para levantar el stack completo Live Developer
# Ejecutar en Mac Studio

set -e

echo "======================================================================"
echo "🚀 LIVE DEVELOPER - Iniciando Stack"
echo "======================================================================"

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT/app/docker"

# Verificar Ollama está corriendo
print_status "Verificando Ollama..."
if ! curl -s http://localhost:11434/api/tags > /dev/null; then
    echo "❌ Ollama no responde. Iniciando..."
    ollama serve &
    sleep 3
fi
print_success "Ollama OK"

# Configurar Ollama para escuchar en todas las interfaces (necesario para Docker)
export OLLAMA_HOST=0.0.0.0

# Verificar Docker
print_status "Verificando Docker..."
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker no está corriendo. Inicia Docker Desktop."
    exit 1
fi
print_success "Docker OK"

# Usar config local con tus modelos
print_status "Configurando modelos locales..."
if [ -f "litellm-config.local.yaml" ]; then
    cp litellm-config.local.yaml litellm-config.yaml
    print_success "Configuración local aplicada"
else
    print_status "Usando configuración estándar"
fi

# Usar docker-compose simple (sin PostgreSQL)
DOCKER_COMPOSE_FILE="docker-compose.simple.yml"
if [ ! -f "$DOCKER_COMPOSE_FILE" ]; then
    DOCKER_COMPOSE_FILE="docker-compose.yml"
fi

# Levantar stack
print_status "Levantando contenedores (configuración simple)..."

# Detectar si usar 'docker compose' o 'docker-compose'
if docker compose version &>/dev/null; then
    DOCKER_COMPOSE="docker compose"
elif docker-compose --version &>/dev/null; then
    DOCKER_COMPOSE="docker-compose"
else
    echo "❌ Docker Compose no encontrado"
    echo "   Instala con: brew install docker-compose"
    exit 1
fi

$DOCKER_COMPOSE -f $DOCKER_COMPOSE_FILE down 2>/dev/null || true
$DOCKER_COMPOSE -f $DOCKER_COMPOSE_FILE up -d

# Esperar a que estén listos
print_status "Esperando servicios..."
sleep 5

# Verificar LiteLLM
print_status "Verificando LiteLLM..."
for i in {1..10}; do
    if curl -s http://localhost:4000/health > /dev/null; then
        print_success "LiteLLM listo en :4000"
        break
    fi
    echo "   Intento $i/10..."
    sleep 2
done

# Verificar Open WebUI
print_status "Verificando Open WebUI..."
for i in {1..10}; do
    if curl -s http://localhost:3000 > /dev/null; then
        print_success "Open WebUI listo en :3000"
        break
    fi
    echo "   Intento $i/10..."
    sleep 2
done

# Mostrar modelos configurados
echo ""
echo "======================================================================"
echo "📋 MODELOS DISPONIBLES"
echo "======================================================================"
curl -s http://localhost:4000/v1/models 2>/dev/null | grep -o '"id":"[^"]*"' | cut -d'"' -f4 | while read model; do
    echo "   • $model"
done

echo ""
echo "======================================================================"
echo "🎉 STACK LISTO"
echo "======================================================================"
echo ""
echo "URLs:"
echo "   🌐 Open WebUI:  http://localhost:3000"
echo "   🔗 LiteLLM:     http://localhost:4000"
echo "   🤖 Ollama API:  http://localhost:11434"
echo ""
echo "Próximos pasos:"
echo "   1. Abre http://localhost:3000"
echo "   2. Crea tu cuenta admin (primera vez)"
echo "   3. Ve a Admin Panel → Models → Create Model"
echo "   4. Crea agentes con los modelos disponibles"
echo ""
echo "Para sincronizar agentes automáticamente:"
echo "   export OPEN_WEBUI_TOKEN=sk-..."
echo "   python3 scripts/sync_agents_to_webui.py"
echo ""
echo "Para ver logs:"
echo "   docker compose logs -f"
echo ""
