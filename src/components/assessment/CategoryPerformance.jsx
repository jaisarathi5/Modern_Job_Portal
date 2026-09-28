import React from 'react';
import { FiPieChart, FiCode, FiCpu, FiTerminal, FiLayers } from 'react-icons/fi';

export default function CategoryPerformance({ categoryScores = {} }) {
  const getCategoryIcon = (cat) => {
    switch (cat.toLowerCase()) {
      case 'technical':
        return <FiCode />;
      case 'quantitative':
        return <FiPieChart />;
      case 'logical':
        return <FiCpu />;
      case 'coding':
        return <FiTerminal />;
      default:
        return <FiLayers />;
    }
  };

  const getCategoryBarColor = (percentage) => {
    if (percentage >= 75) return 'var(--success)';
    if (percentage >= 50) return 'var(--primary-blue)';
    return 'var(--warning)';
  };

  const categories = Object.values(categoryScores);

  if (categories.length === 0) return null;

  return (
    <div className="category-perf-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          backgroundColor: 'var(--accent-indigo)',
          color: 'var(--on-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem'
        }}>
          <FiPieChart />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.18rem', color: 'var(--primary-navy)' }}>
            Category Performance
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Evaluation across configured assessment sections
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {categories.map(cat => (
          <div key={cat.category} className="category-bar-item">
            <div className="category-bar-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ color: 'var(--accent-indigo)' }}>{getCategoryIcon(cat.category)}</span>
                <strong>{cat.label}</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                  ({cat.correct}/{cat.total} correct)
                </span>
              </span>
              <strong style={{ fontSize: '1rem', color: 'var(--primary-navy)' }}>
                {cat.percentage}%
              </strong>
            </div>

            <div className="category-track">
              <div
                className="category-fill"
                style={{
                  width: `${cat.percentage}%`,
                  background: getCategoryBarColor(cat.percentage)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
