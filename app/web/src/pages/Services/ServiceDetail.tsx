import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServices } from '../../services/dataService';
import type { Service } from '../../services/types';
import './ServiceDetail.css';

const ServiceDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    getServices()
      .then((services) => {
        const found = services.find((s) => s.service_code === code);
        if (!found) {
          setError(`El servicio '${code}' no existe en el catálogo.`);
        } else {
          setService(found);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Error al cargar el detalle del servicio.');
        setLoading(false);
        console.error(err);
      });
  }, [code]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return <div className="state-container"><div className="loading-spinner"></div><p>Cargando ficha del servicio...</p></div>;
  if (error || !service) return <div className="state-container error"><h2>No encontrado</h2><p>{error || 'Servicio no encontrado'}</p><Link to="/servicios" className="retry-button">Volver al Catálogo</Link></div>;

  return (
    <div className="resource-detail-page">
      <nav className="breadcrumb">
        <Link to="/servicios">Catálogo de Servicios</Link> / <span>{service.service_code}</span>
      </nav>

      <header className="detail-header">
        <div className="header-top">
          <span className="card-badge">{service.service_code}</span>
        </div>
        <h1>{service.service_name}</h1>
        <div className="discipline-path">{service.category}</div>
      </header>

      <div className="detail-grid">
        <div className="main-info">
          <section className="detail-section">
            <h2>Resumen del Servicio</h2>
            <p className="large-text">{service.summary || service.description}</p>
          </section>

          {service.for_who && (
            <section className="detail-section">
              <h2>Para Quién Es</h2>
              <p>{service.for_who}</p>
            </section>
          )}

          {(service.scope_base_catalog || service.scope_base) && (
            <section className="detail-section">
              <h2>Qué Incluye</h2>
              <div className="scope-box">
                <strong>Alcance base</strong>
                <p>{service.scope_base_catalog || service.scope_base}</p>
              </div>
            </section>
          )}

          {service.value_cases && (
            <section className="detail-section">
              <h2>Valor / Casos de Uso</h2>
              <p>{service.value_cases}</p>
            </section>
          )}

          <section className="detail-section">
            <h2>Detalles de Entrega</h2>
            <div className="sub-grid">
              <div className="info-block">
                <h3>Insumos requeridos</h3>
                {service.inputs && service.inputs.length > 0 ? (
                  <ul className="check-list">
                    {service.inputs.map((input, i) => <li key={i}>{input}</li>)}
                  </ul>
                ) : (
                  <p className="empty-msg">No se han definido insumos específicos.</p>
                )}
              </div>
              <div className="info-block">
                <h3>Unidad de Medida</h3>
                <p>{service.unit || 'No definida'}</p>
              </div>
            </div>
          </section>

          {(service.not_included_catalog || service.not_included) && (
            <section className="detail-section warning">
              <h2>No Incluye</h2>
              <p>{service.not_included_catalog || service.not_included}</p>
            </section>
          )}
        </div>

        <aside className="side-info">
          <div className="info-card">
            <h3>Operación</h3>
            <p className="info-desc">Prompts para ejecutar este servicio:</p>
            {service.related_prompts && service.related_prompts.length > 0 ? (
              <ul className="related-resource-list">
                {service.related_prompts.map(pid => (
                  <li key={pid}>
                    <Link to={`/prompts/${pid}`}>
                      <span className="res-id">{pid}</span>
                      <span className="res-name">Ver prompt asociado</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-msg">Sin prompts operativos vinculados.</p>
            )}
          </div>

          <div className="info-card">
            <h3>Responsabilidad</h3>
            <div className="meta-list">
              <div className="meta-item"><span>Área:</span> {service.owner_area}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ServiceDetail;
