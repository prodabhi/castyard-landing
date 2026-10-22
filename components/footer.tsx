import { Wordmark } from "./primitives";

export function Footer() {
  return (
    <footer className="bg-paper pb-10 text-ink">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between border-t border-ink/[0.08] px-5 pt-8 sm:px-8">
        <Wordmark />
        <span className="text-[13px] text-ink/45">© 2026</span>
      </div>
    </footer>
  );
}
