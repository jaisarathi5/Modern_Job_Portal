import React from 'react';
import { FiCheckCircle, FiXCircle, FiHelpCircle, FiClock, FiAward } from 'react-icons/fi';

export default function AssessmentResult({
  assessmentScore = 0,
  totalQuestions = 0,
  correctCount = 0,
  incorrectCount = 0,
  unansweredCount = 0,
  completedAt,
  jobTitle,
  company
}) {
  const getScoreColor = (score) => {
    if (score >= 75) return 'var(--success)';
    if (score >= 50) return 'var(--accent-indigo)';
    return 'var(--warning)';
  };

  return (
    <div className="result-hero-card">
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
        <span className="badge badge-fresher">
          <FiCheckCircle style={{ marginRight: '3px' }} /> Assessment Completed
        </span>
      </div>

      <h1 style={{ fontSize: '1.85rem', color: 'var(--primary-navy)', margin: '0.2rem 0' }}>
        Assessment Performance Summary
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
        Evaluation for <strong>{jobTitle}</strong> at <strong>{company}</strong>
      </p>

      {/* Circular Score Badge */}
      <div className="score-circle-wrapper" style={{ borderColor: getScoreColor(assessmentScore) }}>
        <span className="score-circle-number" style={{ color: getScoreColor(assessmentScore) }}>
          {assessmentScore}%
        </span>
        <span className="score-circle-label">Assessment Score</span>
      </div>

      {/* Granular Breakdown Pill Row */}
      <div className="result-stats-row">
        <div className="stat-metric-pill">
          <FiHelpCircle style={{ color: 'var(--primary-blue)' }} />
          <span>Total: <strong>{totalQuestions}</strong> Questions</span>
        </div>
        <div className="stat-metric-pill">
          <FiCheckCircle style={{ color: 'var(--success)' }} />
          <span>Correct: <strong style={{ color: 'var(--success)' }}>{correctCount}</strong></span>
        </div>
        <div className="stat-metric-pill">
          <FiXCircle style={{ color: 'var(--danger)' }} />
          <span>Incorrect: <strong style={{ color: 'var(--danger)' }}>{incorrectCount}</strong></span>
        </div>
        <div className="stat-metric-pill">
          <FiHelpCircle style={{ color: 'var(--text-muted)' }} />
          <span>Unanswered: <strong>{unansweredCount}</strong></span>
        </div>
      </div>

      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        Assessment submitted on {new Date(completedAt || Date.now()).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  );
}
