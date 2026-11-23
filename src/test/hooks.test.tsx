import {act, render, renderHook, screen} from '@testing-library/react';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {useInView} from '../hooks/useInView';
import {getInitialTheme, parseStoredTheme, useTheme} from '../hooks/useTheme';

function InViewTestHarness({disabled = false}: {disabled?: boolean}) {
  const {ref, inView} = useInView<HTMLDivElement>({disabled});
  return (
    <div ref={ref} data-testid="observed">
      {inView ? 'drawn' : 'pending'}
    </div>
  );
}

describe('custom hooks', () => {
  const originalIntersectionObserver = globalThis.IntersectionObserver;

  afterEach(() => {
    globalThis.IntersectionObserver = originalIntersectionObserver;
    vi.restoreAllMocks();
  });

  it('toggles between light and dark plum themes and persists choice (Blue Pill)', () => {
    const {result} = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem('charts-studio-theme')).toBe('dark');
  });

  it('ignores corrupted localStorage theme values and storage errors (Red Pill)', () => {
    expect(parseStoredTheme('neon-cyber')).toBeNull();
    expect(parseStoredTheme('')).toBeNull();

    window.localStorage.setItem('charts-studio-theme', 'invalid-theme');
    expect(getInitialTheme()).toBe('light');

    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    expect(() => getInitialTheme()).not.toThrow();
    expect(getInitialTheme()).toBe('light');
  });

  it('triggers inView via IntersectionObserver when element enters viewport (Blue Pill)', () => {
    let observerCallback: IntersectionObserverCallback | null = null;
    const disconnect = vi.fn();

    class MockIntersectionObserver {
      constructor(cb: IntersectionObserverCallback) {
        observerCallback = cb;
      }
      observe() {}
      unobserve() {}
      disconnect = disconnect;
    }

    globalThis.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;

    render(<InViewTestHarness />);
    expect(screen.getByTestId('observed')).toHaveTextContent('pending');

    act(() => {
      observerCallback?.(
        [{isIntersecting: true} as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(screen.getByTestId('observed')).toHaveTextContent('drawn');
    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it('falls back immediately to drawn state when IntersectionObserver is missing or disabled (Red Pill)', () => {
    // Simulate missing IntersectionObserver
    // @ts-expect-error testing missing global in older environments
    globalThis.IntersectionObserver = undefined;

    const {unmount} = render(<InViewTestHarness />);
    expect(screen.getByTestId('observed')).toHaveTextContent('drawn');
    unmount();

    render(<InViewTestHarness disabled />);
    expect(screen.getByTestId('observed')).toHaveTextContent('drawn');
  });
});
