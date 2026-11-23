# Shubham Kumar — Portfolio

Personal site built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion**.

Dark navy shell, blue/violet ambient glow, a canvas node field behind the hero, scroll reveals, fully responsive.

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

Your resume is served from `public/resume.pdf`. Replace that file to update the download link.

### Things to fill in before you go live

1. **`src/data/site.ts` → `socials.github`** and **`socials.twitter`** — both blank. The old GitHub placeholder (`github.com/shubhamkumar`) turned out to be an unrelated account with no repositories, so it was cleared rather than left linked. Any social set to `""` is skipped everywhere, so the GitHub and X icons are currently absent from the nav, footer and contact page; they reappear the moment you paste a URL in.
2. **`src/data/site.ts` → `url`** — still the placeholder `https://shubhamkumar.dev`. Set this to your real domain: it feeds the Open Graph tags, `metadataBase`, `sitemap.xml` and `robots.txt`.
3. **`src/data/projects.ts`** — holds only the two real projects. The two placeholder entries that shipped with filler copy have been removed, so add real projects in their place. Setting `stub: true` on an entry still renders a small orange **DRAFT** badge if you want to park a work-in-progress.
4. **Project links** — each project has a `links: { demo, github, paper }` object. Fill them in and the card grows Live / Code / Paper links automatically.
5. **Project screenshots** (optional) — drop images in `public/projects/` and set `image: "/projects/name.png"` on a project to replace the generated gradient panel.

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
│   ├── opengraph-image.tsx   # Social preview card, rendered via next/og
│   ├── sitemap.ts            # Built from `nav`
│   ├── robots.ts             # Allows all, points at sitemap.xml
│   ├── not-found.tsx         # 404
│   ├── error.tsx             # Runtime error boundary with a retry button
│   ├── icon.svg              # Favicon
│   └── globals.css           # Tokens, card/glow utilities, reduced-motion rules
├── components/
│   ├── visuals/
│   │   ├── HeroField.tsx     # Home: canvas node field with orbit rings
│   │   └── StackDiagram.tsx  # About: request path through the backend tiers
│   ├── Hero.tsx  Navbar.tsx  Footer.tsx  ProjectCard.tsx  ExperienceCard.tsx
│   ├── TiltCard.tsx          # 3D cursor tilt + spotlight
│   ├── Reveal.tsx            # Scroll-reveal primitives
│   └── TypingText.tsx        # Hero typing effect
└── data/                     # ← all content
```

`sitemap.ts` and `robots.ts` both derive their URLs from `site.url`, so they are only correct once step 2 above is done.

### Notes on performance

This site used to render its hero and about visuals with `three.js` via React Three Fiber. That was removed: it was ~45% of the modules on the home route, kept a WebGL context running every frame, and was throwing `R3F: Hooks can only be used within the Canvas component!` at runtime. `HeroField.tsx` reproduces the same look on a 2D canvas in a couple of kilobytes.

If you extend the visuals, keep the four guards that make `HeroField` cheap:

- device pixel ratio capped at 1.5
- the `requestAnimationFrame` loop only runs while the canvas is on screen (`IntersectionObserver`) and the tab is visible (`visibilitychange`)
- glow comes from blitting a pre-rendered sprite, never `shadowBlur`
- `prefers-reduced-motion` paints one static frame and stops

Three other things were deliberately removed for the same reason, so please don't add them back without measuring:

- **large-radius `blur()` on big elements.** The ambient background used four ~40rem divs with `blur-3xl`, two of them opacity-animating forever. A radial gradient is already soft, so the blur cost most of the scroll smoothness and bought nothing.
- **`backdrop-blur` on cards.** It promotes every card to its own compositing layer. The card panel is simply more opaque now.
- **animating `filter: blur()` in scroll reveals.** `Reveal` animates opacity and transform only.

Framer's `MotionConfig reducedMotion="user"` is set in the root layout: anyone with "reduce motion" enabled gets content faded in without transform animation, and the CSS in `globals.css` stills the looping ambient animations.

### Notes on security

There is no backend here: no API routes, no middleware, no server actions, no database, no auth, no forms, no file uploads, no cookies, no `localStorage`, and no environment variables. Most of the usual web vulnerability classes are absent by construction rather than defended against.

What is actually configured, in `next.config.mjs`:

- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` and `Strict-Transport-Security`
- `poweredByHeader: false` to drop the Next version disclosure
- `productionBrowserSourceMaps: false` so original sources are never shipped

**Follow-up worth doing:** there is no `Content-Security-Policy`. A useful one needs per-request nonces in `middleware.ts`, because the App Router injects inline hydration scripts; a CSP with `'unsafe-inline'` would look reassuring while blocking very little.

**Known advisories:** `npm audit` reports issues against the `postcss` copy bundled inside `next` itself. They are build-time CSS tooling issues that require attacker-controlled CSS, and all CSS here is yours. The only fix is upgrading to `next@16`, a breaking major — worth scheduling, not worth rushing.

> One gotcha if you extend `Reveal.tsx`: don't swap a `motion.div` for a plain `div` based on `useReducedMotion()`. The hook returns `false` during SSR, so the element type differs between server and client, hydration fails, and the content stays stuck at `opacity: 0`.
