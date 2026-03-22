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
  summary?: string;
  for_who?: string;
  scope_base_catalog?: string;
  not_included_catalog?: string;
  value_cases?: string;
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
  category?: string;
  discipline: string;
  discipline_slug?: string;
  family: string;
  type?: string;
  version?: string;
  path: string;
  legacy_path?: string;
  legacy_id?: string;
  related_services: string[];
  related_agents?: string[];
  related_prompts: string[];
  tags?: string[];
  scope_base?: string;
  source_of_truth?: string | boolean;
  migrated?: boolean;
}

export interface FlowStep {
  id: string;
  label: string;
  promptId: string;
  description: string;
}

export interface Flow {
  id: string;
  name: string;
  description: string;
  icon: string;
  steps: FlowStep[];
}

export interface BriefInput {
  field: string;
  value: string | string[];
}

export interface Brief {
  id: string;
  promptId: string;
  promptName: string;
  input_type: string;
  deliverable_type: string;
  agent_core: string;
  related_services: string[];
  inputs: BriefInput[];
  additionalContext: string;
  notes: string;
  createdAt: string;
  status: 'draft' | 'ready';
}

export interface ExecutionResult {
  content: string;
  structured_data?: any;
  type: 'text' | 'checklist' | 'plan' | 'scheme' | 'summary';
}

export interface ExecutionRequest {
  model: string;
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface ExecutionResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export type RuntimeErrorCode =
  | 'network_error'
  | 'provider_error'
  | 'timeout_error'
  | 'empty_response'
  | 'normalization_error';

export interface ExecutionDiagnostics {
  warnings: string[];
  parsingMode: 'json' | 'markdown' | 'fallback';
  latencyMs?: number;
}

export interface ExecutionContext {
  promptId: string;
  promptName: string;
  objective: string;
  deliverableType: string;
  agentRole: string;
  userInputs: Array<{
    field: string;
    value: string | string[];
  }>;
  additionalContext: string;
  notes: string;
  services: Array<{
    code: string;
    name: string;
  }>;
  manuals: Array<{
    id: string;
    name: string;
    path: string;
  }>;
}

export interface Execution {
  id: string;
  brief: Brief;
  prompt: Prompt;
  agent?: Agent;
  services: Service[];
  manuals: Manual[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  preparedAt: string;
  executionContext: ExecutionContext;
  outputBlueprint: {
    expected_type: string;
    render_as: 'text' | 'checklist' | 'plan' | 'scheme' | 'summary';
    expected_sections: string[];
  };
  result?: ExecutionResult;
}

export type SessionOrigin = 'prompt' | 'flow';

export type SessionStatus = 'draft' | 'in_progress' | 'ready_for_review' | 'archived';

export interface Session {
  id: string;
  title: string;
  originType: SessionOrigin;
  originId: string;
  status: SessionStatus;
  createdAt: string;
  updatedAt: string;
  lastStep: string;
  payload: {
    brief?: Brief;
    execution?: Execution;
    outputAssistanceState?: Record<string, OutputAssistanceReviewState>;
    flowState?: {
      currentStepIdx: number;
      completedExecutions: Execution[];
      activeBrief?: Brief;
      activeExecution?: Execution;
      stepInternal?: 'edit' | 'summary' | 'launcher' | 'output';
    };
  };
}

export interface QualityCheck {
  id: string;
  label: string;
  description: string;
  required: boolean;
}

export interface QualityWarning {
  id: string;
  level: 'low' | 'medium' | 'high';
  message: string;
}

export interface QualityAudit {
  discipline: string;
  checklist: QualityCheck[];
  warnings: QualityWarning[];
  isPassed: boolean;
}

export interface OutputAssistance {
  deliverableType: string;
  discipline: string;
  formatSuggestions: string[];
  checklist: Array<{ id: string; label: string; description: string }>;
  deliverabilityTips: string[];
}

export interface OutputAssistanceReviewState {
  checkedIds: string[];
  updatedAt: string;
}

export interface Recommendation {
  item: SearchIndexEntry;
  justification: string;
  score: number;
}

export interface SuggestedContext {
  promptId: string;
  agent?: Agent;
  services: Service[];
  manuals: Manual[];
  suggestedInstructions: string;
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
