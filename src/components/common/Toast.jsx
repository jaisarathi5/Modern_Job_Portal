import React, { createContext, useContext, useState, useCallback } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import '../../styles/toast.css';

const ToastContext = createContext();

const EXIT_DURATION = 280; // ms — must match .toast-item.is-leaving animation duration

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    // Mark as leaving first so the exit animation can play, then actually remove.
    setToasts(prev => prev.map(t => (t.id === id ? { ...t, leaving: true } : t)));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, EXIT_DURATION);
  }, []);

  const addToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, duration, leaving: false }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          maxWidth: '380px'
        }}
      >
        {toasts.map(toast => {
          let bg = '#141a34';
          let border = '#34d399';
          let iconColor = '#34d399';
          let Icon = FiCheckCircle;

          if (toast.type === 'error') {
            border = '#f87171';
            iconColor = '#f87171';
            Icon = FiAlertCircle;
          } else if (toast.type === 'info') {
            border = '#818cf8';
            iconColor = '#a5b4fc';
            Icon = FiInfo;
          }

          return (
            <div
              key={toast.id}
              className={`toast-item${toast.leaving ? ' is-leaving' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: bg,
                color: 'var(--on-accent)',
                padding: '0.85rem 1.1rem',
                borderRadius: '10px',
                borderLeft: `5px solid ${border}`,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                fontSize: '0.9rem'
              }}
            >
              <Icon style={{ flexShrink: 0, fontSize: '1.2rem', color: iconColor }} />
              {/* Toast background is always the same dark navy, so the text
                  stays white regardless of the active accent. */}
              <span style={{ flex: 1, color: '#ffffff' }}>{toast.message}</span>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex'
                }}
                aria-label="Close"
              >
                <FiX />
              </button>
              {!toast.leaving && (
                <span
                  className="toast-progress"
                  style={{
                    width: `calc(100% - ${5}px)`,
                    left: '5px',
                    backgroundColor: iconColor,
                    opacity: 0.5,
                    animationDuration: `${toast.duration}ms`
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
