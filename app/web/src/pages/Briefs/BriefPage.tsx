import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getPrompts, getAgents, getServices, getManuals, getSearchIndex } from '../../services/dataService';
import { createEmptyBrief, validateBrief } from '../../services/briefService';
import { prepareExecution, executePrompt } from '../../services/executionService';
import { getSession, saveSession, createFromPrompt } from '../../services/sessionService';
import { getStatusConfig, getNextStatuses } from '../../services/statusService';
import { getRecommendationsByResource } from '../../services/recommendationService';
import { composeSuggestedContext } from '../../services/contextService';
import type { Prompt, Brief, Agent, Service, Manual, Execution, Session, SessionStatus, Recommendation, SuggestedContext } from '../../services/types';
import RecommendationList from '../../components/Recommendation/RecommendationList';
import ContextSuggestion from './components/ContextSuggestion';
import BriefEditor from './BriefEditor';
import BriefSummary from './BriefSummary';
import Launcher from './components/Launcher';
import OutputView from './components/OutputView';
import './BriefPage.css';

const BriefPage: React.FC = () => {
  const { promptId } = useParams<{ promptId: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionIdParam = queryParams.get('session');

  const [session, setSession] = useState<Session | null>(null);
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [execution, setExecution] = useState<Execution | null>(null);

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [executionError, setExecutionError] = useState<string | null>(null);
  const [step, setStep] = useState<'edit' | 'summary' | 'launcher' | 'output'>('edit');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [contextSuggestion, setContextSuggestion] = useState<SuggestedContext | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  
  const isInitialMount = useRef(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [allPrompts, allAgents, allServices, allManuals, searchIndex] = await Promise.all([
        getPrompts(),
        getAgents(),
        getServices(),
        getManuals(),
        getSearchIndex()
      ]);

      const foundPrompt = allPrompts.find(p => p.id === promptId);
      if (foundPrompt) {
        setPrompt(foundPrompt);
        setAgents(allAgents);
        setServices(allServices);
        setManuals(allManuals);

        // Recommendations
        const currentIndexEntry = searchIndex.find(e => e.id === promptId && e.type === 'prompt');
        if (currentIndexEntry) {
          setRecommendations(getRecommendationsByResource(currentIndexEntry, searchIndex));
        }

        // Session Logic
        let currentSession: Session | undefined;
        if (sessionIdParam) {
          currentSession = getSession(sessionIdParam);
        }

        if (currentSession && currentSession.originId === promptId) {
          setSession(currentSession);
          setBrief(currentSession.payload.brief || createEmptyBrief(foundPrompt));
          setExecution(currentSession.payload.execution || null);
          setStep(currentSession.lastStep as any || 'edit');
          setShowSuggestion(false);
        } else {
          const newSession = createFromPrompt(foundPrompt);
          setSession(newSession);
          setBrief(createEmptyBrief(foundPrompt));

          // Generate context suggestion for new sessions
          const suggestion = composeSuggestedContext(foundPrompt, allAgents, allServices, allManuals);
          setContextSuggestion(suggestion);
          setShowSuggestion(true);
        }
      } else {
        setError(`El prompt '${promptId}' no existe.`);
      }
    } catch (err) {
      setError('Error al cargar los datos del sistema.');
    } finally {
      setLoading(false);
    }
  }, [promptId, sessionIdParam]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Auto-save logic
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (session && brief) {
      // Auto-update status based on step
      let autoStatus = session.status;
      if (step === 'output' && execution) {
        autoStatus = 'ready_for_review';
      } else if (step !== 'edit' && autoStatus === 'draft') {
        autoStatus = 'in_progress';
      }

      const updatedSession: Session = {
        ...session,
        status: autoStatus,
        lastStep: step,
        payload: {
          ...session.payload,
          brief,
          execution: execution || undefined
        }
      };
      saveSession(updatedSession);
      
      // Update local state if autoStatus changed to keep UI in sync
      if (autoStatus !== session.status) {
        setSession(updatedSession);
      }
    }
  }, [brief, step, execution, session]);

  const handleUpdateBrief = (updatedBrief: Brief) => {
    setBrief(updatedBrief);
    setValidationErrors({});
    setExecutionError(null);
  };

  const handleApplySuggestion = () => {
    if (contextSuggestion && brief) {
      const updatedBrief: Brief = {
        ...brief,
        related_services: contextSuggestion.services.map(s => s.service_code),
        additionalContext: brief.additionalContext 
          ? `${brief.additionalContext}\n\n--- Sugerencias de Sistema ---\n${contextSuggestion.suggestedInstructions}`
          : contextSuggestion.suggestedInstructions
      };
      setBrief(updatedBrief);
      setShowSuggestion(false);
    }
  };

  const handleStatusChange = (newStatus: SessionStatus) => {
    if (session) {
      const updatedSession: Session = { ...session, status: newStatus };
      setSession(updatedSession);
      saveSession(updatedSession);
    }
  };

  const handleContinueToSummary = () => {
    if (brief) {
      const validation = validateBrief(brief);
      if (validation.isValid) {
        setStep('summary');
        setExecutionError(null);
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
      setExecutionError(null);
      setStep('launcher');
      window.scrollTo(0, 0);
    }
  };

  const handleLaunch = async () => {
    if (execution) {
      setProcessing(true);
      try {
        const completedExecution = await executePrompt(execution);
        setExecution(completedExecution);
        setExecutionError(null);
        setStep('output');
        window.scrollTo(0, 0);
      } catch (err: any) {
        setExecutionError(err.message || 'No se pudo completar la ejecución del prompt. Revisa el brief y vuelve a intentarlo.');
      } finally {
        setProcessing(false);
      }
    }
  };

  const handleBackToEdit = () => {
    setStep('edit');
    setExecutionError(null);
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

      <div className="session-header-row">
        <div className="session-indicator-group">
          <div className="session-indicator">
            <span className="dot"></span> 
            Sesión: <strong>{session?.id}</strong>
          </div>
          {session && (
            <Link to={`/sesiones/${session.id}`} className="trace-link-inline">Ver Trazabilidad</Link>
          )}
        </div>

        {session && (
          <div className="status-selector-wrapper">
            <label>Estado:</label>
            <select 
              value={session.status} 
              onChange={(e) => handleStatusChange(e.target.value as SessionStatus)}
              className="status-select"
              style={{ color: getStatusConfig(session.status).color }}
            >
              <option value={session.status}>{getStatusConfig(session.status).label} (Actual)</option>
              {getNextStatuses(session.status).map(s => (
                <option key={s} value={s}>{getStatusConfig(s).label}</option>
              ))}
            </select>
          </div>
        )}
      </div>

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
        {executionError && (
          <div className="flow-inline-error" role="alert">
            <strong>Ejecución no completada.</strong>
            <span>{executionError}</span>
          </div>
        )}

        {step === 'edit' && (
          <>
            {showSuggestion && contextSuggestion && (
              <ContextSuggestion 
                suggestion={contextSuggestion}
                onApply={handleApplySuggestion}
                onDismiss={() => setShowSuggestion(false)}
              />
            )}
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

        {recommendations.length > 0 && step !== 'output' && (
          <aside className="brief-recommendations">
            <RecommendationList 
              recommendations={recommendations} 
              title="Recursos que podrían servirte"
              layout="scroll"
            />
          </aside>
        )}
      </div>
    </div>
  );
};

export default BriefPage;
