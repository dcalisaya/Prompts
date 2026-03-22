# Fase 1 · Bloque 1D

## Busqueda Inicial

## 1. Objetivo del bloque

Implementar una búsqueda inicial útil dentro del `app` para que el usuario pueda encontrar recursos por texto y aplicar filtros básicos por metadata.

Este bloque debe cerrar la Fase 1 como un knowledge hub verdaderamente operable:

- navegar ya no solo por entradas fijas,
- sino también encontrar recursos por intención, nombre o atributo.

## 2. Resultado esperado

Al cerrar este bloque, el usuario ya debe poder:

- escribir una consulta simple,
- obtener resultados relevantes,
- distinguir por tipo de recurso,
- y refinar la búsqueda con filtros básicos.

En otras palabras:

**el `app` pasa de exploración estructurada a recuperación útil de información para trabajo real.**

## 3. Lo que sí incluye

### 3.1 Caja de búsqueda global

Debe incluir:

- campo de búsqueda visible y persistente en zonas principales del producto,
- activación desde la ruta `/buscar`,
- estado vacío útil,
- feedback claro cuando no hay resultados.

### 3.2 Resultados por tipo de recurso

Debe incluir resultados, como mínimo, para:

- prompts,
- agentes,
- servicios,
- manuales.

Los resultados deben distinguirse visualmente por tipo y permitir acceso rápido a la ficha correspondiente.

### 3.3 Coincidencias por texto

La búsqueda inicial debe cubrir, como mínimo:

- nombre,
- descripción,
- disciplina,
- categoría,
- tags,
- stage,
- service code o nombre comercial cuando aplique.

No hace falta implementar búsqueda semántica todavía. Esto es búsqueda textual y estructurada inicial.

### 3.4 Filtros básicos

Debe incluir filtros razonables por:

- tipo de recurso,
- disciplina,
- etapa si aplica,
- categoría o familia si aplica.

Los filtros deben apoyarse en metadata real, no en listas inventadas en frontend.

### 3.5 Relación con navegación existente

Debe incluir:

- acceso desde home y navegación principal,
- capacidad de llegar desde resultados a fichas ya construidas en Bloque 1C,
- continuidad visual con el resto del producto.

## 4. Lo que no incluye

Este bloque no debe implementar todavía:

- búsqueda semántica,
- ranking por machine learning,
- historial de consultas,
- sugerencias inteligentes por contexto,
- autocompletado avanzado,
- indexación externa,
- búsqueda dentro de outputs o sesiones.

Tampoco debe depender de backend complejo si puede resolverse bien en el frontend con los JSON actuales.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- `base/json/prompts_operativos.json`
- `base/json/agentes_maestros.json`
- `base/json/services.json`
- `base/json/service_matrix.json`
- cualquier adaptador de manuales construido en Bloque 1C

La implementación puede construir un índice liviano de búsqueda en memoria, siempre que sea claro, mantenible y consistente con los contratos actuales.

## 6. Limitaciones actuales a considerar

La implementación debe asumir explícitamente estas realidades:

- `services.json` no trae `service_code`; eso vive en `service_matrix.json`,
- los manuales no tienen un JSON tan rico como prompts o agentes,
- algunas relaciones entre recursos siguen parciales,
- la metadata existe, pero no siempre es igual de densa entre todos los tipos.

La regla es:

- componer datos cuando haga falta,
- no degradar la interfaz por campos faltantes,
- y evitar que el buscador dependa de supuestos frágiles.

## 7. Preguntas que este bloque debe resolver

El usuario debe poder responder rápidamente:

- ¿dónde encuentro un prompt para esta necesidad?
- ¿qué agente se relaciona con este tema?
- ¿qué servicio coincide con lo que necesito vender o ejecutar?
- ¿qué manual respalda este trabajo?
- ¿cómo reduzco resultados a algo accionable?

## 8. Criterios de UX

- Buscar debe ser más rápido que navegar varias pantallas.
- El resultado debe ser escaneable.
- El tipo de recurso debe entenderse de inmediato.
- Los filtros deben ayudar a reducir ruido, no a complicar la pantalla.
- El estado vacío debe orientar, no frustrar.

## 9. Criterios técnicos

- separar indexación, búsqueda y presentación,
- normalizar una estructura mínima de resultado entre tipos de recurso,
- evitar acoplar el buscador a una sola fuente,
- reutilizar fichas y rutas ya construidas en Bloques 1B y 1C,
- dejar la arquitectura lista para una búsqueda más avanzada en fases posteriores.

## 10. Contratos mínimos esperados por tipo

### Prompts

La búsqueda debería indexar, como mínimo:

- `id`
- `name`
- `discipline`
- `category`
- `stage`
- `tags`
- `objective`
- `when_to_use`

### Agentes

La búsqueda debería indexar, como mínimo:

- `name`
- `role`
- `discipline`
- `description`
- `skills`
- `tasks`
- `stage`

### Servicios

La búsqueda debería componer, como mínimo, desde `services.json` y `service_matrix.json`:

- `service_name`
- `category`
- `description`
- `service_code`

### Manuales

La búsqueda debería indexar, como mínimo:

- nombre legible,
- disciplina o familia,
- ruta fuente,
- y relaciones derivadas disponibles.

## 11. Entregables concretos

El agente que implemente este bloque debería entregar:

1. vista de búsqueda global,
2. motor o adaptador de búsqueda local,
3. resultados agrupados o filtrables por tipo,
4. filtros básicos por metadata,
5. integración con rutas y fichas ya existentes,
6. nota breve de decisiones de ranking o matching tomadas.

## 12. Definicion de terminado

El Bloque 1D se considera terminado cuando:

- el usuario puede buscar recursos por texto,
- los resultados incluyen prompts, agentes, servicios y manuales,
- los filtros básicos ya funcionan,
- la navegación desde resultados hacia fichas es estable,
- y la Fase 1 queda cerrada como knowledge hub operable.
