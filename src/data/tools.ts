export type ToolId = 'waffle' | 'bars' | 'sankey';

export interface ChartTool {
  id: ToolId;
  name: string;
  shortLabel: string;
  liveUrl: string;
  repoUrl: string;
  description: string;
  goodFor: [string, string, string];
  imageSide: 'left' | 'right';
  panelBgVar: string;
  panelHoverBgVar: string;
  lineColorVar: string;
  fillColorVar: string;
}

export interface StudioCategory {
  id: string;
  label: string;
  href: string;
  isCurrent: boolean;
  description: string;
}

export const CHART_TOOLS: readonly ChartTool[] = [
  {
    id: 'waffle',
    name: 'Waffle Chart Studio',
    shortLabel: 'Waffle Chart Studio',
    liveUrl: 'https://nirmalya-panigrahi.github.io/Waffle-Chart-Studio/',
    repoUrl: 'https://github.com/nirmalya-panigrahi/Waffle-Chart-Studio',
    description:
      'Build proportional grid charts in the browser to show parts of a whole at a glance. Adjust grid dimensions, category counts, and cell styling before exporting your chart.',
    goodFor: [
      'Showing survey splits and percentage shares',
      'Comparing progress against a fixed target',
      'Replacing crowded pie charts in reports',
    ],
    imageSide: 'left',
    panelBgVar: 'var(--waffle-panel)',
    panelHoverBgVar: 'var(--waffle-panel-hover)',
    lineColorVar: 'var(--waffle-line)',
    fillColorVar: 'var(--waffle-fill)',
  },
  {
    id: 'bars',
    name: 'Exec Bar Charts',
    shortLabel: 'Exec Bar Charts',
    liveUrl: 'https://nirmalya-panigrahi.github.io/Exec-Bar-Charts/',
    repoUrl: 'https://github.com/nirmalya-panigrahi/Exec-Bar-Charts',
    description:
      'Create clean, presentation-ready bar charts tailored for executive summaries and updates. Focus attention on key comparisons without spreadsheet clutter.',
    goodFor: [
      'Quarterly KPI and revenue comparisons',
      'Ranking categories or team metrics side by side',
      'Slide decks that need fast, readable visuals',
    ],
    imageSide: 'right',
    panelBgVar: 'var(--bars-panel)',
    panelHoverBgVar: 'var(--bars-panel-hover)',
    lineColorVar: 'var(--bars-line)',
    fillColorVar: 'var(--bars-fill)',
  },
  {
    id: 'sankey',
    name: 'Sankey Chart Studio',
    shortLabel: 'Sankey Chart Studio',
    liveUrl: 'https://nirmalya-panigrahi.github.io/Sankey-Chart-Studio/',
    repoUrl: 'https://github.com/nirmalya-panigrahi/Sankey-Chart-Studio',
    description:
      'Map how quantities move, split, and converge across stages using weighted flow ribbons. Trace inputs to outcomes clearly right in your browser.',
    goodFor: [
      'Budget breakdowns from funding sources to spend',
      'User funnel drops and conversion paths',
      'Resource, time, or energy allocation flows',
    ],
    imageSide: 'left',
    panelBgVar: 'var(--sankey-panel)',
    panelHoverBgVar: 'var(--sankey-panel-hover)',
    lineColorVar: 'var(--sankey-line)',
    fillColorVar: 'var(--sankey-fill)',
  },
] as const;

export const NAV_CATEGORIES: readonly StudioCategory[] = [
  {
    id: 'charts',
    label: 'Charts',
    href: '#top',
    isCurrent: true,
    description: 'Browser-based chart makers for waffle grids, bars, and Sankey flows.',
  },
  {
    id: 'assessments',
    label: 'Assessments',
    href: '#assessments',
    isCurrent: false,
    description: 'Placeholder link for the Assessments category page in the studio.',
  },
  {
    id: 'engineering',
    label: 'Engineering',
    href: '#engineering',
    isCurrent: false,
    description: 'Placeholder link for the Engineering category page in the studio.',
  },
  {
    id: 'coaches',
    label: 'Coaches',
    href: '#coaches',
    isCurrent: false,
    description: 'Placeholder link for the Coaches category page in the studio.',
  },
] as const;

export const MORE_CATEGORIES: readonly StudioCategory[] = NAV_CATEGORIES.filter(
  (category) => !category.isCurrent,
);

export function getToolById(id: string): ChartTool | undefined {
  if (!id || typeof id !== 'string') {
    return undefined;
  }
  const normalized = id.trim().toLowerCase();
  return CHART_TOOLS.find((tool) => tool.id === normalized);
}

export function getCategoryById(id: string): StudioCategory | undefined {
  if (!id || typeof id !== 'string') {
    return undefined;
  }
  const normalized = id.trim().toLowerCase();
  return NAV_CATEGORIES.find((category) => category.id === normalized);
}
