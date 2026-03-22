import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getPrompts } from '../../services/dataService';
import type { Prompt } from '../../services/types';
import './PromptList.css';

const PromptList: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    getPrompts()
      .then((data) => {
        setPrompts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('No se pudieron cargar los prompts operativos.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return <div className="state-container"><div className="loading-spinner"></div><p>Cargando biblioteca de prompts...</p></div>;
  if (error) return <div className="state-container error"><h2>Error</h2><p>{error}</p><button onClick={loadData} className="retry-button">Reintentar</button></div>;

  return (
    <div className="prompt-list-page">
      <header className="page-header">
        <h1>Biblioteca de Prompts</h1>
        <p>Herramientas operativas para la ejecución de tareas específicas.</p>
      </header>

      <div className="card-grid">
        {prompts.map((prompt) => (
          <Link key={prompt.id} to={`/prompts/${prompt.id}`} className="resource-card">
            <div className="card-badge">{prompt.id}</div>
            <div className="card-discipline">{prompt.discipline}</div>
            <h3>{prompt.name}</h3>
            <p>{prompt.objective.substring(0, 100)}...</p>
            <div className="card-meta">
              <span>Etapa: {prompt.stage}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PromptList;
