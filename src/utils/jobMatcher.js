/**
 * Normalize skill name for consistent comparison (e.g. "React.js" -> "react", "NodeJS" -> "node.js")
 */
export function normalizeSkill(skill) {
  if (!skill) return '';
  const cleaned = skill.trim().toLowerCase();
  const aliases = {
    'reactjs': 'react',
    'react.js': 'react',
    'js': 'javascript',
    'ts': 'typescript',
    'node': 'node.js',
    'nodejs': 'node.js',
    'expressjs': 'express',
    'express.js': 'express',
    'vuejs': 'vue',
    'vue.js': 'vue',
    'postgres': 'postgresql',
    'mongo': 'mongodb',
    'golang': 'go',
    'ui/ux': 'ui/ux design',
    'ui ux': 'ui/ux design',
    'figma design': 'figma',
    'rest': 'rest api',
    'restful api': 'rest api',
    'restful apis': 'rest api',
    'apis': 'rest api',
    'tailwind': 'tailwind css',
    'styled-components': 'css'
  };
  return aliases[cleaned] || cleaned;
}

/**
 * Calculate match metrics between a user's skills and a job's requirements.
 * Returns { matchPercentage, matchingSkills, missingSkills, preferredMatched, matchLevel }
 */
export function calculateJobMatch(userSkills = [], job = {}) {
  const normalizedUserSkills = (userSkills || []).map(normalizeSkill);
  const requiredSkills = job.requiredSkills || [];
  const preferredSkills = job.preferredSkills || [];

  if (requiredSkills.length === 0) {
    return {
      matchPercentage: 100,
      matchingSkills: [],
      missingSkills: [],
      preferredMatched: [],
      matchLevel: 'high',
      totalRequired: 0,
      matchedCount: 0
    };
  }

  // Find exact/normalized matches in required skills
  const matchingSkills = [];
  const missingSkills = [];

  requiredSkills.forEach(reqSkill => {
    const normReq = normalizeSkill(reqSkill);
    const hasSkill = normalizedUserSkills.includes(normReq);
    if (hasSkill) {
      matchingSkills.push(reqSkill);
    } else {
      missingSkills.push(reqSkill);
    }
  });

  // Find matches in preferred skills
  const preferredMatched = [];
  preferredSkills.forEach(prefSkill => {
    const normPref = normalizeSkill(prefSkill);
    if (normalizedUserSkills.includes(normPref)) {
      preferredMatched.push(prefSkill);
    }
  });

  // Calculate Weighted Percentage:
  // 85% weight on required skills + 15% bonus on preferred skills
  const requiredRatio = matchingSkills.length / requiredSkills.length;
  const preferredRatio = preferredSkills.length > 0 
    ? (preferredMatched.length / preferredSkills.length) 
    : 0;

  let score = preferredSkills.length > 0
    ? Math.round((requiredRatio * 85) + (preferredRatio * 15))
    : Math.round(requiredRatio * 100);

  // Cap between 0 and 100
  score = Math.max(0, Math.min(100, score));

  let matchLevel = 'low';
  if (score >= 75) {
    matchLevel = 'high';
  } else if (score >= 45) {
    matchLevel = 'medium';
  }

  return {
    matchPercentage: score,
    matchingSkills,
    missingSkills,
    preferredMatched,
    matchLevel,
    totalRequired: requiredSkills.length,
    matchedCount: matchingSkills.length
  };
}

/**
 * Sort a list of jobs based on highest match score for a user
 */
export function sortJobsByMatch(jobs = [], userSkills = []) {
  return [...jobs].map(job => ({
    ...job,
    matchData: calculateJobMatch(userSkills, job)
  })).sort((a, b) => b.matchData.matchPercentage - a.matchData.matchPercentage);
}
