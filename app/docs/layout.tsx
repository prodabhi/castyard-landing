import { OnThisPage } from "@/components/docs/on-this-page";
import { MobileNav, Sidebar } from "@/components/docs/sidebar";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/hero";

/* One fixed frame: 220px sidebar + 640px page (+ 180px "On this page" on wide screens). */
const frame = "mx-auto w-full max-w-[972px] px-4 sm:px-8 xl:max-w-[1200px]";

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return (
    <div className="docs relative min-h-screen overflow-x-clip">
      <Nav frame={frame} />
      <MobileNav />

      <div className={`${frame} lg:grid lg:grid-cols-[220px_640px] lg:gap-12 xl:grid-cols-[220px_640px_180px]`}>
        <aside className="hidden lg:block">
          <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto py-10 pr-2">
            <Sidebar />
          </div>
        </aside>
        <main className="mx-auto w-full min-w-0 max-w-[640px] pb-20 pt-8 sm:pt-10 lg:mx-0">{children}</main>
        <aside className="hidden xl:block">
          <div className="sticky top-16 py-10">
            <OnThisPage />
          </div>
        </aside>
      </div>

      <Footer frame={frame} />
    </div>
  );
}
