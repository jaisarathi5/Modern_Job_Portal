export const INITIAL_JOBS = [
  {
    id: 'job-1',
    title: 'Junior Frontend Developer',
    company: 'Nexus Innovations',
    logoBg: '#2563EB',
    rating: 4.5,
    location: 'Bangalore, India (Hybrid)',
    workType: 'Hybrid',
    experience: '0-1 years (Fresher Friendly)',
    isFresherFriendly: true,
    salary: '₹6,00,000 - ₹8,50,000 / year',
    category: 'Frontend Developer',
    postedDate: '2 days ago',
    description: 'We are seeking a high-energy Junior Frontend Developer eager to build pixel-perfect, accessible, and fast web experiences using modern React and JavaScript. Mentorship from senior architects included.',
    responsibilities: [
      'Implement responsive UI components using React, HTML5, and CSS3.',
      'Collaborate with UI/UX designers to translate Figma prototypes into functional code.',
      'Consume RESTful APIs and handle asynchronous application state.',
      'Participate in code reviews, bug fixes, and continuous performance optimization.'
    ],
    requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'Git'],
    preferredSkills: ['TypeScript', 'REST API', 'Figma'],
    benefits: [
      'Health insurance & wellness allowance',
      'Flexible hybrid schedule (2 days office / 3 days remote)',
      'Annual learning stipend for certifications & tech books',
      'Mentorship program with staff engineers'
    ],
    applicantsCount: 18,
    assessment: {
      enabled: true,
      duration: 25,
      totalQuestions: 15,
      categories: {
        technical: 40,
        quantitative: 20,
        logical: 20,
        coding: 20
      },
      difficulty: {
        easy: 30,
        medium: 50,
        hard: 20
      },
      targetSkills: ['JavaScript', 'React', 'HTML', 'CSS', 'Git'],
      secureMode: false,
      sebRequired: false
    }
  },
  {
    id: 'job-2',
    title: 'Graduate Software Engineer - Full Stack',
    company: 'Aurora Cloud Technologies',
    logoBg: '#4F46E5',
    rating: 4.8,
    location: 'Remote (Pan India)',
    workType: 'Remote',
    experience: 'Fresher / Entry Level (0 years)',
    isFresherFriendly: true,
    salary: '₹7,50,000 - ₹10,00,000 / year',
    category: 'Full Stack Developer',
    postedDate: 'Just now',
    description: 'Our Graduate Engineer program accepts passionate freshers who want to build cloud-native SaaS systems. You will rotate across our React client apps and Node/Express microservices.',
    responsibilities: [
      'Develop client-side components and backend API endpoints.',
      'Write clean, modular, and maintainable code adhering to engineering best practices.',
      'Integrate databases such as MongoDB and PostgreSQL with server-side logic.',
      'Engage in daily standups and agile sprint planning.'
    ],
    requiredSkills: ['React', 'Node.js', 'JavaScript', 'SQL', 'Git'],
    preferredSkills: ['Express', 'MongoDB', 'Docker', 'REST API'],
    benefits: [
      '100% remote workspace stipend (₹25,000 one-time setup)',
      'Comprehensive medical insurance for self and parents',
      'Weekly tech talk learning sessions',
      'Generous paid time off'
    ],
    applicantsCount: 34,
    assessment: {
      enabled: true,
      duration: 30,
      totalQuestions: 20,
      categories: {
        technical: 35,
        quantitative: 20,
        logical: 15,
        coding: 30
      },
      difficulty: {
        easy: 20,
        medium: 50,
        hard: 30
      },
      targetSkills: ['React', 'Node.js', 'JavaScript', 'SQL', 'Git'],
      secureMode: true,
      sebRequired: true
    }
  },
  {
    id: 'job-3',
    title: 'AI / Machine Learning Intern',
    company: 'CognitiveLabs AI',
    logoBg: '#0D9488',
    rating: 4.6,
    location: 'Hyderabad, India (On-site)',
    workType: 'On-site',
    experience: 'Internship (Freshers & College Students)',
    isFresherFriendly: true,
    salary: '₹35,000 - ₹45,000 / month Stipend',
    category: 'AI/ML Intern',
    postedDate: '1 day ago',
    description: 'Exciting 6-month internship with high probability of full-time conversion. Work directly with applied AI researchers training classification models and building generative pipelines.',
    responsibilities: [
      'Preprocess, clean, and augment training datasets using Python and Pandas.',
      'Implement baseline machine learning models using Scikit-Learn.',
      'Assist in evaluating model accuracy, precision, and edge-case anomalies.',
      'Document experimental findings and present weekly summaries to the AI team.'
    ],
    requiredSkills: ['Python', 'Machine Learning', 'Data Structures', 'Git'],
    preferredSkills: ['TensorFlow', 'Pandas', 'NumPy', 'SQL'],
    benefits: [
      'Full-time PPO (Pre-Placement Offer) upon internship review',
      'Free gourmet meals and snacks on campus',
      'Compute credits on high-performance GPU clusters',
      'Certificate of excellence'
    ],
    applicantsCount: 42,
    assessment: {
      enabled: true,
      duration: 20,
      totalQuestions: 15,
      categories: {
        technical: 40,
        quantitative: 30,
        logical: 15,
        coding: 15
      },
      difficulty: {
        easy: 40,
        medium: 50,
        hard: 10
      },
      targetSkills: ['Python', 'Machine Learning', 'Data Structures', 'Git'],
      secureMode: false,
      sebRequired: false
    }
  },
  {
    id: 'job-4',
    title: 'Junior Backend Developer (Node & Java)',
    company: 'FinTrack Digital Solutions',
    logoBg: '#059669',
    rating: 4.3,
    location: 'Pune, India (Hybrid)',
    workType: 'Hybrid',
    experience: '0-2 years',
    isFresherFriendly: true,
    salary: '₹6,50,000 - ₹9,00,000 / year',
    category: 'Backend Developer',
    postedDate: '3 days ago',
    description: 'Help build high-throughput transaction payment gateways. We value foundational problem-solving, clean OOP design, and database normalization over years of experience.',
    responsibilities: [
      'Build secure, low-latency RESTful APIs using Node.js or Java Spring Boot.',
      'Design relational schemas and write optimized SQL queries.',
      'Ensure data integrity, encryption at rest, and secure authentication.',
      'Write comprehensive unit tests and automated integration tests.'
    ],
    requiredSkills: ['Java', 'SQL', 'REST API', 'Git'],
    preferredSkills: ['Node.js', 'Spring Boot', 'PostgreSQL', 'Docker'],
    benefits: [
      'Performance-linked annual bonus',
      'Health insurance with zero deduction',
      'Subsidized gym & fitness club memberships',
      'Commute allowance'
    ],
    applicantsCount: 15,
    assessment: {
      enabled: true,
      duration: 30,
      totalQuestions: 20,
      categories: {
        technical: 40,
        quantitative: 20,
        logical: 15,
        coding: 25
      },
      difficulty: {
        easy: 20,
        medium: 50,
        hard: 30
      },
      targetSkills: ['Java', 'SQL', 'REST API', 'Git'],
      secureMode: false,
      sebRequired: false
    }
  },
  {
    id: 'job-5',
    title: 'Associate Data Analyst',
    company: 'Metrix Insights',
    logoBg: '#0284C7',
    rating: 4.4,
    location: 'Gurgaon, India (Hybrid)',
    workType: 'Hybrid',
    experience: '0-1 years (Fresher Friendly)',
    isFresherFriendly: true,
    salary: '₹5,50,000 - ₹7,50,000 / year',
    category: 'Data Analyst',
    postedDate: '4 days ago',
    description: 'Transform complex business datasets into intuitive dashboards and strategic insights. Perfect for analytical thinkers who love SQL, Excel modeling, and Python scripting.',
    responsibilities: [
      'Extract data from production databases using complex SQL queries and joins.',
      'Cleanse raw data and automate recurring data pipelines with Python.',
      'Build interactive KPI dashboards and executive reports.',
      'Deliver business insights to product managers and marketing stakeholders.'
    ],
    requiredSkills: ['SQL', 'Python', 'Excel', 'Data Structures'],
    preferredSkills: ['Pandas', 'Figma', 'PostgreSQL'],
    benefits: [
      'Hybrid work model (3 days office, 2 days remote)',
      'Sponsored data certifications (Tableau, AWS, Databricks)',
      'Annual team offsite retreats',
      'Gratuity & wellness coverage'
    ],
    applicantsCount: 27,
    assessment: {
      enabled: true,
      duration: 25,
      totalQuestions: 15,
      categories: {
        technical: 30,
        quantitative: 35,
        logical: 20,
        coding: 15
      },
      difficulty: {
        easy: 30,
        medium: 50,
        hard: 20
      },
      targetSkills: ['SQL', 'Python', 'Statistics', 'Pandas'],
      secureMode: false,
      sebRequired: false
    }
  },
  {
    id: 'job-6',
    title: 'Junior UI/UX & Product Designer',
    company: 'PixelCraft Studio',
    logoBg: '#7C3AED',
    rating: 4.7,
    location: 'Remote (India)',
    workType: 'Remote',
    experience: '0-1 years (Design Portfolio Required)',
    isFresherFriendly: true,
    salary: '₹5,00,000 - ₹7,50,000 / year',
    category: 'UI/UX Designer',
    postedDate: '3 days ago',
    description: 'We are hiring a creative UI/UX designer with a sharp eye for typography, layout hierarchy, and user empathy. Design modern web and mobile apps for international clients.',
    responsibilities: [
      'Create wireframes, user journeys, high-fidelity prototypes in Figma.',
      'Design clean, accessible design systems and component libraries.',
      'Conduct basic usability testing with student and user groups.',
      'Collaborate with frontend developers to ensure design fidelity in production.'
    ],
    requiredSkills: ['Figma', 'UI/UX Design', 'HTML', 'CSS'],
    preferredSkills: ['JavaScript', 'Tailwind CSS', 'Responsive Design'],
    benefits: [
      'Latest Apple MacBook M-series provided',
      'Annual conference and workshop budget',
      'Flexible working hours with no micro-management',
      'Quarterly creative design sprints'
    ],
    applicantsCount: 19,
    assessment: {
      enabled: false
    }
  },
  {
    id: 'job-7',
    title: 'Python Developer - Backend & Scripting',
    company: 'Aetheria Systems',
    logoBg: '#EA580C',
    rating: 4.2,
    location: 'Chennai, India (Hybrid)',
    workType: 'Hybrid',
    experience: '0-2 years (Fresher Welcome)',
    isFresherFriendly: true,
    salary: '₹6,00,000 - ₹8,50,000 / year',
    category: 'Python Developer',
    postedDate: '5 days ago',
    description: 'Join our automation and backend microservices team. We write clean, test-driven Python code powering high-scale data crawlers and internal developer tools.',
    responsibilities: [
      'Develop backend services using Python and FastAPI / Django.',
      'Write scripts to automate internal deployment checks and batch jobs.',
      'Work with database schemas in PostgreSQL and Redis caches.',
      'Troubleshoot and optimize slow queries and network bottlenecks.'
    ],
    requiredSkills: ['Python', 'SQL', 'Git', 'REST API'],
    preferredSkills: ['PostgreSQL', 'Docker', 'Linux', 'Django'],
    benefits: [
      'Relocation assistance to Chennai if applicable',
      'Comprehensive health coverage for entire family',
      'Sponsored tech conferences & hackathons',
      'Catered lunch & ergonomic workstations'
    ],
    applicantsCount: 22
  },
  {
    id: 'job-8',
    title: 'Junior Java / Spring Boot Developer',
    company: 'Zenith Enterprise Solutions',
    logoBg: '#1E40AF',
    rating: 4.5,
    location: 'Bangalore, India (On-site)',
    workType: 'On-site',
    experience: 'Fresher to 1 year',
    isFresherFriendly: true,
    salary: '₹6,50,000 - ₹9,50,000 / year',
    category: 'Java Developer',
    postedDate: '1 week ago',
    description: 'Work on mission-critical banking and fintech infrastructure. Ideal for students with strong core Java fundamentals, object-oriented design principles, and problem-solving skills.',
    responsibilities: [
      'Write server-side Java code following SOLID principles and design patterns.',
      'Develop microservices using Spring Boot and Hibernate ORM.',
      'Implement REST APIs and secure endpoints using OAuth2.',
      'Debug unit and integration test suites using JUnit and Mockito.'
    ],
    requiredSkills: ['Java', 'SQL', 'Data Structures', 'Git'],
    preferredSkills: ['Spring Boot', 'REST API', 'PostgreSQL', 'Docker'],
    benefits: [
      'Competitive compensation with guaranteed bi-annual appraisal',
      'Extensive 3-month paid enterprise training program',
      'Health insurance with OPD coverage',
      'Free cab facilities for commuters'
    ],
    applicantsCount: 31
  },
  {
    id: 'job-9',
    title: 'Data Science Fresher Associate',
    company: 'Krypton Analytics',
    logoBg: '#6366F1',
    rating: 4.4,
    location: 'Mumbai, India (Hybrid)',
    workType: 'Hybrid',
    experience: '0-1 years (Fresher Friendly)',
    isFresherFriendly: true,
    salary: '₹7,00,000 - ₹10,50,000 / year',
    category: 'Data Scientist',
    postedDate: '4 days ago',
    description: 'Are you passionate about statistics, data storytelling, and predictive algorithms? Join our analytics wing to build predictive models for leading retail and e-commerce brands.',
    responsibilities: [
      'Perform exploratory data analysis (EDA) and data wrangling on large datasets.',
      'Build baseline regression, classification, and clustering models.',
      'Create visualizations and presentations explaining statistical conclusions.',
      'Deploy models as lightweight microservices using Python and Flask.'
    ],
    requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Git'],
    preferredSkills: ['Pandas', 'NumPy', 'Docker', 'REST API'],
    benefits: [
      'Hybrid policy (2 days in office, 3 days remote)',
      'Subsidized higher education & master sponsorship after 2 years',
      'Annual wellness bonus & gym stipend',
      'Stock option allocation (ESOPs)'
    ],
    applicantsCount: 29
  },
  {
    id: 'job-10',
    title: 'Software Engineer - Platform & Tools',
    company: 'Vanguard Systems',
    logoBg: '#0F172A',
    rating: 4.6,
    location: 'Remote (India)',
    workType: 'Remote',
    experience: '1-3 years',
    isFresherFriendly: false,
    salary: '₹9,00,000 - ₹14,00,000 / year',
    category: 'Software Engineer',
    postedDate: '6 days ago',
    description: 'We are looking for a Software Engineer to help enhance our developer platform, CI/CD pipelines, and internal SDKs used by 400+ engineers globally.',
    responsibilities: [
      'Build internal CLI tools, automation scripts, and workflow dashboards.',
      'Manage containerized infrastructure running on Kubernetes and Docker.',
      'Maintain automated integration pipelines and release gates.',
      'Address architectural performance, latency, and reliability issues.'
    ],
    requiredSkills: ['JavaScript', 'Node.js', 'Docker', 'Git', 'Linux'],
    preferredSkills: ['TypeScript', 'AWS', 'Python', 'CI/CD'],
    benefits: [
      'Home office setup allowance',
      'Internet & phone bill reimbursement',
      'Uncapped paid time off policy',
      'Annual international team meetup'
    ],
    applicantsCount: 16
  },
  {
    id: 'job-11',
    title: 'Frontend React Developer - Growth Team',
    company: 'CraftStream Media',
    logoBg: '#DB2777',
    rating: 4.3,
    location: 'Bangalore, India (Hybrid)',
    workType: 'Hybrid',
    experience: '1-2 years',
    isFresherFriendly: false,
    salary: '₹8,00,000 - ₹11,50,000 / year',
    category: 'Frontend Developer',
    postedDate: '5 days ago',
    description: 'Build viral onboarding experiences, checkout funnels, and high-converting marketing web products. Fast-paced, metrics-driven team with high user impact.',
    responsibilities: [
      'Develop dynamic React components with smooth CSS animations and responsiveness.',
      'Conduct A/B testing on user signups and conversion flows.',
      'Optimize web performance, Core Web Vitals, and Lighthouse scores.',
      'Coordinate with product designers to ship features on weekly release cycles.'
    ],
    requiredSkills: ['React', 'JavaScript', 'CSS', 'HTML', 'TypeScript'],
    preferredSkills: ['Redux', 'Figma', 'Testing', 'REST API'],
    benefits: [
      'Monthly wellness & fitness budget',
      'Performance-based quarterly bonuses',
      'Snacks, espresso bar, and games room in office',
      'Comprehensive parental insurance'
    ],
    applicantsCount: 24
  },
  {
    id: 'job-12',
    title: 'Full Stack Web Developer Intern',
    company: 'HyperFlow Studio',
    logoBg: '#0891B2',
    rating: 4.7,
    location: 'Delhi NCR, India (Hybrid)',
    workType: 'Hybrid',
    experience: 'Internship (0 years / Students)',
    isFresherFriendly: true,
    salary: '₹25,000 - ₹35,000 / month Stipend',
    category: 'Full Stack Developer',
    postedDate: 'Just now',
    description: 'A hands-on summer internship designed for computer science and engineering students. Pair with experienced mentors to build modern web applications from scratch.',
    responsibilities: [
      'Build React user interfaces and connect them to Node.js backend services.',
      'Write database schemas and queries using SQL or MongoDB.',
      'Test features thoroughly and fix cross-browser compatibility issues.',
      'Attend weekly skill accelerator workshops hosted by senior developers.'
    ],
    requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS'],
    preferredSkills: ['Node.js', 'SQL', 'Git', 'Figma'],
    benefits: [
      'Internship completion certificate & letter of recommendation',
      'Direct interview track for full-time Software Engineer positions',
      'Flexible hours to accommodate college coursework & exams',
      'Team lunches and mentoring sessions'
    ],
    applicantsCount: 38
  },
  {
    id: 'job-13',
    title: 'Junior Cloud & DevOps Associate',
    company: 'Skyward Infrastructure',
    logoBg: '#475569',
    rating: 4.5,
    location: 'Remote (India)',
    workType: 'Remote',
    experience: '0-2 years (Fresher Welcome)',
    isFresherFriendly: true,
    salary: '₹7,00,000 - ₹9,50,000 / year',
    category: 'Software Engineer',
    postedDate: '1 week ago',
    description: 'Learn modern DevOps and cloud infrastructure engineering. Ideal for engineers interested in Linux, networking, Docker containers, and CI/CD pipelines.',
    responsibilities: [
      'Help maintain cloud servers and containerized staging environments.',
      'Write shell and Python scripts to automate deployment tasks.',
      'Monitor system health, alerts, logs, and uptime metrics.',
      'Participate in security audits and automated backup verification.'
    ],
    requiredSkills: ['Linux', 'Git', 'Python', 'Docker'],
    preferredSkills: ['AWS', 'CI/CD', 'SQL'],
    benefits: [
      'Comprehensive cloud certification sponsorship (AWS Solutions Architect)',
      '100% remote working flexibility',
      'Premium health and dental coverage',
      'Equipment budget for dual-monitor setup'
    ],
    applicantsCount: 14
  },
  {
    id: 'job-14',
    title: 'Entry-Level QA Automation Engineer',
    company: 'TestLogic Systems',
    logoBg: '#16A34A',
    rating: 4.3,
    location: 'Bangalore, India (On-site)',
    workType: 'On-site',
    experience: '0-1 years (Fresher Friendly)',
    isFresherFriendly: true,
    salary: '₹5,50,000 - ₹7,50,000 / year',
    category: 'Software Engineer',
    postedDate: '4 days ago',
    description: 'Kickstart your engineering career in software quality assurance and automated test development. Write test scripts that protect millions of users from bugs.',
    responsibilities: [
      'Design test scenarios, test cases, and acceptance criteria.',
      'Write automated UI and API tests using JavaScript and Jest / Cypress.',
      'Identify, document, and track software defects in Jira.',
      'Collaborate closely with development teams before major product releases.'
    ],
    requiredSkills: ['JavaScript', 'Testing', 'HTML', 'Git'],
    preferredSkills: ['Jest', 'REST API', 'Python'],
    benefits: [
      'Intensive test automation training academy',
      'Quarterly team celebrations and hackathons',
      'Full medical insurance with OPD coverage',
      'Free commuter shuttle services'
    ],
    applicantsCount: 17
  }
];
