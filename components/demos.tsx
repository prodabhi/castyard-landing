"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Reveal } from "./reveal";
import { Tilt } from "./tilt";

// src: a YouTube link (unlisted is fine), an MP4 URL, a path to a file in public/,
// or a Google Drive share link (low quality). Leave it empty to show "coming soon".
// poster: an image in public/ shown before the video plays (optional).
// length: shown beside the title, e.g. "2:54" (optional).
type Demo = { title: string; note: string; src: string; poster?: string; length?: string };

const demos: Demo[] = [
  {
    title: "Building Castyard",
    note: "From an empty folder to a live client.",
    src: "https://youtu.be/_cZi5oGPVNo",
    poster: "/demos/building-castyard.jpg",
    length: "2:54",
  },
  { title: "Vouchers", note: "People vouching for Castyard.", src: "" },
];

/** YouTube watch, share, embed and shorts links → the video id. */
function youtubeId(src: string) {
  const m = src.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  return m?.[1] ?? null;
}

function driveId(src: string) {
  if (!/drive\.google\.com/.test(src)) return null;
  return src.match(/\/d\/([\w-]+)/)?.[1] ?? new URL(src).searchParams.get("id");
}

/** Embed URL for hosted players. Drive is a last resort: it only streams a low-quality transcode. */
function embedUrl(src: string) {
  const yt = youtubeId(src);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0&playsinline=1`;
  const drive = driveId(src);
  if (drive) return `https://drive.google.com/file/d/${drive}/preview`;
  return null;
}

/** YouTube/Drive links play in their embedded player; any other MP4 URL plays in our own <video>. */
function Player({ title, src, poster }: { title: string; src: string; poster?: string }) {
  const [failed, setFailed] = useState(false);
  const embed = src ? embedUrl(src) : null;

  if (!src || failed) {
    return (
      <p className="absolute inset-0 grid place-items-center font-mono text-[13px] text-white/45">coming soon</p>
    );
  }
  if (embed) {
    return (
      <iframe
        src={embed}
        title={title}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
      />
    );
  }
  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      controls
      playsInline
      preload="auto"
      onError={() => setFailed(true)}
      className="absolute inset-0 size-full bg-black object-contain"
    />
  );
}

export function Demos() {
  return (
    <section id="demos" className="flex min-h-[100svh] items-center bg-paper py-24 text-ink">
      <div className="mx-auto grid w-full max-w-[1180px] gap-x-6 gap-y-12 px-5 sm:px-8 md:grid-cols-2">
        {demos.map((d, i) => (
          <Reveal key={d.title} delay={i * 100}>
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
  const { title, src, poster } = demos[0];

  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
        className="h-watch inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] py-1.5 pl-1.5 pr-5 text-[14px] text-white/85 hover:border-white/30 hover:text-white"
      >
        <span className="h-watch-dot grid size-7 place-items-center rounded-full bg-white text-ink">
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
          {/* Unmounted when closed, so playback stops. */}
          {open && <Player title={title} src={src} poster={poster} />}
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

function DemoCard({ title, note, src, poster, length }: Demo) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure>
      <Tilt disabled={playing} className="relative aspect-video overflow-hidden rounded-[20px] bg-ink">
        {playing ? (
          <Player title={title} src={src} poster={poster} />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
            className="group absolute inset-0 grid place-items-center bg-[radial-gradient(70%_70%_at_50%_50%,rgba(255,255,255,0.08),transparent)]"
          >
            {poster && (
              <>
                <Image
                  src={poster}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />
              </>
            )}
            <span className="relative grid size-16 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:scale-105">
              <svg viewBox="0 0 12 12" className="ml-1 size-4" aria-hidden>
                <path d="M2.5 1.5v9l7.5-4.5z" fill="currentColor" />
              </svg>
            </span>
          </button>
        )}
      </Tilt>
      <figcaption className="mt-5 px-1">
        <span className="flex items-baseline justify-between gap-4">
          <span className="text-[19px] font-medium tracking-[-0.02em]">{title}</span>
          <span className="text-[14px] tabular-nums text-ink/40">{src ? length : "Coming soon"}</span>
        </span>
        <span className="mt-1 block text-[14.5px] text-ink/50">{note}</span>
      </figcaption>
    </figure>
  );
}
