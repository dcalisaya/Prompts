import React from 'react';
import type { Recommendation } from '../../services/types';
import RecommendationCard from './RecommendationCard';
import './Recommendation.css';

interface RecommendationListProps {
  recommendations: Recommendation[];
  title?: string;
  layout?: 'grid' | 'scroll';
}

const RecommendationList: React.FC<RecommendationListProps> = ({ 
  recommendations, 
  title = 'Sugeridos para ti',
  layout = 'grid'
}) => {
  if (recommendations.length === 0) return null;

  return (
    <section className={`recommendation-list-container layout-${layout}`}>
      {title && <h3 className="rec-list-title">{title}</h3>}
      <div className="rec-items-wrapper">
        {recommendations.map((rec) => (
          <RecommendationCard 
            key={`${rec.item.type}-${rec.item.id}`} 
            recommendation={rec} 
            variant={layout === 'scroll' ? 'compact' : 'full'}
          />
        ))}
      </div>
    </section>
  );
};

export default RecommendationList;
