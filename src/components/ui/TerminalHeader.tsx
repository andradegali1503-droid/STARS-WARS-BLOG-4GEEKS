import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Database, SlidersHorizontal } from 'lucide-react';

interface TerminalHeaderProps {
  sectionNumber: string;
  categoryTitle: string;
  subtitle: string;
  description: string;
  totalRecords?: number;
  showBack?: boolean;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  sectionNumber,
  categoryTitle,
  subtitle,
  description,
  totalRecords,
  showBack = false,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative mb-8 pb-6 border-b border-sw-gold/20 select-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* Breadcrumb / Section Code */}
          <div className="flex items-center space-x-2 mb-2 font-mono text-xs text-sw-gold/80">
            {showBack && (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-1 mr-2 px-2 py-0.5 border border-sw-gold/30 rounded text-sw-gold hover:bg-sw-gold/20 transition-all font-tech tracking-wider uppercase"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK</span>
              </button>
            )}
            <span className="text-sw-cyan font-bold tracking-widest">[SEC-{sectionNumber}]</span>
            <span className="text-sw-gray">/</span>
            <span className="tracking-widest">GALACTIC ARCHIVES</span>
            <span className="text-sw-gray">/</span>
            <span className="text-sw-white uppercase tracking-widest">{categoryTitle}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-cinematic text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sw-white via-sw-goldLight to-sw-gold tracking-[0.15em] uppercase">
            {categoryTitle}
          </h1>

          <p className="mt-1 font-tech text-xs sm:text-sm tracking-[0.25em] text-sw-goldLight/90 uppercase font-semibold">
            {subtitle}
          </p>
        </div>

        {/* Telemetry info */}
        {typeof totalRecords === 'number' && (
          <div className="flex items-center space-x-4 self-start md:self-auto bg-space-800/80 border border-sw-gold/30 px-4 py-3 corner-brackets">
            <Database className="w-5 h-5 text-sw-gold animate-pulse" />
            <div className="text-left font-mono">
              <div className="text-[10px] uppercase tracking-widest text-sw-gray">INDEXED ENTRIES</div>
              <div className="text-lg font-bold text-sw-white">{totalRecords} SUBJECTS</div>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 font-sans text-xs sm:text-sm text-sw-gray max-w-2xl leading-relaxed">
        {description}
      </p>
    </div>
  );
};
