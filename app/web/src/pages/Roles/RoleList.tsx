import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getRoles } from '../../services/dataService';
import type { Role } from '../../services/types';
import './RoleList.css';

const RoleList: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    getRoles()
      .then((data) => {
        setRoles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('No se pudieron cargar los roles. Verifica que la base de datos JSON esté disponible.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <div className="state-container">
        <div className="loading-spinner"></div>
        <p>Cargando roles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-container error">
        <h2>⚠️ Error</h2>
        <p>{error}</p>
        <button onClick={loadData} className="retry-button">Reintentar</button>
      </div>
    );
  }

  if (roles.length === 0) {
    return (
      <div className="state-container empty">
        <p>No se encontraron roles registrados.</p>
        <button onClick={loadData} className="retry-button">Refrescar</button>
      </div>
    );
  }

  return (
    <div className="role-list-page">
      <header className="page-header">
        <h1>Explorar por Rol</h1>
        <p>Selecciona un rol para ver sus recursos y objetivos asociados.</p>
      </header>

      <div className="card-grid">
        {roles.map((role) => (
          <Link key={role.id} to={`/roles/${role.slug}`} className="role-card">
            <div className="role-card-header">
              <span className="discipline-tag">{role.discipline}</span>
            </div>
            <h3>{role.role}</h3>
            <p>{role.description}</p>
            <div className="role-card-footer">
              <span className="outcome-count">{role.outcome.length} resultados esperados</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoleList;
