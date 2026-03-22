export interface Role {
  id: string;
  slug: string;
  role: string;
  discipline: string;
  description: string;
  documents: string[];
  outcome: string[];
}

export interface Discipline {
  id: string;
  name: string;
  roles: Role[];
}

export interface Prompt {
  id: string;
  name: string;
  version: string;
  category: string;
  discipline: string;
  agent_core: string;
  source_of_truth: string[];
  related_services: string[];
  stage: string;
  input_type: string;
  deliverable_type: string;
  tags: string[];
  objective: string;
  when_to_use: string;
  input_required: string[];
  expected_output: string[];
  example_input: string;
  example_output: string[];
  path: string;
}

export interface Agent {
  name: string;
  role: string;
  discipline: string;
  related_services: string[];
  stage: string;
  deliverable_type: string;
  description: string;
  philosophy: string;
  skills: string[];
  tasks: string[];
  tone: string;
  start_command: string;
  example_input: string;
  example_output: string[];
  path: string;
}

export interface Service {
  service_code: string;
  service_name: string;
  category: string;
  description: string;
  unit?: string;
  scope_base?: string;
  not_included?: string;
  inputs?: string[];
  owner_area?: string;
  related_prompts?: string[];
  related_agents?: string[];
}

export interface Manual {
  id: string;
  name: string;
  discipline: string;
  family: string;
  path: string;
  related_prompts: string[];
}

export type SearchResourceType = 'prompt' | 'agent' | 'service' | 'manual';

export interface SearchIndexEntry {
  id: string;
  type: SearchResourceType;
  title: string;
  route: string;
  description: string;
  discipline?: string;
  category?: string;
  stage?: string;
  family?: string;
  code?: string;
  tags: string[];
  metadata: string[];
  keywords: string[];
}
