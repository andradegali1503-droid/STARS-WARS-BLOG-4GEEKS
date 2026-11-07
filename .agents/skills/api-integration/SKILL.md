---
name: api-integration
description: Standards and strategies for reliable, resilient REST API integration with SWAPI (Star Wars API).
---

# API Integration Skill: SWAPI

## SWAPI Specifics
- Base URL: `https://swapi.dev/api/`
- Resources:
  - `/films/` (search parameter: `?search=`)
  - `/people/` (search parameter: `?search=`, pagination: `?page=`)
  - `/planets/` (search parameter: `?search=`, pagination: `?page=`)
  - `/starships/` (search parameter: `?search=`, pagination: `?page=`)
  - `/vehicles/` (search parameter: `?search=`, pagination: `?page=`)
  - `/species/` (search parameter: `?search=`, pagination: `?page=`)

## Best Practices
1. **Request De-duplication & In-Memory Cache**: Cache fetched pages and detail records to minimize round trips and improve snappiness.
2. **AbortSignal Support**: Pass `AbortSignal` to all `fetch` requests to cancel outdated searches.
3. **URL Parsing for IDs**: SWAPI objects contain self-referential `url` strings (e.g., `https://swapi.dev/api/people/1/`). Extract IDs cleanly using regex or URL parsing for routing.
4. **Resilience**: Handle SWAPI rate limits or delays gracefully with informative UI messages, timeout handling, and retry buttons.
