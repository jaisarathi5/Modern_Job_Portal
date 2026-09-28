import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_APPLICATIONS } from '../data/sampleUsers';
import { calculateJobMatch } from '../utils/jobMatcher';
import { useJobs } from './JobContext';

const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
  // JobProvider wraps this provider, so job records can be updated from here.
  const { incrementApplicants } = useJobs();

  // Load applications from localStorage or fallback
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('sb_applications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(app => {
          const initApp = INITIAL_APPLICATIONS.find(a => a.id === app.id);
          if (initApp && initApp.assessmentScore && !app.assessmentScore) {
            return { ...app, ...initApp };
          }
          return app;
        });
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

  // Student applies for a job (optionally attaching verified assessment data)
  const applyForJob = (job, user, coverNote = '', assessmentData = null) => {
    if (!job || !user) return { success: false, message: 'Invalid job or user' };

    if (hasApplied(job.id, user.id)) {
      return { success: false, message: 'You have already applied for this position!' };
    }

    const matchInfo = calculateJobMatch(user.skills || [], job);
    const today = new Date().toISOString().split('T')[0];

    const hasAssessment = Boolean(assessmentData && assessmentData.assessmentScore !== undefined);

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
      status: hasAssessment ? 'Assessment Completed' : 'Applied', // Applied, Assessment Completed, Shortlisted, Interview, Selected, Rejected
      coverNote: coverNote.trim() || 'Excited to apply for this role and leverage my university learning.',
      // Assessment verification payload
      assessmentScore: hasAssessment ? assessmentData.assessmentScore : null,
      roleReadiness: hasAssessment ? assessmentData.roleReadiness : null,
      categoryScores: hasAssessment ? assessmentData.categoryScores : null,
      skillPerformance: hasAssessment ? assessmentData.skillPerformance : null,
      strongSkills: hasAssessment ? assessmentData.strongSkills : [],
      missingSkills: hasAssessment ? assessmentData.missingSkills : [],
      assessmentCompletedDate: hasAssessment ? today : null,
      timeline: [
        {
          status: 'Applied',
          date: today,
          note: hasAssessment
            ? `Application submitted with verified assessment: ${assessmentData.assessmentScore}% Assessment Score & ${assessmentData.roleReadiness}% Role Readiness`
            : 'Application submitted successfully through SkillBridge portal'
        }
      ]
    };

    setApplications(prev => [newApplication, ...prev]);
    // Keep the advertised applicant count in step with real submissions.
    incrementApplicants(job.id);
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
