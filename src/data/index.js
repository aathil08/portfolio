/* ============================================================
   Portfolio Data — Mohamed Aathil
   Real professional information — update links/resume path as needed.
   ============================================================ */

// ── Personal Info ────────────────────────────────────────────
export const personalInfo = {
  name:         'Mohamed Aathil',
  shortName:    'MA',
  roles:        ['Full Stack Developer', 'Java Developer', 'Software Developer'],
  tagline:      'Transforming ideas into intelligent digital solutions and building technology that solves real-world challenges.',
  bio: `I am a B.E. Computer Science Engineering graduate from M.I.E.T Engineering College with a strong foundation in software development and full-stack technologies.

I am passionate about solving real-world problems through technology and continuously upgrading my skills to stay updated with the rapidly evolving software industry.

My strengths include problem solving, adaptability, continuous learning, teamwork, and the ability to quickly understand new technologies.

My goal is to become a skilled software engineer who develops impactful applications, contributes to innovative projects, and grows with modern technologies.`,
  location:     'Kumbakonam, Tamil Nadu, India',
  email:        'aathilmohamed458@gmail.com',
  phone:        '+91 7539994263',
  github:       'https://github.com/aathil08',
  linkedin:     'https://linkedin.com/in/mohamed-aathil-6a797a35a',
  twitter:      '',
  leetcode:     '',
  whatsapp:     'https://wa.me/917539994263',
  instagram:    'https://www.instagram.com/aathil._.08?igsh=MXN4dGdvZnYyMDdjcg==',
  facebook:     'https://www.facebook.com/share/1EF4KLVBrT/',
  resumeUrl:    '/resume.pdf',
  availability: 'Open to Opportunities',
};

// ── Stats ────────────────────────────────────────────────────
export const stats = [
  { value: 1,  suffix: '+', label: 'Years Experience'  },
  { value: 2,  suffix: '+', label: 'Projects Built'    },
  { value: 10, suffix: '+', label: 'Technologies'      },
  { value: 5,  suffix: '+', label: 'Certifications'    },
];

// ── Skills ───────────────────────────────────────────────────
export const skillCategories = ['Programming', 'Frontend', 'Backend', 'Database', 'Tools'];

export const skills = {
  Programming: [
    { name: 'Java',         icon: 'FaJava',        color: 'text-orange-500' },
    { name: 'JavaScript',   icon: 'SiJavascript',  color: 'text-yellow-400' },
    { name: 'Python',       icon: 'FaPython',      color: 'text-blue-400'   },
    { name: 'HTML5',        icon: 'FaHtml5',       color: 'text-orange-400' },
    { name: 'CSS3',         icon: 'FaCss3Alt',     color: 'text-blue-500'   },
  ],
  Frontend: [
    { name: 'React.js',       icon: 'FaReact',       color: 'text-cyan-400'    },
    { name: 'Tailwind CSS',   icon: 'SiTailwindcss', color: 'text-teal-400'    },
    { name: 'Bootstrap',      icon: 'SiBootstrap',   color: 'text-violet-500'  },
    { name: 'Resp. Design',   icon: 'TbDevices',     color: 'text-pink-400'    },
  ],
  Backend: [
    { name: 'Node.js',    icon: 'FaNodeJs',      color: 'text-green-400'  },
    { name: 'Express.js', icon: 'SiExpress',     color: 'text-gray-300'   },
    { name: 'Django',     icon: 'SiDjango',      color: 'text-green-600'  },
    { name: 'REST APIs',  icon: 'TbApi',         color: 'text-cyan-500'   },
  ],
  Database: [
    { name: 'MongoDB',  icon: 'SiMongodb', color: 'text-green-500'  },
    { name: 'MySQL',    icon: 'SiMysql',   color: 'text-blue-400'   },
  ],
  Tools: [
    { name: 'Git',      icon: 'FaGit',     color: 'text-orange-500' },
    { name: 'GitHub',   icon: 'FaGithub',  color: 'text-gray-200'   },
    { name: 'VS Code',  icon: 'VscVscode', color: 'text-blue-500'   },
    { name: 'Postman',  icon: 'SiPostman', color: 'text-orange-400' },
  ],
};

// ── Experience ───────────────────────────────────────────────
export const experience = [
  {
    id:       1,
    role:     'Software Development Intern',
    company:  'VDart',
    period:   '2025 – Present',
    location: 'India',
    type:     'Internship',
    description: [
      'Worked on the Tech Army Salary Management project, contributing to key features and system improvements.',
      'Developed and improved software features, delivering functional enhancements aligned with project requirements.',
      'Gained hands-on experience in real-world software development workflows, Agile practices, and version control.',
      'Improved teamwork and problem-solving skills through active collaboration with cross-functional development teams.',
    ],
    tech:  ['React.js', 'Django', 'Node.js', 'Express.js', 'REST APIs', 'Git'],
    color: 'cyan',
  },
];

// ── Projects ─────────────────────────────────────────────────
export const projectCategories = ['All', 'Full Stack'];

export const projects = [
  {
    id:          1,
    title:       'Learning Management System',
    description: 'A web-based platform for online education management with user authentication, course management, and a responsive dashboard interface.',
    tech:        ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    category:    'Full Stack',
    github:      'https://github.com/aathil08/Learning-management-system',
    live:        null,
    featured:    true,
    gradient:    'from-blue-500 via-indigo-500 to-violet-600',
    icon:        '🎓',
    features: [
      'User authentication & authorization',
      'Student and course management',
      'Interactive dashboard interface',
      'RESTful API communication',
      'Fully responsive design',
    ],
  },
  {
    id:          2,
    title:       'Tech Army Salary Management',
    description: 'An enterprise-grade salary management system for employee records, salary updates, history tracking, and comprehensive dashboard controls.',
    tech:        ['React.js', 'Django', 'Django REST Framework', 'SQLite', 'CSS'],
    category:    'Full Stack',
    github:      'https://github.com/aathil08/Tech-army---salary-management',
    live:        null,
    featured:    true,
    gradient:    'from-cyan-500 via-blue-500 to-indigo-600',
    icon:        '💼',
    features: [
      'Employee management portal',
      'Salary update workflows',
      'Payroll records & history',
      'Admin dashboard management',
    ],
  },
];

// ── Education ────────────────────────────────────────────────
export const education = [
  {
    id:          1,
    degree:      'Bachelor of Engineering — Computer Science & Engineering',
    institution: 'M.I.E.T Engineering College',
    period:      '2022 – 2026',
    grade:       '8.13 CGPA',
    location:    'Tamil Nadu, India',
    description: 'Pursuing a comprehensive B.E. in Computer Science with a strong focus on software development, data structures, algorithms, full-stack web development, and database management systems.',
    courses:     ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks', 'Software Engineering', 'OOP with Java'],
    color:       'cyan',
    type:        'BE',
  },
  {
    id:          2,
    degree:      'Higher Secondary Certificate (H.S.C)',
    institution: 'Rice City Matric Hr. Sec. School',
    period:      '2021 – 2022',
    grade:       '80.83%',
    location:    'Aduthurai, Tamil Nadu',
    description: 'Completed Higher Secondary Education with a focus on Mathematics, Physics, Chemistry, and Computer Science, building a strong academic foundation for engineering studies.',
    courses:     ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English'],
    color:       'violet',
    type:        'HSC',
  },
  {
    id:          3,
    degree:      'Secondary School Leaving Certificate (S.S.L.C)',
    institution: 'Rice City Matric Hr. Sec. School',
    period:      '2019 – 2020',
    grade:       '81.2%',
    location:    'Aduthurai, Tamil Nadu',
    description: 'Completed secondary school education with distinction, developing core competencies in mathematics, science, and languages that laid the foundation for higher studies.',
    courses:     ['Mathematics', 'Science', 'Social Science', 'English', 'Tamil'],
    color:       'violet',
    type:        'SSLC',
  },
];

// ── Certifications ───────────────────────────────────────────
export const certifications = [
  {
    id:           1,
    title:        'Data Science & Analytics',
    issuer:       'HP LIFE',
    date:         '2025',
    credentialId: 'HPLIFE-DS',
    verifyUrl:    '#',
    imageUrl:     '/certificates/hp-life-ds.jpeg',
    gradient:     'from-blue-500 to-cyan-500',
    emoji:        '📊',
    description:  'Comprehensive data science and analytics program covering data analysis, visualization, and statistical methods.',
  },
  {
    id:           2,
    title:        'Build a Full Website using WordPress',
    issuer:       'Coursera',
    date:         '2025',
    credentialId: 'COURSERA-WP',
    verifyUrl:    'https://coursera.org/verify/QILEUUQ5OP0B',
    imageUrl:     '/certificates/coursera-wp.jpeg',
    gradient:     'from-indigo-500 to-blue-600',
    emoji:        '🌐',
    description:  'Hands-on certification for building fully functional, professional websites using the WordPress platform.',
  },
  {
    id:           3,
    title:        'Business Analytics Webinar',
    issuer:       'GUVI × HCL',
    date:         '2025',
    credentialId: 'GUVI-BA',
    verifyUrl:    '#',
    imageUrl:     '/certificates/guvi-ba.jpeg',
    gradient:     'from-green-500 to-teal-500',
    emoji:        '📈',
    description:  'Intensive webinar on business analytics methodologies, tools, and real-world data-driven decision making.',
  },
  {
    id:           4,
    title:        'Cybersecurity Roadmap 2025',
    issuer:       'SkillEcted',
    date:         '2025',
    credentialId: 'SKILLECTED-CS',
    verifyUrl:    '#',
    imageUrl:     '/certificates/skillected-cs.jpeg',
    gradient:     'from-red-500 to-orange-500',
    emoji:        '🔒',
    description:  'Forward-looking cybersecurity program covering threat landscapes, defense strategies, and emerging security practices.',
  },
  {
    id:           5,
    title:        'Power BI Workshop',
    issuer:       'OfficeMaster',
    date:         '2025',
    credentialId: 'OM-PBI',
    verifyUrl:    '#',
    imageUrl:     '/certificates/officemaster-pbi.jpeg',
    gradient:     'from-yellow-500 to-orange-500',
    emoji:        '📉',
    description:  'Practical workshop on building interactive dashboards and business intelligence reports using Microsoft Power BI.',
  },
];

// ── Navigation Links ─────────────────────────────────────────
export const navLinks = [
  { label: 'About',          href: '#about'          },
  { label: 'Skills',         href: '#skills'         },
  { label: 'Experience',     href: '#experience'     },
  { label: 'Projects',       href: '#projects'       },
  { label: 'Education',      href: '#education'      },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Resume',         href: '#resume'         },
  { label: 'Contact',        href: '#contact'        },
];
