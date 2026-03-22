import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPrompts, getAgents, getServices, getManuals } from '../../services/dataService';
import { createEmptyBrief, validateBrief } from '../../services/briefService';
import { prepareExecution, executeMock } from '../../services/executionService';
import type { Prompt, Brief, Agent, Service, Manual, Execution } from '../../services/types';
import BriefEditor from './BriefEditor';
import BriefSummary from './BriefSummary';
import Launcher from './components/Launcher';
import OutputView from './components/OutputView';
import './BriefPage.css';

const BriefPage: React.FC = () => {
  const { promptId } = useParams<{ promptId: string }>();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [execution, setExecution] = useState<Execution | null>(null);

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'edit' | 'summary' | 'launcher' | 'output'>('edit');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [allPrompts, allAgents, allServices, allManuals] = await Promise.all([
        getPrompts(),
        getAgents(),
        getServices(),
        getManuals()
      ]);

      const foundPrompt = allPrompts.find(p => p.id === promptId);
      if (foundPrompt) {
        setPrompt(foundPrompt);
        setBrief(createEmptyBrief(foundPrompt));
        setAgents(allAgents);
        setServices(allServices);
        setManuals(allManuals);
      } else {
        setError(`El prompt '${promptId}' no existe.`);
      }
    } catch (err) {
      setError('Error al cargar los datos del sistema.');
    } finally {
      setLoading(false);
    }
  }, [promptId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleUpdateBrief = (updatedBrief: Brief) => {
    setBrief(updatedBrief);
    setValidationErrors({});
  };

  const handleContinueToSummary = () => {
    if (brief) {
      const validation = validateBrief(brief);
      if (validation.isValid) {
        setStep('summary');
        window.scrollTo(0, 0);
      } else {
        setValidationErrors(validation.errors);
      }
    }
  };

  const handleContinueToLauncher = () => {
    if (brief && prompt) {
      const newExecution = prepareExecution(brief, prompt, agents, services, manuals);
      setExecution(newExecution);
      setStep('launcher');
      window.scrollTo(0, 0);
    }
  };

  const handleLaunch = async () => {
    if (execution) {
      setProcessing(true);
      try {
        const completedExecution = await executeMock(execution);
        setExecution(completedExecution);
        setStep('output');
        window.scrollTo(0, 0);
      } catch (err) {
        alert('Error en la ejecución del prompt.');
      } finally {
        setProcessing(false);
      }
    }
  };

  const handleBackToEdit = () => {
    setStep('edit');
    window.scrollTo(0, 0);
  };

  if (loading) return <div className="state-container"><div className="loading-spinner"></div><p>Cargando motor operativo...</p></div>;
  if (error || !prompt || !brief) return <div className="state-container error"><h2>Error</h2><p>{error || 'No se pudo inicializar el flujo'}</p><Link to="/prompts" className="retry-button">Volver a la Biblioteca</Link></div>;

  return (
    <div className="brief-page">
      <nav className="breadcrumb">
        <Link to="/prompts">Biblioteca de Prompts</Link> / 
        <Link to={`/prompts/${prompt.id}`}>{prompt.id}</Link> / 
        <span>
          {step === 'edit' && 'Preparar Brief'}
          {step === 'summary' && 'Resumen'}
          {step === 'launcher' && 'Lanzador'}
          {step === 'output' && 'Resultado'}
        </span>
      </nav>

      {step !== 'output' && (
        <header className="brief-header">
          <h1>
            {step === 'edit' && 'Preparar Brief'}
            {step === 'summary' && 'Resumen del Brief'}
            {step === 'launcher' && 'Lanzador de Prompt'}
          </h1>
          <p className="subtitle">
            {step === 'edit' && `Estás configurando el contexto para: ${prompt.name}`}
            {step === 'summary' && `Verifica los datos para el entregable: ${prompt.deliverable_type}`}
            {step === 'launcher' && `Consolidación de contexto para el agente: ${prompt.agent_core}`}
          </p>
        </header>
      )}

      {processing && (
        <div className="processing-overlay">
          <div className="loading-spinner"></div>
          <h3>Ejecutando Prompt...</h3>
          <p>El agente <strong>{prompt.agent_core}</strong> está procesando el entregable.</p>
        </div>
      )}

      <div className="brief-content">
        {step === 'edit' && (
          <>
            <BriefEditor 
              prompt={prompt} 
              brief={brief} 
              onUpdate={handleUpdateBrief} 
              errors={validationErrors}
            />
            <div className="brief-actions">
              <button className="primary-button" onClick={handleContinueToSummary}>
                Continuar al Resumen
              </button>
            </div>
          </>
        )}

        {step === 'summary' && (
          <>
            <BriefSummary brief={brief} prompt={prompt} />
            <div className="brief-actions">
              <button className="secondary-button" onClick={handleBackToEdit}>
                Editar Datos
              </button>
              <button className="primary-button" onClick={handleContinueToLauncher}>
                Preparar Ejecución
              </button>
            </div>
          </>
        )}

        {step === 'launcher' && execution && (
          <Launcher 
            execution={execution} 
            onLaunch={handleLaunch} 
          />
        )}

        {step === 'output' && execution && (
          <OutputView 
            execution={execution} 
            onRestart={handleBackToEdit} 
          />
        )}
      </div>
    </div>
  );
};

export default BriefPage;
