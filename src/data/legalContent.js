/**
 * Static copy for the public /privacy, /terms and /security pages.
 * Kept in data/ so the pages stay dumb presentational components.
 */

export const PRIVACY_POLICY = {
  eyebrow: 'Legal',
  title: 'Privacy Policy',
  updated: 'Last updated: January 2025',
  intro:
    'SkillBridge is a student-first job portal. This policy explains exactly what the platform records, where it is kept, and how you stay in control of it.',
  sections: [
    {
      heading: '1. What we store',
      body:
        'Your profile details (name, email, college, degree, CGPA, bio, phone), the skills you add, any resume text you paste, the jobs you bookmark, the applications you submit, and your assessment scores, answers and readiness results.'
    },
    {
      heading: '2. Where your data lives',
      body:
        'Everything is written to the localStorage of the browser you are using, under keys prefixed with "sb_". No account data, resume text, application or assessment result is transmitted to a SkillBridge server, because this build has no backend.'
    },
    {
      heading: '3. Third-party requests',
      body:
        'Page fonts are loaded from the Google Fonts CDN, and company logos are resolved through the Google favicon service. Those requests reveal your IP address to Google. No analytics, advertising or tracking pixel is included in this build.'
    },
    {
      heading: '4. What we never collect',
      body:
        'No payment or bank details, no government identifiers, no precise location, and no background data from your device. Assessment results are produced locally by a rule-based scoring engine.'
    },
    {
      heading: '5. Your control',
      body:
        'Use Settings → "Reset demo data" to erase every stored record and restore the seeded demo state, or clear site data for this origin in your browser. Both actions are immediate and irreversible in this build.'
    },
    {
      heading: '6. Contact',
      body:
        'This is a demonstration project. For questions about the data model, reach the maintainer through the repository where this project is published.'
    }
  ]
};

export const TERMS_OF_SERVICE = {
  eyebrow: 'Legal',
  title: 'Terms of Service',
  updated: 'Last updated: January 2025',
  intro:
    'By browsing jobs, completing an assessment, or posting an opening through SkillBridge, you agree to the terms below.',
  sections: [
    {
      heading: '1. The service',
      body:
        'SkillBridge connects engineering students and freshers across every discipline with employers. Jobs, companies, applicants and assessments in this build are seeded demonstration data intended for evaluation and learning purposes.'
    },
    {
      heading: '2. Candidate responsibilities',
      body:
        'Keep your profile, skills and resume text accurate. Skills you list directly drive your Smart Job Match percentage, so inflated claims only distort your own recommendations.'
    },
    {
      heading: '3. Assessment integrity',
      body:
        'Assessment "Secure Mode" records focus-loss and visibility events within the browser session. It is a lightweight integrity signal, not proctoring, and it runs entirely on your device.'
    },
    {
      heading: '4. Employer responsibilities',
      body:
        'Recruiters must post genuine openings and use candidate data only for that hiring process. Posting misleading salary ranges, experience levels or skill requirements is not permitted.'
    },
    {
      heading: '5. No employment guarantee',
      body:
        'A high Match Score, Assessment Score or Role Readiness figure is advisory. It is not a hiring probability and does not guarantee shortlisting, an interview or an offer from any employer.'
    },
    {
      heading: '6. Changes and termination',
      body:
        'Access may be modified or withdrawn at any time, and these terms may be updated as the platform evolves. Continued use after an update constitutes acceptance of the revised terms.'
    }
  ]
};

export const SECURITY_COMPLIANCE = {
  eyebrow: 'Trust & Safety',
  title: 'Security & Compliance',
  updated: 'Last updated: January 2025',
  intro:
    'How this build protects your data, what the assessment integrity signals actually do, and where the honest limits are.',
  sections: [
    {
      heading: '1. Client-side security model',
      body:
        'The application is a static React build. Accounts, jobs, applications and assessment results are handled in the browser, so data never traverses a network connection and cannot be exposed by a server-side breach.'
    },
    {
      heading: '2. Isolation between accounts',
      body:
        'Records are scoped by the signed-in user id, and each browser profile holds its own store. Two people sharing the same browser profile will share that store, so sign out before handing the device over.'
    },
    {
      heading: '3. Assessment integrity signals',
      body:
        'When a job enables Secure Mode, the assessment records tab switches, window blur and fullscreen exits as security events and surfaces them with the result. Quiz answers stay in memory until submission.'
    },
    {
      heading: '4. Known limitations',
      body:
        'Because scoring runs on the client, a determined user could inspect the question bank in developer tools. Treat these results as practice and direction, not as tamper-proof certification.'
    },
    {
      heading: '5. Responsible disclosure',
      body:
        'Found a flaw in the scoring engine, the guard rules or the storage model? Report it privately through the repository issue tracker before publishing it publicly.'
    }
  ]
};
