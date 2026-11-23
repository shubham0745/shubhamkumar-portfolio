export type ExperienceKind = "freelance" | "internship" | "training";

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  kind: ExperienceKind;
  /** One line of context above the bullets, where the engagement type matters. */
  note?: string;
  points: string[];
  stack: string[];
};

/**
 * Ordered to lead with current work rather than strictly by date.
 *
 * Every entry below is traceable to a source document: the Careers360 and Tata
 * Steel Foundation entries to the resume PDF, Chegg to its two engagement
 * certificates, Ardent to certificate ARDENT/69852.
 */
export const experience: Experience[] = [
  {
    company: "Independent / Freelance",
    role: "AI Trainer & Evaluator",
    period: "Oct 2024 — Present",
    location: "Remote",
    kind: "freelance",
    note: "Project-based assignments rather than employment with a single organisation.",
    points: [
      "Evaluate AI-generated responses for correctness, relevance and whether they actually answer the question asked.",
      "Assess programming solutions and technical explanations, including whether the reasoning behind an answer holds up.",
      "Review logical reasoning and problem-solving output, flagging confident answers that are wrong.",
      "Contribute to AI training and evaluation workflows against task-specific rubrics.",
      "Write and validate coding tasks and technical problem-solving exercises where an assignment calls for it.",
      "Judge instruction-following and response quality against defined criteria rather than general impressions.",
    ],
    stack: [
      "AI Response Evaluation",
      "Programming Evaluation",
      "Technical Reasoning",
      "Data Quality Assessment",
    ],
  },
  {
    company: "Careers360",
    role: "Backend Developer Intern",
    period: "Jan 2026 — Jun 2026",
    location: "Gurugram, India",
    kind: "internship",
    points: [
      "Developed and maintained backend services using Python and Django REST Framework.",
      "Built and enhanced REST APIs powering production applications.",
      "Optimized MySQL queries and implemented Redis-based caching to reduce API response times.",
      "Worked with Celery to move scheduled and long-running jobs out of the request-response cycle.",
      "Implemented search and indexing functionality using Elasticsearch.",
      "Collaborated with frontend, product and QA teams to debug and resolve production issues.",
    ],
    stack: ["Python", "Django REST Framework", "MySQL", "Redis", "Celery", "Elasticsearch"],
  },
  {
    company: "Tata Steel Foundation",
    role: "Software Developer Intern",
    period: "May 2025 — Jul 2025",
    location: "Jamshedpur, India",
    kind: "internship",
    points: [
      "Developed an Employee Wellness Application on the PERN stack, deployed to 100+ internal staff.",
      "Designed the database architecture and the REST APIs behind assessments and wellness tracking.",
      "Implemented clinical GAD-7 and PHQ-9 assessments with automated scoring and historical trend visualization.",
      "Built an administrative analytics dashboard giving stakeholders organisation-wide visibility.",
      "Developed engagement features including mood and hydration tracking and downloadable wellness reports.",
    ],
    stack: ["PostgreSQL", "Express.js", "React.js", "Node.js"],
  },
  {
    company: "Chegg",
    role: "Technical Problem-Solving & Computer Science Contributor",
    period: "Mar 2022 — Mar 2024",
    location: "Remote",
    kind: "freelance",
    note: "Freelance / subject matter contribution.",
    points: [
      "Solved 2,000+ technical questions involving programming, computer science fundamentals, algorithms and problem-solving.",
      "Developed structured, step-by-step solutions with emphasis on logical correctness, technical accuracy and clarity.",
      "Analyzed programming problems, evaluated solution approaches and explained complex technical concepts in an understandable manner.",
      "Worked across programming and computer science topics, translating theoretical concepts into practical solutions.",
      "Strengthened skills in technical reasoning, solution validation, code analysis and structured technical communication.",
    ],
    stack: [
      "Algorithms",
      "Data Structures",
      "Problem Solving",
      "Code Analysis",
      "Technical Communication",
    ],
  },
  {
    company: "Ardent Computech",
    role: "Software Development Intern",
    period: "Jun 2023 — Jul 2023",
    location: "Remote",
    kind: "training",
    note: "Remote internship — web development using PHP and MySQL.",
    points: [
      "Built a movie website with PHP and MySQL as the project component of the internship.",
      "Implemented database-driven functionality including listings and record management.",
      "Worked across frontend and backend integration on a single codebase.",
    ],
    stack: ["PHP", "MySQL", "HTML", "CSS"],
  },
];
