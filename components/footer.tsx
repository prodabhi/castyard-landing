import Link from "next/link";
import { Wordmark } from "./primitives";

const links = [
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: "https://github.com/prodabhi/castyard" },
  { label: "npm", href: "https://www.npmjs.com/package/castyard" },
];

/** Site footer, shared by the landing page (on its dark FAQ band) and the docs (on white). */
export function Footer({ dark = false, frame = "mx-auto max-w-[1180px] px-5 sm:px-8" }: { dark?: boolean; frame?: string }) {
  return (
    <footer className={frame}>
      <div className={`flex flex-wrap items-center justify-between gap-4 border-t py-7 ${dark ? "border-white/10" : "border-ink/10"}`}>
        <Wordmark className={dark ? "text-white/85" : "text-ink"} />
        <nav className={`flex items-center gap-5 text-[13px] ${dark ? "text-white/50" : "text-ink/50"}`}>
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.label} href={l.href} className={dark ? "hover:text-white" : "hover:text-ink"}>
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className={dark ? "hover:text-white" : "hover:text-ink"}>
                {l.label}
              </a>
            ),
          )}
          <span>© 2026</span>
        </nav>
      </div>
    </footer>
  );
}
