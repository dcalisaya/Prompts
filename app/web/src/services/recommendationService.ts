import type { SearchIndexEntry, Recommendation } from './types';
import { normalizeDiscipline } from './dataService';

const tokenize = (text: string): string[] =>
  normalizeDiscipline(text)
    .split(' ')
    .map((token) => token.trim())
    .filter(Boolean);

const DISCIPLINE_ALIASES: Record<string, string[]> = {
  'comercial y ventas': ['comercial y ventas', 'cotizacion y proformas'],
  'cotizacion y proformas': ['cotizacion y proformas', 'comercial y ventas'],
  'contenido podcast y copy': ['contenido podcast y copy', 'content strategy y copy', 'imagen y video ia'],
  'content strategy y copy': ['content strategy y copy', 'contenido podcast y copy'],
  'desarrollo de software': ['desarrollo de software'],
  'estrategia digital': ['estrategia digital', 'media performance y seo'],
  'cx crm y retencion': ['cx crm y retencion'],
  'influencer marketing': ['influencer marketing'],
  'experiential y eventos': ['experiential y eventos'],
  'healthcare marketing': ['healthcare marketing'],
  'sostenibilidad y esg': ['sostenibilidad y esg'],
};

const matchesDiscipline = (entryDiscipline: string | undefined, targetDiscipline: string | undefined): boolean => {
  if (!entryDiscipline || !targetDiscipline) return false;
  const normalizedEntry = normalizeDiscipline(entryDiscipline);
  const normalizedTarget = normalizeDiscipline(targetDiscipline);
  if (normalizedEntry === normalizedTarget) return true;
  return (DISCIPLINE_ALIASES[normalizedTarget] ?? [normalizedTarget]).includes(normalizedEntry);
};

const INTENT_MAP: Record<string, { discipline?: string; stage?: string; keywords: string[] }> = {
  cotizacion: {
    discipline: 'Comercial y Ventas',
    keywords: ['cotizar', 'cotizacion', 'presupuesto', 'proforma', 'venta', 'comercial'],
  },
  contenido: {
    discipline: 'Content Strategy y Copy',
    keywords: ['guion', 'podcast', 'copy', 'narrativa', 'voice', 'mensaje', 'contenido'],
  },
  desarrollo: {
    discipline: 'Desarrollo de Software',
    keywords: ['codigo', 'arquitectura', 'dev', 'api', 'software', 'sistema', 'app'],
  },
  estrategia: {
    discipline: 'Estrategia Digital',
    keywords: ['funnel', 'growth', 'mercado', 'plan', 'estrategico', 'campana', 'estrategia'],
  },
  cx: {
    discipline: 'CX, CRM y Retención',
    keywords: ['customer', 'journey', 'experiencia', 'fidelizacion', 'email', 'crm', 'retencion'],
  },
  ia: {
    keywords: ['ia', 'artificial', 'automatizacion', 'automata', 'robot', 'prompt', 'visual'],
  },
};

const STAGE_SEQUENCE: Record<string, string> = {
  discovery: 'strategy',
  audit: 'strategy',
  strategy: 'pre-production',
  'pre-production': 'production',
  production: 'review',
  implementation: 'review',
  review: 'deployment',
  engineering: 'review',
  architecture: 'implementation',
  'campaign-planning': 'production',
  'content-production': 'review',
  'editorial-strategy': 'content-production',
  'business-diagnosis': 'strategy',
  'commerce-strategy': 'implementation',
  'communications-planning': 'production',
  'creator-strategy': 'production',
  'experience-design': 'production',
  'healthcare-strategy': 'implementation',
  measurement: 'review',
  'media-planning': 'production',
  retention: 'review',
  'esg-communications': 'review',
};

const scoreRecommendation = (entry: SearchIndexEntry, queryTokens: string[], targetDiscipline?: string): number => {
  let score = 0;
  const haystack = tokenize(entry.keywords.join(' '));

  queryTokens.forEach((token) => {
    if (haystack.includes(token)) score += 15;
    if (tokenize(entry.title).includes(token)) score += 20;
    if (tokenize(entry.code ?? '').includes(token)) score += 25;
  });

  if (targetDiscipline && matchesDiscipline(entry.discipline, targetDiscipline)) {
    score += 30;
  }

  return score;
};

export const getRecommendationsByQuery = (query: string, index: SearchIndexEntry[]): Recommendation[] => {
  if (!query.trim()) return [];

  const normalizedQuery = normalizeDiscipline(query);
  const queryTokens = tokenize(query);
  const recommendations: Recommendation[] = [];

  // 1. Intent Detection
  Object.entries(INTENT_MAP).forEach(([intent, config]) => {
    if (config.keywords.some((k) => normalizedQuery.includes(normalizeDiscipline(k)))) {
      // Find top resources for this intent
      const matches = index
        .map((entry) => ({
          entry,
          score: scoreRecommendation(entry, queryTokens, config.discipline),
        }))
        .filter(({ entry, score }) =>
          score > 0 &&
          (
            (config.discipline && matchesDiscipline(entry.discipline, config.discipline)) ||
            tokenize(entry.keywords.join(' ')).some((token) => config.keywords.includes(token))
          )
        )
        .sort((a, b) => b.score - a.score);

      matches.slice(0, 3).forEach(({ entry }) => {
        recommendations.push({
          item: entry,
          justification: `Relacionado con tu intención de ${intent}`,
          score: 100
        });
      });
    }
  });

  // 2. Resource similarity (if no intent found but query matches something)
  if (recommendations.length === 0) {
    const directMatches = index
      .map((entry) => ({ entry, score: scoreRecommendation(entry, queryTokens) }))
      .filter(({ entry, score }) =>
        score > 0 &&
        (
          normalizeDiscipline(entry.title).includes(normalizedQuery) ||
          normalizeDiscipline(entry.code || '').includes(normalizedQuery) ||
          tokenize(entry.keywords.join(' ')).some((token) => queryTokens.includes(token))
        )
      )
      .sort((a, b) => b.score - a.score);

    directMatches.slice(0, 4).forEach(({ entry }) => {
      recommendations.push({
        item: entry,
        justification: 'Sugerido por tu búsqueda',
        score: 80
      });
    });
  }

  return recommendations.filter((v, i, a) => a.findIndex(t => t.item.id === v.item.id) === i);
};

export const getRecommendationsByResource = (entry: SearchIndexEntry, index: SearchIndexEntry[]): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  // 1. Same discipline, next stage
  const nextStage = entry.stage ? STAGE_SEQUENCE[entry.stage] : undefined;
  if (nextStage) {
    const nextResources = index.filter(
      (e) => e.id !== entry.id && matchesDiscipline(e.discipline, entry.discipline) && e.stage === nextStage,
    );
    
    nextResources.slice(0, 2).forEach(res => {
      recommendations.push({
        item: res,
        justification: `Siguiente etapa sugerida: ${nextStage}`,
        score: 90
      });
    });
  }

  // 2. Related by keywords
  const related = index.filter(e => 
    e.id !== entry.id && 
    matchesDiscipline(e.discipline, entry.discipline) && 
    e.type !== entry.type
  );

  related.slice(0, 2).forEach(res => {
    recommendations.push({
      item: res,
      justification: `Recurso complementario de ${entry.discipline}`,
      score: 70
    });
  });

  return recommendations.filter((v, i, a) => a.findIndex(t => t.item.id === v.item.id) === i);
};

export const getDefaultRecommendations = (index: SearchIndexEntry[]): Recommendation[] => {
  const preferredEntries = [
    index.find((e) => e.id === 'COM-001' && e.type === 'prompt'),
    index.find((e) => e.id === 'FUN-001' && e.type === 'prompt'),
    index.find((e) => e.id === 'DEV-001' && e.type === 'prompt'),
    index.find((e) => e.id === 'SCRIPT-001' && e.type === 'prompt'),
  ].filter(Boolean) as SearchIndexEntry[];

  if (preferredEntries.length > 0) {
    return preferredEntries.map((item) => ({
      item,
      justification: 'Punto de partida recomendado',
      score: 100,
    }));
  }

  return index
    .filter((e) => e.type === 'prompt')
    .sort((a, b) => {
      const priority = ['Comercial y Ventas', 'Content Strategy y Copy', 'Desarrollo de Software'];
      const pa = priority.findIndex((p) => matchesDiscipline(a.discipline, p));
      const pb = priority.findIndex((p) => matchesDiscipline(b.discipline, p));
      return (pa === -1 ? 99 : pa) - (pb === -1 ? 99 : pb) || a.title.localeCompare(b.title);
    })
    .slice(0, 4)
    .map((item) => ({
      item,
      justification: 'Punto de partida recomendado',
      score: 90,
    }));
};
