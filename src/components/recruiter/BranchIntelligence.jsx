import React from 'react';
import { branchDistribution, funnelStats, skillDemand, topCandidates } from '../../utils/recruiterIntelligence';

/** Recruiter Intelligence panel: branch mix, funnel, skill demand, top candidates. */
export default function BranchIntelligence({ jobs = [], applications = [] }) {
  const branches = branchDistribution(jobs, applications);
  const funnel = funnelStats(applications);
  const skills = skillDemand(jobs, 10);
  const top = topCandidates(applications, 5);
  const maxFunnel = Math.max(1, ...funnel.map((f) => f.count));
  const maxSkill = Math.max(1, ...skills.map((s) => s.count));
  const maxBranch = Math.max(1, ...branches.map((b) => b.applications));

  return (
    <div className="dashboard-section" style={{ marginBottom: '1.5rem' }}>
      <div className="dashboard-section-header">
        <h3>Recruiter Intelligence — Multi-Branch Overview</h3>
        <span className="badge badge-navy">CSE • ECE • EEE • ME • CE • CHE • AUTO • AERO • ROBO • BME • ENV</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '1rem' }}>
        <div>
          <h4 style={{ fontSize: '0.9rem', margin: '0 0 0.6rem' }}>Applications by Branch</h4>
          {branches.length === 0 && <p style={{ fontSize: '0.85rem' }}>No branch data yet.</p>}
          {branches.map((b) => (
            <div key={b.id} style={{ marginBottom: '0.55rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span><span style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', background: b.color, marginRight: '6px' }} />{b.label} ({b.openings} roles)</span>
                <strong>{b.applications} appl • {b.avgAssessment}% avg</strong>
              </div>
              <div style={{ height: '7px', background: 'var(--border-light)', borderRadius: '99px', overflow: 'hidden', marginTop: '3px' }}>
                <div style={{ width: `${Math.round((b.applications / maxBranch) * 100)}%`, height: '100%', background: b.color }} />
              </div>
            </div>
          ))}
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', margin: '0 0 0.6rem' }}>Hiring Funnel</h4>
          {funnel.map((f) => (
            <div key={f.stage} style={{ marginBottom: '0.55rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span>{f.stage}</span><strong>{f.count}</strong>
              </div>
              <div style={{ height: '7px', background: 'var(--border-light)', borderRadius: '99px', overflow: 'hidden', marginTop: '3px' }}>
                <div style={{ width: `${Math.round((f.count / maxFunnel) * 100)}%`, height: '100%', background: 'var(--primary-blue)' }} />
              </div>
            </div>
          ))}
          <h4 style={{ fontSize: '0.9rem', margin: '1rem 0 0.6rem' }}>Skill Demand (openings)</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {skills.map((s) => (
              <span key={s.skill} className="badge badge-navy" style={{ fontSize: '0.72rem' }}>{s.skill} × {s.count}</span>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', margin: '0 0 0.6rem' }}>Top Candidates (assessment 60% + match 40%)</h4>
          {top.length === 0 && <p style={{ fontSize: '0.85rem' }}>No applicants yet.</p>}
          {top.map((c) => (
            <div key={c.id} style={{ border: '1px solid var(--border-light)', borderRadius: '8px', padding: '0.55rem 0.7rem', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{c.applicantName}</strong>
                <span className="badge badge-fresher">{c.score}%</span>
              </div>
              <div style={{ color: 'var(--text-muted)' }}>{c.jobTitle} • {c.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
