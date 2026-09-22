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

  return (
    <div className="card" style={{ padding: '1.4rem', borderLeft: '4px solid var(--primary-wine)' }}>
      {/* Top row: Name, Match, and Current Status */}
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <MatchScore percentage={application.matchPercentage} variant="badge" />
        </div>
      </div>

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
            className="btn btn-sm"
            style={{
              backgroundColor: application.status === 'Shortlisted' ? '#eef2ff' : 'var(--bg-subtle)',
              borderColor: application.status === 'Shortlisted' ? '#c7d2fe' : 'var(--border-medium)',
              color: application.status === 'Shortlisted' ? '#4338ca' : 'var(--text-secondary)',
              fontWeight: application.status === 'Shortlisted' ? 600 : 400
            }}
            onClick={() => handleStatusChange('Shortlisted')}
          >
            Shortlist
          </button>
          <button
            type="button"
            className="btn btn-sm"
            style={{
              backgroundColor: application.status === 'Interview' ? '#eff6ff' : 'var(--bg-subtle)',
              borderColor: application.status === 'Interview' ? '#bfdbfe' : 'var(--border-medium)',
              color: application.status === 'Interview' ? '#1d4ed8' : 'var(--text-secondary)',
              fontWeight: application.status === 'Interview' ? 600 : 400
            }}
            onClick={() => handleStatusChange('Interview')}
          >
            Interview
          </button>
          <button
            type="button"
            className="btn btn-sm"
            style={{
              backgroundColor: application.status === 'Selected' ? '#ecfdf5' : 'var(--bg-subtle)',
              borderColor: application.status === 'Selected' ? '#a7f3d0' : 'var(--border-medium)',
              color: application.status === 'Selected' ? '#047857' : 'var(--text-secondary)',
              fontWeight: application.status === 'Selected' ? 600 : 400
            }}
            onClick={() => handleStatusChange('Selected')}
          >
            Select / Offer
          </button>
          <button
            type="button"
            className="btn btn-sm"
            style={{
              backgroundColor: application.status === 'Rejected' ? '#fef2f2' : 'var(--bg-subtle)',
              borderColor: application.status === 'Rejected' ? '#fecaca' : 'var(--border-medium)',
              color: application.status === 'Rejected' ? '#dc2626' : 'var(--text-secondary)',
              fontWeight: application.status === 'Rejected' ? 600 : 400
            }}
            onClick={() => handleStatusChange('Rejected')}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
