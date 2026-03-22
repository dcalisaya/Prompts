import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getManuals } from '../../services/dataService';
import type { Manual } from '../../services/types';
import './ManualList.css';

const ManualList: React.FC = () => {
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    getManuals()
      .then((data) => {
        setManuals(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('No se pudieron cargar los manuales de referencia.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return <div className="state-container"><div className="loading-spinner"></div><p>Cargando biblioteca de manuales...</p></div>;
  if (error) return <div className="state-container error"><h2>Error</h2><p>{error}</p><button onClick={loadData} className="retry-button">Reintentar</button></div>;

  return (
    <div className="manual-list-page">
      <header className="page-header">
        <h1>Biblioteca de Manuales</h1>
        <p>Documentación técnica y operativa que fundamenta el ecosistema.</p>
      </header>

      <div className="card-grid">
        {manuals.map((manual) => (
          <Link key={manual.path} to={`/manuales/${manual.id}`} className="resource-card">
            <div className="card-badge">MANUAL</div>
            <div className="card-discipline">{manual.discipline}</div>
            <h3>{manual.name}</h3>
            <p>{manual.scope_base || `Guía de referencia para ${manual.discipline}.`}</p>
            <div className="card-meta">
              <span>{manual.type || 'manual'}</span>
              <span>{manual.related_prompts.length} prompts</span>
              <span>{manual.related_services.length} servicios</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ManualList;
