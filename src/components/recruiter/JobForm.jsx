import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiX, FiPlus, FiCheckCircle } from 'react-icons/fi';
import '../../styles/forms.css';

export default function JobForm({ initialValues, onSubmit, isEditing = false }) {
  const { currentUser } = useAuth();

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

    onSubmit({
      ...formData,
      responsibilities: responsibilities.length > 0 ? responsibilities : ['Collaborate with engineering teammates.'],
      benefits: benefits.length > 0 ? benefits : ['Comprehensive health and learning benefits.']
    });
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

      {/* Row 2: Category, Work Type, Experience */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="AI/ML Intern">AI/ML Intern</option>
            <option value="Java Developer">Java Developer</option>
            <option value="Python Developer">Python Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Software Engineer">Software Engineer</option>
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

      {/* Submit Button */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button type="submit" className="btn btn-primary btn-lg">
          <FiCheckCircle /> {isEditing ? 'Save Changes' : 'Publish Job Opening'}
        </button>
      </div>
    </form>
  );
}
