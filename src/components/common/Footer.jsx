import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiZap } from 'react-icons/fi';
import '../../styles/footer.css';

export default function Footer() {
  const { resetDemoData } = useAuth();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Concept */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <div className="footer-brand-icon">
                <FiZap />
              </div>
              <h3 className="footer-brand-name">Skill<span>Bridge</span></h3>
            </div>
            <p className="footer-brand-desc">
              The modern tech talent marketplace. Bridging the gap between ambitious college graduates and fast-growing engineering teams through transparent skill matching.
            </p>
            <div className="footer-badges">
              <span className="footer-stat-badge badge-blue">2,500+ Jobs</span>
              <span className="footer-stat-badge badge-green">94% Match</span>
              <span className="footer-stat-badge badge-yellow">Verified Hiring</span>
            </div>
          </div>

          {/* Col 2: For Students & Freshers */}
          <div>
            <h4 className="footer-col-title">For Candidates</h4>
            <ul className="footer-links">
              <li><Link to="/jobs">Browse Tech Roles</Link></li>
              <li><Link to="/jobs">Fresher Friendly Jobs (0 Exp)</Link></li>
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

          {/* Col 4: Top Tech Domains */}
          <div>
            <h4 className="footer-col-title">Top Tech Tracks</h4>
            <ul className="footer-links">
              <li><Link to="/jobs">React & Frontend Development</Link></li>
              <li><Link to="/jobs">Node.js & Full Stack</Link></li>
              <li><Link to="/jobs">Python & Machine Learning</Link></li>
              <li><Link to="/jobs">Cloud & DevOps Engineering</Link></li>
              <li><Link to="/jobs">UI/UX & Product Design</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} SkillBridge Inc. All rights reserved. Connecting students and tech employers.
          </div>
          <div className="footer-bottom-links">
            <span>Privacy Policy</span>
            <span className="footer-sep">•</span>
            <span>Terms of Service</span>
            <span className="footer-sep">•</span>
            <span>Security & Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}