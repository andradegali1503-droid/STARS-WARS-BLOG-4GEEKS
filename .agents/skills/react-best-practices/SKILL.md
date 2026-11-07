---
name: react-best-practices
description: Best practices for React 18 and TypeScript architecture, state management, custom hooks, and rendering performance.
---

# React Best Practices Skill

## Architecture Guidelines
- **Modularity**: Strict separation between view components, domain services, custom hooks, and TypeScript types.
- **Custom Hooks**: Encapsulate API data fetching, pagination, caching, search debouncing, and local storage state into clean hooks (`useSwapi`, `useDebounce`, etc.).
- **AbortController**: Always support cancellation of in-flight fetch requests when components unmount or search queries change.
- **TypeScript First**: Ensure all domain objects (Films, People, Planets, Starships, Vehicles, Species) are strongly typed with explicit interfaces.
- **Error Boundaries & Fallbacks**: Graceful error handling with retry triggers and rich empty/loading states.
- **Performance**: Memoize heavy computations where applicable, avoid unnecessary re-renders with proper dependency arrays.
