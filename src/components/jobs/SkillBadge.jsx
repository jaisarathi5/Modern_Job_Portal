import React from 'react';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';

export default function SkillBadge({ skill, status = 'neutral', onAction, actionLabel }) {
  let bg = 'var(--tone-neutral-bg)';
  let color = 'var(--tone-neutral)';
  let border = '1px solid var(--tone-neutral-border)';
  let Icon = null;

  if (status === 'matched') {
    bg = 'var(--tone-success-bg)';
    color = 'var(--tone-success)';
    border = '1px solid var(--tone-success-border)';
    Icon = FiCheck;
  } else if (status === 'missing') {
    bg = 'var(--tone-danger-bg)';
    color = 'var(--tone-danger)';
    border = '1px dashed var(--tone-danger-border)';
    Icon = FiAlertCircle;
  } else if (status === 'preferred') {
    bg = 'var(--tone-indigo-bg)';
    color = 'var(--tone-indigo)';
    border = '1px solid var(--tone-indigo-border)';
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.28rem 0.65rem',
        borderRadius: '999px',
        fontSize: '0.8rem',
        fontWeight: 600,
        backgroundColor: bg,
        color: color,
        border: border,
        transition: 'all 0.15s ease'
      }}
    >
      {Icon && <Icon style={{ fontSize: '0.85rem' }} />}
      <span>{skill}</span>
      {actionLabel && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAction && onAction(skill);
          }}
          style={{
            background: 'none',
            border: 'none',
            padding: '0 2px',
            color: 'inherit',
            fontSize: '0.75rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            textDecoration: 'underline'
          }}
          title={actionLabel}
        >
          {actionLabel}
        </button>
      )}
    </span>
  );
}
