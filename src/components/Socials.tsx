import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

// Unconfigured socials are blank in site.ts — drop them so we never render a
// link that 404s or points at someone else's profile.
const links = [
  { href: site.socials.github, label: "GitHub", Icon: Github },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: site.socials.twitter, label: "X / Twitter", Icon: Twitter },
  { href: site.socials.instagram, label: "Instagram", Icon: Instagram },
  { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
].filter((link) => link.href.trim() !== "");

export default function Socials({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noreferrer noopener"
          aria-label={label}
          title={label}
          className="group grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/10 hover:text-white"
        >
          <Icon size={size} strokeWidth={1.8} />
        </a>
      ))}
    </div>
  );
}
