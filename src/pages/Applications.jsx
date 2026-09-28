import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApplications } from '../context/ApplicationContext';
import { useAuth } from '../context/AuthContext';
import ApplicationTimeline from '../components/dashboard/ApplicationTimeline';
import MatchScore from '../components/jobs/MatchScore';
import { FiCheckSquare, FiFilter, FiInbox, FiArrowRight, FiClock, FiMapPin, FiDollarSign } from 'react-icons/fi';
import '../styles/dashboard.css';

const STATUS_FILTERS = ['All', 'Applied', 'Assessment Completed', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];

export default function Applications() {
  const { currentUser } = useAuth();
  const { getUserApplications } = useApplications();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const allApplications = currentUser ? getUserApplications(currentUser.id) : [];

  const filteredApplications = allApplications.filter(app => {
    if (selectedFilter === 'All') return true;
    return app.status.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-welcome">
            <span className="badge badge-wine" style={{ marginBottom: '0.4rem' }}>
              Real-time Pipeline
            </span>
            <h1>Application Tracker</h1>
            <p>
              Monitor each submission through the recruitment lifecycle: screening, assessments, shortlisting, technical interviews, and offers.
            </p>
          </div>

          <Link to="/jobs" className="btn btn-primary">
            Apply to More Positions
          </Link>
        </div>

        {/* Status Filter Tabs */}
        <div className="status-filter-pills">
          {STATUS_FILTERS.map(status => {
            const count = status === 'All' 
              ? allApplications.length 
              : allApplications.filter(a => a.status.toLowerCase() === status.toLowerCase()).length;

            return (
              <button
                key={status}
                type="button"
                className={`status-pill-btn ${selectedFilter === status ? 'active' : ''}`}
                onClick={() => setSelectedFilter(status)}
              >
                {status} ({count})
              </button>
            );
          })}
        </div>

        {/* Applications List */}
        {filteredApplications.length > 0 ? (
          <div>
            {filteredApplications.map(app => (
              <div key={app.id} className="application-card">
                {/* Header: Title, Company, Match, Status */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.25rem'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', margin: 0 }}>
                        <Link to={`/jobs/${app.jobId}`}>{app.jobTitle}</Link>
                      </h3>
                      <span className={`badge ${
                        app.status === 'Selected' ? 'badge-fresher' :
                        app.status === 'Interview' ? 'badge-blue' :
                        app.status === 'Assessment Completed' ? 'badge-blue' :
                        app.status === 'Shortlisted' ? 'badge-indigo' : 'badge-navy'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
                      <strong>{app.company}</strong>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <FiMapPin style={{ color: 'var(--primary-blue)' }} /> {app.location}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <FiDollarSign style={{ color: 'var(--success)' }} /> {app.salary}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <FiClock style={{ color: 'var(--primary-blue)' }} /> Applied: {app.appliedDate}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {app.assessmentScore !== null && app.assessmentScore !== undefined && (
                      <span className="badge badge-peach" title="Verified Assessment Score" style={{ fontSize: '0.78rem' }}>
                        Assessment: {app.assessmentScore}%
                      </span>
                    )}
                    {app.roleReadiness !== null && app.roleReadiness !== undefined && (
                      <span className="badge badge-indigo" title="Calculated Role Readiness" style={{ fontSize: '0.78rem' }}>
                        Readiness: {app.roleReadiness}%
                      </span>
                    )}
                    <MatchScore percentage={app.matchPercentage} variant="badge" />
                    <Link to={`/jobs/${app.jobId}`} className="btn btn-outline btn-sm">
                      Job Details <FiArrowRight />
                    </Link>
                  </div>
                </div>

                {/* Cover Note preview if available */}
                {app.coverNote && (
                  <div style={{
                    fontSize: '0.84rem',
                    color: 'var(--text-secondary)',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-light)',
                    padding: '0.65rem 1rem',
                    borderRadius: '8px',
                    marginBottom: '1.25rem'
                  }}>
                    <strong>Your Cover Note:</strong> "{app.coverNote}"
                  </div>
                )}

                {/* Visual Status Progression Timeline */}
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
                  <ApplicationTimeline currentStatus={app.status} timeline={app.timeline} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FiInbox />
            </div>
            <h3>No Applications in this Category</h3>
            <p>
              {selectedFilter === 'All'
                ? "You haven't submitted any job applications yet."
                : `You currently have 0 applications in "${selectedFilter}" status.`}
            </p>
            <Link to="/jobs" className="btn btn-primary">
              Explore Available Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
