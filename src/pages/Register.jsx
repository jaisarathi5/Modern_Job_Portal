import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { FiUserPlus, FiZap } from 'react-icons/fi';
import '../styles/forms.css';

export default function Register() {
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [role, setRole] = useState('jobseeker');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    degree: '',
    skills: 'React, JavaScript, HTML, CSS, SQL',
    company: '',
    designation: '',
    isFresher: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({
      ...formData,
      role
    });
    addToast(`Account created as ${role === 'jobseeker' ? 'Job Seeker' : 'Recruiter'}!`, 'success');
    navigate(role === 'jobseeker' ? '/dashboard' : '/recruiter');
  };

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem 5rem', maxWidth: '560px' }}>
      <div className="form-card">
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary-blue), var(--accent-indigo))',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            margin: '0 auto 0.85rem',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
          }}>
            <FiZap />
          </div>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-navy)', margin: '0 0 0.4rem' }}>
            Create an Account
          </h2>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            Join SkillBridge to calculate real-time skills alignment and explore top tech hiring
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="form-group">
          <label className="form-label">I am joining as a:</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
            <button
              type="button"
              className={`btn ${role === 'jobseeker' ? 'btn-primary' : 'btn-outline'} btn-sm`}
              onClick={() => setRole('jobseeker')}
            >
              🎓 Student / Fresher
            </button>
            <button
              type="button"
              className={`btn ${role === 'recruiter' ? 'btn-primary' : 'btn-outline'} btn-sm`}
              onClick={() => setRole('recruiter')}
            >
              🏢 Recruiter / Hiring Lead
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Chen"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={role === 'jobseeker' ? 'alex.chen@university.edu' : 'recruiter@company.com'}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          {/* Role-specific fields */}
          {role === 'jobseeker' ? (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">College / University</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="e.g. Apex Institute of Tech"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Degree & Year</label>
                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    placeholder="B.Tech CS (2025)"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Your Skills (Comma-separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, JavaScript, HTML, CSS, SQL, Python"
                />
                <span className="form-hint">These skills will immediately calculate your match % on all jobs.</span>
              </div>
            </>
          ) : (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    required
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Nexus Innovations"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Designation / Title</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="e.g. University Talent Partner"
                  />
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.8rem' }}>
            <FiUserPlus /> Complete Registration
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
