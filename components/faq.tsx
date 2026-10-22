import { Wordmark } from "./primitives";
import { Reveal } from "./reveal";

// Answers stick to what the quickstart guide states.
const faqs = [
  {
    q: "What is Castyard?",
    a: "A Farcaster client you run yourself. Cast, follow, like and filter by app. Every read and post goes through a Snapchain node.",
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
    a: "No. It’s optional. The quickstart runs with a single command.",
  },
  {
    q: "What does running my own node take?",
    a: "A Google Cloud project on a paid plan, three commands, and about a day for the node to sync. Then point the client at it with --node.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="flex min-h-[100svh] flex-col bg-ink text-white">
      <div className="mx-auto flex w-full max-w-[1180px] flex-1 items-center px-5 py-24 sm:px-8">
        <div className="grid w-full gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <Reveal>
            <h2 className="display text-[clamp(40px,5vw,64px)]">FAQ</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {faqs.map((f) => (
                <details key={f.q} className="group h-faq">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] text-white/90 transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                    <span className="h-faq-q">{f.q}</span>
                    <svg
                      viewBox="0 0 16 16"
                      className="h-faq-icon size-4 shrink-0 text-white/40 group-open:rotate-45"
                      aria-hidden
                    >
                      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </summary>
                  <p className="max-w-[36rem] pb-6 pr-10 text-[15.5px] leading-relaxed text-white/55">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <footer className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <div className="flex items-center justify-between border-t border-white/10 py-7">
          <Wordmark className="text-white/80" />
          <span className="text-[13px] text-white/40">© 2026</span>
        </div>
      </footer>
    </section>
  );
}
