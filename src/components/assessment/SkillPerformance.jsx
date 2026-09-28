import React from 'react';
import { FiCheck, FiSliders } from 'react-icons/fi';

export default function SkillPerformance({ skillPerformance = {} }) {
  const skills = Object.values(skillPerformance);

  if (skills.length === 0) return null;

  return (
    <div className="card" style={{ padding: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          backgroundColor: 'var(--primary-navy)',
          color: 'var(--on-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem'
        }}>
          <FiSliders />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.18rem', color: 'var(--primary-navy)' }}>
            Skill-Level Performance
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Granular competency ratings across evaluated topics
          </span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(210px, 100%), 1fr))',
        gap: '1rem'
      }}>
        {skills.map(s => {
          const isHigh = s.percentage >= 70;
          const isMed = s.percentage >= 40 && s.percentage < 70;

          return (
            <div
              key={s.skill}
              style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-light)',
                borderRadius: '10px',
                padding: '0.9rem 1rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <strong style={{ fontSize: '0.92rem', color: 'var(--primary-navy)' }}>
                  {s.skill}
                </strong>
                <span style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: isHigh ? 'var(--success)' : isMed ? 'var(--warning)' : 'var(--danger)'
                }}>
                  {s.percentage}%
                </span>
              </div>

              <div style={{ height: '6px', background: 'var(--border-light)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${s.percentage}%`,
                    background: isHigh ? 'var(--success)' : isMed ? 'var(--warning)' : 'var(--danger)',
                    borderRadius: '9999px'
                  }}
                />
              </div>

              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem', display: 'block' }}>
                {s.correct} of {s.total} questions answered correctly
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
