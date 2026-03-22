import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listSessions, deleteSession } from '../../services/sessionService';
import { STATUS_CONFIG } from '../../services/statusService';
import type { Session, SessionStatus } from '../../services/types';
import './SessionList.css';

const SessionList: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filter, setFilter] = useState<SessionStatus | 'all'>('all');

  useEffect(() => {
    setSessions(listSessions());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que deseas eliminar esta sesión?')) {
      deleteSession(id);
      setSessions(listSessions());
    }
  };

  const filteredSessions = filter === 'all' 
    ? sessions 
    : sessions.filter(s => s.status === filter);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="session-list-page">
      <header className="page-header">
        <h1>Mis Sesiones</h1>
        <p>Retoma el trabajo donde lo dejaste. Las sesiones se guardan localmente en tu navegador.</p>
      </header>

      <div className="filter-bar">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todos ({sessions.length})
        </button>
        {(Object.keys(STATUS_CONFIG) as SessionStatus[]).map(status => {
          const count = sessions.filter(s => s.status === status).length;
          return (
            <button 
              key={status}
              className={`filter-btn ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
              disabled={count === 0 && filter !== status}
            >
              {STATUS_CONFIG[status].label} ({count})
            </button>
          );
        })}
      </div>

      {filteredSessions.length === 0 ? (
        <div className="empty-sessions">
          <div className="empty-icon">📂</div>
          <h3>{filter === 'all' ? 'No tienes sesiones activas' : `No hay sesiones en estado "${STATUS_CONFIG[filter as SessionStatus].label}"`}</h3>
          <p>Comienza a trabajar con un prompt o un flujo guiado para crear una sesión.</p>
          <div className="empty-actions">
            <Link to="/prompts" className="primary-button">Ir a Biblioteca</Link>
            {filter !== 'all' && (
              <button className="secondary-button" onClick={() => setFilter('all')}>Ver todos</button>
            )}
          </div>
        </div>
      ) : (
        <div className="sessions-grid">
          {filteredSessions.map(session => {
            const statusCfg = STATUS_CONFIG[session.status] || STATUS_CONFIG.draft;
            const resumeRoute = session.originType === 'prompt'
              ? `/brief/${session.originId}?session=${session.id}`
              : `/flujos/${session.originId}?session=${session.id}`;
            return (

              <article
                key={session.id} 
                className={`session-card status-${session.status}`}
              >
                <div className="session-header">
                  <span className={`session-type-badge ${session.originType}`}>
                    {session.originType === 'prompt' ? 'Prompt' : 'Flujo'}
                  </span>
                  <span 
                    className={`session-status-tag`}
                    style={{ backgroundColor: statusCfg.color + '20', color: statusCfg.color, borderColor: statusCfg.color }}
                  >
                    {statusCfg.label}
                  </span>
                </div>
                
                <h3 className="session-title">{session.title}</h3>
                
                <div className="session-meta">
                  <div className="meta-item">
                    <span className="label">Actualizado:</span>
                    <span className="value">{formatDate(session.updatedAt)}</span>
                  </div>
                </div>

                <div className="session-footer">
                  <button 
                    className="delete-session-btn" 
                    onClick={(e) => handleDelete(session.id, e)}
                    title="Eliminar sesión"
                  >
                    🗑️
                  </button>
                  <div className="session-actions">
                    <Link to={`/sesiones/${session.id}`} className="detail-link">Ver Detalle</Link>
                    {session.status === 'ready_for_review' && (
                      <Link to={`/sesiones/${session.id}/revision`} className="review-link-action">Revisar</Link>
                    )}
                    <Link to={resumeRoute} className="resume-link">Reanudar →</Link>
                  </div>

                </div>

              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SessionList;
