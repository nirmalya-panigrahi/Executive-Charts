import type {CSSProperties} from 'react';
import {SparkleCross} from './SparkleCross';

interface IllustrationProps {
  isDrawn: boolean;
}

interface SankeyRibbon {
  id: string;
  areaPath: string;
  edges: [string, string];
  threads: string[];
  delayMs: number;
}

const RIBBONS: SankeyRibbon[] = [
  {
    id: 'left-crossing',
    areaPath:
      'M 224 62 C 224 148, 62 178, 62 276 L 114 276 C 114 188, 266 154, 266 62 Z',
    edges: [
      'M 224 62 C 224 148, 62 178, 62 276',
      'M 266 62 C 266 154, 114 188, 114 276',
    ],
    threads: [
      'M 234 62 C 234 150, 75 180, 75 276',
      'M 245 62 C 245 151, 88 182, 88 276',
      'M 256 62 C 256 153, 101 185, 101 276',
    ],
    delayMs: 160,
  },
  {
    id: 'right-crossing',
    areaPath:
      'M 152 62 C 152 154, 306 184, 306 276 L 356 276 C 356 178, 194 146, 194 62 Z',
    edges: [
      'M 152 62 C 152 154, 306 184, 306 276',
      'M 194 62 C 194 146, 356 178, 356 276',
    ],
    threads: [
      'M 162 62 C 162 152, 318 182, 318 276',
      'M 173 62 C 173 150, 331 180, 331 276',
      'M 184 62 C 184 148, 344 179, 344 276',
    ],
    delayMs: 280,
  },
  {
    id: 'center-weave',
    areaPath:
      'M 190 62 C 190 132, 232 192, 232 276 L 188 276 C 188 196, 224 134, 224 62 Z',
    edges: [
      'M 190 62 C 190 132, 232 192, 232 276',
      'M 224 62 C 224 134, 188 196, 188 276',
    ],
    threads: [
      'M 199 62 C 199 132, 199 194, 199 276',
      'M 207 62 C 207 133, 210 194, 210 276',
      'M 216 62 C 216 133, 221 193, 221 276',
    ],
    delayMs: 400,
  },
];

const TARGET_NODES = [
  {x: 46, width: 84, delayMs: 520},
  {x: 168, width: 84, delayMs: 580},
  {x: 290, width: 84, delayMs: 640},
];

export function SankeyIllustration({isDrawn}: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 340"
      className={`h-auto w-full max-w-[420px] ${isDrawn ? 'is-drawn' : ''}`}
      fill="none"
    >
      {/* Crossing ribbons with inner parallel threads */}
      <g>
        {RIBBONS.map((ribbon) => (
          <g key={ribbon.id}>
            <path
              d={ribbon.areaPath}
              fill="var(--sankey-fill)"
              fillOpacity={0.55}
              className="fill-reveal"
              style={
                {
                  '--fill-delay': `${ribbon.delayMs + 220}ms`,
                } as CSSProperties
              }
            />
            {ribbon.edges.map((edge, idx) => (
              <path
                key={`${ribbon.id}-edge-${idx}`}
                d={edge}
                stroke="var(--sankey-line)"
                strokeWidth={2.15}
                strokeLinecap="round"
                pathLength={1}
                className="draw-stroke hover-thicken"
                style={
                  {
                    '--draw-delay': `${ribbon.delayMs + idx * 45}ms`,
                    '--draw-duration': '880ms',
                  } as CSSProperties
                }
              />
            ))}
            {ribbon.threads.map((thread, idx) => (
              <path
                key={`${ribbon.id}-thread-${idx}`}
                d={thread}
                stroke="var(--sankey-line)"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeOpacity={0.85}
                pathLength={1}
                className="draw-stroke hover-thicken-thin"
                style={
                  {
                    '--draw-delay': `${ribbon.delayMs + 110 + idx * 45}ms`,
                    '--draw-duration': '860ms',
                  } as CSSProperties
                }
              />
            ))}
          </g>
        ))}
      </g>

      {/* Top source node */}
      <g>
        <rect
          x={140}
          y={36}
          width={140}
          height={26}
          rx={13}
          fill="var(--sankey-fill)"
          className="fill-reveal"
          style={{'--fill-delay': '180ms'} as CSSProperties}
        />
        <rect
          x={140}
          y={36}
          width={140}
          height={26}
          rx={13}
          stroke="var(--sankey-line)"
          strokeWidth={2.3}
          strokeLinecap="round"
          pathLength={1}
          className="draw-stroke hover-thicken"
          style={
            {
              '--draw-delay': '60ms',
              '--draw-duration': '720ms',
            } as CSSProperties
          }
        />
      </g>

      {/* Bottom three target nodes */}
      <g>
        {TARGET_NODES.map((node, index) => (
          <g key={`target-node-${index}`}>
            <rect
              x={node.x}
              y={276}
              width={node.width}
              height={24}
              rx={12}
              fill="var(--sankey-fill)"
              className="fill-reveal"
              style={
                {
                  '--fill-delay': `${node.delayMs + 140}ms`,
                } as CSSProperties
              }
            />
            <rect
              x={node.x}
              y={276}
              width={node.width}
              height={24}
              rx={12}
              stroke="var(--sankey-line)"
              strokeWidth={2.3}
              strokeLinecap="round"
              pathLength={1}
              className="draw-stroke hover-thicken"
              style={
                {
                  '--draw-delay': `${node.delayMs}ms`,
                  '--draw-duration': '640ms',
                } as CSSProperties
              }
            />
          </g>
        ))}
      </g>

      <SparkleCross cx={78} cy={104} size={7} color="var(--sankey-line)" delayMs={640} />
      <SparkleCross cx={344} cy={108} size={8} color="var(--sankey-line)" delayMs={710} />
      <SparkleCross cx={210} cy={318} size={6} color="var(--sankey-line)" delayMs={780} />
    </svg>
  );
}
