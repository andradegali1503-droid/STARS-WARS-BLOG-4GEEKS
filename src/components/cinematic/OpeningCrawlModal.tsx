import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw } from 'lucide-react';
import { toRomanNumeral } from '@/utils/formatters';

interface OpeningCrawlModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  episodeId: number;
  crawlText: string;
}

export const OpeningCrawlModal: React.FC<OpeningCrawlModalProps> = ({
  isOpen,
  onClose,
  title,
  episodeId,
  crawlText,
}) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [keyCounter, setKeyCounter] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const romanEpisode = toRomanNumeral(episodeId);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 backdrop-blur-xl overflow-hidden select-none"
      >
        {/* Header Bar */}
        <div className="w-full z-40 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black to-transparent">
          <div className="flex items-center space-x-3">
            <span className="font-tech text-xs tracking-widest text-sw-gold uppercase border border-sw-gold/40 px-2.5 py-1 rounded">
              EPISODE {romanEpisode}
            </span>
            <h2 className="font-cinematic text-sm md:text-base text-sw-white tracking-widest uppercase truncate max-w-xs sm:max-w-md">
              {title}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 border border-white/20 hover:border-sw-gold rounded-full text-sw-goldLight hover:bg-sw-gold/20 transition-all text-xs flex items-center space-x-1"
              title={isPaused ? 'Resume Crawl' : 'Pause Crawl'}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setKeyCounter((c) => c + 1)}
              className="p-2 border border-white/20 hover:border-sw-gold rounded-full text-sw-goldLight hover:bg-sw-gold/20 transition-all text-xs"
              title="Restart Crawl"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 border border-white/20 hover:border-sw-red rounded-full text-sw-white hover:text-sw-red hover:bg-sw-red/20 transition-all"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Perspective Crawl Theater */}
        <div className="relative w-full flex-1 flex justify-center items-center overflow-hidden crawl-container">
          <div
            key={keyCounter}
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
            className="crawl-content max-w-2xl px-6 sm:px-12 text-center text-[#FFE81F] font-bold select-none"
          >
            <div className="mb-12">
              <h3 className="font-cinematic tracking-[0.3em] text-2xl sm:text-3xl text-sw-goldLight mb-3">
                EPISODE {romanEpisode}
              </h3>
              <h1 className="font-cinematic text-3xl sm:text-5xl uppercase tracking-[0.2em] text-[#FFE81F]">
                {title}
              </h1>
            </div>

            <div className="font-sans text-xl sm:text-2xl leading-loose tracking-wide space-y-8 text-justify font-semibold">
              {crawlText.split('\r\n\r\n').map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph.replace(/\r\n/g, ' ')}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="w-full z-40 py-3 text-center text-xs tracking-widest text-sw-gray uppercase bg-gradient-to-t from-black to-transparent font-tech">
          Press Spacebar to pause / resume • Press Esc to exit crawl
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
