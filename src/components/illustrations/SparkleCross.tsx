import type {CSSProperties} from 'react';

interface SparkleCrossProps {
  cx: number;
  cy: number;
  size?: number;
  color: string;
  delayMs?: number;
  strokeWidth?: number;
}

export function SparkleCross({
  cx,
  cy,
  size = 8,
  color,
  delayMs = 450,
  strokeWidth = 2,
}: SparkleCrossProps) {
  const half = size;
  const style = {
    '--draw-delay': `${delayMs}ms`,
    '--draw-duration': '520ms',
  } as CSSProperties;

  return (
    <g aria-hidden="true">
      <line
        x1={cx}
        y1={cy - half}
        x2={cx}
        y2={cy + half}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        pathLength={1}
        className="draw-stroke"
        style={style}
      />
      <line
        x1={cx - half}
        y1={cy}
        x2={cx + half}
        y2={cy}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        pathLength={1}
        className="draw-stroke"
        style={{
          ...style,
          '--draw-delay': `${delayMs + 70}ms`,
        } as CSSProperties}
      />
    </g>
  );
}
