import Link from "next/link";
import { DocsSwitcher, PageFoot } from "@/components/docs/docs-nav";
import { Wordmark } from "@/components/primitives";

const links = [
  { label: "Demo", href: "/#demos" },
  { label: "FAQ", href: "/#faq" },
];

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-white">
      {/* Same soft glow as the landing hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px]"
        style={{ background: "radial-gradient(55% 60% at 50% 0%, rgba(255,255,255,0.07), transparent 70%)" }}
      />

      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-ink/70 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Castyard home" className="text-white">
            <Wordmark />
          </Link>
          <div className="flex items-center gap-1 text-[14px] text-white/60">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="h-link rounded-md px-3 py-1.5 transition-colors hover:text-white">
                {l.label}
              </Link>
            ))}
            <span aria-current="page" className="rounded-md px-3 py-1.5 text-white">
              Docs
            </span>
          </div>
        </nav>
      </header>

      <main className="relative mx-auto max-w-[760px] px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
        <DocsSwitcher />
        <div className="mt-12">{children}</div>
        <PageFoot />
      </main>

      <footer className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="flex items-center justify-between border-t border-white/10 py-7">
          <Wordmark className="text-white/80" />
          <span className="text-[13px] text-white/40">© 2026</span>
        </div>
      </footer>
    </div>
  );
}
