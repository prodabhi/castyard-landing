import { Demos } from "@/components/demos";
import { Faq } from "@/components/faq";
import { Hero, Nav } from "@/components/hero";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Nav />
      <Hero />
      <Demos />
      <Faq />
    </main>
  );
}
