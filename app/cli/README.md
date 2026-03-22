# Live Developer CLI (`live`)

Herramienta de navegación inteligente para el workspace de Live Developer.

> **Nota**: `live` es el comando principal. `ld` se mantiene como alias por compatibilidad.

## Instalación

```bash
# Desde el directorio raíz del workspace
cd /Users/dcalisaya/Developer/Prompts
pip install -e app/cli/
```

## Comandos

### Navegación por Rol

```bash
live role comercial           # Ver recursos para comercial/ventas
live role desarrollo          # Ver recursos para desarrollo
live role estratega           # Ver recursos para marketing
live role produccion          # Ver recursos para producción audiovisual
```

### Buscar Agentes

```bash
live agent estratega          # Abre EstrategaDigital.md
live agent director           # Lista directores disponibles
live agent techlead           # Abre TechLeadFullStack.md
```

### Buscar Prompts

```bash
live prompt COM-001           # Asesor Comercial
live prompt DEV-002           # Arquitectura de Software
live prompt FUN-001           # Generador de Funnel
```

### Flujos de Trabajo

```bash
live flow proforma            # Secuencia completa para cotizar
live flow podcast             # Flujo de producción de podcast
live flow desarrollo          # Flujo de desarrollo de software
```

### Búsqueda Global

```bash
live find "cotización"        # Busca en agentes, prompts y servicios
live find "podcast" --en prompts
live find "video" --en servicios
```

### Información de Servicios

```bash
live servicio AV-001          # Información de servicio audiovisual
live servicio DEV-002         # Información de desarrollo web app
```

### Índices

```bash
live index                    # Muestra índices disponibles
live index --refresh          # Regenera índices markdown
live index --abrir            # Abre índice maestro
```

## Autocompletado

Para habilitar autocompletado en tu shell:

```bash
# Bash
live --install-completion bash

# Zsh
live --install-completion zsh

# Fish
live --install-completion fish
```

## Estructura

```
app/cli/
├── pyproject.toml          # Configuración del paquete
├── README.md               # Este archivo
└── live_dev/
    ├── __init__.py
    └── main.py             # Código principal
```

## Desarrollo

Para modificar el CLI:

1. Edita `app/cli/live_dev/main.py`
2. Reinstala: `pip install -e app/cli/`
3. Prueba: `live --help`

## Integración con Open WebUI

El CLI puede trabajar junto con la interfaz web:

- CLI para navegación rápida desde terminal
- Open WebUI para conversaciones con agentes
- API para integraciones automatizadas
