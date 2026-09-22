import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { FiLogIn, FiUserCheck, FiBriefcase, FiZap } from 'react-icons/fi';
import '../styles/forms.css';

export default function Login() {
  const { login, switchToStudent, switchToRecruiter } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [role, setRole] = useState('jobseeker'); // 'jobseeker' | 'recruiter'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, role);
    addToast(`Signed in as ${role === 'jobseeker' ? 'Job Seeker' : 'Recruiter'}`, 'success');
    navigate(role === 'jobseeker' ? '/dashboard' : '/recruiter');
  };

  const handleDemoStudent = () => {
    switchToStudent();
    addToast('Logged in as Demo Student (Alex Chen)', 'success');
    navigate('/dashboard');
  };

  const handleDemoRecruiter = () => {
    switchToRecruiter();
    addToast('Logged in as Demo Recruiter (Sarah Miller)', 'success');
    navigate('/recruiter');
  };

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem 5rem', maxWidth: '520px' }}>
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
            Welcome Back
          </h2>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            Sign in to access your skills dashboard or recruiter portal
          </p>
        </div>

        {/* 1-Click Demo Login Shortcuts */}
        <div style={{
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-light)',
          borderRadius: '12px',
          padding: '1.1rem',
          marginBottom: '1.75rem'
        }}>
          <span style={{
            fontSize: '0.74rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            color: 'var(--primary-navy)',
            display: 'block',
            marginBottom: '0.6rem'
          }}>
            ⚡ 1-Click Persona Shortcuts:
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              style={{ justifyContent: 'flex-start', background: '#FFFFFF' }}
              onClick={handleDemoStudent}
            >
              <FiUserCheck style={{ color: 'var(--primary-blue)' }} />
              <strong>Demo Job Seeker:</strong> Alex Chen (CS Fresher)
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              style={{ justifyContent: 'flex-start', background: '#FFFFFF' }}
              onClick={handleDemoRecruiter}
            >
              <FiBriefcase style={{ color: 'var(--primary-blue)' }} />
              <strong>Demo Recruiter:</strong> Sarah Miller (Tech Hiring)
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit}>
          {/* Role Selection Tabs */}
          <div className="form-group">
            <label className="form-label">Select Account Role</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              <button
                type="button"
                className={`btn ${role === 'jobseeker' ? 'btn-primary' : 'btn-outline'} btn-sm`}
                onClick={() => setRole('jobseeker')}
              >
                Job Seeker / Fresher
              </button>
              <button
                type="button"
                className={`btn ${role === 'recruiter' ? 'btn-primary' : 'btn-outline'} btn-sm`}
                onClick={() => setRole('recruiter')}
              >
                Recruiter
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'jobseeker' ? 'student@university.edu' : 'recruiter@company.com'}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
            <FiLogIn /> Sign In
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Don't have an account yet?{' '}
          <Link to="/register" style={{ fontWeight: 600, color: 'var(--muted-rose)' }}>
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}
