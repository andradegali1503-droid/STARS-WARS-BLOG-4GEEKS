import React from 'react';
import { motion } from 'framer-motion';

interface GalacticLoaderProps {
  label?: string;
  sublabel?: string;
}

export const GalacticLoader: React.FC<GalacticLoaderProps> = ({
  label = 'ACCESSING GALACTIC ARCHIVES',
  sublabel = 'CALIBRATING QUANTUM HYPERSPACE SENSORS...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center select-none">
      <div className="relative w-24 h-24 mb-6">
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-sw-gold/40"
        />

        {/* Medium counter-rotating ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-2 border-transparent border-t-sw-gold border-r-sw-goldLight shadow-gold-sm"
        />

        {/* Inner pulsing core */}
        <motion.div
          animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-6 rounded-full bg-gradient-to-tr from-sw-goldDark to-sw-goldLight/50 blur-[2px]"
        />

        {/* Center reticle dot */}
        <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-sw-gold shadow-[0_0_10px_#D8B45A]" />

        {/* Reticle crosshair axes */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-sw-gold/30 pointer-events-none" />
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-sw-gold/30 pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1.5"
      >
        <p className="font-tech text-xs sm:text-sm tracking-[0.25em] text-sw-goldLight font-bold uppercase">
          {label}
        </p>
        <p className="font-mono text-[10px] sm:text-xs tracking-widest text-sw-gray">
          {sublabel}
        </p>
      </motion.div>
    </div>
  );
};
