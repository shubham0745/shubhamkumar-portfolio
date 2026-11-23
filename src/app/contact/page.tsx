import type { Metadata } from "next";
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — email, LinkedIn and GitHub.`,
};

/** Pulls "in/shubham-kumar-351000334" out of the full profile URL so the label
 *  shown on the card can never drift away from the link it points at. */
function linkedinHandle(url: string) {
  return url.match(/linkedin\.com\/(in\/[^/?#]+)/i)?.[1] ?? "LinkedIn profile";
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
    value: "View my code",
    href: site.socials.github,
    Icon: Github,
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: site.resumeUrl,
    Icon: Download,
  },
].filter((channel) => channel.href.trim() !== "");

export default function ContactPage() {
  return (
    <Section className="pt-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800/50 p-8 sm:p-12">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_70%)] blur-2xl" />

            <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-accent-soft">
              Contact
            </p>
            <h1 className="mt-4 text-center font-display text-3xl font-bold tracking-tight text-gradient sm:text-4xl">
              Let&apos;s build something together
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed text-slate-400">
              I&apos;m open to backend and systems engineering roles, freelance backend work, and
              questions from students figuring out the same path. The fastest way to reach me is
              email.
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
