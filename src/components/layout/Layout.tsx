import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Starfield } from '@/components/cinematic/Starfield';
import { CinematicIntro } from '@/components/cinematic/CinematicIntro';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    const skipped = localStorage.getItem('sw_skip_intro');
    return skipped !== 'true';
  });

  const [warpSpeed, setWarpSpeed] = useState<boolean>(false);
  const location = useLocation();

  // Trigger brief hyperspace warp effect whenever the route pathname changes!
  useEffect(() => {
    setWarpSpeed(true);
    const timer = setTimeout(() => {
      setWarpSpeed(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleManualWarp = () => {
    setWarpSpeed(true);
    setTimeout(() => {
      setWarpSpeed(false);
    }, 1200);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-space-950 text-sw-white overflow-hidden selection:bg-sw-gold/30 selection:text-sw-goldLight">
      {/* Cinematic Starfield Canvas Layer */}
      <Starfield warpSpeed={warpSpeed} />

      {/* Atmospheric Nebula Overlay */}
      <div 
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(216,180,90,0.04)_0%,_transparent_50%),radial-gradient(circle_at_80%_80%,_rgba(72,202,228,0.03)_0%,_transparent_50%)]" 
      />

      {/* Cinematic Intro Modal */}
      <AnimatePresence>
        {showIntro && (
          <CinematicIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <Navbar
        onTriggerHyperspace={handleManualWarp}
        onReplayIntro={handleReplayIntro}
      />

      {/* Main Routed Content with smooth page transition */}
      <main className="relative z-10 flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex-1 flex flex-col"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Telemetry */}
      <Footer />
    </div>
  );
};
