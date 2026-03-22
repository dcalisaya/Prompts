import React from 'react';
import { Link } from 'react-router-dom';
import type { Session, Execution, Brief } from '../../../services/types';
import QualityCard from '../../Briefs/components/QualityCard';

interface ReviewSidebarProps {
  session: Session;
  execution: Execution;
  brief: Brief;
}

const ReviewSidebar: React.FC<ReviewSidebarProps> = ({ session, execution, brief }) => {
  const resumeRoute = session.originType === 'prompt'
    ? `/brief/${execution.prompt.id}?session=${session.id}`
    : `/flujos/${session.originId}?session=${session.id}`;

  return (
    <aside className="review-sidebar">
      <section className="review-side-section">
        <h4>Objetivo del Trabajo</h4>
        <p className="side-objective">{execution.prompt.objective}</p>
      </section>

      <section className="review-side-section">
        <h4>Resumen de Inputs</h4>
        <div className="mini-inputs-list">
          {brief.inputs.map((input, i) => (
            <div key={i} className="mini-input-item">
              <span className="mini-label">{input.field}:</span>
              <span className="mini-value">{String(input.value)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="review-side-section">
        <h4>Recursos Vinculados</h4>
        <div className="side-resources">
          <div className="res-item">
            <span className="res-label">Agente:</span>
            <Link to={`/agentes/${execution.agent?.name}`} className="res-link">
              {execution.agent?.role || 'Base'}
            </Link>
          </div>
          {execution.services.length > 0 && (
            <div className="res-item">
              <span className="res-label">Servicios:</span>
              <div className="side-tags">
                {execution.services.map(s => (
                  <Link key={s.service_code} to={`/servicios/${s.service_code}`} className="mini-tag res-tag-link">
                    {s.service_name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {execution.manuals.length > 0 && (
            <div className="res-item">
              <span className="res-label">Manuales:</span>
              <div className="side-tags">
                {execution.manuals.map(m => (
                  <Link key={m.id} to={`/manuales/${m.id}`} className="mini-tag res-tag-link">
                    {m.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <QualityCard execution={execution} />

      <section className="review-side-section actions-section">
        <h4>Continuidad Operativa</h4>
        <div className="side-actions-grid">
          <Link to={resumeRoute} className="secondary-button full-width">
            {session.originType === 'prompt' ? 'Ajustar Brief' : 'Retomar Flujo'}
          </Link>
          <p className="review-inline-hint">
            Para re-ejecutar, vuelve al workspace operativo y ajusta el brief o el flujo desde la sesión activa.
          </p>
        </div>
      </section>
    </aside>
  );
};

export default ReviewSidebar;
