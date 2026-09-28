import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { useApplications } from '../context/ApplicationContext';
import { useToast } from '../components/common/Toast';
import Modal from '../components/common/Modal';

import AssessmentInstructions from '../components/assessment/AssessmentInstructions';
import AssessmentProgress from '../components/assessment/AssessmentProgress';
import AssessmentQuestion from '../components/assessment/AssessmentQuestion';
import QuestionNavigator from '../components/assessment/QuestionNavigator';
import AssessmentResult from '../components/assessment/AssessmentResult';
import CategoryPerformance from '../components/assessment/CategoryPerformance';
import SkillPerformance from '../components/assessment/SkillPerformance';
import AssessmentSkillGap from '../components/assessment/AssessmentSkillGap';
import RoleReadiness from '../components/assessment/RoleReadiness';
import SecureAssessment from '../components/assessment/SecureAssessment';

import { generateAssessmentForJob, evaluateAssessment, createSecurityEvent } from '../utils/assessmentEngine';
import { FiArrowLeft, FiSend, FiCheckCircle, FiEye } from 'react-icons/fi';
import '../styles/assessment.css';

export default function Assessment() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { getJobById } = useJobs();
  const { currentUser } = useAuth();
  const { applyForJob, hasApplied } = useApplications();
  const { addToast } = useToast();

  const job = getJobById(jobId);

  // Assessment session state
  const [assessmentSession, setAssessmentSession] = useState(null);
  const [stage, setStage] = useState('instructions'); // 'instructions' | 'in_progress' | 'completed'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flaggedIds, setFlaggedIds] = useState(new Set());
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [securityEvents, setSecurityEvents] = useState([]);

  // Post-assessment application continuation modal
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [isSubmittingApp, setIsSubmittingApp] = useState(false);
  const [showReviewExplanations, setShowReviewExplanations] = useState(false);

  // Initialize assessment session when job is found
  useEffect(() => {
    if (job) {
      const session = generateAssessmentForJob(job, currentUser);
      setAssessmentSession(session);
    }
  }, [job, currentUser]);

  if (!job) {
    return (
      <div className="assessment-page">
        <div className="assessment-container" style={{ textAlign: 'center', padding: '5rem 0' }}>
          <h2>Position Not Found</h2>
          <p>The job you are attempting to assess does not exist or has been removed.</p>
          <Link to="/jobs" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Back to Jobs Catalog
          </Link>
        </div>
      </div>
    );
  }

  const alreadyApplied = currentUser ? hasApplied(job.id, currentUser.id) : false;

  const handleStartAssessment = () => {
    if (!currentUser) {
      addToast('Please sign in or select candidate view to start the assessment', 'info');
      navigate('/login');
      return;
    }
    setStage('in_progress');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addToast(`Assessment started: ${job.title}`, 'info');
  };

  const handleSelectAnswer = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleToggleFlag = (questionId) => {
    setFlaggedIds(prev => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  const handleNext = () => {
    if (assessmentSession && currentIndex < assessmentSession.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSecurityEvent = (event) => {
    setSecurityEvents(prev => [...prev, event]);
  };

  const handleSubmitAssessment = (isAutoTimeout = false) => {
    if (!assessmentSession) return;

    // Log submit security event
    const submitEvent = createSecurityEvent(isAutoTimeout ? 'assessment_timeout' : 'assessment_submitted', {
      answeredCount: Object.keys(answers).length,
      totalQuestions: assessmentSession.questions.length
    });
    setSecurityEvents(prev => [...prev, submitEvent]);

    const result = evaluateAssessment(
      assessmentSession.questions,
      answers,
      currentUser,
      job
    );

    setEvaluationResult(result);
    setStage('completed');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (isAutoTimeout) {
      addToast('Time reached zero. Your assessment has been automatically submitted.', 'warning');
    } else {
      addToast('Assessment submitted successfully! Reviewing diagnostics...', 'success');
    }

    // Cache to localStorage for demo persistence
    try {
      const existing = JSON.parse(localStorage.getItem('sb_assessments') || '{}');
      existing[`${job.id}_${currentUser?.id || 'guest'}`] = {
        jobId: job.id,
        evaluation: result,
        submittedAt: new Date().toISOString()
      };
      localStorage.setItem('sb_assessments', JSON.stringify(existing));
    } catch (e) {
      console.error('Failed to cache assessment result', e);
    }
  };

  // Continue to finalize job application
  const handleFinalizeApplication = (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setIsSubmittingApp(true);

    setTimeout(() => {
      const applicationPayload = {
        assessmentScore: evaluationResult.assessmentScore,
        roleReadiness: evaluationResult.roleReadiness,
        categoryScores: evaluationResult.categoryScores,
        skillPerformance: evaluationResult.skillPerformance,
        strongSkills: evaluationResult.strongSkills,
        missingSkills: evaluationResult.missingSkills,
        assessmentCompletedDate: new Date().toISOString().split('T')[0]
      };

      const result = applyForJob(
        job,
        currentUser,
        coverNote || `Assessment completed with ${evaluationResult.assessmentScore}% Assessment Score and ${evaluationResult.roleReadiness}% Role Readiness.`,
        applicationPayload
      );

      setIsSubmittingApp(false);
      setIsSubmitModalOpen(false);

      if (result.success) {
        addToast('Application submitted successfully with your verified assessment report!', 'success');
        navigate('/applications');
      } else {
        addToast(result.message || 'Error submitting application', 'error');
      }
    }, 450);
  };

  const currentQuestion = assessmentSession?.questions[currentIndex];
  const answeredCount = Object.keys(answers).filter(k => answers[k] !== undefined && answers[k] !== null).length;

  return (
    <div className="assessment-page">
      <div className="assessment-container">
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '1.25rem' }}>
          <Link
            to={`/jobs/${job.id}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-blue)', fontWeight: 600, fontSize: '0.88rem' }}
          >
            <FiArrowLeft /> Back to {job.title}
          </Link>
        </div>

        {/* =================================================================
           STAGE 1: Instructions & Safe Exam Browser Screen
           ================================================================= */}
        {stage === 'instructions' && assessmentSession && (
          <AssessmentInstructions
            job={job}
            durationMinutes={assessmentSession.durationMinutes}
            totalQuestions={assessmentSession.totalQuestions}
            categoriesConfig={assessmentSession.categoriesConfig}
            difficultyConfig={assessmentSession.difficultyConfig}
            isSecureMode={assessmentSession.secureMode}
            sebRequired={assessmentSession.sebRequired}
            onStart={handleStartAssessment}
          />
        )}

        {/* =================================================================
           STAGE 2: In-Progress Assessment
           ================================================================= */}
        {stage === 'in_progress' && assessmentSession && (
          <SecureAssessment
            enabled={assessmentSession.secureMode}
            sebRequired={assessmentSession.sebRequired}
            onSecurityEvent={handleSecurityEvent}
          >
            <AssessmentProgress
              jobTitle={job.title}
              company={job.company}
              currentCategory={currentQuestion?.category}
              currentIndex={currentIndex}
              totalQuestions={assessmentSession.totalQuestions}
              answeredCount={answeredCount}
              durationMinutes={assessmentSession.durationMinutes}
              onTimeout={() => handleSubmitAssessment(true)}
            />

            <div className="assessment-workspace-layout">
              {/* Question Card */}
              <div className="assessment-main-panel">
                <AssessmentQuestion
                  question={currentQuestion}
                  questionIndex={currentIndex}
                  totalQuestions={assessmentSession.totalQuestions}
                  selectedAnswer={answers[currentQuestion?.id]}
                  isFlagged={flaggedIds.has(currentQuestion?.id)}
                  onSelectAnswer={handleSelectAnswer}
                  onToggleFlag={handleToggleFlag}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onSubmit={() => handleSubmitAssessment(false)}
                  isFirst={currentIndex === 0}
                  isLast={currentIndex === assessmentSession.totalQuestions - 1}
                />
              </div>

              {/* Navigator Palette */}
              <div className="assessment-side-panel">
                <QuestionNavigator
                  questions={assessmentSession.questions}
                  currentIndex={currentIndex}
                  answers={answers}
                  flaggedIds={flaggedIds}
                  onSelectIndex={(idx) => setCurrentIndex(idx)}
                  onSubmit={() => handleSubmitAssessment(false)}
                />
              </div>
            </div>
          </SecureAssessment>
        )}

        {/* =================================================================
           STAGE 3: Results, Diagnostics, & Continue Application
           ================================================================= */}
        {stage === 'completed' && evaluationResult && (
          <div className="assessment-result-layout">
            {/* Executive Result Summary */}
            <AssessmentResult
              assessmentScore={evaluationResult.assessmentScore}
              totalQuestions={evaluationResult.totalQuestions}
              correctCount={evaluationResult.correctCount}
              incorrectCount={evaluationResult.incorrectCount}
              unansweredCount={evaluationResult.unansweredCount}
              completedAt={evaluationResult.completedAt}
              jobTitle={job.title}
              company={job.company}
            />

            {/* Role Readiness Dedicated Component */}
            <RoleReadiness
              profileMatch={evaluationResult.profileMatch}
              assessmentScore={evaluationResult.assessmentScore}
              roleReadiness={evaluationResult.roleReadiness}
              formulaDescription={evaluationResult.roleReadinessFormulaDescription}
              summary={evaluationResult.roleReadinessSummary}
              strongSkills={evaluationResult.strongSkills}
              missingSkills={evaluationResult.missingSkills}
            />

            {/* Two-Column Grid: Category Performance on Left, Skill Performance on Right */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '1.5rem' }}>
              <CategoryPerformance categoryScores={evaluationResult.categoryScores} />
              <SkillPerformance skillPerformance={evaluationResult.skillPerformance} />
            </div>

            {/* Skill Gap Analysis Component */}
            <AssessmentSkillGap
              strongSkills={evaluationResult.strongSkills}
              developingSkills={evaluationResult.developingSkills}
              missingSkills={evaluationResult.missingSkills}
              learningRoadmap={evaluationResult.learningRoadmap}
            />

            {/* Action Bar: Continue Application or Review Questions */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--primary-navy)' }}>
                  Ready to proceed with your application?
                </h3>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  Your verified assessment results and skill profile will be forwarded to the recruiter at {job.company}.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowReviewExplanations(prev => !prev)}
                >
                  <FiEye /> {showReviewExplanations ? 'Hide Explanations' : 'Review Questions & Answers'}
                </button>

                {alreadyApplied ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: 'var(--success-bg)',
                    color: 'var(--text-success)',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.92rem'
                  }}>
                    <FiCheckCircle /> Application Already Submitted
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => setIsSubmitModalOpen(true)}
                  >
                    <FiSend /> Continue Application
                  </button>
                )}
              </div>
            </div>

            {/* Optional Question Review Section with Explanations */}
            {showReviewExplanations && assessmentSession && (
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                marginTop: '1rem'
              }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', marginBottom: '1.25rem' }}>
                  Question by Question Explanations
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {assessmentSession.questions.map((q, idx) => {
                    const candidateAns = answers[q.id];
                    const isCorrect = Number(candidateAns) === Number(q.correctAnswer);
                    const isUnanswered = candidateAns === undefined || candidateAns === null;

                    return (
                      <div
                        key={q.id}
                        style={{
                          padding: '1.25rem',
                          borderRadius: '10px',
                          border: `1px solid ${isCorrect ? 'var(--success-border)' : isUnanswered ? 'var(--border-medium)' : 'var(--danger-border)'}`,
                          backgroundColor: isCorrect ? 'var(--success-bg)' : isUnanswered ? 'var(--bg-subtle)' : 'var(--danger-bg)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                          <strong style={{ fontSize: '0.95rem' }}>Question {idx + 1} ({q.topic})</strong>
                          <span style={{
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: isCorrect ? 'var(--success)' : isUnanswered ? 'var(--text-muted)' : 'var(--danger)'
                          }}>
                            {isCorrect ? '✓ Correct' : isUnanswered ? '? Unanswered' : '✗ Incorrect'}
                          </span>
                        </div>
                        <p style={{ margin: '0 0 0.5rem', fontSize: '0.92rem', color: 'var(--text-primary)' }}>{q.question}</p>
                        <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                          <strong>Your Answer:</strong> {isUnanswered ? 'None' : q.options[candidateAns]}
                          {!isCorrect && (
                            <span style={{ display: 'block', color: 'var(--success)', marginTop: '0.2rem' }}>
                              <strong>Correct Answer:</strong> {q.options[q.correctAnswer]}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic', background: 'var(--bg-subtle)', padding: '0.5rem', borderRadius: '6px' }}>
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Finalize Application Submission Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title={`Complete Application for ${job.title}`}
      >
        <form onSubmit={handleFinalizeApplication}>
          <div style={{
            background: 'var(--bg-subtle)',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1.25rem',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Applicant:</span>
              <span className="badge badge-navy">{currentUser?.name || 'Alex Chen'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Assessment Score:</span>
              <strong style={{ color: 'var(--success)' }}>{evaluationResult?.assessmentScore}%</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Role Readiness:</span>
              <strong style={{ color: 'var(--primary-blue)' }}>{evaluationResult?.roleReadiness}%</strong>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="coverNote" style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.88rem', fontWeight: 600 }}>
              Optional Note to Hiring Team:
            </label>
            <textarea
              id="coverNote"
              rows="4"
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              placeholder="Highlight any relevant projects or thoughts on your assessment results..."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsSubmitModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmittingApp}
            >
              {isSubmittingApp ? 'Submitting Application...' : 'Confirm & Submit to Recruiter'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
