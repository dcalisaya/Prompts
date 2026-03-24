# Agent Eval Template

## Proposito

Esta plantilla sirve para evaluar agentes distintos con los mismos casos y criterios.

## Datos del agente

- agente:
- runtime:
- fecha:
- evaluador:

## Prueba 1. Onboarding del repo

### Prompt usado

```text
Revisa este repositorio y dime qué es, dónde está la fuente de verdad y cuál sería tu rol aquí como agente.
```

### Evaluación

- entendió `base` como fuente de verdad:
- entendió `docs` como protocolo y decisiones:
- entendió `projects` como casos reales:
- entendió `app/web` como consumidor y no como norma:
- tendió a leerlo como codebase tradicional:
- observaciones:

## Prueba 2. Caso `quote`

### Caso

```text
Necesito una proforma para un video animado de 1 minuto sobre el Plan de Beneficios PDV.
```

### Evaluación

- modo detectado:
- preguntas mínimas correctas:
- eligió bien recursos base:
- estructuró propuesta preliminar:
- evitó inventar alcance:
- observaciones:

## Prueba 3. Caso `quote + plan`

### Caso

```text
Un cliente solicita producir 36 podcasts. Necesito enviar una propuesta de grabación en 10 días y también la pauta para redes sociales.
```

### Evaluación

- modo detectado:
- disciplinas detectadas:
- preguntas mínimas correctas:
- consolidó producción y media:
- salida fue utilizable:
- observaciones:

## Prueba 4. Caso `review`

### Caso

```text
Revisa esta propuesta antes de enviarla al cliente.
```

### Evaluación

- modo detectado:
- profundidad de revisión:
- detectó riesgos reales:
- propuso mejoras accionables:
- observaciones:

## Prueba 5. Caso `execute`

### Caso

```text
Ya aprobaron la serie de podcasts. Ahora necesito organizar la grabación, la post y los entregables.
```

### Evaluación

- modo detectado:
- definió kickoff:
- estructuró fases:
- dejó criterios de entrega:
- observaciones:

## Puntaje resumen

| Criterio | Alto / Medio / Bajo | Observaciones |
| :--- | :--- | :--- |
| Lectura de contexto |  |  |
| Respeto a fuente de verdad |  |  |
| Detección de ambigüedad |  |  |
| Calidad de salida |  |  |
| Consistencia |  |  |
| Utilidad operativa |  |  |

## Veredicto final

- apto para operación:
- usos recomendados:
- riesgos observados:
- decisión:

## Regla de uso

Todas las comparaciones entre agentes deben pasar por esta misma plantilla para que los resultados no dependan de impresiones sueltas.
