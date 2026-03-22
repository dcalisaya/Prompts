import type { Brief, Prompt, Agent, Service, Manual, Execution, ExecutionContext, ExecutionResult } from './types';

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
  const manuals = allManuals.filter(m => prompt.source_of_truth.includes(m.path));

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
 * Simulates AI execution (Phase 2C mockup)
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
        content: `Checklist operativo para ${execution.brief.promptName}`,
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
        content: `Plan Estratégico: ${execution.prompt.deliverable_type}`,
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
        content: `Arquitectura de ${execution.prompt.deliverable_type}`,
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
        content: `Resumen ejecutivo para ${execution.prompt.name}`,
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
