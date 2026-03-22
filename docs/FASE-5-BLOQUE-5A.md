# Fase 5 · Bloque 5A

## Recomendacion Contextual

## 1. Objetivo del bloque

Implementar la primera capa de recomendacion contextual del `app` para que el sistema deje de depender solo de navegacion manual y pueda sugerir el recurso correcto segun la intencion del usuario.

Este bloque debe abrir Fase 5 resolviendo:

- que prompt conviene usar,
- que servicio o disciplina aplica mejor,
- y que opcion parece mas pertinente segun el contexto ya disponible.

## 2. Resultado esperado

Al cerrar este bloque, el usuario ya debe poder:

- recibir sugerencias de prompts, servicios o flujos,
- ver recomendaciones segun intencion, etapa o disciplina,
- y reducir friccion al elegir por donde empezar o continuar.

En otras palabras:

**el `app` deja de depender solo de exploracion manual y empieza a orientar activamente el siguiente recurso correcto.**

## 3. Lo que si incluye

### 3.1 Recomendacion por intencion

El sistema debe poder sugerir recursos cuando detecta que el usuario busca, por ejemplo:

- cotizar,
- planificar contenido,
- estructurar desarrollo,
- mejorar CX/CRM,
- revisar un entregable,
- o continuar un flujo existente.

### 3.2 Recomendacion por servicio o disciplina

El sistema debe poder usar metadata ya existente para sugerir:

- prompts relacionados con un servicio,
- recursos de una disciplina,
- o flujos coherentes con el tipo de trabajo.

### 3.3 Recomendacion por etapa

Debe poder distinguir si el usuario esta:

- explorando,
- armando brief,
- ejecutando,
- revisando,
- o buscando siguiente paso.

Las recomendaciones no deben ser iguales en todas las pantallas.

### 3.4 Explicacion minima

La recomendacion debe dejar claro por que aparece.

No hace falta un motor explicativo complejo, pero si una justificacion breve como:

- “relacionado con este servicio”
- “usado en este flujo”
- “sugerido por disciplina”

## 4. Lo que no incluye

Este bloque no debe implementar todavia:

- IA conversacional compleja,
- embedding search,
- ranking sofisticado,
- aprendizaje automatico,
- personalizacion por usuario,
- recomendaciones generadas por backend externo.

## 5. Dependencias de datos

Este bloque debe apoyarse principalmente en:

- metadata de prompts, agentes, servicios y manuales,
- roles, disciplinas y flujos,
- sesiones, estado y trazabilidad de fases previas,
- y reglas explicitas en frontend si hacen falta.

## 6. Preguntas que este bloque debe resolver

El usuario debe poder responder rapidamente:

- ¿que recurso me conviene usar ahora?
- ¿que prompt aplica mejor a este caso?
- ¿que flujo deberia seguir?
- ¿que servicio se conecta con lo que acabo de hacer?

## 7. Criterios de UX

- La recomendacion debe sentirse util, no invasiva.
- Debe ser facil de entender.
- Debe reducir duda y clics innecesarios.

## 8. Criterios tecnicos

- separar reglas de recomendacion de la UI,
- reutilizar metadata actual antes de inventar heuristicas complejas,
- permitir evolucion futura hacia recomendaciones mas inteligentes,
- y no romper la navegacion manual existente.

## 9. Contratos minimos esperados

La implementacion deberia apoyarse, como minimo, en:

- reglas de recomendacion por intencion, servicio o etapa,
- una estructura de items recomendados,
- justificacion minima visible,
- e integracion con pantallas relevantes.

## 10. Entregables concretos

El agente que implemente este bloque deberia entregar:

1. capa base de recomendacion contextual,
2. recomendaciones visibles en puntos clave del producto,
3. justificacion minima de por que se recomienda cada item,
4. nota breve de decisiones de modelado tomadas.

## 11. Definicion de terminado

El Bloque 5A se considera terminado cuando:

- el sistema ya puede sugerir recursos relevantes,
- las recomendaciones ayudan a elegir mejor,
- y la base queda lista para composicion automatica de contexto en 5B.
