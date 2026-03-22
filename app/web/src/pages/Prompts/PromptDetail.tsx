import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPrompts, getManuals, getAgents } from '../../services/dataService';
import type { Prompt, Manual, Agent } from '../../services/types';
import MarkdownContent from '../../components/MarkdownContent';
import './PromptDetail.css';

const PromptDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [promptContent, setPromptContent] = useState<string>('');
  const [contentLoading, setContentLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    Promise.all([getPrompts(), getManuals(), getAgents()])
      .then(([prompts, allManuals, allAgents]) => {
        const found = prompts.find((p) => p.id === id);
        if (!found) {
          setError(`El prompt '${id}' no existe en la biblioteca.`);
        } else {
          setPrompt(found);
          setManuals(allManuals);
          const relatedAgent = allAgents.find(a => a.name === found.agent_core);
          setAgent(relatedAgent || null);
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

  useEffect(() => {
    if (!prompt) return;

    const controller = new AbortController();
    setContentLoading(true);

    fetch(`/prompt-files/${prompt.id}.md`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`No se pudo cargar el markdown del prompt ${prompt.id}`);
        }
        return response.text();
      })
      .then((text) => {
        setPromptContent(text);
        setContentLoading(false);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error(err);
        setPromptContent('');
        setContentLoading(false);
      });

    return () => controller.abort();
  }, [prompt]);

  const copyToClipboard = (text: string, feedback: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(feedback);
      setTimeout(() => setCopyFeedback(null), 2000);
    });
  };

  const buildOperativeContext = () => {
    if (!prompt) return '';
    let context = `# Prompt Operativo: ${prompt.name}\n`;
    context += `ID: ${prompt.id}\n`;
    context += `Versión: ${prompt.version}\n`;
    context += `Disciplina: ${prompt.discipline} / ${prompt.category}\n`;
    context += `Agente: ${prompt.agent_core}\n`;
    context += `Etapa: ${prompt.stage}\n`;
    context += `Input: ${prompt.input_type}\n`;
    context += `Output: ${prompt.deliverable_type}\n\n`;
    context += `## Objetivo\n${prompt.objective}\n\n`;
    context += `## Cuándo Usar\n${prompt.when_to_use}\n\n`;
    context += `## Input Requerido\n${prompt.input_required.join('\n')}\n\n`;
    context += `## Output Esperado\n${prompt.expected_output.join('\n')}\n`;
    if (prompt.example_input) {
      context += `\n## Ejemplo de Input\n${prompt.example_input}\n`;
    }
    if (prompt.example_output.length > 0) {
      context += `\n## Ejemplo de Output\n${prompt.example_output.join('\n')}\n`;
    }
    if (prompt.related_services.length > 0) {
      context += `\n## Servicios Relacionados\n${prompt.related_services.join(', ')}\n`;
    }
    return context;
  };

  const buildPromptText = () => {
    if (!promptContent) return '';
    const promptStart = promptContent.indexOf('## Prompt\n');
    if (promptStart === -1) return promptContent;
    const content = promptContent.substring(promptStart + 10);
    const endMarkers = ['## Ejemplo', '## Notas', '## Calidad'];
    let endIdx = content.length;
    for (const marker of endMarkers) {
      const idx = content.indexOf(marker);
      if (idx !== -1 && idx < endIdx) endIdx = idx;
    }
    return content.substring(0, endIdx).trim();
  };

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
        <div className="header-main">
          <h1>{prompt.name}</h1>
          <Link to={`/brief/${prompt.id}`} className="primary-button action-button">
            Preparar Brief
          </Link>
        </div>
        <div className="discipline-path">{prompt.discipline} / {prompt.category}</div>
        <div className="operative-actions">
          <button className="copy-button" onClick={() => copyToClipboard(buildOperativeContext(), 'ctx')}>
            {copyFeedback === 'ctx' ? '✓ Contexto copiado' : '📋 Copiar Contexto'}
          </button>
          {promptContent && (
            <button className="copy-button" onClick={() => copyToClipboard(buildPromptText(), 'prompt')}>
              {copyFeedback === 'prompt' ? '✓ Prompt copiado' : '📋 Copiar Prompt'}
            </button>
          )}
        </div>
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

          <section className="detail-section">
            <h2>Input / Output</h2>
            <div className="sub-grid">
              <div className="info-block">
                <h3>Input Necesario</h3>
                <p>{prompt.input_type}</p>
                <ul>
                  {prompt.input_required.map((req, i) => <li key={i}>{req}</li>)}
                </ul>
              </div>
              <div className="info-block">
                <h3>Output Esperado</h3>
                <p>{prompt.deliverable_type}</p>
                <ul>
                  {prompt.expected_output.map((out, i) => <li key={i}>{out}</li>)}
                </ul>
              </div>
            </div>
          </section>

          {prompt.example_input && (
            <section className="detail-section">
              <h2>Ejemplo</h2>
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

          <section className="detail-section highlight">
            <h2>Contenido Operativo</h2>
            {contentLoading ? (
              <div className="manual-inline-loading">
                <div className="loading-spinner"></div>
                <p>Cargando contenido del prompt...</p>
              </div>
            ) : promptContent ? (
              <MarkdownContent content={promptContent} />
            ) : (
              <>
                <div className="path-box">
                  <code>{prompt.path}</code>
                </div>
                <p className="path-note">
                  No se pudo renderizar el markdown del prompt. La ruta del archivo sigue disponible como referencia canónica.
                </p>
              </>
            )}
          </section>
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
            {agent && (
              <p className="agent-role">{agent.role}</p>
            )}
          </div>

          <div className="info-card">
            <h3>Manuales de Referencia</h3>
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
            <h3>Servicios Relacionados</h3>
            {prompt.related_services.length > 0 ? (
              <ul className="related-list">
                {prompt.related_services.map(s => (
                  <li key={s}><Link to={`/servicios/${s}`}>{s}</Link></li>
                ))}
              </ul>
            ) : (
              <p className="empty-msg">Sin servicios vinculados.</p>
            )}
          </div>

          <div className="info-card">
            <h3>Metadata</h3>
            <div className="meta-list">
              <div className="meta-item"><span>Etapa:</span> {prompt.stage}</div>
              <div className="meta-item"><span>Categoría:</span> {prompt.category}</div>
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