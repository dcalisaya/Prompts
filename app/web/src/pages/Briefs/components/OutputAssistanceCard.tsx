import React, { useState, useEffect } from 'react';
import { getSession, saveSession } from '../../../services/sessionService';
import type { Execution, OutputAssistance } from '../../../services/types';
import { getOutputAssistance } from '../../../services/outputAssistanceService';
import './OutputAssistanceCard.css';

interface OutputAssistanceCardProps {
  execution: Execution;
  sessionId?: string;
}

const OutputAssistanceCard: React.FC<OutputAssistanceCardProps> = ({ execution, sessionId }) => {
  const [assistance, setAssistance] = useState<OutputAssistance | null>(null);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setAssistance(getOutputAssistance(execution));
  }, [execution]);

  useEffect(() => {
    if (!sessionId) return;
    const session = getSession(sessionId);
    const stored = session?.payload.outputAssistanceState?.[execution.id];
    setCheckedIds(new Set(stored?.checkedIds ?? []));
  }, [execution.id, sessionId]);

  if (!assistance) return null;

  const toggleCheck = (id: string) => {
    const next = new Set(checkedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCheckedIds(next);

    if (sessionId) {
      const session = getSession(sessionId);
      if (session) {
        saveSession({
          ...session,
          payload: {
            ...session.payload,
            outputAssistanceState: {
              ...(session.payload.outputAssistanceState ?? {}),
              [execution.id]: {
                checkedIds: Array.from(next),
                updatedAt: new Date().toISOString(),
              },
            },
          },
        });
      }
    }
  };

  const progress = assistance.checklist.length
    ? Math.round((checkedIds.size / assistance.checklist.length) * 100)
    : 0;

  return (
    <div className="output-assistance-card">
      <header className="oa-header">
        <div className="oa-title-wrap">
          <span className="oa-badge">Fase 5C: Asistencia de Salida</span>
          <h3>Optimización de Entregable</h3>
          <p className="oa-subtitle">
            {assistance.discipline} · {assistance.deliverableType}
          </p>
        </div>
        <div className="oa-progress">
          <div className="oa-progress-bar">
            <div className="oa-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span>{checkedIds.size} / {assistance.checklist.length}</span>
        </div>
      </header>

      <div className="oa-body">
        {assistance.formatSuggestions.length > 0 && (
          <section className="oa-section">
            <h4>Estructura Recomendada</h4>
            <div className="format-tags">
              {assistance.formatSuggestions.map((tag, i) => (
                <span key={i} className="format-tag">{tag}</span>
              ))}
            </div>
            <p className="oa-section-hint">Asegúrate de que estas secciones estén bien representadas en el texto.</p>
          </section>
        )}

        <section className="oa-section">
          <h4>Validación de Entrega</h4>
          <div className="oa-checklist">
            {assistance.checklist.map(item => (
              <label key={item.id} className={`oa-check-item ${checkedIds.has(item.id) ? 'checked' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={checkedIds.has(item.id)} 
                  onChange={() => toggleCheck(item.id)}
                />
                <div className="oa-item-info">
                  <span className="oa-item-label">{item.label}</span>
                  <span className="oa-item-desc">{item.description}</span>
                </div>
              </label>
            ))}
          </div>
        </section>

        <section className="oa-section tips-section">
          <h4>Tips de Entregabilidad</h4>
          <ul className="oa-tips-list">
            {assistance.deliverabilityTips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="oa-footer">
        <p>Esta capa de asistencia ayuda a convertir el output en un entregable más claro, usable y revisable.</p>
      </footer>
    </div>
  );
};

export default OutputAssistanceCard;
