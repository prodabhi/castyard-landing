"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { groups, pages } from "./nav";

function hrefOf(id: string) {
  return pages.find((p) => p.id === id)!.href;
}

/** The grouped page list. The current page is highlighted. */
export function Sidebar() {
  const path = usePathname();
  return (
    <nav aria-label="Docs" className="space-y-7">
      {groups.map((g) => (
        <div key={g.title}>
          <p className="px-3 text-[13px] font-semibold text-fg">{g.title}</p>
          <ul className="mt-2 space-y-0.5">
            {g.pages.map((p) => {
              const href = hrefOf(p.id);
              const active = path === href;
              return (
                <li key={p.id}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-lg px-3 py-1.5 text-[14px] ${
                      active ? "bg-fg/[0.07] font-medium text-fg" : "text-fg/60 hover:text-fg"
                    }`}
                  >
                    {p.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/** Phones and tablets: "Group › Page" bar that opens the sidebar. It closes on navigation. */
export function MobileNav() {
  const path = usePathname();
  const current = pages.find((p) => p.href === path);
  return (
    <details key={path} className="group sticky top-16 z-10 border-b border-fg/[0.08] bg-bg lg:hidden">
      <summary className="flex h-11 cursor-pointer list-none items-center gap-2 px-4 text-[14px] sm:px-8 [&::-webkit-details-marker]:hidden">
        <svg viewBox="0 0 16 16" className="size-4 text-fg/55" aria-hidden>
          <path d="M2.5 4h11M2.5 8h11M2.5 12h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {current ? (
          <span className="min-w-0 truncate">
            <span className="text-fg/50">{current.group}</span>
            <span className="px-1.5 text-fg/30">›</span>
            <span className="text-fg">{current.title}</span>
          </span>
        ) : (
          <span>Docs</span>
        )}
      </summary>
      <div className="max-h-[70vh] overflow-y-auto border-t border-fg/[0.08] px-1 py-4 sm:px-5">
        <Sidebar />
      </div>
    </details>
  );
}
