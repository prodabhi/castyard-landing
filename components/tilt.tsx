"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

const MAX = 8; // peak tilt in degrees at the card edges

/**
 * Card hover tilt (transitions.dev). The pointer is tracked on the flat outer wrapper so the
 * rotating card can't slip out from under the cursor. Mouse only: on touch the page scrolls.
 */
export function Tilt({
  children,
  disabled = false,
  className = "",
}: {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  const reset = () => {
    wrap.current?.classList.remove("is-hover");
    card.current?.classList.remove("is-tilting");
    card.current?.style.setProperty("--tilt-rx", "0deg");
    card.current?.style.setProperty("--tilt-ry", "0deg");
  };

  const track = (e: PointerEvent<HTMLDivElement>) => {
    const w = wrap.current;
    const c = card.current;
    if (!w || !c || disabled || e.pointerType !== "mouse") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = w.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    w.classList.add("is-hover");
    c.classList.add("is-tilting");
    c.style.setProperty("--tilt-ry", ((px - 0.5) * MAX).toFixed(2) + "deg");
    c.style.setProperty("--tilt-rx", ((0.5 - py) * MAX).toFixed(2) + "deg");
    c.style.setProperty("--tilt-gx", (px * 100).toFixed(1) + "%");
    c.style.setProperty("--tilt-gy", (py * 100).toFixed(1) + "%");
  };

  return (
    <div
      ref={wrap}
      className="t-tilt"
      onPointerMove={track}
      onPointerLeave={reset}
      onPointerDown={reset}
    >
      <div ref={card} className={`t-tilt-card ${className}`}>
        {children}
        {!disabled && <div className="t-tilt-glare" />}
      </div>
    </div>
  );
}
