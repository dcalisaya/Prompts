import React, { useState, useEffect } from 'react';
import type { Execution, QualityAudit } from '../../../services/types';
import { runBasicAudit } from '../../../services/qualityService';
import './QualityCard.css';

interface QualityCardProps {
  execution: Execution;
}

const QualityCard: React.FC<QualityCardProps> = ({ execution }) => {
  const [audit, setAudit] = useState<QualityAudit | null>(null);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setAudit(runBasicAudit(execution));
  }, [execution]);

  if (!audit) return null;

  const toggleCheck = (id: string) => {
    const next = new Set(checkedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCheckedIds(next);
  };

  const progress = Math.round((checkedIds.size / audit.checklist.length) * 100);

  return (
    <div className="quality-card">
      <header className="quality-header">
        <div className="quality-title-group">
          <h3>Control de Calidad</h3>
          <span className="discipline-tag">{audit.discipline}</span>
        </div>
        <div className="quality-progress">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="progress-text">{checkedIds.size} / {audit.checklist.length}</span>
        </div>
      </header>

      {audit.warnings.length > 0 && (
        <section className="quality-warnings">
          <h4>Alertas de Configuración</h4>
          <ul>
            {audit.warnings.map(warning => (
              <li key={warning.id} className={`warning-item level-${warning.level}`}>
                <span className="warning-icon">{warning.level === 'high' ? '🛑' : '⚠️'}</span>
                <span className="warning-message">{warning.message}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="quality-checklist">
        <h4>Checklist de Revisión</h4>
        <div className="checklist-items">
          {audit.checklist.map(item => (
            <label key={item.id} className={`checklist-item ${checkedIds.has(item.id) ? 'checked' : ''}`}>
              <input 
                type="checkbox" 
                checked={checkedIds.has(item.id)} 
                onChange={() => toggleCheck(item.id)}
              />
              <div className="item-content">
                <span className="item-label">
                  {item.label} 
                  {item.required && <span className="required-mark" title="Obligatorio">*</span>}
                </span>
                <p className="item-desc">{item.description}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      <footer className="quality-footer">
        <p className="quality-hint">
          Usa este checklist para validar la calidad del entregable antes de finalizar o compartir el trabajo.
        </p>
      </footer>
    </div>
  );
};

export default QualityCard;
