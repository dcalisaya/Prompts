import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRoles, getPrompts, getAgents, getManuals } from '../../services/dataService';
import type { Role, Prompt, Agent, Manual } from '../../services/types';
import './RoleDetail.css';

const RoleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [role, setRole] = useState<Role | null>(null);
  const [relatedResources, setRelatedResources] = useState<{
    prompts: Prompt[];
    agents: Agent[];
    manuals: Manual[];
  }>({ prompts: [], agents: [], manuals: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    Promise.all([getRoles(), getPrompts(), getAgents(), getManuals()])
      .then(([roles, prompts, agents, manuals]) => {
        const found = roles.find((r) => r.slug === slug);
        if (!found) {
          setError(`El rol con identificador '${slug}' no existe en el sistema.`);
        } else {
          setRole(found);
          
          // Mapeo exacto basado en el array 'documents' del rol
          const docSet = new Set(found.documents);
          
          setRelatedResources({
            // Match exacto con ID de prompt
            prompts: prompts.filter(p => docSet.has(p.id)),
            // Match exacto con nombre de archivo del agente
            agents: agents.filter(a => docSet.has(a.path.split('/').pop() || '')),
            // Match exacto con path del manual
            manuals: manuals.filter(m => docSet.has(m.path.split('/').pop() || ''))
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Error al conectar con la base de datos de roles.');
        setLoading(false);
        console.error(err);
      });
  }, [slug]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return <div className="state-container"><div className="loading-spinner"></div><p>Cargando detalle del rol...</p></div>;
  if (error || !role) return <div className="state-container error"><h2>No encontrado</h2><p>{error || 'Rol no encontrado'}</p><Link to="/roles" className="retry-button">Volver a Roles</Link></div>;

  return (
    <div className="role-detail-page">
      <nav className="breadcrumb">
        <Link to="/roles">Roles</Link> / <span>{role.role}</span>
      </nav>

      <div className="detail-header">
        <span className="discipline-tag">{role.discipline}</span>
        <h1>{role.role}</h1>
        <p className="description">{role.description}</p>
      </div>

      <div className="detail-grid">
        <div className="main-info">
          <section className="detail-section">
            <h2>Outcomes Esperados</h2>
            <ul className="outcome-list">
              {role.outcome.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="side-info">
          <div className="info-card">
            <h3>Recursos del Rol</h3>
            <p className="info-desc">Activos vinculados a esta función:</p>
            
            {(relatedResources.prompts.length === 0 && 
              relatedResources.agents.length === 0 && 
              relatedResources.manuals.length === 0) ? (
              <p className="empty-msg">No se han vinculado recursos específicos aún.</p>
            ) : (
              <ul className="related-resource-list">
                {relatedResources.agents.map(a => (
                  <li key={a.name}>
                    <Link to={`/agentes/${a.name}`}>
                      <span className="res-id">AGENTE</span>
                      <span className="res-name">{a.role}</span>
                    </Link>
                  </li>
                ))}
                {relatedResources.prompts.map(p => (
                  <li key={p.id}>
                    <Link to={`/prompts/${p.id}`}>
                      <span className="res-id">{p.id}</span>
                      <span className="res-name">{p.name}</span>
                    </Link>
                  </li>
                ))}
                {relatedResources.manuals.map(m => (
                  <li key={m.path}>
                    <Link to={`/manuales/${m.id}`}>
                      <span className="res-id">MANUAL</span>
                      <span className="res-name">{m.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RoleDetail;
