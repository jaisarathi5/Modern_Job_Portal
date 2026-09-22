import React, { createContext, useContext, useState, useCallback } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        maxWidth: '380px'
      }}>
        {toasts.map(toast => {
          let bg = '#0f172a';
          let border = '#10b981';
          let iconColor = '#34d399';
          let Icon = FiCheckCircle;

          if (toast.type === 'error') {
            border = '#ef4444';
            iconColor = '#f87171';
            Icon = FiAlertCircle;
          } else if (toast.type === 'info') {
            border = '#3b82f6';
            iconColor = '#60a5fa';
            Icon = FiInfo;
          }

          return (
            <div
              key={toast.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: bg,
                color: '#FFFFFF',
                padding: '0.85rem 1.1rem',
                borderRadius: '10px',
                borderLeft: `5px solid ${border}`,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                fontSize: '0.9rem',
                animation: 'slideIn 0.2s ease-out'
              }}
            >
              <Icon style={{ flexShrink: 0, fontSize: '1.2rem', color: iconColor }} />
              <span style={{ flex: 1 }}>{toast.message}</span>
              <button
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
