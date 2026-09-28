import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import Logo from './Logo';
import '../../styles/footer.css';

/**
 * "Popular Tracks" shortcuts.
 * Every entry maps to a real filter used by the Jobs catalog, so the link opens
 * the Jobs page scoped to that track instead of the entire listing. The list
 * deliberately spans disciplines — software alongside core and applied
 * engineering — because the catalog covers all branches, not only tech.
 */
const POPULAR_TRACKS = [
  { label: 'Software & Full Stack', category: 'Full Stack Developer' },
  { label: 'Embedded & VLSI', category: 'Embedded Systems Engineer' },
  { label: 'Power & Control Systems', category: 'Power Systems Engineer' },
  { label: 'Mechanical & Design', category: 'Design Engineer' },
  { label: 'Civil & Site Engineering', category: 'Site Engineer' },
  { label: 'Chemical & Process', category: 'Process Engineer' }
];

export default function Footer() {
  const { resetDemoData } = useAuth();
  const {
    resetFilters,
    setSelectedCategory,
    setSelectedSkill,
    setSelectedExperience
  } = useJobs();

  // Set by a quick-link click so the viewport can return to the Jobs listings
  // once the filtered results are in the DOM.
  const [pendingQuickNav, setPendingQuickNav] = useState(null);

  // Clear previously active filters first, otherwise an earlier selection could
  // hide the results for the shortcut that was just clicked.
  const handleQuickNavigate = (filters) => {
    resetFilters();
    if (filters.category) setSelectedCategory(filters.category);
    if (filters.skill) setSelectedSkill(filters.skill);
    if (filters.experience) setSelectedExperience(filters.experience);
    setPendingQuickNav(filters.label);
  };

  // Runs after the commit triggered by a quick link, when the Jobs route and its
  // filtered listings are already rendered.
  useEffect(() => {
    if (!pendingQuickNav) return;

    // Portal pages render inside the layout's own scroll regions on desktop, so
    // reset every column together with the window scroll position.
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document
      .querySelectorAll(
        '.portal-scroll-layout .layout-main, .portal-scroll-layout .layout-sidebar, .portal-scroll-layout .layout-filter'
      )
      .forEach((region) => region.scrollTo({ top: 0, behavior: 'smooth' }));

    setPendingQuickNav(null);
  }, [pendingQuickNav]);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Concept */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <div className="footer-brand-icon">
                <Logo variant="icon" size={22} mono />
              </div>
              <h3 className="footer-brand-name">Skill<span>Bridge</span></h3>
            </div>
            <p className="footer-brand-desc">
              The engineering talent marketplace. Bridging the gap between ambitious college graduates and fast-growing engineering teams through transparent skill matching.
            </p>
            <div className="footer-badges">
              <span className="footer-stat-badge footer-badge-blue">2,500+ Jobs</span>
              <span className="footer-stat-badge footer-badge-green">94% Match</span>
              <span className="footer-stat-badge footer-badge-yellow">Verified Hiring</span>
            </div>
          </div>

          {/* Col 2: For Students & Freshers */}
          <div>
            <h4 className="footer-col-title">For Candidates</h4>
            <ul className="footer-links">
              <li><Link to="/jobs">Browse Open Roles</Link></li>
              <li>
                <Link
                  to="/jobs"
                  onClick={() => handleQuickNavigate({ label: 'fresher', experience: 'Fresher (0 yrs)' })}
                >
                  Fresher Friendly Jobs (0 Exp)
                </Link>
              </li>
              <li><Link to="/resume-analyzer">Resume Skill Matcher</Link></li>
              <li><Link to="/profile">My Skill Profile</Link></li>
              <li><Link to="/applications">Application Tracker</Link></li>
            </ul>
          </div>

          {/* Col 3: For Recruiters & Campus Partners */}
          <div>
            <h4 className="footer-col-title">For Employers</h4>
            <ul className="footer-links">
              <li><Link to="/recruiter/post-job">Post a Job Opening</Link></li>
              <li><Link to="/recruiter">Recruiter Dashboard</Link></li>
              <li><Link to="/recruiter">Candidate Match Review</Link></li>
              <li><Link to="/jobs">Campus Hiring Network</Link></li>
            </ul>
          </div>

          {/* Col 4: Popular Tracks (each opens Jobs pre-filtered to that track) */}
          <div>
            <h4 className="footer-col-title">Popular Tracks</h4>
            <ul className="footer-links">
              {POPULAR_TRACKS.map(track => (
                <li key={track.label}>
                  <Link to="/jobs" onClick={() => handleQuickNavigate(track)}>
                    {track.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} SkillBridge Inc. All rights reserved. Connecting students and employers.
          </div>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="footer-sep">•</span>
            <Link to="/terms">Terms of Service</Link>
            <span className="footer-sep">•</span>
            <Link to="/security">Security & Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}