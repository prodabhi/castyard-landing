"use client";

import { useState } from "react";
import { nodeCmds, quickstartCmd } from "./steps";

export function Commands() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="inline-flex items-center gap-3 rounded-full border-[1.5px] border-ink bg-ink py-2 pl-5 pr-2 sm:gap-5 sm:pl-7">
        <code className="whitespace-nowrap font-mono text-[12px] text-white min-[380px]:text-[13px] sm:text-[17px]">
          <span className="select-none text-white/45">$ </span>
          {quickstartCmd}
        </code>
        <CopyButton text={quickstartCmd} className="size-9 text-white/70 hover:bg-white/15 hover:text-white sm:size-10" />
      </div>

      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="mx-auto mt-8 flex items-center gap-1.5 text-[14px] text-ink/60 hover:text-ink"
      >
        Run your own node
        <svg viewBox="0 0 16 16" className={`size-3.5 ${open ? "rotate-180" : ""}`} aria-hidden>
          <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="mx-auto mt-5 max-w-[620px] text-left">
          <ol className="space-y-2">
            {nodeCmds.map((cmd) => (
              <li key={cmd} className="flex items-center gap-3 rounded-full bg-ink py-1.5 pl-5 pr-1.5">
                <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[12px] text-white [scrollbar-width:none] sm:text-[13px]">
                  <span className="select-none text-white/45">$ </span>
                  {cmd}
                </code>
                <CopyButton text={cmd} className="size-8 text-white/70 hover:bg-white/15 hover:text-white" />
              </li>
            ))}
          </ol>
          <p className="mt-3 text-center font-mono text-[12px] text-ink/45">Google Cloud, paid plan · syncing can take 24 hours</p>
        </div>
      )}
    </div>
  );
}

export function CopyButton({
  text,
  label = false,
  className = "size-8 text-white/55 hover:bg-white/10 hover:text-white",
}: {
  text: string;
  /** Show a "Copy" / "Copied" label beside the icon. */
  label?: boolean;
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
      className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full transition-colors ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0" aria-hidden>
        {copied ? (
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        ) : (
          <>
            <rect x="8" y="8" width="12" height="12" rx="2.5" />
            <path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" />
          </>
        )}
      </svg>
      {label && <span aria-hidden>{copied ? "Copied" : "Copy"}</span>}
    </button>
  );
}
