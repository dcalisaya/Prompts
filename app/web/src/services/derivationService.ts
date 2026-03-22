import type { Execution, QualityAudit } from './types';
import { runBasicAudit } from './qualityService';

export interface SuggestedRole {
  id: string;
  slug: string;
  label: string;
  discipline: string;
}

export interface DerivationInfo {
  nextStage?: string;
  nextAction: string;
  suggestedRoles: SuggestedRole[];
  suggestedDisciplines: string[];
  blockers: string[];
  warnings: string[];
}

const STAGE_LABELS: Record<string, string> = {
  discovery: 'discovery',
  audit: 'audit',
  strategy: 'strategy',
  'pre-production': 'pre-production',
  production: 'production',
  review: 'review',
  implementation: 'implementation',
  deployment: 'deployment',
  'campaign-planning': 'campaign planning',
  'campaign-execution': 'campaign execution',
  'content-production': 'content production',
  'editorial-strategy': 'editorial strategy',
  engineering: 'engineering',
  architecture: 'architecture',
  'business-diagnosis': 'business diagnosis',
  'business-strategy': 'business strategy',
  'commerce-strategy': 'commerce strategy',
  'communications-planning': 'communications planning',
  'creator-strategy': 'creator strategy',
  'experience-design': 'experience design',
  'healthcare-strategy': 'healthcare strategy',
  measurement: 'measurement',
  'media-planning': 'media planning',
  retention: 'retention',
  'esg-communications': 'ESG communications',
};

const STAGE_SEQUENCE: Record<string, string> = {
  'discovery': 'strategy',
  'audit': 'strategy',
  'strategy': 'pre-production',
  'pre-production': 'production',
  'campaign-planning': 'campaign-execution',
  'content-production': 'production',
  'editorial-strategy': 'content-production',
  'engineering': 'quality',
  'architecture': 'implementation',
  'implementation': 'review',
  'review': 'deployment',
  'business-diagnosis': 'business-strategy',
  'commerce-strategy': 'implementation',
  'communications-planning': 'production',
  'creator-strategy': 'campaign-execution',
  'experience-design': 'production',
  'healthcare-strategy': 'implementation',
  'measurement': 'review',
  'media-planning': 'campaign-execution',
  'retention': 'review',
  'esg-communications': 'review',
};

const ROLE_CATALOG: Record<string, SuggestedRole> = {
  'commercial-sales': {
    id: 'commercial-sales',
    slug: 'comercial-ventas',
    label: 'Comercial / Ventas',
    discipline: 'Comercial y Ventas',
  },
  'quotes-proposals': {
    id: 'quotes-proposals',
    slug: 'administracion-proformas-cotizacion',
    label: 'Administracion / Proformas / Cotizacion',
    discipline: 'Cotizacion y Proformas',
  },
  'digital-strategy': {
    id: 'digital-strategy',
    slug: 'estrategia-digital-marketing-funnel',
    label: 'Estrategia Digital / Marketing / Funnel',
    discipline: 'Estrategia Digital',
  },
  'content-podcast-copy': {
    id: 'content-podcast-copy',
    slug: 'director-de-contenido-podcast-copy',
    label: 'Director de Contenido / Podcast / Copy',
    discipline: 'Contenido, Podcast y Copy',
  },
  'visual-ai': {
    id: 'visual-ai',
    slug: 'creador-de-imagenes-storyboard-video-ia',
    label: 'Creador de Imagenes / Storyboard / Video IA',
    discipline: 'Imagen y Video IA',
  },
  'paid-media-performance-seo': {
    id: 'paid-media-performance-seo',
    slug: 'paid-media-performance-seo',
    label: 'Paid Media / Performance / SEO',
    discipline: 'Media, Performance y SEO',
  },
  'pr-communications': {
    id: 'pr-communications',
    slug: 'pr-comunicacion',
    label: 'PR / Comunicación',
    discipline: 'PR y Comunicación',
  },
  'data-analytics-insights': {
    id: 'data-analytics-insights',
    slug: 'data-analytics-insights',
    label: 'Data / Analytics / Insights',
    discipline: 'Data, Analytics e Insights',
  },
  'business-consulting': {
    id: 'business-consulting',
    slug: 'consultoria-de-negocio',
    label: 'Consultoría de Negocio',
    discipline: 'Consultoría de Negocio',
  },
  'commerce-ecommerce': {
    id: 'commerce-ecommerce',
    slug: 'commerce-ecommerce',
    label: 'Commerce / E-commerce',
    discipline: 'Commerce y E-commerce',
  },
  'cx-crm-retention': {
    id: 'cx-crm-retention',
    slug: 'cx-crm-retencion',
    label: 'CX / CRM / Retención',
    discipline: 'CX, CRM y Retención',
  },
  engineering: {
    id: 'engineering',
    slug: 'desarrollo-ingenieria',
    label: 'Desarrollo / Ingenieria',
    discipline: 'Desarrollo de Software',
  },
  'content-strategy-copy': {
    id: 'content-strategy-copy',
    slug: 'content-strategy-copy',
    label: 'Content Strategy / Copy',
    discipline: 'Content Strategy y Copy',
  },
  'influencer-marketing': {
    id: 'influencer-marketing',
    slug: 'influencer-marketing',
    label: 'Influencer Marketing',
    discipline: 'Influencer Marketing',
  },
  'experiential-events': {
    id: 'experiential-events',
    slug: 'experiential-eventos',
    label: 'Experiential / Eventos',
    discipline: 'Experiential y Eventos',
  },
  'healthcare-marketing': {
    id: 'healthcare-marketing',
    slug: 'healthcare-marketing',
    label: 'Healthcare Marketing',
    discipline: 'Healthcare Marketing',
  },
  'sustainability-esg': {
    id: 'sustainability-esg',
    slug: 'sostenibilidad-esg',
    label: 'Sostenibilidad / ESG',
    discipline: 'Sostenibilidad y ESG',
  },
  'coordination-pm-quality': {
    id: 'coordination-pm-quality',
    slug: 'coordinacion-pm-revision-final',
    label: 'Coordinacion / PM / Revision Final',
    discipline: 'Coordinación y Calidad',
  },
  'finance-commercial-control': {
    id: 'finance-commercial-control',
    slug: 'direccion-finanzas-control-comercial',
    label: 'Direccion / Finanzas / Control Comercial',
    discipline: 'Direccion y Control Comercial',
  },
};

const normalizeDiscipline = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');

const DISCIPLINE_ROLES: Record<string, string[]> = {
  'comercial y ventas': ['commercial-sales', 'quotes-proposals'],
  'cotizacion y proformas': ['quotes-proposals', 'finance-commercial-control'],
  'estrategia digital': ['digital-strategy', 'paid-media-performance-seo'],
  'contenido podcast y copy': ['content-podcast-copy', 'content-strategy-copy'],
  'content strategy y copy': ['content-strategy-copy', 'content-podcast-copy'],
  'imagen y video ia': ['visual-ai', 'content-podcast-copy'],
  'desarrollo de software': ['engineering', 'coordination-pm-quality'],
  'pr y comunicacion': ['pr-communications', 'coordination-pm-quality'],
  'data analytics e insights': ['data-analytics-insights', 'business-consulting'],
  'cx crm y retencion': ['cx-crm-retention', 'data-analytics-insights'],
  'commerce y ecommerce': ['commerce-ecommerce', 'digital-strategy'],
  'consultoria de negocio': ['business-consulting', 'finance-commercial-control'],
  'influencer marketing': ['influencer-marketing', 'content-strategy-copy'],
  'experiential y eventos': ['experiential-events', 'coordination-pm-quality'],
  'healthcare marketing': ['healthcare-marketing', 'content-strategy-copy'],
  'media performance y seo': ['paid-media-performance-seo', 'digital-strategy'],
  'sostenibilidad y esg': ['sustainability-esg', 'pr-communications'],
};

export const getDerivationInfo = (execution: Execution): DerivationInfo => {
  const { prompt } = execution;
  const audit: QualityAudit = runBasicAudit(execution);
  
  const currentStage = prompt.stage;
  const nextStage = STAGE_SEQUENCE[currentStage];
  const disciplineKey = normalizeDiscipline(prompt.discipline);
  const suggestedRoles = (DISCIPLINE_ROLES[disciplineKey] || [])
    .map((roleId) => ROLE_CATALOG[roleId])
    .filter(Boolean);
  
  const blockers = audit.warnings
    .filter(w => w.level === 'high')
    .map(w => w.message);
    
  const warnings = audit.warnings
    .filter(w => w.level !== 'high')
    .map(w => w.message);

  let nextAction = 'Continuar con el siguiente paso operativo';
  if (blockers.length > 0) {
    nextAction = 'Corregir faltantes criticos antes de derivar';
  } else if (nextStage) {
    nextAction = `Preparar entrega para etapa de ${STAGE_LABELS[nextStage] || nextStage}`;
  } else if (execution.status === 'completed' || execution.status === 'failed') {
    nextAction = 'Cerrar sesion y documentar rastro';
  }

  return {
    nextStage,
    nextAction,
    suggestedRoles,
    suggestedDisciplines: [prompt.discipline], // Simplificado para MVP
    blockers,
    warnings
  };
};
