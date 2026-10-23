import Image from "next/image";

/* A real cast from a voucher, shown like the review cards on ns.com.
   Text, author and date are as they appear on Farcaster (fid 1085199, cast 0x0f8be817…). */
const cast = {
  name: "Vivek ☁️",
  username: "vwakesahu",
  avatar: "/vouchers/vivek.jpg",
  date: "23 Oct 2026",
  url: "https://farcaster.xyz/vwakesahu/0x0f8be817",
};

export function VoucherCast() {
  return (
    <a
      href={cast.url}
      target="_blank"
      rel="noreferrer"
      className="mx-auto mt-14 block max-w-[560px] rounded-xl border border-ink/10 bg-white p-5 text-left hover:border-ink/25"
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
      <p className="mt-4 text-[16px] leading-[1.6] text-ink/85">
        <span className="text-[#855DCD]">@0xabhii</span> built{" "}
        <span className="text-[#855DCD]">farcaster.0xabhii.xyz</span> which simply lets you run farcaster on your own node, I
        ran the client locally and played with it! Crazy and simple!
      </p>
      <p className="mt-4 text-[13px] text-ink/45">{cast.date} · Farcaster</p>
    </a>
  );
}
