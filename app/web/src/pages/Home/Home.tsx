import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDisciplines, getPrompts, getAgents, getSearchIndex } from '../../services/dataService';
import { getDefaultRecommendations } from '../../services/recommendationService';
import type { Recommendation } from '../../services/types';
import RecommendationList from '../../components/Recommendation/RecommendationList';
import './Home.css';

const Home: React.FC = () => {
  const [stats, setStats] = useState({
    prompts: 0,
    agents: 0,
    disciplines: 0,
    loading: true,
    error: false
  });
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    Promise.all([
      getPrompts(),
      getAgents(),
      getDisciplines(),
      getSearchIndex()
    ]).then(([prompts, agents, disciplines, index]) => {
      setStats({
        prompts: prompts.length,
        agents: agents.length,
        disciplines: disciplines.length,
        loading: false,
        error: false
      });
      setRecommendations(getDefaultRecommendations(index));
    }).catch(err => {
      console.error("Error cargando métricas de Home:", err);
      setStats(prev => ({
        ...prev,
        loading: false,
        error: true
      }));
    });
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenido al Workspace Operativo</h1>
        <p>Selecciona una vía de entrada para comenzar a trabajar.</p>
      </header>

      <section className="entrance-grid">
        <Link to="/roles" className="entrance-card">
          <div className="icon">👤</div>
          <h3>Entrar por Rol</h3>
          <p>Explora recursos según tu función en el equipo.</p>
        </Link>

        <Link to="/disciplinas" className="entrance-card">
          <div className="icon">📂</div>
          <h3>Entrar por Disciplina</h3>
          <p>Encuentra activos agrupados por área técnica o comercial.</p>
        </Link>

        <Link to="/flujos" className="entrance-card">
          <div className="icon">⚡</div>
          <h3>Entrar por Flujo</h3>
          <p>Sigue procesos guiados para tareas específicas.</p>
        </Link>

        <Link to="/buscar" className="entrance-card">
          <div className="icon">🔍</div>
          <h3>Búsqueda Directa</h3>
          <p>Busca prompts, agentes o servicios por nombre o etiqueta.</p>
        </Link>

        <Link to="/sesiones" className="entrance-card highlight">
          <div className="icon">📁</div>
          <h3>Mis Sesiones</h3>
          <p>Continúa el trabajo que guardaste anteriormente.</p>
        </Link>
      </section>

      {recommendations.length > 0 && (
        <section className="home-recommendations">
          <RecommendationList 
            recommendations={recommendations} 
            title="Recursos recomendados para comenzar" 
          />
        </section>
      )}

      <section className="quick-stats">
        <h2>Biblioteca de Recursos</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value">
              {stats.loading ? '...' : stats.error ? '—' : stats.prompts}
            </span>
            <span className="stat-label">Prompts</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              {stats.loading ? '...' : stats.error ? '—' : stats.agents}
            </span>
            <span className="stat-label">Agentes</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">
              {stats.loading ? '...' : stats.error ? '—' : stats.disciplines}
            </span>
            <span className="stat-label">Disciplinas</span>
          </div>
        </div>
        {stats.error && <p className="stats-error">No se pudieron cargar las métricas en tiempo real.</p>}
      </section>
    </div>
  );
};

export default Home;
