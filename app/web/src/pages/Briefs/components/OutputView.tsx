import React, { useState } from 'react';
import type { Execution } from '../../../services/types';
import OutputRenderer from './OutputRenderer';
import QualityCard from './QualityCard';
import OutputAssistanceCard from './OutputAssistanceCard';

interface OutputViewProps {
  execution: Execution;
  onRestart: () => void;
  sessionId?: string;
}

const OutputView: React.FC<OutputViewProps> = ({ execution, onRestart, sessionId }) => {
  const [showContext, setShowContext] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'done' | 'error'>('idle');
  const { result, prompt, agent } = execution;

  if (!result) return <div>No hay resultados disponibles.</div>;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.content);
      setCopyState('done');
      window.setTimeout(() => setCopyState('idle'), 2000);
    } catch {
      setCopyState('error');
      window.setTimeout(() => setCopyState('idle'), 2000);
    }
  };

  return (
    <div className="output-view-container">
      <header className="output-header">
        <div className="header-badge">
          <span className="status-dot completed"></span>
          Resultado Generado
        </div>
        <h2>{prompt.deliverable_type}</h2>
        <div className="output-meta">
          <span><strong>Agente:</strong> {agent?.role || 'Base'}</span>
          <span><strong>ID Ejecución:</strong> {execution.id}</span>
        </div>
      </header>

      <div className="output-layout">
        <main className="output-main-content">
          <section className="output-card">
            <OutputRenderer result={result} />
          </section>

          <QualityCard execution={execution} />
          
          <OutputAssistanceCard execution={execution} sessionId={sessionId} />

          <footer className="output-actions-footer">
            <div className="next-steps-info">
              <h4>¿Qué sigue?</h4>
              <p>Puedes revisar este entregable, copiar el contenido o ajustar el brief si necesitas un resultado diferente.</p>
            </div>
            <div className="action-buttons">
              <button className="secondary-button" onClick={() => setShowContext(!showContext)}>
                {showContext ? 'Ocultar Contexto' : 'Ver Contexto de Origen'}
              </button>
              <button className="secondary-button" onClick={onRestart}>
                Editar Brief
              </button>
              <button className="primary-button" onClick={handleCopy}>
                {copyState === 'done' ? 'Copiado' : copyState === 'error' ? 'No se pudo copiar' : 'Copiar Resultado'}
              </button>
            </div>
          </footer>
        </main>

        {showContext && (
          <aside className="output-context-sidebar">
            <div className="context-panel">
              <h3>Contexto de Origen</h3>
              
              <div className="context-item">
                <label>Prompt Objetivo</label>
                <p>{prompt.objective}</p>
              </div>

              <div className="context-item">
                <label>Inputs del Usuario</label>
                <ul className="mini-context-list">
                  {execution.executionContext.userInputs.map((input, i) => (
                    <li key={i}>
                      <strong>{input.field}:</strong> {Array.isArray(input.value) ? input.value.join(', ') : input.value}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="context-item">
                <label>Recursos Vinculados</label>
                <div className="context-tags">
                  {execution.services.map(s => <span key={s.service_code} className="mini-tag">{s.service_name}</span>)}
                  {execution.manuals.map(m => <span key={m.id} className="mini-tag">{m.name}</span>)}
                </div>
              </div>

              <div className="context-raw">
                <label>Full Execution Context</label>
                <pre>{JSON.stringify(execution.executionContext, null, 2)}</pre>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default OutputView;
