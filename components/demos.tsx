"use client";

import { useState, type ReactNode } from "react";
import { PlayDot } from "./hero";
import { Avatar, Cursor, Mark, NodeGlyph } from "./primitives";
import { Reveal } from "./reveal";

// Drop the recordings into public/demos/ with these names, or point src at any hosted MP4.
const demos = [
  {
    id: "build",
    tag: "Demo 01",
    title: "Building Castyard",
    copy: "A walkthrough of building Castyard, from an empty repo to a live client and node.",
    src: "/demos/building-castyard.mp4",
    poster: <BuildPoster />,
  },
  {
    id: "vouchers",
    tag: "Demo 02",
    title: "Vouchers",
    copy: "Vouchers end to end, from creating one to seeing it redeemed.",
    src: "/demos/vouchers.mp4",
    poster: <VouchersPoster />,
  },
];

export function Demos() {
  return (
    <section id="how-it-works" className="bg-paper pb-4 pt-20 text-ink">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="display text-[clamp(34px,4.2vw,54px)]">See it run, start to finish</h2>
          <p className="max-w-[22rem] text-[16px] leading-relaxed text-mute-light">
            Two short walkthroughs: how Castyard was built, and vouchers in action.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {demos.map((d, i) => (
            <Reveal key={d.id} delay={i * 100}>
              <DemoCard {...d} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoCard({
  tag,
  title,
  copy,
  src,
  poster,
}: {
  tag: string;
  title: string;
  copy: string;
  src: string;
  poster: ReactNode;
}) {
  const [state, setState] = useState<"poster" | "playing" | "missing">("poster");

  return (
    <article className="rounded-[24px] border border-ink/[0.08] bg-white p-2">
      <div className="relative aspect-video overflow-hidden rounded-[18px] bg-[#1b1a18]">
        {state === "playing" ? (
          <video
            src={src}
            autoPlay
            controls
            playsInline
            onError={() => setState("missing")}
            className="absolute inset-0 size-full bg-black object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={() => setState("playing")}
            aria-label={`Play ${title}`}
            className="group absolute inset-0 text-left"
          >
            <Footage />
            {poster}
            <span className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-white/90 py-1.5 pl-1.5 pr-4 text-[14px] font-medium text-ink backdrop-blur-md transition-colors group-hover:bg-white">
              <PlayDot />
              {state === "missing" ? "Video coming soon" : "Play demo"}
            </span>
          </button>
        )}
      </div>
      <div className="flex items-start justify-between gap-6 px-4 pb-4 pt-5 sm:px-5">
        <div>
          <h3 className="text-[21px] font-medium tracking-[-0.02em]">{title}</h3>
          <p className="mt-1.5 max-w-[26rem] text-[15px] leading-relaxed text-mute-light">{copy}</p>
        </div>
        <span className="mt-1.5 shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40">
          {tag}
        </span>
      </div>
    </article>
  );
}

/* ---------- Posters: product fragments floating over soft "footage" ---------- */

function Footage() {
  return (
    <span aria-hidden className="absolute inset-0">
      <span className="drift absolute -left-[10%] top-[5%] size-[55%] rounded-full bg-[#d9cfbf]/20 blur-[60px]" />
      <span className="drift absolute right-[5%] top-[-15%] size-[45%] rounded-full bg-white/10 blur-[70px] [animation-delay:-5s]" />
      <span className="drift absolute bottom-[-25%] left-[35%] size-[55%] rounded-full bg-[#8d8476]/25 blur-[70px] [animation-delay:-9s]" />
      <span className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_40%,rgba(0,0,0,0.5))]" />
    </span>
  );
}

function BuildPoster() {
  return (
    <span aria-hidden className="absolute inset-0">
      {/* Terminal fragment */}
      <span className="float absolute left-[7%] top-[11%] w-[58%] rounded-xl border border-white/10 bg-ink/80 p-3 font-mono text-[11px] leading-relaxed shadow-2xl backdrop-blur-xl [--float-dur:8s] [--tilt:-1.5deg]">
        <span className="mb-2 flex items-center gap-1.5 text-[11.5px] text-white/70">
          <Mark className="size-3.5" /> ~/castyard
        </span>
        <span className="block text-white/80">
          <span className="text-white/35">$ </span>npx castyard@0.1.1 client
        </span>
        <span className="mt-1 hidden items-center gap-1.5 text-white/60 sm:flex">
          <span className="text-[13px]">
            <NodeGlyph />
          </span>
          confirmed
        </span>
        <span className="hidden text-white/35 sm:block">└ open http://localhost:3000</span>
      </span>
      {/* Client fragment */}
      <span className="float absolute right-[6%] top-[38%] hidden w-[46%] sm:block rounded-xl border border-white/50 bg-white/80 p-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl [--float-delay:1.5s] [--tilt:2deg]">
        <span className="flex items-center gap-2">
          <Avatar name="You" tone={4} size="size-5 text-[8px]" className="ring-0" />
          <span className="text-[12px] font-medium">@you</span>
          <span className="text-[11px] text-ink/40">now</span>
        </span>
        <span className="mt-1.5 block text-[12px] leading-snug text-ink/70">First cast from my own node.</span>
      </span>
      <Cursor className="float absolute right-[30%] top-[66%] text-white [--float-dur:5s]" />
    </span>
  );
}

function VouchersPoster() {
  return (
    <span aria-hidden className="absolute inset-0">
      {/* Voucher ticket with a perforated stub */}
      <span className="float absolute left-1/2 top-[36%] flex w-[64%] sm:top-[42%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/50 bg-white/85 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl [--float-dur:8s] [--tilt:-2deg]">
        <span className="flex-1 p-4">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink/45">Voucher</span>
          <span className="mt-1 block text-[18px] font-medium tracking-[-0.02em] text-ink">CY-7Q4K-2M</span>
          <span className="mt-3 hidden items-center gap-2 text-[11.5px] text-ink/55 sm:flex">
            <Avatar name="Juno" tone={1} size="size-5 text-[8px]" className="ring-0" />
            Redeemed by @juno
          </span>
        </span>
        <span className="relative grid w-[30%] place-items-center border-l border-dashed border-ink/20 bg-paper/70">
          <span className="absolute -left-2 -top-2 size-4 rounded-full bg-[#1b1a18]" />
          <span className="absolute -bottom-2 -left-2 size-4 rounded-full bg-[#1b1a18]" />
          <span className="grid size-8 place-items-center rounded-full bg-ink text-[13px] text-white">✓</span>
        </span>
      </span>
      <Cursor className="float absolute right-[22%] top-[60%] text-white [--float-dur:5s]" />
    </span>
  );
}
