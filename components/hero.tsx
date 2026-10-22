import Link from "next/link";
import { Commands } from "./commands";
import { WatchDemo } from "./demos";
import { Wordmark } from "./primitives";
import { Reveal } from "./reveal";

export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <a href="#" aria-label="Castyard home" className="text-white">
          <Wordmark />
        </a>
        <div className="flex items-center gap-1 text-[14px] text-white/60">
          {[
            { label: "Demo", href: "#demos" },
            { label: "FAQ", href: "#faq" },
          ].map((l) => (
            <a key={l.href} href={l.href} className="h-link rounded-md px-3 py-1.5 transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
          <Link href="/docs" className="h-link rounded-md px-3 py-1.5 transition-colors hover:text-white">
            Docs
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(55% 45% at 50% 55%, rgba(255,255,255,0.06), transparent 70%)" }}
      />
      <div className="relative mx-auto w-full max-w-[1180px] px-5 text-center sm:px-8">
        <Reveal>
          <h1 className="display text-[clamp(44px,7vw,84px)] text-white">
            Farcaster,
            <br />
            on your own node.
          </h1>
        </Reveal>
        <Reveal delay={100} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <WatchDemo />
          <Link
            href="/docs"
            className="h-arrow-trigger inline-flex items-center gap-1.5 text-[14px] text-white/60 transition-colors hover:text-white"
          >
            Read the docs
            <svg viewBox="0 0 16 16" className="h-arrow size-3.5" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
        <Reveal delay={200} className="mt-12">
          <Commands />
        </Reveal>
      </div>
    </section>
  );
}
