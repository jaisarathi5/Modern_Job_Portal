import React from 'react';
import { FiFlag, FiChevronLeft, FiChevronRight, FiCheckCircle, FiX } from 'react-icons/fi';

export default function AssessmentQuestion({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  isFlagged,
  onSelectAnswer,
  onToggleFlag,
  onPrev,
  onNext,
  onSubmit,
  isFirst,
  isLast
}) {
  if (!question) return null;

  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="question-card">
      {/* Header: Question Meta & Badges */}
      <div className="question-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span className="badge badge-navy" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          <span className="question-topic-pill">
            {question.topic}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span className={`question-difficulty-badge ${question.difficulty}`}>
            {question.difficulty}
          </span>
        </div>
      </div>

      {/* Question Text */}
      <div className="question-body-text">
        {question.question}
      </div>

      {/* Code Snippet if present */}
      {question.codeSnippet && (
        <pre className="code-snippet-box">
          <code>{question.codeSnippet}</code>
        </pre>
      )}

      {/* Options List */}
      <div className="options-list">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          return (
            <div
              key={idx}
              className={`option-item ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectAnswer(question.id, idx)}
            >
              <div className="option-indicator">
                {optionLetters[idx] || idx + 1}
              </div>
              <div className="option-text">
                {option}
              </div>
            </div>
          );
        })}
      </div>

      {/* Clear Answer Option if selected */}
      {selectedAnswer !== undefined && selectedAnswer !== null && (
        <div style={{ marginTop: '0.75rem', textAlign: 'right' }}>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => onSelectAnswer(question.id, null)}
            style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
          >
            <FiX style={{ marginRight: '3px' }} /> Clear Selection
          </button>
        </div>
      )}

      {/* Question Actions Footer */}
      <div className="question-actions-bar">
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            type="button"
            className={`flag-review-btn ${isFlagged ? 'flagged' : ''}`}
            onClick={() => onToggleFlag(question.id)}
            title="Mark this question to review later before submission"
          >
            <FiFlag />
            <span>{isFlagged ? 'Marked for Review' : 'Mark for Review'}</span>
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            type="button"
            className="btn btn-outline"
            onClick={onPrev}
            disabled={isFirst}
            style={{ opacity: isFirst ? 0.4 : 1 }}
          >
            <FiChevronLeft /> Previous
          </button>

          {isLast ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSubmit}
              style={{ backgroundColor: 'var(--success)', borderColor: 'var(--success)' }}
            >
              <FiCheckCircle /> Submit Assessment
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={onNext}
            >
              Next <FiChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
