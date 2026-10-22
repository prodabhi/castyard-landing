"use client";

import { useState } from "react";
import { nodeCmds, quickstartCmd } from "./steps";

export function Commands() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p className="font-mono text-[12px] text-white/40">Empty folder · Node 20+ · test Farcaster account</p>

      <div className="h-pill mt-4 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 shadow-[0_0_60px_-10px_rgba(255,255,255,0.25)] sm:gap-5 sm:pl-7">
        <code className="font-mono text-[13px] text-ink sm:text-[18px]">
          <span className="select-none text-ink/35">$ </span>
          {quickstartCmd}
        </code>
        <CopyButton
          text={quickstartCmd}
          className="size-9 text-ink/50 hover:bg-ink/[0.06] hover:text-ink sm:size-10"
        />
      </div>

      <p className="mt-4 font-mono text-[12px] text-white/40">then open localhost:3000</p>

      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="h-chev-trigger mt-14 inline-flex items-center gap-1.5 text-[14px] text-white/55 transition-colors hover:text-white"
      >
        Run your own node
        <span className="h-chev inline-flex">
          <svg viewBox="0 0 16 16" className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden>
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="mx-auto mt-5 max-w-[620px] text-left">
          <ol className="divide-y divide-white/[0.07] rounded-2xl border border-white/10">
            {nodeCmds.map((cmd) => (
              <li key={cmd} className="flex items-center gap-3 py-1.5 pl-4 pr-1.5">
                <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[12px] text-white/85 [scrollbar-width:none] sm:text-[13px]">
                  <span className="select-none text-white/35">$ </span>
                  {cmd}
                </code>
                <CopyButton text={cmd} />
              </li>
            ))}
          </ol>
          <p className="mt-3 text-center font-mono text-[12px] text-white/35">Google Cloud, paid plan · about a day to sync</p>
        </div>
      )}
    </div>
  );
}

function CopyButton({
  text,
  className = "size-8 text-white/55 hover:bg-white/10 hover:text-white",
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : `Copy ${text}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // Clipboard can be blocked (insecure origin, permissions); nothing to do.
        }
      }}
      className={`grid shrink-0 place-items-center rounded-full transition-colors ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden>
        {copied ? (
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        ) : (
          <>
            <rect x="8" y="8" width="12" height="12" rx="2.5" />
            <path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" />
          </>
        )}
      </svg>
    </button>
  );
}
