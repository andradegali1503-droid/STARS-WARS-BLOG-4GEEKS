import React, { useState } from 'react';
import { Starship } from '@/types/swapi';
import { useSwapiList } from '@/hooks/useSwapiList';
import { useDebounce } from '@/hooks/useDebounce';
import { TerminalHeader } from '@/components/ui/TerminalHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { StarshipCard } from '@/components/cards/StarshipCard';
import { GalacticLoader } from '@/components/cinematic/GalacticLoader';
import { ErrorState, EmptyState } from '@/components/ui/EmptyState';

export const StarshipsPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearch = useDebounce(searchInput, 450);

  const {
    items: starships,
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
  } = useSwapiList<Starship>({
    category: 'starships',
    initialSearch: debouncedSearch,
  });

  React.useEffect(() => {
    handleSearchChange(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
      <TerminalHeader
        sectionNumber="04"
        categoryTitle="STARSHIPS"
        subtitle="INTERSTELLAR WARSHIPS & FREIGHTERS"
        description="Imperial Star Destroyers, Rebel starfighters, Corellian cruisers, and hyperdrive-capable capital ships deployed across space."
        totalRecords={totalCount}
      />

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Query starship (e.g., Millennium Falcon, X-wing, Executor)..."
          totalResults={totalCount}
        />
      </div>

      {/* Content */}
      {loading ? (
        <GalacticLoader
          label="ACCESSING FLEET MANIFEST DOCK"
          sublabel="DECRYPTING HYPERDRIVE & SHIP TELEMETRY..."
        />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : starships.length === 0 ? (
        <EmptyState query={searchInput} onClear={() => setSearchInput('')} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {starships.map((ship) => (
              <StarshipCard key={ship.url} starship={ship} />
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
