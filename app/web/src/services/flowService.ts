import type { Flow } from './types';

export const FLOWS: Flow[] = [
  {
    id: 'cotizacion',
    name: 'Flujo de Cotización',
    description: 'De la necesidad inicial al listado de servicios cotizables.',
    icon: '💰',
    steps: [
      {
        id: 'step1',
        label: 'Necesidad Inicial',
        promptId: 'COM-001',
        description: 'Entender el requerimiento consultivo del cliente.'
      },
      {
        id: 'step2',
        label: 'Definición de Alcance',
        promptId: 'COM-002',
        description: 'Traducir el requerimiento en servicios y reglas de negocio.'
      }
    ]
  },
  {
    id: 'contenido',
    name: 'Creación de Contenido',
    description: 'Del concepto creativo a la planificación de producción.',
    icon: '✍️',
    steps: [
      {
        id: 'step1',
        label: 'Guion y Concepto',
        promptId: 'SCRIPT-001',
        description: 'Definir la narrativa y estructura del contenido.'
      },
      {
        id: 'step2',
        label: 'Plan de Producción',
        promptId: 'PROD-001',
        description: 'Establecer los pasos y recursos para la ejecución audiovisual.'
      }
    ]
  },
  {
    id: 'desarrollo',
    name: 'Ciclo de Desarrollo',
    description: 'De la arquitectura técnica a la auditoría de calidad.',
    icon: '💻',
    steps: [
      {
        id: 'step1',
        label: 'Arquitectura',
        promptId: 'DEV-001',
        description: 'Definir el stack y la estructura técnica de la solución.'
      },
      {
        id: 'step2',
        label: 'Auditoría',
        promptId: 'DEV-002',
        description: 'Revisar la calidad y adherencia a estándares del código.'
      }
    ]
  },
  {
    id: 'cx-crm',
    name: 'Estrategia CX/CRM',
    description: 'Del mapa de experiencia al flujo operativo de retención.',
    icon: '🤝',
    steps: [
      {
        id: 'step1',
        label: 'Customer Journey',
        promptId: 'CX-001',
        description: 'Mapear la experiencia actual e identificar fricciones.'
      },
      {
        id: 'step2',
        label: 'Flujo Operativo',
        promptId: 'CRM-001',
        description: 'Diseñar el flujo de automatización y lifecycle.'
      }
    ]
  }
];

export const getFlows = (): Promise<Flow[]> => Promise.resolve(FLOWS);
export const getFlowById = (id: string): Promise<Flow | undefined> => 
  Promise.resolve(FLOWS.find(f => f.id === id));
