import type { QualityAudit, QualityCheck, QualityWarning, Execution, ExecutionContext } from './types';

const CHECKLISTS: Record<string, QualityCheck[]> = {
  'Contenido, Podcast y Copy': [
    { id: 'c1', label: 'Tono y Estilo', description: '¿El texto refleja la voz de marca definida?', required: true },
    { id: 'c2', label: 'Estructura Narrativa', description: '¿Tiene gancho, desarrollo y cierre claro?', required: true },
    { id: 'c3', label: 'Llamado a la Acción', description: '¿Es evidente qué debe hacer el usuario después?', required: false }
  ],
  'Desarrollo de Software': [
    { id: 'd1', label: 'Stack Tecnológico', description: '¿Las tecnologías sugeridas son consistentes?', required: true },
    { id: 'd2', label: 'Seguridad y Buenas Prácticas', description: '¿Se mencionan validaciones o capas de seguridad?', required: true },
    { id: 'd3', label: 'Escalabilidad', description: '¿La arquitectura permite crecimiento futuro?', required: false }
  ],
  'Estrategia Digital': [
    { id: 'e1', label: 'Alineación de Objetivos', description: '¿Resuelve el problema planteado en el brief?', required: true },
    { id: 'e2', label: 'Definición de Audiencia', description: '¿Segmenta correctamente el público objetivo?', required: true },
    { id: 'e3', label: 'Factibilidad', description: '¿Es realizable con los recursos mencionados?', required: false }
  ],
  'Cotización y Proformas': [
    { id: 'q1', label: 'Claridad de Servicios', description: '¿Se listan los códigos de servicio correctamente?', required: true },
    { id: 'q2', label: 'Alcance Base', description: '¿Queda claro qué incluye y qué no el servicio?', required: true },
    { id: 'q3', label: 'Reglas de Negocio', description: '¿Se respetan las restricciones de pricing?', required: true }
  ],
  'CX, CRM y Retención': [
    { id: 'x1', label: 'Puntos de Fricción', description: '¿Identifica los dolores reales del cliente?', required: true },
    { id: 'x2', label: 'Lifecycle', description: '¿Cubre todas las etapas del funnel de retención?', required: true },
    { id: 'x3', label: 'Personalización', description: '¿Usa datos del cliente para mejorar la experiencia?', required: false }
  ]
};

const DEFAULT_CHECKLIST: QualityCheck[] = [
  { id: 'g1', label: 'Claridad General', description: '¿El entregable es fácil de entender?', required: true },
  { id: 'g2', label: 'Completitud', description: '¿Están presentes todas las secciones esperadas?', required: true }
];

export const getChecklistByDiscipline = (discipline: string): QualityCheck[] => {
  return CHECKLISTS[discipline] || DEFAULT_CHECKLIST;
};

export const runBasicAudit = (execution: Execution): QualityAudit => {
  const discipline = execution.prompt.discipline;
  const checklist = getChecklistByDiscipline(discipline);
  const warnings: QualityWarning[] = [];
  const context: ExecutionContext = execution.executionContext;

  // 1. Warning: Missing Manuals (SoT)
  if (execution.manuals.length === 0) {
    warnings.push({
      id: 'w-sot',
      level: 'medium',
      message: 'El entregable se generó sin manuales de referencia (Source of Truth).'
    });
  }

  // 2. Warning: Missing Services
  if (execution.services.length === 0 && (discipline.includes('Cotización') || discipline.includes('Comercial'))) {
    warnings.push({
      id: 'w-serv',
      level: 'high',
      message: 'Este tipo de entregable requiere vinculación con el catálogo de servicios.'
    });
  }

  // 3. Warning: Short Context
  if (context.userInputs.some(input => typeof input.value === 'string' && input.value.length < 10)) {
    warnings.push({
      id: 'w-input',
      level: 'low',
      message: 'Algunos campos del brief tienen muy poca información para un resultado robusto.'
    });
  }

  return {
    discipline,
    checklist,
    warnings,
    isPassed: warnings.filter(w => w.level === 'high').length === 0
  };
};
