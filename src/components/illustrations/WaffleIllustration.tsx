import type {CSSProperties} from 'react';
import {SparkleCross} from './SparkleCross';

interface IllustrationProps {
  isDrawn: boolean;
}

const TOP_SWOOSHES = [
  'M 64 52 C 138 22, 265 72, 356 36',
  'M 68 60 C 142 30, 269 80, 360 44',
  'M 72 68 C 146 38, 273 88, 364 52',
  'M 76 76 C 150 46, 277 96, 368 60',
];

const BOTTOM_SWOOSHES = [
  'M 54 282 C 142 314, 268 264, 358 298',
  'M 58 290 C 146 322, 272 272, 362 306',
  'M 62 298 C 150 330, 276 280, 366 314',
  'M 66 306 C 154 338, 280 288, 370 322',
];

interface WaffleCell {
  key: string;
  x: number;
  y: number;
  rotate: number;
  filled: boolean;
  delayMs: number;
}

const WAFFLE_CELLS: WaffleCell[] = Array.from({length: 25}, (_, index) => {
  const row = Math.floor(index / 5);
  const col = index % 5;
  const waveY = Math.sin(col * 0.8 + row * 0.35) * 4.8;
  const waveX = Math.cos(row * 0.65) * 2.2;
  const rotate = Math.cos(col * 0.8 + row * 0.35) * 2.6;
  const bottomUpOrder = (4 - row) * 5 + col;

  return {
    key: `cell-${row}-${col}`,
    x: 117 + col * 38 + waveX,
    y: 80 + row * 38 + waveY,
    rotate,
    filled: bottomUpOrder < 14,
    delayMs: 140 + bottomUpOrder * 26,
  };
});

export function WaffleIllustration({isDrawn}: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 340"
      className={`h-auto w-full max-w-[420px] ${isDrawn ? 'is-drawn' : ''}`}
      fill="none"
    >
      <g>
        {TOP_SWOOSHES.map((d, index) => (
          <path
            key={`top-swoosh-${index}`}
            d={d}
            stroke="var(--waffle-line)"
            strokeWidth={1.85}
            strokeLinecap="round"
            pathLength={1}
            className="draw-stroke hover-thicken-thin"
            style={
              {
                '--draw-delay': `${index * 65}ms`,
                '--draw-duration': '820ms',
              } as CSSProperties
            }
          />
        ))}
      </g>

      <g>
        {WAFFLE_CELLS.map((cell) => {
          const cx = cell.x + 14.5;
          const cy = cell.y + 14.5;
          return (
            <g
              key={cell.key}
              transform={`rotate(${cell.rotate.toFixed(2)} ${cx.toFixed(1)} ${cy.toFixed(1)})`}
            >
              {cell.filled && (
                <rect
                  x={cell.x}
                  y={cell.y}
                  width={29}
                  height={29}
                  rx={7}
                  fill="var(--waffle-fill)"
                  className="fill-reveal"
                  style={
                    {
                      '--fill-delay': `${cell.delayMs + 160}ms`,
                    } as CSSProperties
                  }
                />
              )}
              <rect
                x={cell.x}
                y={cell.y}
                width={29}
                height={29}
                rx={7}
                stroke="var(--waffle-line)"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                className="draw-stroke hover-thicken"
                style={
                  {
                    '--draw-delay': `${cell.delayMs}ms`,
                    '--draw-duration': '580ms',
                  } as CSSProperties
                }
              />
            </g>
          );
        })}
      </g>

      <g>
        {BOTTOM_SWOOSHES.map((d, index) => (
          <path
            key={`bottom-swoosh-${index}`}
            d={d}
            stroke="var(--waffle-line)"
            strokeWidth={1.85}
            strokeLinecap="round"
            pathLength={1}
            className="draw-stroke hover-thicken-thin"
            style={
              {
                '--draw-delay': `${380 + index * 65}ms`,
                '--draw-duration': '840ms',
              } as CSSProperties
            }
          />
        ))}
      </g>

      <SparkleCross cx={82} cy={126} size={7} color="var(--waffle-line)" delayMs={620} />
      <SparkleCross cx={342} cy={112} size={8} color="var(--waffle-line)" delayMs={690} />
      <SparkleCross cx={326} cy={236} size={6} color="var(--waffle-line)" delayMs={760} />
    </svg>
  );
}
