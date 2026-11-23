# Charts — Studio of Browser Chart Makers

![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Tests-Vitest_%2B_RTL-6E9F18?style=flat-square&logo=vitest&logoColor=white)

A single-page **Charts** category landing page introducing three browser-based chart tools with custom pastel SVG line-art illustrations, staggered stroke draw-in animations, dark plum theme support, and SEO structured data.

## Featured Chart Tools

- **Waffle Chart Studio** — Proportional 5x5 grid charts ([Live Tool](https://nirmalya-panigrahi.github.io/Waffle-Chart-Studio/) · [Repository](https://github.com/nirmalya-panigrahi/Waffle-Chart-Studio))
- **Exec Bar Charts** — Presentation-ready executive bar charts ([Live Tool](https://nirmalya-panigrahi.github.io/Exec-Bar-Charts/) · [Repository](https://github.com/nirmalya-panigrahi/Exec-Bar-Charts))
- **Sankey Chart Studio** — Weighted flow diagrams across stages ([Live Tool](https://nirmalya-panigrahi.github.io/Sankey-Chart-Studio/) · [Repository](https://github.com/nirmalya-panigrahi/Sankey-Chart-Studio))

## Architecture

```mermaid
flowchart TD
  Index["index.html (SEO + ItemList JSON-LD + Fonts)"] --> Main["src/main.tsx"]
  Main --> App["src/App.tsx"]
  App --> TopBar["TopBar (Nav + Theme Toggle)"]
  App --> Hero["HeroSection + HeroThreadsSvg"]
  App --> Tools["ToolSection x3 (useInView + useReducedMotion)"]
  Tools --> Waffle["WaffleIllustration"]
  Tools --> Bars["BarsIllustration"]
  Tools --> Sankey["SankeyIllustration"]
  App --> More["MoreFromStudio"]
  App --> Footer["Footer"]
  Data["src/data/tools.ts"] --> Hero
  Data --> Tools
  Data --> TopBar
  Data --> More
```

## Setup & Scripts

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start local dev server on port 3000
npm run dev

# Type-check and run automated tests
npm run lint
npm test

# Build for production
npm run build
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs type-checking, Vitest tests, builds with `VITE_BASE_PATH` matching the repository name, and deploys `./dist` to GitHub Pages.
