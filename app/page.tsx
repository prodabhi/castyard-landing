import { Demos } from "@/components/demos";
import { Footer } from "@/components/footer";
import { Hero, Nav } from "@/components/hero";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Nav />
      <Hero />
      <Demos />
      <Footer />
    </main>
  );
}
