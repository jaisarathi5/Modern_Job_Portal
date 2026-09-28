/**
 * Job-Specific Assessment Templates and Configurations.
 * Defines customized skill configurations, category percentages, duration, and difficulty distributions.
 */

export const ASSESSMENT_DIFFICULTY_PRESETS = {
  internship: {
    label: 'Internship / Fresher (College Entry)',
    difficulty: { easy: 40, medium: 50, hard: 10 }
  },
  entryLevel: {
    label: 'Entry-Level / Graduate (0-2 Yrs)',
    difficulty: { easy: 20, medium: 50, hard: 30 }
  },
  advanced: {
    label: 'Mid-Senior / Advanced Engineer',
    difficulty: { easy: 10, medium: 40, hard: 50 }
  }
};

export const DEFAULT_ROLE_ASSESSMENTS = {
  'Frontend Developer': {
    enabled: true,
    duration: 25,
    totalQuestions: 15,
    categories: {
      technical: 40,
      quantitative: 20,
      logical: 20,
      coding: 20
    },
    difficulty: {
      easy: 30,
      medium: 50,
      hard: 20
    },
    targetSkills: ['JavaScript', 'React', 'HTML', 'CSS', 'Git'],
    secureMode: false,
    sebRequired: false
  },
  'Full Stack Developer': {
    enabled: true,
    duration: 30,
    totalQuestions: 20,
    categories: {
      technical: 35,
      quantitative: 20,
      logical: 15,
      coding: 30
    },
    difficulty: {
      easy: 20,
      medium: 50,
      hard: 30
    },
    targetSkills: ['React', 'JavaScript', 'Node.js', 'SQL', 'Git'],
    secureMode: true,
    sebRequired: true
  },
  'AI/ML Intern': {
    enabled: true,
    duration: 20,
    totalQuestions: 15,
    categories: {
      technical: 40,
      quantitative: 30,
      logical: 15,
      coding: 15
    },
    difficulty: {
      easy: 40,
      medium: 50,
      hard: 10
    },
    targetSkills: ['Python', 'Machine Learning', 'Data Structures', 'Statistics'],
    secureMode: false,
    sebRequired: false
  },
  'Data Analyst': {
    enabled: true,
    duration: 25,
    totalQuestions: 15,
    categories: {
      technical: 30,
      quantitative: 35,
      logical: 20,
      coding: 15
    },
    difficulty: {
      easy: 30,
      medium: 50,
      hard: 20
    },
    targetSkills: ['SQL', 'Python', 'Statistics', 'Pandas'],
    secureMode: false,
    sebRequired: false
  },
  'Java Developer': {
    enabled: true,
    duration: 30,
    totalQuestions: 20,
    categories: {
      technical: 45,
      quantitative: 20,
      logical: 15,
      coding: 20
    },
    difficulty: {
      easy: 20,
      medium: 50,
      hard: 30
    },
    targetSkills: ['Java', 'SQL', 'Data Structures', 'OOP'],
    secureMode: false,
    sebRequired: false
  },
  'Backend Developer': {
    enabled: true,
    duration: 30,
    totalQuestions: 20,
    categories: {
      technical: 40,
      quantitative: 20,
      logical: 15,
      coding: 25
    },
    difficulty: {
      easy: 20,
      medium: 50,
      hard: 30
    },
    targetSkills: ['Java', 'SQL', 'REST API', 'Git'],
    secureMode: false,
    sebRequired: false
  }
};
