import React from 'react';
import { useJobs } from '../../context/JobContext';
import { useAuth } from '../../context/AuthContext';
import { ALL_BRANCHES, getAllCategories, getAllBranchSkills } from '../../data/engineeringBranches';
import { getSortOptions } from '../../data/jobSortOptions';
import { FiFilter, FiRotateCcw, FiLayers, FiBriefcase, FiMapPin, FiCode, FiBarChart2, FiDollarSign, FiSmile, FiX, FiCpu } from 'react-icons/fi';
import '../../styles/filter-panel.css';

const CATEGORIES = ['All', ...getAllCategories()];

const JOB_TYPES = ['All', 'Full-time', 'Internship / Trainee'];

const WORK_TYPES = ['All', 'Remote', 'Hybrid', 'On-site'];

const EXPERIENCE_LEVELS = ['All', 'Fresher (0 yrs)', '0-2 Years', '2+ Years (Mid-Senior)'];

const SALARY_BANDS = ['Any', 'Under ₹6 LPA', '₹6 - 10 LPA', '₹10 - 20 LPA', '₹20 LPA+'];

const POPULAR_SKILLS = ['All', ...getAllBranchSkills().slice(0, 24)];

export default function FilterPanel({ open = false, onClose = () => {} }) {
  const {
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
    locationQuery,
    setLocationQuery,
    sortBy,
    setSortBy,
    resetFilters
  } = useJobs();

  const { isFresherMode, toggleFresherMode, currentUser } = useAuth();

  // Footer track shortcuts can pick a skill that is not part of the popular
  // list; keep it in the dropdown so the select never renders blank.
  const skillOptions = POPULAR_SKILLS.includes(selectedSkill)
    ? POPULAR_SKILLS
    : [...POPULAR_SKILLS, selectedSkill];

  return (
    <aside className={`filter-panel ${open ? 'open' : ''}`}>
      <div className="filter-panel-head">
        <div className="filter-panel-title">
          <FiFilter /> <span>Filter Jobs</span>
        </div>
        <div className="filter-panel-head-actions">
          <button
            type="button"
            className="filter-reset-btn"
            onClick={resetFilters}
            title="Reset all filters"
          >
            <FiRotateCcw /> Reset
          </button>
          <button type="button" className="filter-close-btn" onClick={onClose} aria-label="Close filters">
            <FiX />
          </button>
        </div>
      </div>

      {/* Fresher Mode Switch */}
      <div className={`filter-fresher-card ${isFresherMode ? 'active' : ''}`} style={{ cursor: 'pointer' }} onClick={toggleFresherMode}>
        <div>
          <strong>🌱 Fresher Focus</strong>
          <span>Only 0-1 yrs exp & internships</span>
        </div>
        <input
          type="checkbox"
          checked={isFresherMode}
          onChange={toggleFresherMode}
          aria-label="Toggle Fresher Mode"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Engineering Branch — adapts catalog to candidate branch */}
      <div className="filter-group">
        <label className="filter-label">
          <FiCpu /> Engineering Branch
        </label>
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Branches (12 domains)</option>
          {ALL_BRANCHES.map(b => (
            <option key={b.id} value={b.id}>{b.label} — {b.short}</option>
          ))}
        </select>
      </div>

      {/* Job Type */}
      <div className="filter-group">
        <label className="filter-label">
          <FiBriefcase /> Job Type
        </label>
        <div className="filter-chip-row">
          {JOB_TYPES.map(type => (
            <button
              key={type}
              type="button"
              className={`filter-chip ${selectedJobType === type ? 'active' : ''}`}
              onClick={() => setSelectedJobType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="filter-group">
        <label className="filter-label">
          <FiMapPin /> Location
        </label>
        <div className="filter-input-wrap">
          <FiMapPin className="filter-input-icon" />
          <input
            type="text"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            placeholder="City, state, or 'Remote'"
          />
          {locationQuery && (
            <button type="button" className="filter-input-clear" onClick={() => setLocationQuery('')} aria-label="Clear location">
              <FiX />
            </button>
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="filter-group">
        <label className="filter-label">
          <FiSmile /> Experience
        </label>
        <select
          value={selectedExperience}
          onChange={(e) => setSelectedExperience(e.target.value)}
          className="filter-select"
        >
          {EXPERIENCE_LEVELS.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* Salary */}
      <div className="filter-group">
        <label className="filter-label">
          <FiDollarSign /> Salary Range
        </label>
        <select
          value={selectedSalary}
          onChange={(e) => setSelectedSalary(e.target.value)}
          className="filter-select"
        >
          {SALARY_BANDS.map(band => (
            <option key={band} value={band}>{band}</option>
          ))}
        </select>
      </div>

      {/* Work Type */}
      <div className="filter-group">
        <label className="filter-label">
          <FiLayers /> Work Arrangement
        </label>
        <div className="filter-chip-row">
          {WORK_TYPES.map(type => (
            <button
              key={type}
              type="button"
              className={`filter-chip ${selectedWorkType === type ? 'active' : ''}`}
              onClick={() => setSelectedWorkType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Domain / Category */}
      <div className="filter-group">
        <label className="filter-label">
          <FiBarChart2 /> Domain
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Skills */}
      <div className="filter-group">
        <label className="filter-label">
          <FiCode /> Key Skill
        </label>
        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="filter-select"
        >
          {skillOptions.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className="filter-group">
        <label className="filter-label">
          <FiBarChart2 /> Sort Results By
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          {getSortOptions(Boolean(currentUser)).map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <button type="button" className="filter-apply-btn" onClick={resetFilters}>
        <FiRotateCcw /> Clear All Filters
      </button>
    </aside>
  );
}