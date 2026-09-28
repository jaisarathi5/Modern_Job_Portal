import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiFileText, FiShield, FiLock } from 'react-icons/fi';

/**
 * Renders one static legal document.
 * Content is passed in from data/legalContent.js so /privacy, /terms and
 * /security all share a single presentational page.
 */
export default function Legal({ doc }) {
  if (!doc) {
    return (
      <div className="container container-narrow page" style={{ textAlign: 'center' }}>
        <h2>Document Not Found</h2>
        <p>This policy page is not available.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container container-narrow page">
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <span className="badge badge-navy" style={{ marginBottom: '0.4rem', width: 'fit-content' }}>
          {doc.eyebrow}
        </span>
        <h1 style={{ marginBottom: '0.5rem' }}>{doc.title}</h1>
        <p style={{ marginBottom: '0.35rem' }}>{doc.intro}</p>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{doc.updated}</span>
      </div>

      <div className="card" style={{ padding: '1.75rem' }}>
        {doc.sections.map((section, index) => (
          <div key={section.heading} style={{ marginTop: index === 0 ? 0 : '1.4rem' }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>{section.heading}</h3>
            <p style={{ margin: 0 }}>{section.body}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
        <Link to="/" className="btn btn-outline btn-sm">
          <FiArrowLeft /> Back to Home
        </Link>
        <Link to="/privacy" className="btn btn-ghost btn-sm">
          <FiLock /> Privacy
        </Link>
        <Link to="/terms" className="btn btn-ghost btn-sm">
          <FiFileText /> Terms
        </Link>
        <Link to="/security" className="btn btn-ghost btn-sm">
          <FiShield /> Security
        </Link>
      </div>
    </div>
  );
}
