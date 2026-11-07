---
name: motion-animations
description: Framer Motion and Canvas animation techniques for cinematic Star Wars visual experiences.
---

# Motion Animations Skill

## Cinematic Animations
- **Starfield Canvas**: Layered 2D/3D depth canvas starfield with twinkling, gentle drift, and hyperspace jump warp speed mode.
- **Intro Sequence**:
  - Fade-in from complete black.
  - "A long time ago in a galaxy far, far away..." in iconic cyan/blue with soft glow.
  - STAR WARS logo majestic reveal.
  - Smooth camera transition to Galactic Database HUD.
- **Opening Crawl**:
  - CSS 3D perspective (`transform: rotateX(25deg) translateZ(0)` and upward scroll).
  - Authentic crawling tilt and starfield backdrop.
- **Hyperspace Page Transitions**:
  - Subtle blur and warp stretch when navigating between main galactic database sectors.
- **Accessibility**:
  - Respect `prefers-reduced-motion` media queries and provide one-click toggle / skip options.
