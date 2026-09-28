export const DEFAULT_STUDENT = {
  id: 'student-1',
  name: 'Alex Chen',
  email: 'alex.chen@university.edu',
  role: 'jobseeker',
  isFresher: true,
  title: 'Final Year CS Student & Frontend Enthusiast',
  college: 'Apex Institute of Technology',
  degree: 'B.Tech in Computer Science & Engineering (2025)',
  gpa: '8.8 / 10.0',
  bio: 'Eager fresher focused on building responsive, accessible web applications with React and JavaScript. Actively looking for junior frontend, full stack, or graduate software engineering opportunities.',
  skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Git', 'SQL'],
  experience: '6-Month Frontend Web Development Intern at Campus Tech Club',
  location: 'Bangalore, India',
  phone: '+91 98765 43210',
  github: 'https://github.com/alexchen-dev',
  linkedin: 'https://linkedin.com/in/alexchen',
  resumeText: `Alex Chen
Bangalore, India | alex.chen@university.edu | +91 98765 43210
GitHub: github.com/alexchen-dev | LinkedIn: linkedin.com/in/alexchen

SUMMARY
Final year Computer Science student with a passion for frontend development, clean UI/UX, and component-driven architecture using React and JavaScript. Strong foundation in data structures, algorithms, and web standards.

EDUCATION
B.Tech in Computer Science & Engineering (2021 - 2025)
Apex Institute of Technology | CGPA: 8.8 / 10.0

TECHNICAL SKILLS
Frontend: React.js, JavaScript (ES6+), HTML5, CSS3, Responsive Design
Backend & DB: Basic Node.js, SQL, REST API
Developer Tools: Git, GitHub, VS Code, Figma
Core Fundamentals: Data Structures, Object-Oriented Programming, Web Accessibility

ACADEMIC PROJECTS
1. Campus Community Hub (React, JavaScript, CSS, REST API)
- Engineered responsive multi-page student engagement platform with search and tag filters.
- Built reusable UI components and handled asynchronous state with React Hooks.
2. SkillBridge Job Matcher (React, CSS, LocalStorage)
- Created rule-based skills matching engine calculating alignment scores for student job seekers.

INTERNSHIP EXPERIENCE
Web Development Intern | Campus Tech Club (Jan 2024 - Jun 2024)
- Refactored student portal styles resulting in a 40% improvement on mobile loading speed.
- Collaborated with 4 peers via Git pull requests and peer code reviews.`
};

export const DEFAULT_RECRUITER = {
  id: 'recruiter-1',
  name: 'Sarah Miller',
  email: 's.miller@nexusinnovations.com',
  role: 'recruiter',
  company: 'Nexus Innovations',
  companyLogoBg: '#2563EB',
  designation: 'Lead University & Early Career Talent Partner',
  location: 'Bangalore, India',
  bio: 'Spearheading campus recruitment and graduate development tracks across engineering and product teams at Nexus Innovations.'
};

export const INITIAL_APPLICATIONS = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Junior Frontend Developer',
    company: 'Nexus Innovations',
    companyLogoBg: '#2563EB',
    location: 'Bangalore, India (Hybrid)',
    salary: '₹6,00,000 - ₹8,50,000 / year',
    applicantId: 'student-1',
    applicantName: 'Alex Chen',
    applicantEmail: 'alex.chen@university.edu',
    applicantSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'Git', 'SQL'],
    matchPercentage: 85,
    appliedDate: '2026-09-12',
    status: 'Shortlisted', // Applied, Assessment Completed, Shortlisted, Interview, Selected, Rejected
    coverNote: 'Excited about the role! I have built multiple React projects and worked with REST APIs during my university internship.',
    assessmentScore: 82,
    roleReadiness: 83,
    categoryScores: {
      technical: { category: 'technical', label: 'Technical Core', total: 6, correct: 5, percentage: 83 },
      quantitative: { category: 'quantitative', label: 'Quantitative Aptitude', total: 3, correct: 2, percentage: 67 },
      logical: { category: 'logical', label: 'Logical Reasoning', total: 3, correct: 3, percentage: 100 },
      coding: { category: 'coding', label: 'Coding & Analysis', total: 3, correct: 2, percentage: 67 }
    },
    timeline: [
      { status: 'Applied', date: '2026-09-12', note: 'Application submitted with verified assessment: 82% Assessment Score & 83% Role Readiness' },
      { status: 'Shortlisted', date: '2026-09-14', note: 'Resume & assessment scores reviewed by campus recruitment team' }
    ]
  },
  {
    id: 'app-2',
    jobId: 'job-2',
    jobTitle: 'Graduate Software Engineer - Full Stack',
    company: 'Aurora Cloud Technologies',
    companyLogoBg: '#4F46E5',
    location: 'Remote (Pan India)',
    salary: '₹7,50,000 - ₹10,00,000 / year',
    applicantId: 'student-1',
    applicantName: 'Alex Chen',
    applicantEmail: 'alex.chen@university.edu',
    applicantSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'Git', 'SQL'],
    matchPercentage: 75,
    appliedDate: '2026-09-10',
    status: 'Interview',
    coverNote: 'Looking forward to contributing to Aurora Cloud microservices and client web apps.',
    timeline: [
      { status: 'Applied', date: '2026-09-10', note: 'Application submitted' },
      { status: 'Shortlisted', date: '2026-09-11', note: 'Selected for initial technical screening' },
      { status: 'Interview', date: '2026-09-15', note: 'Technical Round 1 scheduled for Friday' }
    ]
  },
  {
    id: 'app-3',
    jobId: 'job-12',
    jobTitle: 'Full Stack Web Developer Intern',
    company: 'HyperFlow Studio',
    companyLogoBg: '#0D9488',
    location: 'Delhi NCR, India (Hybrid)',
    salary: '₹25,000 - ₹35,000 / month Stipend',
    applicantId: 'student-1',
    applicantName: 'Alex Chen',
    applicantEmail: 'alex.chen@university.edu',
    applicantSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'Git', 'SQL'],
    matchPercentage: 100,
    appliedDate: '2026-09-15',
    status: 'Applied',
    coverNote: 'Ready to join immediately for 6 months hands-on summer internship.',
    timeline: [
      { status: 'Applied', date: '2026-09-15', note: 'Application received' }
    ]
  }
];
