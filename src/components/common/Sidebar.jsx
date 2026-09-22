import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { useApplications } from '../../context/ApplicationContext';
import {
  FiHome,
  FiBriefcase,
  FiCheckSquare,
  FiBookmark,
  FiUser,
  FiGrid,
  FiSettings,
  FiPlusCircle,
  FiX,
  FiChevronRight
} from 'react-icons/fi';
import '../../styles/sidebar.css';

export default function Sidebar({ open = false, onClose = () => {} }) {
  const { currentUser, role, isFresherMode, toggleFresherMode } = useAuth();
  const { savedJobIds } = useJobs();
  const { getUserApplications } = useApplications();

  const studentApps = currentUser ? getUserApplications(currentUser.id) : [];
  const isRecruiter = role === 'recruiter';

  const recruiterItems = [
    { label: 'Home', path: '/', icon: FiHome, end: true },
    { label: 'Recruiter Hub', path: '/recruiter', icon: FiGrid },
    { label: 'Post a Job', path: '/recruiter/post-job', icon: FiPlusCircle }
  ];

  const studentItems = [
    { label: 'Home', path: '/', icon: FiHome, end: true },
    { label: 'Find Jobs', path: '/jobs', icon: FiBriefcase },
    {
      label: 'Applications',
      path: '/applications',
      icon: FiCheckSquare,
      badge: studentApps.length
    },
    {
      label: 'Saved Jobs',
      path: '/dashboard',
      icon: FiBookmark,
      badge: savedJobIds.length
    },
    { label: 'My Profile', path: '/profile', icon: FiUser },
    { label: 'Dashboard', path: '/dashboard', icon: FiGrid },
    { label: 'Settings', path: '/profile', icon: FiSettings }
  ];

  const items = isRecruiter ? recruiterItems : studentItems;

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Main navigation">
      <div className="sidebar-header">
        <span className="sidebar-title">Menu</span>
        <button type="button" className="sidebar-close-btn" onClick={onClose} aria-label="Close menu">
          <FiX />
        </button>
      </div>

      <nav className="sidebar-nav">
        {items.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.end}
              className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')}
              onClick={onClose}
            >
              <span className="sidebar-item-icon">
                <Icon />
              </span>
              <span className="sidebar-item-label">{item.label}</span>
              {item.badge > 0 && <span className="sidebar-item-badge">{item.badge}</span>}
              <FiChevronRight className="sidebar-item-arrow" />
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-fresher-toggle">
          <span className="sidebar-fresher-label">🌱 Fresher Mode</span>
          <button
            type="button"
            className={`sidebar-switch ${isFresherMode ? 'on' : ''}`}
            onClick={toggleFresherMode}
            aria-label="Toggle fresher mode"
          >
            <span className="sidebar-switch-knob" />
          </button>
        </div>

        {currentUser && (
          <Link to="/profile" className="sidebar-profile-card" onClick={onClose}>
            <div className="sidebar-avatar">{getInitials(currentUser.name)}</div>
            <div className="sidebar-profile-info">
              <span className="sidebar-profile-name">{currentUser.name}</span>
              <span className="sidebar-profile-role">
                {isRecruiter ? '🏢 Recruiter' : '🎓 Job Seeker'}
              </span>
            </div>
            <FiChevronRight className="sidebar-profile-arrow" />
          </Link>
        )}
      </div>
    </aside>
  );
}