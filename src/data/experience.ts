export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Accenture",
    role: "Associate Software Engineer",
    period: "Aug 2026 — Present",
    location: "Kolkata",
    points: [
      "Building and supporting backend services as part of an enterprise delivery team.",
      "Working across the development lifecycle — implementation, code review, testing and release support.",
    ],
    stack: ["Java", "Python", "SQL", "REST"],
  },
  {
    company: "Careers360",
    role: "SDE Intern",
    period: "Jan 2026 — Jun 2026",
    location: "Gurugram",
    points: [
      "Built and maintained backend services in Python and Django REST Framework, developing and enhancing APIs powering production applications.",
      "Reduced API response times by optimizing MySQL queries and implementing multi-layer caching with Redis and Django's caching framework.",
      "Designed asynchronous background task pipelines with Celery for scheduled jobs and long-running processes, offloading work from the request-response cycle.",
      "Implemented search and indexing features using Elasticsearch, improving data retrieval efficiency across the application.",
      "Collaborated with frontend, product and QA teams to debug and resolve production issues.",
    ],
    stack: ["Python", "Django REST Framework", "MySQL", "Redis", "Celery", "Elasticsearch"],
  },
  {
    company: "Tata Steel Foundation",
    role: "SDE Intern",
    period: "May 2025 — Jul 2025",
    location: "Jamshedpur",
    points: [
      "Built a full-stack Employee Wellness Application from the ground up and deployed it to 100+ internal staff members.",
      "Designed the database architecture and REST APIs powering assessments, mood tracking, hydration tracking and wellness activity logging.",
      "Implemented clinical GAD-7 and PHQ-9 assessments with automated scoring, result tracking and historical trend visualization.",
      "Built an admin analytics dashboard giving stakeholders visibility into organization-wide wellness trends.",
      "Developed engagement features — guided breathing, gratitude journaling, posture reminders and downloadable wellness reports.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "PostgreSQL"],
  },
];
