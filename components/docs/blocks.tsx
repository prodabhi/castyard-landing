import type { ReactNode } from "react";
import { CopyButton } from "../commands";

/* Docs building blocks, in the landing page's dark style. */

export function Title({ children, lead }: { children: ReactNode; lead: ReactNode }) {
  return (
    <header>
      <h1 className="display text-[clamp(40px,6vw,60px)] text-white">{children}</h1>
      <p className="mt-5 max-w-[34rem] text-[17px] leading-[1.7] text-white/55">{lead}</p>
    </header>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-16 text-[22px] font-medium tracking-[-0.02em] text-white">{children}</h2>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[15.5px] leading-[1.75] text-white/55">{children}</p>;
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-white">{children}</strong>;
}

export function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-white/[0.07] px-1.5 py-0.5 font-mono text-[0.86em] text-white/90">{children}</code>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-white/70">
          {t}
        </li>
      ))}
    </ul>
  );
}

export type Line = { kind: "cmd" | "comment" | "out"; text: string };

/**
 * Terminal card. Commands are highlighted rows with a visible Copy button (numbered when there
 * is more than one), so they stand apart from the muted comments around them.
 */
export function Terminal({ lines, title = "castyard" }: { lines: Line[]; title?: string }) {
  const cmdCount = lines.filter((l) => l.kind === "cmd").length;
  const stepOf = (i: number) => lines.slice(0, i + 1).filter((l) => l.kind === "cmd").length;
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
      <div className="relative flex items-center border-b border-white/[0.07] px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-white/[0.12]" />
          ))}
        </span>
        <span className="absolute inset-x-0 text-center font-mono text-[12px] text-white/35">{title}</span>
      </div>
      <div className="space-y-1 p-3 font-mono text-[13px] leading-[1.7] sm:text-[14px]">
        {lines.map((l, i) =>
          l.kind === "cmd" ? (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl bg-white/[0.07] py-2 pl-3 pr-2 ring-1 ring-white/[0.12] transition-colors hover:bg-white/[0.09] hover:ring-white/20"
            >
              {cmdCount > 1 && (
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-white font-sans text-[11px] font-semibold text-ink">
                  {stepOf(i)}
                </span>
              )}
              <code className="min-w-0 flex-1 py-0.5 text-white [overflow-wrap:anywhere]">
                <span className="select-none text-white/35">$ </span>
                {/* YOUR_SOMETHING placeholders get a dotted underline: replace before running. */}
                {l.text.split(/(YOUR_[A-Z_]+)/).map((part, j) =>
                  j % 2 ? (
                    <span key={j} title="Replace this" className="text-white/60 underline decoration-white/40 decoration-dotted underline-offset-4">
                      {part}
                    </span>
                  ) : (
                    part
                  ),
                )}
              </code>
              <CopyButton
                text={l.text}
                label
                className="h-8 bg-white/10 px-2.5 font-sans text-[12.5px] font-medium text-white/85 hover:bg-white hover:text-ink sm:px-3 [&>span]:max-sm:hidden"
              />
            </div>
          ) : (
            <p
              key={i}
              className={`px-3 ${l.kind === "comment" ? "pt-3 text-white/35 first:pt-1" : "py-0.5 text-white/60"}`}
            >
              {l.kind === "comment" ? `# ${l.text}` : l.text}
            </p>
          ),
        )}
      </div>
    </div>
  );
}

export function Note({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="mt-6 flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[14.5px] leading-[1.65] text-white/60">
      <span className="mt-[3px] shrink-0 text-white/80">{icon}</span>
      <p>{children}</p>
    </div>
  );
}

export const icons = {
  shield: (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
      <path d="M8 1.8 13 3.6v4.1c0 3-2.1 5.4-5 6.5-2.9-1.1-5-3.5-5-6.5V3.6L8 1.8Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="m5.8 8 1.6 1.6 2.9-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
      <circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7.2v4M8 4.9v.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

/** Big-number tiles for quick facts. */
export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
          <dt className="text-[12.5px] text-white/45">{s.label}</dt>
          <dd className="mt-1 text-[22px] font-medium tracking-[-0.02em] text-white">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
