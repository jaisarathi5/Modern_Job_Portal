import React from 'react';
import SearchBar from '../components/jobs/SearchBar';
import JobCard from '../components/jobs/JobCard';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { FiRotateCcw, FiInbox } from 'react-icons/fi';
import { JOB_CARD_IMAGES } from '../data/jobCardImages';
import { getSortOptions } from '../data/jobSortOptions';
import '../styles/jobs.css';

export default function Jobs() {
  // Ordering lives in JobContext so this header, the filter panel and the
  // rendered list always agree on one sort value.
  const {
    filteredJobs,
    resetFilters,
    selectedCategory,
    selectedSkill,
    sortBy,
    setSortBy
  } = useJobs();
  const { isFresherMode, currentUser } = useAuth();

  return (
    <div className="jobs-page">
      {/* Page Header */}
      <div className="jobs-page-header">
        <div className="container">
          <div className="page-header">
            <span className="badge badge-rose" style={{ marginBottom: '0.4rem' }}>
              Verified Tech Positions
            </span>
            <h1 style={{ marginBottom: '0.4rem' }}>
              Explore Jobs with Smart Skill Alignment
            </h1>
            <p>
              Match scores are automatically updated based on your profile skills.
              Filter by skill, discipline, or enable Fresher Mode to isolate entry-level openings.
            </p>
          </div>

          <div style={{ maxWidth: '900px' }}>
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container">
        <div className="page">
          <div className="jobs-results-header">
            <div className="jobs-count-badge">
              Showing <strong>{filteredJobs.length}</strong> available position{filteredJobs.length === 1 ? '' : 's'}
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
                {getSortOptions(Boolean(currentUser)).map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Grid or Empty State */}
          {filteredJobs.length > 0 ? (
            <div className="jobs-grid">
              {filteredJobs.map((job, index) => (
                <div key={job.id} style={{ '--i': index % 12 }}>
                  <JobCard
                    job={job}
                    featuredImage={JOB_CARD_IMAGES[index % JOB_CARD_IMAGES.length]}
                  />
                </div>
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