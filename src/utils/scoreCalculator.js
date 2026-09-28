/**
 * Score Calculator for Job-Specific Assessment Engine.
 * Computes overall score, category breakdown, skill-level performance, and difficulty breakdown.
 */

/**
 * Calculate overall assessment performance metrics.
 * @param {Array} questions - Array of question objects
 * @param {Object} answers - Map of questionId -> selectedOptionIndex
 */
export function calculateScore(questions = [], answers = {}) {
  const totalQuestions = questions.length;
  if (totalQuestions === 0) {
    return {
      totalQuestions: 0,
      correctCount: 0,
      incorrectCount: 0,
      unansweredCount: 0,
      scorePercentage: 0,
      answeredCount: 0
    };
  }

  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  questions.forEach(q => {
    const selectedAnswer = answers[q.id];
    if (selectedAnswer === undefined || selectedAnswer === null) {
      unansweredCount++;
    } else if (Number(selectedAnswer) === Number(q.correctAnswer)) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  return {
    totalQuestions,
    correctCount,
    incorrectCount,
    unansweredCount,
    answeredCount: correctCount + incorrectCount,
    scorePercentage
  };
}

/**
 * Calculate category-wise breakdown (Technical, Quantitative, Logical, Coding, Domain)
 */
export function calculateCategoryScores(questions = [], answers = {}) {
  const categoryMap = {};

  const categoryLabels = {
    technical: 'Technical Core',
    quantitative: 'Quantitative Aptitude',
    logical: 'Logical Reasoning',
    coding: 'Coding & Analysis',
    domain: 'Domain Specialization'
  };

  questions.forEach(q => {
    const catKey = (q.category || 'technical').toLowerCase();
    if (!categoryMap[catKey]) {
      categoryMap[catKey] = {
        category: catKey,
        label: categoryLabels[catKey] || catKey.charAt(0).toUpperCase() + catKey.slice(1),
        total: 0,
        correct: 0,
        incorrect: 0,
        unanswered: 0,
        percentage: 0
      };
    }

    categoryMap[catKey].total++;
    const selectedAnswer = answers[q.id];
    if (selectedAnswer === undefined || selectedAnswer === null) {
      categoryMap[catKey].unanswered++;
    } else if (Number(selectedAnswer) === Number(q.correctAnswer)) {
      categoryMap[catKey].correct++;
    } else {
      categoryMap[catKey].incorrect++;
    }
  });

  // Calculate percentages
  Object.values(categoryMap).forEach(cat => {
    cat.percentage = cat.total > 0 ? Math.round((cat.correct / cat.total) * 100) : 0;
  });

  return categoryMap;
}

/**
 * Calculate skill-level performance mapping questions to their tagged skills.
 */
export function calculateSkillPerformance(questions = [], answers = {}) {
  const skillMap = {};

  questions.forEach(q => {
    const skills = q.skills || [q.topic || 'General'];
    const isCorrect = Number(answers[q.id]) === Number(q.correctAnswer);
    const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null;

    skills.forEach(skill => {
      if (!skillMap[skill]) {
        skillMap[skill] = {
          skill,
          total: 0,
          correct: 0,
          attempted: 0,
          percentage: 0
        };
      }
      skillMap[skill].total++;
      if (isAnswered) skillMap[skill].attempted++;
      if (isCorrect) skillMap[skill].correct++;
    });
  });

  Object.values(skillMap).forEach(item => {
    item.percentage = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
  });

  return skillMap;
}

/**
 * Calculate performance across difficulty levels (Easy, Medium, Hard)
 */
export function calculateDifficultyPerformance(questions = [], answers = {}) {
  const diffMap = {
    easy: { total: 0, correct: 0, percentage: 0 },
    medium: { total: 0, correct: 0, percentage: 0 },
    hard: { total: 0, correct: 0, percentage: 0 }
  };

  questions.forEach(q => {
    const diff = (q.difficulty || 'medium').toLowerCase();
    if (!diffMap[diff]) diffMap[diff] = { total: 0, correct: 0, percentage: 0 };
    diffMap[diff].total++;
    if (Number(answers[q.id]) === Number(q.correctAnswer)) {
      diffMap[diff].correct++;
    }
  });

  Object.values(diffMap).forEach(d => {
    d.percentage = d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
  });

  return diffMap;
}
