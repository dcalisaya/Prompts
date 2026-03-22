import React from 'react';

interface PlaceholderProps {
  title: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p style={{ color: '#64748b', fontSize: '1.25rem', marginTop: '1rem' }}>
        Esta sección estará disponible próximamente en el Bloque 1B.
      </p>
      <div style={{ 
        marginTop: '2rem', 
        padding: '4rem', 
        border: '2px dashed #e2e8f0', 
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
      }}>
        <span style={{ fontSize: '3rem', opacity: 0.2 }}>🚧 En Construcción</span>
      </div>
    </div>
  );
};

export default Placeholder;
