import React from 'react';
import { FiTarget, FiCheck, FiAlertCircle, FiInfo } from 'react-icons/fi';

export default function RoleReadiness({
  profileMatch = 0,
  assessmentScore = 0,
  roleReadiness = 0,
  formulaDescription,
  summary,
  strongSkills = [],
  missingSkills = []
}) {
  return (
    <div className="role-readiness-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          backgroundColor: 'var(--primary-blue)',
          color: 'var(--on-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem'
        }}>
          <FiTarget />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--primary-navy)' }}>
            Role Readiness Evaluation
          </h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Objective alignment benchmark combining profile prerequisites and empirical assessment
          </span>
        </div>
      </div>

      {/* Main Readiness Metric Display */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        background: 'var(--bg-card)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        marginTop: '1rem'
      }}>
        <div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
            Composite Role Readiness
          </span>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-navy)', lineHeight: 1.1 }}>
            {roleReadiness}%
          </div>
          <p style={{ margin: '0.4rem 0 0', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            {summary}
          </p>
        </div>

        {/* Breakdown sub-metrics */}
        <div style={{ display: 'flex', gap: '1.5rem', borderLeft: '2px solid var(--border-light)', paddingLeft: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Profile Match (40% wt)</span>
            <strong style={{ fontSize: '1.35rem', color: 'var(--primary-navy)' }}>{profileMatch}%</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Assessment (60% wt)</span>
            <strong style={{ fontSize: '1.35rem', color: 'var(--accent-indigo)' }}>{assessmentScore}%</strong>
          </div>
        </div>
      </div>

      {/* Formula Transparency Callout */}
      <div className="readiness-formula-callout">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
          <FiInfo style={{ color: 'var(--primary-blue)' }} />
          <strong>Transparent Calculation Methodology:</strong>
        </div>
        <div className="readiness-formula-badge">
          Role Readiness = Profile Match × 40% + Assessment Score × 60%
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          {formulaDescription || `Computed as (${profileMatch}% × 0.40) + (${assessmentScore}% × 0.60) = ${roleReadiness}%. This metric reflects alignment with configured role prerequisites, not a predictive hiring probability.`}
        </div>
      </div>

      {/* Strong Areas vs Areas to Strengthen */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
        gap: '1rem',
        marginTop: '1.25rem'
      }}>
        <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
          <strong style={{ fontSize: '0.88rem', color: 'var(--success-dark)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
            <FiCheck /> Strong Alignment Areas:
          </strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {strongSkills.length > 0 ? (
              strongSkills.slice(0, 5).map(s => (
                <span key={s.skill} className="badge badge-fresher" style={{ fontSize: '0.75rem' }}>
                  ✓ {s.skill}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>None highlighted</span>
            )}
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
          <strong style={{ fontSize: '0.88rem', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
            <FiAlertCircle /> Areas to Strengthen:
          </strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {missingSkills.length > 0 ? (
              missingSkills.slice(0, 5).map(s => (
                <span key={s.skill} className="badge badge-rose" style={{ fontSize: '0.75rem' }}>
                  ⚠ {s.skill}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.8rem', color: 'var(--success)' }}>✓ Core requirements satisfied</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
