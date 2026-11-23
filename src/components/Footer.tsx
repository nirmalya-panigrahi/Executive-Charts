export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1120px] px-6 pb-12 pt-4 sm:px-10">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--border-hairline)] pt-7 text-sm text-[var(--ink-muted)] sm:flex-row">
        <p>Built by Nirmalya Panigrahi · Browser-based chart tools.</p>
        <div className="flex items-center gap-5">
          <a
            href="#top"
            className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-[var(--ink)] hover:underline"
          >
            Back to top
          </a>
          <a
            href="https://github.com/nirmalya-panigrahi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-[var(--ink)] hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
