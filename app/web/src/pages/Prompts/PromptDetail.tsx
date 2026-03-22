import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPrompts, getManuals } from '../../services/dataService';
import type { Prompt, Manual } from '../../services/types';
import './PromptDetail.css';

const PromptDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    Promise.all([getPrompts(), getManuals()])
      .then(([prompts, allManuals]) => {
        const found = prompts.find((p) => p.id === id);
        if (!found) {
          setError(`El prompt '${id}' no existe en la biblioteca.`);
        } else {
          setPrompt(found);
          setManuals(allManuals);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Error al cargar el detalle del prompt.');
        setLoading(false);
        console.error(err);
      });
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return <div className="state-container"><div className="loading-spinner"></div><p>Cargando especificaciones del prompt...</p></div>;
  if (error || !prompt) return <div className="state-container error"><h2>No encontrado</h2><p>{error || 'Prompt no encontrado'}</p><Link to="/prompts" className="retry-button">Volver a la Biblioteca</Link></div>;

  return (
    <div className="resource-detail-page">
      <nav className="breadcrumb">
        <Link to="/prompts">Biblioteca de Prompts</Link> / <span>{prompt.id}</span>
      </nav>

      <header className="detail-header">
        <div className="header-top">
          <span className="card-badge">{prompt.id}</span>
          <span className="version-tag">v{prompt.version}</span>
        </div>
        <h1>{prompt.name}</h1>
        <div className="discipline-path">{prompt.discipline} / {prompt.category}</div>
      </header>

      <div className="detail-grid">
        <div className="main-info">
          <section className="detail-section">
            <h2>Objetivo</h2>
            <p className="large-text">{prompt.objective}</p>
          </section>

          <section className="detail-section">
            <h2>Cuándo usar</h2>
            <p>{prompt.when_to_use}</p>
          </section>

          <section className="detail-section highlight">
            <h2>Instrucciones Operativas</h2>
            <div className="sub-grid">
              <div className="info-block">
                <h3>Input Necesario</h3>
                <p>{prompt.input_type}</p>
                <ul>
                  {prompt.input_required.map((req, i) => <li key={i}>{req}</li>)}
                </ul>
              </div>
              <div className="info-block">
                <h3>Entregable</h3>
                <p>{prompt.deliverable_type}</p>
                <ul>
                  {prompt.expected_output.map((out, i) => <li key={i}>{out}</li>)}
                </ul>
              </div>
            </div>
          </section>

          {prompt.example_input && (
            <section className="detail-section">
              <h2>Ejemplo de Uso</h2>
              <div className="example-box">
                <div className="example-input">
                  <strong>Entrada:</strong>
                  <p>{prompt.example_input}</p>
                </div>
                {prompt.example_output.length > 0 && (
                  <div className="example-output">
                    <strong>Resultado sugerido:</strong>
                    <ul>
                      {prompt.example_output.map((out, i) => <li key={i}>{out}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        <aside className="side-info">
          <div className="info-card">
            <h3>Agente Responsable</h3>
            {prompt.agent_core ? (
              <Link to={`/agentes/${prompt.agent_core}`} className="agent-link">
                <div className="agent-icon">🤖</div>
                <div className="agent-name">{prompt.agent_core}</div>
              </Link>
            ) : (
              <p className="empty-msg">No se ha asignado un agente específico.</p>
            )}
          </div>

          <div className="info-card">
            <h3>Servicios Relacionados</h3>
            {prompt.related_services.length > 0 ? (
              <ul className="related-list">
                {prompt.related_services.map(s => (
                  <li key={s}><Link to={`/servicios/${s}`}>{s}</Link></li>
                ))}
              </ul>
            ) : (
              <p className="empty-msg">Sin servicios vinculados explícitamente.</p>
            )}
          </div>

          <div className="info-card">
            <h3>Source of Truth</h3>
            {prompt.source_of_truth.length > 0 ? (
              <ul className="source-list">
                {prompt.source_of_truth.map(path => {
                  const manual = manuals.find(m => m.path === path);
                  const fileName = path.split('/').pop();
                  return (
                    <li key={path}>
                      {manual ? (
                        <Link to={`/manuales/${manual.id}`}>{manual.name}</Link>
                      ) : (
                        <span>{fileName}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="empty-msg">No hay manuales de referencia.</p>
            )}
          </div>

          <div className="info-card">
            <h3>Metadata</h3>
            <div className="meta-list">
              <div className="meta-item"><span>Etapa:</span> {prompt.stage}</div>
              {prompt.tags.length > 0 && (
                <div className="meta-item">
                  <span>Tags:</span>
                  <div className="tag-cloud">
                    {prompt.tags.map(t => <span key={t} className="mini-tag">{t}</span>)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PromptDetail;
