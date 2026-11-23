import type {CSSProperties} from 'react';
import type {ChartTool} from '../data/tools';
import {useInView} from '../hooks/useInView';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {BarsIllustration} from './illustrations/BarsIllustration';
import {SankeyIllustration} from './illustrations/SankeyIllustration';
import {WaffleIllustration} from './illustrations/WaffleIllustration';

interface ToolSectionProps {
  tool: ChartTool;
}

function renderIllustration(toolId: ChartTool['id'], isDrawn: boolean) {
  switch (toolId) {
    case 'waffle':
      return <WaffleIllustration isDrawn={isDrawn} />;
    case 'bars':
      return <BarsIllustration isDrawn={isDrawn} />;
    case 'sankey':
      return <SankeyIllustration isDrawn={isDrawn} />;
  }
}

export function ToolSection({tool}: ToolSectionProps) {
  const reducedMotion = useReducedMotion();
  const {ref, inView} = useInView<HTMLElement>({
    threshold: 0.22,
    triggerOnce: true,
    disabled: reducedMotion,
  });

  const isPanelRight = tool.imageSide === 'right';
  const panelStyle = {
    '--panel-bg': tool.panelBgVar,
    '--panel-hover': tool.panelHoverBgVar,
    '--tool-line': tool.lineColorVar,
  } as CSSProperties;

  return (
    <section
      id={tool.id}
      ref={ref}
      aria-labelledby={`${tool.id}-heading`}
      className="mx-auto w-full max-w-[1120px] px-6 py-12 sm:px-10 sm:py-16"
    >
      <div className="grid grid-cols-1 items-center gap-8 min-[800px]:grid-cols-2 min-[800px]:gap-14">
        <div
          style={panelStyle}
          className={`spring-panel ${
            isPanelRight ? 'spring-panel-alt min-[800px]:order-2' : ''
          } flex min-h-[290px] items-center justify-center rounded-[32px] bg-[var(--panel-bg)] p-6 hover:bg-[var(--panel-hover)] sm:min-h-[340px] sm:p-9`}
        >
          {renderIllustration(tool.id, inView)}
        </div>

        <div className={isPanelRight ? 'min-[800px]:order-1' : ''}>
          <h2
            id={`${tool.id}-heading`}
            className="font-display text-[clamp(1.75rem,3.2vw,2.35rem)] leading-[1.15] font-semibold tracking-[-0.015em] text-[var(--ink)]"
          >
            {tool.name}
          </h2>

          <p className="mt-4 max-w-[48ch] text-base leading-[1.65] text-[var(--ink-muted)] sm:text-[17px]">
            {tool.description}
          </p>

          <p className="mt-6 text-sm font-semibold text-[var(--ink)]">Good for</p>
          <ul className="mt-2.5 space-y-2.5 text-[15px] leading-relaxed text-[var(--ink-muted)]">
            {tool.goodFor.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 14 14"
                  className="mt-1.5 h-3.5 w-3.5 shrink-0"
                  fill="none"
                >
                  <circle
                    cx="7"
                    cy="7"
                    r="3.2"
                    stroke={tool.lineColorVar}
                    strokeWidth="2.2"
                  />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={tool.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={
                {
                  '--btn-border': tool.lineColorVar,
                  '--btn-hover': tool.panelBgVar,
                } as CSSProperties
              }
              className="spring-chip inline-flex min-h-[44px] items-center gap-2.5 rounded-full border-2 border-[var(--btn-border)] bg-transparent px-6 py-2.5 text-[15px] font-semibold text-[var(--ink)] hover:bg-[var(--btn-hover)] whitespace-nowrap shrink-0"
            >
              <span>Open {tool.name}</span>
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
      </div>
    </section>
  );
}
