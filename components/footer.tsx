import { CopyButton } from "./commands";
import { quickstartCmd } from "./steps";
import { Chevron } from "./hero";
import { Mark, Wordmark } from "./primitives";
import { Reveal } from "./reveal";

/** Closing row and footer, sharing the light band with the demos. */
export function Footer() {
  return (
    <footer className="bg-paper pb-10 pt-6 text-ink">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-[24px] bg-ink px-6 py-6 text-white sm:flex-row sm:items-center sm:px-8">
          <div>
            <p className="text-[22px] font-medium tracking-[-0.02em]">Try it in one command.</p>
            <code className="mt-1 flex items-center gap-1 font-mono text-[12.5px] text-white/45">
              <span className="truncate">$ {quickstartCmd}</span>
              <CopyButton text={quickstartCmd} />
            </code>
          </div>
          <a
            href="#docs"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors hover:bg-accent-hover"
          >
            Get started
            <Chevron className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <div className="mt-10 flex flex-col gap-5 border-t border-ink/[0.08] pt-8 text-[14px] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
            <Wordmark />
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-mute-light">
              {["Docs", "Pricing", "FAQs", "Changelog"].map((l) => (
                <a key={l} href="#" className="transition-colors hover:text-ink">
                  {l}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-ink/45">
            <a href="#" aria-label="Follow /castyard on Farcaster" className="text-ink/60 hover:text-ink">
              <Mark className="size-4" />
            </a>
            <span>© 2026 Castyard</span>
            <a href="#" className="hover:text-ink">Privacy</a>
            <a href="#" className="hover:text-ink">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
