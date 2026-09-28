import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/jobs/SearchBar';
import JobCard from '../components/jobs/JobCard';
import MatchScore from '../components/jobs/MatchScore';
import { JOB_CARD_IMAGES } from '../data/jobCardImages';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { estimateSalaryLPA } from '../utils/salaryParser';
import {
  FiZap,
  FiCheckCircle,
  FiAward,
  FiBriefcase,
  FiCode,
  FiDatabase,
  FiCpu,
  FiCompass,
  FiArrowRight,
  FiUsers,
  FiCheck,
  FiTerminal,
  FiSmartphone,
  FiGitBranch,
  FiLayers,
  FiMapPin,
  FiThumbsUp,
  FiShield,
  FiTrendingUp,
  FiTarget,
  FiFileText
} from 'react-icons/fi';
import '../styles/home.css';

/* Real photography (Unsplash CDN) — professional, elegant, fast via w/q params */
const HERO_MAIN_IMG = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80';
const HERO_SMALL_A = 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=420&q=80';
const HERO_SMALL_B = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=420&q=80';
const DUAL_CANDIDATE_IMG = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';
const DUAL_EMPLOYER_IMG = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80';

/* Every track card carries the catalog filter it represents, so a click can
   never land on a mismatched or empty result list. */
const CATEGORY_CARDS = [
  {
    name: 'Full Stack Developer',
    icon: FiBriefcase,
    accent: '#141a34',
    salary: '₹8 - 22 LPA',
    skills: ['MERN', 'Node.js', 'PostgreSQL', 'Docker'],
    filter: { category: 'Full Stack Developer' }
  },
  {
    name: 'Embedded & VLSI',
    icon: FiCpu,
    accent: '#6d5dd3',
    salary: '₹5 - 14 LPA',
    skills: ['Embedded C', 'VLSI', 'Verilog', 'Microcontrollers'],
    filter: { category: 'Embedded Systems Engineer' }
  },
  {
    name: 'Power & Control',
    icon: FiZap,
    accent: '#b45309',
    salary: '₹5 - 13 LPA',
    skills: ['Power Systems', 'Control Systems', 'PLC', 'MATLAB'],
    filter: { category: 'Power Systems Engineer' }
  },
  {
    name: 'Mechanical Design',
    icon: FiCompass,
    accent: '#4338ca',
    salary: '₹4.8 - 12 LPA',
    skills: ['CAD', 'Thermodynamics', 'FEA', 'AutoCAD'],
    filter: { category: 'Design Engineer' }
  },
  {
    name: 'Civil & Site',
    icon: FiLayers,
    accent: '#0d9488',
    salary: '₹4.2 - 10 LPA',
    skills: ['Surveying', 'Concrete Technology', 'Estimation', 'STAAD Pro'],
    filter: { category: 'Site Engineer' }
  },
  {
    name: 'Chemical & Process',
    icon: FiTrendingUp,
    accent: '#16a34a',
    salary: '₹5 - 11 LPA',
    skills: ['Mass Transfer', 'Heat Transfer', 'Process Design', 'PFDs'],
    filter: { category: 'Process Engineer' }
  },
  {
    name: 'AI/ML Intern',
    icon: FiGitBranch,
    accent: '#2b3170',
    salary: '₹10 - 24 LPA',
    skills: ['PyTorch', 'Python', 'LLMs', 'NLP'],
    filter: { category: 'AI/ML Intern' }
  },
  {
    name: 'Data Analyst',
    icon: FiDatabase,
    accent: '#232a4d',
    salary: '₹6 - 14 LPA',
    skills: ['SQL', 'PowerBI', 'Python', 'Tableau'],
    filter: { category: 'Data Analyst' }
  }
];

/* Hero trending chips — each chip declares the filter it actually represents. */
const HERO_TAGS = [
  { label: 'Fresher Friendly', experience: 'Fresher (0 yrs)' },
  { label: 'Remote', workType: 'Remote' },
  { label: 'Embedded', search: 'Embedded' },
  { label: 'Mechanical', search: 'Mechanical' },
  { label: 'Power Systems', search: 'Power Systems' },
  { label: 'Python', search: 'Python' }
];

const HIRING_COMPANIES = [
  { name: 'Google', symbol: 'G', logo: 'https://www.google.com/s2/favicons?domain=google.com&sz=128', domain: 'Cloud & Search' },
  { name: 'Microsoft', symbol: 'M', logo: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=128', domain: 'Enterprise & AI' },
  { name: 'Amazon', symbol: 'A', logo: 'https://www.google.com/s2/favicons?domain=amazon.com&sz=128', domain: 'E-commerce & AWS' },
  { name: 'Stripe', symbol: 'S', logo: 'https://www.google.com/s2/favicons?domain=stripe.com&sz=128', domain: 'Fintech & Payments' },
  { name: 'Razorpay', symbol: 'R', logo: 'https://www.google.com/s2/favicons?domain=razorpay.com&sz=128', domain: 'Payment Gateway' },
  { name: 'Flipkart', symbol: 'F', logo: 'https://www.google.com/s2/favicons?domain=flipkart.com&sz=128', domain: 'E-commerce' },
  { name: 'Atlassian', symbol: 'A', logo: 'https://www.google.com/s2/favicons?domain=atlassian.com&sz=128', domain: 'Dev Tools' },
  { name: 'Swiggy', symbol: 'S', logo: 'https://www.google.com/s2/favicons?domain=swiggy.com&sz=128', domain: 'Hyperlocal Tech' }
];

const SALARY_INSIGHTS_DATA = {
  frontend: {
    title: 'Frontend Engineer',
    entry: '₹5.5 - 9.5 LPA',
    mid: '₹12 - 20 LPA',
    senior: '₹24 - 40 LPA',
    hotSkills: ['React', 'TypeScript', 'Next.js', 'Web Performance'],
    growth: '+28% YoY Growth'
  },
  backend: {
    title: 'Backend Engineer',
    entry: '₹6.0 - 10.5 LPA',
    mid: '₹14 - 24 LPA',
    senior: '₹26 - 45 LPA',
    hotSkills: ['Node.js / Go', 'PostgreSQL', 'Distributed Systems', 'Kafka'],
    growth: '+32% YoY Growth'
  },
  fullstack: {
    title: 'Full Stack Engineer',
    entry: '₹6.5 - 11.0 LPA',
    mid: '₹15 - 26 LPA',
    senior: '₹28 - 50 LPA',
    hotSkills: ['React + Node/Python', 'System Design', 'Cloud Deployment'],
    growth: '+35% YoY Growth'
  },
  aiml: {
    title: 'AI / Machine Learning Engineer',
    entry: '₹8.0 - 14.0 LPA',
    mid: '₹18 - 32 LPA',
    senior: '₹35 - 65 LPA',
    hotSkills: ['PyTorch', 'LLM Fine-tuning', 'RAG Pipelines', 'Vector DBs'],
    growth: '+46% YoY Growth'
  }
};

const TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    role: 'Frontend Engineer at Stripe Partner',
    avatar: 'RS',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    experience: '2024 Batch Fresher',
    package: '₹14.5 LPA',
    content: 'SkillBridge was a game-changer. The Skill Match Score showed me I was only missing TypeScript and Redux. I studied the recommended modules, raised my match to 92%, and landed the role in 2 weeks!'
  },
  {
    name: 'Pooja Nair',
    role: 'Full Stack Associate at Razorpay',
    avatar: 'PN',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    experience: 'Fresher (0 Years Exp)',
    package: '₹12.0 LPA',
    content: 'The Fresher Mode is incredible. It completely eliminated jobs with fake 3+ years experience requirements. I only applied to verified entry-level roles where recruiters actually reviewed my project skills.'
  },
  {
    name: 'Vikram Joshi',
    role: 'Talent Acquisition Lead at Nexus Tech',
    avatar: 'VJ',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    experience: 'Hiring Manager',
    package: 'Hired 18 Engineers',
    content: 'Instead of screening 800 generic resumes, SkillBridge filters candidates who already match 80%+ of our role requirements. It cut our time-to-hire by more than 60%.'
  }
];

const FAQS = [
  {
    q: 'Is SkillBridge completely free for job seekers and students?',
    a: 'Yes, 100% free! You can create your tech toolkit profile, calculate instant skill match percentages, access skill gap learning roadmaps, use the ATS resume matcher, and apply to unlimited jobs without any fees.'
  },
  {
    q: 'How does the Skill Match Score calculation work?',
    a: 'Our algorithmic scoring engine compares your claimed stack, project skills, and proficiency against the required core and preferred skills of each job. It gives you a transparent breakdown of matched requirements and target skills to learn.'
  },
  {
    q: 'What makes Fresher Mode different from other job portals?',
    a: 'Fresher Mode strictly filters out jobs that falsely claim to be "entry-level" but ask for 3-5 years of experience. When activated, only genuine graduate programs, internships, and 0-1 year experience engineering roles are displayed.'
  },
  {
    q: 'How does the ATS Resume Matcher help my application?',
    a: 'You can paste or upload your resume text in our Resume Matcher to see how closely your experience aligns with any live job posting, identify missing keywords, and get instant recommendations to optimize your profile before applying.'
  },
  {
    q: 'How can recruiters and startups hire through SkillBridge?',
    a: 'Recruiters can switch to the Employer Hub, post jobs in under 2 minutes with structured skill requirements, and instantly view pre-scored candidates whose verified skill profiles match the position requirements.'
  }
];

export default function Home() {
  const navigate = useNavigate();
  const { currentUser, role, isFresherMode, toggleFresherMode, switchToRecruiter } = useAuth();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('recommended');
  const [activeSalaryTab, setActiveSalaryTab] = useState('frontend');
  const {
    jobs,
    filteredJobs,
    resetFilters,
    setSearchQuery,
    setSelectedCategory,
    setSelectedSkill,
    setSelectedWorkType,
    setSelectedExperience
  } = useJobs();

  // Clear stale filters first, then apply the requested ones: a shortcut must
  // never inherit an earlier selection that would hide its own results.
  const applyJobFilters = (filters) => {
    resetFilters();
    if (filters.search) setSearchQuery(filters.search);
    if (filters.category) setSelectedCategory(filters.category);
    if (filters.skill) setSelectedSkill(filters.skill);
    if (filters.workType) setSelectedWorkType(filters.workType);
    if (filters.experience) setSelectedExperience(filters.experience);
    navigate('/jobs');
  };

  const handleSearchSubmit = () => {
    navigate('/jobs');
  };

  const handleCategoryClick = (card) => {
    applyJobFilters(card.filter);
  };

  const handleTagClick = (tag) => {
    applyJobFilters(tag);
  };

  // Live counts keep the track cards honest: they mirror what the visitor will
  // actually see, since Fresher Mode is the only preference a click preserves.
  const baseJobs = isFresherMode ? jobs.filter(job => job.isFresherFriendly) : jobs;
  const countOpenings = (filter) => baseJobs.filter(job => {
    if (filter.category) return job.category === filter.category;
    if (filter.skill) {
      return (job.requiredSkills || []).concat(job.preferredSkills || []).includes(filter.skill);
    }
    return false;
  }).length;

  // Filter tabbed jobs
  const getTabbedJobs = () => {
    if (activeTab === 'fresher') {
      return filteredJobs.filter(j => j.isFresherFriendly).slice(0, 6);
    }
    if (activeTab === 'remote') {
      return filteredJobs.filter(j => j.workType.toLowerCase().includes('remote')).slice(0, 6);
    }
    if (activeTab === 'highMatch') {
      return filteredJobs
        .filter(j => (j.matchData?.matchPercentage || 0) >= 60)
        .sort((a, b) => (b.matchData?.matchPercentage || 0) - (a.matchData?.matchPercentage || 0))
        .slice(0, 6);
    }
    if (activeTab === 'highSalary') {
      return [...filteredJobs]
        .sort((a, b) => estimateSalaryLPA(b.salary) - estimateSalaryLPA(a.salary))
        .slice(0, 6);
    }
    return filteredJobs.slice(0, 6);
  };

  const displayedJobs = getTabbedJobs();
  const currentSalary = SALARY_INSIGHTS_DATA[activeSalaryTab];

  return (
    <div className={`home-page ${currentUser ? 'portal-home' : 'landing-minimal'}`}>
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg-blob blob-a"></div>
        <div className="hero-bg-blob blob-b"></div>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-badge-pill">
                <span className="hero-pulse-dot"></span>
                <span className="hero-badge-text">For Students & Freshers</span>
              </div>

              <h1 className="hero-headline">
                Discover Jobs That <span>Match Your True Skills</span>.
              </h1>

              <p className="hero-subtext">
                Stop applying blindly. SkillBridge calculates your real-time skill alignment across every engineering discipline, reveals skill gaps with learning roadmaps, and fast-tracks emerging talent directly to hiring teams.
              </p>

              <div className="hero-search-wrapper">
                <SearchBar onSearchSubmit={handleSearchSubmit} />
              </div>

              <div className="hero-quick-tags">
                <span className="hero-tag-label"><FiTrendingUp /> Trending:</span>
                {HERO_TAGS.map(tag => (
                  <button
                    key={tag.label}
                    type="button"
                    className="hero-quick-tag"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>

              <div className="hero-stats-row">
                <div className="hero-stat-item">
                  <strong>2,500+</strong>
                  <span>Verified Jobs</span>
                </div>
                <div className="hero-stat-item">
                  <strong>680+</strong>
                  <span>Hiring Companies</span>
                </div>
                <div className="hero-stat-item">
                  <strong>94%</strong>
                  <span>Match Accuracy</span>
                </div>
                <div className="hero-stat-item">
                  <strong>₹0</strong>
                  <span>Free for Candidates</span>
                </div>
              </div>
            </div>

            <div className="hero-collage">
              <div className="hero-collage-main">
                <img src={HERO_MAIN_IMG} alt="Engineering team collaborating on a project" loading="eager" />
                <div className="hero-collage-badge">
                  <span className="hero-collage-dot"></span>
                  2,500+ live jobs across all branches
                </div>
              </div>
              <img className="hero-collage-small hero-collage-a" src={HERO_SMALL_A} alt="Woman engineer presenting at a whiteboard" loading="lazy" />
              <img className="hero-collage-small hero-collage-b" src={HERO_SMALL_B} alt="Developers working together around laptops" loading="lazy" />
              <div className="hero-float-chip chip-match">
                <MatchScore percentage={92} variant="circle" size="sm" />
                <div>
                  <strong>92%</strong>
                  <span>Skill Match</span>
                </div>
              </div>
              <div className="hero-float-chip chip-offer">
                <span className="chips-offer-icon">🎉</span>
                <div>
                  <strong>₹14 LPA</strong>
                  <span>Offer Received</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUCCESS STORIES MARQUEE (photo strip) */}
      <section className="stories-marquee" aria-label="Candidate success moments">
        <div className="stories-marquee-track">
          {[0, 1].map(copy => (
            <React.Fragment key={copy}>
              <img className="story-shot" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=460&q=70" alt="Team celebrating a product launch" loading="lazy" />
              <img className="story-shot" src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=460&q=70" alt="Graduates celebrating with laptops" loading="lazy" />
              <img className="story-shot" src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=460&q=70" alt="Mentor guiding a new hire" loading="lazy" />
              <img className="story-shot" src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=460&q=70" alt="Engineer presenting her work" loading="lazy" />
              <img className="story-shot" src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=460&q=70" alt="Developers pairing at a desk" loading="lazy" />
              <img className="story-shot" src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=460&q=70" alt="Team whiteboarding a plan" loading="lazy" />
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* 2b. TOP HIRING COMPANIES STRIP */}
      <section className="companies-strip">
        <div className="container">
          <div className="companies-strip-label">
            Top employers hiring freshers & engineering talent on SkillBridge
          </div>
          <div className="companies-grid">
            {HIRING_COMPANIES.map(company => (
              <div
                key={company.name}
                className="company-logo-item"
                title={`${company.name} • ${company.domain}`}
                style={{ '--delay': `${HIRING_COMPANIES.indexOf(company) * 0.15}s` }}
              >
                <div className="company-badge-icon">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                      event.currentTarget.nextElementSibling.style.display = 'inline';
                    }}
                  />
                  <span>{company.symbol}</span>
                  </div>
                <span className="company-name-text">{company.name}</span>
                <span className="company-domain-text">{company.domain}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES (horizontal scroll) */}
      <section className="category-scroll-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="badge badge-navy">Popular Categories</span>
              <h2>Browse by Career Track</h2>
            </div>
            <Link to="/jobs" className="btn btn-outline btn-sm">
              View All Jobs <FiArrowRight />
            </Link>
          </div>
          <div className="category-scroll">
            {CATEGORY_CARDS.map(cat => {
              const Icon = cat.icon;
              const openings = countOpenings(cat.filter);
              return (
                <div
                  key={cat.name}
                  className="category-pill-card"
                  onClick={() => handleCategoryClick(cat)}
                >
                  <div className="category-pill-icon" style={{ background: cat.accent }}>
                    <Icon />
                  </div>
                  <div className="category-pill-info">
                    <strong>{cat.name}</strong>
                    <span>
                      {openings} Opening{openings === 1 ? '' : 's'} • {cat.salary}
                    </span>
                  </div>
                  <FiArrowRight className="category-pill-arrow" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FEATURED JOBS */}
      <section className="featured-jobs-section">
        <div className="container">
          <div className="featured-jobs-header">
            <div>
              <span className="badge badge-navy">Active Opportunities</span>
              <h2>Featured Job Openings</h2>
              <p>
                {currentUser ? (
                  <>Matched against your skills: <strong>{currentUser?.skills?.slice(0, 3).join(', ') || 'React, JavaScript'}</strong></>
                ) : (
                  <>Explore curated engineering roles with transparent skill requirements</>
                )}
              </p>
            </div>
            <Link to="/jobs" className="btn btn-primary">
              View All {filteredJobs.length} Jobs <FiArrowRight />
            </Link>
          </div>

          <div className="portal-tabs">
            <button
              type="button"
              className={`portal-tab-btn ${activeTab === 'recommended' ? 'active' : ''}`}
              onClick={() => setActiveTab('recommended')}
            >
              🔥 All Openings
            </button>
            <button
              type="button"
              className={`portal-tab-btn ${activeTab === 'fresher' ? 'active' : ''}`}
              onClick={() => setActiveTab('fresher')}
            >
              🌱 Fresher Friendly (0 Exp)
            </button>
            <button
              type="button"
              className={`portal-tab-btn ${activeTab === 'remote' ? 'active' : ''}`}
              onClick={() => setActiveTab('remote')}
            >
              🏠 100% Remote
            </button>
            <button
              type="button"
              className={`portal-tab-btn ${activeTab === 'highMatch' ? 'active' : ''}`}
              onClick={() => setActiveTab('highMatch')}
            >
              🎯 High Match (60%+)
            </button>
            <button
              type="button"
              className={`portal-tab-btn ${activeTab === 'highSalary' ? 'active' : ''}`}
              onClick={() => setActiveTab('highSalary')}
            >
              💎 High Compensation
            </button>
          </div>

          <div className="jobs-cards-grid">
              {displayedJobs.map((job, index) => (
                <JobCard
                  key={job.id}
                  job={job}
                  featuredImage={JOB_CARD_IMAGES[index % JOB_CARD_IMAGES.length]}
                />
            ))}
          </div>

          <div className="featured-jobs-footer">
            <Link to="/jobs" className="btn btn-outline">
              Explore All {filteredJobs.length} Live Openings <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. HOW THE SMART MATCH SYSTEM WORKS */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-navy">4-Step Workflow</span>
            <h2>How SkillBridge Gets You Hired Fast</h2>
            <p>A transparent, diagnostic-driven process designed to maximize your interview chances.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Define Your Skill Set</h3>
              <p>Add the tools, technologies and domain concepts you have mastered through college projects, internships, or self-learning.</p>
              <div className="step-demo-box">
                <span className="badge badge-navy">React</span>
                <span className="badge badge-navy">JavaScript</span>
                <span className="badge badge-navy">SQL</span>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Instant Skill Matching</h3>
              <p>Our engine automatically calculates real-time match scores against every active job requirement so you know where you stand.</p>
              <div className="step-demo-box step-demo-flex">
                <MatchScore percentage={88} size="sm" />
                <span className="step-demo-text">Strong Match (88%)</span>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Bridge Missing Gaps</h3>
              <p>Identify precisely what missing skills stand between you and your target role, with estimated learning hours and guidance.</p>
              <div className="step-demo-box">
                <span className="step-demo-hint">💡 Target: TypeScript (12 hrs)</span>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <h3>1-Click Apply & Track</h3>
              <p>Submit applications with your verified skills profile. Get live status updates from recruiters without disappearing into a black hole.</p>
              <div className="step-demo-box">
                <span className="step-demo-hint step-demo-blue">✓ Status: Under Review</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DUAL AUDIENCE SECTION */}
      <section className="dual-audience-section">
        <div className="container">
          <div className="dual-cards-grid">
            <div className="dual-card candidate-card">
              <img className="dual-card-photo" src={DUAL_CANDIDATE_IMG} alt="Graduate celebrating a new job offer" loading="lazy" />
              <div className="dual-card-badge">For Candidates</div>
              <h2>Accelerate Your Career Path</h2>
              <p>Stop sending hundreds of unread resumes. Match directly with engineering managers who value your actual project capabilities.</p>
              <ul className="dual-benefits-list">
                <li><FiCheck /> Free ATS Resume Matcher & Score Optimizer</li>
                <li><FiCheck /> Real-time 0-100% skill alignment diagnostics</li>
                <li><FiCheck /> Missing requirement learning roadmaps</li>
                <li><FiCheck /> Direct application tracking without recruiter ghosting</li>
              </ul>
              <div className="dual-actions">
                <Link to="/register" className="btn btn-primary">
                  Create Candidate Profile
                </Link>
                <Link to="/resume-analyzer" className="btn btn-outline">
                  Test Resume Matcher
                </Link>
              </div>
            </div>

            <div className="dual-card employer-card">
              <img className="dual-card-photo" src={DUAL_EMPLOYER_IMG} alt="Hiring team interviewing a candidate" loading="lazy" />
              <div className="dual-card-badge employer-badge">For Employers</div>
              <h2>Hire Pre-Verified Talent Faster</h2>
              <p>Eliminate manual resume screening. Review candidates pre-scored by real skill alignment with your exact role requirements.</p>
              <ul className="dual-benefits-list">
                <li><FiCheck /> Post jobs in under 2 minutes for free</li>
                <li><FiCheck /> Algorithmic candidate match ranking</li>
                <li><FiCheck /> Direct access to verified college freshers & juniors</li>
                <li><FiCheck /> 60% faster hiring cycles</li>
              </ul>
              <div className="dual-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    switchToRecruiter();
                    navigate('/recruiter/post-job');
                  }}
                >
                  Post a Job Free
                </button>
                <Link to="/recruiter" className="btn btn-outline">
                  Recruiter Hub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SALARY INSIGHTS + FRESHER MODE (combined compact card) */}
      <section className="career-boost-section">
        <div className="container">
          <div className="career-boost-card">
            <div className="career-boost-salary">
              <div className="career-boost-head">
                <div>
                  <span className="career-boost-badge">📊 2025 - 2026 Engineering Market Trends</span>
                  <h3>Compensation Insights</h3>
                </div>
                <div className="salary-tabs">
                  {['frontend', 'backend', 'fullstack', 'aiml'].map(tab => (
                    <button
                      key={tab}
                      type="button"
                      className={`salary-tab-btn ${activeSalaryTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveSalaryTab(tab)}
                    >
                      {tab === 'frontend' ? 'Frontend' : tab === 'backend' ? 'Backend' : tab === 'fullstack' ? 'Full Stack' : 'AI / ML'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="career-boost-stats">
                <div className="salary-stat-box">
                  <span className="salary-stat-label">Entry (0 - 2 Yrs)</span>
                  <div className="salary-stat-value">{currentSalary.entry}</div>
                </div>
                <div className="salary-stat-box highlight">
                  <span className="salary-stat-label">Mid (2 - 5 Yrs)</span>
                  <div className="salary-stat-value">{currentSalary.mid}</div>
                </div>
                <div className="salary-stat-box">
                  <span className="salary-stat-label">Senior (5+ Yrs)</span>
                  <div className="salary-stat-value">{currentSalary.senior}</div>
                </div>
              </div>
              <div className="career-boost-skills">
                <span className="career-boost-skills-label">🔥 Highest Demand:</span>
                {currentSalary.hotSkills.map(skill => (
                  <span key={skill} className="salary-skill-pill">{skill}</span>
                ))}
                <span className="career-boost-growth"><FiTrendingUp /> {currentSalary.growth}</span>
              </div>
            </div>

            <div className="career-boost-fresher">
              <div className="career-boost-fresher-inner">
                <span className="career-boost-badge fresher">🌱 2024 - 2026 Batch Fast-Track</span>
                <h3>Fresher-Only Roles? Unlocked.</h3>
                <p>
                  Tired of "entry-level" listings that ask for "3+ years of experience"?
                  Enable Fresher Mode to spotlight internships, graduate roles, and campus drives.
                </p>
                <button
                  type="button"
                  className={`btn fresher-toggle-cta ${isFresherMode ? 'is-on' : ''}`}
                  onClick={toggleFresherMode}
                >
                  {isFresherMode ? '✓ Fresher Mode Active' : 'Enable Fresher Mode'}
                </button>
                <Link to="/jobs" className="career-boost-link">
                  Browse verified fresher positions →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE US (compact checkmark strip) */}
      <section className="why-us-section">
        <div className="container">
          <div className="why-us-grid">
            <div className="why-us-item">
              <span className="why-us-icon"><FiTarget /></span>
              <div>
                <h4>AI Skill Match Score</h4>
                <p>Instant 0-100% compatibility diagnostics against every live requirement.</p>
              </div>
            </div>
            <div className="why-us-item">
              <span className="why-us-icon"><FiThumbsUp /></span>
              <div>
                <h4>Verified Fresher Fast-Track</h4>
                <p>Zero-experience guarantee. No fake "entry-level" gates, ever.</p>
              </div>
            </div>
            <div className="why-us-item">
              <span className="why-us-icon"><FiFileText /></span>
              <div>
                <h4>ATS Resume Matcher</h4>
                <p>Scan your resume against JDs and lift your application score.</p>
              </div>
            </div>
            <div className="why-us-item">
              <span className="why-us-icon"><FiShield /></span>
              <div>
                <h4>1-Click Direct Apply</h4>
                <p>Transparent status tracking from Reviewing to Offer.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SUCCESS STORIES / TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-navy">Candidate Success</span>
            <h2>Hear From Engineers Who Got Hired</h2>
            <p>From fresh university graduates to career changers, discover how SkillBridge powered their career journeys.</p>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((item, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-content">"{item.content}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    <img src={item.photo} alt={item.name} loading="lazy" />
                  </div>
                  <div>
                    <div className="testimonial-name">{item.name}</div>
                    <div className="testimonial-role">{item.role}</div>
                    <div className="testimonial-meta">
                      <span>{item.experience}</span> • <strong>{item.package}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ ACCORDION */}
      <section className="faq-section">
        <div className="container container-narrow">
          <div className="section-header">
            <span className="badge badge-navy">Got Questions?</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about finding jobs and hiring talent on SkillBridge.</p>
          </div>

          <div className="faq-accordion">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <FiThumbsUp /> : <FiTrendingUp />}
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className="faq-answer"
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                  >
                    <p>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA / SMART JOB MATCH BANNER */}
      {!currentUser && (
        <section className="final-cta-section">
          <div className="container">
            <div className="final-cta-card">
              <div className="final-cta-visual">
                <div className="cta-laptop">
                  <div className="cta-screen">
                    <span className="cta-screen-dot"></span>
                    <span className="cta-screen-dot"></span>
                    <span className="cta-screen-dot"></span>
                  </div>
                </div>
                <div className="cta-float-chip cta-1"><FiZap /> Smart Job Match</div>
                <div className="cta-float-chip cta-2"><FiCheckCircle /> 92% Match</div>
              </div>
              <div className="final-cta-content">
                <span className="badge badge-rose cta-badge">🚀 Start Your Journey Today</span>
                <h2>Ready to Find Your Dream Job?</h2>
                <p>
                  Create your free profile in under 2 minutes, get your personalized skill match scores, and start interviewing with top companies.
                </p>
                <div className="final-cta-buttons swipe">
                  <Link to="/register" className="btn btn-primary btn-lg cta-btn-main">
                    Sign Up for Free <FiArrowRight />
                  </Link>
                  <Link to="/jobs" className="btn btn-outline btn-lg cta-btn-sub">
                    Browse All Jobs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}