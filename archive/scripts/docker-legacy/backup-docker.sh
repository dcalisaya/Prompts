#!/bin/bash
# Backup completo de Docker - Live Developer

set -e

PROJECT_DIR="/Users/dcalisaya/Developer/Prompts"
BACKUP_DIR="$PROJECT_DIR/backups/$(date +%Y%m%d_%H%M%S)"
DOCKER_DIR="$PROJECT_DIR/app/docker"

echo "======================================================================"
echo "💾 BACKUP - Live Developer Docker"
echo "======================================================================"
echo ""
echo "Destino: $BACKUP_DIR"
echo ""

# Crear directorio
mkdir -p "$BACKUP_DIR"

# Backup de volúmenes
echo "📦 Respaldando volúmenes..."
docker run --rm \
    -v docker_open-webui-data:/data \
    -v "$BACKUP_DIR":/backup \
    alpine tar czf /backup/open-webui-data.tar.gz -C /data . 2>/dev/null || echo "⚠️  No se pudo respaldar volumen"

# Backup de configuraciones
echo "⚙️  Respaldando configuraciones..."
cp -r "$DOCKER_DIR" "$BACKUP_DIR/"

# Backup de JSON generados
echo "📊 Respaldando datos..."
cp -r "$PROJECT_DIR/base/json" "$BACKUP_DIR/" 2>/dev/null || echo "⚠️  JSON no encontrado"

# Info del sistema
echo "📝 Guardando información..."
docker ps > "$BACKUP_DIR/containers.txt"
docker images > "$BACKUP_DIR/images.txt"
docker volume ls > "$BACKUP_DIR/volumes.txt"

# Listar modelos de Ollama
curl -s http://localhost:11434/api/tags > "$BACKUP_DIR/ollama-models.json" 2>/dev/null || echo "⚠️  Ollama no responde"

echo ""
echo "======================================================================"
echo "✅ BACKUP COMPLETADO"
echo "======================================================================"
echo ""
echo "Ubicación: $BACKUP_DIR"
echo ""
echo "Contenido:"
ls -lh "$BACKUP_DIR"
echo ""
echo "Para restaurar:"
echo "  ./scripts/restore-docker.sh $BACKUP_DIR"
echo ""
