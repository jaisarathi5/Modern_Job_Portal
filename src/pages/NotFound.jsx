import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertCircle, FiArrowLeft, FiHome } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center', maxWidth: '600px' }}>
      <div style={{
        width: '68px',
        height: '68px',
        borderRadius: '50%',
        backgroundColor: 'var(--muted-rose-light)',
        color: 'var(--primary-wine)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        margin: '0 auto 1.5rem'
      }}>
        <FiAlertCircle />
      </div>
      <h1 style={{ fontSize: '3rem', color: 'var(--primary-wine)', marginBottom: '0.5rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link to="/" className="btn btn-primary">
          <FiHome /> Back to Home
        </Link>
        <Link to="/jobs" className="btn btn-outline">
          Browse Jobs
        </Link>
      </div>
    </div>
  );
}
