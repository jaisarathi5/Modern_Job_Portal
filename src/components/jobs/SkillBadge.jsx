import React from 'react';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';

export default function SkillBadge({ skill, status = 'neutral', onAction, actionLabel }) {
  let bg = '#F1F5F9';
  let color = '#334155';
  let border = '1px solid #E2E8F0';
  let Icon = null;

  if (status === 'matched') {
    bg = '#ECFDF5';
    color = '#047857';
    border = '1px solid #A7F3D0';
    Icon = FiCheck;
  } else if (status === 'missing') {
    bg = '#FEF2F2';
    color = '#DC2626';
    border = '1px dashed #FECACA';
    Icon = FiAlertCircle;
  } else if (status === 'preferred') {
    bg = '#EEF2FF';
    color = '#4F46E5';
    border = '1px solid #C7D2FE';
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
