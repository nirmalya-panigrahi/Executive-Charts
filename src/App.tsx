/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {Footer} from './components/Footer';
import {HeroSection} from './components/HeroSection';
import {MoreFromStudio} from './components/MoreFromStudio';
import {ToolSection} from './components/ToolSection';
import {CHART_TOOLS} from './data/tools';
import {useTheme} from './hooks/useTheme';

export default function App() {
  useTheme();

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--paper)]"
      >
        Skip to content
      </a>

      <main id="main-content">
        <HeroSection />

        <div className="space-y-4 sm:space-y-8">
          {CHART_TOOLS.map((tool) => (
            <ToolSection key={tool.id} tool={tool} />
          ))}
        </div>

        <MoreFromStudio />
      </main>

      <Footer />
    </div>
  );
}
