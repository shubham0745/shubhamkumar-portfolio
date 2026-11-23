export type Guide = {
  slug: string;
  title: string;
  summary: string;
  readingTime: string;
  /** Markdown-lite blocks: "## " renders a heading, "- " a bullet, anything else a paragraph. */
  body: string[];
};

export const guides: Guide[] = [
  {
    slug: "dsa-roadmap-for-placements",
    title: "A DSA roadmap that actually fits around college",
    summary:
      "What to learn, in what order, and how much is genuinely enough for product and service company interviews.",
    readingTime: "6 min read",
    body: [
      "Most DSA roadmaps are written as if you have eight free hours a day. You don't. This is the order I would follow if I were starting again with a normal college schedule.",
      "## Start with the four that show up everywhere",
      "Arrays, strings, hashing and two pointers cover a startling share of first-round questions. Get genuinely comfortable here before you touch anything exotic — being fast and correct on an easy array problem beats half-remembering segment trees.",
      "## Then the structural topics",
      "- Recursion and backtracking — the mental model everything else builds on",
      "- Linked lists, stacks and queues — cheap to learn, common in interviews",
      "- Binary search, including binary search on the answer",
      "- Trees and BSTs, then graphs (BFS, DFS, topological sort)",
      "- Dynamic programming last, once recursion feels automatic",
      "## How much is enough",
      "Roughly 250–350 well-chosen problems, revisited, beats 900 solved once. Keep a list of every problem you failed to solve unaided and come back to it a week later. If you can't re-solve it, you never learned it.",
      "## Practice like the interview",
      "Timed, no editor autocomplete, explaining your approach out loud before you write code. The gap between people who can solve problems and people who pass interviews is almost entirely this.",
    ],
  },
  {
    slug: "backend-developer-roadmap",
    title: "Backend roadmap: what I'd learn, in order",
    summary:
      "From one language to production systems — the path that made the most difference for me.",
    readingTime: "7 min read",
    body: [
      "Backend is a big word. Here's a path that gets you employable without wandering.",
      "## One language, properly",
      "Pick Python or Java and go deep. Deep means you understand how it handles memory, concurrency and errors — not just the syntax. Breadth across five languages impresses nobody in an interview.",
      "## Then a framework, then the database",
      "Django or Spring Boot. Build something that does real CRUD with authentication. Then stop and learn SQL properly: joins, indexes, EXPLAIN plans, transactions and isolation levels. Most backend performance work turns out to be database work.",
      "## The layer that separates juniors from the rest",
      "- Caching — what to cache, where, and how to invalidate it",
      "- Async work — queues and workers such as Celery",
      "- Search — when a LIKE query stops being enough and you reach for Elasticsearch",
      "- Observability — logs, metrics, and being able to answer why something was slow",
      "## Ship one thing real people use",
      "A project with real users teaches you more than five tutorial projects. Deployment, uptime, bad input, unexpected load — none of that shows up on localhost.",
    ],
  },
  {
    slug: "preparing-for-sde-interviews",
    title: "How to prepare for SDE interviews",
    summary: "The four things every loop tests, and how to prepare for each without burning out.",
    readingTime: "5 min read",
    body: [
      "Nearly every SDE loop tests four things. Prepare for them separately.",
      "## 1. Data structures and algorithms",
      "Covered in the DSA roadmap. Consistency beats intensity — an hour a day for six months outperforms three frantic weeks.",
      "## 2. Core CS fundamentals",
      "DBMS, operating systems, computer networks and OOP. Service companies weight these heavily and they're cheap marks: a weekend of revision per subject gets you most of the way.",
      "## 3. Your own projects",
      "You will be asked to defend every line of your resume. For each project be ready to answer why you chose that design, what broke, and what you'd change now. Vague answers here undo a good DSA round.",
      "## 4. Behavioural",
      "Have three stories ready — a conflict, a failure, and something you shipped under pressure. Concrete beats polished.",
      "## A note on timing",
      "Start applying before you feel ready. The first few interviews are practice whether you plan them that way or not.",
    ],
  },
  {
    slug: "writing-a-resume-that-gets-shortlisted",
    title: "Writing a resume that gets shortlisted",
    summary: "One page, evidence over adjectives, and the bullet formula that works.",
    readingTime: "4 min read",
    body: [
      "A resume gets about fifteen seconds on the first pass. Optimise for that.",
      "## One page, always",
      "If you're a student or have under three years of experience, keep it to one page. Cutting forces you to keep only what is strong.",
      "## The bullet formula",
      "Action, then what you built, then a measurable result. “Reduced API response times by optimizing MySQL queries and adding Redis caching” beats “Worked on backend performance.” If you don't have a number, describe the scale — users, records, requests per day.",
      "## What to cut",
      "- Skill bars and percentage ratings, which mean nothing",
      "- Marks from before your current degree, usually",
      "- Hardworking, quick learner, team player",
      "- Any technology you'd panic about in an interview",
      "## Format",
      "Plain, single column, PDF, readable by a parser. Creative layouts get mangled by applicant tracking systems.",
    ],
  },
  {
    slug: "off-campus-job-hunting",
    title: "Off-campus job hunting without a referral network",
    summary: "Where the openings actually are, and how to get seen when you're applying cold.",
    readingTime: "5 min read",
    body: [
      "Off-campus is a numbers game with a skill component. Both halves matter.",
      "## Where to look",
      "Company career pages directly, LinkedIn filtered to the last 24 hours, and startup job boards. Postings that are days old already have hundreds of applicants, so speed is a genuine edge.",
      "## Cold outreach that works",
      "Find an engineer on the team, not a recruiter. Keep it short: who you are, one specific thing about their product or stack, one line on why you'd fit, resume attached. No paragraphs of flattery. A ten percent reply rate is a good day, and one reply can be the job.",
      "## Build a visible footprint",
      "A GitHub with real commits, a portfolio site, and writing about what you build. It shifts the conversation from convince me to tell me more.",
      "## Track everything",
      "A simple sheet: company, role, date applied, contact, status. Without it you'll lose track by week three and start re-applying to the same companies.",
    ],
  },
  {
    slug: "mca-placement-preparation",
    title: "MCA placement preparation, term by term",
    summary: "How to use two years so the final semester isn't a panic.",
    readingTime: "5 min read",
    body: [
      "MCA gives you two years. Spent well, that's more than enough.",
      "## Year 1, first term",
      "Fundamentals. One language properly, DSA basics, SQL. Don't chase frameworks yet.",
      "## Year 1, second term",
      "Start building. One substantial project with a real database and a real deployment. Begin applying for summer internships early — most close sooner than students expect.",
      "## The summer internship",
      "Take it seriously even if the stipend is small. Production experience is the single biggest differentiator on an MCA resume, and internships convert to full-time offers far more often than cold applications do.",
      "## Year 2, first term",
      "Interview mode. DSA revision, core CS subjects, a polished resume, applications going out weekly. On-campus and off-campus in parallel — never rely on just one.",
      "## Year 2, second term",
      "Convert offers, finish your project work, and keep learning something that isn't for an exam. The habit matters more than the syllabus.",
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
