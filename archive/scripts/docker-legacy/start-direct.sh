#!/bin/bash
# Stack directo: Open WebUI → Ollama (sin LiteLLM)

set -e

echo "======================================================================"
echo "🚀 START DIRECT - Open WebUI → Ollama"
echo "======================================================================"

cd "$(dirname "$0")/../app/docker" 2>/dev/null || cd app/docker

# Detectar docker compose
if docker compose version &>/dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

echo ""
echo "🛑 Deteniendo contenedores anteriores..."
$DOCKER_COMPOSE -f docker-compose.minimal.yml down -v 2>/dev/null || true
$DOCKER_COMPOSE -f docker-compose.simple.yml down -v 2>/dev/null || true
docker rm -f ld-litellm 2>/dev/null || true

echo ""
echo "🚀 Iniciando Open WebUI directo..."
$DOCKER_COMPOSE -f docker-compose.direct.yml up -d

echo ""
echo "⏳ Esperando Open WebUI..."
sleep 15

echo ""
echo "📊 Estado:"
$DOCKER_COMPOSE -f docker-compose.direct.yml ps

echo ""
echo "🧪 Verificando..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Open WebUI funcionando en http://localhost:3000"
    echo ""
    echo "📝 Modelos disponibles en Ollama:"
    curl -s http://localhost:11434/api/tags | grep -o '"name":"[^"]*"' | cut -d'"' -f4 | while read model; do
        echo "   • $model"
    done
    echo ""
    echo "💡 Estos modelos aparecerán automáticamente en Open WebUI"
else
    echo "❌ Open WebUI no responde"
    $DOCKER_COMPOSE -f docker-compose.direct.yml logs --tail=20
fi

echo ""
echo "======================================================================"
echo "✅ STACK DIRECTO LISTO"
echo "======================================================================"
echo ""
echo "URLs:"
echo "   🌐 Open WebUI: http://localhost:3000"
echo "   🤖 Ollama API: http://localhost:11434"
echo ""
echo "Nota: Los modelos de Ollama aparecerán automáticamente en Open WebUI"
echo "      No necesitas LiteLLM para usar modelos locales."
