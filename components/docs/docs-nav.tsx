"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const pages = [
  { href: "/docs", title: "Quickstart" },
  { href: "/docs/node", title: "Run your own node" },
];

/** Pill switcher between the two docs pages. */
export function DocsSwitcher() {
  const path = usePathname();

  return (
    <nav aria-label="Docs" className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
      {pages.map((p) => {
        const active = path === p.href;
        return (
          <Link
            key={p.href}
            href={p.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-4 py-1.5 text-[13.5px] transition-colors duration-[250ms] ${
              active ? "bg-white text-ink" : "text-white/55 hover:text-white"
            }`}
          >
            {p.title}
          </Link>
        );
      })}
    </nav>
  );
}

/** Card linking to the other page. */
export function PageFoot() {
  const path = usePathname();
  const i = pages.findIndex((p) => p.href === path);
  const next = pages[i + 1];
  const target = next ?? pages[i - 1];
  if (!target) return null;

  return (
    <Link
      href={target.href}
      className="h-arrow-trigger group mt-20 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
    >
      <span>
        <span className="block text-[13px] text-white/45">{next ? "Next" : "Back to"}</span>
        <span className="mt-0.5 block text-[18px] font-medium tracking-[-0.02em] text-white">{target.title}</span>
      </span>
      <span className="h-arrow grid size-9 place-items-center rounded-full bg-white text-ink">
        <svg viewBox="0 0 16 16" className={`size-4 ${next ? "" : "rotate-180"}`} aria-hidden>
          <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
