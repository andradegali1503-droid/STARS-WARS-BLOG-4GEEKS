---
name: testing-qa
description: Verification, automated testing, responsive inspection, and code quality audits for Star Wars Galactic Database.
---

# Testing & QA Skill

## Verification Checklist
1. **Compilation & Linting**:
   - `npx tsc --noEmit` checks clean TypeScript types.
   - Vite build completes without errors or asset resolution failures.
2. **Feature Coverage**:
   - All 6 SWAPI categories accessible (Films, People, Planets, Starships, Vehicles, Species).
   - Search functionality queries SWAPI correctly with debouncing.
   - Pagination works with next/prev buttons and direct page counters.
   - Detailed modal or view shows all required attributes and relational navigation.
   - Cinematic Intro runs, respects `localStorage` skip setting and `prefers-reduced-motion`.
   - Opening crawl renders with 3D perspective.
   - Responsive layout is solid across Mobile (<640px), Tablet (768px-1024px), and Desktop (>1024px).
   - Accessible keyboard navigation and contrast ratios.
