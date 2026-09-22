import React from 'react';
import { FiCheckCircle, FiClock, FiXCircle, FiAward, FiMessageSquare } from 'react-icons/fi';

const STAGES = ['Applied', 'Shortlisted', 'Interview', 'Selected'];

export default function ApplicationTimeline({ currentStatus = 'Applied', timeline = [] }) {
  const isRejected = currentStatus.toLowerCase() === 'rejected';

  const getStageIndex = (status) => {
    return STAGES.findIndex(s => s.toLowerCase() === status.toLowerCase());
  };

  const currentIndex = getStageIndex(currentStatus);

  return (
    <div style={{ padding: '0.5rem 0' }}>
      {/* Progress Line */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        marginBottom: '1.25rem'
      }}>
        {/* Background connector line */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '20px',
          right: '20px',
          height: '3px',
          backgroundColor: 'var(--border-light)',
          zIndex: 1,
          transform: 'translateY(-50%)'
        }} />

        {isRejected ? (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '0.6rem 1rem',
            borderRadius: '8px',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: '100%',
            zIndex: 2
          }}>
            <FiXCircle style={{ fontSize: '1.2rem', flexShrink: 0 }} />
            <span>This application was not selected to move forward at this time. Keep learning!</span>
          </div>
        ) : (
          STAGES.map((stage, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;

            let circleBg = 'var(--bg-subtle)';
            let circleColor = 'var(--text-muted)';
            let borderColor = 'var(--border-medium)';

            if (isCompleted) {
              circleBg = isCurrent ? 'var(--primary-blue)' : '#60a5fa';
              circleColor = '#FFFFFF';
              borderColor = circleBg;
            }

            return (
              <div
                key={stage}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  zIndex: 2,
                  backgroundColor: '#FFFFFF',
                  padding: '0 0.4rem'
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: circleBg,
                  color: circleColor,
                  border: `2px solid ${borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease'
                }}>
                  {isCompleted ? <FiCheckCircle /> : idx + 1}
                </div>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: isCurrent ? 700 : 500,
                  color: isCurrent ? 'var(--primary-navy)' : 'var(--text-secondary)'
                }}>
                  {stage}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Timeline logs */}
      {timeline && timeline.length > 0 && (
        <div style={{
          background: 'var(--bg-subtle)',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          fontSize: '0.82rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          border: '1px solid var(--border-light)'
        }}>
          {timeline.map((entry, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>
                <strong style={{ color: 'var(--primary-navy)' }}>{entry.status}:</strong> {entry.note}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{entry.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
