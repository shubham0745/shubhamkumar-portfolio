export type Project = {
  slug: string;
  title: string;
  blurb: string;
  /** What problem the project exists to solve. */
  problem: string;
  description: string;
  /** Specific engineering work, not responsibilities. */
  contributions: string[];
  /** Measured outcomes only — present when the project actually benchmarks itself. */
  results?: string[];
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
    slug: "llm-gateway",
    title: "LLM Gateway",
    blurb:
      "Self-hosted, OpenAI-compatible gateway in front of OpenAI, Anthropic and a local Ollama model, with provider failover, per-tenant budgets, caching and cost accounting.",
    problem:
      "Calling a model provider directly means your application inherits every outage, rate limit and price change it has. I wanted one place that owns those failure modes — so that a provider returning 503 is the gateway's problem, not the client's.",
    description:
      "A gateway that speaks the OpenAI API, so any OpenAI SDK can point at it by changing base_url alone. Each request is authenticated against a hashed API key, checked against the tenant's requests/min, tokens/min and monthly budget, looked up in the cache, then routed along a configured fallback chain: retry once with jitter, fail over on 5xx, 429 or timeout, and skip providers whose circuit breaker is open. Streams are held until the first token, because failover is free before it and impossible after it. Cost is computed from each provider's reported usage, and every request is logged asynchronously through a Redis stream into Postgres, with Prometheus and Grafana on top. Everything, including a fault-injecting mock provider, runs locally under Docker Compose.",
    contributions: [
      "Built the OpenAI-compatible API surface and per-provider adapters, translating at the edge rather than depending on LiteLLM or LangChain — the failure handling was the point, so it is written against raw HTTP.",
      "Implemented the router: configured fallback chains, retry with jitter, and circuit breakers that open in ~0.4s and recover within one cooldown.",
      "Held streams until the first token so pre-token failures stay invisible to the client, and emitted an explicit error event rather than a silent truncation when a provider dies mid-stream.",
      "Put rate limits, budgets and breaker state in Redis via Lua so they are shared across every worker process and host.",
      "Designed budget handling to reserve the worst case and settle to real usage, so a burst of concurrent requests cannot overspend a tenant's budget.",
      "Added exact and semantic response caching on Postgres with pgvector, then measured the semantic threshold against 20k Quora question pairs and shipped it off by default — it added 0.4 points of hit rate while making every miss ~55ms slower.",
      "Versioned configuration in Postgres with hot reload and one-call rollback, plus an admin API for tenants, keys, spend, breakers and per-request attempt history.",
      "Wrote the benchmark suite that produces the numbers: latency overhead, a scripted chaos run with six injected failures, cache accuracy and cost replay.",
      "Covered the system with 82 tests running the real gateway and mock provider in-process, with CI running lint, tests and a Docker build on every push.",
    ],
    /**
     * These are the project's own measured results, from its benchmarks on a
     * single 4-vCPU VM running every component. Methodology and caveats are in
     * the repo's docs/benchmarks.md — they are not estimates.
     */
    results: [
      "+15ms p50 added latency at 10 concurrent streams, +37ms at 100",
      "0 failed requests across 2,559 requests during a scripted provider outage",
      "53.2% of spend saved by exact caching on an FAQ-style workload",
      "~100–140 new streams/s on two worker processes",
    ],
    stack: [
      "Python",
      "Docker Compose",
      "Redis",
      "PostgreSQL",
      "pgvector",
      "Prometheus",
      "Grafana",
      "Ollama",
      "pytest",
    ],
    year: "2026",
    featured: true,
    links: { github: "https://github.com/shubham0745/LLM-Gateway" },
  },
  {
    slug: "distributed-key-value-cache",
    title: "Distributed Key-Value Cache",
    blurb:
      "A multi-user key-value cache server written from primitives: pluggable eviction, write-through MySQL persistence and Raft leader election over raw sockets.",
    problem:
      "Reading about distributed consensus and actually getting three processes to agree on who leads are different skills. I wanted a cache I had built from the socket up — no web framework, no Raft library — so that every part of it was something I could explain.",
    description:
      "A TCP cache server in Python that handles authenticated, per-user key-value storage and coordinates a cluster using Raft. Clients connect over a plain socket, authenticate, then issue SET, GET, HAS and DELETE. Every cache lives behind an abstract interface, so a dict-backed store and a capacity-bounded LRU are interchangeable through a factory. Writes go to memory and MySQL together, and the whole dataset is reloaded into memory on boot. A separate Raft engine runs its own socket RPC server alongside the cache, holding elections and exchanging heartbeats so the cluster converges on a single leader.",
    contributions: [
      "Defined an ICache abstract interface with dict-backed and LRU implementations, selected at runtime through a factory, so the server never depends on a concrete cache.",
      "Made the cache thread-safe with a reentrant lock, and gave the TCP server a thread per client connection.",
      "Isolated every user behind their own namespaced store, so two users can hold the same key without collision.",
      "Implemented write-through persistence on Django's ORM across two MySQL tables, with a uniqueness constraint on (user, key) and a full reload into memory at startup.",
      "Hashed credentials with PBKDF2 via Django's password hashers; plain passwords are never stored or logged.",
      "Implemented Raft leader election from the paper: follower/candidate/leader states, randomised 1.5–3s election timeouts to avoid split votes, RequestVote and AppendEntries RPCs over a dedicated socket server, 500ms heartbeats, and immediate step-down on seeing a higher term.",
      "Covered the system with 105 pytest tests across the cache, persistence, server and Raft layers.",
    ],
    stack: ["Python", "Raft Consensus", "TCP Sockets", "Threading", "MySQL", "Django ORM", "pytest"],
    year: "2026",
    featured: true,
    links: { github: "https://github.com/shubham0745/Distributed-Key-Value-Cache" },
  },
  {
    slug: "employee-wellness",
    title: "Employee Wellness Platform",
    blurb:
      "Full-stack PERN wellness application built at Tata Steel Foundation and deployed to 100+ internal staff.",
    problem:
      "The organisation had no way to offer employees a private mental-health check-in, and no visibility into wellbeing trends across teams. Anything built had to be clinically credible and safe to roll out internally.",
    description:
      "A wellness platform built from the ground up on PostgreSQL, Express, React and Node. Employees take validated clinical assessments, track mood and hydration, and log wellness activity; scores are calculated automatically and plotted over time so a person can see their own trend. Administrators get a separate analytics view summarising wellbeing across the organisation without exposing individual responses. It went into real use with over 100 internal staff.",
    contributions: [
      "Designed the PostgreSQL schema and the REST API behind assessments, tracking and reporting.",
      "Implemented the GAD-7 and PHQ-9 instruments with automated score calculation and historical trend visualization.",
      "Built the administrative analytics dashboard for organisation-wide wellbeing trends.",
      "Developed the engagement features — mood and hydration tracking, guided breathing, gratitude journaling and downloadable reports.",
      "Took the application through to deployment and real internal use by 100+ staff.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "PostgreSQL", "REST APIs"],
    year: "2025",
    featured: true,
    links: { github: "https://github.com/shubham0745/employee-wellness-app" },
  },
  {
    slug: "lightning-forecasting",
    title: "Lightning Forecasting System",
    blurb:
      "Machine learning system forecasting lightning activity by fusing satellite imagery with ground-based sensor readings. Published research.",
    problem:
      "Lightning is dangerous and hard to forecast at short range. Satellite and ground-based instruments each capture part of the picture, so the question was whether combining the two sources produces a usable forecast signal.",
    description:
      "A forecasting pipeline covering the full path from raw observations to an evaluated model: ingesting and cleaning multi-source observation data, engineering features from spatial and temporal signals, training a Random Forest classifier, and reporting forecast skill against held-out data. The work was written up and published as research.",
    contributions: [
      "Built the preprocessing pipeline that cleans and aligns satellite and ground-based observation data.",
      "Engineered features from the spatial and temporal structure of the observations.",
      "Trained and tuned a Random Forest classifier for lightning occurrence.",
      "Evaluated forecast skill on held-out data rather than training performance.",
      "Wrote up the methodology and results as a research publication.",
    ],
    stack: ["Python", "Machine Learning", "Random Forest", "scikit-learn", "Pandas", "NumPy"],
    year: "2025",
    links: { github: "https://github.com/shubham0745/Lightning-Forecasting-System" },
  },
];

/**
 * The home page shows these three. The forecasting research is intentionally
 * not among them — it still appears on /projects with full case notes.
 */
export const featuredProjects = projects.filter((p) => p.featured);
