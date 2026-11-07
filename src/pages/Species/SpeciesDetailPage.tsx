import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Species } from '@/types/swapi';
import { useSwapiItem } from '@/hooks/useSwapiItem';
import { SwapiService } from '@/services/swapiService';
import { capitalize } from '@/utils/formatters';
import { TerminalHeader } from '@/components/ui/TerminalHeader';
import { GalacticLoader } from '@/components/cinematic/GalacticLoader';
import { ErrorState } from '@/components/ui/EmptyState';
import {
  Dna,
  MessageSquare,
  Globe,
  Film,
  Users,
  Activity,
  HeartHandshake,
} from 'lucide-react';

export const SpeciesDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { item: species, loading, error, resolvedRefs } = useSwapiItem<Species>('species', id);

  if (loading) {
    return (
      <div className="py-20 flex-1 flex items-center justify-center">
        <GalacticLoader
          label="ACCESSING XENOBIOLOGY ARCHIVE"
          sublabel={`SEQUENCING TAXONOMY DOSSIER // SEC-06-${id}...`}
        />
      </div>
    );
  }

  if (error || !species) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ErrorState message={error || 'Xenobiological record unretrievable.'} />
      </div>
    );
  }

  const homeworldRef = resolvedRefs.homeworld?.[0];
  const homeworldId = homeworldRef ? SwapiService.extractIdFromUrl(homeworldRef.url) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
      <TerminalHeader
        sectionNumber="06"
        categoryTitle={species.name}
        subtitle="XENOBIOLOGICAL DOSSIER"
        description="Physiological morphology, evolutionary lifespan, ancestral dialect, and homeworld."
        showBack
      />

      {/* Main Terminal Dossier */}
      <div className="holo-panel corner-brackets border border-purple-500/40 p-6 sm:p-10 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-purple-400 mb-2">
              <span className="font-bold tracking-widest">[TAXONOMY: SP-{id}]</span>
              <span>•</span>
              <span className="tracking-widest uppercase">{species.classification}</span>
            </div>
            <h1 className="font-cinematic text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sw-white via-purple-300 to-pink-500 uppercase tracking-wider">
              {species.name}
            </h1>
            <p className="font-tech text-sm tracking-wider text-sw-goldLight mt-1">
              DESIGNATION: {capitalize(species.designation)}
            </p>
          </div>

          <div className="px-4 py-2 bg-space-950/80 border border-purple-500/40 font-mono text-xs self-start sm:self-auto">
            <span className="text-sw-gray block text-[10px]">AVG LIFESPAN</span>
            <span className="text-purple-300 font-bold tracking-widest text-base">
              {species.average_lifespan !== 'unknown' ? `${species.average_lifespan} STANDARD YEARS` : 'UNKNOWN'}
            </span>
          </div>
        </div>

        {/* Biological Attributes Grid */}
        <div className="my-8">
          <h3 className="font-tech text-xs tracking-[0.25em] text-sw-gold uppercase font-bold mb-4 flex items-center space-x-2">
            <Dna className="w-4 h-4 text-purple-400" />
            <span>PHYSIOLOGICAL & LINGUISTIC ATTRIBUTES</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">CLASSIFICATION</span>
              <span className="text-sm font-bold text-sw-white capitalize truncate block">
                {species.classification}
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">DESIGNATION</span>
              <span className="text-sm font-bold text-sw-white capitalize truncate block">
                {species.designation}
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">AVG HEIGHT</span>
              <span className="text-sm font-bold text-sw-goldLight">
                {species.average_height !== 'n/a' && species.average_height !== 'unknown'
                  ? `${species.average_height} CM`
                  : 'VARIABLE / UNKNOWN'}
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">LANGUAGE</span>
              <span className="text-sm font-bold text-purple-300 truncate block">
                {capitalize(species.language)}
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">SKIN PALETTE</span>
              <span className="font-medium text-sw-white truncate block">
                {capitalize(species.skin_colors)}
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">HAIR COLORS</span>
              <span className="font-medium text-sw-white truncate block">
                {capitalize(species.hair_colors)}
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">EYE COLORS</span>
              <span className="font-medium text-sw-white truncate block">
                {capitalize(species.eye_colors)}
              </span>
            </div>

            {/* Homeworld */}
            <div className="p-3 bg-space-950/70 border border-emerald-500/30">
              <span className="text-[10px] text-emerald-400 uppercase block mb-1">ANCESTRAL HOMEWORLD</span>
              {homeworldRef && homeworldId ? (
                <Link
                  to={`/planets/${homeworldId}`}
                  className="font-bold text-emerald-300 hover:underline flex items-center space-x-1"
                >
                  <Globe className="w-3.5 h-3.5 inline mr-1" />
                  <span className="truncate">{homeworldRef.label}</span>
                </Link>
              ) : (
                <span className="font-medium text-sw-gray">Nomadic / Unknown</span>
              )}
            </div>
          </div>
        </div>

        {/* Cross-Referenced Relational Entities */}
        <div className="space-y-6 pt-6 border-t border-white/10">
          {/* Notable Members */}
          <div>
            <h3 className="font-tech text-xs tracking-widest text-purple-400 uppercase mb-3 flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>RECORDED NOTABLE MEMBERS ({species.people.length})</span>
            </h3>

            {species.people.length === 0 ? (
              <p className="font-mono text-xs text-sw-gray italic">
                No individual members cataloged in current records.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {resolvedRefs.people?.map((ref) => {
                  const personId = SwapiService.extractIdFromUrl(ref.url);
                  return (
                    <Link
                      key={ref.url}
                      to={`/people/${personId}`}
                      className="p-2.5 bg-space-950/60 border border-white/10 hover:border-purple-400 hover:bg-purple-400/10 transition-all font-mono text-xs text-sw-white hover:text-purple-300 truncate"
                    >
                      {ref.label}
                    </Link>
                  );
                }) || (
                  <span className="text-xs text-sw-gray font-mono">Loading member telemetry...</span>
                )}
              </div>
            )}
          </div>

          {/* Related Films */}
          <div>
            <h3 className="font-tech text-xs tracking-widest text-sw-gold uppercase mb-3 flex items-center space-x-2">
              <Film className="w-4 h-4 text-sw-gold" />
              <span>APPEARANCES IN CANON SAGAS ({species.films.length})</span>
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
