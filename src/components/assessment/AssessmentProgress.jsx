import React from 'react';
import AssessmentTimer from './AssessmentTimer';
import { FiLayers } from 'react-icons/fi';

export default function AssessmentProgress({
  jobTitle,
  company,
  currentCategory,
  currentIndex,
  totalQuestions,
  answeredCount,
  durationMinutes,
  onTimeout
}) {
  const percentComplete = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const categoryLabels = {
    technical: 'Technical Core',
    quantitative: 'Quantitative Aptitude',
    logical: 'Logical Reasoning',
    coding: 'Coding & Output',
    domain: 'Domain Spec'
  };

  return (
    <div className="assessment-topbar">
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--primary-navy)' }}>
            {jobTitle}
          </h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>• {company}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span className="badge badge-navy" style={{ fontSize: '0.72rem' }}>
            <FiLayers style={{ marginRight: '3px' }} />
            Category: {categoryLabels[currentCategory?.toLowerCase()] || currentCategory || 'Core'}
          </span>
        </div>
      </div>

      <div className="progress-track-wrapper">
        <div className="progress-meta-text">
          <span>Progress: Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{answeredCount} Answered ({percentComplete}%)</span>
        </div>
        <div className="progress-bar-shell">
          <div className="progress-bar-fill" style={{ width: `${percentComplete}%` }} />
        </div>
      </div>

      <AssessmentTimer durationMinutes={durationMinutes} onTimeout={onTimeout} />
    </div>
  );
}
