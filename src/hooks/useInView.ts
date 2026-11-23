import {useEffect, useRef, useState} from 'react';

export interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  disabled?: boolean;
}

export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {},
) {
  const {
    threshold = 0.2,
    rootMargin = '0px 0px -40px 0px',
    triggerOnce = true,
    disabled = false,
  } = options;

  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState<boolean>(() => {
    if (disabled) {
      return true;
    }
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (disabled) {
      setInView(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (triggerOnce) {
              observer.disconnect();
            }
          } else if (!triggerOnce) {
            setInView(false);
          }
        }
      },
      {threshold, rootMargin},
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, disabled]);

  return {ref, inView};
}
