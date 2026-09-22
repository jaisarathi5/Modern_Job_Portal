import { normalizeSkill } from './jobMatcher';

/**
 * Knowledge base of student-friendly learning paths for missing skills
 */
const SKILL_RECOMMENDATIONS = {
  'typescript': {
    skill: 'TypeScript',
    category: 'Language',
    action: 'Learn static typing, interfaces, types, and generics to build robust React codebases.',
    estimatedHours: '10-15 hrs',
    freeResource: 'TypeScript Official Handbook & ExecuteProgram'
  },
  'testing': {
    skill: 'Testing (Jest / RTL)',
    category: 'Quality Assurance',
    action: 'Master unit testing with Jest and component integration tests with React Testing Library.',
    estimatedHours: '8-12 hrs',
    freeResource: 'Testing JavaScript by Kent C. Dodds (Free guides)'
  },
  'jest': {
    skill: 'Jest',
    category: 'Testing',
    action: 'Practice mocking functions, snapshot tests, and asynchronous testing.',
    estimatedHours: '6-8 hrs',
    freeResource: 'Jest Documentation Tutorials'
  },
  'git': {
    skill: 'Git & GitHub',
    category: 'Version Control',
    action: 'Learn branching strategies, pull requests, cherry-picking, and rebasing for team projects.',
    estimatedHours: '4-6 hrs',
    freeResource: 'Git Immersion & Learn Git Branching'
  },
  'docker': {
    skill: 'Docker',
    category: 'DevOps & Deployment',
    action: 'Understand containers, Dockerfiles, and multi-container setups with docker-compose.',
    estimatedHours: '8-10 hrs',
    freeResource: 'Docker Getting Started Official Guide'
  },
  'rest api': {
    skill: 'RESTful APIs',
    category: 'Backend / Networking',
    action: 'Understand HTTP methods (GET, POST, PUT, DELETE), status codes, CORS, and Axios/Fetch.',
    estimatedHours: '5-8 hrs',
    freeResource: 'MDN Web Docs on HTTP & REST APIs'
  },
  'sql': {
    skill: 'SQL & Relational DBs',
    category: 'Database',
    action: 'Master INNER/LEFT JOINs, subqueries, grouping, aggregation, and index optimization.',
    estimatedHours: '10-12 hrs',
    freeResource: 'SQLBolt & Mode Analytics SQL Tutorial'
  },
  'postgresql': {
    skill: 'PostgreSQL',
    category: 'Database',
    action: 'Learn schema design, constraints, foreign keys, and querying in PostgreSQL.',
    estimatedHours: '8-10 hrs',
    freeResource: 'Postgres Guide'
  },
  'mongodb': {
    skill: 'MongoDB',
    category: 'Database',
    action: 'Understand document modeling, Mongoose schemas, and aggregation pipelines.',
    estimatedHours: '6-8 hrs',
    freeResource: 'MongoDB University (Free)'
  },
  'node.js': {
    skill: 'Node.js & Express',
    category: 'Backend',
    action: 'Build server-side REST APIs with Express middleware, authentication, and routing.',
    estimatedHours: '12-16 hrs',
    freeResource: 'NodeSchool & FreeCodeCamp Backend Path'
  },
  'python': {
    skill: 'Python',
    category: 'Language',
    action: 'Master data structures, OOP, file handling, and virtual environments.',
    estimatedHours: '12-15 hrs',
    freeResource: 'Automate the Boring Stuff with Python'
  },
  'redux': {
    skill: 'Redux Toolkit / Zustand',
    category: 'State Management',
    action: 'Understand global store slices, selectors, and async thunks for state management.',
    estimatedHours: '6-8 hrs',
    freeResource: 'Redux Essentials Official Tutorial'
  },
  'figma': {
    skill: 'Figma & UI Design',
    category: 'Design',
    action: 'Practice auto-layout, component variants, wireframing, and responsive design systems.',
    estimatedHours: '6-10 hrs',
    freeResource: 'Figma 101 Official YouTube Course'
  },
  'tailwind css': {
    skill: 'Tailwind CSS',
    category: 'Styling',
    action: 'Learn utility-first styling, responsive breakpoints, and dark mode configuration.',
    estimatedHours: '4-6 hrs',
    freeResource: 'Tailwind Labs Official Docs'
  },
  'aws': {
    skill: 'AWS Cloud Basics',
    category: 'Cloud',
    action: 'Familiarize with S3 bucket hosting, EC2 instances, and Lambda serverless functions.',
    estimatedHours: '10-15 hrs',
    freeResource: 'AWS Skill Builder Cloud Practitioner'
  },
  'machine learning': {
    skill: 'Machine Learning Basics',
    category: 'AI / Data Science',
    action: 'Learn Scikit-Learn regression, classification, cross-validation, and feature scaling.',
    estimatedHours: '15-20 hrs',
    freeResource: 'Kaggle Learn Micro-courses'
  }
};

/**
 * Generate student-focused skill gap analysis and advice
 */
export function generateSkillGapAnalysis(missingSkills = []) {
  if (!missingSkills || missingSkills.length === 0) {
    return {
      status: 'ready',
      summary: 'You have all the required core skills for this role! You are a strong candidate.',
      recommendations: []
    };
  }

  const recommendations = missingSkills.map(skill => {
    const norm = normalizeSkill(skill);
    // Find matching recommendation in our knowledge base
    const matchedKey = Object.keys(SKILL_RECOMMENDATIONS).find(k => 
      norm.includes(k) || k.includes(norm)
    );

    if (matchedKey) {
      return SKILL_RECOMMENDATIONS[matchedKey];
    }

    // Default fallback rule-based recommendation
    return {
      skill: skill,
      category: 'General Technical Skill',
      action: `Build a mini project or complete documentation tutorials covering fundamental ${skill} workflows.`,
      estimatedHours: '6-10 hrs',
      freeResource: `Official ${skill} Documentation & GitHub Examples`
    };
  });

  return {
    status: 'gap_detected',
    summary: `To increase your match rate from this role, prioritize learning ${recommendations.slice(0, 2).map(r => r.skill).join(' and ')}.`,
    recommendations
  };
}
