export const MORE_BRANCHES = [
  {
    id: 'automobile',
    label: 'Automobile',
    short: 'AUTO',
    color: '#DC2626',
    description: 'Vehicle dynamics, EV powertrain & chassis.',
    skills: ['Vehicle Dynamics', 'AutoCAD', 'EV Powertrain', 'IC Engines', 'CATIA', 'Automotive Electronics', 'Chassis Design', 'SolidWorks'],
    roles: ['Automotive Design Engineer', 'EV Powertrain Engineer', 'Vehicle Testing Engineer', 'Chassis Engineer'],
    assessmentTopics: ['Vehicle Dynamics', 'IC Engines', 'EV Powertrain', 'Automotive Electronics'],
  },
  {
    id: 'aerospace',
    label: 'Aerospace',
    short: 'AERO',
    color: '#0F172A',
    description: 'Aerodynamics, propulsion & avionics.',
    skills: ['Aerodynamics', 'Propulsion', 'MATLAB', 'CATIA', 'Flight Mechanics', 'Avionics', 'CFD', 'Composite Structures'],
    roles: ['Aerodynamics Engineer', 'Propulsion Engineer', 'Avionics Engineer', 'Flight Test Engineer'],
    assessmentTopics: ['Aerodynamics', 'Propulsion', 'Flight Mechanics', 'Avionics'],
  },
  {
    id: 'robotics',
    label: 'Robotics',
    short: 'ROBO',
    color: '#4F46E5',
    description: 'ROS, control, perception & automation.',
    skills: ['ROS', 'Python', 'Control Systems', 'Computer Vision', 'Embedded C', 'Kinematics', 'MATLAB', 'Machine Learning'],
    roles: ['Robotics Engineer', 'Automation Engineer', 'Perception Engineer', 'Controls Engineer', 'Mechatronics Engineer'],
    assessmentTopics: ['Robotics', 'Control Systems', 'Kinematics', 'Computer Vision'],
  },
  {
    id: 'biomedical',
    label: 'Biomedical',
    short: 'BME',
    color: '#EC4899',
    description: 'Devices, biomechanics & instrumentation.',
    skills: ['Biomechanics', 'Medical Instrumentation', 'MATLAB', 'Biomaterials', 'Signal Processing', 'Anatomy & Physiology', 'CAD for Devices', 'Clinical Standards'],
    roles: ['Biomedical Engineer', 'Clinical Engineer', 'Medical Device Engineer', 'Biomechanics Engineer'],
    assessmentTopics: ['Biomechanics', 'Medical Instrumentation', 'Biomaterials', 'Signal Processing'],
  },
  {
    id: 'environmental',
    label: 'Environmental',
    short: 'ENV',
    color: '#059669',
    description: 'Water, waste, EIA & sustainability.',
    skills: ['EIA', 'Water Treatment', 'Solid Waste Management', 'Environmental Law', 'GIS', 'Sustainability', 'Air Pollution Control', 'AutoCAD'],
    roles: ['Environmental Engineer', 'Sustainability Analyst', 'Water Treatment Engineer', 'EHS Engineer'],
    assessmentTopics: ['EIA', 'Water Treatment', 'Air Pollution Control', 'Sustainability'],
  },
  {
    id: 'general',
    label: 'Cross-Branch / General',
    short: 'ALL',
    color: '#475569',
    description: 'Aptitude-first & interdisciplinary roles.',
    skills: ['Quantitative Aptitude', 'Logical Reasoning', 'Communication', 'Excel', 'Project Management', 'Git'],
    roles: ['Graduate Engineer Trainee', 'UI/UX Designer'],
    assessmentTopics: ['Quantitative Aptitude', 'Logical Reasoning'],
  },
];

export function getBranchById(id, all = []) {
  if (!id) return null;
  const list = [...ENGINEERING_BRANCHES, ...MORE_BRANCHES, ...all];
  return list.find((b) => b.id === String(id).toLowerCase()) || null;
}
