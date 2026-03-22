# Fase 1 · Bloque 1B

## Exploracion por Rol y Disciplina

## 1. Objetivo del bloque

Implementar la primera capa real de exploración del `app` sobre el shell construido en el Bloque 1A.

Este bloque debe permitir que el usuario descubra recursos relevantes sin conocer la estructura del repo ni los nombres internos de los archivos.

La entrada principal de este bloque es:

- por rol,
- por disciplina.

## 2. Resultado esperado

Al cerrar este bloque, el usuario ya debe poder:

- explorar roles disponibles,
- entrar al detalle de un rol,
- explorar disciplinas disponibles,
- entrar al detalle de una disciplina,
- y entender qué recursos están asociados a cada entrada.

En otras palabras:

**el `app` deja de ser solo un shell navegable y pasa a ser un hub utilizable para descubrimiento estructurado.**

## 3. Lo que sí incluye

### 3.1 Vista de roles

Debe incluir:

- listado de roles,
- nombre del rol,
- disciplina asociada,
- descripción breve,
- outcomes esperados,
- cantidad o resumen de recursos relacionados si aplica.

### 3.2 Detalle de rol

Debe incluir:

- nombre del rol,
- disciplina,
- descripción,
- outcomes,
- documentos o recursos asociados,
- acceso visible a recursos relacionados aunque algunos todavía sean placeholders.

### 3.3 Vista de disciplinas

Debe incluir:

- listado de disciplinas,
- nombre de disciplina,
- resumen breve,
- agrupación de roles asociados,
- señal útil de cobertura o densidad de recursos si puede inferirse de los datos actuales.

### 3.4 Detalle de disciplina

Debe incluir:

- nombre de la disciplina,
- roles asociados,
- recursos vinculados,
- accesos a prompts, agentes, manuales o flujos relacionados cuando existan,
- una estructura que permita crecer luego hacia la biblioteca completa sin rehacer la pantalla.

### 3.5 Integración con navegación existente

Debe incluir:

- entrada desde la home,
- navegación clara entre listado y detalle,
- patrón coherente de breadcrumbs, tabs o secciones si aplica,
- continuidad entre desktop y móvil.

## 4. Lo que no incluye

Este bloque no debe implementar todavía:

- fichas completas de prompts,
- fichas completas de agentes,
- búsqueda global,
- ejecución de prompts,
- formularios por `input_type`,
- persistencia de sesiones,
- lógica editorial o de permisos.

Si hace falta mostrar recursos, puede hacerse como tarjetas, listas o referencias navegables preparadas para Bloque 1C.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- `base/json/roles_map.json`
- `base/json/navigation_map.json`
- `base/json/taxonomy.json`

La regla es:

- priorizar contratos de datos ya generados,
- evitar hardcodear roles o disciplinas,
- y preparar adaptadores simples para que el frontend no dependa del formato crudo más de lo necesario.

## 6. Preguntas que este bloque debe resolver

El usuario debe poder responder rápidamente:

- ¿qué roles existen en el sistema?
- ¿qué hace cada rol?
- ¿qué disciplina cubre cada rol?
- ¿cómo entro a una disciplina sin conocer el nombre de los prompts?
- ¿qué recursos se asocian a ese rol o disciplina?

## 7. Criterios de UX

- La exploración debe sentirse guiada, no técnica.
- Los nombres deben ser legibles y útiles para negocio.
- El detalle de rol no debe parecer una página vacía con links sueltos.
- El detalle de disciplina debe agrupar y dar contexto, no solo listar.
- Móvil debe mantener jerarquía y navegación clara.

## 8. Criterios técnicos

- separar adaptadores de datos de componentes visuales,
- reutilizar el shell del Bloque 1A,
- no duplicar lógica entre roles y disciplinas,
- preparar componentes que luego sirvan para Bloque 1C,
- permitir crecimiento de metadata sin reescribir las vistas.

## 9. Contratos mínimos esperados

La implementación debería asumir, como mínimo:

- `roles_map.json` como fuente principal de roles,
- `discipline` como campo base de agrupación,
- `documents` como primer puente hacia recursos asociados,
- `outcome` como insumo para valor esperado del rol,
- `navigation_map.json` y `taxonomy.json` como apoyo para consistencia de labels y rutas.

Si alguna disciplina necesita derivarse agrupando roles, eso debe quedar encapsulado en un selector o adaptador explícito.

## 10. Entregables concretos

El agente que implemente este bloque debería entregar:

1. vista de listado de roles,
2. vista de detalle de rol,
3. vista de listado de disciplinas,
4. vista de detalle de disciplina,
5. adaptadores o selectores para `roles_map.json` y agrupación por disciplina,
6. integración con el router y navegación del Bloque 1A,
7. nota breve de decisiones de modelado tomadas.

## 11. Definicion de terminado

El Bloque 1B se considera terminado cuando:

- el usuario puede explorar roles y disciplinas desde el `app`,
- las vistas consumen datos reales de `base/json`,
- la navegación entre listados y detalles ya funciona,
- la estructura deja preparado el camino para fichas de recursos en Bloque 1C,
- y no hace falta rehacer layout ni routing para continuar la Fase 1.
