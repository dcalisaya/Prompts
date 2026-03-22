import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Execution } from '../../../services/types';
import { getDerivationInfo } from '../../../services/derivationService';
import type { DerivationInfo } from '../../../services/derivationService';
import './DerivationPanel.css';

interface DerivationPanelProps {
  execution: Execution;
}

const DerivationPanel: React.FC<DerivationPanelProps> = ({ execution }) => {
  const [info, setInfo] = useState<DerivationInfo | null>(null);

  useEffect(() => {
    setInfo(getDerivationInfo(execution));
  }, [execution]);

  if (!info) return null;

  const hasBlockers = info.blockers.length > 0;

  return (
    <div className={`derivation-panel ${hasBlockers ? 'has-blockers' : ''}`}>
      <header className="derivation-header">
        <div className="derivation-title-group">
          <span className="derivation-badge">Continuidad Operativa</span>
          <h3>¿Qué sigue después de esta revisión?</h3>
        </div>
      </header>

      <div className="derivation-body">
        {hasBlockers && (
          <section className="derivation-section blockers-section">
            <h4>🛑 Pendientes Críticos</h4>
            <ul className="blockers-list">
              {info.blockers.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            <p className="blocker-hint">Estos puntos deben resolverse antes de derivar el trabajo a otra área.</p>
          </section>
        )}

        <section className="derivation-section recommendation-section">
          <h4>Ruta Sugerida</h4>
          <div className="recommendation-card">
            <div className="action-step">
              <span className="step-label">Próxima Acción:</span>
              <p className="step-value">{info.nextAction}</p>
            </div>
            {info.nextStage && (
              <div className="action-step">
                <span className="step-label">Etapa Destino:</span>
                <p className="step-value highlight">{info.nextStage}</p>
              </div>
            )}
          </div>
        </section>

        <section className="derivation-section roles-section">
          <h4>Roles Recomendados para Continuidad</h4>
          <div className="roles-grid">
            {info.suggestedRoles.length > 0 ? (
              info.suggestedRoles.map(role => (
                <Link key={role.id} to={`/roles/${role.slug}`} className="role-suggestion-card">
                  <span className="role-icon">👤</span>
                  <div className="role-copy">
                    <span className="role-name">{role.label}</span>
                    <span className="role-meta">{role.discipline}</span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="empty-msg">No hay roles específicos recomendados.</p>
            )}
          </div>
        </section>

        {!hasBlockers && info.warnings.length > 0 && (
          <section className="derivation-section warnings-section">
            <h4>⚠️ Observaciones Menores</h4>
            <ul className="warnings-list-simple">
              {info.warnings.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </section>
        )}
      </div>

      <footer className="derivation-footer">
        <p>La derivación no es una asignación formal, sino una orientación para mantener el flujo de trabajo entre disciplinas.</p>
      </footer>
    </div>
  );
};

export default DerivationPanel;
