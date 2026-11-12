import { Job, Application } from '../types/job';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer (React & TypeScript)',
    company: 'Skyline Cloud Systems',
    department: 'Engineering',
    location: 'San Francisco, CA (or Remote)',
    workplaceType: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Senior',
    salaryMin: 145000,
    salaryMax: 175000,
    currency: '$',
    description: 'We are seeking a seasoned Frontend Engineer to lead the architecture and evolution of our real-time cloud management dashboard. You will work closely with product designers and backend engineers to craft fluid, accessible, and high-performance web applications using modern React, TypeScript, and Tailwind CSS.',
    responsibilities: [
      'Architect and build modular, high-performance UI components in React and TypeScript.',
      'Collaborate with UX designers to translate wireframes into interactive, accessible experiences.',
      'Optimize web performance, bundle size, and rendering bottlenecks.',
      'Mentor junior and mid-level engineers through code reviews and technical design discussions.',
      'Integrate with GraphQL and REST APIs with resilient error handling and caching.'
    ],
    requirements: [
      '5+ years of production experience with modern JavaScript/TypeScript and React.',
      'Deep understanding of browser performance, state management, and CSS-in-JS or Tailwind CSS.',
      'Experience with testing frameworks such as Vitest, Jest, or Cypress.',
      'Excellent communication skills and experience working in agile, distributed teams.',
      'Bachelor’s degree in Computer Science or equivalent practical experience.'
    ],
    benefits: [
      '100% Remote flexibility with home office stipend ($1,500)',
      'Comprehensive health, dental, and vision insurance with zero employee premium',
      'Unlimited Paid Time Off (PTO) with minimum mandatory 3 weeks off',
      '401(k) matching up to 5%',
      'Annual learning & development allowance ($2,000)'
    ],
    status: 'active',
    postedDate: '2026-11-05',
    deadline: '2026-12-15',
    applicantCount: 5,
    featured: true,
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Next.js']
  },
  {
    id: 'job-2',
    title: 'Lead Product Designer (UI / UX)',
    company: 'AeroFlow Technologies',
    department: 'Design',
    location: 'New York, NY',
    workplaceType: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Lead',
    salaryMin: 135000,
    salaryMax: 165000,
    currency: '$',
    description: 'AeroFlow is looking for a creative Lead Product Designer to champion our design system and shape the future of our enterprise productivity suite. You will turn complex workflows into intuitive, delightful interfaces.',
    responsibilities: [
      'Define end-to-end design strategy from discovery, user research, wireframing, to high-fidelity prototypes.',
      'Evolve and maintain our Figma design system and component token architecture.',
      'Conduct regular user interviews, usability testing, and synthesize customer feedback.',
      'Partner closely with Product Managers and Engineering leads to ensure seamless delivery.'
    ],
    requirements: [
      '6+ years designing B2B SaaS or consumer-facing digital products.',
      'Mastery of Figma, interactive prototyping, and design systems.',
      'Strong portfolio demonstrating complex UX problem solving and modern visual craft.',
      'Solid grasp of web accessibility standards (WCAG 2.1 AA).'
    ],
    benefits: [
      'Competitive equity package with early exercise options',
      'Flexible hybrid schedule (2 days in NYC office, 3 days remote)',
      'Full health, dental, vision coverage',
      'Wellness stipend for gym and health memberships ($120/mo)',
      'Top-tier Apple hardware and 4K display setup'
    ],
    status: 'active',
    postedDate: '2026-11-08',
    deadline: '2026-12-20',
    applicantCount: 3,
    featured: true,
    tags: ['Figma', 'UI/UX', 'Design Systems', 'User Research', 'Prototyping']
  },
  {
    id: 'job-3',
    title: 'Backend Systems Engineer (Go & Distributed Systems)',
    company: 'Nexus Scale Labs',
    department: 'Engineering',
    location: 'Austin, TX',
    workplaceType: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Mid-level',
    salaryMin: 120000,
    salaryMax: 150000,
    currency: '$',
    description: 'Join our infrastructure team to build microservices processing millions of telemetry events per second. You will leverage Go, Kubernetes, Kafka, and PostgreSQL to deliver resilient high-throughput distributed services.',
    responsibilities: [
      'Design, build, and deploy high-concurrency backend services using Go.',
      'Develop event-driven architectures with Apache Kafka and RabbitMQ.',
      'Optimize relational databases (PostgreSQL) and caching layers (Redis).',
      'Participate in on-call rotations and diagnose production issues with OpenTelemetry and Grafana.'
    ],
    requirements: [
      '3+ years of experience with Go, Rust, or modern C++ in distributed environments.',
      'Strong understanding of concurrent programming, networking, and IPC.',
      'Familiarity with containerization (Docker, Kubernetes) and CI/CD pipelines.',
      'Experience tuning SQL queries and working with database schemas.'
    ],
    benefits: [
      'Remote-first culture across US timezones',
      'Generous 401(k) matching',
      'Annual company retreat in tropical destinations',
      'Parental leave (16 weeks paid)'
    ],
    status: 'active',
    postedDate: '2026-11-02',
    deadline: '2026-12-10',
    applicantCount: 4,
    featured: false,
    tags: ['Golang', 'Kubernetes', 'Kafka', 'PostgreSQL', 'Docker']
  },
  {
    id: 'job-4',
    title: 'Growth Marketing Manager',
    company: 'BlueHorizon Media',
    department: 'Marketing',
    location: 'Chicago, IL',
    workplaceType: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Mid-level',
    salaryMin: 95000,
    salaryMax: 125000,
    currency: '$',
    description: 'We are seeking a metrics-driven Growth Marketing Manager to oversee multi-channel acquisition funnels, paid search, SEO, and content marketing strategies that fuel user acquisition and pipeline acceleration.',
    responsibilities: [
      'Manage customer acquisition campaigns across Google Ads, LinkedIn, and programmatic networks.',
      'Collaborate with the content and creative teams to build high-converting landing pages.',
      'Run rigorous A/B experiments to optimize conversion rates across the funnel.',
      'Analyze campaign metrics using Google Analytics 4, Mixpanel, and HubSpot.'
    ],
    requirements: [
      '3-5 years experience in growth or performance marketing in B2B SaaS.',
      'Demonstrated track record of scaling digital ad spend while maintaining healthy CAC:LTV.',
      'Data fluency: advanced Excel, SQL knowledge is a huge plus.',
      'Strong copywriting and visual storytelling instincts.'
    ],
    benefits: [
      'Competitive salary + performance bonus (up to 20%)',
      'Hybrid work model with flexible hours',
      'Full healthcare benefits with HSA contribution',
      'Commuter transit passes and catered lunch twice a week'
    ],
    status: 'active',
    postedDate: '2026-11-09',
    deadline: '2026-12-30',
    applicantCount: 2,
    featured: false,
    tags: ['Growth', 'SEO', 'PPC', 'Google Ads', 'Analytics']
  },
  {
    id: 'job-5',
    title: 'Senior DevOps & Platform Engineer',
    company: 'Skyline Cloud Systems',
    department: 'Engineering',
    location: 'Seattle, WA',
    workplaceType: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Senior',
    salaryMin: 155000,
    salaryMax: 185000,
    currency: '$',
    description: 'Help us scale our cloud footprint across AWS and GCP using Infrastructure as Code (Terraform) and GitOps principles. You will champion security best practices, automated deployment pipelines, and high availability.',
    responsibilities: [
      'Provision and manage multi-region cloud infrastructure using Terraform and Ansible.',
      'Maintain Kubernetes clusters with ArgoCD GitOps pipelines.',
      'Automate security patching, vulnerability scanning, and compliance audits.',
      'Improve incident response times through proactive alerting and automated runbooks.'
    ],
    requirements: [
      '5+ years hands-on experience managing production cloud infrastructure (AWS or GCP).',
      'Deep expertise in Kubernetes (EKS/GKE), Helm, and service meshes (Istio/Linkerd).',
      'Proficiency in scripting (Python, Bash, or Go).',
      'Strong grasp of zero-trust architecture and SOC 2 compliance.'
    ],
    benefits: [
      'Fully remote with work from anywhere policy',
      'Top-of-market base salary and equity',
      'Flexible vacation policy',
      'Cell phone & internet bill reimbursement ($150/mo)'
    ],
    status: 'active',
    postedDate: '2026-11-10',
    deadline: '2026-12-31',
    applicantCount: 2,
    featured: true,
    tags: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'GitOps']
  },
  {
    id: 'job-6',
    title: 'Product Operations & Customer Success Specialist',
    company: 'PulseMetrics',
    department: 'Operations',
    location: 'Denver, CO',
    workplaceType: 'On-site',
    type: 'Full-time',
    experienceLevel: 'Entry-level',
    salaryMin: 65000,
    salaryMax: 80000,
    currency: '$',
    description: 'Are you passionate about helping users succeed? PulseMetrics is hiring a customer-obsessed Product Operations Specialist to guide onboarding, troubleshoot inquiries, and bridge user feedback to our engineering team.',
    responsibilities: [
      'Conduct onboarding sessions and software demos for new business customers.',
      'Respond to support tickets via Zendesk and live chat with high empathy and speed.',
      'Document feature requests, bug reports, and UX pain points for product roadmaps.',
      'Write clear, engaging help center guides and customer FAQs.'
    ],
    requirements: [
      '1+ years of experience in customer support, customer success, or tech operations.',
      'Exceptional written and oral communication skills.',
      'Comfortable navigating SaaS tools and explaining technical concepts simply.',
      'Curiosity and willingness to learn and grow within the company.'
    ],
    benefits: [
      'Mentorship program with direct access to executive leadership',
      'Casual work environment in downtown Denver with rooftop patio',
      'Annual ski pass or outdoor gear stipend ($750)',
      'Comprehensive dental, vision, and health coverage'
    ],
    status: 'active',
    postedDate: '2026-11-11',
    deadline: '2026-12-25',
    applicantCount: 1,
    featured: false,
    tags: ['Customer Support', 'Operations', 'Zendesk', 'SaaS', 'Onboarding']
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior Frontend Engineer (React & TypeScript)',
    company: 'Skyline Cloud Systems',
    candidateName: 'Alex Morgan',
    candidateEmail: 'alex.morgan@example.com',
    candidatePhone: '+1 (555) 234-8901',
    candidateLinkedIn: 'https://linkedin.com/in/alexmorgan-dev',
    candidatePortfolio: 'https://alexmorgan.dev',
    yearsOfExperience: '6 years',
    coverLetter: 'I have been building large-scale React applications for over 6 years, with a major focus on performance and clean architecture. I love crafting seamless user experiences and have extensive experience with TypeScript and Tailwind CSS.',
    resumeFileName: 'Alex_Morgan_Resume_2026.pdf',
    resumeFileSize: '2.4 MB',
    appliedAt: '2026-11-06T10:15:00Z',
    status: 'interview',
    rating: 5,
    recruiterNotes: [
      {
        id: 'note-1',
        author: 'Sarah Jenkins (Recruiter)',
        text: 'Strong technical phone screen. Demonstrates deep knowledge of React fiber architecture and server components. Technical interview scheduled for Thursday.',
        createdAt: '2026-11-08T14:20:00Z'
      }
    ]
  },
  {
    id: 'app-2',
    jobId: 'job-1',
    jobTitle: 'Senior Frontend Engineer (React & TypeScript)',
    company: 'Skyline Cloud Systems',
    candidateName: 'Elena Rostova',
    candidateEmail: 'elena.rostova@example.com',
    candidatePhone: '+1 (555) 876-5432',
    candidateLinkedIn: 'https://linkedin.com/in/elena-rostova',
    candidatePortfolio: 'https://rostova-ui.io',
    yearsOfExperience: '5 years',
    coverLetter: 'Excited about Skyline Cloud Systems! I contributed to multiple open source React component libraries and specialize in accessibility and responsive layout architecture.',
    resumeFileName: 'Elena_Rostova_CV.pdf',
    resumeFileSize: '1.8 MB',
    appliedAt: '2026-11-07T14:30:00Z',
    status: 'reviewing',
    rating: 4,
    recruiterNotes: [
      {
        id: 'note-2',
        author: 'David Chen (Engineering Mgr)',
        text: 'Impressive GitHub portfolio. Code quality looks clean and well documented.',
        createdAt: '2026-11-09T09:10:00Z'
      }
    ]
  },
  {
    id: 'app-3',
    jobId: 'job-2',
    jobTitle: 'Lead Product Designer (UI / UX)',
    company: 'AeroFlow Technologies',
    candidateName: 'Marcus Vance',
    candidateEmail: 'marcus.vance@example.com',
    candidatePhone: '+1 (555) 432-1098',
    candidateLinkedIn: 'https://linkedin.com/in/marcusvance-design',
    candidatePortfolio: 'https://marcusvance.design',
    yearsOfExperience: '7 years',
    coverLetter: 'I have led design teams at fast-growing SaaS startups, scaling design systems across mobile and web. AeroFlow’s mission resonates with me, and I would love to bring my expertise to your product suite.',
    resumeFileName: 'Marcus_Vance_Design_Portfolio.pdf',
    resumeFileSize: '4.1 MB',
    appliedAt: '2026-11-09T16:00:00Z',
    status: 'offer',
    rating: 5,
    recruiterNotes: [
      {
        id: 'note-3',
        author: 'Sarah Jenkins (Recruiter)',
        text: 'Unanimous yes from the interview panel. Outstanding case study presentation. Offer letter sent out today.',
        createdAt: '2026-11-11T16:45:00Z'
      }
    ]
  },
  {
    id: 'app-4',
    jobId: 'job-3',
    jobTitle: 'Backend Systems Engineer (Go & Distributed Systems)',
    company: 'Nexus Scale Labs',
    candidateName: 'Devon Patel',
    candidateEmail: 'devon.patel@example.com',
    candidatePhone: '+1 (555) 321-7654',
    candidateLinkedIn: 'https://linkedin.com/in/devon-patel',
    yearsOfExperience: '4 years',
    coverLetter: 'Passionate about high-concurrency Go services and distributed message brokers. Looking to tackle challenging scaling problems.',
    resumeFileName: 'Devon_Patel_Resume.pdf',
    resumeFileSize: '1.2 MB',
    appliedAt: '2026-11-04T11:20:00Z',
    status: 'applied',
    rating: 3,
    recruiterNotes: []
  },
  {
    id: 'app-5',
    jobId: 'job-5',
    jobTitle: 'Senior DevOps & Platform Engineer',
    company: 'Skyline Cloud Systems',
    candidateName: 'Sophia Lin',
    candidateEmail: 'sophia.lin@example.com',
    candidatePhone: '+1 (555) 987-6543',
    candidateLinkedIn: 'https://linkedin.com/in/sophialin-cloud',
    yearsOfExperience: '8 years',
    coverLetter: 'AWS certified Solutions Architect with deep Kubernetes and Terraform experience. Scaled microservices to 10M+ daily active users.',
    resumeFileName: 'Sophia_Lin_DevOps_CV.pdf',
    resumeFileSize: '2.0 MB',
    appliedAt: '2026-11-10T18:00:00Z',
    status: 'interview',
    rating: 5,
    recruiterNotes: [
      {
        id: 'note-4',
        author: 'Sarah Jenkins (Recruiter)',
        text: 'Deep expertise in Kubernetes and security compliance. Final panel scheduled for next Tuesday.',
        createdAt: '2026-11-11T11:30:00Z'
      }
    ]
  }
];

