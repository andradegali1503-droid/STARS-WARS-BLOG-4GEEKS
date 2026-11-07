import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  totalResults?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Query the archives by designation...',
  totalResults,
}) => {
  return (
    <div className="relative w-full max-w-xl select-none">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-sw-gold/70 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-24 py-3 bg-space-800/80 border border-sw-gold/30 rounded-none focus:outline-none focus:border-sw-gold focus:ring-1 focus:ring-sw-gold font-tech tracking-wider text-sm text-sw-white placeholder:text-sw-gray transition-all shadow-inner"
        />

        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-12 p-1 text-sw-gray hover:text-sw-goldLight transition-colors"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="absolute right-3 hidden sm:flex items-center space-x-1 font-mono text-[10px] text-sw-gold/60 uppercase border border-sw-gold/20 px-1.5 py-0.5 rounded">
          SEARCH
        </div>
      </div>

      {typeof totalResults === 'number' && (
        <div className="mt-2 text-right font-mono text-[11px] text-sw-gray">
          MATCHING RECORDS IN ARCHIVES:{' '}
          <span className="text-sw-gold font-bold">{totalResults}</span>
        </div>
      )}
    </div>
  );
};
