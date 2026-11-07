import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '@/types/swapi';
import { SwapiService } from '@/services/swapiService';
import { capitalize } from '@/utils/formatters';
import { User, Eye, Sparkles, Film, ArrowUpRight } from 'lucide-react';

interface PersonCardProps {
  person: Person;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  const id = SwapiService.extractIdFromUrl(person.url);

  return (
    <div className="group relative flex flex-col justify-between p-6 bg-space-800/70 border border-sw-gold/25 backdrop-blur-md corner-brackets hover:border-sw-cyan hover:shadow-cyan-md transition-all duration-300">
      <div>
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] tracking-widest text-sw-cyan uppercase">
            SUBJECT // SEC-02
          </span>
          <span className="font-mono text-[10px] tracking-wider text-sw-gray">
            ID: [P-{id}]
          </span>
        </div>

        {/* Person Name */}
        <h3 className="font-cinematic text-lg sm:text-xl font-bold tracking-widest text-sw-white group-hover:text-sw-cyan transition-colors mb-4 line-clamp-1">
          {person.name}
        </h3>

        {/* Telemetry data grid */}
        <div className="grid grid-cols-2 gap-2 mb-5 font-mono text-xs">
          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">HEIGHT</span>
            <span className="font-bold text-sw-goldLight">
              {person.height !== 'unknown' ? `${person.height} CM` : 'UNKNOWN'}
            </span>
          </div>

          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">MASS</span>
            <span className="font-bold text-sw-goldLight">
              {person.mass !== 'unknown' ? `${person.mass} KG` : 'UNKNOWN'}
            </span>
          </div>

          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">GENDER</span>
            <span className="font-medium text-sw-white">{capitalize(person.gender)}</span>
          </div>

          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">BIRTH YEAR</span>
            <span className="font-medium text-sw-white">{person.birth_year}</span>
          </div>
        </div>

        {/* Visual Attributes */}
        <div className="space-y-1.5 mb-5 font-mono text-xs text-sw-gray border-t border-white/10 pt-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center text-[10px] uppercase">
              <Eye className="w-3 h-3 mr-1 text-sw-cyan" /> EYE COLOR
            </span>
            <span className="text-sw-white font-medium">{capitalize(person.eye_color)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-[10px] uppercase">
              <Sparkles className="w-3 h-3 mr-1 text-sw-gold" /> HAIR COLOR
            </span>
            <span className="text-sw-white font-medium">{capitalize(person.hair_color)}</span>
          </div>
        </div>
      </div>

      {/* Footer Details Button */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <span className="flex items-center font-mono text-[10px] text-sw-gray">
          <Film className="w-3 h-3 mr-1 text-sw-gold" /> {person.films.length} APPEARANCES
        </span>

        <Link
          to={`/people/${id}`}
          className="flex items-center space-x-1 font-tech text-xs tracking-wider text-sw-cyan uppercase font-bold hover:underline"
        >
          <span>DOSSIER</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
