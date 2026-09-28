import { selectQuestions } from './questionSelector';
import { calculateScore, calculateCategoryScores, calculateSkillPerformance, calculateDifficultyPerformance } from './scoreCalculator';
import { calculateSkillGaps, calculateProfileMatch, calculateRoleReadiness } from './skillAnalyzer';
import { MERGED_QUESTION_BANK } from '../data/allQuestions';

/**
 * Initializes a new assessment session tailored to the specific job and candidate.
 */
export function generateAssessmentForJob(job, user, customQuestionBank = MERGED_QUESTION_BANK) {
  if (!job) return null;

  const assessmentConfig = job.assessment || {
    enabled: true,
    duration: 30,
    totalQuestions: 15,
    categories: {
      technical: 40,
      quantitative: 25,
      logical: 20,
      coding: 15
    },
    difficulty: {
      easy: 30,
      medium: 50,
      hard: 20
    }
  };

  const selectedQuestions = selectQuestions(assessmentConfig, customQuestionBank, job);

  return {
    assessmentId: `asmt-${job.id}-${Date.now()}`,
    jobId: job.id,
    jobTitle: job.title,
    company: job.company,
    durationMinutes: assessmentConfig.duration || 30,
    totalQuestions: selectedQuestions.length,
    categoriesConfig: assessmentConfig.categories,
    difficultyConfig: assessmentConfig.difficulty,
    secureMode: Boolean(assessmentConfig.secureMode || assessmentConfig.sebRequired),
    sebRequired: Boolean(assessmentConfig.sebRequired),
    questions: selectedQuestions,
    startedAt: new Date().toISOString()
  };
}

/**
 * Evaluates submitted assessment answers and produces complete analytical report.
 */
export function evaluateAssessment(questions = [], answers = {}, user = {}, job = {}) {
  // 1. Overall test scores
  const scoreResult = calculateScore(questions, answers);

  // 2. Category-wise breakdown
  const categoryScores = calculateCategoryScores(questions, answers);

  // 3. Skill-level performance
  const skillPerformance = calculateSkillPerformance(questions, answers);

  // 4. Difficulty level breakdown
  const difficultyPerformance = calculateDifficultyPerformance(questions, answers);

  // 5. Profile Match (candidate profile skills vs job required skills)
  const userSkills = user?.skills || [];
  const profileMatchResult = calculateProfileMatch(userSkills, job);

  // 6. Role Readiness combining Profile Match and Assessment Score
  const roleReadinessResult = calculateRoleReadiness(
    profileMatchResult.profileMatchPercentage,
    scoreResult.scorePercentage
  );

  // 7. Skill Gap Analysis (Strong, Developing, Missing)
  const skillGapsResult = calculateSkillGaps(
    userSkills,
    job.requiredSkills || [],
    skillPerformance
  );

  return {
    assessmentScore: scoreResult.scorePercentage,
    totalQuestions: scoreResult.totalQuestions,
    correctCount: scoreResult.correctCount,
    incorrectCount: scoreResult.incorrectCount,
    unansweredCount: scoreResult.unansweredCount,
    categoryScores,
    skillPerformance,
    difficultyPerformance,
    profileMatch: profileMatchResult.profileMatchPercentage,
    roleReadiness: roleReadinessResult.roleReadiness,
    roleReadinessSummary: roleReadinessResult.summary,
    roleReadinessFormula: roleReadinessResult.formula,
    roleReadinessFormulaDescription: roleReadinessResult.formulaDescription,
    strongSkills: skillGapsResult.strongSkills,
    developingSkills: skillGapsResult.developingSkills,
    missingSkills: skillGapsResult.missingSkills,
    learningRoadmap: skillGapsResult.learningRoadmap,
    completedAt: new Date().toISOString()
  };
}

/**
 * Creates a formatted security audit log entry.
 */
export function createSecurityEvent(eventType, details = {}) {
  return {
    id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    event: eventType,
    timestamp: new Date().toISOString(),
    details
  };
}
