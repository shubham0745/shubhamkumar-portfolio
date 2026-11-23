export const site = {
  name: "Shubham Kumar",

  /** Rotating phrases for the hero typing effect. */
  roles: [
    "Backend Developer",
    "AI Trainer & Evaluator",
    "Python Developer",
    "Software Engineer",
    "Technical Problem Solver",
    "Freelance Technical Contributor",
  ],

  headline: "Building Software. Evaluating Intelligence. Solving Real-World Problems.",

  subtitle:
    "I'm a software developer and independent AI trainer/evaluator with a background in backend engineering, full-stack development, programming, and technical problem-solving.",

  availability: "Open to Software Engineering Roles · AI Evaluation · Freelance · Fellowships",

  tagline: "Backend engineering, AI evaluation and technical problem-solving",

  location: "Ranchi, Jharkhand, India",
  email: "shubhamkqr7@gmail.com",

  /**
   * The resume download is gated on purpose.
   *
   * `public/resume.pdf` is an older LinkedIn export. Its headline and its
   * Experience section both still lead with a role that has deliberately been
   * removed from this site, so serving that file would contradict every other
   * page. It also predates the AI evaluation work, the Chegg and Ardent
   * engagements, and the Distributed Key-Value Cache project.
   *
   * Replace public/resume.pdf with a current version, then set this to `true`.
   * Every resume button and link reads this flag, so that one change is enough.
   */
  resumeReady: false,
  resumeUrl: "/resume.pdf",

  // Any social left as "" is skipped everywhere rather than rendered broken.
  socials: {
    github: "https://github.com/shubham0745",
    linkedin: "https://www.linkedin.com/in/shubham-kumar-351000334",
    twitter: "https://x.com/Shubham_7430",
    instagram: "https://www.instagram.com/shubham_07.45/",
  },

  /** Drives metadataBase, Open Graph, canonicals, sitemap.xml and robots.txt. */
  url: "https://shubhamkumar.site",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export type Capability = {
  id: string;
  /** Rendered as the panel index, e.g. "01". */
  index: string;
  title: string;
  /** Deliberately two lines at most — the detail lives on /projects. */
  summary: string;
  /** Short engineering labels, not a technology dump. */
  tags: string[];
  /** Named work backing the claim, shown as a compact footer row. */
  work?: string[];
  cta: { label: string; href: string };
};

/**
 * Drives the "What I Work On" section on the home page.
 *
 * Kept short on purpose: this is a signpost, not the full story. The detailed
 * engineering breakdown belongs on /projects and /experience, which is where
 * each panel's link goes.
 */
export const capabilities: Capability[] = [
  {
    id: "backend",
    index: "01",
    title: "Backend Engineering & Distributed Systems",
    summary:
      "Backend systems built for reliability and performance — API design, async processing, distributed coordination and caching.",
    tags: ["Distributed Systems", "API Architecture", "Caching", "Async Processing"],
    work: ["LLM Gateway", "DV Cache"],
    cta: { label: "See the systems", href: "/projects" },
  },
  {
    id: "ai-evaluation",
    index: "02",
    title: "AI Training, Evaluation & Technical Benchmarking",
    summary:
      "Structured technical assessment of AI output — not whether an answer looks right, but whether it is technically sound and does what was asked.",
    tags: ["Technical Benchmarking", "Code Review", "Reasoning Analysis", "Rubric Design"],
    work: ["Independent AI Trainer & Evaluator · Oct 2024 – Present"],
    cta: { label: "See the engagement", href: "/experience" },
  },
  {
    id: "projects-research",
    index: "03",
    title: "Engineering Projects & Applied Research",
    summary:
      "Systems built to be understood rather than read about, plus published machine learning research with measured results.",
    tags: ["Backend Infrastructure", "Full-Stack Engineering", "Machine Learning", "Applied Research"],
    work: ["Employee Wellness Platform", "Lightning Forecasting System"],
    cta: { label: "Read the case notes", href: "/projects" },
  },
];

/**
 * Drives the identity panel on the About page. Deliberately phrased to show how
 * the three areas feed each other rather than listing them side by side.
 */
export const identityAreas = [
  {
    title: "Backend & Systems Engineering",
    detail: "APIs, data models, caching and distributed coordination.",
    focus: ["Python · Django", "PostgreSQL · MySQL", "Redis · Celery"],
    feeds: "Gives me the context to judge whether AI-generated code would survive production.",
  },
  {
    title: "AI Training & Technical Evaluation",
    detail: "Structured assessment of correctness, reasoning and instruction-following.",
    focus: ["Code review", "Benchmarking", "Rubric design"],
    feeds: "Made me far more rigorous about verifying my own work before shipping it.",
  },
  {
    title: "Applied Projects & Research",
    detail: "Systems built to be understood, and research with measured results.",
    focus: ["Raft consensus", "AI infrastructure", "Machine learning"],
    feeds: "Where both of the above get tested against something real.",
  },
];

export const about = {
  intro: [
    "I'm Shubham Kumar, a software developer from Ranchi who works across backend engineering and AI evaluation. I finished my MCA at Birla Institute of Technology, Mesra in May 2026, after a BCA at Sarala Birla University.",
    "Most of my engineering time goes into the unglamorous half of software: the query that went from slow to fast, the cache layer that absorbed a traffic spike, the Celery pipeline that moved work out of the request cycle. I've shipped that kind of work in production on a Django REST Framework codebase, and built a full-stack wellness platform end to end for an organisation of real users.",
    "Alongside that I take on independent AI training and evaluation assignments — judging whether a model's answer is actually correct, whether its reasoning survives scrutiny, and whether it followed the instruction it was given. It is closer to code review than to data entry, and it has made me a noticeably more careful engineer.",
    "I also build systems specifically to understand them. My distributed key-value cache implements Raft leader election from the paper rather than importing a library, because reading about consensus and making three nodes actually agree are different skills.",
  ],
};

export const education = [
  {
    school: "Birla Institute of Technology, Mesra",
    degree: "Master of Computer Applications (MCA), Computer Science",
    period: "Aug 2024 — May 2026",
  },
  {
    school: "Sarala Birla University, Ranchi",
    degree: "Bachelor of Computer Applications (BCA), Computer Science",
    period: "Aug 2021 — May 2024",
  },
];

/**
 * Only the three confirmed by the resume PDF are listed.
 *
 * `~/OneDrive/Desktop/certificates` also contains Deloitte and Tata Forage
 * simulations, Salesforce AI Associate, a Reliance AI certificate, NISM/SEBI
 * certifications and an Oracle AI Vector certificate. Tell me which of those
 * you want shown and I'll add them.
 */
export const certifications = [
  "AWS Certified Cloud Practitioner",
  "Oracle Certified Foundations Associate",
  "Oracle AI Associate",
];

export const publication = {
  title:
    "Machine Learning based Lightning Forecasting System using Satellite and Ground-based Observations",
  note: "Research publication",
};

/**
 * Condensed stack for the home page. The full breakdown lives on /about, so
 * this stays at three groups and only the things worth leading with.
 */
export const coreStack = [
  {
    group: "Backend",
    items: ["Python", "Django", "Django REST Framework", "Node.js", "REST APIs"],
  },
  {
    group: "Data & Infrastructure",
    items: ["PostgreSQL", "MySQL", "Redis", "Celery", "Docker", "AWS"],
  },
  {
    group: "Systems & AI Evaluation",
    items: ["Raft consensus", "Circuit breakers", "Technical benchmarking", "Code review"],
  },
];

/**
 * Full skill list for the About page. Every entry is used in the work described
 * on this site — the gateway, the distributed cache, the wellness platform, the
 * forecasting research or the internships. Nothing aspirational.
 */
export const skills = [
  {
    group: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "C"],
  },
  {
    group: "Backend & APIs",
    items: ["Django", "Django REST Framework", "Node.js", "Express.js", "REST API design"],
  },
  {
    group: "Distributed Systems",
    items: [
      "Raft consensus",
      "Circuit breakers",
      "Failover & retries",
      "Rate limiting",
      "Concurrency",
    ],
  },
  {
    group: "Data & Caching",
    items: ["PostgreSQL", "MySQL", "Redis", "pgvector", "Elasticsearch", "Celery"],
  },
  {
    group: "Infrastructure & Observability",
    items: ["Docker", "AWS", "Git", "Prometheus", "Grafana", "pytest"],
  },
  {
    group: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    group: "AI Evaluation & ML",
    items: [
      "Technical benchmarking",
      "Code review",
      "Rubric design",
      "scikit-learn",
      "Pandas",
      "Random Forest",
    ],
  },
];
