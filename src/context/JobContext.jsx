import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_JOBS } from '../data/initialJobs';
import { ALL_SEED_JOBS } from '../data/allJobs';
import { getBranchForCategory } from '../data/engineeringBranches';
import { useAuth } from './AuthContext';
import { calculateJobMatch } from '../utils/jobMatcher';
import { parsePostedDaysAgo } from '../utils/jobRecency';
import { estimateSalaryLPA } from '../utils/salaryParser';
import { getSortOptions } from '../data/jobSortOptions';

const JobContext = createContext();

export function JobProvider({ children }) {
  const { currentUser, isFresherMode } = useAuth();

  // Load jobs from localStorage or fallback to multi-branch seed.
  // Branch is backfilled from category so legacy saved jobs also adapt.
  // Stored version key lets us refresh seed when new branches are added.
  const SEED_VERSION = 3;
  const withBranch = (j) => ({
    ...j,
    branch: j.branch || getBranchForCategory(j.category)?.id || 'general',
  });
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('sb_jobs');
    const savedVer = Number(localStorage.getItem('sb_jobs_ver') || 0);
    if (saved && savedVer >= SEED_VERSION) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(j => {
          const matchInitial = ALL_SEED_JOBS.find(init => init.id === j.id);
          const merged = matchInitial && matchInitial.assessment && !j.assessment
            ? { ...j, assessment: matchInitial.assessment }
            : j;
          return withBranch(merged);
        });
      } catch (e) {
        console.error('Failed to parse saved jobs', e);
      }
    }
    return ALL_SEED_JOBS.map(withBranch);
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
  const [selectedBranch, setSelectedBranch] = useState('All');
  // Single source of truth for ordering; the options live in data/jobSortOptions.js
  const [sortBy, setSortBy] = useState('match'); // 'match' | 'recent' | 'applicants' | 'title'

  // "match" sorting is profile-based, so it is hidden from signed-out visitors
  // (see data/jobSortOptions.js). They can still arrive here with that value as
  // the default, which would leave the <select> showing nothing — so fall back to
  // the first option they are actually allowed to pick.
  const availableSortOptions = getSortOptions(Boolean(currentUser));
  const effectiveSortBy = availableSortOptions.some((o) => o.value === sortBy)
    ? sortBy
    : availableSortOptions[0].value;

  // Persist jobs & bookmarks (+ seed version so branch seed refreshes once)
  useEffect(() => {
    localStorage.setItem('sb_jobs', JSON.stringify(jobs));
    localStorage.setItem('sb_jobs_ver', String(SEED_VERSION));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('sb_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  // Recruiter actions
  const addJob = (jobData) => {
    const branchId = jobData.branch || getBranchForCategory(jobData.category)?.id || 'general';
    const branchInfo = getBranchForCategory(jobData.category);
    const newJob = {
      id: `job-${Date.now()}`,
      postedDate: 'Just now',
      applicantsCount: 0,
      logoBg: branchInfo?.color || '#2563EB',
      ...jobData,
      branch: branchId,
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

  // Bump the advertised applicant count when a real application is submitted
  const incrementApplicants = (jobId) => {
    setJobs(prev => prev.map(job => (
      String(job.id) === String(jobId)
        ? { ...job, applicantsCount: (job.applicantsCount || 0) + 1 }
        : job
    )));
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
    setSelectedBranch('All');
    setSelectedWorkType('All');
    setSelectedExperience('All');
    setSelectedSalary('Any');
    setSelectedSkill('All');
    setSelectedJobType('All');
    setSortBy('match');
  };

  // Filter jobs by salary band using robust salary parser
  const passesSalaryFilter = (jobSalary, band) => {
    if (band === 'Any') return true;
    const lpa = estimateSalaryLPA(jobSalary);
    if (band === 'Under ₹6 LPA') return lpa < 6;
    if (band === '₹6 - 10 LPA') return lpa >= 6 && lpa < 10;
    if (band === '₹10 - 20 LPA') return lpa >= 10 && lpa < 20;
    if (band === '₹20 LPA+') return lpa >= 20;
    return true;
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

        // Branch filter (adapts catalog to candidate engineering branch)
        if (selectedBranch !== 'All') {
          const jobBranch = job.branch || getBranchForCategory(job.category)?.id || 'general';
          if (jobBranch !== selectedBranch) return false;
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
        if (selectedSalary !== 'Any' && !passesSalaryFilter(job.salary, selectedSalary)) {
          return false;
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
        if (effectiveSortBy === 'match') {
          return b.matchData.matchPercentage - a.matchData.matchPercentage;
        }
        if (effectiveSortBy === 'recent') {
          return parsePostedDaysAgo(a.postedDate) - parsePostedDaysAgo(b.postedDate);
        }
        if (effectiveSortBy === 'applicants') {
          // Fewest applicants first: the best chance of an early application.
          return (a.applicantsCount || 0) - (b.applicantsCount || 0);
        }
        if (effectiveSortBy === 'title') {
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
    selectedBranch,
    selectedCategory,
    selectedWorkType,
    selectedExperience,
    selectedSalary,
    selectedSkill,
    selectedJobType,
    effectiveSortBy
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
      incrementApplicants,
      getJobById,
      searchQuery,
      setSearchQuery,
      locationQuery,
      setLocationQuery,
      selectedBranch,
      setSelectedBranch,
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
      sortBy: effectiveSortBy,
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
