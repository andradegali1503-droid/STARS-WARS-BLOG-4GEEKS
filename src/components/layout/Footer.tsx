import React from 'react';
import { Terminal, Shield, ExternalLink, Radio } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-sw-gold/20 bg-space-950/90 py-10 px-4 sm:px-6 lg:px-8 mt-auto select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Telemetry */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <div className="flex items-center space-x-2 text-sw-gold">
            <Radio className="w-4 h-4 animate-pulse text-sw-gold" />
            <span className="font-cinematic font-bold text-sm tracking-widest uppercase">
              STAR WARS GALACTIC DATABASE
            </span>
          </div>
          <p className="font-mono text-xs text-sw-gray">
            HOLONET TELEMETRY PROTOCOL • ALL SECTORS MONITORED
          </p>
        </div>

        {/* Center SWAPI Info */}
        <div className="flex items-center space-x-3 text-xs text-sw-gray">
          <Terminal className="w-4 h-4 text-sw-cyan" />
          <span>DATA TRANSMISSION POWERED BY</span>
          <a
            href="https://swapi.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sw-gold hover:text-sw-goldLight transition-colors flex items-center space-x-1 font-tech uppercase tracking-wider underline underline-offset-4"
          >
            <span>SWAPI.DEV</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Right Status */}
        <div className="flex items-center space-x-2 font-mono text-xs text-sw-gray">
          <Shield className="w-3.5 h-3.5 text-sw-gold" />
          <span className="text-[11px] uppercase tracking-wider text-sw-goldLight/70">
            SEC // LEVEL 4 CLEARANCE
          </span>
        </div>
      </div>
    </footer>
  );
};
