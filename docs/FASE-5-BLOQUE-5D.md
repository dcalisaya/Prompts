# Fase 5 · Bloque 5D

## Runtime de Ejecucion Real

## 1. Objetivo del bloque

Implementar la arquitectura minima para pasar de `executeMock` a ejecucion real, sin convertir todavia el producto en una plataforma multiusuario completa ni mezclar este salto con la Fase 6.

Este bloque existe para cerrar la mayor brecha actual del `app`:

- la UX ya modela ejecucion,
- pero el runtime sigue siendo simulado.

## 2. Resultado esperado

Al cerrar este bloque, el sistema ya debe poder:

- enviar un `executionContext` real a un runtime,
- recibir una respuesta real de un motor de IA,
- manejar errores y tiempos de espera razonables,
- normalizar la salida para que la UI no se rompa,
- y seguir usando los flujos, sesiones y vistas ya construidos.

En otras palabras:

**el `app` deja de simular ejecucion y empieza a ejecutar de verdad, aunque todavia en una arquitectura minima.**

## 3. Lo que si incluye

### 3.1 Contrato frontend-runtime

Debe existir un contrato minimo y claro entre `app/web` y una capa de ejecucion:

- request de ejecucion,
- response de ejecucion,
- estados de error,
- timeout o fallo controlado,
- y estructura basica de salida.

### 3.2 Adaptador de runtime

Debe existir una capa intermedia que permita cambiar el proveedor o backend despues sin reescribir la UI.

No se debe acoplar la vista directamente a una llamada improvisada al proveedor final.

### 3.3 Ejecucion real de prompts

El bloque debe reemplazar o encapsular `executeMock` con una ejecucion real, idealmente usando:

- API propia minima,
- gateway,
- LiteLLM,
- OpenAI,
- u otra capa equivalente.

### 3.4 Normalizacion de outputs

La salida real de IA sera mas ruidosa que el mock actual.

Debe existir una normalizacion minima para:

- texto,
- checklist,
- plan,
- esquema,
- summary,
- y fallback seguro.

### 3.5 Manejo de errores y degradacion

La UX debe soportar:

- error de red,
- error del proveedor,
- salida vacia,
- salida parcialmente estructurada,
- y respuesta tardia.

## 4. Lo que no incluye

Este bloque no debe implementar todavia:

- multiusuario real,
- ownership,
- permisos,
- DB completa,
- CRM,
- historial multi-tenant,
- orquestacion compleja entre varios agentes.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- `executionContext`
- `Execution`
- briefs y launcher de Fase 2
- sesiones y trazabilidad de Fase 3
- revision de Fase 4
- asistencia de Fase 5

## 6. Preguntas que este bloque debe resolver

El equipo debe poder responder:

- ¿como sale hoy una ejecucion real desde el frontend?
- ¿que payload se manda exactamente?
- ¿que formato minimo debe devolver el runtime?
- ¿como se normaliza una respuesta sucia o incompleta?
- ¿como se integra esto sin romper las fases ya implementadas?

## 7. Criterios de UX

- el usuario no debe sentir que entro a otro producto
- la experiencia actual de brief -> launcher -> output debe mantenerse
- los errores deben ser honestos y legibles
- el sistema no debe prometer certeza si el runtime falla

## 8. Criterios tecnicos

- no acoplar la UI directamente al proveedor de IA
- separar contrato, cliente y normalizacion
- permitir cambiar luego a backend propio
- soportar mocks temporales solo como fallback de desarrollo
- no romper build ni rutas actuales

## 9. Contratos minimos esperados

La implementacion deberia apoyarse, como minimo, en:

- `ExecutionRequest`
- `ExecutionResponse`
- `ExecutionError`
- adaptador de runtime
- normalizador de output

## 10. Entregables concretos

El agente que implemente este bloque deberia entregar:

1. contrato minimo de ejecucion real
2. cliente o adaptador de runtime
3. integracion con launcher y output
4. normalizacion minima de respuesta
5. manejo de error y estados de ejecucion
6. nota de limites actuales del runtime

## 11. Definicion de terminado

El Bloque 5D se considera terminado cuando:

- el producto ya no depende solo de `executeMock`
- existe una ruta real de ejecucion
- las salidas reales pueden renderizarse sin romper la UI
- y Fase 6 puede empezar sobre una base que ya produce valor real
