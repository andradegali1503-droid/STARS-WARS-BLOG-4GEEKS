import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  if (totalPages <= 1) return null;

  // Generate page numbers
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-sw-gold/20 select-none">
      <div className="font-mono text-xs tracking-widest text-sw-gray">
        SECTOR PAGE <span className="text-sw-gold font-bold">{currentPage}</span> OF{' '}
        <span className="text-sw-white">{totalPages}</span>
      </div>

      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className={`flex items-center space-x-1 px-3 py-1.5 border font-tech text-xs tracking-wider uppercase transition-all ${
            hasPrev
              ? 'border-sw-gold/40 text-sw-gold hover:bg-sw-gold/15 hover:border-sw-gold'
              : 'border-white/10 text-white/20 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">PREVIOUS</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {pages.map((p) => {
            const isActive = p === currentPage;
            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 flex items-center justify-center font-mono text-xs transition-all ${
                  isActive
                    ? 'border border-sw-gold bg-sw-gold text-space-950 font-bold shadow-gold-sm'
                    : 'border border-white/10 text-sw-gray hover:text-sw-white hover:border-white/30 bg-space-800/50'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`flex items-center space-x-1 px-3 py-1.5 border font-tech text-xs tracking-wider uppercase transition-all ${
            hasNext
              ? 'border-sw-gold/40 text-sw-gold hover:bg-sw-gold/15 hover:border-sw-gold'
              : 'border-white/10 text-white/20 cursor-not-allowed'
          }`}
        >
          <span className="hidden sm:inline">NEXT</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
