# Shubham Kumar — Personal Portfolio

A modern, responsive personal portfolio showcasing my work across **Software Engineering, Backend Development, AI Training & Evaluation, Technical Benchmarking, and Applied Research**.

Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion, the portfolio focuses on performance, accessibility, clean architecture, and a polished user experience.

**Live Website:** [https://shubhamkumar.site](https://shubhamkumar.site)

---

## Overview

This portfolio brings together my software engineering experience, independent AI evaluation work, technical projects, and research contributions.

It highlights three primary areas:

- **Backend Engineering & Distributed Systems** — Backend architecture, REST APIs, caching, asynchronous processing, database optimization, and distributed systems.
- **AI Training & Evaluation** — AI-generated response evaluation, programming assessments, technical benchmarking, reasoning quality, and instruction-following.
- **Engineering Projects & Applied Research** — Independent software systems, full-stack applications, machine learning, and technical experimentation.

The website is designed to serve as a central professional profile for software engineering opportunities, AI evaluation projects, freelance collaborations, and technical fellowships.

## Technology Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Deployment | Vercel |
| Version Control | Git & GitHub |

## Features

- Responsive layouts for desktop, tablet, and mobile.
- Dark-themed interface with ambient blue and violet visual accents.
- Interactive hero section with a canvas-based node visualization.
- Smooth scroll-reveal animations.
- Dynamic typing animation for professional roles.
- Dedicated About, Experience, Projects, and Contact pages.
- Reusable project and experience components.
- SEO metadata, canonical URLs, Open Graph, and Twitter metadata.
- Automatically generated sitemap and robots.txt.
- JSON-LD structured data.
- Downloadable resume support, configurable through a centralized content flag.
- Accessibility improvements, including semantic HTML, image alt attributes, and reduced-motion support.
- Production security headers.

## Project Structure

```text
personal-portfolio-website/
│
├── public/
│   ├── projects/
│   ├── resume.pdf
│   └── ...
│
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── experience/
│   │   ├── projects/
│   │   ├── contact/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── opengraph-image.tsx
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── icon.svg
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── visuals/
│   │   │   └── HeroField.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ExperienceCard.tsx
│   │   ├── TiltCard.tsx
│   │   ├── Reveal.tsx
│   │   └── TypingText.tsx
│   │
│   └── data/
│       ├── site.ts
│       ├── experience.ts
│       └── projects.ts
│
├── .gitignore
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or later.
- npm.
- Git.

The project has been built and tested using Node.js 22.

### 1. Clone the repository

```bash
git clone https://github.com/shubham0745/shubhamkumar-portfolio.git
```

### 2. Navigate to the project directory

```bash
cd shubhamkumar-portfolio
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
```

### 6. Run the production server locally

```bash
npm start
```

## Content Management

The portfolio follows a centralized content-management approach. Most website content can be updated through the files inside `src/data/` without modifying the page components.

| File | Responsibility |
|---|---|
| `src/data/site.ts` | Personal information, professional roles, email, social links, SEO URL, About content, skills, education, certifications, and publication details. |
| `src/data/experience.ts` | Professional experience, organizations, roles, dates, locations, descriptions, and technology stacks. |
| `src/data/projects.ts` | Project descriptions, technology stacks, featured status, and external links. |

### Updating Projects

Project information is maintained in:

```text
src/data/projects.ts
```

Each project supports configurable information such as:

- Project title and description.
- Technology stack.
- Featured status.
- GitHub repository.
- Live demonstration.
- Research paper.
- Project image.

Setting `featured: true` allows a project to appear in the homepage featured-project section.

Project screenshots can be placed inside:

```text
public/projects/
```

Reference them using their public paths in the project data.

### Updating Experience

Modify:

```text
src/data/experience.ts
```

This file controls the experience timeline and associated descriptions, including roles, organizations, employment periods, and technologies.

### Updating Personal Information

Modify:

```text
src/data/site.ts
```

This includes the website's personal information, professional identity, social profiles, SEO configuration, education, skills, and other profile details.

### Resume Configuration

The resume file is served from:

```text
public/resume.pdf
```

Resume availability is controlled through the `resumeReady` property in:

```text
src/data/site.ts
```

Replace the PDF with an accurate, updated version before enabling the download functionality.

## Performance Engineering

Performance and rendering efficiency are important considerations in this project.

The original visual implementation used Three.js with React Three Fiber. It was replaced with a lightweight 2D canvas implementation to reduce JavaScript bundle overhead and avoid unnecessary WebGL rendering.

The current `HeroField.tsx` implementation uses several optimizations:

- Device pixel ratio capped at 1.5.
- Animation runs only while the canvas is visible.
- `IntersectionObserver` pauses off-screen rendering.
- `visibilitychange` pauses animation when the browser tab is hidden.
- Pre-rendered glow sprites avoid expensive repeated shadow rendering.
- Reduced-motion preferences disable continuous animation.

Additional performance decisions include:

- Avoiding large-radius blur filters on continuously animated backgrounds.
- Avoiding unnecessary backdrop-filter compositing on cards.
- Using opacity and transform animations instead of animated blur filters.
- Reusing shared components.
- Minimizing unnecessary client-side JavaScript.

The root layout configures Framer Motion's reduced-motion behavior through `MotionConfig`.

These choices help maintain a responsive interface while preserving the intended visual design.

## SEO & Metadata

The portfolio includes several search and social-sharing optimizations.

- Unique page titles and descriptions.
- Canonical URLs.
- Open Graph metadata.
- Twitter metadata.
- JSON-LD structured data.
- Automatically generated sitemap.
- Robots.txt configuration.
- Custom Open Graph image.
- Favicon and application metadata.

The canonical website URL is configured centrally in:

```text
src/data/site.ts
```

The sitemap and robots configuration derive their domain from this value.

**Production domain:**

[https://shubhamkumar.site](https://shubhamkumar.site)

## Security

The project is primarily a frontend portfolio without a dedicated application backend.

It currently does not implement:

- Database connections.
- User authentication.
- API routes.
- Middleware.
- Server actions.
- File uploads.
- Cookie-based application sessions.
- Local storage.
- Environment-dependent application secrets.

The Next.js configuration includes the following security-related settings:

| Header / Setting | Purpose |
|---|---|
| `X-Frame-Options: DENY` | Prevents the website from being embedded in frames. |
| `X-Content-Type-Options: nosniff` | Prevents MIME-type sniffing. |
| `Referrer-Policy` | Controls referrer information sent to other websites. |
| `Permissions-Policy` | Restricts access to selected browser features. |
| `Strict-Transport-Security` | Enforces HTTPS for supported browsers. |
| `poweredByHeader: false` | Removes the default Next.js powered-by header. |
| `productionBrowserSourceMaps: false` | Disables production browser source-map generation. |

These settings are configured in:

```text
next.config.mjs
```

### Security Considerations

A Content Security Policy (CSP) is not currently configured.

A stricter CSP can be introduced using nonce-based script authorization, but it should be tested carefully with the Next.js App Router and its rendering and caching behavior.

Dependency advisories should also be reviewed periodically using:

```bash
npm audit
```

Framework and dependency upgrades should be tested against the existing application before being deployed.

## Deployment

The portfolio is designed to be deployed on [Vercel](https://vercel.com/), which provides native support for Next.js applications.

### Deploy using GitHub and Vercel

1. Push the latest source code to GitHub.
2. Sign in to [Vercel](https://vercel.com/).
3. Select **Add New → Project**.
4. Import the portfolio GitHub repository.
5. Allow Vercel to detect the Next.js framework.
6. Review the build configuration.
7. Deploy the project.

The standard Next.js build configuration is automatically detected by Vercel.

No environment variables are currently required by the application.

Official deployment documentation:

[Next.js Deployment Guide](https://nextjs.org/docs/app/getting-started/deploying)

### Custom Domain Configuration

The portfolio uses:

**[shubhamkumar.site](https://shubhamkumar.site)**

The domain is registered with GoDaddy, while the application is hosted on Vercel.

To connect the domain:

1. Deploy the project to Vercel.
2. Open the Vercel project dashboard.
3. Navigate to **Settings → Domains**.
4. Add `shubhamkumar.site`.
5. Add `www.shubhamkumar.site` if you want both versions supported.
6. Configure the DNS records displayed by Vercel in GoDaddy's DNS management panel.
7. Wait for DNS verification and SSL certificate provisioning.

Common Vercel DNS records include:

| Type | Host | Example value |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns-0.com` |

**Important:** These are general-purpose examples. Always use the exact DNS values displayed in your Vercel project because project-specific records may differ.

If conflicting records already exist, review them before making changes. Preserve unrelated DNS records, especially email-related MX and TXT records.

Vercel automatically provisions SSL certificates after successful domain verification.

Official documentation:

- [Vercel Custom Domains](https://vercel.com/docs/domains/set-up-custom-domain)
- [Vercel DNS Configuration](https://vercel.com/docs/domains/working-with-dns)

## Quality Assurance

The project has undergone production-readiness checks covering:

- ESLint validation.
- TypeScript type checking.
- Next.js production build.
- Route availability.
- Canonical URL configuration.
- Unique page metadata.
- Open Graph and Twitter metadata.
- JSON-LD validation.
- Sitemap and robots.txt validation.
- Security header configuration.
- Accessibility attributes.
- Internal navigation links.
- External link validation.

The recorded verification run passed 69 assertions.

Run the following commands when making changes:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Always verify the production build before deploying changes.

## Future Improvements

Potential improvements for future iterations include:

- A carefully configured Content Security Policy.
- Framework and dependency upgrades with compatibility testing.
- Additional project case studies and architecture documentation.
- Updated project screenshots and demonstrations.
- Expanded technical writing and research documentation.
- Performance monitoring and Core Web Vitals analysis.

## License

This repository is primarily a personal portfolio project.

Unless otherwise specified, the design, personal content, and project-specific materials are intended for showcasing my work. Please contact me before reusing substantial portions of the website or its personal content.

---

## Connect

**Shubham Kumar**

Software Engineering · AI Training & Evaluation · Technical Benchmarking · Applied Research

- Portfolio: [shubhamkumar.site](https://shubhamkumar.site)
- GitHub: [github.com/shubham0745](https://github.com/shubham0745)
- LinkedIn: [LinkedIn Profile](https://www.linkedin.com/)

For professional opportunities, technical collaborations, freelance projects, and research discussions, feel free to connect.

---

<p align="center">
  Built with Next.js, TypeScript, and a focus on thoughtful engineering.
</p>