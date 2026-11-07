import React, { useState } from 'react';
import { Film } from '@/types/swapi';
import { useSwapiList } from '@/hooks/useSwapiList';
import { useDebounce } from '@/hooks/useDebounce';
import { TerminalHeader } from '@/components/ui/TerminalHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilmCard } from '@/components/cards/FilmCard';
import { GalacticLoader } from '@/components/cinematic/GalacticLoader';
import { ErrorState, EmptyState } from '@/components/ui/EmptyState';
import { OpeningCrawlModal } from '@/components/cinematic/OpeningCrawlModal';

export const FilmsPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearch = useDebounce(searchInput, 400);

  const {
    items: films,
    totalCount,
    loading,
    error,
    retry,
    handleSearchChange,
  } = useSwapiList<Film>({
    category: 'films',
    initialSearch: debouncedSearch,
  });

  // Keep search state synchronized with debounced query
  React.useEffect(() => {
    handleSearchChange(debouncedSearch);
  }, [debouncedSearch]);

  // Crawl modal state
  const [selectedFilmForCrawl, setSelectedFilmForCrawl] = useState<Film | null>(null);

  // Sort films by episode_id
  const sortedFilms = [...films].sort((a, b) => a.episode_id - b.episode_id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
      <TerminalHeader
        sectionNumber="01"
        categoryTitle="FILMS"
        subtitle="THE CANONICAL SAGAS & CHRONICLES"
        description="Comprehensive records of galactic wars, the rise and fall of the Galactic Empire, the ancient Jedi Order, and the restoration of freedom."
        totalRecords={totalCount}
      />

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Filter chronicles by film title or director..."
          totalResults={totalCount}
        />
      </div>

      {/* Content Area */}
      {loading ? (
        <GalacticLoader
          label="ACCESSING SAGA HOLOCRONS"
          sublabel="DECRYPTING CANON EPISODE ARCHIVES..."
        />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : sortedFilms.length === 0 ? (
        <EmptyState
          query={searchInput}
          onClear={() => setSearchInput('')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFilms.map((film) => (
            <FilmCard
              key={film.episode_id}
              film={film}
              onOpenCrawl={(f) => setSelectedFilmForCrawl(f)}
            />
          ))}
        </div>
      )}

      {/* 3D Opening Crawl Modal */}
      {selectedFilmForCrawl && (
        <OpeningCrawlModal
          isOpen={Boolean(selectedFilmForCrawl)}
          onClose={() => setSelectedFilmForCrawl(null)}
          title={selectedFilmForCrawl.title}
          episodeId={selectedFilmForCrawl.episode_id}
          crawlText={selectedFilmForCrawl.opening_crawl}
        />
      )}
    </div>
  );
};
