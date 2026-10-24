"use client";

import { useRef } from "react";
import { explainer } from "../demos";

/** The explainer's parts: where each starts (seconds) and its line from the video. */
const parts = [
  { at: 4, title: "FID", note: "Every account is a number: its FID. Your name, casts and follows all link to it." },
  { at: 12, title: "Custody address", note: "Your recovery phrase controls it. It owns your FID and can do anything." },
  { at: 20, title: "App keys", note: "The custody address approves an app key. The app key signs every cast, like and follow." },
  { at: 27, title: "Snapchain messages", note: "Each cast, like or follow is a signed message. Snapchain is the network that stores them." },
  { at: 35, title: "Read nodes vs validators", note: "Validators decide what gets in, block by block. Read nodes keep a full copy and serve it. No vote." },
  { at: 44, title: "Storage rent", note: "Posts are kept only if your account pays for storage. One unit lasts a year." },
  { at: 49, title: "Where castyard fits", note: "It runs your own read node plus a client, and reads back every post until it’s confirmed." },
];

const time = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/** The Farcaster explainer, with its parts listed below. Clicking a part plays from there. */
export function Explainer() {
  const video = useRef<HTMLVideoElement>(null);
  const { title, src, poster, length } = explainer;

  const play = (at: number) => {
    const v = video.current;
    if (!v) return;
    v.currentTime = at;
    v.play();
    v.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <figure className="mt-8">
      <div className="aspect-video overflow-hidden rounded-xl border border-fg/10 bg-black">
        <video ref={video} src={src} poster={poster} controls playsInline preload="metadata" className="size-full" />
      </div>
      <figcaption className="mt-3 text-[13.5px] text-fg/50">
        {title} ({length}). Farcaster’s six parts, then where castyard fits.
      </figcaption>
      <ol className="mt-5 grid gap-x-6 sm:grid-cols-2">
        {parts.map((p, i) => (
          <li key={p.title} className="border-t border-fg/10">
            <button type="button" onClick={() => play(p.at)} className="group flex w-full gap-3 py-3 text-left">
              <span className="w-5 shrink-0 pt-px text-[13.5px] tabular-nums text-fg/40">{i < 6 ? i + 1 : "→"}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-[15px] font-medium text-fg group-hover:underline">{p.title}</span>
                  <span className="text-[13px] tabular-nums text-fg/40">{time(p.at)}</span>
                </span>
                <span className="mt-0.5 block text-[14px] leading-[1.55] text-fg/60">{p.note}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </figure>
  );
}
