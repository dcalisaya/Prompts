import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPrompts, getAgents, getServices, getManuals } from '../../services/dataService';
import { getFlowById } from '../../services/flowService';
import { createEmptyBrief, validateBrief } from '../../services/briefService';
import { prepareExecution, executeMock } from '../../services/executionService';
import type { Prompt, Brief, Agent, Service, Manual, Execution, Flow } from '../../services/types';
import BriefEditor from '../Briefs/BriefEditor';
import BriefSummary from '../Briefs/BriefSummary';
import Launcher from '../Briefs/components/Launcher';
import OutputView from '../Briefs/components/OutputView';
import './FlowDetail.css';

const truncateText = (value: string, maxLength = 320): string =>
  value.length > maxLength ? `${value.slice(0, maxLength).trim()}...` : value;

const buildFlowCarryContext = (executions: Execution[]): string => {
  if (executions.length === 0) {
    return '';
  }

  return executions
    .map((item, index) => {
      const excerpt = item.result ? truncateText(item.result.content, 220) : 'Sin resultado generado';
      return [
        `Paso ${index + 1}: ${item.prompt.name}`,
        `Entregable: ${item.prompt.deliverable_type}`,
        `Resultado previo: ${excerpt}`,
      ].join('\n');
    })
    .join('\n\n');
};

const buildSeedBrief = (prompt: Prompt, previousExecutions: Execution[]): Brief => {
  const brief = createEmptyBrief(prompt);
  const carryContext = buildFlowCarryContext(previousExecutions);

  if (!carryContext) {
    return brief;
  }

  return {
    ...brief,
    additionalContext: carryContext,
    notes: `Este paso continúa un flujo guiado con ${previousExecutions.length} entregable(s) previo(s). Usa ese contexto para mantener continuidad operativa.`,
  };
};

const FlowDetail: React.FC = () => {
  const { flowId } = useParams<{ flowId: string }>();
  const [flow, setFlow] = useState<Flow | null>(null);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  
  // Data for current prompt in flow
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [execution, setExecution] = useState<Execution | null>(null);
  const [allData, setAllData] = useState<{ agents: Agent[], services: Service[], manuals: Manual[] } | null>(null);

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [executionError, setExecutionError] = useState<string | null>(null);
  const [stepInternal, setStepInternal] = useState<'edit' | 'summary' | 'launcher' | 'output'>('edit');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [completedExecutions, setCompletedExecutions] = useState<Execution[]>([]);

  const loadFlowData = useCallback(async () => {
    setLoading(true);
    setExecutionError(null);
    try {
      const foundFlow = await getFlowById(flowId || '');
      if (!foundFlow) {
        setError(`El flujo '${flowId}' no existe.`);
        setLoading(false);
        return;
      }
      setFlow(foundFlow);

      const [allPrompts, allAgents, allServices, allManuals] = await Promise.all([
        getPrompts(),
        getAgents(),
        getServices(),
        getManuals()
      ]);

      setAllData({ agents: allAgents, services: allServices, manuals: allManuals });

      const currentStep = foundFlow.steps[currentStepIdx];
      const foundPrompt = allPrompts.find(p => p.id === currentStep.promptId);
      
      if (foundPrompt) {
        setPrompt(foundPrompt);
        setBrief(buildSeedBrief(foundPrompt, completedExecutions));
      } else {
        setError(`El prompt '${currentStep.promptId}' no existe.`);
      }
    } catch (err) {
      setError('Error al cargar los datos del flujo.');
    } finally {
      setLoading(false);
    }
  }, [flowId, currentStepIdx, completedExecutions]);

  useEffect(() => {
    loadFlowData();
  }, [loadFlowData]);

  const handleUpdateBrief = (updatedBrief: Brief) => {
    setBrief(updatedBrief);
    setValidationErrors({});
    setExecutionError(null);
  };

  const handleContinueToSummary = () => {
    if (brief) {
      const validation = validateBrief(brief);
      if (validation.isValid) {
        setStepInternal('summary');
        window.scrollTo(0, 0);
      } else {
        setValidationErrors(validation.errors);
      }
    }
  };

  const handleContinueToLauncher = () => {
    if (brief && prompt && allData) {
      const newExecution = prepareExecution(brief, prompt, allData.agents, allData.services, allData.manuals);
      setExecution(newExecution);
      setExecutionError(null);
      setStepInternal('launcher');
      window.scrollTo(0, 0);
    }
  };

  const handleLaunch = async () => {
    if (execution) {
      setProcessing(true);
      try {
        const completedExecution = await executeMock(execution);
        setExecution(completedExecution);
        setExecutionError(null);
        setStepInternal('output');
        window.scrollTo(0, 0);
      } catch {
        setExecutionError('No se pudo completar la ejecución de este paso. Revisa el contexto y vuelve a intentarlo.');
      } finally {
        setProcessing(false);
      }
    }
  };

  const handleNextStep = () => {
    if (!execution) {
      return;
    }

    const nextCompletedExecutions = [...completedExecutions, execution];
    setCompletedExecutions(nextCompletedExecutions);

    if (flow && currentStepIdx < flow.steps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
      setStepInternal('edit');
      setExecution(null);
    }
  };

  const completedFlowExecutions = execution && flow && currentStepIdx === flow.steps.length - 1
    ? [...completedExecutions, execution]
    : completedExecutions;

  if (loading) return <div className="state-container"><div className="loading-spinner"></div><p>Cargando flujo operativo...</p></div>;
  if (error || !flow || !prompt || !brief) return <div className="state-container error"><h2>Error</h2><p>{error || 'No se pudo cargar el flujo'}</p><Link to="/flujos" className="retry-button">Volver a Flujos</Link></div>;

  return (
    <div className="flow-detail-page">
      <nav className="breadcrumb">
        <Link to="/flujos">Flujos</Link> / <span>{flow.name}</span>
      </nav>

      <div className="flow-stepper">
        {flow.steps.map((s, idx) => (
          <div key={s.id} className={`step-indicator ${idx === currentStepIdx ? 'active' : idx < currentStepIdx ? 'completed' : ''}`}>
            <div className="step-number">{idx < currentStepIdx ? '✓' : idx + 1}</div>
            <div className="step-label">{s.label}</div>
          </div>
        ))}
      </div>

      <header className="flow-header">
        <div className="step-badge">Paso {currentStepIdx + 1} de {flow.steps.length}</div>
        <h2>{flow.steps[currentStepIdx].label}</h2>
        <p className="step-description">{flow.steps[currentStepIdx].description}</p>
        {completedExecutions.length > 0 && (
          <div className="flow-context-banner">
            <strong>Contexto acumulado:</strong> este paso hereda {completedExecutions.length} entregable(s) previo(s) del flujo.
          </div>
        )}
      </header>

      {processing && (
        <div className="processing-overlay">
          <div className="loading-spinner"></div>
          <h3>Procesando paso del flujo...</h3>
          <p>El agente <strong>{prompt.agent_core}</strong> está generando el entregable.</p>
        </div>
      )}

      <div className="flow-content-area">
        {executionError && (
          <div className="flow-inline-error" role="alert">
            <strong>Ejecución no completada.</strong>
            <span>{executionError}</span>
          </div>
        )}

        {stepInternal === 'edit' && (
          <>
            <BriefEditor 
              prompt={prompt} 
              brief={brief} 
              onUpdate={handleUpdateBrief} 
              errors={validationErrors}
            />
            <div className="brief-actions">
              <button className="primary-button" onClick={handleContinueToSummary}>
                Validar Paso
              </button>
            </div>
          </>
        )}

        {stepInternal === 'summary' && (
          <>
            <BriefSummary brief={brief} prompt={prompt} />
            <div className="brief-actions">
              <button className="secondary-button" onClick={() => setStepInternal('edit')}>
                Editar Datos
              </button>
              <button className="primary-button" onClick={handleContinueToLauncher}>
                Preparar Ejecución
              </button>
            </div>
          </>
        )}

        {stepInternal === 'launcher' && execution && (
          <Launcher 
            execution={execution} 
            onLaunch={handleLaunch} 
          />
        )}

        {stepInternal === 'output' && execution && (
          <div className="flow-output-container">
            <OutputView 
              execution={execution} 
              onRestart={() => setStepInternal('edit')} 
            />
            <div className="flow-next-action">
              {currentStepIdx < flow.steps.length - 1 ? (
                <button className="primary-button next-step-btn" onClick={handleNextStep}>
                  Continuar al Siguiente Paso →
                </button>
              ) : (
                <div className="flow-completion-msg">
                  <h3>Flujo Finalizado</h3>
                  <p>Has completado todos los pasos de este proceso operativo.</p>
                  <div className="flow-completion-summary">
                    {completedFlowExecutions.map((item, index) => (
                      <div key={item.id} className="flow-completion-step">
                        <span className="flow-completion-index">Paso {index + 1}</span>
                        <strong>{item.prompt.name}</strong>
                        <span>{item.prompt.deliverable_type}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/flujos" className="primary-button">Volver a la Galería</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlowDetail;
