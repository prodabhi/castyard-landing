import { Footer } from "./footer";

// Answers stick to what the quickstart guide states.
const faqs = [
  {
    q: "What is Castyard?",
    a: "A Farcaster app that runs on your own laptop. Cast, follow, like, and hide posts by the app that made them.",
  },
  {
    q: "What do I need?",
    a: "Node.js 20+ and a test Farcaster account with storage.",
  },
  {
    q: "Should I use my main account?",
    a: "No. Use a test account. When the client starts it asks for the account’s FID and recovery phrase. Nothing shows while you type the phrase.",
  },
  {
    q: "Do I need my own node?",
    a: "No. Start with mine. Run your own later if you want to.",
  },
  {
    q: "What does running my own node take?",
    a: "A Google Cloud project on a paid plan, three commands, and up to 24 hours for the node to sync. Then point the client at it with --node.",
  },
];

/* Dark FAQ band with boxed rows, the way ns.com ends its page. */
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 bg-ink text-white">
      <div className="mx-auto max-w-[720px] px-5 py-24 sm:px-8">
        <h2 className="display text-[clamp(32px,4.4vw,44px)]">FAQs</h2>
        <div className="mt-8 space-y-2">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-lg border border-white/10 bg-white/[0.04]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-4 py-3.5 text-[15.5px] font-medium text-white/90 hover:text-white [&::-webkit-details-marker]:hidden">
                {f.q}
                <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-white/45 group-open:rotate-180" aria-hidden>
                  <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p className="px-4 pb-4 text-[15px] leading-relaxed text-white/60">{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      <Footer dark />
    </section>
  );
}
