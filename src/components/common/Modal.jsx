import React, { useEffect, useId, useRef } from 'react';
import { FiX } from 'react-icons/fi';

export default function Modal({ isOpen, onClose, title, children, maxWidth = '540px' }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  // `onClose` is usually inline, so the latest one is kept in a ref: the effect
  // below must only re-run when the dialog opens or closes, never on every
  // parent re-render (otherwise focus would jump back while the user types).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // ESC closes the dialog, Tab is trapped inside it so focus cannot wander into
  // the dimmed page behind, and focus returns to the trigger once it closes.
  useEffect(() => {
    if (!isOpen) return undefined;

    const previouslyFocused = document.activeElement;
    const getFocusable = () => (
      dialogRef.current
        ? Array.from(dialogRef.current.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          ))
        : []
    );

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Land focus on the first control (or the dialog itself) once it is mounted.
    const focusTarget = getFocusable()[0] || dialogRef.current;
    if (focusTarget) focusTarget.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [isOpen]);

  // Prevent background body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'var(--bg-dark)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        padding: '1rem',
        animation: 'fadeIn 0.18s ease-out both'
      }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : 'Dialog'}
        tabIndex={-1}
        style={{
          background: 'var(--bg-card)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: maxWidth,
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.2)',
          overflow: 'hidden',
          animation: 'modalPopIn 0.22s cubic-bezier(0.22, 1, 0.36, 1) both',
          border: '1px solid var(--border-light)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.2rem 1.5rem',
            borderBottom: '1px solid var(--border-light)',
            background: 'var(--bg-subtle)'
          }}
        >
          {title && <h3 id={titleId} style={{ margin: 0, fontSize: '1.2rem', color: 'var(--primary-navy)' }}>{title}</h3>}
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.25rem',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              padding: '4px',
              transition: 'all 0.15s ease'
            }}
            aria-label="Close modal"
          >
            <FiX />
          </button>
        </div>

        <div style={{ padding: '1.5rem', maxHeight: '80vh', overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
