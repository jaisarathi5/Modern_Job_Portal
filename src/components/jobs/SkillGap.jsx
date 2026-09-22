import React from 'react';
import { generateSkillGapAnalysis } from '../../utils/skillGap';
import { FiBookOpen, FiClock, FiCompass, FiExternalLink } from 'react-icons/fi';

export default function SkillGap({ missingSkills = [] }) {
  const analysis = generateSkillGapAnalysis(missingSkills);

  if (missingSkills.length === 0) {
    return (
      <div style={{
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '16px',
        padding: '1.5rem',
        marginTop: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#166534' }}>
          <FiCompass style={{ fontSize: '1.3rem' }} />
          <h4 style={{ margin: 0, color: '#166534', fontSize: '1.1rem' }}>Skill Gap Analysis: Zero Gap</h4>
        </div>
        <p style={{ margin: '0.5rem 0 0', color: '#14532d', fontSize: '0.92rem' }}>
          {analysis.summary} You have the primary technical toolkit expected by the hiring team.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: '#f8fafc',
      border: '1px solid var(--border-light)',
      borderRadius: '16px',
      padding: '1.75rem',
      marginTop: '1.5rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          backgroundColor: 'var(--primary-blue)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem'
        }}>
          <FiCompass />
        </div>
        <div>
          <h4 style={{ margin: 0, color: 'var(--primary-navy)', fontSize: '1.15rem' }}>
            Skill Gap Diagnostic & Learning Roadmap
          </h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Student Guidance: Actionable steps to qualify for this opportunity
          </span>
        </div>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: '0.75rem 0 1.25rem' }}>
        {analysis.summary}
      </p>

      {/* Recommendations Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {analysis.recommendations.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-light)',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  background: 'var(--primary-blue)',
                  color: '#FFFFFF',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {idx + 1}
                </span>
                <strong style={{ color: 'var(--primary-navy)', fontSize: '0.98rem' }}>
                  {item.skill}
                </strong>
                <span className="badge badge-navy" style={{ fontSize: '0.72rem' }}>
                  {item.category}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <FiClock />
                <span>Estimated Time: <strong>{item.estimatedHours}</strong></span>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
              <strong>Recommended Action:</strong> {item.action}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              color: 'var(--primary-blue)',
              marginTop: '0.2rem'
            }}>
              <FiBookOpen />
              <span>Suggested Free Resource: <em>{item.freeResource}</em></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
