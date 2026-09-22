import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_STUDENT, DEFAULT_RECRUITER } from '../data/sampleUsers';

const AuthContext = createContext();

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
    setCurrentUser(prev => ({
      ...prev,
      ...fields
    }));
  };

  // Add skill to user profile
  const addSkill = (newSkill) => {
    if (!newSkill) return;
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    setCurrentUser(prev => {
      const skills = prev.skills || [];
      if (skills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
        return prev;
      }
      return { ...prev, skills: [...skills, trimmed] };
    });
  };

  // Remove skill from profile
  const removeSkill = (skillToRemove) => {
    setCurrentUser(prev => ({
      ...prev,
      skills: (prev.skills || []).filter(s => s.toLowerCase() !== skillToRemove.toLowerCase())
    }));
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

  // Simulated Login
  const login = (email, password, selectedRole) => {
    const r = selectedRole || (email.includes('recruiter') ? 'recruiter' : 'jobseeker');
    setRole(r);
    if (r === 'recruiter') {
      setCurrentUser({
        ...DEFAULT_RECRUITER,
        email: email || DEFAULT_RECRUITER.email
      });
    } else {
      setCurrentUser({
        ...DEFAULT_STUDENT,
        email: email || DEFAULT_STUDENT.email
      });
    }
    return true;
  };

  // Simulated Register
  const register = (userData) => {
    const userRole = userData.role || 'jobseeker';
    setRole(userRole);
    const newUser = {
      id: `user-${Date.now()}`,
      name: userData.name || 'New User',
      email: userData.email,
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
    setCurrentUser(newUser);
    return true;
  };

  // Simulated Logout
  const logout = () => {
    setRole('guest');
    setCurrentUser(null);
  };

  // Reset to default presentation state
  const resetDemoData = () => {
    localStorage.removeItem('sb_jobs');
    localStorage.removeItem('sb_applications');
    localStorage.removeItem('sb_saved_jobs');
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
