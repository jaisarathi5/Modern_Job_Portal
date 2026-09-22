import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApplications } from '../../context/ApplicationContext';
import { useTheme } from '../../context/ThemeContext';
import { useJobs } from '../../context/JobContext';
import { useToast } from './Toast';
import { 
  FiBriefcase, 
  FiUser, 
  FiCheckSquare, 
  FiFileText, 
  FiPlusCircle, 
  FiLogOut, 
  FiLogIn, 
  FiMenu, 
  FiX, 
  FiRefreshCw, 
  FiZap,
  FiSun,
  FiMoon,
  FiSearch,
  FiBell
} from 'react-icons/fi';
import '../../styles/navbar.css';

export default function Navbar() {
  const { 
    role, 
    currentUser, 
    isFresherMode, 
    toggleFresherMode, 
    switchToStudent, 
    switchToRecruiter, 
    logout, 
    resetDemoData 
  } = useAuth();
  
  const { theme, toggleTheme, isDark } = useTheme();
  
  const { getUserApplications } = useApplications();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useJobs();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const studentApps = currentUser ? getUserApplications(currentUser.id) : [];

  // When the portal layout (sidebar + filter) is active on Home/Jobs, hide the inline nav links
  const isPortalLayout = currentUser && (location.pathname === '/' || location.pathname === '/jobs');

  const handleNavSearchSubmit = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (!location.pathname.startsWith('/jobs')) {
      navigate('/jobs');
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all demo jobs, applications, and student profiles to pristine state?')) {
      resetDemoData();
      addToast('Demo data reset successfully!', 'info');
    }
  };

  const handleLogout = () => {
    logout();
    addToast('Logged out of session', 'info');
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="navbar-wrapper">
      {/* Top Interactive Persona Switcher for Presentation & Demo */}
      <div className="demo-banner">
        <div className="container demo-banner-inner">
          <div className="demo-banner-content">
            <span className="demo-banner-badge">Preview Workspace</span>
            <span>Switch Account Persona:</span>
          </div>
          <div className="demo-switch-group">
            <button
              type="button"
              className={`demo-switch-btn ${role === 'jobseeker' ? 'active' : ''}`}
              onClick={() => {
                switchToStudent();
                addToast('Switched to Candidate View (Alex Chen)', 'info');
              }}
            >
              👤 Candidate (Alex Chen)
            </button>
            <button
              type="button"
              className={`demo-switch-btn ${role === 'recruiter' ? 'active' : ''}`}
              onClick={() => {
                switchToRecruiter();
                addToast('Switched to Employer View (Sarah Miller)', 'info');
              }}
            >
              🏢 Employer (Sarah Miller)
            </button>
            <button
              type="button"
              className="demo-switch-btn"
              onClick={handleReset}
              title="Reset to default mock state"
            >
              <FiRefreshCw style={{ verticalAlign: 'middle', marginRight: '3px' }} /> Reset Data
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="main-navbar">
        {/* Brand */}
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-icon-box">
            <FiZap />
          </div>
          <div className="brand-text-group">
            <span className="brand-title">Skill<span>Bridge</span></span>
            <span className="brand-subtitle">Tech Job Portal</span>
          </div>
        </Link>

        {/* Navigation Links - hidden in portal layout (sidebar takes over) */}
        {!isPortalLayout && (
          <nav>
            <ul className="nav-links">
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/jobs" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  <FiBriefcase /> Find Jobs
                </NavLink>
              </li>
              <li>
                <NavLink to="/resume-analyzer" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  <FiFileText /> Resume Matcher
                </NavLink>
              </li>

              {/* Student specific links */}
              {role === 'jobseeker' && (
                <>
                  <li>
                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/applications" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                      <FiCheckSquare /> Applications
                      {studentApps.length > 0 && (
                        <span className="badge badge-rose" style={{ padding: '0.1rem 0.45rem', fontSize: '0.7rem' }}>
                          {studentApps.length}
                        </span>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                      <FiUser /> Skills & Profile
                    </NavLink>
                  </li>
                </>
              )}

              {/* Recruiter specific links */}
              {role === 'recruiter' && (
                <>
                  <li>
                    <NavLink to="/recruiter" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                      Recruiter Hub
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/recruiter/post-job" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                      <FiPlusCircle /> Post a Job
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}

        {/* Center search - shown in portal layout */}
        {isPortalLayout && (
          <form onSubmit={handleNavSearchSubmit} className="navbar-search" role="search">
            <FiSearch className="navbar-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search job title, skill, or company..."
              aria-label="Search jobs"
            />
            {searchQuery && (
              <button type="button" className="navbar-search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search">
                <FiX />
              </button>
            )}
          </form>
        )}

        {/* Right Actions: Theme Toggle, Fresher Mode, User Profile / Auth */}
        <div className="nav-actions">
          {/* Notification bell (decorative) */}
          <button
            type="button"
            className="notification-btn"
            title="Notifications"
            aria-label="Notifications"
          >
            <FiBell />
            <span className="notification-dot"></span>
          </button>

          {/* Dark / Light Mode Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark / Light Theme"
          >
            {isDark ? <FiSun className="theme-icon sun" /> : <FiMoon className="theme-icon moon" />}
          </button>

          {/* Fresher Mode Switcher */}
          <button
            type="button"
            className={`fresher-toggle-pill ${isFresherMode ? 'active' : ''}`}
            onClick={toggleFresherMode}
            title="Toggle Fresher Mode (Prioritize 0-1 years exp)"
          >
            <span className="fresher-dot"></span>
            <span>🌱 Fresher Mode: {isFresherMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* User Section / Login & Sign Up Actions */}
          {currentUser ? (
            <div className="user-badge-group">
              <Link to={role === 'recruiter' ? '/recruiter' : '/profile'} className="user-avatar-link" title={currentUser.name}>
                <div className="user-avatar">
                  {getInitials(currentUser.name)}
                </div>
              </Link>
              <div className="user-info">
                <span className="user-name">{currentUser.name}</span>
                <span className="user-role-label">
                  {role === 'recruiter' ? '🏢 Recruiter' : '🎓 Job Seeker'}
                </span>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-sm btn-logout"
                onClick={handleLogout}
                title="Log Out"
              >
                <FiLogOut />
              </button>
            </div>
          ) : (
            <div className="auth-nav-buttons">
              <Link to="/login" className="btn btn-nav-login">
                <FiLogIn /> Log In
              </Link>
              <Link to="/register" className="btn btn-nav-signup">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <button
            type="button"
            className={`fresher-toggle-pill ${isFresherMode ? 'active' : ''}`}
            onClick={toggleFresherMode}
          >
            <span className="fresher-dot"></span>
            <span>🌱 Fresher Mode: {isFresherMode ? 'ON' : 'OFF'}</span>
          </button>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            style={{ display: 'inline-flex' }}
          >
            {isDark ? <><FiSun /> Light</> : <><FiMoon /> Dark</>}
          </button>
        </div>

        <NavLink to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
        <NavLink to="/jobs" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Find Jobs</NavLink>
        <NavLink to="/resume-analyzer" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Resume Matcher</NavLink>

        {role === 'jobseeker' && (
          <>
            <NavLink to="/dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Student Dashboard</NavLink>
            <NavLink to="/applications" className="nav-link" onClick={() => setMobileMenuOpen(false)}>My Applications ({studentApps.length})</NavLink>
            <NavLink to="/profile" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Skills & Profile</NavLink>
          </>
        )}

        {role === 'recruiter' && (
          <>
            <NavLink to="/recruiter" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Recruiter Hub</NavLink>
            <NavLink to="/recruiter/post-job" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Post a Job</NavLink>
          </>
        )}

        {currentUser ? (
          <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Signed in as <strong>{currentUser.name}</strong></span>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>Log Out</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
            <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMobileMenuOpen(false)}>Register</Link>
          </div>
        )}
      </div>
    </header>
  );
}
