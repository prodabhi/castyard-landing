import { Commands } from "./commands";
import { NodeGlyph, SelectionBox, Wordmark } from "./primitives";
import { Reveal } from "./reveal";

export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <a href="#" aria-label="Castyard home" className="text-white">
          <Wordmark />
        </a>
        <div className="flex items-center gap-1 text-[14px] text-white/70">
          {["Docs", "Pricing", "FAQs"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="hidden rounded-md px-3 py-1.5 transition-colors hover:text-white sm:block"
            >
              {l}
            </a>
          ))}
          <span className="mx-2 hidden h-4 w-px bg-white/15 sm:block" />
          <a href="#login" className="rounded-md px-3 py-1.5 transition-colors hover:text-white">
            Log in
          </a>
        </div>
      </nav>
    </header>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink pb-16 pt-28">
      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 70%, rgba(255,255,255,0.07), transparent 70%), radial-gradient(90% 60% at 50% 0%, rgba(255,255,255,0.04), transparent 60%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1180px] px-5 text-center sm:px-8">
        <Reveal>
          <h1 className="display text-[clamp(40px,6.4vw,78px)] text-white">
            Your{" "}
            <SelectionBox tone="dark" label="you own this">
              audience
            </SelectionBox>
            ,
            <br />
            on your own n<NodeGlyph className="mx-[0.02em]" />
            de
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-[36rem] text-[17px] leading-relaxed text-mute-dark sm:text-[18px]">
            Cast, follow, like and filter by app. Every read and post goes
            through a Snapchain node, and the node can be yours.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a
              href="#how-it-works"
              className="group inline-flex items-center gap-2.5 rounded-full bg-white py-2 pl-2 pr-6 text-[15px] font-medium text-ink transition-transform hover:-translate-y-px"
            >
              <PlayDot />
              Watch how it works
            </a>
            <a href="#docs" className="text-[15px] text-white/60 transition-colors hover:text-white">
              Read the docs
            </a>
          </div>
        </Reveal>

        <Reveal delay={320} className="mt-10">
          <Commands />
        </Reveal>
      </div>
    </section>
  );
}

export function PlayDot({ inverted = false }: { inverted?: boolean }) {
  return (
    <span
      className={`grid size-8 place-items-center rounded-full ${
        inverted ? "bg-white text-ink" : "bg-ink text-white"
      }`}
    >
      <svg viewBox="0 0 12 12" className="ml-0.5 size-3" aria-hidden>
        <path d="M2.5 1.5v9l7.5-4.5z" fill="currentColor" />
      </svg>
    </span>
  );
}

export function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-3.5 ${className}`} aria-hidden>
      <path d="m6 3.5 4.5 4.5L6 12.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
