import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_APPLICATIONS } from '../data/sampleUsers';
import { calculateJobMatch } from '../utils/jobMatcher';

const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
  // Load applications from localStorage or fallback
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('sb_applications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved applications', e);
      }
    }
    return INITIAL_APPLICATIONS;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('sb_applications', JSON.stringify(applications));
  }, [applications]);

  // Check if an applicant has already applied to a job
  const hasApplied = (jobId, applicantId) => {
    return applications.some(
      app => String(app.jobId) === String(jobId) && String(app.applicantId) === String(applicantId)
    );
  };

  // Student applies for a job
  const applyForJob = (job, user, coverNote = '') => {
    if (!job || !user) return { success: false, message: 'Invalid job or user' };

    if (hasApplied(job.id, user.id)) {
      return { success: false, message: 'You have already applied for this position!' };
    }

    const matchInfo = calculateJobMatch(user.skills || [], job);
    const today = new Date().toISOString().split('T')[0];

    const newApplication = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      companyLogoBg: job.logoBg || '#2563EB',
      location: job.location,
      salary: job.salary,
      applicantId: user.id,
      applicantName: user.name,
      applicantEmail: user.email,
      applicantSkills: user.skills || [],
      matchPercentage: matchInfo.matchPercentage,
      appliedDate: today,
      status: 'Applied', // Applied, Shortlisted, Interview, Selected, Rejected
      coverNote: coverNote.trim() || 'Excited to apply for this role and leverage my university learning.',
      timeline: [
        {
          status: 'Applied',
          date: today,
          note: 'Application submitted successfully through SkillBridge portal'
        }
      ]
    };

    setApplications(prev => [newApplication, ...prev]);
    return { success: true, application: newApplication };
  };

  // Recruiter updates status of an application
  const updateApplicationStatus = (appId, newStatus, note = '') => {
    const today = new Date().toISOString().split('T')[0];
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const updatedTimeline = [
          ...app.timeline,
          {
            status: newStatus,
            date: today,
            note: note || `Application status updated to ${newStatus}`
          }
        ];
        return {
          ...app,
          status: newStatus,
          timeline: updatedTimeline
        };
      }
      return app;
    }));
  };

  // Filter helpers
  const getUserApplications = (userId) => {
    if (!userId) return [];
    return applications.filter(app => String(app.applicantId) === String(userId));
  };

  const getJobApplicants = (jobId) => {
    if (!jobId) return [];
    return applications.filter(app => String(app.jobId) === String(jobId));
  };

  return (
    <ApplicationContext.Provider value={{
      applications,
      hasApplied,
      applyForJob,
      updateApplicationStatus,
      getUserApplications,
      getJobApplicants
    }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
}
