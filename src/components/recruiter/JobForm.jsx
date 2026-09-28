import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ALL_BRANCHES, getBranchById, getBranchForCategory, getAllCategories } from '../../data/engineeringBranches';
import { FiX, FiPlus, FiCheckCircle } from 'react-icons/fi';
import '../../styles/forms.css';

const ALL_CATEGORIES = getAllCategories();

export default function JobForm({ initialValues, onSubmit, isEditing = false }) {
  const { currentUser } = useAuth();

  const initialBranch = initialValues?.branch || getBranchForCategory(initialValues?.category)?.id || 'cse-it';
  const [branchId, setBranchId] = useState(initialBranch);
  const branchSkills = getBranchById(branchId)?.skills || [];

  const [formData, setFormData] = useState({
    title: initialValues?.title || '',
    company: initialValues?.company || currentUser?.company || 'Nexus Innovations',
    location: initialValues?.location || 'Bangalore, India (Hybrid)',
    workType: initialValues?.workType || 'Hybrid',
    experience: initialValues?.experience || '0-1 years (Fresher Friendly)',
    isFresherFriendly: initialValues?.isFresherFriendly ?? true,
    salary: initialValues?.salary || '₹6,00,000 - ₹8,50,000 / year',
    category: initialValues?.category || 'Frontend Developer',
    description: initialValues?.description || '',
    responsibilitiesText: initialValues?.responsibilities?.join('\n') || '',
    requiredSkills: initialValues?.requiredSkills || ['React', 'JavaScript', 'HTML', 'CSS'],
    preferredSkills: initialValues?.preferredSkills || ['Git', 'REST API'],
    benefitsText: initialValues?.benefits?.join('\n') || ''
  });

  // Assessment Configuration State
  const [assessmentConfig, setAssessmentConfig] = useState({
    enabled: initialValues?.assessment?.enabled ?? true,
    duration: initialValues?.assessment?.duration || 30,
    totalQuestions: initialValues?.assessment?.totalQuestions || 20,
    categories: initialValues?.assessment?.categories || {
      technical: 40,
      quantitative: 25,
      logical: 15,
      coding: 20
    },
    difficultyPreset: initialValues?.assessment?.difficulty?.hard >= 40
      ? 'advanced'
      : initialValues?.assessment?.difficulty?.easy >= 35
      ? 'internship'
      : 'entryLevel',
    secureMode: Boolean(initialValues?.assessment?.secureMode),
    sebRequired: Boolean(initialValues?.assessment?.sebRequired)
  });

  const [newRequiredSkill, setNewRequiredSkill] = useState('');
  const [newPreferredSkill, setNewPreferredSkill] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Job Title is required.';
    if (!formData.company.trim()) errs.company = 'Company name is required.';
    if (!formData.location.trim()) errs.location = 'Location is required.';
    if (!formData.salary.trim()) errs.salary = 'Salary range is required.';
    if (!formData.description.trim() || formData.description.length < 30) {
      errs.description = 'Please provide a descriptive overview (at least 30 characters).';
    }
    if (formData.requiredSkills.length === 0) {
      errs.requiredSkills = 'Please add at least one required skill.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Tag helper for Required Skills
  const handleAddRequiredSkill = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      const val = newRequiredSkill.trim();
      if (val && !formData.requiredSkills.includes(val)) {
        setFormData(prev => ({
          ...prev,
          requiredSkills: [...prev.requiredSkills, val]
        }));
        setNewRequiredSkill('');
        setErrors(prev => ({ ...prev, requiredSkills: '' }));
      }
    }
  };

  const handleRemoveRequiredSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(s => s !== skill)
    }));
  };

  // Tag helper for Preferred Skills
  const handleAddPreferredSkill = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      const val = newPreferredSkill.trim();
      if (val && !formData.preferredSkills.includes(val)) {
        setFormData(prev => ({
          ...prev,
          preferredSkills: [...prev.preferredSkills, val]
        }));
        setNewPreferredSkill('');
      }
    }
  };

  const handleRemovePreferredSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      preferredSkills: prev.preferredSkills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const responsibilities = formData.responsibilitiesText
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean);

    const benefits = formData.benefitsText
      .split('\n')
      .map(b => b.trim())
      .filter(Boolean);

    const difficultyMap = {
      internship: { easy: 40, medium: 50, hard: 10 },
      entryLevel: { easy: 20, medium: 50, hard: 30 },
      advanced: { easy: 10, medium: 40, hard: 50 }
    };

    const assessment = assessmentConfig.enabled
      ? {
          enabled: true,
          duration: Number(assessmentConfig.duration),
          totalQuestions: Number(assessmentConfig.totalQuestions),
          categories: {
            technical: Number(assessmentConfig.categories.technical || 40),
            quantitative: Number(assessmentConfig.categories.quantitative || 25),
            logical: Number(assessmentConfig.categories.logical || 15),
            coding: Number(assessmentConfig.categories.coding || 20)
          },
          difficulty: difficultyMap[assessmentConfig.difficultyPreset] || { easy: 20, medium: 50, hard: 30 },
          targetSkills: formData.requiredSkills,
          secureMode: Boolean(assessmentConfig.secureMode),
          sebRequired: Boolean(assessmentConfig.sebRequired)
        }
      : {
          enabled: false
        };

    // Drop the textarea helper fields so they never leak into the stored job.
    const jobFields = { ...formData };
    delete jobFields.responsibilitiesText;
    delete jobFields.benefitsText;

    onSubmit({
      ...jobFields,
      branch: branchId,
      responsibilities: responsibilities.length > 0 ? responsibilities : ['Collaborate with engineering teammates.'],
      benefits: benefits.length > 0 ? benefits : ['Comprehensive health and learning benefits.'],
      assessment
    });
  };

  const handleBranchChange = (e) => {
    const next = e.target.value;
    setBranchId(next);
    const branch = getBranchById(next);
    // Adapt role + skills to the branch so jobs/assessments stay branch-aligned
    if (branch && branch.roles.length > 0) {
      setFormData(prev => ({
        ...prev,
        category: branch.roles[0],
        requiredSkills: branch.skills.slice(0, 4),
        preferredSkills: branch.skills.slice(4, 7),
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-header">
        <h2>{isEditing ? 'Edit Job Opening' : 'Post an Opportunity for Freshers & Students'}</h2>
        <p>Our Smart Job Match system will compute candidate alignment against your required skills.</p>
      </div>

      {/* Row 1: Title & Company */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Job Title <span className="required">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Junior Frontend Developer"
          />
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Company Name <span className="required">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Nexus Innovations"
          />
          {errors.company && <span className="form-error">{errors.company}</span>}
        </div>
      </div>

      {/* Branch selector: adapts role + skills + assessment topics */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Engineering Branch <span className="required">*</span></label>
          <select value={branchId} onChange={handleBranchChange}>
            {ALL_BRANCHES.map(b => (
              <option key={b.id} value={b.id}>{b.label} — {b.description}</option>
            ))}
          </select>
          <span className="form-hint">Role, skills and assessment topics auto-adapt to this branch.</span>
        </div>

        <div className="form-group">
          <label className="form-label">Suggested {getBranchById(branchId)?.short || ''} Skills</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {branchSkills.slice(0, 8).map(s => (
              <button
                key={s}
                type="button"
                className="btn btn-sm btn-outline"
                onClick={() => setFormData(prev => prev.requiredSkills.includes(s) ? prev : { ...prev, requiredSkills: [...prev.requiredSkills, s] })}
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Category, Work Type, Experience */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Category / Role</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            {(getBranchById(branchId)?.roles || ALL_CATEGORIES).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Work Type</label>
          <select name="workType" value={formData.workType} onChange={handleChange}>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Experience Level</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g. 0-1 years (Fresher Friendly)"
          />
        </div>
      </div>

      {/* Row 3: Location, Salary, Fresher checkbox */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Location <span className="required">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Bangalore, India (Hybrid)"
          />
          {errors.location && <span className="form-error">{errors.location}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Salary / Stipend <span className="required">*</span>
          </label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g. ₹6,00,000 - ₹8,50,000 / year"
          />
          {errors.salary && <span className="form-error">{errors.salary}</span>}
        </div>
      </div>

      <div className="form-group" style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="isFresherFriendly"
            checked={formData.isFresherFriendly}
            onChange={handleChange}
          />
          <span>🌱 Mark as <strong>Fresher Friendly</strong> (High priority for entry-level candidates and new grads)</span>
        </label>
      </div>

      {/* Required Skills (Interactive Tag Editor) */}
      <div className="form-group">
        <label className="form-label">
          Required Core Skills <span className="required">*</span>
        </label>
        <span className="form-hint">These skills directly determine student match percentage. Press enter to add.</span>
        <div className="tags-input-container" style={{ marginTop: '0.4rem' }}>
          {formData.requiredSkills.map(skill => (
            <span key={skill} className="tag-pill">
              {skill}
              <button type="button" onClick={() => handleRemoveRequiredSkill(skill)}>
                <FiX />
              </button>
            </span>
          ))}
          <input
            type="text"
            className="tag-input-field"
            value={newRequiredSkill}
            onChange={(e) => setNewRequiredSkill(e.target.value)}
            onKeyDown={handleAddRequiredSkill}
            placeholder="Type skill and press Enter (e.g. React, SQL, Python)..."
          />
        </div>
        {errors.requiredSkills && <span className="form-error">{errors.requiredSkills}</span>}
      </div>

      {/* Preferred Skills */}
      <div className="form-group">
        <label className="form-label">Preferred / Bonus Skills (Optional)</label>
        <div className="tags-input-container">
          {formData.preferredSkills.map(skill => (
            <span key={skill} className="tag-pill" style={{ background: 'var(--bg-subtle)' }}>
              {skill}
              <button type="button" onClick={() => handleRemovePreferredSkill(skill)}>
                <FiX />
              </button>
            </span>
          ))}
          <input
            type="text"
            className="tag-input-field"
            value={newPreferredSkill}
            onChange={(e) => setNewPreferredSkill(e.target.value)}
            onKeyDown={handleAddPreferredSkill}
            placeholder="Add bonus skill (e.g. Docker, TypeScript)..."
          />
        </div>
      </div>

      {/* Description */}
      <div className="form-group">
        <label className="form-label">
          Job Description Overview <span className="required">*</span>
        </label>
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          placeholder="Detailed overview of team, mentorship, and mission..."
        />
        {errors.description && <span className="form-error">{errors.description}</span>}
      </div>

      {/* Responsibilities (Line by line) */}
      <div className="form-group">
        <label className="form-label">Key Responsibilities (One per line)</label>
        <textarea
          name="responsibilitiesText"
          rows="4"
          value={formData.responsibilitiesText}
          onChange={handleChange}
          placeholder="Implement responsive React components&#10;Consume RESTful APIs&#10;Participate in agile sprint ceremonies"
        />
      </div>

      {/* Benefits */}
      <div className="form-group">
        <label className="form-label">Benefits & Perks (One per line)</label>
        <textarea
          name="benefitsText"
          rows="3"
          value={formData.benefitsText}
          onChange={handleChange}
          placeholder="Mentorship with staff engineers&#10;Learning & certification allowance&#10;Flexible remote schedule"
        />
      </div>

      {/* Assessment Engine Configuration Section */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '2px solid var(--border-medium)',
        backgroundColor: 'var(--bg-card)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--primary-navy)' }}>
              🎯 Company & Role Assessment Engine
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              Configure a tailored candidate readiness assessment. The question bank automatically selects relevant questions.
            </p>
          </div>

          <label className="checkbox-label" style={{ fontWeight: 700, fontSize: '0.92rem' }}>
            <input
              type="checkbox"
              checked={assessmentConfig.enabled}
              onChange={(e) => setAssessmentConfig(prev => ({ ...prev, enabled: e.target.checked }))}
            />
            <span>Assessment Required: <strong>{assessmentConfig.enabled ? 'Yes' : 'No'}</strong></span>
          </label>
        </div>

        {assessmentConfig.enabled && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
            {/* Row 1: Duration & Question Count */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Duration</label>
                <select
                  value={assessmentConfig.duration}
                  onChange={(e) => setAssessmentConfig(prev => ({ ...prev, duration: Number(e.target.value) }))}
                >
                  <option value={15}>15 Minutes (Quick Screening)</option>
                  <option value={20}>20 Minutes</option>
                  <option value={25}>25 Minutes</option>
                  <option value={30}>30 Minutes (Standard)</option>
                  <option value={45}>45 Minutes (Comprehensive)</option>
                  <option value={60}>60 Minutes (Deep Evaluation)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Total Questions</label>
                <select
                  value={assessmentConfig.totalQuestions}
                  onChange={(e) => setAssessmentConfig(prev => ({ ...prev, totalQuestions: Number(e.target.value) }))}
                >
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions</option>
                  <option value={20}>20 Questions (Recommended)</option>
                  <option value={30}>30 Questions</option>
                  <option value={40}>40 Questions</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Difficulty Distribution</label>
                <select
                  value={assessmentConfig.difficultyPreset}
                  onChange={(e) => setAssessmentConfig(prev => ({ ...prev, difficultyPreset: e.target.value }))}
                >
                  <option value="internship">🌱 Internship (Easy: 40%, Med: 50%, Hard: 10%)</option>
                  <option value="entryLevel">💼 Entry-Level (Easy: 20%, Med: 50%, Hard: 30%)</option>
                  <option value="advanced">🚀 Advanced (Easy: 10%, Med: 40%, Hard: 50%)</option>
                </select>
              </div>
            </div>

            {/* Row 2: Category Distribution Weights */}
            <div>
              <label className="form-label" style={{ marginBottom: '0.4rem' }}>
                Category Distribution Weights (%)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))', gap: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Technical</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={assessmentConfig.categories.technical}
                    onChange={(e) => setAssessmentConfig(prev => ({
                      ...prev,
                      categories: { ...prev.categories, technical: Number(e.target.value) }
                    }))}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Quantitative</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={assessmentConfig.categories.quantitative}
                    onChange={(e) => setAssessmentConfig(prev => ({
                      ...prev,
                      categories: { ...prev.categories, quantitative: Number(e.target.value) }
                    }))}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Logical</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={assessmentConfig.categories.logical}
                    onChange={(e) => setAssessmentConfig(prev => ({
                      ...prev,
                      categories: { ...prev.categories, logical: Number(e.target.value) }
                    }))}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Coding</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={assessmentConfig.categories.coding}
                    onChange={(e) => setAssessmentConfig(prev => ({
                      ...prev,
                      categories: { ...prev.categories, coding: Number(e.target.value) }
                    }))}
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Security & Safe Exam Browser Toggle */}
            <div style={{
              background: 'var(--bg-subtle)',
              padding: '0.85rem 1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-light)'
            }}>
              <label className="checkbox-label" style={{ fontSize: '0.88rem' }}>
                <input
                  type="checkbox"
                  checked={assessmentConfig.secureMode}
                  onChange={(e) => setAssessmentConfig(prev => ({
                    ...prev,
                    secureMode: e.target.checked,
                    sebRequired: e.target.checked
                  }))}
                />
                <span>
                  🛡️ Enable <strong>Safe Exam Browser (SEB) Controlled Mode</strong> (Logs tab blur/focus interruptions & requests fullscreen)
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button type="submit" className="btn btn-primary btn-lg">
          <FiCheckCircle /> {isEditing ? 'Save Changes' : 'Publish Job Opening'}
        </button>
      </div>
    </form>
  );
}
