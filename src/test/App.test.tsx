import {render, screen} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import App from '../App';

describe('Charts Studio landing page integration', () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('renders single H1, three jump chips, three tool sections, and footer (Blue Pill)', () => {
    render(<App />);

    const headings = screen.getAllByRole('heading', {level: 1});
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Chart makers for waffles, bars and flows');

    expect(screen.queryByRole('banner')).not.toBeInTheDocument();

    expect(
      screen.getByRole('link', {name: 'Waffle Chart Studio'}),
    ).toHaveAttribute('href', '#waffle');
    expect(screen.getByRole('link', {name: 'Exec Bar Charts'})).toHaveAttribute(
      'href',
      '#bars',
    );
    expect(
      screen.getByRole('link', {name: 'Sankey Chart Studio'}),
    ).toHaveAttribute('href', '#sankey');

    expect(
      screen.getByRole('link', {name: /Open Waffle Chart Studio/i}),
    ).toHaveAttribute(
      'href',
      'https://nirmalya-panigrahi.github.io/Waffle-Chart-Studio/',
    );
    expect(
      screen.getByRole('link', {name: /Open Exec Bar Charts/i}),
    ).toHaveAttribute(
      'href',
      'https://nirmalya-panigrahi.github.io/Exec-Bar-Charts/',
    );
    expect(
      screen.getByRole('link', {name: /Open Sankey Chart Studio/i}),
    ).toHaveAttribute(
      'href',
      'https://nirmalya-panigrahi.github.io/Sankey-Chart-Studio/',
    );

    expect(screen.queryByRole('link', {name: /Source on GitHub/i})).not.toBeInTheDocument();

    expect(
      screen.getByRole('heading', {name: 'More from the studio'}),
    ).toBeInTheDocument();
    expect(screen.getByText(/Built by Nirmalya Panigrahi/i)).toBeInTheDocument();
  });

  it('marks decorative SVG illustrations as aria-hidden (Blue Pill)', () => {
    const {container} = render(<App />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(4);
    svgs.forEach((svg) => {
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('links Find more apps to https://nirmalya-panigrahi.github.io/ in the same tab (Blue Pill)', () => {
    render(<App />);

    const moreAppsLink = screen.getByRole('link', {name: /Find more apps/i});
    expect(moreAppsLink).toHaveAttribute(
      'href',
      'https://nirmalya-panigrahi.github.io/',
    );
    expect(moreAppsLink).not.toHaveAttribute('target', '_blank');
  });

  it('draws all SVG strokes immediately when prefers-reduced-motion is reduce (Red Pill)', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const {container} = render(<App />);
    const drawnSvgs = container.querySelectorAll('svg.is-drawn');
    expect(drawnSvgs.length).toBe(4);
  });
});
