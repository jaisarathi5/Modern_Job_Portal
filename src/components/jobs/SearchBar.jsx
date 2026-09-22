import React from 'react';
import { useJobs } from '../../context/JobContext';
import { FiSearch, FiMapPin, FiX } from 'react-icons/fi';

export default function SearchBar({ onSearchSubmit }) {
  const { searchQuery, setSearchQuery, locationQuery, setLocationQuery } = useJobs();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="hero-search-form">
      {/* Role / Skill / Keyword Search */}
      <div className="search-field-group">
        <FiSearch className="search-field-icon" />
        <div className="search-field-text">
          <span className="search-field-label">What</span>
          <input
            type="text"
            className="search-field-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Job title, skill (e.g. React, Python), or company"
          />
        </div>
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => setSearchQuery('')}
            title="Clear search"
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
      </div>

      {/* Vertical divider */}
      <div className="search-bar-divider" />

      {/* Location Search */}
      <div className="search-field-group">
        <FiMapPin className="search-field-icon" />
        <div className="search-field-text">
          <span className="search-field-label">Where</span>
          <input
            type="text"
            className="search-field-input"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            placeholder="City, state, or 'Remote'"
          />
        </div>
        {locationQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => setLocationQuery('')}
            title="Clear location"
            aria-label="Clear location"
          >
            <FiX />
          </button>
        )}
      </div>

      {/* Search CTA */}
      <button type="submit" className="btn btn-primary search-submit-btn">
        <FiSearch /> <span>Search Jobs</span>
      </button>
    </form>
  );
}
