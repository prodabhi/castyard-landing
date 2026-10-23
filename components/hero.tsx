import Link from "next/link";
import { Commands } from "./commands";
import { WatchDemo } from "./demos";
import { Arrow, Wordmark } from "./primitives";

/** Site header, shared by the landing page and the docs. `frame` sets the inner width. */
export function Nav({ frame = "mx-auto max-w-[1180px] px-5 sm:px-8" }: { frame?: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/[0.06] bg-white/90 backdrop-blur-md">
      <nav className={`${frame} flex h-16 items-center justify-between`}>
        <Link href="/" aria-label="Castyard home" className="text-ink">
          <Wordmark />
        </Link>
        <div className="flex items-center gap-2 text-[14px]">
          {[
            { label: "Demo", href: "/#demos" },
            { label: "FAQ", href: "/#faq" },
          ].map((l) => (
            <a key={l.href} href={l.href} className="hidden px-3 py-1.5 text-ink/60 hover:text-ink sm:block">
              {l.label}
            </a>
          ))}
          <Link href="/docs" className="rounded-full border border-ink/15 px-4 py-1.5 font-medium text-ink hover:border-ink/35">
            Docs
          </Link>
          <Link href="/docs/quickstart" className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 font-medium text-white hover:bg-black">
            Get started
            <Arrow />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function Hero() {
  return (
    <section className="bg-white px-5 pb-24 pt-20 text-center sm:px-8 sm:pt-28">
      <h1 className="display mx-auto text-[clamp(40px,6.4vw,72px)] text-ink">Farcaster, on your own node.</h1>
      <p className="mx-auto mt-5 whitespace-nowrap font-serif text-[clamp(18px,2.2vw,25px)] leading-[1.45] text-ink/80">
        A Farcaster client you run yourself
      </p>
      <div className="mt-9">
        <WatchDemo />
      </div>
      <div className="mt-10">
        <Commands />
      </div>
    </section>
  );
}
