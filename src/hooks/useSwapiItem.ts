import { useState, useEffect, useRef } from 'react';
import { SwapiCategory } from '@/types/swapi';
import { SwapiService } from '@/services/swapiService';

export interface ResolvedRef {
  url: string;
  label: string;
  category?: SwapiCategory;
}

export function useSwapiItem<T>(category: SwapiCategory, id?: string) {
  const [item, setItem] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvedRefs, setResolvedRefs] = useState<Record<string, ResolvedRef[]>>({});

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!id) return;

    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    const loadData = async () => {
      try {
        const result = await SwapiService.getById<T>(category, id, controller.signal);
        setItem(result);

        // Resolve reference fields if present
        const refsToFetch: Record<string, string[]> = {};
        const rec = result as Record<string, unknown>;

        if (Array.isArray(rec.films)) refsToFetch.films = rec.films;
        if (Array.isArray(rec.characters)) refsToFetch.characters = rec.characters;
        if (Array.isArray(rec.residents)) refsToFetch.residents = rec.residents;
        if (Array.isArray(rec.pilots)) refsToFetch.pilots = rec.pilots;
        if (Array.isArray(rec.species)) refsToFetch.species = rec.species;
        if (Array.isArray(rec.planets)) refsToFetch.planets = rec.planets;
        if (typeof rec.homeworld === 'string' && rec.homeworld) {
          refsToFetch.homeworld = [rec.homeworld];
        }

        const resolvedMap: Record<string, ResolvedRef[]> = {};
        for (const [key, urls] of Object.entries(refsToFetch)) {
          if (urls.length > 0) {
            resolvedMap[key] = await SwapiService.resolveReferences(urls, controller.signal);
          }
        }
        setResolvedRefs(resolvedMap);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        const msg = err instanceof Error ? err.message : 'Telemetry offline';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [category, id]);

  return { item, loading, error, resolvedRefs };
}
