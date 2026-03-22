import type { Execution, ExecutionRequest, ExecutionResponse, ExecutionResult } from './types';

const API_URL = import.meta.env.VITE_API_RUNTIME_URL || 'http://localhost:5001/v1/chat/completions';
const MODEL_NAME = import.meta.env.VITE_AI_MODEL || 'gpt-5.3-codex';

/**
 * Normalizes the raw text from AI into a structured ExecutionResult.
 * It tries to parse JSON if the output type expects it, otherwise returns text.
 */
export const normalizeAIResponse = (text: string, execution: Execution): ExecutionResult => {
  const renderAs = execution.outputBlueprint.render_as;
  const sectionTitles = execution.outputBlueprint.expected_sections;

  // Basic cleanup
  let cleanText = text.trim();
  
  // Try to find JSON in the text if we expect structured data
  if (renderAs !== 'text') {
    try {
      const jsonMatch = cleanText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        return {
          type: renderAs,
          content: `Resultado estructurado para ${execution.prompt.name}`,
          structured_data: data
        };
      }
    } catch (e) {
      console.warn('Failed to parse AI response as JSON, falling back to text wrapper.', e);
    }
  }

  // Fallback for structured types if no JSON found
  if (renderAs === 'checklist') {
    return {
      type: 'checklist',
      content: cleanText.split('\n')[0] || 'Checklist',
      structured_data: cleanText.split('\n').slice(1).filter(l => l.trim()).map(line => ({
        label: line.replace(/^[-\s*•]+/, '').trim(),
        status: 'pending'
      }))
    };
  }

  if (renderAs === 'plan') {
    return {
      type: 'plan',
      content: cleanText.split('\n')[0] || 'Plan',
      structured_data: sectionTitles.map(title => ({
        title,
        items: [cleanText.includes(title) ? 'Sección detectada en el output' : 'Consulte el texto completo']
      }))
    };
  }

  // Default: text
  return {
    type: 'text',
    content: cleanText
  };
};

/**
 * Calls the real AI Runtime
 */
export const callAIRuntime = async (execution: Execution): Promise<ExecutionResult> => {
  const { executionContext, outputBlueprint } = execution;
  
  const systemPrompt = `Eres un asistente experto en ${executionContext.agentRole}. 
Tu objetivo es generar un entregable de tipo: ${executionContext.deliverableType}.
Debes seguir este objetivo: ${executionContext.objective}

RECURSOS DISPONIBLES:
${executionContext.manuals.map(m => `- Manual: ${m.name}`).join('\n')}
${executionContext.services.map(s => `- Servicio: ${s.name}`).join('\n')}

ESTRUCTURA ESPERADA:
${outputBlueprint.expected_sections.join(', ')}

REGLA CRITICA: 
Si el formato es ${outputBlueprint.render_as}, intenta responder con una estructura clara. 
Si puedes, incluye un bloque JSON al final encerrado en \`\`\`json ... \`\`\` con la data estructurada.`;

  const userPrompt = `INPUTS DEL USUARIO:
${executionContext.userInputs.map(i => `${i.field}: ${Array.isArray(i.value) ? i.value.join(', ') : i.value}`).join('\n')}

CONTEXTO ADICIONAL:
${executionContext.additionalContext}

NOTAS:
${executionContext.notes}

Genera el entregable ahora:`;

  const request: ExecutionRequest = {
    model: MODEL_NAME,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Runtime Error: ${response.status}`);
  }

  const data: ExecutionResponse = await response.json();
  const rawContent = data.choices[0]?.message.content;

  if (!rawContent) {
    throw new Error('El motor de IA devolvió una respuesta vacía.');
  }

  return normalizeAIResponse(rawContent, execution);
};
