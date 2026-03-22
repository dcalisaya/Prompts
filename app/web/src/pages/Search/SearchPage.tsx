import React, { useCallback, useEffect, useMemo, useState, useDeferredValue } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchIndex, normalizeDiscipline } from '../../services/dataService';
import { getRecommendationsByQuery } from '../../services/recommendationService';
import type { SearchIndexEntry, SearchResourceType, Recommendation } from '../../services/types';
import RecommendationList from '../../components/Recommendation/RecommendationList';
import './SearchPage.css';

type FilterValue = 'all' | string;

const TYPE_LABELS: Record<SearchResourceType, string> = {
  prompt: 'Prompt',
  agent: 'Agente',
  service: 'Servicio',
  manual: 'Manual',
};

const tokenize = (text: string): string[] =>
  normalizeDiscipline(text)
    .split(' ')
    .map((token) => token.trim())
    .filter(Boolean);

const buildExcerpt = (entry: SearchIndexEntry): string => {
  if (entry.description.length <= 180) return entry.description;
  return `${entry.description.slice(0, 177).trim()}...`;
};

const scoreEntry = (entry: SearchIndexEntry, query: string): number => {
  if (!query) return 1;

  const normalizedQuery = normalizeDiscipline(query);
  const tokens = tokenize(query);
  const haystack = normalizeDiscipline(entry.keywords.join(' '));
  const title = normalizeDiscipline(entry.title);
  const code = normalizeDiscipline(entry.code ?? '');

  let score = 0;

  if (title === normalizedQuery || code === normalizedQuery) score += 120;
  if (title.includes(normalizedQuery)) score += 50;
  if (code.includes(normalizedQuery)) score += 40;
  if (haystack.includes(normalizedQuery)) score += 20;

  tokens.forEach((token) => {
    if (title.includes(token)) score += 12;
    if (code.includes(token)) score += 10;
    if (haystack.includes(token)) score += 5;
  });

  return score;
};

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [entries, setEntries] = useState<SearchIndexEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const deferredQuery = useDeferredValue(query);

  const [typeFilter, setTypeFilter] = useState<FilterValue>(searchParams.get('type') ?? 'all');
  const [disciplineFilter, setDisciplineFilter] = useState<FilterValue>(searchParams.get('discipline') ?? 'all');
  const [stageFilter, setStageFilter] = useState<FilterValue>(searchParams.get('stage') ?? 'all');
  const [categoryFilter, setCategoryFilter] = useState<FilterValue>(searchParams.get('category') ?? 'all');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    getSearchIndex()
      .then((data) => {
        setEntries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('No se pudo construir el índice de búsqueda.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const nextParams = new URLSearchParams();
    if (query.trim()) nextParams.set('q', query.trim());
    if (typeFilter !== 'all') nextParams.set('type', typeFilter);
    if (disciplineFilter !== 'all') nextParams.set('discipline', disciplineFilter);
    if (stageFilter !== 'all') nextParams.set('stage', stageFilter);
    if (categoryFilter !== 'all') nextParams.set('category', categoryFilter);
    setSearchParams(nextParams, { replace: true });
  }, [query, typeFilter, disciplineFilter, stageFilter, categoryFilter, setSearchParams]);

  const filterOptions = useMemo(() => {
    const disciplines = new Set<string>();
    const stages = new Set<string>();
    const categories = new Set<string>();

    entries.forEach((entry) => {
      if (entry.discipline) disciplines.add(entry.discipline);
      if (entry.stage) stages.add(entry.stage);
      if (entry.category) categories.add(entry.category);
      if (entry.family) categories.add(entry.family);
    });

    return {
      disciplines: Array.from(disciplines).sort(),
      stages: Array.from(stages).sort(),
      categories: Array.from(categories).sort(),
    };
  }, [entries]);

  const filteredResults = useMemo(() => {
    const normalizedDisciplineFilter =
      disciplineFilter === 'all' ? 'all' : normalizeDiscipline(disciplineFilter);
    const normalizedCategoryFilter =
      categoryFilter === 'all' ? 'all' : normalizeDiscipline(categoryFilter);

    return entries
      .map((entry) => ({ entry, score: scoreEntry(entry, deferredQuery) }))
      .filter(({ entry, score }) => {
        if (deferredQuery.trim() && score <= 0) return false;
        if (typeFilter !== 'all' && entry.type !== typeFilter) return false;
        if (
          normalizedDisciplineFilter !== 'all' &&
          normalizeDiscipline(entry.discipline ?? '') !== normalizedDisciplineFilter
        ) {
          return false;
        }
        if (stageFilter !== 'all' && entry.stage !== stageFilter) return false;
        if (normalizedCategoryFilter !== 'all') {
          const bucket = normalizeDiscipline(entry.category ?? entry.family ?? '');
          if (bucket !== normalizedCategoryFilter) return false;
        }
        return true;
      })
      .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
      .map(({ entry }) => entry);
  }, [entries, deferredQuery, typeFilter, disciplineFilter, stageFilter, categoryFilter]);

  const resultCounts = useMemo(() => {
    return filteredResults.reduce<Record<SearchResourceType, number>>(
      (acc, entry) => {
        acc[entry.type] += 1;
        return acc;
      },
      { prompt: 0, agent: 0, service: 0, manual: 0 },
    );
  }, [filteredResults]);

  useEffect(() => {
    if (deferredQuery.trim()) {
      setRecommendations(getRecommendationsByQuery(deferredQuery, entries));
    } else {
      setRecommendations([]);
    }
  }, [deferredQuery, entries]);

  if (loading) {
    return (
      <div className="state-container">
        <div className="loading-spinner"></div>
        <p>Construyendo índice de búsqueda...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-container error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={loadData} className="retry-button">Reintentar</button>
      </div>
    );
  }

  return (
    <div className="search-page">
      <header className="page-header">
        <h1>Búsqueda Global</h1>
        <p>Encuentra prompts, agentes, servicios y manuales desde una sola vista.</p>
      </header>

      <section className="search-panel">
        <div className="search-input-wrap">
          <label htmlFor="global-search" className="search-label">Buscar por nombre, ID, disciplina o intención</label>
          <input
            id="global-search"
            className="search-input"
            type="search"
            placeholder="Ej: COM-001, arquitectura, CRM, guion, ESG"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="filter-grid">
          <label className="filter-field">
            <span>Tipo</span>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              <option value="all">Todos</option>
              <option value="prompt">Prompts</option>
              <option value="agent">Agentes</option>
              <option value="service">Servicios</option>
              <option value="manual">Manuales</option>
            </select>
          </label>

          <label className="filter-field">
            <span>Disciplina</span>
            <select value={disciplineFilter} onChange={(event) => setDisciplineFilter(event.target.value)}>
              <option value="all">Todas</option>
              {filterOptions.disciplines.map((discipline) => (
                <option key={discipline} value={discipline}>{discipline}</option>
              ))}
            </select>
          </label>

          <label className="filter-field">
            <span>Etapa</span>
            <select value={stageFilter} onChange={(event) => setStageFilter(event.target.value)}>
              <option value="all">Todas</option>
              {filterOptions.stages.map((stage) => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
          </label>

          <label className="filter-field">
            <span>Categoría / Familia</span>
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              <option value="all">Todas</option>
              {filterOptions.categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="search-summary">
        <div className="summary-chip">Resultados: {filteredResults.length}</div>
        <div className="summary-chip">Prompts: {resultCounts.prompt}</div>
        <div className="summary-chip">Agentes: {resultCounts.agent}</div>
        <div className="summary-chip">Servicios: {resultCounts.service}</div>
        <div className="summary-chip">Manuales: {resultCounts.manual}</div>
      </section>

      {filteredResults.length === 0 ? (
        <div className="no-results-container">
          <div className="state-container">
            <p>
              {query.trim()
                ? 'No encontramos recursos con esos criterios. Ajusta la consulta o prueba con filtros menos estrictos.'
                : 'Empieza escribiendo una búsqueda o usa los filtros para explorar el índice completo.'}
            </p>
          </div>
          
          {recommendations.length > 0 && (
            <div className="search-recommendations">
              <RecommendationList 
                recommendations={recommendations} 
                title="Sugerencias basadas en tu búsqueda"
              />
            </div>
          )}
        </div>
      ) : (
        <>
          {deferredQuery.trim() && recommendations.length > 0 && (
            <div className="search-top-recommendations">
              <RecommendationList 
                recommendations={recommendations.slice(0, 3)} 
                title="Sugerencias destacadas"
                layout="scroll"
              />
            </div>
          )}
          
          <section className="search-results">
            {filteredResults.map((entry) => (
              <Link key={`${entry.type}-${entry.id}`} to={entry.route} className="search-result-card">
                <div className="search-result-top">
                  <span className={`result-type result-type-${entry.type}`}>{TYPE_LABELS[entry.type]}</span>
                  {entry.code && <span className="result-code">{entry.code}</span>}
                </div>

                <h3>{entry.title}</h3>
                <p>{buildExcerpt(entry)}</p>

                <div className="result-meta">
                  {entry.discipline && <span>{entry.discipline}</span>}
                  {entry.category && <span>{entry.category}</span>}
                  {entry.family && <span>{entry.family}</span>}
                  {entry.stage && <span>{entry.stage}</span>}
                </div>
              </Link>
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default SearchPage;
