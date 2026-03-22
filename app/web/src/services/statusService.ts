import type { SessionStatus } from './types';

export interface StatusConfig {
  label: string;
  color: string;
  description: string;
}

export const STATUS_CONFIG: Record<SessionStatus, StatusConfig> = {
  draft: {
    label: 'Borrador',
    color: '#64748b', // Slate
    description: 'Trabajo inicial sin validación completa.'
  },
  in_progress: {
    label: 'En Progreso',
    color: '#3b82f6', // Blue
    description: 'Brief o flujo siendo activamente trabajado.'
  },
  ready_for_review: {
    label: 'Listo para Revisión',
    color: '#10b981', // Emerald
    description: 'Entregable generado y listo para control de calidad.'
  },
  archived: {
    label: 'Archivado',
    color: '#94a3b8', // Slate-400
    description: 'Trabajo finalizado o descartado que ya no requiere atención.'
  }
};

export const getStatusConfig = (status: SessionStatus): StatusConfig => {
  return STATUS_CONFIG[status] || STATUS_CONFIG.draft;
};

export const getNextStatuses = (currentStatus: SessionStatus): SessionStatus[] => {
  switch (currentStatus) {
    case 'draft':
      return ['in_progress', 'archived'];
    case 'in_progress':
      return ['ready_for_review', 'archived'];
    case 'ready_for_review':
      return ['in_progress', 'archived'];
    case 'archived':
      return ['in_progress'];
    default:
      return [];
  }
};

export const canTransition = (from: SessionStatus, to: SessionStatus): boolean => {
  return getNextStatuses(from).includes(to);
};
