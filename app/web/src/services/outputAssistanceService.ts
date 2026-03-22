import type { Execution, OutputAssistance } from './types';

const normalize = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const FORMAT_SUGGESTIONS: Array<{ match: string[]; sections: string[] }> = [
  {
    match: ['guion', 'script', 'copy', 'mensaje', 'narrativa'],
    sections: ['Gancho inicial', 'Desarrollo del mensaje', 'Prueba o idea clave', 'Cierre o CTA'],
  },
  {
    match: ['plan', 'roadmap', 'estrategia', 'cronograma'],
    sections: ['Resumen ejecutivo', 'Fases o frentes', 'Cronograma o secuencia', 'KPIs o criterios de éxito'],
  },
  {
    match: ['checklist', 'auditoria', 'diagnostico', 'revision', 'qa'],
    sections: ['Criterios de revisión', 'Hallazgos', 'Riesgos o gaps', 'Siguiente acción'],
  },
  {
    match: ['arquitectura', 'especificacion', 'requerimientos', 'technical spec'],
    sections: ['Contexto técnico', 'Bloques o componentes', 'Integraciones y datos', 'Riesgos y supuestos'],
  },
  {
    match: ['propuesta', 'proforma', 'cotizacion'],
    sections: ['Necesidad del cliente', 'Alcance propuesto', 'Entregables y supuestos', 'Siguiente paso comercial'],
  },
  {
    match: ['brief', 'summary', 'resumen ejecutivo'],
    sections: ['Objetivo', 'Contexto', 'Hallazgos clave', 'Recomendación o siguiente paso'],
  },
];

const DISCIPLINE_CHECKLISTS: Record<string, Array<{ id: string; label: string; description: string }>> = {
  contenido: [
    { id: 'oa1', label: 'Tono consistente', description: 'Revisar que la voz y el tono sean uniformes en todo el entregable.' },
    { id: 'oa2', label: 'Sin errores', description: 'Validar ortografía, gramática y legibilidad básica.' },
    { id: 'oa3', label: 'Formato usable', description: '¿El contenido se puede entregar o reutilizar fácilmente?' },
  ],
  desarrollo: [
    { id: 'oa4', label: 'Explicación técnica clara', description: '¿Otro desarrollador puede entenderlo y ejecutarlo?' },
    { id: 'oa5', label: 'Supuestos visibles', description: '¿Quedaron explícitos riesgos, límites o dependencias?' },
  ],
  comercial: [
    { id: 'oa6', label: 'Valor para el cliente', description: '¿Queda claro el beneficio de la propuesta o recomendación?' },
    { id: 'oa7', label: 'Siguiente paso comercial', description: '¿La continuidad comercial está bien planteada?' },
  ],
  pr: [
    { id: 'oa8', label: 'Mensaje reputacional claro', description: '¿La narrativa protege y fortalece la reputación de la marca?' },
    { id: 'oa9', label: 'Stakeholders definidos', description: '¿Se entiende a quién impacta o se dirige el mensaje?' },
  ],
  cx: [
    { id: 'oa10', label: 'Acción del usuario clara', description: '¿El siguiente paso del usuario o cliente es explícito?' },
    { id: 'oa11', label: 'Continuidad relacional', description: '¿El output considera retención, nurturing o seguimiento?' },
  ],
  commerce: [
    { id: 'oa12', label: 'Impacto comercial tangible', description: '¿Se entiende cómo afecta venta, conversión o ticket?' },
    { id: 'oa13', label: 'Fricciones visibles', description: '¿El entregable identifica dónde actuar en el funnel?' },
  ],
  consultoria: [
    { id: 'oa14', label: 'Hipótesis explícitas', description: '¿Los supuestos de negocio o decisión están bien formulados?' },
    { id: 'oa15', label: 'Recomendación accionable', description: '¿La recomendación final sirve para decidir o priorizar?' },
  ],
  media: [
    { id: 'oa16', label: 'Señal objetivo clara', description: '¿El output conecta con una métrica, canal o señal de rendimiento?' },
    { id: 'oa17', label: 'Canales o formatos definidos', description: '¿Se entiende dónde corre la acción y con qué formato?' },
  ],
};

const DEFAULT_TIPS = [
  'Verifica que el output responda directamente al objetivo del brief.',
  'Asegúrate de que el formato sea fácil de leer y compartir.',
  'Valida que no falte información crítica del contexto inicial.',
];

const DISCIPLINE_MATCHERS: Array<[string, string[]]> = [
  ['contenido', ['contenido', 'copy', 'podcast', 'audiovisual', 'content strategy']],
  ['desarrollo', ['desarrollo', 'software', 'apps', 'programacion']],
  ['comercial', ['comercial', 'ventas', 'cotizacion', 'proformas']],
  ['pr', ['pr ', 'pr/', 'comunicacion', 'public relations']],
  ['cx', ['cx', 'crm', 'retencion']],
  ['commerce', ['commerce', 'e-commerce', 'ecommerce']],
  ['consultoria', ['consultoria', 'negocio']],
  ['media', ['media', 'performance', 'seo', 'sem', 'data']],
];

export const getOutputAssistance = (execution: Execution): OutputAssistance => {
  const deliverableType = execution.prompt.deliverable_type;
  const discipline = execution.prompt.discipline;
  const normalizedDeliverable = normalize(deliverableType);
  const normalizedDiscipline = normalize(discipline);

  const formatConfig = FORMAT_SUGGESTIONS.find(({ match }) =>
    match.some((token) => normalizedDeliverable.includes(token))
  );

  const disciplineKey = DISCIPLINE_MATCHERS.find(([, matchers]) =>
    matchers.some((token) => normalizedDiscipline.includes(token))
  )?.[0];

  return {
    deliverableType,
    discipline,
    formatSuggestions: formatConfig?.sections ?? [
      'Objetivo del entregable',
      'Puntos clave',
      'Observaciones relevantes',
      'Siguiente paso recomendado',
    ],
    checklist: disciplineKey
      ? DISCIPLINE_CHECKLISTS[disciplineKey]
      : [
          { id: 'oa-gen1', label: 'Claridad', description: '¿El texto es legible y profesional?' },
          { id: 'oa-gen2', label: 'Utilidad', description: '¿El resultado es directamente accionable?' },
        ],
    deliverabilityTips: DEFAULT_TIPS,
  };
};
