import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getAgents } from '../../services/dataService';
import type { Agent } from '../../services/types';
import './AgentList.css';

const AgentList: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    getAgents()
      .then((data) => {
        setAgents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('No se pudieron cargar los agentes maestros.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return <div className="state-container"><div className="loading-spinner"></div><p>Cargando biblioteca de agentes...</p></div>;
  if (error) return <div className="state-container error"><h2>Error</h2><p>{error}</p><button onClick={loadData} className="retry-button">Reintentar</button></div>;

  return (
    <div className="agent-list-page">
      <header className="page-header">
        <h1>Biblioteca de Agentes</h1>
        <p>Expertos senior especializados en diversas disciplinas del ecosistema.</p>
      </header>

      <div className="card-grid">
        {agents.map((agent) => (
          <Link key={agent.name} to={`/agentes/${agent.name}`} className="resource-card agent-card">
            <div className="agent-avatar">🤖</div>
            <div className="card-discipline">{agent.discipline}</div>
            <h3>{agent.role}</h3>
            <p>{agent.description.substring(0, 120)}...</p>
            <div className="card-meta">
              <span>Foco: {agent.stage}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AgentList;
