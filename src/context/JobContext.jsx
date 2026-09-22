import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_JOBS } from '../data/initialJobs';
import { useAuth } from './AuthContext';
import { calculateJobMatch } from '../utils/jobMatcher';

const JobContext = createContext();

export function JobProvider({ children }) {
  const { currentUser, isFresherMode } = useAuth();

  // Load jobs from localStorage or fallback to INITIAL_JOBS
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('sb_jobs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved jobs', e);
      }
    }
    return INITIAL_JOBS;
  });

  // Saved / Bookmarked job IDs
  const [savedJobIds, setSavedJobIds] = useState(() => {
    const saved = localStorage.getItem('sb_saved_jobs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved jobs list', e);
      }
    }
    return ['job-1', 'job-3'];
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWorkType, setSelectedWorkType] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [selectedSalary, setSelectedSalary] = useState('Any');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [sortBy, setSortBy] = useState('match'); // 'match', 'recent', 'salary'

  // Persist jobs & bookmarks
  useEffect(() => {
    localStorage.setItem('sb_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('sb_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  // Recruiter actions
  const addJob = (jobData) => {
    const newJob = {
      id: `job-${Date.now()}`,
      postedDate: 'Just now',
      applicantsCount: 0,
      logoBg: '#2563EB',
      ...jobData
    };
    setJobs(prev => [newJob, ...prev]);
    return newJob;
  };

  const editJob = (id, updatedFields) => {
    setJobs(prev => prev.map(job => (job.id === id ? { ...job, ...updatedFields } : job)));
  };

  const deleteJob = (id) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  const getJobById = (id) => {
    return jobs.find(job => String(job.id) === String(id));
  };

  // Toggle bookmark / saved job
  const toggleSaveJob = (id) => {
    setSavedJobIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isJobSaved = (id) => savedJobIds.includes(id);

  // Reset all filters helper
  const resetFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setSelectedCategory('All');
    setSelectedWorkType('All');
    setSelectedExperience('All');
    setSelectedSalary('Any');
    setSelectedSkill('All');
    setSelectedJobType('All');
    setSortBy('match');
  };

  // Estimate upper salary band (annual, in LPA) from a job's salary string
  const estimateSalaryLPA = (salary = '') => {
    const cleaned = salary.replace(/[₹,]/g, '');
    const nums = cleaned.match(/\d+(?:\.\d+)?/g);
    if (!nums || nums.length === 0) return Infinity;
    const isMonthly = /month|stipend/i.test(salary);
    const top = Number(nums[nums.length - 1]);
    return isMonthly ? (top * 12) / 100000 : top / 100000;
  };

  // Memoized Filtered & Sorted Jobs
  const filteredJobs = useMemo(() => {
    const userSkills = currentUser?.skills || [];

    return jobs
      .map(job => ({
        ...job,
        matchData: calculateJobMatch(userSkills, job)
      }))
      .filter(job => {
        // Fresher mode filter
        if (isFresherMode && !job.isFresherFriendly) {
          return false;
        }

        // Title or Company search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesTitle = job.title.toLowerCase().includes(q);
          const matchesCompany = job.company.toLowerCase().includes(q);
          const matchesSkill = job.requiredSkills.some(s => s.toLowerCase().includes(q));
          if (!matchesTitle && !matchesCompany && !matchesSkill) return false;
        }

        // Location search
        if (locationQuery.trim()) {
          const lq = locationQuery.toLowerCase().trim();
          if (!job.location.toLowerCase().includes(lq)) return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && job.category !== selectedCategory) {
          return false;
        }

        // Work type filter (Remote, Hybrid, On-site)
        if (selectedWorkType !== 'All' && job.workType !== selectedWorkType) {
          return false;
        }

        // Experience filter
        if (selectedExperience !== 'All') {
          const expText = job.experience.toLowerCase();
          const entryLevel = job.isFresherFriendly || expText.includes('intern') || expText.includes('fresher') || expText.includes('0-') || expText.includes('0 -');
          if (selectedExperience === 'Fresher (0 yrs)' && !entryLevel) return false;
          if (selectedExperience === '0-2 Years' && !entryLevel && !expText.includes('1-2')) return false;
          if (selectedExperience === '2+ Years (Mid-Senior)' && entryLevel) return false;
        }

        // Job type filter (Full-time vs Internship / Trainee)
        if (selectedJobType !== 'All') {
          const isInternship = /intern|trainee|students/i.test(job.experience) || /month stipend/i.test(job.salary);
          if (selectedJobType === 'Internship / Trainee' && !isInternship) return false;
          if (selectedJobType === 'Full-time' && isInternship) return false;
        }

        // Salary band filter (upper annual estimate in LPA)
        if (selectedSalary !== 'Any') {
          const lpa = estimateSalaryLPA(job.salary);
          if (selectedSalary === 'Under ₹6 LPA' && lpa >= 6) return false;
          if (selectedSalary === '₹6 - 10 LPA' && (lpa < 6 || lpa >= 10)) return false;
          if (selectedSalary === '₹10 - 20 LPA' && (lpa < 10 || lpa >= 20)) return false;
          if (selectedSalary === '₹20 LPA+' && lpa < 20) return false;
        }

        // Specific Skill filter
        if (selectedSkill !== 'All') {
          const hasSkill = job.requiredSkills.concat(job.preferredSkills || []).some(
            s => s.toLowerCase() === selectedSkill.toLowerCase()
          );
          if (!hasSkill) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'match') {
          return b.matchData.matchPercentage - a.matchData.matchPercentage;
        }
        if (sortBy === 'recent') {
          return b.id.localeCompare(a.id);
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [
    jobs,
    currentUser,
    isFresherMode,
    searchQuery,
    locationQuery,
    selectedCategory,
    selectedWorkType,
    selectedExperience,
    selectedSalary,
    selectedSkill,
    selectedJobType,
    sortBy
  ]);

  return (
    <JobContext.Provider value={{
      jobs,
      filteredJobs,
      savedJobIds,
      isJobSaved,
      toggleSaveJob,
      addJob,
      editJob,
      deleteJob,
      getJobById,
      searchQuery,
      setSearchQuery,
      locationQuery,
      setLocationQuery,
      selectedCategory,
      setSelectedCategory,
selectedWorkType,
    setSelectedWorkType,
    selectedExperience,
    setSelectedExperience,
    selectedSalary,
    setSelectedSalary,
    selectedSkill,
    setSelectedSkill,
    selectedJobType,
    setSelectedJobType,
    sortBy,
    setSortBy,
    resetFilters
    }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}
