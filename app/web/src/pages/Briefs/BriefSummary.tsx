import React from 'react';
import type { Prompt, Brief } from '../../services/types';

interface BriefSummaryProps {
  prompt: Prompt;
  brief: Brief;
}

const BriefSummary: React.FC<BriefSummaryProps> = ({ prompt, brief }) => {
  return (
    <div className="brief-summary">
      <div className="summary-card">
        <h3>Estructura del Brief</h3>
        
        <div className="summary-grid-main">
          <div className="summary-section">
            <label>Prompt Seleccionado</label>
            <div className="summary-value">{brief.promptName}</div>
            <div className="summary-subtext">ID: {brief.promptId}</div>
          </div>

          <div className="summary-section">
            <label>Agente Responsable</label>
            <div className="summary-value">🤖 {brief.agent_core}</div>
          </div>
        </div>
        
        <div className="summary-section">
          <label>Entregable Esperado</label>
          <div className="summary-value highlight-value">{brief.deliverable_type}</div>
          <ul className="mini-list">
            {prompt.expected_output.map((out, i) => <li key={i}>{out}</li>)}
          </ul>
        </div>

        <div className="summary-section">
          <label>Inputs Cargados</label>
          <div className="summary-inputs-list">
            {brief.inputs.map((input, i) => (
              <div key={i} className="summary-input-item">
                <span className="field-name">{input.field}</span>
                <span className="field-value">{input.value as string || 'No especificado'}</span>
              </div>
            ))}
          </div>
        </div>

        {(brief.additionalContext || brief.notes) && (
          <div className="summary-section">
            <label>Contexto y Restricciones</label>
            <div className="summary-extra-grid">
              {brief.additionalContext && (
                <div className="context-box">
                  <strong>Información extra:</strong>
                  <p>{brief.additionalContext}</p>
                </div>
              )}
              {brief.notes && (
                <div className="context-box">
                  <strong>Notas:</strong>
                  <p>{brief.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BriefSummary;
