import React from 'react';
import { FiCheckCircle, FiFlag, FiHelpCircle } from 'react-icons/fi';

export default function QuestionNavigator({
  questions = [],
  currentIndex = 0,
  answers = {},
  flaggedIds = new Set(),
  onSelectIndex,
  onSubmit
}) {
  const total = questions.length;
  const answeredCount = Object.keys(answers).filter(k => answers[k] !== undefined && answers[k] !== null).length;
  const flaggedCount = flaggedIds.size;
  const unansweredCount = total - answeredCount;

  return (
    <div className="navigator-card">
      <div className="navigator-header">
        <span>Question Palette</span>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          {answeredCount}/{total} Answered
        </span>
      </div>

      {/* Grid of question buttons */}
      <div className="nav-grid">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null;
          const isFlagged = flaggedIds.has(q.id);

          let stateClass = '';
          if (isCurrent) stateClass += ' current';
          if (isAnswered) stateClass += ' answered';
          if (isFlagged) stateClass += ' flagged';

          return (
            <button
              key={q.id}
              type="button"
              className={`nav-btn ${stateClass}`}
              onClick={() => onSelectIndex(idx)}
              title={`Question ${idx + 1}: ${isAnswered ? 'Answered' : 'Unanswered'}${isFlagged ? ' (Flagged for review)' : ''}`}
            >
              {idx + 1}
              {isAnswered && !isFlagged && <span style={{ fontSize: '0.65rem', marginLeft: '2px' }}>✓</span>}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="nav-legend">
        <div className="legend-item">
          <span className="legend-dot answered" />
          <span>Answered ({answeredCount})</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot unanswered" />
          <span>Unanswered ({unansweredCount})</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot flagged" />
          <span>Flagged ({flaggedCount})</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot current" />
          <span>Current</span>
        </div>
      </div>

      {/* Direct Submit Action Button */}
      <div style={{ marginTop: '1.25rem' }}>
        <button
          type="button"
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--success)', borderColor: 'var(--success)' }}
          onClick={onSubmit}
        >
          <FiCheckCircle /> Submit Assessment ({answeredCount}/{total})
        </button>
      </div>
    </div>
  );
}
