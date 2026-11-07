import React from 'react';
import { Link } from 'react-router-dom';
import { Planet } from '@/types/swapi';
import { SwapiService } from '@/services/swapiService';
import { formatNumberWithCommas, capitalize } from '@/utils/formatters';
import { Globe, Users, Orbit, ArrowUpRight } from 'lucide-react';

interface PlanetCardProps {
  planet: Planet;
}

export const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
  const id = SwapiService.extractIdFromUrl(planet.url);

  return (
    <div className="group relative flex flex-col justify-between p-6 bg-space-800/70 border border-emerald-500/30 backdrop-blur-md corner-brackets hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all duration-300">
      <div>
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] tracking-widest text-emerald-400 uppercase">
            CELESTIAL BODY // SEC-03
          </span>
          <span className="font-mono text-[10px] tracking-wider text-sw-gray">
            ID: [PL-{id}]
          </span>
        </div>

        {/* Planet Name */}
        <h3 className="font-cinematic text-lg sm:text-xl font-bold tracking-widest text-sw-white group-hover:text-emerald-300 transition-colors mb-4 line-clamp-1">
          {planet.name}
        </h3>

        {/* Telemetry data grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 font-mono text-xs">
          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">CLIMATE</span>
            <span className="font-bold text-sw-goldLight truncate block">
              {capitalize(planet.climate)}
            </span>
          </div>

          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">DIAMETER</span>
            <span className="font-bold text-sw-goldLight">
              {planet.diameter !== 'unknown' ? `${formatNumberWithCommas(planet.diameter)} KM` : 'UNKNOWN'}
            </span>
          </div>

          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none col-span-2">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">TERRAIN</span>
            <span className="font-medium text-sw-white truncate block">
              {capitalize(planet.terrain)}
            </span>
          </div>
        </div>

        {/* Population & Gravity */}
        <div className="space-y-1.5 mb-5 font-mono text-xs text-sw-gray border-t border-white/10 pt-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center text-[10px] uppercase">
              <Users className="w-3 h-3 mr-1 text-emerald-400" /> POPULATION
            </span>
            <span className="text-sw-white font-medium">
              {formatNumberWithCommas(planet.population)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-[10px] uppercase">
              <Orbit className="w-3 h-3 mr-1 text-sw-cyan" /> GRAVITY
            </span>
            <span className="text-sw-white font-medium">{planet.gravity}</span>
          </div>
        </div>
      </div>

      {/* Footer details button */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <span className="font-mono text-[10px] text-sw-gray">
          {planet.residents.length} RESIDENTS REGISTERED
        </span>

        <Link
          to={`/planets/${id}`}
          className="flex items-center space-x-1 font-tech text-xs tracking-wider text-emerald-400 uppercase font-bold hover:underline"
        >
          <span>DOSSIER</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
