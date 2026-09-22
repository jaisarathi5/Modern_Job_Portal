import React from 'react';
import { Link } from 'react-router-dom';
import MatchScore from './MatchScore';
import SkillBadge from './SkillBadge';
import { useJobs } from '../../context/JobContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import { 
  FiMapPin, 
  FiBriefcase, 
  FiDollarSign, 
  FiBookmark, 
  FiClock, 
  FiChevronRight,
  FiZap
} from 'react-icons/fi';

export default function JobCard({ job }) {
  const { isJobSaved, toggleSaveJob } = useJobs();
  const { currentUser } = useAuth();
  const { addToast } = useToast();

  const saved = isJobSaved(job.id);
  const matchPercentage = job.matchData ? job.matchData.matchPercentage : 0;
  const matchingSkills = job.matchData ? job.matchData.matchingSkills : [];

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveJob(job.id);
    addToast(saved ? 'Removed from saved jobs' : 'Job saved to your dashboard!', 'info');
  };

  const initial = job.company ? job.company.charAt(0).toUpperCase() : 'C';

  return (
    <div className="card card-interactive job-card-item" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      {/* Top Header: Company logo, Title, and Bookmark */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.85rem', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start', flex: 1 }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: job.logoBg || '#2563EB',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1.3rem',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.12)',
              flexShrink: 0
            }}
          >
            {initial}
          </div>
          <div>
            <h3 style={{ fontSize: '1.12rem', color: 'var(--primary-navy)', margin: '0 0 0.25rem', fontWeight: 700, lineHeight: 1.3 }}>
              <Link to={`/jobs/${job.id}`} style={{ color: 'inherit', textDecoration: 'none' }} className="job-card-title-link">
                {job.title}
              </Link>
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                {job.company}
              </span>
              <span style={{ color: 'var(--primary-blue)', display: 'inline-flex', alignItems: 'center' }} title="Verified Employer">
                <FiZap style={{ fill: 'currentColor', fontSize: '0.8rem' }} />
              </span>
              {job.rating && (
                <span style={{ fontSize: '0.78rem', color: '#b45309', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '2px', background: '#fef3c7', padding: '1px 6px', borderRadius: '4px' }}>
                  ★ {job.rating}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="job-match-grp">
          <MatchScore percentage={matchPercentage} variant="circle" size="sm" />
          <button
            type="button"
            onClick={handleBookmark}
            style={{
              background: saved ? 'var(--primary-blue-light)' : 'var(--bg-card)',
              border: `1px solid ${saved ? 'var(--primary-blue)' : 'var(--border-medium)'}`,
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: saved ? 'var(--primary-blue)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title={saved ? 'Unsave job' : 'Save job'}
            aria-label="Save job"
          >
            <FiBookmark style={{ fill: saved ? 'var(--primary-blue)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Meta tags: Location, Experience, Work Type */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.6rem',
        marginBottom: '0.85rem',
        fontSize: '0.82rem',
        color: 'var(--text-secondary)'
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'var(--bg-subtle)', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
          <FiMapPin style={{ color: 'var(--primary-blue)' }} />
          {job.location}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'var(--bg-subtle)', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
          <FiBriefcase style={{ color: 'var(--primary-blue)' }} />
          {job.workType}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'var(--bg-subtle)', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
          <FiClock style={{ color: 'var(--primary-blue)' }} />
          {job.experience}
        </span>
      </div>

      {/* Salary & Match Badges */}
<div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          marginBottom: '0.85rem',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            background: 'var(--bg-subtle)',
            padding: '0.25rem 0.6rem',
            borderRadius: '6px',
            border: '1px solid var(--border-light)'
          }}>
            <span style={{ color: 'var(--success)', fontWeight: 800 }}>₹</span>
            <span>{job.salary}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {job.isFresherFriendly && (
              <span className="badge badge-fresher" style={{ fontSize: '0.72rem' }}>
                🌱 Fresher Friendly
              </span>
            )}
            {matchPercentage > 0 && (
              <span
                className={`badge ${
                  matchPercentage >= 75 ? 'badge-match-high' : matchPercentage >= 45 ? 'badge-match-med' : 'badge-match-low'
                }`}
                style={{ fontSize: '0.72rem', fontWeight: 700 }}
              >
                {matchPercentage}% Match
              </span>
            )}
          </div>
        </div>

      {/* Skills Required & Matches */}
      <div style={{ marginBottom: '1.25rem', marginTop: 'auto' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
          Required Tech Stack:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {job.requiredSkills.slice(0, 4).map(skill => {
            const isMatched = matchingSkills.some(s => s.toLowerCase() === skill.toLowerCase());
            return (
              <SkillBadge
                key={skill}
                skill={skill}
                status={isMatched ? 'matched' : 'neutral'}
              />
            );
          })}
          {job.requiredSkills.length > 4 && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center', fontWeight: 600 }}>
              +{job.requiredSkills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Footer: Posted time + View Details CTA */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.85rem',
        borderTop: '1px solid var(--border-light)',
        marginTop: '0.5rem'
      }}>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Posted {job.postedDate}</span>
          <span>•</span>
          <span style={{ color: '#059669', fontWeight: 600 }}>{job.applicantsCount || 18} applicants</span>
        </div>
        <Link to={`/jobs/${job.id}`} className="btn btn-primary btn-sm" style={{ padding: '0.45rem 0.95rem' }}>
          View & Apply <FiChevronRight />
        </Link>
      </div>
    </div>
  );
}
