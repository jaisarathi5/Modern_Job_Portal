import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import SkillBadge from '../components/jobs/SkillBadge';
import { 
  FiUser, 
  FiMail, 
  FiBook, 
  FiPlus, 
  FiX, 
  FiSave, 
  FiFileText, 
  FiPhone, 
  FiMapPin, 
  FiCheckCircle 
} from 'react-icons/fi';
import '../styles/forms.css';

const SUGGESTED_SKILLS = [
  'React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Node.js', 
  'Python', 'Java', 'SQL', 'PostgreSQL', 'MongoDB', 'Git', 
  'Docker', 'Machine Learning', 'Figma', 'REST API', 'Testing'
];

export default function Profile() {
  const { currentUser, updateProfile, addSkill, removeSkill } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    location: currentUser?.location || '',
    title: currentUser?.title || '',
    college: currentUser?.college || '',
    degree: currentUser?.degree || '',
    gpa: currentUser?.gpa || '',
    bio: currentUser?.bio || '',
    resumeText: currentUser?.resumeText || ''
  });

  const [newSkillInput, setNewSkillInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(formData);
    addToast('Profile updated! Job match percentages refreshed.', 'success');
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      const val = newSkillInput.trim();
      if (val) {
        addSkill(val);
        setNewSkillInput('');
        addToast(`Added "${val}" to your skills!`, 'success');
      }
    }
  };

  const handleQuickAdd = (skill) => {
    addSkill(skill);
    addToast(`Added "${skill}"!`, 'success');
  };

  return (
    <div className="container container-narrow page">
      <div className="form-card">
        <div className="form-header">
          <span className="badge badge-navy" style={{ marginBottom: '0.4rem' }}>
            Profile & Skills
          </span>
          <h2>Your Skill Portfolio & Experience Details</h2>
          <p>
            The skills you list here power our <strong>Smart Job Match</strong> calculation across every job on the platform.
          </p>
        </div>

        {/* 1. Interactive Skills Management Section */}
        <div style={{
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <label className="form-label" style={{ margin: 0 }}>
              Active Skills ({currentUser?.skills?.length || 0})
            </label>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Click (×) to remove any skill
            </span>
          </div>

          {/* Active Skills Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1rem' }}>
            {currentUser?.skills?.map(skill => (
              <span key={skill} className="tag-pill" style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}>
                {skill}
                <button
                  type="button"
                  onClick={() => {
                    removeSkill(skill);
                    addToast(`Removed "${skill}"`, 'info');
                  }}
                  title="Remove skill"
                >
                  <FiX />
                </button>
              </span>
            ))}
          </div>

          {/* Add Skill Input */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <input
              type="text"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="Add skill (e.g. TypeScript, AWS, Figma) and press Enter..."
              style={{ background: 'var(--bg-card)' }}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddSkill}
            >
              <FiPlus /> Add
            </button>
          </div>

          {/* Quick Add Suggestions */}
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
              Suggested Technologies:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {SUGGESTED_SKILLS.filter(s => !currentUser?.skills?.includes(s)).slice(0, 8).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleQuickAdd(s)}
                  style={{
                    fontSize: '0.75rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: '999px',
                    padding: '0.2rem 0.55rem',
                    cursor: 'pointer',
                    color: 'var(--primary-blue)',
                    fontWeight: 500
                  }}
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Personal & Academic Details Form */}
        <form onSubmit={handleSaveProfile}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Alex Chen"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alex.chen@university.edu"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Headline / Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Final Year CS Student & Frontend Enthusiast"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Bangalore, India"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">College / University</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="Apex Institute of Technology"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Degree & Graduation Year</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="B.Tech in Computer Science (2025)"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">CGPA / Percentage</label>
              <input
                type="text"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                placeholder="8.8 / 10.0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">About / Bio</label>
            <textarea
              name="bio"
              rows="3"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Brief overview of your academic interests and career goals..."
            />
          </div>

          {/* Resume Raw Text for Keyword Matching */}
          <div className="form-group">
            <label className="form-label">
              Resume Text (Used by Resume Analyzer)
            </label>
            <span className="form-hint">
              Paste your plaintext resume content here. The system extracts technical keywords to match jobs.
            </span>
            <textarea
              name="resumeText"
              rows="6"
              value={formData.resumeText}
              onChange={handleChange}
              placeholder="Paste plain text of your resume here..."
              style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '1rem' }}>
            <FiSave /> Save Profile & Recalculate Matches
          </button>
        </form>
      </div>
    </div>
  );
}
