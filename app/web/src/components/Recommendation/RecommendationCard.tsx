import React from 'react';
import { Link } from 'react-router-dom';
import type { Recommendation } from '../../services/types';
import './Recommendation.css';

interface RecommendationCardProps {
  recommendation: Recommendation;
  variant?: 'compact' | 'full';
}

const TYPE_ICONS: Record<string, string> = {
  prompt: '⚡',
  agent: '🤖',
  service: '🛠️',
  manual: '📚'
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, variant = 'full' }) => {
  const { item, justification } = recommendation;

  return (
    <Link to={item.route} className={`recommendation-card-ui variant-${variant}`}>
      <div className="rec-header">
        <span className="rec-icon">{TYPE_ICONS[item.type] || '🔍'}</span>
        <span className="rec-justification">{justification}</span>
      </div>
      
      <div className="rec-content">
        <h4>{item.title}</h4>
        {variant === 'full' && <p className="rec-desc">{item.description.slice(0, 80)}...</p>}
      </div>

      <div className="rec-footer">
        <span className="rec-meta">{item.discipline}</span>
        {item.code && <span className="rec-code">{item.code}</span>}
      </div>
    </Link>
  );
};

export default RecommendationCard;
