# Fase 1 · Bloque 1A

## Shell y Navegacion

## 1. Objetivo del bloque

Construir la base navegable del `app` para que exista una experiencia inicial coherente, aunque todavía no estén listas todas las vistas de contenido.

Este bloque no debe intentar resolver todo Fase 1. Su objetivo es cerrar la infraestructura visible mínima del producto:

- layout base,
- navegación principal,
- home,
- rutas principales.

## 2. Resultado esperado

Al cerrar este bloque, debe existir una aplicación con:

- una estructura visual estable,
- una navegación principal clara,
- una pantalla de inicio útil,
- y rutas base que permitan crecer el resto de módulos sin rehacer el shell.

En otras palabras:

**el usuario ya puede entrar al producto, entender dónde está y moverse entre las áreas principales, aunque muchas vistas todavía muestren estado preliminar.**

## 3. Lo que sí incluye

### 3.1 Shell del producto

Debe incluir:

- estructura base de aplicación,
- layout responsivo,
- header o top navigation,
- sidebar o navegación principal si aplica,
- área principal de contenido,
- footer o metadata ligera si aporta valor.

### 3.2 Home

Debe incluir:

- propuesta de entrada por rol,
- propuesta de entrada por disciplina,
- accesos rápidos a flujos,
- acceso visible a búsqueda,
- una jerarquía visual que explique qué es el `app`.

### 3.3 Router base

Debe incluir rutas vacías o mínimas para:

- `/`
- `/roles`
- `/disciplinas`
- `/flujos`
- `/prompts`
- `/agentes`
- `/servicios`
- `/manuales`
- `/buscar`

No todas estas rutas deben estar completas, pero sí deben existir como estructura navegable.

### 3.4 Navegacion principal

Debe incluir:

- acceso persistente a módulos principales,
- estado activo de navegación,
- comportamiento claro en desktop y móvil,
- patrón consistente entre rutas.

## 4. Lo que no incluye

Este bloque no debe implementar todavía:

- fichas completas de prompts,
- fichas completas de agentes,
- búsqueda real,
- formularios por `input_type`,
- outputs por `deliverable_type`,
- sesiones,
- estado persistente,
- integración profunda con backend.

Si aparece algo de eso, debe quedar solo como placeholder estructural, no como feature parcial mal cerrada.

## 5. Dependencias de datos

Este bloque puede apoyarse en:

- `base/json/navigation_map.json`
- `base/json/roles_map.json`
- `base/json/taxonomy.json`

Pero no necesita consumir todavía todo el sistema.

La regla es:

- usar datos reales donde aporte estabilidad,
- evitar sobreconstruir integración antes de tiempo.

## 6. Preguntas que este bloque debe resolver

El usuario debe poder responder rápidamente:

- ¿qué es esta app?
- ¿por dónde empiezo?
- ¿cómo entro por rol o disciplina?
- ¿qué zonas principales existen?
- ¿qué camino seguiré después?

## 7. Criterios de UX

- La navegación debe ser obvia sin tutorial.
- La home debe orientar, no decorar.
- El layout debe estar listo para escalar.
- El móvil no debe ser un fallback roto.
- La interfaz debe sentirse como producto, no como demo.

## 8. Criterios técnicos

- el shell debe ser reutilizable,
- las rutas deben quedar organizadas para crecimiento,
- no duplicar navegación entre vistas,
- evitar acoplar layout a contenido específico,
- preparar puntos de extensión para Bloque 1B y 1C.

## 9. Entregables concretos

El agente que implemente este bloque debería entregar:

1. shell base del frontend,
2. home funcional,
3. navegación principal,
4. rutas principales creadas,
5. placeholders coherentes para pantallas aún no implementadas,
6. nota breve de decisiones de arquitectura tomadas.

## 10. Definicion de terminado

El Bloque 1A se considera terminado cuando:

- el `app` abre con una estructura clara,
- la navegación principal está resuelta,
- la home orienta al usuario correctamente,
- las rutas base existen y no requieren rehacer el layout,
- y el producto ya está listo para que otro agente tome el Bloque 1B sin romper el shell.
