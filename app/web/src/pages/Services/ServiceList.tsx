import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../../services/dataService';
import type { Service } from '../../services/types';
import './ServiceList.css';

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div className="state-container"><div className="loading-spinner"></div><p>Cargando catálogo de servicios...</p></div>;
  if (error) return <div className="state-container error"><h2>Error</h2><p>{error}</p><button onClick={loadData} className="retry-button">Reintentar</button></div>;

  return (
    <div className="service-list-page">
      <header className="page-header">
        <h1>Catálogo de Servicios</h1>
        <p>Servicios oficiales de Live Developer para atención comercial y cotización.</p>
      </header>

      <div className="card-grid">
        {services.map((service) => (
          <Link key={service.service_code} to={`/servicios/${service.service_code}`} className="resource-card">
            <div className="card-badge">{service.service_code}</div>
            <div className="card-discipline">{service.category}</div>
            <h3>{service.service_name}</h3>
            <p>{service.description?.substring(0, 100)}...</p>
            <div className="card-meta">
              <span>Área: {service.owner_area}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
