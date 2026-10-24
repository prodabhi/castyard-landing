import type { Metadata } from "next";
import { Diagram, Section } from "@/components/docs/blocks";
import { Explainer } from "@/components/docs/explainer";

export const metadata: Metadata = {
  title: "Introduction · Castyard docs",
  description: "Run your own Farcaster client, then your own node.",
};

export default function Introduction() {
  return (
    <Section
      id="introduction"
      title="Farcaster on your own node"
      lead="castyard is a Farcaster client you run yourself. It connects to a node: a server that keeps a copy of all Farcaster data. Start with mine, then run your own."
    >
      <Explainer />
      <figure className="mt-10">
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
        <figcaption className="mt-3 text-[13.5px] text-fg/50">Building Castyard (2:54). Me setting it up from scratch.</figcaption>
      </figure>
      <Diagram
        name="big-picture"
        alt="Your laptop runs castyard and holds the app key. It sends a signed cast to a read node over HTTP on port 3381. The read node gossips it to the validators, gets the block back, and castyard reads the cast back as confirmed."
      />
    </Section>
  );
}
