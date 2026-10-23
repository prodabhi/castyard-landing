import type { Metadata } from "next";
import { Diagram, Section } from "@/components/docs/blocks";

export const metadata: Metadata = {
  title: "Introduction · Castyard docs",
  description: "Run your own Snapchain read node on Google Cloud and a Farcaster client on your laptop.",
};

export default function Introduction() {
  return (
    <Section
      id="introduction"
      title="Farcaster on your own node"
      lead="castyard is a Farcaster client that runs on your laptop. It reads and posts through a Snapchain read node: mine, or one you run yourself. These docs set up both."
    >
      <figure className="mt-8">
        <div className="aspect-video overflow-hidden rounded-xl border border-fg/10 bg-black">
          <iframe
            src="https://www.youtube-nocookie.com/embed/_cZi5oGPVNo?rel=0"
            title="Building Castyard"
            loading="lazy"
            allow="encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            className="size-full border-0"
          />
        </div>
        <figcaption className="mt-3 text-[13.5px] text-fg/50">Building Castyard (2:54): from an empty folder to a live client.</figcaption>
      </figure>
      <Diagram
        name="big-picture"
        alt="Your laptop runs castyard and holds the app key. It sends a signed cast to a read node over HTTP on port 3381. The read node gossips it to the validators, gets the block back, and castyard reads the cast back as confirmed."
      />
    </Section>
  );
}
