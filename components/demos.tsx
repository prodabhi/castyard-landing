"use client";

import { useRef, useState } from "react";
import { Reveal } from "./reveal";

// Drop the recordings into public/demos/ with these names, or point src at any hosted MP4.
const demos = [
  { title: "Building Castyard", src: "/demos/building-castyard.mp4" },
  { title: "Vouch", src: "/demos/vouch.mp4" },
];

export function Demos() {
  return (
    <section id="demos" className="bg-paper py-24 text-ink sm:py-28">
      <div className="mx-auto grid max-w-[1180px] gap-x-6 gap-y-10 px-5 sm:px-8 md:grid-cols-2">
        {demos.map((d, i) => (
          <Reveal key={d.src} delay={i * 100}>
            <DemoCard {...d} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** Hero button that plays the build demo in a full-screen player. */
export function WatchDemo() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [missing, setMissing] = useState(false);
  const { title, src } = demos[0];

  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
        className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] py-1.5 pl-1.5 pr-5 text-[14px] text-white/85 transition-colors hover:border-white/30 hover:text-white"
      >
        <span className="grid size-7 place-items-center rounded-full bg-white text-ink">
          <svg viewBox="0 0 12 12" className="ml-0.5 size-2.5" aria-hidden>
            <path d="M2.5 1.5v9l7.5-4.5z" fill="currentColor" />
          </svg>
        </span>
        Watch how it works
      </button>

      <dialog
        ref={dialog}
        aria-label={title}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === dialog.current && close()}
        className="m-auto w-[min(1100px,92vw)] overflow-visible bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        <div className="relative aspect-video overflow-hidden rounded-[20px] bg-ink">
          {open && !missing && (
            <video
              src={src}
              autoPlay
              controls
              playsInline
              onError={() => setMissing(true)}
              className="absolute inset-0 size-full object-cover"
            />
          )}
          {missing && (
            <p className="absolute inset-0 grid place-items-center font-mono text-[13px] text-white/45">coming soon</p>
          )}
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute -top-11 right-0 grid size-9 place-items-center rounded-full text-white/60 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-1 focus-visible:ring-white/40"
        >
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
            <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </dialog>
    </>
  );
}

function DemoCard({ title, src }: { title: string; src: string }) {
  const [state, setState] = useState<"poster" | "playing" | "missing">("poster");

  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-[20px] bg-ink">
        {state === "playing" ? (
          <video
            src={src}
            autoPlay
            controls
            playsInline
            onError={() => setState("missing")}
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={() => setState("playing")}
            aria-label={`Play ${title}`}
            className="group absolute inset-0 grid place-items-center bg-[radial-gradient(70%_70%_at_50%_50%,rgba(255,255,255,0.08),transparent)]"
          >
            <span className="grid size-16 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:scale-105">
              <svg viewBox="0 0 12 12" className="ml-1 size-4" aria-hidden>
                <path d="M2.5 1.5v9l7.5-4.5z" fill="currentColor" />
              </svg>
            </span>
            {state === "missing" && (
              <span className="absolute bottom-5 font-mono text-[12px] text-white/45">coming soon</span>
            )}
          </button>
        )}
      </div>
      <figcaption className="mt-4 text-[16px] font-medium tracking-[-0.01em]">{title}</figcaption>
    </figure>
  );
}
