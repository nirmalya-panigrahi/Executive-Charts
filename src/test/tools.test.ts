import {describe, expect, it} from 'vitest';
import {
  CHART_TOOLS,
  MORE_CATEGORIES,
  NAV_CATEGORIES,
  getCategoryById,
  getToolById,
} from '../data/tools';

describe('tools data & lookups', () => {
  it('defines the three chart tools with alternating sides and valid URLs (Blue Pill)', () => {
    expect(CHART_TOOLS).toHaveLength(3);
    expect(CHART_TOOLS.map((t) => t.id)).toEqual(['waffle', 'bars', 'sankey']);
    expect(CHART_TOOLS.map((t) => t.imageSide)).toEqual(['left', 'right', 'left']);

    for (const tool of CHART_TOOLS) {
      expect(tool.goodFor).toHaveLength(3);
      expect(tool.liveUrl).toMatch(/^https:\/\//);
      expect(tool.repoUrl).toMatch(/^https:\/\/github\.com\/nirmalya-panigrahi\//);
    }
  });

  it('finds tools and categories case-insensitively (Blue Pill)', () => {
    expect(getToolById('waffle')?.name).toBe('Waffle Chart Studio');
    expect(getToolById('  BARS ')?.name).toBe('Exec Bar Charts');
    expect(getCategoryById('Charts')?.isCurrent).toBe(true);
    expect(MORE_CATEGORIES.map((c) => c.label)).toEqual([
      'Assessments',
      'Engineering',
      'Coaches',
    ]);
    expect(NAV_CATEGORIES).toHaveLength(4);
  });

  it('returns undefined for invalid, empty, or unknown IDs (Red Pill)', () => {
    expect(getToolById('')).toBeUndefined();
    expect(getToolById('   ')).toBeUndefined();
    expect(getToolById('pie-chart')).toBeUndefined();
    expect(getToolById(null as unknown as string)).toBeUndefined();

    expect(getCategoryById('')).toBeUndefined();
    expect(getCategoryById('unknown')).toBeUndefined();
    expect(getCategoryById(undefined as unknown as string)).toBeUndefined();
  });
});
