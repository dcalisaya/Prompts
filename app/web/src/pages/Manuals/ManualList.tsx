import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getManuals } from '../../services/dataService';
import type { Manual } from '../../services/types';
import './ManualList.css';

const normalizeText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const TYPE_LABELS: Record<string, string> = {
  'guia-maestra': 'Guia Maestra',
  'playbook': 'Playbook',
  'estandar': 'Estandar',
  'fundamento': 'Fundamento',
  'operativo': 'Operativo',
  'tecnico': 'Tecnico',
};

const ManualList: React.FC = () => {
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [hasPromptsOnly, setHasPromptsOnly] = useState(false);

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

  const disciplines = useMemo(() => {
    const set = new Set(
      manuals.map((m) => m.discipline).filter(Boolean),
    );
    return Array.from(set).sort();
  }, [manuals]);

  const types = useMemo(() => {
    const set = new Set(manuals.map((m) => m.type || 'manual').filter(Boolean));
    return Array.from(set).sort();
  }, [manuals]);

  const filteredManuals = useMemo(() => {
    const ns = normalizeText(searchTerm);
    return manuals.filter((m) => {
      const searchable = [
        m.id || '',
        m.name,
        m.discipline,
        m.type || '',
        m.category || '',
        m.scope_base || '',
        m.discipline_slug || '',
        ...(m.tags || []),
        ...(m.related_services || []),
        ...(m.related_agents || []),
        ...(m.related_prompts || []),
      ]
        .map((v) => normalizeText(v))
        .join(' ');

      const matchSearch = !ns || searchable.includes(ns);
      const matchDisc =
        selectedDiscipline === 'all' || m.discipline === selectedDiscipline;
      const matchType =
        selectedType === 'all' || (m.type || 'manual') === selectedType;
      const matchPrompts = !hasPromptsOnly || m.related_prompts.length > 0;

      return matchSearch && matchDisc && matchType && matchPrompts;
    });
  }, [manuals, searchTerm, selectedDiscipline, selectedType, hasPromptsOnly]);

  const hasActiveFilters =
    searchTerm ||
    selectedDiscipline !== 'all' ||
    selectedType !== 'all' ||
    hasPromptsOnly;

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDiscipline('all');
    setSelectedType('all');
    setHasPromptsOnly(false);
  };

  const typeLabel = (t: string) => TYPE_LABELS[t] || t.replace(/-/g, ' ');

  if (loading)
    return (
      <div className="state-container">
        <div className="loading-spinner" />
        <p>Cargando biblioteca de manuales...</p>
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
    <div className="manual-list-page">
      <header className="page-header">
        <h1>Biblioteca de Manuales</h1>
        <p>
          {manuals.length} documentos de referencia para el ecosistema operativo.
        </p>
      </header>

      <section className="filter-bar">
        <div className="filter-group search">
          <label htmlFor="manual-search">Buscar</label>
          <input
            id="manual-search"
            type="text"
            placeholder="Nombre, ID o disciplina..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="manual-discipline">Disciplina</label>
          <select
            id="manual-discipline"
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
          <label htmlFor="manual-type">Tipo</label>
          <select
            id="manual-type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">Todos</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {typeLabel(t)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group checkbox">
          <label className="switch-label">
            <input
              type="checkbox"
              checked={hasPromptsOnly}
              onChange={(e) => setHasPromptsOnly(e.target.checked)}
            />
            <span>Con prompts</span>
          </label>
        </div>

        {hasActiveFilters && (
          <button className="reset-button" onClick={resetFilters}>
            Limpiar
          </button>
        )}
      </section>

      <div className="results-info">
        Mostrando {filteredManuals.length} de {manuals.length} manuales
        {hasActiveFilters && ' (filtrados)'}
      </div>

      {filteredManuals.length > 0 ? (
        <div className="card-grid">
          {filteredManuals.map((manual) => (
            <Link
              key={manual.path}
              to={`/manuales/${manual.id}`}
              className="resource-card"
            >
              <div className="card-badge">
                {manual.type ? typeLabel(manual.type) : 'MANUAL'}
              </div>
              <div className="card-discipline">{manual.discipline}</div>
              <h3>{manual.name}</h3>
              <p>
                {manual.scope_base
                  ? manual.scope_base.substring(0, 120)
                  : `Guia de referencia para ${manual.discipline}.`}
              </p>
              <div className="card-meta">
                <span className="manual-relations">
                  {manual.related_prompts.length} prompts
                </span>
                <span className="manual-relations">
                  {manual.related_services.length} servicios
                </span>
                {manual.related_agents && manual.related_agents.length > 0 && (
                  <span className="manual-relations">
                    {manual.related_agents.length} agentes
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h2>Ningun manual encontrado</h2>
          <p>
            Ajusta los filtros para encontrar lo que buscas.
          </p>
          <button onClick={resetFilters} className="primary-button">
            Ver todos los manuales
          </button>
        </div>
      )}
    </div>
  );
};

export default ManualList;
