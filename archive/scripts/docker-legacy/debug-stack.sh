#!/bin/bash
# Script de debugging para el stack Docker

echo "======================================================================"
echo "🔍 DEBUG - Live Developer Stack"
echo "======================================================================"

# Detectar docker compose
if docker compose version &>/dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

cd "$(dirname "$0")/../app/docker"

echo ""
echo "📊 Estado de contenedores:"
$DOCKER_COMPOSE ps

echo ""
echo "📝 Logs de LiteLLM (últimas 30 líneas):"
$DOCKER_COMPOSE logs litellm --tail=30

echo ""
echo "📝 Logs de Open WebUI (últimas 30 líneas):"
$DOCKER_COMPOSE logs open-webui --tail=30

echo ""
echo "🌐 Prueba de conectividad:"
echo "   Puerto 3000 (Open WebUI):"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "No responde"

echo "   Puerto 4000 (LiteLLM):"
curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/health || echo "No responde"

echo ""
echo "🔧 Posibles soluciones:"
echo "   1. Si ves 'port already in use', cambia los puertos en docker-compose.yml"
echo "   2. Si ves errores de config, revisa litellm-config.yaml"
echo "   3. Intenta reiniciar: $DOCKER_COMPOSE restart"
