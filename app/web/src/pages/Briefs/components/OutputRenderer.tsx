import React from 'react';
import type { ExecutionResult } from '../../../services/types';

interface OutputRendererProps {
  result: ExecutionResult;
}

const OutputRenderer: React.FC<OutputRendererProps> = ({ result }) => {
  const { type, content, structured_data } = result;
  const items = Array.isArray(structured_data) ? structured_data : [];

  switch (type) {
    case 'checklist':
      return (
        <div className="output-render checklist-render">
          <h4>{content}</h4>
          <ul className="checklist-items">
            {items.map((item: any, i: number) => (
              <li key={i} className={`check-item ${item.status}`}>
                <span className="check-box">{item.status === 'completed' ? '✓' : '○'}</span>
                <div>
                  <span className="check-label">{item.label}</span>
                  {item.note && <p>{item.note}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'plan':
      return (
        <div className="output-render plan-render">
          <h4>{content}</h4>
          <div className="plan-sections">
            {items.map((section: any, i: number) => (
              <div key={i} className="plan-section">
                <h5>{section.title}</h5>
                <ul>
                  {section.items.map((item: string, j: number) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );

    case 'scheme':
      return (
        <div className="output-render scheme-render">
          <h4>{content}</h4>
          <div className="scheme-blocks">
            {items.map((block: any) => (
              <React.Fragment key={block.id}>
                <div className="scheme-block">
                  <span className="block-label">{block.label}</span>
                </div>
                {block.next && <div className="scheme-arrow">→</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      );

    case 'summary':
      return (
        <div className="output-render summary-render">
          <h4>{content}</h4>
          <div className="summary-points">
            {items.map((item: any, i: number) => (
              <div key={i} className="plan-section">
                <h5>{item.title}</h5>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return (
        <div className="output-render text-render">
          <div className="text-content">
            {content.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      );
  }
};

export default OutputRenderer;
