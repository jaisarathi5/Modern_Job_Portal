import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_STUDENT, DEFAULT_RECRUITER } from '../data/sampleUsers';

const AuthContext = createContext();

// Storage keys that hold demo *data*, wiped by "Reset demo data".
// `sb_theme` and `sb_skin` are intentionally absent: the colour scheme and
// site theme are preferences, not data, so a reset never overrides them.
const DEMO_DATA_KEYS = [
  'sb_jobs',
  'sb_jobs_ver',
  'sb_applications',
  'sb_saved_jobs',
  'sb_assessments',
  'sb_accounts'
];

export function AuthProvider({ children }) {
  // Load initial role and user from localStorage or default to guest visitor
  const [role, setRole] = useState(() => {
    return localStorage.getItem('sb_role') || 'guest';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sb_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    return null;
  });

  // Fresher mode toggle (defaults to true for student jobseekers)
  const [isFresherMode, setIsFresherMode] = useState(() => {
    const saved = localStorage.getItem('sb_fresher_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const readAccounts = () => {
    try {
      return JSON.parse(localStorage.getItem('sb_accounts') || '[]');
    } catch (e) {
      console.error('Failed to parse saved accounts', e);
      return [];
    }
  };

  const saveAccounts = (accounts) => {
    localStorage.setItem('sb_accounts', JSON.stringify(accounts));
  };

  // Keep localStorage updated
  useEffect(() => {
    localStorage.setItem('sb_role', role);
  }, [role]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sb_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sb_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('sb_fresher_mode', JSON.stringify(isFresherMode));
  }, [isFresherMode]);

  // Update profile
  const updateProfile = (fields) => {
    // Guard against writing onto a missing account (e.g. a guest reaching a
    // profile form), which would otherwise fabricate a partial user object.
    setCurrentUser(prev => (prev ? { ...prev, ...fields } : prev));
  };

  // Add skill to user profile
  const addSkill = (newSkill) => {
    if (!newSkill) return;
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    setCurrentUser(prev => {
      if (!prev) return prev;
      const skills = prev.skills || [];
      if (skills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
        return prev;
      }
      return { ...prev, skills: [...skills, trimmed] };
    });
  };

  // Remove skill from profile
  const removeSkill = (skillToRemove) => {
    setCurrentUser(prev => (
      prev
        ? { ...prev, skills: (prev.skills || []).filter(s => s.toLowerCase() !== skillToRemove.toLowerCase()) }
        : prev
    ));
  };

  // Quick switch between demo personas
  const switchToStudent = () => {
    setRole('jobseeker');
    setCurrentUser(DEFAULT_STUDENT);
    setIsFresherMode(true);
  };

  const switchToRecruiter = () => {
    setRole('recruiter');
    setCurrentUser(DEFAULT_RECRUITER);
  };

  const toggleFresherMode = () => {
    setIsFresherMode(prev => !prev);
  };

  // Authenticate against accounts created in this browser.
  const login = (email, password, selectedRole) => {
    const normalizedEmail = email.trim().toLowerCase();
    const account = readAccounts().find(user => (
      user.email.toLowerCase() === normalizedEmail &&
      user.password === password &&
      user.role === selectedRole
    ));

    if (!account) {
      return { success: false, message: 'Incorrect email, password, or account role.' };
    }

    const { password: savedPassword, ...user } = account;
    setRole(user.role);
    setCurrentUser(user);
    return { success: true, user };
  };

  // Register and persist a browser-local account for future logins.
  const register = (userData) => {
    const userRole = userData.role || 'jobseeker';
    const normalizedEmail = userData.email.trim().toLowerCase();
    const accounts = readAccounts();

    if (accounts.some(user => user.email.toLowerCase() === normalizedEmail)) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    setRole(userRole);
    const newUser = {
      id: `user-${Date.now()}`,
      name: userData.name || 'New User',
      email: normalizedEmail,
      role: userRole,
      skills: userData.skills ? userData.skills.split(',').map(s => s.trim()).filter(Boolean) : ['React', 'JavaScript', 'HTML'],
      isFresher: userData.isFresher ?? true,
      college: userData.college || 'University Engineering Campus',
      degree: userData.degree || 'B.Tech / Bachelor of Science',
      gpa: userData.gpa || '8.5 / 10.0',
      bio: userData.bio || 'Motivated learner excited for new opportunities.',
      experience: userData.experience || 'Fresher (0 years)',
      location: userData.location || 'Bangalore, India',
      company: userData.company || 'Tech Innovations Inc',
      designation: userData.designation || 'Talent Acquisition'
    };
    saveAccounts([...accounts, { ...newUser, password: userData.password }]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  // Simulated Logout
  const logout = () => {
    setRole('guest');
    setCurrentUser(null);
  };

  // Reset to default presentation state. Dropping the seed-version key makes the
  // next load re-seed jobs, and wiping sb_assessments stops a "reset" demo from
  // still believing an assessment was already completed.
  const resetDemoData = () => {
    DEMO_DATA_KEYS.forEach(key => localStorage.removeItem(key));
    localStorage.setItem('sb_role', 'jobseeker');
    localStorage.setItem('sb_current_user', JSON.stringify(DEFAULT_STUDENT));
    localStorage.setItem('sb_fresher_mode', 'true');
    setRole('jobseeker');
    setCurrentUser(DEFAULT_STUDENT);
    setIsFresherMode(true);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{
      role,
      currentUser,
      isFresherMode,
      toggleFresherMode,
      updateProfile,
      addSkill,
      removeSkill,
      switchToStudent,
      switchToRecruiter,
      login,
      register,
      logout,
      resetDemoData
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
