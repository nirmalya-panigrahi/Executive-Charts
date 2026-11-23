import {useEffect, useState} from 'react';
import {CHART_TOOLS} from '../data/tools';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {HeroThreadsSvg} from './illustrations/HeroThreadsSvg';

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const [isDrawn, setIsDrawn] = useState<boolean>(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setIsDrawn(true);
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      setIsDrawn(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [reducedMotion]);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32"
    >
      <HeroThreadsSvg isDrawn={isDrawn} />

      <div className="relative z-10 mx-auto max-w-[780px] px-6 text-center">
        <h1
          id="hero-heading"
          className="font-display mx-auto max-w-[16ch] text-[clamp(2.35rem,5.4vw,3.9rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-[var(--ink)] [text-wrap:balance]"
        >
          Chart makers for waffles, bars and flows
        </h1>

        <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-[var(--ink-muted)] sm:text-lg">
          Three focused browser tools for turning raw counts, comparisons, and stages
          into clear charts ready to share.
        </p>

        <div
          aria-label="Jump to chart tool"
          className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
        >
          {CHART_TOOLS.map((tool) => (
            <a
              key={tool.id}
              href={`#${tool.id}`}
              style={
                {
                  '--chip-bg': 'var(--surface)',
                  '--chip-hover': tool.panelBgVar,
                  '--chip-border': tool.lineColorVar,
                } as React.CSSProperties
              }
              className="spring-chip inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[var(--border-hairline)] bg-[var(--chip-bg)] px-5 py-2.5 text-[15px] font-medium text-[var(--ink)] hover:border-[var(--chip-border)] hover:bg-[var(--chip-hover)] whitespace-nowrap shrink-0"
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{backgroundColor: tool.lineColorVar}}
              />
              <span>{tool.shortLabel}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
