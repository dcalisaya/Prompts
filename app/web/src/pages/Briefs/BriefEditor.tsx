import React from 'react';
import type { Prompt, Brief } from '../../services/types';
import InputTemplate from './components/InputTemplate';

interface BriefEditorProps {
  prompt: Prompt;
  brief: Brief;
  onUpdate: (updatedBrief: Brief) => void;
  errors: Record<string, string>;
}

const BriefEditor: React.FC<BriefEditorProps> = ({ prompt, brief, onUpdate, errors }) => {
  const handleInputChange = (fieldName: string, value: string | string[]) => {
    const updatedInputs = brief.inputs.map(input => 
      input.field === fieldName ? { ...input, value } : input
    );
    onUpdate({ ...brief, inputs: updatedInputs });
  };

  const handleContextChange = (value: string) => {
    onUpdate({ ...brief, additionalContext: value });
  };

  const handleNotesChange = (value: string) => {
    onUpdate({ ...brief, notes: value });
  };

  return (
    <div className="brief-editor">
      <section className="form-section">
        <h3>Campos Requeridos</h3>
        <p className="section-help">Basado en el tipo de input: {prompt.input_type}</p>
        <div className="inputs-grid">
          {brief.inputs.map((input) => (
            <InputTemplate 
              key={input.field} 
              input={input} 
              inputTypeDesc={prompt.input_type}
              onChange={(val) => handleInputChange(input.field, val)}
              error={errors[input.field]}
            />
          ))}
        </div>
      </section>

      <section className="form-section">
        <h3>Contexto Adicional</h3>
        <p className="section-help">Información extra para el agente.</p>
        <div className="input-field">
          <textarea 
            placeholder="Agregue cualquier información extra que deba conocer el agente..."
            value={brief.additionalContext}
            onChange={(e) => handleContextChange(e.target.value)}
            rows={3}
          />
        </div>
      </section>

      <section className="form-section">
        <h3>Notas de Restricción</h3>
        <p className="section-help">Reglas o limitaciones específicas.</p>
        <div className="input-field">
          <textarea 
            placeholder="Ej: 'No usar tecnicismos', 'Máximo 300 palabras'..."
            value={brief.notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            rows={2}
          />
        </div>
      </section>
    </div>
  );
};

export default BriefEditor;
