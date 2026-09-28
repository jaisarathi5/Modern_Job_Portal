/**
 * Multi-Domain Engineering Taxonomy
 * Single source of truth for branches, roles, skills and assessment topics.
 */

export const ENGINEERING_BRANCHES = [
  {
    id: 'cse-it',
    label: 'CSE / IT',
    short: 'CSE',
    color: '#2563EB',
    description: 'Software, full-stack, AI/ML, cloud & cybersecurity.',
    skills: ['JavaScript', 'React', 'Python', 'Java', 'SQL', 'Git', 'Node.js', 'Data Structures'],
    roles: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Analyst', 'Data Scientist', 'AI/ML Intern', 'Software Engineer', 'Cloud Engineer', 'Python Developer', 'Java Developer'],
    assessmentTopics: ['JavaScript', 'React', 'Python', 'SQL', 'Machine Learning', 'Data Structures'],
  },
  {
    id: 'ece',
    label: 'ECE',
    short: 'ECE',
    color: '#7C3AED',
    description: 'Embedded, VLSI, signals & communication.',
    skills: ['Embedded C', 'VLSI', 'Digital Electronics', 'Signal Processing', 'MATLAB', 'Verilog', 'Microcontrollers', 'Communication Systems'],
    roles: ['Embedded Systems Engineer', 'VLSI Design Engineer', 'Signal Processing Engineer', 'Telecom Engineer', 'IoT Engineer'],
    assessmentTopics: ['Digital Electronics', 'Embedded C', 'Signal Processing', 'Communication Systems'],
  },
  {
    id: 'eee',
    label: 'EEE',
    short: 'EEE',
    color: '#B45309',
    description: 'Power systems, control, drives & renewables.',
    skills: ['Power Systems', 'Control Systems', 'MATLAB', 'PLC', 'Circuit Theory', 'Power Electronics', 'Renewable Energy', 'Protection Systems'],
    roles: ['Power Systems Engineer', 'Control Systems Engineer', 'Electrical Design Engineer', 'Renewable Energy Engineer'],
    assessmentTopics: ['Power Systems', 'Control Systems', 'Circuit Theory', 'Power Electronics'],
  },
  {
    id: 'mechanical',
    label: 'Mechanical',
    short: 'ME',
    color: '#EA580C',
    description: 'Design, thermal, manufacturing & mechatronics.',
    skills: ['AutoCAD', 'SolidWorks', 'Thermodynamics', 'Fluid Mechanics', 'Manufacturing Processes', 'Ansys', 'Engineering Mechanics', 'CNC'],
    roles: ['Design Engineer', 'Thermal Engineer', 'Manufacturing Engineer', 'Quality Engineer', 'Maintenance Engineer'],
    assessmentTopics: ['Thermodynamics', 'Fluid Mechanics', 'Engineering Mechanics', 'Manufacturing Processes'],
  },
  {
    id: 'civil',
    label: 'Civil',
    short: 'CE',
    color: '#0D9488',
    description: 'Structures, construction, geotech & transport.',
    skills: ['AutoCAD', 'STAAD Pro', 'Structural Analysis', 'Surveying', 'Concrete Technology', 'Geotechnical', 'Estimation & Costing', 'ETABS'],
    roles: ['Site Engineer', 'Structural Engineer', 'Quantity Surveyor', 'Transportation Engineer', 'Construction Manager'],
    assessmentTopics: ['Structural Analysis', 'Surveying', 'Concrete Technology', 'Geotechnical'],
  },
  {
    id: 'chemical',
    label: 'Chemical',
    short: 'CHE',
    color: '#16A34A',
    description: 'Process design, reactions & plant safety.',
    skills: ['Process Design', 'Thermodynamics', 'Mass Transfer', 'Heat Transfer', 'Aspen HYSYS', 'Reaction Engineering', 'Plant Safety', 'Fluid Mechanics'],
    roles: ['Process Engineer', 'Plant Engineer', 'Safety Engineer', 'R&D Chemist Engineer'],
    assessmentTopics: ['Mass Transfer', 'Heat Transfer', 'Reaction Engineering', 'Process Design'],
  },
];
export const MORE_BRANCHES = [
  { id: 'automobile', label: 'Automobile', short: 'AUTO', color: '#DC2626', description: 'Vehicle dynamics, EV powertrain & chassis.', skills: ['Vehicle Dynamics', 'AutoCAD', 'EV Powertrain', 'IC Engines', 'CATIA', 'Automotive Electronics', 'Chassis Design', 'SolidWorks'], roles: ['Automotive Design Engineer', 'EV Powertrain Engineer', 'Vehicle Testing Engineer', 'Chassis Engineer'], assessmentTopics: ['Vehicle Dynamics', 'IC Engines', 'EV Powertrain', 'Automotive Electronics'] },
  { id: 'aerospace', label: 'Aerospace', short: 'AERO', color: '#0F172A', description: 'Aerodynamics, propulsion & avionics.', skills: ['Aerodynamics', 'Propulsion', 'MATLAB', 'CATIA', 'Flight Mechanics', 'Avionics', 'CFD', 'Composite Structures'], roles: ['Aerodynamics Engineer', 'Propulsion Engineer', 'Avionics Engineer', 'Flight Test Engineer'], assessmentTopics: ['Aerodynamics', 'Propulsion', 'Flight Mechanics', 'Avionics'] },
  { id: 'robotics', label: 'Robotics', short: 'ROBO', color: '#4F46E5', description: 'ROS, control, perception & automation.', skills: ['ROS', 'Python', 'Control Systems', 'Computer Vision', 'Embedded C', 'Kinematics', 'MATLAB', 'Machine Learning'], roles: ['Robotics Engineer', 'Automation Engineer', 'Perception Engineer', 'Controls Engineer', 'Mechatronics Engineer'], assessmentTopics: ['Robotics', 'Control Systems', 'Kinematics', 'Computer Vision'] },
  { id: 'biomedical', label: 'Biomedical', short: 'BME', color: '#EC4899', description: 'Devices, biomechanics & instrumentation.', skills: ['Biomechanics', 'Medical Instrumentation', 'MATLAB', 'Biomaterials', 'Signal Processing', 'Anatomy & Physiology', 'CAD for Devices', 'Clinical Standards'], roles: ['Biomedical Engineer', 'Clinical Engineer', 'Medical Device Engineer', 'Biomechanics Engineer'], assessmentTopics: ['Biomechanics', 'Medical Instrumentation', 'Biomaterials', 'Signal Processing'] },
  { id: 'environmental', label: 'Environmental', short: 'ENV', color: '#059669', description: 'Water, waste, EIA & sustainability.', skills: ['EIA', 'Water Treatment', 'Solid Waste Management', 'Environmental Law', 'GIS', 'Sustainability', 'Air Pollution Control', 'AutoCAD'], roles: ['Environmental Engineer', 'Sustainability Analyst', 'Water Treatment Engineer', 'EHS Engineer'], assessmentTopics: ['EIA', 'Water Treatment', 'Air Pollution Control', 'Sustainability'] },
  { id: 'general', label: 'Cross-Branch / General', short: 'ALL', color: '#475569', description: 'Aptitude-first & interdisciplinary roles.', skills: ['Quantitative Aptitude', 'Logical Reasoning', 'Communication', 'Excel', 'Project Management', 'Git'], roles: ['Graduate Engineer Trainee', 'UI/UX Designer'], assessmentTopics: ['Quantitative Aptitude', 'Logical Reasoning'] },
];

export const ALL_BRANCHES = [...ENGINEERING_BRANCHES, ...MORE_BRANCHES];

export function getBranchById(id) {
  if (!id) return null;
  return ALL_BRANCHES.find((b) => b.id === String(id).toLowerCase()) || null;
}

export function getBranchForCategory(category) {
  if (!category) return getBranchById('general');
  const cat = String(category).toLowerCase();
  for (const branch of ALL_BRANCHES) {
    if (branch.roles.some((r) => r.toLowerCase() === cat)) return branch;
    if (branch.label.toLowerCase() === cat) return branch;
  }
  if (['frontend developer','backend developer','full stack developer','python developer','java developer','data analyst','data scientist','ai/ml intern','software engineer'].includes(cat)) return getBranchById('cse-it');
  if (cat.includes('ui/ux')) return getBranchById('cse-it');
  return getBranchById('general');
}

export function getBranchSkills(branchId) {
  return getBranchById(branchId)?.skills || [];
}

export function getAllCategories() {
  const seen = new Set();
  const out = [];
  ALL_BRANCHES.forEach((b) => { b.roles.forEach((r) => { if (!seen.has(r)) { seen.add(r); out.push(r); } }); });
  return out;
}

export function getAllBranchSkills() {
  const seen = new Map();
  ALL_BRANCHES.forEach((b) => { b.skills.forEach((s) => { const k = s.toLowerCase(); if (!seen.has(k)) seen.set(k, s); }); });
  return [...seen.values()];
}

export const BRANCH_IDS = ALL_BRANCHES.map((b) => b.id);
