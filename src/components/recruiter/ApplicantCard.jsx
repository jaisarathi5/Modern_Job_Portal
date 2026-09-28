import React, { useState } from 'react';
import MatchScore from '../jobs/MatchScore';
import SkillBadge from '../jobs/SkillBadge';
import { useApplications } from '../../context/ApplicationContext';
import { useToast } from '../common/Toast';
import { FiUser, FiMail, FiCalendar, FiFileText, FiCheck, FiX, FiClock } from 'react-icons/fi';

const STATUS_OPTIONS = ['Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];

export default function ApplicantCard({ application, requiredSkills = [] }) {
  const { updateApplicationStatus } = useApplications();
  const { addToast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState(application.status || 'Applied');
  const [note, setNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    updateApplicationStatus(application.id, newStatus, note || `Status updated to ${newStatus} by recruiter`);
    addToast(`Applicant marked as "${newStatus}"`, 'success');
    setShowNoteInput(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Assessment Completed':
        return 'badge-blue';
      case 'Shortlisted':
        return 'badge-peach';
      case 'Interview':
        return 'badge-cream';
      case 'Selected':
        return 'badge-fresher';
      case 'Rejected':
        return 'badge-rose';
      default:
        return 'badge-wine';
    }
  };

  const hasAssessment = application.assessmentScore !== null && application.assessmentScore !== undefined;

  return (
    <div className="card" style={{ padding: '1.4rem', borderLeft: `4px solid ${hasAssessment ? 'var(--accent-indigo)' : 'var(--primary-wine)'}` }}>
      {/* Top row: Name, Match, Assessment Score, Role Readiness */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.85rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <h4 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--primary-wine)' }}>
              {application.applicantName}
            </h4>
            <span className={`badge ${getStatusBadge(application.status)}`}>
              {application.status}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <FiMail style={{ color: 'var(--muted-rose)' }} /> {application.applicantEmail}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <FiCalendar style={{ color: 'var(--muted-rose)' }} /> Applied: {application.appliedDate}
            </span>
          </div>
        </div>

        {/* Metrics Row: Role Readiness + Assessment Score + Profile Match */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          {hasAssessment && (
            <>
              <div style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-medium)',
                borderRadius: '8px',
                padding: '0.3rem 0.65rem',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Role Readiness</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--primary-navy)' }}>{application.roleReadiness}%</strong>
              </div>

              <div style={{
                background: 'var(--tone-blue-bg)',
                border: '1px solid var(--tone-blue-border)',
                borderRadius: '8px',
                padding: '0.3rem 0.65rem',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--tone-blue)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Assessment</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--accent-indigo)' }}>{application.assessmentScore}%</strong>
              </div>
            </>
          )}

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '0.3rem 0.65rem',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Profile Match</span>
            <strong style={{ fontSize: '1.05rem', color: 'var(--primary-blue)' }}>{application.matchPercentage}%</strong>
          </div>
        </div>
      </div>

      {/* Category Performance Breakdown if verified assessment exists */}
      {hasAssessment && application.categoryScores && (
        <div style={{
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: '8px',
          padding: '0.65rem 0.9rem',
          marginBottom: '0.9rem',
          border: '1px solid var(--border-light)'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
            Category Performance:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {Object.values(application.categoryScores).map(cat => (
              <span key={cat.category} style={{
                fontSize: '0.8rem',
                background: 'var(--bg-card)',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                border: '1px solid var(--border-medium)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <span style={{ color: 'var(--text-secondary)' }}>{cat.label}:</span>
                <strong style={{ color: cat.percentage >= 70 ? 'var(--success)' : cat.percentage >= 40 ? 'var(--warning)' : 'var(--danger)' }}>
                  {cat.percentage}%
                </strong>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Candidate Skills */}
      <div style={{ marginBottom: '0.9rem' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
          Candidate Skills:
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {application.applicantSkills?.map(skill => {
            const isMatching = requiredSkills.some(req => req.toLowerCase() === skill.toLowerCase());
            return (
              <SkillBadge
                key={skill}
                skill={skill}
                status={isMatching ? 'matched' : 'neutral'}
              />
            );
          })}
        </div>
      </div>

      {/* Cover note if provided */}
      {application.coverNote && (
        <div style={{
          backgroundColor: 'var(--bg-subtle)',
          border: '1px solid var(--border-light)',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          fontSize: '0.85rem',
          marginBottom: '1rem',
          display: 'flex',
          gap: '0.5rem'
        }}>
          <FiFileText style={{ color: 'var(--primary-blue)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ color: 'var(--primary-navy)', display: 'block', fontSize: '0.78rem' }}>Candidate Note:</strong>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>"{application.coverNote}"</p>
          </div>
        </div>
      )}

      {/* Recruiter Action Bar: Change Application Status */}
      <div style={{
        paddingTop: '0.9rem',
        borderTop: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          Update Pipeline Status:
        </span>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`btn btn-sm btn-status ${application.status === 'Shortlisted' ? 'is-active' : ''}`}
            data-tone="indigo"
            onClick={() => handleStatusChange('Shortlisted')}
          >
            Shortlist
          </button>
          <button
            type="button"
            className={`btn btn-sm btn-status ${application.status === 'Interview' ? 'is-active' : ''}`}
            data-tone="blue"
            onClick={() => handleStatusChange('Interview')}
          >
            Interview
          </button>
          <button
            type="button"
            className={`btn btn-sm btn-status ${application.status === 'Selected' ? 'is-active' : ''}`}
            data-tone="success"
            onClick={() => handleStatusChange('Selected')}
          >
            Select / Offer
          </button>
          <button
            type="button"
            className={`btn btn-sm btn-status ${application.status === 'Rejected' ? 'is-active' : ''}`}
            data-tone="danger"
            onClick={() => handleStatusChange('Rejected')}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
