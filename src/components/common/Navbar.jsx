import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApplications } from '../../context/ApplicationContext';
import { useTheme } from '../../context/ThemeContext';
import { useJobs } from '../../context/JobContext';
import { useToast } from './Toast';
import Modal from './Modal';
import Logo from './Logo';
import { THEMES } from '../../data/accents';
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
  FiSun,
  FiMoon,
  FiSearch,
  FiBell,
  FiSettings,
  FiRotateCcw
} from 'react-icons/fi';
import '../../styles/navbar.css';

export default function Navbar() {
  const { 
    role, 
    currentUser, 
    isFresherMode, 
    toggleFresherMode,
    logout,
    resetDemoData
  } = useAuth();
  
  const { toggleTheme, isDark, skin, setSkin } = useTheme();
  
  const { applications, getUserApplications } = useApplications();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useJobs();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const settingsRef = useRef(null);

  const studentApps = currentUser ? getUserApplications(currentUser.id) : [];

  // The bell is only "unread" when something genuinely needs attention, so the
  // red dot stops lying:
  //   jobseeker → applications that moved past the initial "Applied" stage
  //   recruiter → applications still sitting at "Applied", i.e. awaiting review
  const awaitingReview = applications.filter(app => app.status === 'Applied').length;
  const movedApplications = studentApps.filter(app => app.status && app.status !== 'Applied').length;
  const updateCount = !currentUser ? 0 : role === 'recruiter' ? awaitingReview : movedApplications;
  const updatesLabel = role === 'recruiter' ? 'Applicants to review' : 'Application updates';
  const updatesPath = role === 'recruiter' ? '/recruiter' : '/applications';

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // When the portal layout (sidebar + filter) is active on Home/Jobs, hide the inline nav links
  const isPortalLayout = currentUser && (location.pathname === '/' || location.pathname === '/jobs');

  const handleNavSearchSubmit = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (!location.pathname.startsWith('/jobs')) {
      navigate('/jobs');
    }
  };

  const handleLogout = () => {
    logout();
    addToast('Logged out of session', 'info');
    navigate('/login');
  };

  const handleResetDemoData = () => {
    setResetConfirmOpen(false);
    resetDemoData();
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Shared swatch row for the settings menu and the mobile drawer. Swatches
  // keep the menu open so users can compare themes without reopening it. Each
  // one repaints the entire site, not just the brand chrome.
  const renderThemeSwatches = (wrapperClass) => (
    <div className={wrapperClass} role="group" aria-label="Site theme">
      {THEMES.map((option) => {
        const isActive = skin === option.id;
        return (
          <button
            key={option.id}
            type="button"
            className={`settings-swatch${isActive ? ' active' : ''}`}
            style={{ background: isDark ? option.darkSwatch : option.swatch }}
            onClick={() => setSkin(option.id)}
            aria-pressed={isActive}
            aria-label={`${option.label} site theme`}
            title={`${option.label} — ${option.note}`}
          />
        );
      })}
    </div>
  );

  return (
    <header className="navbar-wrapper">
      {/* Main Navbar */}
      <div className="main-navbar">
        {/* Brand */}
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-icon-box">
            <Logo variant="icon" size={24} mono />
          </div>
          <div className="brand-text-group">
            <span className="brand-title">Skill<span>Bridge</span></span>
            <span className="brand-subtitle">Engineering Job Portal</span>
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

        {/* Right Actions: consolidated settings menu and mobile navigation */}
        <div className="nav-actions">
          <div className="settings-menu-wrap" ref={settingsRef}>
            <button
              type="button"
              className={`settings-menu-trigger ${settingsOpen ? 'active' : ''}`}
              onClick={() => setSettingsOpen(prev => !prev)}
              aria-label="Open settings menu"
              aria-expanded={settingsOpen}
              title="Settings and account"
            >
              <FiSettings />
              {isFresherMode && <span className="settings-active-dot" />}
            </button>

            {settingsOpen && (
              <div className="settings-menu" role="menu">
                <div className="settings-menu-heading">Preferences</div>
                <button type="button" className="settings-menu-item" onClick={() => { toggleTheme(); setSettingsOpen(false); }} role="menuitem">
                  <span className="settings-menu-icon">{isDark ? <FiSun /> : <FiMoon />}</span>
                  <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
                </button>
                <div className="settings-menu-subheading">Site theme</div>
                {renderThemeSwatches('settings-swatch-row')}
                <button type="button" className="settings-menu-item" onClick={toggleFresherMode} role="menuitem">
                  <span className="settings-menu-icon"><span className="fresher-dot"></span></span>
                  <span>Fresher mode <strong>{isFresherMode ? 'On' : 'Off'}</strong></span>
                </button>
                {currentUser && (
                  <button
                    type="button"
                    className="settings-menu-item"
                    role="menuitem"
                    title={updatesLabel}
                    onClick={() => { setSettingsOpen(false); navigate(updatesPath); }}
                  >
                    <span className="settings-menu-icon settings-notification-icon">
                      <FiBell />
                      {updateCount > 0 && <span className="notification-dot" />}
                    </span>
                    <span>
                      {updatesLabel}
                      {updateCount > 0 && <strong>{updateCount}</strong>}
                    </span>
                  </button>
                )}
                <button
                  type="button"
                  className="settings-menu-item"
                  role="menuitem"
                  onClick={() => { setResetConfirmOpen(true); setSettingsOpen(false); }}
                >
                  <span className="settings-menu-icon"><FiRotateCcw /></span>
                  <span>Reset demo data</span>
                </button>

                <div className="settings-menu-divider"></div>
                {currentUser ? (
                  <>
                    <Link to={role === 'recruiter' ? '/recruiter' : '/profile'} className="settings-menu-account" onClick={() => setSettingsOpen(false)}>
                      <span className="user-avatar">{getInitials(currentUser.name)}</span>
                      <span><strong>{currentUser.name}</strong><small>{role === 'recruiter' ? 'Recruiter' : 'Job Seeker'}</small></span>
                    </Link>
                    <button type="button" className="settings-menu-item settings-logout" onClick={handleLogout} role="menuitem">
                      <span className="settings-menu-icon"><FiLogOut /></span>
                      <span>Log out</span>
                    </button>
                  </>
                ) : (
                  <div className="settings-auth-actions">
                    <Link to="/login" className="btn btn-nav-login" onClick={() => setSettingsOpen(false)}><FiLogIn /> Log in</Link>
                    <Link to="/register" className="btn btn-nav-signup" onClick={() => setSettingsOpen(false)}>Sign up</Link>
                  </div>
                )}
              </div>
            )}
          </div>

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

        {renderThemeSwatches('mobile-swatch-row')}

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
            <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>Log Out</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
            <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMobileMenuOpen(false)}>Register</Link>
          </div>
        )}
      </div>

      {/* Destructive demo reset, confirmed before it clears local storage */}
      <Modal
        isOpen={resetConfirmOpen}
        onClose={() => setResetConfirmOpen(false)}
        title="Reset demo data"
        maxWidth="440px"
      >
        <p style={{ fontSize: '0.95rem', marginBottom: '1.25rem' }}>
          This restores the seeded demo jobs, applications and student profile, and erases
          everything created in this browser — bookmarks, assessment results and any accounts
          you registered. The page will reload.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button type="button" className="btn btn-outline" onClick={() => setResetConfirmOpen(false)}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: 'var(--accent-rose)' }}
            onClick={handleResetDemoData}
          >
            Yes, reset demo data
          </button>
        </div>
      </Modal>
    </header>
  );
}
