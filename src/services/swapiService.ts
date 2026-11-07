import {
  Film,
  Person,
  Planet,
  Starship,
  Vehicle,
  Species,
  SwapiCategory,
  SwapiListResponse
} from '@/types/swapi';

const BASE_URL = 'https://swapi.dev/api';

// In-memory cache to prevent duplicated requests and optimize cinematic responsiveness
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export class SwapiService {
  /**
   * Helper to extract the numeric or string ID from a SWAPI resource URL
   * e.g. "https://swapi.dev/api/people/1/" -> "1"
   */
  static extractIdFromUrl(url?: string): string {
    if (!url) return '';
    const matches = url.match(/\/([0-9]+)\/?$/);
    return matches ? matches[1] : '';
  }

  /**
   * Helper to extract category name from a SWAPI resource URL
   * e.g. "https://swapi.dev/api/planets/1/" -> "planets"
   */
  static extractCategoryFromUrl(url?: string): SwapiCategory | null {
    if (!url) return null;
    const matches = url.match(/swapi\.dev\/api\/([a-z]+)\//);
    return (matches ? matches[1] : null) as SwapiCategory | null;
  }

  /**
   * Safe fetch with caching, abort signal support and JSON parsing
   */
  private static async request<T>(endpointUrl: string, signal?: AbortSignal): Promise<T> {
    // Normalize url protocol to https
    const cleanUrl = endpointUrl.replace(/^http:\/\//i, 'https://');

    const cached = cache.get(cleanUrl);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data as T;
    }

    try {
      const response = await fetch(cleanUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        signal,
      });

      if (!response.ok) {
        throw new Error(`Galactic Archive Error: [${response.status}] ${response.statusText}`);
      }

      const data = await response.json();
      cache.set(cleanUrl, { data, timestamp: Date.now() });
      return data as T;
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        throw err;
      }
      if (err instanceof Error) {
        throw new Error(`Data transmission failed: ${err.message}`);
      }
      throw new Error('An unknown galactic communication disruption occurred.');
    }
  }

  /**
   * Fetch paginated list or search results for a category
   */
  static async getCategoryList<T>(
    category: SwapiCategory,
    page: number = 1,
    search: string = '',
    signal?: AbortSignal
  ): Promise<SwapiListResponse<T>> {
    const params = new URLSearchParams();
    if (page > 1) {
      params.set('page', page.toString());
    }
    if (search.trim()) {
      params.set('search', search.trim());
    }

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const url = `${BASE_URL}/${category}/${queryString}`;
    return this.request<SwapiListResponse<T>>(url, signal);
  }

  /**
   * Fetch a single item by category and ID
   */
  static async getById<T>(
    category: SwapiCategory,
    id: string | number,
    signal?: AbortSignal
  ): Promise<T> {
    const url = `${BASE_URL}/${category}/${id}/`;
    return this.request<T>(url, signal);
  }

  /**
   * Fetch a resource directly by its SWAPI URL
   */
  static async getByUrl<T>(url: string, signal?: AbortSignal): Promise<T> {
    return this.request<T>(url, signal);
  }

  /**
   * Resolves multiple linked resource URLs in parallel (e.g., getting names of homeworld, residents, films)
   */
  static async resolveReferences(urls: string[], signal?: AbortSignal): Promise<{ url: string; label: string; category?: SwapiCategory }[]> {
    if (!urls || urls.length === 0) return [];
    
    // Limit parallel resolution to 8 to avoid overwhelming SWAPI
    const targetUrls = urls.slice(0, 8);
    const promises = targetUrls.map(async (u) => {
      try {
        const data = await this.getByUrl<Record<string, unknown>>(u, signal);
        const label = (data.title || data.name || 'Unknown Subject') as string;
        const category = this.extractCategoryFromUrl(u) || undefined;
        return { url: u, label, category };
      } catch {
        return { url: u, label: `Sector [${this.extractIdFromUrl(u)}]` };
      }
    });

    return Promise.all(promises);
  }
}
