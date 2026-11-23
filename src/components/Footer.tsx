import Link from "next/link";
import { nav, site } from "@/data/site";
import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.07] py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 sm:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-slate-500 transition-colors hover:text-slate-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Socials />

        <p className="text-center text-sm text-slate-500">
          Designed and built by {site.name} · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
