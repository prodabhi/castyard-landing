import { Demos } from "@/components/demos";
import { Faq } from "@/components/faq";
import { Hero, Nav } from "@/components/hero";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <Demos />
        <Faq />
      </main>
    </>
  );
}
