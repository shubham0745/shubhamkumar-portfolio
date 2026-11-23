export type Project = {
  slug: string;
  title: string;
  blurb: string;
  description: string;
  stack: string[];
  year: string;
  featured?: boolean;
  links?: { demo?: string; github?: string; paper?: string };
  /** Screenshot in /public/projects — falls back to a generated gradient when absent. */
  image?: string;
  /** Draft entries you still need to fill in or delete. */
  stub?: boolean;
};

export const projects: Project[] = [
  {
    slug: "lightning-forecasting",
    title: "Lightning Forecasting System",
    blurb:
      "Machine learning system that forecasts lightning activity from satellite and ground-based observations.",
    description:
      "A forecasting pipeline that fuses satellite imagery with ground-based sensor readings to predict lightning activity. Covers the full path — ingesting and cleaning multi-source observation data, engineering features from spatial and temporal signals, training and evaluating the classifier, and reporting on forecast skill. The work was written up as a research publication.",
    stack: ["Python", "Machine Learning", "Pandas", "NumPy", "scikit-learn"],
    year: "2025",
    featured: true,
    links: {},
  },
  {
    slug: "employee-wellness",
    title: "Employee Wellness Platform",
    blurb:
      "Full-stack wellness application built at Tata Steel Foundation and deployed to 100+ internal staff.",
    description:
      "Built from the ground up: database architecture, REST APIs and the React front end. Runs clinical GAD-7 and PHQ-9 assessments with automated scoring and historical trend visualization, tracks mood, hydration and wellness activity, and ships an admin analytics dashboard that gave stakeholders organization-wide visibility. Engagement features — guided breathing, gratitude journaling, posture reminders and downloadable reports — drove daily active usage.",
    stack: ["React.js", "Node.js", "Express.js", "PostgreSQL"],
    year: "2025",
    featured: true,
    links: {},
  },
  // Add new projects here. Set `featured: true` to also surface one on the home
  // page and in the "Case notes" section of /projects.
];

export const featuredProjects = projects.filter((p) => p.featured);
