# Arquitectura Minima de Runtime para 5D

## 1. Proposito

Este documento aterriza la arquitectura minima necesaria para ejecutar prompts de forma real en el `app`, sin mezclar todavia:

- DB seria,
- multiusuario,
- ownership,
- permisos,
- ni integraciones amplias de Fase 6.

El objetivo es resolver la brecha principal actual:

**la UX ya existe, pero la ejecucion sigue siendo mockeada.**

## 2. Principio de diseño

La solucion minima no debe conectar `app/web` directamente con un proveedor de IA.

La arquitectura correcta debe separar:

1. frontend,
2. contrato de ejecucion,
3. adaptador de runtime,
4. proveedor o backend,
5. normalizacion de salida.

En corto:

**la UI no habla con el modelo; la UI habla con un runtime estable.**

## 3. Arquitectura propuesta

```text
app/web
  -> execution client
    -> runtime endpoint / adapter
      -> provider client
        -> model
      -> output normalizer
  <- normalized execution response
```

## 4. Capas minimas

### 4.1 Capa de frontend

Vive en `app/web`.

Responsabilidad:

- preparar `executionContext`
- lanzar ejecucion
- mostrar estado `running / completed / failed`
- renderizar salida normalizada
- conservar compatibilidad con sesiones, revision y trazabilidad

No debe:

- conocer detalles del proveedor
- construir prompts del proveedor en la vista
- parsear respuestas crudas del modelo dentro de los componentes

### 4.2 Capa de cliente de ejecucion

Debe vivir como servicio en frontend, por ejemplo:

```text
app/web/src/services/runtimeClient.ts
```

Responsabilidad:

- enviar `ExecutionRequest`
- recibir `ExecutionResponse`
- manejar timeout, errores HTTP y fallos de parsing
- exponer una interfaz limpia al resto del frontend

Debe tener una firma simple, por ejemplo:

```ts
executeRuntime(request): Promise<ExecutionResponse>
```

### 4.3 Capa de runtime

Puede vivir como:

- endpoint minimo en `app/api/`
- proxy ligero
- o backend pequeño separado

Responsabilidad:

- recibir el request normalizado del frontend
- construir el prompt final para el proveedor
- llamar al proveedor
- normalizar la respuesta
- devolver una respuesta estable al frontend

No debe:

- convertirse todavia en motor multiusuario
- asumir ownership, auth compleja o workflow empresarial

### 4.4 Capa de proveedor

Responsabilidad:

- encapsular OpenAI, LiteLLM u otro proveedor
- aislar llaves, modelo y opciones de inferencia
- permitir luego cambiar de proveedor sin reescribir el runtime

Sugerencia:

```text
app/api/providers/
  openai.py
  litellm.py
```

o equivalente en JS/TS si esa capa se mueve de stack.

### 4.5 Capa de normalizacion

Responsabilidad:

- transformar salida cruda del modelo en una estructura compatible con:
  - `OutputRenderer`
  - `OutputView`
  - `SessionReview`
  - trazabilidad

Debe producir un resultado seguro incluso cuando la IA devuelva:

- solo texto,
- markdown libre,
- JSON parcial,
- JSON roto,
- o una mezcla de formatos.

## 5. Contrato minimo recomendado

### 5.1 Request

```ts
type ExecutionRequest = {
  executionId: string;
  promptId: string;
  promptName: string;
  objective: string;
  deliverableType: string;
  expectedSections: string[];
  agentRole?: string;
  userInputs: Array<{ field: string; value: string | string[] }>;
  additionalContext?: string;
  notes?: string;
  services: Array<{ code: string; name: string }>;
  manuals: Array<{ id: string; name: string; path: string }>;
};
```

### 5.2 Response

```ts
type ExecutionResponse = {
  executionId: string;
  provider: string;
  model: string;
  status: 'completed' | 'failed';
  rawText: string;
  normalized: {
    type: 'text' | 'checklist' | 'plan' | 'scheme' | 'summary';
    content: string;
    structured_data?: unknown;
  };
  diagnostics?: {
    warnings: string[];
    parsingMode: 'json' | 'markdown' | 'fallback';
    latencyMs?: number;
  };
  error?: {
    code: string;
    message: string;
    retryable: boolean;
  };
};
```

### 5.3 Error

El frontend debe asumir tres familias:

- `network_error`
- `provider_error`
- `normalization_error`

## 6. Estrategia minima de ejecucion

### Paso 1. Preparacion

El frontend ya prepara:

- `Execution`
- `executionContext`
- `outputBlueprint`

Eso se reutiliza.

### Paso 2. Mapeo a request

Agregar un mapper:

```text
Execution -> ExecutionRequest
```

### Paso 3. Llamada al runtime

El frontend llama a:

```text
POST /runtime/execute
```

o endpoint equivalente.

### Paso 4. Normalizacion

El runtime devuelve:

- `rawText`
- `normalized`
- `diagnostics`

### Paso 5. Mapeo de vuelta

El frontend convierte `ExecutionResponse` en el `ExecutionResult` que la UI ya espera.

## 7. Endpoint minimo recomendado

### Opcion preferida

```text
POST /api/runtime/execute
```

### Payload

- `ExecutionRequest`

### Respuesta

- `ExecutionResponse`

### Por que esta opcion

- mantiene una sola entrada clara
- permite luego sumar auth o logging sin romper contrato
- evita que `app/web` se acople a SDKs del proveedor

## 8. Construccion del prompt al proveedor

La capa runtime debe construir el prompt del modelo a partir de:

1. rol del agente
2. objetivo del prompt
3. contexto del usuario
4. servicios relacionados
5. manuales de referencia
6. formato esperado de salida

La regla es:

- el frontend manda estructura
- el runtime compone prompt final

No al reves.

## 9. Estrategia de normalizacion

### Nivel 1. Intentar salida estructurada

Pedir al runtime que responda en JSON simple cuando sea viable.

### Nivel 2. Parseo tolerante

Si no llega JSON valido:

- intentar extraer markdown estructurado
- inferir listas, secciones o bullets

### Nivel 3. Fallback seguro

Si nada funciona:

- devolver `type: text`
- `content` con texto completo
- y `diagnostics.parsingMode = 'fallback'`

La regla es:

**nunca romper la UI por una respuesta imperfecta.**

## 10. Estrategia de errores

### Frontend

Debe poder mostrar:

- no se pudo ejecutar
- el proveedor no respondio
- la salida se obtuvo con degradacion

### Runtime

Debe devolver errores claros y retryables cuando aplique.

### UX minima

- boton de reintento
- mensaje honesto
- no ocultar que fue una respuesta parcial o degradada

## 11. Compatibilidad con la UI actual

La arquitectura minima debe reutilizar:

- `prepareExecution`
- `Launcher`
- `OutputView`
- `OutputRenderer`
- `SessionReview`

El cambio ideal es:

- reemplazar `executeMock`
- no reescribir Fase 2, 3 y 4

## 12. Fallback de desarrollo

Durante implementacion, puede mantenerse un fallback controlado:

- `runtime unavailable -> executeMock`

Pero debe ser:

- explicito
- temporal
- y visible en logs o diagnostics

No debe seguir siendo el camino principal cuando 5D se considere cerrado.

## 13. Variables de configuracion minimas

Ejemplos:

```text
RUNTIME_BASE_URL=
RUNTIME_PROVIDER=
RUNTIME_MODEL=
RUNTIME_TIMEOUT_MS=
```

Si el runtime vive dentro de `app/api`, al menos separar:

- configuracion de proveedor
- configuracion de modelo
- timeout

## 14. Criterio de implementacion minima

La arquitectura minima esta bien si logra esto:

1. el usuario ejecuta desde el flujo actual
2. el request sale estructurado
3. el runtime llama a un proveedor real
4. la salida vuelve normalizada
5. la UI la renderiza sin romperse
6. los errores degradan bien

## 15. Criterio de no hacer todavia

No meter aun:

- job queue compleja
- websockets avanzados
- historial multiusuario
- permisos
- auditoria completa de proveedor
- switching complejo entre muchos modelos

## 16. Recomendacion concreta

La implementacion minima mas sana seria:

1. `runtimeClient.ts` en frontend
2. `POST /api/runtime/execute`
3. `executionMapper.ts`
4. `provider adapter`
5. `outputNormalizer.ts`
6. reemplazo controlado de `executeMock`

## 17. Conclusión

La arquitectura minima de `5D` no debe intentar resolver toda la plataforma.

Debe resolver solo esto:

**que el `app` ejecute de verdad sin romper la experiencia ya construida.**
