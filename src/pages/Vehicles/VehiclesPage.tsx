import React, { useState } from 'react';
import { Vehicle } from '@/types/swapi';
import { useSwapiList } from '@/hooks/useSwapiList';
import { useDebounce } from '@/hooks/useDebounce';
import { TerminalHeader } from '@/components/ui/TerminalHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { VehicleCard } from '@/components/cards/VehicleCard';
import { GalacticLoader } from '@/components/cinematic/GalacticLoader';
import { ErrorState, EmptyState } from '@/components/ui/EmptyState';

export const VehiclesPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearch = useDebounce(searchInput, 450);

  const {
    items: vehicles,
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
  } = useSwapiList<Vehicle>({
    category: 'vehicles',
    initialSearch: debouncedSearch,
  });

  React.useEffect(() => {
    handleSearchChange(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
      <TerminalHeader
        sectionNumber="05"
        categoryTitle="VEHICLES"
        subtitle="SURFACE SPEEDERS & COMBAT WALKERS"
        description="Repulsorcraft, landspeeders, heavy armored AT-AT walkers, and planetary assault transport machines."
        totalRecords={totalCount}
      />

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Query vehicle (e.g., Sand Crawler, Snowspeeder, TIE bomber)..."
          totalResults={totalCount}
        />
      </div>

      {/* Content */}
      {loading ? (
        <GalacticLoader
          label="ACCESSING MOTOR POOL REGISTRY"
          sublabel="CALIBRATING REPULSORLIFT & ENGINE DIAGNOSTICS..."
        />
      ) : error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : vehicles.length === 0 ? (
        <EmptyState query={searchInput} onClear={() => setSearchInput('')} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {vehicles.map((v) => (
              <VehicleCard key={v.url} vehicle={v} />
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
