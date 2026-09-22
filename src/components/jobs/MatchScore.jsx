import React from 'react';

/**
 * Reusable visual indicator for job match score
 * Can render as 'badge', 'circle', or 'bar'
 */
export default function MatchScore({ percentage = 0, variant = 'badge', size = 'md' }) {
  // Determine color scheme based on score
  let strokeColor = '#64748b';
  let badgeClass = 'badge-match-low';
  let label = 'Low Match';

  if (percentage >= 75) {
    strokeColor = '#059669';
    badgeClass = 'badge-match-high';
    label = 'Strong Match';
  } else if (percentage >= 45) {
    strokeColor = '#d97706';
    badgeClass = 'badge-match-med';
    label = 'Moderate Match';
  }

  // Variant 1: Compact Badge (used on JobCard)
  if (variant === 'badge') {
    return (
      <span className={`badge ${badgeClass}`} title={`${percentage}% skills match`}>
        <span style={{
          display: 'inline-block',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: strokeColor
        }}></span>
        {percentage}% Match
      </span>
    );
  }

  // Variant 2: Progress Bar
  if (variant === 'bar') {
    return (
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Skill Match Alignment</span>
          <span style={{ fontWeight: 700, color: strokeColor }}>{percentage}% ({label})</span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#EFE4DC',
          borderRadius: '999px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: strokeColor,
            borderRadius: '999px',
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>
    );
  }

  // Variant 3: Circular Indicator (used on JobDetails and Dashboards)
  const radius = size === 'lg' ? 42 : 32;
  const stroke = size === 'lg' ? 7 : 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const svgDimension = radius * 2;

  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <svg
        height={svgDimension}
        width={svgDimension}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          stroke="#e2e8f0"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.6s ease' }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: size === 'lg' ? '1.35rem' : '1.05rem',
          color: 'var(--primary-wine)'
        }}>
          {percentage}%
        </span>
        {size === 'lg' && (
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Match
          </span>
        )}
      </div>
    </div>
  );
}
