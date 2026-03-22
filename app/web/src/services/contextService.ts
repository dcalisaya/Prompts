import type { Prompt, Agent, Service, Manual, SuggestedContext } from './types';

const getSuggestedManuals = (prompt: Prompt, allManuals: Manual[]): Manual[] => {
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

/**
 * Composes a suggested context for a given prompt by gathering its ideal "team" of resources.
 */
export const composeSuggestedContext = (
  prompt: Prompt,
  allAgents: Agent[],
  allServices: Service[],
  allManuals: Manual[]
): SuggestedContext => {
  // 1. Identify optimal agent
  const agent = allAgents.find(a => a.name === prompt.agent_core);

  // 2. Identify required services
  const services = allServices.filter(s => 
    prompt.related_services.includes(s.service_code)
  );

  // 3. Identify source of truth manuals
  const manuals = getSuggestedManuals(prompt, allManuals);

  // 4. Generate suggested instructions based on the composition
  const instructions: string[] = [];
  
  if (agent) {
    instructions.push(`Trabajar bajo el rol de ${agent.role}.`);
  }

  if (manuals.length > 0) {
    const manualNames = manuals.map(m => m.name).join(', ');
    instructions.push(`Validar el entregable contra los manuales de referencia: ${manualNames}.`);
  }

  if (services.length > 0) {
    const serviceNames = services.map(s => s.service_name).join(', ');
    instructions.push(`Asegurar alineación con el alcance de los servicios: ${serviceNames}.`);
  }

  instructions.push(`Objetivo final: Generar un entregable de tipo "${prompt.deliverable_type}" que cumpla con: ${prompt.expected_output.join(', ')}.`);

  return {
    promptId: prompt.id,
    agent,
    services,
    manuals,
    suggestedInstructions: instructions.join('\n')
  };
};
