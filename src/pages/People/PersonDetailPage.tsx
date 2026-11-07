import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Person } from '@/types/swapi';
import { useSwapiItem } from '@/hooks/useSwapiItem';
import { SwapiService } from '@/services/swapiService';
import { capitalize } from '@/utils/formatters';
import { TerminalHeader } from '@/components/ui/TerminalHeader';
import { GalacticLoader } from '@/components/cinematic/GalacticLoader';
import { ErrorState } from '@/components/ui/EmptyState';
import {
  User,
  Globe,
  Film,
  Rocket,
  Car,
  Eye,
  Sparkles,
  Activity,
  Layers,
} from 'lucide-react';

export const PersonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { item: person, loading, error, resolvedRefs } = useSwapiItem<Person>('people', id);

  if (loading) {
    return (
      <div className="py-20 flex-1 flex items-center justify-center">
        <GalacticLoader
          label="ACCESSING BIOMETRIC DOSSIER"
          sublabel={`DECRYPTING DOSSIER // SEC-02-${id}...`}
        />
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ErrorState message={error || 'Biometric dossier not found in archives.'} />
      </div>
    );
  }

  const homeworldRef = resolvedRefs.homeworld?.[0];
  const homeworldId = homeworldRef ? SwapiService.extractIdFromUrl(homeworldRef.url) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
      <TerminalHeader
        sectionNumber="02"
        categoryTitle={person.name}
        subtitle="BIOMETRIC DOSSIER"
        description="Physical profile, genealogical origins, and documented service record."
        showBack
      />

      {/* Main Sci-Fi Terminal Panel */}
      <div className="holo-panel corner-brackets border border-sw-cyan/40 p-6 sm:p-10 mb-8">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-sw-cyan mb-2">
              <span className="font-bold tracking-widest">[SUBJECT: ARCHIVE-{id}]</span>
              <span>•</span>
              <span className="tracking-widest uppercase">SPECIES SENTIENT</span>
            </div>
            <h1 className="font-cinematic text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sw-white via-sw-cyan to-blue-400 uppercase tracking-wider">
              {person.name}
            </h1>
          </div>

          <div className="self-start sm:self-auto px-4 py-2 bg-space-950/80 border border-sw-cyan/40 font-mono text-xs">
            <span className="text-sw-gray block text-[10px]">STATUS</span>
            <span className="text-sw-cyan font-bold tracking-widest">ACTIVE IN CANON</span>
          </div>
        </div>

        {/* Biometric Data Matrix */}
        <div className="my-8">
          <h3 className="font-tech text-xs tracking-[0.25em] text-sw-gold uppercase font-bold mb-4 flex items-center space-x-2">
            <Activity className="w-4 h-4 text-sw-gold" />
            <span>BIOMETRIC METRICS</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">HEIGHT</span>
              <span className="text-base font-bold text-sw-white">
                {person.height !== 'unknown' ? `${person.height} CM` : 'UNKNOWN'}
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">MASS</span>
              <span className="text-base font-bold text-sw-white">
                {person.mass !== 'unknown' ? `${person.mass} KG` : 'UNKNOWN'}
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">GENDER</span>
              <span className="text-base font-bold text-sw-goldLight">
                {capitalize(person.gender)}
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">BIRTH YEAR</span>
              <span className="text-base font-bold text-sw-goldLight">
                {person.birth_year}
              </span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">EYE COLOR</span>
              <span className="font-medium text-sw-white">{capitalize(person.eye_color)}</span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">HAIR COLOR</span>
              <span className="font-medium text-sw-white">{capitalize(person.hair_color)}</span>
            </div>

            <div className="p-3 bg-space-950/70 border border-white/5">
              <span className="text-[10px] text-sw-gray uppercase block mb-1">SKIN TONE</span>
              <span className="font-medium text-sw-white">{capitalize(person.skin_color)}</span>
            </div>

            {/* Homeworld Direct Link */}
            <div className="p-3 bg-space-950/70 border border-emerald-500/30">
              <span className="text-[10px] text-emerald-400 uppercase block mb-1">HOMEWORLD</span>
              {homeworldRef && homeworldId ? (
                <Link
                  to={`/planets/${homeworldId}`}
                  className="font-bold text-emerald-300 hover:underline flex items-center space-x-1"
                >
                  <Globe className="w-3.5 h-3.5 inline mr-1" />
                  <span className="truncate">{homeworldRef.label}</span>
                </Link>
              ) : (
                <span className="font-medium text-sw-gray">Analyzing coordinates...</span>
              )}
            </div>
          </div>
        </div>

        {/* Cross-Referenced Relational Entities */}
        <div className="space-y-6 pt-6 border-t border-white/10">
          {/* Related Films */}
          <div>
            <h3 className="font-tech text-xs tracking-widest text-sw-gold uppercase mb-3 flex items-center space-x-2">
              <Film className="w-4 h-4 text-sw-gold" />
              <span>RECORDED CANON PARTICIPATIONS ({person.films.length})</span>
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

          {/* Related Starships / Vehicles if any */}
          {((resolvedRefs.starships && resolvedRefs.starships.length > 0) ||
            (resolvedRefs.vehicles && resolvedRefs.vehicles.length > 0)) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {resolvedRefs.starships && resolvedRefs.starships.length > 0 && (
                <div>
                  <h4 className="font-tech text-xs tracking-widest text-sw-red uppercase mb-2 flex items-center space-x-1.5">
                    <Rocket className="w-3.5 h-3.5" />
                    <span>PILOTED STARSHIPS</span>
                  </h4>
                  <div className="space-y-1.5">
                    {resolvedRefs.starships.map((ref) => (
                      <Link
                        key={ref.url}
                        to={`/starships/${SwapiService.extractIdFromUrl(ref.url)}`}
                        className="block p-2 bg-space-950/60 border border-white/10 hover:border-sw-red text-xs font-mono text-sw-white hover:text-rose-300 truncate"
                      >
                        {ref.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {resolvedRefs.vehicles && resolvedRefs.vehicles.length > 0 && (
                <div>
                  <h4 className="font-tech text-xs tracking-widest text-amber-400 uppercase mb-2 flex items-center space-x-1.5">
                    <Car className="w-3.5 h-3.5" />
                    <span>OPERATED VEHICLES</span>
                  </h4>
                  <div className="space-y-1.5">
                    {resolvedRefs.vehicles.map((ref) => (
                      <Link
                        key={ref.url}
                        to={`/vehicles/${SwapiService.extractIdFromUrl(ref.url)}`}
                        className="block p-2 bg-space-950/60 border border-white/10 hover:border-amber-400 text-xs font-mono text-sw-white hover:text-amber-300 truncate"
                      >
                        {ref.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
