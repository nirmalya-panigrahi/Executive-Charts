export function MoreFromStudio() {
  return (
    <section
      aria-labelledby="more-from-studio-heading"
      className="mx-auto w-full max-w-[1120px] px-6 py-16 sm:px-10 sm:py-20"
    >
      <div className="border-t border-[var(--border-hairline)] pt-12 text-center">
        <h2
          id="more-from-studio-heading"
          className="font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--ink)] sm:text-[1.75rem]"
        >
          More from the studio
        </h2>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="https://nirmalya-panigrahi.github.io/"
            className="spring-chip inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--surface)] px-6 py-2.5 text-[15px] font-medium text-[var(--ink)] hover:border-[var(--ink)] whitespace-nowrap shrink-0"
          >
            <span>Find more apps</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 18 18"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 9h10M10 5l4 4-4 4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
