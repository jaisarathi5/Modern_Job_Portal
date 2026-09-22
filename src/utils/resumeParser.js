import { normalizeSkill } from './jobMatcher';

/**
 * Common technical and professional skills recognized in resumes
 */
export const COMMON_SKILLS_DICTIONARY = [
  'React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Node.js', 'Express',
  'Python', 'Java', 'C++', 'C#', 'SQL', 'PostgreSQL', 'MySQL', 'MongoDB',
  'Git', 'GitHub', 'Docker', 'AWS', 'REST API', 'GraphQL', 'Redux', 'Zustand',
  'Tailwind CSS', 'Figma', 'UI/UX Design', 'Linux', 'Jest', 'Cypress',
  'Next.js', 'Spring Boot', 'Django', 'Flask', 'Pandas', 'NumPy',
  'Machine Learning', 'TensorFlow', 'Data Structures', 'Algorithms',
  'Agile', 'Scrum', 'CI/CD'
];

/**
 * Rule-based resume text parser that extracts technical skills and matches against a job's requirements
 */
export function analyzeResumeText(resumeText = '', targetJobSkills = []) {
  if (!resumeText.trim()) {
    return {
      extractedSkills: [],
      skillsFound: [],
      skillsMissing: targetJobSkills,
      keywordMatchScore: 0,
      totalWords: 0,
      readinessMessage: 'Please paste or upload your resume text to begin analysis.'
    };
  }

  const lowerText = resumeText.toLowerCase();
  const words = resumeText.trim().split(/\s+/);

  // Extract any recognized skills from the resume text
  const extractedSkills = [];
  COMMON_SKILLS_DICTIONARY.forEach(skill => {
    const norm = normalizeSkill(skill);
    // Word boundary or substring regex to avoid accidental sub-matches
    const regex = new RegExp(`\\b${norm.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
    if (regex.test(lowerText) || lowerText.includes(norm)) {
      if (!extractedSkills.includes(skill)) {
        extractedSkills.push(skill);
      }
    }
  });

  // If a target job skills list is provided, evaluate match
  const normalizedExtracted = extractedSkills.map(normalizeSkill);
  const skillsFound = [];
  const skillsMissing = [];

  targetJobSkills.forEach(reqSkill => {
    const normReq = normalizeSkill(reqSkill);
    const found = normalizedExtracted.some(s => s === normReq || lowerText.includes(normReq));
    if (found) {
      skillsFound.push(reqSkill);
    } else {
      skillsMissing.push(reqSkill);
    }
  });

  const matchRatio = targetJobSkills.length > 0 
    ? (skillsFound.length / targetJobSkills.length)
    : (extractedSkills.length > 0 ? 1 : 0);

  const keywordMatchScore = Math.round(matchRatio * 100);

  let readinessMessage = 'Good foundation. Consider adding missing keywords relevant to this role.';
  if (keywordMatchScore >= 80) {
    readinessMessage = 'Excellent resume alignment! Your resume clearly highlights the primary keywords this role requires.';
  } else if (keywordMatchScore < 40) {
    readinessMessage = 'Noticeable skill gap detected. Tailor your resume summary and projects to reflect the required technologies.';
  }

  return {
    extractedSkills,
    skillsFound,
    skillsMissing,
    keywordMatchScore,
    totalWords: words.length,
    readinessMessage
  };
}
