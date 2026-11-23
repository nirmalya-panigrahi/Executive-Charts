import type {CSSProperties} from 'react';
import {SparkleCross} from './SparkleCross';

interface IllustrationProps {
  isDrawn: boolean;
}

interface PillBar {
  x: number;
  y: number;
  height: number;
  tinted: boolean;
  delayMs: number;
}

const PILL_BARS: PillBar[] = [
  {x: 75, y: 170, height: 86, tinted: true, delayMs: 120},
  {x: 123, y: 118, height: 142, tinted: false, delayMs: 185},
  {x: 171, y: 152, height: 108, tinted: true, delayMs: 250},
  {x: 219, y: 88, height: 168, tinted: false, delayMs: 315},
  {x: 267, y: 132, height: 122, tinted: true, delayMs: 380},
  {x: 315, y: 104, height: 152, tinted: false, delayMs: 445},
];

const TOP_RIBBON = [
  'M 54 146 C 95 140, 114 96, 146 102 C 174 108, 178 134, 198 124 C 218 114, 224 68, 246 70 C 268 72, 276 112, 294 108 C 314 104, 326 84, 366 86',
  'M 54 139 C 95 133, 114 89, 146 95 C 174 101, 178 127, 198 117 C 218 107, 224 61, 246 63 C 268 65, 276 105, 294 101 C 314 97, 326 77, 366 79',
  'M 54 132 C 95 126, 114 82, 146 88 C 174 94, 178 120, 198 110 C 218 100, 224 54, 246 56 C 268 58, 276 98, 294 94 C 314 90, 326 70, 366 72',
  'M 54 125 C 95 119, 114 75, 146 81 C 174 87, 178 113, 198 103 C 218 93, 224 47, 246 49 C 268 51, 276 91, 294 87 C 314 83, 326 63, 366 65',
];

const GROUND_WAVES = [
  'M 46 282 C 108 266, 162 296, 218 280 C 274 264, 326 294, 376 278',
  'M 58 292 C 118 278, 168 305, 222 290 C 276 276, 324 303, 368 288',
];

export function BarsIllustration({isDrawn}: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 340"
      className={`h-auto w-full max-w-[420px] ${isDrawn ? 'is-drawn' : ''}`}
      fill="none"
    >
      <g>
        {TOP_RIBBON.map((d, index) => (
          <path
            key={`bar-ribbon-${index}`}
            d={d}
            stroke="var(--bars-line)"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className="draw-stroke hover-thicken-thin"
            style={
              {
                '--draw-delay': `${60 + index * 60}ms`,
                '--draw-duration': '940ms',
              } as CSSProperties
            }
          />
        ))}
      </g>

      <g>
        {PILL_BARS.map((bar, index) => (
          <g key={`pill-bar-${index}`}>
            {bar.tinted && (
              <rect
                x={bar.x}
                y={bar.y}
                width={30}
                height={bar.height}
                rx={15}
                fill="var(--bars-fill)"
                className="fill-reveal"
                style={
                  {
                    '--fill-delay': `${bar.delayMs + 180}ms`,
                  } as CSSProperties
                }
              />
            )}
            <rect
              x={bar.x}
              y={bar.y}
              width={30}
              height={bar.height}
              rx={15}
              stroke="var(--bars-line)"
              strokeWidth={2.3}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              className="draw-stroke hover-thicken"
              style={
                {
                  '--draw-delay': `${bar.delayMs}ms`,
                  '--draw-duration': '760ms',
                } as CSSProperties
              }
            />
          </g>
        ))}
      </g>

      <g>
        {GROUND_WAVES.map((d, index) => (
          <path
            key={`ground-wave-${index}`}
            d={d}
            stroke="var(--bars-line)"
            strokeWidth={index === 0 ? 2.2 : 1.65}
            strokeLinecap="round"
            pathLength={1}
            className="draw-stroke hover-thicken-thin"
            style={
              {
                '--draw-delay': `${440 + index * 85}ms`,
                '--draw-duration': '840ms',
              } as CSSProperties
            }
          />
        ))}
      </g>

      <SparkleCross cx={68} cy={88} size={7} color="var(--bars-line)" delayMs={620} />
      <SparkleCross cx={354} cy={52} size={8} color="var(--bars-line)" delayMs={690} />
      <SparkleCross cx={108} cy={306} size={6} color="var(--bars-line)" delayMs={760} />
    </svg>
  );
}
