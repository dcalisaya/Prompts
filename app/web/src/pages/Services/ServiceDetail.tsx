import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServices, getPrompts, getAgents } from '../../services/dataService';
import type { Service, Prompt, Agent } from '../../services/types';
import './ServiceDetail.css';

const ServiceDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [relatedPrompts, setRelatedPrompts] = useState<Prompt[]>([]);
  const [relatedAgents, setRelatedAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    Promise.all([getServices(), getPrompts(), getAgents()])
      .then(([services, prompts, agents]) => {
        const found = services.find((s) => s.service_code === code);
        if (!found) {
          setError(`El servicio '${code}' no existe en el catálogo.`);
        } else {
          setService(found);
          const promptsFilter = prompts.filter(p => p.related_services.includes(found.service_code));
          setRelatedPrompts(promptsFilter);
          const agts = agents.filter(a => found.related_agents?.includes(a.name));
          setRelatedAgents(agts);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Error al cargar el detalle del servicio.');
        setLoading(false);
        console.error(err);
      });
  }, [code]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const copyToClipboard = (text: string, feedback: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(feedback);
      setTimeout(() => setCopyFeedback(null), 2000);
    });
  };

  const buildOperativeContext = () => {
    if (!service) return '';
    let context = `# Servicio: ${service.service_code}\n`;
    context += `Nombre: ${service.service_name}\n`;
    context += `Categoría: ${service.category}\n`;
    context += `Área: ${service.owner_area}\n`;
    context += `Unidad: ${service.unit || 'No definida'}\n\n`;
    context += `## Descripción\n${service.description}\n\n`;
    if (service.summary) {
      context += `## Resumen\n${service.summary}\n\n`;
    }
    if (service.for_who) {
      context += `## Para Quién\n${service.for_who}\n\n`;
    }
    if (service.scope_base_catalog || service.scope_base) {
      context += `## Incluye\n${service.scope_base_catalog || service.scope_base}\n\n`;
    }
    if (service.not_included_catalog || service.not_included) {
      context += `## No Incluye\n${service.not_included_catalog || service.not_included}\n\n`;
    }
    if (service.value_cases) {
      context += `## Valor / Casos de Uso\n${service.value_cases}\n\n`;
    }
    if (service.inputs && service.inputs.length > 0) {
      context += `## Insumos Requeridos\n${service.inputs.join('\n')}\n`;
    }
    if (relatedPrompts.length > 0) {
      context += `\n## Prompts Operativos\n${relatedPrompts.map(p => `- ${p.id}: ${p.name}`).join('\n')}\n`;
    }
    if (relatedAgents.length > 0) {
      context += `\n## Agentes Vinculados\n${relatedAgents.map(a => `- ${a.name}: ${a.role}`).join('\n')}\n`;
    }
    return context;
  };

  const buildBriefContext = () => {
    if (!service) return '';
    let brief = `# Brief de Servicio: ${service.service_name}\n`;
    brief += `Código: ${service.service_code}\n`;
    brief += `Categoría: ${service.category}\n`;
    brief += `Área responsable: ${service.owner_area}\n\n`;
    brief += `## Descripción del Servicio\n${service.description}\n\n`;
    if (service.for_who) {
      brief += `## Público Objetivo\n${service.for_who}\n\n`;
    }
    if (service.scope_base_catalog || service.scope_base) {
      brief += `## Alcance\n${service.scope_base_catalog || service.scope_base}\n\n`;
    }
    if (service.not_included_catalog || service.not_included) {
      brief += `## Exclusiones\n${service.not_included_catalog || service.not_included}\n\n`;
    }
    if (service.value_cases) {
      brief += `## Valor Añadido\n${service.value_cases}\n\n`;
    }
    if (service.inputs && service.inputs.length > 0) {
      brief += `## Insumos del Cliente\n${service.inputs.join('\n')}\n\n`;
    }
    brief += `## Entregables Esperados\n[Definir entregables específicos]\n\n`;
    brief += `## Plazo Estimado\n[Definir]\n\n`;
    brief += `## Notas Adicionales\n[Definir]`;
    return brief;
  };

  const operativeContext = buildOperativeContext();
  const briefContext = buildBriefContext();

  if (loading) return <div className="state-container"><div className="loading-spinner"></div><p>Cargando ficha del servicio...</p></div>;
  if (error || !service) return <div className="state-container error"><h2>No encontrado</h2><p>{error || 'Servicio no encontrado'}</p><Link to="/servicios" className="retry-button">Volver al Catálogo</Link></div>;

  return (
    <div className="resource-detail-page">
      <nav className="breadcrumb">
        <Link to="/servicios">Catálogo de Servicios</Link> / <span>{service.service_code}</span>
      </nav>

      <header className="detail-header">
        <div className="header-top">
          <span className="card-badge">{service.service_code}</span>
        </div>
        <h1>{service.service_name}</h1>
        <div className="discipline-path">{service.category}</div>
        <div className="operative-actions">
          <button className="copy-button" onClick={() => copyToClipboard(buildOperativeContext(), 'ctx')}>
            {copyFeedback === 'ctx' ? '✓ Contexto copiado' : '📋 Copiar Contexto'}
          </button>
          <button className="copy-button" onClick={() => copyToClipboard(buildBriefContext(), 'brief')}>
            {copyFeedback === 'brief' ? '✓ Brief copiado' : '📋 Copiar Brief'}
          </button>
        </div>
      </header>

      <div className="detail-grid">
        <div className="main-info">
          <section className="detail-section">
            <h2>Qué es este Servicio</h2>
            <p className="large-text">{service.summary || service.description}</p>
          </section>

          <section className="detail-section highlight">
            <div className="section-head">
              <div>
                <h2>Uso con IA</h2>
                <p className="section-note">
                  Resumen operativo visible para usar este servicio fuera del app con otros asistentes.
                </p>
              </div>
              <button className="copy-button" onClick={() => copyToClipboard(operativeContext, 'ctx')}>
                {copyFeedback === 'ctx' ? '✓ Contexto copiado' : '📋 Copiar Contexto'}
              </button>
            </div>
            <div className="context-preview">
              <pre>{operativeContext}</pre>
            </div>
          </section>

          {service.for_who && (
            <section className="detail-section">
              <h2>Para Quién es</h2>
              <p>{service.for_who}</p>
            </section>
          )}

          {(service.scope_base_catalog || service.scope_base) && (
            <section className="detail-section">
              <h2>Qué Incluye</h2>
              <div className="scope-box">
                <strong>Alcance base</strong>
                <p>{service.scope_base_catalog || service.scope_base}</p>
              </div>
            </section>
          )}

          {service.value_cases && (
            <section className="detail-section">
              <h2>Valor / Casos de Uso</h2>
              <p>{service.value_cases}</p>
            </section>
          )}

          <section className="detail-section">
            <h2>Detalles de Entrega</h2>
            <div className="sub-grid">
              <div className="info-block">
                <h3>Insumos requeridos</h3>
                {service.inputs && service.inputs.length > 0 ? (
                  <ul className="check-list">
                    {service.inputs.map((input, i) => <li key={i}>{input}</li>)}
                  </ul>
                ) : (
                  <p className="empty-msg">No se han definido insumos específicos.</p>
                )}
              </div>
              <div className="info-block">
                <h3>Unidad de Medida</h3>
                <p>{service.unit || 'No definida'}</p>
              </div>
            </div>
          </section>

          {(service.not_included_catalog || service.not_included) && (
            <section className="detail-section warning">
              <h2>No Incluye</h2>
              <p>{service.not_included_catalog || service.not_included}</p>
            </section>
          )}

          <section className="detail-section">
            <div className="section-head">
              <div>
                <h2>Brief Base</h2>
                <p className="section-note">
                  Plantilla visible para iniciar una conversación o pedido operativo fuera del sistema.
                </p>
              </div>
              <button className="copy-button" onClick={() => copyToClipboard(briefContext, 'brief')}>
                {copyFeedback === 'brief' ? '✓ Brief copiado' : '📋 Copiar Brief'}
              </button>
            </div>
            <div className="context-preview brief-preview">
              <pre>{briefContext}</pre>
            </div>
          </section>
        </div>

        <aside className="side-info">
          <div className="info-card">
            <h3>Prompts Operativos</h3>
            <p className="info-desc">Para ejecutar este servicio:</p>
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
            ) : service.related_prompts && service.related_prompts.length > 0 ? (
              <ul className="related-resource-list">
                {service.related_prompts.map(pid => (
                  <li key={pid}>
                    <Link to={`/prompts/${pid}`}>
                      <span className="res-id">{pid}</span>
                      <span className="res-name">Ver prompt</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-msg">Sin prompts operativos vinculados.</p>
            )}
          </div>

          <div className="info-card">
            <h3>Agentes Vinculados</h3>
            {relatedAgents.length > 0 ? (
              <ul className="related-list">
                {relatedAgents.map(a => (
                  <li key={a.name}><Link to={`/agentes/${a.name}`}>{a.name}</Link></li>
                ))}
              </ul>
            ) : service.related_agents && service.related_agents.length > 0 ? (
              <ul className="related-list">
                {service.related_agents.map(an => (
                  <li key={an}><Link to={`/agentes/${an}`}>{an}</Link></li>
                ))}
              </ul>
            ) : (
              <p className="empty-msg">Sin agentes vinculados.</p>
            )}
          </div>

          <div className="info-card">
            <h3>Información</h3>
            <div className="meta-list">
              <div className="meta-item"><span>Área:</span> {service.owner_area}</div>
              <div className="meta-item"><span>Categoría:</span> {service.category}</div>
              <div className="meta-item"><span>Código:</span> {service.service_code}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ServiceDetail;
