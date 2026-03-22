import type { Brief, Prompt, Agent, Service, Manual, Execution, ExecutionContext, ExecutionResult } from './types';

const getExecutionManuals = (prompt: Prompt, allManuals: Manual[]): Manual[] => {
  const explicit = allManuals.filter((manual) => prompt.source_of_truth.includes(manual.path));
  if (explicit.length > 0) return explicit;

  const byPrompt = allManuals.filter((manual) => manual.related_prompts.includes(prompt.id));
  if (byPrompt.length > 0) return byPrompt;

  const byService = allManuals.filter((manual) =>
    manual.related_services.some((serviceCode) => prompt.related_services.includes(serviceCode))
  );
  if (byService.length > 0) return byService;

  return allManuals.filter((manual) => manual.discipline === prompt.discipline).slice(0, 3);
};
import { callAIRuntime } from './runtimeService';

const getRenderType = (deliverableType: string): 'text' | 'checklist' | 'plan' | 'scheme' | 'summary' => {
  const dt = deliverableType.toLowerCase();
  if (dt.includes('checklist') || dt.includes('auditoria') || dt.includes('diagnostico')) return 'checklist';
  if (dt.includes('plan') || dt.includes('estrategia') || dt.includes('roadmap')) return 'plan';
  if (dt.includes('arquitectura') || dt.includes('flujo') || dt.includes('journey') || dt.includes('funnel')) return 'scheme';
  if (dt.includes('resumen') || dt.includes('recomendacion') || dt.includes('dashboard') || dt.includes('informe')) return 'summary';
  return 'text';
};

const getExpectedSections = (prompt: Prompt): string[] => {
  const fallback = prompt.expected_output.length > 0
    ? prompt.expected_output
    : ['objetivo', 'recomendaciones', 'siguiente paso'];

  return fallback.map((item) => item.trim()).filter(Boolean);
};

const stringifyInputValue = (value: string | string[]): string =>
  Array.isArray(value) ? value.join(', ') : value;

export const prepareExecution = (
  brief: Brief,
  prompt: Prompt,
  allAgents: Agent[],
  allServices: Service[],
  allManuals: Manual[]
): Execution => {
  const agent = allAgents.find(a => a.name === prompt.agent_core);
  const services = allServices.filter(s => prompt.related_services.includes(s.service_code));
  const manuals = getExecutionManuals(prompt, allManuals);

  const executionContext: ExecutionContext = {
    promptId: prompt.id,
    promptName: prompt.name,
    objective: prompt.objective,
    deliverableType: prompt.deliverable_type,
    agentRole: agent?.role || 'Generic',
    userInputs: brief.inputs.map((input) => ({
      field: input.field,
      value: input.value,
    })),
    additionalContext: brief.additionalContext,
    notes: brief.notes,
    services: services.map((service) => ({
      code: service.service_code,
      name: service.service_name,
    })),
    manuals: manuals.map((manual) => ({
      id: manual.id,
      name: manual.name,
      path: manual.path,
    })),
  };

  return {
    id: `exec-${Date.now()}`,
    brief,
    prompt,
    agent,
    services,
    manuals,
    status: 'pending',
    preparedAt: new Date().toISOString(),
    executionContext,
    outputBlueprint: {
      expected_type: prompt.deliverable_type,
      render_as: getRenderType(prompt.deliverable_type),
      expected_sections: getExpectedSections(prompt),
    }
  };
};

export const validateExecution = (execution: Execution): { isValid: boolean; warnings: string[] } => {
  const warnings: string[] = [];
  if (!execution.agent) warnings.push('No hay un agente específico asignado.');
  if (execution.services.length === 0) warnings.push('Sin servicios vinculados.');
  if (execution.manuals.length === 0) warnings.push('Sin manuales de referencia (SoT).');
  return { isValid: true, warnings };
};

/**
 * Main execution entry point. 
 * Tries real runtime first, falls back to mock if explicitly requested or in certain dev conditions.
 */
export const executePrompt = async (execution: Execution, useMock = false): Promise<Execution> => {
  if (useMock) {
    return executeMock(execution);
  }

  try {
    const result = await callAIRuntime(execution);
    return {
      ...execution,
      status: 'completed',
      result
    };
  } catch (error) {
    console.error('Real runtime failed, throwing error to UI.', error);
    throw error;
  }
};

/**
 * Simulates AI execution (Phase 2C mockup) - Kept as fallback/dev tool
 */
export const executeMock = async (execution: Execution): Promise<Execution> => {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const renderAs = execution.outputBlueprint.render_as;
  const sectionTitles = execution.outputBlueprint.expected_sections;
  const inputLines = execution.executionContext.userInputs.map(
    (input) => `${input.field}: ${stringifyInputValue(input.value)}`,
  );
  let result: ExecutionResult;

  switch (renderAs) {
    case 'checklist':
      result = {
        type: 'checklist',
        content: `[MOCK] Checklist operativo para ${execution.brief.promptName}`,
        structured_data: sectionTitles.map((title, index) => ({
          label: title,
          status: index === 0 ? 'completed' : 'pending',
          note: inputLines[index] || execution.executionContext.additionalContext || 'Pendiente de validación contextual.',
        })),
      };
      break;
    case 'plan':
      result = {
        type: 'plan',
        content: `[MOCK] Plan Estratégico: ${execution.prompt.deliverable_type}`,
        structured_data: sectionTitles.map((title, index) => ({
          title,
          items: [
            inputLines[index] || 'Insumo principal derivado del brief',
            execution.executionContext.additionalContext || 'Contexto operativo complementario',
          ].filter(Boolean),
        })),
      };
      break;
    case 'scheme':
      result = {
        type: 'scheme',
        content: `[MOCK] Arquitectura de ${execution.prompt.deliverable_type}`,
        structured_data: sectionTitles.map((title, index) => ({
          id: `step-${index + 1}`,
          label: title,
          next: index < sectionTitles.length - 1 ? [`step-${index + 2}`] : [],
        })),
      };
      break;
    case 'summary':
      result = {
        type: 'summary',
        content: `[MOCK] Resumen ejecutivo para ${execution.prompt.name}`,
        structured_data: sectionTitles.map((title, index) => ({
          title,
          body: inputLines[index] || execution.executionContext.additionalContext || execution.prompt.objective,
        })),
      };
      break;
    default:
      result = {
        type: 'text',
        content: [
          `[MOCK EXECUTED]`,
          `Entregable: ${execution.prompt.deliverable_type}`,
          '',
          `Objetivo: ${execution.prompt.objective}`,
          '',
          `Insumos utilizados:`,
          ...inputLines.map((line) => `- ${line}`),
          execution.executionContext.additionalContext ? '' : '',
          execution.executionContext.additionalContext
            ? `Contexto adicional: ${execution.executionContext.additionalContext}`
            : '',
          '',
          `Secciones esperadas: ${sectionTitles.join(', ')}`,
        ]
          .filter(Boolean)
          .join('\n'),
      };
  }

  return {
    ...execution,
    status: 'completed',
    result
  };
};
