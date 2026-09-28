import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import JobForm from '../components/recruiter/JobForm';
import { useJobs } from '../context/JobContext';
import { useToast } from '../components/common/Toast';
import { FiArrowLeft } from 'react-icons/fi';

export default function EditJob() {
  const { id } = useParams();
  const { getJobById, editJob } = useJobs();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const job = getJobById(id);

  if (!job) {
    return (
      <div className="container container-narrow page" style={{ textAlign: 'center' }}>
        <h2>Position Not Found</h2>
        <p>The opening you are trying to edit does not exist or has been removed.</p>
        <Link to="/recruiter" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Recruiter Dashboard
        </Link>
      </div>
    );
  }

  const handleJobUpdate = (jobData) => {
    editJob(job.id, jobData);
    addToast(`Updated "${jobData.title}"`, 'success');
    navigate('/recruiter');
  };

  return (
    <div className="container container-narrow page">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          to="/recruiter"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--muted-rose)',
            fontWeight: 600,
            fontSize: '0.88rem'
          }}
        >
          <FiArrowLeft /> Back to Recruiter Dashboard
        </Link>
      </div>

      <JobForm initialValues={job} isEditing onSubmit={handleJobUpdate} />
    </div>
  );
}
