import type { ReactNode } from "react";

/* ---------- Brand ---------- */

/** Castyard mark: a cast (dot + signal arc) inside the corner of a yard. */
export function Mark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M7 6.5h15a4 4 0 0 1 4 4V25"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M7 15.5a9 9 0 0 1 9 9"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="8" cy="23.5" r="2.6" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Mark className="size-[22px]" />
      <span className="text-[19px] font-semibold tracking-[-0.03em]">
        Castyard
      </span>
    </span>
  );
}

/* ---------- Design-tool motifs ---------- */

/** Dashed selection box with corner handles, wrapped around a word. */
export function SelectionBox({
  children,
  tone = "dark",
  label,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  label?: string;
}) {
  const handle =
    tone === "dark"
      ? "bg-white border-select"
      : "bg-paper border-select";
  return (
    <span className="relative inline-block px-[0.12em]">
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 border-[1.5px] border-dashed border-select ${
          tone === "dark"
            ? "bg-select/[0.07] shadow-[0_0_24px_rgba(124,147,245,0.35)]"
            : "bg-select/[0.08]"
        }`}
      />
      {(["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"] as const).map(
        (pos) => (
          <span
            key={pos}
            aria-hidden
            className={`pointer-events-none absolute ${pos} size-2 border-[1.5px] ${handle}`}
          />
        ),
      )}
      {label && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-7 right-0 hidden whitespace-nowrap sm:block rounded-[4px] bg-select px-1.5 py-0.5 font-mono text-[10px] font-normal tracking-normal text-white"
        >
          {label}
        </span>
      )}
      <span className="relative">{children}</span>
    </span>
  );
}

/** Network-node glyph that stands in for the letter “o”. */
export function NodeGlyph({ className = "" }: { className?: string }) {
  const spokes = [0, 60, 120, 180, 240, 300];
  return (
    <svg
      viewBox="-12 -12 24 24"
      className={`inline-block h-[0.66em] w-[0.66em] align-[-0.02em] ${className}`}
      aria-hidden
    >
      <g className="spin-slow origin-center">
        {spokes.map((deg) => {
          const r = (deg * Math.PI) / 180;
          // Rounded so server and client render identical attributes.
          const at = (len: number) => [+(Math.cos(r) * len).toFixed(3), +(Math.sin(r) * len).toFixed(3)];
          const [x1, y1] = at(4);
          const [x2, y2] = at(8.2);
          const [cx, cy] = at(9.6);
          return (
            <g key={deg}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx={cx} cy={cy} r="2" fill="currentColor" />
            </g>
          );
        })}
      </g>
      <circle r="2.8" fill="currentColor" />
    </svg>
  );
}

/** Small pointer cursor, as seen in design tools. */
export function Cursor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-4 ${className}`} aria-hidden>
      <path
        d="M2 1.5 14 7l-5.2 1.6L7 14 2 1.5Z"
        fill="currentColor"
        stroke="white"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- People ---------- */

const avatarTones = [
  "from-neutral-300 to-neutral-500",
  "from-stone-300 to-stone-600",
  "from-zinc-200 to-zinc-500",
  "from-neutral-400 to-neutral-700",
  "from-stone-200 to-stone-400",
];

/** Initials avatar in desaturated tones, so imagery never competes with type. */
export function Avatar({
  name,
  size = "size-9 text-[11px]",
  tone = 0,
  className = "",
}: {
  name: string;
  /** Size and initials font-size classes. */
  size?: string;
  tone?: number;
  className?: string;
}) {
  const initials = name
    .replace("@", "")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      aria-hidden
      className={`inline-grid shrink-0 place-items-center rounded-full bg-gradient-to-br ${
        avatarTones[tone % avatarTones.length]
      } ${size} font-semibold text-white/90 ring-2 ring-white/70 ${className}`}
    >
      {initials}
    </span>
  );
}
