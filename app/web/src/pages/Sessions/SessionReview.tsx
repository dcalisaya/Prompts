import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSession, saveSession } from '../../services/sessionService';
import { getStatusConfig, getNextStatuses, canTransition } from '../../services/statusService';
import type { Session, SessionStatus, Execution, Brief } from '../../services/types';
import OutputRenderer from '../Briefs/components/OutputRenderer';
import ReviewSidebar from './components/ReviewSidebar';
import DerivationPanel from './components/DerivationPanel';
import OutputAssistanceCard from '../Briefs/components/OutputAssistanceCard';
import './SessionReview.css';

const SessionReview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [copyState, setCopyState] = useState<'idle' | 'done'>('idle');

  useEffect(() => {
    if (id) {
      const found = getSession(id);
      if (found) {
        setSession(found);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div className="state-container"><div className="loading-spinner"></div><p>Cargando estación de revisión...</p></div>;
  
  if (!session) return (
    <div className="state-container error">
      <h2>Sesión no encontrada</h2>
      <p>No pudimos cargar los datos de la sesión {id}.</p>
      <Link to="/sesiones" className="retry-button">Volver a Mis Sesiones</Link>
    </div>
  );

  const flowState = session.payload.flowState;
  const flowExecution: Execution | undefined =
    flowState?.activeExecution?.result
      ? flowState.activeExecution
      : flowState?.completedExecutions.at(-1);
  const execution = session.payload.execution || flowExecution;
  const brief: Brief | undefined =
    session.payload.brief ||
    execution?.brief ||
    flowState?.activeBrief;
  const resumeRoute = session.originType === 'prompt'
    ? `/brief/${session.originId}?session=${session.id}`
    : `/flujos/${session.originId}?session=${session.id}`;

  if (!execution || !execution.result || !brief) return (
    <div className="state-container">
      <h2>Sin entregable generado</h2>
      <p>Esta sesión todavía no cuenta con un entregable listo para ser revisado.</p>
      <Link to={resumeRoute} className="primary-button">
        {session.originType === 'prompt' ? 'Ir al Brief' : 'Reanudar Flujo'}
      </Link>
    </div>
  );

  const handleStatusChange = (newStatus: SessionStatus) => {
    if (session && (newStatus === session.status || canTransition(session.status, newStatus))) {
      const updated = { ...session, status: newStatus };
      setSession(updated);
      saveSession(updated);
    }
  };

  const handleCopy = async () => {
    if (execution.result) {
      await navigator.clipboard.writeText(execution.result.content);
      setCopyState('done');
      setTimeout(() => setCopyState('idle'), 2000);
    }
  };

  const statusCfg = getStatusConfig(session.status);

  return (
    <div className="session-review-page">
      <nav className="breadcrumb">
        <Link to="/sesiones">Mis Sesiones</Link> / 
        <Link to={`/sesiones/${session.id}`}>Detalle</Link> / 
        <span>Revisión de Entregable</span>
      </nav>

      <header className="review-header">
        <div className="review-title-area">
          <div className="review-badge">
            <span className="status-dot" style={{ backgroundColor: statusCfg.color }}></span>
            Estación de Revisión
          </div>
          <h1>{execution.prompt.deliverable_type}</h1>
          <p className="review-subtitle">Sesión: {session.title}</p>
        </div>

        <div className="review-actions-top">
          <div className="status-control">
            <label>Estado del Trabajo:</label>
            <select 
              value={session.status} 
              onChange={(e) => handleStatusChange(e.target.value as SessionStatus)}
              style={{ color: statusCfg.color, fontWeight: 700 }}
            >
              <option value={session.status}>{getStatusConfig(session.status).label} (Actual)</option>
              {getNextStatuses(session.status).map((status) => (
                <option key={status} value={status}>
                  {getStatusConfig(status).label}
                </option>
              ))}
            </select>
          </div>
          <button className="primary-button" onClick={handleCopy}>
            {copyState === 'done' ? '✓ Copiado' : 'Copiar Resultado'}
          </button>
        </div>
      </header>

      <div className="review-layout">
        <main className="review-main-content">
          <section className="deliverable-paper">
            <div className="paper-header">
              <span className="paper-type">{execution.prompt.deliverable_type}</span>
              <span className="paper-date">ID: {execution.id}</span>
            </div>
            <OutputRenderer result={execution.result} />
          </section>

          <OutputAssistanceCard execution={execution} sessionId={session.id} />

          <DerivationPanel execution={execution} />
        </main>

        <ReviewSidebar 
          session={session} 
          execution={execution} 
          brief={brief} 
        />
      </div>
    </div>
  );
};

export default SessionReview;
