import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAgents, getPrompts, getServices } from '../../services/dataService';
import type { Agent, Prompt, Service } from '../../services/types';
import MarkdownContent from '../../components/MarkdownContent';
import './AgentDetail.css';

const AgentDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [relatedPrompts, setRelatedPrompts] = useState<Prompt[]>([]);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [agentContent, setAgentContent] = useState<string>('');
  const [contentLoading, setContentLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    Promise.all([getAgents(), getPrompts(), getServices()])
      .then(([agents, prompts, services]) => {
        const found = agents.find((a) => a.name === name);
        if (!found) {
          setError(`El agente '${name}' no existe en la biblioteca.`);
        } else {
          setAgent(found);
          const related = prompts.filter(p => p.agent_core === found.name);
          setRelatedPrompts(related);
          const svcs = services.filter(s => s.related_agents?.includes(found.name));
          setRelatedServices(svcs);
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

  useEffect(() => {
    if (!agent) return;

    const controller = new AbortController();
    setContentLoading(true);

    fetch(`/agent-files/${agent.name}.md`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`No se pudo cargar el markdown del agente ${agent.name}`);
        }
        return response.text();
      })
      .then((text) => {
        setAgentContent(text);
        setContentLoading(false);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error(err);
        setAgentContent('');
        setContentLoading(false);
      });

    return () => controller.abort();
  }, [agent]);

  const copyToClipboard = (text: string, feedback: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(feedback);
      setTimeout(() => setCopyFeedback(null), 2000);
    });
  };

  const buildOperativeContext = () => {
    if (!agent) return '';
    let context = `# Agente: ${agent.name}\n`;
    context += `Rol: ${agent.role}\n`;
    context += `Disciplina: ${agent.discipline}\n`;
    context += `Foco: ${agent.stage}\n`;
    context += `Entregable: ${agent.deliverable_type}\n\n`;
    context += `## Propósito\n${agent.description}\n\n`;
    if (agent.philosophy) {
      context += `## Filosofía de Trabajo\n${agent.philosophy}\n\n`;
    }
    if (agent.skills.length > 0) {
      context += `## Habilidades\n${agent.skills.join('\n')}\n\n`;
    }
    if (agent.tasks.length > 0) {
      context += `## Tareas Clave\n${agent.tasks.join('\n')}\n\n`;
    }
    context += `## Personalidad y Tono\n${agent.tone}\n`;
    if (relatedPrompts.length > 0) {
      context += `\n## Prompts Vinculados\n${relatedPrompts.map(p => `- ${p.id}: ${p.name}`).join('\n')}\n`;
    }
    if (relatedServices.length > 0) {
      context += `\n## Servicios Vinculados\n${relatedServices.map(s => `- ${s.service_code}: ${s.service_name}`).join('\n')}\n`;
    }
    return context;
  };

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
            <div className="operative-actions">
              <button className="copy-button" onClick={() => copyToClipboard(buildOperativeContext(), 'ctx')}>
                {copyFeedback === 'ctx' ? '✓ Contexto copiado' : '📋 Copiar Contexto'}
              </button>
              {agentContent && (
                <button className="copy-button" onClick={() => copyToClipboard(agentContent, 'prompt')}>
                  {copyFeedback === 'prompt' ? '✓ Perfil copiado' : '📋 Copiar Perfil'}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="detail-grid">
        <div className="main-info">
          <section className="detail-section">
            <h2>Propósito</h2>
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
                <h2>Habilidades</h2>
                <ul className="check-list">
                  {agent.skills.map((skill, i) => <li key={i}>{skill}</li>)}
                </ul>
              </section>
            )}
            
            {agent.tasks.length > 0 && (
              <section className="detail-section">
                <h2>Tareas Clave</h2>
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

          {agent.start_command && (
            <section className="detail-section">
              <h2>Protocolo de Inicio</h2>
              <div className="code-block">
                <code>{agent.start_command}</code>
              </div>
            </section>
          )}

          <section className="detail-section highlight">
            <h2>Perfil Completo</h2>
            {contentLoading ? (
              <div className="manual-inline-loading">
                <div className="loading-spinner"></div>
                <p>Cargando perfil del agente...</p>
              </div>
            ) : agentContent ? (
              <MarkdownContent content={agentContent} />
            ) : (
              <>
                <div className="path-box">
                  <code>{agent.path}</code>
                </div>
                <p className="path-note">
                  No se pudo renderizar el markdown del agente. La ruta del archivo sigue disponible como referencia canónica.
                </p>
              </>
            )}
          </section>
        </div>

        <aside className="side-info">
          <div className="info-card">
            <h3>Prompts Operativos</h3>
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
            <h3>Servicios Vinculados</h3>
            {relatedServices.length > 0 ? (
              <ul className="related-list">
                {relatedServices.map(s => (
                  <li key={s.service_code}><Link to={`/servicios/${s.service_code}`}>{s.service_code}</Link></li>
                ))}
              </ul>
            ) : agent.related_services.length > 0 ? (
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
            <h3>Metadatos</h3>
            <div className="meta-list">
              <div className="meta-item"><span>Foco:</span> {agent.stage}</div>
              <div className="meta-item"><span>Entregable:</span> {agent.deliverable_type}</div>
              <div className="meta-item"><span>Disciplina:</span> {agent.discipline}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AgentDetail;