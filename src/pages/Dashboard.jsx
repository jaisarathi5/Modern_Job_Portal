import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { useApplications } from '../context/ApplicationContext';
import StatCard from '../components/dashboard/StatCard';
import JobCard from '../components/jobs/JobCard';
import MatchScore from '../components/jobs/MatchScore';
import SkillBadge from '../components/jobs/SkillBadge';
import { 
  FiSend, 
  FiBookmark, 
  FiAward, 
  FiTrendingUp, 
  FiCheckCircle, 
  FiClock, 
  FiArrowRight, 
  FiEdit, 
  FiPlus, 
  FiBriefcase 
} from 'react-icons/fi';
import '../styles/dashboard.css';

export default function Dashboard() {
  const { currentUser, role } = useAuth();
  const { jobs, filteredJobs, savedJobIds } = useJobs();
  const { getUserApplications } = useApplications();

  const userApps = currentUser ? getUserApplications(currentUser.id) : [];
  const savedJobs = jobs.filter(job => savedJobIds.includes(job.id));

  // Profile completion calculation
  let completedFields = 0;
  const totalFields = 6;
  if (currentUser?.name) completedFields++;
  if (currentUser?.email) completedFields++;
  if (currentUser?.degree) completedFields++;
  if (currentUser?.skills?.length > 0) completedFields++;
  if (currentUser?.bio) completedFields++;
  if (currentUser?.resumeText) completedFields++;
  const profilePercent = Math.round((completedFields / totalFields) * 100);

  // Shortlisted count
  const shortlistedCount = userApps.filter(a => a.status === 'Shortlisted' || a.status === 'Interview' || a.status === 'Selected').length;

  // Average match score
  const avgMatch = filteredJobs.length > 0
    ? Math.round(filteredJobs.reduce((acc, curr) => acc + curr.matchData.matchPercentage, 0) / filteredJobs.length)
    : 0;

  // Top recommended jobs (sorted by match)
  const topRecommended = filteredJobs.slice(0, 3);

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Welcome Header */}
        <div className="dashboard-header">
          <div className="dashboard-welcome">
            <span className="badge badge-peach" style={{ marginBottom: '0.4rem' }}>
              Student Hub
            </span>
            <h1>Welcome back, {currentUser?.name || 'Student'}! 👋</h1>
            <p>
              {currentUser?.title || 'Fresher Job Seeker'} • {currentUser?.college || 'University'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/profile" className="btn btn-outline">
              <FiEdit /> Edit Profile & Skills
            </Link>
            <Link to="/jobs" className="btn btn-primary">
              <FiBriefcase /> Find More Jobs
            </Link>
          </div>
        </div>

        {/* Top KPI Metrics */}
        <div className="stats-container">
          <StatCard
            title="Applications Sent"
            value={userApps.length}
            subtitle="Active trackings in pipeline"
            icon={FiSend}
            color="#2563eb"
            bg="#eff6ff"
          />
          <StatCard
            title="Shortlisted / Interviews"
            value={shortlistedCount}
            subtitle="Positive recruiter responses"
            icon={FiAward}
            color="#059669"
            bg="#ecfdf5"
          />
          <StatCard
            title="Average Skill Match"
            value={`${avgMatch}%`}
            subtitle="Across all listed positions"
            icon={FiTrendingUp}
            color="#4f46e5"
            bg="#eef2ff"
          />
          <StatCard
            title="Saved Positions"
            value={savedJobs.length}
            subtitle="Bookmarked for future apply"
            icon={FiBookmark}
            color="#0891b2"
            bg="#ecfeff"
          />
        </div>

        {/* Two Column Layout: Main content + Profile Summary Sidebar */}
        <div className="dashboard-two-col">
          {/* Main Column */}
          <div>
            {/* Top Recommended Jobs (By Match %) */}
            <div className="dashboard-section">
              <div className="dashboard-section-header">
                <div>
                  <h3>🎯 Recommended for You</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Ranked automatically by highest skill match percentage
                  </span>
                </div>
                <Link to="/jobs" className="btn btn-ghost btn-sm">
                  View All ({filteredJobs.length}) <FiArrowRight />
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
                {topRecommended.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>

            {/* Recent Applications Preview */}
            <div className="dashboard-section">
              <div className="dashboard-section-header">
                <div>
                  <h3>📋 Recent Applications</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Your latest applied roles and interview stages
                  </span>
                </div>
                <Link to="/applications" className="btn btn-ghost btn-sm">
                  Full Tracker <FiArrowRight />
                </Link>
              </div>

              {userApps.length > 0 ? (
                <div>
                  {userApps.slice(0, 3).map(app => (
                    <div
                      key={app.id}
                      style={{
                        padding: '1rem',
                        border: '1px solid var(--border-light)',
                        borderRadius: '10px',
                        marginBottom: '0.75rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '0.75rem'
                      }}
                    >
                      <div>
                        <h4 style={{ margin: '0 0 0.2rem', fontSize: '1rem', color: 'var(--primary-wine)' }}>
                          <Link to={`/jobs/${app.jobId}`}>{app.jobTitle}</Link>
                        </h4>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          {app.company} • Applied: {app.appliedDate}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <MatchScore percentage={app.matchPercentage} variant="badge" />
                        <span className={`badge ${
                          app.status === 'Selected' ? 'badge-fresher' :
                          app.status === 'Interview' ? 'badge-cream' :
                          app.status === 'Shortlisted' ? 'badge-peach' : 'badge-wine'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)' }}>
                  <p>You haven't submitted any job applications yet.</p>
                  <Link to="/jobs" className="btn btn-primary btn-sm" style={{ marginTop: '0.5rem' }}>
                    Browse Jobs & Apply
                  </Link>
                </div>
              )}
            </div>

            {/* Bookmarked / Saved Jobs */}
            <div className="dashboard-section">
              <div className="dashboard-section-header">
                <h3>📌 Saved Jobs ({savedJobs.length})</h3>
                <Link to="/jobs" className="btn btn-ghost btn-sm">
                  Browse Catalog
                </Link>
              </div>

              {savedJobs.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {savedJobs.slice(0, 2).map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                  No jobs saved yet. Click the bookmark icon on any job card to save it here.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar Column: Profile Summary & Skill Gap Quick Look */}
          <div>
            {/* Profile Card */}
            <div className="dashboard-section">
              <div style={{ textAlign: 'center', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary-blue), var(--accent-indigo))',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  margin: '0 auto 0.75rem',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
                }}>
                  {currentUser?.name?.charAt(0) || 'S'}
                </div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--primary-navy)' }}>
                  {currentUser?.name || 'Alex Chen'}
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {currentUser?.degree || 'B.Tech CS (2025)'}
                </span>

                {/* Profile Completion Bar */}
                <div style={{ marginTop: '1rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: 600 }}>Profile Completion</span>
                    <strong style={{ color: 'var(--primary-blue)' }}>{profilePercent}%</strong>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border-light)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${profilePercent}%`, height: '100%', background: 'var(--primary-blue)', borderRadius: '999px' }} />
                  </div>
                </div>
              </div>

              {/* Your Active Skills */}
              <div style={{ marginTop: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-navy)' }}>
                    Your Skills ({currentUser?.skills?.length || 0})
                  </span>
                  <Link to="/profile" style={{ fontSize: '0.76rem', color: 'var(--primary-blue)', textDecoration: 'underline' }}>
                    + Manage
                  </Link>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {currentUser?.skills?.map(skill => (
                    <SkillBadge key={skill} skill={skill} status="neutral" />
                  ))}
                </div>
              </div>

              {/* Education & Bio Summary */}
              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)', fontSize: '0.84rem' }}>
                <div style={{ marginBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.76rem' }}>College</span>
                  <strong>{currentUser?.college || 'Apex Institute of Technology'}</strong>
                </div>
                <div style={{ marginBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.76rem' }}>CGPA</span>
                  <strong>{currentUser?.gpa || '8.8 / 10.0'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.76rem' }}>Resume Status</span>
                  <span style={{ color: '#1B5E20', fontWeight: 600 }}>✓ Uploaded & Indexed</span>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/resume-analyzer" className="btn btn-soft" style={{ width: '100%', fontSize: '0.85rem' }}>
                  Run Resume Skill Checker
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
