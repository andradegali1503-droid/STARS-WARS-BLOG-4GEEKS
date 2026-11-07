import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/utils/constants';
import { CategoryDashboardCard } from '@/components/cards/CategoryDashboardCard';
import { ChevronDown, Compass, Database, Shield, Zap } from 'lucide-react';

export const HomePage: React.FC = () => {
  const cardsSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToCards = () => {
    cardsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-12 pb-20 select-none">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(216,180,90,0.08)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 border border-sw-gold/40 bg-space-800/80 rounded-none mb-8 corner-brackets shadow-gold-sm"
          >
            <Shield className="w-3.5 h-3.5 text-sw-gold animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] text-sw-goldLight uppercase font-semibold">
              OFFICIAL IMPERIAL & REBEL ALLIANCE ARCHIVES // SWAPI V1
            </span>
          </motion.div>

          {/* Main Epic Star Wars Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-cinematic text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.18em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#FFF07C] via-sw-gold to-sw-goldDark drop-shadow-[0_0_35px_rgba(216,180,90,0.35)]"
          >
            STAR WARS
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-tech text-lg sm:text-2xl md:text-3xl tracking-[0.35em] text-sw-white uppercase font-bold mt-2"
          >
            GALACTIC DATABASE
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '180px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-sw-gold to-transparent my-6"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-sans text-sm sm:text-base text-sw-gray max-w-2xl leading-relaxed tracking-wide font-normal mb-10"
          >
            Enter a living cinematic repository of the Star Wars galaxy. Explore canon chronologies,
            legendary Jedi and Sith dossiers, star systems, hyperdrive-equipped war vessels,
            and biological classifications documented across millennia.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button
              onClick={scrollToCards}
              className="group flex items-center space-x-3 px-8 py-3.5 border-2 border-sw-gold bg-sw-gold text-space-950 hover:bg-transparent hover:text-sw-gold transition-all duration-300 font-cinematic text-sm tracking-widest uppercase font-bold shadow-gold-md hover:shadow-gold-lg"
            >
              <span>EXPLORE THE GALAXY</span>
              <Compass className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </button>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={scrollToCards}
          className="absolute bottom-6 flex flex-col items-center cursor-pointer text-sw-gold/60 hover:text-sw-gold transition-colors"
        >
          <span className="font-tech text-[10px] tracking-[0.2em] uppercase mb-1">SCROLL TO SECTORS</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* Navigation Cards Sector Grid */}
      <section
        ref={cardsSectionRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-sw-gold/20">
          <div>
            <div className="font-mono text-xs text-sw-gold tracking-widest uppercase mb-1">
              ARCHIVE INDEX // 06 CORE DOMAINS
            </div>
            <h2 className="font-cinematic text-2xl sm:text-3xl text-sw-white tracking-widest uppercase font-bold">
              GALACTIC SECTORS
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-sw-gray max-w-md mt-2 md:mt-0">
            Select a terminal node below to initiate high-speed telemetry search, filtration, and detail inspection.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat, idx) => (
            <CategoryDashboardCard key={cat.id} category={cat} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
};
