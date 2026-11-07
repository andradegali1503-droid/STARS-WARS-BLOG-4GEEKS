import React from 'react';
import { ShieldAlert, RotateCcw, SearchX } from 'lucide-react';

interface EmptyStateProps {
  query?: string;
  onClear?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ query, onClear }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center holo-panel corner-brackets border border-sw-gold/20 max-w-xl mx-auto my-12">
      <div className="w-16 h-16 rounded-full border border-sw-gold/40 flex items-center justify-center bg-sw-gold/5 mb-4">
        <SearchX className="w-8 h-8 text-sw-gold" />
      </div>

      <h3 className="font-cinematic text-lg tracking-widest text-sw-goldLight uppercase mb-2">
        NO ARCHIVED TELEMETRY FOUND
      </h3>

      <p className="font-tech text-xs tracking-wider text-sw-gray max-w-md mb-6 leading-relaxed">
        {query
          ? `The query "${query}" does not match any subject or sector registered in SWAPI database records.`
          : 'No data exists currently for this classification.'}
      </p>

      {onClear && (
        <button
          onClick={onClear}
          className="flex items-center space-x-2 px-4 py-2 border border-sw-gold text-sw-gold hover:bg-sw-gold hover:text-black transition-all font-tech text-xs tracking-widest uppercase font-semibold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET FILTER QUERY</span>
        </button>
      )}
    </div>
  );
};

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'A hyperwave transmission failure disrupted archive communication.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center holo-panel corner-brackets border border-sw-red/40 max-w-xl mx-auto my-12">
      <div className="w-16 h-16 rounded-full border border-sw-red/50 flex items-center justify-center bg-sw-red/10 mb-4 animate-pulse">
        <ShieldAlert className="w-8 h-8 text-sw-red" />
      </div>

      <h3 className="font-cinematic text-lg tracking-widest text-sw-red uppercase mb-2">
        COMMUNICATION JAMMED
      </h3>

      <p className="font-tech text-xs tracking-wider text-sw-gray max-w-md mb-6 leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 px-5 py-2.5 border border-sw-red text-sw-red hover:bg-sw-red hover:text-white transition-all font-tech text-xs tracking-widest uppercase font-semibold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RE-ESTABLISH TRANSMISSION</span>
        </button>
      )}
    </div>
  );
};
