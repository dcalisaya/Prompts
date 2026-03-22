#!/bin/bash
# Reset completo y start con configuración mínima

set -e

echo "======================================================================"
echo "🔄 RESET & START - Live Developer (Minimal)"
echo "======================================================================"

cd "$(dirname "$0")/../app/docker" 2>/dev/null || cd app/docker

# Detectar docker compose
if docker compose version &>/dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

echo ""
echo "🛑 Deteniendo contenedores..."
$DOCKER_COMPOSE -f docker-compose.simple.yml down -v 2>/dev/null || true
$DOCKER_COMPOSE down -v 2>/dev/null || true

echo ""
echo "🧹 Limpiando..."
docker rm -f ld-litellm ld-openwebui ld-postgres 2>/dev/null || true

echo ""
echo "🚀 Iniciando stack mínimo..."
$DOCKER_COMPOSE -f docker-compose.minimal.yml up -d

echo ""
echo "⏳ Esperando servicios..."
sleep 10

echo ""
echo "📊 Estado:"
$DOCKER_COMPOSE -f docker-compose.minimal.yml ps

echo ""
echo "🧪 Probando LiteLLM..."
if curl -s http://localhost:4000/health > /dev/null; then
    echo "✅ LiteLLM responde en :4000"
    
    echo ""
    echo "Modelos disponibles:"
    curl -s http://localhost:4000/v1/models 2>/dev/null | grep -o '"id":"[^"]*"' | cut -d'"' -f4 | head -10 || echo "No se pudieron obtener modelos"
else
    echo "❌ LiteLLM no responde"
    echo ""
    echo "Logs:"
    $DOCKER_COMPOSE -f docker-compose.minimal.yml logs --tail=20 litellm
fi

echo ""
echo "🌐 Open WebUI:"
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Open WebUI responde en :3000"
else
    echo "❌ Open WebUI no responde"
fi

echo ""
echo "======================================================================"
echo "✅ PROCESO COMPLETADO"
echo "======================================================================"
