import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getManuals } from '../../services/dataService';
import type { Manual } from '../../services/types';
import MarkdownContent from '../../components/MarkdownContent';
import './ManualDetail.css';

const ManualDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [manual, setManual] = useState<Manual | null>(null);
  const [manualContent, setManualContent] = useState<string>('');
  const [contentLoading, setContentLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    getManuals()
      .then((manuals) => {
        const found = manuals.find((m) => m.id === id);
        if (!found) {
          setError(`El manual '${id}' no existe en la biblioteca.`);
        } else {
          setManual(found);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Error al cargar el detalle del manual.');
        setLoading(false);
        console.error(err);
      });
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (!manual) return;

    const controller = new AbortController();
    setContentLoading(true);

    fetch(`/manual-files/${manual.id}.md`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`No se pudo cargar el markdown del manual ${manual.id}`);
        }
        return response.text();
      })
      .then((text) => {
        setManualContent(text);
        setContentLoading(false);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error(err);
        setManualContent('');
        setContentLoading(false);
      });

    return () => controller.abort();
  }, [manual]);

  if (loading) return <div className="state-container"><div className="loading-spinner"></div><p>Cargando información del manual...</p></div>;
  if (error || !manual) return <div className="state-container error"><h2>No encontrado</h2><p>{error || 'Manual no encontrado'}</p><Link to="/manuales" className="retry-button">Volver a la Biblioteca</Link></div>;

  return (
    <div className="resource-detail-page">
      <nav className="breadcrumb">
        <Link to="/manuales">Biblioteca de Manuales</Link> / <span>{manual.name}</span>
      </nav>

      <header className="detail-header">
        <div className="header-top">
          <span className="card-badge">MANUAL TÉCNICO</span>
        </div>
        <h1>{manual.name}</h1>
        <div className="discipline-path">{manual.discipline}</div>
      </header>

      <div className="detail-grid">
        <div className="main-info">
          <section className="detail-section">
            <h2>Acerca de este manual</h2>
            <p className="large-text">
              {manual.scope_base || `Este documento constituye una fuente de verdad para la disciplina de ${manual.discipline}. Define estándares, procesos y criterios de calidad para la ejecución operativa.`}
            </p>
          </section>

          <section className="detail-section highlight">
            <h2>Contenido del Manual</h2>
            {contentLoading ? (
              <div className="manual-inline-loading">
                <div className="loading-spinner"></div>
                <p>Cargando markdown del manual...</p>
              </div>
            ) : manualContent ? (
              <MarkdownContent content={manualContent} />
            ) : (
              <>
                <div className="path-box">
                  <code>{manual.path}</code>
                </div>
                <p className="path-note">
                  No se pudo renderizar el markdown del manual. La ruta del archivo sigue disponible como referencia canónica.
                </p>
              </>
            )}
          </section>
        </div>

        <aside className="side-info">
          <div className="info-card">
            <h3>Herramientas Vinculadas</h3>
            <p className="info-desc">Recursos relacionados con este manual dentro del sistema:</p>
            {manual.related_prompts.length > 0 ? (
              <ul className="related-resource-list">
                {manual.related_prompts.map(pid => (
                  <li key={pid}>
                    <Link to={`/prompts/${pid}`}>
                      <span className="res-id">{pid}</span>
                      <span className="res-name">Ver prompt</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-msg">Sin prompts vinculados directamente.</p>
            )}
          </div>

          <div className="info-card">
            <h3>Servicios y Agentes</h3>
            <div className="meta-list">
              <div className="meta-item"><span>Tipo:</span> {manual.type || 'manual'}</div>
              <div className="meta-item"><span>Versión:</span> {manual.version || '1.0.0'}</div>
              <div className="meta-item"><span>Servicios:</span> {manual.related_services.length || 0}</div>
              <div className="meta-item"><span>Agentes:</span> {manual.related_agents?.length || 0}</div>
            </div>
            {manual.related_services.length > 0 && (
              <>
                <p className="info-desc">Servicios relacionados</p>
                <div className="detail-tags">
                  {manual.related_services.map((serviceCode) => (
                    <Link key={serviceCode} to={`/servicios/${serviceCode}`} className="mini-tag res-tag-link">
                      {serviceCode}
                    </Link>
                  ))}
                </div>
              </>
            )}
            {manual.related_agents && manual.related_agents.length > 0 && (
              <>
                <p className="info-desc">Agentes relacionados</p>
                <div className="detail-tags">
                  {manual.related_agents.map((agentName) => (
                    <Link key={agentName} to={`/agentes/${agentName}`} className="mini-tag res-tag-link">
                      {agentName}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="info-card">
            <h3>Propósito</h3>
            <div className="meta-list">
              <div className="meta-item"><span>Tipo:</span> {manual.type || 'Normativo / Operativo'}</div>
              <div className="meta-item"><span>Alcance:</span> Interno</div>
              {manual.legacy_path && <div className="meta-item"><span>Ruta legacy:</span> Sí</div>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ManualDetail;
