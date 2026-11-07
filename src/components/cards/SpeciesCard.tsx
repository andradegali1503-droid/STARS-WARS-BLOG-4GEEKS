import React from 'react';
import { Link } from 'react-router-dom';
import { Species } from '@/types/swapi';
import { SwapiService } from '@/services/swapiService';
import { capitalize } from '@/utils/formatters';
import { Dna, MessageSquare, HeartHandshake, ArrowUpRight } from 'lucide-react';

interface SpeciesCardProps {
  species: Species;
}

export const SpeciesCard: React.FC<SpeciesCardProps> = ({ species }) => {
  const id = SwapiService.extractIdFromUrl(species.url);

  return (
    <div className="group relative flex flex-col justify-between p-6 bg-space-800/70 border border-purple-500/30 backdrop-blur-md corner-brackets hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300">
      <div>
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] tracking-widest text-purple-400 uppercase">
            SENTIENT BIO-CLASS // SEC-06
          </span>
          <span className="font-mono text-[10px] tracking-wider text-sw-gray">
            ID: [SP-{id}]
          </span>
        </div>

        {/* Species Name */}
        <h3 className="font-cinematic text-lg sm:text-xl font-bold tracking-widest text-sw-white group-hover:text-purple-300 transition-colors mb-4 line-clamp-1">
          {species.name}
        </h3>

        {/* Telemetry data grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 font-mono text-xs">
          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">CLASSIFICATION</span>
            <span className="font-bold text-sw-goldLight truncate block">
              {capitalize(species.classification)}
            </span>
          </div>

          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">DESIGNATION</span>
            <span className="font-bold text-sw-goldLight truncate block">
              {capitalize(species.designation)}
            </span>
          </div>

          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">AVG HEIGHT</span>
            <span className="font-medium text-sw-white">
              {species.average_height !== 'n/a' && species.average_height !== 'unknown'
                ? `${species.average_height} CM`
                : 'UNKNOWN'}
            </span>
          </div>

          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">AVG LIFESPAN</span>
            <span className="font-medium text-sw-white">
              {species.average_lifespan !== 'unknown' ? `${species.average_lifespan} YRS` : 'UNKNOWN'}
            </span>
          </div>
        </div>

        {/* Language & Colors */}
        <div className="space-y-1.5 mb-5 font-mono text-xs text-sw-gray border-t border-white/10 pt-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center text-[10px] uppercase">
              <MessageSquare className="w-3 h-3 mr-1 text-purple-400" /> SPOKEN LANGUAGE
            </span>
            <span className="text-sw-white font-medium truncate max-w-[140px]">
              {capitalize(species.language)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase">SKIN PALETTE</span>
            <span className="text-sw-white font-medium truncate max-w-[140px]">
              {capitalize(species.skin_colors)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <span className="font-mono text-[10px] text-sw-gray">
          {species.people.length} RECORDED MEMBERS
        </span>

        <Link
          to={`/species/${id}`}
          className="flex items-center space-x-1 font-tech text-xs tracking-wider text-purple-400 uppercase font-bold hover:underline"
        >
          <span>DOSSIER</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
