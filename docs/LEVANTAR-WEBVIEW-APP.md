# Levantar App en WebView

Este documento fija la convencion minima para exponer el `app/web` en un WebView (WV) o a traves de un subdominio mapeado por NPM/proxy.

## Objetivo

Definir:

- que servicio se levanta
- en que puerto debe correr
- como debe ser referenciado desde un subdominio
- que dependencias operativas conviene tener presentes

## Servicio a levantar

El servicio frontend del producto vive en:

- `app/web`

El comando base de desarrollo es:

```bash
cd app/web
npm run dev -- --host 0.0.0.0 --port 5173
```

## Puerto canonico para WebView

El puerto reservado para el frontend del `app` es:

- `5173`

Razon:

- ya conversa con la convencion natural de Vite
- evita ambiguedad para desarrollo local
- permite mapear el WV o un reverse proxy siempre al mismo target

## URL local esperada

La URL local base para el `app` debe ser:

```text
http://127.0.0.1:5173
```

Si el entorno requiere acceso por red local:

```text
http://0.0.0.0:5173
```

## Mapeo a subdominio

Si NPM, proxy o infraestructura local va a publicar el `app` en un subdominio, la convencion recomendada es:

```text
app.<dominio>  ->  http://127.0.0.1:5173
```

Ejemplos:

- `app.local.midominio.com -> 127.0.0.1:5173`
- `workspace.midominio.com -> 127.0.0.1:5173`

La decision de nombre de subdominio puede variar, pero el target interno debe mantenerse estable en `5173`.

## Dependencia opcional de runtime

Si se quiere usar ejecucion real de IA (`5D`) en vez de fallback mock, el frontend tambien espera un runtime compatible, por defecto:

```text
http://127.0.0.1:5001/v1/chat/completions
```

Variables relevantes:

- `VITE_API_RUNTIME_URL`
- `VITE_AI_MODEL`
- `VITE_AI_TIMEOUT_MS`
- `VITE_AI_RUNTIME_FALLBACK_TO_MOCK`

Esto no cambia el puerto del WV. Solo afecta la capacidad de ejecucion real.

## Recomendacion operativa

Para WebView o subdominio interno:

1. levantar `app/web` en `5173`
2. mapear el subdominio al target `127.0.0.1:5173`
3. si aplica, levantar tambien el runtime IA en `5001`
4. verificar que el build siga sano antes de publicar

## Nota de alcance

Este documento define solo la convencion de levantamiento y mapeo del frontend.

No define todavia:

- despliegue productivo definitivo
- TLS
- balanceo
- multiusuario
- persistencia backend

Eso pertenece a fases posteriores de plataforma.
