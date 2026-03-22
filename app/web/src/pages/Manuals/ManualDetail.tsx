import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getManuals } from '../../services/dataService';
import type { Manual } from '../../services/types';
import './ManualDetail.css';

const ManualDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [manual, setManual] = useState<Manual | null>(null);
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
              Este documento constituye una fuente de verdad para la disciplina de {manual.discipline}.
              Define estándares, procesos y criterios de calidad para la ejecución operativa.
            </p>
          </section>

          <section className="detail-section highlight">
            <h2>Referencia del Archivo</h2>
            <div className="path-box">
              <code>{manual.path}</code>
            </div>
            <p className="path-note">
              Puedes localizar el contenido completo en la ruta indicada dentro del repositorio canónico.
            </p>
          </section>
        </div>

        <aside className="side-info">
          <div className="info-card">
            <h3>Herramientas Vinculadas</h3>
            <p className="info-desc">Prompts que utilizan este manual como Source of Truth:</p>
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
            <h3>Propósito</h3>
            <div className="meta-list">
              <div className="meta-item"><span>Tipo:</span> Normativo / Operativo</div>
              <div className="meta-item"><span>Alcance:</span> Interno</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ManualDetail;
