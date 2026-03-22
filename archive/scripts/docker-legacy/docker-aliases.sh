#!/bin/bash
# Alias útiles para Docker - Live Developer
# Agrega esto a tu ~/.zshrc o ~/.bashrc

PROJECT_DIR="/Users/dcalisaya/Developer/Prompts"
DOCKER_DIR="$PROJECT_DIR/app/docker"
COMPOSE_FILE="$DOCKER_DIR/docker-compose.direct.yml"

# Navegación
alias cdld='cd $PROJECT_DIR'
alias cdlld='cd $DOCKER_DIR'

# Docker Compose
alias ld-up="docker-compose -f $COMPOSE_FILE up -d"
alias ld-down="docker-compose -f $COMPOSE_FILE down"
alias ld-restart="docker-compose -f $COMPOSE_FILE restart"
alias ld-ps="docker-compose -f $COMPOSE_FILE ps"
alias ld-logs="docker-compose -f $COMPOSE_FILE logs -f"
alias ld-log-webui="docker-compose -f $COMPOSE_FILE logs -f open-webui"
alias ld-update="docker-compose -f $COMPOSE_FILE pull && docker-compose -f $COMPOSE_FILE up -d"

# Utilidades
alias ld-backup="$PROJECT_DIR/scripts/backup-docker.sh"
alias ld-clean="docker system prune -f && docker volume prune -f"
alias ld-stats="docker stats"
alias ld-url="echo 'http://localhost:3000' && open http://localhost:3000"

# Status rápido
alias ld-status='
echo "=== Live Developer Status ===" && \
docker-compose -f $COMPOSE_FILE ps && \
echo "" && \
echo "URLs:" && \
echo "  WebUI: http://localhost:3000" && \
echo "  Ollama: http://localhost:11434" && \
echo "" && \
curl -s http://localhost:11434/api/tags | grep -o '"name":"[^"]*"' | cut -d'"' -f4 | head -5 | xargs -I {} echo "  Model: {}"
'

echo "Alias cargados. Usa:"
echo "  ld-up       - Iniciar stack"
echo "  ld-down     - Detener stack"
echo "  ld-logs     - Ver logs"
echo "  ld-status   - Estado rápido"
echo "  ld-url      - Abrir WebUI"
