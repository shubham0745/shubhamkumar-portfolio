import { ArrowUpRight, FileText, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import Chip from "./Chip";
import TiltCard from "./TiltCard";

/** Deterministic gradient per project so cards differ without needing screenshots. */
const gradients = [
  "from-blue-600/40 via-indigo-600/25 to-transparent",
  "from-violet-600/40 via-fuchsia-600/20 to-transparent",
  "from-cyan-500/35 via-sky-600/20 to-transparent",
  "from-emerald-500/30 via-teal-600/20 to-transparent",
];

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const gradient = gradients[index % gradients.length];

  return (
    <TiltCard className="h-full">
      <div className="card-glow flex h-full flex-col overflow-hidden">
        {/* Preview panel */}
        <div className="relative h-44 overflow-hidden border-b border-white/[0.07]">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-mono text-5xl font-bold text-white/10 transition-colors duration-300 group-hover:text-white/20">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
          <span className="absolute right-3 top-3 rounded-md border border-white/10 bg-ink-950/60 px-2 py-1 font-mono text-[10px] text-slate-300 backdrop-blur">
            {project.year}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-semibold tracking-tight text-white">
            {project.title}
            {project.stub && (
              <span className="ml-2 align-middle font-mono text-[10px] font-normal uppercase tracking-wider text-amber-400/80">
                draft
              </span>
            )}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.blurb}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-4 pt-6">
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-sm text-slate-300 transition-colors hover:text-accent"
              >
                Live <ArrowUpRight size={14} />
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm text-slate-300 transition-colors hover:text-accent"
              >
                <Github size={14} /> Code
              </a>
            )}
            {project.links?.paper && (
              <a
                href={project.links.paper}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm text-slate-300 transition-colors hover:text-accent"
              >
                <FileText size={14} /> Paper
              </a>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
