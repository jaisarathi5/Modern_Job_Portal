import React, { useState, useEffect } from 'react';
import { FiShield, FiMaximize, FiMinimize, FiAlertCircle } from 'react-icons/fi';
import { createSecurityEvent } from '../../utils/assessmentEngine';

export default function SecureAssessment({
  enabled = false,
  sebRequired = false,
  onSecurityEvent,
  children
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [interruptionWarning, setInterruptionWarning] = useState(null);

  useEffect(() => {
    if (!enabled) return;

    // Log initial assessment_started event
    const startEvent = createSecurityEvent('assessment_started', {
      userAgent: navigator.userAgent,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    });
    if (onSecurityEvent) onSecurityEvent(startEvent);

    // Track window blur / tab focus switch
    const handleBlur = () => {
      const interruptEvent = createSecurityEvent('session_interrupted', {
        reason: 'Window or tab lost focus'
      });
      if (onSecurityEvent) onSecurityEvent(interruptEvent);
      setInterruptionWarning('Assessment Environment Interrupted: Focus moved away from the assessment window.');
    };

    const handleFocus = () => {
      // Clear interruption banner after 6 seconds
      setTimeout(() => {
        setInterruptionWarning(null);
      }, 6000);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [enabled, onSecurityEvent]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div>
      {/* SEB Controlled Assessment Status Bar */}
      <div className="seb-security-bar">
        <div className="seb-security-tag">
          <FiShield />
          <span>Controlled Assessment Environment Active (SEB Mode)</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={toggleFullscreen}
            style={{ color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.25)', padding: '0.25rem 0.6rem', fontSize: '0.78rem' }}
          >
            {isFullscreen ? <><FiMinimize /> Exit Fullscreen</> : <><FiMaximize /> Enter Fullscreen</>}
          </button>
        </div>
      </div>

      {/* Neutral Session Interruption Warning */}
      {interruptionWarning && (
        <div className="seb-interruption-toast">
          <FiAlertCircle style={{ fontSize: '1.2rem', flexShrink: 0 }} />
          <span>{interruptionWarning} Please keep this assessment window focused.</span>
        </div>
      )}

      {children}
    </div>
  );
}
