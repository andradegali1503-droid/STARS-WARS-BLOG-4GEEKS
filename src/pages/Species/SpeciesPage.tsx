import React, { useState } from 'react';
import { Species } from '@/types/swapi';
import { useSwapiList } from '@/hooks/useSwapiList';
import { useDebounce } from '@/hooks/useDebounce';
import { TerminalHeader } from '@/components/ui/TerminalHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { SpeciesCard } from '@/components/cards/SpeciesCard';
import { GalacticLoader } from '@/components/cinematic/GalacticLoader';
import { ErrorState, EmptyState } from '@/components/ui/EmptyState';

export const SpeciesPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearch = useDebounce(searchInput, 450);

  const {
    items: speciesList,
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
  } = useSwapiList<Species>({
    category: 'species',
    initialSearch: debouncedSearch,
  });

  React.useEffect(() => {
    handleSearchChange(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
      <TerminalHeader
        sectionNumber="06"
        categoryTitle="SPECIES"
        subtitle="SENTIENT LINEAGES & BIO-TYPES"
        description="Biological attributes, spoken dialects, average lifespans, and ancestral homeworlds of galactic sentients."
        totalRecords={totalCount}
      />

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Query species (e.g., Wookiee, Hutt, Twi'lek, Rodian)..."
          totalResults={totalCount}
        />
      </div>

      {/* Content */}
      {loading ? (
        <GalacticLoader
          label="ACCESSING XENOBIOLOGY TAXONOMY"
          sublabel="SEQUENCING CELLULAR & LINGUISTIC TELEMETRY..."
        />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : speciesList.length === 0 ? (
        <EmptyState query={searchInput} onClear={() => setSearchInput('')} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {speciesList.map((sp) => (
              <SpeciesCard key={sp.url} species={sp} />
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
