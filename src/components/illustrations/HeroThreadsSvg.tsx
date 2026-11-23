import type {CSSProperties} from 'react';
import {SparkleCross} from './SparkleCross';

interface HeroThreadsSvgProps {
  isDrawn: boolean;
}

const PEACH_THREADS = [
  'M -30 92 C 160 36, 330 220, 490 250 C 660 282, 860 112, 1140 165',
  'M -30 105 C 165 49, 335 233, 495 263 C 665 295, 865 125, 1140 178',
  'M -30 118 C 170 62, 340 246, 500 276 C 670 308, 870 138, 1140 191',
  'M -30 131 C 175 75, 345 259, 505 289 C 675 321, 875 151, 1140 204',
];

const MINT_THREADS = [
  'M -20 264 C 200 318, 390 120, 565 148 C 745 178, 880 308, 1130 256',
  'M -20 276 C 202 330, 394 132, 569 160 C 749 190, 884 320, 1130 268',
  'M -20 288 C 204 342, 398 144, 573 172 C 753 202, 888 332, 1130 280',
  'M -20 300 C 206 354, 402 156, 577 184 C 757 214, 892 344, 1130 292',
];

const LAVENDER_THREADS = [
  'M 40 374 C 245 224, 420 56, 610 88 C 795 118, 935 320, 1140 356',
  'M 40 386 C 250 236, 425 68, 615 100 C 800 130, 940 332, 1140 368',
  'M 40 398 C 255 248, 430 80, 620 112 C 805 142, 945 344, 1140 380',
  'M 40 410 C 260 260, 435 92, 625 124 C 810 154, 950 356, 1140 392',
];

export function HeroThreadsSvg({isDrawn}: HeroThreadsSvgProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1100 430"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-50 ${
        isDrawn ? 'is-drawn' : ''
      }`}
      fill="none"
    >
      <g>
        {PEACH_THREADS.map((d, index) => (
          <path
            key={`peach-${index}`}
            d={d}
            stroke="var(--waffle-line)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className="draw-stroke"
            style={
              {
                '--draw-delay': `${index * 65}ms`,
                '--draw-duration': '950ms',
              } as CSSProperties
            }
          />
        ))}
      </g>

      <g>
        {MINT_THREADS.map((d, index) => (
          <path
            key={`mint-${index}`}
            d={d}
            stroke="var(--bars-line)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className="draw-stroke"
            style={
              {
                '--draw-delay': `${180 + index * 65}ms`,
                '--draw-duration': '980ms',
              } as CSSProperties
            }
          />
        ))}
      </g>

      <g>
        {LAVENDER_THREADS.map((d, index) => (
          <path
            key={`lavender-${index}`}
            d={d}
            stroke="var(--sankey-line)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className="draw-stroke"
            style={
              {
                '--draw-delay': `${340 + index * 65}ms`,
                '--draw-duration': '1020ms',
              } as CSSProperties
            }
          />
        ))}
      </g>

      <SparkleCross cx={145} cy={74} size={7} color="var(--waffle-line)" delayMs={420} />
      <SparkleCross cx={942} cy={98} size={8} color="var(--sankey-line)" delayMs={540} />
      <SparkleCross cx={210} cy={340} size={7} color="var(--bars-line)" delayMs={620} />
      <SparkleCross cx={905} cy={334} size={7} color="var(--waffle-line)" delayMs={700} />
    </svg>
  );
}
