import type { Brief, BriefInput, Prompt } from './types';

export const createEmptyBrief = (prompt: Prompt): Brief => {
  const inputs: BriefInput[] = prompt.input_required.map(req => ({
    field: req,
    value: ''
  }));

  return {
    id: `brief-${Date.now()}`,
    promptId: prompt.id,
    promptName: prompt.name,
    input_type: prompt.input_type,
    deliverable_type: prompt.deliverable_type,
    agent_core: prompt.agent_core,
    related_services: prompt.related_services,
    inputs,
    additionalContext: '',
    notes: '',
    createdAt: new Date().toISOString(),
    status: 'draft'
  };
};

export const validateBrief = (brief: Brief): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  // Validate required inputs
  brief.inputs.forEach(input => {
    if (!input.value || (Array.isArray(input.value) && input.value.length === 0)) {
      errors[input.field] = 'Este campo es obligatorio.';
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
