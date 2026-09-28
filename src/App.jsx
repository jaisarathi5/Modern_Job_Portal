import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';
import FilterPanel from './components/jobs/FilterPanel';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import ProtectedRoute from './components/common/ProtectedRoute';
import { PRIVACY_POLICY, TERMS_OF_SERVICE, SECURITY_COMPLIANCE } from './data/legalContent';
import { FiMenu, FiFilter } from 'react-icons/fi';

/* The three above are on the critical path for a first visit, so they stay in the
   entry chunk. Everything else is split out: the recruiter area, the assessment
   player (which pulls in the large questions bank) and the dashboards are only
   ever reached after a deliberate navigation, so none of it should delay the
   landing page's first paint. */
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Applications = lazy(() => import('./pages/Applications'));
const Profile = lazy(() => import('./pages/Profile'));
const RecruiterDashboard = lazy(() => import('./pages/RecruiterDashboard'));
const PostJob = lazy(() => import('./pages/PostJob'));
const ResumeAnalyzer = lazy(() => import('./pages/ResumeAnalyzer'));
const Assessment = lazy(() => import('./pages/Assessment'));
const NotFound = lazy(() => import('./pages/NotFound'));
const EditJob = lazy(() => import('./pages/EditJob'));
const Legal = lazy(() => import('./pages/Legal'));

const BASE_TITLE = 'SkillBridge';
const SITE_SUFFIX = 'SkillBridge | Engineering Student & Fresher Job Portal';

// Longest prefix wins, so '/jobs/:id' must be tested before '/jobs'.
const ROUTE_TITLES = [
  ['/assessment', 'Skill Assessment | SkillBridge'],
  ['/resume-analyzer', 'Resume Analyzer | SkillBridge'],
  ['/recruiter/post-job', 'Post a Job | SkillBridge'],
  ['/recruiter/edit-job', 'Edit Job | SkillBridge'],
  ['/recruiter', 'Recruiter Portal | SkillBridge'],
  ['/jobs', 'Browse Jobs | SkillBridge'],
  ['/dashboard', 'Your Dashboard | SkillBridge'],
  ['/applications', 'My Applications | SkillBridge'],
  ['/profile', 'My Profile | SkillBridge'],
  ['/login', 'Sign In | SkillBridge'],
  ['/register', 'Create Account | SkillBridge'],
  ['/privacy', 'Privacy Policy | SkillBridge'],
  ['/terms', 'Terms of Service | SkillBridge'],
  ['/security', 'Security & Compliance | SkillBridge']
];

function getRouteTitle(pathname) {
  if (pathname.startsWith('/jobs/')) return 'Job Details | SkillBridge';
  const match = ROUTE_TITLES.find(([prefix]) => pathname.startsWith(prefix));
  return match ? match[1] : SITE_SUFFIX;
}

function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        minHeight: '55vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.92rem'
      }}
    >
      <span>{`Loading ${BASE_TITLE}…`}</span>
    </div>
  );
}

function PortalLayout({ children, showSidebar, scrollable = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const closeAll = () => {
    setMenuOpen(false);
    setFiltersOpen(false);
  };

  return (
    <>
      <div className="layout-mobile-bar">
        {showSidebar && (
          <button type="button" className="layout-mobile-btn" onClick={() => setMenuOpen(true)}>
            <FiMenu /> Menu
          </button>
        )}
        <button type="button" className="layout-mobile-btn" onClick={() => setFiltersOpen(true)}>
          <FiFilter /> Filters
        </button>
      </div>

      <div className={`${showSidebar ? 'layout-dashboard' : 'layout-dashboard no-sidebar'}${scrollable ? ' portal-scroll-layout' : ''}`}>
        {showSidebar && (
          <div className={`layout-sidebar ${menuOpen ? 'open' : ''}`}>
            <Sidebar open={menuOpen} onClose={closeAll} />
          </div>
        )}
        <div className="layout-main">{children}</div>
        <div className={`layout-filter ${filtersOpen ? 'open' : ''}`}>
          <FilterPanel open={filtersOpen} onClose={closeAll} />
        </div>
      </div>

      {(menuOpen || filtersOpen) && <div className="layout-overlay show" onClick={closeAll} />}
    </>
  );
}

function RoutedContent() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const isLoggedIn = Boolean(currentUser);

  // Every navigation starts at the top of the target page; without this a link
  // clicked in the footer leaves the viewport parked at the bottom of the page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  // Route-level document title. Keyed on pathname only, so in-page filter
  // changes do not churn the tab title.
  useEffect(() => {
    const previous = document.title;
    document.title = getRouteTitle(location.pathname);
    return () => {
      document.title = previous;
    };
  }, [location.pathname]);

  // Home: full-width landing page for guests; logged-in users get the same
  // independent-scroll portal shell as Jobs (sidebar | listings | filters).
  const homeElement = isLoggedIn ? (
    <PortalLayout showSidebar scrollable>
      <Home />
    </PortalLayout>
  ) : (
    <Home />
  );

  // Jobs: portal layout with right filter panel (sidebar only for logged-in users)
  const jobsElement = (
    <PortalLayout showSidebar={isLoggedIn} scrollable>
      <Jobs />
    </PortalLayout>
  );

  return (
    <div key={location.pathname} className="route-fade">
      {/* Catches the lazy() route chunks above. Home/Jobs/JobDetails are eager,
          so the common paths never show this. */}
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location}>
          <Route path="/" element={homeElement} />
          <Route path="/jobs" element={jobsElement} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/assessment/:jobId" element={<Assessment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Public legal documents */}
          <Route path="/privacy" element={<Legal doc={PRIVACY_POLICY} />} />
          <Route path="/terms" element={<Legal doc={TERMS_OF_SERVICE} />} />
          <Route path="/security" element={<Legal doc={SECURITY_COMPLIANCE} />} />

          {/* Candidate-only area */}
          <Route path="/dashboard" element={<ProtectedRoute allow={['jobseeker']}><Dashboard /></ProtectedRoute>} />
          <Route path="/applications" element={<ProtectedRoute allow={['jobseeker']}><Applications /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute allow={['jobseeker']}><Profile /></ProtectedRoute>} />

          {/* Recruiter-only area */}
          <Route path="/recruiter" element={<ProtectedRoute allow={['recruiter']}><RecruiterDashboard /></ProtectedRoute>} />
          <Route path="/recruiter/post-job" element={<ProtectedRoute allow={['recruiter']}><PostJob /></ProtectedRoute>} />
          <Route path="/recruiter/edit-job/:id" element={<ProtectedRoute allow={['recruiter']}><EditJob /></ProtectedRoute>} />

          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content" className="app-main" tabIndex={-1}>
        <RoutedContent />
      </main>
      <Footer />
    </>
  );
}