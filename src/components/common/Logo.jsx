import React from 'react';

/**
 * SkillBridge Brand Logo — "Bridge & Ascent" emblem (2026 redesign)
 * Navy arched bridge deck, indigo rising arrow, gold rule accent.
 * Matches the site's navy/indigo identity; use `mono` on coloured surfaces.
 *
 * @param {Object} props
 * @param {'full' | 'icon' | 'horizontal'} [props.variant='horizontal'] - Display mode
 * @param {number|string} [props.size=36] - Icon size in px
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.showSubtitle=false] - Show subtitle text
 * @param {boolean} [props.lightText=false] - Light wordmark for dark surfaces
 * @param {boolean} [props.mono=false] - Single-colour mark using currentColor
 */
export default function Logo({
  variant = 'horizontal',
  size = 36,
  className = '',
  showSubtitle = false,
  lightText = false,
  mono = false
}) {
  const NAVY = mono ? 'currentColor' : '#141a34';
  const INDIGO = mono ? 'currentColor' : '#4f46e5';
  const GOLD = mono ? 'currentColor' : '#F5B82E';
  const ACCENT = lightText ? '#a5b4fc' : 'var(--primary-blue)';

  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logo-icon-svg"
      style={{ display: 'block', flexShrink: 0 }}
      aria-hidden="true"
    >
      {/* Rising ascent curve */}
      <path
        d="M7 32 C 22 31, 32 27, 39 21 C 44 17, 48.5 14, 51.5 11.5"
        stroke={INDIGO}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Ascent arrowhead */}
      <path d="M57 6.5 L49 9.5 L53.5 15 Z" fill={INDIGO} />

      {/* Gold horizon rule across the bridge deck */}
      <rect x="4" y="38" width="56" height="3" rx="1.5" fill={GOLD} />

      {/* Bridge deck with twin arches */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 41 H60 V57 H4 Z
           M11 57 A9 9 0 0 1 29 57 Z
           M35 57 A9 9 0 0 1 53 57 Z"
        fill={NAVY}
      />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`brand-logo-wrapper ${className}`}>{icon}</div>;
  }

  if (variant === 'full') {
    return (
      <div className={`brand-logo-full ${className}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
        <div style={{ width: size, height: size }}>
          {icon}
        </div>
        <div className="brand-text-group" style={{ textAlign: 'center' }}>
          <span
            className="brand-title"
            style={{
              color: lightText ? '#FFFFFF' : 'var(--primary-navy)',
              fontSize: '1.4rem',
              fontWeight: 800,
              letterSpacing: '-0.4px',
              fontFamily: 'var(--font-heading, "Outfit", sans-serif)'
            }}
          >
            Skill<span style={{ color: ACCENT }}>Bridge</span>
          </span>
          {showSubtitle && (
            <span className="brand-subtitle" style={{ color: lightText ? '#94A3B8' : 'var(--text-muted)' }}>
              Engineering Job Portal
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal
  return (
    <div className={`brand-logo-container ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}>
      <div className="brand-icon-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <div className="brand-text-group">
        <span
          className="brand-title"
          style={{
            color: lightText ? '#FFFFFF' : 'var(--primary-navy)',
            fontSize: '1.3rem',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            fontFamily: 'var(--font-heading, "Outfit", sans-serif)',
            lineHeight: 1.1
          }}
        >
          Skill<span style={{ color: ACCENT }}>Bridge</span>
        </span>
        {showSubtitle && (
          <span
            className="brand-subtitle"
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              color: lightText ? '#94A3B8' : 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              display: 'block',
              marginTop: '1px'
            }}
          >
            Engineering Job Portal
          </span>
        )}
      </div>
    </div>
  );
}
