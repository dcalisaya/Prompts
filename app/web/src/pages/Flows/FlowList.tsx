import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFlows } from '../../services/flowService';
import type { Flow } from '../../services/types';
import './FlowList.css';

const FlowList: React.FC = () => {
  const [flows, setFlows] = useState<Flow[]>([]);

  useEffect(() => {
    getFlows().then(setFlows);
  }, []);

  return (
    <div className="flow-list-page">
      <header className="page-header">
        <h1>Flujos Operativos Guiados</h1>
        <p>Selecciona una ruta de trabajo para ser guiado paso a paso.</p>
      </header>

      <div className="flow-grid">
        {flows.map(flow => (
          <Link key={flow.id} to={`/flujos/${flow.id}`} className="flow-card">
            <div className="flow-icon">{flow.icon}</div>
            <div className="flow-content">
              <h3>{flow.name}</h3>
              <p>{flow.description}</p>
              <div className="flow-steps-count">
                {flow.steps.length} pasos operativos
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FlowList;
