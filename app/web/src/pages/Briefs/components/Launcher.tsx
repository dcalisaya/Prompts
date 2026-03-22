import React from 'react';
import { Link } from 'react-router-dom';
import type { Execution } from '../../../services/types';
import { validateExecution } from '../../../services/executionService';

interface LauncherProps {
  execution: Execution;
  onLaunch: () => void;
}

const Launcher: React.FC<LauncherProps> = ({ execution, onLaunch }) => {
  const { warnings } = validateExecution(execution);
  const { prompt, agent, brief, services, manuals } = execution;

  return (
    <div className="launcher-container">
      <section className="launcher-section context-overview">
        <div className="agent-display-card">
          <div className="agent-icon">🤖</div>
          <div className="agent-info">
            <span className="label">Agente de Ejecución</span>
            <h3 className="agent-name">{agent ? agent.role : 'Agente Genérico'}</h3>
            <p className="agent-desc">{agent ? agent.description : 'Procesará el prompt usando capacidades base.'}</p>
          </div>
          {agent && (
            <Link to={`/agentes/${agent.name}`} className="view-link">Ver Ficha</Link>
          )}
        </div>
      </section>

      {warnings.length > 0 && (
        <div className="warnings-box">
          <h4>Avisos de Configuración</h4>
          <ul>
            {warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}

      <div className="launcher-grid">
        <div className="launcher-main">
          <section className="launcher-section">
            <h3>Brief Consolidado</h3>
            <div className="consolidated-inputs">
              {brief.inputs.map((input, i) => (
                <div key={i} className="input-preview">
                  <span className="field-label">{input.field}</span>
                  <div className="field-value">{input.value as string}</div>
                </div>
              ))}
              {brief.additionalContext && (
                <div className="input-preview highlight">
                  <span className="field-label">Contexto Extra</span>
                  <div className="field-value">{brief.additionalContext}</div>
                </div>
              )}
            </div>
          </section>

          <section className="launcher-section">
            <h3>Instrucción de Salida</h3>
            <div className="output-preview-card">
              <div className="output-type">
                <span className="label">Tipo de Entregable:</span>
                <span className="value">{prompt.deliverable_type}</span>
              </div>
              <div className="output-expectations">
                <span className="label">Se generará:</span>
                <ul>
                  {prompt.expected_output.map((out, i) => <li key={i}>{out}</li>)}
                </ul>
              </div>
            </div>
          </section>
        </div>

        <aside className="launcher-sidebar">
          <section className="launcher-section">
            <h3>Recursos de Apoyo</h3>
            
            <div className="resource-group">
              <h4>Servicios Relacionados</h4>
              {services.length > 0 ? (
                <ul className="mini-resource-list">
                  {services.map(s => (
                    <li key={s.service_code}>
                      <Link to={`/servicios/${s.service_code}`} className="mini-card">
                        <span className="code">{s.service_code}</span>
                        <span className="name">{s.service_name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-text">Sin servicios asociados.</p>
              )}
            </div>

            <div className="resource-group">
              <h4>Source of Truth (Manuales)</h4>
              {manuals.length > 0 ? (
                <ul className="mini-resource-list">
                  {manuals.map(m => (
                    <li key={m.id}>
                      <Link to={`/manuales/${m.id}`} className="mini-card">
                        <span className="name">{m.name}</span>
                        <span className="category">{m.family}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-text">Sin manuales de referencia.</p>
              )}
            </div>
          </section>

          <div className="execution-action-card">
            <h3>Listo para Lanzar</h3>
            <p>Se enviará el prompt <strong>{prompt.id}</strong> con el contexto arriba descrito.</p>
            <button className="primary-button launch-button" onClick={onLaunch}>
              Lanzar Prompt
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Launcher;
