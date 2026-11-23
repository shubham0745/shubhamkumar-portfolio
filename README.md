# Shubham Kumar — Portfolio

Personal site built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · React Three Fiber**.

Dark navy shell, blue/violet ambient glow, animated 3D scenes, scroll reveals, fully responsive.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Node 18+ required (built and tested on Node 22).

---

## Where the content lives

All copy sits in `src/data/` — you shouldn't need to touch components to update the site.

| File | Holds |
|---|---|
| `src/data/site.ts` | Name, roles for the typing effect, email, socials, resume path, SEO URL, About copy, skills, education, certifications, publication |
| `src/data/experience.ts` | Job cards (company, role, period, location, bullets, stack) |
| `src/data/projects.ts` | Project cards — `featured: true` also surfaces it on the home page |
| `src/data/guides.ts` | Student Guide articles |

Your resume is served from `public/resume.pdf`. Replace that file to update the download link.

### Things to fill in before you go live

1. **`src/data/site.ts` → `socials.github`** and **`socials.twitter`** — both blank. The old GitHub placeholder (`github.com/shubhamkumar`) turned out to be an unrelated account with no repositories, so it was cleared rather than left linked. Any social set to `""` is skipped everywhere, so the GitHub and X icons are currently absent from the nav, footer and contact page; they reappear the moment you paste a URL in.
2. **`src/data/site.ts` → `url`** — still the placeholder `https://shubhamkumar.dev`. Set this to your real domain: it feeds the Open Graph tags, `metadataBase`, `sitemap.xml` and `robots.txt`.
3. **`src/data/projects.ts`** — holds only the two real projects. The two placeholder entries that shipped with filler copy have been removed, so add real projects in their place. Setting `stub: true` on an entry still renders a small orange **DRAFT** badge if you want to park a work-in-progress.
4. **Project links** — each project has a `links: { demo, github, paper }` object. Fill them in and the card grows Live / Code / Paper links automatically.
5. **Project screenshots** (optional) — drop images in `public/projects/` and set `image: "/projects/name.png"` on a project to replace the generated gradient panel.

### Writing a new guide article

Append to the `guides` array in `src/data/guides.ts`. The `body` is an array of blocks:

- `"## Heading"` renders a section heading
- `"- Bullet text"` renders a bullet
- anything else renders as a paragraph

Routes are generated statically from the `slug`, so a new entry immediately gets `/student-guide/<slug>`.

---

## Deploying

### Vercel (recommended — it's the Next.js host)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset auto-detects as **Next.js**. No env vars needed. Click **Deploy**.

You get a `*.vercel.app` URL in about a minute.

### Pointing your domain at it

1. Buy the domain (Namecheap, GoDaddy, Cloudflare, Hostinger — any registrar).
2. In Vercel: **Project → Settings → Domains → Add**, enter your domain.
3. Vercel shows the DNS records to create at your registrar:
   - Apex domain (`yourname.com`) → an **A** record to `76.76.21.21`
   - `www` subdomain → a **CNAME** to `cname.vercel-dns.com`
4. Save at the registrar and wait for propagation (usually minutes, up to 48h).
5. HTTPS is issued automatically.

Then set `url` in `src/data/site.ts` to the live domain and redeploy so social previews use it.

---

## Structure

```
src/
├── app/                      # App Router pages — one folder per route
│   ├── layout.tsx            # Shell: fonts, metadata, nav, footer, MotionConfig
│   ├── page.tsx              # Home
│   ├── about/ experience/ projects/ contact/
│   ├── student-guide/        # list page + [slug] article pages
│   ├── opengraph-image.tsx   # Social preview card, generated at build via next/og
│   ├── sitemap.ts            # Built from `nav` + `guides`
│   ├── robots.ts             # Allows all, points at sitemap.xml
│   ├── not-found.tsx         # 404
│   ├── error.tsx             # Runtime error boundary with a retry button
│   ├── icon.svg              # Favicon
│   └── globals.css           # Tokens, card/glow utilities, reduced-motion rules
├── components/
│   ├── three/                # React Three Fiber scenes
│   │   ├── HeroScene.tsx     # Home: distorted core, orbit rings, star field
│   │   ├── DevScene.tsx      # About: layered stack with travelling packets
│   │   └── LazyScene.tsx     # Dynamic import wrapper (ssr: false)
│   ├── Hero.tsx  Navbar.tsx  Footer.tsx  ProjectCard.tsx  ExperienceCard.tsx
│   ├── TiltCard.tsx          # 3D cursor tilt + spotlight
│   ├── GuideCard.tsx         # Student Guide row + cursor-tracked spotlight
│   ├── Reveal.tsx            # Scroll-reveal primitives
│   └── TypingText.tsx        # Hero typing effect
└── data/                     # ← all content
```

`sitemap.ts` and `robots.ts` both derive their URLs from `site.url`, so they are only correct once step 2 above is done.

### Notes on the 3D

`three.js` is dynamically imported with `ssr: false`, so it stays out of the server bundle and off the critical path — the shared JS bundle is ~87 kB and WebGL streams in after. Scenes lower their particle count and pixel ratio on small screens.

Framer's `MotionConfig reducedMotion="user"` is set in the root layout: anyone with "reduce motion" enabled gets content faded in without transform animation, and the CSS in `globals.css` stills the looping ambient animations.

> One gotcha if you extend `Reveal.tsx`: don't swap a `motion.div` for a plain `div` based on `useReducedMotion()`. The hook returns `false` during SSR, so the element type differs between server and client, hydration fails, and the content stays stuck at `opacity: 0`.
