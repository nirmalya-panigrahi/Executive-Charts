import type {MouseEvent} from 'react';
import {NAV_CATEGORIES, type StudioCategory} from '../data/tools';
import type {ThemeMode} from '../hooks/useTheme';

interface TopBarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onSelectPlaceholderCategory: (label: string, description: string) => void;
}

export function TopBar({
  theme,
  onToggleTheme,
  onSelectPlaceholderCategory,
}: TopBarProps) {
  const handleCategoryClick = (
    event: MouseEvent<HTMLAnchorElement>,
    category: StudioCategory,
  ) => {
    if (!category.isCurrent) {
      event.preventDefault();
      onSelectPlaceholderCategory(category.label, category.description);
    }
  };

  const handleAllToolsClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onSelectPlaceholderCategory(
      'All tools',
      'Placeholder link for the main studio index across all tool categories.',
    );
  };

  return (
    <header className="mx-auto flex w-full max-w-[1120px] flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-10">
      <a
        href="#all-tools"
        onClick={handleAllToolsClick}
        className="inline-flex min-h-[44px] items-center text-[15px] font-medium text-[var(--ink)] underline-offset-4 hover:underline whitespace-nowrap shrink-0"
      >
        All tools
      </a>

      <div className="flex flex-wrap items-center gap-3 sm:gap-6">
        <nav aria-label="Tool categories" className="flex flex-wrap items-center gap-4 sm:gap-6">
          {NAV_CATEGORIES.map((category) => (
            <a
              key={category.id}
              href={category.href}
              aria-current={category.isCurrent ? 'page' : undefined}
              onClick={(event) => handleCategoryClick(event, category)}
              className={`inline-flex min-h-[44px] items-center text-[15px] whitespace-nowrap shrink-0 transition-colors ${
                category.isCurrent
                  ? 'font-semibold text-[var(--ink)] underline decoration-2 underline-offset-[6px]'
                  : 'font-normal text-[var(--ink-muted)] hover:text-[var(--ink)] hover:underline underline-offset-[6px]'
              }`}
            >
              {category.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={
            theme === 'dark' ? 'Switch to light paper theme' : 'Switch to dark plum theme'
          }
          title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark plum theme'}
          className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--surface)] px-3 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--ink)] whitespace-nowrap shrink-0"
        >
          {theme === 'dark' ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
