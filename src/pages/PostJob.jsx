import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import JobForm from '../components/recruiter/JobForm';
import { useJobs } from '../context/JobContext';
import { useToast } from '../components/common/Toast';
import { FiArrowLeft } from 'react-icons/fi';

export default function PostJob() {
  const { addJob } = useJobs();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleJobSubmit = (jobData) => {
    const createdJob = addJob(jobData);
    addToast(`Successfully published "${createdJob.title}"!`, 'success');
    navigate(`/jobs/${createdJob.id}`);
  };

  return (
    <div className="container container-narrow page">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/recruiter" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted-rose)', fontWeight: 600, fontSize: '0.88rem' }}>
          <FiArrowLeft /> Back to Recruiter Dashboard
        </Link>
      </div>

      <JobForm onSubmit={handleJobSubmit} />
    </div>
  );
}
