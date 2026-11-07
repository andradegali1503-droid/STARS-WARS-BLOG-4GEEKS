import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldAlert, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center select-none">
      <div className="w-20 h-20 rounded-full border border-sw-gold/40 flex items-center justify-center bg-space-800/80 mb-6 corner-brackets shadow-gold-md">
        <ShieldAlert className="w-10 h-10 text-sw-gold animate-pulse" />
      </div>

      <div className="font-mono text-xs tracking-[0.3em] text-sw-cyan uppercase mb-2">
        ERROR // 404 HYPERSPACE DRIFT
      </div>

      <h1 className="font-cinematic text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sw-white via-sw-goldLight to-sw-gold tracking-widest uppercase mb-4">
        SECTOR UNMAPPED
      </h1>

      <p className="font-tech text-sm sm:text-base text-sw-gray max-w-md mb-8 leading-relaxed">
        Your vessel has jumped into uncharted deep space. No galactic archives or beacons exist for this coordinate.
      </p>

      <Link
        to="/"
        className="flex items-center space-x-2 px-6 py-3 border-2 border-sw-gold bg-sw-gold text-space-950 hover:bg-transparent hover:text-sw-gold transition-all duration-300 font-cinematic text-xs tracking-widest uppercase font-bold shadow-gold-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>RETURN TO CORE SYSTEM</span>
      </Link>
    </div>
  );
};
