import React from 'react';
import { Link } from 'react-router-dom';
import type { Session, Execution, Brief } from '../../../services/types';
import { getStatusConfig } from '../../../services/statusService';
import QualityCard from '../../Briefs/components/QualityCard';
import './TraceabilityPanel.css';

interface TraceabilityPanelProps {
  session: Session;
}

const ResourceSection: React.FC<{ execution: Execution }> = ({ execution }) => (
  <div className="trace-section">
    <h4>Recursos Utilizados</h4>
    <div className="trace-resource-grid">
      <div className="trace-resource-item">
        <span className="trace-label">Prompt:</span>
        <Link to={`/prompts/${execution.prompt.id}`} className="trace-link">{execution.prompt.name}</Link>
      </div>
      <div className="trace-resource-item">
        <span className="trace-label">Agente:</span>
        <Link to={`/agentes/${execution.agent?.name}`} className="trace-link">{execution.agent?.role || 'Base'}</Link>
      </div>
      {execution.services.length > 0 && (
        <div className="trace-resource-item">
          <span className="trace-label">Servicios:</span>
          <div className="trace-tags">
            {execution.services.map(s => (
              <Link key={s.service_code} to={`/servicios/${s.service_code}`} className="mini-tag trace-tag-link">
                {s.service_name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {execution.manuals.length > 0 && (
        <div className="trace-resource-item">
          <span className="trace-label">Manuales:</span>
          <div className="trace-tags">
            {execution.manuals.map(m => (
              <Link key={m.id} to={`/manuales/${m.id}`} className="mini-tag trace-tag-link">
                {m.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

const InputSection: React.FC<{ brief: Brief }> = ({ brief }) => (
  <div className="trace-section">
    <h4>Inputs Principales</h4>
    <div className="trace-inputs">
      {brief.inputs.map((input, i) => (
        <div key={i} className="trace-input-item">
          <strong>{input.field}:</strong> <span>{String(input.value) || '(vacio)'}</span>
        </div>
      ))}
      {brief.additionalContext && (
        <div className="trace-input-item">
          <strong>Contexto Adicional:</strong> <p>{brief.additionalContext}</p>
        </div>
      )}
    </div>
  </div>
);

const OutputSection: React.FC<{ execution: Execution }> = ({ execution }) => (
  <div className="trace-section">
    <h4>Output Generado</h4>
    <div className="trace-output-preview">
      <div className="output-meta">
        <span className="deliverable-type">{execution.prompt.deliverable_type}</span>
        <span className="execution-date">Generado el: {new Date(execution.preparedAt).toLocaleDateString()}</span>
      </div>
      {execution.result ? (
        <div className="output-content-summary">
          <p>{execution.result.content.substring(0, 300)}...</p>
        </div>
      ) : (
        <p className="empty-trace">No se ha generado resultado todavía.</p>
      )}
    </div>
  </div>
);

const TraceabilityPanel: React.FC<TraceabilityPanelProps> = ({ session }) => {
  const statusCfg = getStatusConfig(session.status);
  const isFlow = session.originType === 'flow';
  const flowState = session.payload.flowState;
  const hasActiveStep = isFlow && flowState && (flowState.activeBrief || flowState.activeExecution);

  return (
    <div className="traceability-panel">
      <header className="trace-header">
        <div className="trace-header-top">
          <span className={`trace-type-badge ${session.originType}`}>
            {session.originType === 'prompt' ? 'Prompt Individual' : 'Flujo Guiado'}
          </span>
          <span className="trace-status-tag" style={{ color: statusCfg.color, borderColor: statusCfg.color }}>
            {statusCfg.label}
          </span>
        </div>
        <h3 className="trace-title">{session.title}</h3>
        <p className="trace-id">ID de Sesión: {session.id}</p>
      </header>

      <div className="trace-body">
        {isFlow && flowState ? (
          <div className="flow-trace">
            <h4>Pasos del Flujo</h4>
            <div className="flow-steps-trace">
              {flowState.completedExecutions.map((exec, idx) => (
                <details key={exec.id} className="flow-step-detail">
                  <summary>
                    <span className="step-idx">Paso {idx + 1}:</span> {exec.prompt.name}
                  </summary>
                  <div className="step-content">
                    <ResourceSection execution={exec} />
                    <InputSection brief={exec.brief} />
                    <OutputSection execution={exec} />
                    <QualityCard execution={exec} />
                  </div>
                </details>
              ))}
              {flowState.completedExecutions.length === 0 && (
                <p className="empty-trace">No hay pasos completados en este flujo.</p>
              )}
            </div>

            {hasActiveStep && (
              <div className="trace-section active-flow-trace">
                <h4>Paso Activo</h4>
                <div className="active-flow-card">
                  <div className="active-flow-meta">
                    <span className="mini-tag">Paso {((flowState?.currentStepIdx || 0) + 1)}</span>
                    <span className="mini-tag">{flowState?.stepInternal || 'edit'}</span>
                  </div>
                  {flowState?.activeExecution ? (
                    <>
                      <ResourceSection execution={flowState.activeExecution} />
                      <InputSection brief={flowState.activeExecution.brief} />
                      <OutputSection execution={flowState.activeExecution} />
                    </>
                  ) : flowState?.activeBrief ? (
                    <>
                      <InputSection brief={flowState.activeBrief} />
                      <p className="info-msg">Este paso sigue en preparación. Todavía no hay una ejecución consolidada.</p>
                    </>
                  ) : (
                    <p className="empty-trace">No hay un paso activo persistido en este flujo.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="single-trace">
            {session.payload.execution ? (
              <>
                <ResourceSection execution={session.payload.execution} />
                <InputSection brief={session.payload.brief || session.payload.execution.brief} />
                <OutputSection execution={session.payload.execution} />
                <QualityCard execution={session.payload.execution} />
              </>
            ) : session.payload.brief ? (
              <>
                <InputSection brief={session.payload.brief} />
                <p className="info-msg">Esta sesión está en fase de brief. Todavía no hay ejecución ni recursos consolidados.</p>
              </>
            ) : (
              <p className="empty-trace">No hay datos operativos registrados en esta sesión.</p>
            )}
          </div>
        )}
      </div>

      <footer className="trace-footer">
        <div className="trace-dates">
          <span>Creado: {new Date(session.createdAt).toLocaleString()}</span>
          <span>Actualizado: {new Date(session.updatedAt).toLocaleString()}</span>
        </div>
      </footer>
    </div>
  );
};

export default TraceabilityPanel;
