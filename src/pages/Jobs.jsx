import React, { useState } from 'react';
import SearchBar from '../components/jobs/SearchBar';
import JobCard from '../components/jobs/JobCard';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { FiRotateCcw, FiInbox } from 'react-icons/fi';
import '../styles/jobs.css';

export default function Jobs() {
  const { filteredJobs, resetFilters, selectedCategory, selectedSkill } = useJobs();
  const { isFresherMode } = useAuth();
  const [sortBy, setSortBy] = useState('match');

  // Sorted jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'match') {
      return (b.matchData?.matchPercentage || 0) - (a.matchData?.matchPercentage || 0);
    }
    if (sortBy === 'applicants') {
      return (a.applicantsCount || 0) - (b.applicantsCount || 0);
    }
    return 0; // Default order
  });

  return (
    <div className="jobs-page">
      {/* Page Header */}
      <div className="jobs-page-header">
        <div className="container">
          <div style={{ maxWidth: '720px', marginBottom: '1.75rem' }}>
            <span className="badge badge-rose" style={{ marginBottom: '0.4rem' }}>
              Verified Tech Positions
            </span>
            <h1 style={{ fontSize: '2.3rem', marginBottom: '0.4rem', color: 'var(--primary-navy)' }}>
              Explore Jobs with Smart Skill Alignment
            </h1>
            <p>
              Match scores are automatically updated based on your profile skills.
              Filter by tech stack, domain, or enable Fresher Mode to isolate entry-level openings.
            </p>
          </div>

          <div style={{ maxWidth: '900px' }}>
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container">
        <div style={{ padding: '2rem 0 4rem' }}>
          <div className="jobs-results-header">
            <div className="jobs-count-badge">
              Showing <strong>{sortedJobs.length}</strong> available position{sortedJobs.length === 1 ? '' : 's'}
              {isFresherMode && (
                <span className="badge badge-fresher" style={{ marginLeft: '0.6rem' }}>
                  🌱 Fresher Mode ON
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="badge badge-rose" style={{ marginLeft: '0.4rem' }}>
                  {selectedCategory}
                </span>
              )}
              {selectedSkill !== 'All' && (
                <span className="badge badge-peach" style={{ marginLeft: '0.4rem' }}>
                  Skill: {selectedSkill}
                </span>
              )}
            </div>

            {/* Sort by dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: 'auto',
                  padding: '0.35rem 0.8rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  borderRadius: '8px',
                  borderColor: 'var(--border-medium)',
                  background: 'var(--bg-card)'
                }}
              >
                <option value="match">Highest Match Score</option>
                <option value="recent">Most Recent</option>
                <option value="applicants">Fewest Applicants (Early Apply)</option>
              </select>
            </div>
          </div>

          {/* Results Grid or Empty State */}
          {sortedJobs.length > 0 ? (
            <div className="jobs-grid">
              {sortedJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <FiInbox />
              </div>
              <h3>No Matching Positions Found</h3>
              <p>
                No jobs matched your current search criteria or active filters. Try broadening your keywords or turning off specific filters.
              </p>
              <button type="button" className="btn btn-primary" onClick={resetFilters}>
                <FiRotateCcw /> Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}