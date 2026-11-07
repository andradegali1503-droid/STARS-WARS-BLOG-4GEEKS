import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Film } from '@/types/swapi';
import { useSwapiItem } from '@/hooks/useSwapiItem';
import { SwapiService } from '@/services/swapiService';
import { toRomanNumeral } from '@/utils/formatters';
import { TerminalHeader } from '@/components/ui/TerminalHeader';
import { GalacticLoader } from '@/components/cinematic/GalacticLoader';
import { ErrorState } from '@/components/ui/EmptyState';
import { OpeningCrawlModal } from '@/components/cinematic/OpeningCrawlModal';
import {
  Film as FilmIcon,
  Play,
  Calendar,
  UserCheck,
  Award,
  Users,
  Globe,
  Rocket,
  Dna,
} from 'lucide-react';

export const FilmDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { item: film, loading, error, resolvedRefs } = useSwapiItem<Film>('films', id);
  const [crawlOpen, setCrawlOpen] = useState(false);

  if (loading) {
    return (
      <div className="py-20 flex-1 flex items-center justify-center">
        <GalacticLoader
          label="ACCESSING ARCHIVE RECORD"
          sublabel={`DECRYPTING FILM DOSSIER // SEC-01-${id}...`}
        />
      </div>
    );
  }

  if (error || !film) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ErrorState message={error || 'Record unretrievable.'} />
      </div>
    );
  }

  const roman = toRomanNumeral(film.episode_id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
      <TerminalHeader
        sectionNumber="01"
        categoryTitle={`EPISODE ${roman}: ${film.title}`}
        subtitle="CHRONICLE DOSSIER"
        description="Detailed cinematic archival record, production personnel, and cross-referenced galactic entities."
        showBack
      />

      {/* Main Terminal Dossier Card */}
      <div className="holo-panel corner-brackets border border-sw-gold/30 p-6 sm:p-10 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="font-tech text-xs tracking-widest text-sw-gold border border-sw-gold/40 px-3 py-1">
                EPISODE {roman}
              </span>
              <span className="font-mono text-xs text-sw-cyan">
                CODE: [SW-EP-{film.episode_id}]
              </span>
            </div>
            <h1 className="font-cinematic text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sw-white via-sw-goldLight to-sw-gold uppercase tracking-wider">
              {film.title}
            </h1>
          </div>

          <button
            onClick={() => setCrawlOpen(true)}
            className="self-start flex items-center space-x-2 px-6 py-3 border-2 border-sw-gold bg-sw-gold/20 text-sw-gold hover:bg-sw-gold hover:text-black transition-all font-cinematic text-xs tracking-widest uppercase font-bold shadow-gold-sm"
          >
            <Play className="w-4 h-4" />
            <span>LAUNCH 3D OPENING CRAWL</span>
          </button>
        </div>

        {/* Technical Data Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8 font-mono text-xs">
          <div className="p-4 bg-space-950/70 border border-white/5">
            <span className="flex items-center text-[10px] text-sw-gray uppercase tracking-widest mb-1">
              <UserCheck className="w-3.5 h-3.5 mr-1.5 text-sw-gold" /> DIRECTOR
            </span>
            <span className="text-sm font-bold text-sw-white">{film.director}</span>
          </div>

          <div className="p-4 bg-space-950/70 border border-white/5">
            <span className="flex items-center text-[10px] text-sw-gray uppercase tracking-widest mb-1">
              <Award className="w-3.5 h-3.5 mr-1.5 text-sw-cyan" /> PRODUCERS
            </span>
            <span className="text-sm font-bold text-sw-white">{film.producer}</span>
          </div>

          <div className="p-4 bg-space-950/70 border border-white/5">
            <span className="flex items-center text-[10px] text-sw-gray uppercase tracking-widest mb-1">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> RELEASE DATE
            </span>
            <span className="text-sm font-bold text-sw-white">{film.release_date}</span>
          </div>
        </div>

        {/* Opening Crawl Box */}
        <div className="mb-10 p-6 bg-space-950/90 border border-sw-gold/20 corner-brackets">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
            <span className="font-tech text-xs tracking-widest text-sw-gold uppercase">
              OPENING CRAWL TRANSCRIPT
            </span>
            <span className="font-mono text-[10px] text-sw-gray">AUTHENTIC TEXT TRANSMISSION</span>
          </div>
          <p className="font-sans text-sm sm:text-base text-sw-goldLight/90 leading-relaxed italic whitespace-pre-line">
            {film.opening_crawl}
          </p>
        </div>

        {/* Cross-Referenced Relational Entities */}
        <div className="space-y-8 pt-4 border-t border-white/10">
          {/* Related Characters */}
          <div>
            <h3 className="font-tech text-sm tracking-widest text-sw-cyan uppercase mb-4 flex items-center space-x-2">
              <Users className="w-4 h-4 text-sw-cyan" />
              <span>KEY PARTICIPANTS & CHARACTERS ({film.characters.length})</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {resolvedRefs.characters?.map((ref) => {
                const charId = SwapiService.extractIdFromUrl(ref.url);
                return (
                  <Link
                    key={ref.url}
                    to={`/people/${charId}`}
                    className="p-2.5 bg-space-950/60 border border-white/10 hover:border-sw-cyan hover:bg-sw-cyan/10 transition-all font-mono text-xs text-sw-white hover:text-sw-cyan truncate rounded-none"
                  >
                    {ref.label}
                  </Link>
                );
              }) || (
                <span className="text-xs text-sw-gray font-mono">
                  Loading indexed characters...
                </span>
              )}
            </div>
          </div>

          {/* Related Planets */}
          <div>
            <h3 className="font-tech text-sm tracking-widest text-emerald-400 uppercase mb-4 flex items-center space-x-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>RECORDED CELESTIAL WORLDS ({film.planets.length})</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {resolvedRefs.planets?.map((ref) => {
                const planetId = SwapiService.extractIdFromUrl(ref.url);
                return (
                  <Link
                    key={ref.url}
                    to={`/planets/${planetId}`}
                    className="p-2.5 bg-space-950/60 border border-white/10 hover:border-emerald-400 hover:bg-emerald-400/10 transition-all font-mono text-xs text-sw-white hover:text-emerald-300 truncate rounded-none"
                  >
                    {ref.label}
                  </Link>
                );
              }) || (
                <span className="text-xs text-sw-gray font-mono">
                  Loading indexed worlds...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3D Crawl Modal */}
      <OpeningCrawlModal
        isOpen={crawlOpen}
        onClose={() => setCrawlOpen(false)}
        title={film.title}
        episodeId={film.episode_id}
        crawlText={film.opening_crawl}
      />
    </div>
  );
};
