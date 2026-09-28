import React from 'react';
import MatchScore from './MatchScore';
import SkillBadge from './SkillBadge';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import { FiCheckCircle, FiAlertTriangle, FiPlus } from 'react-icons/fi';

export default function SkillMatch({ matchData, jobTitle }) {
  const { addSkill, role } = useAuth();
  const { addToast } = useToast();

  const {
    matchPercentage = 0,
    matchingSkills = [],
    missingSkills = [],
    preferredMatched = [],
    totalRequired = 0,
    matchedCount = 0
  } = matchData || {};

  const handleAddMissingSkill = (skill) => {
    addSkill(skill);
    addToast(`Added "${skill}" to your student skill profile!`, 'success');
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-light)',
      borderRadius: '16px',
      padding: '1.75rem',
      boxShadow: 'var(--shadow-sm)',
      marginBottom: '1.75rem'
    }}>
      {/* Header section with Circular Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        paddingBottom: '1.25rem',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-navy" style={{ fontSize: '0.72rem' }}>Smart Match System</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Rule-based Skills Engine</span>
          </div>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', margin: 0 }}>
            Your Match for this Role
          </h3>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
            You possess <strong>{matchedCount}</strong> of <strong>{totalRequired}</strong> core skills requested.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <MatchScore percentage={matchPercentage} size="lg" />
        </div>
      </div>

      {/* Skills Comparison Breakdown */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
        gap: '1.5rem',
        marginTop: '1.25rem'
      }}>
        {/* Matching Skills */}
        <div style={{
          background: 'var(--success-bg)',
          border: '1px solid var(--success-border)',
          borderRadius: '12px',
          padding: '1.2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem', color: 'var(--text-success)' }}>
            <FiCheckCircle style={{ fontSize: '1.1rem' }} />
            <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-success)' }}>
              Matching Skills ({matchingSkills.length})
            </h4>
          </div>
          {matchingSkills.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {matchingSkills.map(skill => (
                <SkillBadge key={skill} skill={skill} status="matched" />
              ))}
              {preferredMatched.length > 0 && preferredMatched.map(skill => (
                <SkillBadge key={skill} skill={`${skill} (Bonus)`} status="preferred" />
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-danger)', margin: 0 }}>
              None of your profile skills currently match this job's core requirements.
            </p>
          )}
        </div>

        {/* Missing Skills */}
        <div style={{
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '1.2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem', color: 'var(--text-warning)' }}>
            <FiAlertTriangle style={{ fontSize: '1.1rem' }} />
            <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-warning)' }}>
              Missing Skills ({missingSkills.length})
            </h4>
          </div>
          {missingSkills.length > 0 ? (
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '0.75rem' }}>
                {missingSkills.map(skill => (
                  <SkillBadge
                    key={skill}
                    skill={skill}
                    status="missing"
                    actionLabel={role === 'jobseeker' ? '+ Add' : undefined}
                    onAction={() => handleAddMissingSkill(skill)}
                  />
                ))}
              </div>
              {role === 'jobseeker' && (
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Tip: Click <strong>+ Add</strong> if you already learned this skill to update your match live!
                </span>
              )}
            </div>
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-success)', margin: 0, fontWeight: 600 }}>
              🎉 Incredible! You match 100% of the core skills for this position.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
