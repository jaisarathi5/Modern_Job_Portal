import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';
import FilterPanel from './components/jobs/FilterPanel';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Profile from './pages/Profile';
import RecruiterDashboard from './pages/RecruiterDashboard';
import PostJob from './pages/PostJob';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import NotFound from './pages/NotFound';
import { FiMenu, FiFilter } from 'react-icons/fi';

function PortalLayout({ children, showSidebar }) {
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

      <div className={showSidebar ? 'layout-dashboard' : 'layout-dashboard no-sidebar'}>
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

  // Home: full-width landing page for guests, 3-column portal when logged in
  const homeElement = isLoggedIn ? (
    <PortalLayout showSidebar>
      <Home />
    </PortalLayout>
  ) : (
    <Home />
  );

  // Jobs: portal layout with right filter panel (sidebar only for logged-in users)
  const jobsElement = (
    <PortalLayout showSidebar={isLoggedIn}>
      <Jobs />
    </PortalLayout>
  );

  return (
    <Routes location={location}>
      <Route path="/" element={homeElement} />
      <Route path="/jobs" element={jobsElement} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/recruiter" element={<RecruiterDashboard />} />
      <Route path="/recruiter/post-job" element={<PostJob />} />
      <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className="app-main">
        <RoutedContent />
      </main>
      <Footer />
    </>
  );
}