#!/bin/bash
# Verificar versión de Docker y docker-compose

echo "Docker version:"
docker --version

echo ""
echo "Docker Compose version:"
docker-compose --version 2>/dev/null || docker compose version 2>/dev/null || echo "No encontrado"

echo ""
echo "Comando correcto:"
if docker compose version &>/dev/null; then
    echo "  Usa: docker compose up -d"
elif docker-compose --version &>/dev/null; then
    echo "  Usa: docker-compose up -d"
else
    echo "  ❌ Docker Compose no instalado"
fi
