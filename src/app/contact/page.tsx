import type { Metadata } from "next";
import {
  ArrowUpRight,
  Download,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
} from "lucide-react";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} for software engineering roles, freelance backend work, AI training and evaluation projects, research collaborations and technical fellowships.`,
  alternates: { canonical: "/contact" },
};

/** Pulls "in/shubham-kumar-351000334" out of the full profile URL so the label
 *  shown on the card can never drift away from the link it points at. */
function linkedinHandle(url: string) {
  return url.match(/linkedin\.com\/(in\/[^/?#]+)/i)?.[1] ?? "LinkedIn profile";
}

/** Same idea for the handle-based profiles: derive the label from the URL. */
function handleFrom(url: string, host: RegExp, fallback: string) {
  const user = url.match(host)?.[1];
  return user ? `@${user}` : fallback;
}

// Channels whose href is blank in site.ts are dropped rather than rendered broken.
const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    Icon: Mail,
  },
  {
    label: "LinkedIn",
    value: linkedinHandle(site.socials.linkedin),
    href: site.socials.linkedin,
    Icon: Linkedin,
  },
  {
    label: "GitHub",
    value: handleFrom(site.socials.github, /github\.com\/([^/?#]+)/i, "GitHub profile"),
    href: site.socials.github,
    Icon: Github,
  },
  {
    label: "X",
    value: handleFrom(site.socials.twitter, /x\.com\/([^/?#]+)/i, "X profile"),
    href: site.socials.twitter,
    Icon: Twitter,
  },
  {
    label: "Instagram",
    value: handleFrom(
      site.socials.instagram,
      /instagram\.com\/([^/?#]+)/i,
      "Instagram profile"
    ),
    href: site.socials.instagram,
    Icon: Instagram,
  },
  // Only offered once public/resume.pdf is confirmed current — see site.resumeReady
  ...(site.resumeReady
    ? [
        {
          label: "Resume",
          value: "Download PDF",
          href: site.resumeUrl,
          Icon: Download,
        },
      ]
    : []),
].filter((channel) => channel.href.trim() !== "");

const openTo = [
  "Software engineering roles",
  "Freelance backend development",
  "AI training & evaluation projects",
  "Research collaborations",
  "Technical fellowships",
  "Startup technical contribution",
];

export default function ContactPage() {
  return (
    <Section className="pt-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800/50 p-8 sm:p-12">
            <div
              aria-hidden
              className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
            />

            <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-accent-soft">
              Contact
            </p>
            <h1 className="mt-4 text-center font-display text-3xl font-bold tracking-tight text-gradient sm:text-4xl">
              Have a Technical Challenge? Let&apos;s Build Something.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed text-slate-400">
              Whether it&apos;s a backend system that needs building, an AI evaluation project that
              needs a careful reviewer, or a research idea worth testing — the fastest way to reach
              me is email.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {channels.map(({ label, value, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") || href.startsWith("/") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  download={href === site.resumeUrl || undefined}
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.07]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-ink-900 text-accent transition-colors group-hover:border-accent/40">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-white">{label}</span>
                    <span className="block truncate text-sm text-slate-400">{value}</span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="ml-auto shrink-0 text-slate-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </a>
              ))}
            </div>

            <div className="mt-10 border-t border-white/[0.07] pt-8">
              <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Currently open to
              </p>
              <ul className="mt-5 flex flex-wrap justify-center gap-2">
                {openTo.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-10 flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <MapPin size={13} strokeWidth={1.8} />
              Based in {site.location} · open to remote and relocation
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-8 text-center">
            <Button href={`mailto:${site.email}`} variant="primary">
              Email me <Mail size={16} />
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
