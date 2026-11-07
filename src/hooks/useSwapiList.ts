import { useState, useEffect, useCallback, useRef } from 'react';
import { SwapiCategory, SwapiListResponse } from '@/types/swapi';
import { SwapiService } from '@/services/swapiService';

interface UseSwapiListOptions {
  category: SwapiCategory;
  initialPage?: number;
  initialSearch?: string;
}

export function useSwapiList<T>({
  category,
  initialPage = 1,
  initialSearch = '',
}: UseSwapiListOptions) {
  const [data, setData] = useState<SwapiListResponse<T> | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [search, setSearch] = useState<string>(initialSearch);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(
    async (currentPage: number, currentSearch: string) => {
      // Abort previous in-flight request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const response = await SwapiService.getCategoryList<T>(
          category,
          currentPage,
          currentSearch,
          controller.signal
        );
        setData(response);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return; // Ignore aborted requests
        }
        const message =
          err instanceof Error ? err.message : 'Failed to retrieve galactic telemetry.';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [category]
  );

  useEffect(() => {
    fetchData(page, search);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData, page, search]);

  const handleSearchChange = (query: string) => {
    setSearch(query);
    setPage(1); // Reset to page 1 on new query
  };

  const handleNextPage = () => {
    if (data?.next) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (data?.previous && page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const retry = () => {
    fetchData(page, search);
  };

  const totalPages = data?.count ? Math.ceil(data.count / 10) : 0;

  return {
    items: data?.results || [],
    totalCount: data?.count || 0,
    page,
    totalPages,
    hasNext: Boolean(data?.next),
    hasPrev: Boolean(data?.previous),
    search,
    loading,
    error,
    setPage,
    handleSearchChange,
    handleNextPage,
    handlePrevPage,
    retry,
  };
}
