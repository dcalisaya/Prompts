import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getDisciplines } from '../../services/dataService';
import type { Discipline } from '../../services/types';
import './DisciplineList.css';

const DisciplineList: React.FC = () => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    getDisciplines()
      .then((data) => {
        setDisciplines(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('No se pudieron cargar las disciplinas organizadas.');
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
        <p>Organizando disciplinas...</p>
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

  return (
    <div className="discipline-list-page">
      <header className="page-header">
        <h1>Explorar por Disciplina</h1>
        <p>Encuentra recursos organizados por áreas de especialización.</p>
      </header>

      <div className="card-grid">
        {disciplines.map((discipline) => (
          <Link key={discipline.id} to={`/disciplinas/${discipline.id}`} className="discipline-card">
            <h3>{discipline.name}</h3>
            <p>{discipline.roles.length} roles en esta disciplina</p>
            <div className="role-preview">
              {discipline.roles.slice(0, 3).map(r => r.role).join(', ')}
              {discipline.roles.length > 3 ? '...' : ''}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DisciplineList;
