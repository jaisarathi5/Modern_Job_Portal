import { normalizeSkill, calculateJobMatch } from './jobMatcher';
import { generateSkillGapAnalysis } from './skillGap';

/**
 * Categorize skills into Strong, Developing, and Skill Gaps based on:
 * - Job requirements
 * - User profile skills
 * - Assessment performance
 */
export function calculateSkillGaps(userSkills = [], jobRequiredSkills = [], skillPerformance = {}) {
  const normalizedUserSkills = (userSkills || []).map(normalizeSkill);

  const strongSkills = [];
  const developingSkills = [];
  const missingSkills = [];

  // Helper to find matching skill performance
  const findPerformance = (skillName) => {
    const norm = normalizeSkill(skillName);
    const key = Object.keys(skillPerformance).find(k => normalizeSkill(k) === norm || norm.includes(normalizeSkill(k)) || normalizeSkill(k).includes(norm));
    return key ? skillPerformance[key] : null;
  };

  jobRequiredSkills.forEach(skill => {
    const norm = normalizeSkill(skill);
    const inProfile = normalizedUserSkills.includes(norm);
    const perf = findPerformance(skill);

    if (perf) {
      if (perf.percentage >= 70) {
        strongSkills.push({
          skill,
          score: perf.percentage,
          status: 'strong',
          details: `Demonstrated strong proficiency (${perf.percentage}% in assessment questions)`
        });
      } else if (perf.percentage >= 40) {
        developingSkills.push({
          skill,
          score: perf.percentage,
          status: 'developing',
          details: `Moderate grasp (${perf.percentage}% in assessment); recommend targeted practice`
        });
      } else {
        missingSkills.push({
          skill,
          score: perf.percentage,
          status: 'gap',
          details: `Assessment score (${perf.percentage}%) indicates knowledge gap for core role requirements`
        });
      }
    } else {
      // Skill was not tested in this assessment session
      if (inProfile) {
        strongSkills.push({
          skill,
          score: 85,
          status: 'strong',
          details: 'Verified in candidate profile'
        });
      } else {
        missingSkills.push({
          skill,
          score: 0,
          status: 'gap',
          details: 'Required skill not found in candidate profile or assessment evidence'
        });
      }
    }
  });

  // Also include any non-required tested skills where user excelled
  Object.entries(skillPerformance).forEach(([skill, perf]) => {
    const isAlreadyCovered = jobRequiredSkills.some(s => normalizeSkill(s) === normalizeSkill(skill));
    if (!isAlreadyCovered && perf.percentage >= 75) {
      strongSkills.push({
        skill,
        score: perf.percentage,
        status: 'strong',
        details: `Bonus competency demonstrated (${perf.percentage}% in assessment)`
      });
    }
  });

  // Generate learning advice using existing recommendations engine
  const missingSkillNames = missingSkills.map(m => m.skill);
  const learningRoadmap = generateSkillGapAnalysis(missingSkillNames);

  return {
    strongSkills,
    developingSkills,
    missingSkills,
    learningRoadmap
  };
}

/**
 * Calculates Profile Match score using existing rule-based job matcher.
 */
export function calculateProfileMatch(userSkills = [], job = {}) {
  const matchData = calculateJobMatch(userSkills, job);
  return {
    profileMatchPercentage: matchData.matchPercentage,
    matchedCount: matchData.matchedCount,
    totalRequired: matchData.totalRequired,
    matchingSkills: matchData.matchingSkills,
    missingSkills: matchData.missingSkills
  };
}

/**
 * Calculates Role Readiness by transparently combining:
 * Profile Match (40% weight) + Assessment Score (60% weight)
 * 
 * IMPORTANT: Strictly uses neutral terminology.
 * Never presents a hiring probability or selection guarantee.
 */
export function calculateRoleReadiness(profileMatch = 0, assessmentScore = 0) {
  const profileWeight = 0.40;
  const assessmentWeight = 0.60;

  const roleReadiness = Math.round(profileMatch * profileWeight + assessmentScore * assessmentWeight);

  let readinessLevel = 'Developing Alignment';
  let summary = '';

  if (roleReadiness >= 80) {
    readinessLevel = 'High Alignment';
    summary = 'Your current assessment performance indicates strong alignment with the configured role requirements.';
  } else if (roleReadiness >= 60) {
    readinessLevel = 'Solid Alignment';
    summary = 'Your profile and assessment results show good foundational readiness, with a few targeted skill areas identified for growth.';
  } else {
    readinessLevel = 'Developing Readiness';
    summary = 'Your evaluation highlights valuable initial exposure, alongside focused technical areas to strengthen prior to final interviews.';
  }

  return {
    roleReadiness,
    readinessLevel,
    formula: 'Profile Match × 40% + Assessment Score × 60%',
    formulaDescription: `Calculated from algorithmic Profile Match (${profileMatch}% × 40% = ${(profileMatch * 0.4).toFixed(1)}%) and Assessment Score (${assessmentScore}% × 60% = ${(assessmentScore * 0.6).toFixed(1)}%).`,
    summary
  };
}
