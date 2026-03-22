#!/bin/bash
# Debug de LiteLLM

echo "======================================================================"
echo "🔍 DEBUG - LiteLLM"
echo "======================================================================"

# Detectar docker compose
if docker compose version &>/dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

cd "$(dirname "$0")/../app/docker" 2>/dev/null || cd app/docker

echo ""
echo "📊 Estado de contenedores:"
$DOCKER_COMPOSE -f docker-compose.simple.yml ps

echo ""
echo "📝 Logs de LiteLLM (últimas 50 líneas):"
$DOCKER_COMPOSE -f docker-compose.simple.yml logs --tail=50 litellm

echo ""
echo "🔌 Conectividad a Ollama desde LiteLLM:"
docker exec ld-litellm curl -s http://host.docker.internal:11434/api/tags 2>/dev/null || echo "❌ No puede conectar a Ollama"

echo ""
echo "🗄️  Estado de PostgreSQL:"
$DOCKER_COMPOSE -f docker-compose.simple.yml logs --tail=20 postgres
