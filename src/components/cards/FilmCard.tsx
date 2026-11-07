import React from 'react';
import { Link } from 'react-router-dom';
import { Film as FilmType } from '@/types/swapi';
import { SwapiService } from '@/services/swapiService';
import { toRomanNumeral } from '@/utils/formatters';
import { Clapperboard, Calendar, UserCheck, Play, ArrowUpRight } from 'lucide-react';

interface FilmCardProps {
  film: FilmType;
  onOpenCrawl: (film: FilmType) => void;
}

export const FilmCard: React.FC<FilmCardProps> = ({ film, onOpenCrawl }) => {
  const id = SwapiService.extractIdFromUrl(film.url);
  const roman = toRomanNumeral(film.episode_id);

  return (
    <div className="group relative flex flex-col justify-between p-6 bg-space-800/70 border border-sw-gold/25 backdrop-blur-md corner-brackets hover:border-sw-gold hover:shadow-gold-md transition-all duration-300">
      <div>
        {/* Top telemetry tags */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-tech text-xs tracking-widest text-sw-gold font-bold border border-sw-gold/40 px-2.5 py-0.5 rounded-sm">
            EPISODE {roman}
          </span>
          <span className="font-mono text-[10px] tracking-wider text-sw-gray">
            ID: [FILM-{id}]
          </span>
        </div>

        {/* Title */}
        <h3 className="font-cinematic text-xl sm:text-2xl font-bold tracking-widest text-sw-white group-hover:text-sw-goldLight transition-colors mb-3 line-clamp-1">
          {film.title}
        </h3>

        {/* Terminal metadata rows */}
        <div className="space-y-2 mb-6 font-mono text-xs">
          <div className="flex items-center justify-between text-sw-gray border-b border-white/5 pb-1.5">
            <span className="flex items-center text-[11px] tracking-wider uppercase text-sw-gray">
              <UserCheck className="w-3.5 h-3.5 mr-1.5 text-sw-gold/70" /> DIRECTOR
            </span>
            <span className="text-sw-white font-medium">{film.director}</span>
          </div>

          <div className="flex items-center justify-between text-sw-gray border-b border-white/5 pb-1.5">
            <span className="flex items-center text-[11px] tracking-wider uppercase text-sw-gray">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-sw-cyan/70" /> RELEASED
            </span>
            <span className="text-sw-white font-medium">{film.release_date}</span>
          </div>

          <div className="flex items-center justify-between text-sw-gray pb-1">
            <span className="text-[11px] tracking-wider uppercase text-sw-gray">
              INDEXED CHARACTERS
            </span>
            <span className="text-sw-gold font-bold">{film.characters.length}</span>
          </div>
        </div>

        {/* Opening Crawl Preview Excerpt */}
        <p className="font-sans text-xs text-sw-gray italic line-clamp-3 mb-6 border-l-2 border-sw-gold/40 pl-3">
          "{film.opening_crawl.replace(/\r\n/g, ' ')}"
        </p>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10">
        <button
          onClick={() => onOpenCrawl(film)}
          className="flex items-center justify-center space-x-1.5 py-2 px-3 border border-sw-gold/40 text-sw-gold hover:bg-sw-gold hover:text-black font-tech text-xs tracking-wider uppercase font-semibold transition-all"
        >
          <Play className="w-3.5 h-3.5" />
          <span>3D CRAWL</span>
        </button>

        <Link
          to={`/films/${id}`}
          className="flex items-center justify-center space-x-1.5 py-2 px-3 border border-white/20 text-sw-white hover:border-sw-cyan hover:text-sw-cyan hover:bg-sw-cyan/10 font-tech text-xs tracking-wider uppercase font-semibold transition-all"
        >
          <span>DOSSIER</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
