import Image from "next/image";
import type { ReactNode } from "react";

const Mention = ({ children }: { children: ReactNode }) => <span className="text-[#855DCD]">{children}</span>;

/* Real casts from vouchers, shown like the review cards on ns.com.
   Text, author and date are as they appear on Farcaster. */
const casts: { name: string; username: string; avatar: string; date: string; url: string; text: ReactNode }[] = [
  // fid 1085199, cast 0x0f8be817…
  {
    name: "Vivek ☁️",
    username: "vwakesahu",
    avatar: "/vouchers/vivek.jpg",
    date: "23 Oct 2026",
    url: "https://farcaster.xyz/vwakesahu/0x0f8be817",
    text: (
      <>
        <Mention>@0xabhii</Mention> built <Mention>farcaster.0xabhii.xyz</Mention> which simply lets you run farcaster on
        your own node, I ran the client locally and played with it! Crazy and simple!
      </>
    ),
  },
  // fid 3356490, cast 0xcd981eb2…
  {
    name: "0xshubhs",
    username: "0xshubhs",
    avatar: "/vouchers/shubhs.jpg",
    date: "25 Oct 2026",
    url: "https://farcaster.xyz/0xshubhs/0xcd981eb2",
    text: (
      <>
        Ran my own Farcaster read node using <Mention>@0xabhii</Mention> ’s castyard tutorial. The sync took ~9 hours.
        After that, castyard ran on my laptop and the casts went out through my node.
        <br />
        <br />
        The app key part was the clearest explanation I’ve seen.
        <br />
        <br />
        <Mention>farcaster.0xabhii.xyz</Mention>
      </>
    ),
  },
];

export function VoucherCasts() {
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-2">
      {casts.map((cast) => (
        <a
          key={cast.url}
          href={cast.url}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col rounded-xl border border-ink/10 bg-white p-5 text-left hover:border-ink/25"
        >
          <div className="flex items-center gap-3">
            <Image src={cast.avatar} alt="" width={40} height={40} className="size-10 rounded-full" />
            <div className="min-w-0 flex-1 leading-tight">
              <p className="text-[14.5px] font-semibold text-ink">{cast.name}</p>
              <p className="text-[13.5px] text-ink/50">@{cast.username}</p>
            </div>
            {/* Farcaster's mark */}
            <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-label="Farcaster">
              <rect width="24" height="24" rx="6" fill="#855DCD" />
              <path d="M7 6.5h10V18h-1.6v-5.2a3.4 3.4 0 0 0-6.8 0V18H7z" fill="#fff" />
            </svg>
          </div>
          <p className="mt-4 text-[16px] leading-[1.6] text-ink/85">{cast.text}</p>
          {/* mt-auto: on a row of cards, dates line up at the bottom */}
          <p className="mt-auto pt-4 text-[13px] text-ink/45">{cast.date} · Farcaster</p>
        </a>
      ))}
    </div>
  );
}
