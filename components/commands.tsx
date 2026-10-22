"use client";

import { useState } from "react";
import { ownNode, quickstart } from "./steps";

const tabs = [
  { id: "node", label: "Your own node", count: "3 commands" },
  { id: "quick", label: "Quickstart", count: "1 command" },
] as const;

/** Terminal card with the real install paths, each command copyable. */
export function Commands() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("node");
  const active = tab === "node" ? ownNode : quickstart;

  return (
    <div className="mx-auto max-w-[760px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm">
      <div role="tablist" className="flex gap-1 border-b border-white/[0.07] p-1.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13.5px] transition-colors ${
              tab === t.id ? "bg-white/10 text-white" : "text-white/45 hover:text-white/80"
            }`}
          >
            {t.label}
            <span className="hidden font-mono text-[11px] text-white/35 sm:inline">{t.count}</span>
          </button>
        ))}
      </div>

      <ol className="space-y-3 p-4 sm:p-5">
        {active.commands.map((c, i) => (
          <li key={c.cmd}>
            <p className="mb-1.5 flex items-center gap-2 text-[13px] text-white/50">
              <span className="grid size-[18px] place-items-center rounded-full bg-white font-mono text-[10.5px] font-medium text-ink">
                {i + 1}
              </span>
              {c.label}
            </p>
            <div className="flex items-center gap-3 rounded-xl bg-black/40 py-2 pl-3.5 pr-2 ring-1 ring-white/[0.06]">
              <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[12px] text-white sm:text-[13px] [scrollbar-width:none]">
                <span className="select-none text-white/35">$ </span>
                {c.cmd}
              </code>
              <CopyButton text={c.cmd} />
            </div>
          </li>
        ))}
      </ol>

      {tab === "quick" && (
        <ul className="mx-4 mb-4 space-y-1 rounded-xl border border-white/[0.07] px-3.5 py-3 font-mono text-[12.5px] sm:mx-5">
          {quickstart.prompts.map((p) => (
            <li key={p.text} className="flex gap-2">
              <span className="w-3 text-white/50">{p.mark}</span>
              <span className="text-white/80">{p.text}</span>
              {p.hint && <span className="truncate text-white/35">› {p.hint}</span>}
            </li>
          ))}
        </ul>
      )}

      <p className="border-t border-white/[0.07] px-4 py-3 font-mono text-[11.5px] text-white/40 sm:px-5">
        {active.requires}
      </p>
    </div>
  );
}

export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
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
      className={`grid size-7 shrink-0 place-items-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white ${className}`}
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
