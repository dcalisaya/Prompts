import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../../services/dataService';
import type { Service } from '../../services/types';
import './ServiceList.css';

const normalizeText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hasPromptsOnly, setHasPromptsOnly] = useState(false);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    getServices()
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('No se pudo cargar el catálogo de servicios.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Derive filter options from data
  const areas = useMemo(() => {
    const set = new Set(services.map(s => s.owner_area).filter(Boolean));
    return Array.from(set).sort();
  }, [services]);

  const categories = useMemo(() => {
    const set = new Set(services.map(s => s.category).filter(Boolean));
    return Array.from(set).sort();
  }, [services]);

  // Filter Logic
  const filteredServices = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);

    return services.filter(service => {
      const searchableText = [
        service.service_name,
        service.service_code,
        service.owner_area || '',
        service.category || '',
        service.summary || '',
        service.description || '',
        service.for_who || '',
        service.scope_base_catalog || service.scope_base || '',
        service.not_included_catalog || service.not_included || '',
        service.value_cases || '',
        ...(service.inputs || []),
      ]
        .map((value) => normalizeText(value))
        .join(' ');

      const matchesSearch =
        !normalizedSearch || searchableText.includes(normalizedSearch);
      
      const matchesArea = selectedArea === 'all' || service.owner_area === selectedArea;
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesPrompts = !hasPromptsOnly || (service.related_prompts && service.related_prompts.length > 0);

      return matchesSearch && matchesArea && matchesCategory && matchesPrompts;
    });
  }, [services, searchTerm, selectedArea, selectedCategory, hasPromptsOnly]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedArea('all');
    setSelectedCategory('all');
    setHasPromptsOnly(false);
  };

  if (loading) return <div className="state-container"><div className="loading-spinner"></div><p>Cargando catálogo de servicios...</p></div>;
  if (error) return <div className="state-container error"><h2>Error</h2><p>{error}</p><button onClick={loadData} className="retry-button">Reintentar</button></div>;

  return (
    <div className="service-list-page">
      <header className="page-header">
        <h1>Catálogo de Servicios</h1>
        <p>Explora los servicios oficiales de Live Developer impulsados por IA.</p>
      </header>

      <section className="filter-bar">
        <div className="filter-group search">
          <label htmlFor="search">Buscar</label>
          <input 
            id="search"
            type="text" 
            placeholder="Nombre o código (ej: AV-001)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="area">Área Responsable</label>
          <select id="area" value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
            <option value="all">Todas las áreas</option>
            {areas.map(area => <option key={area} value={area}>{area}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="category">Categoría</label>
          <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="all">Todas las categorías</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div className="filter-group checkbox">
          <label className="switch-label">
            <input 
              type="checkbox" 
              checked={hasPromptsOnly}
              onChange={(e) => setHasPromptsOnly(e.target.checked)}
            />
            <span>Solo con Prompts IA</span>
          </label>
        </div>

        {(searchTerm || selectedArea !== 'all' || selectedCategory !== 'all' || hasPromptsOnly) && (
          <button className="reset-button" onClick={resetFilters}>Limpiar Filtros</button>
        )}
      </section>

      <div className="results-info">
        Mostrando {filteredServices.length} de {services.length} servicios
      </div>

      {filteredServices.length > 0 ? (
        <div className="card-grid">
          {filteredServices.map((service) => (
            <Link key={service.service_code} to={`/servicios/${service.service_code}`} className="resource-card">
              <div className="card-badge">{service.service_code}</div>
              <div className="card-discipline">{service.category}</div>
              <h3>{service.service_name}</h3>
              <p>{(service.summary || service.description)?.substring(0, 140)}...</p>
              <div className="card-meta">
                <span className="area-tag">{service.owner_area}</span>
                {service.related_prompts && service.related_prompts.length > 0 && (
                  <span className="prompt-indicator">🤖 IA Ready</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h2>No se encontraron servicios</h2>
          <p>Intenta ajustar los criterios de búsqueda o limpia los filtros para ver todo el catálogo.</p>
          <button onClick={resetFilters} className="primary-button">Ver todos los servicios</button>
        </div>
      )}
    </div>
  );
};

export default ServiceList;
