import { MERGED_QUESTION_BANK } from '../data/allQuestions';

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Shuffles the options of a question and correctly updates the correctAnswer index.
 */
function shuffleQuestionOptions(question) {
  const originalOptions = question.options;
  const originalCorrect = question.correctAnswer;
  const correctText = originalOptions[originalCorrect];

  const shuffledOptions = shuffleArray(originalOptions);
  const newCorrectIndex = shuffledOptions.indexOf(correctText);

  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectIndex
  };
}

/**
 * Selects and tailors questions for a job based on:
 * - Categories distribution percentages (technical, quantitative, logical, coding, domain)
 * - Difficulty distribution (easy, medium, hard)
 * - Job required skills relevance
 * - Target totalQuestions count
 */
export function selectQuestions(assessmentConfig = {}, questionBank = MERGED_QUESTION_BANK, job = {}) {
  const totalTarget = assessmentConfig.totalQuestions || 15;
  const categoriesConfig = assessmentConfig.categories || {
    technical: 40,
    quantitative: 25,
    logical: 20,
    coding: 15
  };
  const difficultyConfig = assessmentConfig.difficulty || {
    easy: 30,
    medium: 50,
    hard: 20
  };

  const jobSkills = (job.requiredSkills || []).map(s => s.toLowerCase());

  // Calculate quota for each category
  const categoryQuotas = {};
  let allocated = 0;
  const catKeys = Object.keys(categoriesConfig);

  catKeys.forEach((cat, idx) => {
    if (idx === catKeys.length - 1) {
      categoryQuotas[cat] = Math.max(1, totalTarget - allocated);
    } else {
      const quota = Math.max(1, Math.round((categoriesConfig[cat] / 100) * totalTarget));
      categoryQuotas[cat] = quota;
      allocated += quota;
    }
  });

  const selectedQuestions = [];
  const usedQuestionIds = new Set();

  // Branch-aware relevance: job skills + same-branch domain questions rank first.
  // This makes assessments adapt to the candidate's engineering branch/role.
  const jobBranch = (job.branch || '').toLowerCase();
  const getSkillRelevance = (q) => {
    if (!q.skills || q.skills.length === 0) return 0;
    return q.skills.filter(s => jobSkills.includes(s.toLowerCase())).length;
  };
  const getBranchBoost = (q) => {
    if (!jobBranch) return 0;
    if ((q.branch || '').toLowerCase() === jobBranch) return 10;
    return 0;
  };

  // Select questions per category respecting difficulty and skill relevance
  Object.entries(categoryQuotas).forEach(([category, count]) => {
    let pool = questionBank.filter(
      q => q.category.toLowerCase() === category.toLowerCase() && !usedQuestionIds.has(q.id)
    );

    if (pool.length === 0) {
      // Fallback to any unused question if pool is empty
      pool = questionBank.filter(q => !usedQuestionIds.has(q.id));
    }

    // Sort pool by branch match, then skill relevance, then randomize ties
    pool.sort((a, b) => {
      const branchDiff = getBranchBoost(b) - getBranchBoost(a);
      if (branchDiff !== 0) return branchDiff;
      const diff = getSkillRelevance(b) - getSkillRelevance(a);
      if (diff !== 0) return diff;
      return 0.5 - Math.random();
    });

    // Try to balance difficulties
    const easyPool = pool.filter(q => q.difficulty === 'easy');
    const medPool = pool.filter(q => q.difficulty === 'medium');
    const hardPool = pool.filter(q => q.difficulty === 'hard');

    const targetEasy = Math.round((difficultyConfig.easy / 100) * count);
    const targetHard = Math.round((difficultyConfig.hard / 100) * count);
    const targetMed = count - targetEasy - targetHard;

    const catSelected = [];

    const pickFrom = (subPool, targetCount) => {
      for (const q of subPool) {
        if (catSelected.length >= count) break;
        if (!usedQuestionIds.has(q.id)) {
          catSelected.push(q);
          usedQuestionIds.add(q.id);
          if (catSelected.length >= targetCount) break;
        }
      }
    };

    pickFrom(medPool, targetMed);
    pickFrom(easyPool, targetMed + targetEasy);
    pickFrom(hardPool, count);

    // If still need more to fill category quota, take from remaining
    for (const q of pool) {
      if (catSelected.length >= count) break;
      if (!usedQuestionIds.has(q.id)) {
        catSelected.push(q);
        usedQuestionIds.add(q.id);
      }
    }

    selectedQuestions.push(...catSelected);
  });

  // If still below totalTarget due to small category pool, fill from remaining question bank
  if (selectedQuestions.length < totalTarget) {
    const remaining = questionBank.filter(q => !usedQuestionIds.has(q.id));
    shuffleArray(remaining);
    for (const q of remaining) {
      if (selectedQuestions.length >= totalTarget) break;
      selectedQuestions.push(q);
      usedQuestionIds.add(q.id);
    }
  }

  // Shuffle question presentation order & shuffle options
  const finalQuestions = shuffleArray(selectedQuestions.slice(0, totalTarget)).map(shuffleQuestionOptions);

  return finalQuestions;
}
