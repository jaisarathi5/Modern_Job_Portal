import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { useApplications } from '../context/ApplicationContext';
import { useToast } from '../components/common/Toast';
import Modal from '../components/common/Modal';
import SkillMatch from '../components/jobs/SkillMatch';
import SkillGap from '../components/jobs/SkillGap';
import MatchScore from '../components/jobs/MatchScore';
import SkillBadge from '../components/jobs/SkillBadge';
import { 
  calculateJobMatch 
} from '../utils/jobMatcher';
import { 
  FiMapPin, 
  FiBriefcase, 
  FiClock, 
  FiDollarSign, 
  FiBookmark, 
  FiArrowLeft, 
  FiCheckCircle, 
  FiGift, 
  FiSend,
  FiLock
} from 'react-icons/fi';
import '../styles/job-details.css';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById, isJobSaved, toggleSaveJob } = useJobs();
  const { currentUser, role } = useAuth();
  const { hasApplied, applyForJob } = useApplications();
  const { addToast } = useToast();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAssessmentPromptOpen, setIsAssessmentPromptOpen] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  const job = getJobById(id);

  if (!job) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>Position Not Found</h2>
        <p>The job you are looking for does not exist or has been removed.</p>
        <Link to="/jobs" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to All Jobs
        </Link>
      </div>
    );
  }

  const userSkills = currentUser?.skills || [];
  const matchData = calculateJobMatch(userSkills, job);
  const alreadyApplied = currentUser ? hasApplied(job.id, currentUser.id) : false;
  const saved = isJobSaved(job.id);
  const requiresAssessment = Boolean(job.assessment?.enabled);

  // Check if candidate already has a cached assessment result for this job
  const getCachedAssessment = () => {
    try {
      const cached = JSON.parse(localStorage.getItem('sb_assessments') || '{}');
      return cached[`${job.id}_${currentUser?.id || 'guest'}`] || null;
    } catch {
      return null;
    }
  };
  const cachedAssessment = getCachedAssessment();

  const handleToggleBookmark = () => {
    toggleSaveJob(job.id);
    addToast(saved ? 'Removed from saved jobs' : 'Job bookmarked to your dashboard!', 'info');
  };

  const handleApplyClick = () => {
    if (!currentUser) {
      addToast('Please log in to apply for this position', 'info');
      navigate('/login');
      return;
    }

    if (requiresAssessment && !cachedAssessment) {
      // Step: Assessment Required prompt
      setIsAssessmentPromptOpen(true);
    } else {
      // Standard apply flow or already completed assessment flow
      setIsApplyModalOpen(true);
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const assessmentPayload = cachedAssessment ? cachedAssessment.evaluation : null;
      const result = applyForJob(job, currentUser, coverNote, assessmentPayload);
      setIsSubmitting(false);
      setIsApplyModalOpen(false);

      if (result.success) {
        addToast('Application submitted successfully! Track it in your Dashboard.', 'success');
        setShowBurst(true);
        setTimeout(() => setShowBurst(false), 1000);
      } else {
        addToast(result.message || 'Error submitting application', 'error');
      }
    }, 400);
  };

  return (
    <div className="job-details-page">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="job-details-breadcrumb">
          <Link to="/jobs" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <FiArrowLeft /> Back to Jobs Catalog
          </Link>
          <span>/</span>
          <span>{job.category}</span>
          <span>/</span>
          <span style={{ color: 'var(--primary-wine)', fontWeight: 600 }}>{job.title}</span>
        </div>

        <div className="job-details-layout">
          {/* Main Column */}
          <div>
            {/* Header Card */}
            <div className="job-header-card">
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '14px',
                  backgroundColor: job.logoBg || 'var(--primary-blue)',
                  /* Company colours are arbitrary, so the initial stays white
                     on a real logoBg and only follows the accent on fallback. */
                  color: job.logoBg ? '#ffffff' : 'var(--on-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {job.company.charAt(0)}
                </div>

                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                    <h1 style={{ fontSize: '1.85rem', margin: 0, color: 'var(--primary-navy)' }}>
                      {job.title}
                    </h1>
                    {job.isFresherFriendly && (
                      <span className="badge badge-fresher">🌱 Fresher Friendly</span>
                    )}
                  </div>
                  <h2 style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', fontWeight: 600, margin: 0 }}>
                    {job.company}
                  </h2>
                </div>
              </div>

              {/* Meta pills */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
                gap: '1rem',
                padding: '1.25rem 0',
                borderTop: '1px solid var(--border-light)',
                borderBottom: '1px solid var(--border-light)',
                marginBottom: '1.25rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Location</span>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <FiMapPin style={{ color: 'var(--primary-blue)' }} /> {job.location}
                  </strong>
                </div>

                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Arrangement</span>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <FiBriefcase style={{ color: 'var(--primary-blue)' }} /> {job.workType}
                  </strong>
                </div>

                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Experience</span>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <FiClock style={{ color: 'var(--primary-blue)' }} /> {job.experience}
                  </strong>
                </div>

                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Offered Compensation</span>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--primary-navy)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <FiDollarSign style={{ color: 'var(--success)' }} /> {job.salary}
                  </strong>
                </div>
              </div>

              {/* Mobile / Tablet Quick Apply button */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                {alreadyApplied ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--success-bg)',
                    color: 'var(--text-success)',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.92rem'
                  }}>
                    <FiCheckCircle /> Application Submitted
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={handleApplyClick}
                  >
                    <FiSend /> {requiresAssessment && !cachedAssessment ? 'Apply (Assessment Required)' : 'Apply for Position'}
                  </button>
                )}

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleToggleBookmark}
                  title={saved ? 'Remove Bookmark' : 'Save Job'}
                >
                  <FiBookmark style={{ fill: saved ? 'var(--accent-rose)' : 'none' }} />
                  {saved ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            {/* SECTIONS 6 & 8: Smart Job Match + Skill Gap.
                Both are computed from the signed-in candidate's own skill list,
                so a guest would only ever see a meaningless 0% and an
                "everything is missing" roadmap. Show a sign-in prompt instead. */}
            {currentUser ? (
              <>
                <SkillMatch matchData={matchData} jobTitle={job.title} />
                <SkillGap missingSkills={matchData.missingSkills} />
              </>
            ) : (
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-sm)',
                  marginBottom: '1.75rem'
                }}
              >
                <span className="badge badge-navy" style={{ fontSize: '0.72rem' }}>Smart Match System</span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', margin: '0.5rem 0 0.35rem' }}>
                  Unlock your match for this role
                </h3>
                <p style={{ margin: '0 0 1.1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Sign in with your skill profile and we will compare it against this
                  role's requirements — showing exactly what you have, what is missing,
                  and how to close the gap.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Link to="/login" className="btn btn-primary">Sign in to see my match</Link>
                  <Link to="/register" className="btn btn-outline">Create free profile</Link>
                </div>
              </div>
            )}

            {/* Job Description */}
            <div className="job-section-card" style={{ marginTop: '1.75rem' }}>
              <h3>About the Role</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="job-section-card">
              <h3>Key Responsibilities</h3>
              <ul className="bullet-list">
                {job.responsibilities?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Required & Preferred Skills Matrix */}
            <div className="job-section-card">
              <h3>Required Skills & Competencies</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {job.requiredSkills?.map(skill => (
                  <SkillBadge
                    key={skill}
                    skill={skill}
                    status={userSkills.some(s => s.toLowerCase() === skill.toLowerCase()) ? 'matched' : 'neutral'}
                  />
                ))}
              </div>

              {job.preferredSkills && job.preferredSkills.length > 0 && (
                <>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-wine)', marginBottom: '0.6rem' }}>
                    Preferred / Bonus Skills
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {job.preferredSkills.map(skill => (
                      <SkillBadge key={skill} skill={skill} status="preferred" />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="job-section-card">
                <h3>Perks & Growth Benefits</h3>
                <ul className="bullet-list">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FiGift style={{ color: 'var(--muted-rose)' }} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar Column: Sticky Action & Match Card */}
          <div className="sidebar-sticky-box">
            <div className="card" style={{ padding: '1.75rem' }}>
              {showBurst && (
                <div className="apply-burst" aria-hidden="true">
                  <span /><span /><span /><span /><span /><span /><span /><span />
                </div>
              )}
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--primary-wine)' }}>
                Application Summary
              </h3>

              <div style={{
                background: 'var(--bg-subtle)',
                borderRadius: '12px',
                padding: '1.25rem',
                textAlign: 'center',
                marginBottom: '1.25rem',
                border: '1px solid var(--border-light)'
              }}>
                <MatchScore percentage={matchData.matchPercentage} size="lg" />
                <div style={{ marginTop: '0.5rem', fontWeight: 600, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>
                  Skill Compatibility
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {matchData.matchedCount} of {matchData.totalRequired} core skills matched
                </span>
              </div>

              {alreadyApplied ? (
                <div className="apply-success-box" style={{
                  textAlign: 'center',
                  padding: '1rem',
                  backgroundColor: 'var(--success-bg)',
                  borderRadius: '8px',
                  color: 'var(--text-success)',
                  border: '1px solid var(--success-border)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  marginBottom: '1rem'
                }}>
                  <FiCheckCircle style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                  You have applied for this job
                  <Link to="/applications" style={{ display: 'block', marginTop: '0.4rem', fontSize: '0.8rem', color: 'var(--tone-success)', textDecoration: 'underline' }}>
                    View status in Tracker →
                  </Link>
                </div>
              ) : (
                <>
                  {cachedAssessment && (
                    <div style={{
                      backgroundColor: 'var(--success-bg)',
                      border: '1px solid var(--success-border)',
                      borderRadius: '8px',
                      padding: '0.65rem 0.85rem',
                      marginBottom: '0.75rem',
                      fontSize: '0.82rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--success-dark)' }}>
                        <span>Assessment Score:</span>
                        <span>{cachedAssessment.evaluation?.assessmentScore}%</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        <span>Role Readiness:</span>
                        <strong style={{ color: 'var(--primary-navy)' }}>{cachedAssessment.evaluation?.roleReadiness}%</strong>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: '100%', marginBottom: '0.75rem', padding: '0.75rem' }}
                    onClick={handleApplyClick}
                  >
                    <FiSend /> {requiresAssessment && !cachedAssessment ? 'Apply (Assessment Required)' : 'Apply Now'}
                  </button>
                </>
              )}

              <button
                type="button"
                className="btn btn-outline"
                style={{ width: '100%', marginBottom: '1.25rem' }}
                onClick={handleToggleBookmark}
              >
                <FiBookmark style={{ fill: saved ? 'var(--primary-blue)' : 'none' }} />
                {saved ? 'Bookmarked' : 'Save for Later'}
              </button>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span>Posted</span>
                  <strong>{job.postedDate}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span>Applicants</span>
                  <strong>{job.applicantsCount ?? 0} candidates</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Candidate Type</span>
                  <strong>{job.isFresherFriendly ? 'Fresher Friendly' : 'Experienced'}</strong>
                </div>
              </div>
            </div>

            {/* Quick Resume Matcher Callout */}
            <div className="card" style={{ padding: '1.25rem', backgroundColor: 'var(--tone-blue-bg)', border: '1px solid var(--tone-blue-border)' }}>
              <h4 style={{ fontSize: '0.98rem', color: 'var(--primary-blue)', marginBottom: '0.35rem' }}>
                Test Your Resume Text
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Want to check if your resume keywords align with {job.title}?
              </p>
              <Link to="/resume-analyzer" className="btn btn-outline btn-sm" style={{ width: '100%' }}>
                Open Resume Analyzer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Apply Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title={`Apply for ${job.title}`}
      >
        <form onSubmit={handleApplySubmit}>
          <div style={{
            background: 'var(--bg-subtle)',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1.25rem',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Applying as:</span>
              <span className="badge badge-navy">{currentUser?.name || 'Guest Student'}</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Email: {currentUser?.email || 'alex.chen@university.edu'} • Degree: {currentUser?.degree || 'B.Tech CS'}
            </div>
          </div>

          {currentUser && (
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.88rem', fontWeight: 600 }}>
                Calculated Skill Match for this role:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MatchScore percentage={matchData.matchPercentage} variant="badge" />
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  ({matchData.matchedCount}/{matchData.totalRequired} core skills in your profile)
                </span>
              </div>
            </div>
          )}

          {!currentUser && (
            <div
              style={{
                marginBottom: '1.25rem',
                padding: '0.9rem 1rem',
                borderRadius: '10px',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                flexWrap: 'wrap'
              }}
            >
              <FiLock style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', flex: 1, minWidth: '180px' }}>
                Sign in with your profile to see your skill match for this role.
              </span>
              <Link to="/login" className="btn btn-primary btn-sm">Sign in</Link>
              <Link to="/register" className="btn btn-outline btn-sm">Create free profile</Link>
            </div>
          )}

          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="coverNote" style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.88rem', fontWeight: 600 }}>
              Short Cover Note to Recruiter:
            </label>
            <textarea
              id="coverNote"
              rows="4"
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              placeholder="Highlight any relevant college projects, coursework, or why you are excited to join this team..."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsApplyModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Confirm & Submit Application'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Assessment Required Pre-Application Prompt Modal */}
      <Modal
        isOpen={isAssessmentPromptOpen}
        onClose={() => setIsAssessmentPromptOpen(false)}
        title="Role Assessment Required"
      >
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-navy">Company Configured Assessment</span>
            {job.assessment?.secureMode && (
              <span className="badge badge-indigo">Safe Exam Browser Mode</span>
            )}
          </div>

          <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', margin: '0 0 0.5rem' }}>
            {job.title} at {job.company}
          </h3>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
            To ensure alignment with the competencies required for this role, {job.company} asks all candidates to complete a tailored assessment before submitting their application.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem',
            background: 'var(--bg-subtle)',
            padding: '1rem',
            borderRadius: '10px',
            border: '1px solid var(--border-light)',
            marginBottom: '1.25rem'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Duration</span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                ⏱ {job.assessment?.duration || 30} Minutes
              </strong>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Questions</span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                📝 {job.assessment?.totalQuestions || 15} Questions
              </strong>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Categories Evaluated</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.25rem' }}>
                {job.assessment?.categories && Object.entries(job.assessment.categories).map(([cat, pct]) => (
                  <span key={cat} className="badge badge-wine" style={{ fontSize: '0.72rem' }}>
                    {cat} ({pct}%)
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', background: 'var(--primary-blue-light)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--info-border)' }}>
            <strong>How it works:</strong> You will complete role-specific questions, receive an immediate <strong>Skill Gap & Role Readiness</strong> report, and then proceed directly to finalize your application with the results attached.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setIsAssessmentPromptOpen(false)}
          >
            Not Now
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setIsAssessmentPromptOpen(false);
              navigate(`/assessment/${job.id}`);
            }}
          >
            Begin Assessment →
          </button>
        </div>
      </Modal>
    </div>
  );
}
