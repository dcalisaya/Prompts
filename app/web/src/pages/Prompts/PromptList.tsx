import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPrompts } from '../../services/dataService';
import type { Prompt } from '../../services/types';
import './PromptList.css';

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

const PromptList: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');

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

  const disciplines = useMemo(() => {
    const set = new Set(prompts.map((p) => p.discipline).filter(Boolean));
    return Array.from(set).sort();
  }, [prompts]);

  const categories = useMemo(() => {
    const set = new Set(prompts.map((p) => p.category).filter(Boolean));
    return Array.from(set).sort();
  }, [prompts]);

  const stages = useMemo(() => {
    const set = new Set(prompts.map((p) => p.stage).filter(Boolean));
    return Array.from(set).sort();
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    const ns = normalizeText(searchTerm);
    return prompts.filter((p) => {
      const searchable = [
        p.id,
        p.name,
        p.objective || '',
        p.discipline,
        p.category,
        p.stage,
        p.deliverable_type || '',
        ...(p.tags || []),
        ...(p.related_services || []),
      ]
        .map((v) => normalizeText(v))
        .join(' ');

      const matchSearch = !ns || searchable.includes(ns);
      const matchDisc = selectedDiscipline === 'all' || p.discipline === selectedDiscipline;
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchStage = selectedStage === 'all' || p.stage === selectedStage;

      return matchSearch && matchDisc && matchCat && matchStage;
    });
  }, [prompts, searchTerm, selectedDiscipline, selectedCategory, selectedStage]);

  const hasActiveFilters =
    searchTerm || selectedDiscipline !== 'all' || selectedCategory !== 'all' || selectedStage !== 'all';

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDiscipline('all');
    setSelectedCategory('all');
    setSelectedStage('all');
  };

  const stageLabel = (s: string) => STAGE_LABELS[s] || s.replace(/-/g, ' ');

  if (loading)
    return (
      <div className="state-container">
        <div className="loading-spinner" />
        <p>Cargando biblioteca de prompts...</p>
      </div>
    );
  if (error)
    return (
      <div className="state-container error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={loadData} className="retry-button">Reintentar</button>
      </div>
    );

  return (
    <div className="prompt-list-page">
      <header className="page-header">
        <h1>Biblioteca de Prompts</h1>
        <p>
          {prompts.length} herramientas operativas para la ejecucion de tareas
          especificas.
        </p>
      </header>

      <section className="filter-bar">
        <div className="filter-group search">
          <label htmlFor="prompt-search">Buscar</label>
          <input
            id="prompt-search"
            type="text"
            placeholder="Nombre, ID o disciplina..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="prompt-discipline">Disciplina</label>
          <select
            id="prompt-discipline"
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
          <label htmlFor="prompt-category">Categoria</label>
          <select
            id="prompt-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todas</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="prompt-stage">Etapa</label>
          <select
            id="prompt-stage"
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
          >
            <option value="all">Todas</option>
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
        Mostrando {filteredPrompts.length} de {prompts.length} prompts
        {hasActiveFilters && ' (filtrados)'}
      </div>

      {filteredPrompts.length > 0 ? (
        <div className="card-grid">
          {filteredPrompts.map((prompt) => (
            <Link
              key={prompt.id}
              to={`/prompts/${prompt.id}`}
              className="resource-card"
            >
              <div className="card-badge">{prompt.id}</div>
              <div className="card-discipline">{prompt.discipline}</div>
              <h3>{prompt.name}</h3>
              <p>
                {prompt.objective
                  ? prompt.objective.substring(0, 100)
                  : ''}
                ...
              </p>
              <div className="card-meta">
                <span className="stage-tag">{stageLabel(prompt.stage)}</span>
                {prompt.deliverable_type && (
                  <span className="deliverable-tag">
                    {prompt.deliverable_type}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h2>Ningun prompt encontrado</h2>
          <p>
            Ajusta los filtros para encontrar lo que buscas.
          </p>
          <button onClick={resetFilters} className="primary-button">
            Ver todos los prompts
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptList;
