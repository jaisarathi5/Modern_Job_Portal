import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'var(--primary-blue)', bg = 'var(--bg-subtle)' }) {
  return (
    <div
      className="card"
      style={{
        padding: '1.4rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.2rem',
        borderLeft: `4px solid ${color}`
      }}
    >
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '12px',
          backgroundColor: bg,
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          flexShrink: 0
        }}
      >
        {Icon && <Icon />}
      </div>
      <div>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {title}
        </span>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.85rem',
          fontWeight: 800,
          color: 'var(--primary-navy)',
          lineHeight: 1.15,
          marginTop: '0.15rem'
        }}>
          {value}
        </div>
        {subtitle && (
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
