import type { Role, Discipline, Prompt, Agent, Service, Manual, SearchIndexEntry } from './types';

// --- Helpers ---

export const slugify = (text: string): string => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

/**
 * Normaliza el nombre de una disciplina para comparaciones seguras.
 */
export const normalizeDiscipline = (name: string): string => {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
    .replace(/[^\w\s]/g, '')        // Quitar caracteres especiales como / ,
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');          // Unificar espacios
};

const DISCIPLINE_ALIASES: Record<string, string[]> = {
  'contenido podcast y copy': ['contenido podcast y copy', 'produccion audiovisual', 'content strategy y copy'],
  'cotizacion y proformas': ['cotizacion y proformas', 'comercial y ventas'],
  'direccion y control comercial': ['direccion y control comercial', 'comercial y ventas'],
  'imagen y video ia': ['imagen y video ia', 'produccion audiovisual'],
};

export const getDisciplineMatchKeys = (name: string): string[] => {
  const normalized = normalizeDiscipline(name);
  return DISCIPLINE_ALIASES[normalized] ?? [normalized];
};

export const fetchData = async <T>(path: string): Promise<T> => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} al cargar ${path}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error en fetchData para ${path}:`, error);
    throw error;
  }
};

// --- Specific Fetchers ---

export const getRoles = (): Promise<Role[]> => fetchData<Role[]>('/data/roles_map.json');
export const getPrompts = (): Promise<Prompt[]> => fetchData<Prompt[]>('/data/prompts_operativos.json');
export const getAgents = (): Promise<Agent[]> => fetchData<Agent[]>('/data/agentes_maestros.json');

/**
 * Combina servicios base con la matriz operativa.
 */
export const getServices = async (): Promise<Service[]> => {
  const [servicesBase, serviceMatrix, prompts] = await Promise.all([
    fetchData<any[]>('/data/services.json'),
    fetchData<any[]>('/data/service_matrix.json'),
    getPrompts()
  ]);

  return serviceMatrix.map(matrixItem => {
    const baseItem = servicesBase.find(s => s.service_name === matrixItem.service_name);
    const relatedPrompts = prompts
      .filter(p => p.related_services.includes(matrixItem.service_code))
      .map(p => p.id);

    return {
      ...matrixItem,
      description: baseItem?.description || matrixItem.scope_base,
      related_prompts: relatedPrompts
    };
  });
};

export const getManuals = async (): Promise<Manual[]> => {
  const [manuals, prompts] = await Promise.all([
    fetchData<Manual[]>('/data/manuals.json'),
    getPrompts(),
  ]);

  const promptIdsByManualPath = new Map<string, string[]>();
  prompts.forEach((prompt) => {
    prompt.source_of_truth.forEach((manualPath) => {
      const existing = promptIdsByManualPath.get(manualPath) ?? [];
      if (!existing.includes(prompt.id)) existing.push(prompt.id);
      promptIdsByManualPath.set(manualPath, existing);
    });
  });

  return manuals.map((manual) => ({
    ...manual,
    related_prompts: promptIdsByManualPath.get(manual.path) ?? manual.related_prompts ?? [],
  }));
};

// --- Aggregators ---

/**
 * Obtiene disciplinas normalizadas y agrupa los roles.
 */
export const getDisciplines = async (): Promise<Discipline[]> => {
  const roles = await getRoles();
  const disciplinesMap: Record<string, { name: string, roles: Role[] }> = {};

  roles.forEach((role) => {
    const norm = normalizeDiscipline(role.discipline);
    if (!disciplinesMap[norm]) {
      disciplinesMap[norm] = { name: role.discipline, roles: [] };
    }
    disciplinesMap[norm].roles.push(role);
  });

  return Object.entries(disciplinesMap).map(([id, data]) => ({
    id,
    name: data.name,
    roles: data.roles,
  }));
};

const toKeywordList = (...values: Array<string | string[] | undefined>): string[] =>
  values
    .flatMap((value) => (Array.isArray(value) ? value : value ? [value] : []))
    .map((value) => value.trim())
    .filter(Boolean);

export const getSearchIndex = async (): Promise<SearchIndexEntry[]> => {
  const [prompts, agents, services, manuals] = await Promise.all([
    getPrompts(),
    getAgents(),
    getServices(),
    getManuals(),
  ]);

  const promptEntries: SearchIndexEntry[] = prompts.map((prompt) => ({
    id: prompt.id,
    type: 'prompt',
    title: prompt.name,
    route: `/prompts/${prompt.id}`,
    description: prompt.objective || prompt.when_to_use,
    discipline: prompt.discipline,
    category: prompt.category,
    stage: prompt.stage,
    code: prompt.id,
    tags: prompt.tags,
    metadata: [prompt.id, prompt.discipline, prompt.stage, prompt.deliverable_type],
    keywords: toKeywordList(
      prompt.id,
      prompt.name,
      prompt.discipline,
      prompt.category,
      prompt.stage,
      prompt.objective,
      prompt.when_to_use,
      prompt.tags,
      prompt.related_services,
      prompt.input_type,
      prompt.deliverable_type,
    ),
  }));

  const agentEntries: SearchIndexEntry[] = agents.map((agent) => ({
    id: agent.name,
    type: 'agent',
    title: agent.role,
    route: `/agentes/${agent.name}`,
    description: agent.description,
    discipline: agent.discipline,
    stage: agent.stage,
    code: agent.name,
    tags: [...agent.skills, ...agent.tasks].slice(0, 16),
    metadata: [agent.discipline, agent.stage, agent.deliverable_type],
    keywords: toKeywordList(
      agent.name,
      agent.role,
      agent.discipline,
      agent.description,
      agent.philosophy,
      agent.stage,
      agent.deliverable_type,
      agent.skills,
      agent.tasks,
      agent.related_services,
    ),
  }));

  const serviceEntries: SearchIndexEntry[] = services.map((service) => ({
    id: service.service_code,
    type: 'service',
    title: service.service_name,
    route: `/servicios/${service.service_code}`,
    description: service.description || service.scope_base || 'Servicio operativo',
    discipline: service.owner_area,
    category: service.category,
    code: service.service_code,
    tags: service.inputs ?? [],
    metadata: [service.service_code, service.category, service.owner_area ?? ''],
    keywords: toKeywordList(
      service.service_code,
      service.service_name,
      service.category,
      service.description,
      service.scope_base,
      service.owner_area,
      service.inputs,
      service.not_included,
      service.unit,
      service.related_prompts,
    ),
  }));

  const manualEntries: SearchIndexEntry[] = manuals.map((manual) => ({
    id: manual.id,
    type: 'manual',
    title: manual.name,
    route: `/manuales/${manual.id}`,
    description: `Manual de referencia para ${manual.discipline}.`,
    discipline: manual.discipline,
    family: manual.family,
    code: manual.id,
    tags: manual.related_prompts,
    metadata: [manual.discipline, manual.family],
    keywords: toKeywordList(
      manual.id,
      manual.name,
      manual.discipline,
      manual.family,
      manual.path,
      manual.related_prompts,
    ),
  }));

  return [...promptEntries, ...agentEntries, ...serviceEntries, ...manualEntries];
};
