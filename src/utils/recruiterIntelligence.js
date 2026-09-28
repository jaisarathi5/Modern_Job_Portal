/* Recruiter Intelligence: branch distribution, avg assessment, funnel, skill demand. */
import { ALL_BRANCHES } from '../data/engineeringBranches';

export function branchDistribution(jobs = [], applications = []) {
  return ALL_BRANCHES.map((b) => {
    const bj = jobs.filter((j) => (j.branch || 'general') === b.id);
    const apps = applications.filter((a) => bj.some((j) => String(j.id) === String(a.jobId)));
    const assessed = apps.filter((a) => a.assessmentScore != null);
    return {
      ...b,
      openings: bj.length,
      applications: apps.length,
      assessed: assessed.length,
      avgAssessment: assessed.length ? Math.round(assessed.reduce((s, a) => s + (a.assessmentScore || 0), 0) / assessed.length) : 0,
      avgMatch: apps.length ? Math.round(apps.reduce((s, a) => s + (a.matchPercentage || 0), 0) / apps.length) : 0,
    };
  }).filter((r) => r.openings > 0 || r.applications > 0);
}

export function funnelStats(applications = []) {
  const stages = ['Applied', 'Assessment Completed', 'Shortlisted', 'Interview', 'Selected'];
  return stages.map((s) => ({ stage: s, count: applications.filter((a) => a.status === s).length }));
}

export function skillDemand(jobs = [], limit = 12) {
  const map = new Map();
  jobs.forEach((j) => {
    [...(j.requiredSkills || []), ...(j.preferredSkills || [])].forEach((s) => {
      const k = s.trim();
      map.set(k, (map.get(k) || 0) + 1);
    });
  });
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([skill, count]) => ({ skill, count }));
}

export function topCandidates(applications = [], limit = 5) {
  return [...applications]
    .map((a) => ({ ...a, score: Math.round(((a.assessmentScore || 0) * 0.6) + ((a.matchPercentage || 0) * 0.4)) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
