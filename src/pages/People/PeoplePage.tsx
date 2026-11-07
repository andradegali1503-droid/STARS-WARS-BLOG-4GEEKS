import React, { useState } from 'react';
import { Person } from '@/types/swapi';
import { useSwapiList } from '@/hooks/useSwapiList';
import { useDebounce } from '@/hooks/useDebounce';
import { TerminalHeader } from '@/components/ui/TerminalHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { PersonCard } from '@/components/cards/PersonCard';
import { GalacticLoader } from '@/components/cinematic/GalacticLoader';
import { ErrorState, EmptyState } from '@/components/ui/EmptyState';

export const PeoplePage: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearch = useDebounce(searchInput, 450);

  const {
    items: people,
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
  } = useSwapiList<Person>({
    category: 'people',
    initialSearch: debouncedSearch,
  });

  React.useEffect(() => {
    handleSearchChange(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
      <TerminalHeader
        sectionNumber="02"
        categoryTitle="CHARACTERS"
        subtitle="HEROES, SITH LORDS & CITIZENS"
        description="Biographical and physical records of legendary warriors, galactic senators, scoundrels, and sentient subjects recorded across all sectors."
        totalRecords={totalCount}
      />

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Query by name (e.g., Luke Skywalker, Vader, Leia)..."
          totalResults={totalCount}
        />
      </div>

      {/* Content */}
      {loading ? (
        <GalacticLoader
          label="SCANNING BIOMETRIC REGISTRY"
          sublabel="TRANSMITTING SUBJECT TELEMETRY..."
        />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : people.length === 0 ? (
        <EmptyState query={searchInput} onClear={() => setSearchInput('')} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {people.map((person) => (
              <PersonCard key={person.url} person={person} />
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
