import React from 'react';
import { FiCheckCircle, FiClock, FiAlertTriangle, FiCompass, FiBookOpen } from 'react-icons/fi';

export default function AssessmentSkillGap({
  strongSkills = [],
  developingSkills = [],
  missingSkills = [],
  learningRoadmap = {}
}) {
  return (
    <div className="card" style={{ padding: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          backgroundColor: 'var(--accent-wine)',
          color: 'var(--on-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem'
        }}>
          <FiCompass />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.18rem', color: 'var(--primary-navy)' }}>
            Skill Gap Diagnostic
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Synthesized analysis of Job Requirements, Profile Background, and Assessment Evidence
          </span>
        </div>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.5rem 0 1.25rem' }}>
        {missingSkills.length === 0
          ? 'No critical skill gaps detected. Your profile background and test performance align well with the core requirements.'
          : `We identified ${strongSkills.length} strong technical areas, ${developingSkills.length} developing topics, and ${missingSkills.length} skill gap(s) to prioritize.`}
      </p>

      {/* 3 Column Matrix */}
      <div className="skill-gap-grid">
        {/* Strong Skills */}
        <div className="skill-gap-column strong">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.85rem' }}>
            <FiCheckCircle style={{ color: 'var(--success)' }} />
            <strong style={{ fontSize: '0.98rem', color: 'var(--success-dark)' }}>
              Strong Skills ({strongSkills.length})
            </strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {strongSkills.length > 0 ? (
              strongSkills.map(item => (
                <div key={item.skill} className="skill-tag-pill strong">
                  <span>✓ {item.skill}</span>
                  <span>{item.score}%</span>
                </div>
              ))
            ) : (
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>No strong skills verified</span>
            )}
          </div>
        </div>

        {/* Developing Skills */}
        <div className="skill-gap-column developing">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.85rem' }}>
            <FiClock style={{ color: 'var(--warning)' }} />
            <strong style={{ fontSize: '0.98rem', color: 'var(--warning)' }}>
              Developing ({developingSkills.length})
            </strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {developingSkills.length > 0 ? (
              developingSkills.map(item => (
                <div key={item.skill} className="skill-tag-pill developing">
                  <span>◐ {item.skill}</span>
                  <span>{item.score}%</span>
                </div>
              ))
            ) : (
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>None in developing range</span>
            )}
          </div>
        </div>

        {/* Skill Gaps */}
        <div className="skill-gap-column missing">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.85rem' }}>
            <FiAlertTriangle style={{ color: 'var(--danger)' }} />
            <strong style={{ fontSize: '0.98rem', color: 'var(--danger)' }}>
              Skill Gaps ({missingSkills.length})
            </strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {missingSkills.length > 0 ? (
              missingSkills.map(item => (
                <div key={item.skill} className="skill-tag-pill missing">
                  <span>⚠ {item.skill}</span>
                  <span>Needs focus</span>
                </div>
              ))
            ) : (
              <span style={{ fontSize: '0.82rem', color: 'var(--success)' }}>✓ Zero gaps detected</span>
            )}
          </div>
        </div>
      </div>

      {/* Learning Recommendations if any gaps exist */}
      {learningRoadmap?.recommendations && learningRoadmap.recommendations.length > 0 && (
        <div style={{ marginTop: '1.75rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
          <h4 style={{ fontSize: '1rem', color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>
            Curated Actionable Learning Recommendations
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {learningRoadmap.recommendations.map((rec, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-subtle)',
                  borderRadius: '8px',
                  padding: '0.85rem 1rem',
                  border: '1px solid var(--border-light)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--primary-navy)' }}>{rec.skill}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>⏱ Est. {rec.estimatedHours}</span>
                </div>
                <p style={{ margin: '0 0 0.35rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {rec.action}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--primary-blue)' }}>
                  <FiBookOpen />
                  <span>Free Resource: {rec.freeResource}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
