import React from 'react';
import type { SuggestedContext } from '../../../services/types';
import './ContextSuggestion.css';

interface ContextSuggestionProps {
  suggestion: SuggestedContext;
  onApply: () => void;
  onDismiss: () => void;
}

const ContextSuggestion: React.FC<ContextSuggestionProps> = ({ suggestion, onApply, onDismiss }) => {
  const resourceCount = (suggestion.agent ? 1 : 0) + suggestion.services.length + suggestion.manuals.length;

  return (
    <div className="context-suggestion-banner">
      <div className="suggestion-icon">🪄</div>
      <div className="suggestion-content">
        <h4>Configuración Automática</h4>
        <p>
          He preparado un equipo base con <strong>{resourceCount} recursos</strong> para esta tarea. 
          Esto autocompletará el contexto y vinculará al agente y manuales ideales.
        </p>
        <div className="suggestion-preview">
          {suggestion.agent && <span className="mini-tag">🤖 {suggestion.agent.role}</span>}
          {suggestion.manuals.map(m => <span key={m.id} className="mini-tag">📚 {m.name}</span>)}
          {suggestion.services.map(s => <span key={s.service_code} className="mini-tag">🛠️ {s.service_name}</span>)}
        </div>
      </div>
      <div className="suggestion-actions">
        <button className="apply-btn" onClick={onApply}>Aplicar Equipo</button>
        <button className="dismiss-btn" onClick={onDismiss}>Omitir</button>
      </div>
    </div>
  );
};

export default ContextSuggestion;
