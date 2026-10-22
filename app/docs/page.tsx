import type { Metadata } from "next";
import { C, Chips, Note, P, Terminal, Title, icons } from "@/components/docs/blocks";
import { quickstartCmd } from "@/components/steps";

export const metadata: Metadata = {
  title: "Quickstart · Castyard docs",
  description: "Run castyard on your laptop in one command.",
};

export default function Quickstart() {
  return (
    <>
      <Title lead="Run a Farcaster client on your laptop. It reads and posts through my Snapchain node, so there’s nothing else to set up.">
        Quickstart
      </Title>

      <Chips items={["Node.js 20+", "A test Farcaster account with storage"]} />

      <Terminal
        lines={[
          { kind: "cmd", text: quickstartCmd },
          { kind: "comment", text: "enter your test account’s FID" },
          { kind: "comment", text: "enter its recovery phrase (nothing shows while you type)" },
          { kind: "comment", text: "wait for confirmed" },
        ]}
      />

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          href="http://localhost:3000"
          className="h-pill inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14.5px] font-medium text-ink shadow-[0_0_60px_-10px_rgba(255,255,255,0.25)]"
        >
          Open localhost:3000
          <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
            <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <span className="text-[14px] text-white/45">
          Press <C>Ctrl+C</C> to stop.
        </span>
      </div>

      <Note icon={icons.shield}>
        Use a test account. castyard uses the recovery phrase once to create its own app key, then forgets it. It never
        sends or saves the phrase.
      </Note>

      <P>
        That’s it. Cast, follow, like, and filter your feed by app.
      </P>
    </>
  );
}
