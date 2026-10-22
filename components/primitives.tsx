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
