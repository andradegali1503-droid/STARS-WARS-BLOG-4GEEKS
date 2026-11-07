import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Vehicle } from '@/types/swapi';
import { useSwapiItem } from '@/hooks/useSwapiItem';
import { SwapiService } from '@/services/swapiService';
import { formatCredits, capitalize } from '@/utils/formatters';
import { TerminalHeader } from '@/components/ui/TerminalHeader';
import { GalacticLoader } from '@/components/cinematic/GalacticLoader';
import { ErrorState } from '@/components/ui/EmptyState';
import {
  Car,
  Gauge,
  Users,
  Coins,
  Shield,
  Zap,
  Film,
  UserCheck,
} from 'lucide-react';

export const VehicleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { item: vehicle, loading, error, resolvedRefs } = useSwapiItem<Vehicle>('vehicles', id);

  if (loading) {
    return (
      <div className="py-20 flex-1 flex items-center justify-center">
        <GalacticLoader
          label="ACCESSING MOTOR POOL ARCHIVE"
          sublabel={`DECRYPTING VEHICLE SCHEMATICS // SEC-05-${id}...`}
        />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ErrorState message={error || 'Vehicle record unretrievable.'} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
      <TerminalHeader
        sectionNumber="05"
        categoryTitle={vehicle.name}
        subtitle="GROUND & ATMOSPHERIC CRAFT"
        description="Repulsorcraft specifications, armor class ratings, speed limits, and transport capability."
        showBack
      />

      {/* Main Terminal Dossier */}
      <div className="holo-panel corner-brackets border border-amber-500/40 p-6 sm:p-10 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-amber-400 mb-2">
              <span className="font-bold tracking-widest">[REGISTRATION: VH-{id}]</span>
              <span>•</span>
              <span className="tracking-widest uppercase">{vehicle.vehicle_class}</span>
            </div>
            <h1 className="font-cinematic text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sw-white via-amber-300 to-orange-500 uppercase tracking-wider">
              {vehicle.name}
            </h1>
            <p className="font-tech text-sm tracking-wider text-sw-goldLight mt-1">
              MODEL: {vehicle.model}
            </p>
          </div>

          <div className="px-4 py-2 bg-space-950/80 border border-amber-500/40 font-mono text-xs self-start sm:self-auto">
            <span className="text-sw-gray block text-[10px]">MAX SPEED</span>
            <span className="text-amber-400 font-bold tracking-widest text-base">
              {vehicle.max_atmosphering_speed} KM/H
            </span>
          </div>
        </div>

        {/* Technical Data Grid */}
        <div className="my-8">
          <h3 className="font-tech text-xs tracking-[0.25em] text-sw-gold uppercase font-bold mb-4 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>OPERATIONAL SPECIFICATIONS & CAPACITY</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-space-950/70 border border-white/5 col-span-2">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">MANUFACTURER</span>
              <span className="text-xs font-bold text-sw-white truncate block">
                {vehicle.manufacturer}
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">VEHICLE CLASS</span>
              <span className="text-xs font-bold text-sw-goldLight capitalize truncate block">
                {vehicle.vehicle_class}
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">LENGTH</span>
              <span className="text-xs font-bold text-sw-white truncate block">
                {vehicle.length} METERS
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">CREW MANNING</span>
              <span className="text-sm font-bold text-sw-white">{vehicle.crew}</span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">PASSENGERS</span>
              <span className="text-sm font-bold text-sw-white">{vehicle.passengers}</span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">CARGO CAPACITY</span>
              <span className="text-xs font-medium text-sw-white truncate block">
                {vehicle.cargo_capacity} KG
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">CONSUMABLES</span>
              <span className="text-sm font-bold text-sw-white">{vehicle.consumables}</span>
            </div>

            <div className="p-3 bg-space-950/70 border border-sw-gold/30 col-span-2">
              <span className="text-[10px] text-sw-gold uppercase block mb-1">ACQUISITION COST</span>
              <span className="text-sm font-bold text-sw-goldLight">
                {formatCredits(vehicle.cost_in_credits)}
              </span>
            </div>
          </div>
        </div>

        {/* Cross-Referenced Relational Entities */}
        <div className="space-y-6 pt-6 border-t border-white/10">
          {/* Pilots */}
          {vehicle.pilots.length > 0 && (
            <div>
              <h3 className="font-tech text-xs tracking-widest text-amber-400 uppercase mb-3 flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>CERTIFIED PILOTS ({vehicle.pilots.length})</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {resolvedRefs.pilots?.map((ref) => {
                  const pilotId = SwapiService.extractIdFromUrl(ref.url);
                  return (
                    <Link
                      key={ref.url}
                      to={`/people/${pilotId}`}
                      className="p-2.5 bg-space-950/60 border border-white/10 hover:border-amber-400 hover:bg-amber-400/10 transition-all font-mono text-xs text-sw-white hover:text-amber-300 truncate"
                    >
                      {ref.label}
                    </Link>
                  );
                }) || (
                  <span className="text-xs text-sw-gray font-mono">Loading pilot roster...</span>
                )}
              </div>
            </div>
          )}

          {/* Related Films */}
          <div>
            <h3 className="font-tech text-xs tracking-widest text-sw-gold uppercase mb-3 flex items-center space-x-2">
              <Film className="w-4 h-4 text-sw-gold" />
              <span>APPEARANCES IN CANON BATTLES ({vehicle.films.length})</span>
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
                <span className="text-xs text-sw-gray font-mono">Loading battles...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
