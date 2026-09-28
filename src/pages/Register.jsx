import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import Logo from '../components/common/Logo';
import { FiUserPlus } from 'react-icons/fi';
import '../styles/forms.css';

export default function Register() {
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // A route guard may have redirected the visitor here: send them back to the
  // page they originally asked for once a matching role is registered.
  const resolveDestination = (nextRole) => {
    const homeRoute = nextRole === 'jobseeker' ? '/dashboard' : '/recruiter';
    const from = location.state?.from;
    if (!from) return homeRoute;

    const allowedPrefixes = nextRole === 'jobseeker'
      ? ['/dashboard', '/applications', '/profile']
      : ['/recruiter'];

    const isAllowed = allowedPrefixes.some(prefix => from === prefix || from.startsWith(`${prefix}/`));
    return isAllowed ? from : homeRoute;
  };

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
    const result = register({
      ...formData,
      role
    });
    if (!result.success) {
      addToast(result.message, 'error');
      return;
    }
    addToast(`Account created as ${role === 'jobseeker' ? 'Job Seeker' : 'Recruiter'}!`, 'success');
    navigate(resolveDestination(role), { replace: true });
  };

  return (
    <div className="page-auth">
      <div className="form-card">
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'var(--gradient-brand)',
            color: 'var(--on-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            margin: '0 auto 0.85rem',
            boxShadow: 'var(--shadow-brand)'
          }}>
            <Logo variant="icon" size={26} mono />
          </div>
          <h2 style={{ margin: '0 0 0.4rem' }}>
            Create an Account
          </h2>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            Join SkillBridge to calculate real-time skills alignment and explore top hiring
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
