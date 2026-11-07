import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Planet } from '@/types/swapi';
import { useSwapiItem } from '@/hooks/useSwapiItem';
import { SwapiService } from '@/services/swapiService';
import { formatNumberWithCommas, capitalize } from '@/utils/formatters';
import { TerminalHeader } from '@/components/ui/TerminalHeader';
import { GalacticLoader } from '@/components/cinematic/GalacticLoader';
import { ErrorState } from '@/components/ui/EmptyState';
import {
  Globe,
  Users,
  Compass,
  Orbit,
  CloudRain,
  Mountain,
  Film,
  User,
} from 'lucide-react';

export const PlanetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { item: planet, loading, error, resolvedRefs } = useSwapiItem<Planet>('planets', id);

  if (loading) {
    return (
      <div className="py-20 flex-1 flex items-center justify-center">
        <GalacticLoader
          label="ACCESSING ASTRONOMICAL DATABASE"
          sublabel={`DECRYPTING PLANETARY TELEMETRY // SEC-03-${id}...`}
        />
      </div>
    );
  }

  if (error || !planet) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ErrorState message={error || 'Astronomical body not logged in charts.'} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
      <TerminalHeader
        sectionNumber="03"
        categoryTitle={planet.name}
        subtitle="ASTROGRAPHIC DOSSIER"
        description="Physical topography, atmospheric biomes, orbital dynamics, and registered populace."
        showBack
      />

      {/* Main Terminal Panel */}
      <div className="holo-panel corner-brackets border border-emerald-500/40 p-6 sm:p-10 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-emerald-400 mb-2">
              <span className="font-bold tracking-widest">[SYSTEM DESIGNATION: SEC-03-{id}]</span>
              <span>•</span>
              <span className="tracking-widest uppercase">TERRESTRIAL / CELESTIAL</span>
            </div>
            <h1 className="font-cinematic text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sw-white via-emerald-300 to-teal-500 uppercase tracking-wider">
              {planet.name}
            </h1>
          </div>

          <div className="px-4 py-2 bg-space-950/80 border border-emerald-500/40 font-mono text-xs self-start sm:self-auto">
            <span className="text-sw-gray block text-[10px]">ROTATION / ORBIT</span>
            <span className="text-emerald-400 font-bold tracking-widest">
              {planet.rotation_period}H / {planet.orbital_period}D
            </span>
          </div>
        </div>

        {/* Environmental & Metric Grid */}
        <div className="my-8">
          <h3 className="font-tech text-xs tracking-[0.25em] text-sw-gold uppercase font-bold mb-4 flex items-center space-x-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>ASTROLOGICAL & ATMOSPHERIC PARAMETERS</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="flex items-center text-[10px] text-sw-gray uppercase mb-1">
                <CloudRain className="w-3 h-3 mr-1 text-emerald-400" /> CLIMATE
              </span>
              <span className="text-sm font-bold text-sw-white capitalize truncate block">
                {planet.climate}
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="flex items-center text-[10px] text-sw-gray uppercase mb-1">
                <Mountain className="w-3 h-3 mr-1 text-emerald-400" /> TERRAIN
              </span>
              <span className="text-sm font-bold text-sw-white capitalize truncate block">
                {planet.terrain}
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="flex items-center text-[10px] text-sw-gray uppercase mb-1">
                <Users className="w-3 h-3 mr-1 text-sw-cyan" /> POPULATION
              </span>
              <span className="text-sm font-bold text-sw-goldLight">
                {formatNumberWithCommas(planet.population)}
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="flex items-center text-[10px] text-sw-gray uppercase mb-1">
                <Orbit className="w-3 h-3 mr-1 text-sw-gold" /> DIAMETER
              </span>
              <span className="text-sm font-bold text-sw-goldLight">
                {planet.diameter !== 'unknown' ? `${formatNumberWithCommas(planet.diameter)} KM` : 'UNKNOWN'}
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">GRAVITY</span>
              <span className="font-medium text-sw-white">{planet.gravity}</span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">SURFACE WATER</span>
              <span className="font-medium text-sw-white">
                {planet.surface_water !== 'unknown' ? `${planet.surface_water}%` : 'UNKNOWN'}
              </span>
            </div>
          </div>
        </div>

        {/* Cross-Referenced Relational Entities */}
        <div className="space-y-6 pt-6 border-t border-white/10">
          {/* Residents */}
          <div>
            <h3 className="font-tech text-xs tracking-widest text-emerald-400 uppercase mb-3 flex items-center space-x-2">
              <User className="w-4 h-4 text-emerald-400" />
              <span>RECORDED NOTABLE RESIDENTS ({planet.residents.length})</span>
            </h3>

            {planet.residents.length === 0 ? (
              <p className="font-mono text-xs text-sw-gray italic">
                No individual sentient residents currently indexed in archives for this sector.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {resolvedRefs.residents?.map((ref) => {
                  const personId = SwapiService.extractIdFromUrl(ref.url);
                  return (
                    <Link
                      key={ref.url}
                      to={`/people/${personId}`}
                      className="p-2.5 bg-space-950/60 border border-white/10 hover:border-emerald-400 hover:bg-emerald-400/10 transition-all font-mono text-xs text-sw-white hover:text-emerald-300 truncate"
                    >
                      {ref.label}
                    </Link>
                  );
                }) || (
                  <span className="text-xs text-sw-gray font-mono">Loading residents telemetry...</span>
                )}
              </div>
            )}
          </div>

          {/* Related Films */}
          <div>
            <h3 className="font-tech text-xs tracking-widest text-sw-gold uppercase mb-3 flex items-center space-x-2">
              <Film className="w-4 h-4 text-sw-gold" />
              <span>APPEARANCES IN CANON SAGAS ({planet.films.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {resolvedRefs.films?.map((ref) => {
                const filmId = SwapiService.extractIdFromUrl(ref.url);
                return (
                  <Link
                    key={ref.url}
                    to={`/films/${filmId}`}
                    className="p-3 bg-space-950/60 border border-white/10 hover:border-sw-gold hover:bg-sw-gold/10 transition-all font-mono text-xs text-sw-white hover:text-sw-goldLight flex items-center space-x-2"
                  >
                    <Film className="w-3.5 h-3.5 text-sw-gold shrink-0" />
                    <span className="truncate">{ref.label}</span>
                  </Link>
                );
              }) || (
                <span className="text-xs text-sw-gray font-mono">Loading film chronologies...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
