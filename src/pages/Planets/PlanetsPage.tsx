import React, { useState } from 'react';
import { Planet } from '@/types/swapi';
import { useSwapiList } from '@/hooks/useSwapiList';
import { useDebounce } from '@/hooks/useDebounce';
import { TerminalHeader } from '@/components/ui/TerminalHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { PlanetCard } from '@/components/cards/PlanetCard';
import { GalacticLoader } from '@/components/cinematic/GalacticLoader';
import { ErrorState, EmptyState } from '@/components/ui/EmptyState';

export const PlanetsPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearch = useDebounce(searchInput, 450);

  const {
    items: planets,
    totalCount,
    page,
    totalPages,
    hasNext,
    hasPrev,
    loading,
    error,
    setPage,
    handleSearchChange,
    handleNextPage,
    handlePrevPage,
    retry,
  } = useSwapiList<Planet>({
    category: 'planets',
    initialSearch: debouncedSearch,
  });

  React.useEffect(() => {
    handleSearchChange(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
      <TerminalHeader
        sectionNumber="03"
        categoryTitle="PLANETS"
        subtitle="CELESTIAL WORLDS & STAR SYSTEMS"
        description="Atmospheric conditions, surface topographies, planetary diameters, and indigenous populaces of the Core Worlds and Outer Rim."
        totalRecords={totalCount}
      />

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Query world designation (e.g., Tatooine, Hoth, Coruscant)..."
          totalResults={totalCount}
        />
      </div>

      {/* Content */}
      {loading ? (
        <GalacticLoader
          label="SCANNING HYPERLANE NAVIGATION CHARTS"
          sublabel="TRIANGULATING STELLAR BODY TELEMETRY..."
        />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : planets.length === 0 ? (
        <EmptyState query={searchInput} onClear={() => setSearchInput('')} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {planets.map((planet) => (
              <PlanetCard key={planet.url} planet={planet} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            onPrev={handlePrevPage}
            onNext={handleNextPage}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        </>
      )}
    </div>
  );
};
