import React, { useState, useMemo } from 'react';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { analyzeResumeText, COMMON_SKILLS_DICTIONARY } from '../utils/resumeParser';
import MatchScore from '../components/jobs/MatchScore';
import SkillBadge from '../components/jobs/SkillBadge';
import { FiCheckCircle, FiAlertTriangle, FiLayers } from 'react-icons/fi';
import '../styles/resume-analyzer.css';

export default function ResumeAnalyzer() {
  const { jobs } = useJobs();
  const { currentUser } = useAuth();

  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || '');
  const [resumeText, setResumeText] = useState(currentUser?.resumeText || '');

  const selectedJob = jobs.find(j => String(j.id) === String(selectedJobId)) || jobs[0];

  const targetSkills = useMemo(() => {
    return selectedJob ? selectedJob.requiredSkills : ['React', 'JavaScript', 'HTML', 'CSS'];
  }, [selectedJob]);

  const analysis = useMemo(() => {
    return analyzeResumeText(resumeText, targetSkills);
  }, [resumeText, targetSkills]);

  const handleLoadSampleResume = () => {
    if (currentUser?.resumeText) {
      setResumeText(currentUser.resumeText);
    } else {
      setResumeText(`Alex Chen
Bangalore, India | alex.chen@university.edu
Computer Science & Engineering graduate with experience in React, JavaScript, HTML, CSS, SQL, and Git.`);
    }
  };

  const handleClear = () => {
    setResumeText('');
  };

  return (
    <div className="resume-analyzer-page">
      <div className="container">
        {/* Header */}
        <div className="page-header" style={{ marginBottom: '2rem' }}>
          <span className="badge badge-wine" style={{ marginBottom: '0.4rem' }}>
            Frontend Rule Engine
          </span>
          <h1 style={{ marginBottom: '0.5rem' }}>
            Resume Keyword Matcher
          </h1>
          <p>
            Paste your plaintext resume to extract technical keywords and measure keyword compatibility
            against any position without uploading files to external third-party AI APIs.
          </p>
        </div>

        <div className="resume-layout">
          {/* Left Column: Input text & Job Target Selector */}
          <div className="resume-card">
            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="target-job" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                <FiLayers style={{ color: 'var(--muted-rose)' }} /> Compare Against Job Role:
              </label>
              <select
                id="target-job"
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                style={{ marginTop: '0.35rem' }}
              >
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>
                    {job.title} — {job.company}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Job Skills Preview */}
            <div style={{
              background: 'var(--bg-subtle)',
              padding: '0.85rem 1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              marginBottom: '1.25rem'
            }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                Required Skills for this Role ({targetSkills.length}):
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {targetSkills.map(skill => (
                  <SkillBadge key={skill} skill={skill} status="neutral" />
                ))}
              </div>
            </div>

            {/* Resume Text Area */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label style={{ margin: 0, fontWeight: 600 }}>
                  Resume Plaintext:
                </label>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button
                    type="button"
                    onClick={handleLoadSampleResume}
                    style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', fontSize: '0.78rem', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Load Sample Resume
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.78rem', cursor: 'pointer' }}
                  >
                    Clear
                  </button>
                </div>
              </div>

              <textarea
                rows="14"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the text of your resume or CV here..."
                style={{ fontFamily: 'monospace', fontSize: '0.86rem', lineHeight: '1.5' }}
              />
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Word count: {analysis.totalWords} words</span>
              <span>100% Client-Side Privacy Guaranteed</span>
            </div>
          </div>

          {/* Right Column: Match Results & Diagnostics */}
          <div className="resume-card">
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', marginBottom: '1.25rem' }}>
              Keyword Analysis Results
            </h3>

            {/* Score Box */}
            <div className="resume-score-card">
              {currentUser ? (
                <>
                  <MatchScore percentage={analysis.keywordMatchScore} size="lg" />
                  <div style={{ marginTop: '0.75rem', fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary-navy)' }}>
                    {analysis.keywordMatchScore}% Keyword Alignment
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0' }}>
                    Found <strong>{analysis.skillsFound.length}</strong> of <strong>{targetSkills.length}</strong> target skills in resume text.
                  </p>
                </>
              ) : (
                <>
                  <MatchScore percentage={0} size="lg" />
                  <div style={{ marginTop: '0.75rem', fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary-navy)' }}>
                    Sign in to see your results
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0' }}>
                    Keyword alignment is scored against your profile. Create a free account to see your score and skill gaps.
                  </p>
                </>
              )}
            </div>

            {/* Everything below the score is a personal result too. */}
            {currentUser && (
              <>
            {/* Readiness Advice */}
            <div style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: '10px',
              padding: '1rem',
              marginBottom: '1.5rem',
              fontSize: '0.88rem',
              color: 'var(--primary-navy)'
            }}>
              <strong>Recruiter Insight:</strong> {analysis.readinessMessage}
            </div>

            {/* Skills Found */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-success)', marginBottom: '0.5rem' }}>
                <FiCheckCircle />
                <h4 style={{ margin: 0, fontSize: '0.98rem', color: 'var(--text-success)' }}>
                  Skills Found in Resume ({analysis.skillsFound.length})
                </h4>
              </div>
              {analysis.skillsFound.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {analysis.skillsFound.map(skill => (
                    <SkillBadge key={skill} skill={skill} status="matched" />
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  None of the target skills were detected in the pasted text.
                </p>
              )}
            </div>

            {/* Skills Missing */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-warning)', marginBottom: '0.5rem' }}>
                <FiAlertTriangle />
                <h4 style={{ margin: 0, fontSize: '0.98rem', color: 'var(--text-warning)' }}>
                  Skills Missing from Resume ({analysis.skillsMissing.length})
                </h4>
              </div>
              {analysis.skillsMissing.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {analysis.skillsMissing.map(skill => (
                    <SkillBadge key={skill} skill={skill} status="missing" />
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.84rem', color: 'var(--text-success)', fontWeight: 600 }}>
                  🎉 All required keywords are present in your resume!
                </p>
              )}
            </div>

            {/* All Extracted Skills */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                All Technical Keywords Extracted ({analysis.extractedSkills.length}):
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {analysis.extractedSkills.map(skill => (
                  <span key={skill} className="badge badge-rose" style={{ fontSize: '0.74rem' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
