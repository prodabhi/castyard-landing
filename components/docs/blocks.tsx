import Link from "next/link";
import type { ReactNode } from "react";
import { CopyButton } from "../commands";
import { type DocPage, pages } from "./nav";

/* Docs building blocks. Colors come from the .docs theme tokens (fg, bg, panel, mark),
   so every block works in dark and light. Terminals stay dark in both. */

/** One docs page: group label, title, optional lead, the content, then Previous / Next. */
export function Section({ id, title, lead, children }: { id: string; title: string; lead?: ReactNode; children: ReactNode }) {
  const i = pages.findIndex((p) => p.id === id);
  const [prev, next] = [pages[i - 1], pages[i + 1]];
  return (
    <article>
      <header>
        <p className="text-[13.5px] font-medium text-fg/50">{pages[i]?.group}</p>
        <h1 className="mt-2 font-serif text-[32px] font-medium tracking-[-0.02em] text-fg sm:text-[38px]">{title}</h1>
        {lead && <p className="mt-3 text-[17px] leading-[1.65] text-fg/65">{lead}</p>}
      </header>
      {children}
      <nav aria-label="Previous and next page" className="mt-16 grid gap-3 border-t border-fg/10 pt-8 sm:grid-cols-2">
        {prev ? <PageLink page={prev} label="Previous" /> : <span className="max-sm:hidden" />}
        {next && <PageLink page={next} label="Next" />}
      </nav>
    </article>
  );
}

function PageLink({ page, label }: { page: DocPage; label: "Previous" | "Next" }) {
  const isNext = label === "Next";
  return (
    <Link
      href={page.href}
      className={`flex flex-col rounded-xl border border-fg/10 px-4 py-3 hover:border-fg/30 ${isNext ? "sm:items-end sm:text-right" : ""}`}
    >
      <span className="text-[13px] text-fg/50">{isNext ? "Next" : "Previous"}</span>
      <span className="mt-0.5 text-[15px] font-medium text-fg">
        {isNext ? `${page.title} →` : `← ${page.title}`}
      </span>
    </Link>
  );
}

/** A heading inside a page. Hover shows a # link to it; "On this page" lists these. */
export function H3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="group mt-10 scroll-mt-24 font-serif text-[23px] font-medium tracking-[-0.01em] text-fg">
      <a href={`#${id}`}>
        {children}
        <span aria-hidden className="ml-2 text-fg/30 opacity-0 group-hover:opacity-100">#</span>
      </a>
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[16px] leading-[1.75] text-fg/70">{children}</p>;
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-fg">{children}</strong>;
}

export function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-fg/[0.07] px-1.5 py-0.5 font-mono text-[0.86em] text-fg/90 [overflow-wrap:anywhere]">
      {children}
    </code>
  );
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="text-fg underline decoration-fg/30 underline-offset-[3px] hover:decoration-fg"
    >
      {children}
    </a>
  );
}

/** A flat bullet list. One level only. */
export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 space-y-2 text-[16px] leading-[1.7] text-fg/70">
      {items.map((item, i) => (
        <li key={i} className="relative pl-5 before:absolute before:left-0 before:top-[0.72em] before:size-1.5 before:rounded-full before:bg-fg/35">
          {item}
        </li>
      ))}
    </ul>
  );
}

export type Line = { kind: "cmd" | "comment" | "out"; text: string };

/**
 * Terminal card. Commands are highlighted rows with a Copy button. Long lines scroll sideways
 * (the Copy button stays put); output keeps its real line breaks.
 */
export function Terminal({ lines, title = "castyard" }: { lines: Line[]; title?: string }) {
  const cmdCount = lines.filter((l) => l.kind === "cmd").length;
  const stepOf = (i: number) => lines.slice(0, i + 1).filter((l) => l.kind === "cmd").length;
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-fg/10 bg-[#0d0d0d] text-white">
      <div className="relative flex items-center border-b border-white/[0.07] px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-white/[0.12]" />
          ))}
        </span>
        <span className="absolute inset-x-0 text-center font-mono text-[12px] text-white/40">{title}</span>
      </div>
      <div className="space-y-1 p-3 font-mono text-[13px] leading-[1.7] sm:text-[13.5px]">
        {lines.map((l, i) => {
          if (l.kind === "cmd") {
            return (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-white/[0.07] py-1.5 pl-3 pr-1.5 ring-1 ring-white/[0.12]">
                {cmdCount > 1 && (
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-white font-sans text-[11px] font-semibold text-ink">
                    {stepOf(i)}
                  </span>
                )}
                <code className="min-w-0 flex-1 overflow-x-auto whitespace-pre py-1 text-white [scrollbar-width:thin]">
                  <span className="select-none text-white/35">$ </span>
                  {/* YOUR_SOMETHING placeholders get a dotted underline: replace before running. */}
                  {l.text.split(/(YOUR_[A-Z_]+)/).map((part, j) =>
                    j % 2 ? (
                      <span key={j} title="Replace this" className="text-white/65 underline decoration-white/45 decoration-dotted underline-offset-4">
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
            );
          }
          if (l.kind === "comment") {
            return (
              <p key={i} className="px-3 pt-2 text-white/40 first:pt-1">
                # {l.text}
              </p>
            );
          }
          return (
            <pre key={i} className="overflow-x-auto px-3 py-1 text-white/70 [scrollbar-width:thin]">
              {l.text}
            </pre>
          );
        })}
      </div>
    </div>
  );
}

const noteIcons = {
  info: <path d="M8 7.2v4M8 4.9v.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  warn: <path d="M8 5v3.6M8 10.9v.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
};

/** A callout. "warn" is for things that cost money or lose data. */
export function Note({ kind = "info", children }: { kind?: "info" | "warn" | "safety"; children: ReactNode }) {
  return (
    <div
      className={`mt-6 flex gap-3 rounded-2xl border px-4 py-3.5 text-[15px] leading-[1.65] text-fg/75 ${
        kind === "info" ? "border-fg/10 bg-fg/[0.03]" : "border-mark/35 bg-mark/[0.07]"
      }`}
    >
      <svg viewBox="0 0 16 16" className={`mt-[3px] size-4 shrink-0 ${kind === "info" ? "text-fg/70" : "text-mark"}`} aria-hidden>
        {kind === "safety" ? (
          <>
            <path d="M8 1.8 13 3.6v4.1c0 3-2.1 5.4-5 6.5-2.9-1.1-5-3.5-5-6.5V3.6L8 1.8Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="m5.8 8 1.6 1.6 2.9-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ) : (
          <>
            <circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" strokeWidth="1.4" />
            {noteIcons[kind]}
          </>
        )}
      </svg>
      <div className="min-w-0 [&>p+p]:mt-2">{children}</div>
    </div>
  );
}

/** A table on wide screens; stacked label/value rows on phones. */
export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-fg/10">
      <table className="w-full border-collapse text-left text-[14.5px] max-sm:block">
        <thead className="bg-fg/[0.04] max-sm:hidden">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-2.5 text-[13px] font-medium text-fg/55">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-sm:block">
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-fg/[0.08] align-top first:border-t-0 sm:first:border-t max-sm:block max-sm:px-4 max-sm:py-3">
              {row.map((cell, j) => (
                <td
                  key={j}
                  data-label={head[j]}
                  className={`px-4 py-2.5 leading-[1.6] max-sm:flex max-sm:gap-3 max-sm:p-0 max-sm:py-0.5 ${
                    j === 0
                      ? "font-medium text-fg max-sm:pb-1"
                      : "text-fg/70 max-sm:before:w-[38%] max-sm:before:shrink-0 max-sm:before:text-[13px] max-sm:before:text-fg/45 max-sm:before:content-[attr(data-label)]"
                  }`}
                >
                  <span className="min-w-0">{cell}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Diagram sizes, from each SVG's viewBox. Width and height on the <img> reserve the space. */
const diagrams = {
  "big-picture": [680, 340],
  keys: [411, 570],
  shards: [660, 304],
  "read-node-vs-validator": [660, 364],
  "life-of-a-cast": [407, 510],
  "client-filter": [686, 300],
  "sync-timeline": [680, 191],
} as const;

/** A hand-drawn diagram from docs/diagrams (Excalidraw), exported to public/docs/diagrams. */
export function Diagram({ name, alt, caption }: { name: keyof typeof diagrams; alt: string; caption?: ReactNode }) {
  const [w, h] = diagrams[name];
  return (
    <figure className="mt-6 rounded-2xl border border-fg/10 bg-fg/[0.02] px-2 py-5 sm:px-8 sm:py-6">
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG with embedded fonts; no optimization needed */}
      <img
        src={`/docs/diagrams/${name}.svg`}
        alt={alt}
        width={w}
        height={h}
        loading="lazy"
        className="docs-diagram mx-auto h-auto w-full"
        style={{ maxWidth: w }}
      />
      {caption && <figcaption className="mt-4 text-center text-[13.5px] text-fg/50">{caption}</figcaption>}
    </figure>
  );
}
