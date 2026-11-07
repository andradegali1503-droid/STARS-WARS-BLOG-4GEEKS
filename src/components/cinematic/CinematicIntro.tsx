import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FastForward, CheckSquare, Square } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      onComplete();
      return;
    }

    // Sequence progression:
    // Step 0: Total blackout (0 - 800ms)
    // Step 1: "A long time ago in a galaxy far, far away..." (800ms - 3200ms)
    // Step 2: STAR WARS epic logo zoom (3200ms - 6200ms)
    // Step 3: Iris/Curtain reveal & complete (6200ms - 7000ms)

    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 3400);
    const t3 = setTimeout(() => setStep(3), 6400);
    const t4 = setTimeout(() => {
      handleFinish();
    }, 7200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleFinish = () => {
    if (dontShowAgain) {
      localStorage.setItem('sw_skip_intro', 'true');
    }
    onComplete();
  };

  const handleSkip = () => {
    handleFinish();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden select-none"
    >
      {/* Background Star field for intro */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black" />

      {/* Skip Button & Don't Show Again Toggle */}
      <div className="absolute top-6 right-6 z-30 flex items-center space-x-4">
        <button
          onClick={() => setDontShowAgain(!dontShowAgain)}
          className="flex items-center space-x-2 text-xs uppercase tracking-wider text-sw-gray hover:text-sw-goldLight transition-colors"
          title="Do not show intro on future visits"
        >
          {dontShowAgain ? (
            <CheckSquare className="w-4 h-4 text-sw-gold" />
          ) : (
            <Square className="w-4 h-4 text-sw-gray" />
          )}
          <span className="hidden sm:inline">Don't show again</span>
        </button>

        <button
          onClick={handleSkip}
          className="flex items-center space-x-2 px-4 py-2 border border-sw-gold/40 rounded-full bg-space-800/80 text-sw-gold hover:bg-sw-gold hover:text-black transition-all duration-300 font-cinematic text-xs tracking-widest uppercase hover:shadow-gold-md"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="preface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center px-6 max-w-xl"
          >
            <p className="font-sans text-xl md:text-2xl lg:text-3xl font-medium tracking-wide text-sw-cyan leading-relaxed drop-shadow-[0_0_12px_rgba(72,202,228,0.5)]">
              A long time ago in a galaxy far, far away....
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="logo"
            initial={{ scale: 1.8, opacity: 0 }}
            animate={{ scale: [1.8, 1, 0.45], opacity: [0, 1, 1, 0.8] }}
            exit={{ scale: 0.1, opacity: 0 }}
            transition={{ duration: 3.2, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center text-center px-4"
          >
            <h1 className="font-cinematic font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFE81F] via-[#D8B45A] to-[#8C7030] drop-shadow-[0_0_35px_rgba(255,232,31,0.6)]">
              STAR
            </h1>
            <h1 className="font-cinematic font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFE81F] via-[#D8B45A] to-[#8C7030] -mt-2 sm:-mt-4 drop-shadow-[0_0_35px_rgba(255,232,31,0.6)]">
              WARS
            </h1>
            <p className="mt-4 font-tech tracking-[0.35em] text-sm sm:text-lg text-sw-goldLight/90 uppercase border-y border-sw-gold/40 py-1 px-8">
              Galactic Database
            </p>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            key="curtain"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full border-2 border-sw-gold border-t-transparent animate-spin" />
            <span className="mt-4 text-xs tracking-widest text-sw-gold uppercase font-tech">
              Initializing Core Telemetry...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
