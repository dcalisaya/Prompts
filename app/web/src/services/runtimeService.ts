import type {
  Execution,
  ExecutionRequest,
  ExecutionResponse,
  ExecutionResult,
  ExecutionDiagnostics,
  RuntimeErrorCode,
} from './types';

const API_URL = import.meta.env.VITE_API_RUNTIME_URL || 'http://localhost:5001/v1/chat/completions';
const MODEL_NAME = import.meta.env.VITE_AI_MODEL || 'gpt-5.3-codex';
const TIMEOUT_MS = Number(import.meta.env.VITE_AI_TIMEOUT_MS || 45000);

export class RuntimeExecutionError extends Error {
  code: RuntimeErrorCode;
  retryable: boolean;
  details?: unknown;

  constructor(code: RuntimeErrorCode, message: string, retryable = false, details?: unknown) {
    super(message);
    this.name = 'RuntimeExecutionError';
    this.code = code;
    this.retryable = retryable;
    this.details = details;
  }
}

const extractJsonCandidate = (text: string): string | null => {
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return fenced[1].trim();

  const genericFence = text.match(/```[\w-]*\s*([\s\S]*?)```/);
  if (genericFence?.[1]) {
    const candidate = genericFence[1].trim();
    if (candidate.startsWith('{') || candidate.startsWith('[')) return candidate;
  }

  const direct = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  return direct?.[0]?.trim() || null;
};

const extractBulletLines = (text: string): string[] =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^[-*•]\s+/.test(line))
    .map((line) => line.replace(/^[-*•]\s+/, '').trim())
    .filter(Boolean);

const extractSections = (text: string): Array<{ title: string; body: string }> => {
  const lines = text.split('\n');
  const sections: Array<{ title: string; body: string }> = [];
  let current: { title: string; body: string[] } | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (/^#{1,6}\s+/.test(line)) {
      if (current) {
        sections.push({ title: current.title, body: current.body.join('\n').trim() });
      }
      current = { title: line.replace(/^#{1,6}\s+/, '').trim(), body: [] };
      continue;
    }

    if (/^[A-ZÁÉÍÓÚÑ][^:]{2,80}:$/.test(line)) {
      if (current) {
        sections.push({ title: current.title, body: current.body.join('\n').trim() });
      }
      current = { title: line.replace(/:$/, '').trim(), body: [] };
      continue;
    }

    if (!current) {
      current = { title: 'Resumen', body: [] };
    }
    current.body.push(rawLine);
  }

  if (current) {
    sections.push({ title: current.title, body: current.body.join('\n').trim() });
  }

  return sections.filter((section) => section.title || section.body);
};

const buildChecklistFallback = (text: string) => {
  const bullets = extractBulletLines(text);
  if (bullets.length > 0) {
    return bullets.map((label) => ({ label, status: 'pending' }));
  }

  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 8)
    .map((label) => ({
      label: label.replace(/^\d+[.)]\s+/, '').trim(),
      status: 'pending',
    }));
};

const buildPlanFallback = (text: string, expectedSections: string[]) => {
  const sections = extractSections(text);
  if (sections.length > 0) {
    return sections.map((section) => ({
      title: section.title,
      items: section.body
        ? section.body.split('\n').map((line) => line.trim()).filter(Boolean)
        : [],
    }));
  }

  return expectedSections.map((title) => ({
    title,
    items: [text],
  }));
};

const buildSchemeFallback = (text: string, expectedSections: string[]) => {
  const bullets = extractBulletLines(text);
  const labels = bullets.length > 0 ? bullets : expectedSections;

  return labels.map((label, index) => ({
    id: `step-${index + 1}`,
    label,
    next: index < labels.length - 1 ? [`step-${index + 2}`] : [],
  }));
};

/**
 * Normalizes the raw text from AI into a structured ExecutionResult.
 * It tries to parse JSON if the output type expects it, otherwise returns text.
 */
export const normalizeAIResponse = (
  text: string,
  execution: Execution,
): { result: ExecutionResult; diagnostics: ExecutionDiagnostics } => {
  const renderAs = execution.outputBlueprint.render_as;
  const sectionTitles = execution.outputBlueprint.expected_sections;
  const cleanText = text.trim();
  const diagnostics: ExecutionDiagnostics = {
    warnings: [],
    parsingMode: 'fallback',
  };

  if (!cleanText) {
    throw new RuntimeExecutionError('empty_response', 'El motor de IA devolvió una respuesta vacía.', true);
  }

  if (renderAs !== 'text') {
    const jsonCandidate = extractJsonCandidate(cleanText);
    if (jsonCandidate) {
      try {
        const data = JSON.parse(jsonCandidate);
        diagnostics.parsingMode = 'json';
        return {
          result: {
            type: renderAs,
            content: `Resultado estructurado para ${execution.prompt.name}`,
            structured_data: data,
          },
          diagnostics,
        };
      } catch (error) {
        diagnostics.warnings.push('La salida incluyó JSON inválido; se aplicó normalización de fallback.');
        console.warn('Failed to parse AI response as JSON, falling back.', error);
      }
    }
  }

  if (renderAs === 'checklist') {
    diagnostics.parsingMode = 'markdown';
    return {
      result: {
        type: 'checklist',
        content: cleanText.split('\n')[0] || 'Checklist',
        structured_data: buildChecklistFallback(cleanText),
      },
      diagnostics,
    };
  }

  if (renderAs === 'plan') {
    diagnostics.parsingMode = 'markdown';
    return {
      result: {
        type: 'plan',
        content: cleanText.split('\n')[0] || 'Plan',
        structured_data: buildPlanFallback(cleanText, sectionTitles),
      },
      diagnostics,
    };
  }

  if (renderAs === 'scheme') {
    diagnostics.parsingMode = 'markdown';
    return {
      result: {
        type: 'scheme',
        content: cleanText.split('\n')[0] || 'Esquema',
        structured_data: buildSchemeFallback(cleanText, sectionTitles),
      },
      diagnostics,
    };
  }

  if (renderAs === 'summary') {
    diagnostics.parsingMode = 'markdown';
    const sections = extractSections(cleanText);
    return {
      result: {
        type: 'summary',
        content: cleanText.split('\n')[0] || execution.prompt.name,
        structured_data:
          sections.length > 0
            ? sections.map((section) => ({ title: section.title, body: section.body || '' }))
            : sectionTitles.map((title) => ({ title, body: cleanText })),
      },
      diagnostics,
    };
  }

  diagnostics.parsingMode = 'fallback';
  return {
    result: {
      type: 'text',
      content: cleanText,
    },
    diagnostics,
  };
};

/**
 * Calls the real AI Runtime
 */
export const callAIRuntime = async (execution: Execution): Promise<ExecutionResult> => {
  const { executionContext, outputBlueprint } = execution;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
  const startedAt = performance.now();
  
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

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new RuntimeExecutionError(
        'provider_error',
        errorData.error?.message || `Runtime Error: ${response.status}`,
        response.status >= 500,
        errorData,
      );
    }

    const data: ExecutionResponse = await response.json();
    const rawContent = data.choices?.[0]?.message?.content;

    if (!rawContent) {
      throw new RuntimeExecutionError('empty_response', 'El motor de IA devolvió una respuesta vacía.', true);
    }

    const normalized = normalizeAIResponse(rawContent, execution);
    normalized.diagnostics.latencyMs = Math.round(performance.now() - startedAt);

    return normalized.result;
  } catch (error) {
    if (error instanceof RuntimeExecutionError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new RuntimeExecutionError(
        'timeout_error',
        `La ejecución excedió el tiempo máximo de ${Math.round(TIMEOUT_MS / 1000)}s.`,
        true,
      );
    }

    throw new RuntimeExecutionError(
      'network_error',
      'No se pudo conectar con el runtime configurado.',
      true,
      error,
    );
  } finally {
    window.clearTimeout(timeoutId);
  }
};
