# Instalar Docker en Mac sin Docker Desktop

## Opción 1: Colima (Recomendada)

Colima es un contenedor ligero para Mac/Linux que usa Lima (máquina virtual) + containerd. Es más liviano que Docker Desktop.

### Instalación

```bash
# 1. Instalar Colima y Docker CLI
brew install colima docker docker-compose

# 2. Iniciar Colima (crea VM con Docker)
colima start

# 3. Verificar
docker ps
docker-compose version
```

### Uso

```bash
# Iniciar VM con Docker
colima start

# Detener
colima stop

# Ver estado
colima status

# Con recursos específicos (CPU, RAM)
colima start --cpu 4 --memory 8

# Eliminar VM y recrear
colima delete
colima start
```

### Configuración para Live Developer

```bash
# Iniciar con suficientes recursos para los modelos
colima start --cpu 4 --memory 8 --disk 100

# Verificar que Docker funciona
docker run hello-world

# Levantar stack
cd /Users/dcalisaya/Developer/Prompts/app/docker
docker compose up -d
```

---

## Opción 2: Rancher Desktop

Alternativa open source con GUI, más pesada que Colima pero más completa.

```bash
brew install --cask rancher
```

---

## Opción 3: Podman

Alternativa 100% open source, compatible con Docker CLI.

```bash
brew install podman podman-compose

# Iniciar máquina
podman machine init
podman machine start

# Usar como docker
alias docker=podman
alias docker-compose=podman-compose
```

⚠️ **Nota**: Podman tiene algunas diferencias con Docker, puede requerir ajustes.

---

## Comparación

| Opción | GUI | Peso | Licencia | Fácil de usar |
|--------|-----|------|----------|---------------|
| **Docker Desktop** | ✅ Sí | Pesado | Gratis personal/Pago empresas | ⭐⭐⭐ |
| **Colima** | ❌ No | Liviano | Open Source | ⭐⭐⭐ |
| **Rancher Desktop** | ✅ Sí | Medio | Open Source | ⭐⭐⭐ |
| **Podman** | ❌ No | Liviano | Open Source | ⭐⭐ |

---

## Recomendación para tu caso

Usa **Colima**:

```bash
# Instalación única
brew install colima docker docker-compose

# Uso diario
colima start
cd app/docker && docker compose up -d
```

### Ventajas de Colima:
- ✅ No necesitas Docker Desktop
- ✅ Usa menos recursos (RAM/CPU)
- ✅ Inicio más rápido
- ✅ CLI-only (ideal para desarrolladores)
- ✅ Compatible 100% con docker-compose

### Desventajas:
- ❌ No tiene GUI (pero no la necesitas)
- ❌ Menos "polished" que Docker Desktop

---

## Troubleshooting Colima

### "Cannot connect to Docker daemon"

```bash
# Asegúrate de que Colima está corriendo
colima status

# Si no, iniciar
colima start

# Si persiste, reiniciar
colima stop
colima start
```

### "No space left on device"

```bash
# Colima por default tiene disco limitado
colima stop
colima delete

# Crear con más espacio
colima start --disk 100
```

### Puerto 5000 ocupado en Mac (AirPlay)

```bash
# Cambiar puertos en docker-compose.yml
# O detener AirPlay:
sudo lsof -ti:5000 | xargs sudo kill -9
```

---

## Comandos útiles

```bash
# Ver recursos usados
colima status
docker stats

# Logs de Colima
colima logs

# SSH a la VM de Colima
colima ssh

# Actualizar Colima
brew upgrade colima
```
