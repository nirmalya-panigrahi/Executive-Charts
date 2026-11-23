import {useCallback, useEffect, useState} from 'react';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'charts-studio-theme';

export function parseStoredTheme(value: string | null): ThemeMode | null {
  if (value === 'light' || value === 'dark') {
    return value;
  }
  return null;
}

export function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }

  try {
    const stored = parseStoredTheme(window.localStorage.getItem(STORAGE_KEY));
    if (stored) {
      return stored;
    }
  } catch {
    // Ignore storage access errors in restricted frames
  }

  if (typeof window.matchMedia === 'function') {
    try {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // Ignore matchMedia errors
    }
  }

  return 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage write errors
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return {theme, setTheme, toggleTheme};
}
