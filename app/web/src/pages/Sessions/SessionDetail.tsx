import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSession } from '../../services/sessionService';
import type { Session } from '../../services/types';
import TraceabilityPanel from './components/TraceabilityPanel';
import './SessionDetail.css';

const SessionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [exportMsg, setExportMsg] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const found = getSession(id);
      if (found) {
        setSession(found);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div className="state-container"><div className="loading-spinner"></div><p>Cargando rastro de sesión...</p></div>;
  
  if (!session) return (
    <div className="state-container error">
      <h2>Sesión no encontrada</h2>
      <p>No pudimos encontrar la sesión con ID: {id}</p>
      <Link to="/sesiones" className="retry-button">Volver a Mis Sesiones</Link>
    </div>
  );

  const hasResult = Boolean(
    session.payload.execution?.result ||
    session.payload.flowState?.activeExecution?.result ||
    session.payload.flowState?.completedExecutions.at(-1)?.result
  );

  return (
    <div className="session-detail-page">
      <nav className="breadcrumb">
        <Link to="/sesiones">Mis Sesiones</Link> / <span>Detalle de Sesión</span>
      </nav>

      <div className="session-detail-layout">
        <div className="detail-main">
          {hasResult && (
            <div className="review-callout">
              <div className="callout-content">
                <h3>Entregable Listo</h3>
                <p>Existe un resultado generado que puedes revisar con su contexto completo.</p>
              </div>
              <Link to={`/sesiones/${session.id}/revision`} className="primary-button">
                Iniciar Revisión
              </Link>
            </div>
          )}
          <TraceabilityPanel session={session} />
        </div>

        <aside className="detail-sidebar">
          <div className="action-card">
            <h3>Acciones</h3>
            <p>Puedes retomar el trabajo o realizar ajustes operativos sobre esta sesión.</p>
            <Link 
              to={session.originType === 'prompt' 
                ? `/brief/${session.originId}?session=${session.id}` 
                : `/flujos/${session.originId}?session=${session.id}`} 
              className="primary-button resume-btn"
            >
              Reanudar Trabajo
            </Link>
            <button
              className="secondary-button"
              onClick={() => setExportMsg('La exportación de trazabilidad todavía no está implementada.')}
            >
              Exportar Trazabilidad
            </button>
            {exportMsg && <p className="export-hint">{exportMsg}</p>}
          </div>

          <div className="info-card">
            <h3>Ayuda</h3>
            <p>La trazabilidad permite auditar el origen del entregable y los recursos que lo respaldan.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SessionDetail;
