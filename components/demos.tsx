"use client";

import Image from "next/image";
import { type CSSProperties, useRef, useState } from "react";
import { VoucherCast } from "./voucher";

// src: a YouTube link (unlisted is fine), a Loom share link, an MP4 URL, a path to a file
// in public/, or a Google Drive share link (low quality). Leave it empty to show "coming soon".
// poster: an image in public/ shown before the video plays (optional).
// length: shown beside the title, e.g. "2:54" (optional).
type Demo = { title: string; note: string; src: string; poster?: string; length?: string };

const demos: Demo[] = [
  {
    title: "Building Castyard",
    note: "From scratch to a working demo.",
    src: "https://youtu.be/_cZi5oGPVNo",
    poster: "/demos/building-castyard.jpg",
    length: "2:54",
  },
  {
    title: "Voucher's demo",
    note: "Someone else trying it out.",
    src: "https://www.loom.com/share/1ee2171b037b42e3aa4c41faba30119c",
    poster: "/demos/vouchers.jpg",
    length: "1:36",
  },
];

/** YouTube watch, share, embed and shorts links → the video id. */
function youtubeId(src: string) {
  const m = src.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  return m?.[1] ?? null;
}

function loomId(src: string) {
  return src.match(/loom\.com\/(?:share|embed)\/([\da-f]{32})/)?.[1] ?? null;
}

function driveId(src: string) {
  if (!/drive\.google\.com/.test(src)) return null;
  return src.match(/\/d\/([\w-]+)/)?.[1] ?? new URL(src).searchParams.get("id");
}

/** Embed URL for hosted players. Drive is a last resort: it only streams a low-quality transcode. */
function embedUrl(src: string) {
  const yt = youtubeId(src);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0&playsinline=1`;
  const loom = loomId(src);
  if (loom) return `https://www.loom.com/embed/${loom}?autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`;
  const drive = driveId(src);
  if (drive) return `https://drive.google.com/file/d/${drive}/preview`;
  return null;
}

/** YouTube/Loom/Drive links play in their embedded player; any other MP4 URL plays in our own <video>. */
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
    <section id="demos" className="scroll-mt-16 border-t border-ink/[0.06] bg-white px-5 py-24 text-ink sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="text-center">
          <h2 className="display text-[clamp(32px,4.4vw,48px)]">See it work</h2>
          <p className="mx-auto mt-3 max-w-[34rem] text-balance font-serif text-[clamp(17px,1.8vw,21px)] leading-[1.45] text-ink/75">
            Me setting it up, and someone else trying it on their own.
          </p>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2">
          {demos.map((d) => (
            <DemoCard key={d.title} {...d} />
          ))}
        </div>
        <VoucherCast />
      </div>
    </section>
  );
}

/** The Farcaster explainer: the six parts of Farcaster, then where castyard fits. */
export const explainer: Demo = {
  title: "Inside Farcaster",
  note: "The six parts of Farcaster, and where castyard fits.",
  src: "/docs/diagrams/castyard-explained-vo.mp4",
  poster: "/demos/understand-farcaster.jpg",
  length: "1:06",
};

/** Hero button: plays the build demo. */
export function WatchDemo() {
  return <VideoPill label="Watch the demo" preview="/demos/preview.mp4" {...demos[0]} />;
}

/** Hero button: plays the Farcaster explainer. */
export function UnderstandFarcaster() {
  return <VideoPill label="Understand Farcaster" preview="/demos/explainer-preview.mp4" width={212} {...explainer} />;
}

/**
 * Hero button that plays a video in a full-screen player. On mouse hover the pill grows in place
 * into a muted preview (pushing the content below down), and shrinks back on leave. Clicking
 * either state opens the full video. `width` is the closed pill's width, to fit the label.
 */
function VideoPill({ label, preview, width, title, src, poster, length }: Demo & { label: string; preview: string; width?: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [open, setOpen] = useState(false);
  const [peek, setPeek] = useState(false);

  // Short delays so passing over the button, or brushing its edge, doesn't make the page jump.
  const setPeekSoon = (next: boolean, ms: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setPeek(next), ms);
  };
  const show = () => {
    clearTimeout(timer.current);
    setPeek(false);
    dialog.current?.showModal();
    setOpen(true);
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        data-open={peek}
        onClick={show}
        onPointerEnter={(e) => e.pointerType === "mouse" && setPeekSoon(true, 80)}
        onPointerLeave={() => setPeekSoon(false, 150)}
        onFocus={(e) => e.currentTarget.matches(":focus-visible") && setPeekSoon(true, 0)}
        onBlur={() => setPeekSoon(false, 0)}
        aria-label={`${label}: ${title}, ${length}`}
        style={width ? ({ "--morph-pill-w": `${width}px` } as CSSProperties) : undefined}
        className="morph relative shrink-0 overflow-hidden border text-[15px] font-medium"
      >
        {/* Closed: the pill label */}
        <span className="morph-label absolute inset-0 flex items-center justify-center gap-2 text-ink">
          <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
            <path d="M2.5 1.5v9l7.5-4.5z" fill="currentColor" />
          </svg>
          {label}
        </span>

        {/* Open: the preview */}
        <span className="morph-media absolute inset-0" aria-hidden>
          {poster && <Image src={poster} alt="" fill sizes="360px" className="object-cover" />}
          {/* Mounted only while open, so the clip loads on first hover and restarts each time. */}
          {peek && (
            <video
              src={preview}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 size-full object-cover"
            />
          )}
          <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-white py-1 pl-2 pr-2.5 text-[12.5px] text-ink">
            <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden>
              <path d="M2.5 1.5v9l7.5-4.5z" fill="currentColor" />
            </svg>
            Watch · {length}
          </span>
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-label={title}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === dialog.current && close()}
        className="m-auto w-[min(1100px,92vw)] overflow-visible bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        <div className="relative aspect-video overflow-hidden rounded-xl bg-ink">
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
      <div className="relative aspect-video overflow-hidden rounded-xl bg-ink">
        {playing ? (
          <Player title={title} src={src} poster={poster} />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
            className="group absolute inset-0 grid place-items-center"
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
                <span className="absolute inset-0 bg-black/20" />
              </>
            )}
            <span className="relative grid size-14 place-items-center rounded-full bg-white text-ink shadow-sm">
              <svg viewBox="0 0 12 12" className="ml-1 size-4" aria-hidden>
                <path d="M2.5 1.5v9l7.5-4.5z" fill="currentColor" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 flex items-start justify-between gap-4 px-3 text-left">
        <span className="min-w-0">
          <span className="block font-serif text-[20px] font-medium">{title}</span>
          <span className="mt-0.5 block text-[14.5px] text-ink/60">{note}</span>
        </span>
        <span className="shrink-0 pt-1 text-[14px] tabular-nums text-ink/45">{src ? length : "Coming soon"}</span>
      </figcaption>
    </figure>
  );
}
