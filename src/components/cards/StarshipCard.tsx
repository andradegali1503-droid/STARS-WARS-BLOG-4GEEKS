import React from 'react';
import { Link } from 'react-router-dom';
import { Starship } from '@/types/swapi';
import { SwapiService } from '@/services/swapiService';
import { formatCredits, capitalize } from '@/utils/formatters';
import { Rocket, Gauge, Users, Coins, ArrowUpRight } from 'lucide-react';

interface StarshipCardProps {
  starship: Starship;
}

export const StarshipCard: React.FC<StarshipCardProps> = ({ starship }) => {
  const id = SwapiService.extractIdFromUrl(starship.url);

  return (
    <div className="group relative flex flex-col justify-between p-6 bg-space-800/70 border border-sw-red/30 backdrop-blur-md corner-brackets hover:border-sw-red hover:shadow-[0_0_20px_rgba(230,57,70,0.3)] transition-all duration-300">
      <div>
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] tracking-widest text-sw-red uppercase">
            VESSEL // SEC-04
          </span>
          <span className="font-mono text-[10px] tracking-wider text-sw-gray">
            ID: [SS-{id}]
          </span>
        </div>

        {/* Starship Name */}
        <h3 className="font-cinematic text-lg sm:text-xl font-bold tracking-widest text-sw-white group-hover:text-rose-400 transition-colors mb-1 line-clamp-1">
          {starship.name}
        </h3>
        <p className="font-tech text-xs tracking-wider text-sw-gold/80 uppercase truncate mb-4">
          {starship.model}
        </p>

        {/* Telemetry data grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 font-mono text-xs">
          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none col-span-2">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">CLASS</span>
            <span className="font-bold text-sw-goldLight truncate block">
              {capitalize(starship.starship_class)}
            </span>
          </div>

          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">CREW</span>
            <span className="font-medium text-sw-white">{starship.crew}</span>
          </div>

          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">PASSENGERS</span>
            <span className="font-medium text-sw-white">{starship.passengers}</span>
          </div>
        </div>

        {/* Speed & Cost */}
        <div className="space-y-1.5 mb-5 font-mono text-xs text-sw-gray border-t border-white/10 pt-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center text-[10px] uppercase">
              <Gauge className="w-3 h-3 mr-1 text-sw-red" /> MAX ATMOSPH. SPEED
            </span>
            <span className="text-sw-white font-medium">{starship.max_atmosphering_speed}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-[10px] uppercase">
              <Coins className="w-3 h-3 mr-1 text-sw-gold" /> ACQUISITION COST
            </span>
            <span className="text-sw-gold font-bold">{formatCredits(starship.cost_in_credits)}</span>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <span className="font-mono text-[10px] text-sw-gray">
          HYPERDRIVE: {starship.hyperdrive_rating}
        </span>

        <Link
          to={`/starships/${id}`}
          className="flex items-center space-x-1 font-tech text-xs tracking-wider text-sw-red uppercase font-bold hover:underline"
        >
          <span>DOSSIER</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
