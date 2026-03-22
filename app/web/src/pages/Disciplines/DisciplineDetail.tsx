import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDisciplines, getPrompts, getAgents, getManuals, normalizeDiscipline, getDisciplineMatchKeys } from '../../services/dataService';
import type { Discipline, Prompt, Agent, Manual } from '../../services/types';
import './DisciplineDetail.css';

const DisciplineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [discipline, setDiscipline] = useState<Discipline | null>(null);
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
    Promise.all([getDisciplines(), getPrompts(), getAgents(), getManuals()])
      .then(([disciplines, prompts, agents, manuals]) => {
        const found = disciplines.find((d) => d.id === id);
        if (!found) {
          setError(`La disciplina '${id}' no se encuentra en el mapa de navegación.`);
        } else {
          setDiscipline(found);
          const allowedKeys = new Set(getDisciplineMatchKeys(found.name));
          
          setRelatedResources({
            prompts: prompts.filter(p => allowedKeys.has(normalizeDiscipline(p.discipline))),
            agents: agents.filter(a => allowedKeys.has(normalizeDiscipline(a.discipline))),
            manuals: manuals.filter(m => allowedKeys.has(normalizeDiscipline(m.discipline)))
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Error al procesar los datos de la disciplina.');
        setLoading(false);
        console.error(err);
      });
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) return <div className="state-container"><div className="loading-spinner"></div><p>Cargando área de especialización...</p></div>;
  if (error || !discipline) return <div className="state-container error"><h2>No encontrada</h2><p>{error}</p><Link to="/disciplinas" className="retry-button">Volver a Disciplinas</Link></div>;

  return (
    <div className="discipline-detail-page">
      <nav className="breadcrumb">
        <Link to="/disciplinas">Disciplinas</Link> / <span>{discipline.name}</span>
      </nav>

      <div className="detail-header">
        <h1>{discipline.name}</h1>
        <p className="description">Recursos y roles asociados a esta área técnica o comercial.</p>
      </div>

      <div className="discipline-grid">
        <div className="main-info">
          <section className="discipline-section">
            <h2>Roles en esta disciplina</h2>
            <div className="role-grid-mini">
              {discipline.roles.map((role) => (
                <Link key={role.id} to={`/roles/${role.slug}`} className="mini-card">
                  <h4>{role.role}</h4>
                  <p>{role.description.substring(0, 120)}...</p>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="side-info">
          <div className="info-card">
            <h3>Prompts de la Disciplina</h3>
            {relatedResources.prompts.length > 0 ? (
              <ul className="related-resource-list">
                {relatedResources.prompts.map(p => (
                  <li key={p.id}>
                    <Link to={`/prompts/${p.id}`}>
                      <span className="res-id">{p.id}</span>
                      <span className="res-name">{p.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-msg">No hay prompts vinculados.</p>
            )}
          </div>

          <div className="info-card">
            <h3>Agentes de la Disciplina</h3>
            {relatedResources.agents.length > 0 ? (
              <ul className="related-resource-list">
                {relatedResources.agents.map(a => (
                  <li key={a.name}>
                    <Link to={`/agentes/${a.name}`}>
                      <span className="res-name">{a.role}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-msg">No hay agentes vinculados.</p>
            )}
          </div>

          <div className="info-card">
            <h3>Manuales de la Disciplina</h3>
            {relatedResources.manuals.length > 0 ? (
              <ul className="related-resource-list">
                {relatedResources.manuals.map(m => (
                  <li key={m.path}>
                    <Link to={`/manuales/${m.id}`}>
                      <span className="res-name">{m.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-msg">No hay manuales vinculados.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DisciplineDetail;
