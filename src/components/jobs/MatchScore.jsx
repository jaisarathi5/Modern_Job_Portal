import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLock } from 'react-icons/fi';

/**
 * Reusable visual indicator for job match score
 * Can render as 'badge', 'circle', or 'bar'
 *
 * A match percentage is personal — it is derived from the signed-in candidate's
 * own skill list — so a signed-out visitor is never shown a number. For those
 * visitors this renders a compact "sign in" lock chip instead, which keeps the
 * layout intact and advertises what signing in unlocks. Because this component
 * is the single place every match percentage is drawn, gating here covers the
 * job cards, the job detail panel and the skill-match breakdown at once.
 */
export default function MatchScore({ percentage = 0, variant = 'badge', size = 'md' }) {
  const { currentUser } = useAuth();
  const isGuest = !currentUser;

  // Ring fills from 0 → percentage on mount/update, rather than snapping straight
  // to the final value, so the Smart Match reveal actually feels calculated.
  //
  // These hooks must stay ABOVE the guest early-return below: React requires the
  // same hooks in the same order on every render, and signing in while this
  // component is mounted would otherwise change the hook count mid-tree.
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    // Nothing to animate for a guest (the locked markup shows instead), and the
    // badge/bar variants do not use the animated ring.
    if (isGuest || variant !== 'circle') return undefined;

    const startTime = performance.now();
    const startValue = displayPercentage;
    const duration = 900;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = startValue + (percentage - startValue) * eased;
      setDisplayPercentage(next);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage, isGuest, variant]);

  // Locked state — the only thing a signed-out visitor ever sees.
  if (isGuest) {
    if (variant === 'circle') {
      // Match the circle footprint so the job card's bookmark row keeps its height.
      const diameter = size === 'lg' ? 84 : 64;
      return (
        <div
          style={{
            width: `${diameter}px`,
            height: `${diameter}px`,
            borderRadius: '50%',
            border: '2px dashed var(--border-medium)',
            background: 'var(--bg-subtle)',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1px',
            color: 'var(--text-muted)',
            flexShrink: 0
          }}
          title="Sign in to see your personal skill match"
        >
          <FiLock style={{ fontSize: size === 'lg' ? '1.1rem' : '0.9rem' }} />
          <span style={{ fontSize: size === 'lg' ? '0.6rem' : '0.55rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
            Sign in
          </span>
        </div>
      );
    }

    if (variant === 'bar') {
      return (
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Skill Match Alignment</span>
            <Link
              to="/login"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, color: 'var(--primary-blue)', textDecoration: 'none' }}
            >
              <FiLock /> Sign in to view
            </Link>
          </div>
          <div
            className="progress-track"
            style={{ height: '8px', background: 'var(--bg-subtle)' }}
          />
        </div>
      );
    }

    return (
      <Link
        to="/login"
        className="badge badge-neutral"
        title="Sign in to see your personal skill match"
        style={{ textDecoration: 'none' }}
      >
        <FiLock style={{ fontSize: '0.8rem' }} />
        Sign in for match
      </Link>
    );
  }

  // Determine color scheme based on score
  let strokeColor = 'var(--tone-neutral)';
  let badgeClass = 'badge-match-low';
  let label = 'Low Match';

  if (percentage >= 75) {
    strokeColor = 'var(--tone-success)';
    badgeClass = 'badge-match-high';
    label = 'Strong Match';
  } else if (percentage >= 45) {
    strokeColor = 'var(--tone-warning)';
    badgeClass = 'badge-match-med';
    label = 'Moderate Match';
  }

  // Variant 1: Compact Badge (used on JobCard)
  if (variant === 'badge') {
    return (
      <span className={`badge ${badgeClass}`} title={`${percentage}% skills match`}>
        <span
          className="badge-dot"
          style={{ backgroundColor: strokeColor }}
        ></span>
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
        <div
          className="progress-track"
          style={{ height: '8px' }}
        >
          <div
            className="progress-fill"
            style={{
              width: `${percentage}%`,
              backgroundColor: strokeColor
            }}
          />
        </div>
      </div>
    );
  }

  // Variant 3: Circular Indicator (used on JobDetails and Dashboards)
  const radius = size === 'lg' ? 42 : 32;
  const stroke = size === 'lg' ? 7 : 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const svgDimension = radius * 2;

  const strokeDashoffset = circumference - (displayPercentage / 100) * circumference;

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
          stroke="var(--border-medium)"
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
          style={{ strokeDashoffset }}
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
          {Math.round(displayPercentage)}%
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
