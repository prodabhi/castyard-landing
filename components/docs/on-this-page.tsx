"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Heading = { id: string; text: string };

/** Right-hand list of the current page's headings. The one you're reading is highlighted. */
export function OnThisPage() {
  const path = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("main h2[id]")];
    // The headings live in the server-rendered page; read them once per page.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(els.map((el) => ({ id: el.id, text: el.textContent ?? "" })));

    let frame = 0;
    const update = () => {
      frame = 0;
      let current = els[0]?.id;
      for (const el of els) if (el.getBoundingClientRect().top < 120) current = el.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [path]);

  if (headings.length < 2) return null;
  return (
    <nav aria-label="On this page">
      <p className="text-[13px] font-semibold text-fg">On this page</p>
      <ul className="mt-3 space-y-2 border-l border-fg/10">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`-ml-px block border-l py-0.5 pl-3 text-[13.5px] ${
                active === h.id ? "border-fg font-medium text-fg" : "border-transparent text-fg/55 hover:text-fg"
              }`}
            >
              {h.text.replace(/#$/, "")}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
