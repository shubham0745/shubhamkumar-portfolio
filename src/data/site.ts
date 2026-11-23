export const site = {
  name: "Shubham Kumar",
  // Rotating phrases for the hero typing effect
  roles: [
    "Backend Developer",
    "Python & Django Engineer",
    "Associate Software Engineer @ Accenture",
    "AWS Certified Cloud Practitioner",
  ],
  tagline: "Building scalable APIs and data-driven systems",
  location: "Ranchi, Jharkhand, India",
  email: "shubhamkqr7430@gmail.com",
  phone: "+91 91994 70482",
  resumeUrl: "/resume.pdf",
  // TODO: replace with your real GitHub / X handles
  socials: {
    github: "https://github.com/shubhamkumar",
    linkedin: "https://www.linkedin.com/in/shubham-kumar-351000334",
    twitter: "https://x.com/",
  },
  // Used for SEO + Open Graph. Update after you point your domain at Vercel.
  url: "https://shubhamkumar.dev",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Student Guide", href: "/student-guide" },
  { label: "Contact", href: "/contact" },
];

export const about = {
  intro: [
    "Hi, I'm Shubham Kumar — a backend developer from Ranchi, Jharkhand, currently an Associate Software Engineer at Accenture.",
    "I like the unglamorous half of software: the query that went from 900ms to 40ms, the Celery pipeline that moved work out of the request cycle, the cache layer that quietly absorbed a traffic spike. Most of my production work lives in Python, Django and MySQL, with Redis, Celery and Elasticsearch doing the heavy lifting around them.",
    "I finished my MCA at BIT Mesra in May 2026 and I'm looking for backend and systems engineering work where the problems are real and the scale is honest.",
  ],
  highlights: [
    "Shipped production API features at Careers360 on a Django REST Framework codebase",
    "Cut API response times with MySQL query tuning and multi-layer Redis caching",
    "Built async task pipelines with Celery for scheduled and long-running jobs",
    "Built and deployed a full-stack wellness platform used by 100+ staff at Tata Steel Foundation",
    "Published research on a Machine Learning based Lightning Forecasting System",
    "AWS Certified Cloud Practitioner · Oracle Certified Foundations Associate · Oracle AI Associate",
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

export const skills = [
  { group: "Languages", items: ["Python", "Java", "JavaScript", "SQL", "C"] },
  {
    group: "Frameworks",
    items: ["Django", "Django REST Framework", "Node.js", "Express.js", "React.js"],
  },
  { group: "Databases", items: ["MySQL", "PostgreSQL", "Redis"] },
  {
    group: "Infrastructure",
    items: ["AWS", "Celery", "Elasticsearch", "Docker", "Git"],
  },
  {
    group: "Practices",
    items: ["REST API design", "Query optimization", "Caching", "Async pipelines"],
  },
];
