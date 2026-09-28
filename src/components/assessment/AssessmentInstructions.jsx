import React from 'react';
import { 
  FiClock, 
  FiHelpCircle, 
  FiShield, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiArrowRight, 
  FiAward, 
  FiSliders,
  FiBookOpen
} from 'react-icons/fi';

export default function AssessmentInstructions({
  job,
  durationMinutes = 30,
  totalQuestions = 15,
  categoriesConfig = {},
  difficultyConfig = {},
  isSecureMode = false,
  sebRequired = false,
  onStart
}) {
  const categoryLabels = {
    technical: 'Technical Core',
    quantitative: 'Quantitative Aptitude',
    logical: 'Logical Reasoning',
    coding: 'Coding & Analysis',
    domain: 'Domain Specialization'
  };

  return (
    <div className="assessment-intro-card">
      {/* Intro Header */}
      <div className="intro-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-navy">Company & Role Specific Assessment</span>
            {isSecureMode && (
              <span className="badge badge-indigo">
                <FiShield style={{ marginRight: '3px' }} /> Safe Exam Browser Required
              </span>
            )}
          </div>
          <h1 style={{ fontSize: '1.9rem', color: 'var(--primary-navy)', margin: '0 0 0.35rem' }}>
            {job?.title} Assessment
          </h1>
          <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Configured specifically for {job?.company}
          </span>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={onStart}
          style={{ padding: '0.85rem 2rem', fontSize: '1.05rem', fontWeight: 700 }}
        >
          {isSecureMode ? 'Continue to Secure Assessment' : 'Start Assessment'} <FiArrowRight />
        </button>
      </div>

      {/* Meta Specs Grid */}
      <div className="intro-meta-grid">
        <div className="intro-meta-item">
          <span className="intro-meta-label">Total Questions</span>
          <span className="intro-meta-val">
            <FiHelpCircle style={{ color: 'var(--primary-blue)' }} /> {totalQuestions} Questions
          </span>
        </div>

        <div className="intro-meta-item">
          <span className="intro-meta-label">Configured Duration</span>
          <span className="intro-meta-val">
            <FiClock style={{ color: 'var(--primary-blue)' }} /> {durationMinutes} Minutes
          </span>
        </div>

        <div className="intro-meta-item">
          <span className="intro-meta-label">Difficulty Distribution</span>
          <span className="intro-meta-val" style={{ fontSize: '0.95rem' }}>
            {difficultyConfig.easy}% Easy • {difficultyConfig.medium}% Med • {difficultyConfig.hard}% Hard
          </span>
        </div>

        <div className="intro-meta-item">
          <span className="intro-meta-label">Assessment Mode</span>
          <span className="intro-meta-val" style={{ fontSize: '0.95rem' }}>
            {isSecureMode ? 'Controlled / Secure SEB' : 'Standard Web Practice'}
          </span>
        </div>
      </div>

      {/* Categories Distribution */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-navy)', marginBottom: '0.4rem' }}>
          Configured Question Categories
        </h4>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem' }}>
          Questions are dynamically drawn from our question bank matching these category proportions:
        </p>

        <div className="category-distribution-chips">
          {Object.entries(categoriesConfig).map(([cat, pct]) => (
            <div key={cat} className="dist-chip">
              <span>{categoryLabels[cat] || cat}</span>
              <span className="dist-chip-pct">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Targeted Role Skills */}
      {job?.requiredSkills && job.requiredSkills.length > 0 && (
        <div style={{ marginBottom: '1.75rem' }}>
          <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-navy)', marginBottom: '0.4rem' }}>
            Target Competencies Evaluated
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {job.requiredSkills.map(skill => (
              <span key={skill} className="badge badge-wine" style={{ padding: '0.3rem 0.65rem', fontSize: '0.8rem' }}>
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Safe Exam Browser (SEB) Screen Callout if enabled */}
      {isSecureMode && (
        <div className="seb-callout-box">
          <div className="seb-icon-badge">
            <FiShield />
          </div>
          <div className="seb-details">
            <h4>Controlled Assessment Environment (Safe Exam Browser)</h4>
            <p>
              This employer has requested a controlled assessment environment to reduce common opportunities for
              unauthorized navigation or access to external resources during testing.
            </p>
            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.65rem', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <span>• Fullscreen presentation enabled</span>
              <span>• Tab / Window blur events logged</span>
              <span>• Transparent, privacy-respecting protocol</span>
            </div>
          </div>
        </div>
      )}

      {/* Instructions & Guidelines */}
      <div style={{
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        marginTop: '1.5rem'
      }}>
        <h4 style={{ margin: '0 0 0.85rem', fontSize: '1.05rem', color: 'var(--primary-navy)' }}>
          Candidate Guidelines & Rules
        </h4>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <li>
            <strong>Timed Assessment:</strong> The timer begins as soon as you click "{isSecureMode ? 'Continue to Secure Assessment' : 'Start Assessment'}".
            If the timer reaches zero, your responses will be submitted automatically.
          </li>
          <li>
            <strong>Flexible Navigation:</strong> You can navigate between questions at any time, change your answers, or use the <strong>Mark for Review (⚑)</strong> button.
          </li>
          <li>
            <strong>Role Readiness Diagnostics:</strong> Following completion, you will immediately receive an analytical summary showing your <strong>Assessment Score</strong>, <strong>Category Performance</strong>, <strong>Skill Gaps</strong>, and <strong>Role Readiness</strong> alignment.
          </li>
          <li>
            <strong>Continue Application:</strong> Your verified assessment results will be attached to your job application for {job?.company}.
          </li>
        </ul>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={onStart}
          style={{ padding: '0.85rem 2.25rem', fontSize: '1.05rem', fontWeight: 700 }}
        >
          {isSecureMode ? 'Continue to Secure Assessment' : 'Start Assessment'} <FiArrowRight />
        </button>
      </div>
    </div>
  );
}
