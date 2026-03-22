import React from 'react';
import type { BriefInput } from '../../../services/types';

interface InputTemplateProps {
  input: BriefInput;
  inputTypeDesc: string;
  onChange: (value: string | string[]) => void;
  error?: string;
}

const InputTemplate: React.FC<InputTemplateProps> = ({ input, inputTypeDesc, onChange, error }) => {
  const fieldLower = input.field.toLowerCase();
  const descLower = inputTypeDesc.toLowerCase();

  const isUrl = fieldLower.includes('url') || fieldLower.includes('enlace') || fieldLower.includes('link') || descLower.includes('url');
  const isShortText = fieldLower.includes('nombre') || fieldLower.includes('título') || fieldLower.includes('idioma') || fieldLower.includes('presupuesto') || fieldLower.includes('mercado');
  const isList = fieldLower.includes('lista') || fieldLower.includes('requerimientos') || fieldLower.includes('pasos') || fieldLower.includes('items');

  const containerClass = `input-field ${error ? 'has-error' : ''}`;

  if (isUrl) {
    return (
      <div className={containerClass}>
        <label htmlFor={input.field}>{input.field}</label>
        <input 
          type="url" 
          id={input.field} 
          value={input.value as string} 
          placeholder="https://ejemplo.com/..."
          onChange={(e) => onChange(e.target.value)}
        />
        {error && <span className="error-text">{error}</span>}
      </div>
    );
  }

  if (isShortText) {
    return (
      <div className={containerClass}>
        <label htmlFor={input.field}>{input.field}</label>
        <input 
          type="text" 
          id={input.field} 
          value={input.value as string} 
          placeholder={`Ingrese ${input.field.toLowerCase()}...`}
          onChange={(e) => onChange(e.target.value)}
        />
        {error && <span className="error-text">{error}</span>}
      </div>
    );
  }

  if (isList) {
    return (
      <div className={containerClass}>
        <label htmlFor={input.field}>{input.field}</label>
        <textarea 
          id={input.field} 
          value={input.value as string} 
          placeholder="Ingrese un elemento por línea..."
          onChange={(e) => onChange(e.target.value)}
          rows={5}
        />
        <p className="input-hint">Presione Enter para cada nuevo elemento.</p>
        {error && <span className="error-text">{error}</span>}
      </div>
    );
  }

  // Default: Long Text (Textarea)
  return (
    <div className={containerClass}>
      <label htmlFor={input.field}>{input.field}</label>
      <textarea 
        id={input.field} 
        value={input.value as string} 
        placeholder={`Describa ${input.field.toLowerCase()}...`}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default InputTemplate;
