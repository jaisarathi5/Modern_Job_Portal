import React, { useState, useEffect, useRef } from 'react';
import { FiClock, FiAlertCircle } from 'react-icons/fi';

export default function AssessmentTimer({ durationMinutes = 30, onTimeout, isActive = true }) {
  const [secondsRemaining, setSecondsRemaining] = useState(durationMinutes * 60);
  const timerRef = useRef(null);
  const onTimeoutRef = useRef(onTimeout);

  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  useEffect(() => {
    if (!isActive) return;

    timerRef.current = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (onTimeoutRef.current) {
            onTimeoutRef.current();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isWarning = secondsRemaining <= 300 && secondsRemaining > 60; // < 5 mins
  const isCritical = secondsRemaining <= 60; // < 1 min

  return (
    <div
      className={`assessment-timer-pill ${isCritical ? 'timer-critical' : isWarning ? 'timer-warning' : ''}`}
      title={isCritical ? 'Time almost up!' : isWarning ? 'Under 5 minutes remaining' : 'Time Remaining'}
    >
      {isCritical ? <FiAlertCircle /> : <FiClock />}
      <span>{formattedTime}</span>
    </div>
  );
}
