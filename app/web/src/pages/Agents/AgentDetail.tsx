import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAgents, getPrompts } from '../../services/dataService';
import type { Agent, Prompt } from '../../services/types';
import './AgentDetail.css';

const AgentDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [relatedPrompts, setRelatedPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    Promise.all([getAgents(), getPrompts()])
      .then(([agents, prompts]) => {
        const found = agents.find((a) => a.name === name);
        if (!found) {
          setError(`El agente '${name}' no existe en la biblioteca.`);
        } else {
          setAgent(found);
          const related = prompts.filter(p => p.agent_core === found.name);
          setRelatedPrompts(related);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Error al cargar el detalle del agente.');
        setLoading(false);
        console.error(err);
      });
  }, [name]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return <div className="state-container"><div className="loading-spinner"></div><p>Cargando perfil del agente...</p></div>;
  if (error || !agent) return <div className="state-container error"><h2>No encontrado</h2><p>{error || 'Agente no encontrado'}</p><Link to="/agentes" className="retry-button">Volver a la Biblioteca</Link></div>;

  return (
    <div className="resource-detail-page">
      <nav className="breadcrumb">
        <Link to="/agentes">Biblioteca de Agentes</Link> / <span>{agent.name}</span>
      </nav>

      <header className="detail-header agent-header">
        <div className="header-top">
          <span className="card-badge agent-badge">AGENTE MAESTRO</span>
        </div>
        <div className="header-content">
          <div className="agent-large-icon">🤖</div>
          <div className="header-text">
            <h1>{agent.role}</h1>
            <div className="discipline-path">{agent.discipline}</div>
          </div>
        </div>
      </header>

      <div className="detail-grid">
        <div className="main-info">
          <section className="detail-section">
            <h2>Descripción Profesional</h2>
            <p className="large-text">{agent.description}</p>
          </section>

          {agent.philosophy && (
            <section className="detail-section">
              <h2>Filosofía de Trabajo</h2>
              <p>{agent.philosophy}</p>
            </section>
          )}

          <div className="sub-grid">
            {agent.skills.length > 0 && (
              <section className="detail-section">
                <h2>Habilidades Críticas</h2>
                <ul className="check-list">
                  {agent.skills.map((skill, i) => <li key={i}>{skill}</li>)}
                </ul>
              </section>
            )}
            
            {agent.tasks.length > 0 && (
              <section className="detail-section">
                <h2>Tareas Operativas</h2>
                <ul className="task-list">
                  {agent.tasks.map((task, i) => <li key={i}>{task}</li>)}
                </ul>
              </section>
            )}
          </div>

          <section className="detail-section highlight">
            <h2>Personalidad y Tono</h2>
            <p>{agent.tone}</p>
          </section>
        </div>

        <aside className="side-info">
          <div className="info-card">
            <h3>Herramientas Vinculadas</h3>
            <p className="info-desc">Prompts diseñados para este agente:</p>
            {relatedPrompts.length > 0 ? (
              <ul className="related-resource-list">
                {relatedPrompts.map(p => (
                  <li key={p.id}>
                    <Link to={`/prompts/${p.id}`}>
                      <span className="res-id">{p.id}</span>
                      <span className="res-name">{p.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-msg">No hay prompts vinculados aún.</p>
            )}
          </div>

          <div className="info-card">
            <h3>Servicios Relacionados</h3>
            {agent.related_services.length > 0 ? (
              <ul className="related-list">
                {agent.related_services.map(s => (
                  <li key={s}><Link to={`/servicios/${s}`}>{s}</Link></li>
                ))}
              </ul>
            ) : (
              <p className="empty-msg">Sin servicios vinculados.</p>
            )}
          </div>

          <div className="info-card">
            <h3>Metadata Operativa</h3>
            <div className="meta-list">
              <div className="meta-item"><span>Foco:</span> {agent.stage}</div>
              <div className="meta-item"><span>Entregable:</span> {agent.deliverable_type}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AgentDetail;
