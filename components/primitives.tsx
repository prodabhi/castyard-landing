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
      <span className="font-serif text-[21px] font-medium tracking-[-0.02em]">
        Castyard
      </span>
    </span>
  );
}

/** The arrow on ns.com-style pill buttons: "Get started →". */
export function Arrow({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Outlined pill button, as on ns.com. */
export const pillLight =
  "inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-2.5 text-[15px] font-medium text-ink hover:border-ink/35";
