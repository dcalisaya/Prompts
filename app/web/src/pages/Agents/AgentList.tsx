import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAgents } from '../../services/dataService';
import type { Agent } from '../../services/types';
import './AgentList.css';

const normalizeText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const STAGE_LABELS: Record<string, string> = {
  'discovery': 'Discovery',
  'strategy': 'Estrategia',
  'production': 'Produccion',
  'audit': 'Auditoria',
  'communications-planning': 'Planificacion',
  'campaign-planning': 'Campanas',
  'media-planning': 'Media Planning',
};

const AgentList: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');

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

  const disciplines = useMemo(() => {
    const set = new Set(agents.map((a) => a.discipline).filter(Boolean));
    return Array.from(set).sort();
  }, [agents]);

  const stages = useMemo(() => {
    const set = new Set(agents.map((a) => a.stage).filter(Boolean));
    return Array.from(set).sort();
  }, [agents]);

  const filteredAgents = useMemo(() => {
    const ns = normalizeText(searchTerm);
    return agents.filter((a) => {
      const searchable = [
        a.name,
        a.role,
        a.description || '',
        a.discipline,
        a.stage,
        a.deliverable_type || '',
        ...(a.skills || []),
        ...(a.tasks || []),
        ...(a.related_services || []),
      ]
        .map((v) => normalizeText(v))
        .join(' ');

      const matchSearch = !ns || searchable.includes(ns);
      const matchDisc =
        selectedDiscipline === 'all' || a.discipline === selectedDiscipline;
      const matchStage = selectedStage === 'all' || a.stage === selectedStage;

      return matchSearch && matchDisc && matchStage;
    });
  }, [agents, searchTerm, selectedDiscipline, selectedStage]);

  const hasActiveFilters =
    searchTerm || selectedDiscipline !== 'all' || selectedStage !== 'all';

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDiscipline('all');
    setSelectedStage('all');
  };

  const stageLabel = (s: string) => STAGE_LABELS[s] || s.replace(/-/g, ' ');

  if (loading)
    return (
      <div className="state-container">
        <div className="loading-spinner" />
        <p>Cargando biblioteca de agentes...</p>
      </div>
    );
  if (error)
    return (
      <div className="state-container error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={loadData} className="retry-button">
          Reintentar
        </button>
      </div>
    );

  return (
    <div className="agent-list-page">
      <header className="page-header">
        <h1>Biblioteca de Agentes</h1>
        <p>
          {agents.length} expertos senior especializados en diversas
          disciplinas del ecosistema.
        </p>
      </header>

      <section className="filter-bar">
        <div className="filter-group search">
          <label htmlFor="agent-search">Buscar</label>
          <input
            id="agent-search"
            type="text"
            placeholder="Nombre, rol o habilidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="agent-discipline">Disciplina</label>
          <select
            id="agent-discipline"
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
          >
            <option value="all">Todas</option>
            {disciplines.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="agent-stage">Foco</label>
          <select
            id="agent-stage"
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
          >
            <option value="all">Todos</option>
            {stages.map((s) => (
              <option key={s} value={s}>
                {stageLabel(s)}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button className="reset-button" onClick={resetFilters}>
            Limpiar
          </button>
        )}
      </section>

      <div className="results-info">
        Mostrando {filteredAgents.length} de {agents.length} agentes
        {hasActiveFilters && ' (filtrados)'}
      </div>

      {filteredAgents.length > 0 ? (
        <div className="card-grid">
          {filteredAgents.map((agent) => (
            <Link
              key={agent.name}
              to={`/agentes/${agent.name}`}
              className="resource-card agent-card"
            >
              <div className="agent-avatar">🤖</div>
              <div className="card-discipline">{agent.discipline}</div>
              <h3>{agent.role}</h3>
              <p>
                {agent.description
                  ? agent.description.substring(0, 120)
                  : ''}
                ...
              </p>
              <div className="card-meta">
                <span className="stage-tag">
                  {stageLabel(agent.stage)}
                </span>
                {agent.deliverable_type && (
                  <span className="deliverable-tag">
                    {agent.deliverable_type}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🤖</div>
          <h2>Ningun agente encontrado</h2>
          <p>
            Ajusta los filtros para encontrar lo que buscas.
          </p>
          <button onClick={resetFilters} className="primary-button">
            Ver todos los agentes
          </button>
        </div>
      )}
    </div>
  );
};

export default AgentList;
