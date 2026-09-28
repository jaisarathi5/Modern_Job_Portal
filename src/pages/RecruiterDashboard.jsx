import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { useApplications } from '../context/ApplicationContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import StatCard from '../components/dashboard/StatCard';
import BranchIntelligence from '../components/recruiter/BranchIntelligence';
import ApplicantCard from '../components/recruiter/ApplicantCard';
import Modal from '../components/common/Modal';
import { 
  FiBriefcase, 
  FiUsers, 
  FiCheckCircle, 
  FiPlusCircle, 
  FiTrash2, 
  FiEdit, 
  FiEye, 
  FiFilter, 
  FiInbox 
} from 'react-icons/fi';
import '../styles/dashboard.css';

export default function RecruiterDashboard() {
  const { jobs, deleteJob } = useJobs();
  const { applications } = useApplications();
  const { currentUser } = useAuth();
  const { addToast } = useToast();

  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [applicantFilter, setApplicantFilter] = useState('All');

  // Filter jobs posted by this company or all demo jobs
  const postedJobs = jobs;

  // Selected job
  const currentSelectedJob = postedJobs.find(j => j.id === selectedJobId) || postedJobs[0];

  // Applicants for currently selected job
  const jobApplicants = applications.filter(a => String(a.jobId) === String(currentSelectedJob?.id));

  const filteredApplicants = jobApplicants.filter(a => {
    if (applicantFilter === 'All') return true;
    return a.status.toLowerCase() === applicantFilter.toLowerCase();
  });

  // Calculate stats
  const totalApplicantsCount = applications.length;
  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted' || a.status === 'Interview' || a.status === 'Selected').length;

  const handleDeleteConfirm = () => {
    if (jobToDelete) {
      deleteJob(jobToDelete.id);
      addToast(`Job "${jobToDelete.title}" deleted`, 'info');
      setJobToDelete(null);
      if (selectedJobId === jobToDelete.id) {
        setSelectedJobId(postedJobs.find(j => j.id !== jobToDelete.id)?.id || null);
      }
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-welcome">
            <span className="badge badge-wine" style={{ marginBottom: '0.4rem' }}>
              Recruiter Command Center
            </span>
            <h1>Recruiter Portal: {currentUser?.company || 'Nexus Innovations'}</h1>
            <p>
              Manage campus listings, review algorithmic skill match percentages, and advance student candidates.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/recruiter/post-job" className="btn btn-primary">
              <FiPlusCircle /> Post New Opening
            </Link>
          </div>
        </div>

        {/* Top Recruiter Metrics */}
        <div className="stats-container">
          <StatCard
            title="Total Openings"
            value={postedJobs.length}
            subtitle="Active on job portal"
            icon={FiBriefcase}
            color="var(--tone-indigo)"
            bg="var(--tone-indigo-bg)"
          />
          <StatCard
            title="Total Applications"
            value={totalApplicantsCount}
            subtitle="Candidate submissions"
            icon={FiUsers}
            color="var(--tone-blue)"
            bg="var(--tone-blue-bg)"
          />
          <StatCard
            title="Shortlisted / Offer"
            value={shortlistedCount}
            subtitle="Candidates in pipeline"
            icon={FiCheckCircle}
            color="var(--tone-success)"
            bg="var(--tone-success-bg)"
          />
        </div>

        {/* Two Column Workspace: Jobs List on Left, Candidate Pipeline on Right */}
        <div className="dashboard-two-col">
          {/* Left Column: Manage Posted Jobs */}
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h3>Posted Openings ({postedJobs.length})</h3>
              <Link to="/recruiter/post-job" className="btn btn-outline btn-sm">
                + New
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {postedJobs.map(job => {
                const count = applications.filter(a => String(a.jobId) === String(job.id)).length;
                const isSelected = selectedJobId === job.id;

                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    style={{
                      padding: '1.1rem',
                      borderRadius: '10px',
                      border: `2px solid ${isSelected ? 'var(--primary-blue)' : 'var(--border-light)'}`,
                      backgroundColor: isSelected ? 'var(--primary-blue-light)' : 'var(--bg-card)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--primary-navy)' }}>
                        {job.title}
                      </h4>
                      <span className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>
                        {count} applicant{count === 1 ? '' : 's'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                      {job.category} • {job.workType} • {job.salary}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {job.isFresherFriendly ? '🌱 Fresher Friendly' : 'Experienced'}
                      </span>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link
                          to={`/recruiter/edit-job/${job.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="btn btn-ghost btn-sm"
                          style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem' }}
                          title="Edit opening"
                        >
                          <FiEdit />
                        </Link>
                        <Link
                          to={`/jobs/${job.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="btn btn-ghost btn-sm"
                          style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem' }}
                          title="View live page"
                        >
                          <FiEye /> View
                        </Link>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem', color: 'var(--accent-rose)' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setJobToDelete(job);
                          }}
                          title="Delete opening"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Applicants for the Selected Job */}
          <div>
            <div className="dashboard-section">
              <div className="dashboard-section-header">
                <div>
                  <h3 style={{ fontSize: '1.2rem' }}>
                    Applicants for: <span style={{ color: 'var(--muted-rose)' }}>{currentSelectedJob?.title || 'Selected Job'}</span>
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Match scores automatically calculated against required skills: {currentSelectedJob?.requiredSkills?.slice(0, 3).join(', ')}
                  </span>
                </div>
              </div>

              {/* Applicant Filter Tabs */}
              <div className="status-filter-pills" style={{ marginBottom: '1.25rem' }}>
                {['All', 'Applied', 'Assessment Completed', 'Shortlisted', 'Interview', 'Selected', 'Rejected'].map(status => (
                  <button
                    key={status}
                    type="button"
                    className={`status-pill-btn ${applicantFilter === status ? 'active' : ''}`}
                    onClick={() => setApplicantFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Applicant Cards List */}
              {filteredApplicants.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filteredApplicants.map(app => (
                    <ApplicantCard
                      key={app.id}
                      application={app}
                      requiredSkills={currentSelectedJob?.requiredSkills || []}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state" style={{ padding: '2.5rem 1rem' }}>
                  <div className="empty-state-icon">
                    <FiInbox />
                  </div>
                  <h4>No Candidates in this Pipeline Stage</h4>
                  <p style={{ fontSize: '0.88rem' }}>
                    {applicantFilter === 'All'
                      ? 'No students have applied for this specific role yet.'
                      : `No applicants currently under "${applicantFilter}" status.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!jobToDelete}
        onClose={() => setJobToDelete(null)}
        title="Confirm Deletion"
        maxWidth="440px"
      >
        <p style={{ fontSize: '0.95rem', marginBottom: '1.25rem' }}>
          Are you sure you want to delete the job posting for <strong>"{jobToDelete?.title}"</strong>?
          This action will remove it from the student catalog.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button type="button" className="btn btn-outline" onClick={() => setJobToDelete(null)}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" style={{ backgroundColor: 'var(--accent-rose)' }} onClick={handleDeleteConfirm}>
            Yes, Delete Position
          </button>
        </div>
      </Modal>
    </div>
  );
}
