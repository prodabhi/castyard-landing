import { Commands } from "./commands";
import { WatchDemo } from "./demos";
import { Wordmark } from "./primitives";
import { Reveal } from "./reveal";
import { version } from "./steps";

export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <a href="#" aria-label="Castyard home" className="text-white">
          <Wordmark />
        </a>
        <span className="font-mono text-[12px] text-white/40">v{version}</span>
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
        <Reveal delay={100} className="mt-8">
          <WatchDemo />
        </Reveal>
        <Reveal delay={200} className="mt-12">
          <Commands />
        </Reveal>
      </div>
    </section>
  );
}
